import React from "react";
import logo from "../assets/icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"

import {
    faUser,
    faMagnifyingGlass,
    faHeart,
    faCartShopping,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const navigate = useNavigate();
    const { totalItems } = useCart();
    const { user, isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Get first name only for display
    const firstName = user?.name?.split(" ")[0] || "";

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="icon furnio" />
                <span>Furniro</span>
            </div>
            <div className="nav-links">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div className="nav-icons">

                {/* USER — shows name if logged in */}
                {isLoggedIn ? (
                    <div className="navbar-user-info">
                        <span className="navbar-user-name">
                            <FontAwesomeIcon icon={faUser} />
                            {" "}{firstName}
                        </span>
                        <button
                            className="navbar-logout-btn"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            Logout <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    </div>
                ) : (
                    <button
                        className="navbar-login-btn"
                        onClick={() => navigate("/login")}
                        title="Login"
                    >
                        Login <FontAwesomeIcon icon={faUser} />
                    </button>
                )}

                <span>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>

                <span>
                    <FontAwesomeIcon icon={faHeart} />
                </span>

                <span
                    className="navbar-cart-icon"
                    onClick={() => navigate("/cart")}
                    title="View Cart"
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
                </span>
            </div>
        </nav>
    );
}
export default Navbar;
