import React, { useEffect, useMemo, useState } from 'react';
import Markdown from './Markdown.jsx';
import GlossaryView from './GlossaryView.jsx';
import {
  loadCourseRecord,
  saveChapterRead,
  saveChapterNote,
  clearCourseRecord,
  exportNotesMarkdown,
} from './courseStorage.js';

function ChapterSection({ ch, glossary, labs, isRead, noteValue, onToggleRead, onChangeNote }) {
  const LabComponent = ch.lab ? labs?.[ch.lab] : null;
  const parts = useMemo(() => String(ch.markdown || '').split('<!-- LAB -->'), [ch.markdown]);

  return (
    <section className="chapter" id={ch.id} aria-labelledby={`title-${ch.id}`}>
      <div className="chapter-heading">
        <span className="chapter-num">{ch.num}</span>
        <div>
          <h2 id={`title-${ch.id}`}>{ch.title}</h2>
          {ch.examTag && <p className="chapter-exam-tag">{ch.examTag}</p>}
        </div>
      </div>

      <div className="prose-flow">
        <Markdown glossary={glossary} source={parts[0]} />
      </div>

      {LabComponent && (
        <figure className="lab-shell" id={`lab-${ch.id}`}>
          {ch.labPrompt && (
            <figcaption className="lab-caption">
              <span className="lab-eyebrow">动手试一试 · 先猜后验</span>
              <p>{ch.labPrompt}</p>
            </figcaption>
          )}
          <LabComponent />
        </figure>
      )}

      {parts.slice(1).map((rest, idx) => (
        <div key={idx} className="prose-flow">
          <Markdown glossary={glossary} source={rest} />
        </div>
      ))}

      {ch.examBox && (
        <aside className="exam-write-box" aria-label={`考场英文落笔示范：${ch.examBox.title}`}>
          <div className="exam-write-head">
            <span className="exam-write-badge">考场真题落笔</span>
            <strong>{ch.examBox.title}</strong>
          </div>
          <div className="prose-flow">
            <Markdown glossary={glossary} source={ch.examBox.markdown} />
          </div>
        </aside>
      )}

      {ch.optionalReading && (
        <details className="reflection optional-reading" id={`opt-${ch.id}`}>
          <summary>选读 · {ch.optionalReading.title}</summary>
          <div className="reflection-body prose-flow">
            <Markdown glossary={glossary} source={ch.optionalReading.markdown} />
          </div>
        </details>
      )}

      {ch.practice && (
        <details className="reflection chapter-practice" id={`practice-${ch.id}`}>
          <summary>练习 · {ch.practice.title}</summary>
          <div className="reflection-body">
            <div className="prose-flow">
              <Markdown glossary={glossary} source={ch.practice.prompt} />
            </div>

            <div className="practice-help">
              {ch.practice.hint && (
                <details>
                  <summary>给我一点提示</summary>
                  <div className="practice-inner prose-flow">
                    <Markdown glossary={glossary} source={ch.practice.hint} />
                  </div>
                </details>
              )}
              {ch.practice.solution && (
                <details>
                  <summary>对照考场满分写法</summary>
                  <div className="practice-inner prose-flow">
                    <Markdown glossary={glossary} source={ch.practice.solution} />
                  </div>
                </details>
              )}
            </div>

            {ch.practice.variant && (
              <div className="practice-variant">
                <h4>再改一个条件（期末可能怎么变？）</h4>
                <div className="prose-flow">
                  <Markdown glossary={glossary} source={ch.practice.variant.prompt} />
                </div>
                <div className="practice-help">
                  {ch.practice.variant.hint && (
                    <details>
                      <summary>提示</summary>
                      <div className="practice-inner prose-flow">
                        <Markdown glossary={glossary} source={ch.practice.variant.hint} />
                      </div>
                    </details>
                  )}
                  <details>
                    <summary>对照一种推理</summary>
                    <div className="practice-inner prose-flow">
                      <Markdown glossary={glossary} source={ch.practice.variant.solution} />
                    </div>
                  </details>
                </div>
              </div>
            )}

            <div className="practice-note-box">
              <label htmlFor={`note-${ch.id}`}>我的理由与易错提醒（自动保存在当前浏览器）</label>
              <textarea
                id={`note-${ch.id}`}
                rows={3}
                placeholder="先写下你自己的判断、卡住的一步或考场提醒……"
                value={noteValue || ''}
                onChange={(e) => onChangeNote(ch.id, e.target.value)}
              />
            </div>
          </div>
        </details>
      )}

      <div className="chapter-foot">
        <button
          type="button"
          className="read-toggle"
          aria-pressed={!!isRead}
          onClick={() => onToggleRead(ch.id, !isRead)}
        >
          {isRead ? '✓ 已读完这一节' : '标记这一节已读'}
        </button>
      </div>
    </section>
  );
}

export default function CourseReader({ course }) {
  const [record, setRecord] = useState(() => loadCourseRecord(course.storageKey));
  const [activeId, setActiveId] = useState(course.chapters[0]?.id || 'opening');
  const [navOpen, setNavOpen] = useState(false);
  const [drawer, setDrawer] = useState(null); // 'exam' | 'glossary' | 'records' | null
  const [showRawPaper, setShowRawPaper] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const chapterMap = useMemo(() => {
    const m = new Map();
    for (const ch of course.chapters) m.set(ch.id, ch);
    return m;
  }, [course.chapters]);

  // Handle scroll progress & active chapter spy
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setScrollPct(Math.min(100, Math.max(0, (window.scrollY / max) * 100)));

      let current = course.chapters[0]?.id || 'opening';
      for (const ch of course.chapters) {
        const el = document.getElementById(ch.id);
        if (el && el.getBoundingClientRect().top <= 150) {
          current = ch.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [course.chapters]);

  // Sync URL hash for #exam, #glossary, #records, or #sXX
  useEffect(() => {
    const applyHash = () => {
      const h = location.hash.replace(/^#/, '');
      if (h === 'exam' || h === 'glossary' || h === 'records') {
        setDrawer(h);
      } else if (h) {
        setDrawer(null);
        const target = document.getElementById(h);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Close drawers on Escape
  useEffect(() => {
    if (!drawer && !navOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawer(null);
        setNavOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawer, navOpen]);

  const handleToggleRead = (chapterId, nextVal) => {
    const next = saveChapterRead(course.storageKey, chapterId, nextVal);
    setRecord(next);
  };

  const handleChangeNote = (chapterId, text) => {
    const next = saveChapterNote(course.storageKey, chapterId, text);
    setRecord(next);
  };

  const handleDownloadNotes = () => {
    const md = exportNotesMarkdown(course.shortTitle || course.title, course.chapters, record);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.slug || 'discrete-math'}-notes.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    clearCourseRecord(course.storageKey);
    setRecord({ read: {}, notes: {}, corrupted: false, corruptedRaw: null });
    setConfirmClear(false);
  };

  const jumpToSection = (secId) => {
    setDrawer(null);
    setNavOpen(false);
    const el = document.getElementById(secId);
    if (el) {
      history.replaceState(null, '', `#${secId}`);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const readCount = course.chapters.filter((c) => record.read?.[c.id]).length;
  const readPct = course.chapters.length ? Math.round((readCount / course.chapters.length) * 100) : 0;

  return (
    <div className="course-page">
      <a className="skip-link" href="#course-reading">
        跳到正文
      </a>

      {/* Sticky Top Header */}
      <header className="learning-header">
        <div className="learning-header-inner">
          <nav className="learning-crumbs" aria-label="当前位置">
            <a href="/">离散数学学习空间</a>
            <span className="crumb-sep" aria-hidden="true">›</span>
            <span className="crumb-cur" aria-current="page">{course.shortTitle}</span>
          </nav>

          <div className="learning-tools">
            <button
              type="button"
              className={'tool-btn' + (drawer === 'exam' ? ' active' : '')}
              onClick={() => setDrawer((d) => (d === 'exam' ? null : 'exam'))}
            >
              原卷对照
            </button>
            <button
              type="button"
              className={'tool-btn' + (drawer === 'glossary' ? ' active' : '')}
              onClick={() => setDrawer((d) => (d === 'glossary' ? null : 'glossary'))}
            >
              术语速查
            </button>
            <button
              type="button"
              className={'tool-btn' + (drawer === 'records' ? ' active' : '')}
              onClick={() => setDrawer((d) => (d === 'records' ? null : 'records'))}
            >
              我的记录 ({readCount}/{course.chapters.length})
            </button>
            <button
              type="button"
              className="tool-btn mobile-nav-btn"
              aria-expanded={navOpen}
              aria-controls="course-sidebar"
              onClick={() => setNavOpen((v) => !v)}
            >
              阅读目录
            </button>
          </div>
        </div>
        <div className="reading-scroll-track" aria-hidden="true">
          <span style={{ width: `${scrollPct}%` }} />
        </div>
      </header>

      {/* Mobile Backdrop */}
      {(navOpen || drawer) && (
        <div
          className="drawer-backdrop"
          onClick={() => {
            setNavOpen(false);
            setDrawer(null);
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Layout: Left Sticky Directory + Right Reading Stream */}
      <div className="course-layout">
        <aside
          id="course-sidebar"
          className={'course-sidebar' + (navOpen ? ' open' : '')}
          aria-label="课程阅读目录"
        >
          <div className="sidebar-meta">
            <div className="sidebar-header-row">
              <strong>{course.shortTitle}</strong>
              <button
                type="button"
                className="sidebar-close-btn"
                onClick={() => setNavOpen(false)}
                aria-label="关闭目录"
              >
                ×
              </button>
            </div>
            <p className="sidebar-progress-label">
              {readCount} / {course.chapters.length} 节已读
            </p>
            <div className="sidebar-progress-bar" aria-hidden="true">
              <span style={{ width: `${readPct}%` }} />
            </div>
            <p className="sidebar-note">顺着问题往下读，每走完一幕就能亲手拿下一道真题。</p>
          </div>

          <nav className="sidebar-stages">
            <div className="nav-stage">
              <a
                href="#opening"
                className="stage-title-link"
                onClick={(e) => {
                  e.preventDefault();
                  jumpToSection('opening');
                }}
              >
                开篇 · 把真题摊在桌上
              </a>
            </div>
            {course.stages.map((st, idx) => (
              <div key={st.id} className="nav-stage">
                <a
                  href={`#${st.id}`}
                  className="stage-title-link"
                  onClick={(e) => {
                    e.preventDefault();
                    jumpToSection(st.id);
                  }}
                >
                  <span className="stage-num">第 {idx + 1} 幕</span>
                  <span>{st.title}</span>
                </a>
                <ol className="stage-chapter-list">
                  {st.sectionIds.map((cid) => {
                    const ch = chapterMap.get(cid);
                    if (!ch) return null;
                    const isCur = activeId === cid;
                    const isDone = !!record.read?.[cid];
                    return (
                      <li key={cid}>
                        <a
                          href={`#${cid}`}
                          className={'chapter-nav-link' + (isCur ? ' active' : '')}
                          onClick={(e) => {
                            e.preventDefault();
                            jumpToSection(cid);
                          }}
                        >
                          <span className="nav-ch-num">{ch.num}</span>
                          <span className="nav-ch-title">{ch.title}</span>
                          <span
                            className={'nav-read-dot' + (isDone ? ' done' : '')}
                            title={isDone ? '已读' : '未读'}
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </nav>
        </aside>

        <main id="course-reading" className="course-main">
          {record.corrupted && (
            <div className="corrupt-banner" role="alert">
              <span>检测到本机旧学习记录格式异常，为保护原始数据未自动覆盖。</span>
              <button type="button" className="tool-btn" onClick={handleClearAll}>
                重置本课记录以恢复保存功能
              </button>
            </div>
          )}

          {/* Hero */}
          <section className="course-hero">
            <div className="hero-copy">
              <span className="eyebrow">{course.seriesLabel}</span>
              <h1>{course.title}</h1>
              <p className="hero-lead">{course.subtitle}</p>
              <div className="hero-actions">
                <a
                  href="#opening"
                  className="primary-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    jumpToSection('opening');
                  }}
                >
                  从第一问开始 ↓
                </a>
                <button type="button" className="secondary-btn" onClick={() => setDrawer('exam')}>
                  先看这张英文考卷（{course.examMarksLabel}）
                </button>
              </div>
            </div>
            {course.heroVisual && <div className="hero-visual">{course.heroVisual}</div>}
          </section>

          {/* Opening & 2 Short Self-Checks */}
          <section id="opening" className="opening-section">
            <div className="prose-flow">
              <Markdown glossary={course.glossary} source={course.opening.markdown} />
            </div>

            {course.opening.checks?.length > 0 && (
              <div className="opening-checks">
                <p className="checks-lead">出发前，先花半分钟凭直觉猜猜下面两件小事，点开看看我们接下来要解决什么麻烦：</p>
                {course.opening.checks.map((chk, idx) => (
                  <details key={idx} className="reflection opening-check-item">
                    <summary>
                      <strong>自查 {idx + 1} · </strong>
                      {chk.question}
                    </summary>
                    <div className="reflection-body prose-flow">
                      <Markdown glossary={course.glossary} source={chk.answer} />
                    </div>
                  </details>
                ))}
              </div>
            )}
          </section>

          {/* Stages & Progressive Question Chapters */}
          {course.stages.map((st, sIdx) => (
            <React.Fragment key={st.id}>
              <section id={st.id} className="stage-intro">
                <span className="eyebrow">
                  第 {sIdx + 1} 幕 · {st.targetMarks}
                </span>
                <h2>{st.title}</h2>
                <p>{st.intro}</p>
              </section>

              {st.sectionIds.map((cid) => {
                const ch = chapterMap.get(cid);
                if (!ch) return null;
                return (
                  <ChapterSection
                    key={cid}
                    ch={ch}
                    glossary={course.glossary}
                    labs={course.labs}
                    isRead={!!record.read?.[cid]}
                    noteValue={record.notes?.[cid] || ''}
                    onToggleRead={handleToggleRead}
                    onChangeNote={handleChangeNote}
                  />
                );
              })}
            </React.Fragment>
          ))}

          {/* Course Footer */}
          <footer className="course-footer">
            <div className="footer-links">
              <a href="/">← 返回离散数学学习空间</a>
              {course.siblingLink && <a href={course.siblingLink.href}>{course.siblingLink.label}</a>}
            </div>
            <p className="footer-note">{course.footerNote}</p>
          </footer>
        </main>
      </div>

      {/* Slide-Over Utility Drawers: Exam / Glossary / Records */}
      {drawer && (
        <aside
          className="utility-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={
            drawer === 'exam' ? '原卷双语对照' : drawer === 'glossary' ? '中英术语速查' : '我的学习记录'
          }
        >
          <div className="drawer-head">
            <h2>
              {drawer === 'exam' && course.examPaper.title}
              {drawer === 'glossary' && '英文术语速查词典'}
              {drawer === 'records' && '我的学习记录与笔记'}
            </h2>
            <button type="button" className="drawer-close" onClick={() => setDrawer(null)} aria-label="关闭面板">
              ×
            </button>
          </div>

          <div className="drawer-body">
            {drawer === 'exam' && (
              <div>
                <p className="drawer-lead">
                  左边是考卷英文原文，右边是逐句中文翻译。点击每题下方的章节链接可直接跳回主线推演。
                </p>
                {course.examPaper.jumpLinks?.length > 0 && (
                  <div className="drawer-jump-row">
                    {course.examPaper.jumpLinks.map((jl) => (
                      <button
                        key={jl.label}
                        type="button"
                        className="tool-btn"
                        onClick={() => jumpToSection(jl.target)}
                      >
                        {jl.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="prose-flow">
                  <Markdown glossary={course.glossary} source={course.examPaper.markdown} />
                </div>
                {course.examPaper.rawMarkdown && (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="tool-btn"
                      onClick={() => setShowRawPaper((v) => !v)}
                    >
                      {showRawPaper ? '收起' : '展开'}原始卷面转录稿（含手写附注）
                    </button>
                    {showRawPaper && (
                      <div className="mt-4 prose-flow">
                        <Markdown glossary={course.glossary} source={course.examPaper.rawMarkdown} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {drawer === 'glossary' && (
              <GlossaryView
                glossary={course.glossary.list}
                cats={course.glossary.cats}
                placeholder={course.glossary.placeholder}
                onJumpSection={jumpToSection}
              />
            )}

            {drawer === 'records' && (
              <div>
                <p className="drawer-lead">
                  记录仅保存在你当前浏览器的本地存储中（不会上传）。已读 {readCount} / {course.chapters.length} 节。
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <button type="button" className="primary-btn" onClick={handleDownloadNotes}>
                    导出 Markdown 笔记 (.md)
                  </button>
                  {!confirmClear ? (
                    <button type="button" className="secondary-btn" onClick={() => setConfirmClear(true)}>
                      清空本课记录
                    </button>
                  ) : (
                    <span className="flex items-center gap-2">
                      <button type="button" className="danger-btn" onClick={handleClearAll}>
                        确认清空
                      </button>
                      <button type="button" className="tool-btn" onClick={() => setConfirmClear(false)}>
                        取消
                      </button>
                    </span>
                  )}
                </div>

                <div className="records-list">
                  {course.chapters.map((ch) => {
                    const done = !!record.read?.[ch.id];
                    const note = record.notes?.[ch.id]?.trim();
                    return (
                      <div key={ch.id} className="record-item">
                        <div className="record-item-top">
                          <button
                            type="button"
                            className="record-jump"
                            onClick={() => jumpToSection(ch.id)}
                          >
                            {ch.num} {ch.title}
                          </button>
                          <span className={'record-status' + (done ? ' done' : '')}>
                            {done ? '✓ 已读' : '未读'}
                          </span>
                        </div>
                        {note && <p className="record-note-preview">{note}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
