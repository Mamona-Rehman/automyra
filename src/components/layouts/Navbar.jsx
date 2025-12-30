import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          {/* <span className="logo-text">Automyra AI</span> */}
          
             <img src={logo} alt="Automyra AI" style={{ height: '70px' }} />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/integration') ? 'active' : ''}`} to="/integration" onClick={closeNavbar}>Integrations</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/services') ? 'active' : ''}`} to="/services" onClick={closeNavbar}>Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/case-studies') ? 'active' : ''}`} to="/case-studies" onClick={closeNavbar}>Case Studies</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/faqs') ? 'active' : ''}`} to="/faqs" onClick={closeNavbar}>FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact" onClick={closeNavbar}>Contact</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-outline-primary me-3" onClick={closeNavbar}>Schedule Demo</button>
            <div className="theme-toggle" id="themeToggle"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;