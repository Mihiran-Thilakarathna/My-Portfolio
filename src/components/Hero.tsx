import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaDownload, FaLinkedin, FaGithub, FaInstagram, FaLaptopCode, FaCogs, FaBrain } from 'react-icons/fa';
import mihiranPhoto from '../assets/mihiran115.png';
import { scrollToElement, scrollToY } from '../lib/smoothScroll';
import './Hero.css';

const Hero: React.FC<{ entered: boolean }> = ({ entered }) => {
  const titles = [
    ["FULL STACK", "DEVELOPER"],
    ["AI / ML", "ENTHUSIAST"],
    ["SOFTWARE", "ENGINEER"],
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [showCVModal, setShowCVModal] = useState(false);

  // Parallax fade-out as the hero scrolls away
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const exitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (id === 'contact') {
        scrollToElement(element, 'end');
        return;
      }
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      scrollToY(elementPosition + window.scrollY - headerOffset);
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-watermark">MIHIRAN</div>
      <motion.div className="hero-content" style={{ y: exitY, opacity: exitOpacity, scale: exitScale }}>
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
            <button
              onClick={() => setShowCVModal(true)}
              className="btn-sharp btn-sharp-primary"
            >
              <FaDownload style={{ marginRight: '8px' }} /> DOWNLOAD CV
            </button>
            <button onClick={() => scrollToSection('projects')} className="btn-sharp btn-sharp-cream-outline">
              VIEW WORK <FaArrowRight style={{ marginLeft: '8px' }} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-sharp btn-sharp-outline">
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
      </motion.div>

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

      <AnimatePresence>
        {showCVModal && (
          <motion.div
            className="cv-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCVModal(false)}
          >
            <motion.div
              className="cv-modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal-btn" onClick={() => setShowCVModal(false)}>×</button>
              <h3 className="modal-title">Select Resume Version</h3>
              <p className="modal-subtitle">Choose the profile that best fits your requirements.</p>

              <div className="cv-options">
                <a href={`${import.meta.env.BASE_URL}FullStack Engineer Intern.pdf`} download="Mihiran_FullStack_Engineer.pdf" className="cv-option-card">
                  <div className="cv-option-icon"><FaLaptopCode /></div>
                  <div className="cv-option-details">
                    <h4>Full Stack Developer</h4>
                    <span>Frontend & Backend Focus</span>
                  </div>
                  <FaDownload className="download-icon" />
                </a>

                <a href={`${import.meta.env.BASE_URL}Software Engineering Intern.pdf`} download="Mihiran_Software_Engineer.pdf" className="cv-option-card">
                  <div className="cv-option-icon"><FaCogs /></div>
                  <div className="cv-option-details">
                    <h4>Software Engineering</h4>
                    <span>System Design & Architecture</span>
                  </div>
                  <FaDownload className="download-icon" />
                </a>

                <a href={`${import.meta.env.BASE_URL}AI & Automation Intern.pdf`} download="Mihiran_AI_ML.pdf" className="cv-option-card">
                  <div className="cv-option-icon"><FaBrain /></div>
                  <div className="cv-option-details">
                    <h4>AI / ML Engineer</h4>
                    <span>Machine Learning & Data Science</span>
                  </div>
                  <FaDownload className="download-icon" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
