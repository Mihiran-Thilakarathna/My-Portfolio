import React, { useEffect, useState } from 'react';
import Topography from './Topography/Topography';
import { whenIdleAfterIntro } from '../lib/introGate';
import './Footer.css';

const Footer: React.FC = () => {
  // Mount the WebGL terrain after the intro, a bit later than the About card
  const [terrainReady, setTerrainReady] = useState(false);

  useEffect(() => whenIdleAfterIntro(() => setTerrainReady(true), 3200), []);

  return (
    <footer className="footer">
      <div className="footer-terrain" aria-hidden="true">
        {terrainReady && (
          <Topography
            color="#CCFF00"
            lineCount={22}
            lineWidth={1.1}
            elevation={0.8}
            foreground={0.2}
            tilt={32}
            speed={0.2}
            direction="forward"
            glow={0.45}
            depthOfField={0.4}
            fog={0.4}
            brightness={0.85}
            majorLines
            scale={1}
            detail={0.35}
            morph={0.2}
            markers="none"
            glitch={0}
            // background only, no mouse interaction
            mouseInteraction={false}
            parallax={0}
            clickEffect="none"
            intro
          />
        )}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mihiran Thilakarathna. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
