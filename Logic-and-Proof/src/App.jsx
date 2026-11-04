import React, { useEffect, useState } from 'react';
import Markdown from '../../src/components/Markdown.jsx';
import { HeroFig, ImplicationFig, ArrowRulesFig, GameFig, QuantPairFig, UniqueFig } from './figures.jsx';

import mdOverview from '../content/overview.md?raw';
import mdFormulas from '../content/formulas.md?raw';
import mdQ1 from '../content/q1.md?raw';
import mdQ2 from '../content/q2.md?raw';
import mdQ4 from '../content/q4.md?raw';
import mdQ5 from '../content/q5.md?raw';
import mdQ6 from '../content/q6.md?raw';
import mdTemplates from '../content/templates.md?raw';
import mdReview from '../content/review.md?raw';

const TABS = [
  { id: 'overview', label: '0 · 第一性原理总纲' },
  { id: 'formulas', label: '1 · 全章公式总表' },
  { id: 'questions', label: '2 · 逐题精讲' },
  { id: 'templates', label: '3 · 题型解法模板' },
  { id: 'review', label: '4 · 失分复盘与自测' },
];
const readHash = () => {
  const h = location.hash.replace('#', '');
  return TABS.some((t) => t.id === h) ? h : 'overview';
};

function Hero() {
  return (
    <section className="hero-grid py-8 md:py-12">
      <div>
        <span className="tag">Discrete Mathematics · Midterm Test 01 · 60 marks</span>
        <h1 className="txt-shadow" style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', lineHeight: 1.2, margin: '.6rem 0 .8rem' }}>
          逻辑与证明<br /><span style={{ color: 'var(--accent)' }}>期中试卷逐题复习指南</span>
        </h1>
        <p className="song" style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '38rem' }}>
          覆盖 Ch1.1–1.6：命题逻辑与等价、谓词与量词、推理规则与证明。每道题给出 <strong className="kw">完整公式家族</strong>、<strong className="kw">为什么这么做</strong>、<strong className="kw">通用解法模板</strong>，并从真值这一个底层事实把整章串起来。
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {TABS.map((t) => <a key={t.id} href={'#' + t.id} className="chip">{t.label}</a>)}
        </div>
        <p className="mt-4" style={{ fontSize: '.85rem' }}><a href="/" style={{ color: 'var(--accent)' }}>← 返回离散数学学习站点首页</a></p>
      </div>
      <div className="card ink rim p-4 md:p-6" style={{ borderRadius: 24 }}>
        <HeroFig />
        <div className="d-text" style={{ fontSize: '.85rem', opacity: .85, textAlign: 'center' }}>总纲 0.1–0.4：所有定律都只是对 T / F 的计算</div>
      </div>
    </section>
  );
}

function Nav({ cur }) {
  return (
    <div className="nav gutter" style={{ marginLeft: 'calc(-1 * max(16px,env(safe-area-inset-left,0px)))', marginRight: 'calc(-1 * max(16px,env(safe-area-inset-right,0px)))' }}>
      <div className="chips" role="tablist" aria-label="章节">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={cur === t.id} className={'chip' + (cur === t.id ? ' on' : '')}
            onClick={() => { location.hash = t.id; }}>{t.label}</button>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc }) {
  return (
    <header className="mt-8 mb-5">
      <span className="tag red">{eyebrow}</span>
      <h2 className="txt-shadow" style={{ fontSize: 'clamp(1.5rem,3.4vw,2.2rem)', margin: '.4rem 0 .3rem' }}>{title}</h2>
      {desc && <p className="song" style={{ color: 'var(--muted)', maxWidth: '44rem', margin: 0 }}>{desc}</p>}
    </header>
  );
}

function QCard({ no, marks, title, verdicts, children }) {
  return (
    <article className="cut mt-8">
      <div className="cut-in p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="tag">第 {no} 题 · {marks} 分</span>
          {verdicts && verdicts.map((v, i) => <span key={i} className={'tag ' + (v.ok ? 'ok' : 'bad')}>{v.t}</span>)}
        </div>
        <h3 className="txt-shadow" style={{ fontSize: 'clamp(1.25rem,2.6vw,1.6rem)', margin: '0 0 1rem', color: 'var(--accent)' }}>{title}</h3>
        {children}
      </div>
    </article>
  );
}

function Overview() {
  const cards = [
    ['等价 P ≡ Q', '任何赋值下真值相同', '证：等价律变形　否：一组反例赋值'],
    ['推理有效', '前提全真 ⇒ 结论必真', '证：推理规则链　否：前提真结论假的场景'],
    ['命题为真', '在给定 domain 下算出 T', '∀：全部说明 / 一个反例　∃：一个例子 / 全部排除'],
  ];
  return (
    <>
      <SectionHead eyebrow="第 0 部分" title="第一性原理总纲" desc="先读这一页，后面全部都是它的展开。" />
      <div className="three mb-6">
        {cards.map(([a, b, c], i) => (
          <div key={a} className={'card rim p-4 ' + (i === 1 ? 'inkcard' : '')}>
            <div className="head" style={{ fontSize: '1.15rem' }}><strong className="kw">{a}</strong></div>
            <div className="song" style={{ margin: '.3rem 0' }}>{b}</div>
            <div style={{ fontSize: '.9rem', opacity: .85 }}>{c}</div>
          </div>
        ))}
      </div>
      <div className="card p-5 md:p-8"><Markdown source={mdOverview} /></div>
      <ImplicationFig />
    </>
  );
}

function Formulas() {
  return (
    <>
      <SectionHead eyebrow="第 1 部分" title="全章公式总表" desc="考前必背；每一张都标了 slides 出处。期末 logic 部分的任何一题都只会用到这里的公式。" />
      <div className="card p-5 md:p-8"><Markdown source={mdFormulas} /></div>
      <QuantPairFig />
      <ArrowRulesFig />
    </>
  );
}

function Questions() {
  return (
    <>
      <SectionHead eyebrow="第 2 部分" title="逐题精讲" desc="每题四件事：知识点与同类公式、为什么这么做、标准答案、通用解法。" />
      <QCard no="1" marks="24" title="谓词翻译 + 形式推理" verdicts={[{ ok: true, t: 'i) 可推' }, { ok: false, t: 'ii) 不可推' }, { ok: false, t: 'iii) 不可推' }]}>
        <Markdown source={mdQ1} />
        <ArrowRulesFig />
      </QCard>
      <QCard no="2" marks="15" title="不用真值表判断等价" verdicts={[{ ok: true, t: 'a) 等价' }, { ok: true, t: 'b) 等价' }, { ok: true, t: 'c) 等价' }]}>
        <Markdown source={mdQ2} />
      </QCard>
      <QCard no="4" marks="8" title="嵌套量词真值判断" verdicts={[{ ok: false, t: 'a) 假' }, { ok: false, t: 'b) 假' }, { ok: true, t: 'c) 真' }, { ok: true, t: 'd) 真' }]}>
        <Markdown source={mdQ4} />
        <GameFig />
      </QCard>
      <QCard no="5" marks="5" title="n² 偶 ⇒ n 偶（逆否证明）">
        <Markdown source={mdQ5} />
      </QCard>
      <QCard no="6" marks="8" title="带余除法的存在唯一性">
        <UniqueFig />
        <Markdown source={mdQ6} />
      </QCard>
    </>
  );
}

function Templates() {
  return (
    <>
      <SectionHead eyebrow="第 3 部分" title="题型通用解法模板" desc="期末 logic 部分一定会从这七类里出题。每个模板都是可以照着写的步骤。" />
      <div className="card p-5 md:p-8"><Markdown source={mdTemplates} /></div>
    </>
  );
}

function Review() {
  return (
    <>
      <SectionHead eyebrow="第 4 部分" title="卷面失分复盘与期末自测" desc="把这次丢的 10 分变成期末的保底分。" />
      <div className="card p-5 md:p-8"><Markdown source={mdReview} /></div>
    </>
  );
}

export default function App() {
  const [cur, setCur] = useState(readHash());
  useEffect(() => {
    const on = () => { setCur(readHash()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return (
    <div className="gutter" style={{ maxWidth: '72rem', margin: '0 auto', paddingBlock: '0 4rem' }}>
      <Hero />
      <Nav cur={cur} />
      <main key={cur}>
        {cur === 'overview' && <Overview />}
        {cur === 'formulas' && <Formulas />}
        {cur === 'questions' && <Questions />}
        {cur === 'templates' && <Templates />}
        {cur === 'review' && <Review />}
      </main>
      <footer className="mt-12 song" style={{ color: 'var(--muted)', fontSize: '.85rem', textAlign: 'center' }}>
        依据 Dr Patrick Chan 的 Ch1.1–1.6 slides 与 Tutorial 01–03 答案整理 · 公式由 KaTeX 渲染 · 流程图由 Mermaid 渲染
      </footer>
    </div>
  );
}
