# Midterm Test 01 逐题复习指南 —— Logic and Proof（Ch1.1–1.6）

> 配套材料：`Midterm-Test-01.md`、`Slides-2in1/` 三章 slides、`Tutorials/` 三份答案。
> 写法约定：¬ 非、∧ 且、∨ 或、⊕ 异或、→ 蕴含、↔ 当且仅当、∀ 任意、∃ 存在、≡ 逻辑等价、∴ 所以。
> 本指南分四部分：**第一性原理总纲 → 全章公式总表 → 逐题精讲 → 通用解法模板与失分点**。

---

# 第 0 部分：第一性原理总纲（先读这一页，后面全部都是它的展开）

## 0.1 整个 Logic 只有一个底层事实：真值只有 T 和 F

- 一个**命题**就是一个"非真即假"的句子。所有联结词（¬ ∧ ∨ → ↔）都只是**对 T/F 做运算的函数**，就像 + − × ÷ 对数字做运算一样。
- 所以任何逻辑问题，追到底都是在问：**"在每一种 T/F 组合下，这个式子算出来是什么？"**
- 真值表 = 把所有组合一个个算一遍。考试禁止用真值表，是逼你用"代数定律"（等价律）来做，但定律全部是从真值表里**验证**出来的，背不住时可以在草稿纸上用真值表偷偷验证。

## 0.2 三个核心概念，全都用"真值"定义

| 概念 | 一句话定义 | 怎么证明它成立 | 怎么证明它不成立 |
|---|---|---|---|
| **等价** P ≡ Q | 任何情况下 P 和 Q 真值都相同（P ↔ Q 是永真式） | 用等价律把一边变形成另一边 | 找**一组赋值**让两边真值不同（反例） |
| **推理有效**（premises ⊢ conclusion） | 前提全真的时候，结论**必定**真 | 用推理规则一步步从前提推到结论 | 造**一个场景**：前提全真、结论假 |
| **命题为真** | 在给定的 domain 下算出来是 T | ∀：对所有元素逐一说明；∃：举一个例子 | ∀：举一个反例；∃：对所有元素说明都不行 |

**第 1 题 b)、第 2 题、第 4 题 全部是这三行的直接应用。**

## 0.3 谓词逻辑只是在命题逻辑上加了"对象"和"范围"

- 命题逻辑：`p = "Bob 通过了课程"`，p 是一个整体，拆不开。
- 谓词逻辑：`P(x) = "x 通过了课程"`，把"主语 x"抠出来变成变量。P(Bob) 才是一个命题。
- 量词：∀x P(x) = "域里**每一个** x 代进去都为真"；∃x P(x) = "域里**至少一个** x 代进去为真"。
- **有限域的本质**（slides 1.3 p17/p19）：
  - ∀x P(x) ≡ P(x₁) ∧ P(x₂) ∧ … ∧ P(xₙ)  —— ∀ 就是一长串 **∧**
  - ∃x P(x) ≡ P(x₁) ∨ P(x₂) ∨ … ∨ P(xₙ)  —— ∃ 就是一长串 **∨**
  - 记住这一条，量词的所有定律（De Morgan、分配律、为什么 ∀ 配 →、∃ 配 ∧）都能自己推出来。

## 0.4 证明 = 把"推理有效"写成人能读的文字

- 形式证明（第 1 题那种）：每一步写规则名。
- 非形式证明（第 5、6 题那种）：用自然语言，但每一步仍然是"由前提 + 定义 + 已知事实 ⇒ 下一句"。
- 所有证明方法（直接、逆否、反证、分情况、存在性、唯一性）都只是 **把目标命题换一个等价的形式** 再去证。

---

# 第 1 部分：全章公式总表（考前必背；每一张都标了出处）

## 1.1 六个联结词真值表（slides 1.1 p39）

| p | q | ¬p | p∧q | p∨q | p⊕q | p→q | p↔q |
|---|---|---|---|---|---|---|---|
| T | T | F | T | T | F | T | T |
| T | F | F | F | T | T | **F** | F |
| F | T | T | F | T | T | T | F |
| F | F | T | F | F | F | T | T |

**记忆要点（第一性原理）：**
- ∧ 只有全 T 才 T；∨ 只有全 F 才 F。
- **p→q 只有 "p 真 q 假" 这一行是 F**。前提假时整句自动为真（"空话也算对"）。这是整章最重要的一行，第 1 题 ii) iii) 的陷阱、第 2 题 c) 的化简、第 5 题选逆否法，全部来源于此。
- p↔q：两边真值相同就 T。
- ⊕：恰好一个 T。

## 1.2 运算优先级（slides 1.1 p41；1.3 p23）

```
1. ¬          2. ∧          3. ∨, ⊕          4. →          5. ↔
量词 ∀x、∃x 的优先级比所有命题联结词都高：∀x P(x) ∧ Q(x) 读作 (∀x P(x)) ∧ Q(x)
```
考试写答案**宁可多加括号**，不要依赖优先级。

## 1.3 条件语句 p→q 的所有英文说法（slides 1.1 p31）—— 翻译题的核心

以下全部等于 **p → q**：
- If p, then q ／ If p, q ／ p implies q
- **q if p** （if 后面的是前提！）
- **p only if q** （only if 后面的是结论！）
- q whenever p ／ q follows from p
- **p is sufficient for q**（充分条件 = 前件）
- **q is necessary for p**（必要条件 = 后件）

| 关系 | 公式 | 和原式等价吗 |
|---|---|---|
| 原式 | p → q | — |
| 逆命题 Converse | q → p | ✗ |
| 否命题 Inverse | ¬p → ¬q | ✗ |
| **逆否命题 Contrapositive** | **¬q → ¬p** | **✓ 等价** |

逆命题 ≡ 否命题（它们互为逆否）。

p↔q 读作 "p if and only if q"、"p iff q"、"p is necessary and sufficient for q"。

## 1.4 等价律总表（slides 1.2 p82 原表 + p83/p86 蕴含、双条件）

### A. 基本十律（原表）

| 名称 | ∧ 版本 | ∨ 版本 |
|---|---|---|
| Identity 同一律 | p ∧ T ≡ p | p ∨ F ≡ p |
| Domination 支配律 | p ∧ F ≡ F | p ∨ T ≡ T |
| Idempotent 幂等律 | p ∧ p ≡ p | p ∨ p ≡ p |
| Double Negation 双重否定 | ¬(¬p) ≡ p | |
| Negation 否定律 | p ∧ ¬p ≡ F | p ∨ ¬p ≡ T |
| Commutative 交换律 | p ∧ q ≡ q ∧ p | p ∨ q ≡ q ∨ p |
| Associative 结合律 | (p∧q)∧r ≡ p∧(q∧r) | (p∨q)∨r ≡ p∨(q∨r) |
| **Distributive 分配律** | p ∧ (q ∨ r) ≡ (p∧q) ∨ (p∧r) | p ∨ (q ∧ r) ≡ (p∨q) ∧ (p∨r) |
| Absorption 吸收律 | p ∧ (p ∨ q) ≡ p | p ∨ (p ∧ q) ≡ p |
| **De Morgan** | ¬(p ∧ q) ≡ ¬p ∨ ¬q | ¬(p ∨ q) ≡ ¬p ∧ ¬q |

### B. 蕴含相关（slides p83，老师说"只需背第一条"，其余可推）

```
★ p → q ≡ ¬p ∨ q                （蕴含消去——所有题目第一步都是它）
  p → q ≡ ¬q → ¬p               （逆否）
  p ∨ q ≡ ¬p → q
  p ∧ q ≡ ¬(p → ¬q)
  ¬(p → q) ≡ p ∧ ¬q              （蕴含的否定：前件真且后件假）
  (p → q) ∧ (p → r) ≡ p → (q ∧ r)
  (p → r) ∧ (q → r) ≡ (p ∨ q) → r      （第 6 章分情况证明的依据）
  (p → q) ∨ (p → r) ≡ p → (q ∨ r)
  (p → r) ∨ (q → r) ≡ (p ∧ q) → r
  p → (q → r) ≡ (p ∧ q) → r            （Exportation，第 2 题 b）
```

### C. 双条件相关（slides p86，只需背第一条）

```
★ p ↔ q ≡ (p → q) ∧ (q → p)
  p ↔ q ≡ (p ∧ q) ∨ (¬p ∧ ¬q)
  p ↔ q ≡ ¬p ↔ ¬q
  ¬(p ↔ q) ≡ p ↔ ¬q
```

### D. 用等价律做题的固定套路

1. **先消 ↔**（换成两个 → 的 ∧），**再消 →**（p→q ≡ ¬p∨q）。
2. **用 De Morgan 把 ¬ 推到最里面**，只留在单个变量前。
3. **用分配律/吸收律整理**，目标是把两边化成同样的"∧ 里套 ∨"或"∨ 里套 ∧"。
4. 每一步右边**写规则名**（De Morgan's Laws / Distributive Laws …），tutorial 答案就是这个格式。

## 1.5 谓词与量词（slides 1.3/1.4）

### A. 四个要素 + 真假判定（p13, p22）

一个量化语句必须说清：**量词、变量、谓词、域（domain）**。

| 语句 | 何时为真 | 何时为假 |
|---|---|---|
| ∀x P(x) | 每个 x 都使 P(x) 真 | 存在一个 x 使 P(x) 假（**反例 counterexample**） |
| ∃x P(x) | 存在一个 x 使 P(x) 真（**举例**） | 每个 x 都使 P(x) 假 |

### B. 为什么 ∀ 配 →、∃ 配 ∧（p43、p45）—— 翻译题最大陷阱

- "Every student in this class is lazy"，域=所有人：**∀x (S(x) → L(x))** ✓
  - 若写成 ∀x (S(x) ∧ L(x))：意思变成"所有人都是本班学生而且都懒"✗
- "Some student in this class is lazy"：**∃x (S(x) ∧ L(x))** ✓
  - 若写成 ∃x (S(x) → L(x))：只要域里有一个不是本班学生的人，前件假、整句就真了，毫无意义 ✗

**第一性原理**：∀ 是一串 ∧，我们只想"管"满足 S 的那些元素，对不满足 S 的元素要"放行"，而 → 在前件假时恰好自动为 T（放行）。∃ 是一串 ∨，我们需要"真的找到一个既 S 又 L 的"，所以必须 ∧。

### C. 量词的 De Morgan（p37–38）

```
¬∀x P(x) ≡ ∃x ¬P(x)        "不是所有都…" = "存在一个不…"
¬∃x P(x) ≡ ∀x ¬P(x)        "不存在一个…" = "所有都不…"
```
嵌套时逐层往里推，每穿过一个量词就翻转一次：¬∀x∃y P ≡ ∃x∀y ¬P。

### D. 量词分配律（p35）—— 哪些是等价、哪些只是单向

```
∀x (P(x) ∧ Q(x)) ≡ ∀x P(x) ∧ ∀x Q(x)        ✓ 等价
∃x (P(x) ∨ Q(x)) ≡ ∃x P(x) ∨ ∃x Q(x)        ✓ 等价
∀x P(x) ∨ ∀x Q(x) ⇒ ∀x (P(x) ∨ Q(x))        只能单向，反过来不行
∃x (P(x) ∧ Q(x)) ⇒ ∃x P(x) ∧ ∃x Q(x)        只能单向，反过来不行
```
（反例：P=偶数，Q=奇数，域=整数：∀x(P∨Q) 真，但 ∀xP ∨ ∀xQ 假。）

### E. 量词与"不含 x 的命题 A"的互动（p36，域非空）

```
∀x (A ∧ P(x)) ≡ A ∧ ∀x P(x)         ∃x (A ∧ P(x)) ≡ A ∧ ∃x P(x)
∀x (A ∨ P(x)) ≡ A ∨ ∀x P(x)         ∃x (A ∨ P(x)) ≡ A ∨ ∃x P(x)
∀x (A → P(x)) ≡ A → ∀x P(x)         ∃x (A → P(x)) ≡ A → ∃x P(x)
∀x (P(x) → A) ≡ ∃x P(x) → A   ★注意翻转      ∃x (P(x) → A) ≡ ∀x P(x) → A   ★注意翻转
∀x A ≡ A，∃x A ≡ A  （A 不含 x 且域非空 —— 第 2 题 c 用到）
```
"翻转"那两条的原因：P(x)→A ≡ ¬P(x)∨A，∀x 穿过 ¬ 时变 ∃。

### F. 嵌套量词顺序（p55–57）

- 同类型可以换顺序：∀x∀y ≡ ∀y∀x，∃x∃y ≡ ∃y∃x。
- **不同类型不能换**：∀x∃y P(x,y)（每个 x 都能找到自己的 y，y 可随 x 变）**≠** ∃y∀x P(x,y)（有一个万能的 y 对所有 x 都行）。
- 单向成立：∃y∀x P(x,y) ⇒ ∀x∃y P(x,y)（有万能的当然每人都有）。
- **博弈读法（最直观）**：从左往右读，∀ 是"对手随便选"，∃ 是"我来选"。我后选就可以看着对手的牌出，我先选就要一手牌应付对手所有出法。

### G. "恰好一个 / 恰好两个"的写法（p66–79）

```
恰好一个 x 满足 P：  ∃x ( P(x) ∧ ∀z ( P(z) → z = x ) )
                 或  ∃x ( P(x) ∧ ∀z ( z ≠ x → ¬P(z) ) )      （两者互为逆否）
恰好两个：          ∃x∃y ( P(x) ∧ P(y) ∧ x≠y ∧ ∀z ( P(z) → (z=x ∨ z=y) ) )
至少一个：∃x P(x)      至多一个：∀x∀y ( P(x) ∧ P(y) → x = y )
```

### H. 受限域缩写（p50）

```
∀x>10 (x² > 100)  ≡  ∀x ( x>10 → x²>100 )      ∀ 展开用 →
∃x>0  (x² = 2)    ≡  ∃x ( x>0  ∧ x²=2 )        ∃ 展开用 ∧
```

## 1.6 推理规则（slides 1.5 p13、p25、p34）

### A. 命题推理规则八条

| 名称 | 形式 | 口诀 |
|---|---|---|
| **Modus Ponens** 肯定前件 | p, p→q ∴ q | 有因必有果 |
| **Modus Tollens** 否定后件 | ¬q, p→q ∴ ¬p | 无果必无因 |
| Hypothetical Syllogism 假言三段论 | p→q, q→r ∴ p→r | 链式传递 |
| Disjunctive Syllogism 析取三段论 | p∨q, ¬p ∴ q | 二选一排除 |
| Addition 附加 | p ∴ p∨q | 真的东西或上任何都还真 |
| Simplification 化简 | p∧q ∴ p | 且里面拆一个出来 |
| Conjunction 合取 | p, q ∴ p∧q | 两个真合起来 |
| Resolution 消解 | p∨q, ¬p∨r ∴ q∨r | 对消 p |

### B. 量词推理规则四条

| 名称 | 形式 | 使用条件 |
|---|---|---|
| **Universal Instantiation (UI)** | ∀x P(x) ∴ P(c) | c 是域中任意**指定**元素（如 Bob） |
| Universal Generalization (UG) | P(c)，c 任意 ∴ ∀x P(x) | c 必须是"任取的"，不能是某个特定的 |
| **Existential Instantiation (EI)** | ∃x P(x) ∴ P(c)，某个 c | c 是新名字，只知道它存在 |
| **Existential Generalization (EG)** | P(c) ∴ ∃x P(x) | 有一个例子就能说存在 |

**组合规则（p34）**：
- Universal Modus Ponens：∀x(P(x)→Q(x)), P(a) ∴ Q(a)
- Universal Modus Tollens：∀x(P(x)→Q(x)), ¬Q(a) ∴ ¬P(a)

### C. 两个经典谬误（p24）—— 第 1 题 ii) iii) 考的就是它

| 谬误 | 形式 | 为什么错 |
|---|---|---|
| **Fallacy of affirming the conclusion** 肯定后件 | p→q, q ∴ p ✗ | q 真时 p 可真可假（真值表第 3 行） |
| **Fallacy of denying the hypothesis** 否定前件 | p→q, ¬p ∴ ¬q ✗ | p 假时 q 可真可假（真值表第 3、4 行） |

记法：p→q 只告诉你"p 真那一半世界"发生了什么，对"p 假的世界"**什么都没说**。

### D. 一个推理有效的判定（p6）

论证 p₁, p₂, …, pₙ ∴ q 有效 ⇔ (p₁ ∧ p₂ ∧ … ∧ pₙ) → q 是永真式。
要说明**无效**：给出一组真值（或一个具体场景/模型），让所有前提为 T 而 q 为 F。

## 1.7 证明方法总表（slides 1.6 p40–81）

| 要证的形式 | 方法 | 做法 | 什么时候用 |
|---|---|---|---|
| p → q | **直接证明 Direct** | 假设 p，推出 q | 从 p 能自然算出 q 时 |
| p → q | **逆否证明 Contraposition** | 假设 ¬q，推出 ¬p（因为 p→q ≡ ¬q→¬p） | 从 p 出发要开根号/除法算不动，但从 ¬q 出发能代公式时（**第 5 题**） |
| 任意 p（含 p→q） | **反证法 Contradiction** | 假设 ¬p，推出矛盾 (r ∧ ¬r) 或 F | 结论是"不存在/无理数/不可能"类（√2 无理、无整数解） |
| p ↔ q | **双向证明** | 分别证 p→q 和 q→p | 题目含 iff / if and only if |
| p₁ ↔ p₂ ↔ … ↔ pₙ | 环形链 | p₁→p₂→…→pₙ→p₁ | 多个命题等价 |
| (p₁∨p₂∨…)→q | **分情况 Cases** | 每种情况各证一次 | 含绝对值、奇偶、正负、min/max |
| 有限个对象 | **穷举 Exhaustive** | 全部代入检查 | n ≤ 4 之类 |
| ∃x P(x) | **存在性 Existence** | 给出一个具体例子（构造性） | 题目说 "there exists" |
| ∃!x P(x) | **唯一性 Uniqueness** | ①存在：给例子 ②唯一：设另有 y 满足，推出 y = x | 题目说 "unique / exactly one"（**第 6 题**） |

**反证法的第一性原理**：要证 p，证 ¬p → F。因为 ¬p→F ≡ ¬(¬p)∨F ≡ p。
**对 p→q 用反证**：假设 ¬(p→q) ≡ p ∧ ¬q，然后推矛盾。

**常用定义（证明题必须写出来才算推理严密）：**
- n 是偶数 ⇔ ∃k∈ℤ, n = 2k；n 是奇数 ⇔ ∃k∈ℤ, n = 2k+1
- r 是有理数 ⇔ ∃p,q∈ℤ, q≠0, r = p/q（通常再加"p、q 互质/最简"）
- a 是完全平方数 ⇔ ∃b∈ℤ, a = b²
- n 整除 m（n | m）⇔ ∃k∈ℤ, m = nk
- 两个整数的和、差、积仍是整数（证明里写"因为 2k²+2k 是整数"就是在用这条）

---

# 第 2 部分：逐题精讲

---

## 第 1 题（24 分）：谓词翻译 + 形式推理

### 题目回顾

```
A(x,y): x attends lecture y      M(x): x understands the material
P(x):   x passes the course      R(x): x is respected
x ∈ students in the class，y ∈ lectures of the course
```

### 1a）翻译 Hypotheses 1–3（9 分）

**解题前先做三件事（翻译题 SOP）：**
1. 找量词词：every / all / any / each → ∀；some / a / there is / at least one → ∃；"a student … iff …" 这种泛指的"a"实际是 **every**（∀）。
2. 找联结词：if…then / only if / iff / and / or / not。
3. 看哪个变量被哪个量词管：这题 x 管学生，y 管讲座，**两个都要加量词**。

**Hypothesis 1：Every student who attends all lectures is respected.**

```
∀x ( ∀y A(x,y) → R(x) )
```
拆解：
- "Every student" → 最外层 ∀x
- "who attends all lectures" → 对这个 x，**所有** y 都 A(x,y)：∀y A(x,y)。这是一个关于 x 的"条件"
- "is respected" → R(x)
- "Every … who [条件] is [结果]" 是 ∀ + →（见 1.5 B）

**常见错误（第一性原理地说明为什么错）：**
- ✗ `∀x ∀y ( A(x,y) → R(x) )`：这等价于 ∀x ( ∃y A(x,y) → R(x) )（见 1.5 E 的"翻转"条），意思变成"只要上过**任一节**课就被尊重"。y 的 ∀ 必须留在前件**里面**。
- ✗ `∀x ∀y A(x,y) → R(x)`：R(x) 里的 x 跑到量词作用域外面成了自由变量，不是命题。
- ✗ 用 ∧ 代替 →。

**Hypothesis 2：A student attends some lectures if and only if the student understands the material.**

```
∀x ( ∃y A(x,y) ↔ M(x) )
```
- "A student" 泛指任何学生 → ∀x
- "attends some lectures" → ∃y A(x,y)
- "if and only if" → ↔

**Hypothesis 3：If a student understands the material, then the student passes the course.**

```
∀x ( M(x) → P(x) )
```
- 卷面手写只写了 `M(x) → P(x)`，**漏了 ∀x**，这很可能就是 −3 的来源之一。没有量词的 x 是自由变量，整句不是命题，不能当前提用。

**Hypotheses 4–6（题目没要求翻，但 b) 要用，一定写出来）：**

```
H4: ∀y A(Bob, y)        H5: ¬P(Noah)        H6: ¬M(Jessica)
```

### 1b）判断三个结论能否推出（15 分）

**判定原则（0.2 表第二行）**：
- 能推出 → 写 Step/Reason 表格形式证明（slides 1.5 p18、p32 的格式）。
- 不能推出 → **不是写"不知道"就完事**，要说明是哪种谬误，并给出一个"所有前提为真、结论为假"的具体场景。

#### 结论 i) Bob passes the course —— **可以推出** ✓

思路（倒推）：要 P(Bob) ← 由 H3 需 M(Bob) ← 由 H2 需 ∃y A(Bob,y) ← 由 H4 "Bob 上所有课"当然"上过某节课"。

| Step | 语句 | Reason |
|---|---|---|
| 1 | ∀y A(Bob, y) | Premise (H4) |
| 2 | A(Bob, c)，c 为某一节具体的讲座 | Universal Instantiation from (1) |
| 3 | ∃y A(Bob, y) | Existential Generalization from (2) |
| 4 | ∀x ( ∃y A(x,y) ↔ M(x) ) | Premise (H2) |
| 5 | ∃y A(Bob,y) ↔ M(Bob) | Universal Instantiation from (4) |
| 6 | ∃y A(Bob,y) → M(Bob) | p↔q ≡ (p→q)∧(q→p)，再 Simplification from (5) |
| 7 | M(Bob) | Modus Ponens from (3),(6) |
| 8 | ∀x ( M(x) → P(x) ) | Premise (H3) |
| 9 | M(Bob) → P(Bob) | Universal Instantiation from (8) |
| 10 | P(Bob) | Modus Ponens from (7),(9) |

∴ Bob passes the course. （步骤 2→3 隐含"课程至少有一节讲座"，即 y 的域非空，这是默认的。）

#### 结论 ii) Noah is not respected —— **不能推出** ✗

先看能推到哪：

| Step | 语句 | Reason |
|---|---|---|
| 1 | ¬P(Noah) | Premise (H5) |
| 2 | M(Noah) → P(Noah) | UI from H3 |
| 3 | ¬M(Noah) | Modus Tollens (1),(2) |
| 4 | ∃y A(Noah,y) ↔ M(Noah) | UI from H2 |
| 5 | M(Noah) → ∃y A(Noah,y) | 拆 ↔，Simplification |
| 6 | ¬∃y A(Noah,y) | Modus Tollens (3),(5) |
| 7 | ∀y ¬A(Noah,y) | De Morgan for quantifiers |
| 8 | ∀y A(Noah,y) → R(Noah) | UI from H1 |

现在我们手里有：Noah **一节课都没上**（第 7 行，所以 ∀y A(Noah,y) 为**假**），以及 H1 "如果上了所有课 → 被尊重"。
这是 **p→q 且 ¬p**，想推 ¬q —— 正是 **Fallacy of denying the hypothesis（否定前件谬误）**。H1 只保证"上全课的人被尊重"，对"没上全课的人"是否被尊重**什么都没说**。

**反例场景（必写，这是分数所在）**：
设班上只有 Noah，课程只有一节课 L。令 A(Noah,L)=F，M(Noah)=F，P(Noah)=F，**R(Noah)=T**。
- H1：∀y A(Noah,y) 为 F，F→任何 = T ✓
- H2：∃y A(Noah,y)=F，M(Noah)=F，F↔F = T ✓
- H3：M(Noah)=F，F→F = T ✓
- H5：¬P(Noah) = T ✓（H4、H6 关于别人，可同理满足）
- 结论 ¬R(Noah) = **F**
所有前提真、结论假 ⇒ 论证无效，结论 ii) 不能推出。

#### 结论 iii) Jessica does not pass the course —— **不能推出** ✗

手里只有 H6：¬M(Jessica)，H3 给 M(Jessica) → P(Jessica)。
又是 **p→q 且 ¬p 想推 ¬q**：否定前件谬误。"懂了就过"不等于"不懂就不过"（也许靠别的方式过了）。

**反例场景**：令 M(Jessica)=F，**P(Jessica)=T**，A(Jessica,y)=F 对所有 y，R 任意。
- H1：前件 F → T ✓  H2：F↔F = T ✓  H3：F→T = T ✓  H6：¬M = T ✓
- 结论 ¬P(Jessica) = **F**
⇒ 不能推出。

**卷面 −5 的可能原因**：把 ii) 或 iii) 写成"可以推出"；或者写了"不能"但没有说明谬误类型/没有给反例场景。

### 这类题的第一性原理

每个 → 只约束"前件为真"的那一半世界。有效推理只能沿着箭头**顺着走（MP）**或者从**箭头尾部的否定倒着走（MT）**。拿到 ¬前件 或 后件 就想推东西，一定是谬误。
一句话自检：**"我现在手里的是前件还是后件？是肯定还是否定？"** 只有 "肯定前件" 和 "否定后件" 两种组合能动。

---

## 第 2 题（15 分）：不用真值表判断等价

### 通用解法（SOP）

1. 两边分别化简，**顺序固定**：消 ↔ → 消 → → De Morgan 把 ¬ 推到变量上 → 分配律/吸收律整理。
2. 化到同一形式 ⇒ 等价，每一步标规则名。
3. 化不到一起 ⇒ 大概率不等价，去找反例：盯着"哪一行会让两边不同"。找反例的技巧：让某个 → 的前件真后件假；或让一边的某个 ∧ 项为 F 而另一边不受影响。

### 2a）((p ∧ ¬q) ∨ (p ∧ r)) 与 (p ∧ (q → r)) —— **等价** ✓

```
(p ∧ ¬q) ∨ (p ∧ r)
≡ p ∧ (¬q ∨ r)            Distributive Laws（反向使用：提公因式 p）
≡ p ∧ (q → r)             p→q ≡ ¬p∨q（反向使用）
```
∴ 等价。

**第一性原理**：分配律就是"提公因式"——p∧(¬q∨r) 像 p×(a+b) = pa+pb。

### 2b）(p → (q → r)) 与 ((p ∧ q) → r) —— **等价** ✓（Exportation 律）

```
p → (q → r)
≡ ¬p ∨ (q → r)            p→q ≡ ¬p∨q
≡ ¬p ∨ (¬q ∨ r)           p→q ≡ ¬p∨q
≡ (¬p ∨ ¬q) ∨ r           Associative Laws
≡ ¬(p ∧ q) ∨ r            De Morgan's Laws
≡ (p ∧ q) → r             p→q ≡ ¬p∨q
```
∴ 等价。

**直觉**："如果 p，那么（如果 q，那么 r）" = "如果 p 且 q，那么 r"。两个条件先后给和一起给是一回事。

### 2c）p 与 ∀x (¬p → (p ∧ r(x)))，p 与 x 无关，域非空 —— **等价** ✓

```
∀x ( ¬p → (p ∧ r(x)) )
≡ ∀x ( ¬¬p ∨ (p ∧ r(x)) )       p→q ≡ ¬p∨q
≡ ∀x ( p ∨ (p ∧ r(x)) )         Double Negation Law
≡ ∀x ( p )                      Absorption Laws  p ∨ (p∧q) ≡ p
≡ p                             p 不含 x 且域非空：∀x A ≡ A
```
∴ 等价。

**为什么题目要强调"域非空"**：若域为空，∀x(…) 是**空真**（vacuously true，因为找不到反例），这时即使 p = F 左边也为 T，两边就不等价了。题目给出"非空"就是为了让最后一步 ∀x p ≡ p 成立——答题时**要把这个条件写出来**作为最后一步的理由。

**为什么吸收律成立（第一性原理）**：p ∨ (p ∧ r)：p 真则整体真；p 假则 p∧r 也假，整体假。所以整体真值 = p。

### 若遇到"不等价"该怎么写（tutorial 1 Q3 的格式）

```
Counterexample: When p = T, q = F, (LHS) is T but (RHS) is F.
```
要**给出具体赋值**并**算出两边的值**，不能只说"不等价"。

---

## 第 4 题（8 分）：嵌套量词真值判断

P(x,y): x + y = 10，x、y ∈ 整数。

### 通用解法（SOP）

1. 从左到右读，**∀ = 对手任选，∃ = 我选**，后面的量词可以"看见"前面的选择。
2. ∀ 为真要给出**对所有情况都成立的理由**；∀ 为假给**一个反例**。
3. ∃ 为真给**一个例子**；∃ 为假要说明**所有候选都不行**（通常用反证：假设存在，推矛盾）。
4. 注意域：整数 vs 实数 vs 正整数，答案可能不同。

### 4a）∀y ∀x P(x,y) —— **假**

意思：任何 y、任何 x，都有 x+y=10。
反例：x = 0, y = 0，0 + 0 = 0 ≠ 10。

### 4b）∃y ∀x P(x,y) —— **假**

意思：存在一个"万能的" y，使得对**所有** x 都有 x + y = 10。
理由（反证）：假设这样的 y 存在。取 x = 0 得 y = 10；取 x = 1 得 y = 9。y 不能同时等于 10 和 9，矛盾。∴ 不存在。
（博弈读法：我先选 y，对手再选 x，对手总能选 x ≠ 10 − y 让我输。）

**卷面 −2 的可能原因**：这一问只写"False"没写理由，或者理由只是"显然"。

### 4c）∀y ∃x P(x,y) —— **真**

意思：对任意 y，都能找到 x 使 x + y = 10。
理由：对任意整数 y，取 **x = 10 − y**，它是整数（整数减整数仍是整数），且 (10 − y) + y = 10。
（博弈读法：对手先选 y，我看着 y 选 x = 10−y，必胜。）

### 4d）∃y ∃x P(x,y) —— **真**

举例：x = 5，y = 5，5 + 5 = 10。

### 第一性原理：b) 和 c) 的区别就是整章最重要的"量词顺序"

| 式子 | 谁先选 | x 能不能依赖 y | 结果 |
|---|---|---|---|
| ∃y ∀x | 我先定 y | 不能 | 要一个 y 通吃所有 x，不可能 |
| ∀y ∃x | 对手先定 y | 能 | 每个 y 都配一个 x = 10−y，可以 |

记牢：**∃∀ ⇒ ∀∃ 成立，反过来不成立。**

---

## 第 5 题（5 分）：n² 偶 ⇒ n 偶

### 怎么选方法

- 要证的是 ∀n ( Even(n²) → Even(n) )，形式是 p → q。
- **直接法试一下**：设 n² = 2k，要推 n 是偶数，只能 n = ±√(2k)，开根号后看不出奇偶 —— **走不通**（slides 1.6 p54 原话 "may not be useful"）。
- **换逆否**：¬q → ¬p，即 **n 是奇数 ⇒ n² 是奇数**。从 "n 奇" 出发可以写 n = 2k+1，直接平方展开，能算 —— 走得通。
- 这就是选逆否法的唯一标准：**哪一头能代公式、能做代数，就从哪一头出发。**

### 标准答案

**Proof (by contraposition).**
We prove the contrapositive: if n is odd, then n² is odd.
Assume n is odd. By definition, n = 2k + 1 for some integer k.
Then n² = (2k+1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1.
Since 2k² + 2k is an integer, n² = 2m + 1 with m = 2k² + 2k ∈ ℤ, so n² is odd by definition.
Hence "n odd ⇒ n² odd" holds, and since p→q ≡ ¬q→¬p, the original statement "if n² is even then n is even" is true. ∎

### 用反证法写也可以（tutorial 3 Q8b 的格式）

Assume, for contradiction, that n² is even **and** n is odd（即 ¬(p→q) ≡ p ∧ ¬q）. Then n = 2k+1, n² = 2(2k²+2k)+1 is odd, contradicting "n² is even". ∴ the statement holds. ∎

### 写证明题必须出现的四样东西（阅卷点）

1. 写明方法名（by contraposition / by contradiction / direct）。
2. 写明**假设什么**（Assume …）。
3. 用**定义**展开（n = 2k+1，where k is an integer）。
4. 结论处**回到定义**（"2k²+2k is an integer, so n² is odd"）—— 不写"是整数"这一句会被扣。

### 相关同类公式（奇偶性全家桶，期末可能换着考）

- 奇 + 奇 = 偶，偶 + 偶 = 偶，奇 + 偶 = 奇
- 奇 × 奇 = 奇，有一个偶因子积就是偶
- n 与 n² 奇偶性相同；n 与 n³ 奇偶性相同；n 偶 ⇔ 3n+1 奇（tutorial 3 Q9）
- 全部用 n = 2k 或 2k+1 代入展开证明。

---

## 第 6 题（8 分）：带余除法的存在唯一性

**题目**：固定整数 n ≥ 2。证明对每个整数 a，存在**唯一**的整数 q、r，满足 0 ≤ r < n 且 a = nq + r。
（这就是"除法算法 Division Algorithm"：q 是商，r 是余数。）

### 怎么选方法

"there exist unique" ⇒ **唯一性证明**，固定两步（slides 1.6 p80）：
1. **Existence**：造出一组 q、r 并验证满足条件。
2. **Uniqueness**：假设有两组 (q₁,r₁) 和 (q₂,r₂) 都满足，推出 q₁=q₂ 且 r₁=r₂。

卷面手写"唯一的?"说明当时没意识到要分两部分写。**只写存在不写唯一，最多一半分。**

### 标准答案

**Proof.**

**(Existence)**
Let q = ⌊a/n⌋（不超过 a/n 的最大整数）and r = a − nq.
By definition of floor, q ≤ a/n < q + 1. Multiplying by n > 0: nq ≤ a < nq + n, so 0 ≤ a − nq < n, i.e. 0 ≤ r < n.
Both q and r are integers, and a = nq + r. So such q, r exist.

（若不想用 floor，可以用"良序原理"写：令 S = { a − nk : k ∈ ℤ, a − nk ≥ 0 }。S 非空（取 k = −|a| 即可，因为 a + n|a| ≥ a + |a| ≥ 0）。由良序原理 S 有最小元 r = a − nq ≥ 0。若 r ≥ n，则 r − n = a − n(q+1) ∈ S 且更小，矛盾，故 r < n。）

**(Uniqueness)**
Suppose a = nq₁ + r₁ = nq₂ + r₂ with 0 ≤ r₁ < n and 0 ≤ r₂ < n.
Subtracting: n(q₁ − q₂) = r₂ − r₁. So n divides r₂ − r₁.
But from 0 ≤ r₁, r₂ < n we get −n < r₂ − r₁ < n.
The only multiple of n strictly between −n and n is 0, so r₂ − r₁ = 0, i.e. r₁ = r₂.
Then n(q₁ − q₂) = 0 and n ≠ 0 give q₁ = q₂.
Hence q and r are unique. ∎

### 第一性原理

- **存在性**本质是"把答案构造出来"：余数就是 a 减掉 n 的最大整数倍。
- **唯一性**的通用模板：**"设有两个，证明它们相等"**。这是 ∃!x P(x) ≡ ∃x ( P(x) ∧ ∀y ( P(y) → y = x ) ) 的后半段。
- 这里"相等"的关键武器是**"被 n 整除且绝对值小于 n 的整数只能是 0"**——余数范围 0 ≤ r < n 的作用就在这一步，题目给的每个条件都要被用到。

### 同类题模板（tutorial 3 Q10、slides p81）

> Show that if a ≠ 0, there is a unique real r with ar + b = 0.
> Existence: r = −b/a works. Uniqueness: if as + b = 0 too, then ar = as, a ≠ 0 ⇒ r = s.

---

# 第 3 部分：题型通用解法模板（期末 logic 部分一定会从这里面出）

## 模板 A：英文 → 逻辑式（1a 型，tutorial 2 Q6/Q7）

1. 列出谓词和各变量的域。
2. 圈出量词词：every/all/any/each/no one → ∀；some/a/there is/at least one → ∃；exactly one → ∃+∀ 组合。
3. 圈出联结词：if-then / only if / iff / and / or / not / unless(= if not)。
4. **∀ 配 →，∃ 配 ∧**。
5. 每个变量都要有量词；注意量词作用域，"attends all lectures"这种限定要放在前件里面。
6. 检查：把式子直译回英文读一遍，和原句意思是否一致？

## 模板 B：逻辑式 → 英文（tutorial 2 Q3/Q4/Q5）

从左到右读量词（∀ "每个"，∃ "有一个"），然后把谓词套回去，最后润色成自然句子。嵌套不同类型量词时，注意谁依赖谁。

## 模板 C：判断等价（第 2 题，tutorial 1 Q3）

消 ↔ → 消 → → De Morgan → 分配/吸收 → 两边对齐；不行就给具体赋值反例并算出两边值。每步写规则名。

## 模板 D：形式推理 / 论证是否有效（1b，tutorial 3 Q1/Q2）

1. 翻译所有前提和结论。
2. 对带 ∀ 的前提先 **UI** 到具体对象；带 ∃ 的先 **EI**（给新名字 c）。
3. 用 MP / MT / 三段论等一步步推；需要时 **EG** 回到 ∃。
4. 写成 Step | Reason 表。
5. 推不出来时：检查是不是"肯定后件"或"否定前件"；写出谬误名，并给一个前提全真结论假的场景。

## 模板 E：量词语句真假（第 4 题，tutorial 2 Q1/Q2）

从左读到右；∀ 真给通用论证/假给反例；∃ 真给例子/假用反证说明全都不行；盯紧域。

## 模板 F：量词式否定（tutorial 2 Q8）

¬ 逐层往里推，每穿过一个量词翻转一次（∀↔∃），到谓词前停下。遇到 → 先改成 ¬p∨q 再 De Morgan：¬(p→q) ≡ p∧¬q；¬(p↔q) ≡ p↔¬q。

## 模板 G：证明题（第 5、6 题，tutorial 3 Q4–Q13）

| 看到 | 用 |
|---|---|
| if p then q，从 p 能算 | 直接证明 |
| if p then q，从 p 算不动（开根号、"n² 是偶数"）| 逆否 |
| "是无理数"、"没有整数解"、"不可能" | 反证 |
| iff | 两个方向各证一次 |
| 绝对值、奇偶、正负、min/max | 分情况 |
| n ≤ 某个小数 | 穷举 |
| there exists | 举例 |
| unique / exactly one | 存在 + 唯一（设两个推相等） |

证明四件套：**方法名、Assume、定义展开、回到定义收尾**。

---

# 第 4 部分：卷面失分复盘与期末自测

## 卷面扣分分析

| 位置 | 扣分 | 最可能的原因 | 期末怎么防 |
|---|---|---|---|
| 1a | −3 | H3 漏写 ∀x（手写只有 M(x)→P(x)）；H1 量词位置可能有误 | 每个变量找到自己的量词；"attends all lectures" 的 ∀y 必须在前件里 |
| 1b | −5 | ii)/iii) 误判为可推，或判了"不可推"但没说谬误名、没给反例 | "¬前件" 和 "后件" 不能推任何东西；不可推必写反例场景 |
| 4 | −2 | b) 或其他小问只写 True/False 没理由 | ∃∀ 为假要用反证说明；∀∃ 为真要写出 x = 10 − y |
| 6 | 疑问"唯一的?" | 没写 uniqueness 部分 | unique 必分两段 |

## 期末自测（能不看答案做出来才算过关）

1. 默写 1.1 的真值表和 1.4 的等价律总表（含蕴含、双条件四条）。
2. 用两种方法写"exactly one person loves Mary"。
3. 写出 ¬∀x∃y (P(x,y) → Q(x)) 的否定，¬ 只在谓词前。
4. 判断 ∃x∀y (x·y = 0) 与 ∀y∃x (x·y = 0) 在实数域的真假并说明。
5. 不用真值表证明 ¬(p↔q) ≡ p↔¬q（tutorial 1 Q3b）。
6. 用 Step/Reason 表证明："所有本班学生都通过了考试；有一个本班学生没读书；∴ 有人通过了考试但没读书"（slides 1.5 p32）。
7. 用逆否法证：若 3n+2 是奇数则 n 是奇数；用反证法证 √2 是无理数。
8. 证明：若 a、b 为实数且 a ≠ 0，则存在唯一实数 r 使 ar + b = 0。
9. 重做本试卷第 1 题 b)，三问都要写满推理表或反例场景。
