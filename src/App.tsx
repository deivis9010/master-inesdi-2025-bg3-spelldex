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
      <div
        className={c(
          styles.spellDiagramBackground,
          highlightedClass && styles.backgroundHighlighted
        )}
      >
        <SpellDiagram hoveredClass={highlightedClass} />
      </div>

      <ClassGrid
        selectedClass={selectedClass}
        highlight={setHighlightedClass}
        onClick={setSelectedClass}
      />
    </main>
  );
}
