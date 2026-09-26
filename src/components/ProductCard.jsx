import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
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

            </div>

            <div className="product-info">

                <h3>
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-price">
                    Rp {product.price}
                </div>

            </div>

        </div>
    );
}

export default ProductCard;