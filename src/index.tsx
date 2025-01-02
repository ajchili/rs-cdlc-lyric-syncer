import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const $app = document.createElement("div");
const root = createRoot($app);

document.body.appendChild($app);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
