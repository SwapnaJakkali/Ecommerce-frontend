import React from "react";
import "./Footer.css"
function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                {/* Column 1 */}
                <div className="footer-column footer-info">
                    <h2>Furniro.</h2>

                    <p>
                        400 University Drive Suite 200 Coral Gables,
                        <br />
                        FL 33134 USA
                    </p>
                </div>


                {/* Column 2 */}
                <div className="footer-column">
                    <h3>Links</h3>

                    <a href="/">Home</a>
                    <a href="/shop">Shop</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>


                {/* Column 3 */}
                <div className="footer-column">
                    <h3>Help</h3>

                    <a href="#">Payment Options</a>
                    <a href="#">Returns</a>
                    <a href="#">Privacy Policies</a>
                </div>


                {/* Column 4 */}
                <div className="footer-column newsletter">
                    <h3>Newsletter</h3>

                    <div className="subscribe">
                        <input
                            type="email"
                            placeholder="Enter Your Email Address"
                        />

                        <button>SUBSCRIBE</button>
                    </div>
                </div>

            </div>


            {/* Bottom */}
            <div className="footer-bottom">
                <p>2023 furniro. All rights reserved</p>
            </div>

        </footer>
    );
}

export default Footer;