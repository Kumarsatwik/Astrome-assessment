import sqlite3
import os
from datetime import datetime, timedelta
import json

class Database:
    def __init__(self, db_path="hogwarts.db"):
        self.db_path = db_path
        self.initialize_db()
    
    def initialize_db(self):
        """Initialize the database with the required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create house_points table if it doesn't exist
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS house_points (
            id TEXT PRIMARY KEY,
            category TEXT NOT NULL,
            points INTEGER NOT NULL,
            timestamp TEXT NOT NULL
        )
        """)
        
        conn.commit()
        conn.close()
    
    def ingest_event(self, event):
        """Ingest a house points event into the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO house_points (id, category, points, timestamp) VALUES (?, ?, ?, ?)",
            (event["id"], event["category"], event["points"], event["timestamp"])
        )
        
        conn.commit()
        conn.close()
        
    def get_points_by_time_window(self, time_window):
        """Get total points by house for a given time window
        
        Args:
            time_window (str): '5m' for 5 minutes, '1h' for 1 hour, 'all' for all time
            
        Returns:
            dict: Dictionary with house categories as keys and total points as values
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        now = datetime.utcnow().isoformat()
        
        if time_window == "5m":
            time_limit = (datetime.utcnow() - timedelta(minutes=5)).isoformat()
            query = "SELECT category, SUM(points) FROM house_points WHERE timestamp >= ? GROUP BY category"
            cursor.execute(query, (time_limit,))
        elif time_window == "1h":
            time_limit = (datetime.utcnow() - timedelta(hours=1)).isoformat()
            query = "SELECT category, SUM(points) FROM house_points WHERE timestamp >= ? GROUP BY category"
            cursor.execute(query, (time_limit,))
        else:  # all time
            query = "SELECT category, SUM(points) FROM house_points GROUP BY category"
            cursor.execute(query)
        
        results = cursor.fetchall()
        conn.close()
        
        # Create a dictionary with all houses initialized to 0
        totals = {category: 0 for category in ["Gryff", "Slyth", "Raven", "Huff"]}
        
        # Update with actual values from database
        for category, points in results:
            totals[category] = points
        
        return totals