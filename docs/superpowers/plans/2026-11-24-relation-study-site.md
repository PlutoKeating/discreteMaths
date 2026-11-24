# Relation Chapter Study Webpage & Interactive Sandboxes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete `/Relation/` study webpage (8 tabs covering Ch2.1–2.3, Ch9.1–9.3, Ch9.5–9.6, and Midterm Test 02) with three zero-dependency React+SVG interactive sandboxes, shared cross-chapter UI components, single-file offline Markdown review guide, and full build/math/browser verification.

**Architecture:** Extend the existing Vite 6 MPA + React 18 + Tailwind v4 architecture by extracting reusable chapter UI shells (`ChapterUi.jsx`, `GlossaryView.jsx`) into `src/components/`, decoupling pure discrete-math algorithms (`Relation/src/engine.js`) from SVG interactive sandboxes (`Relation/src/sandboxes.jsx`), authoring modular Markdown + KaTeX + Mermaid content files (`Relation/content/*.md`, `glossary.js`), and assembling an offline single-file `Relation/Midterm-Review-Guide.md`.

**Tech Stack:** React 18.3, Vite 6 MPA, Tailwind CSS v4, `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-raw`, `mermaid`, Node 24 native `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-24-relation-study-site-design.md`

## Global Constraints

- Zero new npm dependencies in `package.json` (use native React 18 + SVG + CSS custom properties + Node 24 `node --test`).
- Do NOT write or download any new `.pdf` files into the repository.
- Preserve `/Logic-and-Proof/` URL, all 7 hash tabs (`overview`, `exam`, `formulas`, `questions`, `templates`, `review`, `glossary`), visual appearance, and clickable glossary behavior with zero regressions.
- Align `src/Home.jsx` chapter order to: `Logic-and-Proof` (`ready: true`) → `Relation` (`ready: true`) → `Counting` (`ready: false`) → `Graph` (`ready: false`).
- Block math `$$` MUST occupy its own line at start and end; raw HTML containers (`<div class="callout">`, `<div class="proof">`, `<div class="bi">`) MUST leave blank lines before/after inner Markdown.
- Explicitly highlight Dr. Patrick Chan's Slide 45 notation trap: $M_{R_2 \circ R_1}$ has $(i,j) = \bigvee_k ((M_{R_1})_{ik} \land (M_{R_2})_{kj})$, i.e. standard boolean product $M_{R_1} \odot M_{R_2}$ (row of $R_1$ × column of $R_2$).
- All git commits use the repository's configured user (`PlutoKeating <PlutoKeating@outlook.com>`) with zero AI/agent co-author trailers and zero untracked files left behind.

## Review Focus

1. **Empty subset selection in `HassePosetLab`:** When a user deselects all nodes in `HassePosetLab` ($B = \varnothing$), the sandbox must not crash or misreport minimal/maximal elements; it should cleanly indicate $B = \varnothing$ (minimal/maximal/least/greatest = none, while every element of $A$ vacuously bounds $\varnothing$) and offer a one-click reset.
2. **All-zero or isolated-vertex matrix in `RelationMatrixLab`:** When a user clears all `1`s in $M_{R_1}$, `Transitive`, `Symmetric`, `Antisymmetric`, `Asymmetric`, and `Irreflexive` are all vacuously `true` while `Reflexive` and `Function` are `false`; Warshall steps $W_0 \dots W_n$ must stay all-zero without index errors.
3. **Glossary `autolink` collision on overlapping / substring terms:** Shorter terms like `order`, `set`, `relation`, `function`, `bound`, `domain` must not corrupt longer multi-word terms (`partial order`, `equivalence relation`, `least upper bound`, `restricted domain`) or HTML class attributes (`class="callout"`). Patterns must be sorted longest-first and tested against sample Markdown.
4. **375px mobile viewport layout in interactive sandboxes & side-by-side matrices:** Dual $3\times 3$ / $4\times 4$ matrices, Warshall step controls, and Hasse SVG panels must stack or scroll cleanly without overflowing horizontal body width on mobile screens.
5. **Single-file `Relation/Midterm-Review-Guide.md` standalone readability:** Must not contain raw `<div class="bi">` HTML wrappers or custom `[[term]]` syntax that look broken in plain Markdown viewers—use clean GFM tables/blockquotes, standard `$...$` / `$$` LaTeX, and `mermaid` code fences.

---

### Task 1: Shared Cross-Chapter UI Components & Test Harness

**Files:**
- Modify: `package.json` (add `"test": "node --test tests/*.test.mjs"` script only; zero dependency changes)
- Modify: `src/components/Markdown.jsx`
- Create: `src/components/ChapterUi.jsx`
- Create: `src/components/GlossaryView.jsx`
- Modify: `Logic-and-Proof/src/App.jsx`
- Modify: `Logic-and-Proof/src/GlossaryPage.jsx`
- Create: `tests/markdown-conventions.test.mjs`

**Interfaces:**
- Produces in `src/components/ChapterUi.jsx`:
  - `useHashTab(tabs: Array<{id: string, label: string}>, defaultId?: string) -> string`
  - `ChapterNav({ tabs: Array<{id: string, label: string}>, cur: string })`
  - `SectionHead({ eyebrow: string, title: string, desc?: string })`
  - `QCard({ no: string|number, marks: string|number, title: string, verdicts?: Array<{ok: boolean, t: string}>, children: ReactNode })`
- Produces in `src/components/GlossaryView.jsx`:
  - `GlossaryView({ glossary: Array<{en: string, zh: string, cat: string, def: string, alias?: string[]}>, cats: Record<string, string>, placeholder?: string })`

- [ ] **Step 1: Add `npm test` script and write `tests/markdown-conventions.test.mjs`**
  Test scans all `Logic-and-Proof/content/*.md` (and `Relation/content/*.md` once present) to assert: (a) every `$$` line is standalone `^\s*\$\$\s*$`; (b) raw HTML `<div class="callout|proof|bi">` blocks have blank lines separating tags from inner Markdown; (c) shared UI modules export expected functions.

- [ ] **Step 2: Run `npm test` to verify failure before creating `ChapterUi.jsx` / `GlossaryView.jsx`**
  Run: `npm test`
  Expected: FAIL (`Cannot find module '../src/components/ChapterUi.jsx'`)

- [ ] **Step 3: Implement `src/components/ChapterUi.jsx`, `src/components/GlossaryView.jsx`, update `Markdown.jsx` macros (`\N`, `\Q`), and refactor `Logic-and-Proof/src/App.jsx` & `GlossaryPage.jsx` to consume them**

- [ ] **Step 4: Run `npm test` and `npm run build`**
  Run: `npm test && npm run build`
  Expected: PASS (0 test failures; `dist/index.html` and `dist/Logic-and-Proof/index.html` built cleanly)

- [ ] **Step 5: Commit Task 1**
  Commit message: `Extract shared chapter UI and glossary components with Markdown convention tests`

---

### Task 2: Pure Discrete Math Engine for Relations, Posets, and Functions

**Files:**
- Create: `Relation/src/engine.js`
- Create: `tests/relation-engine.test.mjs`

**Interfaces:**
- Produces in `Relation/src/engine.js`:
  - `matTranspose(m: number[][]): number[][]`
  - `matComplement(m: number[][]): number[][]`
  - `matUnion(a: number[][], b: number[][]): number[][]`
  - `matIntersect(a: number[][], b: number[][]): number[][]`
  - `matXor(a: number[][], b: number[][]): number[][]`
  - `matBooleanProduct(mFirst: number[][], mSecond: number[][]): number[][]` — computes $(M_{R_2 \circ R_1})_{ij} = \bigvee_k ((mFirst)_{ik} \land (mSecond)_{kj})$
  - `matSymmetricClosure(m: number[][]): number[][]`
  - `matReflexiveClosure(m: number[][]): number[][]`
  - `warshallSteps(m: number[][]): Array<{ k: number, matrix: number[][], added: Array<[number, number]> }>` — index 0 is $W_0$, index $n$ is $W_n = M_{t(R)}$
  - `analyzeRelationMatrix(m: number[][], labels?: string[]): Record<string, { ok: boolean, reason: string }>` — checks `reflexive`, `irreflexive`, `symmetric`, `antisymmetric`, `asymmetric`, `transitive`, `function`, `equivalence`, `partialOrder` (including all-zero matrix edge case!)
  - `buildPoset(elements: any[], leqFn: (a: any, b: any) => boolean)` — returns `{ elements, matrix, covers: Array<[number, number]>, levels: number[][] }`
  - `analyzePosetSubset(poset, subsetIndices: number[])` — returns `{ empty, minimal, maximal, least, greatest, lowerBounds, upperBounds, glb, lub }` (handles empty subset cleanly!)
  - `analyzePosetGlobal(poset)` — returns `{ isTotalOrder, incomparablePair, isLattice, nonLatticePair, nonLatticeReason, isBounded, leastGlobal, greatestGlobal }`
  - `PRESET_MATRICES`, `PRESET_POSETS`, `PRESET_FUNCTIONS` — exact presets for Test 02 Q1/Q2/Q5, Tutorial 05 Q3/Q8, Tutorial 06 Q12, Power Set $\mathcal{P}(\{a,b,c\})$, and Bowtie non-lattice poset.

- [ ] **Step 1: Write `tests/relation-engine.test.mjs` pinning all Test 02 & edge-case calculations**
  Assert exact outputs for:
  - Test 02 Q2a–f ($M_{R_1^{-1}}$, $M_{\overline{R_1}}$, $M_{R_1\oplus R_2}$, $M_{R_2\circ R_1} = [[1,1,1],[1,0,1],[1,1,1]]$, $M_{t(R_1)}$ all-1s, $M_{s(R_2)} = [[1,1,1],[1,0,1],[1,1,1]]$);
  - Test 02 Q3a (`irreflexive: true`, all other 7 `false`, `function: false` citing vertex 3) and all-zero matrix vacuous truths;
  - Test 02 Q5 poset $\{1,5,10,13,65,650\}$: 7 Hasse cover edges, Q5b minimal of $\{5,10,13\} = [5,13]$, Q5c greatest of $\{5,10,65\} = null$, Q5d upper bounds of $\{13,65\} = [65,650]$, Q5e glb of $\{10,65\} = 5$, Q5f `isTotalOrder === false`, Q5g `isLattice === true` with LUB of $\{10,13\} = 650$, plus empty subset $B=\varnothing$ safety;
  - Tutorial 06 Q12 $\{3,5,9,15,24,45\}$ (`isLattice === false`, minimal `[3,5]`, maximal `[24,45]`, lub `{3,5} = 15`, glb `{15,45} = 15`) & Bowtie poset (`isLattice === false` despite common upper bounds).

- [ ] **Step 2: Run `npm test` to confirm `relation-engine.test.mjs` fails**
  Run: `npm test`
  Expected: FAIL (`Cannot find module '../Relation/src/engine.js'`)

- [ ] **Step 3: Implement `Relation/src/engine.js` with pure algorithms and verified presets**

- [ ] **Step 4: Run `npm test` to confirm all engine assertions pass**
  Run: `npm test`
  Expected: PASS (all engine & convention tests green)

- [ ] **Step 5: Commit Task 2**
  Commit message: `Add pure discrete math engine and unit tests for relations, posets, and functions`

---

### Task 3: Relation Glossary & Full Theory Content (Tabs 0–3)

**Files:**
- Create: `Relation/content/glossary.js`
- Create: `Relation/content/overview.md`
- Create: `Relation/content/sets-functions.md`
- Create: `Relation/content/relations.md`
- Create: `Relation/content/equiv-poset.md`
- Create: `tests/relation-glossary.test.mjs`

**Interfaces:**
- Produces in `Relation/content/glossary.js`:
  - `CATS: Record<string, string>` (`exam`, `set`, `fn`, `rel`, `closure`, `equiv`, `poset`)
  - `GLOSSARY: Array<{ en: string, zh: string, cat: string, def: string, alias?: string[] }>` (~95–110 entries)
  - `lookupTerm(raw: string)` and `ALL_PATTERNS: string[]` (sorted strictly longest-first)

- [ ] **Step 1: Write `tests/relation-glossary.test.mjs`**
  Assert: (a) `ALL_PATTERNS` is sorted by descending length with no empty strings; (b) `lookupTerm` resolves all `en` and `alias` keys case-insensitively; (c) autolinking a paragraph containing `"partial order"`, `"equivalence relation"`, `"least upper bound"`, `"one-to-one correspondence"`, and `<div class="callout">` never corrupts HTML attributes or splits multi-word terms.

- [ ] **Step 2: Run `npm test` to confirm failure**
  Run: `npm test`
  Expected: FAIL (`Cannot find module '../Relation/content/glossary.js'`)

- [ ] **Step 3: Author `Relation/content/glossary.js` and Tabs 0–3 Markdown (`overview.md`, `sets-functions.md`, `relations.md`, `equiv-poset.md`)**
  Cover 100% of Dr. Chan's 3 Slide decks + Tutorial 04–06, including frequency tags (`高频必考` / `概念速览`), chapter-number mapping (`Ch9` ↔ old `Ch5`), Slide 45 $M_{R_2\circ R_1}$ order warning, Tutorial 05 Q4a (`65536`) & Q7g (`xy ≥ 0` non-transitive) errata, Warshall cross-rule, Hasse 4-pair extremal/bound distinctions, and Lattice / Bounded / Complemented Lattice.

- [ ] **Step 4: Run `npm test` (validating glossary + all Markdown math/HTML rules)**
  Run: `npm test`
  Expected: PASS

- [ ] **Step 5: Commit Task 3**
  Commit message: `Add Relation chapter bilingual glossary and complete Ch2/Ch9 theory Markdown`

---

### Task 4: Midterm Test 02 Bilingual Exam, Step-by-Step Solutions, and Templates/Self-Test (Tabs 4–6)

**Files:**
- Create: `Relation/content/exam.md`
- Create: `Relation/content/q1.md`
- Create: `Relation/content/q2.md`
- Create: `Relation/content/q3.md`
- Create: `Relation/content/q4.md`
- Create: `Relation/content/q5.md`
- Create: `Relation/content/templates-review.md`
- Create: `Relation/Midterm-Review-Guide.md`

**Interfaces:**
- Consumes: `Relation/Midterm-Test-02.md` (verbatim English exam text & handwritten margin notes), `Relation/src/engine.js` verified results.
- Produces: Raw-importable `.md` modules for Tabs 4, 5, 6 and standalone `Relation/Midterm-Review-Guide.md` (pure Markdown without `<div class="bi">` wrappers).

- [ ] **Step 1: Extend `tests/markdown-conventions.test.mjs` to assert presence of all 11 `Relation/content/*.md` files and verify `Relation/Midterm-Review-Guide.md` contains zero `<div` raw HTML wrappers and valid standalone `$$` blocks**

- [ ] **Step 2: Run `npm test` to confirm failure**
  Run: `npm test`
  Expected: FAIL (missing `exam.md`, `q1.md`..`q5.md`, `templates-review.md`, `Midterm-Review-Guide.md`)

- [ ] **Step 3: Author `exam.md`, `q1.md`–`q5.md`, `templates-review.md`, and `Relation/Midterm-Review-Guide.md`**
  Include model English exam answers, handwritten note reviews (`{\R^+,0}` notation fix in Q1c, domain `ℤ` reflexivity in Q3c, subset greatest `None` in Q5c, `{10,13}` LUB = `650` lattice insight in Q5g), 8 SOP problem templates with Mermaid decision charts, and 10 self-test problems with collapsible solutions.

- [ ] **Step 4: Run `npm test` to verify all Markdown & standalone guide checks pass**
  Run: `npm test`
  Expected: PASS

- [ ] **Step 5: Commit Task 4**
  Commit message: `Add Midterm Test 02 bilingual paper, step-by-step solutions, SOP templates, and offline guide`

---

### Task 5: Static SVG Figures, Interactive React+SVG Sandboxes, `/Relation/` App Entry, Home & Docs

**Files:**
- Create: `Relation/src/figures.jsx`
- Create: `Relation/src/sandboxes.jsx`
- Create: `Relation/src/App.jsx`
- Create: `Relation/src/main.jsx`
- Create: `Relation/index.html`
- Modify: `src/styles.css` (add responsive styles for interactive matrix cells, sandbox controls, and Hasse/mapping badges)
- Modify: `src/Home.jsx`
- Modify: `vite.config.js`
- Modify: `README.md`

**Interfaces:**
- Consumes: `Relation/src/engine.js`, `src/components/ChapterUi.jsx`, `src/components/GlossaryView.jsx`, `src/components/Markdown.jsx`, `Relation/content/*`.
- Produces:
  - `Relation/src/figures.jsx`: `HeroFig`, `SetVennFig`, `CompositionOrderFig`, `EquivPartitionFig`
  - `Relation/src/sandboxes.jsx`: `FunctionMapperLab`, `RelationMatrixLab`, `HassePosetLab`
  - Vite entry `/Relation/` (`dist/Relation/index.html`) + updated `/` (`dist/index.html`).

- [ ] **Step 1: Add build-output & entry-registration assertions in `tests/build-smoke.test.mjs`**
  Assert `vite.config.js` registers `home`, `logic`, `relation`; `src/Home.jsx` orders `Logic-and-Proof` then `Relation` (`ready: true`); and `Relation/index.html` exists.

- [ ] **Step 2: Run `npm test` to watch `build-smoke.test.mjs` fail**
  Run: `npm test`
  Expected: FAIL

- [ ] **Step 3: Implement `figures.jsx`, `sandboxes.jsx`, `App.jsx`, `main.jsx`, `Relation/index.html`, responsive styles in `src/styles.css`, and update `src/Home.jsx`, `vite.config.js`, and `README.md`**

- [ ] **Step 4: Run `npm test` and `npm run build`**
  Run: `npm test && npm run build`
  Expected: PASS (`dist/index.html`, `dist/Logic-and-Proof/index.html`, `dist/Relation/index.html` emitted with 0 errors)

- [ ] **Step 5: Commit Task 5**
  Commit message: `Build Relation study webpage with interactive SVG sandboxes and enable on site home`

---

### Task 6: Real Browser Visual/Interactive QA, Independent Code Review, Final Sync & Push

**Files:**
- Any fixes surfaced by `ultracode/visual-evaluator` or `ultracode/reviewer`

- [ ] **Step 1: Start local preview server (`npm run preview`) and run `ultracode/visual-evaluator` + `ultracode/reviewer` in parallel**
  Verify `/`, `/Logic-and-Proof/`, and all 8 tabs + 3 interactive sandboxes + glossary popovers of `/Relation/` on desktop and mobile (375px), plus full spec/math/code review.

- [ ] **Step 2: Resolve any Critical/Important findings with tests + `npm test && npm run build`, stop preview server, and verify `git status` is clean**

- [ ] **Step 3: Push verified commits to `origin/main` per user's explicit authorization and report commit hashes & verification evidence**
