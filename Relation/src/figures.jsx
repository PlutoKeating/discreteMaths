import React from 'react';

const Defs = () => (
  <defs>
    <linearGradient id="rInd" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#5a6fe0" />
      <stop offset="1" stopColor="#1f2a6e" />
    </linearGradient>
    <linearGradient id="rRed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#d9534f" />
      <stop offset="1" stopColor="#7a1414" />
    </linearGradient>
    <linearGradient id="rGrn" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4fcf8f" />
      <stop offset="1" stopColor="#176b42" />
    </linearGradient>
    <linearGradient id="rAmb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f6b93b" />
      <stop offset="1" stopColor="#8f5c00" />
    </linearGradient>
    <linearGradient id="rPaper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor="#ece8dc" />
    </linearGradient>
    <linearGradient id="rShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity=".35" />
      <stop offset=".5" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <filter id="rSh" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity=".26" />
    </filter>
    <marker id="rArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="currentColor" />
    </marker>
    <marker id="rArrD" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="#1d1a16" />
    </marker>
  </defs>
);

function Slab({ x, y, w, h, d = 13, fill, label, sub, fs = 17 }) {
  return (
    <g filter="url(#rSh)">
      <polygon points={`${x + d},${y - d} ${x + w + d},${y - d} ${x + w},${y} ${x},${y}`} fill={fill} opacity=".75" />
      <polygon points={`${x + w},${y} ${x + w + d},${y - d} ${x + w + d},${y + h - d} ${x + w},${y + h}`} fill="#000" opacity=".28" />
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} />
      <rect x={x} y={y} width={w} height={h / 2} rx="6" fill="url(#rShine)" />
      {label && (
        <text x={x + w / 2} y={y + h / 2 + (sub ? -5 : 6)} textAnchor="middle" fill="#fff" fontSize={fs} className="d-text">
          {label}
        </text>
      )}
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill="#fff" fontSize={fs * 0.7} opacity=".92" className="d-body">
          {sub}
        </text>
      )}
    </g>
  );
}

export function HeroFig() {
  return (
    <div className="float">
      <svg viewBox="0 0 560 330" role="img" aria-label="从集合与有序对生长出函数、等价关系与偏序格的结构树">
        <Defs />
        <ellipse cx="280" cy="304" rx="240" ry="16" fill="#000" opacity=".14" />
        <Slab x={34} y={232} w={215} h={56} fill="url(#rInd)" label="集合与笛卡尔积" sub="x ∈ A · (a,b) ∈ A × B" />
        <Slab x={150} y={160} w={230} h={56} fill="url(#rInd)" label="二元关系 R ⊆ A × B" sub="0-1 矩阵 · 有向图 · Warshall" />
        <Slab x={45} y={66} w={215} h={58} fill="url(#rAmb)" label="函数 Function" sub="每行恰一个 1 · 双射可逆" />
        <Slab x={295} y={90} w={225} h={56} fill="url(#rRed)" label="等价关系 ∼" sub="自反+对称+传递 ↔ 划分" />
        <Slab x={315} y={18} w={215} h={56} fill="url(#rGrn)" label="偏序与格 (A, ≼)" sub="自反+反对称+传递 · Hasse" />
        <g stroke="currentColor" strokeWidth="2.2" fill="none" markerEnd="url(#rArr)" opacity=".85">
          <path d="M150 230 C 165 205, 215 205, 230 218" />
          <path d="M210 158 C 190 138, 165 135, 155 126" />
          <path d="M330 158 C 350 142, 370 142, 385 148" />
          <path d="M415 88 C 415 78, 420 78, 422 76" />
        </g>
      </svg>
    </div>
  );
}

export function SetVennFig() {
  return (
    <div className="fig">
      <svg viewBox="0 0 680 250" role="img" aria-label="空集嵌套盒子模型与集合对称差文氏图">
        <Defs />
        <g filter="url(#rSh)">
          <rect x="16" y="18" width="312" height="214" rx="16" fill="url(#rPaper)" stroke="#c9c2b2" />
          <rect x="352" y="18" width="312" height="214" rx="16" fill="url(#rPaper)" stroke="#c9c2b2" />
        </g>
        {/* Left: Empty set vs {Empty set} */}
        <text x="172" y="46" textAnchor="middle" fill="#1d1a16" fontSize="16" className="d-text">
          快递盒拆箱法：∅ vs {'{∅}'} vs {'{∅, {∅}}'}
        </text>
        <rect x="34" y="68" width="76" height="68" rx="10" fill="#fff" stroke="#2d3d8f" strokeWidth="2.2" strokeDasharray="5 4" />
        <text x="72" y="108" textAnchor="middle" fill="#2d3d8f" fontSize="20" className="d-mono" fontWeight="700">
          ∅
        </text>
        <text x="72" y="156" textAnchor="middle" fill="#1d1a16" fontSize="13" className="d-body">
          空盒 |∅| = 0
        </text>

        <rect x="128" y="64" width="88" height="76" rx="12" fill="#e3e7fa" stroke="#2d3d8f" strokeWidth="2.4" />
        <rect x="148" y="80" width="48" height="44" rx="8" fill="#fff" stroke="#8e1b1b" strokeWidth="2" strokeDasharray="4 3" />
        <text x="172" y="108" textAnchor="middle" fill="#8e1b1b" fontSize="16" className="d-mono" fontWeight="700">
          ∅
        </text>
        <text x="172" y="158" textAnchor="middle" fill="#1d1a16" fontSize="13" className="d-body">
          {'|{∅}| = 1（含 ∅）'}
        </text>

        <rect x="232" y="60" width="84" height="84" rx="12" fill="#fbe9e9" stroke="#8e1b1b" strokeWidth="2.4" />
        <text x="252" y="108" textAnchor="middle" fill="#2d3d8f" fontSize="16" className="d-mono" fontWeight="700">
          ∅
        </text>
        <rect x="268" y="80" width="38" height="40" rx="6" fill="#e3e7fa" stroke="#2d3d8f" strokeWidth="1.8" />
        <text x="287" y="105" textAnchor="middle" fill="#8e1b1b" fontSize="13" className="d-mono" fontWeight="700">
          ∅
        </text>
        <text x="274" y="160" textAnchor="middle" fill="#1d1a16" fontSize="13" className="d-body">
          {'|{∅,{∅}}| = 2'}
        </text>

        <text x="172" y="196" textAnchor="middle" fill="#7a1414" fontSize="13" className="d-text">
          ✓ ∅ ∈ {'{∅}'}　✓ {'{∅}'} ⊆ {'{∅,{∅}}'}　✗ {'{∅}'} ∈ {'{∅}'}
        </text>
        <text x="172" y="216" textAnchor="middle" fill="#5d564c" fontSize="12" className="d-body">
          ∈ 只拆最外一层包装；⊆ 逐件比对内部成员
        </text>

        {/* Right: Venn diagram for operations */}
        <text x="508" y="46" textAnchor="middle" fill="#1d1a16" fontSize="16" className="d-text">
          集合四大高频区域：A − B · A ∩ B · A ⊕ B
        </text>
        <circle cx="472" cy="126" r="56" fill="#5a6fe0" fillOpacity=".28" stroke="#2d3d8f" strokeWidth="2.4" />
        <circle cx="544" cy="126" r="56" fill="#d9534f" fillOpacity=".26" stroke="#8e1b1b" strokeWidth="2.4" />
        <text x="438" y="122" textAnchor="middle" fill="#1f2a6e" fontSize="14" className="d-mono" fontWeight="700">
          A − B
        </text>
        <text x="438" y="140" textAnchor="middle" fill="#1f2a6e" fontSize="11" className="d-body">
          只属 A
        </text>
        <text x="508" y="124" textAnchor="middle" fill="#1d1a16" fontSize="14" className="d-mono" fontWeight="700">
          A ∩ B
        </text>
        <text x="508" y="142" textAnchor="middle" fill="#1d1a16" fontSize="11" className="d-body">
          共有
        </text>
        <text x="578" y="122" textAnchor="middle" fill="#7a1414" fontSize="14" className="d-mono" fontWeight="700">
          B − A
        </text>
        <text x="578" y="140" textAnchor="middle" fill="#7a1414" fontSize="11" className="d-body">
          只属 B
        </text>
        <text x="508" y="206" textAnchor="middle" fill="#176b42" fontSize="13" className="d-text">
          对称差 A ⊕ B = (A − B) ∪ (B − A) = 两翼月牙（挖掉中间交集）
        </text>
      </svg>
      <div className="cap">图 1　左：Tutorial 04 必考空集套壳辨析；右：差集与异或（对称差）的几何切分</div>
    </div>
  );
}

export function CompositionOrderFig() {
  return (
    <div className="fig">
      <svg viewBox="0 0 680 220" role="img" aria-label="复合关系 R2 o R1 的路径方向与布尔矩阵乘法左右顺序对照图">
        <Defs />
        <g filter="url(#rSh)">
          <rect x="16" y="16" width="648" height="188" rx="18" fill="url(#rPaper)" stroke="#c9c2b2" />
        </g>
        <rect x="16" y="16" width="648" height="44" rx="18" fill="url(#rRed)" />
        <rect x="16" y="42" width="648" height="18" fill="url(#rRed)" />
        <text x="340" y="44" textAnchor="middle" fill="#fff" fontSize="17" className="d-text">
          Slide 45 保命对齐：为什么求 R₂ ∘ R₁ 时左边必须放 M_R₁、右边放 M_R₂？
        </text>

        {/* Left path */}
        <circle cx="75" cy="122" r="22" fill="#2d3d8f" />
        <text x="75" y="128" textAnchor="middle" fill="#fff" fontSize="17" className="d-mono" fontWeight="700">
          i
        </text>
        <circle cx="190" cy="122" r="22" fill="#8f5c00" />
        <text x="190" y="128" textAnchor="middle" fill="#fff" fontSize="17" className="d-mono" fontWeight="700">
          k
        </text>
        <circle cx="305" cy="122" r="22" fill="#176b42" />
        <text x="305" y="128" textAnchor="middle" fill="#fff" fontSize="17" className="d-mono" fontWeight="700">
          j
        </text>
        <path d="M101 122 L162 122" stroke="#1d1a16" strokeWidth="2.6" markerEnd="url(#rArrD)" />
        <path d="M216 122 L277 122" stroke="#1d1a16" strokeWidth="2.6" markerEnd="url(#rArrD)" />
        <text x="132" y="108" textAnchor="middle" fill="#2d3d8f" fontSize="14" className="d-mono" fontWeight="700">
          第 1 步 R₁
        </text>
        <text x="247" y="108" textAnchor="middle" fill="#176b42" fontSize="14" className="d-mono" fontWeight="700">
          第 2 步 R₂
        </text>
        <path d="M82 148 Q 190 192 298 148" fill="none" stroke="#8e1b1b" strokeWidth="2.4" strokeDasharray="6 4" markerEnd="url(#rArrD)" />
        <text x="190" y="188" textAnchor="middle" fill="#8e1b1b" fontSize="14" className="d-mono" fontWeight="700">
          合成一步：(i, j) ∈ R₂ ∘ R₁
        </text>

        {/* Right matrix order */}
        <rect x="356" y="76" width="286" height="110" rx="12" fill="#fff" stroke="#2d3d8f" strokeWidth="2" />
        <text x="499" y="104" textAnchor="middle" fill="#1d1a16" fontSize="16" className="d-mono" fontWeight="700">
          M_(R₂ ∘ R₁) = M_R₁ ⊙ M_R₂
        </text>
        <text x="499" y="132" textAnchor="middle" fill="#2d3d8f" fontSize="14" className="d-body">
          左矩阵 M_R₁ 贡献第 i 行：(M_R₁)ᵢₖ
        </text>
        <text x="499" y="156" textAnchor="middle" fill="#176b42" fontSize="14" className="d-body">
          右矩阵 M_R₂ 贡献第 j 列：(M_R₂)ₖⱼ
        </text>
        <text x="499" y="177" textAnchor="middle" fill="#7a1414" fontSize="12" className="d-text">
          口诀：右边关系先出发，矩阵乘法站左边！
        </text>
      </svg>
      <div className="cap">图 2　Test 02 第 2d 题核心陷阱：R₂ ∘ R₁ 的中转点 k 先经过 R₁ 再经过 R₂</div>
    </div>
  );
}

export function EquivPartitionFig() {
  const mat = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
  ];
  return (
    <div className="fig">
      <svg viewBox="0 0 680 245" role="img" aria-label="等价关系分块全1矩阵与集合划分的一一对应图">
        <Defs />
        <g filter="url(#rSh)">
          <rect x="16" y="16" width="300" height="212" rx="16" fill="url(#rPaper)" stroke="#c9c2b2" />
          <rect x="364" y="16" width="300" height="212" rx="16" fill="url(#rPaper)" stroke="#c9c2b2" />
        </g>
        <text x="166" y="44" textAnchor="middle" fill="#1d1a16" fontSize="15" className="d-text">
          等价关系矩阵：主对角全 1 方块
        </text>
        {mat.map((row, i) =>
          row.map((v, j) => {
            const inB1 = i < 2 && j < 2;
            const inB2 = i >= 2 && j >= 2;
            const bg = inB1 ? '#2d3d8f' : inB2 ? '#8e1b1b' : '#ebe6d9';
            return (
              <g key={`${i}-${j}`}>
                <rect x={68 + j * 38} y={58 + i * 30} width="34" height="26" rx="5" fill={bg} />
                <text
                  x={85 + j * 38}
                  y={76 + i * 30}
                  textAnchor="middle"
                  fill={v ? '#fff' : '#7a7265'}
                  fontSize="14"
                  className="d-mono"
                  fontWeight="700"
                >
                  {v}
                </text>
              </g>
            );
          })
        )}

        <path d="M324 122 L356 122" stroke="currentColor" strokeWidth="2.8" markerEnd="url(#rArr)" />
        <text x="340" y="108" textAnchor="middle" fill="currentColor" fontSize="13" className="d-mono" fontWeight="700">
          ⇔
        </text>

        <text x="514" y="44" textAnchor="middle" fill="#1d1a16" fontSize="15" className="d-text">
          集合划分 Partition（不重不漏）
        </text>
        <rect x="392" y="64" width="244" height="132" rx="16" fill="#fff" stroke="#1d1a16" strokeWidth="2" />
        <rect x="402" y="74" width="102" height="112" rx="12" fill="#e3e7fa" stroke="#2d3d8f" strokeWidth="2.2" />
        <rect x="514" y="74" width="112" height="112" rx="12" fill="#fbe9e9" stroke="#8e1b1b" strokeWidth="2.2" />
        <text x="453" y="106" textAnchor="middle" fill="#2d3d8f" fontSize="15" className="d-mono" fontWeight="700">
          A₁ = [1]_R
        </text>
        <text x="453" y="136" textAnchor="middle" fill="#1d1a16" fontSize="16" className="d-mono" fontWeight="700">
          {'{1, 2}'}
        </text>
        <text x="453" y="166" textAnchor="middle" fill="#5d564c" fontSize="12" className="d-body">
          2² = 4 对
        </text>
        <text x="570" y="106" textAnchor="middle" fill="#8e1b1b" fontSize="15" className="d-mono" fontWeight="700">
          A₂ = [3]_R
        </text>
        <text x="570" y="136" textAnchor="middle" fill="#1d1a16" fontSize="16" className="d-mono" fontWeight="700">
          {'{3, 4, 5}'}
        </text>
        <text x="570" y="166" textAnchor="middle" fill="#5d564c" fontSize="12" className="d-body">
          3² = 9 对
        </text>
        <text x="514" y="214" textAnchor="middle" fill="#176b42" fontSize="12.5" className="d-text">
          R = (A₁ × A₁) ∪ (A₂ × A₂)，共 4 + 9 = 13 个有序对（Slides 5.5 p13）
        </text>
      </svg>
      <div className="cap">图 3　等价关系与集合划分的双向同构：每个等价类内部全连通，类与类之间完全绝缘</div>
    </div>
  );
}
