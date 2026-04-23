import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaUsers, FaMapMarkerAlt, FaBuilding, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { competitions } from '../data/portfolio';
import './Achievements.css';

const Achievements: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeComp, setActiveComp] = useState(0);

  const currentComp = competitions[activeComp];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevPhoto = () =>
    setLightboxIndex((i) => (i - 1 + currentComp.photos.length) % currentComp.photos.length);

  const nextPhoto = () =>
    setLightboxIndex((i) => (i + 1) % currentComp.photos.length);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  return (
    <section id="achievements" className="achievements" ref={ref}>
      <div className="achievements-container">

        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Achievements & Competitions</h2>
          <p className="section-subtitle">
            Real-world challenges where innovation meets collaboration
          </p>
        </motion.div>

        {/* Tab selector if multiple competitions */}
        {competitions.length > 1 && (
          <motion.div
            className="comp-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {competitions.map((comp, i) => (
              <button
                key={comp.id}
                className={`comp-tab-btn ${activeComp === i ? 'active' : ''}`}
                onClick={() => setActiveComp(i)}
              >
                {comp.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* Main Competition Card */}
        <motion.div
          key={currentComp.id}
          className="comp-hero-card"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Left: Info Panel */}
          <div className="comp-info-panel">
            <div className="comp-badge-row">
              <span className="comp-year-badge">{currentComp.year}</span>
              <span className={`comp-result-badge ${currentComp.resultType}`}>
                {currentComp.result}
              </span>
            </div>

            <h3 className="comp-title">{currentComp.name}</h3>
            <p className="comp-description">{currentComp.description}</p>

            <div className="comp-meta-list">
              <div className="comp-meta-item">
                <FaBuilding className="meta-icon" />
                <div>
                  <span className="meta-label">Organized by</span>
                  <span className="meta-value">{currentComp.organizer}</span>
                </div>
              </div>
              <div className="comp-meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <div>
                  <span className="meta-label">Venue</span>
                  <span className="meta-value">{currentComp.venue}</span>
                </div>
              </div>
              <div className="comp-meta-item">
                <FaUsers className="meta-icon" />
                <div>
                  <span className="meta-label">Team</span>
                  <span className="meta-value">{currentComp.team}</span>
                </div>
              </div>
              <div className="comp-meta-item">
                <FaTrophy className="meta-icon" />
                <div>
                  <span className="meta-label">Representing</span>
                  <span className="meta-value">{currentComp.university}</span>
                </div>
              </div>
            </div>

            <div className="comp-tags">
              {currentComp.tags.map((tag, i) => (
                <span key={i} className="comp-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Photo Gallery */}
          <div className="comp-gallery-panel">
            <div className="gallery-label">📸 Event Photos</div>

            {/* Hero photo */}
            <motion.div
              className="gallery-hero"
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(0)}
            >
              <img src={currentComp.photos[0]} alt={`${currentComp.name} - Photo 1`} />
              <div className="gallery-overlay">
                <span>View Gallery</span>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            {currentComp.photos.length > 1 && (
              <div className="gallery-thumbs">
                {currentComp.photos.slice(1, 4).map((photo, i) => (
                  <motion.div
                    key={i}
                    className="thumb"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openLightbox(i + 1)}
                  >
                    <img src={photo} alt={`${currentComp.name} - Photo ${i + 2}`} />
                    {i === 2 && currentComp.photos.length > 4 && (
                      <div className="thumb-more">+{currentComp.photos.length - 4}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <FaTimes />
              </button>

              <button className="lightbox-nav prev" onClick={prevPhoto}>
                <FaChevronLeft />
              </button>

              <img
                src={currentComp.photos[lightboxIndex]}
                alt={`${currentComp.name} - Photo ${lightboxIndex + 1}`}
                className="lightbox-img"
              />

              <button className="lightbox-nav next" onClick={nextPhoto}>
                <FaChevronRight />
              </button>

              <div className="lightbox-counter">
                {lightboxIndex + 1} / {currentComp.photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
