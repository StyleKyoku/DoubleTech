import React from "react";
import logo from "/assets/images/logo.svg";
import login from "/assets/images/header/login.svg";
import cart from "/assets/images/header/cart.svg";
import search from "/assets/images/header/search.svg";
import burgerIcon from "/assets/images/header/burger.svg";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

function useAutoClose(active, setActive, refs) {
  React.useEffect(() => {
    if (!active) return;

    const handleClick = (e) => {
      const clickedInside = refs.some(
        (ref) => ref.current && ref.current.contains(e.target),
      );
      if (!clickedInside) setActive(false);
    };

    const handleScroll = () => setActive(false);

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [active, setActive, refs]);
}

const Header = ({ variant = "default" }) => {
  const [burgerActive, setBurgerActive] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);

  const navRef = React.useRef(null);
  const burgerRef = React.useRef(null);

  const searchRef = React.useRef(null);
  const searchButtonRef = React.useRef(null);

  const burgerRefs = React.useMemo(() => [navRef, burgerRef], []);
  const searchRefs = React.useMemo(() => [searchRef, searchButtonRef], []);

  useAutoClose(burgerActive, setBurgerActive, burgerRefs);
  useAutoClose(searchActive, setSearchActive, searchRefs);

  return (
    <header className={`${styles["header"]} ${styles[`header--${variant}`]}`}>
      <button
        className={styles["burger-button"]}
        ref={burgerRef}
        onClick={() => setBurgerActive((v) => !v)}
      >
        <img src={burgerIcon} alt="Menu" className={styles["burger-icon"]} />
      </button>
      <Link to="/">
        <div className={styles["header-logo"]}>
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <nav
        ref={navRef}
        className={`${styles["header-nav"]} ${burgerActive ? styles["active"] : ""}`}
      >
        <ul className={styles["header-menu"]}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/catalog">
            <li>Catalog</li>
          </Link>
          <Link to="/sales">
            <li>Sales</li>
          </Link>
          <Link to="/contacts">
            <li>Contacts</li>
          </Link>
        </ul>
      </nav>

      <div className={styles["header-spacer"]} />

      <div className={styles["header-buttons"]}>
        <button
          className={styles["search-button-mob"]}
          ref={searchButtonRef}
          onClick={() => setSearchActive((v) => !v)}
        >
          <img
            src={search}
            alt="Search"
            className={styles["header-search-icon-mob"]}
          />
        </button>

        <div
          ref={searchRef}
          className={`${styles["header-search-wrapper"]} ${searchActive ? styles["active"] : ""}`}
        >
          <img
            src={search}
            alt="Search"
            className={styles["header-search-icon"]}
          />
          <input
            type="text"
            className={`${styles["header-search"]} ${styles[`header-search--${variant}`]}`}
          />
        </div>

        <Link to="/login">
          <button className={styles["login-button"]}>
            <img src={login} alt="Log in button" />
          </button>
        </Link>
        <Link to="/cart">
          <button className={styles["cart-button"]}>
            <img src={cart} alt="Cart button" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
