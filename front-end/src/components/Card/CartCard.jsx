import React from "react";
import styles from "./CartCard.module.scss";
import { useCart } from "../../context/CartContext";

const CartCard = ({ product }) => {
  const getPublicPath = (path) => {
    if (!path) return "";

    if (path.startsWith("http") || path.startsWith("data:")) {
      return path;
    }

    return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
  };

  const { cartActionLoading, updateQuantity, removeFromCart } = useCart();

  return (
    <section className={styles["cart-card"]}>
      <div className={styles["product-info"]}>
        <div className={styles["image-container"]}>
          <img
            src={getPublicPath(product.imageUrls[0])}
            alt={product.name}
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["product-text"]}>
          <h3 className={styles["product-title"]}>{product.title}</h3>
          <p className={styles["product-price"]}>${product.price}</p>
        </div>
      </div>
      <div className={styles["product-controls"]}>
        <div className={styles["quantity-controls"]}>
          <button
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className={styles["remove-button"]}
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default CartCard;
