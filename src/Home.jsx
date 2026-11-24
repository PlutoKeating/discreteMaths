import React from 'react';

// 站点首页：每个章节子目录一张卡片。顺序对齐课程推进（Logic → Relation → Counting → Graph）。
const CHAPTERS = [
  {
    href: '/Logic-and-Proof/',
    title: '逻辑与证明',
    sub: 'Ch1.1–1.6 · Propositional Logic · Predicates · Rules of Inference · Proofs',
    ready: true,
    desc: '期中试卷 Test 01 逐题精讲、全章公式总表、题型解法模板与失分复盘。',
  },
  {
    href: '/Relation/',
    title: '集合、函数与关系',
    sub: 'Ch2.1–2.3 · Ch9.1–9.3 · Ch9.5–9.6 · Sets · Functions · Relations · Equivalence · Posets',
    ready: true,
    desc: '集合与函数双射、关系矩阵与 Warshall 闭包、等价划分、Hasse 图与格（Lattice）体系精讲，内置 3 座交互图解沙盘与 Test 02 逐题解析。',
  },
  {
    href: '/Counting/',
    title: '计数与递推',
    sub: 'Ch6 & Ch8 · Counting · Permutations · Combinations · Recurrence Relations',
    ready: false,
    desc: '整理中。',
  },
  {
    href: '/Graph/',
    title: '图论',
    sub: 'Ch10 · Graphs · Isomorphism · Connectivity · Euler/Hamilton · Planar & Coloring',
    ready: false,
    desc: '整理中。',
  },
];

export default function Home() {
  return (
    <div className="gutter" style={{ maxWidth: '64rem', margin: '0 auto', paddingBlock: '3rem 4rem' }}>
      <header className="mb-8">
        <span className="tag">Discrete Mathematics · 2026–2027</span>
        <h1 className="txt-shadow" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.15, margin: '.6rem 0 .6rem' }}>
          离散数学<span style={{ color: 'var(--accent)' }}>学习站点</span>
        </h1>
        <p className="song" style={{ color: 'var(--muted)', maxWidth: '42rem', margin: 0 }}>
          按章节整理的复习指南。每一章都从第一性原理讲起，配交互图解、全部公式家族、英文真题双语对照与标准答题模板。
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {CHAPTERS.map((c) => (
          <a
            key={c.href}
            href={c.ready ? c.href : undefined}
            aria-disabled={!c.ready}
            className={'card rim p-5 block ' + (c.ready ? 'inkcard' : '')}
            style={{
              textDecoration: 'none',
              color: c.ready ? 'var(--ink-fg)' : 'inherit',
              opacity: c.ready ? 1 : 0.6,
              cursor: c.ready ? 'pointer' : 'default',
            }}
          >
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
