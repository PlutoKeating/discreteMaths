import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Mermaid from './Mermaid.jsx';

// ==关键词== → 暗红加粗放大（在深色卡片上为白色高亮）
const preprocess = (src) => src.replace(/==([^=\n]+?)==/g, '<strong class="kw">$1</strong>');

const katexOptions = {
  strict: false,
  trust: true,
  macros: { '\\Z': '\\mathbb{Z}', '\\R': '\\mathbb{R}' },
};

const components = {
  table: ({ node, ...props }) => (
    <div className="tbl"><table {...props} /></div>
  ),
  code: ({ node, className, children, ...props }) => {
    const lang = /language-(\w+)/.exec(className || '')?.[1];
    if (lang === 'mermaid') return <Mermaid chart={String(children).replace(/\n$/, '')} />;
    return <code className={className} {...props}>{children}</code>;
  },
  pre: ({ node, children, ...props }) => {
    // mermaid 代码块不需要 <pre> 外壳
    const child = Array.isArray(children) ? children[0] : children;
    if (child?.props?.className?.includes('language-mermaid')) return <>{children}</>;
    return <pre {...props}>{children}</pre>;
  },
};

export default function Markdown({ source }) {
  const text = useMemo(() => preprocess(source), [source]);
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, [rehypeKatex, katexOptions]]}
        components={components}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
