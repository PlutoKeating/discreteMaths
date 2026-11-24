import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { readTabFromHash } from '../src/components/chapterHelpers.js';
import { autolink, preprocess } from '../src/components/markdownPreprocess.js';

const ROOT = process.cwd();

function stripCodeFences(md) {
  return md.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));
}

function checkMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
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
    if (/<div class="(callout[^"]*|proof)">/.test(line) && !line.includes('</div>')) {
      assert.equal(
        (lines[i + 1] || '').trim(),
        '',
        `${filePath}:${i + 1} opening container should be followed by a blank line`
      );
    }
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

test('all chapter content Markdown files obey standalone $$ and HTML container rules', () => {
  for (const dir of ['Logic-and-Proof/content', 'Relation/content']) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    const mdFiles = fs.readdirSync(absDir).filter((f) => f.endsWith('.md'));
    assert.ok(mdFiles.length > 0, `${dir} should have .md files`);
    for (const f of mdFiles) {
      checkMarkdownFile(path.join(absDir, f));
    }
  }
});
