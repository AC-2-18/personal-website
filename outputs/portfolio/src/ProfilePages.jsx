import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { profile, strengths } from './content';
const CodeSlots = lazy(() => import('./CodeSlots'));
import './profile-pages.css';

export function ContactLinks() {
  const [notice, setNotice] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy(value) {
    try { await navigator.clipboard.writeText(value); setNotice('已复制'); }
    catch { setNotice('复制未成功，请选中地址手动复制'); }
    clearTimeout(timer.current); timer.current = setTimeout(() => setNotice(''), 2400);
  }
  return <div className="contact-details">
    <div className="contact-addresses">{profile.emails.map((email, i) => <div className="contact-row" key={email}><span className="contact-channel">{['GMAIL', '163 邮箱', 'QQ 邮箱'][i]}</span><a href={`mailto:${email}`}>{email}</a><button type="button" aria-label={`复制 ${email}`} onClick={() => copy(email)}>复制</button></div>)}</div>
    <a className="github-link" href={profile.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><span>AC-2-18 ↗</span></a>
    <p className="copy-status" role="status">{notice}</p>
  </div>;
}

export function ContactPage() {
  return <section className="panel main-card profile-page" aria-labelledby="contact-title">
    <a className="center-back" href="#home">← 返回主页</a><p className="eyebrow">LET'S CONNECT</p>
    <h1 id="contact-title">从一句「你好」开始。</h1><p className="profile-lead">欢迎交流设计、技术，或下一个有趣的想法。</p>
    <ContactLinks /><a className="soft-link" href="#private">查看详细联系方式 ↗</a>
  </section>;
}

function ageAt(birthday) {
  const [year, month, day] = birthday.split('-').map(Number);
  const today = new Date();
  return today.getFullYear() - year - (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day) ? 1 : 0);
}

export function AboutPage({ details, onLock }) {
  return <article className="panel main-card profile-page" aria-labelledby="profile-title">
    <div className="profile-page-top"><a className="center-back" href="#home">← 返回主页</a>{details && <button className="privacy-lock" onClick={onLock}>锁定资料 ↗</button>}</div>
    <p className="eyebrow">{details ? 'PERSONAL DETAILS' : 'ABOUT ME'}</p>
    <h1 id="profile-title">你好，我是{details ? details.name : profile.nickname}。</h1>
    <p className="profile-lead">{profile.intro}</p>
    <div className="profile-direction"><span>视觉设计</span><span>AI 设计</span><span>品牌设计</span><span>跨域工程</span></div>
    {details && <section className="private-facts" aria-labelledby="private-facts-title"><h2 id="private-facts-title">个人资料</h2><dl>{[
      ['完整姓名', details.name], ['出生日期', details.birthday], ['年龄', `${ageAt(details.birthday)} 岁`],
      ['学校', details.school], ['专业', details.major], ['学历 / 学年', details.education],
      ['电话', <a href={`tel:${details.phone}`}>{details.phone}</a>], ['QQ', details.qq], ['微信', `${details.wechat}（手机同号）`],
    ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>}
    <section className="profile-section"><h2>我在探索什么</h2><p>以设计表达想法，以技术把想法落地。关注视觉、动态与交互，也在嵌入式、机器视觉和机器人项目里，练习从观察到验证的完整过程。</p><div className="profile-strengths">{strengths.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    {details && <section className="profile-section"><h2>成长的印记</h2><ul><li>蓝桥杯嵌入式竞赛 · 全国三等奖</li><li>全国光电设计大赛 · 东南赛区二等奖</li><li>HarmonyOS 应用开发者基础认证</li></ul></section>}
    <section className="profile-section"><h2>和我联系</h2><ContactLinks /></section>
    {!details && <a className="soft-link" href="#private">详细资料 · 密码访问 ↗</a>}
  </article>;
}

const bytes = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
export function PrivateProfilePage() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const request = useRef(0), busy = useRef(false), controller = useRef(null), revealTimer = useRef(null);
  useEffect(() => () => { request.current++; controller.current?.abort(); clearTimeout(revealTimer.current); }, []);
  const lock = () => { request.current++; busy.current = false; controller.current?.abort(); clearTimeout(revealTimer.current); setDetails(null); setCode(''); setStatus('idle'); setMessage(''); setInputKey(k => k + 1); };
  async function unlock(value) {
    if (busy.current || value.length !== 6) return;
    if (!window.crypto?.subtle) { setMessage('请使用 HTTPS 或本地预览地址访问此页。'); return; }
    busy.current = true;
    const current = ++request.current;
    setStatus('checking'); setMessage('正在验证…');
    controller.current = new AbortController();
    let encrypted;
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}profile.sealed.json`, { signal: controller.current.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('load');
      encrypted = await response.json();
    } catch {
      if (current !== request.current) return;
      busy.current = false; setStatus('idle'); setMessage('资料暂时未能加载，请重试。'); return;
    }
    try {
      const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(value), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: bytes(encrypted.salt), iterations: encrypted.iterations, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      const clear = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(encrypted.iv) }, key, bytes(encrypted.ciphertext));
      const result = JSON.parse(new TextDecoder().decode(clear));
      if (current !== request.current) return;
      setStatus('success'); setMessage('验证成功'); setCode('');
      revealTimer.current = setTimeout(() => { if (current === request.current) { setDetails(result); busy.current = false; document.getElementById('center-pane')?.focus({ preventScroll: true }); } }, window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 650);
    } catch {
      if (current !== request.current) return;
      busy.current = false; setStatus('error'); setMessage('密码不正确，请重新输入。');
    }
  }
  if (details) return <AboutPage details={details} onLock={lock} />;
  return <section className="panel main-card profile-page private-gate" aria-labelledby="private-title">
    <a className="center-back" href="#about">← 返回关于我</a><p className="eyebrow">A LITTLE CLOSER</p>
    <h1 id="private-title">再多了解一点。</h1><p className="profile-lead">输入访问密码，查看我的详细资料与联系方式。</p>
    <form onSubmit={event => { event.preventDefault(); unlock(code); }}>
      <Suspense fallback={<p className="code-loading" role="status">正在准备输入框…</p>}><CodeSlots key={inputKey} length={6} mask value={code} status={status === 'checking' ? 'idle' : status} disabled={status === 'checking'}
        onChange={value => { setCode(value); if (status === 'error' && !value) setStatus('idle'); }} onComplete={unlock}
        ariaLabel="六位资料访问密码" slotSize={32} gap={5} accentColor="#afe3d2" slotColor="#243831" inkColor="#edf1ee" digitColor="#10231d" /></Suspense>
      <p className="privacy-message" role="status">{message || '仅限获知密码的访客。'}</p>
      <button type="submit" className="soft-link" disabled={status === 'checking' || status === 'success' || code.length !== 6}> {status === 'checking' ? '验证中…' : '查看详细资料'} ↗</button>
    </form>
  </section>;
}
