import React from "react";

import PropTypes from "prop-types";

import "./ErrorFallback.css";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
};

export default ErrorFallback;
