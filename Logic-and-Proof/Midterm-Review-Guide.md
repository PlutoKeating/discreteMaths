# 逻辑与证明 · 一句话什么时候算真，一段话凭什么推得出来？

> 不死背二十条生僻规则名。直接从 Midterm Test 01（60 分）的五道英文真题出发，顺着“真假怎么算 → 量词谁先出牌 → 线索能不能推 → 证明从哪头下笔”一路推演到底。
> 配套在线交互版路径：`/Logic-and-Proof/`（含交互实验教具、原卷双语抽屉、术语点击速查与本机笔记保存）。

---

## 开篇 · 把真题摊在桌上

如果你第一次翻开《离散数学》的第一章课件，很容易被一长串陌生的英文词吓退：什么 contrapositive、Modus Tollens、universal instantiation、vacuously true……看起来像要把一本法律条文硬背下来。

先把那些名字全忘掉。我们换一种办法：直接把这门课第一次期中考试的真题卷（**Midterm Test 01，满分 60 分**）摊在桌上，看看考官到底要你解决哪几件具体的事：

1. **判断两句绕口的话是不是同一个意思**（第 2 题，15 分）——而且卷面上明令写着 `Do not use truth tables`（不准列真值表硬试），逼你像做代数题一样把一句话变形成另一句话。
2. **分清“每个人”和“某个人”谁先出场**（第 4 题，8 分；第 1a 题，9 分）——把日常英语里的选课规则翻译成符号，再判断调换先后顺序以后真假会不会翻盘。
3. **在一堆校园传言里当侦探**（第 1b 题，15 分）——给你 6 条已知线索，问 Bob、Noah、Jessica 三人的结局哪些铁板钉钉能推出来，哪些只是听起来顺耳的错觉。
4. **自己动笔写两段无懈可击的英文短证明**（第 5、6 题，13 分）——一段证“平方是偶数的人自己也得是偶数”，另一段证“做带余除法时商和余数不仅找得到，而且绝不会有第二套”。

整张卷子 60 分，其实只围着一个最朴素的念头打转：**一句话在什么情况下算真（True）、什么情况下算假（False）？** 接下来我们顺着这四幕一路追问下去，每走完一两节，你就亲自划掉考卷上的一道大题。

<details>
<summary><strong>开篇自查 1 · </strong>朋友承诺“如果期中考满 90 分，周末就请你吃火锅”。结果他只考了 82 分，周末也没请你。他算说话不算数吗？</summary>

**不算违约（整句话依然算真 True）**。承诺只管“考满 90 分”之后发生的事；没考到 90 分时触发条件根本没发生，无论请不请客都没有打破诺言。这一条直觉几乎决定了整张逻辑考卷一半的陷阱。

</details>

<details>
<summary><strong>开篇自查 2 · </strong>在整数里，“先挑定一个万能数 y，跟任何整数 x 相加都等于 10”和“随便别人报什么整数 y，你都能配出一个整数 x 相加等于 10”，哪一句能办到？</summary>

**后一句能办到，前一句办不到**。后一句你是后手，别人报 $y$ 你就出 $10-y$；前一句逼你先出死一张底牌 $y$，对手随便换个 $x$ 就能拆你的台。这就是第 03 节要玩的先后手量词博弈。

</details>

---

# 第 1 幕：把真假算清楚，不用真值表怎么变形？（直指第 2a、2b 题（10 分））

> 考卷一上来就禁止列真值表。只要看透“如果……那么……”什么时候才算违约，你手里就有了把箭头拆成普通“且 / 或”的万能扳手。

## 01 “如果……那么……”什么时候才算说了假话？

*全卷底层地基 · 拆箭头与逆否等价*

朋友在考前向你拍胸脯立下一句承诺：“如果我这次离散数学考满 90 分，周末就请你吃火锅。”

两周后成绩出来了，周末也过去了。一共只可能发生四种结局：他考到了 90 分也请了客；他考到了 90 分却赖账没请；他只考了 80 分但心情好照样请了你；他考了 80 分也没请客。先停一下想一想：在这四种结局里，哪几种你会指着他说“你说话不算数”？

只有第二种——“考到了 90 分，却没请吃火锅”——才算违背诺言。前两种很好理解；真正让初学者觉得别扭的是后两种：当他**没考到 90 分**的时候，不管他周末请没请你吃饭，他都没有违背当初那句承诺。触发条件压根没发生，诺言就没有被打破的可能。

逻辑学把这种“非真即假、没有中间地带”的陈述句叫作 **命题（proposition）**，把它的对错结果叫作 **真值（truth value）**，用 $\mathbf{T}$ 表示真、$\mathbf{F}$ 表示假。像“怎么拨开关？”或者 $x + 1 = 3$（还没说 $x$ 是几）这样没法当场判对错的句子，还不算命题。

把简单命题拼起来的词，其实只是对 $\mathbf{T}$ 和 $\mathbf{F}$ 做运算的小机器：

- 给一句话前面加个 $\neg p$，叫 **否定（negation）**，就是把真假反过来。
- 写 $p \land q$（读作 and），叫 **合取（conjunction）**，两边都真才算真，像两道串联的开关。
- 写 $p \lor q$（读作 or），叫 **析取（disjunction）**，只要至少有一边为真就算真（注意数学里的“或”默认包含两边都真的情形；如果非要表达“二选一、不能都要”，会专门写成圆圈加号 $p \oplus q$，叫 **异或（exclusive or）**）。

而刚才那句最要紧的“如果 $p$，那么 $q$”，写作 $p \to q$，叫作 **条件语句（conditional statement）** 或蕴含（implication），箭头左边的 $p$ 是前件（hypothesis），右边的 $q$ 是后件（conclusion）。因为“只有前件 $\mathbf{T}$ 且后件 $\mathbf{F}$ 这一种情况算假”，我们可以换一种完全不用箭头的说法来表达同一份承诺：**“要么我没考到 90 分（$\neg p$），要么我请你吃了火锅（$q$）。”**

在下面的面板里拨动 $p$ 和 $q$ 的真假试一试。留意右边那几行衍生句式：哪两句无论你怎么拨开关，永远跟原句 $p \to q$ 同生共死？

实验里藏着考场上最值钱的两条发现：

第一，$p \to q$ 和 $\neg p \lor q$ 在任何情况下真假都一字不差。后面只要考题不准用真值表，**把箭头 $p \to q$ 拆成 $\neg p \lor q$ 几乎永远是化简的第一步**。

第二，如果把箭头两头对调成 $q \to p$（“请吃火锅就说明考了 90 分”），这叫 **逆命题（converse）**；如果两头直接同时加非号变成 $\neg p \to \neg q$（“没考 90 分就不请客”），这叫 **否命题（inverse）**——刚才拨成 $p=\mathbf{F}, q=\mathbf{T}$ 时你已经亲眼看到，这两句全都变假了，它们跟原话**不是一回事**！唯独既掉头、又同时取反的 $\neg q \to \neg p$（“周末没请吃火锅，说明他肯定没考到 90 分”），永远和原话同真同假。它叫 **逆否命题（contrapositive）**，第 06 节写证明题卡壳时，全靠它救命。

<details>
<summary><strong>选读 · 英文考卷里还有哪些暗藏的箭头说法？（only if / necessary / biconditional）</strong></summary>

纯英文卷最爱在翻译题里把 `if p, then q` 换一件马甲考你（对应课件 Ch1.1 p31）：
- **`q if p`** / **`q whenever p`** / **`p is sufficient for q`（充分条件）**：都是标准的 $p \to q$（`if` 后面的永远是前件 $p$！）。
- **`p only if q`（仅当）** / **`q is necessary for p`（必要条件）**：依然是 **$p \to q$**！为什么？“只有年满 18 岁才能考驾照”（考驾照 only if 满 18 岁），意思是“如果你考了驾照，那你必定满 18 岁”，而不是满了 18 岁就非去考驾照不可！记住：**`only if` 后面跟的是箭头右边的结论 $q$**。
- **`p if and only if q`（当且仅当，简写 `iff`）**：写作双箭头 $p \leftrightarrow q$，叫 **双条件（biconditional）**。只有两边同真或同假时才为 $\mathbf{T}$，拆开就是 $(p \to q) \land (q \to p)$。
- **运算优先级（Ch1.1 p41）**：$\neg$ 最高 $\succ \land \succ \lor / \oplus \succ \to \succ \leftrightarrow$ 最低（量词 $\forall, \exists$ 高于一切联结词）。考场手写答案**宁可多套一层括号**，也别赌阅卷人替你猜优先级。

</details>

<details>
<summary><strong>练习 · 分清 only if 与逆否命题</strong></summary>

设 $p$ 表示“今天下雪”，$q$ 表示“学校停课”。请把英文句子 *"School is closed only if it snows today"* 写成符号，并用日常话写出与它**逻辑等价**的逆否命题。

<details>
<summary>给我一点提示</summary>

先想：如果今天下雪但学校没停课，违反这句话了吗？如果今天没下雪学校却停课了呢？哪一种情况打破了“only if”？

</details>

<details>
<summary>对照考场满分写法</summary>

“只有下雪才停课”排除的是“停了课（$q=\mathbf{T}$）却没下雪（$p=\mathbf{F}$）”，所以符号是 **$q \to p$**（注意方向：`only if` 后面的是箭头右边！）。

它的逆否命题是 **$\neg p \to \neg q$**：“如果今天没下雪，那么学校一定没停课。”

</details>

#### 再改一个条件

不用真值表，试着说明为什么“逆命题 $q \to p$”和“否命题 $\neg p \to \neg q$”虽然都不等于原话 $p \to q$，但它们俩彼此之间却永远同真同假？

<details>
<summary>对照变式推理</summary>

把 $q \to p$ 做逆否变换得到 $\neg p \to \neg q$（或者都拆成无箭头形式：$\neg q \lor p \equiv p \lor \neg q$）。它们互为对方的逆否命题，因此永远逻辑等价。

</details>

</details>

## 02 考卷禁止列真值表时，凭什么说两句话意思完全一样？

*当场拿下 Test 01 Question 2a, 2b（10 分）*

Test 01 的第 2 题一上来就端出三组长得挺唬人的式子，比如问你：

$$
((p \land \neg q) \lor (p \land r)) \quad\text{和}\quad (p \land (q \to r))
$$

是不是“逻辑等价”的，紧接着冷冰冰地补了一句：**`Do not use truth tables.`**（禁用真值表，用了直接零分。）

先别急着背那张十几个名字的定律表。所谓两句话 **逻辑等价（logically equivalent）**，记作 $P \equiv Q$，意思本来很简单：不管里面的变量怎么取 $\mathbf{T}$ 或 $\mathbf{F}$，两边算出来的结果永远一样。既然不准把 8 种组合一行行算出来，我们还能靠什么说服阅卷人？

回想一下你在初中是怎么说明 $a \times b + a \times c$ 永远等于 $a \times (b + c)$ 的。你并没有把全世界的数字代进去试一遍，而是直接把共同的 $a$ 提到了括号外面。

逻辑里的 $\land$（且）和 $\lor$（或）也有一模一样的脾气。看左边那串 $((p \land \neg q) \lor (p \land r))$：两半小括号里都有一个“$p \land \dots$”。把公共的 $p \land$ 提到括号外面，剩下的 $\neg q$ 和 $r$ 用中间的 $\lor$ 连起来，式子当场就缩成了：

$$
p \land (\neg q \lor r)
$$

这一步在卷面上写的名字，和初中代数一字不差，就叫 **分配律（distributive laws）**。再盯住括号里的 $\neg q \lor r$——还记得上一节我们怎么拆开承诺箭头的吗？$q \to r$ 拆开就是 $\neg q \lor r$，现在不过是顺手把它装回去！两步之内，左边就原封不动变成了右边的 $p \land (q \to r)$。

再看第 2 题的 b) 问：考官问 $(p \to (q \to r))$ 和 $((p \land q) \to r)$ 等不等价。先用大白话读一遍：“如果你选了这门课，那么（如果你期末及格，就拿到学分）”，和“如果你选了这门课**并且**期末及格，那么拿到学分”，说的当然是同一件事。可怎么只靠符号变形走过去呢？

刚才我们已经有一条铁律：**看见箭头 $\to$ 先拆成“非左或右”**。把两层箭头依次拆开：

$$
p \to (q \to r) \;\equiv\; \neg p \lor (q \to r) \;\equiv\; \neg p \lor (\neg q \lor r)
$$

现在三个都是“或”，括号挪到前两项上变成 $(\neg p \lor \neg q) \lor r$（**结合律 associative laws**）。看清括号里的 $\neg p \lor \neg q$：“$p$ 假或者 $q$ 假”，换句话说不就是“‘$p$ 和 $q$ 都真’这件事没成”吗？把非号提到括号外面，里面的 $\lor$ 翻个身变成 $\land$，写作 $\neg(p \land q) \lor r$。这条“拆括号提非号，且或互翻”的铁律，就是大名鼎鼎的 **德摩根律（De Morgan's laws）**：

$$
\neg(p \land q) \equiv \neg p \lor \neg q, \qquad \neg(p \lor q) \equiv \neg p \land \neg q
$$

最后把 $\neg(p \land q) \lor r$ 重新装回箭头 $(p \land q) \to r$，整条变形链严丝合缝。你看，根本不需要死背那条生僻的“输出律（exportation）”，只靠**消箭头 → 德摩根 → 提公因式**这三板斧，考场上的等价变形题就已经稳拿十分了。

### 【考场真题落笔】Test 01 · Question 2a & 2b（10 marks）满分英文答卷示范

**原题要求**：*Show whether the following pairs of propositions are equivalent. If not, propose a counterexample. Do not use truth tables.*

**a)** $((p\land\neg q)\lor(p\land r))$ and $(p\land(q\to r))$:

$$
\begin{aligned}
(p\land\neg q)\lor(p\land r) &\equiv p\land(\neg q\lor r) && \text{(Distributive law)}\\
&\equiv p\land(q\to r) && \text{(Conditional-disjunction equivalence: } q\to r \equiv \neg q\lor r\text{)}
\end{aligned}
$$

Therefore, the two propositions are **logically equivalent**.

**b)** $(p\to(q\to r))$ and $((p\land q)\to r)$:

$$
\begin{aligned}
p\to(q\to r) &\equiv \neg p\lor(q\to r) && \text{(Conditional-disjunction equivalence)}\\
&\equiv \neg p\lor(\neg q\lor r) && \text{(Conditional-disjunction equivalence)}\\
&\equiv (\neg p\lor\neg q)\lor r && \text{(Associative law)}\\
&\equiv \neg(p\land q)\lor r && \text{(De Morgan's law)}\\
&\equiv (p\land q)\to r && \text{(Conditional-disjunction equivalence)}
\end{aligned}
$$

Therefore, the two propositions are **logically equivalent**.

> **阅卷采分点**：① 每走一步必须在右侧括号写清所用定律英文名；② 结尾明确写下结论 `logically equivalent`。

<details>
<summary><strong>选读 · 化简时还会用到的几条小零件（同一律 / 支配律 / 否定律 / 永真式）</strong></summary>

消掉箭头并推完德摩根之后，括号里偶尔会撞见同一个字母跟自己的非号碰面（如 $p \lor \neg p$ 或 $p \land \neg p$）。这四对小零件和普通算术里的 $0$、$1$ 一样自然（课件 Ch1.2 p82）：
- **否定律（Negation laws）**：$p \lor \neg p \equiv \mathbf{T}$（叫 **永真式 tautology**）；$p \land \neg p \equiv \mathbf{F}$（叫 **矛盾式 contradiction**）。
- **支配律（Domination laws）**：$p \lor \mathbf{T} \equiv \mathbf{T}$（或上真就封顶为真）；$p \land \mathbf{F} \equiv \mathbf{F}$（且上假就归零为假）。
- **同一律（Identity laws）**：$p \land \mathbf{T} \equiv p$；$p \lor \mathbf{F} \equiv p$。
- **幂等律与双重否定**：$p \lor p \equiv p$，$p \land p \equiv p$，$\neg(\neg p) \equiv p$。

</details>

<details>
<summary><strong>练习 · 不用真值表证双条件否定，并练一次“不等价交反例”</strong></summary>

（Tutorial 01 Q3b）不用真值表，判断 $\neg(p \leftrightarrow q)$ 与 $p \leftrightarrow \neg q$ 是否逻辑等价，写出带规则名的推导。

<details>
<summary>给我一点提示</summary>

用等价式 $A \leftrightarrow B \equiv (A\land B)\lor(\neg A\land\neg B)$（或者拆成 $(p\to q)\land(q\to p)$），再用德摩根律把最外面的 $\neg$ 推到里面。

</details>

<details>
<summary>对照考场满分写法</summary>

$$
\begin{aligned}
\neg(p\leftrightarrow q) &\equiv \neg((p\to q)\land(q\to p)) && \text{(Biconditional equivalence)}\\
&\equiv \neg(p\to q)\lor\neg(q\to p) && \text{(De Morgan's law)}\\
&\equiv \neg(\neg p\lor q)\lor\neg(\neg q\lor p) && \text{(Conditional equivalence)}\\
&\equiv (p\land\neg q)\lor(q\land\neg p) && \text{(De Morgan and Double negation)}\\
&\equiv (p\land\neg q)\lor(\neg p\land \neg(\neg q)) && \text{(Double negation and Commutative)}\\
&\equiv p\leftrightarrow \neg q && \text{(Biconditional equivalence)}
\end{aligned}
$$

故两者 **logically equivalent**。

</details>

#### 再改一个条件

如果考官把 Test 01 第 2b 题微调成：判断 $(p \to q) \to r$ 与 $p \to (q \to r)$ 是否等价？先猜真假，再按考场规范写出你的答案。

<details>
<summary>对照变式推理</summary>

**Not equivalent（不等价）！** 考场标准反例句式：

> **Not equivalent.** Counterexample: Let $p = \mathbf{F},\ q = \mathbf{T},\ r = \mathbf{F}$.
> - LHS: $(p \to q) \to r = (\mathbf{F} \to \mathbf{T}) \to \mathbf{F} = \mathbf{T} \to \mathbf{F} = \mathbf{F}$.
> - RHS: $p \to (q \to r) = \mathbf{F} \to (\mathbf{T} \to \mathbf{F}) = \mathbf{F} \to \mathbf{F} = \mathbf{T}$.
> Since LHS $\neq$ RHS under this assignment, they are not logically equivalent.

</details>

</details>

---

# 第 2 幕：加上“每个人”和“有个人”，顺序与括号怎么摆？（直指第 4、2c、1a 题（22 分））

> 一旦句子里出现了“所有学生”和“某些讲座”，先后顺序差一步、括号歪一寸，整句话的真假就会彻底翻转。

## 03 调换“任意”和“存在”的先后顺序，胜负为什么会彻底翻盘？

*当场拿下 Test 01 Question 4（8 分）与 Question 2c（5 分）*

单独一个句子 $x + y = 10$ 既不算真也不算假——因为你还不知道 $x$ 和 $y$ 是谁。像这样留着空位等对象填进去的模板，记作 $P(x, y)$，叫作 **谓词（predicate）**。想让它变成能判真假的命题，必须交代两件事：第一，$x$ 和 $y$ 允许从哪个池子里挑，这个池子叫 **论域（domain）**；第二，要求池子里“每一个都满足”还是“至少有一个满足”。

“每一个都满足”写成倒过来的 A：$\forall x$，叫 **全称量词（universal quantifier）**；“至少能挑出一个满足”写成反过来的 E：$\exists x$，叫 **存在量词（existential quantifier）**。

只放一个量词时谁都不会晕。真正让考场上丢分一片的，是 Test 01 第 4 题（8 分）：规定 $x, y$ 都是整数，$P(x, y)$ 表示 $x + y = 10$，请判断下面两句话谁真谁假，并写出理由：

- **b)** $\exists y\,\forall x\,P(x, y)$
- **c)** $\forall y\,\exists x\,P(x, y)$

两句话用的符号一模一样，连字母都没换，只是把 $\exists y$ 和 $\forall x$ 的先后位置对调了一下。先别背口诀，把它想成你和对手坐在一张桌子前玩**先后手出牌游戏**：**$\exists$ 是你出牌（你的目标是让等式成立），$\forall$ 是对手出牌（对手专挑能拆你台的数字），谁写在左边谁就必须先亮底牌！**

先看 **b) $\exists y\,\forall x\,(x + y = 10)$**：$\exists y$ 在最左边，逼着**你先出一张固定不变的整数 $y$** 拍在桌上，口出狂言说“接下来不管对手出什么整数 $x$，加起来都等于 10”。这可能赢吗？哪怕你出 $y = 7$，对手看了一眼你的牌，笑眯眯地出个 $x = 0$，$0 + 7 = 7 \neq 10$，你当场就输了！

再看 **c) $\forall y\,\exists x\,(x + y = 10)$**：这回 $\forall y$ 在左边，轮到**对手先亮牌**！不管对手拍下什么整数 $y$（哪怕是 $-999$），你是后手，完全可以**看着他的 $y$ 再定制你的 $x$**——你只要每次都打出 $x = 10 - y$（整数减整数当然还是整数），相加永远稳稳等于 $10$！

在下面的博弈台里亲自试几个数字，再试着把右上角的候选范围从“全体整数 $\mathbb{Z}$”切成“正整数 $\mathbb{Z}^+$”，看看刚才必胜的 c) 会不会突然翻车？

看懂了先后手，顺手就能把 Test 01 第 2 题最刁钻的最后一问 **2c)**（5 分）一起收掉：考官问 $p$ 和 $\forall x\,(\neg p \to (p \land r(x)))$ 等不等价，还特意叮嘱“假设 $p$ 与 $x$ 无关，且 $x$ 的论域 **非空（nonempty）**”。

先不管外面的 $\forall x$，把括号里面的箭头拆开：$\neg(\neg p) \lor (p \land r(x))$，双重否定消掉变成 $p \lor (p \land r(x))$。想一想这句话的真假：如果 $p$ 本身是真的，整句“$p$ 或……”已经真了；如果 $p$ 是假的，那右半边 $p \land r(x)$ 也跟着假，整句还是假！不管 $r(x)$ 折腾出什么花样，括号里整团式子的真假永远等于 $p$ 自己（这叫 **吸收律 absorption laws**）。

于是整道式子缩成了 $\forall x\,(p)$。既然 $p$ 里根本不含 $x$，只要池子里**至少有一个元素**（nonempty！），对每个 $x$ 喊一遍 $p$，当然就等于喊一句 $p$。可万一池子是空的呢？空池子里抓不出任何反例，$\forall x(\dots)$ 就会不管 $p$ 是真是假一律变成 **空真（vacuously true）**！考官特意写上 `nonempty`，正是为了给你最后一步去掉 $\forall x$ 铺路——写答案时把这四个字点出来，阅卷老师一眼就知道你是真懂。

### 【考场真题落笔】Test 01 · Question 4（8 marks）& Question 2c（5 marks）满分英文落笔

**Question 4**（$P(x,y): x+y=10$, domain of $x, y$ is $\mathbb{Z}$ — **每小问必写 True/False + 理由，否则像原卷一样被扣分！**）：
- **a) $\forall y\,\forall x\,P(x,y)$ — False.** Counterexample: take $x = 0, y = 0 \in \mathbb{Z}$; then $0 + 0 = 0 \neq 10$.
- **b) $\exists y\,\forall x\,P(x,y)$ — False.** Suppose for contradiction such an integer $y$ exists. Taking $x = 0$ gives $y = 10$, while taking $x = 1$ gives $1 + y = 10 \Rightarrow y = 9$, a contradiction.
- **c) $\forall y\,\exists x\,P(x,y)$ — True.** For any integer $y \in \mathbb{Z}$, choose $x = 10 - y$. Since $y \in \mathbb{Z}$, $x = 10 - y \in \mathbb{Z}$, and $x + y = (10 - y) + y = 10$.
- **d) $\exists y\,\exists x\,P(x,y)$ — True.** Witness: take $x = 5, y = 5 \in \mathbb{Z}$; then $5 + 5 = 10$.

---

**Question 2c**（$p$ and $\forall x\,(\neg p \to (p \land r(x)))$, $p$ independent of $x$, domain nonempty）：

$$
\begin{aligned}
\forall x\,(\neg p \to (p \land r(x))) &\equiv \forall x\,(\neg(\neg p) \lor (p \land r(x))) && \text{(Conditional equivalence)}\\
&\equiv \forall x\,(p \lor (p \land r(x))) && \text{(Double negation law)}\\
&\equiv \forall x\,(p) && \text{(Absorption law)}\\
&\equiv p && \text{(Since } p \text{ is independent of } x \text{ and domain is nonempty)}
\end{aligned}
$$

Therefore, they are **logically equivalent**.

<details>
<summary><strong>练习 · 把加号换成乘号，先手还能赢吗？</strong></summary>

把谓词换成 $Q(x, y): x \cdot y = 0$，论域为全体实数 $\mathbb{R}$。分别判断 **$\exists y\,\forall x\,Q(x,y)$** 与 **$\forall y\,\exists x\,Q(x,y)$** 的真假，并仿照上面的英文句式写出理由。

<details>
<summary>给我一点提示</summary>

乘法里有没有一张“不管乘谁都得 0”的王牌数字？

</details>

<details>
<summary>对照考场满分写法</summary>

- **$\exists y\,\forall x\,(xy = 0)$ — True.** Choose $y = 0 \in \mathbb{R}$. Then for every $x \in \mathbb{R}$, $x \cdot 0 = 0$.
- **$\forall y\,\exists x\,(xy = 0)$ — True.** For any $y \in \mathbb{R}$, choose $x = 0 \in \mathbb{R}$; then $0 \cdot y = 0$.

> 顺手记一条普遍规律：只要先手更难赢的 $\exists y\,\forall x\,P(x,y)$ 为真，后手更好赢的 $\forall x\,\exists y\,P(x,y)$ **一定自动为真**；反过来则不成立（Q4 就是反例）！

</details>

#### 再改一个条件

若把 $Q(x,y): x \cdot y = 1$ 放在全体实数 $\mathbb{R}$ 上，判断 $\forall y\,\exists x\,(x \cdot y = 1)$ 的真假。

<details>
<summary>对照变式推理</summary>

**False！** 对手只需挑反例 $y = 0 \in \mathbb{R}$：此时对一切实数 $x$ 都有 $x \cdot 0 = 0 \neq 1$，找不到任何实数 $x$。

</details>

</details>

## 04 把英文句子翻成符号时，为什么“每个……的人”绝不能配“且”？

*当场拿下 Test 01 Question 1a（9 分 · 复盘 -3 扣分点）*

现在我们回到整张考卷的第一道大题 **Question 1a（9 分）**。考官预先规定了四个符号：$A(x,y)$ 表示“学生 $x$ 上了讲座 $y$”，$M(x)$ 表示“$x$ 听懂了课程内容”，$P(x)$ 表示“$x$ 通过了这门课”，$R(x)$ 表示“$x$ 受人尊敬”；其中 $x$ 的范围是班上的全体学生，$y$ 的范围是这门课的全部讲座。

请你把下面这三句英文翻成纯粹的逻辑符号：

1. *Every student who attends all lectures is respected.*
2. *A student attends some lectures if and only if the student understands the material.*
3. *If a student understands the material, then the student passes the course.*

先拿一个更短的句子热个身：假设 $x$ 的范围是全校所有人，怎么把“每个本班学生都过了考试”（记本班学生为 $S(x)$，过考试为 $P(x)$）翻成符号？很多人第一反应会顺手写成 $\forall x\,(S(x) \land P(x))$。

停下来读一读你刚写的这行字：$\forall x$ 管的是全校每一个人，中间用 $\land$ 连起来，意思就变成了“全校每一个人**既是**本班学生，**又**过了考试”——连隔壁学院的保安大叔都被你强行编进本班了！

我们真正想说的是：把全校的人挨个请过来，**如果**他是本班学生，他必须过考试；要是他本来就不是本班学生呢？直接放行，别让他破坏整句话的真假！还记得第 01 节里什么符号在“前件为假时自动放行判真”吗？正是箭头 $\to$！所以在翻译自然语言时，有一条雷打不动的黄金搭档：

- **“每一个满足……的对象都……”（$\forall$）必须配箭头 $\to$**：$\forall x\,(\text{身份条件} \to \text{结果})$；
- **“存在一个满足……的对象且……”（$\exists$）必须配且 $\land$**：$\exists x\,(\text{身份条件} \land \text{结果})$（如果这里错配成 $\to$，随便拉来一个不是本班的人就能让前件变假、整句混蒙过关！）。

回到考卷第 1 句：*Every student who attends all lectures is respected.* 最外层是“每一个学生”，写下 $\forall x\,(\dots \to R(x))$。箭头左边的条件是什么？是“这个 $x$ 上了**所有**讲座”，也就是 $\forall y\,A(x,y)$。把它稳稳放进箭头左边，整句就是：

$$
\forall x\,\big((\forall y\,A(x,y)) \to R(x)\big)
$$

千万留意包裹 $\forall y\,A(x,y)$ 的位置，也就是量词的 **作用域（scope）**：如果贪图省事把 $\forall y$ 拎到最外层写成 $\forall x\,\forall y\,(A(x,y) \to R(x))$，意思就全变味了——那变成了“对任意学生 $x$ 和任意一节课 $y$，只要 $x$ 上了这一节课 $y$，他就受尊敬”，上满全勤奖瞬间缩水成了上一节就拿奖！

再看第 2 句和第 3 句，这里藏着当年真实考卷上被扣掉 `-3` 分的现场：英文里说 *"A student attends some lectures if and only if…"* 和 *"If a student understands…"*，表面上写的是冠词 **A student**，但在规则陈述里，“一个学生如何如何”泛指的是**班上的任意一个学生**！

如果在第 3 句只孤零零写下 $M(x) \to P(x)$，漏掉了最外层的 $\forall x$，这里的 $x$ 就成了一个没人看管的 **自由变量（free variable）**——就像写下 $x > 3$ 一样，它连个真假确定的命题都不是，后面的推理一步都没法拿它当前提用。把每个变量都用对应的量词稳稳锁住（变成 **约束变量 bound variable**），这 9 分就一分不会丢了。

### 【考场真题落笔】Test 01 · Question 1a（9 marks）满分英文符号翻译

- **Hypothesis 1** (*Every student who attends all lectures is respected*):

$$
\forall x\,\big((\forall y\,A(x,y)) \to R(x)\big)
$$

- **Hypothesis 2** (*A student attends some lectures if and only if the student understands the material*):

$$
\forall x\,\big((\exists y\,A(x,y)) \leftrightarrow M(x)\big)
$$

- **Hypothesis 3** (*If a student understands the material, then the student passes the course*):

$$
\forall x\,\big(M(x) \to P(x)\big)
$$

> **防丢分自检清单**：① 每个变量 $x, y$ 头顶都有量词管住（绝不漏写 H3 的 $\forall x$！）；② H1 的 $\forall y\,A(x,y)$ 用括号包在箭头**左边内部**。

<details>
<summary><strong>选读 · 量词句怎么取反？“恰好有一个（∃!）”怎么不用新符号写出来？</strong></summary>

期末常考另外两招翻译基本功（Tutorial 02 Q6–Q8）：
1. **量词德摩根律（把否定号 $\neg$ 一层层往里推）**：“不是所有人都及格”等于“至少有个人没及格”；“不存在人及格”等于“所有人都没及格”：

$$
\neg\forall x\,P(x) \equiv \exists x\,\neg P(x), \qquad \neg\exists x\,P(x) \equiv \forall x\,\neg P(x)
$$

遇到多层嵌套如 $\neg\forall x\,\exists y\,(P(x,y) \to Q(x))$：每穿过一个量词就把它翻个面（$\forall \leftrightarrow \exists$），最后用 $\neg(A\to B) \equiv A \land \neg B$ 收尾，直接写出 $\exists x\,\forall y\,(P(x,y) \land \neg Q(x))$！
2. **唯一量词 $\exists! x\,P(x)$（Exactly one，“恰好有一个人满足 $P$”）**：只准用普通 $\forall, \exists$ 时，把它拆成“有一个 $x$ 满足 $P(x)$，并且任何满足 $P(y)$ 的人 $y$ 都只能是 $x$ 本人”：

$$
\exists x\,\big(P(x) \land \forall y\,(P(y) \to y = x)\big)
$$

</details>

<details>
<summary><strong>练习 · 翻译“没有一个学生每节课都缺席”并把否定推到底</strong></summary>

沿用本节的 $A(x,y)$（学生 $x$ 上了讲座 $y$）。请把英文 *"No student misses all lectures"* 写成逻辑式，并验证将 $\neg$ 推到最里面后与第二种自然读法完全一致。

<details>
<summary>给我一点提示</summary>

“没有一个学生满足 [条件]”就是 $\neg\exists x\,(\text{条件})$；“缺席所有课”就是 $\forall y\,\neg A(x,y)$。

</details>

<details>
<summary>对照考场满分写法</summary>

先直译：$\neg\exists x\,\forall y\,\neg A(x,y)$。

把 $\neg$ 穿过两个量词往里推：$\forall x\,\exists y\,\neg(\neg A(x,y)) \equiv \forall x\,\exists y\,A(x,y)$ —— 读出来正是“班上每一个学生都至少上过某一节讲座”！

</details>

</details>

---

# 第 3 幕：线索摆在桌上，哪些结论真能推出来？（直指第 1b 题（15 分））

> 六条校园线索放在一起，为什么 Bob 的结局铁板钉钉，而 Noah 和 Jessica 的猜测却只是听起来顺耳的错觉？

## 05 顺着线索往下推，哪一步铁证如山，哪一步只是错觉？

*当场拿下 Test 01 Question 1b（15 分 · 复盘 -5 扣分点）*

翻译完了那三条校规，紧接着就是整张卷子分值最重、也是当年失分最惨烈（`-5` 分）的 **Question 1b（15 分）**。除了刚才那三条全班通用的规则，考官又补了三条个人档案：

- **4.** Bob 上了全部讲座：$\forall y\,A(\text{Bob}, y)$
- **5.** Noah 没有通过这门课：$\neg P(\text{Noah})$
- **6.** Jessica 没有理解课程内容：$\neg M(\text{Jessica})$

现在考官问你下面三个结论能不能推出来——如果能，不准用真值表，一步步写出详细证明；如果不能，解释为什么：

- **i)** Bob 通过了这门课（$P(\text{Bob})$）
- **ii)** Noah 不受人尊敬（$\neg R(\text{Noah})$）
- **iii)** Jessica 没有通过这门课（$\neg P(\text{Jessica})$）

先别翻讲义找规则名，凭常识顺着线索追一追。

先追 **Bob**：Bob 上了全部讲座，既然课程总得有课可上，他当然“至少上过某些讲座”；按规则 2（上过某些课 $\leftrightarrow$ 听懂内容），Bob 一定听懂了内容；再按规则 3（听懂内容 $\to$ 通过课程），Bob 稳稳通过了这门课！你看，前提全真的时候，Bob 根本没有挂科的可能。像这样“前提全真就逼得结论必定为真”的推理，叫作 **有效论证（valid argument）**。

为了让阅卷老师挑不出毛病，把刚才每走一步用到的动作贴上标准英文标签：把全班通用的 $\forall x$ 套到具体人 Bob 头上，叫 **全称实例化（universal instantiation，简称 UI）**；从具体某一节课 $A(\text{Bob}, c)$ 退一步说“至少存在一节课” $\exists y\,A(\text{Bob}, y)$，叫 **存在推广（existential generalization，简称 EG）**；手握 $p \to q$ 又手握肯定的前件 $p$，顺着箭头推出 $q$，叫 **肯定前件式（Modus Ponens）**。

那 **Noah** 和 **Jessica** 呢？为什么考场上那么多人把 ii) 或 iii) 也判成了“能推出”？

我们来追一下 **Jessica**：档案说她“没理解课程内容”（$\neg M(\text{Jessica})$）。手里有规则 3：“如果理解内容，那么通过课程”（$M \to P$）。很多人顺嘴一溜：既然没理解内容，那肯定没通过课程呗！

慢着！翻回第 01 节的火锅承诺：“如果考满 90 分，就请吃火锅。”没考满 90 分的人，难道法律规定他周末不准请客吗？规则 3 只承诺了“听懂的人一定能过”，**从来没有禁止“没听懂的人靠蒙对选择题或者平时分蹭过及格线”**！拿着 $p \to q$ 和否定的前件 $\neg p$，硬要推出 $\neg q$，这是逻辑里最著名的冒牌货，叫 **否定前件谬误（denying the hypothesis）**。（同理，若拿着 $p \to q$ 和肯定的结果 $q$ 倒推 $p$，则叫 **肯定后件谬误 affirming the conclusion**。）

再追 **Noah**：Noah 没通过课程（$\neg P(\text{Noah})$）。这回我们手里拿的是**否定的后件**！顺着规则 3 $M \to P$ 倒着想：如果他听懂了就一定能过，现在他没过，说明他**绝对没听懂**（$\neg M(\text{Noah})$）——这一步千真万确，叫 **否定后件式（Modus Tollens）**！再顺着规则 2 倒推一步，没听懂说明他一节课都没去上（$\neg\exists y\,A(\text{Noah}, y)$），所以他肯定没有上满全部课（$\neg\forall y\,A(\text{Noah}, y)$）。

追到这里，停住！看清规则 1 是怎么写的：$(\forall y\,A(x,y)) \to R(x)$（如果上满全部课，就受尊敬）。现在我们手头只有“Noah **没**上满全部课”——这又变成了**否定的前件**！Noah 虽然翘光了课还挂了科，可万一他救过落水儿童、全班同学依然很尊敬他呢？

打开下面的侦探面板，切换查看 Noah 和 Jessica：面板已经替你摆好了一个 **所有 6 条前提全都为真、偏偏待查结论为假** 的活生生反例。试着在 Bob 身上也找找这种漏洞，看看找不找得到？

这就是考场上答 `If not, explain why` 的满分秘诀：**光写一句“推不出来”只能拿一半分；点明犯了“否定前件谬误（denying the hypothesis）”，再把面板上那组“前提全真、结论为假”的具体人物情况写出来，15 分一分不扣！**

### 【考场真题落笔】Test 01 · Question 1b（15 marks）满分 Step/Reason 表与反例解释

**i) Bob passes the course — YES, can be drawn.** *(Assume the course has at least one lecture $c$.)*

| Step | Proposition | Reason |
|---|---|---|
| 1 | $\forall y\,A(\text{Bob}, y)$ | Hypothesis 4 |
| 2 | $A(\text{Bob}, c)$ | Universal Instantiation from (1) |
| 3 | $\exists y\,A(\text{Bob}, y)$ | Existential Generalization from (2) |
| 4 | $\forall x\,((\exists y\,A(x,y)) \leftrightarrow M(x))$ | Hypothesis 2 |
| 5 | $(\exists y\,A(\text{Bob}, y)) \leftrightarrow M(\text{Bob})$ | Universal Instantiation from (4) |
| 6 | $(\exists y\,A(\text{Bob}, y)) \to M(\text{Bob})$ | Biconditional equivalence & Simplification from (5) |
| 7 | $M(\text{Bob})$ | Modus Ponens from (3) and (6) |
| 8 | $\forall x\,(M(x) \to P(x))$ | Hypothesis 3 |
| 9 | $M(\text{Bob}) \to P(\text{Bob})$ | Universal Instantiation from (8) |
| 10 | $P(\text{Bob})$ | Modus Ponens from (7) and (9) |

---

**ii) Noah is not respected — NO, cannot be drawn.**
- From $\neg P(\text{Noah})$ and H3 (UI + Modus Tollens), we get $\neg M(\text{Noah})$. Together with H2, this yields $\neg\exists y\,A(\text{Noah}, y)$, hence $\neg\forall y\,A(\text{Noah}, y)$.
- However, H1 only gives $(\forall y\,A(\text{Noah}, y)) \to R(\text{Noah})$. Concluding $\neg R(\text{Noah})$ from $\neg\forall y\,A(\text{Noah}, y)$ commits the fallacy of **denying the hypothesis**.
- **Counterexample:** Suppose Noah attends no lectures ($A(\text{Noah},y)=\mathbf{F}$), does not understand the material ($M(\text{Noah})=\mathbf{F}$), and fails the course ($P(\text{Noah})=\mathbf{F}$), yet is still respected ($R(\text{Noah})=\mathbf{T}$). All hypotheses H1–H5 hold, while $\neg R(\text{Noah})$ is false.

---

**iii) Jessica does not pass the course — NO, cannot be drawn.**
- We have $\neg M(\text{Jessica})$ (H6) and $M(\text{Jessica}) \to P(\text{Jessica})$ (UI from H3). Inferring $\neg P(\text{Jessica})$ commits the fallacy of **denying the hypothesis**.
- **Counterexample:** Suppose Jessica attends no lectures ($\exists y\,A(\text{Jessica},y)=\mathbf{F}$), does not understand the material ($M(\text{Jessica})=\mathbf{F}$), is not respected ($R(\text{Jessica})=\mathbf{F}$), **but passes the course** ($P(\text{Jessica})=\mathbf{T}$, e.g., by luck). All hypotheses hold, while $\neg P(\text{Jessica})$ is false.

<details>
<summary><strong>选读 · 还有哪几条常用的推理积木？（三段论 / 存在实例化 EI 的取名规矩 / 消解律）</strong></summary>

除了刚才用上的 UI、EG、Modus Ponens、Modus Tollens 和化简律（Simplification：$p\land q \therefore p$），Tutorial 03 里还会见到四块积木（课件 Ch1.5）：
- **假言三段论（Hypothetical Syllogism）**：$p \to q,\ q \to r \therefore p \to r$（箭头首尾接龙）。
- **析取三段论（Disjunctive Syllogism）**：$p \lor q,\ \neg p \therefore q$（二选一排除了左边，就只剩右边）。
- **消解律（Resolution）**：$p \lor q,\ \neg p \lor r \therefore q \lor r$。
- **存在实例化（Existential Instantiation，EI）**：由 $\exists x\,P(x)$ 设出 $P(c)$ —— **铁律：$c$ 必须是一个前文从未用过的全新名字**！如果题目里先后有两个 $\exists x\,P(x)$ 和 $\exists x\,Q(x)$，必须分别设成 $P(c_1)$ 和 $Q(c_2)$，绝不能偷懒都叫 $c$（认识一个会弹琴的人，又认识一个会游泳的人，未必是同一个人！）。

</details>

<details>
<summary><strong>练习 · 亲手写一张四步形式证明表（Slides 1.5 经典题）</strong></summary>

已知前提：① 班上某个学生没读课本 $\exists x\,(C(x) \land \neg B(x))$；② 班上所有人都通过了第一次考试 $\forall x\,(C(x) \to P(x))$。请用 `Step | Reason` 表推出结论：**“有人通过了第一次考试但没读课本”** $\exists x\,(P(x) \land \neg B(x))$。

<details>
<summary>给我一点提示</summary>

先对带 $\exists$ 的第①条做 EI（起个新名字 $a$），拆出 $C(a)$ 和 $\neg B(a)$，再把第②条 UI 到同一个 $a$ 身上！

</details>

<details>
<summary>对照考场满分写法</summary>

| Step | Proposition | Reason |
|---|---|---|
| 1 | $\exists x\,(C(x)\land\neg B(x))$ | Premise |
| 2 | $C(a)\land\neg B(a)$ | Existential Instantiation from (1) |
| 3 | $C(a)$ | Simplification from (2) |
| 4 | $\forall x\,(C(x)\to P(x))$ | Premise |
| 5 | $C(a)\to P(a)$ | Universal Instantiation from (4) |
| 6 | $P(a)$ | Modus Ponens from (3),(5) |
| 7 | $\neg B(a)$ | Simplification from (2) |
| 8 | $P(a)\land\neg B(a)$ | Conjunction from (6),(7) |
| 9 | $\exists x\,(P(x)\land\neg B(x))$ | Existential Generalization from (8) |

</details>

</details>

---

# 第 4 幕：轮到自己动笔写英文证明，从哪一头下笔？（直指第 5、6 题（13 分））

> 面对一行空白答卷，正着算卡壳了怎么掉头？题目多写了一个 unique（唯一），证明为什么必须劈成上下两半？

## 06 正着算要开根号卡住了，为什么掉个头立刻畅通无阻？

*当场拿下 Test 01 Question 5（5 分）*

前面三幕都是考官给你式子让你判断。到了第 4 幕（Test 01 第 5、6 题，共 13 分），考卷上只剩下一行白纸黑字的英文句子，轮到你自己从头到尾写一段数学证明了。

先看 **Question 5（5 分）**：

> *Prove or disprove that for all integers $n$, if $n^2$ is even, then $n$ must also be even.*  
> （证明或否证：对所有整数 $n$，若 $n^2$ 是偶数，则 $n$ 必定也是偶数。）

随便试几个数：$n=1,2,3,4$，平方分别是 $1,4,9,16$，平方是偶数的确实本身都是偶数，所以这句话肯定是真的（需要 Prove）。

问题是：**第一笔该从哪里下？**

最朴素的办法叫 **直接证明（direct proof）**：老老实实假设箭头左边成立，也就是设“$n^2$ 是偶数”。按定义，偶数就是能写成 $2$ 乘某个整数，于是你写下 $n^2 = 2k$（$k$ 是整数）。接下来你想求 $n$，两边一开根号：

$$
n = \pm\sqrt{2k}
$$

写到这里，笔就彻底卡住了——根号底下一团 $2k$，你怎么向阅卷人说明开出来的数一定是 $2$ 乘某个整数？算不动了！

卡住的时候，千万别硬顶。回想我们在第 01 节拨开关时发现的那条救命铁律：**原命题 $p \to q$，和它的逆否命题 $\neg q \to \neg p$，在任何情况下真假都百分之百相同！**

把“如果 $n^2$ 是偶数，那么 $n$ 是偶数”两头对调并同时取反，就变成了：

> **“如果 $n$ 不是偶数（即 $n$ 是奇数），那么 $n^2$ 也不是偶数（即 $n^2$ 是奇数）。”**

现在再试着下笔！假设 $n$ 是奇数，按定义写下 $n = 2k + 1$（$k$ 是某个整数）。这回不用开根号了，而是顺着往平方算——小学生都会展开完全平方：

$$
n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1
$$

看最右边那个式子：因为 $k$ 是整数，$2k^2 + 2k$ 当然也是个整数（不妨叫它 $m$），于是 $n^2 = 2m + 1$，原原本本长成了一个奇数的模样！这种“正面算不动时，掉头证逆否命题 $\neg q \to \neg p$”的招数，就叫 **逆否证明（proof by contraposition）**。

你也可以换一种很相近的口吻，叫 **反证法（proof by contradiction）**：先故意假设“万一世界上有个反例呢？”——也就是假设 $n^2$ 是偶数，**同时** $n$ 偏偏是个奇数（$n = 2k+1$）。顺手一平方算出 $n^2 = 2(2k^2+2k)+1$ 是奇数，和刚才假设的“$n^2$ 是偶数”当场撞车矛盾！既然反例活不下去，原话就一定成立。

不管是直接证、逆否证还是反证，改卷老师在 5 分证明题里永远按四个采分点找词：**① 点明你用的方法名；② 写出 `Assume ...`；③ 用定义翻译成代数式（如 $n=2k+1$ for some integer $k$）；④ 算完后指明括号里仍是整数，扣回奇偶定义收尾。**

### 【考场真题落笔】Test 01 · Question 5（5 marks）满分英文证明示范

**原题**：*Prove or disprove that for all integers $n$, if $n^2$ is even, then $n$ must also be even.*

**Claim:** The statement is **true**.

**Proof (by contraposition):** We prove the contrapositive statement: for any integer $n$, if $n$ is not even (i.e., $n$ is odd), then $n^2$ is not even (i.e., $n^2$ is odd).

Assume $n$ is odd. By definition of an odd integer, there exists an integer $k$ such that $n = 2k + 1$. Then

$$
n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.
$$

Since $k$ is an integer, $m = 2k^2 + 2k$ is also an integer, and $n^2 = 2m + 1$. By definition, $n^2$ is odd (hence not even).

Since the contrapositive is true, the original statement holds for all integers $n$. $\square$

<details>
<summary><strong>选读 · 遇到“无理数”或“绝对值”时怎么证？（反证法证 √2 无理数 & 分情况证明）</strong></summary>

期末证明题常在这三种招式里挑一个（Tutorial 03 Q4–Q9）：
1. **什么时候必须用反证法（Proof by contradiction）？** 当结论里写着“是无理数（irrational）”“不存在整数解”时——因为“不是分数”没法正着写成等式，一旦反过来假设“**它是分数**”，立刻就能写出最简分数 $a/b$！
   - **经典必背：证明 $\sqrt{2}$ 是无理数**。Assume for contradiction $\sqrt{2}$ is rational. Then $\sqrt{2} = a/b$ where $a, b \in \mathbb{Z}, b \neq 0$, and $\gcd(a,b)=1$ (lowest terms，互质无公因子 $2$！). 平方得 $2 = a^2 / b^2 \implies a^2 = 2b^2$，故 $a^2$ 是偶数；直接套用本节刚证完的结论得 **$a$ 是偶数**，设 $a = 2k$。代回得 $(2k)^2 = 2b^2 \implies 4k^2 = 2b^2 \implies b^2 = 2k^2$，故 $b^2$ 也是偶数，$b$ 也是偶数！于是 $2$ 同时整除 $a$ 和 $b$，与 $\gcd(a,b)=1$ 最简分数假设矛盾！$\square$
2. **分情况证明（Proof by cases）**：看到绝对值 $|x|$、$\max/\min$ 或“对任意整数 $n$，$n^2+n$ 是偶数”时，把全集切成不漏的几块（如 Case 1: $n=2k$ 偶；Case 2: $n=2k+1$ 奇），每一块单独算通即证毕。

</details>

<details>
<summary><strong>练习 · 练一题逆否证明：3n + 2 是奇数 ⇒ n 是奇数</strong></summary>

（Tutorial 03 经典同型题）用英文写出完整证明：*Prove that if $3n + 2$ is odd, then $n$ is odd, where $n$ is an integer.*

<details>
<summary>给我一点提示</summary>

直接从 $3n+2 = 2k+1$ 解 $n = (2k-1)/3$ 又要卡在分数上！掉头证逆否：Assume $n$ is even（$n = 2k$）……

</details>

<details>
<summary>对照考场满分写法</summary>

**Proof (by contraposition):** We prove the contrapositive: if $n$ is even, then $3n + 2$ is even.

Assume $n$ is even. Then $n = 2k$ for some integer $k$. Substituting gives:

$$
3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1).
$$

Since $3k + 1$ is an integer, $3n + 2$ is even by definition. Therefore, if $3n + 2$ is odd, $n$ must be odd. $\square$

</details>

</details>

## 07 不仅要说明“找得到”，还要证明“绝没有第二个”，该怎么下笔？

*当场拿下 Test 01 Question 6（8 分 · 复盘手写“唯一的?”）*

整张 Test 01 的收官压轴题是 **Question 6（8 分）**：

> *Let $2 \le n$ be a fixed integer. Prove that for every integer $a$ there exist unique integers $q$ and $r$ with $0 \le r < n$ such that $a = nq + r$.*

在当年的真实考卷旁，有同学用铅笔圈出了 `unique`，打了一个问号：“唯一的？”——这也是考场上最痛的丢分点：很多人吭哧吭哧说明了商 $q$ 和余数 $r$ 怎么找，以为大功告成，结果只拿到一半分。

为什么只有一半分？因为 **存在且唯一（there exist unique，记作 $\exists!$）** 本身包含了两句完全不同的承诺：第一句叫 **存在性（existence）**——“我真能给你造出一套合格的 $(q, r)$”；第二句叫 **唯一性（uniqueness）**——“谁也别想找出跟我不一模一样的第二套”！

先做第一件事：**把那套合格的 $(q, r)$ 亲手造出来**。

拿一把每隔 $n$ 个单位画一道刻度的长尺铺在数轴上：$\dots, -2n, -n, 0, n, 2n, 3n, \dots$。随便扔下来一个整数 $a$（比如 $n=5$ 时扔下 $a=17$，或者负数 $a=-13$），它一定落在某两道相邻刻度 $nq$ 和 $n(q+1)$ 之间（可能刚好踩在左刻度 $nq$ 上）：

$$
nq \;\le\; a \;<\; n(q + 1)
$$

这个左刻度对应的倍数 $q$ 是谁？把不等式除以正整数 $n$，就是 $q \le a/n < q+1$——也就是说，$q$ 就是“不超过 $a/n$ 的最大整数”，数学上写成向下取整符号 $q = \lfloor a/n \rfloor$。定下了 $q$，把剩下的零头记作 $r = a - nq$。把上面那串不等式同减 $nq$，当场得到：

$$
0 \;\le\; a - nq \;<\; n \quad\Longrightarrow\quad 0 \le r < n
$$

$q$ 和 $r$ 都是整数，$a = nq + r$，而且零头 $r$ 稳稳落在 $[0, n)$ 之间。第一半“存在性”已经交卷了！

接下来是更精彩的下半场：**怎么证明绝不可能有第二套？**

全世界的“唯一性证明”都用同一个起手式：**假装有人又交上来另一套合格的答案 $(q_2, r_2)$，然后把两套答案摆在一起硬碰硬，逼出 $q_1 = q_2$ 且 $r_1 = r_2$！**

设 $a = nq_1 + r_1 = nq_2 + r_2$，并且两个余数都守规矩：$0 \le r_1 < n$，$0 \le r_2 < n$。把两个等式相减消掉 $a$，把带 $n$ 的挪到左边、余数挪到右边：

$$
n(q_1 - q_2) = r_2 - r_1
$$

先停下来盯住这个等式的左右两边，冲突马上就要浮出水面了：

1. 看**左边** $n(q_1 - q_2)$：因为 $q_1 - q_2$ 是整数，左边明摆着是 **$n$ 的整数倍**（比如当 $n=5$ 时，它只可能是 $\dots, -10, -5, 0, 5, 10, \dots$）。
2. 看**右边** $r_2 - r_1$：两个余数都被关在 $[0, n)$ 这个宽度不到 $n$ 的小笼子里——最大的减最小的也超不过 $n$，最小的减最大的也低不过 $-n$！写成不等式就是：

$$
-n \;<\; r_2 - r_1 \;<\; n
$$

试问：在严格大于 $-n$、又严格小于 $n$ 的开区间 $(-n, n)$ 里，**唯一能被 $n$ 整除的整数是谁？**

只剩正中间的 **$0$** 一个独苗！

于是 $r_2 - r_1 = 0$，当场锁死 **$r_1 = r_2$**。代回 $n(q_1 - q_2) = 0$，因为题目一开头就给了 $n \ge 2$（所以 $n \neq 0$，放心大胆约掉 $n$！），立刻锁死 **$q_1 = q_2$**。你看，题目里给的每一个条件（$n \ge 2$、$0 \le r < n$）都在最后这一撞里严丝合缝地派上了用场——整张 60 分的逻辑与证明考卷，到这里已经被你从头到尾打穿了。

### 【考场真题落笔】Test 01 · Question 6（8 marks）满分英文两段式证明

**原题**：*Let $2 \le n$ be a fixed integer. Prove that for every integer $a$ there exist unique integers $q$ and $r$ with $0 \le r < n$ such that $a = nq + r$.*

**Proof:** We prove existence and uniqueness separately.

**(1) Existence:** Let $q = \lfloor a / n \rfloor$ and $r = a - nq$. Since $a, n, q \in \mathbb{Z}$, $r$ is also an integer and $a = nq + r$. By definition of the floor function, $q \le a / n < q + 1$. Multiplying by $n > 0$ (since $n \ge 2$) gives $nq \le a < nq + n$. Subtracting $nq$ yields $0 \le a - nq < n$, i.e., $0 \le r < n$. Thus such integers $q$ and $r$ exist.

**(2) Uniqueness:** Suppose there are two pairs of integers $(q_1, r_1)$ and $(q_2, r_2)$ satisfying $a = nq_1 + r_1 = nq_2 + r_2$ with $0 \le r_1 < n$ and $0 \le r_2 < n$.

Subtracting the two equations gives:

$$
n(q_1 - q_2) = r_2 - r_1,
$$

so $r_2 - r_1$ is an integer multiple of $n$. Meanwhile, from $0 \le r_1 < n$ and $0 \le r_2 < n$, we have $-n < r_2 - r_1 < n$. The only multiple of $n$ strictly between $-n$ and $n$ is $0$. Hence $r_2 - r_1 = 0$, so $r_1 = r_2$.

Substituting $r_1 = r_2$ back gives $n(q_1 - q_2) = 0$. Since $n \ge 2 > 0$, dividing by $n$ yields $q_1 - q_2 = 0$, so $q_1 = q_2$. Therefore, $q$ and $r$ are unique. $\square$

<details>
<summary><strong>练习 · 用同一套“存在 + 唯一”双段模板秒杀实数一次方程</strong></summary>

（Tutorial 03 Q10 / Slides 1.6 p81）证明：给定实数 $a, b$ 且 $a \neq 0$，存在**唯一**的实数 $r$ 使得 $ar + b = 0$。

<details>
<summary>给我一点提示</summary>

严格分成 **(1) Existence**（直接写出 $r$ 等于多少并代回验算）和 **(2) Uniqueness**（设 $ar_1+b=0$ 且 $ar_2+b=0$，相减并利用 $a\neq 0$）。

</details>

<details>
<summary>对照考场满分写法</summary>

**Proof:**
- **(Existence)** Let $r = -b / a$. Since $a \neq 0$, $r$ is a well-defined real number, and $ar + b = a(-b/a) + b = -b + b = 0$.
- **(Uniqueness)** Suppose $r_1, r_2 \in \mathbb{R}$ both satisfy $ar_1 + b = 0$ and $ar_2 + b = 0$. Subtracting gives $a(r_1 - r_2) = 0$. Since $a \neq 0$, dividing both sides by $a$ yields $r_1 - r_2 = 0$, hence $r_1 = r_2$. $\square$

</details>

#### 再改一个条件

如果回到整数的带余除法 $a = nq + r$，把余数条件从 $0 \le r < n$ 放宽成 $0 \le r \le n$（多了一个等号！），存在性和唯一性哪一半会当场失效？举一个具体数字例子说明。

<details>
<summary>对照变式推理</summary>

**存在性依然成立，但唯一性当场破裂！** 例如取 $n = 5, a = 10$：既可以写 $10 = 5 \times 2 + 0$（$q_1=2, r_1=0$），也可以写 $10 = 5 \times 1 + 5$（$q_2=1, r_2=5$），两套都满足 $0 \le r \le 5$！在证明中，放宽成 $\le n$ 后差值变成 $-n \le r_2 - r_1 \le n$，两端混进了 $-n$ 和 $n$ 这两个非零倍数，再也夹不住唯一的 $0$ 了。

</details>

</details>
