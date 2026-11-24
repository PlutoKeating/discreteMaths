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
import { buildRelationCourse } from '../Relation/src/courseData.js';

const ROOT = process.cwd();
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function loadRelationCourse() {
  const md = {
    opening: readRel('Relation/chapters/opening.md'),
    exam: readRel('Relation/content/exam.md'),
    rawExam: readRel('Relation/Midterm-Test-02.md'),
  };
  for (let i = 1; i <= 12; i += 1) {
    const id = `s${String(i).padStart(2, '0')}`;
    md[id] = readRel(`Relation/chapters/${id}.md`);
  }
  return buildRelationCourse(md);
}

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

test('RELATION_COURSE follows Causally anti-jargon question-driven structure and covers all 76 marks of Test 02 + extensions', () => {
  const course = loadRelationCourse();
  assert.equal(course.storageKey, 'dismath.relation.v2');
  assert.equal(course.stages.length, 4);
  assert.equal(course.chapters.length, 12);

  const patterns = course.glossary.patterns;
  assertCleanMarkdown('opening', course.opening.markdown, patterns);

  const allExamText = [];
  const allCourseCorpus = [course.opening.markdown];

  for (const ch of course.chapters) {
    assert.match(ch.title, /[？?]$/, `Chapter ${ch.id} title must be a question: ${ch.title}`);
    const firstPara = ch.markdown.trim().split(/\n\s*\n/)[0] || '';
    assert.equal(
      /^(#|\||\*\*定义|定义[:：]|Definition[:：])/i.test(firstPara),
      false,
      `Chapter ${ch.id} must open with a concrete scenario/question, not a definition or table`
    );

    assertCleanMarkdown(`${ch.id}.markdown`, ch.markdown, patterns);
    allCourseCorpus.push(ch.markdown);

    if (ch.examBox) {
      allExamText.push(ch.examBox.title + '\n' + ch.examBox.markdown);
      allCourseCorpus.push(ch.examBox.markdown);
      assertCleanMarkdown(`${ch.id}.examBox`, ch.examBox.markdown, patterns);
    }
    if (ch.optionalReading) {
      allCourseCorpus.push(ch.optionalReading.markdown);
      assertCleanMarkdown(`${ch.id}.optional`, ch.optionalReading.markdown, patterns);
    }
    assert.ok(ch.practice, `Chapter ${ch.id} should include tiered practice`);
    allCourseCorpus.push(ch.practice.prompt, ch.practice.solution);
    assertCleanMarkdown(`${ch.id}.practice.prompt`, ch.practice.prompt, patterns);
    assertCleanMarkdown(`${ch.id}.practice.hint`, ch.practice.hint, patterns);
    assertCleanMarkdown(`${ch.id}.practice.solution`, ch.practice.solution, patterns);
    if (ch.practice.variant) {
      allCourseCorpus.push(ch.practice.variant.prompt, ch.practice.variant.solution);
      assertCleanMarkdown(`${ch.id}.variant.prompt`, ch.practice.variant.prompt, patterns);
      assertCleanMarkdown(`${ch.id}.variant.solution`, ch.practice.variant.solution, patterns);
    }
  }

  const joinedExam = allExamText.join('\n');
  for (const marker of ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']) {
    assert.ok(joinedExam.includes(marker), `Missing Test 02 exam writing box for ${marker}`);
  }

  const corpus = allCourseCorpus.join('\n');
  for (const kw of ['power set', 'bit string', '65536', 'n-ary', 'lexicographic', 'well-ordered', 'complemented lattice', 'Warshall', '650']) {
    assert.ok(corpus.toLowerCase().includes(kw.toLowerCase()), `Course corpus missing slide/tutorial topic "${kw}"`);
  }
});
