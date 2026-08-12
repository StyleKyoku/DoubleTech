import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Card.module.scss";

import sale from "/assets/images/products/sales.svg";
import cart from "/assets/images/products/cart.svg";

const Card = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { isAuth, authLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function redirectToLogin() {
    navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  }

  const isInCart = cartItems.some((item) => item.productId === product.id);

  async function handleBasket() {
    if (authLoading) {
      return;
    }

    if (!isAuth) {
      redirectToLogin();
      return;
    }
    if (isInCart) {
      await removeFromCart(product.id);
    } else {
      await addToCart(product.id);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles["card-image-div"]}>
        <button className={styles["like-button"]} onClick={handleBasket}>
          <img
            src={
              isInCart
                ? import.meta.env.BASE_URL +
                "/assets/images/products/isLiked.svg"
                : import.meta.env.BASE_URL +
                "/assets/images/products/notLiked.svg"
            }
            alt="like icon"
            className={styles["like-icon"]}
          />
        </button>
        <Link to={"/product/" + product.id}>
          <img
            src={import.meta.env.BASE_URL + product.imageUrls[0]}
            alt={product.title}
            className={styles["card-image"]}
          />
        </Link>
      </div>
      <div className={styles["card-info"]}>
        <div className={styles["card-price-container"]}>
          <div className={styles["card-price-wrapper"]}>
            {product.onSale ? (
              <img
                src={sale}
                alt="Sales img"
                className={styles["card-sales-image"]}
              />
            ) : null}
            <p
              className={`${styles["card-price"]} ${product.onSale ? styles["on-sale"] : ""}`}
            >
              ${product.price}
            </p>

            {product.onSale ? (
              <p className={styles["card-price-original"]}>
                ${product.oldPrice}
              </p>
            ) : null}
          </div>
        </div>
        <p className={styles["card-category"]}>for {product.category}</p>
      </div>
      <small className={styles["card-title"]}>
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </small>
      <button className={styles["card-buy"]}>
        <img src={cart} alt="Cart icon" className={styles["cart-icon"]} />
        Buy
      </button>
    </div>
  );
};

export default Card;
