import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './LoadingScreen.css';

interface LoadingScreenProps {
  // intro starts fading out
  onReveal: () => void;
  // intro fully hidden
  onFinish: () => void;
}

const NAME = 'Mihiran Thilakarathna';
const FONT = 'Bastliga One';
const INK = '#CCFF00';
const GLOW = 'rgba(204, 255, 0, 0.45)';
// freshly written ink, fades to INK
const WET = '#F4FFD2';
const WET_GLOW = 'rgba(225, 255, 140, 0.85)';
// layout units; the canvas is scaled to fit the screen
const FONT_SIZE = 96;
const PAD = 30;
// Pixels darker than this are not ink
const INK_ALPHA = 60;
// how far the reveal mask extends past strokes (covers the glow)
const HALO = 12;
// pause between separate strokes
const LIFT_GAP = 30;
// wet trail length, as a fraction of the total
const WET_SPAN = 0.1;

// Seconds
const START = 0.3; // pause before writing
const WRITE = 3.4;
const SETTLE = 0.3; // let the last ink dry
const HOLD = 0.6;
const EXIT = 1.6; // fade out to the site

interface Plan {
  width: number;
  height: number;
  scale: number;
  ratio: number;
  originX: number;
  baseline: number;
  // per-pixel ink time (stroke-length units) and the pixels sorted by it
  inkedAt: Float32Array;
  order: Uint32Array;
  total: number;
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeInOut = (t: number) => 0.5 - Math.cos(Math.PI * clamp01(t)) / 2;

const fontSpec = `${FONT_SIZE}px "${FONT}", cursive`;

// Builds the reveal order: BFS along each connected stroke from its leftmost pixel, strokes
// left to right, and halo pixels take the time of the nearest stroke pixel.
const planSignature = (): Plan => {
  const probe = document.createElement('canvas').getContext('2d')!;
  probe.font = fontSpec;
  const box = probe.measureText(NAME);
  const originX = PAD + box.actualBoundingBoxLeft;
  const baseline = PAD + box.actualBoundingBoxAscent;
  const width = Math.ceil(originX + box.actualBoundingBoxRight + PAD);
  const height = Math.ceil(baseline + box.actualBoundingBoxDescent + PAD);

  const sample = document.createElement('canvas');
  sample.width = width;
  sample.height = height;
  const sctx = sample.getContext('2d', { willReadFrequently: true })!;
  sctx.font = fontSpec;
  sctx.fillStyle = '#fff';
  sctx.fillText(NAME, originX, baseline);
  const pixels = sctx.getImageData(0, 0, width, height).data;

  const size = width * height;
  const isInk = new Uint8Array(size);
  for (let i = 0; i < size; i++) isInk[i] = pixels[i * 4 + 3] > INK_ALPHA ? 1 : 0;

  const inkedAt = new Float32Array(size).fill(-1);
  const reach = new Uint8Array(size);
  const queue = new Int32Array(size);
  const neighbours = [-1, 1, -width, width, -width - 1, -width + 1, width - 1, width + 1];

  // trace strokes left to right
  let offset = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const seed = y * width + x;
      if (!isInk[seed] || inkedAt[seed] >= 0) continue;
      let head = 0;
      let tail = 0;
      let longest = 0;
      inkedAt[seed] = offset;
      queue[tail++] = seed;
      while (head < tail) {
        const at = queue[head++];
        const d = inkedAt[at] - offset;
        if (d > longest) longest = d;
        const ax = at % width;
        for (const step of neighbours) {
          const next = at + step;
          const nx = next % width;
          if (next < 0 || next >= size || Math.abs(nx - ax) > 1) continue;
          if (!isInk[next] || inkedAt[next] >= 0) continue;
          inkedAt[next] = offset + d + 1;
          queue[tail++] = next;
        }
      }
      offset += longest + LIFT_GAP;
    }
  }
  const total = Math.max(1, offset - LIFT_GAP);

  // spread times outward so the glow reveals with its stroke
  let head = 0;
  let tail = 0;
  for (let i = 0; i < size; i++) if (isInk[i]) queue[tail++] = i;
  while (head < tail) {
    const at = queue[head++];
    if (reach[at] >= HALO) continue;
    const ax = at % width;
    for (const step of neighbours) {
      const next = at + step;
      const nx = next % width;
      if (next < 0 || next >= size || Math.abs(nx - ax) > 1 || inkedAt[next] >= 0) continue;
      inkedAt[next] = inkedAt[at];
      reach[next] = reach[at] + 1;
      queue[tail++] = next;
    }
  }

  let count = 0;
  for (let i = 0; i < size; i++) if (inkedAt[i] >= 0) count++;
  const order = new Uint32Array(count);
  for (let i = 0, n = 0; i < size; i++) if (inkedAt[i] >= 0) order[n++] = i;
  order.sort((a, b) => inkedAt[a] - inkedAt[b]);

  return {
    width,
    height,
    scale: Math.min(600, window.innerWidth * 0.88) / width,
    ratio: Math.min(window.devicePixelRatio || 1, 2),
    originX,
    baseline,
    inkedAt,
    order,
    total,
  };
};

// Signature intro: writes the name, then fades out to reveal the site.
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onReveal, onFinish }) => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plan, setPlan] = useState<Plan>();
  const [exiting, setExiting] = useState(false);

  // wait for the font (max 2.5s) before measuring
  useEffect(() => {
    let alive = true;
    Promise.race([document.fonts.load(fontSpec), new Promise(resolve => setTimeout(resolve, 2500))]).then(() => {
      if (alive) setPlan(planSignature());
    });
    return () => {
      alive = false;
    };
  }, []);

  // reveal pixels up to the pen position each frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!plan || !canvas) return;

    const { width, height, scale, ratio, inkedAt, order, total } = plan;
    const k = scale * ratio;
    canvas.width = Math.ceil(width * k);
    canvas.height = Math.ceil(height * k);
    const ctx = canvas.getContext('2d')!;

    const deviceCanvas = () => {
      const c = document.createElement('canvas');
      c.width = canvas.width;
      c.height = canvas.height;
      return c;
    };
    // settled and wet ink layers
    const layer = (fill: string, glow: string, blur: number) => {
      const c = deviceCanvas();
      const lctx = c.getContext('2d')!;
      lctx.setTransform(k, 0, 0, k, 0, 0);
      lctx.font = fontSpec;
      lctx.fillStyle = fill;
      lctx.shadowColor = glow;
      lctx.shadowBlur = blur * k;
      lctx.fillText(NAME, plan.originX, plan.baseline);
      lctx.shadowBlur = 0;
      lctx.fillText(NAME, plan.originX, plan.baseline);
      return c;
    };
    const ink = layer(INK, GLOW, 12);
    const wet = layer(WET, WET_GLOW, 18);

    // reveal and wetness masks at layout resolution
    const maskOf = () => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const mctx = c.getContext('2d')!;
      const data = mctx.createImageData(width, height);
      for (let i = 0; i < data.data.length; i += 4) {
        data.data[i] = 255;
        data.data[i + 1] = 255;
        data.data[i + 2] = 255;
      }
      return { canvas: c, ctx: mctx, data };
    };
    const inked = maskOf();
    const wetness = maskOf();
    const scratch = deviceCanvas();
    const sctx = scratch.getContext('2d')!;

    // draw `source` through `mask` (upscaling the mask softens its edge)
    const through = (target: CanvasRenderingContext2D, mask: HTMLCanvasElement, source: HTMLCanvasElement) => {
      target.globalCompositeOperation = 'source-over';
      target.drawImage(mask, 0, 0, canvas.width, canvas.height);
      target.globalCompositeOperation = 'source-in';
      target.drawImage(source, 0, 0);
      target.globalCompositeOperation = 'source-over';
    };

    let reached = 0;
    let drying = 0;
    const wetSpan = total * WET_SPAN;
    const writeUpTo = (pen: number) => {
      for (; reached < order.length && inkedAt[order[reached]] <= pen; reached++) {
        inked.data.data[order[reached] * 4 + 3] = 255;
      }
      for (; drying < reached && inkedAt[order[drying]] < pen - wetSpan; drying++) {
        wetness.data.data[order[drying] * 4 + 3] = 0;
      }
      for (let i = drying; i < reached; i++) {
        const fresh = 1 - (pen - inkedAt[order[i]]) / wetSpan;
        wetness.data.data[order[i] * 4 + 3] = Math.round(fresh * fresh * 255);
      }
      inked.ctx.putImageData(inked.data, 0, 0);
      wetness.ctx.putImageData(wetness.data, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      through(ctx, inked.canvas, ink);
      sctx.clearRect(0, 0, canvas.width, canvas.height);
      through(sctx, wetness.canvas, wet);
      ctx.drawImage(scratch, 0, 0);
    };

    const finish = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(ink, 0, 0);
    };

    if (reduceMotion) {
      finish();
      const timer = setTimeout(() => setExiting(true), 1200);
      return () => clearTimeout(timer);
    }

    const done = START + WRITE + SETTLE + HOLD;
    let raf = 0;
    let begin = 0;

    const frame = (now: number) => {
      if (!begin) begin = now;
      const t = (now - begin) / 1000;

      if (t < START) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (t < START + WRITE + SETTLE) {
        // eased pen position, plus a short drying tail after writing
        writeUpTo(easeInOut((t - START) / WRITE) * total + Math.max(0, t - START - WRITE) / SETTLE * wetSpan);
      } else if (t < done) {
        finish();
      } else {
        finish();
        setExiting(true);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [plan, reduceMotion]);

  useEffect(() => {
    if (!exiting) return;
    onReveal();
    const timer = setTimeout(onFinish, EXIT * 1000);
    return () => clearTimeout(timer);
  }, [exiting, onReveal, onFinish]);

  return (
    <motion.div
      className="intro"
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT, ease: [0.4, 0, 0.2, 1] }}
      role="img"
      aria-label={NAME}
    >
      <motion.div
        className="intro-stage"
        style={plan ? { width: plan.width * plan.scale, height: plan.height * plan.scale } : undefined}
        initial={false}
        animate={exiting ? { y: -32, scale: 0.9, filter: 'blur(8px)' } : { y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: EXIT, ease: [0.4, 0, 0.2, 1] }}
      >
        <canvas ref={canvasRef} className="intro-signature" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
