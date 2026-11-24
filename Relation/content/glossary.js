// 英文术语表（Relation 大章：Ch2.1–2.3 集合与函数 · Ch9.1–9.3 关系与闭包 · Ch9.5–9.6 等价与偏序/格）
export const CATS = {
  exam: '试卷指令词与答题高频短语',
  set: '集合论（Ch2.1–2.2）',
  fn: '函数与映射（Ch2.3）',
  rel: '二元关系与性质（Ch9.1–9.3）',
  closure: '关系运算、矩阵与闭包（Ch9.3 / 5.4）',
  equiv: '等价关系与划分（Ch9.5）',
  poset: '偏序、Hasse 图与格（Ch9.6）',
};

export const GLOSSARY = [
  // ---- 试卷指令词 ----
  { en: 'discuss in detail', zh: '详细讨论（并证明）', cat: 'exam', def: '不能只写最终区间或结论！必须说明原函数为何不满足条件、给出限制后的域与余域，并逐步证明单射与满射。', alias: ['in detail'] },
  { en: 'restricted domain', zh: '限制定义域', cat: 'exam', def: '把原定义域缩小为子集 D ⊆ A，以消去多对一冲突（从而变成单射）。', alias: ['restrict the domain', 'restricting the domain'] },
  { en: 'restricted codomain', zh: '限制余域', cat: 'exam', def: '把余域缩小为实际值域 Range(f)，使每个余域元素都有原像（从而变成满射）。', alias: ['restrict the codomain'] },
  { en: 'represented by', zh: '由……表示', cat: 'exam', def: '"relations represented by the matrices" = 由下列 0-1 矩阵所表示的关系。' },
  { en: 'find the matrices that represent', zh: '求表示……的矩阵', cat: 'exam', def: '答案必须写成 0-1 矩阵形式，注意行列维度与下标顺序。' },
  { en: 'determine whether', zh: '判断……是否成立', cat: 'exam', def: '对每一小问明确写出 Yes / No（或 True / False），考卷要求 explain why 时必须附证明或具体反例。' },
  { en: 'prove or disprove', zh: '证明或否证', cat: 'exam', def: '先判断真假：若恒成立则用定义严格证明；若不成立则构造一个具体有限反例。' },
  { en: 'explain why', zh: '解释原因', cat: 'exam', def: '给出数学定义层面的理由：例如“不是全序，因为 5 ∤ 13 且 13 ∤ 5，二者不可比”。' },
  { en: 'with respect to', zh: '关于……（某种关系/序）', cat: 'exam', def: '"equivalence class of a with respect to R" = 元素 a 关于关系 R 的等价类 [a]_R。' },
  { en: 'counterexample', zh: '反例', cat: 'exam', def: '推翻全称性质的具体元素或有序对，必须明确写出元素数值并验证前件真、后件假。', alias: ['counterexamples'] },
  { en: 'vacuously true', zh: '空真（前件恒假自动为真）', cat: 'exam', def: '当蕴含式“若 (a,b)∈R 且 (b,c)∈R 则…”找不到任何满足前件的元素对时，该性质自动成立！传递性与反对称性最常出现空真。' },
  { en: 'respectively', zh: '分别地', cat: 'exam', def: '前后两组概念按顺序一一对应。' },

  // ---- 集合论 ----
  { en: 'unordered collection', zh: '无序聚集', cat: 'set', def: '集合的本质特征：元素无顺序之分，重复写出同一元素不改变集合，如 {1,3,3} = {3,1}。' },
  { en: 'element', zh: '元素（成员）', cat: 'set', def: '属于集合的对象，记作 a ∈ A；不属于记作 a ∉ A。同义词：member。', alias: ['elements', 'member', 'members'] },
  { en: 'set builder notation', zh: '集合构造记法（描述法）', cat: 'set', def: '形如 {x ∈ Z | |x| ≤ 3}，竖线左边是代表元素，右边是谓词条件 P(x)。', alias: ['set builder'] },
  { en: 'empty set', zh: '空集', cat: 'set', def: '不含任何元素的集合，记作 ∅ 或 {}。注意 {∅} 不是空集，而是含 1 个元素 ∅ 的单元素集！', alias: ['null set'] },
  { en: 'singleton set', zh: '单元素集（单元集）', cat: 'set', def: '恰好只含 1 个元素的集合，如 {2} 或 {∅}。', alias: ['singleton'] },
  { en: 'universal set', zh: '全集', cat: 'set', def: '当前讨论范围内一切对象的总集合，记作 U。补集 Ā 必须相对于全集 U 定义。' },
  { en: 'Venn diagram', zh: '文氏图（维恩图）', cat: 'set', def: '用矩形表全集 U、圆圈表子集的几何示意图，常用于检验集合恒等式与容斥计数。', alias: ['Venn diagrams'] },
  { en: 'subset', zh: '子集', cat: 'set', def: 'A ⊆ B ⇔ ∀x (x ∈ A → x ∈ B)。空集是任何集合的子集，任何集合也是自身的子集。', alias: ['subsets'] },
  { en: 'proper subset', zh: '真子集', cat: 'set', def: 'A ⊂ B ⇔ (A ⊆ B) ∧ (A ≠ B)，即 B 中至少有一个不属于 A 的元素。', alias: ['proper subsets'] },
  { en: 'cardinality', zh: '基数（元素个数）', cat: 'set', def: '有限集合 S 中不同元素的个数，记作 |S|。例如 |∅|=0，|{∅}|=1。' },
  { en: 'power set', zh: '幂集', cat: 'set', def: '集合 S 的所有子集组成的集合，记作 P(S)。若 |S|=n，则 |P(S)| = 2ⁿ。', alias: ['power sets'] },
  { en: 'ordered n-tuple', zh: '有序 n 元组', cat: 'set', def: '(a₁, a₂, …, aₙ)：顺序与重数都重要，当且仅当每个位置对应相等时两个元组相等。', alias: ['n-tuple', 'ordered tuple'] },
  { en: 'ordered pair', zh: '有序对（序偶）', cat: 'set', def: '有序二元组 (a, b)。当 a ≠ b 时 (a, b) ≠ (b, a)。它是定义关系与函数的原子单位。', alias: ['ordered pairs'] },
  { en: 'Cartesian product', zh: '笛卡尔积（直积）', cat: 'set', def: 'A × B = {(a, b) | a ∈ A ∧ b ∈ B}，基数 |A × B| = |A|·|B|。注意 A×B×C ≠ (A×B)×C。', alias: ['Cartesian products'] },
  { en: 'truth set', zh: '真值集', cat: 'set', def: '论域 D 中使谓词 P(x) 为真的所有元素构成的集合 {x ∈ D | P(x)}。连接第 1 章逻辑与第 2 章集合的桥梁。', alias: ['truth sets'] },
  { en: 'union', zh: '并集', cat: 'set', def: 'A ∪ B = {x | x ∈ A ∨ x ∈ B}。对应逻辑“或”与位串按位 OR。' },
  { en: 'intersection', zh: '交集', cat: 'set', def: 'A ∩ B = {x | x ∈ A ∧ x ∈ B}。对应逻辑“且”与位串按位 AND。' },
  { en: 'disjoint', zh: '不相交（互斥）', cat: 'set', def: 'A ∩ B = ∅，即两集合没有任何公共元素。划分要求各块两两不相交 (pairwise disjoint)。', alias: ['pairwise disjoint'] },
  { en: 'set difference', zh: '差集', cat: 'set', def: 'A − B = {x | x ∈ A ∧ x ∉ B} = A ∩ B̄，读作 complement of B with respect to A。', alias: ['difference'] },
  { en: 'complement', zh: '补集', cat: 'set', def: 'Ā = U − A = {x ∈ U | x ∉ A}。在关系中 R̄ = (A × B) − R（矩阵 0 和 1 互换）。', alias: ['complementary'] },
  { en: 'symmetric difference', zh: '对称差（异或）', cat: 'set', def: 'A ⊕ B = (A − B) ∪ (B − A) = (A ∪ B) − (A ∩ B)，恰属于其中一个集合。矩阵按位异或。' },
  { en: 'inclusion-exclusion', zh: '容斥原理', cat: 'set', def: '|A∪B| = |A|+|B|−|A∩B|；三集合为“加单、减双、加三交”。', alias: ['Principle of Inclusion-Exclusion'] },
  { en: 'bit string', zh: '位串（比特串）', cat: 'set', def: '由 0 和 1 组成的序列。固定全集顺序后，子集可用长度为 n 的位串表示，集合运算化为位运算。', alias: ['bit strings'] },

  // ---- 函数 ----
  { en: 'function', zh: '函数（映射）', cat: 'fn', def: 'f: A → B 为给 A 中每个元素指派 B 中恰好一个元素的规则。作为关系，每行恰好只有一个 1。', alias: ['functions', 'mapping', 'transformation'] },
  { en: 'domain', zh: '定义域', cat: 'fn', def: '函数 f: A → B 的输入集合 A。每个元素都必须有定义。' },
  { en: 'codomain', zh: '余域（陪域）', cat: 'fn', def: '函数 f: A → B 声明的目标集合 B（允许有没被映射到的元素）。' },
  { en: 'range', zh: '值域（像集）', cat: 'fn', def: 'Range(f) = {f(a) | a ∈ A} ⊆ B，即 B 中真正被某个输入命中的元素集合。' },
  { en: 'image', zh: '像', cat: 'fn', def: '若 f(a) = b，则 b 称为 a 的像 (image)。', alias: ['images'] },
  { en: 'preimage', zh: '原像', cat: 'fn', def: '若 f(a) = b，则 a 称为 b 的一个原像 (preimage)。slides/tutorial 有时写作 coimage。', alias: ['preimages', 'coimage'] },
  { en: 'one-to-one', zh: '单射（一对一）', cat: 'fn', def: 'Injective：∀a,b (f(a)=f(b) → a=b)，即不同输入绝不撞车到同一输出。水平线至多交图像 1 点。', alias: ['injective', 'injection'] },
  { en: 'onto', zh: '满射（映上）', cat: 'fn', def: 'Surjective：∀b ∈ B ∃a ∈ A (f(a)=b)，即 Range(f) = Codomain(f)，余域无闲置元素。', alias: ['surjective', 'surjection'] },
  { en: 'one-to-one correspondence', zh: '双射（一一对应）', cat: 'fn', def: 'Bijection：既单射 (one-to-one) 又满射 (onto)。充要条件是函数可逆 (invertible)！', alias: ['bijection', 'bijective'] },
  { en: 'identity function', zh: '恒等函数', cat: 'fn', def: 'ι_A(x) = x（∀x ∈ A），把每个元素映到自身，必是双射。' },
  { en: 'inverse function', zh: '反函数（逆函数）', cat: 'fn', def: '仅当 f: A → B 是双射时存在 f⁻¹: B → A，满足 f⁻¹(b)=a ⇔ f(a)=b。注意与“逆关系 R⁻¹”区分：任何关系都有逆关系，但只有双射函数才有反函数！', alias: ['invertible', 'not invertible'] },
  { en: 'composition of functions', zh: '函数复合', cat: 'fn', def: '(f ∘ g)(x) = f(g(x))：先算右边的内层函数 g，再算左边外层函数 f！一般不满足交换律。', alias: ['composition'] },
  { en: 'strictly increasing', zh: '严格递增', cat: 'fn', def: '∀x<y (f(x)<f(y))。严格单调函数在其定义域上自动是单射 (one-to-one)。', alias: ['strictly decreasing'] },
  { en: 'floor function', zh: '向下取整函数', cat: 'fn', def: '⌊x⌋：不超过 x 的最大整数，如 ⌊-1.2⌋ = -2。', alias: ['floor'] },
  { en: 'ceiling function', zh: '向上取整函数', cat: 'fn', def: '⌈x⌉：不小于 x 的最小整数，如 ⌈n/2⌉ 从 Z 到 Z 是满射但非单射。', alias: ['ceiling'] },

  // ---- 二元关系与性质 ----
  { en: 'binary relation', zh: '二元关系', cat: 'rel', def: '从 A 到 B 的二元关系 R 是笛卡尔积 A × B 的任意子集 R ⊆ A × B。记 (a,b)∈R 为 a R b。', alias: ['relation', 'relations'] },
  { en: 'relation on a set', zh: '集合 A 上的关系', cat: 'rel', def: '从 A 到自身的二元关系 R ⊆ A × A。n 元集上共有 2^(n²) 个不同的二元关系。' },
  { en: 'directed graph', zh: '有向图', cat: 'rel', def: '用顶点表示元素、有向边 a → b 表示 (a,b)∈R 的图形，简称 digraph。', alias: ['digraph', 'directed graphs'] },
  { en: 'in-degree', zh: '入度', cat: 'rel', def: '指向该顶点的有向边条数（对应关系矩阵该列 1 的个数）。' },
  { en: 'out-degree', zh: '出度', cat: 'rel', def: '从该顶点发出的有向边条数（对应关系矩阵该行 1 的个数；函数要求每点出度恒为 1）。' },
  { en: 'loop', zh: '自环', cat: 'rel', def: '从顶点指向自身的边 (a, a)，对应 0-1 矩阵主对角线上的 1。', alias: ['loops', 'self-loop'] },
  { en: 'zero-one matrix', zh: '0-1 关系矩阵', cat: 'rel', def: 'mᵢⱼ = 1 若 (aᵢ, bⱼ)∈R，否则 mᵢⱼ = 0。也称 connection matrix。', alias: ['connection matrix', 'matrix'] },
  { en: 'reflexive', zh: '自反的', cat: 'rel', def: '∀a∈A ((a,a)∈R)：每个顶点都有自环，矩阵主对角线全为 1。注意 A 非空时空关系不自反。', alias: ['reflexivity'] },
  { en: 'irreflexive', zh: '反自反的', cat: 'rel', def: '∀a∈A ((a,a)∉R)：没有任何顶点有自环，矩阵主对角线全为 0。注意“不自反 ≠ 反自反”！' },
  { en: 'symmetric', zh: '对称的', cat: 'rel', def: '∀a,b ((a,b)∈R → (b,a)∈R)：有去必有回，矩阵满足 M = Mᵀ。', alias: ['symmetry'] },
  { en: 'antisymmetric', zh: '反对称的', cat: 'rel', def: '∀a,b (((a,b)∈R ∧ (b,a)∈R) → a=b)：不同顶点之间绝无双向边（允许自环！）。可与对称同时成立。', alias: ['antisymmetry'] },
  { en: 'asymmetric', zh: '非对称的', cat: 'rel', def: '∀a,b ((a,b)∈R → (b,a)∉R)：既无双向边、也无自环！等价于“反自反 + 反对称”。' },
  { en: 'transitive', zh: '传递的', cat: 'rel', def: '∀a,b,c (((a,b)∈R ∧ (b,c)∈R) → (a,c)∈R)：凡两步可达必一步直达，即 R² ⊆ R。', alias: ['transitivity'] },
  { en: 'n-ary relation', zh: 'n 元关系', cat: 'rel', def: 'R ⊆ A₁ × A₂ × … × Aₙ，是关系数据库表（Table）的数学模型：属性为列，记录为 n 元组。', alias: ['n-ary relations'] },
  { en: 'primary key', zh: '主键', cat: 'rel', def: 'n 元关系中能唯一标识每一条元组（值互不相同）的属性域。' },

  // ---- 关系运算与闭包 ----
  { en: 'inverse relation', zh: '逆关系', cat: 'closure', def: 'R⁻¹ = {(b,a) | (a,b)∈R}：把所有有向边箭头反向，矩阵直接转置 M_(R⁻¹) = M_R^T。任何关系都有逆关系！' },
  { en: 'complementary relation', zh: '补关系', cat: 'closure', def: 'R̄ = {(a,b)∈A×B | (a,b)∉R}：矩阵所有 0 变 1、1 变 0。' },
  { en: 'composite of relations', zh: '关系的复合', cat: 'closure', def: '(a,c) ∈ S ∘ R ⇔ ∃b ((a,b)∈R ∧ (b,c)∈S)：先走右边 R，再走左边 S！矩阵运算为左放 M_R、右放 M_S 做布尔乘积 M_R ⊙ M_S。', alias: ['composite'] },
  { en: 'boolean product', zh: '布尔矩阵乘积', cat: 'closure', def: '将普通矩阵乘法中的 × 换成 ∧（且）、+ 换成 ∨（或）：cᵢⱼ = ∨_k (aᵢₖ ∧ bₖⱼ)。' },
  { en: 'closure', zh: '闭包', cat: 'closure', def: '包含原关系 R 且满足指定性质的“最小”关系（即只补最少必要的边）。', alias: ['closures'] },
  { en: 'reflexive closure', zh: '自反闭包', cat: 'closure', def: 'r(R) = R ∪ Δ：把缺失的自环全部补齐，矩阵主对角线全部置 1。' },
  { en: 'symmetric closure', zh: '对称闭包', cat: 'closure', def: 's(R) = R ∪ R⁻¹：把所有单向边补成双向边，矩阵取 M_R ∨ M_R^T。' },
  { en: 'transitive closure', zh: '传递闭包', cat: 'closure', def: 't(R) = R* = R¹ ∪ R² ∪ … ∪ Rⁿ（连通性关系）：凡有向路径可达的顶点对全部补上直达边。', alias: ['connectivity relation'] },
  { en: 'diagonal relation', zh: '对角线关系（恒等关系）', cat: 'closure', def: 'Δ = {(a,a) | a∈A}，矩阵为单位阵 Iₙ。' },
  { en: "Warshall's algorithm", zh: 'Warshall 传递闭包算法', cat: 'closure', def: 'O(n³) 动态规划求传递闭包：构造 W₀…Wₙ，第 k 步用第 k 列与第 k 行的 1 十字交叉补 1：wᵢⱼ^[k] = wᵢⱼ^[k-1] ∨ (wᵢₖ^[k-1] ∧ wₖⱼ^[k-1])。', alias: ['Warshall'] },

  // ---- 等价关系与划分 ----
  { en: 'equivalence relation', zh: '等价关系', cat: 'equiv', def: '同时满足自反 (reflexive)、对称 (symmetric)、传递 (transitive) 的关系，是对“相等 =”的抽象。', alias: ['equivalence relations'] },
  { en: 'congruence modulo m', zh: '模 m 同余', cat: 'equiv', def: 'a ≡ b (mod m) ⇔ m | (a − b) ⇔ a 与 b 除以正整数 m 余数相同。最经典的等价关系，共有 m 个等价类。', alias: ['congruence'] },
  { en: 'equivalence class', zh: '等价类', cat: 'equiv', def: '[a]_R = {s ∈ A | (a,s) ∈ R}，即所有与 a 等价的元素抱成的团。两个等价类要么完全相等，要么完全不相交！', alias: ['equivalence classes'] },
  { en: 'representative', zh: '代表元', cat: 'equiv', def: '等价类 [a]_R 中的任意一个元素 b ∈ [a]_R 都可以作为该类的代表元，且 [b]_R = [a]_R。' },
  { en: 'partition', zh: '划分', cat: 'equiv', def: '把集合 A 切成若干子集 Aᵢ，满足：①每块非空 Aᵢ≠∅；②两两不相交 Aᵢ∩Aⱼ=∅；③并集等于 A。等价类的集合必构成划分，反之亦然。', alias: ['partitions'] },

  // ---- 偏序、Hasse 图与格 ----
  { en: 'partial ordering', zh: '偏序关系（自反偏序）', cat: 'poset', def: '同时满足自反 (reflexive)、反对称 (antisymmetric)、传递 (transitive) 的关系，记作 ≼。试卷也称 reflexive partial order relation。', alias: ['partial orderings', 'partial order', 'reflexive partial order relation', 'reflexive partial order'] },
  { en: 'poset', zh: '偏序集', cat: 'poset', def: 'Partially Ordered Set (S, ≼)：一个集合 S 配上它上面的一个偏序关系 ≼。', alias: ['partially ordered set', 'posets'] },
  { en: 'dual', zh: '对偶偏序集', cat: 'poset', def: '(S, R⁻¹) 是偏序集 (S, R) 的对偶（即把偏序方向完全倒置，Hasse 图上下翻转），它依然是偏序集。', alias: ['duals'] },
  { en: 'divisibility', zh: '整除关系', cat: 'poset', def: 'a | b ⇔ ∃k∈Z (b = ak)。在正整数子集上是经典偏序关系（注意在全体整数 Z 上不反对称，因为 2|-2 且 -2|2！）。', alias: ['divides'] },
  { en: 'comparable', zh: '可比的', cat: 'poset', def: '偏序集中 a ≼ b 或 b ≼ a 至少成立一个；若两者都不成立（如整除下的 5 和 13），则称不可比 (incomparable)。', alias: ['incomparable', 'comparability'] },
  { en: 'total order', zh: '全序（线序 / 链）', cat: 'poset', def: '任意两个元素都可比的偏序关系，Hasse 图退化为一条竖直单链 (chain)。同义词：linear order。', alias: ['totally ordered', 'linear order', 'chain'] },
  { en: 'well-ordered set', zh: '良序集', cat: 'poset', def: '(S, ≼) 是全序集，且它的每一个非空子集都有最小元 (least element)。例如 (Z⁺, ≤) 是良序集，而 (Z, ≤) 不是。', alias: ['well-ordered'] },
  { en: 'lexicographic order', zh: '字典序（词典序）', cat: 'poset', def: '先比第一分量 a₁ ≺₁ b₁；若相等则比第二分量 a₂ ≺₂ b₂，依此类推。字符串查字典即为其特例。', alias: ['lexicographic ordering'] },
  { en: 'Hasse diagram', zh: '哈斯图（Hasse 图）', cat: 'poset', def: '有限偏序集的极简图：省去全部自环、省去全部可由传递推知的跨级边、小元素画在下方省去向上箭头。', alias: ['Hasse diagrams'] },
  { en: 'covering relation', zh: '覆盖关系', cat: 'poset', def: 'y covers x ⇔ x ≺ y 且不存在中间元素 z 满足 x ≺ z ≺ y。Hasse 图里画出的每一条连线恰好就是一对覆盖关系！', alias: ['covers'] },
  { en: 'maximal element', zh: '极大元', cat: 'poset', def: '子集 B 中“头顶上没有其他 B 中元素”的元素（¬∃x∈B, a ≺ x）。可以有多个！', alias: ['maximal elements', 'maximal'] },
  { en: 'minimal element', zh: '极小元', cat: 'poset', def: '子集 B 中“脚底下没有其他 B 中元素”的元素（¬∃x∈B, x ≺ a）。有限非空子集至少有一个极小元，也可有多个！', alias: ['minimal elements', 'minimal'] },
  { en: 'greatest element', zh: '最大元', cat: 'poset', def: 'b ∈ B 且 ∀x∈B (x ≼ b)：必须属于子集 B 内部，且统领 B 中一切元素！若存在必唯一；若有 ≥2 个极大元则最大元必不存在。', alias: ['greatest elements'] },
  { en: 'least element', zh: '最小元', cat: 'poset', def: 'a ∈ B 且 ∀x∈B (a ≼ x)：必须属于子集 B 内部，且排在 B 中一切元素之下！若存在必唯一；若有 ≥2 个极小元则最小元必不存在。', alias: ['least elements'] },
  { en: 'upper bound', zh: '上界', cat: 'poset', def: '在全集 S 中满足 ∀b∈B (b ≼ u) 的元素 u ∈ S（注意：上界不必属于子集 B！）。', alias: ['upper bounds'] },
  { en: 'lower bound', zh: '下界', cat: 'poset', def: '在全集 S 中满足 ∀b∈B (l ≼ b) 的元素 l ∈ S（注意：下界不必属于子集 B！）。', alias: ['lower bounds'] },
  { en: 'least upper bound', zh: '最小上界（上确界 LUB）', cat: 'poset', def: 'lub(B) / sup(B)：所有上界组成的集合中的“最小元 (least element)”。若存在必唯一。', alias: ['lub', 'supremum'] },
  { en: 'greatest lower bound', zh: '最大下界（下确界 GLB）', cat: 'poset', def: 'glb(B) / inf(B)：所有下界组成的集合中的“最大元 (greatest element)”。若存在必唯一。', alias: ['glb', 'infimum'] },
  { en: 'lattice', zh: '格', cat: 'poset', def: '偏序集 (L, ≼) 中任意一对元素 {a, b} 都同时存在唯一的最小上界 lub (a∨b) 和唯一的最大下界 glb (a∧b)。', alias: ['lattices'] },
  { en: 'bounded lattice', zh: '有界格', cat: 'poset', def: '同时拥有全集最大元 1（top）和全集最小元 0（bottom）的格。一切有限格必是有界格！' },
  { en: 'complemented lattice', zh: '有补格', cat: 'poset', def: '有界格中每个元素 x 都存在补元 y，满足 x ∨ y = 1 且 x ∧ y = 0。典型例子：(P(S), ⊆)。' },
];

const CAT_DEFAULT_SECTION = {
  exam: 's03',
  set: 's01',
  fn: 's02',
  rel: 's07',
  closure: 's06',
  equiv: 's09',
  poset: 's11',
};
const SPECIFIC_SECTION = {
  'one-to-one': 's03',
  onto: 's03',
  'one-to-one correspondence': 's03',
  'inverse function': 's03',
  'binary relation': 's04',
  'directed graph': 's04',
  'zero-one matrix': 's04',
  'inverse relation': 's04',
  'complementary relation': 's04',
  'composite of relations': 's05',
  'boolean product': 's05',
  'partial ordering': 's10',
  poset: 's10',
  divisibility: 's10',
  'Hasse diagram': 's10',
  'covering relation': 's10',
  'total order': 's12',
  lattice: 's12',
  'bounded lattice': 's12',
  'complemented lattice': 's12',
};
for (const item of GLOSSARY) {
  if (!item.sectionId) {
    item.sectionId = SPECIFIC_SECTION[item.en] || CAT_DEFAULT_SECTION[item.cat] || 's01';
  }
}

const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
export const TERM_INDEX = (() => {
  const m = new Map();
  for (const t of GLOSSARY) {
    m.set(norm(t.en), t);
    for (const a of t.alias || []) m.set(norm(a), t);
  }
  return m;
})();
export const lookupTerm = (s) => TERM_INDEX.get(norm(s));
export const ALL_PATTERNS = [...TERM_INDEX.keys()].sort((a, b) => b.length - a.length);
