import fs from 'node:fs';
import path from 'node:path';
import { buildLogicCourse } from '../Logic-and-Proof/src/courseData.js';
import { buildRelationCourse } from '../Relation/src/courseData.js';

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const OFFLINE_LAB_FALLBACKS = {
  'logic-and-proof:s01': [
    '把 $p$ 和 $q$ 的四种真假组合列在一起对照，一眼就能看清谁永远跟原话 $p \\to q$ 同生共死：',
    '',
    '| $p$（考满90） | $q$（请吃火锅） | 原话 $p\\to q$ | 无箭头 $\\neg p\\lor q$ | 逆否 $\\neg q\\to\\neg p$ | 逆命题 $q\\to p$ | 否命题 $\\neg p\\to\\neg q$ |',
    '|---|---|---|---|---|---|---|',
    '| T | T | **T** | **T** | **T** | T | T |',
    '| T | F | **F** | **F** | **F** | T | T |',
    '| F | T | **T** | **T** | **T** | F | F |',
    '| F | F | **T** | **T** | **T** | T | T |',
  ].join('\n'),
  'logic-and-proof:s03': [
    '把整数域 $\\mathbb{Z}$ 与正整数域 $\\mathbb{Z}^+$ 放在一起对比两局先后手的结果：',
    '',
    '| 式子 | 谁先出牌 | 在全体整数 $\\mathbb{Z}$ 上 | 在正整数 $\\mathbb{Z}^+ = \\{1,2,3,\\dots\\}$ 上 |',
    '|---|---|---|---|',
    '| $\\exists y\\,\\forall x\\,(x+y=10)$ | 你先定死 $y$ | **False**（对手总能挑 $x\\neq 10-y$ 拆台） | **False** |',
    '| $\\forall y\\,\\exists x\\,(x+y=10)$ | 对手先报 $y$ | **True**（你后手定制 $x=10-y\\in\\mathbb{Z}$） | **False**（对手出 $y=12$ 时 $x=-2\\notin\\mathbb{Z}^+$） |',
  ].join('\n'),
  'logic-and-proof:s05': [
    '把 Noah 和 Jessica 推不出来的两组具体反例世界列成对照表（所有题目前提 H1–H6 全为 **T**，但待查结论却为 **F**）：',
    '',
    '| 待查人物 | 上满全部课 | 上过某些课 | 理解内容 $M$ | 通过课程 $P$ | 受人尊敬 $R$ | 前提是否全真 | 待查结论真假 |',
    '|---|---|---|---|---|---|---|---|',
    '| **Noah** | F | F | F | F | **T** | 全部满足 ✓ | $\\neg R(\\text{Noah}) = \\mathbf{F}$ |',
    '| **Jessica** | F | F | F | **T** | F | 全部满足 ✓ | $\\neg P(\\text{Jessica}) = \\mathbf{F}$ |',
  ].join('\n'),
  'relation:s03': [
    '对比 $h(x) = |x/2|$ 在不同定义域与余域组合下的单射、满射与双射表现：',
    '',
    '| 选定的定义域 Domain | 选定的余域 Codomain | 单射 One-to-One？ | 满射 Onto？ | 双射（可逆）？ |',
    '|---|---|---|---|---|',
    '| $\\mathbb{R}$ | $\\mathbb{R}$ | 否（$h(-2)=h(2)=1$） | 否（$-1$ 无原像） | 否 |',
    '| $[0, +\\infty)$ | $[0, +\\infty)$ | **是**（$h(x)=x/2$ 严格递增） | **是**（取 $x=2y\\ge 0$） | **是**（$h^{-1}(y)=2y$） |',
    '| $(-\\infty, 0]$ | $[0, +\\infty)$ | **是**（$h(x)=-x/2$ 严格递减） | **是**（取 $x=-2y\\le 0$） | **是**（$h^{-1}(y)=-2y$） |',
  ].join('\n'),
  'relation:s06': [
    '> **快速复盘小结**：求复合矩阵 $M_{R_2\\circ R_1}$ 时左放 $M_{R_1}$、右放 $M_{R_2}$；求对称闭包算 $M_R \\lor M_R^T$；求传递闭包用 Warshall 算法从 $W_0$ 到 $W_n$ 逐步按第 $k$ 列与第 $k$ 行的 `1` 做十字交叉补 `1`（在线版 `/Relation/#s06` 提供可点击步进沙盘）。',
  ].join('\n'),
  'relation:s12': [
    '对比三种典型哈斯图为什么“是格”或“不是格”：',
    '',
    '| 偏序集例子 | 是否为格（Lattice）？ | 关键原因 |',
    '|---|---|---|',
    '| Test 02 Q5 $(\\{1,5,10,13,65,650\\}, \\mid)$ | **是（Yes）** | 全部不可比对（含 $\\{10,13\\}$，其唯一上界为 $650$）均有唯一 LUB 与 GLB |',
    '| Tutorial 06 Q12 $(\\{3,5,9,15,24,45\\}, \\mid)$ | **否（No）** | 缺封顶与垫底元素：$\\{24,45\\}$ 无公共上界，$\\{3,5\\}$ 无公共下界 |',
    '| 蝴蝶图 $\\{a,b\\} \\prec \\{c,d\\}$ | **否（No）** | $\\{a,b\\}$ 虽有公共上界 $\\{c,d\\}$，但 $c,d$ 不可比，无最小上界 LUB |',
  ].join('\n'),
};

function cleanForOffline(md, courseSlug = '', chapterId = '') {
  let s = String(md || '');

  // Rewrite online-only prompt lines right before <!-- LAB -->
  s = s.replace(/在下面的面板里拨动[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');
  s = s.replace(/在下面的博弈台里亲自试几个数字[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');
  s = s.replace(/打开下面的侦探面板[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');
  s = s.replace(/在下面的交互面板里试一试[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');
  s = s.replace(/在下面的沙盘里切换体验一下[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');
  s = s.replace(/在下面的哈斯图沙盘里[^\n]*\n+\s*<!-- LAB -->/, () => OFFLINE_LAB_FALLBACKS[`${courseSlug}:${chapterId}`] || '');

  s = s
    .replace(/再把面板上那组/g, '再把上方表里那组')
    .replace(/\s*<!-- LAB -->\s*/g, '\n\n')
    .replace(/==\*\*([^*\n]+?)\*\*==/g, '**$1**')
    .replace(/==([^=\n]+?)==/g, '**$1**');

  return s.trim();
}

function renderCourseToMarkdown(course, siteUrlPath) {
  const chapterMap = new Map(course.chapters.map((c) => [c.id, c]));
  const out = [
    `# ${course.shortTitle} · ${course.title}`,
    '',
    `> ${course.subtitle}`,
    `> 配套在线交互版路径：\`${siteUrlPath}\`（含交互实验教具、原卷双语抽屉、术语点击速查与本机笔记保存）。`,
    '',
    '---',
    '',
    '## 开篇 · 把真题摊在桌上',
    '',
    cleanForOffline(course.opening.markdown, course.slug, 'opening'),
    '',
  ];

  if (course.opening.checks?.length) {
    for (let i = 0; i < course.opening.checks.length; i += 1) {
      const chk = course.opening.checks[i];
      out.push(
        `<details>`,
        `<summary><strong>开篇自查 ${i + 1} · </strong>${chk.question}</summary>`,
        '',
        cleanForOffline(chk.answer, course.slug, 'opening'),
        '',
        `</details>`,
        ''
      );
    }
  }

  course.stages.forEach((st, sIdx) => {
    out.push(
      '---',
      '',
      `# 第 ${sIdx + 1} 幕：${st.title}（${st.targetMarks}）`,
      '',
      `> ${st.intro}`,
      ''
    );

    for (const cid of st.sectionIds) {
      const ch = chapterMap.get(cid);
      if (!ch) continue;
      out.push(`## ${ch.num} ${ch.title}`, '');
      if (ch.examTag) out.push(`*${ch.examTag}*`, '');
      out.push(cleanForOffline(ch.markdown, course.slug, ch.id), '');

      if (ch.examBox) {
        out.push(
          `### 【考场真题落笔】${ch.examBox.title}`,
          '',
          cleanForOffline(ch.examBox.markdown, course.slug, ch.id),
          ''
        );
      }

      if (ch.optionalReading) {
        out.push(
          `<details>`,
          `<summary><strong>选读 · ${ch.optionalReading.title}</strong></summary>`,
          '',
          cleanForOffline(ch.optionalReading.markdown, course.slug, ch.id),
          '',
          `</details>`,
          ''
        );
      }

      if (ch.practice) {
        out.push(
          `<details>`,
          `<summary><strong>练习 · ${ch.practice.title}</strong></summary>`,
          '',
          cleanForOffline(ch.practice.prompt, course.slug, ch.id),
          ''
        );
        if (ch.practice.hint) {
          out.push(
            `<details>`,
            `<summary>给我一点提示</summary>`,
            '',
            cleanForOffline(ch.practice.hint, course.slug, ch.id),
            '',
            `</details>`,
            ''
          );
        }
        if (ch.practice.solution) {
          out.push(
            `<details>`,
            `<summary>对照考场满分写法</summary>`,
            '',
            cleanForOffline(ch.practice.solution, course.slug, ch.id),
            '',
            `</details>`,
            ''
          );
        }
        if (ch.practice.variant) {
          out.push(
            `#### 再改一个条件`,
            '',
            cleanForOffline(ch.practice.variant.prompt, course.slug, ch.id),
            ''
          );
          if (ch.practice.variant.hint) {
            out.push(
              `<details>`,
              `<summary>提示</summary>`,
              '',
              cleanForOffline(ch.practice.variant.hint, course.slug, ch.id),
              '',
              `</details>`,
              ''
            );
          }
          out.push(
            `<details>`,
            `<summary>对照变式推理</summary>`,
            '',
            cleanForOffline(ch.practice.variant.solution, course.slug, ch.id),
            '',
            `</details>`,
            ''
          );
        }
        out.push(`</details>`, '');
      }
    }
  });

  return out.join('\n').trim() + '\n';
}

const logicMd = {
  opening: read('Logic-and-Proof/chapters/opening.md'),
  exam: read('Logic-and-Proof/content/exam.md'),
  rawExam: read('Logic-and-Proof/Midterm-Test-01.md'),
};
for (let i = 1; i <= 7; i += 1) {
  const id = `s${String(i).padStart(2, '0')}`;
  logicMd[id] = read(`Logic-and-Proof/chapters/${id}.md`);
}
const logicCourse = buildLogicCourse(logicMd);
fs.writeFileSync(
  path.join(ROOT, 'Logic-and-Proof/Midterm-Review-Guide.md'),
  renderCourseToMarkdown(logicCourse, '/Logic-and-Proof/')
);

const relMd = {
  opening: read('Relation/chapters/opening.md'),
  exam: read('Relation/content/exam.md'),
  rawExam: read('Relation/Midterm-Test-02.md'),
};
for (let i = 1; i <= 12; i += 1) {
  const id = `s${String(i).padStart(2, '0')}`;
  relMd[id] = read(`Relation/chapters/${id}.md`);
}
const relCourse = buildRelationCourse(relMd);
fs.writeFileSync(
  path.join(ROOT, 'Relation/Midterm-Review-Guide.md'),
  renderCourseToMarkdown(relCourse, '/Relation/')
);

console.log('Synced Logic-and-Proof/Midterm-Review-Guide.md and Relation/Midterm-Review-Guide.md');
