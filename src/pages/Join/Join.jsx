import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const ROOM_SPECIFIC_AIR = "air";
const ROOM_COUNT = 5;
const roomArray = Array.from({ length: ROOM_COUNT }, (_, i) => `room${i + 1}`);
roomArray.unshift(ROOM_SPECIFIC_AIR);

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(roomArray[0]);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
          />
        </div>
        <div>
          <select
            className="joinInput mt-20"
            onChange={(event) => setRoom(event.currentTarget.value)}
          >
            {roomArray.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <Link
          className="button mt-20"
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Join;
