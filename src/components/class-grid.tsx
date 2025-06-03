import c from "classnames";
import * as React from "react";
import { ACCENT_COLOR, DEFAULT_ACCENT_COLOR } from "src/data/accent-colors";
import classesJson from "src/data/classes.json";

import type { CharacterClass, ClassId } from "src/models/character-class";

import styles from "./class-grid.module.css";

type GridProps = {
  onClick: (c: ClassId | undefined) => void;
  highlight: (c: ClassId | undefined) => void;
  selectedClass?: ClassId;
};

export function ClassGrid({ selectedClass, highlight, onClick }: GridProps) {
  const classes = classesJson as CharacterClass[];
  const gridRef = React.useRef<HTMLElement>(null);
  const items = selectedClass
    ? classes.filter((cls) => cls.slug === selectedClass)
    : classes;

  React.useEffect(function cleanSelectedClassClickingOutside() {
    if (!selectedClass) return;

    const clickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        onClick(undefined);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectedClass, onClick]);

  return (
    <section ref={gridRef} className={styles.classGrid} aria-label="Class Grid">
      {items.map((cls) => (
        <ClassGridItem
          key={cls.slug}
          name={cls.name}
          slug={cls.slug}
          selected={selectedClass === cls.slug}
          highlight={highlight}
          onClick={() => onClick(cls.slug)}
        />
      ))}
    </section>
  );
}

type ItemProps = {
  name: string;
  slug: ClassId;
  selected?: boolean;
  onClick?: () => void;
  highlight?: (c: ClassId | undefined) => void;
};

function ClassGridItem({
  name,
  slug,
  selected,
  highlight,
  onClick,
}: ItemProps) {
  const accentColor = ACCENT_COLOR[slug];

  // Set accent color if highlighted prop is true
  React.useEffect(() => {
    if (selected && accentColor) {
      document.documentElement.style.setProperty("--accent", accentColor);
      return () => {
        document.documentElement.style.setProperty(
          "--accent",
          DEFAULT_ACCENT_COLOR
        );
      };
    }
  }, [selected, accentColor]);

  const mouseEnter = () => {
    if (selected || !highlight) return;

    if (accentColor) {
      document.documentElement.style.setProperty("--accent", accentColor);
    }
    highlight(slug);
  };

  const mouseLeave = () => {
    if (selected || !highlight) return;

    document.documentElement.style.setProperty(
      "--accent",
      DEFAULT_ACCENT_COLOR
    );
    highlight(undefined);
  };

  return (
    <article
      className={c(styles.classCell, { [styles.highlighted]: selected })}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={onClick}
      aria-label={name}
    >
      <div className={styles.iconWrapper}>
        <div className={c(styles.corner, styles.topLeft)} />
        <div className={c(styles.corner, styles.topRight)} />
        <div className={c(styles.corner, styles.bottomRight)} />
        <div className={c(styles.corner, styles.bottomLeft)} />
        <img
          src={`src/assets/icons/classes/${slug}.png`}
          alt={name}
          className={styles.icon}
        />
      </div>
      <span className={styles.className}>{name}</span>
    </article>
  );
}
