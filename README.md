# Hogwarts House Cup Leaderboard

A real-time leaderboard application for tracking house points in the Hogwarts House Cup competition. This application consists of a FastAPI backend and a React frontend.

## Features

- Real-time tracking of house points for Gryffindor, Slytherin, Ravenclaw, and Hufflepuff
- Time window filtering (Last 5 Minutes, Last Hour, All Time)
- Live updates with WebSocket connection
- Persistent storage using SQLite database
- Responsive UI design

## Project Structure

```
├── backend/               # FastAPI backend
│   ├── database.py        # SQLite database module
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── data_gen.py            # Data generator script
├── frontend/              # React frontend
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point
│   └── package.json       # Node.js dependencies
└── README.md              # This file
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

   The backend API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

   The frontend application will be available at http://localhost:3000

## Data Generator

The application uses a data generator script (`data_gen.py`) to simulate house points events. The backend automatically uses this generator when live updates are enabled.

## API Endpoints

- `GET /points/{time_window}` - Get house points for a specific time window (5m, 1h, all)
- `WebSocket /ws` - WebSocket endpoint for real-time updates

## Usage

1. Open the frontend application in your browser at http://localhost:3000
2. Use the time window buttons to switch between different time periods
3. Toggle the "Live Updates" button to start or stop real-time updates
4. Watch as house points are updated in real-time on the leaderboard

## Implementation Details

### Backend

- FastAPI for the REST API and WebSocket server
- SQLite for persistent storage of house points events
- Asynchronous data processing for real-time updates

### Frontend

- React for the user interface
- WebSocket connection for real-time data updates
- Responsive design for various screen sizes

## License

This project is licensed under the MIT License.