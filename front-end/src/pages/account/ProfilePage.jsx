import React from "react";
import styles from "./ProfilePage.module.css";
import Card from "../../components/Card/Card";

import defaultAvatar from "/assets/images/profile/default-avatar.svg";

const ProfilePage = ({ user }) => {
  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <img
          src={user.avatar || defaultAvatar}
          alt="User Avatar"
          className={styles.avatar}
        />
        <h1>
          {user.name} {user.surname} lorem
        </h1>
      </div>
      <nav className={styles.window}>
        <button className={styles.closeButton}></button>
        <h2>Personal data</h2>
        <form className={styles.dataForm}>
          <label>
            Name:
            <input type="text" defaultValue={user.name} />
          </label>
          <label>
            Email:
            <input type="email" defaultValue={user.email} />
          </label>
          <label>
            Phone:
            <input type="tel" defaultValue={user.phone} />
          </label>
          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </form>
        <button className={styles.logoutButton}>
          <img src="" alt="log out icon" /> Log Out
        </button>
      </nav>
      <section className={styles.actions}>
        <div>
          <button className={styles.actionButton}>Settings</button>
          <button className={styles.actionButton}>Support</button>
        </div>
        <div>
          <p>Cart</p>
          <img src={user.cartImage} alt="Cart" className={styles.cartImage} />
        </div>
        <div>
          <p>Order history</p>
          <img
            src={user.orderHistoryImage}
            alt="Order History"
            className={styles.orderHistoryImage}
          />
        </div>
      </section>
      <section className={styles.recommendations}>
        <h2>You might be interested</h2>
        <div className={styles.recommendationList}>
          {user.recommendations.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
