import React from "react";

import gallery1 from "../assets/gallery-1.png";
import gallery2 from "../assets/gallery-2.png";
import gallery3 from "../assets/gallery-3.png";
import gallery4 from "../assets/gallery-4.png";
import gallery5 from "../assets/gallery-5.png";
import gallery6 from "../assets/gallery-6.png";
import gallery7 from "../assets/gallery-7.png";
import gallery8 from "../assets/gallery-8.png";
import gallery9 from "../assets/gallery-9.png";

import "./FurnitureGallery.css";

function FurnitureGallery() {
    return (
        <section className="furniture-gallery">
            {/* HEADING */}
            <div className="gallery-heading">
                <p>Share your setup with</p>
                <h2>#FuniroFurniture</h2>
            </div>

            {/* PRECISE MASONRY LAYOUT */}
            <div className="gallery-container">
                <img src={gallery1} className="g-img g-img-1" alt="Bookshelf" />
                <img src={gallery2} className="g-img g-img-2" alt="Workspace" />
                <img src={gallery3} className="g-img g-img-3" alt="Armchair" />
                <img src={gallery4} className="g-img g-img-4" alt="Stools" />
                <img src={gallery5} className="g-img g-img-5" alt="Center Dining" />
                <img src={gallery7} className="g-img g-img-6" alt="Bedroom" />      {/* Note: gallery7 is the Bedroom image */}
                <img src={gallery6} className="g-img g-img-7" alt="Small Frame" />  {/* Note: gallery6 is the Small Frame */}
                <img src={gallery8} className="g-img g-img-8" alt="Far Right Dining" />
                <img src={gallery9} className="g-img g-img-9" alt="Kitchen Shelf" />
            </div>
        </section>
    );
}

export default FurnitureGallery;