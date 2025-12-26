import React from 'react'
import '../../App.css'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="footer-logo">Automyra AI</div>
            <p className="text-muted">
              Transforming businesses with intelligent automation and AI-powered solutions.
            </p>
          </div>
          <div className="col-md-2">
            <h5>Product</h5>
            <a href="#solutions" className="footer-link">Solutions</a>
            <a href="#platforms" className="footer-link">Integrations</a>
            <a href="#" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">Features</a>
          </div>
          <div className="col-md-2">
            <h5>Company</h5>
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Press</a>
          </div>
          <div className="col-md-2">
            <h5>Resources</h5>
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">API Reference</a>
            <a href="#" className="footer-link">Support</a>
            <a href="#" className="footer-link">Community</a>
          </div>
          <div className="col-md-2">
            <h5>Legal</h5>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Security</a>
            <a href="#" className="footer-link">Compliance</a>
          </div>
        </div>
        <div className="row mt-5 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} Automyra AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
  