const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 把正文中出现的英文术语自动包成 [[key|显示文本]]，跳过代码、公式、HTML 标签和已有标注。
export function autolink(src, patterns) {
  if (!patterns?.length) return src;
  const keep = [];
  const stash = (m) => {
    keep.push(m);
    return `\u0000${keep.length - 1}\u0000`;
  };
  let s = src.replace(/```[\s\S]*?```|`[^`\n]+`|\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|<[^>\n]+>|\[\[[^\]]+\]\]/g, stash);
  for (const p of patterns) {
    const re = new RegExp(`(?<![A-Za-z0-9_\\-\u0000])(${esc(p)})(?![A-Za-z0-9_\\-])`, 'gi');
    s = s.replace(re, (m) => stash(`[[${p}|${m}]]`));
  }
  while (/\u0000\d+\u0000/.test(s)) s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
  return s;
}

export const preprocess = (src, patterns) =>
  autolink(src, patterns)
    .replace(/==([^=\n]+?)==/g, '<strong class="kw">$1</strong>')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<abbr data-term="$1">$2</abbr>')
    .replace(/\[\[([^\]]+)\]\]/g, '<abbr data-term="$1">$1</abbr>');
