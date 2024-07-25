import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import "./AirConditioner.css";
import { useSocketContext } from "../../context/SocketContext";

const AirConditioner = () => {
  const { socket } = useSocketContext();

  const { search } = useLocation();
  const { name } = queryString.parse(search);

  const [temp, setTemp] = useState(0);
  const [username, setUsername] = useState("");

  const plusTemp = () => {
    socket.emit("plusTemp", { name, room: "air" });
  };

  const minusTemp = () => {
    socket.emit("minusTemp", { name, room: "air" });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinAir", { name, room: "air" }, () => {});

      socket.on("initTemp", (temp) => {
        setTemp(temp);
      });

      return () => {
        socket.off("joinAir", () => {
          console.log("joinAir event off");
        });
      };
    }
  }, [name, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("tempChange", ({ username, temp }) => {
        setTemp(temp);
        setUsername(username);
      });
    }
  }, [temp, socket]);

  return (
    <section>
      <h2>시원한 에어컨~!</h2>

      <p>온도: {temp}</p>
      <p>조작한 사람: {username}</p>

      <div>
        <button type="button" onClick={plusTemp}>
          +
        </button>
        <button type="button" onClick={minusTemp}>
          -
        </button>
      </div>
    </section>
  );
};

export default AirConditioner;
