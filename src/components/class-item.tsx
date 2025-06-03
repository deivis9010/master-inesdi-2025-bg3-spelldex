import c from "classnames";
import { useEffect } from "react";
import { ACCENT_COLOR, DEFAULT_ACCENT_COLOR } from "src/data/accent-colors";

import type { ClassId } from "src/models/character-class";

import styles from "./class-grid.module.css";

type Props = {
  name: string;
  classId: ClassId;
  selected?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  highlight: (c: ClassId | undefined) => void;
} & React.ComponentProps<"button">;

export function ClassGridItem({
  name,
  classId,
  selected,
  ref,
  highlight,
  onClick,
  onFocus,
  onBlur,
}: Props) {
  const accentColor = ACCENT_COLOR[classId];

  useEffect(
    function setAccentColorWhenSelected() {
      if (selected && accentColor) {
        document.documentElement.style.setProperty("--accent", accentColor);
        return () => {
          document.documentElement.style.setProperty(
            "--accent",
            DEFAULT_ACCENT_COLOR
          );
        };
      }
    },
    [selected, accentColor]
  );

  const applyHighlight = () => {
    if (selected) {
      return;
    }

    if (accentColor) {
      document.documentElement.style.setProperty("--accent", accentColor);
    }
    highlight(classId);
  };

  const removeHighlight = () => {
    if (selected) {
      return;
    }

    document.documentElement.style.setProperty(
      "--accent",
      DEFAULT_ACCENT_COLOR
    );
    highlight(undefined);
  };

  return (
    <button
      ref={ref}
      className={c(styles.classCell, selected && styles.highlighted)}
      tabIndex={0}
      aria-pressed={selected}
      aria-label={name}
      onMouseEnter={applyHighlight}
      onMouseLeave={removeHighlight}
      onClick={onClick}
      onFocus={(ev) => {
        applyHighlight();
        onFocus?.(ev);
      }}
      onBlur={(ev) => {
        removeHighlight();
        onBlur?.(ev);
      }}
    >
      <div className={styles.iconWrapper}>
        <div className={c(styles.corner, styles.topLeft)} />
        <div className={c(styles.corner, styles.topRight)} />
        <div className={c(styles.corner, styles.bottomRight)} />
        <div className={c(styles.corner, styles.bottomLeft)} />
        <img
          src={`src/assets/icons/classes/${classId}.png`}
          alt={name}
          className={styles.icon}
        />
      </div>
      <span className={styles.className}>{name}</span>
    </button>
  );
}
