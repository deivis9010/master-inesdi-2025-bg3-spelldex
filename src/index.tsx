import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const SpellbookDemo = () => (
  <div className="spellbook">
    <span className="ornate-corner tl" />
    <span className="ornate-corner tr" />
    <span className="ornate-corner bl" />
    <span className="ornate-corner br" />
    <span className="ink-stain" />
    <h1>Grimoire of Arcane Secrets</h1>
    <h2>Chapter I: The Awakening</h2>
    <p>
      In the beginning, the world was formless and void. From the swirling mists, the first spell was cast, and light pierced the darkness.
    </p>
    <h3>Incantation</h3>
    <p>
      <em>Lux Aeterna, lumen magicae, aperi portas sapientiae.</em>
    </p>
  </div>
);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <SpellbookDemo />
    </StrictMode>
  );
}
