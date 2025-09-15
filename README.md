# 🏆 Hogwarts House Cup Leaderboard

A modern, real-time leaderboard application for tracking house points in the Hogwarts House Cup competition. Built with a FastAPI backend and a React frontend featuring smooth animations and responsive design.

![Hogwarts House Cup](https://img.shields.io/badge/Hogwarts-House%20Cup-gold?style=for-the-badge&logo=react)

<img width="1920" height="965" alt="image" src="https://github.com/user-attachments/assets/94ba91b2-6dc7-4530-8a57-537af7291737" />


## ✨ Features

- **Real-time Updates**: Live WebSocket connection for instant house points updates
- **Time Window Filtering**: View points for Last 5 Minutes, Last Hour, or All Time
- **Interactive Charts**: Smooth animated bar charts with hover effects and click interactions
- **House Details**: Detailed information panels for each Hogwarts house
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Persistent Storage**: SQLite database for reliable data persistence
- **Event Notifications**: Floating notifications for live point updates
- **Modular Architecture**: Clean, maintainable code structure with reusable components

## 🏗️ Project Structure

```
├── backend/                    # FastAPI backend
│   ├── database.py            # SQLite database operations
│   ├── main.py                # FastAPI application & WebSocket server
│   ├── populate_test_data.py  # Test data generator
│   ├── requirements.txt       # Python dependencies
│   └── hogwarts.db            # SQLite database file
├── client/                     # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Header.jsx     # App header with title
│   │   │   ├── Controls.jsx   # Time window & live update controls
│   │   │   ├── LeaderboardChart.jsx # Interactive bar chart
│   │   │   ├── HouseDetails.jsx # House information panel
│   │   │   ├── EventNotification.jsx # Live update notifications
│   │   │   └── ConnectionStatus.jsx # WebSocket status indicator
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useWebSocket.js # WebSocket connection management
│   │   │   └── useHouseData.js # House data state management
│   │   ├── constants/         # Application constants
│   │   │   └── houseData.js   # House colors, names, icons
│   │   ├── utils/             # Utility functions
│   │   │   └── chartUtils.js  # Chart data formatting
│   │   ├── App.jsx            # Main application component
│   │   ├── index.css          # Global styles & animations
│   │   └── main.jsx           # Application entry point
│   └── package.json           # Node.js dependencies
├── data_gen.py                # Async data generator for live updates
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git** for cloning the repository

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd assessment
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt

   # Populate with test data (optional)
   python3 populate_test_data.py

   # Start the server
   python3 main.py
   ```
   Backend will be available at: `http://localhost:8000`

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

## 🎮 Usage

1. **Open the application** in your browser at `http://localhost:5173`
2. **Select time window** using the filter buttons (5 minutes, 1 hour, all time)
3. **Enable live updates** by toggling the switch to see real-time point changes
4. **Click on houses** in the chart or legend to view detailed information
5. **Watch notifications** appear when points are awarded during live updates

## 🔧 API Reference

### REST Endpoints

- `GET /` - API information
- `GET /points/{time_window}` - Get house points (time_window: `5m`, `1h`, `all`)

### WebSocket Events

**Client → Server:**
- `{"action": "get_points", "time_window": "all"}` - Request points data
- `{"action": "start"}` - Start live data streaming
- `{"action": "stop"}` - Stop live data streaming

**Server → Client:**
- `{"totals": {"all": {"Gryff": 50, "Slyth": 45, ...}}}` - Points data response
- `{"event": {...}, "totals": {...}}` - Live update with event and current totals

## 🛠️ Development

### Backend Development

```bash
cd backend
pip install -r requirements.txt
# Make changes to main.py or database.py
python3 main.py  # Auto-reload enabled
```

### Frontend Development

```bash
cd client
npm install
npm run dev  # Hot reload enabled
```

### Database Management

```bash
cd backend
# Clear all data
python3 -c "from database import Database; db = Database(); db.clear_data()"

# Add test data
python3 populate_test_data.py
```

## 🎨 Design System

### House Colors
- **Gryffindor**: `#740001` (Deep Red)
- **Slytherin**: `#1A472A` (Dark Green)
- **Ravenclaw**: `#0E1A40` (Dark Blue)
- **Hufflepuff**: `#FFD800` (Gold)

### Animations
- Smooth bar chart transitions with easing
- Fade-in animations for UI elements
- Hover effects and interactive feedback
- Real-time notification animations

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: Single column layout, stacked controls
- **Tablet**: Optimized spacing and touch targets
- **Desktop**: Full multi-column layout with expanded features

## 🔍 Troubleshooting

### Backend Issues
- **Port 8000 occupied**: Kill existing process or change port in `main.py`
- **Database errors**: Delete `hogwarts.db` and run `populate_test_data.py`
- **Import errors**: Ensure all dependencies are installed

### Frontend Issues
- **WebSocket connection fails**: Ensure backend is running on port 8000
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- **Port conflicts**: Vite uses port 5173 by default

### Common Issues
- **No data displayed**: Run `python3 populate_test_data.py` to add test data
- **Live updates not working**: Check browser console for WebSocket errors
- **Slow performance**: Ensure stable internet connection for WebSocket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Harry Potter universe
- Built with modern web technologies
- Special thanks to the open-source community

---

**Made with 🪄 by the Hogwarts Development Team**
