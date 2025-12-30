import React, { useEffect, useRef } from 'react'
import '../App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Home = () => {
  const neuralNetworkRef = useRef(null)
  const processContainerRef = useRef(null)

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })

    // Counter animation
    const animateCounter = (element, target) => {
      const duration = 2000
      const start = 0
      const increment = target / (duration / 16)
      let current = start
      const isDecimal = target.toString().includes('.')

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          if (isDecimal) {
            element.textContent = target.toFixed(1)
          } else {
            element.textContent = target
          }
          clearInterval(timer)
        } else {
          if (isDecimal) {
            element.textContent = current.toFixed(1)
          } else {
            element.textContent = Math.floor(current)
          }
        }
      }, 16)
    }

    // Start counter animations after loading screen (3.2s delay)
    setTimeout(() => {
      const counters = document.querySelectorAll('.counter')
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'))
        animateCounter(counter, target)
      })
    }, 3200)

    // Create neural network animation
    const createNeuralNetwork = () => {
      const container = neuralNetworkRef.current
      if (!container) return

      container.innerHTML = ''
      const neuronCount = 25
      const neurons = []

      // Create neurons
      for (let i = 0; i < neuronCount; i++) {
        const neuron = document.createElement('div')
        neuron.className = 'neuron'
        const x = Math.random() * 100
        const y = Math.random() * 100

        neuron.style.left = `${x}%`
        neuron.style.top = `${y}%`
        neuron.style.opacity = (0.3 + Math.random() * 0.4).toString()
        neuron.style.animation = `pulse ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`

        container.appendChild(neuron)
        neurons.push({ x, y, element: neuron })
      }

      // Create synapses between neurons
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          if (Math.random() > 0.7) {
            const synapse = document.createElement('div')
            synapse.className = 'synapse'
            const from = neurons[i]
            const to = neurons[j]

            const dx = to.x - from.x
            const dy = to.y - from.y
            const length = Math.sqrt(dx * dx + dy * dy) * 0.8
            const angle = Math.atan2(dy, dx) * 180 / Math.PI

            synapse.style.left = `${from.x}%`
            synapse.style.top = `${from.y}%`
            synapse.style.width = `${length}vw`
            synapse.style.transform = `rotate(${angle}deg)`
            synapse.style.opacity = (0.1 + Math.random() * 0.2).toString()

            container.appendChild(synapse)

            // Add data packets moving along synapses
            if (Math.random() > 0.8) {
              const packet = document.createElement('div')
              packet.className = 'data-packet'
              container.appendChild(packet)

              let progress = 0
              const speed = 0.5 + Math.random()

              const animatePacket = () => {
                progress += speed
                if (progress > 100) progress = 0

                const currentX = from.x + (to.x - from.x) * (progress / 100)
                const currentY = from.y + (to.y - from.y) * (progress / 100)

                packet.style.left = `${currentX}%`
                packet.style.top = `${currentY}%`

                requestAnimationFrame(animatePacket)
              }

              setTimeout(animatePacket, 3200)
            }
          }
        }
      }
    }

    // Create process flow visualization
    const createProcessFlow = () => {
      const container = processContainerRef.current
      if (!container) return

      container.innerHTML = ''
      const steps = [
        { icon: 'bi-cloud-arrow-down', title: 'Data Ingestion', desc: 'Multi-source data collection' },
        { icon: 'bi-cpu', title: 'AI Processing', desc: 'Intelligent analysis & classification' },
        { icon: 'bi-diagram-3', title: 'Workflow Automation', desc: 'Smart process orchestration' },
        { icon: 'bi-robot', title: 'Action Execution', desc: 'Automated task completion' },
        { icon: 'bi-bar-chart', title: 'Analytics & Insights', desc: 'Real-time performance tracking' },
        { icon: 'bi-arrow-clockwise', title: 'Continuous Learning', desc: 'Self-optimizing feedback loop' }
      ]

      const isMobile = window.innerWidth < 992

      if (isMobile) {
        // Stack vertically for mobile
        steps.forEach((step, i) => {
          const stepEl = document.createElement('div')
          stepEl.className = 'process-step'
        //   stepEl.style.left = '50%'
          stepEl.style.top = `${(i * 120) + 60}px`
          stepEl.style.transform = 'translateX(-50%)'
          stepEl.innerHTML = `
            <div class="process-step-icon"><i class="bi ${step.icon}"></i></div>
            <h6 class="mb-0">${step.title}</h6>
          
          `
          container.appendChild(stepEl)

          // Add connecting lines (vertical)
          if (i > 0) {
            const line = document.createElement('div')
            line.className = 'process-line'
            line.style.left = '50%'
            line.style.top = `${(i-1)*120 + 120}px`
            line.style.width = '4px'
            line.style.height = '120px'
            line.style.transform = 'translateX(-50%)'
            container.appendChild(line)

            // Add moving dot
            const dot = document.createElement('div')
            dot.className = 'process-dot'
            dot.style.left = '50%'
            dot.style.top = `${(i-1)*120 + 120}px`
            dot.style.transform = 'translate(-50%, -50%)'
            container.appendChild(dot)

            // Animate dot
            let dotProgress = 0
            const animateDot = () => {
              dotProgress += 0.5
              if (dotProgress > 100) dotProgress = 0

              dot.style.top = `${(i-1)*120 + 120 + (dotProgress/100)*120}px`
              requestAnimationFrame(animateDot)
            }

            setTimeout(animateDot, i * 500 + 3200)
          }
        })
      } else {
        // Arrange in circle for desktop
        const radius = 150
        const centerX = container.offsetWidth / 2
        const centerY = container.offsetHeight / 2

        steps.forEach((step, i) => {
          const angle = (i / steps.length) * 2 * Math.PI
          const x = centerX + radius * Math.cos(angle) - 60
          const y = centerY + radius * Math.sin(angle) - 60

          const stepEl = document.createElement('div')
          stepEl.className = 'process-step'
          stepEl.style.left = `${x}px`
          stepEl.style.top = `${y}px`
          stepEl.innerHTML = `
            <div class="process-step-icon "><i class="bi ${step.icon}"></i></div>
            <h6 class="mb-5">${step.title}</h6>
            <span class="text-muted mb-2"></span>
          
          `
          container.appendChild(stepEl)

          // Add connecting lines (circular)
          if (i > 0) {
            const prevAngle = ((i-1) / steps.length) * 2 * Math.PI
            const prevX = centerX + radius * Math.cos(prevAngle)
            const prevY = centerY + radius * Math.sin(prevAngle)
            const currX = centerX + radius * Math.cos(angle)
            const currY = centerY + radius * Math.sin(angle)

            const dx = currX - prevX
            const dy = currY - prevY
            const length = Math.sqrt(dx * dx + dy * dy)
            const lineAngle = Math.atan2(dy, dx) * 180 / Math.PI

            const line = document.createElement('div')
            line.className = 'process-line'
            line.style.left = `${prevX}px`
            line.style.top = `${prevY}px`
            line.style.width = `${length}px`
            line.style.transform = `rotate(${lineAngle}deg)`
            container.appendChild(line)

            // Add moving dot
            const dot = document.createElement('div')
            dot.className = 'process-dot'
            dot.style.left = `${prevX}px`
            dot.style.top = `${prevY}px`
            container.appendChild(dot)

            // Animate dot along arc
            let dotProgress = 0
            const animateDot = () => {
              dotProgress += 0.5
              if (dotProgress > 100) dotProgress = 0

              const currentAngle = prevAngle + (angle - prevAngle) * (dotProgress / 100)
              const currentX = centerX + radius * Math.cos(currentAngle)
              const currentY = centerY + radius * Math.sin(currentAngle)

              dot.style.left = `${currentX}px`
              dot.style.top = `${currentY}px`

              requestAnimationFrame(animateDot)
            }

            setTimeout(animateDot, i * 500 + 3200)
          }
        })
      }
    }

    // Create animations after loading
    setTimeout(createNeuralNetwork, 3200)
    setTimeout(createProcessFlow, 3500)

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

    // Window resize handler for process flow
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (processContainerRef.current) {
          processContainerRef.current.innerHTML = ''
          createProcessFlow()
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
          {/* <!-- Hero Section with Neural Network --> */}
        <section className="hero">
            <div className="hero-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
            <div className="neural-network" ref={neuralNetworkRef}></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7" data-aos="fade-right">
                        <h1 className="hero-title">
                            Intelligent <span>Automation</span><br />
                            Powered by <span>Advanced AI</span>
                        </h1>
                        <p className="hero-subtitle">
                            We transform business processes with cutting-edge AI automation solutions. 
                            From intelligent workflow orchestration to predictive analytics, we build 
                            self-learning systems that evolve with your business.
                        </p>
                        <div className="mt-4">
                            <button className="btn btn-primary btn-lg me-3">Start AI Transformation</button>
                            <a href="/case-studies" className="btn btn-outline-primary btn-lg">View Case Studies</a>
                        </div>
                    </div>
                    <div className="col-lg-5" data-aos="fade-left" data-aos-delay="300">
                        <div
                            className="ai-animation-container"
                            style={{
                                height: "400px",
                                borderRadius: "var(--border-radius)",
                                overflow: "hidden",
                                background: "var(--card-bg)",
                                border: "1px solid var(--border-color)"
                            }}
                        >
                            {/* <!-- AI visualization will be added here --> */}
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div className="text-center p-4">
                                    <div className="mb-4">
                                        <i className="bi bi-cpu-fill" style={{fontSize: '4rem', background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}></i>
                                    </div>
                                    <h4>Live AI Processing</h4>
                                    <p className="">Real-time neural network visualization</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Platform Integrations --> */}
        <section id="platforms" className="platforms-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">AI-Powered Platform Integrations</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                    Seamlessly integrate advanced AI capabilities into your existing automation platforms
                </p>
                
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="platform-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="platform-icon">
                                <i className="bi bi-diagram-3"></i>
                            </div>
                            <h4>n8n AI Enhancement</h4>
                            <p className="">Add intelligent decision nodes, predictive routing, and self-optimizing workflows to your n8n automations.</p>
                            <div className="mt-3">
                                <span className="badge bg-dark text-light me-2">Machine Learning</span>
                                <span className="badge bg-dark text-light">Predictive Analytics</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="platform-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="platform-icon">
                                <i className="bi bi-lightning"></i>
                            </div>
                            <h4>Zapier AI Intelligence</h4>
                            <p className="">Transform Zapier workflows with natural language processing, intelligent triggers, and cognitive automation.</p>
                            <div className="mt-3">
                                <span className="badge bg-dark text-light me-2">NLP</span>
                                <span className="badge bg-dark text-light">Cognitive Automation</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="platform-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="platform-icon">
                                <i className="bi bi-puzzle"></i>
                            </div>
                            <h4>Make.com AI Modules</h4>
                            <p className="">Enhance Make.com scenarios with AI-powered content generation, classification, and quality assurance modules.</p>
                            <div className="mt-3">
                                <span className="badge bg-dark text-light me-2">Content AI</span>
                                <span className="badge bg-dark text-light">Quality Assurance</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="platform-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="platform-icon">
                                <i className="bi bi-robot"></i>
                            </div>
                            <h4>UiPath Cognitive RPA</h4>
                            <p className="">Supercharge RPA bots with computer vision, document intelligence, and conversational AI capabilities.</p>
                            <div className="mt-3">
                                <span className="badge bg-dark text-light me-2">Computer Vision</span>
                                <span className="badge bg-dark text-light">Document AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Stats Section --> */}
        <section className="py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="stats-card" data-aos="fade-up">
                            <div className="stats-icon">
                                <i className="bi bi-lightning-charge"></i>
                            </div>
                            <div className="counter" data-count="17">0</div>
                            <h4>FASTER PROCESSING</h4>
                            <p className="">Document review and data extraction</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="stats-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="stats-icon">
                                <i className="bi bi-graph-up-arrow"></i>
                            </div>
                            <div className="counter" data-count="99.2">0</div>
                            <h4>% ACCURACY RATE</h4>
                            <p className="">AI model performance across tasks</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="stats-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="stats-icon">
                                <i className="bi bi-currency-dollar"></i>
                            </div>
                            <div className="counter" data-count="200">0</div>
                            <h4>K AVERAGE SAVINGS</h4>
                            <p className="">Annual cost reduction for clients</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Solutions Section --> */}
        <section id="solutions" className="py-5">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">AI Automation Solutions</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                    Comprehensive AI solutions designed to transform your business operations
                </p>
                
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="solution-icon">
                                <i className="bi bi-robot"></i>
                            </div>
                            <h4>Intelligent Process Automation</h4>
                            <p className="">Self-learning workflows that adapt to patterns, predict bottlenecks, and optimize processes in real-time.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">Adaptive AI</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Predictive Optimization</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="solution-icon">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>
                            <h4>Document Intelligence</h4>
                            <p className="">AI-powered document parsing, classification, and data extraction with human-level accuracy and contextual understanding.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">OCR++</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Contextual Understanding</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="solution-icon">
                                <i className="bi bi-bar-chart"></i>
                            </div>
                            <h4>Predictive Analytics</h4>
                            <p className="">Advanced analytics and forecasting models that provide actionable insights and predict business outcomes.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">Forecasting</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Anomaly Detection</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="solution-icon">
                                <i className="bi bi-chat-left-text"></i>
                            </div>
                            <h4>Conversational AI</h4>
                            <p className="">Intelligent chatbots and virtual assistants that understand context, learn from interactions, and provide personalized responses.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">NLP</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Contextual Memory</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="600">
                            <div className="solution-icon">
                                <i className="bi bi-eye"></i>
                            </div>
                            <h4>Computer Vision</h4>
                            <p className="">Visual recognition systems for quality control, inventory management, and process monitoring with millimeter precision.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">Object Detection</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Quality Assurance</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="solution-card" data-aos="fade-up" data-aos-delay="700">
                            <div className="solution-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h4>AI Security & Compliance</h4>
                            <p className="">Intelligent threat detection, compliance monitoring, and risk assessment systems that learn and adapt to new threats.</p>
                            <div className="mt-3">
                                <span className="badge bg-primary bg-opacity-10 text-primary me-2">Threat Detection</span>
                                <span className="badge bg-primary bg-opacity-10 text-primary">Compliance AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- AI Process Flow --> */}
        <section id="process" className="process-flow">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Our AI Automation Process</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                    A seamless journey from data to intelligent action
                </p>
                
                <div className="process-container" ref={processContainerRef}>
                    {/* <!-- Process steps will be added by JavaScript --> */}
                </div>
            </div>
        </section>

        {/* <!-- AI Capabilities --> */}
        <section id="capabilities" className="ai-showcase">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Advanced AI Capabilities</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                    Cutting-edge AI technologies powering intelligent automation
                </p>
                
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="ai-feature-icon">
                                <span role="img" aria-label="brain" style={{fontSize: "2.5rem"}}>🧠</span>
                            </div>
                            <h4>Machine Learning</h4>
                            <p className="">Self-improving algorithms that learn from data patterns, adapt to changes, and optimize performance over time.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="ai-feature-icon">
                                <i className="bi bi-translate"></i>
                            </div>
                            <h4>Natural Language Processing</h4>
                            <p className="">Understand, interpret, and generate human language with context-aware comprehension and semantic analysis.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="ai-feature-icon">
                                <i className="bi bi-eye-fill"></i>
                            </div>
                            <h4>Computer Vision</h4>
                            <p className="">Advanced image and video analysis for object recognition, pattern detection, and visual data interpretation.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="ai-feature-icon">
                                <i className="bi bi-diagram-3"></i>
                            </div>
                            <h4>Neural Networks</h4>
                            <p className="">Deep learning architectures that simulate human brain functions for complex pattern recognition and prediction.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="600">
                            <div className="ai-feature-icon">
                                <i className="bi bi-graph-up-arrow"></i>
                            </div>
                            <h4>Predictive Analytics</h4>
                            <p className="">Statistical models and machine learning algorithms that forecast future trends and behaviors.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="ai-feature-card" data-aos="fade-up" data-aos-delay="700">
                            <div className="ai-feature-icon">
                                <i className="bi bi-shuffle"></i>
                            </div>
                            <h4>Reinforcement Learning</h4>
                            <p className="">AI systems that learn optimal behaviors through trial and error, continuously improving decision-making.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Contact CTA --> */}
        <section id="contact" className="contact-cta">
            <div className="container">
                <div className="cta-card" data-aos="zoom-in">
                    <h2 className="mb-4">Ready to Transform Your Business with AI?</h2>
                    <p className="lead text-muted mb-4">
                        Schedule a personalized demo to see how our AI automation solutions can revolutionize your operations.
                    </p>
                    <div className="mt-4">
                        <button className="btn btn-primary btn-lg me-3">Schedule a Demo</button>
                        <button className="btn btn-outline-primary btn-lg">Contact Our AI Experts</button>
                    </div>
                    <p className="text-muted mt-4 small">
                        Average ROI achieved within first 30 days
                    </p>
                </div>
            </div>
        </section>

    </>
  )
}

export default Home
  