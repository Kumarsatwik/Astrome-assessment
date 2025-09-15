import { HOUSE_NAMES } from '../constants/houseData.js';

export const formatChartData = (housePoints) => {
  return Object.entries(housePoints).map(([house, points]) => ({
    name: HOUSE_NAMES[house],
    points: points,
    house: house,
  }));
};

export const getHouseKeyFromName = (houseName) => {
  return Object.keys(HOUSE_NAMES).find(key => HOUSE_NAMES[key] === houseName);
};
