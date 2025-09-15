import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-amber-50 py-8 px-6 mb-8 shadow-sm border-b border-yellow-200">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gray-800 mb-3 animate-fadeIn">
          🏆 Hogwarts House Cup
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium animate-fadeIn animation-delay-200">
          Live House Points Leaderboard
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
