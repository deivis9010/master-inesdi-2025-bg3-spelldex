import c from "classnames";
import { useState } from "react";
import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";

import type { ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const [selectedClass, setSelectedClass] = useState<ClassId>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();
  const background = selectedClass ? "classGrid" : "spellDiagram";

  return (
    <main className={styles.main}>
      <SpellDiagram
        highlightedClass={highlightedClass}
        selectedClass={selectedClass}
        background={background === "spellDiagram"}
      />

      <ClassGrid
        selectedClass={selectedClass}
        background={background === "classGrid"}
        highlight={setHighlightedClass}
        onClick={setSelectedClass}
      />
    </main>
  );
}
