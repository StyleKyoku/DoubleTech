import React from "react";
import styles from "./ProfilePage.module.scss";
import { useLocation } from "react-router-dom";

import Card from "../../../components/Card/Card";
import ChangeWindow from "./ProfileChangeWindow/ProfileChangeWindow";

import defaultAvatar from "/assets/images/profile/default-avatar.svg";
import cartIcon from "/assets/images/profile/cart.svg";
import starIcon from "/assets/images/profile/star.svg";

const ProfilePage = () => {
  const defaultUser = {
    name: "John",
    surname: "Doe",
    email: "1",
    phone: "2",
  };
  const location = useLocation();
  const user = location.state ?? defaultUser;
  return (
    <section className={styles["profile"]}>
      <div className={styles.header}>
        <img src={defaultAvatar} alt="User Avatar" />
        <h2 className={styles.username}>
          {user.name} {user.surname} lorem
        </h2>
      </div>
      <ChangeWindow user={user} />
      <section className={styles.actions}>
        <div>
          <button className={styles["action-button"]}>Settings</button>
          <button className={styles["action-button"]}>Support</button>
        </div>
        <button className={styles["action-button"]}>
          Cart <img src={cartIcon} alt="Cart icon" />
        </button>
        <button className={styles["action-button"]}>
          Order history <img src={starIcon} alt="star icon" />
        </button>
      </section>
      <section className={styles.recommendations}>
        <h2>You might be interested</h2>
        <div className={styles["recommendation-list"]}></div>
      </section>
    </section>
  );
};

export default ProfilePage;
