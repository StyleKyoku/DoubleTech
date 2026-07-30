import React from "react";
import styles from "./OrderDetailsModal.module.scss";

import { useOrderDetails } from "../../context/OrderDetailsContext";

import closeIcon from "/assets/images/global_icons/close-icon.svg";

const OrderDetailsModal = ({ order }) => {
  const { closeDetails } = useOrderDetails();
  return (
    <div
      className={`${styles["order-details"]} ${order !== null ? styles["active"] : ""}`}
      onClick={closeDetails}
    >
      <div
        className={styles["order-details-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["order-details-header"]}>
          <div className={styles["order-details-titles-wrapper"]}>
            <h1 className={styles["order-details-title"]}>Order Details</h1>
            <p className={styles["order-details-subtitle"]}>
              Detailed information about this order.
            </p>
          </div>
          <button onClick={closeDetails} className={styles["close-button"]}>
            <img
              src={closeIcon}
              className={styles["close-button-icon"]}
              alt="close icon"
            />
          </button>
        </div>
        <dl className={styles["order-details-list"]}>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Product</dt>
            <dd className={styles["order-details-description"]}>
              {order.items[0].title}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Product ID</dt>
            <dd className={styles["order-details-description"]}>
              {order.items[0].productId}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Price</dt>
            <dd className={styles["order-details-description"]}>
              ${order.items[0].price}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Quantity</dt>
            <dd className={styles["order-details-description"]}>
              {order.items[0].quantity}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Status</dt>
            <dd className={styles["order-details-description"]}>
              {order.statusLabel}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Created at</dt>
            <dd className={styles["order-details-description"]}>
              {new Date(order.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Estimated Delivery</dt>
            <dd className={styles["order-details-description"]}>
              {new Date(order.estimatedDelivery).toLocaleDateString()}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Tracking Number</dt>
            <dd className={styles["order-details-description"]}>
              {order.trackingNumber}
            </dd>
          </div>
          <div className={styles["order-details-item"]}>
            <dt className={styles["order-details-term"]}>Delivery Address</dt>
            <dd className={styles["order-details-description"]}>
              {order.deliveryAddress}
            </dd>
          </div>
        </dl>
        <div className={styles["order-details-footer"]}>
          <div className={styles["support-button-wrapper"]}>
            <a
              href="https://t.me/stylekyoku"
              className={styles["support-button"]}
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
