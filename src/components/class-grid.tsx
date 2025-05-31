import c from "classnames";
import * as React from "react";
import { ACCENT_COLOR, DEFAULT_ACCENT_COLOR } from "src/data/accent-colors";
import classesJson from "src/data/classes.json";

import type { CharacterClass, ClassId } from "src/models/character-class";

import styles from "./class-grid.module.css";

type Props = {
  onClick: (c: CharacterClass) => void;
  highlight: (c: ClassId | undefined) => void;
  highlightedClass?: ClassId;
};

export function ClassGrid({ highlight, onClick, highlightedClass }: Props) {
  return (
    <section className={styles.classGrid} aria-label="Class Grid">
      {(classesJson as CharacterClass[]).map((cls) => (
        <ClassGridItem
          key={cls.slug}
          name={cls.name}
          slug={cls.slug}
          highlight={highlight}
          onClick={() => onClick(cls)}
          highlighted={highlightedClass === cls.slug}
        />
      ))}
    </section>
  );
}

type ItemProps = {
  name: string;
  slug: ClassId;
  highlighted?: boolean;
  onClick?: () => void;
  highlight?: (c: ClassId | undefined) => void;
};

export function ClassGridItem({ name, slug, highlighted, highlight, onClick }: ItemProps) {
  const accentColor = ACCENT_COLOR[slug];

  // Set accent color if highlighted prop is true
  React.useEffect(() => {
    if (highlighted && accentColor) {
      document.documentElement.style.setProperty("--accent", accentColor);
      return () => {
        document.documentElement.style.setProperty("--accent", DEFAULT_ACCENT_COLOR);
      };
    }
  }, [highlighted, accentColor]);

  const mouseEnter = () => {
    if (highlighted || !highlight) return;

    if (accentColor) {
      document.documentElement.style.setProperty("--accent", accentColor);
    }
    highlight(slug);
  };

  const mouseLeave = () => {
    if (highlighted || !highlight) return;

    document.documentElement.style.setProperty(
      "--accent",
      DEFAULT_ACCENT_COLOR
    );
    highlight(undefined);
  };

  return (
    <article
      className={c(styles.classCell, { [styles.highlighted]: highlighted })}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={onClick}
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
