import React from "react";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "./ProductPage.module.scss";

import notInCart from "/assets/images/products/notLiked.svg";
import isInCart from "/assets/images/products/isLiked.svg";
import sale from "/assets/images/products/sales.svg";
import tick1 from "/assets/images/products/tick1.svg";
import tick2 from "/assets/images/products/tick2.svg";
import cartIcon from "/assets/images/products/cart.svg";

import Recommendations from "../../components/Recommendations/Recommendations.jsx";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrdersContext";

const colorMap = {
  midnight: "#1f2937",
  silver: "#c0c0c0",
  "space gray": "#6b7280",

  black: "#111111",
  gray: "#9ca3af",
  grey: "#9ca3af",
  violet: "#8b5cf6",

  "storm grey": "#6b7280",
  oat: "#d6c7aa",

  "eclipse gray": "#4b5563",
  "volt green": "#84cc16",

  white: "#ffffff",
  blue: "#2563eb",

  "gravity gray": "#4b5563",
  "mist blue": "#93c5fd",
  gold: "#d4af37",

  obsidian: "#111827",
  porcelain: "#f5f5f0",
  bay: "#60a5fa",

  graphite: "#374151",
  "pale gray": "#d1d5db",
  rose: "#f9a8d4",

  "aurora gray": "#9ca3af",
  "illusion sunset": "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
  "aurora white": "#f9fafb",

  "neon red/blue": "linear-gradient(90deg, #ef4444 0 50%, #2563eb 50% 100%)",
};

const lightColors = [
  "white",
  "silver",
  "oat",
  "gold",
  "porcelain",
  "pale gray",
  "aurora white",
  "mist blue",
];

const getColorValue = (color) => {
  const lowerColor = color.toLowerCase();
  return colorMap[lowerColor] || color;
};

const getPublicPath = (path) => {
  if (!path) return "";

  if (path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  function redirectToLogin() {
    navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  }

  const { isAuth, authLoading } = useAuth();
  const { cartItems, addToCart, removeFromCart, cartActionLoading } = useCart();

  const { products, productsLoading, productsError } = useProducts();
  const { buyNow, orderActionLoading } = useOrders();

  const productData = products.find(
    (product) => String(product.id) === String(productId),
  );

  const [memorySelect, setMemorySelect] = React.useState("");
  const [colorSelect, setColorSelect] = React.useState("");
  const [currentImage, setCurrentImage] = React.useState("");

  React.useEffect(() => {
    if (!productData) return;

    setMemorySelect(productData.productSpecs.memory[0]);
    setColorSelect(productData.productSpecs.color[0]);
    setCurrentImage(getPublicPath(productData.imageUrls[0]));
  }, [productData]);

  if (productsLoading) {
    return (
      <main className={styles["product-page"]}>
        <p>Loading...</p>
      </main>
    );
  }

  if (productsError) {
    return (
      <main className={styles["product-page"]}>
        <p>{productsError}</p>
      </main>
    );
  }
  if (!productData) {
    return <Navigate to="/404" replace />;
  }

  const inBasket = cartItems.some((item) => {
    return String(item.productId) === String(productData.id);
  });

  const cart = inBasket ? isInCart : notInCart;

  async function handleCartClick() {
    if (authLoading) {
      return;
    }

    if (!isAuth) {
      redirectToLogin();
      return;
    }

    if (inBasket) {
      await removeFromCart(productData.id);
    } else {
      await addToCart(productData.id);
    }
  }

  async function handleBuyNow() {
    if (authLoading) {
      return;
    }

    if (!isAuth) {
      redirectToLogin();
      return;
    }

    const createdOrders = await buyNow(productData.id, 1);

    if (!createdOrders.length) {
      return;
    }

    navigate("/orders");
  }

  const recommendedProducts = products
    .filter((product) => product.id !== productData.id)
    .slice(0, 6);

  return (
    <main className={styles["product-page"]}>
      <section className={styles["product-section"]}>
        <div className={styles["product-image-wrapper"]}>
          {currentImage && (
            <img
              src={currentImage}
              alt="item"
              className={styles["product-image"]}
            />
          )}

          <div className={styles["product-image-thumbnails"]}>
            <div className={styles["product-image-thumbnails-wrapper"]}>
              {productData.imageUrls.map((url, index) => (
                <button
                  key={index}
                  className={styles["product-thumbnail-button"]}
                  onClick={() => setCurrentImage(getPublicPath(url))}
                >
                  <img
                    src={getPublicPath(url)}
                    alt={`thumbnail ${index + 1}`}
                    className={`${styles["product-thumbnail"]} ${currentImage === getPublicPath(url)
                        ? styles["selected"]
                        : ""
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["product-details"]}>
          <div className={styles["product-title-section"]}>
            <h1 className={styles["product-title"]}>{productData.title}</h1>

            <button
              className={styles["cart-button"]}
              onClick={handleCartClick}
              disabled={cartActionLoading}
            >
              <img src={cart} alt="in cart icon" />
            </button>
          </div>
          <div className={styles["product-price-section"]}>
            <div className={styles["product-price-container"]}>
              {productData.onSale ? (
                <div className={styles["product-sales-wrapper"]}>
                  <img
                    src={sale}
                    alt="Sales img"
                    className={styles["product-sales-icon"]}
                  />

                  <span className={styles["product-new-price"]}>
                    ${productData.price}
                  </span>

                  {productData.oldPrice && (
                    <span className={styles["product-old-price"]}>
                      ${productData.oldPrice}
                    </span>
                  )}
                </div>
              ) : (
                <span className={styles["product-default-price"]}>
                  ${productData.price}
                </span>
              )}
            </div>
          </div>
          <div className={styles["product-color-section"]}>
            <div className={styles["product-color-icons"]}>
              {productData.productSpecs.color.map((color, index) => (
                <button
                  key={index}
                  className={`${styles["product-color-button"]} ${colorSelect === color ? styles["selected"] : ""
                    }`}
                  style={{ background: getColorValue(color) }}
                  onClick={() => setColorSelect(color)}
                >
                  {colorSelect === color ? (
                    <img
                      src={
                        lightColors.includes(color.toLowerCase())
                          ? tick1
                          : tick2
                      }
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
            {productData.productSpecs.memory.map((mem, index) => (
              <button
                key={index}
                className={`${styles["product-memory-button"]} ${memorySelect === mem ? styles["selected"] : ""
                  }`}
                onClick={() => setMemorySelect(mem)}
              >
                {mem}
              </button>
            ))}
          </div>
          <p className={styles["product-description"]}>
            {productData.smallDescription}
          </p>
          <button
            className={styles["add-to-cart-button"]}
            onClick={handleBuyNow}
            disabled={cartActionLoading || orderActionLoading}
          >
            <img src={cartIcon} className="cart-icon" alt="cart icon" />
            {orderActionLoading ? "Processing..." : "Buy"}
          </button>{" "}
        </div>
      </section>

      <section className={styles["product-details-section"]}>
        <div className={styles["spacer"]}></div>

        <div className={styles["product-details"]}>
          <div className={styles["product-details-desc"]}>
            <h2 className={styles["details-desc-title"]}>Description</h2>

            <p className={styles["details-desc-text"]}>
              {productData.fullDescription}
            </p>
          </div>

          <div className={styles["product-details-specs"]}>
            <h2 className={styles["details-specs-title"]}>Specifications</h2>

            <dl className={styles["details-specs-list"]}>
              {Object.entries(productData.productSpecs).map(
                ([spec, specValue]) => {
                  const label = spec[0].toUpperCase() + spec.slice(1);
                  const value = Array.isArray(specValue)
                    ? specValue.join(", ")
                    : specValue;

                  return (
                    <div key={spec} className={styles["spec-item"]}>
                      <dt className={styles["spec-name"]}>{label}</dt>

                      <span
                        className={styles["dot-spacer"]}
                        aria-hidden="true"
                      />

                      <dd className={styles["spec-value"]}>{value}</dd>
                    </div>
                  );
                },
              )}
            </dl>
          </div>
        </div>
      </section>
      <div className={styles["product-recommendations"]}>
        <Recommendations count={6} />
      </div>
    </main>
  );
}
