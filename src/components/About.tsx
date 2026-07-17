import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaJava, FaAsterisk, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiFirebase, SiKotlin, SiMysql, SiCplusplus, SiJavascript, SiFlutter, SiMongodb, SiTypescript, SiTensorflow, SiPytorch, SiScikitlearn, SiFlask, SiFastapi, SiNextdotjs, SiTailwindcss, SiPostman, SiKubernetes, SiAndroid, SiSqlite } from 'react-icons/si';
import { BiNetworkChart, BiCodeAlt } from 'react-icons/bi';
import { FiTerminal, FiAward } from 'react-icons/fi';
import './About.css';

const AnimatedCounter: React.FC<{ value: number; suffix?: string; trigger: boolean; duration?: number }> = ({ value, suffix = "", trigger, duration = 1.0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMilliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 16);
    const step = Math.ceil(end / (totalMilliseconds / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, trigger, duration]);

  return <>{count}{suffix}</>;
};

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [starTurns, setStarTurns] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [notch, setNotch] = useState({ width: 130, height: 78 });

  useEffect(() => {
    if (!cardRef.current) return;
    const updateDimensions = () => {
      if (!cardRef.current) return;
      const style = window.getComputedStyle(cardRef.current);
      const nw = parseFloat(style.getPropertyValue('--bio-notch-width')) || 130;
      const nh = parseFloat(style.getPropertyValue('--bio-notch-height')) || 78;
      const rect = cardRef.current.getBoundingClientRect();
      setNotch({ width: nw, height: nh });
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
  const NW = notch.width;
  const NH = notch.height;

  const R = W < 480 ? 22 : 28;
  const Ro = W < 480 ? 16 : 24;
  const Ri = W < 480 ? 16 : 24;

  const pathD = W ? `
    M ${R},0 
    L ${W - NW - Ro},0 
    A ${Ro},${Ro} 0 0 1 ${W - NW},${Ro} 
    L ${W - NW},${NH - Ri} 
    A ${Ri},${Ri} 0 0 0 ${W - NW + Ri},${NH} 
    L ${W - R},${NH} 
    A ${R},${R} 0 0 1 ${W},${NH + R} 
    L ${W},${H - R} 
    A ${R},${R} 0 0 1 ${W - R},${H} 
    L ${R},${H} 
    A ${R},${R} 0 0 1 0,${H - R} 
    L 0,${R} 
    A ${R},${R} 0 0 1 ${R},0 Z
  `.replace(/\s+/g, ' ').trim() : '';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="about-modern" ref={ref}>
      <motion.div
        className="about-bento-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {/* TOP HEADER */}
        <motion.div className="about-top-header" variants={itemVariants}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>About Me</h2>
          </motion.div>
        </motion.div>

        <div className="about-content-grid">
          <motion.div
            className="bio-card"
            ref={cardRef}
            variants={itemVariants}
          >
            {W > 0 && (
              <>
                <div
                  className="bio-card-bg-blur"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: 'url(#bio-clip)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
                <svg
                  className="bio-card-svg-bg"
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
                    <clipPath id="bio-clip">
                      <path d={pathD} />
                    </clipPath>
                  </defs>
                  <path
                    d={pathD}
                    className="bio-card-path"
                  />
                </svg>
              </>
            )}

            <motion.button
              type="button"
              className="bio-spin-trigger"
              onClick={() => setStarTurns((prev: number) => prev + 1)}
              whileTap={{ scale: 0.92 }}
              aria-label="Spin decorative star"
            >
              <motion.span
                className="bio-spin-star"
                animate={{ rotate: starTurns * 360 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <span className="bio-hover-star">
                  <FaAsterisk />
                </span>
              </motion.span>
            </motion.button>

            <div className="bio-card-content">
              <div className="bio-notch-spacer" />
              <div className="bio-intro-header">
                <span className="hey-text">Hey I am</span>
                <h1 className="name-text">Mihiran Thilakarathna</h1>
              </div>
              <p>
                an Information Technology undergraduate specializing in building modern web applications, intelligent AI integrations, and mobile solutions. I combine strong technical foundations with a focus on clean code to turn complex problems into scalable, user-centric digital products—from computer vision models to full-stack platforms.
              </p>


              <div className="bio-divider"></div>

              <div className="bio-focus-areas">
                <div className="focus-pill fullstack-pill">
                  <div className="focus-header">
                    <span className="focus-dot"></span>
                    <h4 className="focus-title">Full Stack Development</h4>
                  </div>
                  <p className="focus-desc">Crafting responsive, high-performance web applications and robust backend APIs.</p>
                </div>
                <div className="focus-pill aiml-pill">
                  <div className="focus-header">
                    <span className="focus-dot"></span>
                    <h4 className="focus-title">AI & ML Development</h4>
                  </div>
                  <p className="focus-desc">Integrating smart automation, deep learning models, and GenAI capabilities.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="about-side-stack">
            <div className="stats-row">
              <motion.div className="stat-card" variants={itemVariants}>
                <span className="stat-number">
                  <AnimatedCounter value={3} suffix="+" trigger={isInView} />
                </span>
                <span className="stat-label">Years Learning</span>
              </motion.div>
              <motion.div className="stat-card" variants={itemVariants}>
                <span className="stat-number">
                  <AnimatedCounter value={10} suffix="+" trigger={isInView} />
                </span>
                <span className="stat-label">Projects</span>
              </motion.div>
              <motion.div className="stat-card" variants={itemVariants}>
                <span className="stat-number">
                  <AnimatedCounter value={30} suffix="+" trigger={isInView} />
                </span>
                <span className="stat-label">Repositories</span>
              </motion.div>
            </div>

            <motion.div className="info-card what-i-do-card glass-panel" variants={itemVariants}>
              <div className="info-header">
                <span className="info-icon"><FiTerminal /></span>
                <h4>What I Do</h4>
              </div>
              <p>Delivering end-to-end solutions by bridging advanced backends with intuitive user interfaces. Whether it's deploying custom deep learning models for complex data or developing robust mobile applications, I focus on building practical, high-performance systems.</p>
            </motion.div>

            <motion.div className="info-card why-choose-me-card glass-panel" variants={itemVariants}>
              <div className="info-header">
                <span className="info-icon"><FiAward /></span>
                <h4>Why choose me</h4>
              </div>
              <p>I approach every project with a problem-solving mindset. By combining technical precision with a strong focus on user experience, I build secure, optimized solutions that are ready to tackle real-world challenges efficiently.</p>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION: Skills Flow Bar */}
        <div className="skills-split-row">
          <motion.div className="skills-copy" variants={itemVariants}>
            <h3>Code with purpose.</h3>
          </motion.div>

          <motion.div className="skills-block glass-panel" variants={itemVariants}>
            <h4 className="skills-header">My Technical Skills</h4>

            <div className="skills-marquee-container">
              <div className="skills-marquee">
                <div className="skills-track track-1">
                  <div className="skill-icon-card" data-tooltip="React"><FaReact color="#61DAFB" /></div>
                  <div className="skill-icon-card" data-tooltip="Node.js"><FaNodeJs color="#339933" /></div>
                  <div className="skill-icon-card" data-tooltip="JavaScript"><SiJavascript color="#F7DF1E" /></div>
                  <div className="skill-icon-card" data-tooltip="TypeScript"><SiTypescript color="#3178C6" /></div>
                  <div className="skill-icon-card" data-tooltip="Python"><FaPython color="#3776AB" /></div>
                  <div className="skill-icon-card" data-tooltip="Kotlin"><SiKotlin color="#7F52FF" /></div>
                  <div className="skill-icon-card" data-tooltip="Java"><FaJava color="#E32D2D" /></div>
                  <div className="skill-icon-card" data-tooltip="HTML5"><FaHtml5 color="#E34F26" /></div>
                  <div className="skill-icon-card" data-tooltip="CSS3"><FaCss3Alt color="#1572B6" /></div>
                  <div className="skill-icon-card" data-tooltip="Git"><FaGitAlt color="#F05032" /></div>
                  <div className="skill-icon-card" data-tooltip="Docker"><FaDocker color="#2496ED" /></div>
                  <div className="skill-icon-card" data-tooltip="Next.js"><SiNextdotjs color="#ffffff" /></div>
                  <div className="skill-icon-card" data-tooltip="TailwindCSS"><SiTailwindcss color="#06B6D4" /></div>
                  <div className="skill-icon-card" data-tooltip="C++"><SiCplusplus color="#00599C" /></div>
                  <div className="skill-icon-card" data-tooltip="MySQL"><SiMysql color="#4479A1" /></div>
                  <div className="skill-icon-card" data-tooltip="MongoDB"><SiMongodb color="#47A248" /></div>
                  <div className="skill-icon-card" data-tooltip="Firebase"><SiFirebase color="#FFCA28" /></div>
                  <div className="skill-icon-card" data-tooltip="Flutter"><SiFlutter color="#02569B" /></div>
                  <div className="skill-icon-card" data-tooltip="TensorFlow"><SiTensorflow color="#FF6F00" /></div>
                  <div className="skill-icon-card" data-tooltip="PyTorch"><SiPytorch color="#EE4C2C" /></div>
                  <div className="skill-icon-card" data-tooltip="Scikit-Learn"><SiScikitlearn color="#F7931E" /></div>
                  <div className="skill-icon-card" data-tooltip="Flask"><SiFlask color="#ffffff" /></div>
                  <div className="skill-icon-card" data-tooltip="FastAPI"><SiFastapi color="#009688" /></div>
                  <div className="skill-icon-card" data-tooltip="Postman"><SiPostman color="#FF6C37" /></div>
                  <div className="skill-icon-card" data-tooltip="Kubernetes"><SiKubernetes color="#326CE5" /></div>
                  <div className="skill-icon-card" data-tooltip="Android"><SiAndroid color="#3DDC84" /></div>
                  <div className="skill-icon-card" data-tooltip="SQLite"><SiSqlite color="#003B57" /></div>
                  <div className="skill-icon-card" data-tooltip="DSA"><BiNetworkChart color="#FFCB9A" /></div>
                  <div className="skill-icon-card" data-tooltip="OOP"><BiCodeAlt color="#D1E8E2" /></div>

                  {/* Duplicates for infinite scrolling */}
                  <div className="skill-icon-card" data-tooltip="React"><FaReact color="#61DAFB" /></div>
                  <div className="skill-icon-card" data-tooltip="Node.js"><FaNodeJs color="#339933" /></div>
                  <div className="skill-icon-card" data-tooltip="JavaScript"><SiJavascript color="#F7DF1E" /></div>
                  <div className="skill-icon-card" data-tooltip="TypeScript"><SiTypescript color="#3178C6" /></div>
                  <div className="skill-icon-card" data-tooltip="Python"><FaPython color="#3776AB" /></div>
                  <div className="skill-icon-card" data-tooltip="Kotlin"><SiKotlin color="#7F52FF" /></div>
                  <div className="skill-icon-card" data-tooltip="Java"><FaJava color="#E32D2D" /></div>
                  <div className="skill-icon-card" data-tooltip="HTML5"><FaHtml5 color="#E34F26" /></div>
                  <div className="skill-icon-card" data-tooltip="CSS3"><FaCss3Alt color="#1572B6" /></div>
                  <div className="skill-icon-card" data-tooltip="Git"><FaGitAlt color="#F05032" /></div>
                  <div className="skill-icon-card" data-tooltip="Docker"><FaDocker color="#2496ED" /></div>
                  <div className="skill-icon-card" data-tooltip="Next.js"><SiNextdotjs color="#ffffff" /></div>
                  <div className="skill-icon-card" data-tooltip="TailwindCSS"><SiTailwindcss color="#06B6D4" /></div>
                  <div className="skill-icon-card" data-tooltip="C++"><SiCplusplus color="#00599C" /></div>
                  <div className="skill-icon-card" data-tooltip="MySQL"><SiMysql color="#4479A1" /></div>
                  <div className="skill-icon-card" data-tooltip="MongoDB"><SiMongodb color="#47A248" /></div>
                  <div className="skill-icon-card" data-tooltip="Firebase"><SiFirebase color="#FFCA28" /></div>
                  <div className="skill-icon-card" data-tooltip="Flutter"><SiFlutter color="#02569B" /></div>
                  <div className="skill-icon-card" data-tooltip="TensorFlow"><SiTensorflow color="#FF6F00" /></div>
                  <div className="skill-icon-card" data-tooltip="PyTorch"><SiPytorch color="#EE4C2C" /></div>
                  <div className="skill-icon-card" data-tooltip="Scikit-Learn"><SiScikitlearn color="#F7931E" /></div>
                  <div className="skill-icon-card" data-tooltip="Flask"><SiFlask color="#ffffff" /></div>
                  <div className="skill-icon-card" data-tooltip="FastAPI"><SiFastapi color="#009688" /></div>
                  <div className="skill-icon-card" data-tooltip="Postman"><SiPostman color="#FF6C37" /></div>
                  <div className="skill-icon-card" data-tooltip="Kubernetes"><SiKubernetes color="#326CE5" /></div>
                  <div className="skill-icon-card" data-tooltip="Android"><SiAndroid color="#3DDC84" /></div>
                  <div className="skill-icon-card" data-tooltip="SQLite"><SiSqlite color="#003B57" /></div>
                  <div className="skill-icon-card" data-tooltip="DSA"><BiNetworkChart color="#FFCB9A" /></div>
                  <div className="skill-icon-card" data-tooltip="OOP"><BiCodeAlt color="#D1E8E2" /></div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
