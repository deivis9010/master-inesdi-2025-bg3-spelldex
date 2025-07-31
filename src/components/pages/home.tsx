import React, { useState } from 'react'
import { ClassId } from 'src/models/character-class';
import { ClassGrid } from '../class-grid';
import { SpellDiagram } from '../spell-diagram';
import styles from "./home.module.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [selectedClass, setSelectedClass] = useState<ClassId>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();
  const background = selectedClass ? "classGrid" : "spellDiagram";
  const navigate = useNavigate();
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

  
  

  const handleClassClick = (classId: ClassId | undefined) => {
    setSelectedClass(classId);
    if (classId) {
      navigate(`/class/${classId}`);
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
        onClick={handleClassClick}
      />
    </main>
  );
}
