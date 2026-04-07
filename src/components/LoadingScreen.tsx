import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [visible, setVisible] = useState(true);
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    // wait before starting animation
    const timer = setTimeout(() => {
      setShrinking(true);
      
      // wait for the fade out to finish
      setTimeout(() => {
        onLoadingComplete(); // show main content
        setVisible(false);
      }, 1000); // 1 second exit animation
    }, 2800); 

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!visible) return null;

  return (
    <div className={`loading-wrapper ${shrinking ? 'exit-modern' : ''}`}>
      <div className="modern-backdrop"></div>
      
      {/* Modern High-Tech Content */}
      <div className="loading-content-modern">
        <div className="modern-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-core"></div>
        </div>
        <div className="modern-text">INITIALIZING</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
