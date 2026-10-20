// Viewport entrance inspired by React Bits AnimatedContent; native WAAPI adaptation.
import { useEffect, useRef } from 'react';
export default function useContentEntrance(rootRef, enabled, routeKey) {
  const seen = useRef(new WeakSet());
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Map();
    const targets = [...root.querySelectorAll('.content-column > .panel, .right-sidebar > .panel, .personal-photo-card')];
    const enter = (el, index = 0) => {
      if (seen.current.has(el)) return;
      seen.current.add(el);
      if (media.matches || !el.animate) return;
      const animation = el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 520, delay: Math.min(index * 45, 90), easing: 'cubic-bezier(.22,1,.36,1)' });
      animations.set(el, animation);
      animation.onfinish = () => animations.delete(el);
    };
    const observer = window.IntersectionObserver ? new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach((entry, i) => { enter(entry.target, i); observer.unobserve(entry.target); });
    }, { threshold: 0.06 }) : null;
    targets.forEach(el => observer ? observer.observe(el) : enter(el));
    const finish = () => { if (media.matches) { animations.forEach(a => a.finish()); animations.clear(); } };
    const focus = event => {
      for (const [el, animation] of animations) if (el.contains(event.target)) { animation.finish(); animations.delete(el); }
      targets.filter(el => el.contains(event.target)).forEach(el => { seen.current.add(el); observer?.unobserve(el); });
    };
    media.addEventListener('change', finish); root.addEventListener('focusin', focus);
    return () => { observer?.disconnect(); animations.forEach(a => a.cancel()); root.removeEventListener('focusin', focus); media.removeEventListener('change', finish); };
  }, [rootRef, enabled, routeKey]);
}
