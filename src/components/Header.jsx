import React from "react";
import logo from "/assets/images/logo.svg";
import login from "/assets/images/header/login.svg";
import cart from "/assets/images/header/cart.svg";
import search from "/assets/images/header/search.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header-nav">
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