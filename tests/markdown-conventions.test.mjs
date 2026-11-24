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
