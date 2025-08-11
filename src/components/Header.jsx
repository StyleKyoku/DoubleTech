import React from "react";
import logo from "/assets/images/logo.svg";
import login from "/assets/images/header/login.svg";
import cart from "/assets/images/header/cart.svg";
import search from "/assets/images/header/search.svg";
import burgerIcon from "/assets/images/header/burger.svg"

const Header = () => {
  const [Active, setActive] = React.useState(false);
  const navRef = React.useRef(null);
  const burgerRef = React.useRef(null);

  React.useEffect(() => {
    if (!Active) return;

    const handleClick = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [Active]);

  return (
    <header className="header">
      <button
        className="burger-button"
        ref={burgerRef}
        onClick={() => setActive(!Active)}
      >
        <img src={burgerIcon} alt="Menu" className="burger-icon" />
      </button>
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav
        ref={navRef}
        className={`header-nav ${Active ? "active" : ""}`}
      >
        <ul className="header-menu">
          <li>Home</li>
          <li>Catalog</li>
          <li>Sales</li>
          <li>Contacts</li>
        </ul>
      </nav>
      <div className="header-spacer"></div>
      <div className="header-buttons">
        <div className="header-search-wrapper">
          <img src={search} alt="Search" className="header-search-icon" />
          <input type="text" className="header-search" />
        </div>
        <button className="login-button">
          <img src={login} alt="Log in button" />
        </button>
        <button className="cart-button">
          <img src={cart} alt="Cart button" />
        </button>
      </div>
    </header>
  );
};

export default Header;