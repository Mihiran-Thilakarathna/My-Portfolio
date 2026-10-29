import React, { useLayoutEffect, useState } from 'react';
import './NotchedCard.css';

interface NotchedCardProps {
  icon: React.ReactNode;
  className?: string;
  href?: string;
  // notch size (px) in the top-left corner
  notch?: number;
  gap?: number;
  radius?: number;
  children: React.ReactNode;
}

const notchedPath = (w: number, h: number, n: number, r: number) =>
  `M ${n + r},0 L ${w - r},0 A ${r},${r} 0 0 1 ${w},${r} L ${w},${h - r} A ${r},${r} 0 0 1 ${w - r},${h}
  L ${r},${h} A ${r},${r} 0 0 1 0,${h - r} L 0,${n + r} A ${r},${r} 0 0 1 ${r},${n}
  L ${n - r},${n} A ${r},${r} 0 0 0 ${n},${n - r} L ${n},${r} A ${r},${r} 0 0 1 ${n + r},0 Z`;

// A card with a notch cut from its top-left corner and the icon in its own box inside it.
// The outline is an SVG sized to the card, so it follows the notch exactly.
const NotchedCard: React.FC<NotchedCardProps> = ({ icon, className = '', href, notch = 54, gap = 8, radius = 14, children }) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!el) return;
    const measure = () => setSize({ width: el.offsetWidth, height: el.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  const body = (
    <>
      {size.width > 0 && (
        <svg className="notched-shape" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
          <path d={notchedPath(size.width, size.height, notch, radius)} />
        </svg>
      )}
      <span className="notched-icon" style={{ width: notch - gap, height: notch - gap, borderRadius: radius - 2 }}>
        {icon}
      </span>
      {children}
    </>
  );

  const classes = `notched-card ${className}`.trim();
  return href ? (
    <a className={classes} ref={setEl} href={href} target="_blank" rel="noopener noreferrer">{body}</a>
  ) : (
    <div className={classes} ref={setEl}>{body}</div>
  );
};

export default NotchedCard;
