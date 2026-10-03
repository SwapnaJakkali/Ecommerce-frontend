import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Range from "../components/Range";
import ProductList from "../components/ProductList";
import InspirationSection from "../components/InspirationSection";
import FurnitureGallery from "../components/FurnitureGallery";
import Footer from "../components/Footer";

import { getProducts } from "../services/productServices";

import heroImage from "../assets/home.png";
import "./Home.css";


function Home() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();


    // =========================
    // FETCH PRODUCTS
    // =========================

    const fetchProducts = async (pageNumber) => {
        setIsLoading(true);
        try {
            // Artificial delay to show loading state as requested ("take time")
            await new Promise((resolve) => setTimeout(resolve, 800));

            const data = await getProducts(pageNumber, 8);

            // Backend response:
            // data.content = products
            
            if (pageNumber === 1) {
                setProducts(data.content);
            } else {
                setProducts(prevProducts => [...prevProducts, ...data.content]);
            }

            if (data.content.length < 8 || data.last) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, []);

    const handleShowMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };


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
                onShowMore={handleShowMore}
                isLoading={isLoading}
                hasMore={hasMore}
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