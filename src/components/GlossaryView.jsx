import React, { useId, useMemo, useState } from 'react';

export default function GlossaryView({
  glossary,
  cats,
  placeholder = '输入英文、中文或关键词检索……',
  onJumpSection,
}) {
  const [q, setQ] = useState('');
  const inputId = useId();
  const groups = useMemo(() => {
    const k = q.trim().toLowerCase();
    const hit = (t) =>
      !k ||
      t.en.toLowerCase().includes(k) ||
      t.zh.toLowerCase().includes(k) ||
      t.def.toLowerCase().includes(k) ||
      (t.alias || []).some((a) => a.toLowerCase().includes(k));
    const out = {};
    for (const t of glossary) if (hit(t)) (out[t.cat] ||= []).push(t);
    return out;
  }, [q, glossary]);
  const total = Object.values(groups).reduce((n, a) => n + a.length, 0);

  return (
    <div>
      <div className="gl-search-box mb-5">
        <label htmlFor={inputId} className="block mb-2" style={{ fontWeight: 600, fontSize: '.9rem' }}>
          检索中英术语
        </label>
        <input
          id={inputId}
          className="gl-search"
          type="search"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mono mt-2" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
          共匹配 {total} / {glossary.length} 条 · 正文中带轻虚线的英文词也可直接点击查看
        </div>
      </div>

      {total === 0 && (
        <div className="surface-card p-5 text-center" style={{ color: 'var(--muted)' }}>
          未找到匹配的术语，请尝试其他英文原词、中文译名或核心关键词。
        </div>
      )}

      {Object.keys(cats)
        .filter((c) => groups[c]?.length)
        .map((c) => (
          <section key={c} className="mb-6">
            <h3 style={{ fontSize: '1rem', fontWeight: 650, color: 'var(--accent)', margin: '0 0 .5rem' }}>
              {cats[c]}
            </h3>
            <div className="surface-card" style={{ overflow: 'hidden' }}>
              {groups[c].map((t) => (
                <div key={t.en} className="gl-row">
                  <div className="gl-en">
                    {t.en}
                    {t.alias?.length ? (
                      <div style={{ fontWeight: 400, fontSize: '.74rem', color: 'var(--muted)' }}>
                        {t.alias.join(' / ')}
                      </div>
                    ) : null}
                  </div>
                  <div className="gl-zh">{t.zh}</div>
                  <div className="gl-def">
                    {t.def}
                    {t.sectionId && onJumpSection && (
                      <button
                        type="button"
                        className="gl-jump-btn"
                        onClick={() => onJumpSection(t.sectionId)}
                      >
                        跳到正文讲解 ↗
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
