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
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const navigate = useNavigate();
    const { totalItems, setIsCartOpen } = useCart();
    const { user, isLoggedIn, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Get first name only for display
    // const firstName = user?.name?.split(" ")[0] || "";

    return (
        <nav className="navbar">

            <div className="logo">
                <img src={logo} alt="icon furnio" />
                <span>Furniro</span>
            </div>

            <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
                <ul>
                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
                    <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                    <li><a href="#footer" onClick={(e) => { handleScrollToFooter(e); setIsMobileMenuOpen(false); }}>Contact</a></li>
                </ul>
            </div>

            <div className="nav-icons">
                <span className="navbar-search-container">
                    {isSearchOpen && (
                        <form onSubmit={handleSearchSubmit} className="navbar-search-form">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="navbar-search-input"
                                onBlur={() => setIsSearchOpen(false)}
                            />
                        </form>
                    )}
                    <FontAwesomeIcon
                        className="navbar-search-icon"
                        icon={faMagnifyingGlass}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        title="Search"
                        style={{ cursor: 'pointer' }}
                    />
                </span>

                {/* USER — shows name if logged in */}
                {isLoggedIn ? (
                    <div className="navbar-user-info">
                        <span className="navbar-user-name">
                            <FontAwesomeIcon icon={faUser} />
                            {/* {" "}{firstName} */}
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

                {/* <span>
                    <FontAwesomeIcon icon={faHeart} />
                </span> */}

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
                <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
    <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
</div>

            </div>
        </nav>
    );
}
export default Navbar;
