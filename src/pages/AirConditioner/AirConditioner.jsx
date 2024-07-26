import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSocketContext } from "../../context/SocketContext";
import ControlButton from "./components/ControlButton/ControlButton";

import { TbTemperatureCelsius } from "react-icons/tb";
import { TbWindmill } from "react-icons/tb";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa6";
import { IoChevronUpOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";

import beepSound from "../../assets/sound/beep.mov";

import "./AirConditioner.css";

const WIND_STRENGTH_ARR = ["weak", "normal", "strong"];

const AirConditioner = () => {
  const { socket } = useSocketContext();

  const { search } = useLocation();
  const { name } = queryString.parse(search);

  const [temp, setTemp] = useState(0);
  const [username, setUsername] = useState("");

  const [mute, setMute] = useState(false);
  const [strength, setStrength] = useState(1);

  const beepAudio = useRef();

  const plusTemp = () => {
    socket.emit("plusTemp", { name, room: "air" });
  };

  const minusTemp = () => {
    socket.emit("minusTemp", { name, room: "air" });
  };

  const toggleMute = () => {
    setMute((prev) => !prev);
  };

  const turnUp = () => {
    if (strength >= 2) return;

    setStrength(strength + 1);
  };

  const turnDown = () => {
    if (strength <= 0) return;

    setStrength(strength - 1);
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

  useEffect(() => {
    if (mute) return;

    playAudio(beepAudio.current);
  }, [temp, strength, mute]);

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
            <p className="visually-hidden">
              바람세기: {WIND_STRENGTH_ARR[strength]}
            </p>
            <TbWindmill className={`windmill ${WIND_STRENGTH_ARR[strength]}`} />
            {".".repeat(strength + 1)}
          </div>

          <hr />

          <div className="screen-owner">
            <p>조작한 사람: {username}</p>
          </div>

          <hr />

          <div className="screen-tag">
            <span className="tag">냉방</span>
            {mute && <strong className="tag tag-black">무풍</strong>}
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

            <ControlButton small={true} clickEventHandler={toggleMute}>
              무풍
            </ControlButton>
          </div>

          <div className="button-box">
            <p className="text second">바람</p>

            <ControlButton order="first" clickEventHandler={turnUp}>
              <IoChevronUpOutline />
            </ControlButton>

            <ControlButton order="third" clickEventHandler={turnDown}>
              <IoChevronDownOutline />
            </ControlButton>
          </div>
        </section>

        <div className="logo">
          <FaReact />
          REACT
        </div>
      </div>

      <audio ref={beepAudio} src={beepSound} paused />
    </section>
  );
};

export default AirConditioner;

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}
