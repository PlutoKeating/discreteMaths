import React, { useMemo } from 'react';
import CourseReader from '../../src/components/CourseReader.jsx';
import { buildLogicCourse } from './courseData.js';
import { ImplicationProbeLab, QuantifierGameLab, InferenceChainLab } from './labs.jsx';

import mdOpening from '../chapters/opening.md?raw';
import mdS01 from '../chapters/s01.md?raw';
import mdS02 from '../chapters/s02.md?raw';
import mdS03 from '../chapters/s03.md?raw';
import mdS04 from '../chapters/s04.md?raw';
import mdS05 from '../chapters/s05.md?raw';
import mdS06 from '../chapters/s06.md?raw';
import mdS07 from '../chapters/s07.md?raw';
import mdExam from '../content/exam.md?raw';
import mdRawExam from '../Midterm-Test-01.md?raw';

const LABS = {
  implication: ImplicationProbeLab,
  quantifier: QuantifierGameLab,
  inference: InferenceChainLab,
};

function LogicHeroVisual() {
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label="从一句真假判断生长出等价变形、量词先后手与严格证明">
      <g fill="none" stroke="var(--line)" strokeWidth="1.4">
        <rect x="18" y="18" width="324" height="194" rx="12" fill="var(--bg)" />
      </g>
      <g fontFamily="var(--font-reading)">
        <rect x="34" y="152" width="128" height="40" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="98" y="177" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="650">
          真假契约 p → q
        </text>

        <rect x="34" y="92" width="128" height="40" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="98" y="117" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">
          无表等价变形 (Q2)
        </text>

        <rect x="196" y="92" width="130" height="40" rx="8" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="261" y="117" textAnchor="middle" fill="var(--fg)" fontSize="13" fontWeight="600">
          量词先后手 (Q1a·Q4)
        </text>

        <rect x="196" y="34" width="130" height="40" rx="8" fill="var(--paper)" stroke="var(--warm)" strokeWidth="1.5" />
        <text x="261" y="59" textAnchor="middle" fill="var(--warm)" fontSize="13" fontWeight="650">
          推理与证明 (Q1b·Q5·Q6)
        </text>

        <g stroke="var(--accent)" strokeWidth="1.6" fill="none">
          <path d="M98 152 L98 134" />
          <path d="M162 172 C 210 172, 230 155, 242 134" />
          <path d="M162 112 L194 112" />
          <path d="M261 92 L261 76" />
        </g>
        <text x="36" y="54" fill="var(--muted)" fontSize="11.5">
          Test 01 · 60 分全链路
        </text>
        <text x="36" y="72" fill="var(--muted)" fontSize="11">
          每一步只问：真值怎么保住？
        </text>
      </g>
    </svg>
  );
}

export default function App() {
  const course = useMemo(() => {
    const base = buildLogicCourse({
      opening: mdOpening,
      s01: mdS01,
      s02: mdS02,
      s03: mdS03,
      s04: mdS04,
      s05: mdS05,
      s06: mdS06,
      s07: mdS07,
      exam: mdExam,
      rawExam: mdRawExam,
    });
    return {
      ...base,
      labs: LABS,
      heroVisual: <LogicHeroVisual />,
    };
  }, []);

  return <CourseReader course={course} />;
}
