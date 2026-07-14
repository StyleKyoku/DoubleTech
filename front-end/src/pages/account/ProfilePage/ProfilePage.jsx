import React from "react";
import styles from "./ProfilePage.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrdersContext";
import { useLocation } from "react-router-dom";

import Card from "../../../components/Card/Card";
import Recommendations from "../../../components/Recommendations/Recommendations";
import AccountSettings from "./Modals/AccountSettings";

import defaultAvatar from "/assets/images/profile/default-avatar.svg";
import cartIcon from "/assets/images/profile/cart.svg";
import starIcon from "/assets/images/profile/star.svg";

const ProfilePage = () => {
  const { user } = useAuth();
  const location = useLocation();

  const { cartItems, toggleCart } = useCart();
  const { orders, ordersCount, activeOrdersCount } = useOrders();
  return (
    <section className={styles["profile"]}>
      <AccountSettings user={user} />
      <div className={styles.header}>
        <img src={defaultAvatar} alt="User Avatar" />
        <h2 className={styles.username}>
          {user.name} {user.surname}
        </h2>
      </div>
      <section className={styles.actions}>
        <div className={styles["action-buttons-group"]}>
          <button className={styles["action-button"]}>Settings</button>
          <button className={styles["action-button"]}>Support</button>
        </div>
        <div className={styles["action-buttons-group"]}>
          <button className={styles["action-button"]} onClick={toggleCart}>
            <div className={styles["button-text"]}>
              <p>Cart</p>
              <p>
                {cartItems.length} {cartItems.length === 0 ? "item" : "items"}
              </p>
            </div>
            <img src={cartIcon} alt="Cart icon" />
          </button>
          <Link to="/orders" className={styles["action-button"]}>

              <div className={styles["button-text"]}>
                <p>My orders</p>
                <p>
                  {activeOrdersCount > 0
                    ? `${activeOrdersCount} ${activeOrdersCount === 1 ? "active order" : "active orders"}`
                    : `${ordersCount} ${ordersCount === 1 ? "order" : "orders"}`}
                </p>
              </div>
              <img src={starIcon} alt="star icon" />

          </Link>
        </div>
        <div className={styles["action-buttons-group"]}>
          <Link to="/" className={styles["action-button"]}>
            <button>Back to homepage</button>
          </Link>
        </div>
      </section>
      <Recommendations count={6} />
    </section>
  );
};

export default ProfilePage;
