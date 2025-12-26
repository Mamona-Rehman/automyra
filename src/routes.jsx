import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Integration from './pages/integration'
import Services from './pages/Services'
import Contact from './pages/contact'
import FAQs from './pages/faqs'
import CaseStudies from './pages/CaseStudies'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import LoadingSecreen from './components/layouts/LoadingSecreen'

const Layout = ({ children }) => {
  return (
    <>
      <LoadingSecreen />
      <div className="main-content">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/integration',
    element: (
      <Layout>
        <Integration />
      </Layout>
    ),
  },
  {
    path: '/services',
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: '/contact',
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: '/faqs',
    element: (
      <Layout>
        <FAQs />
      </Layout>
    ),
  },
  {
    path: '/case-studies',
    element: (
      <Layout>
        <CaseStudies />
      </Layout>
    ),
  },
])
