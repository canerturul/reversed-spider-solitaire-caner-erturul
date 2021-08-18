import PropTypes from "prop-types";

import Timer from "../Timer/Timer";

import restartIcon from "../../assets/icons/restart.ico";
import scoreIcon from "../../assets/icons/trophy-64.ico";
import bestScoreIcon from "../../assets/icons/chess.ico";
import undoIcon from "../../assets/icons/undo.ico";

import useTimer from "../../hooks/useTimer";

import "./Header.css";

function Header({ game, onRestartClick, onUndoGameClick }) {
  const { time, resetTimer } = useTimer();

  const onRestartButtonClick = () => {
    resetTimer();
    onRestartClick();
  };
  const bestScore = +localStorage.getItem("bestScore");

  return (
    <div className="header">
      <Timer time={time} className="header-element" />
      <div className="best-score header-element">
        <img className="icon" src={bestScoreIcon} alt="Best Score Icon" />
        <span className="best-score-text">{bestScore}</span>
      </div>

      <div className="score header-element">
        <img className="icon" src={scoreIcon} alt="score icon" />
        <span className="text">{game.score}</span>
      </div>

      <h1 className="title">Spider Solitare</h1>

      <button
        className="restart-btn header-element"
        id="restart"
        onClick={onRestartButtonClick}
      >
        <img className="icon" src={restartIcon} alt="restart" />
        <span className="text">Restart</span>
      </button>
      <button
        className="undo-btn header-element"
        id="undo"
        onClick={onUndoGameClick}
      >
        <img className="icon" src={undoIcon} alt="restart" />
        <span className="text">Undo</span>
      </button>
    </div>
  );
}

Header.propTypes = {
  game: PropTypes.object,
  setgame: PropTypes.func,
  onRestartClick: PropTypes.func,
};

export default Header;
