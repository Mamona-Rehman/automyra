import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../App.css';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // const getLoadingMessage = () => {
  //   const path = location.pathname;
  //   if (path === '/contact') {
  //     return {
  //       subtitle: 'Connecting to Contact Systems',
  //       messages: [
  //         'Initializing contact form',
  //         'Loading contact details',
  //         'Preparing AI response system'
  //       ]
  //     };
  //   } else if (path === '/faqs') {
  //     return {
  //       subtitle: 'Loading Services & FAQ Database',
  //       messages: [
  //         'Initializing knowledge base',
  //         'Loading service information',
  //         'Preparing AI responses'
  //       ]
  //     };
  //   } else if (path === '/case-studies') {
  //     return {
  //       subtitle: 'Loading Case Studies',
  //       messages: [
  //         'Loading success stories',
  //         'Preparing project details',
  //         'Initializing portfolio'
  //       ]
  //     };
  //   } else if (path === '/integration') {
  //     return {
  //       subtitle: 'Loading Integration Platform',
  //       messages: [
  //         'Initializing integrations',
  //         'Loading platform data',
  //         'Preparing connection systems'
  //       ]
  //     };
  //   } else if (path === '/services') {
  //     return {
  //       subtitle: 'Loading AI Services',
  //       messages: [
  //         'Initializing service catalog',
  //         'Loading AI capabilities',
  //         'Preparing service details'
  //       ]
  //     };
  //   } else {
  //     return {
  //       subtitle: 'Initializing intelligent automation systems',
  //       messages: [
  //         'Loading AI modules',
  //         'Initializing neural networks',
  //         'Preparing automation engines'
  //       ]
  //     };
  //   }
  // };

  useEffect(() => {
    // Show loading screen on route change
    setLoading(true);
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.classList.remove('loaded');
    }

    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '1';
      loadingScreen.style.visibility = 'visible';
    }

    const timer = setTimeout(() => {
      setLoading(false);
      // Add loaded class to main content
      if (mainContent) {
        mainContent.classList.add('loaded');
      }
      // Hide loading screen
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
      }
    }, 2000); // Reduced to 2s for faster navigation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // const loadingData = getLoadingMessage();

  return (
    <div id="loading-screen" style={{ opacity: loading ? 1 : 0, visibility: loading ? 'visible' : 'hidden' }}>
      <div className="loading-content">
        <div className="ai-loader">
          <div className="ai-loader-core"></div>
          <div className="ai-loader-node"></div>
          <div className="ai-loader-node"></div>
          <div className="ai-loader-node"></div>
          <div className="ai-loader-connection"></div>
          <div className="ai-loader-connection"></div>
          <div className="ai-loader-connection"></div>
        </div>

        {/* <div className="loading-logo">Automyra AI</div> */}
        {/* <p className="loading-subtitle">{loadingData.subtitle}</p> */}

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        <div className="loading-message">
          {/* {loadingData.messages.map((msg, index) => (
            <span key={index}>{msg}</span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
