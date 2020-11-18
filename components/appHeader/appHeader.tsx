import styles from "../styles/appHeader.module.scss";

const AppHeader = () => {
  return (
    <nav className={styles.nav}>
       <img className={styles.logo} src="/vercel.svg" alt={"app logo"}></img>
        <h3 className={styles.heading}>Achievements</h3>
    </nav>
  );
};

export default AppHeader;