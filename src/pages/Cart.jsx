import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import shop from "../assets/shop.png";
import qualityIcon from "../assets/quality.svg";
import warrantyIcon from "../assets/warrenty.svg";
import shippingIcon from "../assets/shipping.svg";
import supportIcon from "../assets/support.svg";


function Cart() {

    const navigate = useNavigate();

    const {
        cart,
        loading,
        error,
        totalAmount,
        updateItem,
        removeItem,
        fetchCart,
    } = useCart();

    const cartItems = cart?.items ?? [];

    useEffect(() => {
        fetchCart();
    }, []);


    // if (loading) {
    //     return (
    //         <>
    //             <Navbar />
    //             <div className="cart-loading">Loading your cart...</div>
    //             <Footer />
    //         </>
    //     );
    // }


    if (error) {
        return (
            <>
                <Navbar />
                <div className="cart-error">
                    <p>Something went wrong: {error}</p>
                    <button onClick={() => navigate("/shop")}>
                        Back to Shop
                    </button>
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <Navbar />


            <div className="cart-banner">

                <div className="cart-banner-content">

                    <h1>Cart</h1>

                    <p className="cart-breadcrumb">
                        <span
                            onClick={() => navigate("/")}
                            className="breadcrumb-link"
                        >
                            Home
                        </span>
                        <span className="breadcrumb-separator"> › </span>
                        <span>Cart</span>
                    </p>

                </div>

            </div>


            <section className="cart-section">


                {cartItems.length === 0 ? (


                    <div className="cart-empty">

                        <div className="cart-empty-icon">🛒</div>

                        <h2>Your cart is empty</h2>

                        <p>Looks like you haven't added anything yet.</p>

                        <button
                            className="cart-shop-btn"
                            onClick={() => navigate("/shop")}
                        >
                            Browse Products
                        </button>

                    </div>


                ) : (

                    <div className="cart-layout">


                        <div className="cart-table-wrapper">


                            {/* TABLE HEADER */}

                            <div className="cart-table-header">
                                <span>Product</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Subtotal</span>
                                <span></span>
                            </div>


                            {/* TABLE ROWS */}

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="cart-table-row"
                                >

                                    {/* PRODUCT */}

                                    <div
                                        className="cart-product-cell"
                                        onClick={() =>
                                            navigate(`/product/${item.productId}`)
                                        }
                                    >

                                        <div className="cart-product-image-placeholder">
                                            {/* <span>📦</span> */}
                                            <img style={{width:"60px" , height:"60px"}} src={item.imageUrl} alt="item.productName"/>
                                        </div>

                                        <span className="cart-product-name">
                                            {item.productName}
                                        </span>

                                    </div>


                                    {/* PRICE */}

                                    <span className="cart-price">
                                        Rp {item.price.toLocaleString()}
                                    </span>


                                    {/* QUANTITY */}

                                    <div className="cart-qty-control">

                                        <button
                                            className="cart-qty-btn"
                                            onClick={() =>
                                                updateItem(item.id, item.quantity - 1)
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>

                                        <span className="cart-qty-value">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="cart-qty-btn"
                                            onClick={() =>
                                                updateItem(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    {/* SUBTOTAL */}

                                    <span className="cart-subtotal">
                                        Rp {(item.price * item.quantity).toLocaleString()}
                                    </span>


                                    {/* DELETE */}

                                    <button
                                        className="cart-delete-btn"
                                        onClick={() => removeItem(item.id)}
                                        title="Remove item"
                                    >
                                        🗑
                                    </button>

                                </div>

                            ))}

                        </div>


                        {/* =========================
                            CART TOTALS PANEL
                        ========================= */}

                        <div className="cart-totals-panel">

                            <h3 className="cart-totals-title">Cart Totals</h3>

                            <div className="cart-totals-row">
                                <span>Subtotal</span>
                                <span className="cart-totals-sub">
                                    Rp {totalAmount.toLocaleString()}
                                </span>
                            </div>

                            <div className="cart-totals-divider" />

                            <div className="cart-totals-row cart-totals-total">
                                <span>Total</span>
                                <span className="cart-totals-amount">
                                    Rp {totalAmount.toLocaleString()}
                                </span>
                            </div>

                            <button
                                className="cart-checkout-btn"
                                onClick={() => navigate("/checkout")}
                            >
                                Check Out
                            </button>

                        </div>

                    </div>

                )}

            </section>


            {/* =================================
                FEATURES STRIP
            ================================= */}

            <div className="cart-features">
                <div className="cart-feature-item">
                    <span className="cart-feature-icon">
                        <img src={qualityIcon} alt="High Quality" />
                    </span>
                    <div>
                        <strong>High Quality</strong>
                        <p>crafted from top materials</p>
                    </div>
                </div>

                <div className="cart-feature-item">
                    <span className="cart-feature-icon">
                        <img src={warrantyIcon} alt="Warranty Protection" />
                    </span>
                    <div>
                        <strong>Warranty Protection</strong>
                        <p>Over 2 years</p>
                    </div>
                </div>

                <div className="cart-feature-item">
                    <span className="cart-feature-icon">
                        <img src={shippingIcon} alt="Free Shipping" />
                    </span>
                    <div>
                        <strong>Free Shipping</strong>
                        <p>Order over 150 $</p>
                    </div>
                </div>

                <div className="cart-feature-item">
                    <span className="cart-feature-icon">
                        <img src={supportIcon} alt="24 / 7 Support" />
                    </span>
                    <div>
                        <strong>24 / 7 Support</strong>
                        <p>Dedicated support</p>
                    </div>
                </div>

            </div>


            <Footer />

        </>
    );
}


export default Cart;
