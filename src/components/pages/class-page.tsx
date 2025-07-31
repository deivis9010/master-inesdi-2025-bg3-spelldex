import { useParams } from "react-router-dom";
import type { ClassId } from "../../models/character-class";
import { CLASS_IDS } from "../../models/character-class";
import { SpellDiagram } from "../spell-diagram";
import { ClassGrid } from "../class-grid";



export function ClassPage() {
  const { classId } = useParams<{ classId: string }>();
  
    


  
  //En caso de que se escriba por url un id de clase que no existe
  if (!classId || !isValidClassId(classId)) {
    return (
      <div>
        <h1>Invalid Class</h1>
        <p>The class "{classId}" is not valid.</p>
        <p>Please select a valid class from the home page.</p>
      </div>
    );
  }

  return (
    <div>
      <SpellDiagram
        highlightedClass={classId}
        selectedClass={classId}
        background={false}
      />
      <ClassGrid
        selectedClass={classId}
        background={false}
        highlight={() => {}}
        onClick={() => {}}
      />
    </div>
                
  );
}

function isValidClassId(id: string): id is ClassId {
  return CLASS_IDS.includes(id as ClassId);
}