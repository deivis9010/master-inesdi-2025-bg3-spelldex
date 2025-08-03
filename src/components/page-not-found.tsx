import { useNavigate } from "react-router-dom";
import styles from "./page-not-found.module.css";

export function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

 

  return (
    <main>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you are looking for seems to have been lost in the
          astral plane.
        </p>
        <div className={styles.buttonGroup}>
          
          <button className={styles.buttonPrimary} onClick={handleGoHome}>
            Return to Home
          </button>
        </div>
      </div>
    </main>
  );
}
