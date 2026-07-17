import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useScrollToTop } from '../hooks/useScrollToTop';
import './Footer.css';

const Footer: React.FC = () => {
  const { showButton, scrollToTop } = useScrollToTop();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p className="footer-tagline">Build. Learn. Evolve.</p>
          <p>© {new Date().getFullYear()} Mihiran Thilakarathna. All Rights Reserved.</p>
        </div>

      </div>

      {showButton && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
