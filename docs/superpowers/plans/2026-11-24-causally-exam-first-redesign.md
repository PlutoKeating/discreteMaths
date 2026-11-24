# Causally-Inspired Exam-First Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the site's visual system, Home page, `/Logic-and-Proof/` (Test 01 · 60 marks as First Principle), and `/Relation/` (Test 02 · 76 marks as First Principle) into a calm, progressive Causally-style continuous learning journey with question-titled chapters, earned vocabulary, inline interactive labs, collapsible tiered practice, local read/note persistence, and synchronized offline Markdown guides.

**Architecture:** A shared `CourseReader.jsx` shell + pure `courseStorage.js` state manager renders any structured course definition (`opening`, `stages`, `chapters`, `examPaper`, `glossary`) with a sticky left stage/question directory, continuous prose column, prediction-first inline labs, exam-writing boxes, collapsible tiered practice/optional-reading cards, and slide-over drawers (`原卷对照`, `术语速查`, `我的记录`). Both `Logic-and-Proof` and `Relation` author clean narrative Markdown chapters + interactive React+SVG labs, and a deterministic Node helper generates standalone `Midterm-Review-Guide.md` files from the exact same narrative chapters.

**Tech Stack:** React 18.3, Vite 6 MPA, Tailwind CSS v4, `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-raw`, `mermaid`, Node 24 native `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-24-causally-exam-first-redesign.md`

## Global Constraints

- Zero new npm dependencies in `package.json`; zero new `.pdf` files written to disk.
- Anti-Jargon Narrative Rule: Every chapter title MUST be a conversational question in Chinese (`01 ...？`); every chapter MUST open with a concrete puzzle/example/question before introducing any bolded technical term (`**中文名（English term）**`); no encyclopedic multi-definition dump tables in main prose.
- Exam-First Completeness: Every single question and sub-question of `Midterm-Test-01.md` (60 marks) and `Midterm-Test-02.md` (76 marks) MUST be solved in the main flow with a calm `考场英文落笔示范` block; all remaining Slide/Tutorial concepts MUST appear in chapter-end `<details>` (`再改一个条件` or `选读 · ...`).
- Calm Editorial Visual System: Replace 3D bevel slabs, cut-corner cards, neon glows, and loud red/green uppercase badges with warm sage-ivory paper tokens (`#f6f5f0` / `#fffefa` / `#22312b` / `#24634d` light; `#151917` / `#1d2320` / `#e7ebe8` / `#6ec4a3` dark).
- Local Storage Safety & Isolation: Separate storage keys `dismath.logic.v2` and `dismath.relation.v2`; corrupted JSON in `localStorage` must degrade gracefully without throwing or wiping raw data silently; Markdown note export must match saved chapter notes and read state.
- Strict Markdown Math Rule: Every block `$$` MUST sit on its own standalone line; zero unrendered `**...**` or `.katex-error` in SSR output.
- Git Discipline: Atomic commits using `PlutoKeating <PlutoKeating@outlook.com>` exclusively, zero AI co-author trailers, zero untracked files.

## Review Focus

1. **Corrupted or unavailable `localStorage` in `courseStorage.js`:** When `localStorage.getItem(...)` returns malformed JSON or throws `SecurityError`, `loadCourseRecord` must return a safe empty record `{ read: {}, notes: {}, corruptedRaw }` without crashing `CourseReader` or overwriting the corrupted value automatically.
2. **Legacy hash links on `/Logic-and-Proof/` and `/Relation/`:** Visiting `#s01`..`#s12`, `#stage-1`..`#stage-4`, or drawer hashes (`#exam`, `#glossary`, `#records`) must scroll smoothly to the chapter or open the corresponding drawer, and mobile drawer navigation must auto-close the sidebar drawer after clicking a chapter link.
3. **Anti-Jargon / Definition-First Regression:** Automated narrative lint must reject any chapter Markdown file that starts with `定义：` / `Definition:` or lacks a question-mark title or has unrendered CommonMark `**...**` / `****` / `.katex-error`.
4. **375px Mobile Viewport & Long Question Titles:** Question-style chapter headings in both the left drawer and main column, wide KaTeX equations, exam-writing boxes, and all 6 interactive labs (3 in Logic + 3 in Relation) must wrap or scroll locally with zero document-level horizontal overflow (`scrollWidth === innerWidth`).
5. **Cross-Course Storage Isolation:** Marking `s01` read or typing a note in `s01` on `/Logic-and-Proof/` must NEVER mark `s01` read or overwrite `s01`'s note on `/Relation/`.

---

### Task 1: Calm Editorial Design Tokens, Storage Engine, and Shared `CourseReader` Shell

**Files:**
- Create: `src/components/courseStorage.js`
- Create: `src/components/CourseReader.jsx`
- Modify: `src/styles.css`
- Modify: `src/Home.jsx`
- Create: `tests/course-reader.test.mjs`

**Interfaces:**
- Produces in `src/components/courseStorage.js`:
  - `loadCourseRecord(storageKey: string, storage?: Storage): { read: Record<string, boolean>, notes: Record<string, string>, corrupted: boolean }`
  - `saveChapterRead(storageKey: string, chapterId: string, isRead: boolean, storage?: Storage)`
  - `saveChapterNote(storageKey: string, chapterId: string, note: string, storage?: Storage)`
  - `clearCourseRecord(storageKey: string, storage?: Storage)`
  - `exportNotesMarkdown(courseTitle: string, chapters: Array<{id: string, num: string, title: string}>, record): string`
- Produces in `src/components/CourseReader.jsx`:
  - `CourseReader({ course })` where `course` has `{ storageKey, seriesLabel, title, subtitle, promise, heroVisual, opening: { lead, examMap, checks }, stages, chapters, labs, examPaper: { title, markdown, rawMarkdown }, glossary: { list, cats, lookup, patterns }, footerNote, siblingLink }`.

- [ ] **Step 1: Write `tests/course-reader.test.mjs` testing `courseStorage.js` (read/note persistence, cross-course isolation, corrupted JSON safety, Markdown export) and `CourseReader.jsx` exports**
- [ ] **Step 2: Run `npm test` to confirm RED failure**
- [ ] **Step 3: Implement `src/components/courseStorage.js`, `src/components/CourseReader.jsx`, calm Causally-inspired tokens & layout in `src/styles.css`, and redesigned calm editorial `src/Home.jsx`**
- [ ] **Step 4: Run `npm test` to confirm GREEN**
- [ ] **Step 5: Commit Task 1** (`Add Causally-inspired calm design system, local learning storage, and shared CourseReader shell`)

---

### Task 2: `/Logic-and-Proof/` Redesign — Test 01 (60 Marks) as First Principle (4 Stages · 7 Chapters · 3 Interactive Labs)

**Files:**
- Create: `Logic-and-Proof/src/logicEngine.js`
- Create: `Logic-and-Proof/src/labs.jsx`
- Create: `Logic-and-Proof/src/courseData.js`
- Create: `Logic-and-Proof/chapters/opening.md`, `s01.md`..`s07.md`
- Modify: `Logic-and-Proof/content/glossary.js` (add `sectionId` anchor mapping per term so `术语速查` jumps straight to the teaching chapter!)
- Modify: `Logic-and-Proof/src/App.jsx`
- Remove obsolete tab-dump files no longer imported (`Logic-and-Proof/content/overview.md`, `formulas.md`, `q1.md`, `q2.md`, `q4.md`, `q5.md`, `q6.md`, `templates.md`, `review.md`, `Logic-and-Proof/src/GlossaryPage.jsx`, `Logic-and-Proof/src/figures.jsx` replaced by clean calm hero diagram & 3 interactive labs; keep `exam.md` & `Midterm-Test-01.md`!)
- Create: `tests/logic-course.test.mjs`

**Interfaces:**
- `Logic-and-Proof/src/labs.jsx` exports:
  - `ImplicationProbeLab` (toggle $p, q$, compare $p\to q$, $\neg p\lor q$, converse $q\to p$, inverse $\neg p\to\neg q$, contrapositive $\neg q\to\neg p$)
  - `QuantifierGameLab` (interactive two-player turn-by-turn game on $x+y=10$ and $xy=0$ comparing $\exists y\,\forall x$ vs $\forall y\,\exists x$ on $\mathbb{Z}$ and $\mathbb{Z}^+$)
  - `InferenceChainLab` (interactive Test 01 Q1b workbench for Bob, Noah, and Jessica: trace valid UI/EG/MP steps for Bob, and toggle lecture/material/pass/respect states to build concrete counterexample worlds for Noah and Jessica!)

- [ ] **Step 1: Write `tests/logic-course.test.mjs` verifying `logicEngine.js`, all 7 chapters' anti-jargon narrative structure, Test 01 Q1/Q2/Q4/Q5/Q6 full coverage, and SSR rendering**
- [ ] **Step 2: Run `npm test` to confirm RED failure**
- [ ] **Step 3: Author `logicEngine.js`, `labs.jsx`, `opening.md` + `s01.md`..`s07.md`, `courseData.js`, update `glossary.js` section links & `Logic-and-Proof/src/App.jsx`, and clean obsolete files**
- [ ] **Step 4: Run `npm test` to confirm GREEN**
- [ ] **Step 5: Commit Task 2** (`Rebuild Logic-and-Proof as a progressive Test-01-driven Causally course with 3 interactive labs`)

---

### Task 3: `/Relation/` Redesign — Test 02 (76 Marks) as First Principle (4 Stages · 12 Chapters · 3 Calm Interactive Labs)

**Files:**
- Create: `Relation/src/courseData.js`
- Create: `Relation/chapters/opening.md`, `s01.md`..`s12.md`
- Modify: `Relation/src/sandboxes.jsx` (restyle into calm Causally-style `.lab-panel` components with clear prediction prompts and clean color tokens)
- Modify: `Relation/content/glossary.js` (add `sectionId` anchor mapping to `s01`..`s12`)
- Modify: `Relation/src/App.jsx`
- Remove obsolete noun-dump files (`Relation/content/overview.md`, `sets-functions.md`, `relations.md`, `equiv-poset.md`, `q1.md`..`q5.md`, `templates-review.md`, `Relation/src/figures.jsx` replaced by clean calm hero SVG in `courseData.js`; keep `exam.md` & `Midterm-Test-02.md` & `engine.js`!)
- Update: `tests/relation-glossary.test.mjs`, `tests/markdown-conventions.test.mjs`, `tests/build-smoke.test.mjs`

- [ ] **Step 1: Update tests to assert all 12 Relation question-chapters (`s01.md`..`s12.md`), anti-jargon narrative rules, Test 02 Q1–Q5 coverage, and glossary `sectionId` targets**
- [ ] **Step 2: Run `npm test` to confirm RED failure**
- [ ] **Step 3: Author `Relation/chapters/opening.md` + `s01.md`..`s12.md`, `Relation/src/courseData.js`, calm-restyled `sandboxes.jsx`, `glossary.js` section links, `Relation/src/App.jsx`, and clean obsolete files**
- [ ] **Step 4: Run `npm test` to confirm GREEN**
- [ ] **Step 5: Commit Task 3** (`Rebuild Relation as a progressive Test-02-driven Causally course across 12 question chapters`)

---

### Task 4: Offline Progressive Markdown Guides (`Midterm-Review-Guide.md`), Unused Shared File Cleanup & `README.md` Sync

**Files:**
- Create: `scripts/sync-guides.mjs` (deterministic generator building `Logic-and-Proof/Midterm-Review-Guide.md` and `Relation/Midterm-Review-Guide.md` directly from `courseData.js` + `chapters/*.md`)
- Modify: `Logic-and-Proof/Midterm-Review-Guide.md`
- Modify: `Relation/Midterm-Review-Guide.md`
- Remove unused legacy `src/components/ChapterUi.jsx` if no longer imported anywhere
- Modify: `README.md` and `package.json` (`"sync:guides": "node scripts/sync-guides.mjs"`)

- [ ] **Step 1: Add offline-guide sync parity assertions in `tests/markdown-conventions.test.mjs`**
- [ ] **Step 2: Run `npm test` to confirm RED failure**
- [ ] **Step 3: Implement `scripts/sync-guides.mjs`, generate both `Midterm-Review-Guide.md` files, remove unused legacy UI file if unreferenced, update `README.md`, and run `npm test && npm run build`**
- [ ] **Step 4: Commit Task 4** (`Sync progressive offline Markdown guides and update project documentation`)

---

### Task 5: Independent Browser Visual/UX Evaluation, Code/Pedagogy/Math Review, Fix Pass & Remote Push

**Files:**
- Any targeted fixes surfaced by `ultracode/visual-evaluator` or `ultracode/reviewer`

- [ ] **Step 1: Start `vite preview` and run `ultracode/visual-evaluator` + `ultracode/reviewer` in parallel** (explicitly auditing BOTH visual calmness/usability on desktop+mobile AND Causally narrative quality / anti-jargon compliance / mathematical rigor across all 19 chapters!).
- [ ] **Step 2: Fix any Critical/Important findings with tests + `npm test && npm run build`, re-verify, stop preview server, confirm clean `git status`**
- [ ] **Step 3: Push verified commits to `origin/main` and report full results**
