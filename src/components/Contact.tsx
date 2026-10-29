import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolio';
import { useFormValidation } from '../hooks/useFormValidation';
import FieldError from './FieldError';
import './Contact.css';

// lamp colour as "r, g, b" so CSS can add alpha
const LIGHT_RGB = '204, 255, 0';

// Lamp geometry in SVG units. The shade is rotated so the light points AIM degrees
// below horizontal.
const SHADE = { x: 122, y: 74 };
const BASE = { x: 70, y: 236 };
const STEM_TOP = { x: 70, y: 150 };
// neck length above the shade origin
const NECK = 46;
const AIM_SIDE = 32;
const AIM_STACKED = 62;
// seconds the "sent" screen stays up before lights out
const SENT_LIGHTS_OUT = 9;
// cord length and max pull distance
const CORD = 66;
const PULL = 46;

const shadePoint = (aim: number, x: number, y: number) => {
  const r = ((aim - 90) * Math.PI) / 180;
  return {
    x: SHADE.x + x * Math.cos(r) - y * Math.sin(r),
    y: SHADE.y + x * Math.sin(r) + y * Math.cos(r),
  };
};

let audioCtx: AudioContext | undefined;

// warm up the AudioContext on the first user gesture to avoid a delayed first click
const warmAudio = () => {
  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {
    // audio not supported
  }
};

// click sound, plus a short hum when switching on
const playSwitch = (turningOn: boolean) => {
  try {
    warmAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    const click = audioCtx.createBufferSource();
    const noise = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.03), audioCtx.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length) ** 3;
    click.buffer = noise;
    const clickFilter = audioCtx.createBiquadFilter();
    clickFilter.type = 'highpass';
    clickFilter.frequency.value = 1800;
    const clickGain = audioCtx.createGain();
    clickGain.gain.value = 0.35;
    click.connect(clickFilter).connect(clickGain).connect(audioCtx.destination);
    click.start(now);

    if (turningOn) {
      const hum = audioCtx.createOscillator();
      const humGain = audioCtx.createGain();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(120, now + 0.05);
      humGain.gain.setValueAtTime(0.001, now);
      humGain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      hum.connect(humGain);
      humGain.connect(audioCtx.destination);
      hum.start(now + 0.05);
      hum.stop(now + 0.38);
    }
  } catch {
    // ignore audio errors
  }
};

// stacked layout aims the lamp down instead of sideways
const useStacked = () => {
  const query = '(max-width: 968px)';
  const [stacked, setStacked] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setStacked(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return stacked;
};

const Contact: React.FC = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const stacked = useStacked();

  const [lit, setLit] = useState(false);
  const pullY = useMotionValue(0);
  const cordHeight = useTransform(pullY, y => CORD + Math.max(0, y));
  const dragged = useRef(false);

  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    const wake = () => {
      warmAudio();
      events.forEach(type => window.removeEventListener(type, wake, true));
    };
    events.forEach(type => window.addEventListener(type, wake, { capture: true, passive: true }));
    return () => events.forEach(type => window.removeEventListener(type, wake, true));
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [sent, setSent] = useState({ name: '', email: '' });
  const { errors, handleSubmit: validated, fieldProps, reset: resetErrors } = useFormValidation();

  // toggle the lamp
  const pull = () => {
    if (lit) {
      playSwitch(false);
      setLit(false);
      return;
    }
    playSwitch(true);
    setLit(true);
    // reset the form after a sent message
    if (status === 'sent') {
      setStatus('idle');
      resetErrors();
    }
  };

  // called when the "sent" countdown ends
  const lightsOut = () => {
    playSwitch(false);
    setLit(false);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 12) pull();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent({ name: formData.name.trim().split(/\s+/)[0], email: formData.email.trim() });
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const aim = stacked ? AIM_STACKED : AIM_SIDE;
  const bulb = shadePoint(aim, 0, 16);
  const rim = shadePoint(aim, -28, 15);
  // gooseneck control points
  const neckEnd = shadePoint(aim, 0, -NECK + 2);
  const gooseBend = shadePoint(aim, 0, -NECK - 34);
  const shadeAngle = aim - 90;

  const roomStyle = {
    '--light': LIGHT_RGB,
    '--bulb-x': `${bulb.x}px`,
    '--bulb-y': `${bulb.y}px`,
    '--beam-angle': `${aim}deg`,
  } as CSSProperties;

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Me</h2>
        </motion.div>

        <motion.div
          className={`contact-room${lit ? ' is-lit' : ''}`}
          style={roomStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="lamp">
            <div className="lamp-beam" aria-hidden="true" />

            <svg className="lamp-body" viewBox="0 0 200 260" aria-hidden="true">
              <defs>
                <linearGradient id="lamp-paint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5c5c5c" />
                  <stop offset="1" stopColor="#2f2f2f" />
                </linearGradient>
              </defs>
              <ellipse className="lamp-shadow" cx={BASE.x} cy={BASE.y + 12} rx="56" ry="5" />
              <path
                className="lamp-base-side"
                d={`M${BASE.x - 46} ${BASE.y} v9 a46 9 0 0 0 92 0 v-9 Z`}
              />
              <ellipse className="lamp-paint" cx={BASE.x} cy={BASE.y} rx="46" ry="9" />
              <ellipse className="lamp-collar" cx={BASE.x} cy={BASE.y} rx="14" ry="3.5" />
              <path
                className="lamp-neck"
                d={`M${STEM_TOP.x} ${BASE.y - 2} V${STEM_TOP.y} C${STEM_TOP.x} ${STEM_TOP.y - 45} ${gooseBend.x} ${gooseBend.y} ${neckEnd.x} ${neckEnd.y}`}
              />
              <rect className="lamp-paint" x={STEM_TOP.x - 4.5} y={STEM_TOP.y + 30} width="9" height={BASE.y - STEM_TOP.y - 30} rx="2" />
              <g transform={`translate(${SHADE.x} ${SHADE.y}) rotate(${shadeAngle})`}>
                <rect className="lamp-paint" x="-10" y={-NECK} width="20" height="24" rx="3" />
                <path className="lamp-paint" d="M-12 -26 C-22 -24 -35 -8 -35 16 L35 16 C35 -8 22 -24 12 -26 Z" />
                <ellipse className="lamp-inside" cx="0" cy="16" rx="33" ry="7" />
                <circle className="lamp-bulb" cx="0" cy="17" r="6" />
              </g>
            </svg>

            <div className="lamp-cord" style={{ left: rim.x, top: rim.y }}>
              <motion.span className="lamp-cord-line" style={{ height: cordHeight }} />
              <motion.button
                type="button"
                className="lamp-pull"
                style={{ y: pullY, top: CORD }}
                drag="y"
                dragConstraints={{ top: 0, bottom: PULL }}
                dragElastic={0.15}
                dragSnapToOrigin
                dragTransition={{ bounceStiffness: 600, bounceDamping: 14 }}
                onPointerDown={() => { dragged.current = false; warmAudio(); }}
                onDragStart={() => { dragged.current = true; }}
                onDragEnd={handleDragEnd}
                onClick={() => { if (!dragged.current) pull(); }}
                aria-label={lit ? 'Turn off the lamp' : 'Turn on the lamp'}
                aria-pressed={lit}
              />
              {/* hint only while the lamp is off */}
              {!lit && <span className="lamp-hint">{status === 'sent' ? 'Pull again' : 'Pull me'}</span>}
            </div>
          </div>

          <div
            className="contact-card"
            onClick={() => { if (!lit) pull(); }}
          >
            <div className="contact-card-inner" inert={!lit}>
              <span className="contact-eyebrow">Your message</span>
              <h3 className="contact-title">Let's Talk</h3>
              <p className="contact-sub">Have an idea, an opportunity or just a question? Drop me a line.</p>

              <form onSubmit={validated(handleSubmit)} className="contact-form" noValidate>
                <label className="form-group">
                  <span className="form-label">Name</span>
                  <input
                    type="text"
                    name="name"
                    data-label="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    {...fieldProps('name')}
                  />
                  <FieldError name="name" message={errors.name} />
                </label>

                <label className="form-group">
                  <span className="form-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    data-label="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    {...fieldProps('email')}
                  />
                  <FieldError name="email" message={errors.email} />
                </label>

                <label className="form-group">
                  <span className="form-label">Message</span>
                  <textarea
                    name="message"
                    data-label="message"
                    placeholder="Tell me about it..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    {...fieldProps('message')}
                  />
                  <FieldError name="message" message={errors.message} />
                </label>

                <AnimatePresence initial={false}>
                  {status === 'error' && (
                    <motion.div
                      className="form-alert"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FiAlertTriangle aria-hidden="true" />
                      <span>
                        Your message couldn't be sent. Please try again, or email me at{' '}
                        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'sending'}
                >
                  <FaPaperPlane /> {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="contact-divider"><span>or find me on</span></div>

              <div className="contact-socials">
                <a href={`mailto:${personalInfo.email}`} aria-label="Email" title={personalInfo.email}>
                  <FaEnvelope />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>

            <AnimatePresence>
              {lit && status === 'sent' && (
                <motion.div
                  className="contact-sent"
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                >
                  <motion.span
                    className="contact-sent-icon"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  >
                    <FiCheck />
                  </motion.span>
                  <span className="contact-eyebrow">Message sent</span>
                  <h3 className="contact-sent-title">Thank you{sent.name ? `, ${sent.name}` : ''}</h3>
                  <p className="contact-sent-text">
                    Your message has reached me, and I'll get back to you as soon as I can
                    {sent.email && <> at <strong>{sent.email}</strong></>}.
                  </p>

                  <div className="contact-sent-footer">
                    <span
                      className="contact-sent-timer"
                      style={{ animationDuration: `${SENT_LIGHTS_OUT}s` }}
                      onAnimationEnd={lightsOut}
                    />
                    <span className="contact-sent-note">
                      The lamp will switch off shortly. Pull the cord to write another message.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!lit && (
              <span className="contact-card-dark">
                {status === 'sent'
                  ? 'Message delivered. Pull the lamp cord to write another.'
                  : "It's dark in here. Pull the lamp cord."}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
