import { GLOSSARY, CATS, lookupTerm, ALL_PATTERNS } from '../content/glossary.js';

export function buildLogicCourse(md) {
  return {
    slug: 'logic-and-proof',
    storageKey: 'dismath.logic.v2',
    seriesLabel: 'Discrete Mathematics · 课程 01 · Logic & Proof',
    shortTitle: '逻辑与证明',
    title: '一句话什么时候算真，一段话凭什么推得出来？',
    subtitle:
      '不死背二十条生僻规则名。直接从 Midterm Test 01（60 分）的五道英文真题出发，顺着“真假怎么算 → 量词谁先出牌 → 线索能不能推 → 证明从哪头下笔”一路推演到底。',
    examMarksLabel: 'Test 01 · 60 marks',
    footerNote:
      '依据 Dr. Patrick Chan 离散数学 Ch1.1–1.6 课件、Tutorial 01–03 与 Midterm Test 01 真题重构 · 本机自动保存阅读进度与思考笔记。',
    siblingLink: {
      href: '/Relation/',
      label: '下一门课：集合、函数与二元关系（Test 02 · 76 分）→',
    },
    glossary: {
      list: GLOSSARY,
      cats: CATS,
      lookup: lookupTerm,
      patterns: ALL_PATTERNS,
      placeholder: '检索如：contrapositive、Modus Tollens、denying the hypothesis、空真……',
    },
    examPaper: {
      title: 'Midterm Test 01 英文原卷与逐句中文对照（60 分）',
      markdown: md.exam,
      rawMarkdown: md.rawExam,
      jumpLinks: [
        { label: 'Q1a 谓词翻译 (9分) → 04 节', target: 's04' },
        { label: 'Q1b 形式推理 (15分) → 05 节', target: 's05' },
        { label: 'Q2ab 等价变形 (10分) → 02 节', target: 's02' },
        { label: 'Q2c & Q4 量词博弈 (13分) → 03 节', target: 's03' },
        { label: 'Q5 逆否证明 (5分) → 06 节', target: 's06' },
        { label: 'Q6 存在唯一性 (8分) → 07 节', target: 's07' },
      ],
    },
    opening: {
      markdown: md.opening,
      checks: [
        {
          question:
            '朋友承诺“如果期中考满 90 分，周末就请你吃火锅”。结果他只考了 82 分，周末也没请你。他算说话不算数吗？',
          answer:
            '**不算违约（整句话依然算真 True）**。承诺只管“考满 90 分”之后发生的事；没考到 90 分时触发条件根本没发生，无论请不请客都没有打破诺言。这一条直觉几乎决定了整张逻辑考卷一半的陷阱。',
        },
        {
          question:
            '在整数里，“先挑定一个万能数 y，跟任何整数 x 相加都等于 10”和“随便别人报什么整数 y，你都能配出一个整数 x 相加等于 10”，哪一句能办到？',
          answer:
            '**后一句能办到，前一句办不到**。后一句你是后手，别人报 $y$ 你就出 $10-y$；前一句逼你先出死一张底牌 $y$，对手随便换个 $x$ 就能拆你的台。这就是第 03 节要玩的先后手量词博弈。',
        },
      ],
    },
    stages: [
      {
        id: 'stage-1',
        targetMarks: '直指第 2a、2b 题（10 分）',
        title: '把真假算清楚，不用真值表怎么变形？',
        intro:
          '考卷一上来就禁止列真值表。只要看透“如果……那么……”什么时候才算违约，你手里就有了把箭头拆成普通“且 / 或”的万能扳手。',
        sectionIds: ['s01', 's02'],
      },
      {
        id: 'stage-2',
        targetMarks: '直指第 4、2c、1a 题（22 分）',
        title: '加上“每个人”和“有个人”，顺序与括号怎么摆？',
        intro:
          '一旦句子里出现了“所有学生”和“某些讲座”，先后顺序差一步、括号歪一寸，整句话的真假就会彻底翻转。',
        sectionIds: ['s03', 's04'],
      },
      {
        id: 'stage-3',
        targetMarks: '直指第 1b 题（15 分）',
        title: '线索摆在桌上，哪些结论真能推出来？',
        intro:
          '六条校园线索放在一起，为什么 Bob 的结局铁板钉钉，而 Noah 和 Jessica 的猜测却只是听起来顺耳的错觉？',
        sectionIds: ['s05'],
      },
      {
        id: 'stage-4',
        targetMarks: '直指第 5、6 题（13 分）',
        title: '轮到自己动笔写英文证明，从哪一头下笔？',
        intro:
          '面对一行空白答卷，正着算卡壳了怎么掉头？题目多写了一个 unique（唯一），证明为什么必须劈成上下两半？',
        sectionIds: ['s06', 's07'],
      },
    ],
    chapters: [
      {
        id: 's01',
        num: '01',
        title: '“如果……那么……”什么时候才算说了假话？',
        examTag: '全卷底层地基 · 拆箭头与逆否等价',
        markdown: md.s01,
        lab: 'implication',
        labPrompt:
          '先猜一猜：当 p = F（没考到 90 分）、q = T（照样请了火锅）时，逆命题 q → p 和逆否命题 ¬q → ¬p 谁真谁假？拨动按钮验证。',
        optionalReading: {
          title: '英文考卷里还有哪些暗藏的箭头说法？（only if / necessary / biconditional）',
          markdown: [
            '纯英文卷最爱在翻译题里把 `if p, then q` 换一件马甲考你（对应课件 Ch1.1 p31）：',
            '- **`q if p`** / **`q whenever p`** / **`p is sufficient for q`（充分条件）**：都是标准的 $p \\to q$（`if` 后面的永远是前件 $p$！）。',
            '- **`p only if q`（仅当）** / **`q is necessary for p`（必要条件）**：依然是 **$p \\to q$**！为什么？“只有年满 18 岁才能考驾照”（考驾照 only if 满 18 岁），意思是“如果你考了驾照，那你必定满 18 岁”，而不是满了 18 岁就非去考驾照不可！记住：**`only if` 后面跟的是箭头右边的结论 $q$**。',
            '- **`p if and only if q`（当且仅当，简写 `iff`）**：写作双箭头 $p \\leftrightarrow q$，叫 **双条件（biconditional）**。只有两边同真或同假时才为 $\\mathbf{T}$，拆开就是 $(p \\to q) \\land (q \\to p)$。',
            '- **运算优先级（Ch1.1 p41）**：$\\neg$ 最高 $\\succ \\land \\succ \\lor / \\oplus \\succ \\to \\succ \\leftrightarrow$ 最低（量词 $\\forall, \\exists$ 高于一切联结词）。考场手写答案**宁可多套一层括号**，也别赌阅卷人替你猜优先级。',
          ].join('\n'),
        },
        practice: {
          title: '分清 only if 与逆否命题',
          prompt:
            '设 $p$ 表示“今天下雪”，$q$ 表示“学校停课”。请把英文句子 *"School is closed only if it snows today"* 写成符号，并用日常话写出与它**逻辑等价**的逆否命题。',
          hint: '先想：如果今天下雪但学校没停课，违反这句话了吗？如果今天没下雪学校却停课了呢？哪一种情况打破了“only if”？',
          solution:
            '“只有下雪才停课”排除的是“停了课（$q=\\mathbf{T}$）却没下雪（$p=\\mathbf{F}$）”，所以符号是 **$q \\to p$**（注意方向：`only if` 后面的是箭头右边！）。\n\n它的逆否命题是 **$\\neg p \\to \\neg q$**：“如果今天没下雪，那么学校一定没停课。”',
          variant: {
            prompt:
              '不用真值表，试着说明为什么“逆命题 $q \\to p$”和“否命题 $\\neg p \\to \\neg q$”虽然都不等于原话 $p \\to q$，但它们俩彼此之间却永远同真同假？',
            hint: '把逆命题 $q \\to p$ 两头对调并同时取反，看看会得到谁？',
            solution:
              '把 $q \\to p$ 做逆否变换得到 $\\neg p \\to \\neg q$（或者都拆成无箭头形式：$\\neg q \\lor p \\equiv p \\lor \\neg q$）。它们互为对方的逆否命题，因此永远逻辑等价。',
          },
        },
      },
      {
        id: 's02',
        num: '02',
        title: '考卷禁止列真值表时，凭什么说两句话意思完全一样？',
        examTag: '当场拿下 Test 01 Question 2a, 2b（10 分）',
        markdown: md.s02,
        examBox: {
          title: 'Test 01 · Question 2a & 2b（10 marks）满分英文答卷示范',
          markdown: [
            '**原题要求**：*Show whether the following pairs of propositions are equivalent. If not, propose a counterexample. Do not use truth tables.*',
            '',
            '**a)** $((p\\land\\neg q)\\lor(p\\land r))$ and $(p\\land(q\\to r))$:',
            '',
            '$$',
            '\\begin{aligned}',
            '(p\\land\\neg q)\\lor(p\\land r) &\\equiv p\\land(\\neg q\\lor r) && \\text{(Distributive law)}\\\\',
            '&\\equiv p\\land(q\\to r) && \\text{(Conditional-disjunction equivalence: } q\\to r \\equiv \\neg q\\lor r\\text{)}',
            '\\end{aligned}',
            '$$',
            '',
            'Therefore, the two propositions are **logically equivalent**.',
            '',
            '**b)** $(p\\to(q\\to r))$ and $((p\\land q)\\to r)$:',
            '',
            '$$',
            '\\begin{aligned}',
            'p\\to(q\\to r) &\\equiv \\neg p\\lor(q\\to r) && \\text{(Conditional-disjunction equivalence)}\\\\',
            '&\\equiv \\neg p\\lor(\\neg q\\lor r) && \\text{(Conditional-disjunction equivalence)}\\\\',
            '&\\equiv (\\neg p\\lor\\neg q)\\lor r && \\text{(Associative law)}\\\\',
            '&\\equiv \\neg(p\\land q)\\lor r && \\text{(De Morgan\x27s law)}\\\\',
            '&\\equiv (p\\land q)\\to r && \\text{(Conditional-disjunction equivalence)}',
            '\\end{aligned}',
            '$$',
            '',
            'Therefore, the two propositions are **logically equivalent**.',
            '',
            '> **阅卷采分点**：① 每走一步必须在右侧括号写清所用定律英文名；② 结尾明确写下结论 `logically equivalent`。',
          ].join('\n'),
        },
        optionalReading: {
          title: '化简时还会用到的几条小零件（同一律 / 支配律 / 否定律 / 永真式）',
          markdown: [
            '消掉箭头并推完德摩根之后，括号里偶尔会撞见同一个字母跟自己的非号碰面（如 $p \\lor \\neg p$ 或 $p \\land \\neg p$）。这四对小零件和普通算术里的 $0$、$1$ 一样自然（课件 Ch1.2 p82）：',
            '- **否定律（Negation laws）**：$p \\lor \\neg p \\equiv \\mathbf{T}$（叫 **永真式 tautology**）；$p \\land \\neg p \\equiv \\mathbf{F}$（叫 **矛盾式 contradiction**）。',
            '- **支配律（Domination laws）**：$p \\lor \\mathbf{T} \\equiv \\mathbf{T}$（或上真就封顶为真）；$p \\land \\mathbf{F} \\equiv \\mathbf{F}$（且上假就归零为假）。',
            '- **同一律（Identity laws）**：$p \\land \\mathbf{T} \\equiv p$；$p \\lor \\mathbf{F} \\equiv p$。',
            '- **幂等律与双重否定**：$p \\lor p \\equiv p$，$p \\land p \\equiv p$，$\\neg(\\neg p) \\equiv p$。',
          ].join('\n'),
        },
        practice: {
          title: '不用真值表证双条件否定，并练一次“不等价交反例”',
          prompt:
            '（Tutorial 01 Q3b）不用真值表，判断 $\\neg(p \\leftrightarrow q)$ 与 $p \\leftrightarrow \\neg q$ 是否逻辑等价，写出带规则名的推导。',
          hint: '用等价式 $A \\leftrightarrow B \\equiv (A\\land B)\\lor(\\neg A\\land\\neg B)$（或者拆成 $(p\\to q)\\land(q\\to p)$），再用德摩根律把最外面的 $\\neg$ 推到里面。',
          solution: [
            '$$',
            '\\begin{aligned}',
            '\\neg(p\\leftrightarrow q) &\\equiv \\neg((p\\to q)\\land(q\\to p)) && \\text{(Biconditional equivalence)}\\\\',
            '&\\equiv \\neg(p\\to q)\\lor\\neg(q\\to p) && \\text{(De Morgan\x27s law)}\\\\',
            '&\\equiv \\neg(\\neg p\\lor q)\\lor\\neg(\\neg q\\lor p) && \\text{(Conditional equivalence)}\\\\',
            '&\\equiv (p\\land\\neg q)\\lor(q\\land\\neg p) && \\text{(De Morgan and Double negation)}\\\\',
            '&\\equiv (p\\land\\neg q)\\lor(\\neg p\\land \\neg(\\neg q)) && \\text{(Double negation and Commutative)}\\\\',
            '&\\equiv p\\leftrightarrow \\neg q && \\text{(Biconditional equivalence)}',
            '\\end{aligned}',
            '$$',
            '',
            '故两者 **logically equivalent**。',
          ].join('\n'),
          variant: {
            prompt:
              '如果考官把 Test 01 第 2b 题微调成：判断 $(p \\to q) \\to r$ 与 $p \\to (q \\to r)$ 是否等价？先猜真假，再按考场规范写出你的答案。',
            hint: '回想一下什么值能让右边的 $p \\to (q \\to r)$ 轻松变成 T？试着取 $p = \\mathbf{F}$！此时左边 $(\\mathbf{F} \\to q) \\to r$ 会变成什么？',
            solution:
              '**Not equivalent（不等价）！** 考场标准反例句式：\n\n> **Not equivalent.** Counterexample: Let $p = \\mathbf{F},\\ q = \\mathbf{T},\\ r = \\mathbf{F}$.\n> - LHS: $(p \\to q) \\to r = (\\mathbf{F} \\to \\mathbf{T}) \\to \\mathbf{F} = \\mathbf{T} \\to \\mathbf{F} = \\mathbf{F}$.\n> - RHS: $p \\to (q \\to r) = \\mathbf{F} \\to (\\mathbf{T} \\to \\mathbf{F}) = \\mathbf{F} \\to \\mathbf{F} = \\mathbf{T}$.\n> Since LHS $\\neq$ RHS under this assignment, they are not logically equivalent.',
          },
        },
      },
      {
        id: 's03',
        num: '03',
        title: '调换“任意”和“存在”的先后顺序，胜负为什么会彻底翻盘？',
        examTag: '当场拿下 Test 01 Question 4（8 分）与 Question 2c（5 分）',
        markdown: md.s03,
        lab: 'quantifier',
        labPrompt:
          '先在整数 ℤ 下切换对比 Q4b 与 Q4c；再把右上角范围切成“正整数 ℤ⁺”并给对手选 y = 12，看看 Q4c 的胜负为什么瞬间翻转了？',
        examBox: {
          title: 'Test 01 · Question 4（8 marks）& Question 2c（5 marks）满分英文落笔',
          markdown: [
            '**Question 4**（$P(x,y): x+y=10$, domain of $x, y$ is $\\mathbb{Z}$ — **每小问必写 True/False + 理由，否则像原卷一样被扣分！**）：',
            '- **a) $\\forall y\\,\\forall x\\,P(x,y)$ — False.** Counterexample: take $x = 0, y = 0 \\in \\mathbb{Z}$; then $0 + 0 = 0 \\neq 10$.',
            '- **b) $\\exists y\\,\\forall x\\,P(x,y)$ — False.** Suppose for contradiction such an integer $y$ exists. Taking $x = 0$ gives $y = 10$, while taking $x = 1$ gives $1 + y = 10 \\Rightarrow y = 9$, a contradiction.',
            '- **c) $\\forall y\\,\\exists x\\,P(x,y)$ — True.** For any integer $y \\in \\mathbb{Z}$, choose $x = 10 - y$. Since $y \\in \\mathbb{Z}$, $x = 10 - y \\in \\mathbb{Z}$, and $x + y = (10 - y) + y = 10$.',
            '- **d) $\\exists y\\,\\exists x\\,P(x,y)$ — True.** Witness: take $x = 5, y = 5 \\in \\mathbb{Z}$; then $5 + 5 = 10$.',
            '',
            '---',
            '',
            '**Question 2c**（$p$ and $\\forall x\\,(\\neg p \\to (p \\land r(x)))$, $p$ independent of $x$, domain nonempty）：',
            '',
            '$$',
            '\\begin{aligned}',
            '\\forall x\\,(\\neg p \\to (p \\land r(x))) &\\equiv \\forall x\\,(\\neg(\\neg p) \\lor (p \\land r(x))) && \\text{(Conditional equivalence)}\\\\',
            '&\\equiv \\forall x\\,(p \\lor (p \\land r(x))) && \\text{(Double negation law)}\\\\',
            '&\\equiv \\forall x\\,(p) && \\text{(Absorption law)}\\\\',
            '&\\equiv p && \\text{(Since } p \\text{ is independent of } x \\text{ and domain is nonempty)}',
            '\\end{aligned}',
            '$$',
            '',
            'Therefore, they are **logically equivalent**.',
          ].join('\n'),
        },
        practice: {
          title: '把加号换成乘号，先手还能赢吗？',
          prompt:
            '把谓词换成 $Q(x, y): x \\cdot y = 0$，论域为全体实数 $\\mathbb{R}$。分别判断 **$\\exists y\\,\\forall x\\,Q(x,y)$** 与 **$\\forall y\\,\\exists x\\,Q(x,y)$** 的真假，并仿照上面的英文句式写出理由。',
          hint: '乘法里有没有一张“不管乘谁都得 0”的王牌数字？',
          solution:
            '- **$\\exists y\\,\\forall x\\,(xy = 0)$ — True.** Choose $y = 0 \\in \\mathbb{R}$. Then for every $x \\in \\mathbb{R}$, $x \\cdot 0 = 0$.\n- **$\\forall y\\,\\exists x\\,(xy = 0)$ — True.** For any $y \\in \\mathbb{R}$, choose $x = 0 \\in \\mathbb{R}$; then $0 \\cdot y = 0$.\n\n> 顺手记一条普遍规律：只要先手更难赢的 $\\exists y\\,\\forall x\\,P(x,y)$ 为真，后手更好赢的 $\\forall x\\,\\exists y\\,P(x,y)$ **一定自动为真**；反过来则不成立（Q4 就是反例）！',
          variant: {
            prompt:
              '若把 $Q(x,y): x \\cdot y = 1$ 放在全体实数 $\\mathbb{R}$ 上，判断 $\\forall y\\,\\exists x\\,(x \\cdot y = 1)$ 的真假。',
            hint: '对手 $\\forall y$ 会挑哪一个实数让你根本除不过去？',
            solution:
              '**False！** 对手只需挑反例 $y = 0 \\in \\mathbb{R}$：此时对一切实数 $x$ 都有 $x \\cdot 0 = 0 \\neq 1$，找不到任何实数 $x$。',
          },
        },
      },
      {
        id: 's04',
        num: '04',
        title: '把英文句子翻成符号时，为什么“每个……的人”绝不能配“且”？',
        examTag: '当场拿下 Test 01 Question 1a（9 分 · 复盘 -3 扣分点）',
        markdown: md.s04,
        examBox: {
          title: 'Test 01 · Question 1a（9 marks）满分英文符号翻译',
          markdown: [
            '- **Hypothesis 1** (*Every student who attends all lectures is respected*):',
            '',
            '$$',
            '\\forall x\\,\\big((\\forall y\\,A(x,y)) \\to R(x)\\big)',
            '$$',
            '',
            '- **Hypothesis 2** (*A student attends some lectures if and only if the student understands the material*):',
            '',
            '$$',
            '\\forall x\\,\\big((\\exists y\\,A(x,y)) \\leftrightarrow M(x)\\big)',
            '$$',
            '',
            '- **Hypothesis 3** (*If a student understands the material, then the student passes the course*):',
            '',
            '$$',
            '\\forall x\\,\\big(M(x) \\to P(x)\\big)',
            '$$',
            '',
            '> **防丢分自检清单**：① 每个变量 $x, y$ 头顶都有量词管住（绝不漏写 H3 的 $\\forall x$！）；② H1 的 $\\forall y\\,A(x,y)$ 用括号包在箭头**左边内部**。',
          ].join('\n'),
        },
        optionalReading: {
          title: '量词句怎么取反？“恰好有一个（∃!）”怎么不用新符号写出来？',
          markdown: [
            '期末常考另外两招翻译基本功（Tutorial 02 Q6–Q8）：',
            '1. **量词德摩根律（把否定号 $\\neg$ 一层层往里推）**：“不是所有人都及格”等于“至少有个人没及格”；“不存在人及格”等于“所有人都没及格”：',
            '',
            '$$',
            '\\neg\\forall x\\,P(x) \\equiv \\exists x\\,\\neg P(x), \\qquad \\neg\\exists x\\,P(x) \\equiv \\forall x\\,\\neg P(x)',
            '$$',
            '',
            '遇到多层嵌套如 $\\neg\\forall x\\,\\exists y\\,(P(x,y) \\to Q(x))$：每穿过一个量词就把它翻个面（$\\forall \\leftrightarrow \\exists$），最后用 $\\neg(A\\to B) \\equiv A \\land \\neg B$ 收尾，直接写出 $\\exists x\\,\\forall y\\,(P(x,y) \\land \\neg Q(x))$！',
            '2. **唯一量词 $\\exists! x\\,P(x)$（Exactly one，“恰好有一个人满足 $P$”）**：只准用普通 $\\forall, \\exists$ 时，把它拆成“有一个 $x$ 满足 $P(x)$，并且任何满足 $P(y)$ 的人 $y$ 都只能是 $x$ 本人”：',
            '',
            '$$',
            '\\exists x\\,\\big(P(x) \\land \\forall y\\,(P(y) \\to y = x)\\big)',
            '$$',
          ].join('\n'),
        },
        practice: {
          title: '翻译“没有一个学生每节课都缺席”并把否定推到底',
          prompt:
            '沿用本节的 $A(x,y)$（学生 $x$ 上了讲座 $y$）。请把英文 *"No student misses all lectures"* 写成逻辑式，并验证将 $\\neg$ 推到最里面后与第二种自然读法完全一致。',
          hint: '“没有一个学生满足 [条件]”就是 $\\neg\\exists x\\,(\\text{条件})$；“缺席所有课”就是 $\\forall y\\,\\neg A(x,y)$。',
          solution:
            '先直译：$\\neg\\exists x\\,\\forall y\\,\\neg A(x,y)$。\n\n把 $\\neg$ 穿过两个量词往里推：$\\forall x\\,\\exists y\\,\\neg(\\neg A(x,y)) \\equiv \\forall x\\,\\exists y\\,A(x,y)$ —— 读出来正是“班上每一个学生都至少上过某一节讲座”！',
        },
      },
      {
        id: 's05',
        num: '05',
        title: '顺着线索往下推，哪一步铁证如山，哪一步只是错觉？',
        examTag: '当场拿下 Test 01 Question 1b（15 分 · 复盘 -5 扣分点）',
        markdown: md.s05,
        lab: 'inference',
        labPrompt:
          '先看预设的 Noah 反例（6 条前提全绿，结论却为 False）；再切换到 Bob，试着把他的“通过了这门课”改成 False，看看哪条前提会立刻报警？',
        examBox: {
          title: 'Test 01 · Question 1b（15 marks）满分 Step/Reason 表与反例解释',
          markdown: [
            '**i) Bob passes the course — YES, can be drawn.** *(Assume the course has at least one lecture $c$.)*',
            '',
            '| Step | Proposition | Reason |',
            '|---|---|---|',
            '| 1 | $\\forall y\\,A(\\text{Bob}, y)$ | Hypothesis 4 |',
            '| 2 | $A(\\text{Bob}, c)$ | Universal Instantiation from (1) |',
            '| 3 | $\\exists y\\,A(\\text{Bob}, y)$ | Existential Generalization from (2) |',
            '| 4 | $\\forall x\\,((\\exists y\\,A(x,y)) \\leftrightarrow M(x))$ | Hypothesis 2 |',
            '| 5 | $(\\exists y\\,A(\\text{Bob}, y)) \\leftrightarrow M(\\text{Bob})$ | Universal Instantiation from (4) |',
            '| 6 | $(\\exists y\\,A(\\text{Bob}, y)) \\to M(\\text{Bob})$ | Biconditional equivalence & Simplification from (5) |',
            '| 7 | $M(\\text{Bob})$ | Modus Ponens from (3) and (6) |',
            '| 8 | $\\forall x\\,(M(x) \\to P(x))$ | Hypothesis 3 |',
            '| 9 | $M(\\text{Bob}) \\to P(\\text{Bob})$ | Universal Instantiation from (8) |',
            '| 10 | $P(\\text{Bob})$ | Modus Ponens from (7) and (9) |',
            '',
            '---',
            '',
            '**ii) Noah is not respected — NO, cannot be drawn.**',
            '- From $\\neg P(\\text{Noah})$ and H3 (UI + Modus Tollens), we get $\\neg M(\\text{Noah})$. Together with H2, this yields $\\neg\\exists y\\,A(\\text{Noah}, y)$, hence $\\neg\\forall y\\,A(\\text{Noah}, y)$.',
            '- However, H1 only gives $(\\forall y\\,A(\\text{Noah}, y)) \\to R(\\text{Noah})$. Concluding $\\neg R(\\text{Noah})$ from $\\neg\\forall y\\,A(\\text{Noah}, y)$ commits the fallacy of **denying the hypothesis**.',
            '- **Counterexample:** Suppose Noah attends no lectures ($A(\\text{Noah},y)=\\mathbf{F}$), does not understand the material ($M(\\text{Noah})=\\mathbf{F}$), and fails the course ($P(\\text{Noah})=\\mathbf{F}$), yet is still respected ($R(\\text{Noah})=\\mathbf{T}$). All hypotheses H1–H5 hold, while $\\neg R(\\text{Noah})$ is false.',
            '',
            '---',
            '',
            '**iii) Jessica does not pass the course — NO, cannot be drawn.**',
            '- We have $\\neg M(\\text{Jessica})$ (H6) and $M(\\text{Jessica}) \\to P(\\text{Jessica})$ (UI from H3). Inferring $\\neg P(\\text{Jessica})$ commits the fallacy of **denying the hypothesis**.',
            '- **Counterexample:** Suppose Jessica attends no lectures ($\\exists y\\,A(\\text{Jessica},y)=\\mathbf{F}$), does not understand the material ($M(\\text{Jessica})=\\mathbf{F}$), is not respected ($R(\\text{Jessica})=\\mathbf{F}$), **but passes the course** ($P(\\text{Jessica})=\\mathbf{T}$, e.g., by luck). All hypotheses hold, while $\\neg P(\\text{Jessica})$ is false.',
          ].join('\n'),
        },
        optionalReading: {
          title: '还有哪几条常用的推理积木？（三段论 / 存在实例化 EI 的取名规矩 / 消解律）',
          markdown: [
            '除了刚才用上的 UI、EG、Modus Ponens、Modus Tollens 和化简律（Simplification：$p\\land q \\therefore p$），Tutorial 03 里还会见到四块积木（课件 Ch1.5）：',
            '- **假言三段论（Hypothetical Syllogism）**：$p \\to q,\\ q \\to r \\therefore p \\to r$（箭头首尾接龙）。',
            '- **析取三段论（Disjunctive Syllogism）**：$p \\lor q,\\ \\neg p \\therefore q$（二选一排除了左边，就只剩右边）。',
            '- **消解律（Resolution）**：$p \\lor q,\\ \\neg p \\lor r \\therefore q \\lor r$。',
            '- **存在实例化（Existential Instantiation，EI）**：由 $\\exists x\\,P(x)$ 设出 $P(c)$ —— **铁律：$c$ 必须是一个前文从未用过的全新名字**！如果题目里先后有两个 $\\exists x\\,P(x)$ 和 $\\exists x\\,Q(x)$，必须分别设成 $P(c_1)$ 和 $Q(c_2)$，绝不能偷懒都叫 $c$（认识一个会弹琴的人，又认识一个会游泳的人，未必是同一个人！）。',
          ].join('\n'),
        },
        practice: {
          title: '亲手写一张四步形式证明表（Slides 1.5 经典题）',
          prompt:
            '已知前提：① 班上某个学生没读课本 $\\exists x\\,(C(x) \\land \\neg B(x))$；② 班上所有人都通过了第一次考试 $\\forall x\\,(C(x) \\to P(x))$。请用 `Step | Reason` 表推出结论：**“有人通过了第一次考试但没读课本”** $\\exists x\\,(P(x) \\land \\neg B(x))$。',
          hint: '先对带 $\\exists$ 的第①条做 EI（起个新名字 $a$），拆出 $C(a)$ 和 $\\neg B(a)$，再把第②条 UI 到同一个 $a$ 身上！',
          solution:
            '| Step | Proposition | Reason |\n|---|---|---|\n| 1 | $\\exists x\\,(C(x)\\land\\neg B(x))$ | Premise |\n| 2 | $C(a)\\land\\neg B(a)$ | Existential Instantiation from (1) |\n| 3 | $C(a)$ | Simplification from (2) |\n| 4 | $\\forall x\\,(C(x)\\to P(x))$ | Premise |\n| 5 | $C(a)\\to P(a)$ | Universal Instantiation from (4) |\n| 6 | $P(a)$ | Modus Ponens from (3),(5) |\n| 7 | $\\neg B(a)$ | Simplification from (2) |\n| 8 | $P(a)\\land\\neg B(a)$ | Conjunction from (6),(7) |\n| 9 | $\\exists x\\,(P(x)\\land\\neg B(x))$ | Existential Generalization from (8) |',
        },
      },
      {
        id: 's06',
        num: '06',
        title: '正着算要开根号卡住了，为什么掉个头立刻畅通无阻？',
        examTag: '当场拿下 Test 01 Question 5（5 分）',
        markdown: md.s06,
        examBox: {
          title: 'Test 01 · Question 5（5 marks）满分英文证明示范',
          markdown: [
            '**原题**：*Prove or disprove that for all integers $n$, if $n^2$ is even, then $n$ must also be even.*',
            '',
            '**Claim:** The statement is **true**.',
            '',
            '**Proof (by contraposition):** We prove the contrapositive statement: for any integer $n$, if $n$ is not even (i.e., $n$ is odd), then $n^2$ is not even (i.e., $n^2$ is odd).',
            '',
            'Assume $n$ is odd. By definition of an odd integer, there exists an integer $k$ such that $n = 2k + 1$. Then',
            '',
            '$$',
            'n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.',
            '$$',
            '',
            'Since $k$ is an integer, $m = 2k^2 + 2k$ is also an integer, and $n^2 = 2m + 1$. By definition, $n^2$ is odd (hence not even).',
            '',
            'Since the contrapositive is true, the original statement holds for all integers $n$. $\\square$',
          ].join('\n'),
        },
        optionalReading: {
          title: '遇到“无理数”或“绝对值”时怎么证？（反证法证 √2 无理数 & 分情况证明）',
          markdown: [
            '期末证明题常在这三种招式里挑一个（Tutorial 03 Q4–Q9）：',
            '1. **什么时候必须用反证法（Proof by contradiction）？** 当结论里写着“是无理数（irrational）”“不存在整数解”时——因为“不是分数”没法正着写成等式，一旦反过来假设“**它是分数**”，立刻就能写出最简分数 $a/b$！',
            '   - **经典必背：证明 $\\sqrt{2}$ 是无理数**。Assume for contradiction $\\sqrt{2}$ is rational. Then $\\sqrt{2} = a/b$ where $a, b \\in \\mathbb{Z}, b \\neq 0$, and $\\gcd(a,b)=1$ (lowest terms，互质无公因子 $2$！). 平方得 $2 = a^2 / b^2 \\implies a^2 = 2b^2$，故 $a^2$ 是偶数；直接套用本节刚证完的结论得 **$a$ 是偶数**，设 $a = 2k$。代回得 $(2k)^2 = 2b^2 \\implies 4k^2 = 2b^2 \\implies b^2 = 2k^2$，故 $b^2$ 也是偶数，$b$ 也是偶数！于是 $2$ 同时整除 $a$ 和 $b$，与 $\\gcd(a,b)=1$ 最简分数假设矛盾！$\\square$',
            '2. **分情况证明（Proof by cases）**：看到绝对值 $|x|$、$\\max/\\min$ 或“对任意整数 $n$，$n^2+n$ 是偶数”时，把全集切成不漏的几块（如 Case 1: $n=2k$ 偶；Case 2: $n=2k+1$ 奇），每一块单独算通即证毕。',
          ].join('\n'),
        },
        practice: {
          title: '练一题逆否证明：3n + 2 是奇数 ⇒ n 是奇数',
          prompt:
            '（Tutorial 03 经典同型题）用英文写出完整证明：*Prove that if $3n + 2$ is odd, then $n$ is odd, where $n$ is an integer.*',
          hint: '直接从 $3n+2 = 2k+1$ 解 $n = (2k-1)/3$ 又要卡在分数上！掉头证逆否：Assume $n$ is even（$n = 2k$）……',
          solution:
            '**Proof (by contraposition):** We prove the contrapositive: if $n$ is even, then $3n + 2$ is even.\n\nAssume $n$ is even. Then $n = 2k$ for some integer $k$. Substituting gives:\n\n$$\n3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1).\n$$\n\nSince $3k + 1$ is an integer, $3n + 2$ is even by definition. Therefore, if $3n + 2$ is odd, $n$ must be odd. $\\square$',
        },
      },
      {
        id: 's07',
        num: '07',
        title: '不仅要说明“找得到”，还要证明“绝没有第二个”，该怎么下笔？',
        examTag: '当场拿下 Test 01 Question 6（8 分 · 复盘手写“唯一的?”）',
        markdown: md.s07,
        examBox: {
          title: 'Test 01 · Question 6（8 marks）满分英文两段式证明',
          markdown: [
            '**原题**：*Let $2 \\le n$ be a fixed integer. Prove that for every integer $a$ there exist unique integers $q$ and $r$ with $0 \\le r < n$ such that $a = nq + r$.*',
            '',
            '**Proof:** We prove existence and uniqueness separately.',
            '',
            '**(1) Existence:** Let $q = \\lfloor a / n \\rfloor$ and $r = a - nq$. Since $a, n, q \\in \\mathbb{Z}$, $r$ is also an integer and $a = nq + r$. By definition of the floor function, $q \\le a / n < q + 1$. Multiplying by $n > 0$ (since $n \\ge 2$) gives $nq \\le a < nq + n$. Subtracting $nq$ yields $0 \\le a - nq < n$, i.e., $0 \\le r < n$. Thus such integers $q$ and $r$ exist.',
            '',
            '**(2) Uniqueness:** Suppose there are two pairs of integers $(q_1, r_1)$ and $(q_2, r_2)$ satisfying $a = nq_1 + r_1 = nq_2 + r_2$ with $0 \\le r_1 < n$ and $0 \\le r_2 < n$.',
            '',
            'Subtracting the two equations gives:',
            '',
            '$$',
            'n(q_1 - q_2) = r_2 - r_1,',
            '$$',
            '',
            'so $r_2 - r_1$ is an integer multiple of $n$. Meanwhile, from $0 \\le r_1 < n$ and $0 \\le r_2 < n$, we have $-n < r_2 - r_1 < n$. The only multiple of $n$ strictly between $-n$ and $n$ is $0$. Hence $r_2 - r_1 = 0$, so $r_1 = r_2$.',
            '',
            'Substituting $r_1 = r_2$ back gives $n(q_1 - q_2) = 0$. Since $n \\ge 2 > 0$, dividing by $n$ yields $q_1 - q_2 = 0$, so $q_1 = q_2$. Therefore, $q$ and $r$ are unique. $\\square$',
          ].join('\n'),
        },
        practice: {
          title: '用同一套“存在 + 唯一”双段模板秒杀实数一次方程',
          prompt:
            '（Tutorial 03 Q10 / Slides 1.6 p81）证明：给定实数 $a, b$ 且 $a \\neq 0$，存在**唯一**的实数 $r$ 使得 $ar + b = 0$。',
          hint: '严格分成 **(1) Existence**（直接写出 $r$ 等于多少并代回验算）和 **(2) Uniqueness**（设 $ar_1+b=0$ 且 $ar_2+b=0$，相减并利用 $a\\neq 0$）。',
          solution:
            '**Proof:**\n- **(Existence)** Let $r = -b / a$. Since $a \\neq 0$, $r$ is a well-defined real number, and $ar + b = a(-b/a) + b = -b + b = 0$.\n- **(Uniqueness)** Suppose $r_1, r_2 \\in \\mathbb{R}$ both satisfy $ar_1 + b = 0$ and $ar_2 + b = 0$. Subtracting gives $a(r_1 - r_2) = 0$. Since $a \\neq 0$, dividing both sides by $a$ yields $r_1 - r_2 = 0$, hence $r_1 = r_2$. $\\square$',
          variant: {
            prompt:
              '如果回到整数的带余除法 $a = nq + r$，把余数条件从 $0 \\le r < n$ 放宽成 $0 \\le r \\le n$（多了一个等号！），存在性和唯一性哪一半会当场失效？举一个具体数字例子说明。',
            hint: '拿 $n = 5$、$a = 10$ 试试看能不能写出两套不同的 $(q, r)$？',
            solution:
              '**存在性依然成立，但唯一性当场破裂！** 例如取 $n = 5, a = 10$：既可以写 $10 = 5 \\times 2 + 0$（$q_1=2, r_1=0$），也可以写 $10 = 5 \\times 1 + 5$（$q_2=1, r_2=5$），两套都满足 $0 \\le r \\le 5$！在证明中，放宽成 $\\le n$ 后差值变成 $-n \\le r_2 - r_1 \\le n$，两端混进了 $-n$ 和 $n$ 这两个非零倍数，再也夹不住唯一的 $0$ 了。',
          },
        },
      },
    ],
  };
}
