import React, { useState } from 'react';
import Markdown from '../../src/components/Markdown.jsx';
import { ChapterNav, SectionHead, QCard, useHashTab } from '../../src/components/ChapterUi.jsx';
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
import mdExam from '../content/exam.md?raw';
import mdPaper from '../Midterm-Test-01.md?raw';
import GlossaryPage from './GlossaryPage.jsx';
import { lookupTerm, ALL_PATTERNS } from '../content/glossary.js';

const GLOSSARY = { lookup: lookupTerm, patterns: ALL_PATTERNS };

const TABS = [
  { id: 'overview', label: '0 · 第一性原理总纲' },
  { id: 'exam', label: '1 · 试卷原题与翻译' },
  { id: 'formulas', label: '2 · 全章公式总表' },
  { id: 'questions', label: '3 · 逐题精讲' },
  { id: 'templates', label: '4 · 题型解法模板' },
  { id: 'review', label: '5 · 失分复盘与自测' },
  { id: 'glossary', label: '6 · 英文术语表' },
];

function Hero() {
  return (
    <section className="hero-grid py-8 md:py-12">
      <div>
        <span className="tag">Discrete Mathematics · Midterm Test 01 · 60 marks</span>
        <h1 className="txt-shadow" style={{ fontSize: 'clamp(1.9rem,4.5vw,3rem)', lineHeight: 1.2, margin: '.6rem 0 .8rem' }}>
          逻辑与证明<br /><span style={{ color: 'var(--accent)' }}>期中试卷逐题复习指南</span>
        </h1>
        <p className="song" style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '38rem' }}>
          覆盖 Ch1.1–1.6：命题逻辑与等价、谓词与量词、推理规则与证明。考试为纯英文卷，正文中带虚线下划线的英文术语可以 <strong className="kw">点击查看中英对照</strong>。每道题给出 <strong className="kw">完整公式家族</strong>、<strong className="kw">为什么这么做</strong>、<strong className="kw">通用解法模板</strong>，并从真值这一个底层事实把整章串起来。
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
      <div className="card p-5 md:p-8"><Markdown glossary={GLOSSARY} source={mdOverview} /></div>
      <ImplicationFig />
    </>
  );
}

function Formulas() {
  return (
    <>
      <SectionHead eyebrow="第 2 部分" title="全章公式总表" desc="考前必背；每一张都标了 slides 出处。期末 logic 部分的任何一题都只会用到这里的公式。" />
      <div className="card p-5 md:p-8"><Markdown glossary={GLOSSARY} source={mdFormulas} /></div>
      <QuantPairFig />
      <ArrowRulesFig />
    </>
  );
}

function Questions() {
  return (
    <>
      <SectionHead eyebrow="第 3 部分" title="逐题精讲" desc="每题四件事：知识点与同类公式、为什么这么做、标准答案、通用解法。" />
      <QCard no="1" marks="24" title="谓词翻译 + 形式推理" verdicts={[{ ok: true, t: 'i) 可推' }, { ok: false, t: 'ii) 不可推' }, { ok: false, t: 'iii) 不可推' }]}>
        <Markdown glossary={GLOSSARY} source={mdQ1} />
        <ArrowRulesFig />
      </QCard>
      <QCard no="2" marks="15" title="不用真值表判断等价" verdicts={[{ ok: true, t: 'a) 等价' }, { ok: true, t: 'b) 等价' }, { ok: true, t: 'c) 等价' }]}>
        <Markdown glossary={GLOSSARY} source={mdQ2} />
      </QCard>
      <QCard no="4" marks="8" title="嵌套量词真值判断" verdicts={[{ ok: false, t: 'a) 假' }, { ok: false, t: 'b) 假' }, { ok: true, t: 'c) 真' }, { ok: true, t: 'd) 真' }]}>
        <Markdown glossary={GLOSSARY} source={mdQ4} />
        <GameFig />
      </QCard>
      <QCard no="5" marks="5" title="n² 偶 ⇒ n 偶（逆否证明）">
        <Markdown glossary={GLOSSARY} source={mdQ5} />
      </QCard>
      <QCard no="6" marks="8" title="带余除法的存在唯一性">
        <UniqueFig />
        <Markdown glossary={GLOSSARY} source={mdQ6} />
      </QCard>
    </>
  );
}

function Exam() {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <>
      <SectionHead eyebrow="第 1 部分" title="试卷原题与逐句翻译" desc="考试是纯英文卷。这里原文、译文并排，英文术语可点击；最下方附原始 Markdown 全文。" />
      <div className="card p-5 md:p-8"><Markdown glossary={GLOSSARY} source={mdExam} /></div>
      <div className="card p-5 md:p-8 mt-6">
        <button type="button" className="chip" onClick={() => setShowRaw((v) => !v)} aria-expanded={showRaw}>
          {showRaw ? '收起' : '展开'}原始 Markdown 全文（Midterm-Test-01.md）
        </button>
        {showRaw && (
          <div className="mt-4">
            <Markdown glossary={GLOSSARY} source={mdPaper} />
            <details className="mt-4"><summary className="head" style={{ cursor: 'pointer' }}>查看 Markdown 源码</summary><pre className="mt-2" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: 'var(--ink)', color: 'var(--ink-fg)', padding: '1rem', borderRadius: 14, fontSize: '.8rem' }}>{mdPaper}</pre></details>
          </div>
        )}
      </div>
    </>
  );
}

function Glossary() {
  return (
    <>
      <SectionHead eyebrow="第 6 部分" title="英文术语表" desc="试卷指令词、逻辑术语、证明用语与题干情景词的中英对照。" />
      <GlossaryPage />
    </>
  );
}

function Templates() {
  return (
    <>
      <SectionHead eyebrow="第 4 部分" title="题型通用解法模板" desc="期末 logic 部分一定会从这七类里出题。每个模板都是可以照着写的步骤。" />
      <div className="card p-5 md:p-8"><Markdown glossary={GLOSSARY} source={mdTemplates} /></div>
    </>
  );
}

function Review() {
  return (
    <>
      <SectionHead eyebrow="第 5 部分" title="卷面失分复盘与期末自测" desc="把这次丢的 10 分变成期末的保底分。" />
      <div className="card p-5 md:p-8"><Markdown glossary={GLOSSARY} source={mdReview} /></div>
    </>
  );
}

export default function App() {
  const cur = useHashTab(TABS, 'overview');
  return (
    <div className="gutter" style={{ maxWidth: '72rem', margin: '0 auto', paddingBlock: '0 4rem' }}>
      <Hero />
      <ChapterNav tabs={TABS} cur={cur} />
      <main key={cur}>
        {cur === 'overview' && <Overview />}
        {cur === 'exam' && <Exam />}
        {cur === 'formulas' && <Formulas />}
        {cur === 'questions' && <Questions />}
        {cur === 'templates' && <Templates />}
        {cur === 'review' && <Review />}
        {cur === 'glossary' && <Glossary />}
      </main>
      <footer className="mt-12 song" style={{ color: 'var(--muted)', fontSize: '.85rem', textAlign: 'center' }}>
        依据 Dr Patrick Chan 的 Ch1.1–1.6 slides 与 Tutorial 01–03 答案整理 · 公式由 KaTeX 渲染 · 流程图由 Mermaid 渲染
      </footer>
    </div>
  );
}
