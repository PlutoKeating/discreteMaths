import React from 'react';

// 站点首页：每个章节子目录一张卡片。新增章节时在这里加一行，并在 vite.config.js 注册入口。
const CHAPTERS = [
  { href: '/Logic-and-Proof/', title: '逻辑与证明', sub: 'Ch1.1–1.6 · Propositional Logic · Predicates · Rules of Inference · Proofs', ready: true, desc: '期中试卷逐题精讲、全章公式总表、题型解法模板与失分复盘。' },
  { href: '/Counting/', title: '计数', sub: 'Counting', ready: false, desc: '整理中。' },
  { href: '/Relation/', title: '关系', sub: 'Relation', ready: false, desc: '整理中。' },
  { href: '/Graph/', title: '图论', sub: 'Graph', ready: false, desc: '整理中。' },
];

export default function Home() {
  return (
    <div className="gutter" style={{ maxWidth: '64rem', margin: '0 auto', paddingBlock: '3rem 4rem' }}>
      <header className="mb-8">
        <span className="tag">Discrete Mathematics · 2026–2027</span>
        <h1 className="txt-shadow" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.15, margin: '.6rem 0 .6rem' }}>离散数学<span style={{ color: 'var(--accent)' }}>学习站点</span></h1>
        <p className="song" style={{ color: 'var(--muted)', maxWidth: '40rem', margin: 0 }}>按章节整理的复习指南。每一章都从第一性原理讲起，列出全部公式家族、标准答案与通用解法。</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {CHAPTERS.map((c) => (
          <a key={c.href} href={c.ready ? c.href : undefined} aria-disabled={!c.ready}
            className={'card rim p-5 block ' + (c.ready ? 'inkcard' : '')}
            style={{ textDecoration: 'none', color: 'inherit', opacity: c.ready ? 1 : .6, cursor: c.ready ? 'pointer' : 'default' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className={'tag ' + (c.ready ? 'ok' : '')}>{c.ready ? '已上线' : '整理中'}</span>
            </div>
            <div className="head" style={{ fontSize: '1.5rem' }}>{c.title}</div>
            <div className="mono" style={{ fontSize: '.8rem', opacity: .8, margin: '.2rem 0 .6rem' }}>{c.sub}</div>
            <div style={{ fontSize: '.95rem' }}>{c.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
