import React, { useEffect, useRef, useState } from 'react';
import { profile, projects, strengths } from './content';
import PersonalPhotoCard from './PersonalPhotoCard';
import HomeBackground from './HomeBackground';
import ParticleText from './components/reactbits/ParticleText';
import NavDropdown from './NavDropdown';
import TargetCursor from './TargetCursor';
import HeroActions from './HeroActions';
import HeroTypography from './HeroTypography';
import { AboutPage, ContactPage, PrivateProfilePage } from './ProfilePages';
import useCenterRoute from './useCenterRoute';
import { ProjectPage, SearchPage, projectHref, searchHref } from './CenterPages';
import { appearanceKey, readAppearance } from './siteConfig';
import './home.css';
import './firefly-adaptation.css';
import './center-pages.css';
import SpotlightCard from './components/reactbits/SpotlightCard';
import useContentEntrance from './useContentEntrance';
import './refined-motion.css';

const categories = ['全部', '视觉探索', '跨域工程'];
const tags = [...new Set(projects.flatMap(item => item.tags))];
function Icon({ name, ...props }) {
  const paths = {
    home: 'm3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a8 8 0 0 1 16 0v3',
    mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
    search: 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6',
    sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 1v2M12 21v2M1 12h2M21 12h2M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2',
    moon: 'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    calendar: 'M3 5h18v16H3zM7 2v6M17 2v6M3 10h18',
    folder: 'M3 5h7l2 3h9v12H3z',
    tag: 'M3 3h8l10 10-8 8L3 11zM7 7h.01',
    clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
    menu: 'M4 6h16M4 12h16M4 18h16',
    close: 'm6 6 12 12M6 18 18 6',
    wave: 'M2 9c4-8 6 8 10 0s6 8 10 0M2 17c4-8 6 8 10 0s6 8 10 0',
    up: 'm6 14 6-6 6 6',
    copy: 'M8 8h13v13H8zM16 8V3H3v13h5',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.arrow} /></svg>;
}
const CardTitle = ({ children }) => <h2 className="card-title">{children}</h2>;

function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const y = month.getFullYear(), m = month.getMonth();
  const first = new Date(y, m, 1).getDay(), count = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((first + count) / 7) * 7 }, (_, i) => new Date(y, m, i - first + 1));
  return <section className="panel calendar-card" aria-label="日历">
    <div className="calendar-heading"><button className="icon-button" aria-label="上个月" onClick={() => setMonth(new Date(y, m - 1, 1))}>‹</button><h2 aria-live="polite">{y}年{m + 1}月</h2><button className="icon-button" aria-label="下个月" onClick={() => setMonth(new Date(y, m + 1, 1))}>›</button></div>
    <div className="calendar-grid">{[...'日一二三四五六'].map(day => <span className="weekday" key={day}>{day}</span>)}{cells.map(date => {
      const isToday = date.toDateString() === today.toDateString();
      return <span key={date.toISOString()} className={`${date.getMonth() !== m ? 'other-month' : ''} ${isToday ? 'today' : ''}`} aria-current={isToday ? 'date' : undefined}>{date.getDate()}</span>;
    })}</div>
    <button className="calendar-today text-link" onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}>回到本月</button>
  </section>;
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const route = useCenterRoute();
  const layoutRef = useRef(null);
  useContentEntrance(layoutRef, true, route.hash);
  useEffect(() => {
    setMenuOpen(false);
    if (route.kind === 'search') setQuery(route.query);
    const project = route.kind === 'project' ? projects.find(item => item.id === route.id) : null;
    document.title = `${project ? project.title : route.kind === 'search' ? '搜索结果' : route.kind === 'about' ? '关于我' : route.kind === 'private' ? '详细资料' : route.kind === 'contact' ? '联系我' : '超·AC~'} — 桂紫超的个人空间`;
  }, [route]);
  const [appearance] = useState(readAppearance);
  const theme = 'dark';
  const headerRef = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.wallpaper = appearance.wallpaper;
    document.documentElement.dataset.cardBorder = String(appearance.cardBorder);
    document.documentElement.dataset.cardTint = String(appearance.cardTint);
    document.documentElement.dataset.waves = String(appearance.waves);
    document.documentElement.style.setProperty('--hue', String(appearance.hue));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#14212b' : '#edf5f7');
    try { localStorage.setItem(appearanceKey, JSON.stringify(appearance)); } catch { /* Preferences work for this visit without storage. */ }
  }, [theme, appearance]);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const navClose = () => setMenuOpen(false);


  return <>
    <div id="hero" className="portfolio-shell center-pages-shell">
      <HomeBackground running interactive />
      <a href="#main" className="skip-link">跳转到主要内容</a>
      <header ref={headerRef} className="site-header plain-header">
        <a href="#hero" className="brand particle-brand" onClick={navClose} aria-label="超·AC~，返回首页">
          {<ParticleText text="超·AC~"
            fontSize={27} fontWeight={400} density={2} particleSize={0.9}
            color="#edf6f8" highlightColor="#a4dce8" scatter={16}
            gatherDuration={900} stagger={100} pointerRepel={7} repelRadius={26}
            idleDrift={0.12} glow={false} trigger="mount" />}
        </a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav" aria-label="主要导航">
          <a href="#home" onClick={navClose} aria-current={route.kind === 'home' ? 'page' : undefined}><Icon name="home" />主页</a>
          <NavDropdown label="作品" icon={<Icon name="grid" />}>{projects.map(item => <a key={item.id} href={projectHref(item.id)} aria-current={route.kind === 'project' && route.id === item.id ? 'page' : undefined} onClick={navClose}>{item.title}<span>{item.number}</span></a>)}</NavDropdown>
          <NavDropdown label="我的" icon={<Icon name="user" />}><a href="#about" onClick={navClose}>关于我 <Icon name="user" /></a><a href="#private" onClick={navClose}>详细资料 <Icon name="user" /></a><a href="#approach" onClick={navClose}>实践能力 <Icon name="arrow" /></a></NavDropdown>
          <a href="#contact" onClick={navClose}><Icon name="mail" />联系</a>
        </nav>
        <form className="nav-search" role="search" onSubmit={e => { e.preventDefault(); window.location.hash = searchHref(query.trim()); navClose(); }}><Icon name="search" /><input aria-label="搜索作品" placeholder="搜索作品…" value={query} onChange={e => setQuery(e.target.value)} /><button type="submit" className="search-submit" aria-label="查看搜索结果">↵</button></form>
        <button className="icon-button menu-toggle" aria-controls="main-nav" aria-expanded={menuOpen} aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </header>
      {<TargetCursor container={headerRef} targetSelector=".site-header a, .site-header button" size={26} cornerSize={8} thickness={1.5} padding={3} spinDuration={8} hoverDuration={0.28} parallaxOn={false} cursorColor="#e3eff3" cursorColorOnTarget="#a4dce8" blendMode="normal" showLabel={false} />}
      <section className="site-banner" aria-labelledby="hero-title">
        <div className="banner-copy">
          <HeroTypography running />
          <HeroActions />
        </div>
      </section>
      <main ref={layoutRef} className="site-layout" id="main" tabIndex={-1}>
        <aside className="left-sidebar" aria-label="个人资料与作品目录">
          <PersonalPhotoCard theme={theme} />
          <section className="panel side-card"><CardTitle>你好，欢迎靠岸</CardTitle><p>这里收集我的视觉探索与工程实践。保持好奇，也让每个想法慢慢成形。</p><a className="soft-link" href="#about">认识一下 <Icon name="arrow" /></a></section>
          <div className="sidebar-sticky"><section className="panel side-card"><CardTitle>作品</CardTitle><nav className="project-directory" aria-label="作品目录">{projects.map(item => <a key={item.id} href={projectHref(item.id)} aria-current={route.kind === 'project' && route.id === item.id ? 'page' : undefined}><small>{item.number}</small><span>{item.title}</span></a>)}</nav></section>
          <section className="panel side-card"><CardTitle>主题标签</CardTitle><div className="tag-cloud">{tags.map(value => <a key={value} href={searchHref(value)}>{value}</a>)}</div></section>
          <div className="sidebar-caption"><Icon name="wave" /><span>像海一样，保持开放。</span></div></div>
        </aside>
        <div className="content-column" id="center-pane" tabIndex={-1} aria-label={route.kind === 'project' ? '项目页面' : route.kind === 'search' ? '搜索结果页面' : route.kind === 'about' ? '关于我页面' : route.kind === 'private' ? '详细资料页面' : route.kind === 'contact' ? '联系页面' : '个人主页'}>
          {route.kind === 'project' ? <ProjectPage id={route.id} /> : route.kind === 'search' ? <SearchPage query={route.query} /> : route.kind === 'about' ? <AboutPage /> : route.kind === 'private' ? <PrivateProfilePage /> : route.kind === 'contact' ? <ContactPage /> : <>
          <SpotlightCard className="panel main-card editorial-spotlight" enabled spotlightColor="#9fdbe4" intensity={0.09} borderGlow={0.28} spotlightSize={260} proximity={24} smoothing={0.24} flare={false} aria-labelledby="home-about-title"><p className="eyebrow">A LITTLE ABOUT ME</p><h2 id="home-about-title">不止一种视角，<br />也不止一种可能。</h2><p className="about-intro">{profile.intro}</p><a className="soft-link" href="#about">关于我 <Icon name="arrow" /></a></SpotlightCard>
          <SpotlightCard id="approach" enabled spotlightColor="#9fdbe4" intensity={0.08} borderGlow={0.24} spotlightSize={240} proximity={24} smoothing={0.24} flare={false} className="panel main-card editorial-spotlight" aria-labelledby="approach-title"><div className="main-card-heading"><div><p className="eyebrow">HOW I CREATE</p><h2 id="approach-title" tabIndex={-1}>好想法，也能落地。</h2></div><Icon name="wave" /></div><div className="strength-grid">{strengths.map(item => <article key={item.title}><span className="strength-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></SpotlightCard>
          <ContactPage />
          </>}
        </div>
        <aside className="right-sidebar" aria-label="日历与站点信息">
          <Calendar />
          <section className="panel side-card"><CardTitle>这里有什么</CardTitle><dl className="site-stats"><div><dt><Icon name="grid" />作品与项目</dt><dd>{projects.length}</dd></div><div><dt><Icon name="folder" />探索方向</dt><dd>{categories.length - 1}</dd></div><div><dt><Icon name="tag" />主题标签</dt><dd>{tags.length}</dd></div><div><dt><Icon name="user" />实践能力</dt><dd>{strengths.length}</dd></div></dl></section>
          <section className="panel side-card"><CardTitle>常用工具</CardTitle><div className="tool-list">{['STM32', 'OpenCV', 'SolidWorks', 'MATLAB', 'Git', 'Linux'].map(tool => <span key={tool}>{tool}</span>)}</div><p className="small-note">连接视觉、结构与代码。</p></section>
          <section className="panel side-card site-note"><CardTitle>关于这里</CardTitle><p>一个关于设计与技术的个人空间。工程内容来自真实经历；概念作品和示意图均已标注。</p><a className="text-link" href="#contact">保持联系 <Icon name="arrow" /></a></section>
        </aside>
      </main>
      <footer className="site-footer"><a href="#hero"><Icon name="wave" /><span>GUI ZICHAO</span></a><p>设计与技术之间，保持探索。</p><span>© {new Date().getFullYear()} 桂紫超</span></footer>
      <div className="floating-tools"><a className="icon-button" href="#hero" aria-label="回到顶部"><Icon name="up" /></a></div>
    </div>
  </>;
}
