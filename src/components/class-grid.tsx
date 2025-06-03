import classesJson from "src/data/classes.json";
import { useClickOutsideEffect } from "src/hooks/use-click-outside";
import { ClassGridItem } from "./class-item";
import { useRef } from "react";

import type { CharacterClass, ClassId } from "src/models/character-class";

import styles from "./class-grid.module.css";

type Props = {
  onClick: (c: ClassId | undefined) => void;
  highlight: (c: ClassId | undefined) => void;
  selectedClass?: ClassId;
};

const classes = classesJson as CharacterClass[];

const KEYBOARD_KEYS = [
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
  "Escape",
  "Backspace",
];

export function ClassGrid({ selectedClass, highlight, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const itemButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = selectedClass
    ? classes.filter((cls) => cls.slug === selectedClass)
    : classes;

  useClickOutsideEffect({
    ref,
    cb: () => {
      if (selectedClass) {
        onClick(undefined);
      }
    },
  });

  const currentHighlight = () => {
    return selectedClass
      ? items.findIndex((cls) => cls.slug === selectedClass)
      : Array.from(itemButtonRefs.current).findIndex(
          (ref) => ref === document.activeElement
        );
  };

  const keyDown = (event: React.KeyboardEvent) => {
    if (!document.activeElement?.classList.contains(styles.classCell)) {
      return;
    }

    if (!KEYBOARD_KEYS.includes(event.key)) {
      return;
    }

    if (
      (event.key === "Escape" || event.key === "Backspace") &&
      selectedClass
    ) {
      event.preventDefault();
      onClick(undefined);
      return;
    }

    const currentIndex = currentHighlight();
    if (currentIndex < 0) {
      return;
    }

    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = Math.min(items.length - 1, currentIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      default:
        break;
    }

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      itemButtonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      ref={ref}
      className={styles.classGrid}
      aria-label="Class Grid"
      onKeyDown={keyDown}
      role="grid"
    >
      {items.map((cls, index) => (
        <ClassGridItem
          key={cls.slug}
          name={cls.name}
          classId={cls.slug}
          selected={selectedClass === cls.slug}
          highlight={highlight}
          onClick={() => onClick(cls.slug)}
          ref={(el) => {
            if (el) {
              itemButtonRefs.current[index] = el;
              if (selectedClass === cls.slug) {
                el.focus();
              }
            } else {
              itemButtonRefs.current[index] = null;
            }

            return () => {
              itemButtonRefs.current[index] = null;
            };
          }}
        />
      ))}
    </section>
  );
}
