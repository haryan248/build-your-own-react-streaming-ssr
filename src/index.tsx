import React from "react";
import { hydrateRoot } from "react-dom/client";

import App from "./client";

const rootElement = document.getElementById("root");

if (rootElement) {
  hydrateRoot(rootElement, <App />);
}
