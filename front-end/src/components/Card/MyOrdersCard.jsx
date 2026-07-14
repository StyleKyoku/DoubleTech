import React from "react";
import styles from "./MyOrdersCard.module.scss";

const MyOrdersCard = ({ order }) => {
  console.log("Rendering MyOrdersCard for order:", order);
  return (
    <div className={styles["my-orders-card"]}>
      <div className={styles["my-orders-card-header"]}>
        <h2>Order #{order.id}</h2>
        <p className={styles[`${order.status}`]}>{order.statusLabel}</p>
      </div>
      <div className={styles["my-orders-card-body"]}>
        <div className={styles["card-description"]}>
          <div className={styles["card-intro"]}>
            <img src={import.meta.env.BASE_URL + order.items[0].imageUrl} alt="order's icon"/>
            <div>
              <h3>{order.items[0].title}</h3>
              <p>{order.items[0].smallDescription}</p>
              <p>for {order.items[0].category}</p>
            </div>
          </div>
          <div className={styles["card-qty"]}>
            <p>QTY</p>
            <p>{order.items[0].quantity}</p>
          </div>
          <div className={styles["card-price"]}>
            <p>Total</p>
            <p>{order.total}</p>
          </div>
        </div>
        <button className={styles["card-button"]}>View Details</button>
      </div>
    </div>
  );
};

export default MyOrdersCard;

