import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaPython, FaReact, FaGitAlt, FaDocker, FaNodeJs, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { 
  SiTensorflow, SiPytorch, SiJavascript, SiTypescript, SiMongodb, 
  SiMysql, SiFirebase, SiFlask, SiScikitlearn 
} from 'react-icons/si';
import { stats } from '../data/portfolio';
import mihiranPhoto from '../assets/mihiran.png';
import './About.css';

const iconMap: { [key: string]: React.ReactNode } = {
  FaPython: <FaPython />,
  SiTensorflow: <SiTensorflow />,
  SiPytorch: <SiPytorch />,
  SiScikitlearn: <SiScikitlearn />,
  FaReact: <FaReact />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  FaNodeJs: <FaNodeJs />,
  SiFlask: <SiFlask />,
  SiMongodb: <SiMongodb />,
  SiMysql: <SiMysql />,
  SiFirebase: <SiFirebase />,
  FaGitAlt: <FaGitAlt />,
  FaDocker: <FaDocker />,
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
};

const skills = [
  { name: 'Python', icon: 'FaPython' },
  { name: 'TensorFlow', icon: 'SiTensorflow' },
  { name: 'PyTorch', icon: 'SiPytorch' },
  { name: 'Scikit-learn', icon: 'SiScikitlearn' },
  { name: 'React', icon: 'FaReact' },
  { name: 'JavaScript', icon: 'SiJavascript' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'Node.js', icon: 'FaNodeJs' },
  { name: 'Flask', icon: 'SiFlask' },
  { name: 'MongoDB', icon: 'SiMongodb' },
  { name: 'MySQL', icon: 'SiMysql' },
  { name: 'Firebase', icon: 'SiFirebase' },
  { name: 'Git', icon: 'FaGitAlt' },
  { name: 'Docker', icon: 'FaDocker' },
  { name: 'HTML5', icon: 'FaHtml5' },
  { name: 'CSS3', icon: 'FaCss3Alt' },
];

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <p>Building Intelligent Solutions with Data</p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={mihiranPhoto}
              alt="About Me"
            />
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              I'm a passionate IT undergraduate at <strong>Rajarata University of Sri Lanka</strong>, 
              My journey in technology began with a fascination for how intelligent systems can solve complex real-world problems.
            </p>
            <p>
              Throughout my academic career, I've developed expertise in building ML models, creating 
              web applications, and exploring the intersection of AI and software development. I believe 
              in continuous learning and staying updated with the latest technologies.
            </p>
            <p>
              When I'm not coding, I enjoy contributing to open-source projects, participating in 
              hackathons, and sharing knowledge with the developer community.
            </p>

            <div className="stats">
              <div className="stat-card">
                <h3>{stats.yearsExperience}</h3>
                <p>Years Learning</p>
              </div>
              <div className="stat-card">
                <h3>{stats.projects}</h3>
                <p>Projects</p>
              </div>
              <div className="stat-card">
                <h3>{stats.repos}</h3>
                <p>Public Repos</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="skills-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>Technical Skills</h3>
          <div className="skills-carousel">
            <motion.div
              className="skills-track"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...skills, ...skills].map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-icon">{iconMap[skill.icon]}</div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
