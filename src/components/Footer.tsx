import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="footer-tagline">Build. Learn. Evolve.</p>
          <p>© {new Date().getFullYear()} Mihiran Thilakarathna. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
