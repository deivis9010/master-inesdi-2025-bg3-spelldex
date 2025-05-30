import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";

import styles from "./app.module.css";

export function App() {
  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <SpellDiagram />
      </div>
      <ClassGrid />
    </main>
  );
}
