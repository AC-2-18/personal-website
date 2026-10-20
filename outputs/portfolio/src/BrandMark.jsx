import React, { lazy, Suspense } from 'react';
import './personal-components.css';

const ShapeWaves = lazy(() => import('./ShapeWaves'));

export default function BrandMark({ active }) {
  const placeholder = <span className="header-wave-placeholder" />;
  return <div className="header-wave-background" aria-hidden="true">
    {active ? <Suspense fallback={placeholder}>
      <ShapeWaves shapes="mixed" cellSize={10} dotSize={0.75}
        color="#7c3aed" hoverColor="#dd2020" backgroundColor="#120f17"
        brightness={0.4} speed={1} scale={1} contrast={1} fade={0.25}
        flow={0} direction={0} splashRadius={40} splashStrength={0.4}
        glow={0.35} introDuration={1.6}
        onError={error => { if (import.meta.env.DEV) console.warn('ShapeWaves 使用静态后备图形：', error.message); }} />
    </Suspense> : placeholder}
  </div>;
}
