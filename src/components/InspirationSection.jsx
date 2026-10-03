import React, { useState } from "react";

import room1 from "../assets/insp1.png";
import room2 from "../assets/insp2.png";
import room3 from "../assets/room2.png";
import room4 from "../assets/insp3.png";
import { Link } from "react-router-dom";
import "./InspirationSection.css"

function InspirationSection() {
    const slides = [
        { img: room1, category: "01 — Bed Room", title: "Inner Peace" },
        { img: room2, category: "02 — Dining Room", title: "Modern Dining" },
        { img: room3, category: "03 — Living Room", title: "Cozy Corner" },
        { img: room4, category: "04 — Kitchen", title: "Minimalist" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const nextIndex = (currentIndex + 1) % slides.length;

    return (
        <section className="inspiration-section">

            {/* LEFT CONTENT */}
            <div className="inspiration-content">

                <h2>
                    50+ Beautiful rooms
                    <br />
                    inspiration
                </h2>

                <p>
                    Our designer already made a lot of beautiful
                    <br />
                    prototype of rooms that inspire you
                </p>

                <button >
                    <Link className="explore-more-btn" to="/shop">Explore More</Link>
                </button>

            </div>

            {/* RIGHT IMAGES */}
            <div className="inspiration-gallery">

                <div className="main-room">

                    <img
                        src={slides[currentIndex].img}
                        alt="Bedroom inspiration"
                    />

                    <div className="room-info">
                        <span>{slides[currentIndex].category}</span>

                        <h3>{slides[currentIndex].title}</h3>

                        <button onClick={nextSlide}>→</button>
                    </div>

                </div>

                <div className="second-room">

                    <img
                        src={slides[nextIndex].img}
                        alt="Dining room inspiration"
                    />

                </div>

                <button className="next-room" onClick={nextSlide}>
                    →
                </button>

                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={index === currentIndex ? "active" : ""}
                            onClick={() => setCurrentIndex(index)}
                            style={{ cursor: 'pointer' }}
                        ></span>
                    ))}
                </div>

            </div>

        </section>
    );
}

export default InspirationSection;