// Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { navItems } from "./helper";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">YourLogo</Link>
        </div>
        <div className="nav-items">
          {navItems.map((item, index) => (
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
            <Link to="/account">Account</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
