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
import { ALL_PATTERNS as LOGIC_PATTERNS } from '../Logic-and-Proof/content/glossary.js';
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

export function checkMarkdownFile(filePath, patterns = []) {
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

  const html = renderMdToHtml(raw, patterns);
  assert.equal(html.includes('katex-error'), false, `${filePath} has KaTeX render error`);
  const textWithoutCode = html.replace(/<(pre|code)\b[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '');
  assert.equal(
    /\*\*[^*\n]+\*\*/.test(textWithoutCode),
    false,
    `${filePath} has unrendered literal **bold** in HTML output`
  );
}

test('markdownPreprocess autolinks terms while skipping math, code, and HTML tags', () => {
  const src = 'A partial order in <div class="callout"> and $partial order$ and `partial order` ==key==.';
  const out = preprocess(src, ['partial order', 'order']);
  assert.ok(out.includes('<abbr data-term="partial order">partial order</abbr>'));
  assert.ok(out.includes('<div class="callout">'));
  assert.ok(out.includes('$partial order$'));
  assert.ok(out.includes('`partial order`'));
  assert.ok(out.includes('<strong class="kw">key</strong>'));
});

test('all progressive chapter and exam Markdown files obey standalone $$, HTML container, and SSR bold/KaTeX rules', () => {
  const dirs = [
    ['Logic-and-Proof/chapters', LOGIC_PATTERNS],
    ['Logic-and-Proof/content', LOGIC_PATTERNS],
    ['Relation/chapters', REL_PATTERNS],
    ['Relation/content', REL_PATTERNS],
  ];
  for (const [dir, patterns] of dirs) {
    const absDir = path.join(ROOT, dir);
    const mdFiles = fs.readdirSync(absDir).filter((f) => f.endsWith('.md'));
    assert.ok(mdFiles.length > 0, `${dir} should have .md files`);
    for (const f of mdFiles) {
      checkMarkdownFile(path.join(absDir, f), patterns);
    }
  }
});

test('standalone progressive Midterm-Review-Guide.md files for both Logic and Relation are synced and clean', () => {
  for (const [relPath, expectedHeading] of [
    ['Logic-and-Proof/Midterm-Review-Guide.md', '一句话什么时候算真，一段话凭什么推得出来？'],
    ['Relation/Midterm-Review-Guide.md', '怎么把对象配成对、连成网、分好类、排出上下级？'],
  ]) {
    const full = path.join(ROOT, relPath);
    assert.equal(fs.existsSync(full), true, `Missing ${relPath}`);
    checkMarkdownFile(full);
    const raw = fs.readFileSync(full, 'utf8');
    assert.ok(raw.includes(expectedHeading), `${relPath} not synced to progressive Causally narrative`);
    assert.equal(raw.includes('<!-- LAB -->'), false, `${relPath} must not leak <!-- LAB --> marker`);
    assert.equal(/<div\b/i.test(raw), false, `${relPath} must not contain raw <div HTML tags`);
    assert.equal(
      /下面的面板|下面的博弈台|下面的侦探面板|下面的交互面板|下面的[^\n]*沙盘|上方沙盘|矩阵沙盘里点/.test(raw),
      false,
      `${relPath} contains dangling references to interactive web panels`
    );
  }
});
