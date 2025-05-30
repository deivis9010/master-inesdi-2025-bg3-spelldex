import spells from "src/data/spells.json";

import type { Spell } from "src/models/spell";

import styles from "./spell-diagram.module.css";

export function SpellDiagram() {
  const spellsByLevel = groupSpellsByLevel(spells as Spell[]);

  return (
    <div className={styles.spellDiagram}>
      {Array.from({ length: 7 }, (_, level) => (
        <div key={level} className={styles.level} data-level={level}>
          {spellsByLevel[level]?.map((_, idx) => (
            <div key={idx} className={styles.dot} />
          ))}
        </div>
      ))}
    </div>
  );
}

function groupSpellsByLevel(spells: Spell[]) {
  return spells.reduce((acc, spell) => {
    if (!acc[spell.level]) {
      acc[spell.level] = [];
    }
    acc[spell.level].push(spell);
    return acc;
  }, {} as Record<number, Spell[]>);
}
