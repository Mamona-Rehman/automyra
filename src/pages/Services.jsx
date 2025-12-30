import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../App.css';

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Counter animation function
    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          if (target % 1 === 0) {
            element.textContent = Math.floor(target) + '+'
          } else {
            element.textContent = target.toFixed(1)
          }
          clearInterval(timer)
        } else {
          if (target % 1 === 0) {
            element.textContent = Math.floor(current)
          } else {
            element.textContent = current.toFixed(1)
          }
        }
      }, 20)
    }

    // Start counter animations after loading screen (3.2s delay)
    setTimeout(() => {
      const counters = document.querySelectorAll('.counter')
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'))
        animateCounter(counter, target)
      })
    }, 3200)

    // Refresh AOS after content loads
    setTimeout(() => {
      AOS.refresh();
    }, 3200);
  }, []);

  const services = [
    {
      icon: 'bi-robot',
      title: 'Intelligent Process Automation',
      description: 'Self-learning workflows that adapt to patterns, predict bottlenecks, and optimize processes in real-time.',
      badges: ['Adaptive AI', 'Predictive Optimization']
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Document Intelligence',
      description: 'AI-powered document parsing, classification, and data extraction with human-level accuracy and contextual understanding.',
      badges: ['OCR++', 'Contextual Understanding']
    },
    {
      icon: 'bi-bar-chart',
      title: 'Predictive Analytics',
      description: 'Advanced analytics and forecasting models that provide actionable insights and predict business outcomes.',
      badges: ['Forecasting', 'Anomaly Detection']
    },
    {
      icon: 'bi-chat-left-text',
      title: 'Conversational AI',
      description: 'Intelligent chatbots and virtual assistants that understand context, learn from interactions, and provide personalized responses.',
      badges: ['NLP', 'Contextual Memory']
    },
    {
      icon: 'bi-eye',
      title: 'Computer Vision',
      description: 'Visual recognition systems for quality control, inventory management, and process monitoring with millimeter precision.',
      badges: ['Object Detection', 'Quality Assurance']
    },
    {
      icon: 'bi-shield-check',
      title: 'AI Security & Compliance',
      description: 'Intelligent threat detection, compliance monitoring, and risk assessment systems that learn and adapt to new threats.',
      badges: ['Threat Detection', 'Compliance AI']
    }
  ];

  const capabilities = [
    {
      icon: 'bi-cpu',
      title: 'Machine Learning',
      description: 'Self-improving algorithms that learn from data patterns, adapt to changes, and optimize performance over time.'
    },
    {
      icon: 'bi-translate',
      title: 'Natural Language Processing',
      description: 'Understand, interpret, and generate human language with context-aware comprehension and semantic analysis.'
    },
    {
      icon: 'bi-eye-fill',
      title: 'Computer Vision',
      description: 'Advanced image and video analysis for object recognition, pattern detection, and visual data interpretation.'
    },
    {
      icon: 'bi-diagram-3',
      title: 'Neural Networks',
      description: 'Deep learning architectures that simulate human brain functions for complex pattern recognition and prediction.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Predictive Analytics',
      description: 'Statistical models and machine learning algorithms that forecast future trends and behaviors.'
    },
    {
      icon: 'bi-shuffle',
      title: 'Reinforcement Learning',
      description: 'AI systems that learn optimal behaviors through trial and error, continuously improving decision-making.'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="hero-title">
                AI Automation <span>Services</span>
              </h1>
              <p className="hero-subtitle">
                Comprehensive AI solutions designed to transform your business operations. 
                From intelligent workflow automation to predictive analytics, we deliver 
                cutting-edge AI services that drive measurable results.
              </p>
              <div className="mt-4">
                <Link to="/contact" className="btn btn-primary btn-lg me-3">Get Started</Link>
                <Link to="/case-studies" className="btn btn-outline-primary btn-lg">View Case Studies</Link>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <i className="bi bi-cpu-fill" style={{ fontSize: '8rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="stats-card">
                <div className="stats-icon-services">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <div className="counter" data-count="17">0</div>
                <h4>FASTER PROCESSING</h4>
                <p className="">Document review and data extraction</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="stats-card">
                <div className="stats-icon-services">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <div className="counter" data-count="99.2">0</div>
                <h4>% ACCURACY RATE</h4>
                <p className="">AI model performance across tasks</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="stats-card">
                <div className="stats-icon-services">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="counter" data-count="200">0</div>
                <h4>K AVERAGE SAVINGS</h4>
                <p className="">Annual cost reduction for clients</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="stats-card">
                <div className="stats-icon-services">
                  <i className="bi bi-people"></i>
                </div>
                <div className="counter" data-count="500">0</div>
                <h4>HOURS SAVED</h4>
                <p className="">Monthly automation efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5" style={{ background: 'var(--darker-bg)' }}>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">AI Automation Solutions</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Comprehensive AI solutions designed to transform your business operations
          </p>
          
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="solution-card" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                  <div className="solution-icon">
                    <i className={`bi ${service.icon}`}></i>
                  </div>
                  <h4>{service.title}</h4>
                  <p className="">{service.description}</p>
                  <div className="mt-3">
                    {service.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className="badge bg-primary bg-opacity-10 text-primary me-2">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="ai-showcase py-5">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Advanced AI Capabilities</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Cutting-edge AI technologies powering intelligent automation
          </p>
          
          <div className="row g-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="ai-feature-card" >
                  <div className="ai-feature-icon">
                    <i className={`bi ${capability.icon}`}></i>
                  </div>
                  <h4>{capability.title}</h4>
                  <p className="">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-flow py-5" style={{ background: 'var(--darker-bg)' }}>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Our Service Process</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            A seamless journey from consultation to intelligent automation
          </p>
          
          <div className="row g-4 mt-5">
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="text-center">
                <div className="solution-icon mx-auto mb-3">
                  <i className="bi bi-search"></i>
                </div>
                <h5>Discovery</h5>
                <p className="text-muted">We analyze your business processes and identify automation opportunities.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="text-center">
                <div className="solution-icon mx-auto mb-3">
                  <i className="bi bi-lightbulb"></i>
                </div>
                <h5>Design</h5>
                <p className="text-muted">We create custom AI solutions tailored to your specific needs.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="text-center">
                <div className="solution-icon mx-auto mb-3">
                  <i className="bi bi-gear"></i>
                </div>
                <h5>Development</h5>
                <p className="text-muted">We build and deploy intelligent automation systems with precision.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
              <div className="text-center">
                <div className="solution-icon mx-auto mb-3">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h5>Optimization</h5>
                <p className="text-muted">We continuously monitor and improve your AI systems for peak performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-card" data-aos="zoom-in">
            <h2 className="mb-4">Ready to Transform Your Business with AI?</h2>
            <p className="lead mb-4">
              Schedule a personalized demo to see how our AI automation solutions can revolutionize your operations.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary btn-lg me-3">Schedule a Demo</Link>
              <Link to="/contact" className="btn btn-outline-primary btn-lg">Contact Our AI Experts</Link>
            </div>
            <p className="text-muted mt-4 small">
              Average ROI achieved within first 30 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

