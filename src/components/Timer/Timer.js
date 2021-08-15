import React from "react";
import icon from "../../assets/icons/timer.ico";

import "./Timer.css";
export default function Timer({ time }) {
  return (
    <div className="timer">
      <img className="timer__icon" src={icon} alt="timer icon" />
      <div className="timer__text">
        <span className="minute">{time.minute}</span>
        <span>:</span>
        <span className="second">{time.second}</span>
      </div>
    </div>
  );
}
