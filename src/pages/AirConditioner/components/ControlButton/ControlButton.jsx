import classNames from "classnames";
import React from "react";

import "./ControlButton.css";

const ControlButton = ({
  children,
  order,
  power,
  small,
  clickEventHandler,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "control-button first",
        order,
        power && "orange-button",
        small && "text-small"
      )}
      onClick={clickEventHandler}
    >
      {children}
    </button>
  );
};

export default ControlButton;
