import React from 'react';
import './GlitchText.css';

export default function GlitchText({ children, speed = 0.5, enableShadows = true, enableOnHover = false, className = '' }) {
  const style = {
    '--after-duration': `${speed * 3}s`, '--before-duration': `${speed * 3}s`,
    '--after-shadow': enableShadows ? '-1px 0 #bb9dde' : 'none',
    '--before-shadow': enableShadows ? '1px 0 #91d5e4' : 'none',
  };
  return <span className={`glitch ${enableOnHover ? 'enable-on-hover' : ''} ${className}`.trim()} style={style} data-text={children}>{children}</span>;
}
