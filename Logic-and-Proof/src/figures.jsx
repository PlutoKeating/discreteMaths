import React from 'react';

const Defs = () => (
  <defs>
    <linearGradient id="gInd" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#5a6fe0"/><stop offset="1" stopColor="#1f2a6e"/>
    </linearGradient>
    <linearGradient id="gRed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#d9534f"/><stop offset="1" stopColor="#7a1414"/>
    </linearGradient>
    <linearGradient id="gGrn" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#4fcf8f"/><stop offset="1" stopColor="#176b42"/>
    </linearGradient>
    <linearGradient id="gAmb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffd46a"/><stop offset="1" stopColor="#9a6b00"/>
    </linearGradient>
    <linearGradient id="gPaper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#ece8dc"/>
    </linearGradient>
    <linearGradient id="gShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity=".35"/><stop offset=".5" stopColor="#fff" stopOpacity="0"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity=".28"/>
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="currentColor"/>
    </marker>
    <marker id="arrD" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="#1d1a16"/>
    </marker>
    <marker id="arrW" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="#fff"/>
    </marker>
  </defs>
);

/* A 3D slab: top face + front face + side face */
export function Slab({x,y,w,h,d=14,fill,children,label,sub,fs=18}){
  return (
    <g filter="url(#sh)">
      <polygon points={`${x+d},${y-d} ${x+w+d},${y-d} ${x+w},${y} ${x},${y}`} fill={fill} opacity=".75"/>
      <polygon points={`${x+w},${y} ${x+w+d},${y-d} ${x+w+d},${y+h-d} ${x+w},${y+h}`} fill="#000" opacity=".28"/>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill}/>
      <rect x={x} y={y} width={w} height={h/2} rx="6" fill="url(#gShine)"/>
      {label && <text x={x+w/2} y={y+h/2+(sub? -4: 6)} textAnchor="middle" fill="#fff" fontSize={fs} className="d-text">{label}</text>}
      {sub && <text x={x+w/2} y={y+h/2+16} textAnchor="middle" fill="#fff" fontSize={fs*0.72} opacity=".9" className="d-body">{sub}</text>}
      {children}
    </g>
  );
}

export function HeroFig(){
  return (
    <div className="float">
      <svg viewBox="0 0 560 330" role="img" aria-label="从真值到证明的四层台阶">
        <Defs/>
        <ellipse cx="280" cy="300" rx="240" ry="18" fill="#000" opacity=".12"/>
        <Slab x={40} y={230} w={200} h={56} fill="url(#gInd)" label="真值 T / F" sub="一切的底层"/>
        <Slab x={150} y={160} w={220} h={56} fill="url(#gInd)" label="命题逻辑" sub="¬ ∧ ∨ → ↔ ・等价律・推理规则"/>
        <Slab x={260} y={90} w={220} h={56} fill="url(#gRed)" label="谓词逻辑" sub="P(x) + ∀ ∃ ・量词定律"/>
        <Slab x={330} y={20} w={190} h={56} fill="url(#gGrn)" label="证明方法" sub="直接・逆否・反证・唯一"/>
        <g stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arr)" opacity=".8">
          <path d="M140 228 C 140 200, 200 200, 220 218"/>
          <path d="M250 158 C 250 130, 310 130, 330 148"/>
          <path d="M360 88 C 360 60, 400 60, 410 78"/>
        </g>
        <text x="60" y="40" className="d-text" fill="currentColor" fontSize="15" opacity=".85">每一层都只是</text>
        <text x="60" y="62" className="d-text" fill="currentColor" fontSize="15" opacity=".85">下一层的"真值计算"</text>
      </svg>
    </div>
  );
}

export function ImplicationFig(){
  const rows = [['T','T','T'],['T','F','F'],['F','T','T'],['F','F','T']];
  return (
    <div className="fig">
      <svg viewBox="0 0 640 300">
        <Defs/>
        <g filter="url(#sh)">
          <rect x="20" y="20" width="300" height="250" rx="18" fill="url(#gPaper)" stroke="#c9c2b2"/>
        </g>
        <rect x="20" y="20" width="300" height="46" rx="18" fill="url(#gInd)"/>
        <rect x="20" y="48" width="300" height="18" fill="url(#gInd)"/>
        {['p','q','p → q'].map((t,i)=>(<text key={t} x={70+i*100} y="51" fill="#fff" fontSize="20" textAnchor="middle" className="d-mono" fontWeight="700">{t}</text>))}
        {rows.map((r,i)=>(
          <g key={i}>
            {i===1 && <rect x="28" y={78+i*46} width="284" height="40" rx="10" fill="url(#gRed)" filter="url(#glow)"/>}
            {r.map((c,j)=>(<text key={j} x={70+j*100} y={105+i*46} textAnchor="middle" fontSize="22" className="d-mono" fontWeight="700" fill={i===1?'#fff':'#1d1a16'}>{c}</text>))}
          </g>
        ))}
        <g fill="currentColor">
          <text x="350" y="60" fontSize="19" className="d-text">只有一行是 F</text>
          <text x="350" y="86" fontSize="15" className="d-body" opacity=".85">p 真、q 假 = "承诺跳票"</text>
          <text x="350" y="130" fontSize="19" className="d-text">前件 p 为假的两行</text>
          <text x="350" y="156" fontSize="15" className="d-body" opacity=".85">整句自动为 T（"空话也算对"）</text>
          <text x="350" y="180" fontSize="15" className="d-body" opacity=".85">所以 ¬p 推不出任何关于 q 的事</text>
          <text x="350" y="224" fontSize="19" className="d-text">后件 q 为真的两行</text>
          <text x="350" y="250" fontSize="15" className="d-body" opacity=".85">p 可真可假 ⇒ q 也推不出 p</text>
        </g>
        <path d="M335 100 L 322 100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arr)"/>
      </svg>
      <div className="cap">图 1　p → q 的真值表：第 2 行是全部逻辑陷阱的来源</div>
    </div>
  );
}

export function ArrowRulesFig(){
  const Box = ({x,y,ok,title,lines}) => (
    <g>
      <g filter="url(#sh)">
        <polygon points={`${x},${y+10} ${x+10},${y} ${x+280},${y} ${x+290},${y+10} ${x+290},${y+110} ${x+280},${y+120} ${x+10},${y+120} ${x},${y+110}`}
          fill={ok?'url(#gGrn)':'url(#gRed)'}/>
        <polygon points={`${x},${y+10} ${x+10},${y} ${x+280},${y} ${x+290},${y+10} ${x+290},${y+50} ${x},${y+50}`} fill="url(#gShine)"/>
      </g>
      <text x={x+16} y={y+30} fill="#fff" fontSize="18" className="d-text">{ok?'✓ ':'✗ '}{title}</text>
      {lines.map((l,i)=>(<text key={i} x={x+16} y={y+60+i*24} fill="#fff" fontSize="15" className="d-mono">{l}</text>))}
    </g>
  );
  return (
    <div className="fig">
      <svg viewBox="0 0 640 300">
        <Defs/>
        <Box x={15} y={15} ok title="Modus Ponens 肯定前件" lines={['p → q,  p','∴ q']}/>
        <Box x={335} y={15} ok title="Modus Tollens 否定后件" lines={['p → q,  ¬q','∴ ¬p']}/>
        <Box x={15} y={160} ok={false} title="肯定后件谬误" lines={['p → q,  q','∴ p   （推不出）']}/>
        <Box x={335} y={160} ok={false} title="否定前件谬误" lines={['p → q,  ¬p','∴ ¬q  （推不出）']}/>
      </svg>
      <div className="cap">图 2　四种组合里只有两种能动：手里是"肯定的前件"或"否定的后件"</div>
    </div>
  );
}

export function GameFig(){
  const Person = ({x,y,color,label}) => (
    <g filter="url(#sh)">
      <circle cx={x} cy={y} r="16" fill={color}/>
      <path d={`M${x-26} ${y+54} q26 -40 52 0z`} fill={color}/>
      <text x={x} y={y+78} textAnchor="middle" fontSize="14" fill="currentColor" className="d-text">{label}</text>
    </g>
  );
  const Panel = ({x,title,first,second,verdict,ok,formula,note}) => (
    <g>
      <g filter="url(#sh)"><rect x={x} y="20" width="300" height="270" rx="20" fill="url(#gPaper)" stroke="#c9c2b2"/></g>
      <rect x={x} y="20" width="300" height="54" rx="20" fill={ok?'url(#gGrn)':'url(#gRed)'}/>
      <rect x={x} y="50" width="300" height="24" fill={ok?'url(#gGrn)':'url(#gRed)'}/>
      <text x={x+150} y="54" textAnchor="middle" fill="#fff" fontSize="22" className="d-mono" fontWeight="700">{formula}</text>
      <Person x={x+70} y={120} color={first.me?'#2d3d8f':'#7a1414'} label={first.who}/>
      <Person x={x+230} y={120} color={second.me?'#2d3d8f':'#7a1414'} label={second.who}/>
      <path d={`M${x+100} 125 L ${x+200} 125`} stroke="#1d1a16" strokeWidth="2.5" markerEnd="url(#arrD)"/>
      <text x={x+150} y="115" textAnchor="middle" fontSize="12" fill="#1d1a16" className="d-body">先选 → 后选</text>
      <text x={x+70} y="222" textAnchor="middle" fontSize="13" fill="#1d1a16" className="d-body">{first.pick}</text>
      <text x={x+230} y="222" textAnchor="middle" fontSize="13" fill="#1d1a16" className="d-body">{second.pick}</text>
      <rect x={x+20} y="240" width="260" height="36" rx="10" fill={ok?'#176b42':'#7a1414'}/>
      <text x={x+150} y="264" textAnchor="middle" fill="#fff" fontSize="15" className="d-text">{verdict}</text>
    </g>
  );
  return (
    <div className="fig">
      <svg viewBox="0 0 640 310">
        <Defs/>
        <Panel x={10} formula="∃y ∀x (x+y=10)" ok={false}
          first={{who:'我 (∃) 先定 y',me:true,pick:'y = 7'}}
          second={{who:'对手 (∀) 任选 x',me:false,pick:'x = 0 → 7 ≠ 10'}}
          verdict="对手总能拆台 ⇒ 假"/>
        <Panel x={330} formula="∀y ∃x (x+y=10)" ok
          first={{who:'对手 (∀) 先定 y',me:false,pick:'y = 7'}}
          second={{who:'我 (∃) 看牌选 x',me:true,pick:'x = 10 − 7 = 3'}}
          verdict="我总有应手 ⇒ 真"/>
      </svg>
      <div className="cap">图 3　量词顺序的博弈读法：∀ 是对手任选，∃ 是我来选，后手能看前手的牌</div>
    </div>
  );
}

export function QuantPairFig(){
  return (
    <div className="fig">
      <svg viewBox="0 0 640 230">
        <Defs/>
        <g filter="url(#sh)">
          <rect x="15" y="15" width="295" height="200" rx="18" fill="url(#gInd)"/>
          <rect x="330" y="15" width="295" height="200" rx="18" fill="url(#gRed)"/>
        </g>
        <rect x="15" y="15" width="295" height="100" rx="18" fill="url(#gShine)"/>
        <rect x="330" y="15" width="295" height="100" rx="18" fill="url(#gShine)"/>
        <text x="162" y="52" textAnchor="middle" fill="#fff" fontSize="24" className="d-mono" fontWeight="700">∀ 配 →</text>
        <text x="477" y="52" textAnchor="middle" fill="#fff" fontSize="24" className="d-mono" fontWeight="700">∃ 配 ∧</text>
        <text x="162" y="86" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">∀ 是一长串 ∧</text>
        <text x="162" y="110" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">不满足 S 的元素要"放行"</text>
        <text x="162" y="134" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">→ 在前件假时自动为 T</text>
        <text x="162" y="175" textAnchor="middle" fill="#fff" fontSize="17" className="d-mono" fontWeight="700">∀x (S(x) → L(x))</text>
        <text x="477" y="86" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">∃ 是一长串 ∨</text>
        <text x="477" y="110" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">必须真的"找到一个"</text>
        <text x="477" y="134" textAnchor="middle" fill="#fff" fontSize="15" className="d-body">既是 S 又是 L</text>
        <text x="477" y="175" textAnchor="middle" fill="#fff" fontSize="17" className="d-mono" fontWeight="700">∃x (S(x) ∧ L(x))</text>
      </svg>
      <div className="cap">图 4　翻译题最大陷阱：量词与联结词的固定搭配</div>
    </div>
  );
}

export function UniqueFig(){
  return (
    <div className="fig">
      <svg viewBox="0 0 640 220">
        <Defs/>
        <Slab x={30} y={60} w={250} h={90} d={16} fill="url(#gInd)" label="① Existence 存在" sub="构造 q = ⌊a/n⌋, r = a − nq" fs={20}/>
        <Slab x={350} y={60} w={250} h={90} d={16} fill="url(#gRed)" label="② Uniqueness 唯一" sub="设两组解 → 相减 → 推出相等" fs={20}/>
        <text x="315" y="112" textAnchor="middle" fontSize="34" fill="currentColor" className="d-text">+</text>
        <text x="320" y="195" textAnchor="middle" fontSize="16" fill="currentColor" className="d-text">∃!x P(x) ≡ ∃x ( P(x) ∧ ∀y ( P(y) → y = x ) )</text>
      </svg>
      <div className="cap">图 5　"unique" 必须两段都写，缺一段最多拿一半分</div>
    </div>
  );
}

