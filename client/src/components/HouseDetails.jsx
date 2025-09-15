import React from 'react';
import { HOUSE_NAMES, HOUSE_DESCRIPTIONS, HOUSE_COLORS, HOUSE_ICONS } from '../constants/houseData.js';

const HouseDetails = ({ selectedHouse, housePoints, onClose }) => {
  if (!selectedHouse) return null;

  const houseName = HOUSE_NAMES[selectedHouse];
  const houseDescription = HOUSE_DESCRIPTIONS[selectedHouse];
  const housePointsValue = housePoints[selectedHouse];
  const houseIcon = HOUSE_ICONS[selectedHouse];
  const colors = HOUSE_COLORS[selectedHouse];

  return (
    <div className={`mt-8 p-8 rounded-2xl shadow-xl bg-gradient-to-br ${colors.bg} border-l-4 ${colors.border} animate-fadeIn animation-delay-700 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-200 shadow-md"
        aria-label="Close house details"
      >
        <span className="text-gray-600 font-bold text-lg">×</span>
      </button>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-lg ${colors.bg} border-2 ${colors.border}`}>
              {houseIcon}
            </div>
            <div>
              <h3 className={`font-cinzel font-bold text-3xl ${colors.text} mb-1`}>
                {houseName}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">House Points:</span>
                <span className={`text-2xl font-bold ${colors.text} animate-pulse-slow`}>
                  {housePointsValue}
                </span>
              </div>
            </div>
          </div>

          {/* Points Badge */}
          <div className={`lg:ml-auto px-6 py-3 rounded-xl ${colors.bg} border ${colors.border} shadow-lg`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                {housePointsValue}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Current Points
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-inner">
          <h4 className="font-cinzel font-bold text-xl text-gray-800 mb-3">House Traits</h4>
          <p className="text-gray-700 leading-relaxed text-lg">
            {houseDescription}
          </p>
        </div>

        {/* Fun Facts or Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-cinzel font-bold text-gray-800">Founded</div>
            <div className="text-sm text-gray-600">by legendary wizards</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-cinzel font-bold text-gray-800">Common Room</div>
            <div className="text-sm text-gray-600">magical & unique</div>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-cinzel font-bold text-gray-800">House Ghost</div>
            <div className="text-sm text-gray-600">friendly spirits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
