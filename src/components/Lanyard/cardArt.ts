import cardPhoto from '../../assets/mihiran-card.webp';
import { contactInfo, personalInfo } from '../../data/portfolio';

// Face size matches Lanyard's FACE_WIDTH and portrait card ratio (1.6 x 2.25).
const W = 1024;
const H = 1440;
// The lanyard slot is punched out around the top centre; keep this band free of content.
const SLOT_BOTTOM = 130;

const LIME = '#CCFF00';
const CREAM = '#D9B08C';
const INK = '#0C0C0C';
const MUTED = '#8A8A8A';

const ROLES = ['FULL STACK DEVELOPER', 'AI/ML'];

export interface CardArt {
  front: string;
  back: string;
  strap: string;
}

const canvas2d = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d')!] as const;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const paintBase = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 64; x < W; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 64; y < H; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
};

const paintFront = (photo: HTMLImageElement) => {
  const [canvas, ctx] = canvas2d(W, H);
  paintBase(ctx);

  const glow = ctx.createRadialGradient(640, 900, 40, 640, 900, 640);
  glow.addColorStop(0, 'rgba(204, 255, 0, 0.14)');
  glow.addColorStop(1, 'rgba(204, 255, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // First name running up the left edge, sized to fill the card's height.
  ctx.save();
  ctx.font = '900 100px Orbitron';
  const fit = (H - SLOT_BOTTOM - 120) / ctx.measureText('MIHIRAN').width;
  ctx.font = `900 ${Math.floor(100 * fit)}px Orbitron`;
  ctx.translate(52, H - 90);
  ctx.rotate(-Math.PI / 2);
  ctx.textBaseline = 'top';
  ctx.fillStyle = LIME;
  ctx.fillText('MIHIRAN', 0, 0);
  ctx.restore();

  // Photo cut-out with a lime outline, bleeding off the right and bottom edges.
  const photoW = 860;
  const photoH = (photo.height / photo.width) * photoW;
  const photoX = W - photoW + 70;
  const photoY = H - photoH;

  const [silhouette, sctx] = canvas2d(W, H);
  sctx.drawImage(photo, photoX, photoY, photoW, photoH);
  sctx.globalCompositeOperation = 'source-in';
  sctx.fillStyle = LIME;
  sctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.shadowColor = 'rgba(204, 255, 0, 0.6)';
  ctx.shadowBlur = 36;
  ctx.drawImage(silhouette, 0, 0);
  ctx.restore();
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ctx.drawImage(silhouette, Math.cos(angle) * 6, Math.sin(angle) * 6);
  }
  ctx.drawImage(photo, photoX, photoY, photoW, photoH);

  const fade = ctx.createLinearGradient(0, 1000, 0, H);
  fade.addColorStop(0, 'rgba(12, 12, 12, 0)');
  fade.addColorStop(1, 'rgba(12, 12, 12, 0.94)');
  ctx.fillStyle = fade;
  ctx.fillRect(0, 1000, W, H - 1000);

  const right = W - 72;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 18;
  ctx.font = '800 62px Orbitron';
  ctx.fillText('MIHIRAN', right, 1212);
  ctx.fillText('THILAKARATHNA', right, 1284);
  ctx.shadowBlur = 0;

  // The front shows only the primary role; the back and strap list them all.
  const [role] = ROLES;
  ctx.font = '700 30px "JetBrains Mono"';
  const badgeW = ctx.measureText(role).width + 48;
  ctx.fillStyle = LIME;
  ctx.beginPath();
  ctx.roundRect(right - badgeW, 1318, badgeW, 58, 8);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textBaseline = 'middle';
  ctx.fillText(role, right - 24, 1348);

  return canvas.toDataURL('image/png');
};

const paintBack = () => {
  const [canvas, ctx] = canvas2d(W, H);
  paintBase(ctx);
  const cx = W / 2;

  // Monogram, echoing the navbar logo.
  ctx.save();
  ctx.shadowColor = 'rgba(238, 238, 238, 0.45)';
  ctx.shadowBlur = 30;
  ctx.strokeStyle = '#EEEEEE';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(cx - 100, 300, 200, 200, 36);
  ctx.stroke();
  ctx.fillStyle = '#EEEEEE';
  ctx.font = '900 120px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', cx, 408);
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 56px Orbitron';
  ctx.fillText('MIHIRAN', cx, 640);
  ctx.fillText('THILAKARATHNA', cx, 708);
  ctx.fillStyle = LIME;
  ctx.font = '700 30px "JetBrains Mono"';
  ctx.fillText(ROLES.join('  ·  '), cx, 772);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(160, 830, W - 320, 2);

  const rows = [
    ['LOCATION', contactInfo.location],
    ['EMAIL', personalInfo.email],
    ['PHONE', contactInfo.phone],
  ];
  ctx.textAlign = 'left';
  rows.forEach(([label, value], i) => {
    const y = 905 + i * 92;
    ctx.fillStyle = MUTED;
    ctx.font = '600 22px "JetBrains Mono"';
    ctx.fillText(label, 160, y);
    ctx.fillStyle = CREAM;
    ctx.font = '600 30px "JetBrains Mono"';
    ctx.fillText(value, 160, y + 40);
  });

  // Decorative barcode with a fixed pattern so the card renders identically every time.
  ctx.fillStyle = LIME;
  let x = 160;
  let seed = 7;
  while (x < W - 160) {
    seed = (seed * 9301 + 49297) % 233280;
    const width = 3 + (seed % 4) * 3;
    if (x + width > W - 160) break;
    ctx.fillRect(x, 1210, width, 90);
    x += width + 4 + (seed % 3) * 3;
  }

  ctx.fillStyle = MUTED;
  ctx.font = '600 24px "JetBrains Mono"';
  ctx.textAlign = 'center';
  ctx.fillText('mihiran.me', cx, 1352);

  return canvas.toDataURL('image/png');
};

const paintStrap = () => {
  const unit = `${personalInfo.name.toUpperCase()}  •  ${ROLES.join('  •  ')}  •  `;
  const [, pctx] = canvas2d(1, 1);
  pctx.font = '700 60px "JetBrains Mono"';
  const width = Math.ceil(pctx.measureText(unit).width);

  const [canvas, ctx] = canvas2d(width, 192);
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, width, 192);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillRect(0, 14, width, 2);
  ctx.fillRect(0, 176, width, 2);
  ctx.fillStyle = LIME;
  ctx.font = '700 60px "JetBrains Mono"';
  ctx.textBaseline = 'middle';
  ctx.fillText(unit, 0, 98);

  return canvas.toDataURL('image/png');
};

let cached: Promise<CardArt> | null = null;

// Draws the lanyard card faces and strap with the site's own fonts and colours.
export function createCardArt(): Promise<CardArt> {
  cached ??= (async () => {
    await Promise.all([
      document.fonts.load('900 100px Orbitron'),
      document.fonts.load('800 62px Orbitron'),
      document.fonts.load('700 30px "JetBrains Mono"'),
      document.fonts.load('600 30px "JetBrains Mono"'),
    ]);
    const photo = await loadImage(cardPhoto);
    return { front: paintFront(photo), back: paintBack(), strap: paintStrap() };
  })();
  return cached;
}
