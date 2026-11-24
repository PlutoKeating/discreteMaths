import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  loadCourseRecord,
  saveChapterRead,
  saveChapterNote,
  clearCourseRecord,
  exportNotesMarkdown,
} from '../src/components/courseStorage.js';

const ROOT = process.cwd();

function makeMemoryStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    _dump: () => Object.fromEntries(store.entries()),
  };
}

test('courseStorage persists read flags and notes with strict cross-course isolation', () => {
  const mem = makeMemoryStorage();
  saveChapterRead('dismath.logic.v2', 's01', true, mem);
  saveChapterNote('dismath.logic.v2', 's01', '蕴含只有前真后假才算违约', mem);
  saveChapterNote('dismath.relation.v2', 's01', '{∅} 是装着空盒子的单元素集', mem);

  const logicRec = loadCourseRecord('dismath.logic.v2', mem);
  const relRec = loadCourseRecord('dismath.relation.v2', mem);

  assert.equal(logicRec.read.s01, true);
  assert.equal(relRec.read.s01, undefined);
  assert.equal(logicRec.notes.s01, '蕴含只有前真后假才算违约');
  assert.equal(relRec.notes.s01, '{∅} 是装着空盒子的单元素集');

  const md = exportNotesMarkdown(
    '逻辑与证明',
    [
      { id: 's01', num: '01', title: '“如果……那么……”什么时候才算说了假话？' },
      { id: 's02', num: '02', title: '不用真值表怎么变形？' },
    ],
    logicRec
  );
  assert.match(md, /1 \/ 2 节已读/);
  assert.match(md, /蕴含只有前真后假才算违约/);

  clearCourseRecord('dismath.logic.v2', mem);
  assert.deepEqual(loadCourseRecord('dismath.logic.v2', mem).notes, {});
  assert.equal(loadCourseRecord('dismath.relation.v2', mem).notes.s01, '{∅} 是装着空盒子的单元素集');
});

test('Review Focus #1: corrupted or inaccessible localStorage degrades gracefully without silent overwrite', () => {
  const mem = makeMemoryStorage({ 'dismath.logic.v2': '{corrupted_json!!' });
  const rec = loadCourseRecord('dismath.logic.v2', mem);
  assert.equal(rec.corrupted, true);
  assert.equal(rec.corruptedRaw, '{corrupted_json!!');
  assert.deepEqual(rec.read, {});
  assert.deepEqual(rec.notes, {});
  // Must NOT overwrite corrupted raw string until explicit clear
  assert.equal(mem.getItem('dismath.logic.v2'), '{corrupted_json!!');

  const brokenStorage = {
    getItem: () => {
      throw new Error('SecurityError');
    },
    setItem: () => {
      throw new Error('SecurityError');
    },
    removeItem: () => {
      throw new Error('SecurityError');
    },
  };
  const fallback = loadCourseRecord('dismath.logic.v2', brokenStorage);
  assert.deepEqual(fallback.read, {});
  assert.doesNotThrow(() => saveChapterRead('dismath.logic.v2', 's01', true, brokenStorage));
});

test('Reviewer C2: malformed inner JSON types flag corrupted, and in-memory updates survive SecurityError or corrupted storage', () => {
  const badTypes = makeMemoryStorage({ 'dismath.logic.v2': '{"read":[],"notes":{"s01":123}}' });
  const recBad = loadCourseRecord('dismath.logic.v2', badTypes);
  assert.equal(recBad.corrupted, true);
  assert.deepEqual(recBad.notes, {});

  const throwingStorage = {
    getItem: () => { throw new Error('SecurityError'); },
    setItem: () => { throw new Error('SecurityError'); },
    removeItem: () => { throw new Error('SecurityError'); },
  };
  let state = loadCourseRecord('dismath.logic.v2', throwingStorage);
  state = saveChapterNote('dismath.logic.v2', 's01', '  保留前导空格与会话内状态 ', throwingStorage, state);
  state = saveChapterRead('dismath.logic.v2', 's02', true, throwingStorage, state);
  assert.equal(state.notes.s01, '  保留前导空格与会话内状态 ');
  assert.equal(state.read.s02, true);
});

test('CourseReader component and calm Causally tokens exist', () => {
  const readerPath = path.join(ROOT, 'src/components/CourseReader.jsx');
  assert.equal(fs.existsSync(readerPath), true, 'Missing src/components/CourseReader.jsx');
  const readerSrc = fs.readFileSync(readerPath, 'utf8');
  assert.match(readerSrc, /export default function CourseReader/);

  const css = fs.readFileSync(path.join(ROOT, 'src/styles.css'), 'utf8');
  assert.match(css, /#f6f5f0/i);
  assert.match(css, /#24634d/i);
});
