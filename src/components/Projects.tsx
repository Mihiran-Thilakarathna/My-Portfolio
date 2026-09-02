import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiSmartphone, FiCpu, FiGlobe, FiStar } from 'react-icons/fi';
import { useProjectsData } from '../hooks/usePortfolioData';
import type { Project, ProjectCategory } from '../types';
import './Projects.css';

type FilterType = ProjectCategory | 'All';

const ProjectCard: React.FC<{
  project: Project;
  index: number;
}> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  const checkOverflow = useCallback(() => {
    if (descRef.current) {
      setNeedsExpansion(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkOverflow, 50);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [checkOverflow]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="project-card"
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <span className="category-tag">{project.categories.join(' • ')}</span>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3>{project.title}</h3>
        </div>

        <div className="project-description-container">
          <p
            ref={descRef}
            className={`project-description ${isExpanded ? 'expanded' : ''}`}
          >
            {project.description}
          </p>
          {(needsExpansion || isExpanded) && (
            <button
              className="read-more-toggle"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>

        <div className="project-links">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              className="project-link code"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> View Project
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="project-link live"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderColor: 'var(--primary-light)',
                padding: '0.4rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<FilterType | null>(null);
  const projects = useProjectsData();

  const filters: FilterType[] = [
    'All',
    ...Array.from(new Set(projects.flatMap((project) => project.categories))),
  ] as FilterType[];

  const isShowAll = filter === 'All';

  const filteredProjects =
    filter === null
      ? projects.slice(0, 3)
      : filter === 'All'
      ? projects
      : projects.filter((project) =>
          project.categories.includes(filter as ProjectCategory)
        );

  const handleFilterClick = (filterName: FilterType) => {
    if (filterName === 'All' && filter === 'All') {
      // Collapse back to default
      setFilter(null);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setFilter(filterName);
    }
  };

  const handleShowLess = () => {
    setFilter(null);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Projects</h2>
        </motion.div>

        <motion.div
          className="category-rail"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="category-tabs">
            {filters.map((filterName) => (
              <button
                key={filterName}
                className={`tab-btn ${filter === filterName ? 'active' : ''}`}
                onClick={() => handleFilterClick(filterName)}
              >
                <span className="tab-icon">
                  {filterName === 'All' && <FiStar />}
                  {filterName === 'Mobile Application' && <FiSmartphone />}
                  {filterName === 'AI/ML' && <FiCpu />}
                  {filterName === 'Web Application' && <FiGlobe />}
                </span>
                <span className="tab-label">{filterName}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="projects-grid has-selection">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isShowAll && (
            <motion.div
              className="show-less-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <button className="show-less-btn" onClick={handleShowLess}>
                ↑ Show Less
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
