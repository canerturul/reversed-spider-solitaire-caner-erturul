import React, { useState, useEffect } from "react";
import { prepareCards } from "../logic/prepare-cards";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import SetArea from "../components/SetArea/SetArea";
import { selectCard } from "../logic/select-card";
import { distributeCards } from "../logic/distribute-card";
import EmptyDeck from "../components/EmptyDeck/EmptyDeck";

import "./Home.css";

export default function Home() {
  const [cards, setcards] = useState({});

  const [game, setgame] = useState({
    cards: [],
    decks: [],
    selected: [],
    selectedDeck: [],
    selectedCard: "",
    completedSets: [],
    completedSetNumber: 1,
    totalSet: 8,
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
          <div
            className="dealt-cards"
            onClick={() => {
              distributeCards(game, setgame);
            }}
          >
            {game.decks[10] &&
              game.decks[10].length > 0 &&
              game.decks[10].map((deck, index) => (
                <div key={index} className="card dealt-cards__down"></div>
              ))}
          </div>
          <div className="set-area">
            {[...Array(game.totalSet)].map((a, index) => {
              return index < game.completedSetNumber ? (
                <Card
                  key={index}
                  card={{ rank: "A", suit: "heart" }}
                  isSelected={false}
                  isDown={false}
                />
              ) : (
                <SetArea key={index} />
              );
            })}
          </div>
        </div>

        <div className="game-cards">
          {game.decks.slice(0, 10).map((deck, index) => (
            <>
              {deck.length === 0 ? (
                <div
                  onClick={() => {
                    selectCard("", deck, true, game, setgame);
                  }}
                >
                  <EmptyDeck key={index} />
                </div>
              ) : (
                <div key={index + " 1"} deck={deck}>
                  {deck.map((card, key) => (
                    <div
                      key={card.rank + " " + card.suit + " " + card.deck + " 0"}
                      id={card.rank + " " + card.suit + " " + card.deck}
                      className="card__wrapper card__stack"
                      onClick={(e) => {
                        selectCard(card, deck, null, game, setgame);
                      }}
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
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
