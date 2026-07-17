import React from "react";
import styles from "./MyOrders.module.scss";
import { Link } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrdersContext";

import MyOrdersCard from "../../../components/Card/MyOrdersCard";
import iconBack from "/assets/images/global_icons/arrow-back.svg";

const MyOrders = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const {
    orders,
    activeOrders,
    pastOrders,
    ordersCount,
    activeOrdersCount,
    pastOrdersCount,
    ordersLoading,
    ordersActionLoading,
  } = useOrders();

  return (
    <section className={styles["my-orders"]}>
      <div className={styles["my-orders-header"]}>
        <Link to="/profile">
          <img src={iconBack} alt="icon back"/>
        </Link>
        <div className={styles["my-orders-header-title"]}>
          <div>
            <h1>My Orders</h1>
            <p>Active and past orders in one place</p>
          </div>
          <div>
            {ordersCount} {ordersCount != 1 ? "orders" : "order" }
          </div>
        </div>
      </div>
      <div className={styles["my-orders-content"]}>
        {activeOrdersCount === 0 && pastOrdersCount === 0 ? (
          <div className={styles["my-orders-content-empty"]}>
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <>
          <div className={styles["my-orders-content-category"]}>
            <h2>Active Orders</h2>
            {activeOrdersCount > 0 ? (
              <div className={styles["orders-list"]}>
                {activeOrders.map((order) => (
                  <MyOrdersCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <p>No active orders</p>
            )}
          </div>
          <div className={styles["my-orders-content-category"]}>
            <h2>Past Orders</h2>
            {pastOrdersCount > 0 ? (
              <div className={styles["orders-list"]}>
                {pastOrders.map((order) => (
                  <MyOrdersCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <p>No past orders</p>
            )}
          </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
