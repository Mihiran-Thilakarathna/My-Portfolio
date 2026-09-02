import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useWorkExperienceData } from '../hooks/usePortfolioData';
import './Work.css';

interface WorkCardProps {
  work: any;
  index: number;
  isInView: boolean;
  onOpenModal: (work: any) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, index, isInView, onOpenModal }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const updateDimensions = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    observer.observe(cardRef.current);

    window.addEventListener('resize', updateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;

  const NW = 110;
  const NH = 38;
  const R = 24;
  const Ro = 14;
  const Ri = 14;

  const pathD = W && H ? `
    M ${R},0 
    L ${(W - NW) / 2 - Ro},0 
    A ${Ro},${Ro} 0 0 1 ${(W - NW) / 2},${Ro} 
    L ${(W - NW) / 2},${NH - Ri} 
    A ${Ri},${Ri} 0 0 0 ${(W - NW) / 2 + Ri},${NH} 
    L ${(W + NW) / 2 - Ri},${NH} 
    A ${Ri},${Ri} 0 0 0 ${(W + NW) / 2},${NH - Ri} 
    L ${(W + NW) / 2},${Ro} 
    A ${Ro},${Ro} 0 0 1 ${(W + NW) / 2 + Ro},0 
    L ${W - R},0 
    A ${R},${R} 0 0 1 ${W},${R} 
    L ${W},${H - R} 
    A ${R},${R} 0 0 1 ${W - R},${H} 
    L ${R},${H} 
    A ${R},${R} 0 0 1 0,${H - R} 
    L 0,${R} 
    A ${R},${R} 0 0 1 ${R},0 Z
  `.replace(/\s+/g, ' ').trim() : '';
  const isCoordinator = work.role.includes('Coordinator');

  return (
    <motion.div
      ref={cardRef}
      className="work-card work-card-dynamic"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ overflow: 'visible', position: 'relative' }}
    >
      {W > 0 && (
        <>
          <div
            className="work-card-bg-blur"
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `url(#work-clip-${work.id})`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <svg
            className="work-card-svg-bg"
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <defs>
              <clipPath id={`work-clip-${work.id}`}>
                <path d={pathD} />
              </clipPath>
            </defs>
            <path
              d={pathD}
              className="work-card-path"
            />
          </svg>
        </>
      )}

      <div className="work-notch-icon-wrapper">
        <div className="work-notch-icon-inner">
          {isCoordinator ? <FaUsers /> : <FaBriefcase />}
        </div>
      </div>

      <span className={`status-badge work-status-badge ${work.current ? 'current' : 'past'}`}>
        {work.current ? 'CURRENT' : 'PAST'}
      </span>

      <div className="work-card-content-wrapper">
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

        <button
          className="work-read-more-btn"
          onClick={() => onOpenModal(work)}
        >
          Read More
        </button>
      </div>
    </motion.div>
  );
};

const WorkModal: React.FC<{ work: any; onClose: () => void }> = ({ work, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isCoordinator = work.role.includes('Coordinator');

  return createPortal(
    <div className="work-modal-backdrop" onClick={onClose}>
      <div
        className="work-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="work-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>

        <div className="work-modal-header">
          <div className="work-modal-icon-shape">
            {isCoordinator ? <FaUsers /> : <FaBriefcase />}
          </div>
          <div className="work-modal-title-area">
            <span className={`status-badge work-status-badge-inline ${work.current ? 'current' : 'past'}`}>
              {work.current ? 'CURRENT' : 'PAST'}
            </span>
            <h3>{work.role}</h3>
            <h4>{work.company}</h4>
          </div>
        </div>

        <div className="work-modal-details">
          <div className="detail">
            <FaCalendarAlt />
            <span>{work.startDate} - {work.endDate}</span>
          </div>
          <div className="detail">
            <FaMapMarkerAlt />
            <span>{work.location}</span>
          </div>
        </div>

        <div className="work-modal-divider" />

        <div className="work-modal-body">
          <p>{work.description}</p>
        </div>

        <div className="work-modal-footer">
          <button className="work-modal-action-btn" onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Work: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeModalWork, setActiveModalWork] = useState<any | null>(null);
  const workExperience = useWorkExperienceData();

  return (
    <section id="work" className="work" ref={ref}>
      <div className="work-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Work & Leadership Experience</h2>
        </motion.div>

        <div className="work-grid">
          {workExperience.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              isInView={isInView}
              onOpenModal={(w) => setActiveModalWork(w)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModalWork && (
          <WorkModal
            work={activeModalWork}
            onClose={() => setActiveModalWork(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
