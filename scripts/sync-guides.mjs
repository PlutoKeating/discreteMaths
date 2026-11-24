import fs from 'node:fs';
import path from 'node:path';
import { buildLogicCourse } from '../Logic-and-Proof/src/courseData.js';
import { buildRelationCourse } from '../Relation/src/courseData.js';

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function cleanForOffline(md) {
  return String(md || '')
    .replace(/\s*<!-- LAB -->\s*/g, '\n\n')
    .replace(/==\*\*([^*\n]+?)\*\*==/g, '**$1**')
    .replace(/==([^=\n]+?)==/g, '**$1**')
    .trim();
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
    cleanForOffline(course.opening.markdown),
    '',
  ];

  if (course.opening.checks?.length) {
    for (let i = 0; i < course.opening.checks.length; i += 1) {
      const chk = course.opening.checks[i];
      out.push(
        `<details>`,
        `<summary><strong>开篇自查 ${i + 1} · </strong>${chk.question}</summary>`,
        '',
        cleanForOffline(chk.answer),
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
      out.push(cleanForOffline(ch.markdown), '');

      if (ch.examBox) {
        out.push(`### 【考场真题落笔】${ch.examBox.title}`, '', cleanForOffline(ch.examBox.markdown), '');
      }

      if (ch.optionalReading) {
        out.push(
          `<details>`,
          `<summary><strong>选读 · ${ch.optionalReading.title}</strong></summary>`,
          '',
          cleanForOffline(ch.optionalReading.markdown),
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
          cleanForOffline(ch.practice.prompt),
          ''
        );
        if (ch.practice.hint) {
          out.push(
            `<details>`,
            `<summary>给我一点提示</summary>`,
            '',
            cleanForOffline(ch.practice.hint),
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
            cleanForOffline(ch.practice.solution),
            '',
            `</details>`,
            ''
          );
        }
        if (ch.practice.variant) {
          out.push(
            `#### 再改一个条件`,
            '',
            cleanForOffline(ch.practice.variant.prompt),
            '',
            `<details>`,
            `<summary>对照变式推理</summary>`,
            '',
            cleanForOffline(ch.practice.variant.solution),
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
