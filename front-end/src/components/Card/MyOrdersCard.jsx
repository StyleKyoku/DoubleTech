import React from "react";
import styles from "./MyOrdersCard.module.scss";

import { useOrderDetails } from "../../context/OrderDetailsContext";

import sale from "/assets/images/products/sales.svg";

const MyOrdersCard = ({ order }) => {
  const { openDetails } = useOrderDetails();

  const handleViewDetails = () => {
    openDetails(order);
  };

  return (
    <div className={styles["my-orders-card"]}>
      <div className={styles["my-orders-card-header"]}>
        <h2>Order #{order.id}</h2>
        <p className={styles[`${order.status}`]}>{order.statusLabel}</p>
      </div>
      <div className={styles["my-orders-card-body"]}>
        <div className={styles["card-description"]}>
          <div className={styles["card-intro"]}>
            <div className={styles["product-image-wrapper"]}>
              <img
                src={import.meta.env.BASE_URL + order.items[0].imageUrl}
                alt="order's icon"
              />
            </div>
            <div className={styles["product-info"]}>
              <h3 className={styles["product-title"]}>
                {order.items[0].title}
              </h3>
              <p className={styles["product-desc"]}>
                {order.items[0].smallDescription}
              </p>
              <p className={styles["product-category"]}>
                for {order.items[0].category}
              </p>
            </div>
          </div>
          <div className={styles["card-qty"]}>
            <p>QTY</p>
            <p>{order.items[0].quantity}</p>
          </div>
          <div className={styles["card-price"]}>
            <p>Total</p>
            <div>
              {order.items[0].onSale ? (
                <img src={sale} alt="on sale icon" />
              ) : null}
              <p className={order.items[0].onSale ? styles["onSale"] : null}>
                ${order.total}
              </p>
            </div>
          </div>
          <div className={styles["card-button-wrapper"]}>
            <button
              onClick={handleViewDetails}
              className={styles["card-button"]}
            >
              <span>View</span>
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersCard;
