import React from "react";
import { Outlet } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default App;
