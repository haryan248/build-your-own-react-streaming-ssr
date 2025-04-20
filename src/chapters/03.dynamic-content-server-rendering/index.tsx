import { hydrateRoot } from "react-dom/client";

import App from "./client";

const rootEl = document.getElementById("root");

if (rootEl) {
  hydrateRoot(rootEl, <App />);
}
