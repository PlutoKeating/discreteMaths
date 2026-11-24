import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Mermaid from './Mermaid.jsx';
import Term from './Term.jsx';
import { preprocess } from './markdownPreprocess.js';

const katexOptions = {
  strict: false,
  trust: true,
  macros: {
    '\\Z': '\\mathbb{Z}',
    '\\R': '\\mathbb{R}',
    '\\N': '\\mathbb{N}',
    '\\Q': '\\mathbb{Q}',
  },
};

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
