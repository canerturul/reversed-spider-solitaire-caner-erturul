import React from "react";

import PropTypes from "prop-types";

import Card from "../Card/Card";
import EmptyDeck from "../EmptyDeck/EmptyDeck";

import "./Decks.css";

function Decks({ game, selectCard }) {
  return (
    <div className="decks">
      {game.decks.slice(0, 10).map((deck, index) => (
        <div key={index}>
          {deck.length === 0 ? (
            <div
              data-testid="empty-deck"
              key={index}
              onClick={() => {
                selectCard("", deck, true);
              }}
              draggable={true}
              onDragStart={() => selectCard("", deck, true)}
              onDrop={() => selectCard("", deck, true)}
              onDragOver={(e) => e.preventDefault()}
            >
              <EmptyDeck key={index} />
            </div>
          ) : (
            <div key={index}>
              {deck.map((card, index) => (
                <div
                  data-testid="my-card"
                  key={`${card.rank}-${card.deck}-${index}`}
                  id={`${card.rank}-${card.deck}-${index}`}
                  className="card-wrapper card-stack"
                  onClick={(e) => {
                    selectCard(card, deck, null);
                  }}
                  draggable={true}
                  onDragStart={() => selectCard(card, deck, null)}
                  onDrop={() => selectCard(card, deck, null)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Card
                    id={`${card.rank}-${card.deck}`}
                    key={`${card.rank}-${card.deck}`}
                    card={card}
                    isSelected={card.isSelected}
                    isDown={card.isDown}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

Decks.propTypes = {
  game: PropTypes.object,
  selectCard: PropTypes.func,
};
export default Decks;
