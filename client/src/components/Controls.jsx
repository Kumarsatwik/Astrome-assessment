import React from "react";
import { TIME_WINDOWS } from "../constants/houseData.js";

const Controls = ({
  timeWindow,
  onTimeWindowChange,
  isLive,
  onLiveToggle,
  isConnected,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-fadeIn animation-delay-300">
      {/* Time Window Selector */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        <span className="text-gray-700 font-medium font-cinzel text-lg whitespace-nowrap">
          Time Window:
        </span>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {TIME_WINDOWS.map((window) => (
            <button
              key={window.id}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                timeWindow === window.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200"
              }`}
              onClick={() => onTimeWindowChange(window.id)}
            >
              <span className="text-lg">{window.icon}</span>
              <span className="hidden sm:inline">{window.label}</span>
              <span className="sm:hidden">{window.id.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Update Control */}
      <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
        <span className="text-gray-700 font-medium font-cinzel text-lg whitespace-nowrap">
          Live Updates:
        </span>
        <div className="flex items-center gap-3">
          <button
            className={`relative inline-flex items-center h-8 rounded-full w-20 transition-all duration-300 focus:outline-none ${
              isLive
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gray-300"
            } ${
              !isConnected
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:shadow-lg"
            }`}
            onClick={onLiveToggle}
            disabled={!isConnected}
          >
            <span className="sr-only">
              {isLive ? "Disable" : "Enable"} live updates
            </span>
            <span
              className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-lg transition-transform duration-300 ${
                isLive ? "translate-x-12" : "translate-x-1"
              }`}
            />
          </button>
          {!isConnected && (
            <span className="text-sm text-red-500 font-medium">
              Disconnected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
