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
      // Redirigir si classId es inválido
      navigate("/not-found");
    } else if (!classId) {
      // Si no hay classId (estamos en / o /classes), limpiar highlight y foco
      //bugfix: limpiar highlight y quitar foco de cualquier botón
      setHighlightedClass(undefined);
      if (document.activeElement && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [classId, navigate]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Backspace") {
      event.preventDefault();

      if (classId) {
        navigate("/");
      } else {
        // Estado inicial: limpiar highlight y quitar foco de cualquier botón
        setHighlightedClass(undefined);
        // Quitar el foco del elemento actualmente enfocado
        //bugfix: limpiar highlight y quitar foco de cualquier botón
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
      return;
    }
  };
  // Maneja el clic en una clase para navegar a su página
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
