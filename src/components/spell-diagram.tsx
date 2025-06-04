import c from "classnames";
import spellsByClass from "src/data/spells-by-class.json";
import spells from "src/data/spells.json";

import type { ClassId, SellsByClass } from "src/models/character-class";
import type { Spell, SpellId } from "src/models/spell";

import styles from "./spell-diagram.module.css";

type Props = {
  selectedClass: ClassId | undefined;
  highlightedClass: ClassId | undefined;
  background?: boolean;
};

export function SpellDiagram({
  highlightedClass,
  selectedClass,
  background,
}: Props) {
  const spellsByLevel = groupSpellsByLevel(spells as Spell[]);
  const status = selectedClass
    ? "selected"
    : highlightedClass
    ? "highlighted"
    : "none";

  const currentClass = selectedClass || highlightedClass;
  const highlightedSpells = currentClass
    ? new Set((spellsByClass as SellsByClass)[currentClass])
    : new Set<SpellId>();

  const isSpellHighlighted = (spell: Spell) =>
    highlightedClass && highlightedSpells.has(spell.id);

  const isSpellDetailed = (spell: Spell) =>
    selectedClass && highlightedSpells.has(spell.id);

  return (
    <div
      className={c(
        styles.spellDiagram,
        background && styles.background,
        status === "selected" && styles.selected,
        status === "highlighted" && styles.highlighted
      )}
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
                  detailed={isSpellDetailed(spell)}
                />
              ))}
            </div>
            <div className={styles.row}>
              {secondHalf.map((spell, idx) => (
                <Spell
                  key={`${level}-2-${idx}`}
                  spell={spell}
                  highlighted={isSpellHighlighted(spell)}
                  detailed={isSpellDetailed(spell)}
                />
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

function Spell({
  spell,
  highlighted,
  detailed,
}: {
  spell: Spell;
  highlighted: boolean | undefined;
  detailed: boolean | undefined;
}) {
  const animatedSpellStyles = {
    "--randomDelay": (Math.random() * 2 + 1).toFixed(2) + "s",
    "--randomDuration": (Math.random() + 0.5).toFixed(2) + "s",
  } as React.CSSProperties;

  return (
    <article
      className={c(
        styles.dot,
        highlighted && !detailed && styles.highlighted,
        detailed && styles.detailed
      )}
      data-spell-id={spell.id}
      style={animatedSpellStyles}
      aria-label={spell.name}
    >
      {detailed && (
        <img src={spell.icon} alt={spell.name} className={styles.icon} />
      )}
    </article>
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
