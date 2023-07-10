import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <header>
      <nav>
        <div className="navbar__item--logo">
          <Link to={"/"}>
            <span>Shop</span>
          </Link>
        </div>

        <div className="navbar__item--search">
          <SearchBar />
        </div>

        <div className="navbar__item--btns">
          <div className="navbar__item--liked">
            <Link to={"/liked"}>
              <img src="../assets/icons-love.png" alt="" />
            </Link>
          </div>
          <div className="navbar__item--cart">
            <Link to={"/cart"}>
              <img src="../assets/icons-cart.png" alt="" />
            </Link>
          </div>
          {isLogin ? (
            <div className="navbar__item--user">
              <Link to={"/login"}>
                <img src="../assets/icons-user.png" alt="" />
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>
              <button
                className="navbar__item--login-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
