import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";


import "./index.css";
import { BrowserRouter } from "react-router-dom";


const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
