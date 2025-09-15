import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url, onOpen) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(ws);
      setIsConnected(true);
      if (onOpen) onOpen(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url, onOpen]);

  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }, [socket]);

  return { socket, isConnected, sendMessage };
};
