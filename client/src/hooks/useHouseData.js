import { useState, useEffect, useCallback } from "react";
import { INITIAL_HOUSE_POINTS } from "../constants/houseData.js";

export const useHouseData = (socket, timeWindow) => {
  const [housePoints, setHousePoints] = useState(INITIAL_HOUSE_POINTS);
  const [latestEvent, setLatestEvent] = useState(null);

  // Handle WebSocket messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket data:', data);

        if (data.totals && data.totals[timeWindow]) {
          console.log('Updating house points:', data.totals[timeWindow]);
          setHousePoints(data.totals[timeWindow]);
        }

        if (data.event) {
          console.log('New event:', data.event);
          setLatestEvent(data.event);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onmessage = handleMessage;

    return () => {
      socket.onmessage = null;
    };
  }, [socket, timeWindow]);

  // Request initial data when socket connects
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          action: "get_points",
          time_window: timeWindow,
        })
      );
    }
  }, [socket, timeWindow]);

  const startLiveUpdates = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "start" }));
    }
  }, [socket]);

  const stopLiveUpdates = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "stop" }));
    }
  }, [socket]);

  return {
    housePoints,
    latestEvent,
    startLiveUpdates,
    stopLiveUpdates,
  };
};
