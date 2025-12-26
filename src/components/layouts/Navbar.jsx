import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';

const Navbar = () => {
  const location = useLocation();

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
  }, []);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-text">Automyra AI</span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/integration') ? 'active' : ''}`} to="/integration">Integrations</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/services') ? 'active' : ''}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/case-studies') ? 'active' : ''}`} to="/case-studies">Case Studies</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/faqs') ? 'active' : ''}`} to="/faqs">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact') ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-outline-primary me-3">Schedule Demo</button>
            <div className="theme-toggle" id="themeToggle"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
