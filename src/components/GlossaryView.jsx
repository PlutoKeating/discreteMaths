import React, { useId, useMemo, useState } from 'react';

export default function GlossaryView({ glossary, cats, placeholder = '例如：contrapositive、谬误、such that' }) {
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
    <>
      <div className="card p-4 md:p-6 mb-6">
        <label htmlFor={inputId} className="head block mb-2">
          搜索术语（英文 / 中文 / 解释）
        </label>
        <input
          id={inputId}
          className="gl-search"
          type="search"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mono mt-2" style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
          {total} / {glossary.length} 条 · 正文中所有带虚线下划线的英文词都可以点击查看
        </div>
      </div>
      {total === 0 && (
        <div className="card p-5 text-center song" style={{ color: 'var(--muted)' }}>
          未找到匹配的术语，请尝试其他英文原词、中文译名或核心关键词。
        </div>
      )}
      {Object.keys(cats)
        .filter((c) => groups[c]?.length)
        .map((c) => (
          <section key={c} className="mb-6">
            <h3 className="head txt-shadow" style={{ fontSize: '1.2rem', color: 'var(--accent)', margin: '0 0 .6rem' }}>
              {cats[c]}
            </h3>
            <div className="card" style={{ overflow: 'hidden' }}>
              {groups[c].map((t) => (
                <div key={t.en} className="gl-row">
                  <div className="gl-en">
                    {t.en}
                    {t.alias?.length ? (
                      <div style={{ fontWeight: 400, fontSize: '.75rem', color: 'var(--muted)' }}>{t.alias.join(' / ')}</div>
                    ) : null}
                  </div>
                  <div className="gl-zh">{t.zh}</div>
                  <div className="gl-def">{t.def}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </>
  );
}
