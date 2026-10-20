import React, { lazy, Suspense } from 'react';
import './home-background.css';

const PatternWaves = lazy(() => import('./PatternWaves'));

export default function HomeBackground({ running = true, interactive = true }) {
  return <div className="home-background" data-motion={running ? 'running' : 'prepared'} aria-hidden="true">
    <Suspense fallback={null}>
      <PatternWaves
        preset="silk" color="#ffffff" backgroundColor="#000000"
        fade="edges" interactive={interactive} cursorSize={44} cursorStrength={0.25}
        speed={0.18} depth={0.62} spacing={11} markSize={0.55}
        shine={0.45} contrast={1} opacity={0.48}
        pattern="line" paused={!running} intro={false}
      />
    </Suspense>
  </div>;
}
