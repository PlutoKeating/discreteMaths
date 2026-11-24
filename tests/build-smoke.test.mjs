import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('vite.config.js registers home, logic, and relation MPA entrypoints', () => {
  const cfg = fs.readFileSync(path.join(ROOT, 'vite.config.js'), 'utf8');
  assert.match(cfg, /home:\s*resolve\(__dirname,\s*'index\.html'\)/);
  assert.match(cfg, /logic:\s*resolve\(__dirname,\s*'Logic-and-Proof\/index\.html'\)/);
  assert.match(cfg, /relation:\s*resolve\(__dirname,\s*'Relation\/index\.html'\)/);
});

test('src/Home.jsx orders Logic -> Relation (ready: true) -> Counting -> Graph', () => {
  const home = fs.readFileSync(path.join(ROOT, 'src/Home.jsx'), 'utf8');
  const iLogic = home.indexOf("'/Logic-and-Proof/'");
  const iRel = home.indexOf("'/Relation/'");
  const iCount = home.indexOf("'/Counting/'");
  const iGraph = home.indexOf("'/Graph/'");
  assert.ok(iLogic > -1 && iRel > iLogic && iCount > iRel && iGraph > iCount, 'Chapter order must match course progression');
  const relBlock = home.slice(iRel, iCount);
  assert.match(relBlock, /ready:\s*true/);
});

test('Relation webpage entry, figures, sandboxes, and README update are in place', () => {
  for (const rel of [
    'Relation/index.html',
    'Relation/src/main.jsx',
    'Relation/src/App.jsx',
    'Relation/src/figures.jsx',
    'Relation/src/sandboxes.jsx',
  ]) {
    assert.equal(fs.existsSync(path.join(ROOT, rel)), true, `Missing ${rel}`);
  }
  const sbx = fs.readFileSync(path.join(ROOT, 'Relation/src/sandboxes.jsx'), 'utf8');
  assert.match(sbx, /export function RelationMatrixLab/);
  assert.match(sbx, /export function HassePosetLab/);
  assert.match(sbx, /export function FunctionMapperLab/);

  const figs = fs.readFileSync(path.join(ROOT, 'Relation/src/figures.jsx'), 'utf8');
  assert.match(figs, /export function HeroFig/);
  assert.match(figs, /export function SetVennFig/);
  assert.match(figs, /export function CompositionOrderFig/);
  assert.match(figs, /export function EquivPartitionFig/);

  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  assert.match(readme, /Relation\//);
  assert.match(readme, /npm test/);
});
