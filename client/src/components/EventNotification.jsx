import React, { useEffect, useState } from 'react';
import { HOUSE_NAMES, HOUSE_COLORS, HOUSE_ICONS } from '../constants/houseData.js';

const EventNotification = ({ latestEvent, isVisible }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (latestEvent && isVisible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [latestEvent, isVisible]);

  if (!latestEvent || !isVisible || !show) return null;

  const houseKey = latestEvent.category;
  const houseName = HOUSE_NAMES[houseKey];
  const houseIcon = HOUSE_ICONS[houseKey];
  const colors = HOUSE_COLORS[houseKey];

  return (
    <div className={`fixed bottom-6 right-6 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform z-50 max-w-sm animate-slideInRight border-l-4 ${colors.border} ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="flex items-center bg-white">
        {/* House Indicator */}
        <div className={`text-white font-bold py-4 px-5 text-sm font-cinzel flex items-center min-w-max ${colors.bg} border-r border-gray-200`}>
          <span className="mr-3 text-2xl">{houseIcon}</span>
          <span className="hidden sm:inline">{houseName}</span>
          <span className="sm:hidden">{houseKey}</span>
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 py-4 flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className={`font-bold text-xl animate-bounce ${colors.text}`}>
              +{latestEvent.points} points
            </span>
            <button
              onClick={() => setShow(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-2"
              aria-label="Close notification"
            >
              <span className="text-lg font-bold">×</span>
            </button>
          </div>
          <span className="text-gray-500 text-sm font-medium">
            {new Date(latestEvent.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className={`h-full ${colors.bg} transition-all duration-5000 ease-linear`}
          style={{
            width: show ? '0%' : '100%',
            animation: show ? 'shrink 5s linear forwards' : 'none'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventNotification;
