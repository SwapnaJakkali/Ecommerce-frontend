import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

import { getProducts } from "../services/productServices";

import "./Shop.css";
import shop from "../assets/shop.png";
import shop1 from "../assets/shop1.png";


function Shop() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("default");

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


    // =========================
    // FILTERED & SORTED PRODUCTS
    // =========================

    const displayedProducts = useMemo(() => {
        let result = products;

        // Filter by search query
        if (searchQuery) {
            result = result.filter(p =>
                p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortBy === "price") {
            // Assumes price is a number or can be parsed as one
            result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "name") {
            result = [...result].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        }

        return result;
    }, [products, searchQuery, sortBy]);


    return (
        <>

            <Navbar />

            <section
                className="shop-banner"
                style={{
                    backgroundImage: `url(${shop1})`
                }}
            >

                <h1>Shop</h1>

                <p>
                    Home <span>›</span> Shop
                </p>

            </section>


            <section className="shop-toolbar">


                {/* LEFT */}

                <div className="toolbar-left">

                    <p>
                        Showing{" "}
                        {displayedProducts.length}{" "}
                        of{" "}
                        {totalElements}{" "}
                        results
                        {searchQuery && <span> (filtered by "{searchQuery}")</span>}
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

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >

                            <option value="default">
                                Default
                            </option>

                            <option value="price">
                                Price (Low to High)
                            </option>

                            <option value="name">
                                Name (A-Z)
                            </option>

                        </select>

                    </label>

                </div>

            </section>


            {loading ? (

                <div className="loading">
                    Loading products...
                </div>

            ) : (

                <ProductList
                    products={displayedProducts}
                />

            )}



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