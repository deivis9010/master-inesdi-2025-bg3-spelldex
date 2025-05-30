import c from "classnames";
import classes from "../data/classes.json";

import styles from "./class-grid.module.css";

type CharacterClass = {
  name: string;
  slug: string;
};

export function ClassGrid() {
  return (
    <div className={styles.classGrid}>
      {classes.map((cls: CharacterClass) => (
        <ClassGridItem key={cls.slug} name={cls.name} slug={cls.slug} />
      ))}
    </div>
  );
}

function ClassGridItem({ name, slug }: CharacterClass) {
  return (
    <article className={styles.classCell}>
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
