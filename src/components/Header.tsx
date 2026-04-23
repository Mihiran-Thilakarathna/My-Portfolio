import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope, FaTrophy } from 'react-icons/fa';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Header.css';

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'about', label: 'About', icon: <FaUser /> },
  { id: 'work', label: 'Work', icon: <FaBriefcase /> },
  { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
  { id: 'projects', label: 'Projects', icon: <FaCode /> },
  { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
];

const Header: React.FC = () => {
  const activeSection = useScrollSpy(navItems.map(item => item.id));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: 'var(--primary)' }}>Mihiran's</span>&nbsp;Portfolio
        </motion.div>
        
        <nav className="nav">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
