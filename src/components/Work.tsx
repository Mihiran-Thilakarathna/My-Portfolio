import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { workExperience } from '../data/portfolio';
import './Work.css';

const Work: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="work" className="work" ref={ref}>
      <div className="work-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Work Experience</h2>
        </motion.div>

        <div className="work-grid">
          {workExperience.map((work, index) => (
            <motion.div
              key={work.id}
              className="work-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <span className={`status-badge ${work.current ? 'current' : 'past'}`}>
                {work.current ? 'CURRENT' : 'PAST'}
              </span>
              
              <div className="work-icon">
                <FaBriefcase />
              </div>

              <div className="work-content">
                <h3>{work.role}</h3>
                <h4>{work.company}</h4>

                <div className="work-details">
                  <div className="detail">
                    <FaCalendarAlt />
                    <span>{work.startDate} - {work.endDate}</span>
                  </div>
                  <div className="detail">
                    <FaMapMarkerAlt />
                    <span>{work.location}</span>
                  </div>
                </div>

                <p className={`work-description ${expandedCards.has(work.id) ? 'expanded' : 'collapsed'}`}>
                  {work.description}
                </p>

                <button 
                  className="show-more-btn"
                  onClick={() => toggleCard(work.id)}
                >
                  {expandedCards.has(work.id) ? (
                    <>Show Less <FaChevronUp /></>
                  ) : (
                    <>Show More <FaChevronDown /></>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
