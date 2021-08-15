import React, { useState, useEffect } from "react";

import Timer from "../Timer/Timer";

import restartIcon from "../../assets/icons/restart.ico";
import scoreIcon from "../../assets/icons/trophy-64.ico";
import BestScoreIcon from "../../assets/icons/chess.ico";

import "./Header.css";

export default function Header({ game, onRestartClick }) {
  const [time, settime] = useState({
    second: "00",
    minute: "00",
    counter: 0,
  });

  const onRestartButtonClick = () => {
    settime((prevState) => ({
      ...prevState,
      second: "00",
      minute: "00",
      counter: 0,
    }));
    onRestartClick();
  };
  const bestScore = +localStorage.getItem("bestScore");

  useEffect(() => {
    let IntervalId;

    IntervalId = setInterval(() => {
      const secondCounter = time.counter % 60;
      const minuteCounter = Math.floor(time.counter / 60);
      const computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      const computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;

      settime((prevState) => ({
        second: computedSecond,
        minute: computedMinute,
        counter: prevState.counter + 1,
      }));
    }, 1000);
    return () => {
      clearInterval(IntervalId);
    };
  }, [time.counter]);

  return (
    <div className="header">
      <Timer time={time} />
      <div className="best-score header-element">
        <img className="icon" src={BestScoreIcon} alt="Best Score Icon" />
        <span className="best-score__text">{bestScore}</span>
      </div>
      <div className="score header-element">
        <img className="icon" src={scoreIcon} alt="score icon" />
        <span className="text">{game.score}</span>
      </div>
      <button
        className="restart-btn"
        id="restart"
        onClick={onRestartButtonClick}
      >
        <img className="icon" src={restartIcon} alt="restart" />
        <span className="text">Restart</span>
      </button>
    </div>
  );
}
