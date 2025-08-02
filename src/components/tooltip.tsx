import { useState, useRef, useEffect } from "react";
import type { Spell } from "../models/spell";
import styles from "./tooltip.module.css";

type TooltipProps = {
  spell: Spell;
  children: React.ReactNode;
  show: boolean;
};

export function Tooltip({ spell, children, show }: TooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let y = triggerRect.top - tooltipRect.height - 8;
      
      // Ajustar si se sale de la pantalla
      if (x < 8) x = 8;
      if (x + tooltipRect.width > window.innerWidth - 8) {
        x = window.innerWidth - tooltipRect.width - 8;
      }
      if (y < 8) {
        y = triggerRect.bottom + 8; // Mostrar abajo si no cabe arriba
      }
      
      setPosition({ x, y });
    }
  }, [show]);

  // Lógica para extraer información del hechizo
  // Detectamos concentración basándonos en la duración del hechizo debido a que
  // no hay un campo específico en el modelo Spell para esto.
  const requiresConcentration = (spell: Spell): boolean => {
    const duration = spell.duration?.toLowerCase() || "";
    
    // Extraer el número de turnos de la duración
    const turnsMatch = duration.match(/(\d+)\s*turns?/);
    if (turnsMatch) {
      const turns = parseInt(turnsMatch[1], 10);
      return turns > 4;
    }
    
    // Hechizos de larga duración también requieren concentración
    if (duration.includes("long rest")) {
      return true;
    }
    
    return false;
  };

  const hasConcentration = requiresConcentration(spell);
  const isUpcast = spell.upcast || false;
  const damageTypes = spell.damage?.map(d => d.damageType).filter(Boolean) || [];

  return (
    <>
      <div ref={triggerRef} className={styles.triggerWrapper}>
        {children}
      </div>
      
      {show && (
        <div
          ref={tooltipRef}
          className={styles.tooltip}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999,
          }}
        >
          <div className={styles.tooltipContent}>
            <h4 className={styles.spellName}>{spell.name}</h4>
            
            <div className={styles.spellInfo}>
              <span className={styles.level}>
                Level {spell.level === 0 ? "Cantrip" : spell.level}
              </span>
              
              <div className={styles.iconRow}>
                {hasConcentration && (
                  <div className={styles.icon} title="Requires Concentration">
                     <img 
                      src="/src/assets/icons/other/concentration.png" 
                      alt="Requires Concentration"
                      width="24"
                      height="24"
                      className={styles.iconImage}
                    />
                  </div>
                )}
                
                {isUpcast && (
                  <div className={styles.icon} title="Can be upcast">
                    <img 
                      src="/src/assets/icons/other/upcast2.png" 
                      alt="Can be upcast"
                      width="24"
                      height="24"
                      className={styles.iconImage}
                    />
                  </div>
                )}
                
                {damageTypes.map((damageType, index) => {
                  const iconSrc = getDamageTypeIcon(damageType);
                  return iconSrc ? (
                    <div 
                      key={index} 
                      className={styles.icon} 
                      title={`${damageType} damage`}
                    >
                      <img 
                        src={iconSrc} 
                        alt={`${damageType} damage`}
                        width="24"
                        height="24"
                        className={styles.iconImage}
                      />
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className={styles.spellDetails}>
              <div>Range: {spell.range || "Unknown"}</div>
              <div>Duration: {spell.duration || "Unknown"}</div>
              <div>Action: {spell.action || "Unknown"}</div>
            </div>
          </div>
          
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </>
  );
}

function getDamageTypeIcon(damageType: string): string | null {
  const iconMap: Record<string, string | null> = {
    "fire": "/damage-icons/fire.png",
    "cold": "/damage-icons/cold.png",
    "acid": "/damage-icons/acid.png",
    "lightning": "/damage-icons/lightning.png", 
    "thunder": "/damage-icons/thunder.png", 
    "poison": "/damage-icons/poison.png",
    "necrotic": "/damage-icons/necrotic.png",
    "radiant": "/damage-icons/radiant.png",
    "psychic": "/damage-icons/psychic.png",
    "force": "/damage-icons/force.png",    
    "piercing": "/damage-icons/lightning.png", // Usamos el icono de rayo para este tipo pq no hay uno específico
  };
  
  return iconMap[damageType.toLowerCase()] || null;
}
