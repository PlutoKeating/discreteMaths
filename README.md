# 离散数学学习站点（discreteMaths）

按章节整理的离散数学复习资料，每个章节子目录既存放原始资料（slides、tutorial、试卷、Markdown 笔记），也自带一个 React + Tailwind 构建的复习网页。构建后由 Cloudflare Workers 以静态资源形式发布。

## 目录结构

```
.
├── index.html                 # 站点首页入口（Vite 多页面入口之一）
├── src/
│   ├── main.jsx               # 首页挂载
│   ├── Home.jsx               # 首页：章节卡片列表（按课程推进顺序排列）
│   ├── styles.css             # 全站设计令牌 + Tailwind v4 + Markdown 与交互沙盘样式
│   └── components/
│       ├── ChapterUi.jsx      # 跨章节共用导航栏、小节标题、切角真题卡与 hash 路由 Hook
│       ├── GlossaryView.jsx   # 跨章节共用中英术语分类检索页
│       ├── Markdown.jsx       # react-markdown + GFM + KaTeX + 原生 HTML + Mermaid 代码块
│       ├── Mermaid.jsx        # Mermaid 流程图渲染组件
│       ├── Term.jsx           # 可点击术语悬浮/底部弹窗组件
│       ├── chapterHelpers.js  # 纯函数路由辅助
│       └── markdownPreprocess.js # 术语自动识别与高亮预处理
├── Logic-and-Proof/           # 第 1 模块：逻辑与证明（Ch1.1–1.6，已上线）
│   ├── index.html             # 本章网页入口 → 部署后路径 /Logic-and-Proof/
│   ├── src/                   # App.jsx、figures.jsx（SVG 示意图）、GlossaryPage.jsx、main.jsx
│   ├── content/*.md           # 页面正文（Markdown + LaTeX + Mermaid），含 Test 01 双语与精讲
│   ├── content/glossary.js    # 本章中英术语表
│   ├── Midterm-Review-Guide.md  # 同一份内容的纯 Markdown 离线版
│   ├── Midterm-Test-01.md     # 期中试卷 Test 01 原题
│   └── Slides-2in1/、Tutorials/ # 课程 PDF（已 gitignore）
├── Relation/                  # 第 2 模块：集合、函数与二元关系（Ch2.1–2.3, Ch9.1–9.6，已上线）
│   ├── index.html             # 本章网页入口 → 部署后路径 /Relation/
│   ├── src/                   # App.jsx、engine.js（离散数学算法引擎）、sandboxes.jsx（3 个交互沙盘）、figures.jsx、main.jsx
│   ├── content/*.md           # 体系精讲（集合与函数/关系与闭包/等价与偏序格）+ Test 02 双语与逐题精讲 + 模板自测
│   ├── content/glossary.js    # 本章中英术语表（约 100 条）
│   ├── Midterm-Review-Guide.md  # 同一份内容的纯 Markdown 离线同步版
│   ├── Midterm-Test-02.md     # 期中试卷 Test 02 原题（76 分，含手写附注）
│   └── Slides-2in1/、Tutorials/ # 课程 PDF（已 gitignore）
├── Counting/ Graph/           # 其他章节（资料目录，网页待建）
├── tests/                     # Node 原生测试（离散数学算法引擎、术语自动链接、Markdown 公式/容器规范、构建入口检查）
├── vite.config.js             # 多页面入口注册
├── wrangler.jsonc             # Cloudflare Workers 静态资源配置（托管 dist/）
└── package.json
```

## 本地开发与验证

```bash
npm install
npm run dev        # http://localhost:5173/ 、 /Logic-and-Proof/ 与 /Relation/
npm test           # 运行离散数学引擎单元测试与 Markdown/LaTeX 规范检查（node --test）
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

1. 在章节目录（如 `Counting/`）创建 `index.html`、`src/main.jsx`、`src/App.jsx`、`content/*.md`，复用 `src/components/ChapterUi.jsx` 与 `GlossaryView.jsx`。
2. 在 `vite.config.js` 的 `rollupOptions.input` 注册入口，例如 `counting: resolve(__dirname, 'Counting/index.html')`。
3. 在 `src/Home.jsx` 的 `CHAPTERS` 里把该章节标记为 `ready: true`。

## 内容书写约定（content/*.md）

- 公式用 LaTeX：行内 `$...$`；块级 `$$` 必须独占一行开头和结尾（否则 remark-math 会把后续全文吞进公式块，`npm test` 会自动校验）。
- 流程图用 ```mermaid 围栏。
- 重点术语用 `==词语==` 包裹，渲染为暗红加粗放大（深色卡片上为白色高亮）。
- 可以写原生 HTML 容器（`callout`、`proof`、双语对照 `bi > en / zh` 等），容器起止标签与内部 Markdown 之间要留空行。
- 英文术语：`content/glossary.js` 里的 `en` 和 `alias` 会在正文中自动识别并变为可点击弹窗（代码、公式、HTML 标签内不识别）；也可手动写 `[[term]]` 或 `[[term|显示文本]]`。新增术语只需在 glossary.js 加一条。
