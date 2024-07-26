import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSocketContext } from "../../context/SocketContext";
import ControlButton from "./components/ControlButton/ControlButton";

import { TbTemperatureCelsius, TbWindmill } from "react-icons/tb";
import { LuPlus, LuMinus } from "react-icons/lu";
import { FaPowerOff, FaReact } from "react-icons/fa6";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

import beepSound from "../../assets/sound/beep.mov";

import "./AirConditioner.css";

const WIND_STRENGTH_ARR = ["weak", "normal", "strong"];

const AirConditioner = () => {
  const { socket } = useSocketContext();

  const { search } = useLocation();
  const { name } = queryString.parse(search);
  const room = "air";

  const [temp, setTemp] = useState(20);
  const [username, setUsername] = useState("");

  const [mute, setMute] = useState(false);
  const [strength, setStrength] = useState(1);

  const beepAudio = useRef();

  const plusTemp = () => {
    if (!mute) playAudio(beepAudio.current);

    if (temp >= 30) return;

    socket.emit("changeTemp", { name, room, temp: temp + 1 });
    setTemp(temp + 1);
  };

  const minusTemp = () => {
    if (!mute) playAudio(beepAudio.current);

    if (temp <= 0) return;

    socket.emit("changeTemp", { name, room, temp: temp - 1 });
    setTemp(temp - 1);
  };

  const toggleMute = () => {
    if (!mute) playAudio(beepAudio.current);

    socket.emit("toggleMute", { name, room, mute: !mute });
    setMute(!mute);
  };

  const turnUp = () => {
    if (!mute) playAudio(beepAudio.current);

    if (strength >= 2) return;

    socket.emit("changeStrength", { name, room, strength: strength + 1 });
    setStrength(strength + 1);
  };

  const turnDown = () => {
    if (!mute) playAudio(beepAudio.current);

    if (strength <= 0) return;

    socket.emit("changeStrength", { name, room, strength: strength - 1 });
    setStrength(strength - 1);
  };

  // NOTE: 초기화
  useEffect(() => {
    if (socket) {
      socket.emit("joinAir", { name, room }, () => {});

      socket.on("initTemp", setTemp);
      socket.on("initMute", setMute);
      socket.on("initStrength", setStrength);
      socket.on("initUsername", setUsername);
    }
  }, [name, socket]);

  // NOTE: 다른 유저의 변경값 수신
  useEffect(() => {
    if (socket) {
      const broadcastHandlers = {
        broadcastTemp: ({ username, temp }) => {
          setTemp(temp);
          setUsername(username);
        },
        broadcastMute: ({ username, mute }) => {
          setMute(mute);
          setUsername(username);
        },
        broadcastStrength: ({ username, strength }) => {
          setStrength(strength);
          setUsername(username);
        },
      };

      Object.keys(broadcastHandlers).forEach((event) => {
        socket.on(event, broadcastHandlers[event]);
      });

      return () => {
        socket.off("joinAir", () => {
          console.log("joinAir event off");
        });
      };
    }
  }, [socket]);

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

      <audio ref={beepAudio} src={beepSound} />
    </section>
  );
};

export default AirConditioner;

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}
