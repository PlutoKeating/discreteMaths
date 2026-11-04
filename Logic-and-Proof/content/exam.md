## 怎么用这一页

- 左边是==试卷英文原文==（一字不改），右边是逐句中文翻译。英文里带虚线下划线的词都可以==点击==查看术语解释。
- 每题下面的"读题要点"把英文指令词翻译成"阅卷人要你做什么"。
- 最下面附有原始 Markdown 全文，方便对照卷面手写附注。

> 考试范围：Logic and Proof — Ch1.1, 1.2: Propositional Logic and Equivalences；Ch1.3, 1.4: Predicates and Quantifiers；Ch1.5, 1.6: Rules of Inference and Proofs。Total Marks: 60。

## Question 1 (24 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Given the following variable definition:

- $A(x,y)$: $x$ attends lecture $y$
- $M(x)$: $x$ understands the material
- $P(x)$: $x$ passes the course
- $R(x)$: $x$ is respected

The domain of $x$ is students in the class, and the domain of $y$ is lectures of the course.

**Hypotheses:**

1. Every student who attends all lectures is respected.
2. A student attends some lectures if and only if the student understands the material.
3. If a student understands the material, then the student passes the course.
4. Bob attends all lectures.
5. Noah does not pass the course.
6. Jessica does not understand the material.

**Conclusions:**

i) Bob passes the course
ii) Noah is not respected
iii) Jessica does not pass the course

**a) (9 marks)** Translate Hypotheses 1–3 into formal logical expressions using the predicates defined above.

**b) (15 marks)** Based on the hypothesis above, determine if each conclusion can be drawn. If yes, write down the proof in detail. If not, explain why. No truth table should be used.

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

给定下列变量（谓词）定义：

- $A(x,y)$：$x$ 上了第 $y$ 节课
- $M(x)$：$x$ 理解了课程内容
- $P(x)$：$x$ 通过了这门课
- $R(x)$：$x$ 受人尊敬

$x$ 的论域是班上的学生，$y$ 的论域是这门课的所有讲座。

**前提：**

1. 每一个上了全部讲座的学生都受人尊敬。
2. 一个学生上了某些讲座，当且仅当这个学生理解了课程内容。
3. 如果一个学生理解了课程内容，那么这个学生通过了这门课。
4. Bob 上了全部讲座。
5. Noah 没有通过这门课。
6. Jessica 没有理解课程内容。

**结论：**

i) Bob 通过了这门课
ii) Noah 不受人尊敬
iii) Jessica 没有通过这门课

**a)（9 分）** 用上面定义的谓词，把前提 1–3 翻译成形式逻辑表达式。

**b)（15 分）** 基于上述前提，判断每个结论是否能被推出。如果能，详细写出证明；如果不能，解释原因。不得使用真值表。

</div></div>

<div class="callout"><div class="ttl">读题要点</div>

- ==Given the following variable definition== → 题目先给谓词，之后所有答案只能用这些谓词符号写。
- ==Every … who …== → $\forall x(\text{条件}\to\text{结果})$；==some== → $\exists$；==if and only if== → $\leftrightarrow$；==If …, then …== → $\to$。
- ==determine if each conclusion can be drawn== → 三个结论逐个判断"能 / 不能"，每个都要给出结论。
- ==write down the proof in detail== → Step / Reason 表，每步写规则名（UI、MP、MT…）。
- ==explain why== → 说出谬误名（denying the hypothesis）并给前提全真、结论假的反例场景。
- ==No truth table should be used== → 用了真值表 = 0 分。

答案见"逐题精讲"第 1 题。

</div>

## Question 2 (15 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Show whether the following pairs of propositions are equivalent. If not, propose a counterexample. Do not use truth tables.

a) $((p\land\neg q)\lor(p\land r))$ and $(p\land(q\rightarrow r))$

b) $(p\rightarrow(q\rightarrow r))$ and $((p\land q)\rightarrow r)$

c) $p$ and $\forall x\,(\neg p\rightarrow(p\land r(x)))$, assume $p$ is independent to $x$, and the domain of $x$ is nonempty

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

判断下列每一对命题是否等价（并证明）。如果不等价，给出一个反例。不得使用真值表。

a) $((p\land\neg q)\lor(p\land r))$ 与 $(p\land(q\rightarrow r))$

b) $(p\rightarrow(q\rightarrow r))$ 与 $((p\land q)\rightarrow r)$

c) $p$ 与 $\forall x\,(\neg p\rightarrow(p\land r(x)))$，假设 $p$ 与 $x$ 无关，且 $x$ 的论域非空

</div></div>

<div class="callout"><div class="ttl">读题要点</div>

- ==Show whether … are equivalent== → 每一小问先写结论 "Equivalent" 或 "Not equivalent"，再用等价律逐步变形（每步写规则名）。
- ==propose a counterexample== → 不等价时写 "When $p=T, q=F, \dots$, LHS is T but RHS is F"。
- ==independent to $x$== → $p$ 里没有 $x$，所以可以用 $\forall x\,p\equiv p$。
- ==nonempty== → 这是让 $\forall x\,p\equiv p$ 成立的条件，答题时要引用它。

答案见"逐题精讲"第 2 题（三问全部等价）。

</div>

## Question 4 (8 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Given $P(x,y): x+y=10$, and the domain of $x$ and $y$ is integers. Decide which of the following formulas are true, giving justification.

a) $\forall y\,\forall x\,P(x,y)$

b) $\exists y\,\forall x\,P(x,y)$

c) $\forall y\,\exists x\,P(x,y)$

d) $\exists y\,\exists x\,P(x,y)$

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

给定 $P(x,y): x+y=10$，$x$ 和 $y$ 的论域是整数。判断下列哪些公式为真，并给出理由。

a) 对所有 $y$、对所有 $x$，$P(x,y)$

b) 存在 $y$，使得对所有 $x$，$P(x,y)$

c) 对所有 $y$，存在 $x$，使得 $P(x,y)$

d) 存在 $y$、存在 $x$，使得 $P(x,y)$

</div></div>

<div class="callout"><div class="ttl">读题要点</div>

- ==integers== → 论域是整数（卷面手写"整"）。$x=10-y$ 仍是整数，所以 c) 成立；若论域是正整数，c) 就不成立了。
- ==Decide which … are true== → 四个都要判断，不是只挑真的写。
- ==giving justification== → 只写 True / False 不得分：真要给构造（$x=10-y$）或例子，假要给反例或反证。卷面 −2 大概率扣在这里。

答案见"逐题精讲"第 4 题。

</div>

## Question 5 (5 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Prove or disprove that for all integers $n$, if $n^2$ is even, then $n$ must also be even.

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

证明或否证：对所有整数 $n$，如果 $n^2$ 是偶数，那么 $n$ 也一定是偶数。

</div></div>

<div class="callout"><div class="ttl">读题要点</div>

- ==Prove or disprove== → 先判断真假。此命题为真，所以要证明（否证只需反例）。
- ==for all integers $n$== → 证明必须对任意 $n$ 成立，不能举例。
- ==even== / ==odd== → 卷面手写"偶 / 奇"。证明必须用定义：$n=2k$ 或 $n=2k+1$。
- ==if …, then …== → $p\to q$ 形式，可选直接 / 逆否 / 反证。这题从 $n^2=2k$ 开根号算不动，用逆否。

答案见"逐题精讲"第 5 题。

</div>

## Question 6 (8 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Let $2\leq n$ be a fixed integer. Prove that for every integer $a$ there exist unique integers $q$ and $r$ with $0\leq r<n$ such that $a=nq+r$.

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

设 $n\ge 2$ 是一个固定的整数。证明：对每一个整数 $a$，都存在唯一的整数 $q$ 和 $r$，满足 $0\le r<n$，使得 $a=nq+r$。

</div></div>

<div class="callout"><div class="ttl">读题要点</div>

- ==Let … be a fixed integer== → $n$ 是给定常数，全程不变。
- ==for every integer $a$== → 对任意 $a$ 证明，先取定任意一个 $a$。
- ==there exist unique== → 必须写两段：Existence（存在）+ Uniqueness（唯一）。卷面手写"唯一的?"说明漏了第二段。
- ==with $0\le r<n$== / ==such that== → "满足 / 使得"，这是对 $q,r$ 的约束条件，唯一性证明里要用到 $|r_1-r_2|<n$。

答案见"逐题精讲"第 6 题。

</div>

## 卷面手写附注（原卷上的笔迹）

| 位置 | 手写内容 | 含义 |
|---|---|---|
| 第 1 题旁 | $M(x)\rightarrow P(x)$；$\forall x\,(\exists y\,A(x,y)\leftrightarrow M(x))$ | 当时的形式化草稿；第一条漏了 $\forall x$ |
| 第 1 题 | 圈出的 $-3$；b) 右侧 $-5$ | 扣分标记 |
| 第 4 题 | "整"；$-2$ | integers 的注释；扣分标记 |
| 第 5 题 | odd — 奇；even — 偶 | 单词注释 |
| 第 6 题 | "唯一的?"；$2\le n$，圈出 $n\ge 2$ | 对 unique 的疑问；对条件的标记 |
