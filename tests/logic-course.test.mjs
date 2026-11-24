import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { preprocess } from '../src/components/markdownPreprocess.js';
import {
  evalImplicationFamily,
  evaluateQuantifierRound,
  evaluateQ1World,
} from '../Logic-and-Proof/src/logicEngine.js';
import { buildLogicCourse } from '../Logic-and-Proof/src/courseData.js';

const ROOT = process.cwd();
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const LOGIC_COURSE = buildLogicCourse({
  opening: readRel('Logic-and-Proof/chapters/opening.md'),
  s01: readRel('Logic-and-Proof/chapters/s01.md'),
  s02: readRel('Logic-and-Proof/chapters/s02.md'),
  s03: readRel('Logic-and-Proof/chapters/s03.md'),
  s04: readRel('Logic-and-Proof/chapters/s04.md'),
  s05: readRel('Logic-and-Proof/chapters/s05.md'),
  s06: readRel('Logic-and-Proof/chapters/s06.md'),
  s07: readRel('Logic-and-Proof/chapters/s07.md'),
  exam: readRel('Logic-and-Proof/content/exam.md'),
  rawExam: readRel('Logic-and-Proof/Midterm-Test-01.md'),
});

function assertCleanMarkdown(label, md, patterns = []) {
  if (!md) return;
  const clean = md.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));
  const lines = clean.split(/\r?\n/);
  let count = 0;
  lines.forEach((line, idx) => {
    if (line.includes('$$')) {
      assert.match(line, /^\s*\$\$\s*$/, `${label}:${idx + 1} non-standalone $$`);
      count += 1;
    }
  });
  assert.equal(count % 2, 0, `${label} odd $$ count`);

  const html = renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeRaw, [rehypeKatex, { strict: false, trust: true }]],
      },
      preprocess(md, patterns)
    )
  );
  assert.equal(html.includes('katex-error'), false, `${label} has katex-error`);
  const textOnly = html.replace(/<(pre|code)\b[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '');
  assert.equal(/\*\*[^*\n]+\*\*/.test(textOnly), false, `${label} has unrendered **bold**`);
}

test('logicEngine accurately evaluates implication family, quantifier rounds, and Test 01 Q1b counterexamples', () => {
  const tf = evalImplicationFamily(true, false);
  assert.equal(tf.implies, false);
  assert.equal(tf.disjForm, false);
  assert.equal(tf.contrapositive, false);
  assert.equal(tf.converse, true);
  assert.equal(tf.inverse, true);

  const ft = evalImplicationFamily(false, true);
  assert.equal(ft.implies, true);
  assert.equal(ft.contrapositive, true);
  assert.equal(ft.converse, false);

  const zWin = evaluateQuantifierRound('forall_exists_sum10', 'Z', 7);
  assert.equal(zWin.formulaTrue, true);
  assert.equal(zWin.witnessX, 3);

  const zPosFail = evaluateQuantifierRound('forall_exists_sum10', 'Z+', 12);
  assert.equal(zPosFail.formulaTrue, false);

  const noahWorld = evaluateQ1World({
    person: 'Noah',
    attendsAll: false,
    attendsSome: false,
    understands: false,
    passes: false,
    respected: true,
  });
  assert.equal(noahWorld.allHypothesesHold, true);
  assert.equal(noahWorld.targetConclusionHolds, false);
});

test('LOGIC_COURSE follows Causally anti-jargon question-driven structure and covers all 60 marks of Test 01', () => {
  assert.equal(LOGIC_COURSE.storageKey, 'dismath.logic.v2');
  assert.equal(LOGIC_COURSE.stages.length, 4);
  assert.equal(LOGIC_COURSE.chapters.length, 7);

  const patterns = LOGIC_COURSE.glossary.patterns;
  assertCleanMarkdown('opening', LOGIC_COURSE.opening.markdown, patterns);

  const allExamText = [];
  for (const ch of LOGIC_COURSE.chapters) {
    assert.match(ch.title, /[？?]$/, `Chapter ${ch.id} title must be a question: ${ch.title}`);
    const paras = ch.markdown.trim().split(/\n\s*\n/);
    const firstPara = paras[0] || '';
    assert.equal(
      /^(#|\||\*\*定义|定义[:：]|Definition[:：])/i.test(firstPara),
      false,
      `Chapter ${ch.id} must open with a concrete scenario/question, not a definition or table`
    );
    // Reviewer I2: No single paragraph may cram > 3 bolded bilingual definitions **...（...）**
    for (const para of paras) {
      const biDefs = para.match(/\*\*[^*\n]+?[（(][A-Za-z][^)\n]*?[）)]\*\*/g) || [];
      assert.ok(
        biDefs.length <= 3,
        `Chapter ${ch.id} crams ${biDefs.length} bolded bilingual terms into one paragraph: ${biDefs.join(', ')}`
      );
    }

    assertCleanMarkdown(`${ch.id}.markdown`, ch.markdown, patterns);
    if (ch.examBox) {
      allExamText.push(ch.examBox.title + '\n' + ch.examBox.markdown);
      assertCleanMarkdown(`${ch.id}.examBox`, ch.examBox.markdown, patterns);
    }
    if (ch.optionalReading) {
      assertCleanMarkdown(`${ch.id}.optional`, ch.optionalReading.markdown, patterns);
    }
    assert.ok(ch.practice, `Chapter ${ch.id} should include tiered practice`);
    assertCleanMarkdown(`${ch.id}.practice.prompt`, ch.practice.prompt, patterns);
    assertCleanMarkdown(`${ch.id}.practice.hint`, ch.practice.hint, patterns);
    assertCleanMarkdown(`${ch.id}.practice.solution`, ch.practice.solution, patterns);
    if (ch.practice.variant) {
      assertCleanMarkdown(`${ch.id}.variant.prompt`, ch.practice.variant.prompt, patterns);
      assertCleanMarkdown(`${ch.id}.variant.solution`, ch.practice.variant.solution, patterns);
    }
  }

  const joinedExam = allExamText.join('\n');
  for (const marker of ['Question 1a', 'Question 1b', 'Question 2a', 'Question 2c', 'Question 4', 'Question 5', 'Question 6']) {
    assert.ok(joinedExam.includes(marker), `Missing Test 01 exam writing box for ${marker}`);
  }

  assert.equal(LOGIC_COURSE.glossary.lookup('logically equivalent')?.sectionId, 's02');
  assert.equal(LOGIC_COURSE.glossary.lookup('absorption laws')?.sectionId, 's03');
  assert.equal(LOGIC_COURSE.glossary.lookup('free variable')?.sectionId, 's04');
  assert.equal(LOGIC_COURSE.glossary.lookup('existence proof')?.sectionId, 's07');
});
