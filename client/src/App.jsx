import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts'

function App() {
  const [housePoints, setHousePoints] = useState({
    Gryff: 0,
    Slyth: 0,
    Raven: 0,
    Huff: 0
  });
  const [timeWindow, setTimeWindow] = useState('all');
  const [isLive, setIsLive] = useState(false);
  const [socket, setSocket] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [hoveredHouse, setHoveredHouse] = useState(null);

  // House full names
  const houseNames = {
    Gryff: 'Gryffindor',
    Slyth: 'Slytherin',
    Raven: 'Ravenclaw',
    Huff: 'Hufflepuff'
  };

  // House descriptions
  const houseDescriptions = {
    Gryff: 'Known for bravery, daring, nerve, and chivalry. Gryffindor values courage and determination above all.',
    Slyth: 'Values ambition, leadership, cunning, determination, and resourcefulness. Slytherins are known for their strategic minds.',
    Raven: 'Values intelligence, knowledge, curiosity, creativity and wit. Ravenclaws are known for their wisdom and learning.',
    Huff: 'Values hard work, dedication, patience, loyalty, and fair play. Hufflepuffs are known for their strong moral compass.'
  };

  // Format data for Recharts
  const chartData = Object.entries(housePoints).map(([house, points]) => ({
    name: houseNames[house],
    points: points,
    house: house,
  }));

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(ws);
      
      // Request initial data
      ws.send(JSON.stringify({
        action: 'get_points',
        time_window: timeWindow
      }));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.totals) {
        // Update house points for the current time window
        if (data.totals[timeWindow]) {
          setHousePoints(data.totals[timeWindow]);
        }
      }
      
      if (data.event) {
        setLatestEvent(data.event);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
      setIsLive(false);
    };
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Update data when time window changes
  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({
        action: 'get_points',
        time_window: timeWindow
      }));
      
      // If live updates are on, restart the stream to get updates for the new time window
      if (isLive) {
        socket.send(JSON.stringify({ action: 'stop' }));
        socket.send(JSON.stringify({ action: 'start' }));
      }
    }
  }, [timeWindow, socket, isLive]);

  // Handle time window change
  const handleTimeWindowChange = (window) => {
    setTimeWindow(window);
  };

  // Handle live update toggle
  const handleLiveUpdateToggle = () => {
    if (!socket) return;
    
    const newIsLive = !isLive;
    setIsLive(newIsLive);
    
    if (newIsLive) {
      socket.send(JSON.stringify({ action: 'start' }));
    } else {
      socket.send(JSON.stringify({ action: 'stop' }));
    }
  };

  // Handle house selection
  const handleHouseClick = (house) => {
    setSelectedHouse(selectedHouse === house ? null : house);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-6 px-6 mb-6 shadow-sm border-b border-yellow-200">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-center text-gray-800">🏆 Hogwarts House Cup</h1>
        <p className="text-center text-gray-600 mt-2">Live House Points Leaderboard</p>
      </header>
      
      <main className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-5 rounded-xl shadow-md border border-gray-100">
          {/* Time Window Selector */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <span className="text-gray-700 font-medium font-cinzel">Time Window:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: '5m', label: 'Last 5 Minutes', icon: '⏱️' },
                { id: '1h', label: 'Last Hour', icon: '🕐' },
                { id: 'all', label: 'All Time', icon: '📜' }
              ].map(window => (
                <button
                  key={window.id}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${timeWindow === window.id 
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => handleTimeWindowChange(window.id)}
                >
                  <span className="mr-1">{window.icon}</span> {window.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Live Update Control */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <span className="text-gray-700 font-medium font-cinzel">Live Updates:</span>
            <button 
              className={`relative inline-flex items-center h-7 rounded-full w-14 transition-colors duration-300 focus:outline-none ${isLive ? 'bg-green-500' : 'bg-gray-300'}`}
              onClick={handleLiveUpdateToggle}
            >
              <span className="sr-only">{isLive ? 'Enable' : 'Disable'} live updates</span>
              <span 
                className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-300 ${isLive ? 'translate-x-8' : 'translate-x-1'}`} 
              />
              <span className={`absolute right-1 left-1 text-xs font-bold ${isLive ? 'text-white' : 'text-gray-700'} text-center`}>
                {isLive ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
        
        {/* Leaderboard with Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100 animate-fadeIn">
          <h2 className="text-gray-800 text-2xl font-cinzel font-bold mb-6 text-center">House Cup Standings</h2>
          
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={chartData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false}
                  domain={[0, 'dataMax + 5']}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  width={120}
                  tick={(props) => {
                    const { x, y, payload } = props;
                    const house = payload.value;
                    const houseKey = Object.keys(houseNames).find(key => houseNames[key] === house);
                    const isSelected = selectedHouse === houseKey;
                    const isHovered = hoveredHouse === houseKey;
                    
                    let textColor = 'text-gray-700';
                    let houseIcon = '';
                    
                    if (houseKey === 'Gryff') {
                      textColor = 'text-gryffindor-primary';
                      houseIcon = '🦁';
                    } else if (houseKey === 'Slyth') {
                      textColor = 'text-slytherin-primary';
                      houseIcon = '🐍';
                    } else if (houseKey === 'Raven') {
                      textColor = 'text-ravenclaw-primary';
                      houseIcon = '🦅';
                    } else if (houseKey === 'Huff') {
                      textColor = 'text-hufflepuff-primary';
                      houseIcon = '🦡';
                    }
                    
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text 
                          x={-10} 
                          y={0} 
                          dy={5} 
                          textAnchor="end" 
                          className={`font-cinzel font-medium ${textColor} ${isSelected || isHovered ? 'font-bold' : ''}`}
                          onMouseEnter={() => setHoveredHouse(houseKey)}
                          onMouseLeave={() => setHoveredHouse(null)}
                          onClick={() => handleHouseClick(houseKey)}
                          style={{ cursor: 'pointer', fontSize: isSelected || isHovered ? '16px' : '14px' }}
                        >
                          {houseIcon} {house}
                        </text>
                      </g>
                    );
                  }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [`${value} points`, houseNames[props.payload.house]]}
                  cursor={{fill: 'rgba(0, 0, 0, 0.05)'}} 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    border: '1px solid #f0f0f0',
                    padding: '10px'
                  }}
                />
                <Bar 
                  dataKey="points" 
                  onClick={(data) => handleHouseClick(data.house)}
                  className="cursor-pointer"
                  animationDuration={1000}
                  radius={[0, 8, 8, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.house === 'Gryff' ? '#740001' : 
                            entry.house === 'Slyth' ? '#1A472A' : 
                            entry.house === 'Raven' ? '#0E1A40' : 
                            '#FFD800'} 
                      className="transition-all duration-300"
                      style={{
                        filter: selectedHouse === entry.house || hoveredHouse === entry.house ? 'brightness(1.2) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))' : 'none',
                        opacity: selectedHouse && selectedHouse !== entry.house && hoveredHouse !== entry.house ? 0.7 : 1
                      }}
                    />
                  ))}
                  <LabelList 
                    dataKey="points" 
                    position="right" 
                    fill="#666" 
                    fontSize={14}
                    fontWeight="bold"
                    formatter={(value) => `${value} pts`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* House Details Panel */}
          {selectedHouse && (
            <div className={`mt-6 p-6 rounded-xl shadow-md bg-opacity-10 animate-fadeIn transition-all duration-300
              ${selectedHouse === 'Gryff' ? 'bg-gryffindor-primary/10 border-l-4 border-gryffindor-primary' : 
                selectedHouse === 'Slyth' ? 'bg-slytherin-primary/10 border-l-4 border-slytherin-primary' : 
                selectedHouse === 'Raven' ? 'bg-ravenclaw-primary/10 border-l-4 border-ravenclaw-primary' : 
                'bg-hufflepuff-primary/10 border-l-4 border-hufflepuff-primary'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {selectedHouse === 'Gryff' ? '🦁' : 
                     selectedHouse === 'Slyth' ? '🐍' : 
                     selectedHouse === 'Raven' ? '🦅' : 
                     '🦡'}
                  </span>
                  <h3 className={`font-cinzel font-bold text-xl
                    ${selectedHouse === 'Gryff' ? 'text-gryffindor-primary' : 
                      selectedHouse === 'Slyth' ? 'text-slytherin-primary' : 
                      selectedHouse === 'Raven' ? 'text-ravenclaw-primary' : 
                      'text-hufflepuff-primary'}`}
                  >
                    {houseNames[selectedHouse]}
                  </h3>
                </div>
                <div className={`sm:ml-auto font-bold text-lg px-3 py-1 rounded-full
                  ${selectedHouse === 'Gryff' ? 'bg-gryffindor-primary/10 text-gryffindor-primary' : 
                    selectedHouse === 'Slyth' ? 'bg-slytherin-primary/10 text-slytherin-primary' : 
                    selectedHouse === 'Raven' ? 'bg-ravenclaw-primary/10 text-ravenclaw-primary' : 
                    'bg-hufflepuff-primary/10 text-hufflepuff-primary'}`}
                >
                  {housePoints[selectedHouse]} points
                </div>
              </div>
              <p className="text-gray-700">{houseDescriptions[selectedHouse]}</p>
            </div>
          )}
        </div>
        
        {/* Event Notification */}
        {latestEvent && isLive && (
          <div className={`fixed bottom-4 right-4 rounded-xl shadow-xl overflow-hidden transition-all duration-500 transform translate-y-0 opacity-100 border-l-4 max-w-xs z-50 animate-fadeIn
            ${latestEvent.category === 'Gryff' ? 'border-gryffindor-primary bg-gryffindor-primary/10' : 
              latestEvent.category === 'Slyth' ? 'border-slytherin-primary bg-slytherin-primary/10' : 
              latestEvent.category === 'Raven' ? 'border-ravenclaw-primary bg-ravenclaw-primary/10' : 
              'border-hufflepuff-primary bg-hufflepuff-primary/10'}`}
          >
            <div className="flex items-center">
              <div className={`text-white font-bold py-3 px-4 text-sm font-cinzel flex items-center
                ${latestEvent.category === 'Gryff' ? 'bg-gryffindor-primary' : 
                  latestEvent.category === 'Slyth' ? 'bg-slytherin-primary' : 
                  latestEvent.category === 'Raven' ? 'bg-ravenclaw-primary' : 
                  'bg-hufflepuff-primary text-black'}`}
              >
                <span className="mr-2">
                  {latestEvent.category === 'Gryff' ? '🦁' : 
                   latestEvent.category === 'Slyth' ? '🐍' : 
                   latestEvent.category === 'Raven' ? '🦅' : 
                   '🦡'}
                </span>
                {houseNames[latestEvent.category]}
              </div>
              <div className="flex flex-col px-4 py-3">
                <span className={`font-bold text-lg animate-pulse-slow
                  ${latestEvent.category === 'Gryff' ? 'text-gryffindor-primary' : 
                    latestEvent.category === 'Slyth' ? 'text-slytherin-primary' : 
                    latestEvent.category === 'Raven' ? 'text-ravenclaw-primary' : 
                    'text-hufflepuff-primary'}`}
                >
                  +{latestEvent.points} points
                </span>
                <span className="text-gray-500 text-xs">{new Date(latestEvent.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )}
        {/* Connection Status */}
        <div className="text-center text-gray-500 text-sm mb-6">
          <p>Connection status: 
            {socket ? 
              <span className="text-green-600 font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span> Connected
              </span> : 
              <span className="text-red-600 font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span> Disconnected
              </span>
            }
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
