import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div>
            <footer>
                <div>
                    <p className="footer-heading">Online Store</p>
                    <a href="#clothing-section-main" className="footer-link">
                        Men Clothing
                    </a>
                    <a href="#clothing-section-main" className="footer-link">
                        Women Clothing
                    </a>
                    <a href="#clothing-section-main" className="footer-link">
                        Men Accessories
                    </a>
                    <a href="#clothing-section-main" className="footer-link">
                        Women Accessories
                    </a>
                </div>
                <div>
                    <p className="footer-heading">Helpful Links</p>
                    <a href="#clothing-section-main" className="footer-link">
                        Home
                    </a>
                    <a href="#" className="footer-link">
                        About
                    </a>
                    <a href="#" className="footer-link">
                        Contact
                    </a>
                </div>
                <div>
                    <p className="footer-heading">Partners</p>
                    <a href="#" className="footer-link">
                        Zara
                    </a>
                    <a href="#" className="footer-link">
                        Pantaloons
                    </a>
                    <a href="#" className="footer-link">
                        Levis
                    </a>
                    <a href="#" className="footer-link">
                        UCB
                    </a>
                    <a href="#" className="footer-link">
                        + Many More
                    </a>
                </div>
                <div>
                    <p className="footer-heading">Address</p>
                    <a href="#" className="footer-link">
                        Building 101
                    </a>
                    <a href="#" className="footer-link">
                        Central Avenue
                    </a>
                    <a href="#" className="footer-link">
                        LA - 902722
                    </a>
                    <a href="#" className="footer-link">
                        United States
                    </a>
                </div>
            </footer>

        </div>
    )
}

export default Footer