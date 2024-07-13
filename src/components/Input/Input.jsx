import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(event);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
      <button type="submit" className="sendButton">
        Send
      </button>
    </form>
  );
};

export default Input;
