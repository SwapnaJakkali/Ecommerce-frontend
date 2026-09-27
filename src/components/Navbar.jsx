import React from "react";
import logo from "../assets/icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from "react-router-dom";
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
    const { totalItems, setIsCartOpen } = useCart();
    const { user, isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleScrollToFooter = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><a href="#footer" onClick={handleScrollToFooter}>Contact</a></li>
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
                    onClick={() => setIsCartOpen(true)}
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
