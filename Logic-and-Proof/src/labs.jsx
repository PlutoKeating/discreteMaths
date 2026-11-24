import React, { useId, useState } from 'react';
import {
  evalImplicationFamily,
  evaluateQuantifierRound,
  evaluateQ1World,
} from './logicEngine.js';

/* =========================================================================
 * Lab 1: ImplicationProbeLab — 承诺跳票与 p → q 家族探针
 * ========================================================================= */
export function ImplicationProbeLab() {
  const [p, setP] = useState(false);
  const [q, setQ] = useState(true);
  const res = evalImplicationFamily(p, q);

  const Pill = ({ v }) => (
    <span className={'tag ' + (v ? 'ok' : 'bad')} style={{ fontFamily: 'var(--font-mono)' }}>
      {v ? 'T (真)' : 'F (假)'}
    </span>
  );

  return (
    <div>
      <div className="sbx-bar mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontSize: '.86rem', fontWeight: 600 }}>前件 p（期中考满 90 分）：</span>
          <button type="button" className={'sbx-btn' + (p ? ' on' : '')} onClick={() => setP(true)}>
            p = T（考到了）
          </button>
          <button type="button" className={'sbx-btn' + (!p ? ' on' : '')} onClick={() => setP(false)}>
            p = F（没考到）
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontSize: '.86rem', fontWeight: 600 }}>后件 q（周末请你吃火锅）：</span>
          <button type="button" className={'sbx-btn' + (q ? ' on' : '')} onClick={() => setQ(true)}>
            q = T（请客了）
          </button>
          <button type="button" className={'sbx-btn' + (!q ? ' on' : '')} onClick={() => setQ(false)}>
            q = F（没请客）
          </button>
        </div>
      </div>

      <div className="sbx-split">
        <div className="sbx-panel">
          <div style={{ fontSize: '.88rem', fontWeight: 600, marginBottom: '.5rem' }}>
            当前情境判断：
          </div>
          <p style={{ fontSize: '.9rem', margin: '0 0 .65rem' }}>
            {p && q && '考到了 90 分，也兑现诺言请了火锅 —— 承诺完全守信（T）。'}
            {p && !q && '考到了 90 分，居然赖账没请客 —— 这是全场唯一算“食言违约”的情形（F）！'}
            {!p && q && '虽然没考到 90 分，但朋友心情好照样请你吃了火锅 —— 他当然没有违背原承诺（T）！'}
            {!p && !q && '没考到 90 分，也没请吃火锅 —— 触发条件根本没发生，承诺依然不算违约（空真 T）！'}
          </p>
          <div className="sbx-hint">
            留意右边第一行与第二行：无论你怎么拨开关，<code>p → q</code>、<code>¬p ∨ q</code> 和逆否命题 <code>¬q → ¬p</code> 的真假永远一模一样；而逆命题 <code>q → p</code> 与否命题 <code>¬p → ¬q</code> 在 <code>p≠q</code> 时就会唱反调！
          </div>
        </div>

        <div className="sbx-panel">
          <div className="grid gap-2" style={{ fontSize: '.86rem' }}>
            <div className="flex items-center justify-between gap-2">
              <span className="mono">原命题 p → q</span>
              <Pill v={res.implies} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="mono">无箭头写法 ¬p ∨ q</span>
              <Pill v={res.disjForm} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="mono">逆否 Contrapositive (¬q → ¬p)</span>
              <Pill v={res.contrapositive} />
            </div>
            <hr style={{ margin: '.25rem 0', borderTop: '1px dashed var(--line)' }} />
            <div className="flex items-center justify-between gap-2">
              <span className="mono">逆命题 Converse (q → p)</span>
              <Pill v={res.converse} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="mono">否命题 Inverse (¬p → ¬q)</span>
              <Pill v={res.inverse} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * Lab 2: QuantifierGameLab — 先后手量词出牌博弈台（Test 01 Q4）
 * ========================================================================= */
export function QuantifierGameLab() {
  const numId = useId();
  const [gameKey, setGameKey] = useState('exists_forall_sum10');
  const [domainKey, setDomainKey] = useState('Z');
  const [val, setVal] = useState(7);

  const info = evaluateQuantifierRound(gameKey, domainKey, val);

  return (
    <div>
      <div className="sbx-bar mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontSize: '.84rem', fontWeight: 600 }}>切换博弈句式：</span>
          {[
            ['exists_forall_sum10', 'Q4b: ∃y ∀x (x+y=10)'],
            ['forall_exists_sum10', 'Q4c: ∀y ∃x (x+y=10)'],
            ['exists_forall_mul0', '对比: ∃y ∀x (x·y=0)'],
          ].map(([k, lbl]) => (
            <button
              key={k}
              type="button"
              className={'sbx-btn' + (gameKey === k ? ' on' : '')}
              onClick={() => {
                setGameKey(k);
                if (k === 'exists_forall_mul0' && domainKey === 'Z') setVal(0);
                else if (val <= 0 && domainKey === 'Z+') setVal(4);
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span style={{ fontSize: '.84rem', fontWeight: 600 }}>候选范围（Domain）：</span>
          {[
            ['Z', '全体整数 ℤ（原卷条件）'],
            ['Z+', '正整数 ℤ⁺ = {1,2,3,…}'],
          ].map(([k, lbl]) => (
            <button
              key={k}
              type="button"
              className={'sbx-btn' + (domainKey === k ? ' on' : '')}
              onClick={() => {
                setDomainKey(k);
                if (k === 'Z+' && val < 1) setVal(12);
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="sbx-split">
        <div className="sbx-panel">
          <label htmlFor={numId} className="block mb-2" style={{ fontSize: '.86rem', fontWeight: 600 }}>
            {gameKey === 'forall_exists_sum10'
              ? '第 1 步（对手 ∀ 先出牌）：替对手挑一个整数 y ='
              : '第 1 步（你 ∃ 先出牌）：试着押一个“万能整数” y ='}
          </label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {[-3, 0, 1, 5, 7, 10, 12]
              .filter((n) => domainKey === 'Z' || n >= 1)
              .map((n) => (
                <button
                  key={n}
                  type="button"
                  className={'sbx-btn' + (val === n ? ' on' : '')}
                  onClick={() => setVal(n)}
                >
                  y = {n}
                </button>
              ))}
            <input
              id={numId}
              type="number"
              value={val}
              min={domainKey === 'Z+' ? 1 : -99}
              max={99}
              onChange={(e) => setVal(Number(e.target.value || (domainKey === 'Z+' ? 1 : 0)))}
              style={{
                width: '4.8rem',
                padding: '.28rem .5rem',
                borderRadius: 7,
                border: '1px solid var(--line)',
                background: 'var(--paper)',
              }}
            />
          </div>
          <p style={{ fontSize: '.82rem', color: 'var(--muted)', margin: 0 }}>
            读量词永远<strong>从左往右按先后手读</strong>：排在前面的先亮底牌，排在后面的可以看着前手的牌再应对！
          </p>
        </div>

        <div className="sbx-panel">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="mono" style={{ fontWeight: 650 }}>{info.formula}</span>
            <span className={'tag ' + (info.formulaTrue ? 'ok' : 'bad')}>
              整句在 {domainKey === 'Z' ? 'ℤ' : 'ℤ⁺'} 上为 {info.formulaTrue ? 'True' : 'False'}
            </span>
          </div>
          <p style={{ fontSize: '.89rem', margin: 0 }}>{info.summary}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 * Lab 3: InferenceChainLab — Test 01 Q1b 三人线索链与反例制造机
 * ========================================================================= */
const PERSON_PRESETS = {
  Bob: {
    person: 'Bob',
    attendsAll: true,
    attendsSome: true,
    understands: true,
    passes: true,
    respected: true,
  },
  Noah: {
    person: 'Noah',
    attendsAll: false,
    attendsSome: false,
    understands: false,
    passes: false,
    respected: true, // Counterexample! All premises T, yet "Noah is not respected" is F!
  },
  Jessica: {
    person: 'Jessica',
    attendsAll: false,
    attendsSome: false,
    understands: false,
    passes: true, // Counterexample! All premises T, yet "Jessica does not pass" is F!
    respected: false,
  },
};

export function InferenceChainLab() {
  const [state, setState] = useState(PERSON_PRESETS.Noah);
  const res = evaluateQ1World(state);

  const selectPerson = (p) => setState({ ...PERSON_PRESETS[p] });
  const toggleField = (key) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span style={{ fontSize: '.85rem', fontWeight: 600 }}>选择 Test 01 第 1b 题待查人物：</span>
        {['Bob', 'Noah', 'Jessica'].map((p) => (
          <button
            key={p}
            type="button"
            className={'sbx-btn' + (state.person === p ? ' on' : '')}
            onClick={() => selectPerson(p)}
          >
            {p === 'Bob' && 'i) Bob（可推出 ✓）'}
            {p === 'Noah' && 'ii) Noah（不可推 · 预设反例）'}
            {p === 'Jessica' && 'iii) Jessica（不可推 · 预设反例）'}
          </button>
        ))}
      </div>

      <div className="sbx-split">
        <div className="sbx-panel">
          <div style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: '.55rem' }}>
            拨动 {state.person} 的真实情况（试着构造“前提全真、结论却假”的世界）：
          </div>
          <div className="grid gap-2" style={{ fontSize: '.84rem' }}>
            {[
              ['attendsAll', '上了全部讲座 ∀y A(x,y)'],
              ['attendsSome', '至少上过一节课 ∃y A(x,y)'],
              ['understands', '理解了课程内容 M(x)'],
              ['passes', '通过了这门课 P(x)'],
              ['respected', '受人尊敬 R(x)'],
            ].map(([k, lbl]) => (
              <div key={k} className="flex items-center justify-between gap-2">
                <span>{lbl}</span>
                <button
                  type="button"
                  className={'sbx-btn' + (state[k] ? ' on' : '')}
                  onClick={() => toggleField(k)}
                >
                  {state[k] ? 'True（是）' : 'False（否）'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sbx-panel">
          <div style={{ fontSize: '.85rem', fontWeight: 600, marginBottom: '.45rem' }}>
            题目四条前提与待判结论核查：
          </div>
          <div className="grid gap-1.5 mb-3" style={{ fontSize: '.82rem' }}>
            {!res.nonEmptyConsistency && (
              <div style={{ color: 'var(--bad)' }}>
                ✗ 逻辑冲突：上了全部讲座，不可能一节课都没上过！
              </div>
            )}
            <div className="flex justify-between">
              <span>H1: 上满全部课 → 受尊敬</span>
              <span className={'tag ' + (res.h1 ? 'ok' : 'bad')}>{res.h1 ? '满足' : '违背'}</span>
            </div>
            <div className="flex justify-between">
              <span>H2: 上过某些课 ↔ 理解内容</span>
              <span className={'tag ' + (res.h2 ? 'ok' : 'bad')}>{res.h2 ? '满足' : '违背'}</span>
            </div>
            <div className="flex justify-between">
              <span>H3: 理解内容 → 通过课程</span>
              <span className={'tag ' + (res.h3 ? 'ok' : 'bad')}>{res.h3 ? '满足' : '违背'}</span>
            </div>
            <div className="flex justify-between">
              <span>{res.specificLabel}</span>
              <span className={'tag ' + (res.specificPremise ? 'ok' : 'bad')}>
                {res.specificPremise ? '满足' : '违背'}
              </span>
            </div>
            <hr style={{ margin: '.25rem 0', borderTop: '1px dashed var(--line)' }} />
            <div className="flex justify-between">
              <strong>待查结论 {res.conclusionLabel}</strong>
              <span className={'tag ' + (res.targetConclusionHolds ? 'ok' : 'bad')}>
                {res.targetConclusionHolds ? '结论为 True' : '结论为 False'}
              </span>
            </div>
          </div>

          <div className="sbx-hint">
            {res.isCounterexample ? (
              <span>
                <strong>成功抓到反例世界！</strong> 上方所有题目前提同时成立，但待查结论却是 <strong>False</strong> —— 把这一组状态写成两句英文，就是考场上拿满分的“不可推解释”！
              </span>
            ) : state.person === 'Bob' && res.allHypothesesHold ? (
              <span>
                试着把 Bob 的 <code>通过了这门课</code> 改成 False 看看 —— 立刻至少撞碎一条前提！这说明前提全真时 Bob <strong>必然</strong>通过课程。
              </span>
            ) : (
              <span>继续调整左侧按钮，看看能不能让所有前提都绿灯（满足），同时让最底下的结论亮红灯（False）！</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
