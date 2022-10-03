import React from "react";
import ReactDOM from "react-dom/client";

import "./i18n";
import "css/global.css";
import "css/leaflet.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
