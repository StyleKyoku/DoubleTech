import styles from "./NotFoundPage.module.scss";
import NotFoundImage from "/assets/images/NotFoundPage/not-found-image.png";

const NotFoundPage = () => {
  return (
    <div className={styles["not-found-page"]}>
      <div className={styles["not-found-header"]}>
        <div className={styles["not-found-title-wrapper"]}>
          <h1 className={styles["not-found-title"]}>404</h1>
        </div>
        <div className={styles["not-found-subtitle-wrapper"]}>
          <p className={styles["not-found-subtitle"]}>Page not found</p>
        </div>
      </div>
      <div className={styles["not-found-image-wrapper"]}>
        <img src={NotFoundImage} alt="404 Not Found" />
      </div>
      <div className={styles["not-found-footer"]}>
        <p className={styles["not-found-footer-text"]}>
          Sorry, the page you are looking for doesn’t exist or has been moved
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
