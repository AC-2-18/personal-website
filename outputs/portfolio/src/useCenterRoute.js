import { useEffect, useState } from 'react';

function readRoute() {
  const hash = window.location.hash;
  const decode = value => { try { return decodeURIComponent(value); } catch { return value; } };
  if (hash.startsWith('#project/')) return { kind: 'project', id: decode(hash.slice(9)), hash };
  if (hash.startsWith('#search/')) return { kind: 'search', query: decode(hash.slice(8)), hash };
  if (hash === '#about') return { kind: 'about', hash };
  if (hash === '#private') return { kind: 'private', hash };
  if (hash === '#contact') return { kind: 'contact', hash };
  return { kind: 'home', hash, anchor: ['#approach'].includes(hash) ? hash.slice(1) : null };
}

export default function useCenterRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {

    const raf = requestAnimationFrame(() => {
      const target = route.anchor ? document.getElementById(route.anchor) : document.getElementById('center-pane');
      if (route.anchor || route.kind !== 'home') target?.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      (route.anchor ? target?.querySelector('h2') : target)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [route]);
  return route;
}
