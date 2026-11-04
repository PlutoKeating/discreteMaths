import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Mermaid from './Mermaid.jsx';
import Term from './Term.jsx';

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 把正文中出现的英文术语自动包成 [[key|显示文本]]，跳过代码、公式、HTML 标签和已有标注。
function autolink(src, patterns) {
  if (!patterns?.length) return src;
  const keep = [];
  const stash = (m) => { keep.push(m); return `\u0000${keep.length - 1}\u0000`; };
  let s = src.replace(/```[\s\S]*?```|`[^`\n]+`|\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|<[^>\n]+>|\[\[[^\]]+\]\]/g, stash);
  for (const p of patterns) {
    const re = new RegExp(`(?<![A-Za-z0-9_\\-\u0000])(${esc(p)})(?![A-Za-z0-9_\\-])`, 'gi');
    s = s.replace(re, (m) => stash(`[[${p}|${m}]]`));
  }
  while (/\u0000\d+\u0000/.test(s)) s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
  return s;
}

const preprocess = (src, patterns) =>
  autolink(src, patterns)
    .replace(/==([^=\n]+?)==/g, '<strong class="kw">$1</strong>')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<abbr data-term="$1">$2</abbr>')
    .replace(/\[\[([^\]]+)\]\]/g, '<abbr data-term="$1">$1</abbr>');

const katexOptions = { strict: false, trust: true, macros: { '\\Z': '\\mathbb{Z}', '\\R': '\\mathbb{R}' } };

function makeComponents(lookup) {
  return {
    table: ({ node, ...props }) => <div className="tbl"><table {...props} /></div>,
    abbr: ({ node, children, ...props }) => {
      const key = props['data-term'];
      const term = key && lookup ? lookup(key) : null;
      return term ? <Term term={term}>{children}</Term> : <abbr {...props}>{children}</abbr>;
    },
    code: ({ node, className, children, ...props }) => {
      const lang = /language-(\w+)/.exec(className || '')?.[1];
      if (lang === 'mermaid') return <Mermaid chart={String(children).replace(/\n$/, '')} />;
      return <code className={className} {...props}>{children}</code>;
    },
    pre: ({ node, children, ...props }) => {
      const child = Array.isArray(children) ? children[0] : children;
      if (child?.props?.className?.includes('language-mermaid')) return <>{children}</>;
      return <pre {...props}>{children}</pre>;
    },
  };
}

export default function Markdown({ source, glossary }) {
  const text = useMemo(() => preprocess(source, glossary?.patterns), [source, glossary]);
  const components = useMemo(() => makeComponents(glossary?.lookup), [glossary]);
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, [rehypeKatex, katexOptions]]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
