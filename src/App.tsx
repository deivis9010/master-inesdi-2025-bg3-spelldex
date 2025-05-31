import { useState } from "react";
import { ClassGrid, ClassGridItem } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";
import c from "classnames";

import type { CharacterClass, ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const [selectedClass, setSelectedClass] = useState<CharacterClass>();
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
      {selectedClass ? (
        <ClassGridItem highlighted {...selectedClass} />
      ) : (
        <ClassGrid highlight={setHighlightedClass} onClick={setSelectedClass} />
      )}
    </main>
  );
}
