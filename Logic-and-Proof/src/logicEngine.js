// Pure logic evaluation helpers for Logic-and-Proof interactive labs (Test 01 · Ch1.1–1.6)

export function evalImplicationFamily(p, q) {
  const implies = !p || q;
  const disjForm = !p || q;
  const converse = !q || p;
  const inverse = p || !q;
  const contra = q || !p;
  const biconditional = p === q;
  return {
    p,
    q,
    implies,
    disjForm,
    converse,
    inverse,
    contrapositive: contra,
    biconditional,
  };
}

export function evaluateQuantifierRound(gameKey, domainKey, givenVal) {
  // gameKey: 'exists_forall_sum10' | 'forall_exists_sum10' | 'exists_forall_mul0'
  // domainKey: 'Z' | 'Z+'
  const n = Number(givenVal);
  if (gameKey === 'exists_forall_sum10') {
    // Player 1 picks y = n trying to make x + y = 10 for ALL x. Opponent picks counterexample x.
    const counterX = domainKey === 'Z+' ? (n === 9 ? 2 : 1) : n === 10 ? 1 : 0;
    return {
      formula: '∃y ∀x (x + y = 10)',
      formulaTrue: false,
      pickedY: n,
      counterX,
      sum: counterX + n,
      summary: `你先压下 y = ${n}，对手紧接着挑出 x = ${counterX}（属于 ${domainKey === 'Z+' ? '正整数 ℤ⁺' : '整数 ℤ'}），算出 ${counterX} + (${n}) = ${counterX + n} ≠ 10。不管你先定哪个 y，对手永远能拆台，所以整句为假（False）。`,
    };
  }

  if (gameKey === 'forall_exists_sum10') {
    // Opponent picks y = n first. Player responds with x = 10 - n.
    const witnessX = 10 - n;
    const validInDomain = domainKey === 'Z' ? Number.isInteger(witnessX) : Number.isInteger(witnessX) && witnessX >= 1;
    if (validInDomain) {
      return {
        formula: '∀y ∃x (x + y = 10)',
        formulaTrue: domainKey === 'Z',
        opponentY: n,
        witnessX,
        summary:
          domainKey === 'Z'
            ? `对手先出 y = ${n}，你看着他的牌打出 x = 10 − (${n}) = ${witnessX} ∈ ℤ，恰好凑成 ${witnessX} + (${n}) = 10！在整数域 ℤ 上你永远有应手，整句为真（True）。`
            : `这一回合对手出 y = ${n}，你还能打出正整数 x = ${witnessX} ∈ ℤ⁺；但如果对手改出 y = 10 或 12，所需的 x = 0 或 -2 就掉出正整数域 ℤ⁺ 了！所以在 ℤ⁺ 上整句其实是假（False）。`,
      };
    }
    return {
      formula: '∀y ∃x (x + y = 10)',
      formulaTrue: false,
      opponentY: n,
      witnessX,
      summary: `对手在正整数域 ℤ⁺ 里挑出 y = ${n}。想凑足 10 只能要 x = 10 − ${n} = ${witnessX}，可 ${witnessX} 不是正整数！防线被击穿，在 ℤ⁺ 上整句为假（False）。`,
    };
  }

  // exists_forall_mul0: ∃y ∀x (x · y = 0)
  if (domainKey === 'Z') {
    const holds = n === 0;
    return {
      formula: '∃y ∀x (x · y = 0)',
      formulaTrue: true,
      pickedY: n,
      counterX: holds ? null : 1,
      summary: holds
        ? `漂亮！你先压下 y = 0 ∈ ℤ。接下来无论对手挑什么整数 x，x · 0 = 0 永远成立！存在这样一个“通吃”的 0，所以整句为真（True）。`
        : `你挑了 y = ${n} ≠ 0，对手只需出 x = 1 就算出 ${n} ≠ 0；不过只要改挑 y = 0 就能通吃全场，因此原命题在 ℤ 上本身为真（True）。`,
    };
  }
  return {
    formula: '∃y ∀x (x · y = 0)',
    formulaTrue: false,
    pickedY: n,
    counterX: 1,
    summary: `在正整数域 ℤ⁺ 里没有 0！你挑任何正整数 y = ${n} ≥ 1，对手出 x = 1 都有 1 · ${n} = ${n} ≠ 0，所以在 ℤ⁺ 上为假（False）。`,
  };
}

// Test 01 Q1b Campus World checker:
// H1: attendsAll -> respected
// H2: attendsSome <-> understands
// H3: understands -> passes
export function evaluateQ1World({ person, attendsAll, attendsSome, understands, passes, respected }) {
  // Logical consistency: if attendsAll is true (assuming >=1 lecture), attendsSome must be true
  const nonEmptyConsistency = !attendsAll || attendsSome;
  const h1 = !attendsAll || respected;
  const h2 = attendsSome === understands;
  const h3 = !understands || passes;

  let specificPremise = true;
  let targetConclusionHolds = true;
  let specificLabel = '';
  let conclusionLabel = '';

  if (person === 'Bob') {
    specificPremise = attendsAll === true;
    specificLabel = 'H4: Bob 上了全部讲座 (∀y A(Bob,y))';
    targetConclusionHolds = passes === true;
    conclusionLabel = 'i) Bob 通过课程 P(Bob)';
  } else if (person === 'Noah') {
    specificPremise = passes === false;
    specificLabel = 'H5: Noah 没通过课程 (¬P(Noah))';
    targetConclusionHolds = respected === false;
    conclusionLabel = 'ii) Noah 不受尊敬 ¬R(Noah)';
  } else {
    specificPremise = understands === false;
    specificLabel = 'H6: Jessica 没理解内容 (¬M(Jessica))';
    targetConclusionHolds = passes === false;
    conclusionLabel = 'iii) Jessica 没通过课程 ¬P(Jessica)';
  }

  const allHypothesesHold = nonEmptyConsistency && h1 && h2 && h3 && specificPremise;

  return {
    nonEmptyConsistency,
    h1,
    h2,
    h3,
    specificPremise,
    specificLabel,
    allHypothesesHold,
    targetConclusionHolds,
    conclusionLabel,
    isCounterexample: allHypothesesHold && !targetConclusionHolds,
  };
}
