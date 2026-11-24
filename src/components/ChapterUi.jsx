import React, { useEffect, useState } from 'react';
import { readTabFromHash } from './chapterHelpers.js';

export function useHashTab(tabs, defaultId = 'overview') {
  const [cur, setCur] = useState(() => readTabFromHash(location.hash, tabs, defaultId));
  useEffect(() => {
    const on = () => {
      setCur(readTabFromHash(location.hash, tabs, defaultId));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, [tabs, defaultId]);
  return cur;
}

export function ChapterNav({ tabs, cur, ariaLabel = '章节' }) {
  return (
    <div
      className="nav gutter"
      style={{
        marginLeft: 'calc(-1 * max(16px,env(safe-area-inset-left,0px)))',
        marginRight: 'calc(-1 * max(16px,env(safe-area-inset-right,0px)))',
      }}
    >
      <div className="chips" role="tablist" aria-label={ariaLabel}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={cur === t.id}
            className={'chip' + (cur === t.id ? ' on' : '')}
            onClick={() => {
              location.hash = t.id;
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, desc }) {
  return (
    <header className="mt-8 mb-5">
      <span className="tag red">{eyebrow}</span>
      <h2 className="txt-shadow" style={{ fontSize: 'clamp(1.5rem,3.4vw,2.2rem)', margin: '.4rem 0 .3rem' }}>
        {title}
      </h2>
      {desc && (
        <p className="song" style={{ color: 'var(--muted)', maxWidth: '48rem', margin: 0 }}>
          {desc}
        </p>
      )}
    </header>
  );
}

export function QCard({ no, marks, title, verdicts, children }) {
  return (
    <article className="cut mt-8">
      <div className="cut-in p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="tag">
            第 {no} 题 · {marks} 分
          </span>
          {verdicts &&
            verdicts.map((v, i) => (
              <span key={i} className={'tag ' + (v.ok ? 'ok' : 'bad')}>
                {v.t}
              </span>
            ))}
        </div>
        <h3 className="txt-shadow" style={{ fontSize: 'clamp(1.25rem,2.6vw,1.6rem)', margin: '0 0 1rem', color: 'var(--accent)' }}>
          {title}
        </h3>
        {children}
      </div>
    </article>
  );
}
