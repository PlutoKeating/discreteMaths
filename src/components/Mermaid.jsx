import React, { useEffect, useId, useState } from 'react';

let mermaidPromise = null;
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => {
      const m = mod.default || mod;
      const dark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
      m.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        fontFamily: '"Inter","PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif',
        flowchart: { htmlLabels: true, curve: 'basis', padding: 12 },
        themeVariables: {
          primaryColor: dark ? '#21382f' : '#e4efe9',
          primaryTextColor: dark ? '#e7ece9' : '#22312b',
          primaryBorderColor: dark ? '#6ec4a3' : '#24634d',
          lineColor: dark ? '#8cd4b8' : '#24634d',
          secondaryColor: dark ? '#2a2824' : '#f3f2eb',
          tertiaryColor: dark ? '#1d2420' : '#fffefa',
          clusterBkg: dark ? '#1d2420' : '#fffefa',
          edgeLabelBackground: dark ? '#1d2420' : '#fffefa',
          fontSize: '14px',
        },
      });
      return m;
    });
  }
  return mermaidPromise;
}

export default function Mermaid({ chart }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  useEffect(() => {
    let alive = true;
    loadMermaid()
      .then((m) => m.render('mmd' + id, chart))
      .then((r) => {
        if (alive) setSvg(r.svg);
      })
      .catch((e) => {
        console.warn('mermaid', e);
        if (alive) setSvg('');
      });
    return () => {
      alive = false;
    };
  }, [chart, id]);

  if (!svg) return <pre className="mmd-src"><code>{chart}</code></pre>;
  return <div className="mmd" dangerouslySetInnerHTML={{ __html: svg }} />;
}
