import React from 'react';

// 站点首页：每一章围绕对应的真实考卷展开渐进式追问（顺序对齐课程推进：Logic → Relation → Counting → Graph）。
const CHAPTERS = [
  {
    num: '01',
    href: '/Logic-and-Proof/',
    title: '逻辑与证明：一句话什么时候算真，一段话凭什么推得出来？',
    examScope: '以 Midterm Test 01（60 分）为起点 · 覆盖 Ch1.1–1.6',
    ready: true,
    desc: '从一句“考上就请吃饭”何时算违约出发，经过双人先后手出牌游戏与三段校园线索追踪，带你不用死背规则名也能独立写出逻辑等价变形与英文证明。',
    cta: '从 Test 01 开始 ↗',
  },
  {
    num: '02',
    href: '/Relation/',
    title: '集合、函数与关系：怎么把对象配成对、连成网、分好类、排出上下级？',
    examScope: '以 Midterm Test 02（76 分）为起点 · 覆盖 Ch2.1–2.3, Ch9.1–9.6',
    ready: true,
    desc: '从给一台不可逆的函数机器动手术出发，顺着一张 0-1 方格表算出两步中转与传递闭包，再把整除关系脱成干净的 Hasse 层级图与格。',
    cta: '从 Test 02 开始 ↗',
  },
  {
    num: '03',
    href: '/Counting/',
    title: '计数与递推：不把所有方案一个个列出来，怎么算准到底有多少种？',
    examScope: '覆盖 Ch6 & Ch8 · Counting & Recurrence Relations',
    ready: false,
    desc: '从排列组合、鸽巢原理到递推关系与生成函数。正在按考卷主线整理中。',
    cta: '整理中',
  },
  {
    num: '04',
    href: '/Graph/',
    title: '图论：只关心谁和谁相连时，怎样判断连通、同构、一笔画与最少染色？',
    examScope: '覆盖 Ch10 · Graphs, Connectivity, Euler/Hamilton, Planar & Coloring',
    ready: false,
    desc: '从度数握手定理、图同构不变量到欧拉/哈密顿通路、平面图欧拉公式与着色。正在按考卷主线整理中。',
    cta: '整理中',
  },
];

export default function Home() {
  return (
    <div className="home-shell">
      <header>
        <span className="home-eyebrow">Discrete Mathematics · 2026–2027 学习空间</span>
        <h1 className="home-title">
          不背名词清单，<br />
          从一张真实考卷追问到底。
        </h1>
        <p className="home-lead">
          离散数学难读，往往是因为还没看清遇到了什么麻烦，就先被塞满一页定义和公式表。在这里，每一门课都把你真正要面对的那张纯英文考卷摊在桌上：从零基础能懂的小问题出发，需要什么概念才长出什么概念，直到你能用英文把整张卷子稳稳写满。
        </p>
      </header>

      <div className="home-grid">
        {CHAPTERS.map((c) => (
          <a
            key={c.href}
            href={c.ready ? c.href : undefined}
            aria-disabled={!c.ready}
            className={'course-card ' + (c.ready ? 'ready' : 'pending')}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="course-card-num">课程 {c.num}</span>
                <span className={'tag ' + (c.ready ? 'ok' : '')}>{c.ready ? '已开放' : '整理中'}</span>
              </div>
              <h2 className="course-card-question">{c.title}</h2>
              <p className="course-card-desc">{c.desc}</p>
            </div>
            <div className="course-card-foot">
              <span className="mono" style={{ fontSize: '.76rem', color: 'var(--muted)' }}>{c.examScope}</span>
              <span className="course-card-cta">{c.cta}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
