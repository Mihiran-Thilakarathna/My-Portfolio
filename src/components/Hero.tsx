import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';
import mihiranPhoto from '../assets/mihiran1.png';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p
            className="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            HELLO, I'M
          </motion.p>
          
          <motion.h1
            className="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.div 
            className="title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <TypeAnimation
              sequence={[
                ...personalInfo.tagline.flatMap(title => [title, 2000])
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p
            className="bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            {personalInfo.bio}
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <button className="btn btn-primary">
              <FaDownload /> DOWNLOAD CV
            </button>
            <div className="hero-socials">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <FaLinkedin />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <FaGithub />
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="image-container">
            <div className="image-wrapper">
              <img
                src={mihiranPhoto}
                alt="Mihiran Thilakarathna"
              />
            </div>
            <div className="image-tooltip" aria-hidden="true">
              Let&apos;s build something remarkable.
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
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
