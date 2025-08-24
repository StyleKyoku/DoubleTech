import React from "react";

import '../../styles/Card.scss'

import sale from '/assets/images/products/sales.svg'
import cart from '/assets/images/products/cart.svg'

const Card = ({ id, title, price, imageUrl, inBasket = false, category = "everything", onSale, originalPrice="" }) => {
  const [isInBasket, setIsInBasket] = React.useState(Boolean(inBasket));

  const handleBasket = () => {
    setIsInBasket(prev => !prev);
  };

  const handleBuy = () => {
    setIsInBasket(true);
    
  };

  return (
    <div className="card">
      <div className="card-image-div">
        <button className="like-button" onClick={handleBasket}>
          <img
            src={isInBasket
              ? import.meta.env.BASE_URL + "/assets/images/products/isLiked.svg"
              : import.meta.env.BASE_URL + "/assets/images/products/notLiked.svg"}
            alt="like icon"
            className="like-icon"
          />  
        </button>
        <img src={import.meta.env.BASE_URL + imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-info">
        <div className="card-price-container">
          {onSale ? <img src={sale} alt="Sales img" className="card-sales-img" /> : null}
          <p className={`card-price ${onSale ? "on-sale" : ""}`}>${price}</p>
          {onSale ? <p className="card-original-price">${originalPrice}</p> : null}
        </div>
        <p className="card-category">for {category}</p>
      </div>
      <small className="card-title">{title}</small> 
      <button className="card-buy" onClick={handleBuy}>
        <img src={cart} alt="Cart icon" className="cart-icon" />
        Buy
      </button>
    </div>
  );
};

export default Card;