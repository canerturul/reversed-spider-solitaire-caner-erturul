import React from "react";

import "./CardPile.css";

export default function CardPile({ game, distributeCards }) {
  return (
    <div
      className="card-pile"
      onClick={() => {
        distributeCards();
      }}
    >
      {game.decks[10] &&
        game.decks[10].length > 0 &&
        game.decks[10].map((deck, index) => (
          <div key={index} className="card card-pile-down"></div>
        ))}
    </div>
  );
}
