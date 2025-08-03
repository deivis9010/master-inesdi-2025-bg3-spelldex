import { useNavigate } from "react-router-dom";
import styles from "./not-found.module.css";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main>
      <div className={styles.content}>
        <h1 className={styles.title}>Class Not Found</h1>
        <p className={styles.message}>
          The character class you are looking for does not exist or may have been
          moved.
        </p>
        <button className={styles.button} onClick={handleGoHome}>
          Return to Class Selection
        </button>
      </div>
    </main>
  );
}
