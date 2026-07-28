import styles from "./Footer.module.scss";

import logo from "/assets/images/footer/logo.svg";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-content-wrapper"]}>
          <div
            className={`${styles["footer-content"]} ${styles["footer-buttons"]}`}
          >
            <ul>
              <li className={styles["footer-links"]}>Home</li>
              <li className={styles["footer-links"]}>Catalog</li>
              <li className={styles["footer-links"]}>Sales</li>
              <li className={styles["footer-links"]}>Contacts</li>
            </ul>
          </div>
        </div>
        <div className={styles["footer-content-wrapper"]}>
          <div className={styles["footer-content"]}>
            <ul>
              <li className={styles["footer-links"]}>
                nikita.zhdanov.ie@gmail.com
              </li>
              <li className={styles["footer-links"]}>
                <a href="#">Github</a>
              </li>
              <li className={styles["footer-links"]}>+353 087 742 3050</li>
              <li className={styles["footer-links"]}>
                <a href="#">Telegram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["footer-content-wrapper"]}>
          <div className={styles["footer-content"]}>
            <ul>
              <li className={styles["footer-links"]}>
                <a href="https://t.me/stylekyoku">Front: Nikita Zhdanov</a>
              </li>
              <li className={styles["footer-links"]}>
                <a href="#">Back: Yaroslav Skachko</a>
              </li>
              <li className={styles["footer-links"]}>
                <a href="#">Design: Askat Isataev</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-content-wrapper"]}>
          <div
            className={`${styles["footer-content"]} ${styles["footer-disclaimer"]}`}
          >
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className={styles["footer-content-wrapper"]}>
          <div className={styles["footer-content"]}>
            <p>
              &copy; 2026 DoubleTech <br />
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
