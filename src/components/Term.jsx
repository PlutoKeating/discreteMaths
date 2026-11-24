import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// 可点击术语：点击弹出英文原词 / 中文译名 / 解释。桌面端为锚定气泡，手机端为底部抽屉。
export default function Term({ term, children }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btn = useRef(null);
  const pop = useRef(null);

  useLayoutEffect(() => {
    if (!open || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const w = Math.min(360, window.innerWidth - 24);
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    setPos({ top: r.bottom + 8, left, width: w });
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (!pop.current?.contains(e.target) && !btn.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [open]);

  if (!term) return <>{children}</>;
  return (
    <>
      <button
        type="button"
        ref={btn}
        className={'term' + (open ? ' open' : '')}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`术语：${term.en}`}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div
            ref={pop}
            className="term-pop"
            role="dialog"
            aria-label={term.en}
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            <div className="term-pop-en">{term.en}</div>
            <div className="term-pop-zh">{term.zh}</div>
            <div className="term-pop-def">{term.def}</div>
            {term.alias?.length ? (
              <div className="term-pop-alias">其他写法：{term.alias.join(' / ')}</div>
            ) : null}
            <button type="button" className="term-pop-close" onClick={() => setOpen(false)} aria-label="关闭">
              ×
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
