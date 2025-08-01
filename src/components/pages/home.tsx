import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ClassId } from "../../models/character-class";
import { CLASS_IDS } from "../../models/character-class";
import { ClassGrid } from "../class-grid";
import { SpellDiagram } from "../spell-diagram";
import styles from "./home.module.css";

function isValidClassId(id: string): id is ClassId {
  return CLASS_IDS.includes(id as ClassId);
}

export function Home() {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId?: string }>();
  
  const [selectedClass, setSelectedClass] = useState<ClassId | undefined>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();
  const background = selectedClass ? "classGrid" : "spellDiagram";

  
  useEffect(() => {
    if (classId && isValidClassId(classId)) {
      setSelectedClass(classId);
    } else if (classId && !isValidClassId(classId)) {
      navigate("/not-found");
    } else {
     
      setSelectedClass(undefined);
    }
  }, [classId, navigate]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.key === "Escape" || event.key === "Backspace") &&
      selectedClass
    ) {
      event.preventDefault();
      
     
      if (classId) {
        navigate("/");
      } else {
        // Si estamos en home, solo limpiar estado
        setSelectedClass(undefined);
        setHighlightedClass(undefined);
      }
      return;
    }
  };

  const handleClassClick = (newClassId: ClassId | undefined) => {
    if (newClassId) {
      navigate(`/classes/${newClassId}`);
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