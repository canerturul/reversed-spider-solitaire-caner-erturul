import React from "react";

import "./ErrorFallback.css";

export default function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
    </div>
  );
}
