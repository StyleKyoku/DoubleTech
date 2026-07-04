import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.scss";

import closeIcon from "/assets/images/global_icons/close-icon.svg";
import CartCard from "../Card/CartCard";
import { useProducts } from "../../context/ProductContext";

const Cart = () => {
  const { isCartOpen, closeCart, cartItems, updateQuantity } = useCart();
  const { productById, productsLoading } = useProducts();

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
          {cartProducts.map((item) => (
            <CartCard key={item.id} product={item} />
          ))}
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
            <Link to="/checkout" className={styles["checkout-button"]}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
