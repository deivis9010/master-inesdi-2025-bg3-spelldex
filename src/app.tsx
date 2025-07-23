import { useState } from "react";
import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";

import type { ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const [selectedClass, setSelectedClass] = useState<ClassId>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();
  const background = selectedClass ? "classGrid" : "spellDiagram";

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.key === "Escape" || event.key === "Backspace") &&
      selectedClass
    ) {
      event.preventDefault();
      setSelectedClass(undefined);
      setHighlightedClass(undefined);
      return;
    }
  };

  return (
    <main className={styles.main} onKeyDown={onKeyDown}>
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
