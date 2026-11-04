# Discrete Mathematics - Test 01

> 来源：`midterm1.jpg`  
> 考试范围：Logic and Proof — Ch1.1, 1.2: Propositional Logic and Equivalences；Ch1.3, 1.4: Predicates and Quantifiers；Ch1.5, 1.6: Rules of Inference and Proofs。  
> 以下保留原卷的英文题干、编号和分值；手写内容单独列为“手写附注”。

**Total Marks: 60**

## 1) (24 marks)

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

### a) (9 marks)

Translate Hypotheses 1–3 into formal logical expressions using the predicates defined above.

### b) (15 marks)

Based on the hypothesis above, determine if each conclusion can be drawn. If yes, write down the proof in detail. If not, explain why. No truth table should be used.

**手写附注：**

- 第 1 题旁的形式化提示：
  - $M(x)\rightarrow P(x)$
  - $\forall x\,(\exists y\,A(x,y)\leftrightarrow M(x))$
- 卷面扣分标记：第 1 题附近有圈出的 “$-3$”，第 b) 问右侧有 “$-5$”。

## 2) (15 marks)

Show whether the following pairs of propositions are equivalent. If not, propose a counterexample. Do not use truth tables.

a) $((p\land\neg q)\lor(p\land r))$ and $(p\land(q\rightarrow r))$

b) $(p\rightarrow(q\rightarrow r))$ and $((p\land q)\rightarrow r)$

c) $p$ and $\forall x\,(\neg p\rightarrow(p\land r(x)))$, assume $p$ is independent to $x$, and the domain of $x$ is nonempty

## 4) (8 marks)

Given $P(x,y):x+y=10$, and the domain of $x$ and $y$ is integers. Decide which of the following formulas are true, giving justification.

a) $\forall y\,\forall x\,P(x,y)$

b) $\exists y\,\forall x\,P(x,y)$

c) $\forall y\,\exists x\,P(x,y)$

d) $\exists y\,\exists x\,P(x,y)$

**手写附注：**“整”（对应题干中的 integers）；下方有扣分标记 “$-2$”。

## 5) (5 marks)

Prove or disprove that for all integers $n$, if $n^2$ is even, then $n$ must also be even.

**手写附注：**odd — 奇；even — 偶。

## 6) (8 marks)

Let $2\leq n$ be a fixed integer. Prove that for every integer $a$ there exist unique integers $q$ and $r$ with $0\leq r<n$ such that $a=nq+r$.

**手写附注：**“唯一的?”；另写有 $2\leq n$，并圈出 $n\geq2$。

---

Discrete Mathematics – Test 1

1
