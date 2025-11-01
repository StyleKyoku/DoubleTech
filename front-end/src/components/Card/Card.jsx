import React from "react";
import styles from "./Card.module.scss";

import sale from "/assets/images/products/sales.svg";
import cart from "/assets/images/products/cart.svg";

const Card = ({
  id,
  title,
  price,
  imageUrl,
  inBasket = false,
  category = "everything",
  onSale,
  originalPrice = "",
}) => {
  const [isInBasket, setIsInBasket] = React.useState(Boolean(inBasket));

  const [cardInfo, setCardInfo] = React.useState({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/card")
      .then((res) => res.json())
      .then((data) => setCardInfo(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  const handleBasket = () => {
    setIsInBasket((prev) => !prev);
  };

  const handleBuy = () => {
    setIsInBasket(true);
  };

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
        <img
          src={import.meta.env.BASE_URL + imageUrl}
          alt={title}
          className={styles["card-image"]}
        />
      </div>
      <div className={styles["card-info"]}>
        <div className={styles["card-price-container"]}>
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
        <p className={styles["card-category"]}>for {category}</p>
      </div>
      <small className={styles["card-title"]}>{cardInfo.title}</small>
      <button className={styles["card-buy"]} onClick={handleBuy}>
        <img src={cart} alt="Cart icon" className={styles["cart-icon"]} />
        Buy
      </button>
    </div>
  );
};

export default Card;
