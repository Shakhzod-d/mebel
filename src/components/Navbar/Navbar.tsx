// Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { navItems } from "./helper";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">{t("navbar.yourLogo")}</Link>
        </div>
        <div className="nav-items">
          {navItems(t).map((item, index) => (
            <div
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              key={index}
            >
              <Link to={item.path}>{item.label}</Link>
            </div>
          ))}
        </div>
        <div className="user-actions">
          <div className="account">
            <LanguageSelector />
          </div>
          <div className="account">
            <Link to="/account">{t("navbar.account")}</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
