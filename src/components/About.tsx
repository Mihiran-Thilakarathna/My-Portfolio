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

const AnimatedCounter = ({ value }: { value: string | number }) => {
  const strValue = String(value);
  const numberMatches = strValue.match(/(\d+)/);
  const targetNumber = numberMatches ? parseInt(numberMatches[1], 10) : 0;
  const suffix = strValue.replace(/\d+/g, '');
  
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  React.useEffect(() => {
    if (isInView && targetNumber > 0) {
      let startTime: number | null = null;
      const duration = 2000; // run for 2 seconds
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // animation easing function
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * targetNumber));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, targetNumber]);

  return <span ref={ref}>{count}{suffix}</span>;
};

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
              I'm a passionate IT undergraduate at <strong className="text-highlight">Rajarata University of Sri Lanka</strong>. 
              My journey in technology began with a fascination for how intelligent systems can solve complex real-world problems.
            </p>
            <p>
              Throughout my academic career, I've developed expertise in building <strong className="text-highlight">ML models</strong>, creating 
              <strong className="text-highlight"> web applications</strong>, and exploring the intersection of AI and software development. I believe 
              in continuous learning and staying updated with the latest technologies.
            </p>
            <p>
              When I'm not coding, I enjoy contributing to <strong className="text-highlight">open-source projects</strong>, participating in 
              <strong className="text-highlight"> hackathons</strong>, and sharing knowledge with the developer community.
            </p>

            <div className="stats">
              <div className="stat-card">
                <h3><AnimatedCounter value={stats.yearsExperience} /></h3>
                <p>Years Learning</p>
              </div>
              <div className="stat-card">
                <h3><AnimatedCounter value={stats.projects} /></h3>
                <p>Projects</p>
              </div>
              <div className="stat-card">
                <h3><AnimatedCounter value={stats.repos} /></h3>
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
