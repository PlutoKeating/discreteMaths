// Browser-local learning progress & reflection notes storage (isolated per course key).

function getDefaultStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
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
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
    }
    const read = parsed.read && typeof parsed.read === 'object' ? { ...parsed.read } : {};
    const notes = parsed.notes && typeof parsed.notes === 'object' ? { ...parsed.notes } : {};
    return { read, notes, corrupted: false, corruptedRaw: null };
  } catch {
    // Preserve raw string in storage without overwriting silently
    return { read: {}, notes: {}, corrupted: true, corruptedRaw: raw };
  }
}

function writeRecord(storageKey, nextRec, storage = getDefaultStorage()) {
  if (!storage || !storageKey) return false;
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

export function saveChapterRead(storageKey, chapterId, isRead, storage = getDefaultStorage()) {
  const cur = loadCourseRecord(storageKey, storage);
  if (cur.corrupted) return cur;
  const nextRead = { ...cur.read };
  if (isRead) nextRead[chapterId] = true;
  else delete nextRead[chapterId];
  const next = { ...cur, read: nextRead };
  writeRecord(storageKey, next, storage);
  return next;
}

export function saveChapterNote(storageKey, chapterId, note, storage = getDefaultStorage()) {
  const cur = loadCourseRecord(storageKey, storage);
  if (cur.corrupted) return cur;
  const nextNotes = { ...cur.notes };
  if (note && note.trim()) nextNotes[chapterId] = note;
  else delete nextNotes[chapterId];
  const next = { ...cur, notes: nextNotes };
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
    const note = record?.notes?.[ch.id]?.trim();
    lines.push(`## ${ch.num} ${ch.title}（${done}）`);
    lines.push('');
    lines.push(note || '_（本节暂无手写笔记）_');
    lines.push('');
  }
  return lines.join('\n');
}
