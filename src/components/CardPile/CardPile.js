import React from "react";
import PropTypes from "prop-types";

import "./CardPile.css";

function CardPile({ game, distributeCards }) {
  return (
    <div
      className="card-pile"
      data-testid="card-pile"
      onClick={() => {
        distributeCards();
      }}
    >
      {game.decks[10] &&
        game.decks[10].length > 0 &&
        game.decks[10].map((deck, index) => (
          <div
            data-testid="pile-deck"
            key={index}
            className="card card-pile-down"
          ></div>
        ))}
    </div>
  );
}

CardPile.propTypes = {
  game: PropTypes.object,
  selectCard: PropTypes.func,
};

export default CardPile;
