import { CharacterClass } from './components/character-class';
import classes from './data/classes.json';

import styles from './app.module.css';

export function App() {
  return (
    <main className={styles.main}>
      <div className={styles.classGrid}>
        {classes.map((cls) => (
          <CharacterClass key={cls.slug} name={cls.name} slug={cls.slug} />
        ))}
      </div>
    </main>
  );
}
