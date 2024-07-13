import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

import "./Chat.css";

let socket;
const END_POINT = "http://localhost:8080";

const Chat = () => {
  const { search } = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(search);

    socket = io(END_POINT);

    setName(name);
    setRoom(room);

    console.log(socket);

    return () => {};
  }, [search]);

  return <div>Chat</div>;
};

export default Chat;
