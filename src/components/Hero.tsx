import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import mihiranPhoto from '../assets/mihiran115.png';
import { scrollToElement } from '../lib/smoothScroll';
import './Hero.css';

const Hero: React.FC<{ entered: boolean }> = ({ entered }) => {
  const titles = [
    ["FULL STACK", "DEVELOPER"],
    ["AI / ML", "ENTHUSIAST"],
    ["SOFTWARE", "ENGINEER"],
  ];

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      scrollToElement(element, id === 'contact' ? 'end' : 'start');
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-watermark">MIHIRAN</div>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -75 }}
          animate={entered ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-quote-container"
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-quote">
              <span className="highlight-white">AN AMBITIOUS</span><br />
              <div className="dynamic-title-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={titleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="dynamic-title"
                  >
                    <span className="highlight glow-text">{titles[titleIndex][0]}</span><br />
                    <span className="highlight-white">{titles[titleIndex][1]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="highlight-teal">& DIGITAL BUILDER</span>
            </h1>
            <p className="hero-quote-subtitle">
              Architecting scalable algorithms and intelligent digital experiences that push the boundaries of modern technology.
            </p>
          </motion.div>

          <motion.div
            className="hero-buttons-new"
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <button onClick={() => scrollToSection('projects')} className="btn-sharp btn-sharp-cream-outline">
              VIEW WORK <FaArrowRight style={{ marginLeft: '8px' }} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-sharp btn-sharp-primary">
              HIRE ME
            </button>
          </motion.div>

          <motion.div
            className="hero-socials-new"
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="follow-text">Follow me on</span>
            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/mihiran-thilakarathna" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaLinkedin /></a>
              <a href="https://github.com/Mihiran-Thilakarathna" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaGithub /></a>
              <a href="https://www.instagram.com/mihiran_thilakarathna?igsh=emZmb2Zpb2Zxa2xt" target="_blank" rel="noopener noreferrer" className="social-icon-btn"><FaInstagram /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={entered ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="image-container">
            <div className="image-wrapper">
              <img
                src={mihiranPhoto}
                alt="Mihiran Thilakarathna"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="scroll-button">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <p className="scroll-text">SCROLL DOWN</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
