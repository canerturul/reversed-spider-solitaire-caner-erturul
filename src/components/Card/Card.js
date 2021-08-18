import PropTypes from "prop-types";
import classNames from "classnames";
import "./Card.css";

function Card({ card, isSelected, isDown }) {
  const symbol = "♥";
  return (
    <div
      className={classNames(
        "card",
        isDown ? "card-down" : card.suit,
        isSelected && "card-selected"
      )}
    >
      <div className="card-content card-rank-left">
        {card.rank}
        <div className="card-content card-suite-left">{symbol}</div>
      </div>
      <div className="card-content card-rank-right">
        {card.rank}
        <div className="card-content card-suite-right">{symbol}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  isSelected: PropTypes.bool,
  isDown: PropTypes.bool,
};

export default Card;
