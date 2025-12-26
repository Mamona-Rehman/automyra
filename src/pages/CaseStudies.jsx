import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [animatedCards, setAnimatedCards] = useState([]);

  const caseStudies = [
    {
      id: 1,
      title: 'Virtual CTO & Head of Engineering for Fintech Automation',
      client: 'Fintech Company (Confidential)',
      role: 'Virtual CTO / Head of Engineering',
      duration: '9 Days',
      rating: 5,
      ratingCount: 5,
      challenge: 'The client needed an experienced technical leader to audit their existing systems, design scalable automation workflows, and guide engineering decisions without hiring a full-time CTO. Their fintech operations involved fragmented tools, manual processes, and growing compliance pressure.',
      solution: 'Automyra AI stepped in as a Virtual CTO, rapidly understanding the client\'s architecture and business logic. We designed and implemented end-to-end n8n automation workflows, optimized data flows, and introduced system-level improvements beyond the original scope.',
      contributions: [
        'Designed scalable automation architecture',
        'Implemented advanced n8n workflows',
        'Improved system reliability and performance',
        'Acted as technical decision-maker and advisor'
      ],
      tools: ['n8n', 'Python', 'API Integrations', 'Business Process Automation'],
      outcome: 'The client received a production-ready automation system and strategic engineering guidance—delivered faster and better than expected.',
      testimonial: 'Muhammad is a true n8n expert. He quickly understood our systems and often improved on our original ideas.',
      category: ['fintech', 'leadership', 'n8n'],
      impact: 'Production-ready system in 9 days',
      color: 'primary'
    },
    {
      id: 2,
      title: 'n8n Workflow Configuration Specialist',
      client: 'SaaS Business',
      role: 'Automation Specialist',
      duration: '9 Days',
      hours: 41,
      rating: 5,
      ratingCount: 5,
      challenge: 'The client required multiple n8n workflows configured reliably to automate internal operations, with clean logic, error handling, and maintainability.',
      solution: 'We built and refined custom n8n workflows aligned with the client\'s operational needs, ensuring stability, transparency, and scalability.',
      highlights: [
        'Rapid requirement understanding',
        'Clean, documented workflow logic',
        'Responsive iteration based on feedback'
      ],
      tools: ['n8n', 'REST APIs', 'Automation Logic'],
      outcome: 'A smooth delivery with workflows that met expectations and required minimal post-deployment fixes.',
      testimonial: 'The project went smoothly, the freelancer was responsive, and the results met my expectations.',
      category: ['saas', 'n8n', 'automation'],
      impact: 'Zero post-deployment issues',
      color: 'secondary'
    },
    {
      id: 3,
      title: 'Revolut Business & Notion Reservation Automation',
      client: 'Operations & Finance Team',
      role: 'Complex Automation Specialist',
      duration: '2 Weeks',
      rating: 5,
      ratingCount: 5,
      challenge: 'The client needed a complex financial and reservation workflow connecting Revolut Business with Notion, handling edge cases, data consistency, and automation reliability.',
      solution: 'Automyra AI built a robust multi-stage n8n workflow, handling financial data syncing, reservation logic, error recovery and validation.',
      features: [
        'Financial data syncing automation',
        'Reservation management logic',
        'Error recovery and validation systems',
        'Real-time data consistency checks'
      ],
      tools: ['n8n', 'Revolut Business API', 'Notion API'],
      outcome: 'A fully automated, reliable system that replaced manual financial tracking and reservation handling.',
      testimonial: '⭐️⭐️⭐️⭐️⭐️ A true expert. He built a very complex n8n workflow and handled every stage perfectly.',
      category: ['finance', 'n8n', 'api'],
      impact: '100% manual process elimination',
      color: 'accent'
    },
    {
      id: 4,
      title: 'Hostex → n8n → Notion Automation with Reporting',
      client: 'Property Management Business',
      role: 'Automation Architect',
      duration: '6 Days',
      rating: 5,
      ratingCount: 5,
      challenge: 'The client needed a high-performance automation pipeline that could handle large volumes of booking data, generate monthly PDF reports, and remain stable under load.',
      solution: 'We designed a production-grade automation architecture using dual n8n workers, Redis for queue management, and automated PDF report generation.',
      architecture: [
        'Dual n8n workers for high availability',
        'Redis for queue management',
        'Automated PDF report generation',
        'Scalable worker setup'
      ],
      tools: ['n8n', 'Redis', 'Notion', 'PDF Generation', 'Python'],
      outcome: 'A resilient, scalable automation system that exceeded client expectations.',
      testimonial: 'Muhammad consistently went above and beyond — even putting in extra time to ensure perfection.',
      category: ['property', 'n8n', 'scaling'],
      impact: 'Scaled to handle 10x load',
      color: 'primary'
    },
    {
      id: 5,
      title: 'Python-Based Accounting Automation',
      client: 'Accounting & Finance Firm',
      role: 'Python Automation Developer',
      duration: '5+ Months',
      hours: 315,
      budget: '$7,870+',
      rating: 4,
      ratingCount: 5,
      challenge: 'Manual accounting workflows were time-consuming, error-prone, and difficult to scale.',
      solution: 'Automyra AI developed Python-driven accounting automations, integrating data sources, automating calculations, and reducing manual work.',
      features: [
        'Automated financial data processing',
        'Error handling & validations',
        'Scalable Python architecture',
        'Multi-source data integration'
      ],
      tools: ['Python', 'Automation Scripts', 'Accounting Logic', 'Data Processing'],
      outcome: 'Significant reduction in manual accounting effort and improved data accuracy.',
      testimonial: 'Reliable and knowledgeable partner for complex accounting automation.',
      category: ['accounting', 'python', 'data'],
      impact: '90% reduction in manual work',
      color: 'secondary'
    },
    {
      id: 6,
      title: 'Data Scraping & Browser Automation Projects',
      client: 'Multiple Clients',
      role: 'Data Automation Specialist',
      duration: 'Various',
      rating: 5,
      ratingCount: 5,
      challenge: 'Clients needed fast, reliable data scraping for one-off or recurring use cases.',
      solution: 'We delivered lightweight but reliable scraping solutions using browser automation and scraping frameworks.',
      projects: [
        'E-commerce price monitoring',
        'Competitor analysis automation',
        'Lead generation scraping',
        'Market research data collection'
      ],
      tools: ['Scrapy', 'Selenium', 'Python', 'BeautifulSoup'],
      outcome: 'On-time delivery, clean data, and satisfied clients across multiple engagements.',
      testimonial: 'Consistently delivers high-quality scraping solutions on time.',
      category: ['scraping', 'python', 'automation'],
      impact: '100+ successful projects',
      color: 'accent'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Case Studies', count: caseStudies.length },
    { id: 'n8n', label: 'n8n Projects', count: caseStudies.filter(cs => cs.category.includes('n8n')).length },
    { id: 'python', label: 'Python Automation', count: caseStudies.filter(cs => cs.category.includes('python')).length },
    { id: 'finance', label: 'Finance & Accounting', count: caseStudies.filter(cs => cs.category.includes('finance') || cs.category.includes('accounting')).length },
    { id: 'leadership', label: 'Leadership', count: caseStudies.filter(cs => cs.category.includes('leadership')).length }
  ];

  const filteredCaseStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category.includes(activeFilter));

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`bi bi-star${i < rating ? '-fill' : ''}`}
        style={{ color: i < rating ? '#FFD700' : 'var(--text-muted)' }}
      ></i>
    ));
  };

  const getColorClass = (color) => {
    const colors = {
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      accent: 'var(--accent-color)'
    };
    return colors[color] || colors.primary;
  };

  useEffect(() => {
    // Trigger animations when filter changes
    setAnimatedCards([]);
    setTimeout(() => {
      setAnimatedCards(filteredCaseStudies.map(cs => cs.id));
    }, 100);
  }, [activeFilter]);

  return (
    <div className="case-studies-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="hero-title">
                Real-World <span>Automation Success Stories</span>
              </h1>
              <p className="hero-subtitle">
                Discover how businesses across industries transformed their operations with intelligent automation. 
                From fintech to property management, see how our expertise delivers measurable results.
              </p>
              <div className="mt-4">
                <a href="#caseStudies" className="btn btn-primary btn-lg me-3">
                  View Case Studies
                </a>
                <Link to="/contact" className="btn btn-outline-primary btn-lg">
                  Start Your Project
                </Link>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <i className="bi bi-graph-up-arrow" style={{ fontSize: '8rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" data-aos="fade-up">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-card">
                <h2 className="display-4 fw-bold mb-2" style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  100%
                </h2>
                <p className="text-muted mb-0">Client Satisfaction</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-card">
                <h2 className="display-4 fw-bold mb-2" style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  50+
                </h2>
                <p className="text-muted mb-0">Projects Completed</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card">
                <h2 className="display-4 fw-bold mb-2" style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  4.9/5
                </h2>
                <p className="text-muted mb-0">Average Rating</p>
              </div>
            </div>
            <div className="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-card">
                <h2 className="display-4 fw-bold mb-2" style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  315+
                </h2>
                <p className="text-muted mb-0">Hours Saved/Month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="case-studies-section" id="caseStudies">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Featured Case Studies
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Browse our portfolio of successful automation implementations
          </p>

          {/* Filter Buttons */}
          <div className="filter-buttons mb-5" data-aos="fade-up" data-aos-delay="200">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`btn ${activeFilter === filter.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label} <span className="badge bg-light text-dark ms-2">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="row g-4">
            {filteredCaseStudies.map((study, index) => (
              <div 
                key={study.id} 
                className="col-lg-6" 
                data-aos="fade-up" 
                data-aos-delay={index * 100 + 300}
              >
                <div 
                  className={`case-study-card ${animatedCards.includes(study.id) ? 'animate__animated animate__fadeInUp' : ''}`}
                  style={{ 
                    borderLeft: `4px solid ${getColorClass(study.color)}`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="case-study-header">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="badge mb-2" style={{ background: getColorClass(study.color), color: 'white' }}>
                          {study.category[0].toUpperCase()}
                        </span>
                        <h3 className="h4 mb-2">{study.title}</h3>
                        <div className="d-flex align-items-center gap-3 text-muted small mb-3">
                          <span><i className="bi bi-building me-1"></i> {study.client}</span>
                          <span><i className="bi bi-clock me-1"></i> {study.duration}</span>
                          {study.hours && (
                            <span><i className="bi bi-hourglass me-1"></i> {study.hours} hours</span>
                          )}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="rating mb-2">
                          {renderStars(study.rating)}
                          <small className="ms-2 text-muted">({study.ratingCount}.0)</small>
                        </div>
                        {study.role && (
                          <span className="badge bg-light text-dark">{study.role}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="case-study-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <h5 className="mb-3" style={{ color: getColorClass(study.color) }}>
                          <i className="bi bi-exclamation-triangle me-2"></i>The Challenge
                        </h5>
                        <p className="small text-muted">{study.challenge}</p>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h5 className="mb-3" style={{ color: getColorClass(study.color) }}>
                          <i className="bi bi-lightbulb me-2"></i>The Solution
                        </h5>
                        <p className="small text-muted">{study.solution}</p>
                      </div>
                    </div>

                    {study.contributions && (
                      <div className="mb-4">
                        <h6 className="mb-2" style={{ color: getColorClass(study.color) }}>Key Contributions</h6>
                        <ul className="list-unstyled small">
                          {study.contributions.map((item, idx) => (
                            <li key={idx} className="mb-1">
                              <i className="bi bi-check-circle-fill me-2" style={{ color: getColorClass(study.color) }}></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mb-4">
                      <h6 className="mb-2" style={{ color: getColorClass(study.color) }}>
                        <i className="bi bi-tools me-2"></i>Tools & Technologies
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {study.tools.map((tool, idx) => (
                          <span key={idx} className="badge bg-light text-dark">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="mb-2" style={{ color: getColorClass(study.color) }}>
                        <i className="bi bi-trophy me-2"></i>Outcome
                      </h6>
                      <div className="outcome-card p-3 rounded" style={{ background: `${getColorClass(study.color)}10` }}>
                        <p className="mb-0 small">{study.outcome}</p>
                        {study.impact && (
                          <div className="mt-2">
                            <span className="badge" style={{ background: getColorClass(study.color), color: 'white' }}>
                              Impact: {study.impact}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {study.testimonial && (
                      <div className="testimonial-card p-3 rounded" style={{ borderLeft: `3px solid ${getColorClass(study.color)}` }}>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-chat-quote me-2" style={{ color: getColorClass(study.color) }}></i>
                          <h6 className="mb-0" style={{ color: getColorClass(study.color) }}>Client Testimonial</h6>
                        </div>
                        <p className="mb-0 small text-muted"><em>"{study.testimonial}"</em></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card" data-aos="zoom-in">
            <h2 className="mb-4">Ready to Transform Your Business with Automation?</h2>
            <p className="lead mb-4">
              Join our satisfied clients who have streamlined operations, reduced costs, 
              and scaled their businesses with intelligent automation solutions.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary btn-lg me-3">
                Start Your Project
              </Link>
              <a href="#caseStudies" className="btn btn-outline-primary btn-lg">
                View More Case Studies
              </a>
            </div>
            <p className="mt-4 small text-muted">
              Average ROI: 3-6 months | Success Rate: 100%
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;