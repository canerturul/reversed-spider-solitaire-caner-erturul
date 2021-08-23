import React from "react";
import Button from "../../components/Button/Button";

import frontImage from "../../assets/card.png";

import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img className="front-image" src={frontImage} alt="Flip Card" />
          </div>
          <div className="flip-card-back">
            <h1 className="game-title">Spider Solitaire</h1>
            <div className="rules">
              <h2 className="rules-title">Rules</h2>
              <ul className="rule-list">
                <li>Sort the cards from "Ace" to "King"</li>
                <li>You cannot click on the faced down cards</li>
                <li>
                  You cannot add cards from the stock if there's an empty pile
                </li>
                <li>You will receive 10 points for each correct step</li>
                <li>You will receive 100 points for each "A" to "K" run</li>
              </ul>
            </div>
            <div className="start-button">
              <Link to="/home">
                <Button buttonText="Start Game"> </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
