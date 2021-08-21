import React from "react";

import PropTypes from "prop-types";

import Card from "../Card/Card";
import EmptyDeck from "../EmptyDeck/EmptyDeck";

import "./Decks.css";

function Decks({
  game,
  selectCard,
  moveOperations,
  moveOperationsForEmptyDeck,
}) {
  const handleCardOperations = (card, deck) => {
    if (game.selectedCard) {
      moveOperations(card, deck);
    } else {
      selectCard(card, deck);
    }
  };
  const handleEmptyDeckOperatios = (deck) => {
    if (game.selectedCard) {
      moveOperationsForEmptyDeck(deck);
    } else {
      return;
    }
  };

  return (
    <div className="decks">
      {game.decks.slice(0, 10).map((deck, index) => (
        <div key={index}>
          {deck.length === 0 ? (
            <div
              data-testid="empty-deck"
              key={index}
              onClick={() => {
                handleEmptyDeckOperatios(deck);
              }}
              draggable={true}
              onDragStart={() => handleEmptyDeckOperatios(deck)}
              onDrop={() => handleEmptyDeckOperatios(deck)}
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
                    handleCardOperations(card, deck);
                  }}
                  draggable={true}
                  onDragStart={() => handleCardOperations(card, deck)}
                  onDrop={() => handleCardOperations(card, deck)}
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
