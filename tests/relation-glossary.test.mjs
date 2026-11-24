import test from 'node:test';
import assert from 'node:assert/strict';
import { preprocess } from '../src/components/markdownPreprocess.js';
import { CATS, GLOSSARY, ALL_PATTERNS, lookupTerm } from '../Relation/content/glossary.js';

test('Relation glossary has comprehensive entries, sectionId anchors, and longest-first patterns', () => {
  assert.ok(GLOSSARY.length >= 90, `Expected >=90 glossary terms, got ${GLOSSARY.length}`);
  for (const key of ['exam', 'set', 'fn', 'rel', 'closure', 'equiv', 'poset']) {
    assert.ok(CATS[key], `Missing category ${key}`);
    assert.ok(GLOSSARY.some((t) => t.cat === key), `Category ${key} has no terms`);
  }
  for (const t of GLOSSARY) {
    assert.match(t.sectionId || '', /^s\d{2}$/, `Glossary term "${t.en}" should link to a valid chapter sectionId`);
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
  assert.equal(lookupTerm('floor function')?.sectionId, 's03');
  assert.equal(lookupTerm('loop')?.sectionId, 's04');
  assert.equal(lookupTerm('n-ary relation')?.sectionId, 's06');
  assert.equal(lookupTerm('dual')?.sectionId, 's10');
  assert.equal(lookupTerm('comparable')?.sectionId, 's12');
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
