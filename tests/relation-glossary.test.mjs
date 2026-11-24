import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { preprocess } from '../src/components/markdownPreprocess.js';
import { CATS, GLOSSARY, ALL_PATTERNS, lookupTerm } from '../Relation/content/glossary.js';

const ROOT = process.cwd();

test('Relation glossary has comprehensive entries and longest-first patterns', () => {
  assert.ok(GLOSSARY.length >= 90, `Expected >=90 glossary terms, got ${GLOSSARY.length}`);
  for (const key of ['exam', 'set', 'fn', 'rel', 'closure', 'equiv', 'poset']) {
    assert.ok(CATS[key], `Missing category ${key}`);
    assert.ok(GLOSSARY.some((t) => t.cat === key), `Category ${key} has no terms`);
  }
  for (let i = 1; i < ALL_PATTERNS.length; i += 1) {
    assert.ok(
      ALL_PATTERNS[i - 1].length >= ALL_PATTERNS[i].length,
      `ALL_PATTERNS not sorted longest-first at index ${i}: "${ALL_PATTERNS[i - 1]}" vs "${ALL_PATTERNS[i]}"`
    );
  }
  assert.equal(lookupTerm('Hasse diagram')?.zh.includes('哈斯图'), true);
  assert.equal(lookupTerm('one-to-one correspondence')?.en, 'one-to-one correspondence');
  assert.equal(lookupTerm('bijection')?.en, 'one-to-one correspondence');
});

test('Review Focus #3: multi-word terms never get split by shorter terms or corrupt HTML/math', () => {
  const sample = [
    '<div class="callout ok"><div class="ttl">Note</div>',
    '',
    'A reflexive partial order and an equivalence relation have a least upper bound and one-to-one correspondence on a restricted domain with $f(x) = x^2$.',
    '',
    '</div>',
  ].join('\n');

  const out = preprocess(sample, ALL_PATTERNS);
  assert.ok(out.includes('<div class="callout ok"><div class="ttl">Note</div>'));
  assert.ok(out.includes('$f(x) = x^2$'));
  assert.ok(out.includes('>one-to-one correspondence</abbr>'));
  assert.ok(out.includes('>equivalence relation</abbr>'));
  assert.ok(out.includes('>least upper bound</abbr>'));
  assert.ok(out.includes('>restricted domain</abbr>'));
});

test('Theory markdown files (overview, sets-functions, relations, equiv-poset) exist and cover key topics', () => {
  const mustExist = [
    ['Relation/content/overview.md', ['Ch5.1', 'Ch9.1', '真值']],
    ['Relation/content/sets-functions.md', ['Power Set', 'Cartesian', 'one-to-one', 'onto', 'Bit String']],
    ['Relation/content/relations.md', ['Warshall', '65536', 'M_{R_1}', 'n-ary']],
    ['Relation/content/equiv-poset.md', ['Equivalence', 'Partition', 'Hasse', 'Lattice', 'Lexicographic', 'Well-Ordered']],
  ];
  for (const [relPath, keywords] of mustExist) {
    const full = path.join(ROOT, relPath);
    assert.equal(fs.existsSync(full), true, `Missing ${relPath}`);
    const content = fs.readFileSync(full, 'utf8');
    for (const kw of keywords) {
      assert.ok(content.includes(kw), `${relPath} missing expected topic keyword "${kw}"`);
    }
  }
});
