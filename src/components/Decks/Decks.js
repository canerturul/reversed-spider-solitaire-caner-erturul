import React from "react";

import Card from "../Card/Card";
import EmptyDeck from "../EmptyDeck/EmptyDeck";

import "./Decks.css";

export default function Decks({ game, selectCard }) {
  return (
    <div className="decks">
      {game.decks.slice(0, 10).map((deck, index) => (
        <>
          {deck.length === 0 ? (
            <div
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
            <div key={index + " 1"}>
              {deck.map((card, key) => (
                <div
                  key={`${card.rank}${card.deck}`}
                  id={`${card.rank}${card.deck}`}
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
                    key={`${card.rank} ${card.deck}`}
                    card={card}
                    isSelected={card.isSelected}
                    isDown={card.isDown}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
