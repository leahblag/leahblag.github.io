import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const ScrollToTopLink = ({ to, children }) => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This makes the scroll smooth
        });
        navigate(to);
    };

    return (
        <Link to={to} onClick={handleClick}>
            {children}
        </Link>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Connect with me</h4>
                    <div className="social-icons">
                        <a href="https://github.com/leahblag" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://leahblagbrough.com/linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:your.email@example.com" aria-label="Email">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                         <li><ScrollToTopLink to="/">Home</ScrollToTopLink></li>
                         <li><ScrollToTopLink to="/about">About</ScrollToTopLink></li>
                         <li><ScrollToTopLink to="/projects">Projects</ScrollToTopLink></li>
                         <li><ScrollToTopLink to="/contact">Contact</ScrollToTopLink></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Newsletter</h4>
                    <form className="newsletter-form">
                    <input
                    id="email"
                    type="email"
                     placeholder="Enter your email"
                     required
                     autoComplete="email" // Added autocomplete attribute
/>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Leah Blagbrough. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;