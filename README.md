# 离散数学学习站点（discreteMaths）

按章节整理的离散数学复习资料，每个章节子目录既存放原始资料（slides、tutorial、试卷、Markdown 笔记），也自带一个 React + Tailwind 构建的复习网页。构建后由 Cloudflare Workers 以静态资源形式发布。

## 目录结构

```
.
├── index.html                 # 站点首页入口（Vite 多页面入口之一）
├── src/
│   ├── main.jsx               # 首页挂载
│   ├── Home.jsx               # 首页：章节卡片列表（新增章节在此加一行）
│   ├── styles.css             # 全站设计令牌 + Tailwind v4 + Markdown 排版样式
│   └── components/
│       ├── Markdown.jsx       # react-markdown + GFM + KaTeX + 原生 HTML + Mermaid 代码块
│       └── Mermaid.jsx        # Mermaid 流程图渲染组件
├── Logic-and-Proof/           # 第 1 章：逻辑与证明
│   ├── index.html             # 本章网页入口 → 部署后路径 /Logic-and-Proof/
│   ├── src/                   # App.jsx（页面结构）、figures.jsx（SVG 示意图）、main.jsx
│   ├── content/*.md           # 页面正文（Markdown + LaTeX + Mermaid），按标签页拆分
│   ├── Midterm-Review-Guide.md  # 同一份内容的纯 Markdown 版本
│   ├── Midterm-Test-01.md     # 期中试卷原题
│   ├── Slides-2in1/、Tutorials/ # 课程 PDF（已 gitignore）
├── Counting/ Relation/ Graph/ # 其他章节（资料目录，网页待建）
├── vite.config.js             # 多页面入口注册
├── wrangler.jsonc             # Cloudflare Workers 静态资源配置（托管 dist/）
└── package.json
```

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173/  与  http://localhost:5173/Logic-and-Proof/
npm run build      # 产物输出到 dist/，保持子目录结构
npm run preview    # 本地预览构建产物
```

## 部署（Cloudflare Workers）

仓库已连接 Cloudflare Workers Builds，推送到 `main` 即自动构建部署。控制台里的设置：

| 字段 | 值 |
|---|---|
| 构建命令 | `npm run build` |
| 部署命令 | `npx wrangler deploy` |
| 根目录 / 路径 | `/` |

`wrangler.jsonc` 声明 `assets.directory = ./dist`，没有 Worker 脚本，纯静态托管。本地手动部署：`npm run deploy`。

## 新增一个章节网页

1. 在章节目录（如 `Counting/`）创建 `index.html`、`src/main.jsx`、`src/App.jsx`、`content/*.md`，结构参照 `Logic-and-Proof/`。
2. 在 `vite.config.js` 的 `rollupOptions.input` 注册入口，例如 `counting: resolve(__dirname, 'Counting/index.html')`。
3. 在 `src/Home.jsx` 的 `CHAPTERS` 里把该章节标记为 `ready: true`。

## 内容书写约定（content/*.md）

- 公式用 LaTeX：行内 `$...$`；块级 `$$` 必须独占一行开头和结尾（否则 remark-math 会把后续全文吞进公式块）。
- 流程图用 ```mermaid 围栏。
- 重点术语用 `==词语==` 包裹，渲染为暗红加粗放大（深色卡片上为白色高亮）。
- 可以写原生 HTML 容器（`callout`、`proof` 等），容器起止标签与内部 Markdown 之间要留空行。
