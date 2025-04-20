import { hydrateRoot } from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>This contents is rendered on the browser!</p>
    </div>
  );
}

const rootEl = document.getElementById("root");

if (rootEl) {
  hydrateRoot(rootEl, <App />);
}
