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
import { readTabFromHash } from '../src/components/chapterHelpers.js';
import { preprocess } from '../src/components/markdownPreprocess.js';
import { ALL_PATTERNS as REL_PATTERNS } from '../Relation/content/glossary.js';

const ROOT = process.cwd();

function stripCodeFences(md) {
  return md.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));
}

function renderMdToHtml(raw, patterns = []) {
  const processed = preprocess(raw, patterns);
  return renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeRaw, [rehypeKatex, { strict: false, trust: true }]],
      },
      processed
    )
  );
}

function checkMarkdownFile(filePath, patterns = [], checkBold = true) {
  const raw = fs.readFileSync(filePath, 'utf8');
  assert.equal(raw.includes('****'), false, `${filePath} contains quadruple asterisks ****`);

  const clean = stripCodeFences(raw);
  const lines = clean.split(/\r?\n/);

  let blockMathCount = 0;
  lines.forEach((line, idx) => {
    if (line.includes('$$')) {
      assert.match(
        line,
        /^\s*\$\$\s*$/,
        `${filePath}:${idx + 1} has non-standalone $$ which breaks remark-math: ${line}`
      );
      blockMathCount += 1;
    }
  });
  assert.equal(
    blockMathCount % 2,
    0,
    `${filePath} has odd number (${blockMathCount}) of standalone $$ delimiters`
  );

  // Check raw HTML container blank-line separation rule from README.md
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^<div class="(callout[^"]*|proof)">/.test(line.trim())) {
      assert.equal(
        (lines[i + 1] || '').trim(),
        '',
        `${filePath}:${i + 1} opening container should be followed by a blank line`
      );
    }
  }

  // SSR check: zero katex-error and zero unrendered **bold** markers outside code/pre
  const html = renderMdToHtml(raw, patterns);
  assert.equal(html.includes('katex-error'), false, `${filePath} has KaTeX render error`);
  if (checkBold) {
    const textWithoutCode = html.replace(/<(pre|code)\b[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '');
    assert.equal(
      /\*\*[^*\n]+\*\*/.test(textWithoutCode),
      false,
      `${filePath} has unrendered literal **bold** in HTML output`
    );
  }
}

test('readTabFromHash resolves valid tab ids and falls back to default', () => {
  const tabs = [{ id: 'overview' }, { id: 'relations' }, { id: 'glossary' }];
  assert.equal(readTabFromHash('#relations', tabs, 'overview'), 'relations');
  assert.equal(readTabFromHash('#unknown', tabs, 'overview'), 'overview');
  assert.equal(readTabFromHash('', tabs, 'overview'), 'overview');
});

test('markdownPreprocess autolinks terms while skipping math, code, and HTML tags', () => {
  const src = 'A partial order in <div class="callout"> and $partial order$ and `partial order` ==key==.';
  const out = preprocess(src, ['partial order', 'order']);
  assert.ok(out.includes('<abbr data-term="partial order">partial order</abbr>'));
  assert.ok(out.includes('<div class="callout">'));
  assert.ok(out.includes('$partial order$'));
  assert.ok(out.includes('`partial order`'));
  assert.ok(out.includes('<strong class="kw">key</strong>'));
});

test('shared UI component files exist with expected exports', () => {
  const chapterUi = fs.readFileSync(path.join(ROOT, 'src/components/ChapterUi.jsx'), 'utf8');
  assert.match(chapterUi, /export function ChapterNav/);
  assert.match(chapterUi, /export function SectionHead/);
  assert.match(chapterUi, /export function QCard/);
  assert.match(chapterUi, /export function useHashTab/);

  const glossaryView = fs.readFileSync(path.join(ROOT, 'src/components/GlossaryView.jsx'), 'utf8');
  assert.match(glossaryView, /export default function GlossaryView/);
});

test('all chapter content Markdown files obey standalone $$, HTML container, and SSR bold/KaTeX rules', () => {
  for (const [dir, patterns, checkBold] of [
    ['Logic-and-Proof/content', [], false],
    ['Relation/content', REL_PATTERNS, true],
  ]) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    const mdFiles = fs.readdirSync(absDir).filter((f) => f.endsWith('.md'));
    assert.ok(mdFiles.length > 0, `${dir} should have .md files`);
    for (const f of mdFiles) {
      checkMarkdownFile(path.join(absDir, f), patterns, checkBold);
    }
  }
});

test('Relation exam, collapsible self-test, and standalone offline guide are complete and clean', () => {
  const required = [
    'overview.md',
    'sets-functions.md',
    'relations.md',
    'equiv-poset.md',
    'exam.md',
    'q1.md',
    'q2.md',
    'q3.md',
    'q4.md',
    'q5.md',
    'templates-review.md',
  ];
  for (const f of required) {
    const p = path.join(ROOT, 'Relation/content', f);
    assert.equal(fs.existsSync(p), true, `Missing Relation/content/${f}`);
  }

  // Collapsible self-test answers & accurate Warshall W4=W3 in templates-review.md
  const tmpl = fs.readFileSync(path.join(ROOT, 'Relation/content/templates-review.md'), 'utf8');
  assert.match(tmpl, /<details\b/, 'templates-review.md self-test answers must be collapsible via <details>');
  assert.equal(tmpl.includes('W_0 = W_1'), false, 'templates-review.md must not claim W_0 = W_1 on Tutorial 05 Q8');
  assert.ok(tmpl.includes('W_4 = W_3'), 'templates-review.md should state W_4 = W_3 on Tutorial 05 Q8');

  const guidePath = path.join(ROOT, 'Relation/Midterm-Review-Guide.md');
  assert.equal(fs.existsSync(guidePath), true, 'Missing Relation/Midterm-Review-Guide.md');
  checkMarkdownFile(guidePath);
  const guide = fs.readFileSync(guidePath, 'utf8');
  assert.equal(/<div\b/i.test(guide), false, 'Standalone Midterm-Review-Guide.md must not contain raw <div HTML wrappers');
  assert.equal(/\[\[[^\]]+\]\]/.test(guide), false, 'Standalone Midterm-Review-Guide.md must not contain custom [[term]] syntax');
  assert.equal(guide.includes('交互式 Hasse 沙盘'), false, 'Offline guide must not reference web-only interactive sandboxes');
  assert.equal(guide.includes('交互沙盘一键加载'), false, 'Offline guide must not reference web-only interactive sandboxes');
  assert.ok(guide.includes('# 第 6 部分'), 'Offline guide section numbering should align # 第 6 部分 with ## 6.x');
  for (const kw of ['3x^4+30x^2+80', 'Warshall', 'Hasse', '650', 'Lattice', 'W_4=W_3']) {
    assert.ok(
      guide.replace(/\s+/g, '').includes(kw.replace(/\s+/g, '')),
      `Midterm-Review-Guide.md missing expected content "${kw}"`
    );
  }
});
