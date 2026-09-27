import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getProductById,
    getProductsByCategory
} from "../services/productServices";

import { useCart } from "../context/CartContext";

import "./ProductDetails.css";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();


    // =========================
    // STATE
    // =========================

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [relatedLoading, setRelatedLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    const { addToCart, fetchCart } = useCart();

    const [addedToCart, setAddedToCart] = useState(false);

    const [cartError, setCartError] = useState("");

    // =========================
    // LOAD PRODUCT
    // =========================

    useEffect(() => {

        const loadProduct = async () => {

            try {

                setLoading(true);

                // Get selected product
                const data = await getProductById(id);

                setProduct(data);


                // =========================
                // GET RELATED PRODUCTS
                // =========================

                setRelatedLoading(true);

                const related = await getProductsByCategory(
                    data.categoryId
                );


                // =========================
                // HANDLE API RESPONSE
                // =========================
                //
                // API can return:
                //
                // [
                //    product1,
                //    product2
                // ]
                //
                // OR:
                //
                // {
                //    content: [...]
                // }
                //
                // =========================

                const relatedList = Array.isArray(related)
                    ? related
                    : related?.content || [];


                // =========================
                // FILTER RELATED PRODUCTS
                // =========================
                //
                // Same category
                // AND
                // Don't show selected product
                //
                // =========================

                const filteredProducts = relatedList.filter(
                    (item) =>
                        Number(item.categoryId) ===
                            Number(data.categoryId) &&
                        item.id !== data.id
                );


                setRelatedProducts(filteredProducts);

            } catch (error) {

                console.error(
                    "Error fetching product:",
                    error
                );

                setRelatedProducts([]);

            } finally {

                setLoading(false);

                setRelatedLoading(false);

            }

        };


        loadProduct();

    }, [id]);


    // =========================
    // QUANTITY
    // =========================

    const increaseQuantity = () => {

        setQuantity((previous) => previous + 1);

    };


    const decreaseQuantity = () => {

        setQuantity((previous) =>
            previous > 1 ? previous - 1 : 1
        );

    };


    // =========================
    // RELATED PRODUCT CLICK
    // =========================

    const handleRelatedProductClick = (productId) => {

        navigate(`/product/${productId}`);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // ADD TO CART
    // =========================

    const handleAddToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setCartError("");
            await addToCart(product.id, quantity);
            // Show success flash only if API succeeded
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (err) {
            setCartError("Failed to add to cart. Please try again.");
            setTimeout(() => setCartError(""), 3000);
        }

    };





    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="product-loading">
                    Loading product...
                </div>

                <Footer />
            </>
        );

    }


    // =========================
    // PRODUCT NOT FOUND
    // =========================

    if (!product) {

        return (
            <>
                <Navbar />

                <div className="product-not-found">
                    Product not found
                </div>

                <Footer />
            </>
        );

    }


    return (
        <>

            <Navbar />


            {/* =================================
                BREADCRUMB
            ================================= */}

            <div className="product-breadcrumb">

                <span>Home</span>

                <span>›</span>

                <span>Shop</span>

                <span>›</span>

                <span>{product.name}</span>

            </div>


            {/* =================================
                PRODUCT DETAILS
            ================================= */}

            <section className="product-details">


                {/* =================================
                    LEFT SIDE - IMAGE
                ================================= */}

                <div className="product-details-image">

                    <img 
                        src={product.imageUrl}
                        alt={product.name}
                    />

                </div>


                {/* =================================
                    RIGHT SIDE - INFORMATION
                ================================= */}

                <div className="product-details-info">


                    {/* PRODUCT NAME */}

                    <h1>
                        {product.name}
                    </h1>


                    {/* PRICE */}

                    <p className="details-price">

                        Rp {product.price}

                    </p>


                    {/* RATING */}

                    <div className="rating">

                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>

                        <span className="review-text">
                            5 Customer Reviews
                        </span>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="details-description">

                        {product.description}

                    </p>


                    {/* CATEGORY */}

                    <p className="category">

                        <strong>
                            Category:
                        </strong>

                        {" "}

                        {product.categoryName}

                    </p>


                    {/* =================================
                        QUANTITY
                    ================================= */}

                    <div className="quantity-box">

                        <button
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>


                        <span>
                            {quantity}
                        </span>


                        <button
                            onClick={increaseQuantity}
                        >
                            +
                        </button>

                    </div>


                    {/* =================================
                        ACTION BUTTONS
                    ================================= */}

                    <div className="product-actions">

                        <button
                            className="add-cart"
                            onClick={handleAddToCart}
                        >
                            {addedToCart ? "✓ Added!" : "Add To Cart"}
                        </button>


                        <button className="compare">

                            + Compare

                        </button>

                    </div>

                    {/* Cart error message */}
                    {cartError && (
                        <p style={{
                            color: "#c0392b",
                            fontSize: "0.85rem",
                            marginTop: "8px",
                            fontWeight: "500"
                        }}>
                            ⚠️ {cartError}
                        </p>
                    )}


                    {/* =================================
                        PRODUCT META
                    ================================= */}

                    <div className="product-meta">

                        <p>

                            <span>
                                SKU
                            </span>

                            : SS00{product.id}

                        </p>


                        <p>

                            <span>
                                Category
                            </span>

                            : {product.categoryName}

                        </p>


                        <p>

                            <span>
                                Category ID
                            </span>

                            : {product.categoryId}

                        </p>


                        <p>

                            <span>
                                Tags
                            </span>

                            : Furniture, Shop

                        </p>

                    </div>

                </div>

            </section>


            {/* =================================
                DESCRIPTION SECTION
            ================================= */}

            <section className="product-description-section">


                {/* TABS */}

                <div className="description-tabs">

                    <span className="active-tab">
                        Description
                    </span>

                    <span>
                        Additional Information
                    </span>

                    <span>
                        Reviews [5]
                    </span>

                </div>


                {/* DESCRIPTION */}

                <div className="description-content">

                    <p>
                        {product.description}
                    </p>


                    <p>
                        This product is designed with quality
                        materials and excellent craftsmanship.
                        It provides a comfortable and stylish
                        addition to your collection.
                    </p>

                </div>


                {/* DESCRIPTION IMAGES */}

                <div className="description-images">

                    <div>

                        <img style={{width:"250px", height:"300px"}}
                            src={product.imageUrl}
                            alt={product.name}
                        />

                    </div>


                    <div>

                        <img  style={{width:"250px", height:"300px"}}
                            src={product.imageUrl}
                            alt={product.name}
                        />

                    </div>

                </div>

            </section>


            {/* =================================
                RELATED PRODUCTS
            ================================= */}

            <section className="related-products">

                <h2>
                    Related Products
                </h2>


                {relatedLoading ? (

                    <div className="related-loading">

                        Loading related products...

                    </div>

                ) : relatedProducts.length === 0 ? (

                    <div className="no-related-products">

                        No related products found.

                    </div>

                ) : (

                    <div className="related-grid">

                        {relatedProducts.map((item) => (

                            <div
                                className="related-card"
                                key={item.id}
                                onClick={() =>
                                    handleRelatedProductClick(
                                        item.id
                                    )
                                }
                            >


                                {/* IMAGE */}

                                <div className="related-image">

                                    <img style={{width:"320px", height:"300px"}}
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />

                                </div>


                                {/* INFO */}

                                <div className="related-info">

                                    <h3>
                                        {item.name}
                                    </h3>


                                    <p>
                                        {item.description}
                                    </p>


                                    <p>
                                        <strong>
                                        Rp {item.price}
                                    </strong>
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* SHOW MORE */}

                {relatedProducts.length > 4 && (

                    <button
                        className="related-show-more"
                    >
                        Show More
                    </button>

                )}

            </section>


            <Footer />

        </>
    );
}


export default ProductDetails;