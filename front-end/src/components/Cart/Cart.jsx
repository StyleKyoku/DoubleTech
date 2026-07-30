import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.scss";

import closeIcon from "/assets/images/global_icons/close-icon.svg";
import CartCard from "../Card/CartCard";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrdersContext";

const Cart = () => {
  const navigate = useNavigate();

  const { isCartOpen, closeCart, cartItems, clearCart } = useCart();
  const { productById, productsLoading } = useProducts();
  const { createOrdersFromItems, orderActionLoading } = useOrders();

  const cartProducts = productsLoading
    ? []
    : cartItems
        .map((item) => {
          const product = productById[item.productId];

          if (!product) {
            console.warn(`Product with ID ${item.productId} not found`);
            return null;
          }

          return {
            ...product,
            quantity: item.quantity,
          };
        })
        .filter(Boolean);

  async function handleCheckout() {
    if (cartItems.length === 0) {
      return;
    }

    const createdOrders = await createOrdersFromItems(cartItems);

    if (!createdOrders.length) {
      return;
    }

    await clearCart();
    closeCart();
    navigate("/orders");
  }

  return (
    <div
      className={`${styles["cart"]} ${isCartOpen ? styles["active"] : ""}`}
      onClick={closeCart}
    >
      <div
        className={styles["cart-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["cart-header"]}>
          <h2 className={styles["cart-title"]}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </h2>
          <button onClick={closeCart} className={styles["close-button"]}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </div>
        <div className={styles["cart-items"]}>
          {cartProducts.length === 0 ? (
            <div className={styles["empty-cart-container"]}>
              <p className={styles["empty-cart"]}>Your cart is empty.</p>
            </div>
          ) : (
            cartProducts.map((item) => (
              <CartCard key={item.id} product={item} />
            ))
          )}
        </div>
        <div className={styles["cart-footer"]}>
          <div className={styles["total-price"]}>
            <p>Total:</p>
            <p>
              $
              {cartProducts.reduce(
                (total, item) => total + item.price * item.quantity,
                0,
              )}
            </p>
          </div>
          <div className={styles["continue-shopping"]}>
            <button
              type="button"
              className={styles["checkout-button"]}
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || orderActionLoading}
            >
              {orderActionLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
