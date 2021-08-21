import React from "react";
import PropTypes from "prop-types";

import { Fireworks } from "fireworks-js/dist/react";

import "./GameOver.css";

function GameOver({ score, restartGame }) {
  return (
    <div>
      <Fireworks
        style={{
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
      />
      <div className="modal">
        <span className="modal-title">Congratilations YOU WIN!</span>
        <div className="modal-score">
          <span>SCORE : </span> <span>{score}</span>
        </div>

        <button className="new-game" onClick={restartGame}>
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
