import React from "react";
import styles from "./AdminDashboard.module.scss";

import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import RecentProductCard from "./components/RecentProductCard";
import RecentUserCard from "./components/RecentUserCard";

import ProductsIcon from "../../../components/Admin/Sidebar/icons/ProductsIcon";
import UsersIcon from "../../../components/Admin/Sidebar/icons/UsersIcon";

export default function AdminDashboard() {
  const { users, usersLoading, usersError, loadUsers } = useAuth();
  const { products, productsLoading, productsError } = useProducts();

  const recentProducts = products.slice(-3).reverse();
  const recentUsers = React.useMemo(() => {
    return [...users]
      .sort((firstUser, secondUser) => secondUser.id - firstUser.id)
      .slice(0, 3);
  }, [users]);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <section className={styles["admin-dashboard"]}>
      <div className={styles["main-content"]}>
        <div className={styles["dashboard-header"]}>
          <h1>Admin Dashboard</h1>
          <p>Overview of DoubleTech products and users.</p>
        </div>
        <div className={styles["dashboard-content"]}>
          <div className={styles["dashboard-cards-wrapper"]}>
            <div
              className={`${styles["dashboard-card"]} ${styles["general-info"]}`}
            >
              <div className={styles["card-content"]}>
                <div className={styles["card-info"]}>
                  <div className={styles["card-image-wrapper"]}>
                    <ProductsIcon className={styles["card-icon"]} />
                  </div>
                  <div className={styles["card-text"]}>
                    <h3>Products</h3>
                    <p>{productsLoading ? "Loading..." : products.length}</p>
                  </div>
                </div>
                <div className={styles["view-all-button-wrapper"]}>
                  <button className={styles["view-all-button"]}>
                    View All
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`${styles["dashboard-card"]} ${styles["general-info"]}`}
            >
              <div className={styles["card-content"]}>
                <div className={styles["card-info"]}>
                  <div className={styles["card-image-wrapper"]}>
                    <UsersIcon className={styles["card-icon"]} />
                  </div>
                  <div className={styles["card-text"]}>
                    <h3>Users</h3>
                    <p>{usersLoading ? "Loading..." : users.length}</p>
                  </div>
                </div>
                <div className={styles["view-all-button-wrapper"]}>
                  <button className={styles["view-all-button"]}>
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles["dashboard-card"]} ${styles["recent-products"]}`}
          >
            <div className={styles["card-header"]}>
              <div className={styles["title-wrapper"]}>
                <h3>Recent Products</h3>
                <p>Latest products added to the catalog.</p>
              </div>
              <div className={styles["action-buttons-wrapper"]}>
                <button
                  className={`${styles["action-button"]} ${styles["view-action"]}`}
                >
                  View All
                </button>
                <button
                  className={`${styles["action-button"]} ${styles["add-action"]}`}
                >
                  Add product
                </button>
              </div>
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["items-table-wrapper"]}>
                <table className={styles["items-table"]}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Sale price</th>
                      <th>Pricing</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsLoading ? (
                      <tr>
                        <td className={styles["loading-item"]} colSpan="6">
                          Loading products...
                        </td>
                      </tr>
                    ) : productsError ? (
                      <tr>
                        <td className={styles["laoding-item"]} colSpan="6">
                          {productsError}
                        </td>
                      </tr>
                    ) : (
                      recentProducts.map((product) => (
                        <RecentProductCard key={product.id} product={product} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            className={`${styles["dashboard-card"]} ${styles["recent-users"]}`}
          >
            <div className={styles["card-header"]}>
              <div className={styles["title-wrapper"]}>
                <h3>Recent Users</h3>
                <p>Latest accounts created by administrators or users</p>
              </div>
              <div className={styles["action-buttons-wrapper"]}>
                <button
                  className={`${styles["action-button"]} ${styles["view-action"]}`}
                >
                  View All
                </button>
                <button
                  className={`${styles["action-button"]} ${styles["add-action"]}`}
                >
                  Add user
                </button>
              </div>
            </div>
            <div className={styles["card-content"]}>
              <div className={styles["items-table-wrapper"]}>
                <table className={styles["items-table"]}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Added</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      <tr>
                        <td className={styles["loading-item"]} colSpan="4">
                          Loading users...
                        </td>
                      </tr>
                    ) : usersError ? (
                      <tr>
                        <td className={styles["loading-item"]} colSpan="4">
                          {usersError}
                        </td>
                      </tr>
                    ) : (
                      recentUsers.map((user) => (
                        <RecentUserCard key={user.id} user={user} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
