import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { HOUSE_NAMES, HOUSE_COLORS, HOUSE_ICONS } from '../constants/houseData.js';
import { formatChartData, getHouseKeyFromName } from '../utils/chartUtils.js';

const LeaderboardChart = ({ housePoints, selectedHouse, onHouseClick, hoveredHouse, onHouseHover }) => {
  const chartData = formatChartData(housePoints);

  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const house = payload.value;
    const houseKey = getHouseKeyFromName(house);
    const isSelected = selectedHouse === houseKey;
    const isHovered = hoveredHouse === houseKey;

    let textColor = 'text-gray-700';
    let houseIcon = '';

    if (houseKey) {
      textColor = HOUSE_COLORS[houseKey].text;
      houseIcon = HOUSE_ICONS[houseKey];
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={-15}
          y={0}
          dy={5}
          textAnchor="end"
          className={`font-cinzel font-medium ${textColor} ${isSelected || isHovered ? 'font-bold' : ''} cursor-pointer transition-all duration-200`}
          onMouseEnter={() => onHouseHover(houseKey)}
          onMouseLeave={() => onHouseHover(null)}
          onClick={() => onHouseClick(houseKey)}
          style={{
            fontSize: isSelected || isHovered ? '18px' : '16px',
            filter: isSelected || isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
          }}
        >
          {houseIcon} {house}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const houseKey = data.house;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{HOUSE_ICONS[houseKey]}</span>
            <p className={`font-cinzel font-bold text-lg ${HOUSE_COLORS[houseKey].text}`}>
              {HOUSE_NAMES[houseKey]}
            </p>
          </div>
          <p className="text-gray-700 font-medium">
            Points: <span className="font-bold text-gray-900">{data.points}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-fadeIn animation-delay-500">
      <div className="text-center mb-8">
        <h2 className="text-gray-800 text-3xl font-cinzel font-bold mb-3">
          🏆 House Cup Standings
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto"></div>
      </div>

      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            barSize={35}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              domain={[0, 'dataMax + 10']}
              tick={{ fontSize: 14, fill: '#666' }}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              width={140}
              tick={<CustomYAxisTick />}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="points"
              onClick={(data) => onHouseClick(data.house)}
              className="cursor-pointer"
              animationDuration={800}
              animationBegin={0}
              animationEasing="ease-out"
              radius={[0, 12, 12, 0]}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={HOUSE_COLORS[entry.house].primary}
                  className="transition-all duration-300 hover:brightness-110"
                  style={{
                    filter: selectedHouse === entry.house || hoveredHouse === entry.house
                      ? 'brightness(1.15) drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15))'
                      : 'none',
                    opacity: selectedHouse && selectedHouse !== entry.house && hoveredHouse !== entry.house ? 0.75 : 1
                  }}
                />
              ))}
              <LabelList
                dataKey="points"
                position="right"
                fill="#666"
                fontSize={16}
                fontWeight="bold"
                formatter={(value) => `${value} pts`}
                className="font-cinzel"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(HOUSE_NAMES).map(([key, name]) => (
          <div
            key={key}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => onHouseClick(key)}
          >
            <span className="text-xl">{HOUSE_ICONS[key]}</span>
            <span className={`font-cinzel font-medium ${HOUSE_COLORS[key].text}`}>
              {name}
            </span>
            <span className="text-gray-600 font-bold">({housePoints[key]})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardChart;
