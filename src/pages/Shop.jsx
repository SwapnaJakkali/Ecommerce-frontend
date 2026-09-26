import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

import { getProducts } from "../services/productServices";

import "./Shop.css";
import shop from "../assets/shop.png";


function Shop() {

    // =========================
    // STATE
    // =========================

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);

    const [pageSize, setPageSize] = useState(8);

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);


    // =========================
    // FETCH PRODUCTS
    // =========================

    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);

                const data = await getProducts(
                    currentPage,
                    pageSize
                );

                // Products of current page
                setProducts(data.content);

                // Total products in database
                setTotalElements(data.totalElements);

                // Total pages
                setTotalPages(data.totalPages);

            } catch (error) {

                console.error(
                    "Error fetching products:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadProducts();

    }, [currentPage, pageSize]);


    // =========================
    // HANDLE PAGE SIZE
    // =========================

    const handlePageSizeChange = (event) => {

        const newSize = Number(event.target.value);

        setPageSize(newSize);

        // Go back to first page
        setCurrentPage(0);
    };


    // =========================
    // HANDLE PAGE CHANGE
    // =========================

    const handlePageChange = (page) => {

        setCurrentPage(page);

        // Scroll to products
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // NEXT PAGE
    // =========================

    const handleNext = () => {

        if (currentPage < totalPages - 1) {

            setCurrentPage(currentPage + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };


    return (
        <>

            <Navbar />


            {/* =========================
                SHOP BANNER
            ========================= */}

            <section
                className="shop-banner"
                style={{
                    backgroundImage: `url(${shop})`
                }}
            >

                <h1>Shop</h1>

                <p>
                    Home <span>›</span> Shop
                </p>

            </section>


            {/* =========================
                FILTER BAR
            ========================= */}

            <section className="shop-toolbar">


                {/* LEFT */}

                <div className="toolbar-left">

                    <button>
                        ☰ Filter
                    </button>

                    <span>▦</span>

                    <span>☷</span>

                    <p>
                        Showing{" "}
                        {products.length}{" "}
                        of{" "}
                        {totalElements}{" "}
                        results
                    </p>

                </div>


                {/* RIGHT */}

                <div className="toolbar-right">

                    <label>

                        Show

                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >

                            <option value={8}>
                                8
                            </option>

                            <option value={16}>
                                16
                            </option>

                            <option value={24}>
                                24
                            </option>

                        </select>

                    </label>


                    <label>

                        Sort by

                        <select>

                            <option value="default">
                                Default
                            </option>

                            <option value="price">
                                Price
                            </option>

                            <option value="name">
                                Name
                            </option>

                        </select>

                    </label>

                </div>

            </section>


            {/* =========================
                PRODUCTS
            ========================= */}

            {loading ? (

                <div className="loading">
                    Loading products...
                </div>

            ) : (

                <ProductList
                    products={products}
                />

            )}


            {/* =========================
                PAGINATION
            ========================= */}

            <div className="pagination">


                {/* PAGE NUMBERS */}

                {Array.from(
                    { length: totalPages },
                    (_, index) => (

                        <button
                            key={index}
                            className={
                                currentPage === index
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                handlePageChange(index)
                            }
                        >

                            {index + 1}

                        </button>

                    )
                )}


                {/* NEXT */}

                <button
                    onClick={handleNext}
                    disabled={
                        currentPage ===
                        totalPages - 1
                    }
                >

                    Next

                </button>

            </div>


            <Footer />

        </>
    );
}


export default Shop;