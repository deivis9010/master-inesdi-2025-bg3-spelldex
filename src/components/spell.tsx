import c from "classnames";
import { useEffect, useMemo, useState } from "react";
import upcastIcon from "../assets/icons/other/upcast.png";
import { Tooltip } from "./tooltip";

import type { Spell } from "../models/spell";

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
  const [selected, setSelected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const randomDuration = useMemo(() => (Math.random() + 0.5).toFixed(2), []);
  const randomDelay = useMemo(() => (Math.random() * 2 + 1).toFixed(2), []);

  const animatedSpellStyles = {
    "--randomDelay": randomDelay + "s",
    "--randomDuration": randomDuration + "s",
  } as React.CSSProperties;

  // Este efecto establece el estado showImage después de que termina la transición
  // cuando el hechizo está en modo detallado. Utiliza un temporizador basado en la duración y el retraso aleatorios.
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

  const onClick = () => {
    if (!detailed) {
      return;
    }
    setSelected(!selected);
  };

  //agregado para mostrar el tooltip
  const handleMouseEnter = () => {
    if (detailed) {
      setShowTooltip(true);
    }
  };
  
  //agregado para mostrar el tooltip
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip spell={spell} show={showTooltip}>
      <article
        className={c(
          styles.spell,
          highlighted && !detailed && styles.highlighted,
          detailed && styles.detailed,
          detailed && selected && styles.selected,
        )}
        data-spell-id={spell.id}
        style={animatedSpellStyles}
        aria-label={spell.name}
        // quitado aria-detailed attribute da error en consola
        /*aria-detailed={detailed ? "true" : "false"}*/
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(detailed ? { onClick } : {})}
      >
        {detailed && showImage && (
          <div className={styles.image}>
            <img src={spell.icon} alt={spell.name} className={styles.icon} />
            {spell.upcast && (
              <img src={upcastIcon} alt="upcast" className={styles.upcast} />
            )}
          </div>
        )}
      </article>
    </Tooltip>
  );
}
