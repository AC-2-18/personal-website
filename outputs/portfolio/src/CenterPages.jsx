import React from 'react';
import { profile, projects } from './content';
import './center-pages.css';

const asset = name => `${import.meta.env.BASE_URL}${name}`;
const categoryOf = item => item.id === 'form' ? '视觉探索' : '跨域工程';
export const projectHref = id => `#project/${id}`;
export const searchHref = query => `#search/${encodeURIComponent(query)}`;

export function ProjectPage({ id }) {
  const index = projects.findIndex(project => project.id === id);
  if (index < 0) return <section className="panel center-missing"><h1>还没有这个项目</h1><p>可以从导航中的「作品」选择已有项目。</p><a className="soft-link" href="#home">返回主页 ↗</a></section>;
  const project = projects[index];
  return <article className="panel project-page" aria-labelledby="project-page-title">
    <header className="project-page-heading">
      <a className="center-back" href="#home">← 返回主页</a>
      <p className="project-page-category">{categoryOf(project)} · {project.year === 'CONCEPT' ? '概念作品' : project.year}</p>
      <h1 id="project-page-title">{project.title}</h1>
      <p className="project-page-subtitle">{project.subtitle}</p>
      <div className="project-page-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </header>
    <figure className="project-page-figure"><img src={asset(project.image)} alt={project.imageLabel} /><figcaption>{project.imageLabel}</figcaption></figure>
    <div className="project-page-body"><p className="project-page-lead">{project.description}</p>
      {project.notes.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
      <a className="soft-link" href={`mailto:${profile.email}`}>聊聊这个项目 ↗</a>
    </div>
    <nav className="project-page-pagination" aria-label="相邻作品">
      {index > 0 ? <a href={projectHref(projects[index - 1].id)}><small>← 上一个作品</small><span>{projects[index - 1].title}</span></a> : <a href="#home"><small>← 回到</small><span>个人主页</span></a>}
      {index < projects.length - 1 && <a href={projectHref(projects[index + 1].id)}><small>下一个作品 →</small><span>{projects[index + 1].title}</span></a>}
    </nav>
  </article>;
}

export function SearchPage({ query }) {
  const term = query.trim().toLowerCase();
  const results = projects.filter(project => `${project.title} ${project.subtitle} ${project.description} ${project.tags.join(' ')} ${categoryOf(project)}`.toLowerCase().includes(term));
  return <section className="panel center-search" aria-labelledby="center-search-title">
    <a className="center-back" href="#home">← 返回主页</a>
    <h1 id="center-search-title">搜索结果</h1>
    <p className="search-count" role="status">{term ? `「${query}」` : '全部项目'} · {results.length} 个结果</p>
    {results.length ? <div className="search-result-list">{results.map(project => <a className="search-result" key={project.id} href={projectHref(project.id)}><span><small>{categoryOf(project)}</small><h2>{project.title}</h2><p>{project.subtitle}</p></span><span aria-hidden="true">↗</span></a>)}</div> : <div className="center-missing"><p>暂时没有找到相关项目，试试「机器人」或「视觉」。</p><a className="soft-link" href={searchHref('')}>查看全部项目</a></div>}
  </section>;
}
