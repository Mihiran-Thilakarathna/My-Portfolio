import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope,
  FaGithub, FaLinkedin, FaTwitter, FaKaggle, FaEye, FaArrowUp,
  FaFacebook, FaInstagram, FaMedium
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useProfileViews } from '../hooks/useProfileViews';
import { personalInfo } from '../data/portfolio';
import './Footer.css';

const resolveExternalUrl = (value: string | undefined, fallback: string) => {
  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === '#') {
    return fallback;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed.replace(/^\/+/, '')}`;
};

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { showButton, scrollToTop } = useScrollToTop();
  
  // Track and display profile views
  const { views, lastUpdated } = useProfileViews(personalInfo.profileViews);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Column 1: About */}
          <div className="footer-column">
            <h3 className="footer-logo">Mihiran's Portfolio</h3>
            <p className="footer-bio">
              {personalInfo.footerBio || 'Building intelligent solutions with AI, ML, and modern web technologies.'}
            </p>
            <div className="total-views">
              <FaEye />
              <div className="view-meta">
                <span>
                  {typeof views === 'number'
                    ? `${views.toLocaleString()} Profile Views`
                    : 'Profile views data not available'}
                </span>
                {lastUpdated && (
                  <small>Updated {lastUpdated}</small>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Site Map */}
          <div className="footer-column">
            <h4>Site Map</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('home')}><FaHome /> Home</button></li>
              <li><button onClick={() => scrollToSection('about')}><FaUser /> About</button></li>
              <li><button onClick={() => scrollToSection('work')}><FaBriefcase /> Work</button></li>
              <li><button onClick={() => scrollToSection('education')}><FaGraduationCap /> Education</button></li>
              <li><button onClick={() => scrollToSection('projects')}><FaCode /> Projects</button></li>
              <li><button onClick={() => scrollToSection('contact')}><FaEnvelope /> Contact</button></li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="footer-column">
            <h4>Connect</h4>
            <div className="social-links">
              <a
                href={resolveExternalUrl(personalInfo.facebook, 'https://www.facebook.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={resolveExternalUrl(personalInfo.linkedin, 'https://www.linkedin.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={resolveExternalUrl(personalInfo.twitter, 'https://twitter.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
                title="X (Twitter)"
              >
                <FaTwitter />
              </a>
              <a
                href={resolveExternalUrl(personalInfo.instagram, 'https://www.instagram.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 4: Professional */}
          <div className="footer-column">
            <h4>Professional</h4>
            <div className="social-links">
              <a
                href={resolveExternalUrl(personalInfo.github, 'https://github.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={resolveExternalUrl(personalInfo.kaggle, 'https://www.kaggle.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link kaggle"
                title="Kaggle"
              >
                <FaKaggle />
              </a>
              <a
                href={resolveExternalUrl(personalInfo.medium, 'https://medium.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link medium"
                title="Medium"
              >
                <FaMedium />
              </a>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="theme-switcher">
          <p>Theme:</p>
          <div className="theme-buttons">
            <button
              className={`theme-btn ${theme === 'default' ? 'active' : ''}`}
              onClick={() => setTheme('default')}
            >
              Default
            </button>
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© 2025 Mihiran Thilakarathna. All Rights Reserved😎</p>
        </div>
      </div>

      {/* Back to Top Button */}
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
