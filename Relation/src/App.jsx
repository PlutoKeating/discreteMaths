import React, { useState } from 'react';
import Markdown from '../../src/components/Markdown.jsx';
import { ChapterNav, SectionHead, QCard, useHashTab } from '../../src/components/ChapterUi.jsx';
import GlossaryView from '../../src/components/GlossaryView.jsx';
import { HeroFig, SetVennFig, CompositionOrderFig, EquivPartitionFig } from './figures.jsx';
import { FunctionMapperLab, RelationMatrixLab, HassePosetLab } from './sandboxes.jsx';

import mdOverview from '../content/overview.md?raw';
import mdSetsFn from '../content/sets-functions.md?raw';
import mdRelations from '../content/relations.md?raw';
import mdEquivPoset from '../content/equiv-poset.md?raw';
import mdExam from '../content/exam.md?raw';
import mdQ1 from '../content/q1.md?raw';
import mdQ2 from '../content/q2.md?raw';
import mdQ3 from '../content/q3.md?raw';
import mdQ4 from '../content/q4.md?raw';
import mdQ5 from '../content/q5.md?raw';
import mdTemplatesReview from '../content/templates-review.md?raw';
import mdPaper from '../Midterm-Test-02.md?raw';
import { GLOSSARY as GLOSSARY_LIST, CATS, lookupTerm, ALL_PATTERNS } from '../content/glossary.js';

const GLOSSARY = { lookup: lookupTerm, patterns: ALL_PATTERNS };

const TABS = [
  { id: 'overview', label: '0 · 第一性原理总纲' },
  { id: 'sets-functions', label: '1 · 集合与函数 (Ch2.1–2.3)' },
  { id: 'relations', label: '2 · 关系性质与闭包 (Ch9.1–9.3)' },
  { id: 'equiv-poset', label: '3 · 等价与偏序及格 (Ch9.5–9.6)' },
  { id: 'exam', label: '4 · Test 02 原题与翻译' },
  { id: 'questions', label: '5 · Test 02 逐题精讲' },
  { id: 'templates-review', label: '6 · 题型模板与易错自测' },
  { id: 'glossary', label: '7 · 英文术语表' },
];

function Hero() {
  return (
    <section className="hero-grid py-8 md:py-12">
      <div>
        <span className="tag">Discrete Mathematics · Ch2.1–2.3 & Ch9.1–9.6 · Midterm Test 02 (76 marks)</span>
        <h1 className="txt-shadow" style={{ fontSize: 'clamp(1.85rem,4.4vw,2.95rem)', lineHeight: 1.2, margin: '.6rem 0 .8rem' }}>
          集合、函数与二元关系<br />
          <span style={{ color: 'var(--accent)' }}>体系精讲 · 交互沙盘 · 真题解析</span>
        </h1>
        <p className="song" style={{ fontSize: '1.03rem', color: 'var(--muted)', maxWidth: '40rem' }}>
          完整覆盖 Dr. Patrick Chan 课程 <strong className="kw">Sets & Functions（Ch2.1–2.3）</strong>、<strong className="kw">Relations & Closures（Ch9.1–9.3）</strong>、<strong className="kw">Equivalence, Posets & Lattices（Ch9.5–9.6）</strong> 及配套 Tutorial 04–06 与 Test 02 真题。内置 3 座可动手推演的 <strong className="kw">0-1 矩阵 / Warshall / Hasse 图交互沙盘</strong>，英文术语点击即查。
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {TABS.map((t) => (
            <a key={t.id} href={'#' + t.id} className="chip">
              {t.label}
            </a>
          ))}
        </div>
        <p className="mt-4" style={{ fontSize: '.85rem' }}>
          <a href="/" style={{ color: 'var(--accent)' }}>← 返回离散数学学习站点首页</a>
          <span style={{ margin: '0 .6rem', opacity: .45 }}>|</span>
          <a href="/Logic-and-Proof/" style={{ color: 'var(--accent)' }}>上一章：逻辑与证明 (Ch1.1–1.6) →</a>
        </p>
      </div>
      <div className="card ink rim p-4 md:p-6" style={{ borderRadius: 24 }}>
        <HeroFig />
        <div className="d-text" style={{ fontSize: '.85rem', opacity: .88, textAlign: 'center' }}>
          总纲主线：集合 x∈A → 有序对 (a,b)∈A×B → 函数 / 等价划分 / 偏序格
        </div>
      </div>
    </section>
  );
}

function Overview() {
  const cards = [
    ['函数 Function', '每个输入恰有 1 个输出', '双射 = 单射 (f(a)=f(b)⇒a=b) + 满射 (Range=Codomain) ⇔ 可逆'],
    ['等价关系 ∼', '自反 + 对称 + 传递', '抽象“相等 =” · 等价类 [a]_R 把集合切分为不重不漏的划分'],
    ['偏序与格 (A, ≼)', '自反 + 反对称 + 传递', '脱去自环与传递边画 Hasse 图 · 每对元素均有唯一 LUB/GLB 即为格'],
  ];
  return (
    <>
      <SectionHead
        eyebrow="第 0 部分"
        title="第一性原理总纲与章节导航"
        desc="把第 2 章与第 9 章还原回第 1 章的谓词真值集，所有概念只剩一条演化树。"
      />
      <div className="three mb-6">
        {cards.map(([a, b, c], i) => (
          <div key={a} className={'card rim p-4 ' + (i === 1 ? 'inkcard' : '')}>
            <div className="head" style={{ fontSize: '1.15rem' }}>
              <strong className="kw">{a}</strong>
            </div>
            <div className="song" style={{ margin: '.3rem 0' }}>{b}</div>
            <div style={{ fontSize: '.9rem', opacity: .88 }}>{c}</div>
          </div>
        ))}
      </div>
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdOverview} />
      </div>
    </>
  );
}

function SetsFunctionsTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 1 部分 · Ch2.1–2.3 & Tutorial 04"
        title="集合与函数（Sets and Functions）"
        desc="涵盖空集套壳辨析、幂集与笛卡尔积、集合恒等式证明、容斥与位串表示、函数单/满/双射与限制域造双射。"
      />
      <SetVennFig />
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdSetsFn} />
      </div>
      <FunctionMapperLab defaultMode="restrict" />
    </>
  );
}

function RelationsTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 2 部分 · Ch9.1–9.3 (Slides 5.1–5.4) & Tutorial 05"
        title="二元关系、性质、矩阵运算与 Warshall 闭包"
        desc="涵盖有向图与 0-1 矩阵、6 大性质判别与计数、Slide 45 复合矩阵顺序排雷、三种闭包及 Warshall 十字交叉算法。"
      />
      <CompositionOrderFig />
      <RelationMatrixLab />
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdRelations} />
      </div>
    </>
  );
}

function EquivPosetTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 3 部分 · Ch9.5–9.6 (Slides 5.5–5.6) & Tutorial 06"
        title="等价关系、划分、偏序集、Hasse 图与格（Lattice）"
        desc="涵盖同余与等价类划分、偏序/对偶/全序/字典序/良序、Hasse 图画法、极值与上下界四组辨析及格的判定。"
      />
      <EquivPartitionFig />
      <HassePosetLab />
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdEquivPoset} />
      </div>
    </>
  );
}

function ExamTab() {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <>
      <SectionHead
        eyebrow="第 4 部分 · Midterm Test 02 (76 marks)"
        title="试卷英文原题与逐句中文翻译"
        desc="纯英文真题并排对照、审题得分点拆解；底部可展开 Midterm-Test-02.md 原件及手写附注。"
      />
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdExam} />
      </div>
      <div className="card p-5 md:p-8 mt-6">
        <button type="button" className="chip" onClick={() => setShowRaw((v) => !v)} aria-expanded={showRaw}>
          {showRaw ? '收起' : '展开'}原始 Markdown 全文（Midterm-Test-02.md · 含手写附注）
        </button>
        {showRaw && (
          <div className="mt-4">
            <Markdown glossary={GLOSSARY} source={mdPaper} />
            <details className="mt-4">
              <summary className="head" style={{ cursor: 'pointer' }}>查看 Markdown 源码</summary>
              <pre
                className="mt-2"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  background: 'var(--ink)',
                  color: 'var(--ink-fg)',
                  padding: '1rem',
                  borderRadius: 14,
                  fontSize: '.8rem',
                }}
              >
                {mdPaper}
              </pre>
            </details>
          </div>
        )}
      </div>
    </>
  );
}

function QuestionsTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 5 部分 · Step-by-Step Solutions"
        title="Midterm Test 02 逐题精讲与满分英文示范"
        desc="每道题给出底层原理、易错陷阱、考场可直接默写的英文标准答案与交互沙盘联动验证。"
      />
      <QCard
        no="1"
        marks="12"
        title="函数复合 g∘f、和函数 f+g、值域与限制定义域构造双射"
        verdicts={[
          { ok: true, t: 'a) 3x⁴+30x²+80' },
          { ok: true, t: 'c) [0, +∞)' },
          { ok: true, t: 'd) [0,+∞)→[0,+∞) 或 (-∞,0]→[0,+∞)' },
        ]}
      >
        <Markdown glossary={GLOSSARY} source={mdQ1} />
        <FunctionMapperLab defaultMode="restrict" />
      </QCard>

      <QCard
        no="2"
        marks="24"
        title="0-1 关系矩阵六连算：逆、补、异或、复合 R₂∘R₁、传递闭包与对称闭包"
        verdicts={[
          { ok: true, t: 'd) 左放 M_R₁ 右放 M_R₂' },
          { ok: true, t: 'e) t(R₁) 全 1 矩阵' },
          { ok: true, t: 'f) s(R₂) 中心格仍为 0' },
        ]}
      >
        <Markdown glossary={GLOSSARY} source={mdQ2} />
        <RelationMatrixLab />
      </QCard>

      <QCard
        no="3"
        marks="12"
        title="三道典型关系的 8 项性质全判定（显式集合 · 相同朋友圈 · 整数域 x²≥y）"
        verdicts={[
          { ok: true, t: 'a) 仅 irreflexive' },
          { ok: true, t: 'b) 等价关系 ✓' },
          { ok: true, t: 'c) 整数域上 reflexive ✓' },
        ]}
      >
        <Markdown glossary={GLOSSARY} source={mdQ3} />
      </QCard>

      <QCard
        no="4"
        marks="8"
        title="证明对称关系 R 与 S 的交集 S ∩ R 仍是对称关系（附同类题全表）"
        verdicts={[{ ok: true, t: 'True · 元素追逐四步证明' }]}
      >
        <Markdown glossary={GLOSSARY} source={mdQ4} />
      </QCard>

      <QCard
        no="5"
        marks="20"
        title="{1,5,10,13,65,650} 整除偏序 Hasse 图、极值上下界、全序与格（Lattice）判定"
        verdicts={[
          { ok: true, t: 'b) minimal: 5, 13' },
          { ok: false, t: 'c) greatest: None' },
          { ok: false, t: 'f) Total Order: No' },
          { ok: true, t: 'g) Lattice: Yes!' },
        ]}
      >
        <Markdown glossary={GLOSSARY} source={mdQ5} />
        <HassePosetLab />
      </QCard>
    </>
  );
}

function TemplatesReviewTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 6 部分 · Exam Playbook & Self-Test"
        title="八大题型标准答题模板、勘误复盘与通关自测"
        desc="把全章证明套路浓缩成可照抄的英文骨架，并用 10 道覆盖全部盲区的自测题检验掌握度。"
      />
      <div className="card p-5 md:p-8">
        <Markdown glossary={GLOSSARY} source={mdTemplatesReview} />
      </div>
    </>
  );
}

function GlossaryTab() {
  return (
    <>
      <SectionHead
        eyebrow="第 7 部分 · Bilingual Glossary"
        title="英文术语总表（集合 · 函数 · 关系 · 闭包 · 等价 · 偏序与格）"
        desc="纯英文试卷读题与书写必备词典；支持按英文、中文、释义或别名实时检索。"
      />
      <GlossaryView
        glossary={GLOSSARY_LIST}
        cats={CATS}
        placeholder="例如：antisymmetric、Hasse diagram、least upper bound、双射、闭包"
      />
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
        {cur === 'sets-functions' && <SetsFunctionsTab />}
        {cur === 'relations' && <RelationsTab />}
        {cur === 'equiv-poset' && <EquivPosetTab />}
        {cur === 'exam' && <ExamTab />}
        {cur === 'questions' && <QuestionsTab />}
        {cur === 'templates-review' && <TemplatesReviewTab />}
        {cur === 'glossary' && <GlossaryTab />}
      </main>
      <footer className="mt-12 song" style={{ color: 'var(--muted)', fontSize: '.85rem', textAlign: 'center' }}>
        依据 Dr Patrick Chan 的 Ch2.1–2.3、Ch9.1–9.3、Ch9.5–9.6 slides 与 Tutorial 04–06 答案整理 · 公式由 KaTeX 渲染 · 流程图由 Mermaid 渲染
      </footer>
    </div>
  );
}
