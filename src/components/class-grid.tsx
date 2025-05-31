import c from "classnames";
import classesJson from "src/data/classes.json";

import type { CharacterClass, ClassId } from "src/models/character-class";

import styles from "./class-grid.module.css";

type Props = {
  highlight: (c: ClassId | null) => void;
};

export function ClassGrid({ highlight }: Props) {
  return (
    <div className={styles.classGrid}>
      {(classesJson as CharacterClass[]).map((cls) => (
        <ClassGridItem
          key={cls.slug}
          name={cls.name}
          slug={cls.slug}
          highlight={highlight}
        />
      ))}
    </div>
  );
}

type ItemProps = {
  name: string;
  slug: ClassId;
  highlight: (c: ClassId | null) => void;
};

function ClassGridItem({ name, slug, highlight }: ItemProps) {
  return (
    <article
      className={styles.classCell}
      onMouseEnter={() => highlight(slug)}
      onMouseLeave={() => highlight(null)}
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
