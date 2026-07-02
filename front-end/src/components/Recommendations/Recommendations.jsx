import React from "react";

import styles from "./Recommendations.module.scss";
import Card from "../Card/Card";

import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

const Recommendations = ({ count }) => {
  const { cartItems } = useCart();
  const { products } = useProducts();
  const recommendedProducts = products.slice(0, count);

  return (
    <section className={styles["product-recs"]}>
      <h2 className={styles["product-recs-title"]}>You may also like</h2>
      <div className={styles["product-recs-wrapper"]}>
        {recommendedProducts.map((product) => {
          const productInBasket = cartItems.some((item) => {
            return String(item.productId) === String(product.id);
          });

          return (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrls[0]}
              inBasket={productInBasket}
              category={product.category}
              brand={product.brand}
              onSale={product.onSale}
              originalPrice={product.oldPrice}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Recommendations;
