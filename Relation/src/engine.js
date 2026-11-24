// Pure Discrete Mathematics computation engine for Relations, Closures, Posets/Lattices, and Functions.

export const cloneMat = (m) => m.map((r) => [...r]);

export const matTranspose = (m) => {
  const rows = m.length;
  const cols = m[0]?.length || 0;
  return Array.from({ length: cols }, (_, i) => Array.from({ length: rows }, (__, j) => (m[j][i] ? 1 : 0)));
};

export const matComplement = (m) => m.map((r) => r.map((v) => (v ? 0 : 1)));

export const matUnion = (a, b) => a.map((r, i) => r.map((v, j) => (v || b[i][j] ? 1 : 0)));

export const matIntersect = (a, b) => a.map((r, i) => r.map((v, j) => (v && b[i][j] ? 1 : 0)));

export const matXor = (a, b) => a.map((r, i) => r.map((v, j) => ((v ? 1 : 0) !== (b[i][j] ? 1 : 0) ? 1 : 0)));

// Computes M_{R2 o R1} where R1 acts FIRST (mFirst) and R2 acts SECOND (mSecond):
// (M_{R2 o R1})_{ij} = OR_k ( (mFirst)_{ik} AND (mSecond)_{kj} )
export const matBooleanProduct = (mFirst, mSecond) => {
  const m = mFirst.length;
  const p = mFirst[0]?.length || 0;
  const n = mSecond[0]?.length || 0;
  return Array.from({ length: m }, (_, i) =>
    Array.from({ length: n }, (__, j) => {
      for (let k = 0; k < p; k += 1) {
        if (mFirst[i][k] && mSecond[k][j]) return 1;
      }
      return 0;
    })
  );
};

export const matReflexiveClosure = (m) =>
  m.map((r, i) => r.map((v, j) => (i === j ? 1 : v ? 1 : 0)));

export const matSymmetricClosure = (m) => matUnion(m, matTranspose(m));

// Warshall's Algorithm: returns [W0, W1, ..., Wn], each { k, matrix, added: [[i,j], ...] }
export function warshallSteps(m) {
  const n = m.length;
  let cur = cloneMat(m);
  const steps = [{ k: 0, matrix: cloneMat(cur), added: [] }];
  for (let k = 0; k < n; k += 1) {
    const next = cloneMat(cur);
    const added = [];
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (!next[i][j] && cur[i][k] && cur[k][j]) {
          next[i][j] = 1;
          added.push([i, j]);
        }
      }
    }
    cur = next;
    steps.push({ k: k + 1, matrix: cloneMat(cur), added });
  }
  return steps;
}

export function analyzeRelationMatrix(m, labels) {
  const n = m.length;
  const L = labels || Array.from({ length: n }, (_, i) => String(i + 1));

  // Reflexive
  let missDiag = null;
  for (let i = 0; i < n; i += 1) {
    if (!m[i][i]) {
      missDiag = L[i];
      break;
    }
  }
  const reflexive =
    missDiag === null
      ? { ok: true, reason: '主对角线全为 1：∀a, (a,a)∈R' }
      : { ok: false, reason: `反例：(${missDiag},${missDiag})∉R（对角线含 0）` };

  // Irreflexive
  let hitDiag = null;
  for (let i = 0; i < n; i += 1) {
    if (m[i][i]) {
      hitDiag = L[i];
      break;
    }
  }
  const irreflexive =
    hitDiag === null
      ? { ok: true, reason: '主对角线全为 0：∀a, (a,a)∉R' }
      : { ok: false, reason: `反例：(${hitDiag},${hitDiag})∈R（对角线含 1）` };

  // Symmetric
  let asymPair = null;
  for (let i = 0; i < n && !asymPair; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (m[i][j] && !m[j][i]) {
        asymPair = [L[i], L[j]];
        break;
      }
    }
  }
  const symmetric = !asymPair
    ? { ok: true, reason: 'M = Mᵀ：所有有向边均成对双向（或无非对称边）' }
    : { ok: false, reason: `反例：(${asymPair[0]},${asymPair[1]})∈R 但 (${asymPair[1]},${asymPair[0]})∉R` };

  // Antisymmetric
  let twoWay = null;
  for (let i = 0; i < n && !twoWay; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (m[i][j] && m[j][i]) {
        twoWay = [L[i], L[j]];
        break;
      }
    }
  }
  const antisymmetric = !twoWay
    ? { ok: true, reason: '异点间无双向边：i≠j 时 mᵢⱼ 与 mⱼᵢ 不同时为 1' }
    : { ok: false, reason: `反例：(${twoWay[0]},${twoWay[1]})∈R 且 (${twoWay[1]},${twoWay[0]})∈R，但 ${twoWay[0]}≠${twoWay[1]}` };

  // Asymmetric (= irreflexive + antisymmetric)
  const asymmetric =
    irreflexive.ok && antisymmetric.ok
      ? { ok: true, reason: '对角线全 0 且无双向边（反自反 + 反对称）' }
      : { ok: false, reason: !irreflexive.ok ? irreflexive.reason : antisymmetric.reason };

  // Transitive
  let nonTrans = null;
  for (let i = 0; i < n && !nonTrans; i += 1) {
    for (let k = 0; k < n && !nonTrans; k += 1) {
      if (!m[i][k]) continue;
      for (let j = 0; j < n; j += 1) {
        if (m[k][j] && !m[i][j]) {
          nonTrans = [L[i], L[k], L[j]];
          break;
        }
      }
    }
  }
  const transitive = !nonTrans
    ? { ok: true, reason: 'M^{[2]} ≤ M：任意两步路径均有一步直达边（或无两步链，空真）' }
    : {
        ok: false,
        reason: `反例：(${nonTrans[0]},${nonTrans[1]})∈R 且 (${nonTrans[1]},${nonTrans[2]})∈R，但 (${nonTrans[0]},${nonTrans[2]})∉R`,
      };

  // Function (every row has sum === 1)
  let badRow = null;
  for (let i = 0; i < n; i += 1) {
    const ones = m[i].reduce((acc, v, j) => (v ? [...acc, L[j]] : acc), []);
    if (ones.length !== 1) {
      badRow = { src: L[i], targets: ones };
      break;
    }
  }
  const fnProp = !badRow
    ? { ok: true, reason: '每行恰有一个 1：每个元素对应唯一输出' }
    : badRow.targets.length === 0
      ? { ok: false, reason: `非函数：元素 ${badRow.src} 没有对应像（第 ${badRow.src} 行全为 0）` }
      : {
          ok: false,
          reason: `非函数：元素 ${badRow.src} 对应多个像 {${badRow.targets.join(', ')}}`,
        };

  const equivalence =
    reflexive.ok && symmetric.ok && transitive.ok
      ? { ok: true, reason: '同时满足自反 + 对称 + 传递' }
      : {
          ok: false,
          reason: `缺少：${[
            !reflexive.ok && '自反',
            !symmetric.ok && '对称',
            !transitive.ok && '传递',
          ]
            .filter(Boolean)
            .join('、')}`,
        };

  const partialOrder =
    reflexive.ok && antisymmetric.ok && transitive.ok
      ? { ok: true, reason: '同时满足自反 + 反对称 + 传递' }
      : {
          ok: false,
          reason: `缺少：${[
            !reflexive.ok && '自反',
            !antisymmetric.ok && '反对称',
            !transitive.ok && '传递',
          ]
            .filter(Boolean)
            .join('、')}`,
        };

  return {
    reflexive,
    irreflexive,
    symmetric,
    antisymmetric,
    asymmetric,
    transitive,
    function: fnProp,
    equivalence,
    partialOrder,
  };
}

// Poset & Hasse builder
export function buildPoset(elements, leqFn, customPositions = null) {
  const n = elements.length;
  const matrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (__, j) => (leqFn(elements[i], elements[j]) ? 1 : 0))
  );

  // Covering relation: i < j and no k with i < k < j
  const covers = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === j || !matrix[i][j]) continue;
      let between = false;
      for (let k = 0; k < n; k += 1) {
        if (k !== i && k !== j && matrix[i][k] && matrix[k][j]) {
          between = true;
          break;
        }
      }
      if (!between) covers.push([i, j]);
    }
  }

  // Rank/height by longest strict chain ending at i
  const rank = Array(n).fill(0);
  let changed = true;
  while (changed) {
    changed = false;
    for (const [u, v] of covers) {
      if (rank[v] < rank[u] + 1) {
        rank[v] = rank[u] + 1;
        changed = true;
      }
    }
  }
  const maxRank = Math.max(0, ...rank);
  const levels = Array.from({ length: maxRank + 1 }, () => []);
  rank.forEach((r, idx) => levels[r].push(idx));

  return { elements, matrix, covers, levels, rank, customPositions };
}

export function analyzePosetSubset(poset, subsetIndices) {
  const { elements, matrix } = poset;
  const n = elements.length;
  const B = [...new Set(subsetIndices)].sort((a, b) => a - b);

  if (B.length === 0) {
    const allBounds = Array.from({ length: n }, (_, i) => i);
    const glbEmpty = allBounds.filter((l) => allBounds.every((x) => matrix[x][l]));
    const lubEmpty = allBounds.filter((u) => allBounds.every((x) => matrix[u][x]));
    return {
      empty: true,
      minimal: [],
      maximal: [],
      least: null,
      greatest: null,
      lowerBounds: allBounds,
      upperBounds: allBounds,
      glb: glbEmpty.length === 1 ? glbEmpty[0] : null,
      lub: lubEmpty.length === 1 ? lubEmpty[0] : null,
    };
  }

  const minimal = B.filter((b) => !B.some((x) => x !== b && matrix[x][b]));
  const maximal = B.filter((b) => !B.some((x) => x !== b && matrix[b][x]));
  const leastList = B.filter((b) => B.every((x) => matrix[b][x]));
  const greatestList = B.filter((b) => B.every((x) => matrix[x][b]));
  const least = leastList.length === 1 ? leastList[0] : null;
  const greatest = greatestList.length === 1 ? greatestList[0] : null;

  const lowerBounds = [];
  const upperBounds = [];
  for (let a = 0; a < n; a += 1) {
    if (B.every((b) => matrix[a][b])) lowerBounds.push(a);
    if (B.every((b) => matrix[b][a])) upperBounds.push(a);
  }

  // GLB = greatest of lowerBounds; LUB = least of upperBounds
  const glbList = lowerBounds.filter((l) => lowerBounds.every((x) => matrix[x][l]));
  const lubList = upperBounds.filter((u) => upperBounds.every((x) => matrix[u][x]));

  return {
    empty: false,
    minimal,
    maximal,
    least,
    greatest,
    lowerBounds,
    upperBounds,
    glb: glbList.length === 1 ? glbList[0] : null,
    lub: lubList.length === 1 ? lubList[0] : null,
  };
}

export function analyzePosetGlobal(poset) {
  const { elements, matrix } = poset;
  const n = elements.length;

  let incomparablePair = null;
  for (let i = 0; i < n && !incomparablePair; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      if (!matrix[i][j] && !matrix[j][i]) {
        incomparablePair = [elements[i], elements[j]];
        break;
      }
    }
  }

  let nonLatticePair = null;
  let nonLatticeReason = '';
  for (let i = 0; i < n && !nonLatticePair; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const sub = analyzePosetSubset(poset, [i, j]);
      if (sub.lub === null || sub.glb === null) {
        nonLatticePair = [elements[i], elements[j]];
        const miss = [];
        if (sub.lub === null) {
          miss.push(
            sub.upperBounds.length === 0
              ? '无公共上界'
              : `上界 {${sub.upperBounds.map((u) => elements[u]).join(', ')}} 无最小元（无唯一 LUB）`
          );
        }
        if (sub.glb === null) {
          miss.push(
            sub.lowerBounds.length === 0
              ? '无公共下界'
              : `下界 {${sub.lowerBounds.map((l) => elements[l]).join(', ')}} 无最大元（无唯一 GLB）`
          );
        }
        nonLatticeReason = `{${elements[i]}, ${elements[j]}} ${miss.join('；')}`;
        break;
      }
    }
  }

  const allIdx = Array.from({ length: n }, (_, i) => i);
  const full = analyzePosetSubset(poset, allIdx);
  const isLattice = !nonLatticePair;

  return {
    isTotalOrder: !incomparablePair,
    incomparablePair,
    isLattice,
    nonLatticePair,
    nonLatticeReason,
    isBounded: isLattice && full.least !== null && full.greatest !== null,
    leastGlobal: full.least !== null ? elements[full.least] : null,
    greatestGlobal: full.greatest !== null ? elements[full.greatest] : null,
  };
}

export function analyzeDiscreteFunction(domain, codomain, pairs) {
  const outMap = new Map(domain.map((d) => [d, []]));
  const inMap = new Map(codomain.map((c) => [c, []]));
  for (const [d, c] of pairs) {
    if (outMap.has(d)) outMap.get(d).push(c);
    if (inMap.has(c)) inMap.get(c).push(d);
  }
  let missingSrc = null;
  let multiSrc = null;
  for (const [d, arr] of outMap.entries()) {
    if (arr.length === 0 && !missingSrc) missingSrc = d;
    if (arr.length > 1 && !multiSrc) multiSrc = { d, arr };
  }
  const isFunction = !missingSrc && !multiSrc;
  if (!isFunction) {
    return {
      isFunction: false,
      isInjective: false,
      isSurjective: false,
      isBijective: false,
      reason: multiSrc
        ? `元素 ${multiSrc.d} 发出了 ${multiSrc.arr.length} 条箭头 → 违反单值性，不是函数`
        : `定义域元素 ${missingSrc} 没有输出像 → 违反全定义性，不是函数`,
    };
  }
  let collision = null;
  let missedCod = null;
  for (const [c, srcs] of inMap.entries()) {
    if (srcs.length > 1 && !collision) collision = { c, srcs };
    if (srcs.length === 0 && !missedCod) missedCod = c;
  }
  const isInjective = !collision;
  const isSurjective = !missedCod;
  const isBijective = isInjective && isSurjective;
  return {
    isFunction: true,
    isInjective,
    isSurjective,
    isBijective,
    injectiveReason: isInjective
      ? '余域每个元素至多收到 1 条箭头（f(a)=f(b) ⇒ a=b）'
      : `反例：f(${collision.srcs[0]}) = f(${collision.srcs[1]}) = ${collision.c}`,
    surjectiveReason: isSurjective
      ? '余域每个元素至少收到 1 条箭头（Range = Codomain）'
      : `反例：余域元素 ${missedCod} 没有原像`,
  };
}

export function analyzeRestrictedAbsHalf(domainKey, codomainKey) {
  // h(x) = |x / 2|
  const isInjective = domainKey === 'R>=0' || domainKey === 'R<=0';
  const isSurjective = codomainKey === 'R>=0';
  const isBijective = isInjective && isSurjective;
  let inverseFormula = '不存在（非双射不可逆）';
  if (isBijective) {
    inverseFormula = domainKey === 'R>=0' ? 'h⁻¹(y) = 2y  (y ≥ 0)' : 'h⁻¹(y) = -2y  (y ≥ 0)';
  }
  return {
    domainLabel: domainKey === 'R' ? 'ℝ = (-∞, +∞)' : domainKey === 'R>=0' ? '[0, +∞)' : '(-∞, 0]',
    codomainLabel: codomainKey === 'R' ? 'ℝ = (-∞, +∞)' : '[0, +∞)',
    rangeLabel: '[0, +∞)',
    isInjective,
    isSurjective,
    isBijective,
    injectiveNote: isInjective
      ? `在 ${domainKey === 'R>=0' ? '[0, +∞)' : '(-∞, 0]'} 上严格单调，水平线至多交图像 1 点`
      : '反例：h(-2) = h(2) = 1，水平线 y = 1 与图像交于两点',
    surjectiveNote: isSurjective
      ? '对任意 y ∈ [0, +∞)，取 x = ' + (domainKey === 'R<=0' ? '-2y' : '2y') + ' 即可得 h(x) = y'
      : '反例：-1 ∈ ℝ 没有原像（因为 |x/2| ≥ 0 恒成立）',
    inverseFormula,
  };
}

// Presets for RelationMatrixLab
export const PRESET_MATRICES = {
  test02_q2: {
    name: 'Test 02 第 2 题（3×3 双矩阵）',
    labels: ['1', '2', '3'],
    m1: [
      [0, 1, 1],
      [1, 0, 0],
      [0, 1, 1],
    ],
    m2: [
      [1, 0, 1],
      [1, 0, 0],
      [0, 1, 1],
    ],
  },
  tut05_q3: {
    name: 'Tutorial 05 Q3（3×3 双矩阵）',
    labels: ['1', '2', '3'],
    m1: [
      [0, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    m2: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 0],
    ],
  },
  tut05_q8: {
    name: 'Tutorial 05 Q8（4×4 Warshall 经典）',
    labels: ['0', '1', '2', '3'],
    m1: [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [1, 0, 1, 0],
      [1, 0, 0, 0],
    ],
    m2: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ],
  },
  equiv_blocks: {
    name: '等价关系分块矩阵（{0,1,2,3}）',
    labels: ['0', '1', '2', '3'],
    m1: [
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
    ],
    m2: [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ],
  },
};

const divides = (a, b) => b % a === 0;

// Presets for HassePosetLab
export const PRESET_POSETS = {
  test02_q5: {
    name: 'Test 02 第 5 题：({1,5,10,13,65,650}, |)',
    relationDesc: 'a R b ⇔ a | b（整除）',
    poset: buildPoset([1, 5, 10, 13, 65, 650], divides),
    quickSubsets: [
      { label: 'Q5b 子集 {5,10,13}', values: [5, 10, 13] },
      { label: 'Q5c 子集 {5,10,65}', values: [5, 10, 65] },
      { label: 'Q5d 子集 {13,65}', values: [13, 65] },
      { label: 'Q5e 子集 {10,65}', values: [10, 65] },
      { label: 'Q5g 神坑 {10,13}（lcm=130∉A 但 LUB=650!）', values: [10, 13] },
      { label: '全集 A', values: [1, 5, 10, 13, 65, 650] },
    ],
  },
  tut06_q12: {
    name: 'Tutorial 06 Q12：({3,5,9,15,24,45}, |)',
    relationDesc: 'a R b ⇔ a | b（无最大/最小元、非格）',
    poset: buildPoset([3, 5, 9, 15, 24, 45], divides),
    quickSubsets: [
      { label: 'Q12a/b 全集极值', values: [3, 5, 9, 15, 24, 45] },
      { label: 'Q12e/f 子集 {3,5}', values: [3, 5] },
      { label: 'Q12g/h 子集 {15,45}', values: [15, 45] },
      { label: '非格反例 {9,24}（无公共上界）', values: [9, 24] },
    ],
  },
  powerset3: {
    name: '幂集有补布尔格：(P({a,b,c}), ⊆)',
    relationDesc: 'X R Y ⇔ X ⊆ Y（Slide 33/35 有界有补格）',
    poset: (() => {
      const sets = [
        { label: '∅', mask: 0 },
        { label: '{a}', mask: 1 },
        { label: '{b}', mask: 2 },
        { label: '{c}', mask: 4 },
        { label: '{a,b}', mask: 3 },
        { label: '{a,c}', mask: 5 },
        { label: '{b,c}', mask: 6 },
        { label: '{a,b,c}', mask: 7 },
      ];
      const p = buildPoset(
        sets.map((s) => s.label),
        (la, lb) => {
          const ma = sets.find((s) => s.label === la).mask;
          const mb = sets.find((s) => s.label === lb).mask;
          return (ma & mb) === ma;
        }
      );
      return p;
    })(),
    quickSubsets: [
      { label: '{{a}, {b}} → LUB={a,b}', values: ['{a}', '{b}'] },
      { label: '{{a,b}, {b,c}} → GLB={b}', values: ['{a,b}', '{b,c}'] },
      { label: '互补对 {{a}, {b,c}}', values: ['{a}', '{b,c}'] },
    ],
  },
  bowtie: {
    name: '蝴蝶图反例（有公共上界但无 LUB ⇒ 非格）',
    relationDesc: 'a,b 均小于 c,d，但 c 与 d 不可比',
    poset: (() => {
      const els = ['a', 'b', 'c', 'd'];
      const rel = new Set(['a<=a', 'b<=b', 'c<=c', 'd<=d', 'a<=c', 'a<=d', 'b<=c', 'b<=d']);
      return buildPoset(els, (x, y) => rel.has(`${x}<=${y}`));
    })(),
    quickSubsets: [
      { label: '{a, b}（上界 {c,d} 无最小元！）', values: ['a', 'b'] },
      { label: '{c, d}（下界 {a,b} 无最大元！）', values: ['c', 'd'] },
    ],
  },
};

export const PRESET_FUNCTIONS = [
  {
    id: 'bijection',
    label: '双射 Bijection（可逆）',
    domain: ['a', 'b', 'c'],
    codomain: ['1', '2', '3'],
    pairs: [
      ['a', '2'],
      ['b', '3'],
      ['c', '1'],
    ],
  },
  {
    id: 'injective_only',
    label: '仅单射 One-to-One（非满射）',
    domain: ['a', 'b', 'c'],
    codomain: ['1', '2', '3', '4'],
    pairs: [
      ['a', '1'],
      ['b', '3'],
      ['c', '4'],
    ],
  },
  {
    id: 'surjective_only',
    label: '仅满射 Onto（非单射）',
    domain: ['a', 'b', 'c', 'd'],
    codomain: ['1', '2', '3'],
    pairs: [
      ['a', '1'],
      ['b', '2'],
      ['c', '2'],
      ['d', '3'],
    ],
  },
  {
    id: 'not_function_multi',
    label: '非函数（一源双箭，如 Test 02 Q3a 的 3）',
    domain: ['1', '2', '3'],
    codomain: ['1', '2', '3'],
    pairs: [
      ['1', '2'],
      ['2', '3'],
      ['3', '1'],
      ['3', '2'],
    ],
  },
  {
    id: 'not_function_missing',
    label: '非函数（漏定义，如 Tutorial 04 Q11 的 1/x）',
    domain: ['0', '1', '2'],
    codomain: ['a', 'b', 'c'],
    pairs: [
      ['1', 'a'],
      ['2', 'c'],
    ],
  },
];
