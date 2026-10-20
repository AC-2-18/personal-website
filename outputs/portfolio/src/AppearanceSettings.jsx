import React, { useEffect, useRef, useState } from 'react';
import { defaultAppearance } from './siteConfig';

function Choices({ label, value, options, onChange }) {
  return <fieldset className="appearance-field"><legend>{label}</legend><div className="appearance-choices">{options.map(([key, title]) => <button type="button" key={key} aria-pressed={value === key} onClick={() => onChange(key)}>{title}</button>)}</div></fieldset>;
}

export default function AppearanceSettings({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null), trigger = useRef(null), first = useRef(null);
  const update = (key, next) => onChange(previous => ({ ...previous, [key]: next }));
  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const outside = e => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const escape = e => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <div className="appearance-control" ref={ref} onBlur={e => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} type="button" className="icon-button appearance-toggle" aria-label="外观设置" aria-expanded={open} aria-controls="appearance-panel" onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7c-.9-.5-.5-2.3.6-2.3H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z"/><circle cx="7" cy="10" r="1"/><circle cx="10" cy="6.8" r="1"/><circle cx="15" cy="7" r="1"/></svg></button>
    {open && <section id="appearance-panel" className="appearance-panel" role="dialog" aria-label="外观设置面板">
      <div className="appearance-heading"><div><h2>外观</h2><p>把这里，调成你喜欢的样子。</p></div><button ref={first} className="icon-button" aria-label="关闭外观设置" onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</button></div>
      <Choices label="显示模式" value={value.theme} options={[["light","亮色"],["dark","暗色"],["system","跟随系统"]]} onChange={next => update('theme', next)} />
      <div className="appearance-field hue-field"><label htmlFor="theme-hue">主题色相 <output>{value.hue}°</output></label><input id="theme-hue" type="range" min="0" max="360" step="1" value={value.hue} onChange={e => update('hue', Number(e.target.value))} /><div className="hue-swatches">{[[165,'萤绿'],[220,'海蓝'],[285,'雾紫'],[350,'浅桃']].map(([hue,label]) => <button key={hue} aria-label={`使用${label}主题色`} aria-pressed={value.hue === hue} style={{'--swatch':`oklch(.68 .13 ${hue})`}} onClick={() => update('hue',hue)}><span />{label}</button>)}</div></div>
      <Choices label="作品布局" value={value.layout} options={[["list","列表"],["grid","网格"]]} onChange={next => update('layout', next)} />
      <Choices label="背景" value={value.wallpaper} options={[["banner","海景横幅"],["fullscreen","全屏壁纸"],["none","纯色"]]} onChange={next => update('wallpaper', next)} />
      <div className="appearance-switches">{[['cardBorder','卡片边框与阴影'],['cardTint','卡片跟随主题色'],['waves','横幅波浪动画']].map(([key,label]) => <label key={key}><span>{label}</span><input type="checkbox" checked={value[key]} onChange={e => update(key,e.target.checked)} /><span className="switch-track" aria-hidden="true" /></label>)}</div>
      <div className="appearance-footer"><span>偏好仅保存在此浏览器</span><button onClick={() => onChange({ ...defaultAppearance })}>恢复默认</button></div>
    </section>}
  </div>;
}
