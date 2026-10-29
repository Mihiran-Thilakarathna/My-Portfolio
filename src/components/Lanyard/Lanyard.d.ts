import type { CSSProperties, FC, RefObject } from 'react';

export interface LanyardProps {
  frontImage?: string;
  backImage?: string;
  imageFit?: 'cover' | 'contain';
  cardColor?: string;
  orientation?: 'portrait' | 'landscape';
  finish?: 'glossy' | 'matte' | 'holographic' | 'metallic';
  cornerRadius?: number;
  size?: number;
  /** Named position, or the strap's x position as a 0–1 fraction of the container width. */
  anchor?: 'left' | 'center' | 'right' | number;
  strapLength?: number;
  strapImage?: string;
  strapColor?: string;
  strapWidth?: number;
  metal?: 'silver' | 'gold' | 'graphite';
  gravity?: number;
  damping?: number;
  elasticity?: number;
  breeze?: number;
  interactive?: boolean;
  /** true swings the card in from the side; 'drop' lets it fall from the anchor line. */
  intro?: boolean | 'drop';
  /** Delay (s) before the drop starts. */
  dropDelay?: number;
  /** Keeps the drop paused (out of view) while true. */
  hold?: boolean;
  /** Element that gets the strap's top angle as the `--strap-tilt` CSS variable each frame. */
  strapTiltRef?: RefObject<HTMLElement | null>;
  /** Pin the strap this many px below the top edge (default: just above it). */
  anchorDepth?: number;
  className?: string;
  style?: CSSProperties;
}

declare const Lanyard: FC<LanyardProps>;
export default Lanyard;
