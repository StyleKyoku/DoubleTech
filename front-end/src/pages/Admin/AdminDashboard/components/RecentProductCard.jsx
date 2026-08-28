import styles from "../AdminDashboard.module.scss";

const RecentProductCard = ({ product }) => {
  return (
    <tr>
      <td>
        <div className={styles["item-info"]}>
          <div className={styles["item-image-wrapper"]}>
            <img
              src={import.meta.env.BASE_URL + product.imageUrls[0]}
              alt={product.title}
              className={styles["item-image"]}
            />
          </div>
          <span className={styles["item-name"]}>{product.title}</span>
        </div>
      </td>
      <td>{product.category}</td>
      <td>${product.onSale ? product.oldPrice : product.price}</td>
      <td
        className={`${styles["item-old-price"]} ${product.onSale ? styles["on-sale"] : ""}`}
      >
        {product.onSale ? `$${product.price}` : "-"}
      </td>
      <td>
        <span
          className={`${styles["item-status-badge"]} ${product.onSale ? styles["on-sale"] : styles["regular"]}`}
        >
          {product.onSale ? "On Sale" : "Regular"}
        </span>
      </td>
      <td>
        <button className={styles["item-edit-button"]}>Edit</button>
      </td>
    </tr>
  );
};

export default RecentProductCard;
