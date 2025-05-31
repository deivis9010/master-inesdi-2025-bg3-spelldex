import c from "classnames";
import spellsByClass from "src/data/spells-by-class.json";
import spells from "src/data/spells.json";

import type { ClassId, SellsByClass } from "src/models/character-class";
import type { Spell, SpellId } from "src/models/spell";

import styles from "./spell-diagram.module.css";

type Props = {
  hoveredClass: ClassId | null;
};

export function SpellDiagram({ hoveredClass }: Props) {
  const spellsByLevel = groupSpellsByLevel(spells as Spell[]);
  const highlightedSpells = hoveredClass
    ? new Set((spellsByClass as SellsByClass)[hoveredClass])
    : new Set<SpellId>();

  const isSpellHighlighted = (spell: Spell) =>
    hoveredClass && highlightedSpells.has(spell.id);

  return (
    <div className={styles.spellDiagram}>
      {Array.from({ length: 7 }, (_, level) => (
        <div key={level} className={styles.level} data-level={level}>
          {spellsByLevel[level]?.map((spell, idx) => (
            <div
              key={idx}
              className={c(
                styles.dot,
                isSpellHighlighted(spell) && styles.highlighted
              )}
            />
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
