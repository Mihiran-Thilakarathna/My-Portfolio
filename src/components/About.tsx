import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiFirebase, SiKotlin, SiMysql, SiCplusplus, SiJavascript, SiFlutter, SiMongodb, SiTypescript, SiTensorflow, SiPytorch, SiScikitlearn, SiFlask, SiFastapi, SiNextdotjs, SiTailwindcss, SiPostman, SiKubernetes, SiAndroid, SiSqlite } from 'react-icons/si';
import { FiLayers, FiCpu, FiClock, FiFolder, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import Lanyard from './Lanyard/Lanyard';
import NotchedCard from './NotchedCard';
import { createCardArt, type CardArt } from './Lanyard/cardArt';
import { useProjectsData } from '../hooks/usePortfolioData';
import { personalInfo, stats } from '../data/portfolio';
import { whenIntroWritten } from '../lib/introGate';
import './About.css';

// Duration (ms) for the stat counter animation
const COUNTER_DURATION = 1.0;
// Delay (s) after stats slide in before counter starts
const COUNTER_START_DELAY = 0.6;
// Stagger (s) between the stat cards sliding in; the tech stack follows as the next card
const STAT_STAGGER = 0.15;

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

// Size of the notch cut from each stat card's top-left corner (holds the icon)
const NOTCH = 54;

interface TechSkill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: TechSkill[] = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#ED8B00' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Flutter', icon: SiFlutter, color: '#54C5F8' },
  { name: 'Android', icon: SiAndroid, color: '#3DDC84' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Card height in px (Lanyard takes it as a fraction of the layer height)
const CARD_HEIGHT = 400;
// extra room below the stage for dragging the card
const DRAG_ROOM = 700;

interface HangLayout {
  top: number;
  height: number;
  anchor: number;
  size: number;
  strapLength: number;
  clip?: string;
  // hanger position/angle on the divider and strap width in px
  mount: { x: number; y: number; angle: number; strapWidth: number };
}

// keep the clipped strap end just below the divider line
const LINE_GAP = 1;
// strap px width = cardHeight * STRAP_TO_CARD (matches Lanyard's internal sizing)
const STRAP_WIDTH = 0.65;
const STRAP_TO_CARD = (0.36 * STRAP_WIDTH) / 2.25;

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  // hanger fold; Lanyard rotates it to follow the strap
  const foldRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  // drop as soon as the section is coming into view
  const cardInView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' });
  const projects = useProjectsData();
  const [cardArt, setCardArt] = useState<CardArt>();
  const [hang, setHang] = useState<HangLayout>();
  const [counterStarted, setCounterStarted] = useState(false);
  // Key of the tech badge whose name is showing (tapped/clicked)
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  // preload the WebGL card while the intro signature is still; it stays held until the
  // section is in view
  const [cardWarm, setCardWarm] = useState(false);

  useEffect(() => {
    createCardArt().then(setCardArt).catch(() => setCardArt(undefined));
  }, []);

  useEffect(() => whenIntroWritten(() => setCardWarm(true)), []);

  // Start counter after stats cards have slid in
  useEffect(() => {
    if (!statsInView) return;
    const timer = setTimeout(() => setCounterStarted(true), COUNTER_START_DELAY * 1000);
    return () => clearTimeout(timer);
  }, [statsInView]);

  // size/position the lanyard layer from the divider and stage
  useLayoutEffect(() => {
    const section = ref.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!section || !stage || !content) return;

    const measure = () => {
      const box = section.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      // divider = left rule, slanted middle segment, right rule
      const divider = section.previousElementSibling;
      const lineY = (el: Element | null | undefined) => {
        const lineBox = el?.getBoundingClientRect();
        return lineBox ? lineBox.top + lineBox.height / 2 - box.top : undefined;
      };
      const leftY = lineY(divider?.querySelector(':scope > div:first-child'));
      const rightY = lineY(divider?.querySelector(':scope > div:last-child'));
      const slant = divider?.querySelector(':scope > svg path')?.getBoundingClientRect();
      // start the layer at the highest point of the divider
      const highest = Math.min(leftY ?? Infinity, slant ? slant.top - box.top : Infinity);
      const top = Number.isFinite(highest) ? highest : 0;
      const height = Math.min(box.bottom, stageBox.bottom + DRAG_ROOM) - box.top - top;
      const cardHeight = Math.min(CARD_HEIGHT, stageBox.height * 0.8);
      // desktop: align card top with the content; mobile: centre it in the stage
      const contentBox = content.getBoundingClientRect();
      const sideBySide = contentBox.left >= stageBox.right;
      const restTop = sideBySide ? contentBox.top : stageBox.top + (stageBox.height - cardHeight) / 2;
      const cardTop = (restTop - box.top - top) / height;
      // clip the layer's top edge to the divider shape
      let clip: string | undefined;
      if (slant && leftY !== undefined && rightY !== undefined) {
        const y = (lineTop: number) => `${lineTop - top + LINE_GAP}px`;
        const x1 = `${slant.left - box.left}px`;
        const x2 = `${slant.right - box.left}px`;
        clip = `polygon(0 ${y(leftY)}, ${x1} ${y(leftY)}, ${x1} ${y(slant.top - box.top)}, `
          + `${x2} ${y(slant.bottom - box.top)}, ${x2} ${y(rightY)}, 100% ${y(rightY)}, 100% 100%, 0 100%)`;
      }
      // divider height/angle where the strap attaches
      const anchorX = stageBox.left + stageBox.width / 2 - box.left;
      const mount = { x: anchorX, y: leftY ?? top, angle: 0, strapWidth: cardHeight * STRAP_TO_CARD };
      if (slant && rightY !== undefined) {
        const x1 = slant.left - box.left;
        const x2 = slant.right - box.left;
        if (anchorX > x2) mount.y = rightY;
        else if (anchorX >= x1) {
          const rise = slant.bottom - slant.top;
          mount.y = slant.top - box.top + (rise * (anchorX - x1)) / (x2 - x1);
          mount.angle = (Math.atan2(rise, x2 - x1) * 180) / Math.PI;
        }
      }
      setHang({
        top,
        height,
        anchor: anchorX / box.width,
        mount,
        size: cardHeight / height,
        // Lanyard places the card top between 12% and 42% of the view height.
        strapLength: Math.min(1, Math.max(0, (cardTop - 0.12) / 0.3)),
        clip,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const statItems = [
    { icon: FiClock, value: parseInt(stats.yearsExperience), suffix: '+', label: 'Years Coding', note: 'Learning & building' },
    { icon: FiFolder, value: projects.length, suffix: '', label: 'Featured Projects', note: 'Web · Mobile · AI' },
    { icon: FiGithub, value: parseInt(stats.repos), suffix: '+', label: 'GitHub Repos', note: 'View profile', href: personalInfo.github },
  ];

  return (
    <section id="about" className="about" ref={ref}>
      {/* mounted early, dropped when the section comes into view */}
      {(cardWarm || cardInView) && cardArt && hang && (
        <div className="about-lanyard" style={{ top: hang.top, height: hang.height, clipPath: hang.clip }}>
          <Lanyard
            frontImage={cardArt.front}
              backImage={cardArt.back}
              strapImage={cardArt.strap}
              imageFit="cover"
              cardColor="#0C0C0C"
              orientation="portrait"
              finish="glossy"
              cornerRadius={0.3}
              size={hang.size}
              anchor={hang.anchor}
              strapLength={hang.strapLength}
              strapColor="#111111"
              strapWidth={STRAP_WIDTH}
              metal="silver"
              gravity={1}
              damping={0.5}
              elasticity={0.5}
              breeze={0.3}
              interactive
              intro="drop"
              dropDelay={0}
              hold={!cardInView}
              strapTiltRef={foldRef}
              anchorDepth={hang.mount.y - hang.top}
            />
        </div>
      )}
      {/* strap hanger on the divider (also hides the clipped strap end) */}
      {cardInView && cardArt && hang && (
        <div
          className="about-strap-hanger"
          aria-hidden="true"
          style={{
            left: hang.mount.x,
            top: hang.mount.y,
            '--strap-w': `${hang.mount.strapWidth}px`,
          } as React.CSSProperties}
        >
          <span
            className="about-strap-mount"
            style={{ transform: `translate(-50%, -50%) rotate(${hang.mount.angle}deg)` }}
          />
          <span className="about-strap-fold" ref={foldRef} />
        </div>
      )}

      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>About Me</h2>
        </motion.div>

        <div className="about-grid">
          {/* placeholder for the card (drawn by the lanyard layer) */}
          <div className="about-card-stage" ref={stageRef} aria-hidden="true" />

          <motion.div
            className="about-content"
            ref={contentRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <motion.span className="about-eyebrow" variants={itemVariants}>Who I am</motion.span>

            <motion.h3 className="about-title" variants={itemVariants}>
              Building practical software across <span>web, mobile &amp; AI.</span>
            </motion.h3>

            <motion.div className="about-bio" variants={itemVariants}>
              <p>
                I'm an Information Technology undergraduate at Rajarata University of Sri Lanka. I build full-stack
                web applications, Android apps and machine-learning features — from computer-vision models to
                production-ready platforms.
              </p>
              <p>
                I care about clean, maintainable code and about shipping products that solve real problems for the
                people who use them.
              </p>
            </motion.div>

            <motion.div className="about-focus" variants={itemVariants}>
              <div className="focus-card">
                <span className="focus-icon"><FiLayers /></span>
                <h4>Full Stack Development</h4>
                <p>Responsive web apps and robust APIs with React, Next.js and Node.js.</p>
              </div>
              <div className="focus-card">
                <span className="focus-icon"><FiCpu /></span>
                <h4>AI &amp; ML Engineering</h4>
                <p>Deep-learning, computer-vision and GenAI features built into real products.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats (left) + Tech Stack (right) — side by side */}
        <div className="about-stats-stack-row" ref={statsRef}>
          <div className="about-stats-col">
            {statItems.map(({ icon: Icon, value, suffix, label, note, href }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * STAT_STAGGER, ease: 'easeOut' }}
              >
                <NotchedCard className="about-stat" icon={<Icon />} href={href} notch={NOTCH}>
                  <span className="about-stat-value" style={{ paddingLeft: NOTCH, minHeight: NOTCH }}>
                    <AnimatedCounter value={value} suffix={suffix} trigger={counterStarted} duration={COUNTER_DURATION} />
                  </span>
                  <span className="about-stat-label">{label}</span>
                  <span className="about-stat-note">
                    {note}
                    {href && <FiArrowUpRight />}
                  </span>
                </NotchedCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="about-stack-card"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: statItems.length * STAT_STAGGER, ease: 'easeOut' }}
          >
            <div className="about-stack-header">
              <span className="about-stack-title">Tech Stack</span>
            </div>
            <div className="tech-marquee-wrapper">
              <div className={`tech-marquee-track${activeSkill ? ' is-paused' : ''}`}>
                {[...skills, ...skills].map((skill, index) => {
                  const Icon = skill.icon;
                  const key = `${skill.name}-${index}`;
                  return (
                    <button
                      type="button"
                      className={`tech-badge${activeSkill === key ? ' is-active' : ''}`}
                      key={key}
                      data-name={skill.name}
                      aria-label={skill.name}
                      aria-pressed={activeSkill === key}
                      onClick={() => setActiveSkill(current => (current === key ? null : key))}
                    >
                      <Icon style={{ color: skill.color }} />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
