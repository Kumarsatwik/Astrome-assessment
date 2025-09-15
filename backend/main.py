import sys
import os
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import datetime
import asyncio

# Add the parent directory to sys.path to import data_gen
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from data_gen import record_stream
from database import Database

app = FastAPI(title="Hogwarts House Cup API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
db = Database()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.running = False
        self.task = None
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                # Connection might be closed
                pass
    
    async def start_data_stream(self):
        if self.running:
            return
        
        self.running = True
        
        async def stream_data():
            async for record in record_stream():
                if not self.running:
                    break
                
                # Ingest event into database
                db.ingest_event(record)
                
                # Get updated totals for all time windows
                data = {
                    "event": record,
                    "totals": {
                        "5m": db.get_points_by_time_window("5m"),
                        "1h": db.get_points_by_time_window("1h"),
                        "all": db.get_points_by_time_window("all")
                    }
                }
                
                # Broadcast to all connected clients
                await self.broadcast(json.dumps(data))
                
                # Small delay to prevent overwhelming the system
                await asyncio.sleep(0.1)
        
        self.task = asyncio.create_task(stream_data())
    
    def stop_data_stream(self):
        self.running = False
        if self.task:
            self.task.cancel()

manager = ConnectionManager()

# API endpoints
@app.get("/")
async def read_root():
    return {"message": "Welcome to Hogwarts House Cup API"}

@app.get("/points/{time_window}")
async def get_points(time_window: str):
    """Get house points for a specific time window
    
    Args:
        time_window: '5m' for 5 minutes, '1h' for 1 hour, 'all' for all time
    """
    if time_window not in ["5m", "1h", "all"]:
        raise HTTPException(status_code=400, detail="Invalid time window. Use '5m', '1h', or 'all'")
    
    return db.get_points_by_time_window(time_window)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            command = json.loads(data)
            
            if command.get("action") == "start":
                await manager.start_data_stream()
                await websocket.send_text(json.dumps({"status": "started"}))
            elif command.get("action") == "stop":
                manager.stop_data_stream()
                await websocket.send_text(json.dumps({"status": "stopped"}))
            elif command.get("action") == "get_points":
                time_window = command.get("time_window", "all")
                points = db.get_points_by_time_window(time_window)
                await websocket.send_text(json.dumps({"totals": {time_window: points}}))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)