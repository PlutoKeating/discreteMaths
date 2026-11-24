import { GLOSSARY, CATS, lookupTerm, ALL_PATTERNS } from '../content/glossary.js';

export function buildRelationCourse(md) {
  return {
    slug: 'relation',
    storageKey: 'dismath.relation.v2',
    seriesLabel: 'Discrete Mathematics · 课程 02 · Sets, Functions & Relations',
    shortTitle: '集合、函数与二元关系',
    title: '怎么把对象配成对、连成网、分好类、排出上下级？',
    subtitle:
      '不用把集合、函数、关系矩阵、等价类和偏序格当成五门互不相干的字典来背。直接以 Midterm Test 02（76 分）的五道大题为路标，顺着“给机器动手术 → 在 0-1 表上算中转 → 给关系做体检 → 把整除画成层级网”一路打穿。',
    examMarksLabel: 'Test 02 · 76 marks',
    footerNote:
      '依据 Dr. Patrick Chan 离散数学 Ch2.1–2.3、Ch9.1–9.3、Ch9.5–9.6（课件内页标号 5.1–5.6）与 Tutorial 04–06 及 Midterm Test 02 真题重构 · 本机自动保存阅读进度与笔记。',
    siblingLink: {
      href: '/Logic-and-Proof/',
      label: '← 上一门课：逻辑与证明（Test 01 · 60 分）',
    },
    glossary: {
      list: GLOSSARY,
      cats: CATS,
      lookup: lookupTerm,
      patterns: ALL_PATTERNS,
      placeholder: '检索如：one-to-one correspondence、Warshall、antisymmetric、Hasse diagram、lattice……',
    },
    examPaper: {
      title: 'Midterm Test 02 英文原卷与逐句中文对照（76 分）',
      markdown: md.exam,
      rawMarkdown: md.rawExam,
      jumpLinks: [
        { label: 'Q1 函数复合与双射改造 (12分) → 02–03 节', target: 's02' },
        { label: 'Q2 关系矩阵与闭包 (24分) → 04–06 节', target: 's04' },
        { label: 'Q3 八项性质体检 (12分) → 07–09 节', target: 's07' },
        { label: 'Q4 交集保对称证明 (8分) → 09 节', target: 's09' },
        { label: 'Q5 哈斯图与格判定 (20分) → 10–12 节', target: 's10' },
      ],
    },
    opening: {
      markdown: md.opening,
      checks: [
        {
          question: '纸箱 {∅} 里面是空无一物，还是装着一件东西？',
          answer:
            '**装着 1 件东西！** 空集 $\\varnothing$ 是一只空纸箱（元素个数为 $0$）；而 $\\{\\varnothing\\}$ 是一只大纸箱，打开盖子能摸出里面放着一只空纸箱（元素个数为 $1$）。分清“箱子本身”和“箱子里的东西”，集合题就不会再绕晕。',
        },
        {
          question: '如果 A 认识 B、B 认识 C，A 未必认识 C。那如果把规则换成“A 和 B 拥有一模一样的朋友圈”，它还能一路传下去吗？',
          answer:
            '**完全能传下去！** 因为“朋友圈一模一样”背后是一个真正的**等号** $F(A) = F(B)$：既然 $F(A)=F(B)$ 且 $F(B)=F(C)$，当然 $F(A)=F(C)$。这正是 Test 02 第 3b 题考的“等价关系”。',
        },
      ],
    },
    stages: [
      {
        id: 'stage-1',
        targetMarks: '直指第 1 题（12 分）',
        title: '从“把范围说清”到“能原路倒推的机器”',
        intro:
          '先把写集合范围时的拆箱规矩立稳，再把三台实数加工机摆上桌面：串起来怎么算？两个不同输入撞上同一个输出时，怎么动两刀小手术让它能唯一倒推回去？',
        sectionIds: ['s01', 's02', 's03'],
      },
      {
        id: 'stage-2',
        targetMarks: '直指第 2 题（24 分）',
        title: '一张 0-1 方格表，怎样算出所有直接与间接联系？',
        intro:
          '摘掉函数“一输入只准连一输出”的限制，用一张填满 0 和 1 的方格表记录任意关系。箭头掉头、黑白反转、先走 R₁ 再走 R₂、以及用最少的新 1 打通中转路径，全在这一张表上完成。',
        sectionIds: ['s04', 's05', 's06'],
      },
      {
        id: 'stage-3',
        targetMarks: '直指第 3、4 题（20 分）',
        title: '怎么给关系做体检，又怎么写出滴水不漏的英文证明？',
        intro:
          '面对一串配对、一条整数不等式和一句日常描述，怎样快准狠地查清它的全部脾气？当考官不给任何具体数字时，怎样用五行标准英文拿下证明满分？',
        sectionIds: ['s07', 's08', 's09'],
      },
      {
        id: 'stage-4',
        targetMarks: '直指第 5 题（20 分）',
        title: '把整除关系脱成层级图：谁垫底、谁封顶、算不算“格”？',
        intro:
          '擦掉所有能靠常识脑补的自环、箭头和跨级连线，把偏序集变成一目了然的哈斯图。只要守住“小圈子内找极值、大池子里找上下界”的边界，压轴 20 分唾手可得。',
        sectionIds: ['s10', 's11', 's12'],
      },
    ],
    chapters: [
      {
        id: 's01',
        num: '01',
        title: '写答案范围时，为什么多套一层花括号意思就全变了？',
        examTag: '为 Q1c 排雷 · 集合、子集与有序对',
        markdown: md.s01,
        optionalReading: {
          title: '课件里的幂集（Power Set）、三元组直积、容斥原理与计算机位串表示',
          markdown: [
            '把集合的基础再往前推半步，就能顺手收掉课件 Ch2.1–2.2 与 Tutorial 04 里的四个常客：',
            '1. **幂集（power set，$\\mathcal{P}(S)$）**：把集合 $S$ 的**所有子集**（从空集 $\\varnothing$ 到 $S$ 自己）打包放进一个大盒子里。如果 $|S| = n$，每个元素都有“进子集 / 不进子集” 2 种选择，所以子集总数永远是 **$|\mathcal{P}(S)| = 2^n$**（例如 $|\\mathcal{P}(\\varnothing)| = 2^0 = 1$，$|\\mathcal{P}(\\{\\varnothing\\})| = 2^1 = 2$）。',
            '2. **为什么 $A \\times B \\times C \\neq (A \\times B) \\times C$？（Tutorial 04 Q7）**：当 $A,B,C$ 非空时，$A \\times B \\times C$ 的成员是平铺的**有序三元组（ordered n-tuple）** $(a, b, c)$；而 $(A \\times B) \\times C$ 的成员是先打包前两个、再配第三个的**有序二元组** $((a, b), c)$，连零件的层数都不一样，当然不是同一个集合！',
            '3. **证明集合恒等式的三把钥匙**：和第 1 门课逻辑等价一模一样——把 $\\cup,\\cap,\\overline{A}$ 分别看作 $\\lor,\\land,\\neg$，可以用 ① **双向包含元素追逐法**（任取 $x\\in L$ 推到 $x\\in R$，再反推）、② **集合代数定律化简**（德摩根律 $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$、分配律、吸收律）、或 ③ **成员表**。',
            '4. **容斥原理（inclusion-exclusion）与位串（bit string）表示**：',
            '   - 两个或三个集合并起来去重计数：$|A\\cup B| = |A|+|B|-|A\\cap B|$；$|A\\cup B\\cup C| = |A|+|B|+|C|-|A\\cap B|-|A\\cap C|-|B\\cap C|+|A\\cap B\\cap C|$。',
            '   - 计算机怎么存子集？把全集元素排好队 $U=\\{u_1,\\dots,u_n\\}$，子集 $A$ 就成了一串长 $n$ 的 **bit string**（在 $A$ 里标 `1`，不在标 `0`）：求并集就是按位 `OR`，求交集是按位 `AND`，求对称差 $\\oplus$ 正好是按位异或 `XOR`！',
          ].join('\n'),
        },
        practice: {
          title: '拆箱快问快答（Tutorial 04 Q4–Q5 & Q10 精选）',
          prompt:
            '1. 判断真假：(a) $\\{\\varnothing\\} \\in \\{\\varnothing, \\{\\varnothing\\}\\}$；(b) $\\{\\{\\varnothing\\}\\} \\subset \\{\\{\\varnothing\\}, \\{\\varnothing\\}\\}$。\n2. 如果已知两个集合满足 $A - B = B - A$，你能断定 $A$ 和 $B$ 是什么关系吗？',
          hint: '第 1(b) 题先看右边的花括号里写了两次完全一样的东西，去重以后剩几个元素？第 2 题想想月牙形：左边专属区和右边专属区居然相等，而它们本来是互斥不相交的！',
          solution:
            '1. **(a) True**（掀开右边最外层花括号，第二个成员正是 $\\{\\varnothing\\}$）；**(b) False**！因为右边两个相同元素合并后就是 $\\{\\{\\varnothing\\}\\}$，左右两集合完全相等，不满足**真子集（proper subset，$\\subset$）**“必须不等”的要求。\n2. **必定有 $A = B$**！因为 $(A - B)$ 与 $(B - A)$ 天生没有公共元素（$(A-B)\\cap(B-A)=\\varnothing$），两个不相交的集合居然相等，唯一可能是它们俩都是空集 $\\varnothing$，即 $A\\subseteq B$ 且 $B\\subseteq A \\implies A = B$。',
        },
      },
      {
        id: 's02',
        num: '02',
        title: '什么样的规则才配叫“函数”？把两台机器串起来谁先动？',
        examTag: '当场拿下 Test 02 Question 1a, 1b, 1c（6 分）',
        markdown: md.s02,
        examBox: {
          title: 'Test 02 · Question 1a, 1b, 1c（6 marks）满分落笔示范',
          markdown: [
            'Given $f(x)=x^2+5$, $g(x)=3x^2+5$, and $h(x)=|x/2|$ from $\\mathbb{R}$ to $\\mathbb{R}$:',
            '- **a) (2 marks)** $(g \\circ f)(x) = g(f(x)) = g(x^2 + 5) = 3(x^2 + 5)^2 + 5 = 3(x^4 + 10x^2 + 25) + 5 = \\mathbf{3x^4 + 30x^2 + 80}$.',
            '- **b) (2 marks)** $(f + g)(x) = f(x) + g(x) = (x^2 + 5) + (3x^2 + 5) = \\mathbf{4x^2 + 10}$.',
            '- **c) (2 marks)** $\\operatorname{Range}(h) = \\mathbf{[0, +\\infty)}$ (or $\\{y \\in \\mathbb{R} \\mid y \\ge 0\\}$, since $|x/2| \\ge 0$ for all $x \\in \\mathbb{R}$ and for any $y \\ge 0$, $h(2y) = y$).',
          ].join('\n'),
        },
        practice: {
          title: '反方向复合与位串函数的值域（Tutorial 04 Q12 & Q15）',
          prompt:
            '1. 沿用 Test 02 第 1 题的 $f(x)=x^2+5$ 和 $g(x)=3x^2+5$，这次求 **$(f \\circ g)(x)$**，和刚才的 $g \\circ f$ 一样吗？\n2. 设函数 $L$ 把每一个 0-1 位串（bit string）映射为“把它每 8 位切成一字节后剩下的零头位数”，求 $L$ 的定义域和值域（Tutorial 04 Q12b）。',
          hint: '第 1 题这次是 $g$ 贴着 $x$ 先算，再塞进 $f$ 的平方里；第 2 题除以 8 的余数能取到哪些整数？',
          solution:
            '1. $(f \\circ g)(x) = f(g(x)) = (3x^2 + 5)^2 + 5 = 9x^4 + 30x^2 + 30 \\neq 3x^4 + 30x^2 + 80$。\n2. **Domain**: the set of all bit strings；**Range**: $\\{0, 1, 2, 3, 4, 5, 6, 7\\}$（不超过 $7$ 的非负整数集）。',
        },
      },
      {
        id: 's03',
        num: '03',
        title: '两个输入撞上同一个结果时，怎么动手术让机器能原路倒推？',
        examTag: '当场拿下 Test 02 Question 1d（6 分）',
        markdown: md.s03,
        lab: 'functionMapper',
        labPrompt:
          '先把定义域和余域都切到 ℝ，拖动滑块观察 y = 1.0 为什么有两个交点、y = -0.5 为什么没有交点；再切到 [0, +∞) 观察双射是怎样达成的（也可点右上角切换到离散集合箭头图体验反函数翻转）。',
        examBox: {
          title: 'Test 02 · Question 1d（6 marks）满分四段式英文作答模板',
          markdown: [
            '**原题**：*Discuss the restricted domain and codomain in which $h(x) = |x/2|$ is one-to-one correspondence. Discuss in detail.*',
            '',
            '**Model Answer:**',
            '1. **Why $h: \\mathbb{R} \\to \\mathbb{R}$ fails initially:** It is **not one-to-one** because $h(2) = 1 = h(-2)$ with $2 \\neq -2$; it is **not onto** because $|x/2| \\ge 0$ for all $x \\in \\mathbb{R}$, so $-1 \\in \\mathbb{R}$ has no preimage.',
            '2. **Restricted domain and codomain:** Restrict the codomain to $B\x27 = [0, +\\infty)$, and restrict the domain to $A_1 = [0, +\\infty)$ *(or alternatively $A_2 = (-\\infty, 0]$)*.',
            '3. **Proof of one-to-one on $A_1 = [0, +\\infty)$:** On $[0, +\\infty)$, $h(x) = x/2$. Assume $h(x_1) = h(x_2)$ for $x_1, x_2 \\in [0, +\\infty)$. Then $x_1 / 2 = x_2 / 2 \\implies x_1 = x_2$. Thus $h$ is one-to-one.',
            '4. **Proof of onto $B\x27 = [0, +\\infty)$:** For any $y \\in [0, +\\infty)$, choose $x = 2y$. Since $y \\ge 0$, we have $x = 2y \\in [0, +\\infty)$, and $h(x) = |2y / 2| = y$. Thus $h$ is onto.',
            '',
            '*(Note: Restricting the domain to $(-\\infty, 0]$ and codomain to $[0, +\\infty)$ gives $h(x) = -x/2$, which is also a one-to-one correspondence by taking $x = -2y \\le 0$, with inverse $h^{-1}(y) = -2y$.)* Therefore, $h$ becomes a **one-to-one correspondence**.',
          ].join('\n'),
        },
        optionalReading: {
          title: '恒等函数、严格单调与取整函数 ⌊x⌋ / ⌈x⌉（Tutorial 04 Q13）',
          markdown: [
            '- **恒等函数（identity function）**：$\\iota_A(x) = x$（每个元素映回自己），天生是双射，反函数就是它自己。',
            '- **严格递增 / 递减（strictly increasing / decreasing）**：若对一切 $x < y$ 都有 $f(x) < f(y)$，那么 $x \\neq y$ 时必定一左一右输出不等，所以严格单调函数**自动是单射（one-to-one）**（Tutorial 04 Q14 证 $e^x$ 单射直接用这一句即可）。',
            '- **向下取整（floor function $\\lfloor x \\rfloor$）与向上取整（ceiling function $\\lceil x \\rceil$）**：在整数到整数 $\\mathbb{Z} \\to \\mathbb{Z}$ 上考察两个极易做错的例子（Tutorial 04 Q13c/d）：',
            '  - $f(n) = n^3$（$\\mathbb{Z} \\to \\mathbb{Z}$）：是 **one-to-one**，但**不是 onto**！因为整数 $2 \\in \\mathbb{Z}$ 找不到整数立方根！（若换成 $\\mathbb{R} \\to \\mathbb{R}$ 才是双射。）',
            '  - $f(n) = \\lceil n/2 \\rceil$（$\\mathbb{Z} \\to \\mathbb{Z}$）：**不是 one-to-one**（$\\lceil 1/2 \\rceil = 1 = \\lceil 2/2 \\rceil$），但**是 onto**（任给整数 $k \\in \\mathbb{Z}$，取偶数 $n = 2k \\in \\mathbb{Z}$ 就有 $\\lceil 2k/2 \\rceil = k$）！',
          ].join('\n'),
        },
        practice: {
          title: '模仿 Q1d 改造指数函数 e^x（Tutorial 04 Q14 原题）',
          prompt:
            '说明为什么 $f(x) = e^x$ 从 $\\mathbb{R}$ 到 $\\mathbb{R}$ 不可逆（not invertible）；如果只允许改动定义域或余域其中之一，该怎么改才能让它可逆？写出反函数。',
          hint: '$e^x$ 在整个 $\\mathbb{R}$ 上本来就已经严格递增（不撞车）了，它缺的是单射还是满射？注意 $0$ 能不能被 $e^x$ 取到？',
          solution:
            '- **为何不可逆**：对任意 $x \\in \\mathbb{R}$ 恒有 $e^x > 0$，所以负数与 $0$（如 $0 \\in \\mathbb{R}$）没有原像，$f$ 不是 onto，故不可逆。\n- **改造与证明**：保持定义域 $\\mathbb{R}$ 不变（因 $e^x$ 严格递增，已是 one-to-one），将**余域限制为正实数集 $\\mathbb{R}^+ = (0, +\\infty)$**（千万别含 $0$！）。对任意 $y \\in (0, +\\infty)$，取 $x = \\ln y \\in \\mathbb{R}$，有 $e^{\\ln y} = y$（onto）。故限制后可逆，反函数为 $f^{-1}(y) = \\ln y\\ (y > 0)$。',
        },
      },
      {
        id: 's04',
        num: '04',
        title: '允许一个对象连好几个目标以后，怎样用一张 0-1 方格表记账？',
        examTag: '当场拿下 Test 02 Question 2a, 2b, 2c（12 分）',
        markdown: md.s04,
        examBox: {
          title: 'Test 02 · Question 2a, 2b, 2c（12 marks）标准答案',
          markdown: [
            'Given $M_{R_1}=\\begin{bmatrix}0&1&1\\\\1&0&0\\\\0&1&1\\end{bmatrix}$ and $M_{R_2}=\\begin{bmatrix}1&0&1\\\\1&0&0\\\\0&1&1\\end{bmatrix}$:',
            '',
            '$$',
            '\\text{a) } M_{R_1^{-1}} = M_{R_1}^T = \\begin{bmatrix}0 & 1 & 0\\\\1 & 0 & 1\\\\1 & 0 & 1\\end{bmatrix}, \\qquad',
            '\\text{b) } M_{\\overline{R_1}} = \\begin{bmatrix}1 & 0 & 0\\\\0 & 1 & 1\\\\1 & 0 & 0\\end{bmatrix}, \\qquad',
            '\\text{c) } M_{R_1 \\oplus R_2} = \\begin{bmatrix}1 & 1 & 0\\\\0 & 0 & 0\\\\0 & 0 & 0\\end{bmatrix}',
            '$$',
          ].join('\n'),
        },
        practice: {
          title: '在有向图度数与 0-1 矩阵之间一眼互读（Tutorial 05 Q2–Q3）',
          prompt:
            '在集合 $A = \\{a, b, c\\}$ 上给定关系 $R = \\{(a,b), (a,c), (b,c), (c,b)\\}$。写出它的 $3 \\times 3$ 关系矩阵 $M_R$，并直接从矩阵说出顶点 $b$ 的 **出度**（out-degree）和 **入度**（in-degree）各是多少。',
          hint: '出度就是从 $b$ 发出去几根箭（看第 $b$ 行有几个 1）；入度就是有几根箭射向 $b$（看第 $b$ 列有几个 1）。',
          solution:
            '按 $a, b, c$ 顺序排列，$M_R = \\begin{bmatrix}0 & 1 & 1\\\\0 & 0 & 1\\\\0 & 1 & 0\\end{bmatrix}$。\n\n第 2 行（$b$ 行）有 $1$ 个 `1`，故 $b$ 的 **out-degree = 1**；第 2 列（$b$ 列）有 $2$ 个 `1`（来自 $a\\to b$ 和 $c\\to b$），故 $b$ 的 **in-degree = 2**。',
        },
      },
      {
        id: 's05',
        num: '05',
        title: '先走 R₁ 再走 R₂，两张矩阵相乘时谁该站在左边？',
        examTag: '当场拿下 Test 02 Question 2d（4 分 · Slide 45 最大陷阱）',
        markdown: md.s05,
        examBox: {
          title: 'Test 02 · Question 2d（4 marks）满分步骤与矩阵答案',
          markdown: [
            '**d) Matrix for $R_2 \\circ R_1$:** Since $(a, c) \\in R_2 \\circ R_1 \\iff \\exists b\\,((a, b) \\in R_1 \\land (b, c) \\in R_2)$, $R_1$ is applied first and $R_2$ second:',
            '',
            '$$',
            'M_{R_2 \\circ R_1} = M_{R_1} \\odot M_{R_2} =',
            '\\begin{bmatrix}0 & 1 & 1\\\\1 & 0 & 0\\\\0 & 1 & 1\\end{bmatrix}',
            '\\odot',
            '\\begin{bmatrix}1 & 0 & 1\\\\1 & 0 & 0\\\\0 & 1 & 1\\end{bmatrix}',
            '=',
            '\\begin{bmatrix}1 & 1 & 1\\\\1 & 0 & 1\\\\1 & 1 & 1\\end{bmatrix}',
            '$$',
          ].join('\n'),
        },
        practice: {
          title: '对比算一次 R₁ ∘ R₂，并判断 Rⁿ 何时停住不变',
          prompt:
            '用同一对矩阵算一算反过来的 **$M_{R_1 \\circ R_2}$**，看看跟刚才的 $M_{R_2 \\circ R_1}$ 差在哪几格？',
          hint: '求 $R_1 \\circ R_2$ 时右边是 $R_2$ 先走，所以这回轮到 $M_{R_2}$ 站左边、$M_{R_1}$ 站右边了！',
          solution: [
            '$$',
            'M_{R_1 \\circ R_2} = M_{R_2} \\odot M_{R_1} =',
            '\\begin{bmatrix}1 & 0 & 1\\\\1 & 0 & 0\\\\0 & 1 & 1\\end{bmatrix}',
            '\\odot',
            '\\begin{bmatrix}0 & 1 & 1\\\\1 & 0 & 0\\\\0 & 1 & 1\\end{bmatrix}',
            '=',
            '\\begin{bmatrix}0 & 1 & 1\\\\0 & 1 & 1\\\\1 & 1 & 1\\end{bmatrix}',
            '$$',
            '',
            '前两行全都不同！可见在考场上一旦把左右矩阵摆反，9 个数字里能错 5 个。',
          ].join('\n'),
          variant: {
            prompt:
              '在集合 $\\{1, 2, 3, 4\\}$ 上给定链条关系 $R = \\{(1,1), (2,1), (3,2), (4,3)\\}$（课件 Slide 43 例题）。不用乘四次矩阵，凭“走 $n$ 步路径”的图直觉直接写出 $R^3$ 和 $R^{100}$！',
            hint: '画出图 $4 \\to 3 \\to 2 \\to 1$，而且 $1$ 头顶有个自环 $1 \\to 1$！不管从哪个点出发连走 3 步以上，最后都会停在谁身上绕圈？',
            solution:
              '因为 $1$ 有自环 $1\\to 1$：从 $1, 2, 3, 4$ 任一点出发走 $3$ 步（或任意 $\\ge 3$ 步），全都会抵达终点 $1$ 并在 $1$ 的自环上打转！所以对一切 $n \\ge 3$，都有 $R^3 = R^4 = \\cdots = R^{100} = \\{(1,1), (2,1), (3,1), (4,1)\\}$。',
          },
        },
      },
      {
        id: 's06',
        num: '06',
        title: '想让单行道变双向、转车变直达，最少要补哪几个 1？',
        examTag: '当场拿下 Test 02 Question 2e, 2f（8 分 · 第 2 题 24 分全满！）',
        markdown: md.s06,
        lab: 'relationMatrix',
        labPrompt:
          '先在下方切换查看 Test 02 第 2 题的 d) 复合行列内积 与 e) Warshall 步进 W₀→W₃；再点顶部预设“Tutorial 05 Q8（4×4 Warshall 经典）”一步步点过 W₀→W₄，核对每一步新冒出来的橙色格子。',
        examBox: {
          title: 'Test 02 · Question 2e & 2f（8 marks）满分落笔示范',
          markdown: [
            '**e) Transitive closure of $R_1$ (via Warshall\x27s algorithm):**',
            '',
            '$$',
            'W_0 = M_{R_1} = \\begin{bmatrix}0&1&1\\\\1&0&0\\\\0&1&1\\end{bmatrix} \\;\\Longrightarrow\\;',
            'W_1 = \\begin{bmatrix}0&1&1\\\\1&1&1\\\\0&1&1\\end{bmatrix} \\;\\Longrightarrow\\;',
            'W_2 = W_3 = M_{t(R_1)} = \\begin{bmatrix}1&1&1\\\\1&1&1\\\\1&1&1\\end{bmatrix}',
            '$$',
            '',
            '**f) Symmetric closure of $R_2$:**',
            '',
            '$$',
            'M_{s(R_2)} = M_{R_2} \\lor M_{R_2}^T = \\begin{bmatrix}1&0&1\\\\1&0&0\\\\0&1&1\\end{bmatrix} \\lor \\begin{bmatrix}1&1&0\\\\0&0&1\\\\1&0&1\\end{bmatrix} = \\begin{bmatrix}1&1&1\\\\1&0&1\\\\1&1&1\\end{bmatrix}',
            '$$',
          ].join('\n'),
        },
        optionalReading: {
          title: '同时要求好几条性质时闭包按什么顺序套？以及课件里的 n 元数据库关系',
          markdown: [
            '1. **复合闭包的先后顺序（Tutorial 05 Q10 & 课件 Ch9.5 p14）**：',
            '   如果题目让你求“包含 $R$ 的最小等价关系（既自反、又对称、又传递）”，必须**把传递闭包 $t(\\cdot)$ 留到最后一步做**，即算 **$t(s(r(R)))$**！',
            '   为什么不能先算传递再算对称 $s(t(R))$？试想 $R = \\{(1,3), (2,3)\\}$：它本来就已经传递了（$t(R)=R$），如果你最后才补对称边变成 $\\{(1,3),(3,1),(2,3),(3,2)\\}$，刚补出来的 $1\\to 3\\to 2$ 立刻又缺了直达边 $(1,2)$，把传递性重新弄坏了！而先把自反和对称补好，最后做一次传递闭包 $t$，前面修好的自反与对称绝对不会被破坏（Tutorial 05 Q11–Q12）。',
            '2. **n 元关系（n-ary relation）与关系型数据库（课件 Slides 5.2 p30–p31）**：',
            '   把有序二元组推广到 $n$ 个集合的笛卡尔积子集 $R \\subseteq A_1 \\times A_2 \\times \\cdots \\times A_n$，就叫 **n-ary relation**——这正是现代 SQL 数据库里一张二维表的数学真身：每一列是一个属性域，每一行记录是一个 $n$ 元组；如果某一列（比如 `Student_ID`）的值在全表绝不重复、能唯一认出每一行，这一列就叫 **主键（primary key）**。',
          ].join('\n'),
        },
        practice: {
          title: '完整手算一遍 4×4 Warshall 算法（Tutorial 05 Q8c 原题）',
          prompt:
            '在 $\\{0, 1, 2, 3\\}$ 上给定关系 $R = \\{(0,1), (1,1), (1,2), (2,0), (2,2), (3,0)\\}$。请按顶点 $0, 1, 2, 3$ 的顺序写出初态 $W_0$ 以及每一步的 $W_1, W_2, W_3, W_4$，标出每一步新补上的有序对。',
          hint: '注意顶点从 `0` 开始编号！第 1 步（$W_1$）中转的是顶点 `0`（看第 1 列与第 1 行）；最后一步（$W_4$）中转顶点 `3` 时，看看第 4 列有没有 `1`？',
          solution:
            '- 初态：$W_0 = \\begin{bmatrix}0&1&0&0\\\\0&1&1&0\\\\1&0&1&0\\\\1&0&0&0\\end{bmatrix}$\n- $k=1$（中转顶点 `0`）：顶点 `0` 列为 `1` 的行是 $\\{2,3\\}$，顶点 `0` 行为 `1` 的列是 $\\{1\\}$，新补 $(2,1),(3,1)$ 得 $W_1 = \\begin{bmatrix}0&1&0&0\\\\0&1&1&0\\\\1&\\mathbf{1}&1&0\\\\1&\\mathbf{1}&0&0\\end{bmatrix}$；\n- $k=2$（中转顶点 `1`）：列 `1` 全为 `1`，行 `1` 在 $\\{1,2\\}$ 为 `1`，新补 $(0,2),(3,2)$ 得 $W_2 = \\begin{bmatrix}0&1&\\mathbf{1}&0\\\\0&1&1&0\\\\1&1&1&0\\\\1&1&\\mathbf{1}&0\\end{bmatrix}$；\n- $k=3$（中转顶点 `2`）：列 `2` 全为 `1`，行 `2` 在 $\\{0,1,2\\}$ 为 `1`，新补 $(0,0),(1,0)$ 得 $W_3 = \\begin{bmatrix}\\mathbf{1}&1&1&0\\\\\\mathbf{1}&1&1&0\\\\1&1&1&0\\\\1&1&1&0\\end{bmatrix}$；\n- $k=4$（中转顶点 `3`）：第 4 列全为 `0`（没人能飞进 `3`），无新增边，故 **$W_4 = W_3$**。',
        },
      },
      {
        id: 's07',
        num: '07',
        title: '拿到一串配对名单，哪几项检查能摸清它的全部脾气？',
        examTag: '当场拿下 Test 02 Question 3a（4 分）',
        markdown: md.s07,
        examBox: {
          title: 'Test 02 · Question 3a（4 marks）八项指标标准判定',
          markdown: [
            'For $R = \\{(1,2),(3,1),(5,4),(2,3),(3,2),(4,5)\\}$ on $\\{1,2,3,4,5\\}$:',
            '- **i) symmetric:** **No** — $(1,2) \\in R$ but $(2,1) \\notin R$.',
            '- **ii) antisymmetric:** **No** — $(2,3) \\in R$ and $(3,2) \\in R$ with $2 \\neq 3$.',
            '- **iii) transitive:** **No** — $(1,2) \\in R$ and $(2,3) \\in R$, but $(1,3) \\notin R$.',
            '- **iv) irreflexive:** **Yes** — $(a,a) \\notin R$ for all $a \\in \\{1,2,3,4,5\\}$.',
            '- **v) reflexive:** **No** — $(1,1) \\notin R$.',
            '- **vi) a function:** **No** — element $3$ is mapped to two distinct outputs: $(3,1) \\in R$ and $(3,2) \\in R$.',
            '- **vii) an equivalence relation:** **No** (fails reflexive, symmetric, and transitive).',
            '- **viii) a reflexive partial order:** **No** (fails reflexive, antisymmetric, and transitive).',
          ].join('\n'),
        },
        optionalReading: {
          title: 'n 个元素的集合上到底能造出多少种关系？（含 Tutorial 05 Q4a 答案勘误！）',
          markdown: [
            '期末填空或简答很喜欢问“在含有 $n$ 个元素的集合 $A$ 上，满足某性质的关系一共有多少个？”——不用死记，直接对着 $n \\times n$ 矩阵数格子就行（把矩阵拆成 **$n$ 个主对角线格** + **$\\frac{n(n-1)}{2}$ 对上下对称格 $\\{m_{ij}, m_{ji}\\}$**）：',
            '- **任意二元关系总数**：$n^2$ 个格子每格填 `0` 或 `1`，共 **$2^{n^2}$** 个。',
            '  - *【Tutorial 05 Q4a 勘误提醒】*：当 $n = 4$ 时，总数是 $2^{4^2} = 2^{16} = \\mathbf{65536}$（Tutorial 答案误印成了 `65535`，考场上务必写 $2^{16} = 65536$！）。',
            '- **自反 / 反自反关系数**：对角线 $n$ 格被锁死（全填 `1` 或全填 `0`，只有 $1$ 种选法），其余 $n(n-1)$ 格随便填 $\\implies \\mathbf{2^{n(n-1)}}$。',
            '- **对称（symmetric）关系数**：对角线 $n$ 格随便填（$2^n$），每对对称格必须同填 `00` 或 `11`（$2$ 种）$\\implies 2^n \\cdot 2^{n(n-1)/2} = \\mathbf{2^{n(n+1)/2}}$。',
            '- **反对称（antisymmetric）关系数**：对角线 $n$ 格随便填（$2^n$），每对对称格只禁止 `11`，剩下 `00, 10, 01` 共 **$3$ 种**合法填法 $\\implies \\mathbf{2^n \\cdot 3^{n(n-1)/2}}$。',
            '- **非对称（asymmetric）关系数**：对角线强制全填 `0`（$1$ 种），每对对称格仍有 `00, 10, 01` 共 $3$ 种 $\\implies \\mathbf{3^{n(n-1)/2}}$。',
          ].join('\n'),
        },
        practice: {
          title: '测一测空真与极端矩阵：全 0 空关系与单位矩阵各满足哪几项？',
          prompt:
            '在非空集合 $A = \\{1, 2, 3\\}$ 上：(1) 如果关系 $R = \\varnothing$（全 `0` 矩阵），它在自反、反自反、对称、反对称、传递里满足哪几项？(2) 如果 $R = \\{(1,1),(2,2),(3,3)\\}$（单位矩阵 $I_3$）呢？',
          hint: '凡是“如果 $(a,b)\\in R$ 则……”的句式，在 $\\varnothing$ 里前件永远为假！可以在上一节的矩阵沙盘里点“清空 R₁ 为全 0”现场核对。',
          solution:
            '1. **空关系 $R = \\varnothing$**（$A$ 非空）：**不自反**（缺 $(1,1)$），但**反自反、对称、反对称、非对称、传递全部为真（空真 vacuously true）**！\n2. **恒等关系 $I_3$**：**自反、对称、反对称、传递、函数、等价关系、自反偏序全部为真**（唯一既是等价关系又是偏序关系的特例！），仅反自反与非对称为假。',
        },
      },
      {
        id: 's08',
        num: '08',
        title: '只把候选范围换成“整数”，同一条不等式为什么突然改了答案？',
        examTag: '当场拿下 Test 02 Question 3c（4 分 · 整数域陷阱）',
        markdown: md.s08,
        examBox: {
          title: 'Test 02 · Question 3c（4 marks）八项指标标准判定',
          markdown: [
            'For $R = \\{(x, y) \\mid x^2 \\ge y\\}$ on the set of **integers $\\mathbb{Z}$**:',
            '- **i) symmetric:** **No** — $(2, 1) \\in R$ since $2^2 = 4 \\ge 1$, but $(1, 2) \\notin R$ since $1^2 = 1 < 2$.',
            '- **ii) antisymmetric:** **No** — $(2, 3) \\in R$ ($4 \\ge 3$) and $(3, 2) \\in R$ ($9 \\ge 2$), with $2 \\neq 3$.',
            '- **iii) transitive:** **No** — $(2, 4) \\in R$ ($4 \\ge 4$) and $(4, 10) \\in R$ ($16 \\ge 10$), but $(2, 10) \\notin R$ ($4 < 10$).',
            '- **iv) irreflexive:** **No** — $(1, 1) \\in R$ since $1^2 \\ge 1$.',
            '- **v) reflexive:** **Yes** — for every integer $x \\in \\mathbb{Z}$, if $x \\le 0$ then $x^2 \\ge 0 \\ge x$, and if $x \\ge 1$ then $x^2 \\ge x$; hence $(x,x) \\in R$.',
            '- **vi) a function:** **No** — $(0, 0) \\in R$ and $(0, -1) \\in R$, so $0$ does not have a unique image.',
            '- **vii) an equivalence relation:** **No** (not symmetric, not transitive).',
            '- **viii) a reflexive partial order:** **No** (not antisymmetric, not transitive).',
          ].join('\n'),
        },
        practice: {
          title: '抓出 Tutorial 05 Q7g 答案里的著名隐藏错误：实数上 xy ≥ 0 真的传递吗？',
          prompt:
            '在全体实数集 $\\mathbb{R}$ 上定义关系 $R = \\{(x, y) \\mid xy \\ge 0\\}$。Tutorial 05 参考答案把它写成了 `reflexive, symmetric, transitive`——请你找出三个具体实数，当场推翻它的传递性！',
          hint: '正数乘负数小于 0（没关系），但谁跟任何正数、负数相乘都等于 0（都有关系）？拿这个“万能桥梁数”放中间！',
          solution:
            '**$xy \\ge 0$ 在 $\\mathbb{R}$ 上绝不传递（NOT transitive）！** 反例：取 $x = -1,\\ y = 0,\\ z = 2$。\n- $(-1, 0) \\in R$，因为 $(-1) \\times 0 = 0 \\ge 0$；\n- $(0, 2) \\in R$，因为 $0 \\times 2 = 0 \\ge 0$；\n- 但 $(-1, 2) \\notin R$，因为 $(-1) \\times 2 = -2 < 0$！\n数字 $0$ 把负半轴和正半轴悄悄搭了桥，直接击穿传递性。（只有把 $0$ 踢出论域、改成非零实数 $\\mathbb{R} - \\{0\\}$ 时，同号关系 $xy > 0$ 才是真正的等价关系！）',
        },
      },
      {
        id: 's09',
        num: '09',
        title: '从“拥有相同的朋友圈”到证明“交集仍对称”：英文证明怎么下笔？',
        examTag: '当场拿下 Test 02 Question 3b（4 分）与 Question 4（8 分）',
        markdown: md.s09,
        examBox: {
          title: 'Test 02 · Question 3b（4 marks）& Question 4（8 marks）满分英文示范',
          markdown: [
            '**Question 3b** (*“Person $a$ and Person $b$ have the same friends”* on the set of all persons; let $F(x)$ be the set of friends of $x$, so $aRb \\iff F(a)=F(b)$):',
            '- **i) symmetric:** **Yes** ($F(a)=F(b) \\implies F(b)=F(a)$).',
            '- **ii) antisymmetric:** **No** (two distinct people $a \\neq b$ can have the exact same set of friends, e.g., both having no friends $F(a)=F(b)=\\varnothing$).',
            '- **iii) transitive:** **Yes** ($F(a)=F(b) \\land F(b)=F(c) \\implies F(a)=F(c)$).',
            '- **iv) irreflexive:** **No** ($F(a)=F(a)$ for every person $a$).',
            '- **v) reflexive:** **Yes** ($F(a)=F(a)$ for every person $a$).',
            '- **vi) a function:** **No** (a person is related to themselves and to any other person sharing the same friend set).',
            '- **vii) an equivalence relation:** **Yes** (reflexive, symmetric, and transitive).',
            '- **viii) a reflexive partial order:** **No** (not antisymmetric).',
            '',
            '---',
            '',
            '**Question 4 (8 marks)** (*Suppose $R$ and $S$ are symmetric relations on $A$. Prove or disprove $S \\cap R$ is symmetric.*):',
            '',
            '**Claim:** **True**; $S \\cap R$ is symmetric.',
            '',
            '**Proof:** Let $a, b \\in A$ be arbitrary elements and assume $(a, b) \\in S \\cap R$.',
            'By the definition of intersection, $(a, b) \\in S$ and $(a, b) \\in R$.',
            'Since $S$ is symmetric on $A$ and $(a, b) \\in S$, we have $(b, a) \\in S$.',
            'Similarly, since $R$ is symmetric on $A$ and $(a, b) \\in R$, we have $(b, a) \\in R$.',
            'Therefore, $(b, a) \\in S$ and $(b, a) \\in R$, which means $(b, a) \\in S \\cap R$ by the definition of intersection.',
            'Hence, $S \\cap R$ is symmetric. $\\square$',
          ].join('\n'),
        },
        optionalReading: {
          title: '模 m 同余、等价类的三条互推铁律与集合划分的双向还原',
          markdown: [
            '课件 Ch9.5 与 Tutorial 06 Q1–Q5 围绕等价关系还有两组高频小题：',
            '1. **模 $m$ 同余（congruence modulo m）**：在整数 $\\mathbb{Z}$ 上定义 $a \\equiv b \\pmod m \\iff m \\mid (a - b)$（除以正整数 $m$ 余数相同）。它是最经典的等价关系，把全体整数切成恰好 **$m$ 个等价类**：$[0]_m, [1]_m, \\dots, [m-1]_m$。',
            '2. **等价类与划分（partition）的双向对应**：',
            '   - 任意两个等价类要么**完全重合**，要么**毫无交集**：$(a,b) \\in R \\iff [a]_R = [b]_R \\iff [a]_R \\cap [b]_R \\neq \\varnothing$。',
            '   - 检查一组子集 $\\{A_1, A_2, \\dots, A_k\\}$ 算不算 $A$ 的合法划分，只核对三条：① 每块非空 $A_i \\neq \\varnothing$；② 两两不相交 $A_i \\cap A_j = \\varnothing$；③ 并起来等于全集 $\\bigcup A_i = A$（Tutorial 06 Q4）。',
            '   - 反过来，给你划分 $A_1 = \\{1,2,3\\},\\ A_2 = \\{4,5\\}$，它诱导出的等价关系就是每块自己跟自己做笛卡尔积再并起来：$R = (A_1 \\times A_1) \\cup (A_2 \\times A_2)$，矩阵重排后正是主对角线上的两个全 `1` 方块！',
          ].join('\n'),
        },
        practice: {
          title: '期末变式防偷袭：如果把 Q4 的交集 ∩ 换成并集 ∪ 或复合 ∘ 呢？',
          prompt:
            'Prove or disprove：\n1. 若 $R, S$ 都是集合 $A$ 上的**传递关系**，则 $R \\cup S$ 也是传递关系。\n2. 若 $R, S$ 都是集合 $A$ 上的**对称关系**，则 $S \\circ R$ 也是对称关系。',
          hint: '两道题都先在三元小集合 $A = \\{1, 2, 3\\}$ 上让 $R$ 只管 $1$ 和 $2$、让 $S$ 只管 $2$ 和 $3$ 试试看！',
          solution:
            '两道全都是 **False（不成立）**！考场极简反例：\n1. 设 $A = \\{1,2,3\\}$，取 $R = \\{(1,2)\\}$，$S = \\{(2,3)\\}$（两者都没有两步链条，各自空真传递）。但 $R \\cup S = \\{(1,2), (2,3)\\}$ 里有 $(1,2)$ 和 $(2,3)$，却没有 $(1,3)$，故 $R \\cup S$ **不传递**！（课件 Slide 17 经典反例）\n2. 设 $A = \\{1,2,3\\}$，取对称关系 $R = \\{(1,2),(2,1)\\}$，$S = \\{(2,3),(3,2)\\}$。先走 $R$ 再走 $S$ 得 $S \\circ R = \\{(1,3)\\}$，里面有 $(1,3)$ 却没有 $(3,1)$，故 $S \\circ R$ **不对称**！',
        },
      },
      {
        id: 's10',
        num: '10',
        title: '既然偏序也是排上下级，为什么要擦掉自环、箭头和跨级连线？',
        examTag: '当场拿下 Test 02 Question 5a（6 分）',
        markdown: md.s10,
        examBox: {
          title: 'Test 02 · Question 5a（6 marks）哈斯图连线核对清单',
          markdown: [
            'On $A = \\{1, 5, 10, 13, 65, 650\\}$ under divisibility ($a \\mid b$), place vertices upward by level and draw **exactly 7 undirected line segments** (covering relations only, no loops, no arrows):',
            '- Level 0 (bottom): `1` $\\longrightarrow$ connects upward to `5` and `13`.',
            '- Level 1: `5` connects upward to `10` and `65`; `13` connects upward **only** to `65` (since $13 \\nmid 10$).',
            '- Level 2: `10` and `65` both connect upward to `650` (Level 3, top).',
          ].join('\n'),
        },
        optionalReading: {
          title: '对偶偏序集（Dual）、字典序（Lexicographic Order）与良序集（Well-Ordered Set）',
          markdown: [
            '课件 Ch9.6 与 Tutorial 06 Q7–Q10 还介绍了三种给偏序集变形或排序的方式：',
            '1. **对偶偏序集（dual poset）**：若 $(S, R)$ 是偏序集，把所有大小方向倒过来的逆关系 **$(S, R^{-1})$ 依然是偏序集**（比如 $(\\mathbb{Z}, \\ge)$ 的对偶就是 $(\\mathbb{Z}, \\le)$，哈斯图直接上下颠倒，Tutorial 06 Q7–Q8）。',
            '2. **字典序（lexicographic order）**：两个偏序集拼成有序对 $(a_1, a_2) \\prec (b_1, b_2)$ 时，先比第一坐标 $a_1 \\prec_1 b_1$；第一坐标打平时再比第二坐标 $a_2 \\prec_2 b_2$。查英文词典完全同理（短前缀排在前面，如 `open < opened < opener < opera < operand`，Tutorial 06 Q10）。',
            '3. **良序集（well-ordered set，课件 Slide 29）**：如果 $(S, \\preceq)$ 既是全序集，而且它的**每一个非空子集都能找出最小元（least element）**，就叫良序集（数学归纳法的根基）。',
            '   - 经典对比：正整数 $(\\mathbb{Z}^+, \\le)$ 和自然数 $(\\mathbb{N}, \\le)$ **是**良序集；全体整数 $(\\mathbb{Z}, \\le)$ 虽然是全序，但**不是**良序集（负整数集没有最小元）；实数区间 $([0, 1], \\le)$ 也**不是**良序集（开子集 $(0, 1]$ 没有最小元）。',
          ].join('\n'),
        },
        practice: {
          title: '画一画含 8 个数的整除哈斯图（Tutorial 06 Q11b 原题）',
          prompt:
            '在集合 $\\{1, 2, 3, 6, 12, 24, 36, 48\\}$ 上按整除关系 $|$ 列出每一层的元素和所有覆盖边（即哈斯图里真正要画的连线）。',
          hint: '按质因子重数 $\\Omega(n)$ 分层：$1$（0 个）$\\to 2,3$（1 个）$\\to 6$（2 个）$\\to 12$（3 个）$\\to 24, 36$（4 个）$\\to 48$（5 个）。特别小心：$36$ 能整除 $48$ 吗？',
          solution:
            '- 层级：$L_0: \\{1\\}$；$L_1: \\{2, 3\\}$；$L_2: \\{6\\}$；$L_3: \\{12\\}$；$L_4: \\{24, 36\\}$；$L_5: \\{48\\}$。\n- 全部覆盖边（共 7 条）：`1—2`, `1—3`, `2—6`, `3—6`, `6—12`, `12—24`, `12—36`, 以及 **`24—48`**（共 8 条边；千万注意 $36 \\nmid 48$，所以 `36` 头顶没有任何连线，这个偏序集有两个极大元 `36` 和 `48`！）。',
        },
      },
      {
        id: 's11',
        num: '11',
        title: '“没人比我小”和“我比所有人都小”，为什么换个词答案就变成不存在？',
        examTag: '当场拿下 Test 02 Question 5b, 5c, 5d, 5e（8 分）',
        markdown: md.s11,
        examBox: {
          title: 'Test 02 · Question 5b, 5c, 5d, 5e（8 marks）标准答案速核',
          markdown: [
            'On $(\\{1, 5, 10, 13, 65, 650\\}, \\mid)$:',
            '- **b) Minimal elements of $\\{5, 10, 13\\}$:** **$5, 13$** *(neither is divisible by another element in $\\{5, 10, 13\\}$, while $5 \\mid 10$)*.',
            '- **c) Greatest element of $\\{5, 10, 65\\}$:** **None / Does not exist** *($10$ and $65$ are incomparable maximal elements in $\\{5, 10, 65\\}$, and $650 \\notin \\{5, 10, 65\\}$)*.',
            '- **d) Upper bounds of $\\{13, 65\\}$:** **$65, 650$** *(elements in the whole poset $A$ divisible by both $13$ and $65$)*.',
            '- **e) Greatest lower bound (GLB) of $\\{10, 65\\}$:** **$5$** *(lower bounds in $A$ are $\\{1, 5\\}$, whose greatest element under $|$ is $5$)*.',
          ].join('\n'),
        },
        practice: {
          title: '在无顶无底偏序集上快练一整套八连问（Tutorial 06 Q12 原题）',
          prompt:
            '对偏序集 $(\\{3, 5, 9, 15, 24, 45\\}, \\mid)$：求全集的 (a) maximal elements；(b) minimal elements；(c) greatest element；(d) least element；(e) $\\{3,5\\}$ 的所有上界与 LUB；(f) $\\{15,45\\}$ 的所有下界与 GLB。',
          hint: '别漏掉 $3 \\mid 24$ 这根线！全集底下有 $3, 5$ 两个极小，顶上有 $24, 45$ 两个极大。',
          solution:
            '- (a) Maximal: **$24, 45$**；(b) Minimal: **$3, 5$**；\n- (c) Greatest: **None**；(d) Least: **None**；\n- (e) $\\{3,5\\}$ 的上界：**$15, 45$**，$\\operatorname{LUB}\\{3,5\\} = \\mathbf{15}$；\n- (f) $\\{15,45\\}$ 的下界：**$3, 5, 15$**，$\\operatorname{GLB}\\{15,45\\} = \\mathbf{15}$。',
        },
      },
      {
        id: 's12',
        num: '12',
        title: '不能排成一条直线时，每对元素还能找到唯一的公共汇合点吗？',
        examTag: '当场拿下 Test 02 Question 5f, 5g（6 分 · 全卷 76 分通关！）',
        markdown: md.s12,
        lab: 'hassePoset',
        labPrompt:
          '先在 Test 02 第 5 题预设下点击快捷按钮核对 Q5b–Q5e 与神坑 {10,13}；再切换顶部预设到“Tutorial 06 Q12”和“蝴蝶图反例”，观察为什么它们不是格（Lattice）。',
        examBox: {
          title: 'Test 02 · Question 5f & 5g（6 marks）满分英文解释模板',
          markdown: [
            '- **f) Is $R$ a total order? Explain why. (3 marks)**',
            '  **No.** A poset is a total order iff every pair of elements is comparable. Here $5, 13 \\in A$, but $5 \\nmid 13$ and $13 \\nmid 5$ (incomparable). Hence $R$ is not a total order.',
            '',
            '- **g) Is $R$ a lattice? Explain why. (3 marks)**',
            '  **Yes, $(A, \\mid)$ is a lattice.** A poset is a lattice iff every pair of elements in $A$ has both a unique least upper bound (LUB) and a unique greatest lower bound (GLB) in $A$:',
            '  - Every comparable pair $a \\mid b$ automatically has $\\operatorname{glb}\\{a,b\\} = a$ and $\\operatorname{lub}\\{a,b\\} = b$.',
            '  - For the three incomparable pairs in $A$:',
            '    - $\\{5, 13\\}$: lower bounds $= \\{1\\} \\implies \\operatorname{glb} = 1$; upper bounds $= \\{65, 650\\} \\implies \\operatorname{lub} = 65$.',
            '    - $\\{10, 13\\}$: lower bounds $= \\{1\\} \\implies \\operatorname{glb} = 1$; upper bounds $= \\{650\\} \\implies \\operatorname{lub} = 650$.',
            '    - $\\{10, 65\\}$: lower bounds $= \\{1, 5\\} \\implies \\operatorname{glb} = 5$; upper bounds $= \\{650\\} \\implies \\operatorname{lub} = 650$.',
            '',
            '  Since every pair has both a unique LUB and a unique GLB in $A$, $R$ is a lattice.',
          ].join('\n'),
        },
        optionalReading: {
          title: '课件最后三页：格的代数律、有界格（Bounded Lattice）与有补格（Complemented Lattice）',
          markdown: [
            '在格 $(L, \\preceq)$ 里，把 $\\operatorname{lub}\\{a,b\\}$ 记作并 $a \\lor b$、把 $\\operatorname{glb}\\{a,b\\}$ 记作交 $a \\land b$，它们天然满足幂等律、交换律、结合律以及吸收律 $a \\lor (a \\land b) = a$（课件 Ch9.6 p32）。往后再加两层性质就到头了：',
            '1. **有界格（bounded lattice，Slide 34）**：同时拥有全集最大元（记作 $1$）和全集最小元（记作 $0$）的格。**一切有限格都自动是有界格**（例如第 5 题的格里，$0 = 1$，$1 = 650$）。',
            '2. **有补格（complemented lattice，Slide 35）**：在有界格里，如果**每一个**元素 $x$ 都能找到至少一个搭档（补元 $y$），使得它俩往上汇到全集顶 $x \\lor y = 1$、往下落到全集底 $x \\land y = 0$，就叫有补格。',
            '   - 最标准的例子：幂集布尔格 $(\\mathcal{P}(\\{a,b,c\\}), \\subseteq)$（可以在上方沙盘第 3 个预设里点开看）是有界有补格——子集 $X$ 的补元就是集合补 $\\overline{X}$，满足 $X \\cup \\overline{X} = \\{a,b,c\\}$ 且 $X \\cap \\overline{X} = \\varnothing$。',
            '   - 那 Test 02 第 5 题的 $(\\{1,5,10,13,65,650\\}, \\mid)$ 是有补格吗？**不是！** 试着给元素 $5$ 找补元 $y$：要满足 $\\operatorname{glb}\\{5, y\\} = 1$，就要求 $5 \\nmid y$，只能选 $y = 1$ 或 $y = 13$；可 $\\operatorname{lub}\\{5, 1\\} = 5 \\neq 650$，$\\operatorname{lub}\\{5, 13\\} = 65 \\neq 650$，谁也凑不够顶上的 $650$（因为 $5^2 = 25$ 的因子拆不散）！',
          ].join('\n'),
        },
        practice: {
          title: '一秒钟揪出“为什么不是格”的两种死法',
          prompt:
            '分别用一句话解释为什么下列两个偏序集**不是格（not a lattice）**：\n1. Tutorial 06 Q12 的 $(\\{3, 5, 9, 15, 24, 45\\}, \\mid)$；\n2. 含有 4 个元素 $\\{a, b, c, d\\}$ 的蝴蝶图偏序集，其中 $a, b$ 都排在 $c, d$ 下方（$a \\prec c, a \\prec d, b \\prec c, b \\prec d$），而 $a$ 与 $b$ 不可比、$c$ 与 $d$ 也不可比。',
          hint: '第 1 个找一对根本没有公共天花板的元素；第 2 个看 $\\{a, b\\}$ 虽然有两个公共天花板 $c, d$，但能选出“最矮的那一个”吗？',
          solution:
            '1. 取元素对 $\\{24, 45\\}$（或 $\\{9, 24\\}$）：集合中没有任何元素能同时被它们整除（**upper bounds 为空集**），故 $\\operatorname{lub}\\{24, 45\\}$ 不存在，不是格。\n2. 取元素对 $\\{a, b\\}$：虽然它在图中有公共上界 $\\{c, d\\}$，但 $c$ 与 $d$ 互不可比，上界集合 $\\{c, d\\}$ 没有最小元，故 **$\\operatorname{lub}\\{a, b\\}$ 不存在**，也不是格！',
        },
      },
    ],
  };
}
