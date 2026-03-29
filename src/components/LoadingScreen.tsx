import React, { useEffect, useMemo, useState } from 'react';
import { FaCode, FaUser, FaGithub } from 'react-icons/fa';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const lineToSpans = (text: string) =>
  text.split('').map((ch, idx) => (
    <span key={`${text}-${idx}`} className="char" style={{ ['--d' as any]: `${idx * 40}ms` }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [visible, setVisible] = useState(true);
  const [iconsIn, setIconsIn] = useState(false);
  const [textIn, setTextIn] = useState(false);
  const [ripple, setRipple] = useState(false);

  const line1 = useMemo(() => lineToSpans('Welcome To My'), []);
  const line2 = useMemo(() => lineToSpans('Portfolio Website'), []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setIconsIn(true), 150));
    timers.push(setTimeout(() => setTextIn(true), 650));
    timers.push(
      setTimeout(() => {
        setRipple(true);
        onLoadingComplete();
        timers.push(
          setTimeout(() => {
            setVisible(false);
          }, 700)
        );
      }, 2000)
    );

    return () => timers.forEach(clearTimeout);
  }, [onLoadingComplete]);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${ripple ? 'wipe-out' : ''}`}>
      <div className="loading-overlay" />
      <div className="loading-inner">
        <div className={`icon-row ${iconsIn ? 'icons-in' : ''}`}>
          {[FaCode, FaUser, FaGithub].map((Icon, idx) => (
            <div key={idx} className="icon-pill">
              <Icon />
            </div>
          ))}
        </div>
        <div className="loading-title">
          <p className={textIn ? 'show-title' : ''}>{line1}</p>
          <h1 className={textIn ? 'show-title' : ''}>{line2}</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
