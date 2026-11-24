import React, { useId, useMemo, useState } from 'react';
import {
  cloneMat,
  matTranspose,
  matComplement,
  matXor,
  matBooleanProduct,
  matSymmetricClosure,
  warshallSteps,
  analyzeRelationMatrix,
  analyzePosetSubset,
  analyzePosetGlobal,
  analyzeDiscreteFunction,
  analyzeRestrictedAbsHalf,
  PRESET_MATRICES,
  PRESET_POSETS,
  PRESET_FUNCTIONS,
} from './engine.js';

function Badge({ ok, label }) {
  return (
    <span className={'tag ' + (ok ? 'ok' : 'bad')} style={{ textTransform: 'none', fontSize: '.78rem' }}>
      {ok ? '✓ ' : '✗ '}
      {label}
    </span>
  );
}

/* =========================================================================
 * 1. FunctionMapperLab — 离散函数箭头映射 & Test 02 Q1d 定义域限制交互器
 * ========================================================================= */
export function FunctionMapperLab({ defaultMode = 'restrict' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sliderId = `hline_${uid}`;
  const fArrId = `fArr_${uid}`;
  const fArrInvId = `fArrInv_${uid}`;

  const [mode, setMode] = useState(defaultMode); // 'discrete' | 'restrict'
  const [presetIdx, setPresetIdx] = useState(0);
  const [showInv, setShowInv] = useState(false);

  // Mode B state: Test 02 Q1d h(x) = |x/2|
  const [domKey, setDomKey] = useState('R>=0');
  const [codKey, setCodKey] = useState('R>=0');
  const [yLine, setYLine] = useState(1.0);

  const curPreset = PRESET_FUNCTIONS[presetIdx];
  const discInfo = useMemo(
    () => analyzeDiscreteFunction(curPreset.domain, curPreset.codomain, curPreset.pairs),
    [curPreset]
  );
  const restInfo = useMemo(() => analyzeRestrictedAbsHalf(domKey, codKey), [domKey, codKey]);

  const hits = useMemo(() => {
    if (yLine < 0) return [];
    if (yLine === 0) return [0];
    const pts = [];
    const xNeg = -2 * yLine;
    const xPos = 2 * yLine;
    if (domKey === 'R' || domKey === 'R<=0') pts.push(xNeg);
    if (domKey === 'R' || domKey === 'R>=0') pts.push(xPos);
    return pts;
  }, [yLine, domKey]);

  return (
    <section className="card rim p-4 md:p-6 my-6" aria-label="函数单射满射与定义域限制交互沙盘">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <span className="tag">交互图解沙盘 1</span>
          <h3 className="head" style={{ fontSize: '1.25rem', margin: '.3rem 0 0' }}>
            函数单射 / 满射 / 双射 & 定义域限制演示器
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={'chip' + (mode === 'restrict' ? ' on' : '')}
            onClick={() => setMode('restrict')}
          >
            Test 02 Q1d：h(x)=|x/2| 限制域
          </button>
          <button
            type="button"
            className={'chip' + (mode === 'discrete' ? ' on' : '')}
            onClick={() => setMode('discrete')}
          >
            离散集合箭头映射图
          </button>
        </div>
      </div>

      {mode === 'restrict' ? (
        <div>
          <div className="sbx-bar mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="head" style={{ fontSize: '.85rem' }}>Domain（定义域）：</span>
              {[
                ['R', 'ℝ = (-∞, +∞)'],
                ['R>=0', '[0, +∞) ✓'],
                ['R<=0', '(-∞, 0] ✓'],
              ].map(([k, lbl]) => (
                <button
                  key={k}
                  type="button"
                  className={'sbx-btn' + (domKey === k ? ' on' : '')}
                  onClick={() => setDomKey(k)}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="head" style={{ fontSize: '.85rem' }}>Codomain（余域）：</span>
              {[
                ['R', 'ℝ = (-∞, +∞)'],
                ['R>=0', '[0, +∞) = Range ✓'],
              ].map(([k, lbl]) => (
                <button
                  key={k}
                  type="button"
                  className={'sbx-btn' + (codKey === k ? ' on' : '')}
                  onClick={() => setCodKey(k)}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="sbx-split">
            <div className="fig" style={{ margin: 0 }}>
              <svg viewBox="0 0 420 260" role="img" aria-label="h(x)=|x/2| 坐标与水平线检验图">
                <rect
                  x="196"
                  y="18"
                  width="28"
                  height={codKey === 'R' ? 224 : 142}
                  fill="var(--accent)"
                  opacity=".14"
                  rx="4"
                />
                <rect
                  x={domKey === 'R>=0' ? 210 : 30}
                  y="152"
                  width={domKey === 'R' ? 360 : 180}
                  height="16"
                  fill="var(--kw)"
                  opacity=".16"
                  rx="4"
                />
                <line x1="24" y1="160" x2="396" y2="160" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" />
                <line x1="210" y1="16" x2="210" y2="244" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" />
                <text x="388" y="152" fontSize="12" fill="currentColor" className="d-mono">x</text>
                <text x="218" y="28" fontSize="12" fill="currentColor" className="d-mono">y</text>
                <text x="216" y="174" fontSize="11" fill="currentColor" opacity=".75" className="d-mono">0</text>

                <line x1="50" y1="32" x2="210" y2="160" stroke="currentColor" strokeOpacity=".2" strokeWidth="2.5" strokeDasharray="5 4" />
                <line x1="210" y1="160" x2="370" y2="32" stroke="currentColor" strokeOpacity=".2" strokeWidth="2.5" strokeDasharray="5 4" />

                {(domKey === 'R' || domKey === 'R<=0') && (
                  <line x1="50" y1="32" x2="210" y2="160" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                )}
                {(domKey === 'R' || domKey === 'R>=0') && (
                  <line x1="210" y1="160" x2="370" y2="32" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                )}

                {(() => {
                  const py = 160 - yLine * 64;
                  const inCod = codKey === 'R' || yLine >= 0;
                  const lineColor = !inCod ? 'var(--muted)' : hits.length === 1 ? 'var(--ok)' : 'var(--bad)';
                  return (
                    <g>
                      <line x1="30" y1={py} x2="390" y2={py} stroke={lineColor} strokeWidth="2" strokeDasharray="6 4" />
                      <text x="36" y={py - 6} fill={lineColor} fontSize="12" className="d-mono" fontWeight="700">
                        水平测试线 y = {yLine.toFixed(1)}（交点：{hits.length} 个）
                      </text>
                      {hits.map((hx) => (
                        <circle key={hx} cx={210 + hx * 32} cy={py} r="6" fill={lineColor} stroke="#fff" strokeWidth="2" />
                      ))}
                    </g>
                  );
                })()}
              </svg>
              <div className="mt-2 flex items-center gap-3">
                <label htmlFor={sliderId} className="mono" style={{ fontSize: '.8rem', whiteSpace: 'nowrap' }}>
                  拖动水平线 y = {yLine.toFixed(1)}
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min="-1.0"
                  max="2.0"
                  step="0.5"
                  value={yLine}
                  onChange={(e) => setYLine(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3">
              <div className="sbx-panel">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge ok={restInfo.isInjective} label="One-to-One (单射)" />
                  <Badge ok={restInfo.isSurjective} label="Onto (满射)" />
                  <Badge ok={restInfo.isBijective} label="Bijection (双射/可逆)" />
                </div>
                <div className="mono mb-2" style={{ fontSize: '.88rem' }}>
                  h : <strong>{restInfo.domainLabel}</strong> → <strong>{restInfo.codomainLabel}</strong>
                </div>
                <ul className="text-sm space-y-1" style={{ paddingLeft: '1.1rem', listStyle: 'disc', margin: 0 }}>
                  <li><strong>单射判定：</strong>{restInfo.injectiveNote}</li>
                  <li><strong>满射判定：</strong>{restInfo.surjectiveNote}</li>
                  <li><strong>反函数：</strong><code className="mono">{restInfo.inverseFormula}</code></li>
                </ul>
              </div>
              <div className="sbx-hint">
                试着把 Domain 切回 <code>ℝ</code> 并将水平线拖到 <code>y = 1.0</code>：立刻看到左右两个交点 <code>x = -2, +2</code>（破坏单射）；把 Codomain 切回 <code>ℝ</code> 并拖到 <code>y = -0.5</code>：0 个交点（破坏满射）！
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {PRESET_FUNCTIONS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                className={'sbx-btn' + (presetIdx === idx ? ' on' : '')}
                onClick={() => {
                  setPresetIdx(idx);
                  setShowInv(false);
                }}
              >
                {p.label}
              </button>
            ))}
            {discInfo.isBijective && (
              <button
                type="button"
                className={'sbx-btn' + (showInv ? ' on' : '')}
                onClick={() => setShowInv((v) => !v)}
              >
                {showInv ? '还原 f: A → B' : '翻转查看反函数 f⁻¹: B → A'}
              </button>
            )}
          </div>

          <div className="sbx-split">
            <div className="fig" style={{ margin: 0 }}>
              <svg viewBox="0 0 400 230" role="img" aria-label="离散集合箭头映射示意图">
                <defs>
                  <marker id={fArrId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="var(--accent)" />
                  </marker>
                  <marker id={fArrInvId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="var(--ok)" />
                  </marker>
                </defs>
                <ellipse cx="105" cy="120" rx="52" ry="92" fill="var(--accent)" fillOpacity=".1" stroke="var(--accent)" strokeWidth="2" />
                <ellipse cx="295" cy="120" rx="52" ry="92" fill="var(--kw)" fillOpacity=".1" stroke="var(--kw)" strokeWidth="2" />
                <text x="105" y="20" textAnchor="middle" fill="currentColor" fontSize="13" className="d-text">
                  Domain A
                </text>
                <text x="295" y="20" textAnchor="middle" fill="currentColor" fontSize="13" className="d-text">
                  Codomain B
                </text>
                {curPreset.pairs.map(([d, c], idx) => {
                  const di = curPreset.domain.indexOf(d);
                  const ci = curPreset.codomain.indexOf(c);
                  const y1 = 60 + di * (130 / Math.max(1, curPreset.domain.length - 1));
                  const y2 = 55 + ci * (135 / Math.max(1, curPreset.codomain.length - 1));
                  return showInv ? (
                    <line
                      key={idx}
                      x1="274"
                      y1={y2}
                      x2="128"
                      y2={y1}
                      stroke="var(--ok)"
                      strokeWidth="2.6"
                      markerEnd={`url(#${fArrInvId})`}
                    />
                  ) : (
                    <line
                      key={idx}
                      x1="126"
                      y1={y1}
                      x2="272"
                      y2={y2}
                      stroke="var(--accent)"
                      strokeWidth="2.6"
                      markerEnd={`url(#${fArrId})`}
                    />
                  );
                })}
                {curPreset.domain.map((d, i) => {
                  const y = 60 + i * (130 / Math.max(1, curPreset.domain.length - 1));
                  return (
                    <g key={d}>
                      <circle cx="105" cy={y} r="15" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.2" />
                      <text x="105" y={y + 5} textAnchor="middle" fill="currentColor" fontSize="14" className="d-mono" fontWeight="700">
                        {d}
                      </text>
                    </g>
                  );
                })}
                {curPreset.codomain.map((c, i) => {
                  const y = 55 + i * (135 / Math.max(1, curPreset.codomain.length - 1));
                  return (
                    <g key={c}>
                      <circle cx="295" cy={y} r="15" fill="var(--card)" stroke="var(--kw)" strokeWidth="2.2" />
                      <text x="295" y={y + 5} textAnchor="middle" fill="currentColor" fontSize="14" className="d-mono" fontWeight="700">
                        {c}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="sbx-panel">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge ok={discInfo.isFunction} label="Function (函数)" />
                <Badge ok={discInfo.isInjective} label="One-to-One (单射)" />
                <Badge ok={discInfo.isSurjective} label="Onto (满射)" />
                <Badge ok={discInfo.isBijective} label="Bijection (可逆)" />
              </div>
              {!discInfo.isFunction ? (
                <p className="text-sm" style={{ color: 'var(--bad)', margin: 0 }}>{discInfo.reason}</p>
              ) : (
                <ul className="text-sm space-y-2" style={{ paddingLeft: '1.1rem', listStyle: 'disc', margin: 0 }}>
                  <li><strong>单射检验：</strong>{discInfo.injectiveReason}</li>
                  <li><strong>满射检验：</strong>{discInfo.surjectiveReason}</li>
                  <li><strong>可逆结论：</strong>{discInfo.isBijective ? '既是单射又是满射，反转每条箭头即得唯一反函数 f⁻¹！' : '不满足双射，箭头反转后会出现漏定义或一源多值，故不可逆。'}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================================
 * 2. RelationMatrixLab — 0-1 关系矩阵 ↔ 有向图 · R₂∘R₁ · Warshall 步进沙盘
 * ========================================================================= */
function MatrixGrid({ title, labels, matrix, onToggle, highlightRow = -1, highlightCol = -1, pivot = -1, addedSet = null }) {
  return (
    <div className="sbx-mat-box">
      <div className="mono mb-2" style={{ fontSize: '.84rem', fontWeight: 700, textAlign: 'center' }}>{title}</div>
      <div
        className="mat-grid"
        style={{ gridTemplateColumns: `1.5rem repeat(${labels.length}, minmax(2.1rem, 2.5rem))` }}
      >
        <div />
        {labels.map((l, j) => (
          <div key={j} className="mat-hdr" style={{ color: j === highlightCol || j === pivot ? 'var(--kw)' : 'var(--muted)' }}>
            {l}
          </div>
        ))}
        {matrix.map((row, i) => (
          <React.Fragment key={i}>
            <div className="mat-hdr" style={{ color: i === highlightRow || i === pivot ? 'var(--accent)' : 'var(--muted)' }}>
              {labels[i]}
            </div>
            {row.map((val, j) => {
              const isAdded = addedSet?.has(`${i}-${j}`);
              const isHi = i === highlightRow || j === highlightCol;
              const isPiv = i === pivot || j === pivot;
              let cls = 'mat-cell' + (val ? ' on' : '');
              if (isAdded) cls += ' added';
              else if (isHi || isPiv) cls += ' hi';
              return onToggle ? (
                <button
                  key={j}
                  type="button"
                  className={cls}
                  onClick={() => onToggle(i, j)}
                  aria-label={`翻转 (${labels[i]}, ${labels[j]})，当前为 ${val}`}
                >
                  {val}
                </button>
              ) : (
                <div key={j} className={cls} aria-label={`(${labels[i]}, ${labels[j]}) = ${val}`}>
                  {val}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function DigraphSvg({ labels, matrix }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const dgArrId = `dgArr_${uid}`;
  const dgArrBiId = `dgArrBi_${uid}`;
  const n = labels.length;
  const cx = 145;
  const cy = 122;
  const radius = n <= 3 ? 68 : 74;
  const pts = labels.map((_, i) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: cx + radius * Math.cos(ang), y: cy + radius * Math.sin(ang), ang };
  });

  return (
    <svg viewBox="0 0 290 244" role="img" aria-label="关系 R1 的实时有向图">
      <defs>
        <marker id={dgArrId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="var(--accent)" />
        </marker>
        <marker id={dgArrBiId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="var(--ok)" />
        </marker>
      </defs>

      {matrix.map((row, i) =>
        row.map((val, j) => {
          if (!val) return null;
          if (i === j) {
            const p = pts[i];
            const lx = p.x + 28 * Math.cos(p.ang);
            const ly = p.y + 28 * Math.sin(p.ang);
            return (
              <circle
                key={`loop-${i}`}
                cx={lx}
                cy={ly}
                r="14"
                fill="none"
                stroke="var(--kw)"
                strokeWidth="2.2"
              />
            );
          }
          const p1 = pts[i];
          const p2 = pts[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const bi = matrix[j][i] === 1;
          const offset = bi ? 11 : 0;
          const sx = p1.x + (dx / len) * 19 + nx * offset;
          const sy = p1.y + (dy / len) * 19 + ny * offset;
          const ex = p2.x - (dx / len) * 21 + nx * offset;
          const ey = p2.y - (dy / len) * 21 + ny * offset;
          const mx = (sx + ex) / 2 + nx * (bi ? 10 : 0);
          const my = (sy + ey) / 2 + ny * (bi ? 10 : 0);
          return (
            <path
              key={`e-${i}-${j}`}
              d={`M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`}
              fill="none"
              stroke={bi ? 'var(--ok)' : 'var(--accent)'}
              strokeWidth="2.3"
              markerEnd={bi ? `url(#${dgArrBiId})` : `url(#${dgArrId})`}
            />
          );
        })
      )}

      {pts.map((p, i) => (
        <g key={labels[i]}>
          <circle cx={p.x} cy={p.y} r="17" fill="var(--card)" stroke="var(--accent)" strokeWidth="2.5" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fill="currentColor" fontSize="14" className="d-mono" fontWeight="700">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function RelationMatrixLab() {
  const [presetKey, setPresetKey] = useState('test02_q2');
  const [m1, setM1] = useState(() => cloneMat(PRESET_MATRICES.test02_q2.m1));
  const [m2, setM2] = useState(() => cloneMat(PRESET_MATRICES.test02_q2.m2));
  const [labels, setLabels] = useState(PRESET_MATRICES.test02_q2.labels);
  const [opTab, setOpTab] = useState('comp');
  const [wStep, setWStep] = useState(3);
  const [hoverCell, setHoverCell] = useState([0, 1]);
  const [selProp, setSelProp] = useState('transitive');

  const loadPreset = (key) => {
    const p = PRESET_MATRICES[key];
    setPresetKey(key);
    setLabels(p.labels);
    setM1(cloneMat(p.m1));
    setM2(cloneMat(p.m2));
    setWStep(p.labels.length);
    setHoverCell([0, 0]);
  };

  const clearZero = () => {
    const n = labels.length;
    setPresetKey('zero');
    setM1(Array.from({ length: n }, () => Array(n).fill(0)));
    setWStep(0);
  };

  const toggleM1 = (i, j) => {
    setPresetKey('custom');
    setM1((prev) => {
      const next = cloneMat(prev);
      next[i][j] = next[i][j] ? 0 : 1;
      return next;
    });
  };
  const toggleM2 = (i, j) => {
    setPresetKey('custom');
    setM2((prev) => {
      const next = cloneMat(prev);
      next[i][j] = next[i][j] ? 0 : 1;
      return next;
    });
  };

  const props = useMemo(() => analyzeRelationMatrix(m1, labels), [m1, labels]);
  const wSteps = useMemo(() => warshallSteps(m1), [m1]);
  const safeWStep = Math.min(wStep, wSteps.length - 1);
  const compMat = useMemo(() => matBooleanProduct(m1, m2), [m1, m2]);

  const propMeta = [
    ['reflexive', '自反 Reflexive'],
    ['irreflexive', '反自反 Irreflexive'],
    ['symmetric', '对称 Symmetric'],
    ['antisymmetric', '反对称 Antisymmetric'],
    ['asymmetric', '非对称 Asymmetric'],
    ['transitive', '传递 Transitive'],
    ['function', '函数 Function'],
    ['equivalence', '等价 Equivalence'],
    ['partialOrder', '偏序 Partial Order'],
  ];

  const curAdded = useMemo(() => {
    const s = new Set();
    for (const [r, c] of wSteps[safeWStep]?.added || []) s.add(`${r}-${c}`);
    return s;
  }, [wSteps, safeWStep]);

  const [hiI, hiJ] = hoverCell;
  const safeI = Math.min(hiI, labels.length - 1);
  const safeJ = Math.min(hiJ, labels.length - 1);

  return (
    <section className="card rim p-4 md:p-6 my-6" aria-label="0-1关系矩阵、有向图与Warshall闭包交互沙盘">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="tag">交互图解沙盘 2</span>
          <h3 className="head" style={{ fontSize: '1.25rem', margin: '.3rem 0 0' }}>
            0-1 关系矩阵 ↔ 有向图 · R₂∘R₁ 顺序 · Warshall 传递闭包沙盘
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESET_MATRICES).map(([k, p]) => (
            <button
              key={k}
              type="button"
              className={'sbx-btn' + (presetKey === k ? ' on' : '')}
              onClick={() => loadPreset(k)}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            className={'sbx-btn' + (presetKey === 'zero' ? ' on' : '')}
            onClick={clearZero}
          >
            清空 R₁ 为全 0（测空真）
          </button>
        </div>
      </div>

      <div className="sbx-tri mb-4">
        <MatrixGrid
          title="点击翻转 M_R₁（左：先出发）"
          labels={labels}
          matrix={m1}
          onToggle={toggleM1}
          highlightRow={opTab === 'comp' ? safeI : -1}
          pivot={opTab === 'warshall' && safeWStep > 0 ? safeWStep - 1 : -1}
        />
        <MatrixGrid
          title="点击翻转 M_R₂（右：后到达）"
          labels={labels}
          matrix={m2}
          onToggle={toggleM2}
          highlightCol={opTab === 'comp' ? safeJ : -1}
        />
        <div className="sbx-mat-box" style={{ padding: '.5rem' }}>
          <div className="mono" style={{ fontSize: '.82rem', fontWeight: 700, textAlign: 'center' }}>
            R₁ 实时有向图（红环=自环 · 绿=双向）
          </div>
          <DigraphSvg labels={labels} matrix={m1} />
        </div>
      </div>

      <div className="sbx-panel mb-4">
        <div className="mono mb-2" style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
          R₁ 的 9 项性质实时判定（点击任意徽章查看判定依据 / 具体反例）：
        </div>
        <div className="flex flex-wrap gap-2">
          {propMeta.map(([k, lbl]) => {
            const item = props[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() => setSelProp(k)}
                className={'prop-pill ' + (item.ok ? 'ok' : 'bad') + (selProp === k ? ' sel' : '')}
              >
                {item.ok ? '✓ ' : '✗ '}
                {lbl}
              </button>
            );
          })}
        </div>
        <div className="mt-2 mono" style={{ fontSize: '.86rem', color: props[selProp]?.ok ? 'var(--ok)' : 'var(--bad)' }}>
          ▸ {propMeta.find(([k]) => k === selProp)?.[1]}：{props[selProp]?.reason}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {[
          ['comp', 'd) 复合 R₂ ∘ R₁ = M_R₁ ⊙ M_R₂'],
          ['warshall', 'e) 传递闭包 t(R₁) · Warshall 步进'],
          ['inv', 'a) 逆 R₁⁻¹ (转置)'],
          ['comp_not', 'b) 补 R̄₁ (取反)'],
          ['xor', 'c) 异或 R₁ ⊕ R₂'],
          ['sym2', 'f) 对称闭包 s(R₂)'],
        ].map(([id, lbl]) => (
          <button
            key={id}
            type="button"
            className={'sbx-btn' + (opTab === id ? ' on' : '')}
            onClick={() => setOpTab(id)}
          >
            {lbl}
          </button>
        ))}
      </div>

      <div className="sbx-panel">
        {opTab === 'comp' && (
          <div className="sbx-split" style={{ alignItems: 'center' }}>
            <div className="sbx-mat-box">
              <div className="mono mb-2" style={{ fontSize: '.84rem', fontWeight: 700, textAlign: 'center' }}>
                结果 M_(R₂∘R₁)（点击任意格看行列内积）
              </div>
              <div
                className="mat-grid"
                style={{ gridTemplateColumns: `1.5rem repeat(${labels.length}, minmax(2.1rem, 2.5rem))` }}
              >
                <div />
                {labels.map((l, j) => (
                  <div key={j} className="mat-hdr">{l}</div>
                ))}
                {compMat.map((row, i) => (
                  <React.Fragment key={i}>
                    <div className="mat-hdr">{labels[i]}</div>
                    {row.map((val, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => setHoverCell([i, j])}
                        onMouseEnter={() => setHoverCell([i, j])}
                        className={'mat-cell' + (val ? ' on' : '') + (i === safeI && j === safeJ ? ' added' : '')}
                      >
                        {val}
                      </button>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <div className="head mb-1" style={{ color: 'var(--accent)' }}>
                正在拆解元素 ({labels[safeI]}, {labels[safeJ]}) 格的布尔内积：
              </div>
              <p className="mono text-sm" style={{ margin: '.3rem 0' }}>
                左矩阵 M_R₁ 顶点 {labels[safeI]} 行 = [{m1[safeI].join(', ')}]
                <br />
                右矩阵 M_R₂ 顶点 {labels[safeJ]} 列 = [{m2.map((r) => r[safeJ]).join(', ')}]ᵀ
              </p>
              <p className="mono text-sm" style={{ margin: '.4rem 0', color: 'var(--kw)', fontWeight: 700 }}>
                (M_(R₂∘R₁))_({labels[safeI]},{labels[safeJ]}) ={' '}
                {labels.map((_, k) => `(${m1[safeI][k]}∧${m2[k][safeJ]})`).join(' ∨ ')} = {compMat[safeI][safeJ]}
              </p>
              <div className="sbx-hint">
                记住 Slide 45 铁律：<strong>R₂ ∘ R₁ 先走 R₁</strong>，所以永远取 <strong>M_R₁ 的行</strong> 与 <strong>M_R₂ 的列</strong> 相乘！
              </div>
            </div>
          </div>
        )}

        {opTab === 'warshall' && (
          <div className="sbx-split" style={{ alignItems: 'center' }}>
            <MatrixGrid
              title={`Warshall 矩阵 W_${safeWStep}${safeWStep === labels.length ? ' = M_{t(R₁)}' : ''}`}
              labels={labels}
              matrix={wSteps[safeWStep].matrix}
              pivot={safeWStep > 0 ? safeWStep - 1 : -1}
              addedSet={curAdded}
            />
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {wSteps.map((s) => (
                  <button
                    key={s.k}
                    type="button"
                    className={'sbx-btn' + (safeWStep === s.k ? ' on' : '')}
                    onClick={() => setWStep(s.k)}
                  >
                    W_{s.k} {s.k === 0 ? '(初态)' : `(中转 ${labels[s.k - 1]})`}
                  </button>
                ))}
              </div>
              {safeWStep === 0 ? (
                <p className="text-sm" style={{ margin: 0 }}>
                  <strong>W₀ = M_R₁</strong>：尚未允许任何中间顶点做跳板。点击上方 <code>W₁ … W_{labels.length}</code> 逐步观察十字交叉补 1！
                </p>
              ) : (
                <div className="text-sm space-y-1">
                  <div>
                    <strong>第 k = {safeWStep} 步（允许顶点 {labels[safeWStep - 1]} 作中转站）：</strong>
                  </div>
                  <div className="mono">
                    顶点 {labels[safeWStep - 1]} 所在列（第 {safeWStep} 列）为 1 的行 C_{safeWStep} = {'{' +
                      wSteps[safeWStep - 1].matrix
                        .map((r, idx) => (r[safeWStep - 1] ? labels[idx] : null))
                        .filter(Boolean)
                        .join(', ') +
                      '}'}
                  </div>
                  <div className="mono">
                    顶点 {labels[safeWStep - 1]} 所在行（第 {safeWStep} 行）为 1 的列 R_{safeWStep} = {'{' +
                      wSteps[safeWStep - 1].matrix[safeWStep - 1]
                        .map((v, idx) => (v ? labels[idx] : null))
                        .filter(Boolean)
                        .join(', ') +
                      '}'}
                  </div>
                  <div style={{ color: 'var(--ok)', fontWeight: 700 }}>
                    {wSteps[safeWStep].added.length > 0
                      ? `本步新补上的 1（绿格）：${wSteps[safeWStep].added.map(([r, c]) => `(${labels[r]},${labels[c]})`).join('、')}`
                      : '本步交叉位置原本全都是 1（或无交叉），矩阵无新增边。'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {opTab === 'inv' && (
          <div className="flex flex-wrap items-center gap-6">
            <MatrixGrid title="M_(R₁⁻¹) = M_R₁ᵀ" labels={labels} matrix={matTranspose(m1)} />
            <p className="text-sm" style={{ maxWidth: '26rem', margin: 0 }}>
              <strong>逆关系 R₁⁻¹：</strong>把有向图每条箭头原地掉头，对应 0-1 矩阵沿主对角线翻折（第 i 行变成第 i 列）。
            </p>
          </div>
        )}

        {opTab === 'comp_not' && (
          <div className="flex flex-wrap items-center gap-6">
            <MatrixGrid title="M_(R̄₁) = ¬M_R₁" labels={labels} matrix={matComplement(m1)} />
            <p className="text-sm" style={{ maxWidth: '26rem', margin: 0 }}>
              <strong>补关系 R̄₁ = (A × A) − R₁：</strong>原来没连边的全连上，原来连了边的全擦掉，矩阵所有 0 与 1 互换。
            </p>
          </div>
        )}

        {opTab === 'xor' && (
          <div className="flex flex-wrap items-center gap-6">
            <MatrixGrid title="M_(R₁ ⊕ R₂)" labels={labels} matrix={matXor(m1, m2)} />
            <p className="text-sm" style={{ maxWidth: '26rem', margin: 0 }}>
              <strong>对称差（异或）R₁ ⊕ R₂：</strong>恰好出现在其中一个关系中的有序对。对应位置不同填 1，相同填 0。
            </p>
          </div>
        )}

        {opTab === 'sym2' && (
          <div className="flex flex-wrap items-center gap-6">
            <MatrixGrid title="M_(s(R₂)) = M_R₂ ∨ M_R₂ᵀ" labels={labels} matrix={matSymmetricClosure(m2)} />
            <p className="text-sm" style={{ maxWidth: '26rem', margin: 0 }}>
              <strong>对称闭包 s(R₂)：</strong>把 R₂ 中所有单向边补成双向边（M_R₂ 与其转置按位求或）。注意对角线原来是 0 的格绝不会无故变 1！
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================================
 * 3. HassePosetLab — Hasse 图极值、上下界与格（Lattice）交互沙盘
 * ========================================================================= */
export function HassePosetLab() {
  const [presetKey, setPresetKey] = useState('test02_q5');
  const [subset, setSubset] = useState([1, 2, 3]);

  const cur = PRESET_POSETS[presetKey];
  const { poset } = cur;

  const resetDefaultSubset = (key = presetKey) => {
    const p = PRESET_POSETS[key];
    const firstQuick = p.quickSubsets[0]?.values || p.poset.elements;
    setSubset(firstQuick.map((v) => p.poset.elements.indexOf(v)).filter((i) => i >= 0));
  };

  const selectPreset = (key) => {
    setPresetKey(key);
    resetDefaultSubset(key);
  };

  const toggleNode = (idx) => {
    setSubset((prev) => (prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]));
  };

  const subRes = useMemo(() => analyzePosetSubset(poset, subset), [poset, subset]);
  const globRes = useMemo(() => analyzePosetGlobal(poset), [poset]);

  const coords = useMemo(() => {
    const W = 380;
    const H = 266;
    const L = poset.levels.length;
    const map = {};
    poset.levels.forEach((lvl, r) => {
      const y = L === 1 ? H / 2 : H - 40 - (r * (H - 80)) / (L - 1);
      lvl.forEach((nodeIdx, k) => {
        const x = ((k + 1) * W) / (lvl.length + 1);
        map[nodeIdx] = { x, y };
      });
    });
    return map;
  }, [poset]);

  const fmtSet = (idxs) =>
    idxs.length === 0 ? '∅（无）' : idxs.map((i) => String(poset.elements[i])).join(', ');
  const fmtOne = (idx) => (idx === null ? 'None（不存在）' : String(poset.elements[idx]));

  return (
    <section className="card rim p-4 md:p-6 my-6" aria-label="Hasse图极值上下界与格交互沙盘">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="tag">交互图解沙盘 3</span>
          <h3 className="head" style={{ fontSize: '1.25rem', margin: '.3rem 0 0' }}>
            Hasse 图极值 / 上下界 / LUB·GLB 与 Lattice 判定沙盘
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESET_POSETS).map(([k, p]) => (
            <button
              key={k}
              type="button"
              className={'sbx-btn' + (presetKey === k ? ' on' : '')}
              onClick={() => selectPreset(k)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="mono" style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
          一键切换待测子集 B（或直接点击图中圆点）：
        </span>
        {cur.quickSubsets.map((qs) => (
          <button
            key={qs.label}
            type="button"
            className="sbx-btn"
            onClick={() =>
              setSubset(qs.values.map((v) => poset.elements.indexOf(v)).filter((i) => i >= 0))
            }
          >
            {qs.label}
          </button>
        ))}
        <button type="button" className="sbx-btn" onClick={() => setSubset([])}>
          清空 B = ∅
        </button>
      </div>

      <div className="sbx-split">
        <div className="fig" style={{ margin: 0 }}>
          <svg viewBox="0 0 380 266" role="img" aria-label={cur.name + ' Hasse 图'}>
            {poset.covers.map(([u, v]) => (
              <line
                key={`${u}-${v}`}
                x1={coords[u].x}
                y1={coords[u].y}
                x2={coords[v].x}
                y2={coords[v].y}
                stroke="currentColor"
                strokeOpacity=".55"
                strokeWidth="2.4"
              />
            ))}

            {poset.elements.map((el, idx) => {
              const { x, y } = coords[idx];
              const str = String(el);
              const r = str.length > 5 ? 24 : 19;
              const inB = subset.includes(idx);
              const isLub = !subRes.empty && subRes.lub === idx;
              const isGlb = !subRes.empty && subRes.glb === idx;
              const isBound =
                !subRes.empty && (subRes.upperBounds.includes(idx) || subRes.lowerBounds.includes(idx));
              return (
                <g
                  key={str}
                  onClick={() => toggleNode(idx)}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  aria-label={`元素 ${el}，${inB ? '已选入子集 B' : '未选入子集 B'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleNode(idx);
                    }
                  }}
                >
                  {(isLub || isGlb) && (
                    <circle
                      cx={x}
                      cy={y}
                      r={r + 6}
                      fill="none"
                      stroke={isLub ? 'var(--ok)' : 'var(--warn)'}
                      strokeWidth="2.6"
                      strokeDasharray="4 3"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={inB ? 'var(--accent)' : isBound ? 'var(--card2)' : 'var(--card)'}
                    stroke={inB ? 'var(--accent)' : isBound ? 'var(--kw)' : 'currentColor'}
                    strokeWidth={inB ? '3' : '2'}
                  />
                  <text
                    x={x}
                    y={y + 4.5}
                    textAnchor="middle"
                    fill={inB ? '#fff' : 'currentColor'}
                    fontSize={str.length > 5 ? '10.5' : str.length > 3 ? '12' : '13.5'}
                    className="d-mono"
                    fontWeight="700"
                  >
                    {str}
                  </text>
                  {isLub && (
                    <text x={x + r + 7} y={y - 6} fontSize="11" fill="var(--ok)" className="d-mono" fontWeight="700">
                      LUB
                    </text>
                  )}
                  {isGlb && (
                    <text x={x + r + 7} y={y + 15} fontSize="11" fill="var(--warn)" className="d-mono" fontWeight="700">
                      GLB
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="cap">
            蓝底实心 = 当前选中子集 B · 绿虚圈 = LUB · 金虚圈 = GLB（省去自环、跨级边与向上箭头）
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="sbx-panel">
            <div className="mono mb-2" style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--accent)' }}>
              当前子集 B = {'{' + subset.map((i) => poset.elements[i]).join(', ') + '}'}
            </div>
            {subRes.empty ? (
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                <p style={{ margin: '0 0 .5rem' }}>
                  子集 B 为空集 ∅：无极小/极大/最小/最大元（全集所有元素空真地作为 ∅ 的上下界，此时 LUB(∅)={fmtOne(subRes.lub)}，GLB(∅)={fmtOne(subRes.glb)}）。
                </p>
                <button type="button" className="sbx-btn on" onClick={() => resetDefaultSubset()}>
                  一键恢复默认子集
                </button>
              </div>
            ) : (
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="tag" style={{ marginRight: 6 }}>限 B 内部</span>
                  <strong>极小元 Minimal：</strong><span className="mono">{fmtSet(subRes.minimal)}</span>
                  　|　<strong>最小元 Least：</strong><span className="mono">{fmtOne(subRes.least)}</span>
                </div>
                <div>
                  <span className="tag" style={{ marginRight: 6 }}>限 B 内部</span>
                  <strong>极大元 Maximal：</strong><span className="mono">{fmtSet(subRes.maximal)}</span>
                  　|　<strong>最大元 Greatest：</strong><span className="mono">{fmtOne(subRes.greatest)}</span>
                </div>
                <hr style={{ margin: '.3rem 0', borderTop: '1px dashed var(--line)' }} />
                <div>
                  <span className="tag red" style={{ marginRight: 6 }}>查全集 A</span>
                  <strong>上界 Upper Bounds：</strong><span className="mono">{fmtSet(subRes.upperBounds)}</span>
                  　⇒　<strong style={{ color: 'var(--ok)' }}>LUB = {fmtOne(subRes.lub)}</strong>
                </div>
                <div>
                  <span className="tag red" style={{ marginRight: 6 }}>查全集 A</span>
                  <strong>下界 Lower Bounds：</strong><span className="mono">{fmtSet(subRes.lowerBounds)}</span>
                  　⇒　<strong style={{ color: 'var(--warn)' }}>GLB = {fmtOne(subRes.glb)}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="sbx-panel">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge ok={globRes.isTotalOrder} label="Total Order (全序)" />
              <Badge ok={globRes.isLattice} label="Lattice (格)" />
              <Badge ok={globRes.isBounded} label="Bounded Lattice (有界格)" />
            </div>
            <ul className="text-sm space-y-1" style={{ paddingLeft: '1.1rem', listStyle: 'disc', margin: 0 }}>
              <li>
                <strong>全序判定：</strong>
                {globRes.isTotalOrder
                  ? '任意两元素均可比（单链）。'
                  : `否 —— 例如 ${globRes.incomparablePair[0]} 与 ${globRes.incomparablePair[1]} 互不可比。`}
              </li>
              <li>
                <strong>格（Lattice）判定：</strong>
                {globRes.isLattice
                  ? `是 —— 全集任意一对元素在 A 中都同时拥有唯一的 LUB 和 GLB（全集最小元 0 = ${globRes.leastGlobal}，最大元 1 = ${globRes.greatestGlobal}）。`
                  : `否 —— 反例对 ${globRes.nonLatticeReason}。`}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
