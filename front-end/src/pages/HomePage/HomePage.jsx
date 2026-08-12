import React from "react";

import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card.jsx";

import { useProducts } from "../../context/ProductContext";

import intro from "/assets/images/intro/intro.png";
import redRect from "/assets/images/features/rect1.svg";
import blueRect from "/assets/images/features/rect2.svg";
import yellowRect from "/assets/images/features/rect3.svg";
import goToPage from "/assets/images/features/go-to-page.svg";
import allInAll from "/assets/images/features/all-in-all.svg";
import pcs from "/assets/images/features/pcs.svg";
import phones from "/assets/images/features/phones.svg";

export default function HomePage() {
  const { products } = useProducts();

  const productsOnSale = products.filter((product) => product.onSale);

  return (
    <>
      <section className={styles["intro-section"]}>
        <div className={styles["intro-content"]}>
          <div className={styles["intro-text-wrapper"]}>
            <h1 className={styles["intro-title"]}>Your Tech — Your Rules</h1>
            <h2 className={styles["intro-text"]}>
              Smartphones and Laptops <br /> with Quality Guarantee
            </h2>
            <Link to="/catalog">
              <button className={styles["intro-button"]}>Catalog</button>
            </Link>
          </div>
          <div className={styles["intro-image"]}>
            <img src={intro} alt="Intro-image" />
          </div>
        </div>
      </section>
      <section className={styles["features-section"]}>
        <div className={styles["feature"]}>
          <img src={redRect} alt="red bg" />
          <h2>
            The laptop that
            <span className={styles["green-words"]}>
              does <br /> it all
            </span>
          </h2>
          <img
            src={goToPage}
            alt="go to page img"
            className={styles["feature-go-to-img"]}
          />
          <img src={pcs} alt="pcs img" className={styles["feature-img"]} />
        </div>
        <div className={styles["feature"]}>
          <img src={blueRect} alt="blue bg" />
          <h2>
            The <span className={styles["green-words"]}>best phones</span> of
            recent years
          </h2>
          <h3>2025</h3>
          <img
            src={goToPage}
            alt="go to page img"
            className={styles["feature-go-to-img"]}
          />
          <img
            src={phones}
            alt="phones img"
            className={styles["feature-img"]}
          />
        </div>
        <div className={styles["feature"]}>
          <img src={yellowRect} alt="yellow bg" />
          <h2>
            <span className={styles["green-words"]}>All</span> the best - in one
            place
          </h2>
          <img
            src={goToPage}
            alt="go to page img"
            className={styles["feature-go-to-img"]}
          />
          <img
            src={allInAll}
            alt="all in all img"
            className={styles["feature-img"]}
          />
        </div>
      </section>

      <section className={styles["products-section"]}>
        <div className={styles["products-wrapper"]}>
          <h3 className={styles["product-title"]}>Sales</h3>
          <div className={styles["products-list"]}>
            {productsOnSale.slice(0, 6).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles["collections-section"]}>
        <h3 className={styles["collections-title"]}>Collections</h3>
        <div className={styles["collections-wrapper"]}>
          <div className={styles["collection"]}>
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/rect1.svg"
              }
              alt="School Collection"
              className={styles["collection-bg"]}
            />
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/school.svg"
              }
              alt="Go to school collection"
              className={styles["go-to-col"]}
            />
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/school-img.png"
              }
              alt="School img"
              className={styles["collection-img"]}
            />
          </div>
          <div className={styles["collection"]}>
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/rect2.svg"
              }
              alt="Work Collection"
              className={styles["collection-bg"]}
            />
            <img
              src={
                import.meta.env.BASE_URL + "/assets/images/collections/work.svg"
              }
              alt="Go to work collection"
              className={styles["go-to-col"]}
            />
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/work-img.png"
              }
              alt="Work img"
              className={styles["collection-img"]}
            />
          </div>
          <div className={styles["collection"]}>
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/rect3.svg"
              }
              alt="Gaming Collection"
              className={styles["collection-bg"]}
            />
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/gaming.svg"
              }
              alt="Go to gaming collection"
              className={styles["go-to-col"]}
            />
            <img
              src={
                import.meta.env.BASE_URL +
                "/assets/images/collections/gaming-img.png"
              }
              alt="Gaming img"
              className={styles["collection-img"]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
