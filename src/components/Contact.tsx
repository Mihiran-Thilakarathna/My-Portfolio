import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaShareAlt, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Me</h2>
        </motion.div>

        <div className="contact-content">
          {/* Left Panel - Form */}
          <motion.div
            className="contact-panel form-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="panel-header">
              <p>Have something to discuss? Send me a message and let's talk.</p>
              <FaShareAlt className="share-icon" />
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={status === 'sending'}
              >
                <FaPaperPlane /> {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="success-message">Message sent successfully! 🎉</p>
              )}
            </form>
          </motion.div>

          {/* Right Panel - Info */}
          <motion.div
            className="contact-panel info-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="panel-header">
              <p>Let's stay connected through these platforms.</p>
              <FaShareAlt className="share-icon" />
            </div>

            <p className="panel-description">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="direct-contact">
              <h4>Direct Contact</h4>
              <a href={`mailto:${personalInfo.email}`} className="email-link">
                <FaEnvelope /> {personalInfo.email}
              </a>
            </div>

            <div className="social-media-container">
              <h4>Social Media</h4>
              <div className="social-media-box">
                <div className="accent-line"></div>
                
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-card">
                  <div className="social-icon linkedin">
                    <FaLinkedin />
                  </div>
                  <div className="social-details">
                    <span className="social-name">LinkedIn</span>
                    <span className="social-handle">{personalInfo.name.replace(' ', '-').toLowerCase()}</span>
                  </div>
                </a>

                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-card">
                  <div className="social-icon github">
                    <FaGithub />
                  </div>
                  <div className="social-details">
                    <span className="social-name">Github</span>
                    <span className="social-handle">Mihiran-Thilakarathna</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
