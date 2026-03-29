import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    
    // TODO: Replace mock submit with a real email service (e.g., EmailJS).
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
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
          <h2>Get In Touch</h2>
          <p>Have a project in mind? Let's work together!</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Connect with Me</h3>
            <p className="connect-subtitle">Choose your preferred way to reach out</p>
            
            <div className="contact-methods">
              <a href={personalInfo.github} className="contact-method github" target="_blank" rel="noreferrer">
                <div className="method-icon">
                  <FaGithub />
                </div>
                <div className="method-info">
                  <h4>GitHub</h4>
                  <p>github.com</p>
                </div>
              </a>

              <a href={personalInfo.linkedin} className="contact-method linkedin" target="_blank" rel="noreferrer">
                <div className="method-icon">
                  <FaLinkedin />
                </div>
                <div className="method-info">
                  <h4>LinkedIn</h4>
                  <p>linkedin.com</p>
                </div>
              </a>

              <a href={`https://wa.me/${personalInfo.phone?.replace(/\s/g, '')}`} className="contact-method whatsapp">
                <div className="method-icon">
                  <FaWhatsapp />
                </div>
                <div className="method-info">
                  <h4>WhatsApp</h4>
                  <p>{personalInfo.phone}</p>
                </div>
              </a>

              <a href={`mailto:${personalInfo.email}`} className="contact-method email">
                <div className="method-icon">
                  <FaEnvelope />
                </div>
                <div className="method-info">
                  <h4>Email</h4>
                  <p>{personalInfo.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
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
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {status === 'success' && (
                <motion.p
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! 🎉
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
