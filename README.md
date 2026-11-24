# 离散数学学习空间（discreteMaths）

以真实纯英文考卷（Midterm Test 01 / Test 02）为第一性原理构建的渐进式离散数学学习站点。每一门课都从零基础读者能懂的具体小问题出发，顺着攻克考卷真题的脉络水到渠成引出概念、交互实验与英文证明落笔示范，由 Cloudflare Workers 以静态资源形式发布。

## 目录结构

```
.
├── index.html                 # 学习空间首页入口（Vite 多页面入口之一）
├── src/
│   ├── main.jsx               # 首页挂载
│   ├── Home.jsx               # 首页：课程追问卡片列表（Logic → Relation → Counting → Graph）
│   ├── styles.css             # 沉静纸感编辑部设计令牌（浅色/深色）+ 阅读器与交互教具样式
│   └── components/
│       ├── CourseReader.jsx   # 渐进式连续阅读器（左侧分幕问题目录、内嵌实验、真题落笔框、分级练习与三个工具抽屉）
│       ├── courseStorage.js   # 本机分课程隔离存储（已读进度、各节思考笔记与 Markdown 导出）
│       ├── GlossaryView.jsx   # 术语检索视图（支持一键跳回正文首次讲解处）
│       ├── Markdown.jsx       # react-markdown + GFM + KaTeX + 原生 HTML + Mermaid
│       ├── Mermaid.jsx        # Mermaid 图表渲染
│       ├── Term.jsx           # 英文术语轻虚线点击释义气泡
│       └── markdownPreprocess.js # 术语自动识别与高亮预处理
├── Logic-and-Proof/           # 课程 01：逻辑与证明（以 Test 01 · 60 分为主线，4 幕 7 问，已开放）
│   ├── index.html             # 部署路径 /Logic-and-Proof/
│   ├── chapters/*.md          # 开篇引子与 s01–s07 问题式渐进正文
│   ├── content/exam.md        # Test 01 英文原题与中文逐句对照
│   ├── content/glossary.js    # 中英术语表（带正文讲解章节定位）
│   ├── src/                   # courseData.js、logicEngine.js、labs.jsx（3 座交互教具）、App.jsx、main.jsx
│   ├── Midterm-Review-Guide.md # 由 sync:guides 生成的纯 Markdown 渐进式离线同步讲义
│   ├── Midterm-Test-01.md     # 期中试卷 Test 01 原始转录（含手写附注）
│   └── Slides-2in1/、Tutorials/ # 课程 PDF（已 gitignore）
├── Relation/                  # 课程 02：集合、函数与二元关系（以 Test 02 · 76 分为主线，4 幕 12 问，已开放）
│   ├── index.html             # 部署路径 /Relation/
│   ├── chapters/*.md          # 开篇引子与 s01–s12 问题式渐进正文
│   ├── content/exam.md        # Test 02 英文原题与中文逐句对照
│   ├── content/glossary.js    # 中英术语表（101 条，带正文讲解章节定位）
│   ├── src/                   # courseData.js、engine.js、sandboxes.jsx（3 座交互教具）、App.jsx、main.jsx
│   ├── Midterm-Review-Guide.md # 由 sync:guides 生成的纯 Markdown 渐进式离线同步讲义
│   ├── Midterm-Test-02.md     # 期中试卷 Test 02 原始转录（76 分，含手写附注）
│   └── Slides-2in1/、Tutorials/ # 课程 PDF（已 gitignore）
├── Counting/ Graph/           # 后续课程资料目录（网页待建）
├── scripts/sync-guides.mjs    # 从课程源码同步生成两份离线 Midterm-Review-Guide.md
├── tests/*.test.mjs           # Node 原生测试（数学引擎、去术语堆砌检查、存储隔离、SSR 公式/粗体渲染校验）
├── vite.config.js             # 多页面入口注册
├── wrangler.jsonc             # Cloudflare Workers 静态资源配置（托管 dist/）
└── package.json
```

## 本地开发与验证

```bash
npm install
npm run dev          # 本地开发：/ 、 /Logic-and-Proof/ 与 /Relation/
npm run sync:guides  # 同步生成两门课的离线纯 Markdown 讲义
npm test             # 运行全部单元测试、教学叙事与 KaTeX/SSR 渲染检查
npm run build        # 构建静态产物至 dist/
npm run preview      # 本地预览生产构建产物
```

## 部署（Cloudflare Workers）

仓库已连接 Cloudflare Workers Builds，推送到 `main` 即自动执行 `npm run build` 与 `npx wrangler deploy` 发布 `dist/`。

## 新增或修改一门课程

1. 在章节目录创建 `chapters/opening.md`、`chapters/s01.md`… 及 `src/courseData.js`（遵循「具体情境切入 → 对话式追问 → 水到渠成首次定名 → 内嵌预测实验 → 考场英文落笔框 → 折叠分级练习/选读」结构），并在 `App.jsx` 挂载 `<CourseReader />`。
2. 在 `vite.config.js` 注册入口，在 `src/Home.jsx` 标记 `ready: true`。
3. 运行 `npm run sync:guides && npm test && npm run build` 确保离线讲义、公式块独立成行及 SSR 渲染零错误。
