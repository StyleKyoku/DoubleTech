import React from "react";
import styles from "./ProfileChangeWindow.module.scss";
import logoutIcon from "/assets/images/profile/window/log-out-icon.svg";
import closeIcon from "/assets/images/profile/window/close-icon.svg";

const ProfileChangeWindow = ({ user }) => {
  return (
    <nav className={styles.window}>
      <button className={styles["close-button"]}>
        <img src={closeIcon} alt="Close Icon" />
      </button>
      <h2>Account Settings</h2>
      <form className={styles["settings-form"]}>
        <label className={styles.formLabel}>
          Name:
          <input
            type="text"
            defaultValue={user.name}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Surname:
          <input
            type="text"
            defaultValue={user.surname}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Email:
          <input
            type="email"
            defaultValue={user.email}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Password:
          <input
            type="password"
            placeholder="Enter new password"
            className={styles.formInput}
          />
        </label>
        <button type="submit" className={styles["save-button"]}>
          Save Changes
        </button>
      </form>
      <button className={styles.logout}>
        <img src={logoutIcon} alt="Log out icon" />
      </button>
      <button className={styles["delete-button"]}>Delete Account</button>
    </nav>
  );
};

export default ProfileChangeWindow;
