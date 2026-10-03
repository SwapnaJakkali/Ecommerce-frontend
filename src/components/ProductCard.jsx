import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="action-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
  </svg>
)

const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="action-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
)

const LikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="action-icon">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
)

function ProductCard({ product }) {

    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        try {
            await addToCart(product.id, 1);
            setIsCartOpen(true);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    return (
        <div
            className="product-card"
            onClick={handleClick}
        >

            <div className="product-image-container">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                />

                {/* Overlaid Badges would go here normally */}
            </div>

            {/* Hover Overlay */}
            <div className="product-hover-overlay">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to cart
                </button>
                <div className="product-actions">
                    <span onClick={(e) => { e.stopPropagation(); }}><ShareIcon /> Share</span>
                    <span onClick={(e) => { e.stopPropagation(); }}><CompareIcon /> Compare</span>
                    <span onClick={(e) => { e.stopPropagation(); }}><LikeIcon /> Like</span>
                </div>
            </div>

            <div className="product-info">

                <h3>
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-price">
                    Rs {product.price}
                </div>

            </div>

        </div>
    );
}

export default ProductCard;