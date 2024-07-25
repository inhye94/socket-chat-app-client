import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const isTest = false;
const END_POINT = isTest
  ? process.env.REACT_APP_SOCKET_LOCAL_URL
  : process.env.REACT_APP_SOCKET_SERVER_URL;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const clientSocket = io(END_POINT);
    setSocket(clientSocket);

    return () => {
      // NOTE: 소켓 연결 정리
      clientSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
