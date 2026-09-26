import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Range from "../components/Range";
import ProductList from "../components/ProductList";
import InspirationSection from "../components/InspirationSection";
import FurnitureGallery from "../components/FurnitureGallery";
import Footer from "../components/Footer";

import { getProducts } from "../services/productServices";

import heroImage from "../assets/hero.png";
import "./Home.css";


function Home() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();


    // =========================
    // FETCH PRODUCTS
    // =========================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts(1,26);

                // Backend response:
                // data.content = products

                setProducts(data.content);

            } catch (error) {

                console.error(
                    "Error fetching products:",
                    error
                );

            }

        };

        fetchProducts();

    }, []);


    return (
        <>

            <Navbar />


            {/* =========================
                HERO SECTION
            ========================= */}

            <section
                className="hero"
                style={{
                    backgroundImage: `url(${heroImage})`
                }}
            >

                <div className="hero-content">

                    <p className="hero-title">
                        New Arrival
                    </p>

                    <h1>
                        Discover Our
                        <br />
                        New Collection
                    </h1>

                    <p className="hero-description">
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                        Ut elit tellus, luctus nec
                        ullamcorper mattis.
                    </p>

                    <button
                        className="hero-button"
                        onClick={() => navigate("/shop")}
                    >
                        BUY NOW
                    </button>

                </div>

            </section>


            {/* =========================
                RANGE SECTION
            ========================= */}

            <Range />


            {/* =========================
                PRODUCTS
            ========================= */}

            <ProductList
                products={products}
            />


            {/* =========================
                INSPIRATION
            ========================= */}

            <InspirationSection />


            {/* =========================
                FURNITURE GALLERY
            ========================= */}

            <FurnitureGallery />


            {/* =========================
                FOOTER
            ========================= */}

            <Footer />

        </>
    );
}


export default Home;