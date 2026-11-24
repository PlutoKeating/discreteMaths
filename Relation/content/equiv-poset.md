## 3.1 等价关系 Equivalence Relations：对“相等”的抽象【高频必考】

- **定义（Slides 5.5 p2–p3）**：集合 $A$ 上的关系 $R$ 称为**等价关系（equivalence relation）**，当且仅当 $R$ 同时满足：
  1. **自反 Reflexive**：$\forall a\in A,\ (a,a)\in R$
  2. **对称 Symmetric**：$\forall a,b\in A,\ (a,b)\in R \to (b,a)\in R$
  3. **传递 Transitive**：$\forall a,b,c\in A,\ (a,b)\in R \land (b,c)\in R \to (a,c)\in R$

### 三大黄金模型（看到这种结构直接秒判是等价关系！）
1. **函数等值核模型 $a R b \iff f(a) = f(b)$（Slides p6，Tutorial 06 Q2/Q3/Q5，Test 02 Q3b）**：
   只要关系能翻译成“两个对象的**某个确定属性 $f(\cdot)$ 完全相等**”——例如：
   - 字符串长度相同 $g(a)=g(b)$；比特串前 3 位相同（Tutorial 06 Q3）；
   - 两人拥有完全相同的父母（Tutorial 06 Q1d）或**完全相同的朋友集合 $F(a)=F(b)$（Test 02 Q3b 原题！）**；
   - 它**必然是等价关系**！其等价类就是原像集 $f^{-1}(y)$（Tutorial 06 Q5b）。
   - 反面对照："$a$ 与 $b$ 认识 / 见过面（have met）"（Tutorial 06 Q1e）或 "有公共朋友 $F(a)\cap F(b)\neq\varnothing$" **不是**等价关系，因为**不传递**！
2. **模 $m$ 同余 Congruence Modulo $m$（Slides p4, p8, p12）**：
   设 $m$ 为正整数，整数集 $\mathbb{Z}$ 上定义 $a \equiv b \pmod m \iff m \mid (a - b) \iff \exists k\in\mathbb{Z}\,(a - b = km)$。
   这是等价关系，把全体整数切分成恰好 **$m$ 个同余等价类**：$[0]_m, [1]_m, \dots, [m-1]_m$。
3. **矩阵分块判别法（Tutorial 06 Q1f–i）**：
   在有向图上，等价关系的每一个连通块都是**带全自环的完全子图（团 Clique）**；适当重排顶点顺序后，0-1 矩阵必呈**主对角线上的全 $1$ 方块阵（Block-Diagonal of All-1s）**！

---

## 3.2 等价类 Equivalence Classes 与集合划分 Partition【高频必考】

- **等价类定义（Slides 5.5 p7）**：设 $R$ 是 $A$ 上的等价关系，$a\in A$ 的等价类为：

$$
[a]_R = \{s \in A \mid (a, s) \in R\}
$$

其中任何 $b \in [a]_R$ 都可称为该等价类的**代表元（representative）**。

### 等价类三大等价定理（Slides p9–p13，证明与大题核心）

设 $R$ 是非空集合 $A$ 上的等价关系，则对任意 $a, b \in A$，以下三条**互相等价**：

$$
(i)\ (a,b) \in R \quad\Longleftrightarrow\quad (ii)\ [a]_R = [b]_R \quad\Longleftrightarrow\quad (iii)\ [a]_R \cap [b]_R \neq \varnothing
$$

> **核心推论**：两个等价类**要么一模一样（$[a]_R=[b]_R$），要么老死不相往来（$[a]_R\cap [b]_R=\varnothing$）**，绝不可能“只重叠一部分”！

### 等价关系 $\longleftrightarrow$ 集合划分（Partition）双向一一对应
集合族 $\{A_1, A_2, \dots, A_k\}$ 称为集合 $A$ 的一个**划分（Partition，Tutorial 06 Q4）**，当且仅当同时满足三件事：
1. **每块非空**：$\forall i,\ A_i \neq \varnothing$；
2. **两两不相交（Pairwise Disjoint）**：$i \neq j \implies A_i \cap A_j = \varnothing$；
3. **并集铺满全集**：$\bigcup_i A_i = A$。

- **正向（$R \Rightarrow$ 划分）**：等价关系 $R$ 的所有不同等价类自动构成 $A$ 的一个划分。
- **反向（划分 $\Rightarrow R$，Slides p13）**：给定划分 $\{A_1, \dots, A_k\}$，定义 "$a R b \iff a, b$ 在同一个分块 $A_i$ 中"，则：

$$
R = (A_1 \times A_1) \cup (A_2 \times A_2) \cup \cdots \cup (A_k \times A_k)
$$

例如 $A_1=\{1,2,3\},\ A_2=\{4,5\}$ 诱导的等价关系共有 $3^2 + 2^2 = 9 + 4 = 13$ 个有序对！

---

## 3.3 偏序关系 Partial Orderings、全序、字典序与良序【高频必考 + 概念速览】

- **偏序定义（Slides 5.6 p17）**：集合 $S$ 上的关系 $R$（常记作 $\preceq$）称为**偏序（partial ordering / reflexive partial order）**，当且仅当满足：
  1. **自反 Reflexive**：$a \preceq a$
  2. **反对称 Antisymmetric**：$(a \preceq b \land b \preceq a) \to a = b$
  3. **传递 Transitive**：$(a \preceq b \land b \preceq c) \to a \preceq c$
  配对 $(S, \preceq)$ 称为**偏序集（poset）**。记严格小于 $a \prec b \iff (a \preceq b \land a \neq b)$。

### 三大标准偏序模型与常见伪偏序陷阱（Tutorial 06 Q6–Q8）
- **真偏序三巨头**：① 实数/整数上的 $(\mathbb{Z}, \le)$ 与 $(\mathbb{Z}, \ge)$；② 正整数上的**整除 $(\mathbb{Z}^+, \mid)$**；③ 幂集上的**包含 $(\mathcal{P}(S), \subseteq)$**；外加特例：相等关系 $(S, =)$ 既是等价关系也是偏序关系！
- **对偶偏序集 Dual Poset（Tutorial 06 Q7–Q8）**：若 $(S, R)$ 是偏序集，则逆关系 **$(S, R^{-1})$ 必也是偏序集**（例如 $(\mathbb{Z}, \ge)$ 的对偶是 $(\mathbb{Z}, \le)$；Hasse 图直接上下倒置）。
- **伪偏序反例**：
  - "$a$ 比 $b$ 高（taller than）" 或 "$<$" —— **不自反**（是严格偏序，不是本课定义的自反偏序）；
  - **全体整数 $\mathbb{Z}$** 上的整除 $|$ —— **不反对称**！因为 $2 \mid -2$ 且 $-2 \mid 2$，但 $2 \neq -2$！（正整数 $\mathbb{Z}^+$ 上才是偏序！）

### 可比性、全序、字典序与良序集

| 概念 | 考频 | 精确定义与判据（Slides 5.6 p19–p24, p29） |
|---|---|---|
| **可比 Comparable** | **高频必考** | $a \preceq b$ 或 $b \preceq a$ 至少成立一个；若都不成立（如整除中 $5\nmid 13$ 且 $13\nmid 5$），称 **不可比 Incomparable** |
| **全序 Total / Linear Order (Chain)** | **高频必考** | 偏序集中**任意两个元素都可比**：$\forall a,b\in S\,(a\preceq b \lor b\preceq a)$。Hasse 图是一条无分叉竖直单链！ |
| **字典序 Lexicographic Order** | 概念速览 | 在 $(A_1,\preceq_1)\times(A_2,\preceq_2)$ 上：$(a_1,a_2) \prec (b_1,b_2) \iff a_1 \prec_1 b_1$ 或 $(a_1=b_1 \land a_2 \prec_2 b_2)$。字符串若前缀相同，短词更小（如 `open < opened < opener < opera < operand`，Tutorial 06 Q10） |
| **良序集 Well-Ordered Set** | 概念速览 | $(S, \preceq)$ 是**全序集**，且 $S$ 的**每一个非空子集都有最小元（least element）**。<br/>例：$(\mathbb{Z}^+, \le)$ 与 $(\mathbb{N}, \le)$ 是良序集；$(\mathbb{Z}, \le)$ 是全序但**非良序**（负整数集无最小元）；$([0,1], \le)$ **非良序**（开区间 $(0,1]$ 无最小元） |

---

## 3.4 哈斯图 Hasse Diagram 与极值 / 上下界四组辨析【Test 02 Q5 20 分核心】

### A. 画 Hasse 图的标准三步脱衣法（Slides 5.6 p25–p27，Tutorial 06 Q11）
给定有限偏序集 $(A, \preceq)$：
1. **脱自环**：因偏序必自反，擦掉所有顶点上的自环 $(a,a)$；
2. **脱跨级传递边（只留覆盖关系 Covering Relation）**：若存在中间元素 $z$ 使 $x \prec z \prec y$，则擦掉直连边 $(x,y)$。留下的边全是 **$y$ covers $x$**（紧挨着的直接上下级）；
3. **脱箭头定高低**：把所有满足 $x \prec y$ 的 $y$ 画在 $x$ 的**上方**，擦掉向上的箭头，只留无向线段！

> **从 Hasse 图反读偏序关系**：在 Hasse 图中 $a \preceq b \iff a = b$，或者能从 $a$ 出发**一路顺着连线只往上爬**到达 $b$！

### B. 极小/最小/极大/最大元 vs 上界/LUB/下界/GLB 终极对照表

设 $(A, \preceq)$ 是偏序集，**$B \subseteq A$ 是题目指定的子集**（当题目没写子集时默认 $B = A$）：

| 概念对 | 候选人必须在哪个范围找？ | 精确定义与 Hasse 图读法 | 个数规律 |
|---|---|---|---|
| **极小元 Minimal** of $B$ | **必须在子集 $B$ 内部** ($m \in B$) | $B$ 中没有元素排在 $m$ 下方（$\neg\exists x\in B,\ x \prec m$） | 有限非空 $B$ **至少 1 个，可有多个** |
| **最小元 Least** of $B$ | **必须在子集 $B$ 内部** ($l \in B$) | $l$ 排在 $B$ 中**所有**元素下方（$\forall x\in B,\ l \preceq x$） | **至多 1 个**！若有 $\ge 2$ 个极小元，则最小元 **None（不存在）** |
| **极大元 Maximal** of $B$ | **必须在子集 $B$ 内部** ($m \in B$) | $B$ 中没有元素排在 $m$ 上方（$\neg\exists x\in B,\ m \prec x$） | 有限非空 $B$ **至少 1 个，可有多个** |
| **最大元 Greatest** of $B$ | **必须在子集 $B$ 内部** ($g \in B$) | $g$ 排在 $B$ 中**所有**元素上方（$\forall x\in B,\ x \preceq g$） | **至多 1 个**！若有 $\ge 2$ 个极大元，则最大元 **None（不存在）** |
| **上界 Upper Bounds** of $B$ | **在全集 $A$ 中找** ($u \in A$，可不在 $B$ 内！) | 在 Hasse 图上，能从 $B$ 的**每一个**元素往上爬到的公共汇合点 $u$ | 可有 0 个、1 个或多个 |
| **最小上界 LUB** ($\sup B$) | 上界集合 $U(B)$ 内部 | 所有上界 $U(B)$ 当中的 **Least element**（最矮但统领其余所有上界的那个） | **至多 1 个**（即唯一上确界） |
| **下界 Lower Bounds** of $B$ | **在全集 $A$ 中找** ($l \in A$，可不在 $B$ 内！) | 在 Hasse 图上，往上爬能到达 $B$ 的**每一个**元素的公共源头 $l$ | 可有 0 个、1 个或多个 |
| **最大下界 GLB** ($\inf B$) | 下界集合 $L(B)$ 内部 | 所有下界 $L(B)$ 当中的 **Greatest element**（最高且在其余下界之上的那个） | **至多 1 个**（即唯一下确界） |

<div class="callout bad">

<div class="ttl">Test 02 Q5c & Q5g 两大夺命陷阱（90% 同学在这两处丢分！）</div>

1. **陷阱一（Q5c）：把“全集里的上界”误当成“子集的最大元 Greatest”！**
   - 题问：在 $A=\{1,5,10,13,65,650\}$ 上，求子集 $B=\{5, 10, 65\}$ 的 **greatest element**。
   - 错误脑回路：看到 $650$ 能被 $5, 10, 65$ 整除就填 $650$ —— **0 分**！因为 $650 \notin \{5,10,65\}$！Greatest element 必须是子集 $B$ 自己的成员！而在 $B$ 内部，$10 \nmid 65$ 且 $65 \nmid 10$（有两个极大元 $10, 65$），所以答案是 **Does not exist (None)**！
2. **陷阱二（Q5g 神坑）：在有限子集整除偏序里盲套数论 $\operatorname{lcm}$ 误判不是 Lattice！**
   - 在全体正整数 $(\mathbb{Z}^+, \mid)$ 上，确实有 $\text{lub}\{a,b\} = \operatorname{lcm}(a,b)$、$\text{glb}\{a,b\} = \gcd(a,b)$。
   - 但在**残缺的有限子集** $A=\{1,5,10,13,65,650\}$ 上，考察元素对 $\{10, 13\}$：数论最小公倍数是 $\operatorname{lcm}(10,13) = 130$，而 **$130$ 根本不在集合 $A$ 里**！
   - 那 $\{10, 13\}$ 在 $A$ 里还有没有 LUB？**有！！** 按定义在 $A$ 里找同时是 $10$ 和 $13$ 倍数的上界，只有唯一一个元素 **$650$**！上界集合 $\{650\}$ 的最小元当然就是 **$650$**！所以 $\text{lub}_A\{10,13\} = 650$ 完全存在！整张偏序集 **依然是一个 Lattice（格）**！永远按 Hasse 图找公共上界，绝不盲背 $\operatorname{lcm}$！

</div>

---

## 3.5 格 Lattice、有界格与有补格【Test 02 Q5g 压轴 + 概念速览】

### A. 格 Lattice 的定义与反例判别法（Slides 5.6 p31–p33）【高频必考】
- **定义**：若偏序集 $(L, \preceq)$ 中**每一对元素** $a, b \in L$ 都**同时拥有**最小上界 $\text{lub}\{a,b\}$（记作并运算 $a \lor b$）和最大下界 $\text{glb}\{a,b\}$（记作交运算 $a \land b$），则称 $(L, \preceq)$ 是一个**格（lattice）**。
- **考场如何快速判断一张有限 Hasse 图是不是格？**
  1. **一票否决 1（缺顶或缺底）**：若整张有限图有 $\ge 2$ 个极大元（没有全集最大元，如 Tutorial 06 Q12 的 $24$ 和 $45$）或有 $\ge 2$ 个极小元（没有全集最小元，如 Q12 的 $3$ 和 $5$），立刻断定 **NOT a lattice**（直接拿那两个极大元做反例：它们没有公共上界！）。
  2. **一票否决 2（蝴蝶结 Bowtie 结构）**：虽然有全集最大元和最小元，但存在底部两点 $\{a,b\}$ 同时连向中部两个互不可比的点 $\{c,d\}$ —— 此时 $\{a,b\}$ 的上界包含 $c, d$，但 $c, d$ 谁也不比谁小，导致**上界集合无最小元（无唯一 LUB）** $\Rightarrow$ **NOT a lattice**！
  3. 若所有**不可比元素对**逐一核查都既有唯一 LUB 又有唯一 GLB（可比对 $a\preceq b$ 自动有 $\text{glb}=a,\ \text{lub}=b$ 不用查！），则 **IS a lattice**！

### B. 格的代数性质、有界格与有补格（Slides 5.6 p32–p35）【概念速览】
- **格的四组代数定律（定理，Slides p32）**：在任意格 $(L, \lor, \land)$ 中，$\lor$（lub）与 $\land$（glb）满足：
  1. **幂等律 Idempotent**：$a \lor a = a,\quad a \land a = a$
  2. **交换律 Commutative**：$a \lor b = b \lor a,\quad a \land b = b \land a$
  3. **结合律 Associative**：$(a\lor b)\lor c = a\lor(b\lor c),\quad (a\land b)\land c = a\land(b\land c)$
  4. **吸收律 Absorption**：$a \lor (a \land b) = a,\quad a \land (a \lor b) = a$
- **有界格 Bounded Lattice（Slides p34）**：存在全集最小元 $0$（bottom，$\forall x,\ 0\preceq x$）和全集最大元 $1$（top，$\forall x,\ x\preceq 1$）的格。**定理：任何有限格必是有界格**。
- **有补格 Complemented Lattice（Slides p35）**：在有界格中，若对**每一个**元素 $x \in L$，都存在至少一个补元 $y \in L$ 使得：

$$
x \lor y = 1 \qquad\text{且}\qquad x \land y = 0
$$

则称为有补格。
  - 典型例子：幂集格 $(\mathcal{P}(S), \subseteq)$ 是有界有补格（$0=\varnothing,\ 1=S$，$X$ 的补元就是集合补 $\overline{X} = S - X$，满足 $X \cup \overline{X} = S$ 且 $X \cap \overline{X} = \varnothing$）；
  - 反例：全序链 $(\{1, 2, 3\}, \le)$ 是有界格（$0=1,\ 1=3$），但**不是有补格**，因为中间元素 $2$ 找不到 $y$ 同时满足 $\max(2,y)=3$ 且 $\min(2,y)=1$！
