import React, { useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;
function init() {
  if (initialized) return;
  initialized = true;
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    fontFamily: '"Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif',
    flowchart: { htmlLabels: true, curve: 'basis', padding: 12 },
    themeVariables: {
      primaryColor: dark ? '#2a2f4d' : '#e3e7fa',
      primaryTextColor: dark ? '#ece8df' : '#1d1a16',
      primaryBorderColor: dark ? '#8fa0ff' : '#2d3d8f',
      lineColor: dark ? '#b3bfff' : '#2d3d8f',
      secondaryColor: dark ? '#3a2a4a' : '#fbe9e9',
      tertiaryColor: dark ? '#262939' : '#fbf8f1',
      clusterBkg: dark ? '#1f2130' : '#fbf8f1',
      edgeLabelBackground: dark ? '#1f2130' : '#ffffff',
      fontSize: '15px',
    },
  });
}

export default function Mermaid({ chart }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = useRef(null);
  const [svg, setSvg] = useState('');
  useEffect(() => {
    let alive = true;
    init();
    mermaid.render('mmd' + id, chart)
      .then((r) => { if (alive) setSvg(r.svg); })
      .catch((e) => { console.warn('mermaid', e); if (alive) setSvg(''); });
    return () => { alive = false; };
  }, [chart, id]);
  if (!svg) return <pre className="mmd-src"><code>{chart}</code></pre>;
  return <div className="mmd" ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />;
}
