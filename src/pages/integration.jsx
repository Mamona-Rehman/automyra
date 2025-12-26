import React, { useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './integration.css'

const Integration = () => {
  const ecosystemVisualizationRef = useRef(null)

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })

    // Create ecosystem visualization
    const createEcosystemVisualization = () => {
      const container = ecosystemVisualizationRef.current
      if (!container) return

      container.innerHTML = ''
      const centerX = container.offsetWidth / 2
      const centerY = container.offsetHeight / 2

      // Create center node
      const centerNode = document.createElement('div')
      centerNode.className = 'ecosystem-center'
      centerNode.innerHTML = '<i class="bi bi-cpu-fill"></i>'
      container.appendChild(centerNode)

      // Define platform categories and positions
      const categories = [
        { name: 'Productivity', icon: 'bi-lightbulb', color: '#8B5CF6', angle: 0 },
        { name: 'Communication', icon: 'bi-chat-dots', color: '#06B6D4', angle: 60 },
        { name: 'CRM', icon: 'bi-graph-up', color: '#10B981', angle: 120 },
        { name: 'Finance', icon: 'bi-cash-coin', color: '#F59E0B', angle: 180 },
        { name: 'Marketing', icon: 'bi-megaphone', color: '#EF4444', angle: 240 },
        { name: 'AI', icon: 'bi-cpu', color: '#8B5CF6', angle: 300 }
      ]

      const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.35

      // Create category nodes
      categories.forEach((category, i) => {
        const angle = (category.angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(angle) - 40
        const y = centerY + radius * Math.sin(angle) - 40

        const node = document.createElement('div')
        node.className = 'ecosystem-node'
        node.style.left = `${x}px`
        node.style.top = `${y}px`
        node.innerHTML = `<i class="bi ${category.icon}"></i>`
        container.appendChild(node)

        // Create connection line
        const lineLength = Math.sqrt(Math.pow(x + 40 - centerX, 2) + Math.pow(y + 40 - centerY, 2))
        const lineAngle = Math.atan2(y + 40 - centerY, x + 40 - centerX) * 180 / Math.PI

        const connection = document.createElement('div')
        connection.className = 'ecosystem-connection'
        connection.style.left = `${centerX}px`
        connection.style.top = `${centerY}px`
        connection.style.width = `${lineLength}px`
        connection.style.transform = `rotate(${lineAngle}deg)`
        container.appendChild(connection)

        // Create data flow animation
        for (let j = 0; j < 3; j++) {
          const flow = document.createElement('div')
          flow.className = 'ecosystem-data-flow'
          container.appendChild(flow)

          let progress = Math.random() * 100
          const speed = 0.5 + Math.random() * 0.5

          const animateFlow = () => {
            progress += speed
            if (progress > 100) progress = 0

            const currentX = centerX + (lineLength * progress / 100) * Math.cos(lineAngle * Math.PI / 180)
            const currentY = centerY + (lineLength * progress / 100) * Math.sin(lineAngle * Math.PI / 180)

            flow.style.left = `${currentX}px`
            flow.style.top = `${currentY}px`

            requestAnimationFrame(animateFlow)
          }

          // Start animation after loading screen
          setTimeout(animateFlow, 3200 + j * 500)
        }
      })

      // Create orbiting platform nodes
      const platformCount = 24
      for (let i = 0; i < platformCount; i++) {
        const orbitRadius = radius * 1.5
        const angle = (i / platformCount) * 2 * Math.PI
        const x = centerX + orbitRadius * Math.cos(angle) - 20
        const y = centerY + orbitRadius * Math.sin(angle) - 20

        const platform = document.createElement('div')
        platform.className = 'ecosystem-node'
        platform.style.left = `${x}px`
        platform.style.top = `${y}px`
        platform.style.width = '40px'
        platform.style.height = '40px'
        platform.style.fontSize = '1.2rem'
        platform.innerHTML = '<i class="bi bi-circle-fill"></i>'
        container.appendChild(platform)

        // Create connection to nearest category
        const categoryIndex = Math.floor((angle * 180 / Math.PI) / 60) % 6
        const category = categories[categoryIndex]
        const catAngle = (category.angle * Math.PI) / 180
        const catX = centerX + radius * Math.cos(catAngle)
        const catY = centerY + radius * Math.sin(catAngle)

        const platformConnLength = Math.sqrt(Math.pow(x + 20 - catX, 2) + Math.pow(y + 20 - catY, 2))
        const platformConnAngle = Math.atan2(y + 20 - catY, x + 20 - catX) * 180 / Math.PI

        const platformConn = document.createElement('div')
        platformConn.className = 'ecosystem-connection'
        platformConn.style.left = `${catX}px`
        platformConn.style.top = `${catY}px`
        platformConn.style.width = `${platformConnLength}px`
        platformConn.style.transform = `rotate(${platformConnAngle}deg)`
        platformConn.style.opacity = '0.1'
        container.appendChild(platformConn)
      }
    }

    // Create ecosystem visualization after loading
    setTimeout(createEcosystemVisualization, 3200)

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick)
    })

    // Window resize handler for ecosystem visualization
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (ecosystemVisualizationRef.current) {
          ecosystemVisualizationRef.current.innerHTML = ''
          createEcosystemVisualization()
        }
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    // Refresh AOS after content loads
    setTimeout(() => {
      AOS.refresh()
    }, 3200)

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick)
      })
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero integration-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="hero-title">
                Intelligent <span>Integration Ecosystem</span>
              </h1>
              <p className="hero-subtitle">
                AUTOMYRA AI connects your favorite tools into one intelligent automation ecosystem.
                We build seamless integrations across business, marketing, sales, finance, operations, and AI platforms.
              </p>
              <div className="mt-4">
                <button className="btn btn-primary btn-lg me-3">Start Integration</button>
                <button className="btn btn-outline-primary btn-lg">Book Consultation</button>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="300">
              <div className="text-center">
                <i className="bi bi-plug integration-hero-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Ecosystem Visualization */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Connected Intelligence Ecosystem</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            See how Automyra AI connects all your platforms into a single intelligent system
          </p>
          
          <div className="ecosystem-visualization" ref={ecosystemVisualizationRef}>
            {/* Ecosystem visualization will be added by JavaScript */}
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section id="integrations" className="py-5">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Platform Categories</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            We integrate with hundreds of platforms across every business function
          </p>
          
          <div className="row g-4">
            {/* Productivity & Knowledge Management */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-lightbulb"></i>
                </div>
                <h4>🧠 Productivity & Knowledge Management</h4>
                <p className="text-muted mb-3">Connect your productivity tools for seamless workflow automation</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-journal-text"></i>
                    </div>
                    <h6>Notion</h6>
                    <small className="text-muted">Databases, task tracking, internal tools</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-table"></i>
                    </div>
                    <h6>Google Sheets</h6>
                    <small className="text-muted">Reporting, calculations, live data sync</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-grid-3x3"></i>
                    </div>
                    <h6>Airtable</h6>
                    <small className="text-muted">Structured workflows and automation hubs</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-check-square"></i>
                    </div>
                    <h6>ClickUp</h6>
                    <small className="text-muted">Task and operations automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-kanban"></i>
                    </div>
                    <h6>Trello</h6>
                    <small className="text-muted">Project management & workflows</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Communication & Collaboration */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <h4>💬 Communication & Collaboration</h4>
                <p className="text-muted mb-3">Automate communication flows and team collaboration</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-slack"></i>
                    </div>
                    <h6>Slack</h6>
                    <small className="text-muted">Alerts, approvals, workflow notifications</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-microsoft"></i>
                    </div>
                    <h6>Microsoft Teams</h6>
                    <small className="text-muted">Enterprise communication automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <h6>Gmail</h6>
                    <small className="text-muted">Email automation & parsing</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-whatsapp"></i>
                    </div>
                    <h6>WhatsApp Business</h6>
                    <small className="text-muted">Business messaging automation</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CRM & Sales Platforms */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h4>📊 CRM & Sales Platforms</h4>
                <p className="text-muted mb-3">Automate sales processes and customer relationship management</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-cloud"></i>
                    </div>
                    <h6>Salesforce</h6>
                    <small className="text-muted">Enterprise CRM automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <svg width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
                        <circle cx="16" cy="16" r="16" fill="#FF7A59"/>
                        <path d="M16 10a2 2 0 110-4 2 2 0 010 4zm-6.5 8a2 2 0 110-4 2 2 0 010 4zm13 0a2 2 0 110-4 2 2 0 010 4zm-6.46 4.91l-2.75-4.64a3.973 3.973 0 001.71-2.41h5.04a3.973 3.973 0 001.71 2.41l-2.75 4.64a1 1 0 01-1.74 0z" fill="#fff"/>
                      </svg>
                    </div>
                    <h6>HubSpot</h6>
                    <small className="text-muted">Marketing & sales automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-building"></i>
                    </div>
                    <h6>Zoho CRM</h6>
                    <small className="text-muted">CRM workflow automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-funnel"></i>
                    </div>
                    <h6>Pipedrive</h6>
                    <small className="text-muted">Sales pipeline automation</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payments, Finance & Accounting */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-cash-coin"></i>
                </div>
                <h4>💳 Payments, Finance & Accounting</h4>
                <p className="text-muted mb-3">Automate financial operations and payment processing</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-credit-card"></i>
                    </div>
                    <h6>Stripe</h6>
                    <small className="text-muted">Payment processing automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-paypal"></i>
                    </div>
                    <h6>PayPal</h6>
                    <small className="text-muted">Payment gateway automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-calculator"></i>
                    </div>
                    <h6>QuickBooks</h6>
                    <small className="text-muted">Accounting automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <h6>Xero</h6>
                    <small className="text-muted">Cloud accounting automation</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Marketing & Lead Generation */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="600">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-megaphone"></i>
                </div>
                <h4>📣 Marketing & Lead Generation</h4>
                <p className="text-muted mb-3">Automate marketing campaigns and lead generation</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-facebook"></i>
                    </div>
                    <h6>Facebook Lead Ads</h6>
                    <small className="text-muted">Lead capture automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-google"></i>
                    </div>
                    <h6>Google Forms</h6>
                    <small className="text-muted">Form data automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-card-checklist"></i>
                    </div>
                    <h6>Typeform</h6>
                    <small className="text-muted">Interactive form automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-envelope-paper"></i>
                    </div>
                    <h6>Mailchimp</h6>
                    <small className="text-muted">Email marketing automation</small>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI & Data Platforms */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="700">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-cpu"></i>
                </div>
                <h4>🧠 AI & Data Platforms</h4>
                <p className="text-muted mb-3">Integrate advanced AI capabilities into your workflows</p>
                
                <div className="integration-grid">
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-robot"></i>
                    </div>
                    <h6>OpenAI</h6>
                    <small className="text-muted">GPT models & AI automation</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-gemini"></i>
                    </div>
                    <h6>Google Gemini</h6>
                    <small className="text-muted">Advanced AI models</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-boxes"></i>
                    </div>
                    <h6>Hugging Face</h6>
                    <small className="text-muted">Open-source AI models</small>
                  </div>
                  <div className="integration-card">
                    <div className="integration-icon">
                      <i className="bi bi-code-slash"></i>
                    </div>
                    <h6>Custom AI Models & APIs</h6>
                    <small className="text-muted">Your proprietary AI systems</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Engines */}
      <section className="py-5 bg-darker">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">⚙️ Automation & RPA Engines</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            We enhance and connect the most powerful automation platforms
          </p>
          
          <div className="row g-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="integration-card h-100">
                <div className="integration-icon">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <h4>n8n</h4>
                <p className="text-muted">Workflow automation with AI enhancement</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="integration-card h-100">
                <div className="integration-icon">
                  <i className="bi bi-puzzle"></i>
                </div>
                <h4>Make</h4>
                <p className="text-muted">Visual automation with AI modules</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="integration-card h-100">
                <div className="integration-icon">
                  <i className="bi bi-lightning"></i>
                </div>
                <h4>Zapier</h4>
                <p className="text-muted">App integration with AI intelligence</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
              <div className="integration-card h-100">
                <div className="integration-icon">
                  <i className="bi bi-robot"></i>
                </div>
                <h4>UiPath</h4>
                <p className="text-muted">RPA with cognitive automation</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="600">
            <h3 className="mb-3">🔌 And Many More…</h3>
            <p className="lead">We continuously expand our integration ecosystem</p>
          </div>
        </div>
      </section>

      {/* Custom Integration CTA */}
      <section className="py-5">
        <div className="container">
          <div className="custom-integration-cta" data-aos="zoom-in">
            <h2 className="mb-4">Want a Custom Integration?</h2>
            <p className="lead mb-4">
              Tell us your tools — we'll connect them into a single intelligent system.
            </p>
            
            <div className="integration-requirements">
              <div className="requirement-badge">
                <i className="bi bi-cpu me-2"></i> An API
              </div>
              <div className="requirement-badge">
                <i className="bi bi-link me-2"></i> Webhooks
              </div>
              <div className="requirement-badge">
                <i className="bi bi-file-earmark-spreadsheet me-2"></i> CSV / File-based workflows
              </div>
              <div className="requirement-badge">
                <i className="bi bi-window me-2"></i> Web or Desktop UI
              </div>
            </div>
            
            <p className="h5 mt-4 mb-4">👉 We can automate it.</p>
            
            <button className="btn btn-primary btn-lg">Request Custom Integration</button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-darker">
        <div className="container">
          <div className="text-center" data-aos="fade-up">
            <h2 className="display-4 mb-4">AUTOMYRA AI — Automate Everything. Intelligently.</h2>
            <p className="lead mb-4">Connect all your tools into one intelligent automation ecosystem</p>
            <button className="btn btn-primary btn-lg me-3">Get Started Today</button>
            <button className="btn btn-outline-primary btn-lg">Book Integration Demo</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Integration

