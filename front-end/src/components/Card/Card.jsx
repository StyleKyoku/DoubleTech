import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Card.module.scss";

import sale from "/assets/images/products/sales.svg";
import cart from "/assets/images/products/cart.svg";

const Card = ({
  id,
  title,
  price,
  imageUrl,
  category = "everything",
  onSale,
  originalPrice = "",
}) => {
  const { cartItems, addToCart, removeFromCart, openCart } = useCart();
  const { isAuth, authLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function redirectToLogin() {
    navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  }

  const isInBasket = cartItems.some((item) => item.productId === id);

  const [cardInfo, setCardInfo] = React.useState({
    title: "",
    description: "",
  });

  async function handleBasket() {
    if (authLoading) {
      return;
    }

    if (!isAuth) {
      redirectToLogin();
      return;
    }
    if (isInBasket) {
      await removeFromCart(id);
    } else {
      await addToCart(id);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles["card-image-div"]}>
        <button className={styles["like-button"]} onClick={handleBasket}>
          <img
            src={
              isInBasket
                ? import.meta.env.BASE_URL +
                  "/assets/images/products/isLiked.svg"
                : import.meta.env.BASE_URL +
                  "/assets/images/products/notLiked.svg"
            }
            alt="like icon"
            className={styles["like-icon"]}
          />
        </button>
        <Link to={`/product/${id}`}>
          <img
            src={import.meta.env.BASE_URL + imageUrl}
            alt={title}
            className={styles["card-image"]}
          />
        </Link>
      </div>
      <div className={styles["card-info"]}>
        <div className={styles["card-price-container"]}>
          <div className={styles["card-price-wrapper"]}>
            {onSale ? (
              <img
                src={sale}
                alt="Sales img"
                className={styles["card-sales-image"]}
              />
            ) : null}
            <p
              className={`${styles["card-price"]} ${onSale ? styles["on-sale"] : ""}`}
            >
              ${price}
            </p>
          
            {onSale ? (
              <p className={styles["card-price-original"]}>${originalPrice}</p>
            ) : null}
          </div>
        </div>
        <p className={styles["card-category"]}>for {category}</p>
      </div>
      <small className={styles["card-title"]}>
        {" "}
        <Link to={`/product/${id}`}>{title}</Link>
      </small>
      <button className={styles["card-buy"]}>
        <img src={cart} alt="Cart icon" className={styles["cart-icon"]} />
        Buy
      </button>
    </div>
  );
};

export default Card;
