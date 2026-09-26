import React from "react";

import room1 from "../assets/room1.png";
import room2 from "../assets/room2.png";
import "./InspirationSection.css"
function InspirationSection() {
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

                <button>
                    Explore More
                </button>

            </div>

            {/* RIGHT IMAGES */}
            <div className="inspiration-gallery">

                <div className="main-room">

                    <img
                        src={room1}
                        alt="Bedroom inspiration"
                    />

                    <div className="room-info">
                        <span>01 — Bed Room</span>

                        <h3>Inner Peace</h3>

                        <button>→</button>
                    </div>

                </div>

                <div className="second-room">

                    <img
                        src={room2}
                        alt="Dining room inspiration"
                    />

                </div>

                <button className="next-room">
                    →
                </button>

                <div className="slider-dots">
                    <span className="active"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </section>
    );
}

export default InspirationSection;