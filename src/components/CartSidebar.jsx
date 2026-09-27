import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartSidebar.css";

function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeItem, totalAmount } = useCart();
    const navigate = useNavigate();

    const cartItems = cart?.items ?? [];

    const handleClose = () => {
        setIsCartOpen(false);
    };

    const handleNavigate = (path) => {
        setIsCartOpen(false);
        navigate(path);
    };

    return (
        <>
            {/* OVERLAY */}
            <div 
                className={`cart-overlay ${isCartOpen ? "open" : ""}`} 
                onClick={handleClose}
            ></div>

            {/* SIDEBAR */}
            <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
                
                <div className="cart-sidebar-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-cart-btn" onClick={handleClose}>×</button>
                </div>

                <div className="cart-sidebar-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-msg">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="sidebar-cart-item">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.productName} 
                                    className="sidebar-item-img" 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                />
                                
                                <div className="sidebar-item-details">
                                    <p className="sidebar-item-name">{item.productName}</p>
                                    <p className="sidebar-item-price-row">
                                        <span>{item.quantity}</span> 
                                        <span className="sidebar-item-x"> x </span>
                                        <span className="sidebar-item-price">Rs. {item.price.toLocaleString()}</span>
                                    </p>
                                </div>

                                <button 
                                    className="sidebar-remove-btn" 
                                    onClick={() => removeItem(item.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-sidebar-footer">
                    <div className="sidebar-subtotal">
                        <span>Subtotal</span>
                        <span className="sidebar-subtotal-amount">Rs. {totalAmount.toLocaleString()}</span>
                    </div>

                    <div className="sidebar-actions">
                        <button className="sidebar-btn" onClick={() => handleNavigate("/cart")}>Cart</button>
                        <button className="sidebar-btn" onClick={() => handleNavigate("/checkout")}>Checkout</button>
                        <button className="sidebar-btn comparison-btn" onClick={() => handleNavigate("/comparison")}>Comparison</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartSidebar;
