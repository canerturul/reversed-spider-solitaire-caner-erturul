import PropTypes from "prop-types";

import Timer from "../Timer/Timer";

import restartIcon from "../../assets/icons/restart.ico";
import scoreIcon from "../../assets/icons/trophy-64.ico";
import bestScoreIcon from "../../assets/icons/chess.ico";
import undoIcon from "../../assets/icons/undo.ico";

import useTimer from "../../hooks/useTimer/useTimer";

import "./Header.css";
import Button from "../Button/Button";

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

      <h1 className="title">Spider Solitaire</h1>

      <Button
        data-testid="restart-button"
        buttonClick={onRestartButtonClick}
        buttonText="Restart"
        icon={restartIcon}
      />
      <Button buttonClick={onUndoGameClick} buttonText="Undo" icon={undoIcon} />
    </div>
  );
}

Header.propTypes = {
  game: PropTypes.object,
  onRestartClick: PropTypes.func,
  onUndoGameClick: PropTypes.func,
};

export default Header;
