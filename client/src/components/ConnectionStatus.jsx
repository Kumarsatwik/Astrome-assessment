import React from 'react';

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg border ${
        isConnected
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-3">
          <span className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <div className="text-left">
            <div className={`font-bold text-lg ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>
            {!isConnected && (
              <div className="text-sm text-red-600 mt-1">
                Backend server not running. Start with:<br />
                <code className="bg-red-100 px-2 py-1 rounded text-xs font-mono">
                  cd backend && python3 main.py
                </code>
              </div>
            )}
            {isConnected && (
              <div className="text-sm text-green-600 font-medium">
                Real-time data streaming active
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
