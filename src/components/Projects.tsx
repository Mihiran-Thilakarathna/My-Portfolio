import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiSmartphone, FiCpu, FiGlobe } from 'react-icons/fi';
import { FiStar } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import type { ProjectCategory } from '../types';
import './Projects.css';

type FilterType = ProjectCategory | null;

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<FilterType>(null);

  const filters: ProjectCategory[] = Array.from(
    new Set(projects.flatMap((project) => project.categories))
  ) as ProjectCategory[];

  const filteredProjects = filter
    ? projects.filter((project) => project.categories.includes(filter))
    : [];

  const handleFilterClick = (filterName: ProjectCategory) => {
    setFilter((prev) => (prev === filterName ? null : filterName));
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Projects</h2>
          <p>Showcasing my work and creative solutions</p>
        </motion.div>

        <motion.div
          className="category-rail"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="category-label">
            <span className={`label-badge ${filter ? 'active' : ''}`}>
              <FiStar />
              {filter ? 'Category selected' : 'Select a category'}
            </span>
          </div>

          <div className="category-tabs">
            {filters.map((filterName) => (
              <button
                key={filterName}
                className={`tab-btn ${filter === filterName ? 'active' : ''}`}
                onClick={() => handleFilterClick(filterName)}
              >
                <span className="tab-icon">
                  {filterName === 'Mobile Application' && <FiSmartphone />}
                  {filterName === 'AI/ML' && <FiCpu />}
                  {filterName === 'Web Application' && <FiGlobe />}
                </span>
                <span className="tab-label">{filterName}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className={`projects-grid ${filter ? 'has-selection' : ''}`}>
          <AnimatePresence mode="popLayout">
            {filter &&
              filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
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

                  <p className="project-description">{project.description}</p>

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
                    </div>
                </div>
              </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
