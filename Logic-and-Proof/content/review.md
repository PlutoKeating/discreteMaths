## 卷面扣分分析

| 位置 | 扣分 | 最可能的原因 | 期末怎么防 |
|---|---|---|---|
| 1a | −3 | $H_3$ 漏写 $\forall x$（手写只有 $M(x)\to P(x)$）；$H_1$ 量词位置可能有误 | 每个变量找到自己的量词；"attends all lectures" 的 $\forall y$ 必须在前件里 |
| 1b | −5 | ii) / iii) 误判为可推，或判了"不可推"但没说谬误名、没给反例 | ==¬前件 和 后件 不能推任何东西==；不可推必写反例场景 |
| 4 | −2 | b) 或其他小问只写 True / False 没理由 | $\exists\forall$ 为假要用反证说明；$\forall\exists$ 为真要写出 $x=10-y$ |
| 6 | 疑问"唯一的?" | 没写 uniqueness 部分 | ==unique 必分两段== |

## 期末自测（能不看答案做出来才算过关）

1. 默写 1.1 的真值表和 1.4 的等价律总表（含蕴含、双条件四条）。
2. 用两种方法写 "exactly one person loves Mary"。
3. 写出 $\neg\forall x\exists y\,(P(x,y)\to Q(x))$ 的否定，$\neg$ 只在谓词前。
4. 判断 $\exists x\forall y\,(x\cdot y=0)$ 与 $\forall y\exists x\,(x\cdot y=0)$ 在实数域的真假并说明。
5. 不用真值表证明 $\neg(p\leftrightarrow q)\equiv p\leftrightarrow\neg q$（tutorial 1 Q3b）。
6. 用 Step / Reason 表证明："所有本班学生都通过了考试；有一个本班学生没读书；∴ 有人通过了考试但没读书"（slides 1.5 p32）。
7. 用逆否法证：若 $3n+2$ 是奇数则 $n$ 是奇数；用反证法证 $\sqrt2$ 是无理数。
8. 证明：若 $a,b$ 为实数且 $a\neq 0$，则存在唯一实数 $r$ 使 $ar+b=0$。
9. 重做本试卷第 1 题 b)，三问都要写满推理表或反例场景。

<div class="callout"><div class="ttl">自测 3、4 参考答案（先自己做再看）</div>

- 3：

$$
\neg\forall x\exists y\,(P(x,y)\to Q(x))\equiv\exists x\forall y\,\neg(P(x,y)\to Q(x))\equiv\exists x\forall y\,(P(x,y)\land\neg Q(x))
$$

- 4：$\exists x\forall y\,(xy=0)$ 真（取 $x=0$）；$\forall y\exists x\,(xy=0)$ 真（对任意 $y$ 取 $x=0$）。注意 $\exists\forall$ 为真时 $\forall\exists$ 一定真。

</div>
