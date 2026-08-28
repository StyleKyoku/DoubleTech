import React from "react";
import styles from "./Sidebar.module.scss";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import Logo from "/assets/images/logo.svg";
import SidebarChevronIcon from "./icons/SidebarChevronIcon";
import DashboardIcon from "./icons/DashboardIcon";
import ProductsIcon from "./icons/ProductsIcon";
import UsersIcon from "./icons/UsersIcon";

const Sidebar = () => {
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = React.useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const linkClassName = ({ isActive }) =>
    `${styles["sidebar-link"]} ${isActive ? styles["active"] : ""}`;

  return (
    <aside
      id="admin-sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles["toggle-sidebar-button-wrapper"]}>
        <button
          type="button"
          className={styles["toggle-sidebar-button"]}
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <SidebarChevronIcon
            className={`${styles["toggle-sidebar-icon"]} ${!isOpen ? styles["rotated"] : ""
              }`}
          />
        </button>
      </div>
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
        <div className={styles["logout-button-wrapper"]}>
          <button onClick={logout}>Log out</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
