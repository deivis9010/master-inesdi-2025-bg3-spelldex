import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ClassId } from "../models/character-class";
import { CLASS_IDS } from "../models/character-class";

function isValidClassId(id: string): id is ClassId {
  return CLASS_IDS.includes(id as ClassId);
}

export function useHomeNavigation() {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId?: string }>();
  const [highlightedClass, setHighlightedClass] = useState<ClassId>();
  
 
  
  const selectedClass = classId && isValidClassId(classId) ? classId : undefined;
  const background = selectedClass ? "classGrid" : "spellDiagram";

  useEffect(() => {
    if (classId && !isValidClassId(classId)) {
      navigate("/not-found");
    }
  }, [classId, navigate]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Backspace") {
      event.preventDefault();

      if (classId) {
        navigate("/");
      } else {
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

  return {
    selectedClass,
    highlightedClass,
    background,
    setHighlightedClass,
    onKeyDown,
    handleClassClick
  };
}
