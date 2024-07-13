import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";

let socket;
const END_POINT = "http://localhost:8080/";

const Chat = () => {
  const { search } = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(search);

    socket = io(END_POINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.off("join", () => {
        console.log("Join event off");
      });
    };
  }, [search]);

  // NOTE: 메세지 받으면 메세지 배열 업데이트
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />

        <Messages messages={messages} name={name} />

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
