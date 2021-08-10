import React, { useState, useEffect } from "react";
import { prepareCards } from "../logic/prepare-cards";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import SetArea from "../components/SetArea/SetArea";

import "./Home.css";

export default function Home() {
  const [cards, setcards] = useState({});
  const [cardsets, setcardsets] = useState({
    totalSet: 8,
    sets: [],
  });
  const [game, setgame] = useState({
    cards: [],
    decks: [],
  });

  useEffect(() => {
    const initVal = prepareCards();
    setcards(() => ({ cards: initVal.cards }));
    setgame((prevState) => ({
      ...prevState,
      cards: initVal.cards,
      decks: initVal.decks,
    }));
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="game-area">
        <div className="game-top">
          <div className="dealt-cards">
            {game.decks[10] &&
              game.decks[10].length > 0 &&
              game.decks[10].map((deck, index) => (
                <div key={index} className="card dealt-cards__down"></div>
              ))}
          </div>
          <div className="set-area">
            {[...Array(cardsets.totalSet)].map((index) => {
              return <SetArea key={index} />;
            })}
          </div>
        </div>

        <div className="game-cards">
          {game.decks.slice(0, 10).map((deck, index) => (
            <div key={index + " 1"} deck={deck}>
              {deck.map((card, key) => (
                <div
                  key={card.rank + " " + card.suit + " " + card.deck + " 0"}
                  id={card.rank + " " + card.suit + " " + card.deck}
                  className="card__wrapper card__stack"
                >
                  <Card
                    key={card.rank + " " + card.suit + " " + card.deck}
                    card={card}
                    isSelected={card.isSelected}
                    isDown={card.isDown}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
