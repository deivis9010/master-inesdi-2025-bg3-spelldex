import c from "classnames";
import spellsByClass from "src/data/spells-by-class.json";
import spells from "src/data/spells.json";

import type { ClassId, SellsByClass } from "src/models/character-class";
import type { Spell, SpellId } from "src/models/spell";

import styles from "./spell-diagram.module.css";

type Props = {
  selectedClass: ClassId | undefined;
  highlightedClass: ClassId | undefined;
};

export function SpellDiagram({ highlightedClass }: Props) {
  const spellsByLevel = groupSpellsByLevel(spells as Spell[]);
  const highlightedSpells = highlightedClass
    ? new Set((spellsByClass as SellsByClass)[highlightedClass])
    : new Set<SpellId>();

  const isSpellHighlighted = (spell: Spell) =>
    highlightedClass && highlightedSpells.has(spell.id);

  return (
    <div
      className={c(styles.spellDiagram, highlightedClass && styles.highlighted)}
    >
      {Array.from({ length: 7 }, (_, level) => {
        const { firstHalf, secondHalf } = twoRows(spellsByLevel[level]);

        return (
          <div key={level} className={styles.levelGroup} data-level={level}>
            <div className={styles.row}>
              {firstHalf.map((spell, idx) => (
                <Spell
                  key={`${level}-1-${idx}`}
                  spell={spell}
                  highlighted={isSpellHighlighted(spell)}
                />
              ))}
            </div>
            <div className={styles.row}>
              {secondHalf.map((spell, idx) => (
                <Spell key={`${level}-2-${idx}`} spell={spell} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function twoRows(spells: Spell[] = []) {
  const half = Math.ceil(spells.length / 2);
  return {
    firstHalf: spells.slice(0, half),
    secondHalf: spells.slice(half),
  };
}

function Spell({ highlighted }: { spell: Spell; highlighted?: boolean }) {
  const animatedSpellStyles = {
    "--randomDelay": (Math.random() * 3 + 1).toFixed(2) + "s",
    "--randomDuration": (Math.random() * 4 + 2).toFixed(2) + "s",
  } as React.CSSProperties;

  return (
    <div
      className={c(styles.dot, highlighted && styles.highlighted)}
      style={animatedSpellStyles}
    />
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
