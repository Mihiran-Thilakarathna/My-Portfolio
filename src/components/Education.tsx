import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { education, certifications } from '../data/portfolio';
import './Education.css';

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const displayedCertificates = showAllCertificates ? certifications : certifications.slice(0, 8);

  return (
    <section id="education" className="education" ref={ref}>
      <div className="education-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Education & Certifications</h2>
        </motion.div>

        {/* Education Timeline */}
        <div className="education-section">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            Education
          </motion.h3>
          
          <div className="education-timeline">
            <motion.div 
              className="timeline-line"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            ></motion.div>

            {education.map((edu, index) => {
              const isRight = index % 2 === 0;
              return (
                <motion.div
                  key={edu.id}
                  className={`timeline-item ${isRight ? 'right' : 'left'}`}
                  initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                >
                  <div className="timeline-node">
                    <div className="node-inner"></div>
                  </div>
                  
                  <div className="timeline-content education-card">
                    <span className={`status-badge ${edu.status.toLowerCase()}`}>
                      {edu.status}
                    </span>
                    <h4>{edu.institution}</h4>
                    <p className="degree">{edu.degree}</p>
                    <p className="duration">{edu.startDate} - {edu.endDate}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="certifications-section">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            Certifications
          </motion.h3>
          
          <div className="certifications-grid">
            <AnimatePresence>
              {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="certification-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + (index % 3) * 0.1 }}
              >
                <div className="cert-icon">
                  <FaCertificate />
                </div>

                <h4>{cert.title}</h4>
                <p className="provider">{cert.provider}</p>
                <p className="date">{cert.date}</p>

                {cert.certificateUrl && (
                  <a 
                    href={`${import.meta.env.BASE_URL}${cert.certificateUrl.replace(/^\//, '')}`}
                    className="view-certificate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate <FaExternalLinkAlt />
                  </a>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          {certifications.length > 8 && (
            <motion.div 
              className="show-more-container"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <button 
                className="view-certificate show-more-btn"
                onClick={() => setShowAllCertificates(!showAllCertificates)}
              >
                {showAllCertificates ? 'Show Less' : 'Show More Certificates'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
