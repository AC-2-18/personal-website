import React, { useEffect, useRef } from 'react';
import SlingButton from './SlingButton';
import './hero-actions.css';

const actions = [
  { text: '探索作品', href: '#project/form', path: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { text: '联系我', href: '#contact', path: 'M3 5h18v14H3zM3 5l9 8 9-8' },
  { text: '关于我', href: '#about', path: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a8 8 0 0 1 16 0v3' },
];
export default function HeroActions() {
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function open(href) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { window.location.hash = href; }, window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 380);
  }
  return <div className="hero-actions" aria-label="快捷入口">{actions.map(action => <div className="hero-action" key={action.href}>
    <SlingButton ariaLabel={action.text} onSend={() => open(action.href)} size={44} armAt={24} maxPull={64} flight={32} particles={5} recoil={0.07} launchSpeed={1500} spread={35} strokeWidth={1.5}
      padColor="#263b45" iconColor="#edf6f8" accentColor="#a4dce8" wellColor="#112027bd" bandColor="#789aa5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={action.path} /></svg>
    </SlingButton><span className="hero-action-label">{action.text}</span>
  </div>)}</div>;
}
