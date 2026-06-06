import React from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";

import styles from "./Catalog.module.scss";
import Card from "../../components/Card/Card.jsx";
import arrowIcon from "/assets/images/global_icons/arrow-down.svg";

const Catalog = () => {
  const types = ["Laptops", "Smartphones"];
  const categories = ["Gaming", "Business", "Everyday"];
  const brands = ["Brand A", "Brand B", "Brand C"];
  const MinPrice = 0;
  const MaxPrice = 3000;
  const step = 50;

  const { cartItems } = useCart();
  const { products, productsLoading } = useProducts();

  const [isMenuOpen, setIsMenuOpen] = React.useState("None");

  const [minValue, setMinValue] = React.useState(MinPrice);
  const [maxValue, setMaxValue] = React.useState(MaxPrice);

  const minPercent = ((minValue - MinPrice) / (MaxPrice - MinPrice)) * 100;
  const maxPercent = ((maxValue - MinPrice) / (MaxPrice - MinPrice)) * 100;

  const handleMinRangeChange = (e) => {
    const value = Number(e.target.value);
    setMinValue(Math.min(value, maxValue - step));
  };

  const handleMaxRangeChange = (e) => {
    const value = Number(e.target.value);
    setMaxValue(Math.max(value, minValue + step));
  };

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value) || MinPrice;
    const clampedValue = Math.max(MinPrice, Math.min(value, maxValue - step));
    setMinValue(clampedValue);
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value) || MaxPrice;
    const clampedValue = Math.min(MaxPrice, Math.max(value, minValue + step));
    setMaxValue(clampedValue);
  };

  const [selectedType, setSelectedType] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState([]);

  const handleTypeChange = (type) =>
    setSelectedType((prevSelected) => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter((t) => t !== type);
      } else {
        return [...prevSelected, type];
      }
    });

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((c) => c !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prevSelected) => {
      if (prevSelected.includes(brand)) {
        return prevSelected.filter((b) => b !== brand);
      } else {
        return [...prevSelected, brand];
      }
    });
  };

  const toggleMenu = (menu) => {
    setIsMenuOpen((prevMenu) => (prevMenu === menu ? "None" : menu));
  };

  return (
    <div className={styles["catalog"]}>
      <h1>Catalog</h1>
      <div className={styles["catalog-menu"]}>
        <div className={styles["catalog-menu-item"]}>
          <div className={styles["item-heading-div"]}>
            <button
              onClick={() => toggleMenu("type")}
              className={`${styles["item-heading"]} ${isMenuOpen === "type" ? styles["active"] : ""}`}
            >
              Type of product
            </button>
            <img
              src={arrowIcon}
              alt="arrow icon"
              className={`${styles["arrow-icon"]} ${isMenuOpen === "type" ? styles["active"] : ""}`}
            />
          </div>
          <div
            className={`${styles["item-options"]} ${isMenuOpen === "type" ? styles["open"] : ""}`}
          >
            <div className={styles["option-heading"]}>
              <p>Selected({selectedType.length})</p>
            </div>
            <div className={styles["options-list"]}>
              {types.map((type) => (
                <div
                  key={type}
                  className={`${styles["option"]} ${selectedType.includes(type) ? styles["selected"] : ""}`}
                >
                  <button onClick={() => handleTypeChange(type)}>{type}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["catalog-menu-item"]}>
          <div className={styles["item-heading-div"]}>
            <button
              onClick={() => toggleMenu("price")}
              className={`${styles["item-heading"]} ${isMenuOpen === "price" ? styles["active"] : ""}`}
            >
              Price
            </button>
            <img
              src={arrowIcon}
              alt="arrow icon"
              className={`${styles["arrow-icon"]} ${isMenuOpen === "price" ? styles["active"] : ""}`}
            />
          </div>
          <div
            className={`${styles["item-options"]} ${isMenuOpen === "price" ? styles["open"] : ""}`}
          >
            <div className={styles["option-heading"]}>
              <p>Set price range</p>
            </div>
            <div
              className={`${styles["options-list"]} ${styles["price-options"]}`}
            >
              <div className={styles["price-range"]}>
                <div className={styles["inputs"]}>
                  <div className={styles["input-box"]}>
                    <span>from</span>
                    <input
                      type="number"
                      value={minValue}
                      onChange={handleMinInputChange}
                    />
                    <span>$</span>
                  </div>

                  <div className={styles["input-box"]}>
                    <span>to</span>
                    <input
                      type="number"
                      value={maxValue}
                      onChange={handleMaxInputChange}
                    />
                    <span>$</span>
                  </div>
                </div>

                <div className={styles["slider"]}>
                  <div className={styles["slider-track"]}></div>

                  <div
                    className={styles["slider-range"]}
                    style={{
                      left: `${minPercent}%`,
                      right: `${100 - maxPercent}%`,
                    }}
                  ></div>

                  <input
                    type="range"
                    min={MinPrice}
                    max={MaxPrice}
                    step={step}
                    value={minValue}
                    onChange={handleMinRangeChange}
                    className={`${styles["range-input"]} ${styles["range-input-left"]}`}
                  />

                  <input
                    type="range"
                    min={MinPrice}
                    max={MaxPrice}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxRangeChange}
                    className={`${styles["range-input"]} ${styles["range-input-right"]}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["catalog-menu-item"]}>
          <div className={styles["item-heading-div"]}>
            <button
              onClick={() => toggleMenu("category")}
              className={`${styles["item-heading"]} ${isMenuOpen === "category" ? styles["active"] : ""}`}
            >
              Category
            </button>
            <img
              src={arrowIcon}
              alt="arrow icon"
              className={`${styles["arrow-icon"]} ${isMenuOpen === "category" ? styles["active"] : ""}`}
            />
          </div>
          <div
            className={`${styles["item-options"]} ${isMenuOpen === "category" ? styles["open"] : ""}`}
          >
            <div className={styles["option-heading"]}>
              <p>Selected({selectedCategory.length})</p>
            </div>
            <div className={styles["options-list"]}>
              {categories.map((type) => (
                <div
                  key={type}
                  className={`${styles["option"]} ${selectedCategory.includes(type) ? styles["selected"] : ""}`}
                >
                  <button onClick={() => handleCategoryChange(type)}>
                    {type}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["catalog-menu-item"]}>
          <div className={styles["item-heading-div"]}>
            <button
              onClick={() => toggleMenu("brand")}
              className={`${styles["item-heading"]} ${isMenuOpen === "brand" ? styles["active"] : ""}`}
            >
              Brand
            </button>
            <img
              src={arrowIcon}
              alt="arrow icon"
              className={`${styles["arrow-icon"]} ${isMenuOpen === "brand" ? styles["active"] : ""}`}
            />
          </div>
          <div
            className={`${styles["item-options"]} ${isMenuOpen === "brand" ? styles["open"] : ""}`}
          >
            <div className={styles["option-heading"]}>
              <p>Selected({selectedBrand.length})</p>
            </div>
            <div className={styles["options-list"]}>
              {brands.map((type) => (
                <div
                  key={type}
                  className={`${styles["option"]} ${selectedBrand.includes(type) ? styles["selected"] : ""}`}
                >
                  <button onClick={() => handleBrandChange(type)}>
                    {type}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles["catalog-content"]}>
        <div className={styles["product-list"]}>
          {products.map((card) => {
            const isInCart = cartItems.some((item) => {
              return item.productId === card.id;
            });
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                price={card.price}
                imageUrl={card.imageUrls[0]}
                inBasket={isInCart}
                category={card.category}
                brand={card.brand}
                onSale={card.onSale}
                originalPrice={card.originalPrice}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
