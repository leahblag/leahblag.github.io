import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

import '../styles/Header.css';

const ScrollToTopLink = ({ to, children }) => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(to);
    };

    return (
        <Link to={to} onClick={handleClick}>
            {children}
        </Link>
    );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="header-content">
        <nav className="nav-menu">
          <ul>
            <li><ScrollToTopLink to="/">Home</ScrollToTopLink></li>
            <li><ScrollToTopLink to="/about">About</ScrollToTopLink></li>
            <li><ScrollToTopLink to="/projects">Projects</ScrollToTopLink></li>
            <li><ScrollToTopLink to="/contact">Contact</ScrollToTopLink></li>
          </ul>
        </nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;