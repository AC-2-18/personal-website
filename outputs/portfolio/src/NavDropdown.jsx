import React, { useEffect, useRef, useState } from 'react';
import BranchedMenu from './BranchedMenu';

export default function NavDropdown({ label, icon, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null), button = useRef(null);
  const id = React.useId();
  const links = React.Children.toArray(children).filter(React.isValidElement).map(child => {
    const parts = React.Children.toArray(child.props.children);
    return {
      value: child.props.href,
      href: child.props.href,
      label: parts.filter(part => typeof part === 'string' || typeof part === 'number').join('').trim(),
      icon: parts.find(part => React.isValidElement(part) && part.type !== 'span') || icon,
      onClick: child.props.onClick,
    };
  });
  const activeValue = typeof window !== 'undefined' ? window.location.hash : '';
  useEffect(() => {
    if (!open) return;
    const close = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  return <div className="nav-dropdown" ref={ref} onBlur={e => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false); }} onKeyDown={e => {
    if (e.key === 'Escape') { setOpen(false); button.current?.focus(); e.stopPropagation(); }
    if (open && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key) && e.target !== button.current) {
      const targets = [...ref.current.querySelectorAll('.nav-dropdown-panel button, .nav-dropdown-panel a')].filter(el => !el.closest('[inert]'));
      const current = targets.indexOf(document.activeElement);
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? targets.length - 1 : (current + (e.key === 'ArrowDown' ? 1 : -1) + targets.length) % targets.length;
      e.preventDefault(); targets[next]?.focus();
    }
  }}><button ref={button} className="nav-dropdown-trigger" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} onKeyDown={e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); requestAnimationFrame(() => ref.current?.querySelector('.nav-dropdown-panel a, .nav-dropdown-panel button')?.focus()); }
  }}>{icon}{label}<span className="nav-chevron" aria-hidden="true">⌄</span></button>
    {open && <div className="nav-dropdown-panel nav-branched-panel" id={id}>
      <BranchedMenu items={[{ label: label === '作品' ? '作品目录' : '个人空间', children: links }]}
        ariaLabel={`${label}展开菜单`} activeValue={activeValue} defaultOpen={0}
        color="#e3edf0" accentColor="#a4dce8" lineColor="#3c5661"
        drawDuration={280} foldDuration={280}
        width={290} rowHeight={42} fontSize={13} indent={36} trunk={12} radius={9}
        onSelect={() => setOpen(false)} />
    </div>}
  </div>;
}
