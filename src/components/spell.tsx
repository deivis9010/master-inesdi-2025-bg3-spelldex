import c from "classnames";
import { useEffect, useMemo, useState } from "react";

import type { Spell } from "src/models/spell";

import styles from "./spell.module.css";

export function Spell({
  spell,
  highlighted,
  detailed,
}: {
  spell: Spell;
  highlighted: boolean | undefined;
  detailed: boolean | undefined;
}) {
  const [showImage, setShowImage] = useState(false);
  const randomDuration = useMemo(() => (Math.random() + 0.5).toFixed(2), []);
  const randomDelay = useMemo(() => (Math.random() * 2 + 1).toFixed(2), []);

  const animatedSpellStyles = {
    "--randomDelay": randomDelay + "s",
    "--randomDuration": randomDuration + "s",
  } as React.CSSProperties;

  useEffect(
    function setShowImageWhenTransitionEnds() {
      if (detailed) {
        const transitionTime =
          (parseFloat(randomDuration) + parseFloat(randomDelay)) * 1000;

        const timer = setTimeout(() => {
          setShowImage(true);
        }, transitionTime);

        return () => {
          clearTimeout(timer);
          setShowImage(false);
        };
      } else {
        setShowImage(false);
      }
    },
    [detailed, randomDuration, randomDelay]
  );

  return (
    <article
      className={c(
        styles.spell,
        highlighted && !detailed && styles.highlighted,
        detailed && styles.detailed
      )}
      data-spell-id={spell.id}
      style={animatedSpellStyles}
      aria-label={spell.name}
    >
      {detailed && showImage && (
        <img src={spell.icon} alt={spell.name} className={styles.icon} />
      )}
    </article>
  );
}
