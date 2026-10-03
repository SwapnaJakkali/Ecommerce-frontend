import React from "react";
import logo from "../assets/icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"

import {
    faBars,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-svg-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-svg-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-svg-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="nav-svg-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

function Navbar() {
    const navigate = useNavigate();
    const { totalItems, setIsCartOpen } = useCart();
    const { isLoggedIn, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleUserClick = () => {
        if (isLoggedIn) {
            logout();
            navigate("/");
        } else {
            navigate("/login");
        }
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

    return (
        <header className="navbar-header">
            <nav className="navbar-container">
                <div className="logo">
                    <img src={logo} alt="Furniro Logo" />
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
                    <span
                        className="navbar-icon-btn"
                        onClick={handleUserClick}
                        title={isLoggedIn ? "Logout" : "Login"}
                    >
                        <UserIcon />
                    </span>

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
                        <span 
                            className="navbar-icon-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            title="Search"
                        >
                            <SearchIcon />
                        </span>
                    </span>

                    <span className="navbar-icon-btn" title="Wishlist">
                        <HeartIcon />
                    </span>

                    <span
                        className="navbar-icon-btn navbar-cart-btn"
                        onClick={() => setIsCartOpen(true)}
                        title="View Cart"
                    >
                        <CartIcon />
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </span>
                    
                    <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default Navbar;
