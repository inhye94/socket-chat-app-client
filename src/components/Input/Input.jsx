import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            sendMessage(event);
          }
        }}
      />
      <button
        className="sendButton"
        onClick={(event) => event.preventDefault()}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
