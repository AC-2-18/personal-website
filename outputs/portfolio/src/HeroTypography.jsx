import React, { useEffect, useRef, useState } from 'react';
import BlurText from './components/reactbits/BlurText';
import SplitFlapText from './SplitFlapText';
import './hero-typography.css';

export const heroPhrases = [
  '木叶飞舞之处，火亦生生不息',
  '保持好奇，让灵感自由生长',
  '心有旷野，向着热爱出发',
  '把想象写进现实，把热爱做到极致',
  '像海一样开放，像光一样前行',
];
const glyphs = [...new Set(heroPhrases.join(''))].join('');

export default function HeroTypography({ running }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const [awake, setAwake] = useState(!document.hidden);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    const update = () => setAwake(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  const active = running && visible && awake;
  return <div ref={ref} className="hero-typography" data-active={active} data-running={running}>
    <h1 id="hero-title" aria-label="海纳灵感，自在生长。Embrace ideas. Grow freely.">
      <span aria-hidden="true"><BlurText className="hero-glitch-cn hero-reveal-title" text="海纳灵感，自在生长。" active={running} /><span className="hero-glitch-en hero-reveal-english">EMBRACE IDEAS. GROW FREELY.</span></span>
    </h1>
    <div className="banner-subtitle rotating-motto"><SplitFlapText words={heroPhrases} active={active} padTo={0}
      charset={glyphs} flipsPerChar={1} flipDuration={0.16} stagger={0.018} cycleDelay={6800}
      tileColor="#17232a" textColor="#e3edf0" tileRadius={3} gap={2} fontSize="clamp(12px, 1.2vw, 18px)" /></div>
  </div>;
}
