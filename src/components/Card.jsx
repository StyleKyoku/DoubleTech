import React from "react";

const Card = ({ id, title, price, imageUrl, liked, inBasket}) => {
  const [isLiked, setIsLiked] = React.useState(liked);

  const handleLike = async () => {
    // try {
    //   const response = await fetch(`/api/products/${id}/like`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ liked: !isLiked }),
    //   });
    //   if (response.ok) {
    //     setIsLiked(!isLiked);
    //   }
    // } catch (e) {
    //   // Можно добавить обработку ошибок
    //   alert("Error liking product");
    // }
  };

  return (
    <div className="card">
      <div className="card-image-div">
        <button className="like-button" onClick={handleLike}>
          <img
            src={isLiked ? import.meta.env.BASE_URL + "/assets/images/products/isLiked.svg" : import.meta.env.BASE_URL + "/assets/images/products/notLiked.svg"}
            alt="like icon"
            className="like-icon"
          />
        </button>
        <img src={import.meta.env.BASE_URL + imageUrl} alt={title} className="card-image" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price}</p>
      <button className="card-buy">Buy</button>
    </div>
  );
};

export default Card;