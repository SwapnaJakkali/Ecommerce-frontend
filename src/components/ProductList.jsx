import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products }) {

  return (
    <section className="products-section">

      <h2>Our Products</h2>

      <div className="products-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      <button className="show-more-button">
        Show More
      </button>

    </section>
  );
}

export default ProductList;