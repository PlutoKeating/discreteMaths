// Browser-local learning progress & reflection notes storage (isolated per course key).

function getDefaultStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

function isPlainObject(v) {
  return Boolean(v) && typeof v === 'object' && !Array.isArray(v);
}

export function loadCourseRecord(storageKey, storage = getDefaultStorage()) {
  if (!storage || !storageKey) {
    return { read: {}, notes: {}, corrupted: false, corruptedRaw: null };
  }
  let raw = null;
  try {
    raw = storage.getItem(storageKey);
  } catch {
    return { read: {}, notes: {}, corrupted: false, corruptedRaw: null };
  }
  if (!raw) {
    return { read: {}, notes: {}, corrupted: false, corruptedRaw: null };
  }
  try {
    const parsed = JSON.parse(raw);
    if (!isPlainObject(parsed)) {
      return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
    }
    if (parsed.read !== undefined && !isPlainObject(parsed.read)) {
      return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
    }
    if (parsed.notes !== undefined && !isPlainObject(parsed.notes)) {
      return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
    }

    const read = {};
    if (parsed.read) {
      for (const [k, v] of Object.entries(parsed.read)) {
        if (typeof v !== 'boolean') {
          return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
        }
        if (v) read[k] = true;
      }
    }

    const notes = {};
    if (parsed.notes) {
      for (const [k, v] of Object.entries(parsed.notes)) {
        if (typeof v !== 'string') {
          return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
        }
        notes[k] = v;
      }
    }

    return { read, notes, corrupted: false, corruptedRaw: null };
  } catch {
    // Preserve raw string in storage without overwriting silently
    return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
  }
}

function writeRecord(storageKey, nextRec, storage = getDefaultStorage()) {
  if (!storage || !storageKey || nextRec.corrupted) return false;
  try {
    storage.setItem(
      storageKey,
      JSON.stringify({
        version: 2,
        updatedAt: new Date().toISOString(),
        read: nextRec.read || {},
        notes: nextRec.notes || {},
      })
    );
    return true;
  } catch {
    return false;
  }
}

export function saveChapterRead(
  storageKey,
  chapterId,
  isRead,
  storage = getDefaultStorage(),
  prevRecord = null
) {
  const cur = prevRecord || loadCourseRecord(storageKey, storage);
  const nextRead = { ...(cur.read || {}) };
  if (isRead) nextRead[chapterId] = true;
  else delete nextRead[chapterId];
  const next = { ...cur, read: nextRead, notes: { ...(cur.notes || {}) } };
  writeRecord(storageKey, next, storage);
  return next;
}

export function saveChapterNote(
  storageKey,
  chapterId,
  note,
  storage = getDefaultStorage(),
  prevRecord = null
) {
  const cur = prevRecord || loadCourseRecord(storageKey, storage);
  const nextNotes = { ...(cur.notes || {}) };
  const str = typeof note === 'string' ? note : String(note ?? '');
  if (str.length > 0) nextNotes[chapterId] = str;
  else delete nextNotes[chapterId];
  const next = { ...cur, read: { ...(cur.read || {}) }, notes: nextNotes };
  writeRecord(storageKey, next, storage);
  return next;
}

export function clearCourseRecord(storageKey, storage = getDefaultStorage()) {
  if (!storage || !storageKey) return;
  try {
    storage.removeItem(storageKey);
  } catch {
    // ignore
  }
}

export function exportNotesMarkdown(courseTitle, chapters, record) {
  const readCount = chapters.filter((c) => record?.read?.[c.id]).length;
  const lines = [
    `# ${courseTitle} · 我的学习记录与思考笔记`,
    '',
    `- 导出时间：${new Date().toISOString().slice(0, 10)}`,
    `- 已读进度：${readCount} / ${chapters.length} 节已读`,
    '',
    '---',
    '',
  ];
  for (const ch of chapters) {
    const done = record?.read?.[ch.id] ? '✓ 已读' : '未标已读';
    const rawNote = record?.notes?.[ch.id];
    const note = typeof rawNote === 'string' ? rawNote.trim() : '';
    lines.push(`## ${ch.num} ${ch.title}（${done}）`);
    lines.push('');
    lines.push(note || '_（本节暂无手写笔记）_');
    lines.push('');
  }
  return lines.join('\n');
}
