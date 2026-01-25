import React from "react";
import styles from "./ProductPage.module.scss";
import notInCart from "/assets/images/products/notLiked.svg";
import isInCart from "/assets/images/products/isLiked.svg";
import sale from "/assets/images/products/sales.svg";
import tick1 from "/assets/images/products/tick1.svg";
import tick2 from "/assets/images/products/tick2.svg";
import cartIcon from "/assets/images/products/cart.svg";

export default function ProductPage({
  id,
  title,
  smallDescription,
  FullDescription,
  onSale,
  oldPrice,
  newPrice,
  imageUrls,
  inBasket = false,
  category,
  productSpecs,
}) {
  const testData = {
    id: 1,
    title: "Sample Product",
    smallDescription: "This is a sample product.",
    FullDescription: "This is a detailed description of the sample product.",
    onSale: true,
    oldPrice: 1200,
    newPrice: 999,
    imageUrls: [
      "/assets/images/products/sample1.png",
      "/assets/images/products/sample2.png",
      "/assets/images/products/sample3.png",
      "/assets/images/products/sample4.png",
    ],
    inBasket: false,
    category: "everything",
    productSpecs: {
      weight: "1kg",
      dimensions: "10x20x5 cm",
      manufacturer: "Sample Manufacturer",
      color: ["Black", "White", "Blue"],
      memory: ["64GB", "128GB", "256GB"],
    },
  };

  const [memorySelect, setMemorySelect] = React.useState(
    testData.productSpecs.memory[0],
  );
  const [colorSelect, setColorSelect] = React.useState(
    testData.productSpecs.color[0],
  );
  const [quantity, setQuantity] = React.useState(1);

  const finalProduct = {
    id: testData.id,
    title: testData.title,
    price: testData.onSale ? testData.newPrice : testData.oldPrice,
    memory: memorySelect,
    color: colorSelect,
    quantity: quantity,
  };

  const [product, setProduct] = React.useState(testData);
  const cart = product.inBasket ? isInCart : notInCart;
  const handleClick = () => {
    setProduct((prev) => ({ ...prev, inBasket: !prev.inBasket }));
  };

  return (
    <main className={styles["product-page"]}>
      <section className={styles["product-section"]}>
        <div className={styles["product-image-wrapper"]}>
          <img
            src={import.meta.env.BASE_URL + "/assets/images/products/Phone.png"}
            alt="item"
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["product-details"]}>
          <div className={styles["product-title-section"]}>
            <h1 className={styles["product-title"]}>{testData.title}</h1>
            <button className={styles["cart-button"]} onClick={handleClick}>
              <img src={cart} alt="in cart icon" />
            </button>
          </div>
          <div className={styles["product-price-section"]}>
            <div className={styles["product-price-container"]}>
              {testData.onSale ? (
                <div className={styles["product-sales-wrapper"]}>
                  <img
                    src={sale}
                    alt="Sales img"
                    className={styles["product-sales-icon"]}
                  />
                  <span className={styles["product-new-price"]}>
                    ${testData.newPrice}
                  </span>
                  <span className={styles["product-old-price"]}>
                    ${testData.oldPrice}
                  </span>
                </div>
              ) : (
                <span className={styles["product-default-price"]}>
                  ${testData.oldPrice}
                </span>
              )}
            </div>
          </div>
          <div className={styles["product-color-section"]}>
            <div className={styles["product-color-icons"]}>
              {testData.productSpecs.color.map((color, index) => (
                <button
                  key={index}
                  className={`${styles["product-color-button"]} ${colorSelect === color ? styles["selected"] : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setColorSelect(color)}
                >
                  {colorSelect === color ? (
                    <img
                      src={color.toLowerCase() === "white" ? tick1 : tick2}
                      className={styles["color-tick"]}
                      alt="selected color tick"
                    />
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>
            <p className={styles["product-color"]}>
              color: {colorSelect.toLowerCase()}
            </p>
          </div>
          <div className={styles["product-memory-section"]}>
            {testData.productSpecs.memory.map((mem, index) => (
              <button
                key={index}
                className={`${styles["product-memory-button"]} ${memorySelect === mem ? styles["selected"] : ""}`}
                onClick={() => setMemorySelect(mem)}
              >
                {mem}
              </button>
            ))}
          </div>
          <p className={styles["product-description"]}>
            {testData.smallDescription}
          </p>
          <button className={styles["add-to-cart-button"]}>
            <img src={cartIcon} className="cart-icon" alt="cart icon" />
            Buy
          </button>
        </div>
      </section>
    </main>
  );
}
