## 怎么用这一页

- 左栏是 ==Midterm Test 02 英文原卷==（一字不改），右栏是逐句中文翻译；所有带虚线下划线的英文术语均可==点击==查看中英释义。
- 每题下方的“读题与审题要点”把试卷里的英文动作词直接翻译成“阅卷老师按什么给分”。
- 页面底部可一键展开 `Relation/Midterm-Test-02.md` 原件与卷面手写附注对照。

> **考试信息**：Discrete Mathematics – Test 02（Semester 1, 2025–2026 · Date: November-2025 · **Total Marks: 76**）  
> **考试范围**：Ch2.1–2.3 Sets and Functions · Ch9.1–9.3 Relations and Properties · Ch9.5–9.6 Equivalence and Partial Orderings.

---

## Question 1 (12 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Given $f(x)=x^2+5$, $g(x)=3x^2+5$ and $h(x)=|x/2|$, are functions from $\mathbb{R}$ to $\mathbb{R}$.

a) Find $g\circ f$ **(2 marks)**

b) Find $f+g$ **(2 marks)**

c) Range of $h(x)$ **(2 marks)**

d) Discuss the restricted domain and codomain in which $h(x)$ is one-to-one correspondence. Discuss in detail. **(6 marks)**

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

已知 $f(x)=x^2+5$，$g(x)=3x^2+5$ 以及 $h(x)=|x/2|$ 都是从实数集 $\mathbb{R}$ 到 $\mathbb{R}$ 的函数。

a) 求复合函数 $g\circ f$ **（2 分）**

b) 求和函数 $f+g$ **（2 分）**

c) 求 $h(x)$ 的值域（Range） **（2 分）**

d) 讨论在怎样的限制定义域（restricted domain）与限制余域（restricted codomain）下，$h(x)$ 成为一一对应（双射）。请详细讨论并证明。 **（6 分）**

</div></div>

<div class="callout">

<div class="ttl">读题要点（第 1 题）</div>

- ==$g \circ f$== $\to$ 注意顺序是 $g(f(x))$（把 $f(x)$ 整体代进 $g$ 的自变量），不是 $f(g(x))$！
- ==Range of $h(x)$== $\to$ 写成规范集合/区间 $[0, +\infty)$ 或 $\{y\in\mathbb{R}\mid y\ge 0\}$，切忌写成 $\{\mathbb{R}^+, 0\}$。
- ==one-to-one correspondence== = **Bijection（双射 = 单射 + 满射）**；==Discuss in detail（6 分）== $\to$ 只写区间最多拿 2 分！必须：① 指出原函数在 $\mathbb{R}\to\mathbb{R}$ 上为何非单射、非满射；② 写出限制后的 domain 与 codomain；③ 分别证明限制后是 one-to-one 且 onto。

</div>

---

## Question 2 (24 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Let $R_1$ and $R_2$ be relations on a set $A$ represented by the matrices

$$
M_{R_1}=
\begin{bmatrix}
0 & 1 & 1\\
1 & 0 & 0\\
0 & 1 & 1
\end{bmatrix}
\quad\text{and}\quad
M_{R_2}=
\begin{bmatrix}
1 & 0 & 1\\
1 & 0 & 0\\
0 & 1 & 1
\end{bmatrix}
$$

Find the matrices that represent:

a) $R_1^{-1}$

b) $\overline{R_1}$

c) $R_1\oplus R_2$

d) $R_2\circ R_1$

e) transitive closure of $R_1$

f) symmetric closure of $R_2$

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

设 $R_1$ 和 $R_2$ 是集合 $A$ 上的两个二元关系，其表示矩阵分别为：

$$
M_{R_1}=
\begin{bmatrix}
0 & 1 & 1\\
1 & 0 & 0\\
0 & 1 & 1
\end{bmatrix}
\quad\text{与}\quad
M_{R_2}=
\begin{bmatrix}
1 & 0 & 1\\
1 & 0 & 0\\
0 & 1 & 1
\end{bmatrix}
$$

求表示下列关系的矩阵（共 6 小问，平均每问 4 分）：

a) 逆关系 $R_1^{-1}$

b) 补关系 $\overline{R_1}$

c) 对称差（异或）关系 $R_1\oplus R_2$

d) 复合关系 $R_2\circ R_1$

e) $R_1$ 的传递闭包（transitive closure）

f) $R_2$ 的对称闭包（symmetric closure）

</div></div>

<div class="callout">

<div class="ttl">读题要点（第 2 题 · 全卷分值最高 24 分！）</div>

- a) 转置 $M_{R_1}^T$；b) 0/1 全部取反；c) 同位不同写 $1$、相同写 $0$；f) $M_{R_2} \lor M_{R_2}^T$。
- **d) 最大陷阱 $R_2 \circ R_1$**：先走 $R_1$ 再走 $R_2$，所以布尔矩阵乘法必须**左放 $M_{R_1}$、右放 $M_{R_2}$**（算 $M_{R_1} \odot M_{R_2}$）！
- **e) transitive closure of $R_1$**：4 分小问建议写出 Warshall 算法 $W_0 \to W_1 \to W_2 \to W_3$ 或 $M_{R_1} \lor M_{R_1}^{[2]} \lor M_{R_1}^{[3]}$ 的中间过程，稳拿步骤分。

</div>

---

## Question 3 (12 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Determine whether the following relation $R$ whether it is i) symmetric, ii) antisymmetric, iii) transitive, iv) irreflexive, v) reflexive, vi) a function, vii) an equivalence relation, viii) a reflexive partial order relation.

a) $\{(1,2),(3,1),(5,4),(2,3),(3,2),(4,5)\}$ on set $\{1,2,3,4,5\}$ **(4 marks)**

b) “Person a and Person b have the same friends” on the set of all persons **(4 marks)**

c) $\{(x,y)\mid x^2\geq y\text{ on the set of integers }\}$ **(4 marks)**

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

判断下列每一个关系 $R$ 是否满足：i) 对称的，ii) 反对称的，iii) 传递的，iv) 反自反的，v) 自反的，vi) 是函数，vii) 是等价关系，viii) 是自反偏序关系。

a) 集合 $\{1,2,3,4,5\}$ 上的关系 $\{(1,2),(3,1),(5,4),(2,3),(3,2),(4,5)\}$ **（4 分）**

b) 所有人组成的集合上的关系：“$a$ 与 $b$ 拥有相同的朋友” **（4 分）**

c) **整数集**上的关系 $\{(x,y)\mid x^2\geq y\}$ **（4 分）**

</div></div>

<div class="callout">

<div class="ttl">读题要点（第 3 题）</div>

- 每一道小题 a)、b)、c) 都要完整回答 **i) 到 viii) 共 8 个小标签**（建议在答卷上列一张 $3\times 8$ 或 $8\times 3$ 表格并附简短理由，绝不漏项！）。
- 先判前五项基本性质：自动锁死 **vii) 等价关系 = v) 自反 + i) 对称 + iii) 传递**，以及 **viii) 自反偏序 = v) 自反 + ii) 反对称 + iii) 传递**！
- **vi) a function**：检查定义域每个元素是否**恰好对应唯一一个 $y$**。
- **c) 盯紧题干最后四个词 `on the set of integers`**：在 $\mathbb{Z}$ 上 $x^2 \ge x$ 恒成立，所以 **v) reflexive 为 Yes**！

</div>

---

## Question 4 (8 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Suppose that $R$ and $S$ are symmetric relation on a set $A$. Prove or disprove $S\cap R$ is symmetric.

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

设 $R$ 和 $S$ 是集合 $A$ 上的对称关系。证明或否证：$S \cap R$ 也是对称关系。

</div></div>

<div class="callout">

<div class="ttl">读题要点（第 4 题）</div>

- ==Prove or disprove==：第一步必须先写明确结论 **"True. $S \cap R$ is symmetric."**，然后再写 `Proof:`。
- 标准证明骨架：任取 $(a,b)\in S\cap R$ $\to$ 按交集定义拆成 $(a,b)\in S \land (a,b)\in R$ $\to$ 对 $S, R$ 分别用对称定义得 $(b,a)\in S \land (b,a)\in R$ $\to$ 合回 $(b,a)\in S\cap R$。

</div>

---

## Question 5 (20 marks)

<div class="bi"><div class="en"><span class="lbl">ENGLISH · 原文</span>

Given a relation $R$ “divisibility” on the set $\{1,5,10,13,65,650\}$.

a) Draw the Hasse diagram **(6 marks)**

b) Find the minimal elements of $\{5,10,13\}$ **(2 marks)**

c) Find the greatest elements of $\{5,10,65\}$ **(2 marks)**

d) Find the upper bounds of $\{13,65\}$ **(2 marks)**

e) Find the greatest lower bound of $\{10,65\}$ **(2 marks)**

f) Is $R$ a total order? Explain why. **(3 marks)**

g) Is $R$ a lattice? Explain why. **(3 marks)**

</div><div class="zh"><span class="lbl">中文 · 翻译</span>

给定集合 $\{1,5,10,13,65,650\}$ 上的“整除（divisibility，$a \mid b$）”关系 $R$。

a) 画出其哈斯图（Hasse diagram） **（6 分）**

b) 求子集 $\{5,10,13\}$ 的极小元（minimal elements） **（2 分）**

c) 求子集 $\{5,10,65\}$ 的最大元（greatest element） **（2 分）**

d) 求子集 $\{13,65\}$ 的所有上界（upper bounds） **（2 分）**

e) 求子集 $\{10,65\}$ 的最大下界（greatest lower bound，GLB） **（2 分）**

f) $R$ 是全序（total order）吗？解释原因。 **（3 分）**

g) $R$ 是格（lattice）吗？解释原因。 **（3 分）**

</div></div>

<div class="callout">

<div class="ttl">读题要点（第 5 题 · 20 分压轴大题）</div>

- **a) Hasse 图三不画**：不画自环、不画跨级边（如 $1\to 10, 1\to 65, 5\to 650, 13\to 650$ 全擦掉！）、不画箭头（$1$ 在最底、$650$ 在最顶）。
- **b) c) vs d) e)**：b) 的 minimal 和 c) 的 greatest **只能在括号给的子集里面找**（c 中 $650$ 不在子集内，故 greatest **不存在**！）；d) 的 upper bounds 和 e) 的 GLB **在全集 $\{1,5,10,13,65,650\}$ 里找**！
- **f) g) Explain why（各 3 分）**：只写 Yes / No 最多得 1 分，必须写明定义与元素级验证！

</div>
