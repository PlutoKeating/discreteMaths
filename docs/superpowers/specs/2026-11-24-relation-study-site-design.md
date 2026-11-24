# Relation（集合、函数、二元关系、等价与偏序）学习站点设计规格书

- **日期**：2026-11-24
- **范围**：`Relation/` 章节学习网页与离线讲义建设 + 跨章节共用 UI 抽离 + 首页排序对齐
- **对应课程模块**：Dr. Patrick Chan《Discrete Mathematics》（SCUT 2026–2027 第一学期）`Relation` 大章：
  - `Ch2.1, 2.2, 2.3: Sets and Functions`（课件标号 2.1–2.3，配套 `Tutorial 04`）
  - `Ch9.1, 9.2, 9.3: Relations and Properties`（课件内页旧版标号 5.1–5.4，含 $n$ 元关系、关系表示、闭包与 Warshall 算法，配套 `Tutorial 05`）
  - `Ch9.5, 9.6: Equivalence and Partial Orderings`（课件内页旧版标号 5.5–5.6，含等价关系/等价类/划分、偏序/全序/字典序/良序、Hasse 图、极值与上下界、格 Lattice / 有界格 / 有补格，配套 `Tutorial 06`）
  - 真题：`Relation/Midterm-Test-02.md`（共 5 大题，76 分，含卷面手写附注）

---

## 1. 背景与立意（Intent & Why）

本项目面向华南理工大学未来技术学院纯英文授课、纯英文命题的《离散数学》课程复习需求。第 1 章 `Logic-and-Proof` 已建立了高口碑的「第一性原理串讲 + 中英术语点击即查 + 真题双语精讲 + 题型 SOP 模板 + 纸墨靛蓝/暗红视觉体系」模式。

进入第 2 大模块 `Relation`（涵盖集合、函数、关系性质与闭包、等价关系与偏序/格），学习痛点发生明显变化：
1. **概念跨度大且层层递进**：从集合元素归属 $x \in A$，到有序对与笛卡尔积 $A \times B$，再到关系 $R \subseteq A \times B$、函数（每个输入恰有一个输出的特殊关系）、等价关系（泛化的 $=$）与偏序关系（泛化的 $\le$），学生容易把孤立定义死记硬背，看不见它们全都是第 1 章谓词 $P(x)$ 与二元谓词 $R(x,y)$ 的集合化表达。
2. **高度依赖画图与矩阵推演**：课程期末笔记（`FinalReviewNotes.pdf`）反复强调「`SET/function/relation 有 proof 和 画图`」。0-1 矩阵布尔积、Warshall 传递闭包递推、Hasse 图脱去自环与传递边、极小元/最小元与上下界/格的判定、限制定义域构造双射，仅靠文字极难建立直觉。
3. **老师课件存在多处专属符号约定与答案勘误点**：必须显式拆解，防止考场踩坑。

因此，本章站点既要延续 `Logic-and-Proof` 的阅读质感与应试实战性，又要升级为**「分模块体系精讲 + Test 02 真题双核驱动 + 原生 React/SVG 交互式图解沙盘」**。

---

## 2. 目标、非目标与反目标（Goals, Non-Goals, Anti-Goals）

### 2.1 目标（Goals）
1. **完整覆盖 Image 1 与老师 3 份 PPT + Tutorial 04–06 全部内容**，并用视觉标签明确区分「高频必考」与「概念速览」（如位串集合运算、$n$ 元关系数据库操作、字典序、良序、有界格/有补格）。
2. **第一性原理贯通**：从「一元谓词真值集 = 集合、二元谓词真值集 = 关系」出发，一条主线串起集合、函数、关系性质、闭包、等价划分、偏序与格。
3. **100% 精讲 `Midterm-Test-02.md`（76 分）与 Tutorial 经典题型**：提供试卷英文原文与中文逐句并排对照、读题指令词拆解、每道题的标准英文答题示范（可直接搬上考卷）、手写附注复盘与常见失分点纠偏。
4. **内置 3 个零外部依赖的原生 React + SVG 交互沙盘** + 多幅纸墨立体静态 SVG 示意图与 Mermaid 决策流程图。
5. **抽离跨章节共用 UI 组件**至 `src/components/`，保证 `Logic-and-Proof` 零回归，并为后续 `Counting`、`Graph` 铺平道路。
6. **同步产出离线单文件讲义** `Relation/Midterm-Review-Guide.md`，更新 `src/Home.jsx` 章节顺序、`vite.config.js` 多页面入口与 `README.md` 文档。

### 2.2 非目标（Non-Goals）
- **不新增或写入任何 PDF 文件**（用户已确认远端 PDF 暂不写入本地）。
- **不在本次任务中建设 `Counting/` 与 `Graph/` 网页**（仅在首页对齐顺序并保持 `ready: false`）。
- **不引入 D3、Zustand、Lucide 等任何新增 npm 依赖**，完全复用现有 React 18 + Tailwind v4 + KaTeX + Mermaid 技术栈。
- **未经用户后续显式指令，不执行 `git push`**（仅按 `AGENTS.md` 完成清晰的本地原子 `git commit`）。

### 2.3 反目标（Anti-Goals）
- **绝不堆砌无推导的定义抄写**：每个公式/性质都必须说明「几何/图论直觉是什么、矩阵长什么样、怎么证成立、怎么举反例证不成立」。
- **绝不混淆老师课件的复合矩阵符号顺序**：必须醒目指出 Slide 45 中 $M_{R_2 \circ R_1}$ 的真实下标定义是先作用矩阵 $M_{R_1}$ 的第 $i$ 行与后作用矩阵 $M_{R_2}$ 的第 $j$ 列做布尔内积（即标准布尔积 $M_{R_1} \odot M_{R_2}$）。
- **绝不破坏 `Logic-and-Proof/` 现有页面**：URL（`/Logic-and-Proof/`）、7 个 hash 锚点、视觉排版、术语弹窗与构建产物必须保持完全兼容。
- **绝不出现公式渲染吞字或移动端横向溢出**：块级公式 `$$` 必须独占一行；原生 HTML 容器内外必须留空行；SVG 与矩阵沙盘在 375px 窄屏下必须自适应或平滑滚动。

---

## 3. 候选方案对比与选定方案（Approaches）

| 方案 | 核心思路 | 权衡分析 | 结论 |
|---|---|---|---|
| **方案 A：分模块体系精讲 + 真题双核 + 原生 SVG 交互沙盘** | 保持 `/Relation/` 单入口 MPA，设 8 个清晰 Tab（总纲 + 3 个理论模块 Tab + 试卷双语 Tab + 逐题精讲 Tab + 模板与易错自测 Tab + 术语表 Tab），在对应理论与真题处嵌入 3 个原生 React+SVG 交互沙盘 | 兼顾「按课件章节系统复习」与「考前按真题突击」两条路径；三大模块各自舒展不拥挤；零新依赖、构建包体极轻 | **用户已选定** |
| **方案 B：严格复刻 Logic 7-Tab 纯试卷中心结构** | 将 Ch2.1–2.3、Ch9.1–9.3、Ch9.5–9.6 全部塞入单一「公式总表」Tab，仅用静态 SVG | 跨度极大的三大块理论挤在同一页会导致超长滚动，且缺少矩阵/Hasse 图动手推演 | 放弃 |
| **方案 C：拆分为 `/Sets-and-Functions/` 与 `/Relation/` 两个独立站点** | 首页拆成两张卡片、两个 Vite 入口 | 违背 `bd.htm` 课程大纲归组，且 `Midterm-Test-02` 同时考查函数与关系/偏序，强行拆分会导致真题割裂 | 放弃 |

---

## 4. 详细架构与模块设计（Detailed Design）

### 4.1 跨章节共用 UI 组件抽离（`src/components/`）

保留 `src/components/Markdown.jsx`、`Mermaid.jsx`、`Term.jsx`（在 `Markdown.jsx` 的 `katexOptions.macros` 中保留 `\Z`、`\R` 并补充 `\N: '\\mathbb{N}'`、`\Q: '\\mathbb{Q}'`，同时正文中优先使用标准 `\mathbb{...}` 以兼容外部 Markdown 阅读器）。新增两个轻量共用组件：

1. **`src/components/ChapterUi.jsx`**：
   - `ChapterNav({ tabs, cur })`：吸顶毛玻璃胶囊导航栏（点击切换 `location.hash`，支持 `aria-selected`）。
   - `SectionHead({ eyebrow, title, desc })`：统一的小节眉标 + 阴影标题 + 宋体导语。
   - `QCard({ no, marks, title, verdicts, children })`：切角立体真题精讲卡片（支持小问结论徽章）。
   - `useHashTab(tabs, defaultId = 'overview')`：封装 hash 读取、`hashchange` 监听与切换回顶逻辑。
2. **`src/components/GlossaryView.jsx`**：
   - 接收 `{ glossary, cats }` props，提供统一的搜索框（支持英文/中文/释义/别名过滤）、条数统计与分类词条列表。
   - `Logic-and-Proof/src/GlossaryPage.jsx` 改为对 `GlossaryView` 的薄封装（传入 `Logic` 的 `GLOSSARY` 和 `CATS`），`Logic-and-Proof/src/App.jsx` 复用 `ChapterUi.jsx`，确保零功能与视觉变化。

### 4.2 首页与构建配置更新

1. **`src/Home.jsx`**：
   - 调整 `CHAPTERS` 顺序以对齐 `bd.htm` 与考试推进顺序：
     1. `逻辑与证明` (`/Logic-and-Proof/`, `ready: true`)
     2. `集合、函数与关系` (`/Relation/`, `ready: true`, `sub: 'Ch2.1–2.3 · Ch9.1–9.3 · Ch9.5–9.6 · Sets · Functions · Relations · Equivalence · Posets'`, `desc: '集合与函数双射、关系矩阵与 Warshall 闭包、等价划分、Hasse 图与格（Lattice）体系精讲，配交互沙盘与 Test 02 逐题解析。'`)
     3. `计数与递推` (`/Counting/`, `ready: false`)
     4. `图论` (`/Graph/`, `ready: false`)
2. **`vite.config.js`**：
   - 在 `build.rollupOptions.input` 新增 `relation: resolve(__dirname, 'Relation/index.html')`。

### 4.3 `Relation/` 目录结构与 8-Tab 内容规划

```text
Relation/
├── index.html                    # 本章独立页面入口（标题：集合、函数与关系复习指南 · 离散数学，图标符号 ⊆ / ∼）
├── Midterm-Test-02.md            # 已有真题原件（保留不改）
├── Midterm-Review-Guide.md       # 新增：同一套核心内容的纯 Markdown 离线完整讲义
├── src/
│   ├── main.jsx                  # 挂载入口（引入 styles.css 与 katex.min.css）
│   ├── App.jsx                   # Hero + 8-Tab 主框架
│   ├── figures.jsx               # 纸墨立体静态 SVG 示意图集合（复用 3D Slab / 纸卡视觉风格）
│   └── sandboxes.jsx             # 3 个原生 React + SVG 交互式图解沙盘
└── content/
    ├── glossary.js               # 中英术语表（约 90–110 条，含自动识别正则导出）
    ├── overview.md               # Tab 0：第一性原理总纲（从谓词到集合、函数、关系、等价与偏序）
    ├── sets-functions.md         # Tab 1：Ch2.1–2.3 集合与函数全讲
    ├── relations.md              # Tab 2：Ch9.1–9.3 关系、矩阵/图表示、性质、运算、闭包与 Warshall
    ├── equiv-poset.md            # Tab 3：Ch9.5–9.6 等价关系/划分、偏序/全序/字典序/良序、Hasse 图、极值上下界与格
    ├── exam.md                   # Tab 4：Midterm Test 02 原题中英双语逐题并排对照 + 读题要点
    ├── q1.md                     # Tab 5 子题 1：函数复合、加和、值域与限制定义域构造双射（12 分）
    ├── q2.md                     # Tab 5 子题 2：关系矩阵逆、补、异或、复合、传递闭包与对称闭包（24 分）
    ├── q3.md                     # Tab 5 子题 3：三道典型关系的 8 项性质全判定（12 分）
    ├── q4.md                     # Tab 5 子题 4：对称关系交集仍对称的证明（8 分）
    ├── q5.md                     # Tab 5 子题 5：{1,5,10,13,65,650} 整除偏序 Hasse 图、极值上下界、全序与格判定（20 分）
    └── templates-review.md       # Tab 6：八大题型标准英文答题模板 + 卷面与 Tutorial 易错复盘 + 期末自测题（含折叠参考答案）
```

### 4.4 各模块核心知识点与关键勘误/陷阱清单（必须准确写入正文）

1. **Tab 0 · 第一性原理总纲（`overview.md`）**：
   - 一句话底层统一：集合 $A = \{x \mid P(x)\}$ 是一元谓词的真值集；二元关系 $R \subseteq A \times B$ 是二元谓词 $R(a,b)$ 的真值集（在有限集上就是一张填满 `0/1` 的真值矩阵 $M_R$）。
   - 三条演化分支：
     - **加「唯一输出」约束** $\forall a\in A\,\exists! b\in B\,((a,b)\in f)$ $\Longrightarrow$ **函数 Function**；
     - **加「自反 + 对称 + 传递」**（抽象「相等 $=$」）$\Longrightarrow$ **等价关系 Equivalence Relation** $\Longleftrightarrow$ 把集合切分成不重不漏的**划分 Partition**；
     - **加「自反 + 反对称 + 传递」**（抽象「小等于 $\le$ / 整除 $|$ / 包含 $\subseteq$」）$\Longrightarrow$ **偏序 Poset** $\Longrightarrow$ **Hasse 图**与**格 Lattice**。
   - 附新旧版教材章节号对照表（网页 Rosen 7/8 版 `Ch2.1–2.3, Ch9.1–9.6` ↔ 老师课件页脚 Rosen 5 版 `Ch2.1–2.3, Ch5.1–5.6`）。

2. **Tab 1 · 集合与函数（`sets-functions.md`）**：
   - **必考核心**：集合相等（互相包含 $A\subseteq B \land B\subseteq A$）、元素归属 $\in$ vs 子集 $\subseteq$ 辨析（重点拆解 $\varnothing$ vs $\{\varnothing\}$ vs $\{\varnothing, \{\varnothing\}\}$，对应 Tutorial 04 Q3–Q5）、幂集 $\mathcal{P}(S)$（$|\mathcal{P}(S)|=2^n$）、有序 $n$ 元组与笛卡尔积（为什么 $A\times B \neq B\times A$，且 $A\times B\times C \neq (A\times B)\times C$，Tutorial 04 Q7）、集合运算（$\cup, \cap, -, \overline{A}, \oplus$）与集合恒等式三大证法（互含元素追逐法、集合代数定律法、成员表法）。
   - **概念速览**：两集合/三集合容斥原理 $|A\cup B\cup C|$、计算机位串（Bit String）表示集合（$\cup\leftrightarrow\text{OR}, \cap\leftrightarrow\text{AND}, \oplus\leftrightarrow\text{XOR}$）。
   - **函数核心**：函数判定三禁区（漏定义如 $1/x$、定义域外无值如 $\sqrt{x}$、一输入多输出如 $\pm\sqrt{x^2+1}$，Tutorial 04 Q11；以及「关系 $R$ 何时是函数」：每行恰好一个 `1`）、定义域/余域/值域（Domain / Codomain / Range）、函数加积 $(f+g)(x), (fg)(x)$、单射（One-to-One / Injective：$\forall a,b\,(f(a)=f(b)\to a=b)$，否证举 $a\neq b$ 但 $f(a)=f(b)$）、满射（Onto / Surjective：$\forall b\in B\,\exists a\in A\,(f(a)=b)$，注意 $\mathbb{Z}\to\mathbb{Z}$ 与 $\mathbb{R}\to\mathbb{R}$ 结果截然不同，如 $\lceil n/2\rceil$，Tutorial 04 Q13）、双射（One-to-One Correspondence / Bijection）与可逆函数 $f^{-1}$、复合函数 $(f\circ g)(x)=f(g(x))$、**限制定义域与余域构造双射**（Tutorial 04 Q14 $e^x$ 与 Test 02 Q1d $|x/2|$）。

3. **Tab 2 · 关系性质与闭包（`relations.md`）**：
   - **必考核心**：二元关系定义、有向图（Digraph）与 0-1 矩阵 $M_R$ 表示；**六大性质全对比表**（Reflexive 自反、Irreflexive 反自反、Symmetric 对称、Antisymmetric 反对称、Asymmetric 非对称、Transitive 传递 —— 逐列列出**逻辑定义、有向图特征、0-1 矩阵特征、证明套路、反例套路**）。
   - **三大高频认知陷阱**：
     - 自反 vs 反自反**不是非此即彼**（对角线有 0 有 1 时既不自反也不反自反）；
     - 对称 vs 反对称**既可同时成立**（对角线子集，如恒等关系 $I_A$，Tutorial 05 Q7c），**也可同时不成立**；而非对称 Asymmetric $\iff$ 反自反 + 反对称（对角线全 0 且无双向边）；
     - 空真（Vacuously True）陷阱：没有 $(a,b),(b,c)$ 链条的关系自动传递！但注意 $xy\ge 0$ 在 $\mathbb{R}$ 上**不传递**（反例 $(-1,0)\in R, (0,2)\in R$ 但 $(-1,2)\notin R$，专门指出 **Tutorial 05 Q7g 答案误判为传递**的勘误！）。
   - **关系计数公式家族**（含 **Tutorial 05 Q4a 勘误**：$n=4$ 时关系总数是 $2^{16}=65536$ 而非答案误印的 `65535`）：总数 $2^{n^2}$、自反 $2^{n(n-1)}$、反自反 $2^{n(n-1)}$、对称 $2^{n(n+1)/2}$、反对称 $2^n \cdot 3^{n(n-1)/2}$、非对称 $3^{n(n-1)/2}$。
   - **关系运算与矩阵对应**：$R_1\cup R_2$（按位 $\lor$）、$R_1\cap R_2$（按位 $\land$）、$\overline{R}$（0/1 取反）、$R_1 - R_2$、$R_1\oplus R_2$（按位异或 $\oplus$）、逆关系 $R^{-1}$（矩阵转置 $M_R^T$）、复合关系 $S\circ R$ 与幂 $R^n$。
     - **重点标红陷阱（Slide 45）**：$(a,c)\in R_2\circ R_1 \iff \exists b\,((a,b)\in R_1 \land (b,c)\in R_2)$。先走 $R_1$ 再走 $R_2$！虽然老师 PPT 把矩阵记作 $M_{R_2}\circ M_{R_1}$，但其第 $(i,j)$ 元定义为 $\bigvee_{k=1}^n ((M_{R_1})_{ik}\land (M_{R_2})_{kj})$，即**左放 $M_{R_1}$ 取行、右放 $M_{R_2}$ 取列**（标准布尔矩阵积 $M_{R_1}\odot M_{R_2}$）。
   - **关系闭包与 Warshall 算法**：
     - 自反闭包 $r(R) = R \cup \Delta$（主对角线全置 1）；
     - 对称闭包 $s(R) = R \cup R^{-1}$（$M_R \lor M_R^T$，关于主对角线对称补 1）；
     - 传递闭包 $t(R) = R^* = \bigcup_{k=1}^n R^k$（连通性关系）：提供两种考场算法——① 小矩阵（$3\times 3$，如 Test 02 Q2e）直接有向图找可达路径或算 $M_R \lor M_R^{[2]} \lor M_R^{[3]}$；② 标准 **Warshall 算法** $W_0 \to W_1 \to \dots \to W_n$（十字交叉口诀：第 $k$ 步看第 $k$ 列为 1 的行 $i$ 与第 $k$ 行为 1 的列 $j$，将 $(i,j)$ 置 1，$w_{ij}^{[k]} = w_{ij}^{[k-1]} \lor (w_{ik}^{[k-1]} \land w_{kj}^{[k-1]})$，Tutorial 05 Q8）。
     - 复合闭包顺序：等价闭包 $t(s(r(R)))$（为什么 `symmetric + transitive` 不保证孤立点自反，但 $s(t(R))$ 未必传递而 $t(s(R))$ 必对称且传递，Slide P46–47 & P14–15）。
   - **概念速览**：$n$ 元关系与关系数据库（主键 Primary Key、选择/投影/连接思想，Slide P30–31）。

4. **Tab 3 · 等价关系与偏序及格（`equiv-poset.md`）**：
   - **等价关系（Equivalence Relation）**：自反 + 对称 + 传递；经典模型（模 $m$ 同余 $a\equiv b\pmod m$、函数等值核 $f(x)=f(y)$、字符串前 $k$ 位相同，Tutorial 06 Q1–Q5）；等价类 $[a]_R$ 与代表元；核心等价定理（$(a,b)\in R \iff [a]_R=[b]_R \iff [a]_R\cap [b]_R\neq\varnothing$）；**等价关系 $\longleftrightarrow$ 集合划分 Partition**（非空、两两不相交、并集为全集，矩阵分块全 1 特征）。
   - **偏序关系（Partial Ordering）**：自反 + 反对称 + 传递，偏序集 $(S, \preceq)$；对偶偏序集 $(S, R^{-1})$（Tutorial 06 Q7–Q8）；可比（Comparable）与不可比（Incomparable）；**全序 / 线序（Total / Linear Order / Chain）**：任意两元均可比。
   - **概念速览（课件涵盖）**：**字典序 Lexicographic Order**（笛卡尔积偏序与字符串排序，Tutorial 06 Q9–Q10）、**良序集 Well-Ordered Set**（全序且任意非空子集必有最小元，如 $(\mathbb{Z}^+, \le)$ 是良序而 $(\mathbb{Z}, \le)$ 不是，Slide P29）。
   - **Hasse 图（Hasse Diagram）与极值/上下界体系**：
     - 画图三步法（从有向图出发：去自环 → 去传递跨级边仅留覆盖关系 Covering Relation → 小在下大在上省去箭头）；
     - **四组极易混淆概念对照表**（针对子集 $B \subseteq S$）：
       - 极小元 Minimal vs 最小元 Least（Minimal 可多个、只需子集内没人比它更小；Least 至多一个、必须能排在子集所有元素之下！若子集有多个 Minimal 则必无 Least）；
       - 极大元 Maximal vs 最大元 Greatest（同理，注意 Test 02 Q5b/c 考的是**指定子集** $\{5,10,13\}$ 的 minimal 与 $\{5,10,65\}$ 的 greatest，极值必须在子集内部取，而上下界在整个偏序集 $A$ 中找！）；
       - 上界 Upper Bounds vs 最小上界 LUB（上确界 $\sup / \text{lub}$，即所有上界组成的集合的 **least** element）；
       - 下界 Lower Bounds vs 最大下界 GLB（下确界 $\inf / \text{glb}$，即所有下界组成的集合的 **greatest** element；在正整数整除偏序中，若 $\operatorname{lcm}$ / $\gcd$ 都在原集合内，则 $\text{lub}\{a,b\}=\operatorname{lcm}(a,b)$、$\text{glb}\{a,b\}=\gcd(a,b)$，但**若原集合缺少某些公倍数/公约数，必须直接在 Hasse 图上找公共祖先/后代，绝不能盲套数论 gcd/lcm！**）。
   - **格（Lattice）与延伸**：
     - **格 Lattice**（高频必考，Test 02 Q5g）：偏序集中**每一对元素** $\{a,b\}$ 都同时存在唯一的 $\text{lub}\{a,b\}$（记为 $a\lor b$）和唯一的 $\text{glb}\{a,b\}$（记为 $a\land b$）。证明不是格只需找**一对元素**没有 lub 或没有 glb（或有多个极小上界但无最小上界）！
     - **概念速览**：格的四条代数定理（幂等、交换、结合、吸收，Slide P32）、**有界格 Bounded Lattice**（存在全集最大元 $1$ 与最小元 $0$）、**有补格 Complemented Lattice**（有界格中每个 $x$ 存在补元 $y$ 使 $x\lor y=1 \land x\land y=0$，如 $(\mathcal{P}(S), \subseteq)$，Slide P34–35）。

5. **Tab 4 & Tab 5 · Test 02 原题双语与逐题精讲（精确数学核对结果）**：
   - **Q1（12 marks）**：$f(x)=x^2+5,\ g(x)=3x^2+5,\ h(x)=|x/2|$ on $\mathbb{R}\to\mathbb{R}$：
     - a) $(g\circ f)(x) = g(f(x)) = 3(x^2+5)^2+5 = 3x^4+30x^2+80$。
     - b) $(f+g)(x) = 4x^2+10$。
     - c) $\operatorname{Range}(h) = [0, +\infty) = \{y\in\mathbb{R}\mid y\ge 0\}$（纠偏手写附注 $\{\mathbb{R}^+, 0\}$ 的集合记法瑕疵：应写 $\mathbb{R}^+\cup\{0\}$ 或 $[0,+\infty)$）。
     - d) 详述为何原函数 $\mathbb{R}\to\mathbb{R}$ 既非单射（$h(2)=h(-2)=1$）也非满射（$-1$ 无原像）；将定义域限制为 $[0,+\infty)$（或 $(-\infty,0]$）、余域限制为 $[0,+\infty)$，并完整写出 **one-to-one 证明 + onto 证明**（6 分大题必须两步证完才拿满分！）。
   - **Q2（24 marks）**：给定
     $$
     M_{R_1}=\begin{bmatrix}0&1&1\\1&0&0\\0&1&1\end{bmatrix},\quad
     M_{R_2}=\begin{bmatrix}1&0&1\\1&0&0\\0&1&1\end{bmatrix}
     $$
     - a) $M_{R_1^{-1}} = M_{R_1}^T = \begin{bmatrix}0&1&0\\1&0&1\\1&0&1\end{bmatrix}$
     - b) $M_{\overline{R_1}} = \begin{bmatrix}1&0&0\\0&1&1\\1&0&0\end{bmatrix}$
     - c) $M_{R_1\oplus R_2} = \begin{bmatrix}1&1&0\\0&0&0\\0&0&0\end{bmatrix}$
     - d) $M_{R_2\circ R_1} = M_{R_1}\odot M_{R_2} = \begin{bmatrix}1&1&1\\1&0&1\\1&1&1\end{bmatrix}$（逐行逐列展示计算，并对比若误算成 $M_{R_2}\odot M_{R_1}=\begin{bmatrix}0&1&1\\0&1&1\\1&1&1\end{bmatrix}$ 的错误结果！）
     - e) $M_{t(R_1)} = \begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$（给出 Warshall $W_0\to W_1\to W_2\to W_3$ 与强连通环 $1\to 2\to 1,\ 1\to 3\to 2$ 两种验证）
     - f) $M_{s(R_2)} = M_{R_2}\lor M_{R_2}^T = \begin{bmatrix}1&1&1\\1&0&1\\1&1&1\end{bmatrix}$
   - **Q3（12 marks）**：对 a)、b)、c) 逐一给出 i)–viii) 八项判定与简明理由：
     - a) $R=\{(1,2),(3,1),(5,4),(2,3),(3,2),(4,5)\}$ on $\{1,2,3,4,5\}$：
       - i) symmetric: **No**（$(1,2)\in R$ 但 $(2,1)\notin R$）；
       - ii) antisymmetric: **No**（$(2,3)\in R \land (3,2)\in R$ 但 $2\neq 3$）；
       - iii) transitive: **No**（$(1,2),(2,3)\in R$ 但 $(1,3)\notin R$，或 $(4,5),(5,4)\in R$ 但 $(4,4)\notin R$）；
       - iv) irreflexive: **Yes**（对所有 $a\in\{1..5\}$，$(a,a)\notin R$）；
       - v) reflexive: **No**（$(1,1)\notin R$）；
       - vi) a function: **No**（元素 $3$ 对应两个像 $(3,1),(3,2)$，这是违背函数单值性的铁证！同时 $1,2,4,5$ 各有一个像，唯独 $3$ 有两个）；
       - vii) equivalence relation: **No**（不自反、不对称、不传递）；
       - viii) reflexive partial order: **No**（不自反、不反对称、不传递）。
     - b) “Person $a$ and Person $b$ have the same friends” on set of all persons（设 $F(x)$ 为 $x$ 的朋友集合，则 $aRb \iff F(a)=F(b)$）：
       - i) symmetric: **Yes**；ii) antisymmetric: **No**（两个不同的人可以拥有完全相同的朋友集合，例如均无朋友）；iii) transitive: **Yes**；iv) irreflexive: **No**（每个人与自己朋友集合相同）；v) reflexive: **Yes**；vi) a function: **No**（一人可与多人包括自己及同友者相关）；vii) equivalence relation: **Yes**（自反+对称+传递）；viii) reflexive partial order: **No**（不反对称）。
     - c) $\{(x,y)\mid x^2\ge y\}$ on $\mathbb{Z}$：
       - i) symmetric: **No**（$(2,3)\in R$ 因 $4\ge 3$，但 $(3,2)$ 虽也在 $R$，取 $(0,-1)\in R$ 因 $0\ge -1$，而 $(-1,0)$ 也在 $R$；正确反例：$(2,4)\in R$？$4\ge 4$ 且 $16\ge 2$；取 **$(1,-2)\in R$？$1\ge -2$ 且 $4\ge 1$；取 $(0,-2)$？$(-2)^2=4\ge 0$！怎么找反例？要 $x^2\ge y$ 但 $y^2 < x$：只需 $x > y^2 \ge 0$，例如取 $x=2, y=1$？$1^2=1 < 2$！验证：$(2,1)\in R$ 因 $2^2=4\ge 1$，但 $(1,2)\notin R$ 因 $1^2=1 < 2$！**——绝佳考场找反例示范！）；
       - ii) antisymmetric: **No**（取 $x=2, y=3$：$2^2=4\ge 3 \Rightarrow (2,3)\in R$，且 $3^2=9\ge 2 \Rightarrow (3,2)\in R$，但 $2\neq 3$！）；
       - iii) transitive: **No**（取 $(3,5)\in R$ 因 $9\ge 5$，$(5,20)\in R$？更简单：$(2,4)\in R$ 因 $4\ge 4$，$(4,10)\in R$ 因 $16\ge 10$，但 $(2,10)\notin R$ 因 $4 < 10$！）；
       - iv) irreflexive: **No**（$(1,1)\in R$）；
       - v) reflexive: **Yes**！（重点！定义域是**整数集 $\mathbb{Z}$**：对任意整数 $x\in\mathbb{Z}$，若 $x\le 0$ 则 $x^2\ge 0\ge x$；若 $x\ge 1$ 则整数满足 $x^2 \ge x$！若定义域换成实数 $\mathbb{R}$，取 $x=0.5$ 就不自反——完美呼应手写附注圈出的「**整数**」二字！）；
       - vi) a function: **No**（对 $x=0$，所有 $y\le 0$ 均满足 $(0,y)\in R$，不唯一）；
       - vii) equivalence relation: **No**；
       - viii) reflexive partial order: **No**。
   - **Q4（8 marks）**：证明对称关系 $R, S$ 的交集 $S\cap R$ 仍对称（给出无懈可击的四步英文定义展开证明，并顺带对比：$R\cup S, R-S, R\oplus S, S\circ R$ 对对称/传递性的保持与反例总结表！）。
   - **Q5（20 marks）**：$A = \{1, 5, 10, 13, 65, 650\}$ 上的整除关系 $|$：
     - 覆盖边（Hasse 图边）：$1\to 5,\ 1\to 13,\ 5\to 10,\ 5\to 65,\ 13\to 65,\ 10\to 650,\ 65\to 650$（注意 $10\nmid 65$，$13\nmid 10$，而 $10\mid 650$ 且 $65\mid 650$！）。
     - b) minimal elements of $\{5, 10, 13\}$：**$5$ and $13$**（子集中无元素真整除 5 或 13，而 $5\mid 10$ 故 10 不是极小元）。
     - c) greatest element of $\{5, 10, 65\}$：**Does not exist (None)**！（因为 $10\nmid 65$ 且 $65\nmid 10$，子集 $\{5,10,65\}$ 有两个极大元 $10, 65$，没有任何一个元素能被子集内所有元素整除——专门强调子集 greatest 必须属于该子集，$650$ 不在 $\{5,10,65\}$ 内不能选！）。
     - d) upper bounds of $\{13, 65\}$（在全集 $A$ 中找同时被 13 和 65 整除的元素）：**$65$ and $650$**。
     - e) greatest lower bound of $\{10, 65\}$：先找公共下界 $\{1, 5\}$，其中最大元为 **$5$**。
     - f) Is $R$ a total order? **No**，因为存在不可比元素对（如 $5 \nmid 13$ 且 $13 \nmid 5$，或 $10$ 与 $65$ 不可比）。
     - g) Is $R$ a lattice? **Yes**！因为全集 $A=\{1,5,10,13,65,650\}$ 对任意两元 $a,b\in A$，其数论 $\gcd(a,b)$ 与 $\operatorname{lcm}(a,b)$ **恰好全部落在集合 $A$ 中**（逐对核验全部 $\binom{6}{2}=15$ 对，特别是 $\operatorname{lcm}(5,13)=65\in A$、$\operatorname{lcm}(10,13)=130\notin A$？——**慢着！停下来核算 $(10, 13)$！！**
       - $10$ 和 $13$ 的公共上界（在 $A$ 中同时是 $10$ 和 $13$ 倍数的元素）：$A$ 中 $10$ 的倍数有 $\{10, 650\}$，$13$ 的倍数有 $\{13, 65, 650\}$，交集是 $\{650\}$！虽然数论 $\operatorname{lcm}(10,13)=130 \notin A$，但在偏序集 $(A, |)$ 中，$\{10, 13\}$ 的上界集合就是 $\{650\}$，它只有一个元素，所以 **$\text{lub}_A\{10,13\} = 650$ 依然存在且唯一**！
       - 再核算全部不可比对的上下界：
         - $\{5, 13\}$：下界 $\{1\} \Rightarrow \text{glb}=1$；上界 $\{65, 650\}$，且 $65\mid 650 \Rightarrow \text{lub}=65$！
         - $\{10, 13\}$：下界 $\{1\} \Rightarrow \text{glb}=1$；上界 $\{650\} \Rightarrow \text{lub}=650$！
         - $\{10, 65\}$：下界 $\{1, 5\}$ 且 $1\mid 5 \Rightarrow \text{glb}=5$；上界 $\{650\} \Rightarrow \text{lub}=650$！
       - 可比元素对 $\{a,b\}$（$a\mid b$）天然有 $\text{glb}=a,\ \text{lub}=b$！
       - **神级洞察**：$(A, |)$ **确实是 Lattice**，而且恰恰因为 $130 \notin A$，如果学生错误地套用「整除偏序的 lub 一定等于数论 lcm，因为 $\operatorname{lcm}(10,13)=130\notin A$ 所以不是格」，就会**直接做错丢分**！！这正是必须用 Hasse 图上界定义而非盲套 $\operatorname{lcm}$ 的活生生的真题铁证！我们将把这个绝妙陷阱写进精讲与交互沙盘中！）。

### 4.5 三个原生 React + SVG 交互式图解沙盘规格（`Relation/src/sandboxes.jsx`）

所有沙盘均采用项目现有 CSS 设计令牌（`var(--card)`、`var(--accent)`、`var(--kw)`、`var(--ok)`、`var(--bad)`，完美兼容浅色与深色模式），零外部依赖：

1. **`RelationMatrixLab`（0-1 关系矩阵 ↔ 有向图 & Warshall 闭包沙盘）**：
   - **预设一键切换**：① Test 02 Q2 的 $R_1$ 与 $R_2$（$3\times 3$）；② Tutorial 05 Q3（$3\times 3$）；③ Tutorial 05 Q8 Warshall 经典题（$4\times 4$）；④ 自定义点击翻转任意 0/1 格。
   - **联动视图**：左侧可点击 0-1 矩阵 $M_{R_1}$（及双矩阵模式下的 $M_{R_2}$），右侧实时 SVG 有向图（清晰绘制自环、单向弧、双向双色弧）。
   - **实时性质徽章**：对当前矩阵自动判定并显示 `Reflexive`、`Irreflexive`、`Symmetric`、`Antisymmetric`、`Asymmetric`、`Transitive`、`Equivalence`、`Partial Order`、`Function` 的 ✓/✗，并给出一句话命中/反例定位（如「反例：$(1,2)\in R, (2,3)\in R$ 但 $(1,3)\notin R$」）。
   - **运算与 Warshall 步进器**：可切换查看 $R_1^{-1}$、$\overline{R_1}$、$R_1\oplus R_2$、$R_2\circ R_1$（悬停结果格 $(i,j)$ 时高亮左矩阵 $M_{R_1}$ 的第 $i$ 行与右矩阵 $M_{R_2}$ 的第 $j$ 列！），以及 **Warshall 算法 $W_0 \to W_1 \to \dots \to W_n$ 步进按钮**（高亮当前枢轴行/列 $k$ 与本步新置 1 的格子）。

2. **`HassePosetLab`（Hasse 图与偏序极值 / 上下界 / 格交互沙盘）**：
   - **预设偏序集切换**：
     - ① **Test 02 Q5**：$(\{1,5,10,13,65,650\}, \mid)$（默认激活，支持一键套用 Q5b `{5,10,13}`、Q5c `{5,10,65}`、Q5d `{13,65}`、Q5e `{10,65}` 及神坑 `{10,13}`！）；
     - ② **Tutorial 06 Q12**：$(\{3,5,9,15,24,45\}, \mid)$（非格、无最大最小元经典反例：$\{3,5\}$ 有 lub 15，但 $\{9,24\}$ 无公共上界）；
     - ③ **幂集布尔格**：$(\mathcal{P}(\{a,b,c\}), \subseteq)$（有界有补格经典立方体 Hasse 图）；
     - ④ **非格蝴蝶图（Bowtie Poset）**：$\{a,b\}$ 同时被 $\{c,d\}$ 覆盖但 $\{c,d\}$ 无最小上界（直观展示「有上界但无 LUB ⇒ 不是格」）。
   - **交互能力**：点击图中节点自由勾选/取消子集 $B \subseteq A$，面板实时计算并分色高亮：
     - 子集 $B$ 内部的 `Minimal`、`Maximal`、`Least`、`Greatest`；
     - 全集 $A$ 中的 `Lower Bounds`、`GLB (inf)`、`Upper Bounds`、`LUB (sup)`；
     - 整个偏序集 $(A, \preceq)$ 是否为 `Total Order`、`Lattice`、`Bounded Lattice`，并给出具体不可比对或破坏格性质的元素对。

3. **`FunctionMapperLab`（函数单射/满射/双射与定义域限制演示器）**：
   - **双模式切换**：
     - **模式 A（离散箭头映射图）**：切换预设「非函数（一源双箭 / 漏定义）」「仅单射」「仅满射」「双射与逆函数 $f^{-1}$ 翻转动画」，直观对应定义域每点出度为 1、余域每点入度 $\le 1$ / $\ge 1$ / $=1$。
     - **模式 B（Test 02 Q1d 连续函数限制交互图）**：绘制 $h(x)=|x/2|$ 曲线、水平线测试（Horizontal Line Test 检验单射）与值域投影条（检验满射），提供 Domain 切换按钮（`ℝ` / `[0, +∞)` / `(-∞, 0]`）与 Codomain 切换按钮（`ℝ` / `[0, +∞)`），实时联动判定 `One-to-One`、`Onto`、`Bijection (Invertible)` 并同步显示对应逆函数表达式（$h^{-1}(y)=2y$ 或 $-2y$）。

### 4.6 静态 SVG 示意图规划（`Relation/src/figures.jsx`）

延续 `Logic-and-Proof/src/figures.jsx` 的 3D `Slab` 与纸墨卡片美学，定制：
1. `HeroFig`：从「有序对 $(a,b)\in A\times B$」生长出「函数 / 等价划分 / 偏序格」三座立体阶梯的章节总览图。
2. `SetVennFig`：集合核心运算（$A\cup B,\ A\cap B,\ A-B,\ A\oplus B$）与 $\varnothing$ vs $\{\varnothing\}$ 盒子模型对比图。
3. `EquivPartitionFig`：等价关系 $R$ 的块状对角全 1 矩阵 ↔ 等价类切分拼盘（Partition）双向同构示意图。

---

## 5. 交由实现者决定的细节（Left to the Builder）

- 各 Markdown 文件内部的小节标题措辞、表格列宽与辅助过渡句；
- `glossary.js` 的具体词条拆分粒度（保证覆盖试卷指令词、集合论、函数、二元关系、闭包算法、等价与偏序/格全部核心英文术语，约 90–110 条）；
- 交互沙盘内部具体的 SVG 节点像素坐标、色彩微调与移动端按钮排布；
- `Relation/Midterm-Review-Guide.md` 的离线拼接脚本或组织方式（须保证不含未闭合 HTML 标签、纯 Markdown + 标准 LaTeX + Mermaid 可直接阅读）。

---

## 6. 验收标准与验证方案（Acceptance & Verification）

1. **构建验证**：运行 `npm run build` 零报错通过，产出 `dist/index.html`、`dist/Logic-and-Proof/index.html`、`dist/Relation/index.html` 及其静态资源。
2. **数学与课件一致性核验**：
   - `Image 1` 所列 `Ch2.1–2.3`、`Ch9.1–9.3`、`Ch9.5–9.6` 及老师 3 份 PPT + Tutorial 04–06 知识点无遗漏；
   - `Midterm-Test-02` 全部 5 道大题（76 分）答案与步骤经独立复算无误（特别是 Q1d 双射证明、Q2d 复合矩阵顺序、Q3c 整数域自反性、Q5c 空最大元与 Q5g `{10,13}` 的 LUB=650）；
   - 所有块级 `$$` 均独立成行，无 `remark-math` 吞字或 KaTeX 红色报错。
3. **浏览器真实交互与视觉核验**：
   - 启动本地预览服务，检查 `/`、`/Logic-and-Proof/`（回归检查）与 `/Relation/` 全部 8 个 Tab；
   - 实测 3 个交互沙盘的预设切换、单元格点击、Warshall 步进、Hasse 子集点击与函数定义域切换，以及术语点击弹窗、桌面宽屏与移动端窄屏响应式表现。
4. **文档与 Git 规范核验**：
   - `README.md` 目录结构与说明同步更新；
   - `git status` 干净，无任何 untracked 文件，无新增未忽略产物；
   - 所有本地提交均使用仓库当前用户身份（`PlutoKeating <PlutoKeating@outlook.com>`），严禁附带任何 AI Agent co-author 署名；未经用户明确要求不执行 `git push`。
