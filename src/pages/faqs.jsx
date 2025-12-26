import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import '../App.css';

const FAQs = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Create FAQ animation
    setTimeout(createFAQAnimation, 3200);
  }, []);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const createFAQAnimation = () => {
    const container = document.getElementById('faqAnimation');
    if (!container) return;

    const nodes = [
      { icon: 'bi-diagram-3', x: 20, y: 50, name: 'n8n' },
      { icon: 'bi-lightning', x: 40, y: 20, name: 'Zapier' },
      { icon: 'bi-puzzle', x: 60, y: 80, name: 'Make.com' },
      { icon: 'bi-robot', x: 80, y: 30, name: 'UiPath' },
      { icon: 'bi-cpu', x: 50, y: 50, name: 'AI Core' }
    ];

    // Create center AI node
    const centerNode = document.createElement('div');
    centerNode.className = 'ai-flow-node';
    centerNode.style.cssText = 'left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--gradient-primary); color: white;';
    centerNode.innerHTML = '<i class="bi bi-cpu"></i>';
    container.appendChild(centerNode);

    // Create platform nodes
    nodes.forEach((node, i) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'ai-flow-node';
      nodeEl.style.cssText = `left: ${node.x}%; top: ${node.y}%;`;
      nodeEl.innerHTML = `<i class="bi ${node.icon}"></i>`;
      container.appendChild(nodeEl);

      // Create connection lines
      const centerX = 50;
      const centerY = 50;
      const dx = node.x - centerX;
      const dy = node.y - centerY;
      const length = Math.sqrt(dx * dx + dy * dy) * 0.8;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      const connection = document.createElement('div');
      connection.className = 'ai-flow-line';
      connection.style.cssText = `left: ${centerX}%; top: ${centerY}%; width: ${length}vw; transform: rotate(${angle}deg);`;
      container.appendChild(connection);

      // Create data flow dots
      for (let j = 0; j < 2; j++) {
        const flow = document.createElement('div');
        flow.className = 'ai-data-flow';
        container.appendChild(flow);

        let progress = Math.random() * 100;
        const speed = 0.3 + Math.random() * 0.4;

        function animateFlow() {
          progress += speed;
          if (progress > 100) progress = 0;

          const currentX = centerX + (node.x - centerX) * (progress / 100);
          const currentY = centerY + (node.y - centerY) * (progress / 100);

          flow.style.left = `${currentX}%`;
          flow.style.top = `${currentY}%`;

          requestAnimationFrame(animateFlow);
        }

        setTimeout(animateFlow, 3200 + i * 200 + j * 100);
      }
    });

    // Add pulsing effect to center node
    setInterval(() => {
      centerNode.style.transform = 'translate(-50%, -50%) scale(1.1)';
      setTimeout(() => {
        centerNode.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 300);
    }, 2000);
  };

  const faqData = [
    {
      category: 'n8n Services & Integration',
      faqs: [
        {
          question: 'What makes n8n different from other automation platforms?',
          answer: (
            <>
              <p>n8n is a workflow automation tool that stands out for being open-source and self-hostable. Unlike Zapier or Make.com, n8n gives you complete control over your data and infrastructure. It's particularly powerful for:</p>
              <ul>
                <li>Complex, multi-step workflows with conditional logic</li>
                <li>Custom API integrations with full control</li>
                <li>Self-hosting for data privacy and security</li>
                <li>Extensibility through custom nodes and functions</li>
                <li>Cost-effective scaling for high-volume automation</li>
              </ul>
            </>
          )
        },
        {
          question: 'Can you help migrate from Zapier/Make.com to n8n?',
          answer: (
            <>
              <p>Yes, we specialize in platform migration services. Our migration process includes:</p>
              <ul>
                <li>Complete workflow analysis and documentation</li>
                <li>Direct migration of existing automations</li>
                <li>Performance optimization during migration</li>
                <li>Testing and validation of all migrated workflows</li>
                <li>Team training on n8n best practices</li>
                <li>Post-migration support and optimization</li>
              </ul>
              <p>We typically achieve 20-50% cost savings for clients migrating from cloud-based platforms to self-hosted n8n.</p>
            </>
          )
        },
        {
          question: 'How do you integrate AI with n8n workflows?',
          answer: (
            <>
              <p>We integrate AI capabilities into n8n through several methods:</p>
              <ul>
                <li><strong>Custom AI Nodes:</strong> We build custom n8n nodes that connect to AI APIs like OpenAI, Google Gemini, or custom models</li>
                <li><strong>AI-Powered Decision Logic:</strong> Adding intelligent routing and decision-making based on AI analysis</li>
                <li><strong>Natural Language Processing:</strong> Processing and understanding text data within workflows</li>
                <li><strong>Computer Vision Integration:</strong> Adding image and document analysis capabilities</li>
                <li><strong>Predictive Analytics:</strong> Incorporating machine learning models for forecasting and predictions</li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      category: 'Zapier & Make.com Services',
      faqs: [
        {
          question: "What's the difference between Zapier and Make.com for my business?",
          answer: (
            <>
              <p><strong>Zapier</strong> is ideal for:</p>
              <ul>
                <li>Quick, simple integrations between popular apps</li>
                <li>Non-technical users who need fast results</li>
                <li>Straightforward trigger-action workflows</li>
                <li>When you need extensive app coverage (5,000+ apps)</li>
              </ul>
              <p><strong>Make.com</strong> is better for:</p>
              <ul>
                <li>Complex, multi-step scenarios with data transformation</li>
                <li>Advanced data processing and manipulation</li>
                <li>Visual workflow design with routers and filters</li>
                <li>When you need more control over data flow and logic</li>
              </ul>
              <p>We help you choose the right platform based on your specific needs, complexity, and team expertise.</p>
            </>
          )
        },
        {
          question: 'Can you optimize my existing Zapier/Make.com workflows?',
          answer: (
            <>
              <p>Absolutely. Our optimization services typically achieve 30-70% cost reduction and significant performance improvements through:</p>
              <ul>
                <li><strong>Workflow Consolidation:</strong> Combining multiple Zaps/Scenarios into efficient single workflows</li>
                <li><strong>Efficiency Analysis:</strong> Identifying and eliminating redundant steps</li>
                <li><strong>Error Rate Reduction:</strong> Implementing robust error handling and retry logic</li>
                <li><strong>Cost Optimization:</strong> Right-sizing task usage and eliminating unnecessary operations</li>
                <li><strong>Performance Monitoring:</strong> Setting up analytics to track workflow performance</li>
                <li><strong>AI Enhancement:</strong> Adding intelligence to reduce manual steps</li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      category: 'UiPath & RPA Services',
      faqs: [
        {
          question: 'When should I consider RPA (UiPath) vs workflow automation (n8n/Zapier)?',
          answer: (
            <>
              <p><strong>Choose RPA/UiPath when:</strong></p>
              <ul>
                <li>You need to automate tasks in desktop applications without APIs</li>
                <li>Working with legacy systems that don't have modern APIs</li>
                <li>Requiring human-like interaction with software UIs</li>
                <li>High-volume, repetitive tasks with structured data</li>
                <li>Enterprise-scale automation with governance requirements</li>
              </ul>
              <p><strong>Choose workflow automation (n8n/Zapier/Make) when:</strong></p>
              <ul>
                <li>Integrating modern cloud applications with APIs</li>
                <li>Quick implementation and lower initial cost</li>
                <li>Less technical complexity and faster deployment</li>
                <li>When data already flows through APIs</li>
                <li>Smaller scale or departmental automation needs</li>
              </ul>
            </>
          )
        },
        {
          question: 'How do you add AI capabilities to UiPath RPA bots?',
          answer: (
            <>
              <p>We enhance UiPath bots with AI through several approaches:</p>
              <ul>
                <li><strong>Document Understanding:</strong> AI-powered document processing for invoices, forms, and reports</li>
                <li><strong>Computer Vision:</strong> Advanced screen scraping and element recognition</li>
                <li><strong>Natural Language Processing:</strong> Understanding and processing unstructured text</li>
                <li><strong>Cognitive Automation:</strong> Decision-making based on AI analysis</li>
                <li><strong>Predictive Analytics:</strong> Forecasting and anomaly detection in automated processes</li>
                <li><strong>Chatbot Integration:</strong> Connecting RPA workflows with conversational AI</li>
              </ul>
              <p>This typically results in 40-60% reduction in exception rates and significantly higher bot success rates.</p>
            </>
          )
        }
      ]
    },
    {
      category: 'General Services & Support',
      faqs: [
        {
          question: "What's included in your service packages?",
          answer: (
            <>
              <p>Our service packages typically include:</p>
              <ul>
                <li><strong>Discovery & Planning:</strong> Comprehensive analysis of your automation needs</li>
                <li><strong>Development & Implementation:</strong> Building and deploying your automation solutions</li>
                <li><strong>Testing & Quality Assurance:</strong> Rigorous testing to ensure reliability</li>
                <li><strong>Documentation:</strong> Complete documentation of workflows and processes</li>
                <li><strong>Training:</strong> Team training on using and maintaining automations</li>
                <li><strong>Support & Maintenance:</strong> Ongoing support and optimization services</li>
                <li><strong>Performance Monitoring:</strong> Analytics and reporting on automation performance</li>
              </ul>
              <p>We offer flexible packages from one-time implementations to ongoing managed services.</p>
            </>
          )
        },
        {
          question: 'How long does a typical automation project take?',
          answer: (
            <>
              <p>Project timelines vary based on complexity:</p>
              <ul>
                <li><strong>Simple workflows (1-2 weeks):</strong> Basic integrations between 2-3 applications</li>
                <li><strong>Medium complexity (2-4 weeks):</strong> Multi-step workflows with data transformation</li>
                <li><strong>Complex automations (4-8 weeks):</strong> Enterprise workflows with AI integration</li>
                <li><strong>RPA implementations (6-12 weeks):</strong> Desktop automation with cognitive capabilities</li>
                <li><strong>Platform migrations (4-10 weeks):</strong> Moving from one platform to another</li>
              </ul>
              <p>We provide detailed project timelines during our initial discovery phase.</p>
            </>
          )
        },
        {
          question: 'Do you offer ongoing support and maintenance?',
          answer: (
            <>
              <p>Yes, we offer comprehensive support and maintenance plans:</p>
              <ul>
                <li><strong>Basic Support:</strong> Email support with 48-hour response time</li>
                <li><strong>Standard Support:</strong> Priority support with 24-hour response, monthly optimization</li>
                <li><strong>Premium Support:</strong> 24/7 emergency support, weekly monitoring, proactive optimization</li>
                <li><strong>Managed Services:</strong> Complete management of your automation ecosystem</li>
              </ul>
              <p>Our support includes monitoring, performance optimization, updates, and continuous improvement of your automations.</p>
            </>
          )
        }
      ]
    }
  ];

  return (
    <div className="faqs-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="hero-title">
                Expert <span>AI Automation Services</span> & Support
              </h1>
              <p className="hero-subtitle">
                Professional services for n8n, Zapier, Make.com, UiPath, and custom AI automation solutions. 
                Get answers to your most common questions about our services and implementations.
              </p>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg me-3">View Service Plans</button>
                <button className="btn btn-outline-primary btn-lg">Ask a Question</button>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <i className="bi bi-question-circle" style={{ fontSize: '8rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Our Automation Platform Services</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Expert implementation, enhancement, and support for the leading automation platforms
          </p>
          
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <h3>n8n Automation Services</h3>
                <p className="text-muted">Professional n8n workflow development, optimization, and AI integration services.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle"></i> Custom n8n workflow development</li>
                  <li><i className="bi bi-check-circle"></i> AI-enhanced decision nodes</li>
                  <li><i className="bi bi-check-circle"></i> Performance optimization & scaling</li>
                  <li><i className="bi bi-check-circle"></i> Complex API integrations</li>
                  <li><i className="bi bi-check-circle"></i> Self-hosted n8n setup & maintenance</li>
                  <li><i className="bi bi-check-circle"></i> Team training & documentation</li>
                </ul>
                <div className="mt-4">
                  <button className="btn btn-outline-primary">Learn About n8n Services</button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-lightning"></i>
                </div>
                <h3>Zapier AI Enhancement</h3>
                <p className="text-muted">Transform your Zapier workflows with intelligent automation and AI capabilities.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle"></i> AI-powered Zapier workflows</li>
                  <li><i className="bi bi-check-circle"></i> Complex multi-step Zaps</li>
                  <li><i className="bi bi-check-circle"></i> Custom code steps with AI</li>
                  <li><i className="bi bi-check-circle"></i> Webhook optimization</li>
                  <li><i className="bi bi-check-circle"></i> Error handling & monitoring</li>
                  <li><i className="bi bi-check-circle"></i> Zap analytics & optimization</li>
                </ul>
                <div className="mt-4">
                  <button className="btn btn-outline-primary">Explore Zapier Services</button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-puzzle"></i>
                </div>
                <h3>Make.com Integration Services</h3>
                <p className="text-muted">Professional Make.com scenario development with advanced AI modules.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle"></i> Complex Make.com scenarios</li>
                  <li><i className="bi bi-check-circle"></i> AI-powered data processing</li>
                  <li><i className="bi bi-check-circle"></i> Custom module development</li>
                  <li><i className="bi bi-check-circle"></i> Performance optimization</li>
                  <li><i className="bi bi-check-circle"></i> Data transformation workflows</li>
                  <li><i className="bi bi-check-circle"></i> Team collaboration setup</li>
                </ul>
                <div className="mt-4">
                  <button className="btn btn-outline-primary">See Make.com Solutions</button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
              <div className="service-card">
                <div className="service-icon">
                  <i className="bi bi-robot"></i>
                </div>
                <h3>UiPath RPA Enhancement</h3>
                <p className="text-muted">Supercharge your RPA bots with AI, computer vision, and cognitive automation.</p>
                <ul className="service-features">
                  <li><i className="bi bi-check-circle"></i> AI-enhanced RPA workflows</li>
                  <li><i className="bi bi-check-circle"></i> Computer vision integration</li>
                  <li><i className="bi bi-check-circle"></i> Document intelligence automation</li>
                  <li><i className="bi bi-check-circle"></i> Process mining & optimization</li>
                  <li><i className="bi bi-check-circle"></i> Exception handling with AI</li>
                  <li><i className="bi bi-check-circle"></i> Bot performance monitoring</li>
                </ul>
                <div className="mt-4">
                  <button className="btn btn-outline-primary">Discover UiPath Services</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="comparison-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Platform Comparison</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Understand which platform is right for your automation needs
          </p>
          
          <div className="comparison-table" data-aos="fade-up" data-aos-delay="200">
            <div className="comparison-header">
              <div className="feature-cell">Feature / Platform</div>
              <div className="platform-cell">n8n</div>
              <div className="platform-cell">Zapier</div>
              <div className="platform-cell">Make.com</div>
              <div className="platform-cell">UiPath</div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Self-Hosted Option</div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">AI Integration</div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Complex Logic</div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Visual Programming</div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Desktop Automation</div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Cost Effective</div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-check-circle checkmark"></i></div>
              <div className="platform-cell"><i className="bi bi-x-circle xmark"></i></div>
            </div>
            
            <div className="comparison-row">
              <div className="feature-cell">Best For</div>
              <div className="platform-cell">Technical teams, custom workflows</div>
              <div className="platform-cell">Quick integrations, non-technical users</div>
              <div className="platform-cell">Complex scenarios, data transformation</div>
              <div className="platform-cell">Enterprise RPA, desktop automation</div>
            </div>
          </div>
          
          <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="300">
            <p className="lead">Not sure which platform is right for you? <Link to="/contact" className="text-primary">Contact our experts</Link> for a personalized recommendation.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Frequently Asked Questions</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Get answers to common questions about our automation services
          </p>
          
          {/* AI Animation for FAQ */}
          <div className="faq-animation" id="faqAnimation" data-aos="fade-up" data-aos-delay="200">
            {/* AI animation will be added by JavaScript */}
          </div>
          
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category" data-aos="fade-up" data-aos-delay={300 + categoryIndex * 100}>
              <h3 className="faq-category-title">{category.category}</h3>
              
              {category.faqs.map((faq, faqIndex) => {
                const index = `${categoryIndex}-${faqIndex}`;
                const isActive = activeFAQ === index;
                
                return (
                  <div key={faqIndex} className={`faq-card ${isActive ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                      <span>{faq.question}</span>
                      <i className={`faq-icon bi ${isActive ? 'bi-dash' : 'bi-plus'}`}></i>
                    </div>
                    <div className={`faq-answer ${isActive ? 'active' : ''}`}>
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card" data-aos="zoom-in">
            <h2 className="mb-4">Ready to Automate with Expert Guidance?</h2>
            <p className="lead mb-4">
              Whether you need n8n customization, Zapier optimization, Make.com scenarios, or UiPath RPA enhancement, 
              our team of experts is ready to help you build intelligent automation solutions.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary btn-lg me-3">Get Custom Quote</Link>
              <Link to="/contact" className="btn btn-outline-primary btn-lg">Schedule Consultation</Link>
            </div>
            <p className="mt-4 small">
              Average ROI of 3-6 months on automation investments
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;

