import React from "react";
import PropTypes from "prop-types";

import { Fireworks } from "fireworks-js/dist/react";
import "./GameOver.css";

function GameOver({ score, restartGame }) {
  const fireworksStyle = {
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
  };
  const onRestartClick = () => {
    restartGame();
  };

  return (
    <div>
      <Fireworks style={fireworksStyle} />
      <div className="modal">
        <span className="modal-title">Congratilations YOU WIN!</span>
        <div className="modal-score">
          <span>SCORE : </span> <span>{score}</span>
        </div>

        <button className="new-game" onClick={onRestartClick}>
          NEW GAME
        </button>
      </div>
      <div className="modal-bg"></div>
    </div>
  );
}

GameOver.propTypes = {
  score: PropTypes.number,
  restartGame: PropTypes.func,
};
export default GameOver;
