import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSocketContext } from "../../context/SocketContext";

import { TbTemperatureCelsius } from "react-icons/tb";
import { TbWindmill } from "react-icons/tb";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa6";
import { IoChevronUpOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";

import "./AirConditioner.css";
import ControlButton from "./components/ControlButton/ControlButton";

const AirConditioner = () => {
  const { socket } = useSocketContext();

  const { search } = useLocation();
  const { name } = queryString.parse(search);

  const [temp, setTemp] = useState(0);
  const [username, setUsername] = useState("");

  const [mute, setMute] = useState(false);

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
    <section className="outerWrapper">
      <h2>시원한 에어컨~!</h2>

      <div className="innerWrapper">
        <section className="screen">
          <div className="screen-temp">
            <strong className="temp">{temp}</strong>
            <TbTemperatureCelsius className="temp-unit" />
          </div>

          <div className="screen-strength">
            <p className="visually-hidden">바람세기:</p>
            <TbWindmill className="windmill" />
          </div>

          <hr />

          <div className="screen-owner">
            <p>조작한 사람: {username}</p>
          </div>

          <hr />

          <div className="screen-tag">
            <span className="tag">냉방</span>
          </div>
        </section>

        <section className="control">
          <div className="button-box">
            <p className="text second">온도</p>

            <ControlButton order="first" clickEventHandler={plusTemp}>
              <LuPlus />
            </ControlButton>

            <ControlButton order="third" clickEventHandler={minusTemp}>
              <LuMinus />
            </ControlButton>
          </div>

          <div className="button-box">
            <ControlButton
              power={true}
              clickEventHandler={() => {
                window.location.href = "/";
              }}
            >
              <FaPowerOff />
            </ControlButton>

            <ControlButton small={true}>무풍</ControlButton>
          </div>

          <div className="button-box">
            <p className="text second">바람</p>

            <ControlButton order="first">
              <IoChevronUpOutline />
            </ControlButton>

            <ControlButton order="third">
              <IoChevronDownOutline />
            </ControlButton>
          </div>
        </section>

        <div className="logo">
          <FaReact />
          REACT
        </div>
      </div>
    </section>
  );
};

export default AirConditioner;
