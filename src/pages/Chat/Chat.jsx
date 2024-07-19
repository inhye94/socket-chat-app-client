import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

import InfoBar from "./components/InfoBar/InfoBar";
import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import TextContainer from "./components/TextContainer/TextContainer";

import "./Chat.css";

const Chat = () => {
  const socket = useSocket();
  const { search } = useLocation();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(search);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.off("join", () => {
        console.log("Join event off");
      });
    };
  }, [search, socket]);

  // NOTE: 메세지 받으면 메세지 배열 업데이트
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages, socket]);

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
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
