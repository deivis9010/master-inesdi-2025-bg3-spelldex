import { Navigate } from "react-router-dom";
import { ClassGrid } from "./class-grid";
import { SpellDiagram } from "./spell-diagram";
import { useHomeNavigation } from "../hooks/use-home-navigation";
import styles from "./home.module.css";

export function Home() {
  const {
    selectedClass,
    highlightedClass,
    background,
    isInvalid,
    setHighlightedClass,
    onKeyDown,
    handleClassClick
  } = useHomeNavigation();

  // Redirección declarativa para clases inválidas
  if (isInvalid) {
    return <Navigate to="/not-found" replace />;
  }

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
        onClick={handleClassClick}
      />
    </main>
  );
}