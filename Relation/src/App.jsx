import React, { useMemo } from 'react';
import CourseReader from '../../src/components/CourseReader.jsx';
import { buildRelationCourse } from './courseData.js';
import { FunctionMapperLab, RelationMatrixLab, HassePosetLab } from './sandboxes.jsx';

import mdOpening from '../chapters/opening.md?raw';
import mdS01 from '../chapters/s01.md?raw';
import mdS02 from '../chapters/s02.md?raw';
import mdS03 from '../chapters/s03.md?raw';
import mdS04 from '../chapters/s04.md?raw';
import mdS05 from '../chapters/s05.md?raw';
import mdS06 from '../chapters/s06.md?raw';
import mdS07 from '../chapters/s07.md?raw';
import mdS08 from '../chapters/s08.md?raw';
import mdS09 from '../chapters/s09.md?raw';
import mdS10 from '../chapters/s10.md?raw';
import mdS11 from '../chapters/s11.md?raw';
import mdS12 from '../chapters/s12.md?raw';
import mdExam from '../content/exam.md?raw';
import mdRawExam from '../Midterm-Test-02.md?raw';

const LABS = {
  functionMapper: FunctionMapperLab,
  relationMatrix: RelationMatrixLab,
  hassePoset: HassePosetLab,
};

function RelationHeroVisual() {
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label="从有序对配对出发，衍生出可逆函数、关系矩阵、等价划分与偏序哈斯图">
      <g fill="none" stroke="var(--line)" strokeWidth="1.4">
        <rect x="18" y="18" width="324" height="194" rx="12" fill="var(--bg)" />
      </g>
      <g fontFamily="var(--font-reading)">
        <rect x="34" y="152" width="128" height="40" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="98" y="177" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="650">
          集合与配对 (a, b)
        </text>

        <rect x="34" y="92" width="128" height="40" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="98" y="117" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">
          可逆函数手术 (Q1)
        </text>

        <rect x="196" y="152" width="130" height="40" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="261" y="177" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">
          0-1 矩阵闭包 (Q2)
        </text>

        <rect x="196" y="92" width="130" height="40" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="261" y="117" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">
          性质与等价证明 (Q3·Q4)
        </text>

        <rect x="196" y="34" width="130" height="40" rx="8" fill="var(--paper)" stroke="var(--warm)" strokeWidth="1.5" />
        <text x="261" y="59" textAnchor="middle" fill="var(--warm)" fontSize="13" fontWeight="650">
          Hasse 图与格 (Q5)
        </text>

        <g stroke="var(--accent)" strokeWidth="1.6" fill="none">
          <path d="M98 152 L98 134" />
          <path d="M162 172 L194 172" />
          <path d="M261 152 L261 134" />
          <path d="M261 92 L261 76" />
        </g>
        <text x="36" y="54" fill="var(--muted)" fontSize="11.5">
          Test 02 · 76 分全链路
        </text>
        <text x="36" y="72" fill="var(--muted)" fontSize="11">
          同一个“配对”的四种约束
        </text>
      </g>
    </svg>
  );
}

export default function App() {
  const course = useMemo(() => {
    const base = buildRelationCourse({
      opening: mdOpening,
      s01: mdS01,
      s02: mdS02,
      s03: mdS03,
      s04: mdS04,
      s05: mdS05,
      s06: mdS06,
      s07: mdS07,
      s08: mdS08,
      s09: mdS09,
      s10: mdS10,
      s11: mdS11,
      s12: mdS12,
      exam: mdExam,
      rawExam: mdRawExam,
    });
    return {
      ...base,
      labs: LABS,
      heroVisual: <RelationHeroVisual />,
    };
  }, []);

  return <CourseReader course={course} />;
}
