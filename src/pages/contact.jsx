import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    platform: '',
    projectType: '',
    message: '',
    newsletter: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Animate form elements sequentially
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((element, index) => {
      setTimeout(() => {
        element.style.animation = 'fadeIn 0.6s ease-out forwards';
      }, index * 100);
    });

    // Animate info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = 'slideInRight 0.8s ease-out forwards';
      }, index * 150);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setShowSuccess(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      platform: '',
      projectType: '',
      message: '',
      newsletter: true
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center" data-aos="fade-up">
              <h1 className="hero-title">
                Get in <span>Touch</span> With Us
              </h1>
              <p className="hero-subtitle">
                Have questions about automation? Need expert advice on n8n, Zapier, Make.com, or UiPath? 
                Our team is ready to help you transform your workflows.
              </p>
              <div className="mt-4 animate__animated animate__pulse animate__infinite">
                <i className="bi bi-arrow-down" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contactForm">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Contact Our Experts</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
          
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-12" data-aos="fade-right" data-aos-delay="200">
              <div className="contact-card">
                {!showSuccess ? (
                  <form id="contactFormElement" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group" style={{ animationDelay: '0.1s' }}>
                          <label className="form-label" htmlFor="name">
                            <i className="bi bi-person"></i> Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group" style={{ animationDelay: '0.2s' }}>
                          <label className="form-label" htmlFor="email">
                            <i className="bi bi-envelope"></i> Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group" style={{ animationDelay: '0.3s' }}>
                      <label className="form-label" htmlFor="company">
                        <i className="bi bi-building"></i> Company
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group" style={{ animationDelay: '0.4s' }}>
                      <label className="form-label" htmlFor="platform">
                        <i className="bi bi-puzzle"></i> Platform of Interest
                      </label>
                      <select
                        className="form-select"
                        id="platform"
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                      >
                        <option value="">Select platform</option>
                        <option value="n8n">n8n Automation</option>
                        <option value="zapier">Zapier Enhancement</option>
                        <option value="make">Make.com Solutions</option>
                        <option value="uipath">UiPath RPA</option>
                        <option value="multiple">Multiple Platforms</option>
                        <option value="unsure">Not Sure Yet</option>
                      </select>
                    </div>
                    
                    <div className="form-group" style={{ animationDelay: '0.5s' }}>
                      <label className="form-label" htmlFor="project-type">
                        <i className="bi bi-lightbulb"></i> Project Type
                      </label>
                      <select
                        className="form-select"
                        id="project-type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select project type</option>
                        <option value="consultation">Consultation & Planning</option>
                        <option value="implementation">Implementation Services</option>
                        <option value="migration">Platform Migration</option>
                        <option value="optimization">Workflow Optimization</option>
                        <option value="training">Team Training</option>
                        <option value="support">Ongoing Support</option>
                      </select>
                    </div>
                    
                    <div className="form-group" style={{ animationDelay: '0.6s' }}>
                      <label className="form-label" htmlFor="message">
                        <i className="bi bi-chat-text"></i> Your Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell us about your automation needs, challenges, and goals..."
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    
                    <div className="form-group" style={{ animationDelay: '0.7s' }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label text-muted" htmlFor="newsletter">
                          Receive automation tips, platform updates, and industry insights
                        </label>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg mt-3"
                      style={{ animationDelay: '0.8s' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="bi bi-arrow-repeat spin"></i> Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="success-animation active">
                    <div className="checkmark">
                      <div className="checkmark-circle"></div>
                      <div className="checkmark-check"></div>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p className="text-muted">
                      Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <button className="btn btn-outline-primary mt-3" onClick={resetForm}>
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="row g-4">
              <div className="col-md-6 col-lg-6">
                <div className="info-card" style={{ animationDelay: '0.1s' }}>
                  <div className="info-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <h5>Email Us</h5>
                  <p className="text-muted small mb-2">For detailed inquiries and documentation</p>
                  <a href="mailto:contact@automyra.com" className="btn btn-outline-primary w-100 mt-2">
                    contact@automyra.com
                  </a>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-6">
                <div className="info-card" style={{ animationDelay: '0.2s' }}>
                  <div className="info-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <h5>Call Us</h5>
                  <p className="text-muted small mb-2">Mon-Fri, 9AM-6PM EST</p>
                  <a href="tel:+15552886672" className="btn btn-outline-primary w-100 mt-2">
                    +1 (555) 288-6672
                  </a>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-6">
                <div className="info-card" style={{ animationDelay: '0.3s' }}>
                  <div className="info-icon">
                    <i className="bi bi-chat-left-text"></i>
                  </div>
                  <h5>Live Chat</h5>
                  <p className="text-muted small mb-2">Available during business hours</p>
                  <button className="btn btn-outline-primary w-100 mt-2">
                    Start Live Chat
                  </button>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-6">
                <div className="info-card" style={{ animationDelay: '0.4s' }}>
                  <div className="info-icon">
                    <i className="bi bi-clock"></i>
                  </div>
                  <h5>Response Time</h5>
                  <p className="text-muted small mb-2">We respond within 24 hours</p>
                  <div className="mt-2">
                    <span className="badge bg-primary">Email: 24 hours</span>
                    <span className="badge bg-primary ms-2">Phone: Immediate</span>
                    <span className="badge bg-primary ms-2">Chat: 5 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

