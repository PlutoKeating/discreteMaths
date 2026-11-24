import test from 'node:test';
import assert from 'node:assert/strict';
import {
  matTranspose,
  matComplement,
  matUnion,
  matIntersect,
  matXor,
  matBooleanProduct,
  matReflexiveClosure,
  matSymmetricClosure,
  warshallSteps,
  analyzeRelationMatrix,
  buildPoset,
  analyzePosetSubset,
  analyzePosetGlobal,
  analyzeDiscreteFunction,
  analyzeRestrictedAbsHalf,
  PRESET_MATRICES,
  PRESET_POSETS,
} from '../Relation/src/engine.js';

test('Test 02 Q2a-f matrix operations and Warshall closure match exact exam solutions', () => {
  const { m1: R1, m2: R2 } = PRESET_MATRICES.test02_q2;

  // a) R1^-1
  assert.deepEqual(matTranspose(R1), [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ]);

  // b) complement of R1
  assert.deepEqual(matComplement(R1), [
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 0],
  ]);

  // c) R1 xor R2
  assert.deepEqual(matXor(R1, R2), [
    [1, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  // d) R2 o R1 = M_R1 boolean-product M_R2 (Slide 45 trap: R1 first, R2 second!)
  assert.deepEqual(matBooleanProduct(R1, R2), [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]);
  // Verify reversed wrong order differs!
  assert.notDeepEqual(matBooleanProduct(R1, R2), matBooleanProduct(R2, R1));

  // e) transitive closure of R1 via Warshall
  const steps = warshallSteps(R1);
  assert.equal(steps.length, 4); // W0, W1, W2, W3
  assert.deepEqual(steps[3].matrix, [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);

  // f) symmetric closure of R2
  assert.deepEqual(matSymmetricClosure(R2), [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]);

  // union / intersect / reflexive closure sanity
  assert.deepEqual(matReflexiveClosure(R1), [
    [1, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]);
  assert.deepEqual(matUnion(R1, R2)[0], [1, 1, 1]);
  assert.deepEqual(matIntersect(R1, R2)[0], [0, 0, 1]);
});

test('Test 02 Q3a & all-zero matrix relation properties analysis', () => {
  // Q3a: {(1,2),(3,1),(5,4),(2,3),(3,2),(4,5)} on {1,2,3,4,5}
  const q3a = [
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
  ];
  const p = analyzeRelationMatrix(q3a, ['1', '2', '3', '4', '5']);
  assert.equal(p.symmetric.ok, false);
  assert.equal(p.antisymmetric.ok, false);
  assert.equal(p.transitive.ok, false);
  assert.equal(p.irreflexive.ok, true);
  assert.equal(p.reflexive.ok, false);
  assert.equal(p.function.ok, false);
  assert.match(p.function.reason, /3/);
  assert.equal(p.equivalence.ok, false);
  assert.equal(p.partialOrder.ok, false);

  // Review Focus #2: All-zero 3x3 matrix vacuous truths
  const zero = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const z = analyzeRelationMatrix(zero, ['1', '2', '3']);
  assert.equal(z.reflexive.ok, false);
  assert.equal(z.irreflexive.ok, true);
  assert.equal(z.symmetric.ok, true);
  assert.equal(z.antisymmetric.ok, true);
  assert.equal(z.asymmetric.ok, true);
  assert.equal(z.transitive.ok, true);
  assert.equal(z.function.ok, false);
  assert.deepEqual(warshallSteps(zero)[3].matrix, zero);
});

test('Test 02 Q5 poset {1,5,10,13,65,650} under divisibility & empty subset safety', () => {
  const poset = PRESET_POSETS.test02_q5.poset;
  const labels = poset.elements.map(String);
  assert.deepEqual(labels, ['1', '5', '10', '13', '65', '650']);

  // Q5a: 7 covering edges: 1->5, 1->13, 5->10, 5->65, 13->65, 10->650, 65->650
  const coverPairs = poset.covers.map(([u, v]) => `${poset.elements[u]}->${poset.elements[v]}`).sort();
  assert.deepEqual(
    coverPairs,
    ['1->13', '1->5', '10->650', '13->65', '5->10', '5->65', '65->650']
  );

  const idxOf = (vals) => vals.map((v) => poset.elements.indexOf(v));
  const valOf = (idxs) => idxs.map((i) => poset.elements[i]);

  // Q5b: minimal elements of {5, 10, 13} -> 5, 13
  const b = analyzePosetSubset(poset, idxOf([5, 10, 13]));
  assert.deepEqual(valOf(b.minimal), [5, 13]);
  assert.equal(b.least, null);

  // Q5c: greatest element of {5, 10, 65} -> None (null)
  const c = analyzePosetSubset(poset, idxOf([5, 10, 65]));
  assert.equal(c.greatest, null);
  assert.deepEqual(valOf(c.maximal), [10, 65]);

  // Q5d: upper bounds of {13, 65} -> 65, 650
  const d = analyzePosetSubset(poset, idxOf([13, 65]));
  assert.deepEqual(valOf(d.upperBounds), [65, 650]);
  assert.equal(poset.elements[d.lub], 65);

  // Q5e: greatest lower bound of {10, 65} -> 5
  const e = analyzePosetSubset(poset, idxOf([10, 65]));
  assert.deepEqual(valOf(e.lowerBounds), [1, 5]);
  assert.equal(poset.elements[e.glb], 5);

  // Q5g subtle trap: {10, 13} has lcm=130 not in A, yet upperBounds in A is [650], so LUB in A is 650!
  const trap = analyzePosetSubset(poset, idxOf([10, 13]));
  assert.deepEqual(valOf(trap.upperBounds), [650]);
  assert.equal(poset.elements[trap.lub], 650);

  // Q5f & Q5g global properties
  const g = analyzePosetGlobal(poset);
  assert.equal(g.isTotalOrder, false);
  assert.equal(g.isLattice, true);
  assert.equal(g.isBounded, true);

  // Review Focus #1: Empty subset safety & mathematically exact vacuous bounds on bounded poset
  const emptyRes = analyzePosetSubset(poset, []);
  assert.equal(emptyRes.empty, true);
  assert.deepEqual(emptyRes.minimal, []);
  assert.deepEqual(emptyRes.maximal, []);
  assert.equal(emptyRes.least, null);
  assert.equal(emptyRes.greatest, null);
  assert.equal(poset.elements[emptyRes.lub], 1);
  assert.equal(poset.elements[emptyRes.glb], 650);
});

test('Tutorial 05 Q8 Warshall preset trace matches step-by-step added pairs', () => {
  const steps = warshallSteps(PRESET_MATRICES.tut05_q8.m1);
  assert.equal(steps.length, 5);
  assert.notDeepEqual(steps[1].matrix, steps[0].matrix);
  assert.deepEqual(steps[1].added, [[2, 1], [3, 1]]);
  assert.deepEqual(steps[2].added, [[0, 2], [3, 2]]);
  assert.deepEqual(steps[3].added, [[0, 0], [1, 0]]);
  assert.deepEqual(steps[4].added, []);
  assert.deepEqual(steps[4].matrix, steps[3].matrix);
});

test('Tutorial 06 Q12 and Bowtie non-lattice posets are accurately distinguished', () => {
  const tut = PRESET_POSETS.tut06_q12.poset;
  const tg = analyzePosetGlobal(tut);
  assert.equal(tg.isLattice, false);
  const fullSub = analyzePosetSubset(tut, [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(fullSub.minimal.map((i) => tut.elements[i]), [3, 5]);
  assert.deepEqual(fullSub.maximal.map((i) => tut.elements[i]), [24, 45]);
  assert.equal(fullSub.least, null);
  assert.equal(fullSub.greatest, null);

  const bow = PRESET_POSETS.bowtie.poset;
  const bg = analyzePosetGlobal(bow);
  assert.equal(bg.isLattice, false);

  const pow = PRESET_POSETS.powerset3.poset;
  const pg = analyzePosetGlobal(pow);
  assert.equal(pg.isLattice, true);
  assert.equal(pg.isBounded, true);
});

test('Function analyzer covers discrete mappings and Test 02 Q1d h(x)=|x/2| restrictions', () => {
  const bij = analyzeDiscreteFunction(['a', 'b', 'c'], ['1', '2', '3'], [
    ['a', '2'],
    ['b', '3'],
    ['c', '1'],
  ]);
  assert.equal(bij.isFunction, true);
  assert.equal(bij.isInjective, true);
  assert.equal(bij.isSurjective, true);
  assert.equal(bij.isBijective, true);

  const rFull = analyzeRestrictedAbsHalf('R', 'R');
  assert.equal(rFull.isInjective, false);
  assert.equal(rFull.isSurjective, false);
  assert.equal(rFull.isBijective, false);

  const rNonNeg = analyzeRestrictedAbsHalf('R>=0', 'R>=0');
  assert.equal(rNonNeg.isInjective, true);
  assert.equal(rNonNeg.isSurjective, true);
  assert.equal(rNonNeg.isBijective, true);
  assert.match(rNonNeg.inverseFormula, /2y/);

  const rNonPos = analyzeRestrictedAbsHalf('R<=0', 'R>=0');
  assert.equal(rNonPos.isBijective, true);
  assert.match(rNonPos.inverseFormula, /-2y/);
});
