// Adapted from React Bits BlurText. See public/licenses/ReactBits-LICENSE.txt.
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
const from = { opacity: 0, filter: 'blur(4px)', y: 10 };
const to = { opacity: 1, filter: 'blur(0px)', y: 0 };
export default function BlurText({ text, active = true, className = '', delay = 24 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!window.IntersectionObserver) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className={className}>
    {Array.from(text).map((letter, i) => <motion.span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}
      initial={reduced ? false : from} animate={reduced || (active && inView) ? to : from}
      transition={reduced ? { duration: 0 } : { duration: 0.58, delay: i * delay / 1000, ease: [0.22, 1, 0.36, 1] }}>
      {letter}
    </motion.span>)}
  </span>;
}
