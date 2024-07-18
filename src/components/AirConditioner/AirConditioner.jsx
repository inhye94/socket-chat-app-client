import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import queryString from "query-string";

import "./AirConditioner.css";

const END_POINT = "http://localhost:8080/";
let socket = io(END_POINT);

const AirConditioner = () => {
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
    socket.emit("joinAir", { name, room: "air" }, () => {});

    socket.on("initTemp", (temp) => {
      setTemp(temp);
    });

    return () => {
      socket.off("joinTemp", () => {
        console.log("JoinTemp event off");
      });
    };
  }, [name]);

  useEffect(() => {
    socket.on("tempChange", ({ username, temp }) => {
      setTemp(temp);
      setUsername(username);
    });
  }, [temp]);

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
