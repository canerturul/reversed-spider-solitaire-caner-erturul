import React, { useEffect } from "react";

import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import EmptyDeck from "../components/EmptyDeck/EmptyDeck";
import GameOver from "../components/GameOver/GameOver";

import useCreateGame from "../hooks/useCreateGame";

import "./Home.css";

export default function Home() {
  const { game, selectCard, restartGame, distributeCards, undoGame } =
    useCreateGame();

  useEffect(() => {
    const checkBestScore = () => {
      const bestScore = +localStorage.getItem("bestScore");
      const gameScore = game.score;
      if (!bestScore || bestScore < gameScore) {
        localStorage.setItem("bestScore", gameScore);
      }
    };
    checkBestScore();
  }, [game.score]);

  return (
    <div className="home">
      <Header
        game={game}
        onRestartClick={restartGame}
        onUndoGameClick={undoGame}
      />
      <div className="game-area">
        <div className="game-top">
          <div
            className="dealt-cards"
            onClick={() => {
              distributeCards();
            }}
          >
            {game.decks[10] &&
              game.decks[10].length > 0 &&
              game.decks[10].map((deck, index) => (
                <div key={index} className="card dealt-cards-down"></div>
              ))}
          </div>
          <div className="set-area">
            {[...Array(game.totalSet)].map((set, index) => {
              return index < game.completedSetNumber ? (
                <Card
                  key={index}
                  card={{ rank: "A", suit: "heart" }}
                  isSelected={false}
                  isDown={false}
                />
              ) : (
                <EmptyDeck key={index} />
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
      </div>
      {game.completedSetNumber === game.totalSet && (
        <GameOver score={game.score} restartGame={restartGame} />
      )}
    </div>
  );
}
