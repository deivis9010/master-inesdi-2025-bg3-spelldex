import c from "classnames";
import { useState } from "react";
import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";

import type { ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const [selectedClass, setSelectedClass] = useState<ClassId>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();

  return (
    <main className={styles.main}>
      {/* Spell diagram appears first in the DOM for better accessibility when active */}
      <SpellDiagram
        highlightedClass={highlightedClass}
        selectedClass={selectedClass}
      />

      {/* Class grid gets backgrounded when a class is selected */}
      <div
        className={c(
          styles.classGridWrapper,
          selectedClass && styles.backgrounded
        )}
      >
        <ClassGrid
          selectedClass={selectedClass}
          highlight={setHighlightedClass}
          onClick={setSelectedClass}
        />
      </div>
    </main>
  );
}
