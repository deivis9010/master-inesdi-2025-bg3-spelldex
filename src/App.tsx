import { useState } from "react";
import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";
import c from "classnames";

import type { ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const [hoveredClass, setHoveredClass] = useState<ClassId | null>(null);

  return (
    <main className={styles.main}>
      <div
        className={c(styles.background, hoveredClass && styles.backgroundHighlighted)}
      >
        <SpellDiagram hoveredClass={hoveredClass} />
      </div>
      <ClassGrid
        highlight={(c) => {
          setHoveredClass(c);
        }}
      />
    </main>
  );
}
