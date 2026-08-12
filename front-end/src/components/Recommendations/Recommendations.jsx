import React from "react";

import styles from "./Recommendations.module.scss";
import Card from "../Card/Card";

import { useProducts } from "../../context/ProductContext";

const Recommendations = ({ count }) => {
  const { products } = useProducts();
  const recommendedProducts = products.slice(0, count);

  return (
    <section className={styles["product-recs"]}>
      <h2 className={styles["product-recs-title"]}>You may also like</h2>
      <div className={styles["product-recs-wrapper"]}>
        {recommendedProducts.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Recommendations;
