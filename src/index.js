import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import CryptoContext from "./CryptoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CryptoContext>
        <App />
      </CryptoContext>
    </Router>
  </React.StrictMode>
);
