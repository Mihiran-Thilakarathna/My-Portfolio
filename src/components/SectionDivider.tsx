import React from 'react';
import { motion, useInView } from 'framer-motion';

const SectionDivider: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="section-divider" style={{ 
      display: 'flex', 
      width: '100%', 
      height: '80px', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '0 5%',
      opacity: 0.8,
      overflow: 'hidden'
    }} ref={ref}>
      <motion.div 
        style={{ 
          flex: 1, 
          height: '1.5px', 
          background: 'linear-gradient(90deg, transparent, var(--primary))', 
          transform: 'translateY(-15px)',
          transformOrigin: 'right'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
      
      <motion.svg 
        width="80" 
        height="60" 
        viewBox="0 0 80 60" 
        style={{ overflow: 'visible', flexShrink: 0 }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.path 
          d="M0,15 L80,45" 
          stroke="var(--primary)" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.circle 
          cx="0" cy="15" r="3.5" 
          fill="var(--bg-color)" 
          stroke="var(--primary-light)" 
          strokeWidth="1.5" 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
        <motion.circle 
          cx="80" cy="45" r="3.5" 
          fill="var(--bg-color)" 
          stroke="var(--primary-light)" 
          strokeWidth="1.5" 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.3 }}
        />
      </motion.svg>
      
      <motion.div 
        style={{ 
          flex: 1, 
          height: '1.5px', 
          background: 'linear-gradient(90deg, var(--primary), transparent)', 
          transform: 'translateY(15px)',
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default SectionDivider;
