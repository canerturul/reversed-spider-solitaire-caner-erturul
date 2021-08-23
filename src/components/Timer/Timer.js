import React from "react";
import icon from "../../assets/icons/timer.ico";
import PropTypes from "prop-types";

import "./Timer.css";
function Timer({ time }) {
  return (
    <div className="timer">
      <img className="timer__icon" src={icon} alt="timer icon" />
      <div className="timer__text">
        <span data-testid="minute-span" className="minute">
          {time.minute}
        </span>
        <span>:</span>
        <span data-testid="second-span" className="second">
          {time.second}
        </span>
      </div>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.object,
};

export default Timer;
