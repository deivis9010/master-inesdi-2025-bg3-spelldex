import c from "classnames";

import styles from "./character-class.module.css";

type Props = {
  name: string;
  slug: string;
};

export function CharacterClass({ name, slug }: Props) {
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
        <div className={styles.overlay} />
      </div>
      <span className={styles.className}>{name}</span>
    </article>
  );
}
