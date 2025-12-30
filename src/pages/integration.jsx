import React, { useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './integration.css'

const Integration = () => {
  const ecosystemVisualizationRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })

    const createEcosystemVisualization = () => {
      const container = ecosystemVisualizationRef.current
      if (!container) return

      container.innerHTML = ''

      /* ===== Padding-aware center calculation ===== */
      const styles = getComputedStyle(container)
      const paddingX = parseFloat(styles.paddingLeft) || 0
      const paddingY = parseFloat(styles.paddingTop) || 0

      const usableWidth = container.clientWidth - paddingX * 2
      const usableHeight = container.clientHeight - paddingY * 2

      const centerX = paddingX + usableWidth / 2
      const centerY = paddingY + usableHeight / 2

      const baseSize = Math.min(usableWidth, usableHeight)
      const radius = baseSize * 0.32
      const orbitRadius = baseSize * 0.46

      /* ===== Center Node ===== */
      const centerNode = document.createElement('div')
      centerNode.className = 'ecosystem-center'
      centerNode.innerHTML = '<i class="bi bi-cpu-fill"></i>'
      container.appendChild(centerNode)

      /* ===== Category Nodes ===== */
      const categories = [
        { icon: 'bi-lightbulb', angle: 0 },
        { icon: 'bi-chat-dots', angle: 60 },
        { icon: 'bi-graph-up', angle: 120 },
        { icon: 'bi-cash-coin', angle: 180 },
        { icon: 'bi-megaphone', angle: 240 },
        { icon: 'bi-cpu', angle: 300 },
      ]

      categories.forEach(category => {
        const angle = (category.angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        const node = document.createElement('div')
        node.className = 'ecosystem-node'
        node.style.left = `${x - 40}px`
        node.style.top = `${y - 40}px`
        node.innerHTML = `<i class="bi ${category.icon}"></i>`
        container.appendChild(node)

        /* Connection Line */
        const length = Math.hypot(x - centerX, y - centerY)
        const rotation =
          (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI

        const line = document.createElement('div')
        line.className = 'ecosystem-connection'
        line.style.left = `${centerX}px`
        line.style.top = `${centerY}px`
        line.style.width = `${length}px`
        line.style.transform = `rotate(${rotation}deg)`
        container.appendChild(line)

        /* Data Flow */
        for (let i = 0; i < 3; i++) {
          const flow = document.createElement('div')
          flow.className = 'ecosystem-data-flow'
          container.appendChild(flow)

          let progress = Math.random() * 100
          const speed = 0.4 + Math.random() * 0.6

          const animate = () => {
            progress += speed
            if (progress > 100) progress = 0

            flow.style.left = `${
              centerX +
              (length * progress) / 100 *
                Math.cos((rotation * Math.PI) / 180)
            }px`
            flow.style.top = `${
              centerY +
              (length * progress) / 100 *
                Math.sin((rotation * Math.PI) / 180)
            }px`

            requestAnimationFrame(animate)
          }

          setTimeout(animate, 2000 + i * 400)
        }
      })

      /* ===== Orbiting Platforms ===== */
      const platformCount = 24
      for (let i = 0; i < platformCount; i++) {
        const angle = (i / platformCount) * Math.PI * 2
        const x = centerX + orbitRadius * Math.cos(angle)
        const y = centerY + orbitRadius * Math.sin(angle)

        const platform = document.createElement('div')
        platform.className = 'ecosystem-node small'
        platform.style.left = `${x - 20}px`
        platform.style.top = `${y - 20}px`
        platform.innerHTML = '<i class="bi bi-circle-fill"></i>'
        container.appendChild(platform)
      }
    }

    setTimeout(createEcosystemVisualization, 300)

    const handleResize = () => {
      if (ecosystemVisualizationRef.current) {
        ecosystemVisualizationRef.current.innerHTML = ''
        createEcosystemVisualization()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">
          Connected Intelligence Ecosystem
        </h2>

        <div
          ref={ecosystemVisualizationRef}
          className="ecosystem-visualization"
        />
      </div>
    </section>
  )
}
export default Integration

