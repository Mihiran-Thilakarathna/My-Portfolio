import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaUniversity, FaBuilding, FaBrain, FaShieldAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiCisco, SiMeta, SiCoursera, SiUdemy, SiAmazon, SiLinuxfoundation, SiPostman } from 'react-icons/si';
import { useEducationData, useCertificationsData } from '../hooks/usePortfolioData';
import type { Certification } from '../types';
import './Education.css';

const getProviderIcon = (provider: string) => {
  if (provider.includes('Cisco')) return <SiCisco color="#1BA0D7" />;
  if (provider.includes('Meta')) return <SiMeta color="#0668E1" />;
  if (provider.includes('Coursera')) return <SiCoursera color="#0056D2" />;
  if (provider.includes('Udemy')) return <SiUdemy color="#A435F0" />;
  if (provider.includes('AWS')) return <SiAmazon color="#FF9900" />;
  if (provider.includes('Linux Foundation')) return <SiLinuxfoundation color="#FDBE02" />;
  if (provider.includes('Postman')) return <SiPostman color="#FF6C37" />;
  if (provider.includes('University')) return <FaUniversity color="#D9B08C" />;
  if (provider.includes('SLASSCOM')) return <FaBuilding color="#D9B08C" />;
  if (provider.includes('DeepLearning.AI')) return <FaBrain color="#00C09A" />;
  if (provider.includes('Securiti')) return <FaShieldAlt color="#0096ED" />;
  return <FaCertificate color="#D9B08C" />;
};

const getProviderDomain = (provider: string) => {
  if (provider.includes('Cisco')) return 'netacad.com';
  if (provider.includes('Meta')) return 'meta.com';
  if (provider.includes('Coursera')) return 'coursera.org';
  if (provider.includes('Udemy')) return 'udemy.com';
  if (provider.includes('AWS')) return 'aws.amazon.com';
  if (provider.includes('Linux Foundation')) return 'linuxfoundation.org';
  if (provider.includes('Postman')) return 'postman.com';
  if (provider.includes('Moratuwa')) return 'uom.lk';
  if (provider.includes('Columbia')) return 'columbia.edu';
  if (provider.includes('SLASSCOM')) return 'slasscom.lk';
  if (provider.includes('DeepLearning.AI')) return 'deeplearning.ai';
  if (provider.includes('Securiti')) return 'securiti.ai';
  return null;
};

const ProviderLogo = ({ provider }: { provider: string }) => {
  const domain = getProviderDomain(provider);
  const [error, setError] = useState(false);

  if (!domain || error) {
    return <>{getProviderIcon(provider)}</>;
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt={`${provider} logo`}
      onError={() => setError(true)}
      className="real-provider-logo"
    />
  );
};

const getBrandColor = (_provider: string) => {
  return { rgb: '217, 176, 140', hex: '#D9B08C' };
};

const CertificateStack: React.FC<{ certifications: Certification[] }> = ({ certifications }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeout = useRef<any>(null);
  const isHovered = useRef(false);
  const currentIndexRef = useRef(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollInterval = useRef<any>(null);
  const scrollDirection = useRef<'left' | 'right' | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => { isHovered.current = true; };
    const handleMouseLeave = () => {
      isHovered.current = false;
      scrollDirection.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;

      const percentage = x / rect.width;

      // Deadzone between 25% and 75% width

      if (percentage < 0.25) {
        scrollDirection.current = 'left';
      } else if (percentage > 0.75) {
        scrollDirection.current = 'right';
      } else {
        scrollDirection.current = null;
      }
    };

    // Only intercept wheel when user is hovering the card area
    const handleWheel = (e: WheelEvent) => {
      if (!isHovered.current) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const idx = currentIndexRef.current;
      const atStart = idx === 0 && delta < -15;
      const atEnd = idx === certifications.length - 1 && delta > 15;

      if (atStart || atEnd) return;

      e.preventDefault();
      if (scrollTimeout.current) return;

      if (delta > 15) {
        setCurrentIndex(prev => Math.min(prev + 1, certifications.length - 1));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 350);
      } else if (delta < -15) {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 350);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);
    // passive:false is required to use e.preventDefault() for wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Set up interval for edge scrolling
    scrollInterval.current = setInterval(() => {
      if (scrollDirection.current === 'left') {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      } else if (scrollDirection.current === 'right') {
        setCurrentIndex(prev => Math.min(prev + 1, certifications.length - 1));
      }
    }, 350); // 350ms interval for faster scrolling

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, []);

  const handleDragEnd = (_e: any, info: any) => {
    const threshold = 55;
    if (info.offset.x < -threshold) {
      setCurrentIndex(prev => Math.min(prev + 1, certifications.length - 1));
    } else if (info.offset.x > threshold) {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="certificate-stack-container" ref={containerRef}>
        {certifications.map((cert, index) => {
          const offset = index - currentIndex;
          const isMobile = windowWidth < 768;
          const isVisible = isMobile ? (offset >= -1 && offset <= 1) : (offset >= -2 && offset <= 2);

          if (!isVisible) return null;

          const isTablet = windowWidth >= 768 && windowWidth < 1024;

          let x = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = certifications.length - index;
          // Apply blur via class to prevent GPU repaints
          let blurClass = '';

          if (offset === 0) {
            x = 0;
            scale = isMobile ? 1.05 : 1.1;
            zIndex = 30;
            opacity = 1;
            blurClass = '';
          } else if (offset === -1) {
            x = isMobile ? -100 : isTablet ? -175 : -230;
            scale = isMobile ? 0.8 : 0.86;
            zIndex = 20;
            opacity = isMobile ? 0.45 : 0.65;
            blurClass = 'blur-sm';
          } else if (offset === 1) {
            x = isMobile ? 100 : isTablet ? 175 : 230;
            scale = isMobile ? 0.8 : 0.86;
            zIndex = 20;
            opacity = isMobile ? 0.45 : 0.65;
            blurClass = 'blur-sm';
          } else if (offset === -2) {
            x = isMobile ? -170 : isTablet ? -310 : -410;
            scale = isMobile ? 0.65 : 0.7;
            zIndex = 10;
            opacity = isMobile ? 0 : 0.25;
            blurClass = 'blur-md';
          } else if (offset === 2) {
            x = isMobile ? 170 : isTablet ? 310 : 410;
            scale = isMobile ? 0.65 : 0.7;
            zIndex = 10;
            opacity = isMobile ? 0 : 0.25;
            blurClass = 'blur-md';
          }

          const brand = getBrandColor(cert.provider);

          return (
            <motion.div
              key={cert.id}
              className={`certification-card stack-card ${offset === 0 ? 'active-card' : ''} ${blurClass}`}
              initial={false}
              animate={{
                x,
                scale,
                zIndex,
                opacity,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
              style={{
                '--brand-color': brand.hex,
                '--brand-rgb': brand.rgb,
                cursor: offset === 0 ? 'default' : 'pointer',
                pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto'
              } as React.CSSProperties}
              onClick={() => {
                if (offset !== 0) {
                  setCurrentIndex(index);
                }
              }}
            >
              <div className="card-cyber-grid" />

              <div className="card-tech-accent top-left" />
              <div className="card-tech-accent top-right" />
              <div className="card-tech-accent bottom-left" />
              <div className="card-tech-accent bottom-right" />

              <div className="card-badge-ring">
                <div className="badge-ring-glow" />
                <div className="cert-icon-inner">
                  <ProviderLogo provider={cert.provider} />
                </div>
              </div>

              <div className="cert-card-info">
                <h4>{cert.title}</h4>
                <p className="provider">{cert.provider}</p>
                <div className="card-divider" />
                <p className="date">{cert.date}</p>
              </div>

              {cert.certificateUrl && (
                <a
                  href={`${import.meta.env.BASE_URL}${cert.certificateUrl.replace(/^\//, '')}`}
                  className="view-certificate"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    pointerEvents: offset === 0 ? 'auto' : 'none'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Verify Credentials <FaExternalLinkAlt />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="capsule-dock" style={{
        '--brand-rgb': getBrandColor(certifications[currentIndex].provider).rgb
      } as React.CSSProperties}>
        <button
          className="dock-arrow-btn left"
          onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          aria-label="Previous Certification"
        >
          <FaChevronLeft />
        </button>

        <div className="dock-divider" />

        <div className="dock-content">
          <div className="dock-logo-container">
            <ProviderLogo provider={certifications[currentIndex].provider} />
          </div>
          <div className="dock-text">
            <div className="dock-title">{certifications[currentIndex].title}</div>
            <div className="dock-subtitle">{certifications[currentIndex].provider}</div>
          </div>
        </div>

        <div className="dock-divider" />

        <button
          className="dock-arrow-btn right"
          onClick={() => setCurrentIndex(prev => Math.min(prev + 1, certifications.length - 1))}
          disabled={currentIndex === certifications.length - 1}
          aria-label="Next Certification"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="stack-indicators">
        {certifications.map((_, idx) => (
          <div
            key={idx}
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineNode = () => {
  return (
    <motion.div
      className="timeline-node"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "1000px 0px -50% 0px" }}
      variants={{
        hidden: { borderColor: "rgba(255, 255, 255, 0.15)", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" },
        visible: { borderColor: "#CCFF00", boxShadow: "0 0 20px rgba(204, 255, 0, 0.4)" }
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="node-inner"
        variants={{
          hidden: { scale: 0, backgroundColor: "rgba(255, 255, 255, 0.4)" },
          visible: { scale: 1, backgroundColor: "#CCFF00" }
        }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const education = useEducationData();
  const certifications = useCertificationsData();

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

        <div className="education-section">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            Education
          </motion.h3>

          <div className="education-timeline" ref={timelineRef}>
            <div className="timeline-line">
              <motion.div
                className="timeline-line-fill"
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              />
            </div>

            {education.map((edu, index) => {
              const isRight = index % 2 === 0;
              return (
                <motion.div
                  key={edu.id}
                  className={`timeline-item ${isRight ? 'right' : 'left'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                >
                  <TimelineNode />

                  <div className="timeline-content education-card">
                    <span className={`status-badge ${edu.status.toLowerCase()}`}>
                      {edu.status}
                    </span>
                    <h4>{edu.institution}</h4>
                    <p className="degree">{edu.degree}</p>
                    <div className="education-details">
                      <div className="detail">
                        <FaCalendarAlt />
                        <span>{edu.startDate} - {edu.endDate}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="certifications-section">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            Certifications
          </motion.h3>

          <CertificateStack certifications={certifications} />
        </div>
      </div>
    </section>
  );
};

export default Education;
