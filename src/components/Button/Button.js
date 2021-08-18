import PropTypes from "prop-types";

import "./Button.css";

function Button({ buttonClick, buttonText, icon }) {
  return (
    <button className="btn header-element" id="btn" onClick={buttonClick}>
      <img className="btn-icon" src={icon} alt={buttonText} />
      <span className="btn-text">{buttonText}</span>
    </button>
  );
}

Button.propTypes = {
  buttonClick: PropTypes.func,
  buttonText: PropTypes.string,
  icon: PropTypes.string,
};

export default Button;
