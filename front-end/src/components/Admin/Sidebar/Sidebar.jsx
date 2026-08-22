import styles from "./Sidebar.module.scss";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import Logo from "/assets/images/logo.svg";
import DashboardIcon from "./icons/DashboardIcon";
import ProductsIcon from "./icons/ProductsIcon";
import UsersIcon from "./icons/UsersIcon";

const Sidebar = () => {
  const { logout } = useAuth();
  const linkClassName = ({ isActive }) =>
    `${styles["sidebar-link"]} ${isActive ? styles["active"] : ""}`;

  return (
    <aside className={styles.sidebar}>
      <div className={styles["main-content"]}>
        <div className={styles["logo-wrapper"]}>
          <Link to="/">
            <img src={Logo} alt="Logo" />{" "}
          </Link>
        </div>
        <div className={styles["section-area"]}>
          <div className={styles["title-wrapper"]}>
            <h2> Main area </h2>
          </div>
          <div className={styles["area-content-list"]}>
            <NavLink to="/admin" end className={linkClassName}>
              <DashboardIcon />
              Dashboard
            </NavLink>
          </div>
        </div>
        <div className={styles["section-area"]}>
          <div className={styles["title-wrapper"]}>
            <h2> Products area </h2>
          </div>
          <div className={styles["area-content-list"]}>
            <NavLink to="/admin/products" className={linkClassName}>
              <ProductsIcon />
              Products
            </NavLink>
            <NavLink to="/admin/products/add" className={linkClassName}>
              <ProductsIcon />
              Add Product
            </NavLink>
          </div>
        </div>
        <div className={styles["section-area"]}>
          <div className={styles["title-wrapper"]}>
            <h2> Users area </h2>
          </div>
          <div className={styles["area-content-list"]}>
            <NavLink to="/admin/users" className={linkClassName}>
              <UsersIcon />
              Users
            </NavLink>
            <NavLink to="/admin/users/add" className={linkClassName}>
              <UsersIcon />
              Add User
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles["logout-area"]}>
        <button onClick={logout}>Log out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
