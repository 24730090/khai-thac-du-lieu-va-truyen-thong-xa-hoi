/**
 * F8 — Cây quyết định ID3. Slide Bài 5.
 *
 * Khuôn trình bày bám docs/format-trinh-bay-cua-GV.md (đã qua nhận xét trực
 * tiếp của GV):
 *  - Mở đầu: S = 14, m = 2, C1 = "Yes", C2 = "No", S1 = 9, S2 = 5 rồi I(9,5).
 *  - Mỗi thuộc tính MỘT bảng 4 cột `<Attr> | pi | ni | I(pi,ni)`, ngay dưới là
 *    dòng E(A) rồi dòng Gain(A).
 *  - Nút con đặt tên "Bảng con 1.1 (Outlook = Sunny)".
 *  - Luật viết `R1: If (A=a) ∧ (B=b) Then Play=No`, mỗi luật một dòng.
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Row, Step, StepTable } from '@/types'
import { fmtFixed } from '@/lib/format'

export type TreeNode =
  | {
      kind: 'leaf'
      /** Nhãn lớp của lá. */
      className: string
      /** Số mẫu rơi vào lá này. */
      count: number
      /** Lá thuần khiết, hay là lá do hết thuộc tính mà vẫn còn lẫn lớp. */
      pure: boolean
    }
  | {
      kind: 'internal'
      attribute: string
      gain: number
      children: { value: string; node: TreeNode }[]
    }

export type AttributeGain = {
  attribute: string
  /** Một dòng cho mỗi giá trị của thuộc tính. */
  rows: { value: string; pi: number; ni: number; info: number; subtotal: number }[]
  /** E(A). */
  entropy: number
  /** Gain(A) = I(p,n) − E(A). */
  gain: number
}

export type Rule = {
  conditions: { attribute: string; value: string }[]
  className: string
}

export type Id3Result = {
  tree: TreeNode
  rules: Rule[]
  /** I(p,n) của toàn tập. */
  rootInfo: number
  /** Gain từng thuộc tính ở mức gốc, để vẽ biểu đồ cột. */
  rootGains: AttributeGain[]
  positiveClass: string
  negativeClass: string
}

/**
 * I(p,n) = −(p/(p+n))·log2(p/(p+n)) − (n/(p+n))·log2(n/(p+n)).
 * Quy ước 0·log2(0) = 0, nên I(4,0) = 0 chứ không phải NaN.
 */
export function info(p: number, n: number): number {
  const total = p + n
  if (total === 0) return 0
  const term = (x: number) => (x === 0 ? 0 : -(x / total) * Math.log2(x / total))
  return term(p) + term(n)
}

/** Entropy tổng quát cho nhiều hơn hai lớp. */
export function entropyOfCounts(counts: number[]): number {
  const total = counts.reduce((s, c) => s + c, 0)
  if (total === 0) return 0
  return counts.reduce((acc, c) => (c === 0 ? acc : acc - (c / total) * Math.log2(c / total)), 0)
}

function classCounts(rows: Row[], decision: string, classes: string[]): number[] {
  return classes.map((c) => rows.filter((r) => String(r[decision]) === c).length)
}

function valuesOf(dataset: Dataset, attribute: string, rows: Row[]): string[] {
  const declared = dataset.attributes.find((a) => a.name === attribute)?.values
  const present = [...new Set(rows.map((r) => String(r[attribute])))]
  // Giữ thứ tự khai báo để bảng ổn định giữa các lần chạy, nhưng chỉ lấy giá
  // trị thật sự có trong tập con đang xét.
  if (declared && declared.length > 0) return declared.filter((v) => present.includes(v))
  return present
}

/**
 * Tính Gain của một thuộc tính trên tập `rows`.
 *
 * `pi` là số mẫu lớp dương, `ni` là số mẫu lớp âm — đúng ký hiệu slide. Với
 * bài nhiều hơn hai lớp, `pi` là lớp đầu tiên và `ni` gộp phần còn lại, còn
 * entropy vẫn tính đủ trên mọi lớp.
 */
export function gainOf(
  dataset: Dataset,
  rows: Row[],
  attribute: string,
  decision: string,
  classes: string[],
): AttributeGain {
  const total = rows.length
  const parentEntropy = entropyOfCounts(classCounts(rows, decision, classes))
  const values = valuesOf(dataset, attribute, rows)

  const gainRows = values.map((value) => {
    const subset = rows.filter((r) => String(r[attribute]) === value)
    const counts = classCounts(subset, decision, classes)
    const pi = counts[0] ?? 0
    const ni = counts.slice(1).reduce((s, c) => s + c, 0)
    const infoValue = entropyOfCounts(counts)
    return {
      value,
      pi,
      ni,
      info: infoValue,
      subtotal: total === 0 ? 0 : (subset.length / total) * infoValue,
    }
  })

  const entropy = gainRows.reduce((s, r) => s + r.subtotal, 0)
  return { attribute, rows: gainRows, entropy, gain: parentEntropy - entropy }
}

/** Nhãn lớp đông nhất trong `rows` — dùng khi hết thuộc tính mà vẫn lẫn lớp. */
function majorityClass(rows: Row[], decision: string, classes: string[]): string {
  const counts = classCounts(rows, decision, classes)
  let bestIndex = 0
  for (let i = 1; i < counts.length; i++) if (counts[i] > counts[bestIndex]) bestIndex = i
  return classes[bestIndex]
}

type BuildContext = {
  dataset: Dataset
  decision: string
  classes: string[]
  steps: Step[]
  nextIndex: () => number
}

/** Bảng dữ liệu con, khuôn `Day | … | Play ball` của slide. */
function subsetTable(dataset: Dataset, rows: Row[], caption: string): StepTable {
  return {
    caption,
    head: dataset.attributes.map((a) => a.name),
    body: rows.map((r) => dataset.attributes.map((a) => String(r[a.name] ?? ''))),
  }
}

/** Bảng 4 cột `<Attr> | pi | ni | I(pi,ni)` — một thuộc tính một bảng. */
function gainTable(g: AttributeGain): StepTable {
  return {
    caption: `Thuộc tính ${g.attribute}`,
    head: [g.attribute, 'pi', 'ni', 'I(pi,ni)'],
    body: g.rows.map((r) => [r.value, r.pi, r.ni, fmtFixed(r.info)]),
  }
}

function entropyFormula(g: AttributeGain, total: number): string {
  const terms = g.rows
    .map((r) => `\\frac{${r.pi + r.ni}}{${total}}I(${r.pi},${r.ni})`)
    .join(' + ')
  return `E(${g.attribute}) = ${terms} = ${fmtFixed(g.entropy)}`
}

function buildTree(
  rows: Row[],
  available: string[],
  ctx: BuildContext,
  nodeLabel: string,
  path: { attribute: string; value: string }[],
): TreeNode {
  const { dataset, decision, classes } = ctx
  const counts = classCounts(rows, decision, classes)
  const present = classes.filter((_, i) => counts[i] > 0)

  // Điều kiện dừng 1: mọi mẫu cùng một lớp.
  if (present.length === 1) {
    ctx.steps.push({
      index: ctx.nextIndex(),
      title: `${nodeLabel} — nút lá`,
      note: `Toàn bộ ${rows.length} mẫu đều thuộc lớp "${present[0]}", không cần tách tiếp.`,
    })
    return { kind: 'leaf', className: present[0], count: rows.length, pure: true }
  }

  // Điều kiện dừng 2: hết thuộc tính để tách.
  if (available.length === 0 || rows.length === 0) {
    const majority = majorityClass(rows, decision, classes)
    ctx.steps.push({
      index: ctx.nextIndex(),
      title: `${nodeLabel} — nút lá`,
      note: `Hết thuộc tính để tách mà vẫn còn lẫn lớp; lấy lớp đông nhất là "${majority}".`,
    })
    return { kind: 'leaf', className: majority, count: rows.length, pure: false }
  }

  const total = rows.length
  const pi = counts[0]
  const ni = counts.slice(1).reduce((s, c) => s + c, 0)
  const rootInfo = entropyOfCounts(counts)

  ctx.steps.push({
    index: ctx.nextIndex(),
    title: `${nodeLabel} — tính I(p,n)`,
    formula: `S = ${total},\\ m = ${present.length},\\ ${classes
      .map((c, i) => `C_${i + 1} = \\text{"${c}"}`)
      .join(',\\ ')},\\ ${classes.map((_, i) => `S_${i + 1} = ${counts[i]}`).join(',\\ ')}`,
    tables: [subsetTable(dataset, rows, `Dữ liệu tại ${nodeLabel} (${total} mẫu)`)],
    note: undefined,
  })

  ctx.steps.push({
    index: ctx.nextIndex(),
    title: `${nodeLabel} — I(${pi},${ni})`,
    formula: `I(${pi},${ni}) = -\\frac{${pi}}{${total}}\\log_2\\frac{${pi}}{${total}} - \\frac{${ni}}{${total}}\\log_2\\frac{${ni}}{${total}} = ${fmtFixed(rootInfo)}`,
  })

  const gains = available.map((attr) => gainOf(dataset, rows, attr, decision, classes))

  // Mỗi thuộc tính MỘT bước, MỘT bảng — "từng bảng từng bảng ra" (GV).
  for (const g of gains) {
    ctx.steps.push({
      index: ctx.nextIndex(),
      title: `${nodeLabel} — Gain(${g.attribute})`,
      tables: [gainTable(g)],
      formula: `${entropyFormula(g, total)} \\\\ Gain(${g.attribute}) = ${fmtFixed(rootInfo)} - ${fmtFixed(g.entropy)} = ${fmtFixed(g.gain)}`,
    })
  }

  const best = gains.reduce((a, b) => (b.gain > a.gain ? b : a))

  ctx.steps.push({
    index: ctx.nextIndex(),
    title: `${nodeLabel} — chọn thuộc tính phân nhánh`,
    tables: [
      {
        caption: 'So sánh độ lợi thông tin',
        head: ['Thuộc tính', 'E(A)', 'Gain(A)'],
        body: gains.map((g) => [g.attribute, fmtFixed(g.entropy), fmtFixed(g.gain)]),
      },
    ],
    note: `Dữ liệu ID3 sau khi tách nhánh theo thuộc tính ${best.attribute} vì thuộc tính ${best.attribute} có độ lợi lớn nhất.`,
  })

  const remaining = available.filter((a) => a !== best.attribute)
  const children = valuesOf(dataset, best.attribute, rows).map((value, i) => {
    const subset = rows.filter((r) => String(r[best.attribute]) === value)
    const childLabel = `Bảng con ${path.length + 1}.${i + 1} (${best.attribute} = ${value})`
    return {
      value,
      node: buildTree(subset, remaining, ctx, childLabel, [
        ...path,
        { attribute: best.attribute, value },
      ]),
    }
  })

  return { kind: 'internal', attribute: best.attribute, gain: best.gain, children }
}

/** Duyệt cây thành danh sách luật IF-THEN, mỗi lá một luật. */
export function extractRules(tree: TreeNode): Rule[] {
  const rules: Rule[] = []

  function walk(node: TreeNode, conditions: Rule['conditions']) {
    if (node.kind === 'leaf') {
      rules.push({ conditions, className: node.className })
      return
    }
    for (const child of node.children) {
      walk(child.node, [...conditions, { attribute: node.attribute, value: child.value }])
    }
  }

  walk(tree, [])
  return rules
}

/** `R1: If (Outlook=Sunny) ∧ (Humidity=High) Then Play=No` — slide trang 65. */
export function formatRule(rule: Rule, index: number, decision: string): string {
  const conditions = rule.conditions.map((c) => `(${c.attribute}=${c.value})`).join(' ∧ ')
  return `R${index + 1}: If ${conditions} Then ${decision}=${rule.className}`
}

export function runId3(dataset: Dataset): AlgorithmResult<Id3Result> {
  const decision = dataset.decisionAttribute
  if (!decision) throw new Error('Bảng chưa chỉ định cột nhãn lớp.')
  if (dataset.rows.length === 0) throw new Error('Bảng huấn luyện rỗng.')

  const declared = dataset.attributes.find((a) => a.name === decision)?.values
  const classes =
    declared && declared.length > 0
      ? declared.filter((c) => dataset.rows.some((r) => String(r[decision]) === c))
      : [...new Set(dataset.rows.map((r) => String(r[decision])))]

  if (classes.length < 2) throw new Error('Cột nhãn lớp chỉ có một giá trị — không có gì để học.')

  /**
   * Thuộc tính dùng để tách: bỏ cột nhãn lớp, bỏ cột số (ID3 chỉ chia được
   * thuộc tính danh mục), và bỏ cột định danh mà mỗi dòng một giá trị khác
   * nhau — cột kiểu `Day` có Gain cao nhất nhưng không học được gì.
   */
  const available = dataset.attributes
    .filter((a) => a.name !== decision && a.type === 'nominal')
    .filter((a) => new Set(dataset.rows.map((r) => String(r[a.name]))).size < dataset.rows.length)
    .map((a) => a.name)

  if (available.length === 0) {
    throw new Error(
      'Không có thuộc tính danh mục nào dùng để tách nhánh. ID3 cần thuộc tính rời rạc — hãy chia bin ở route Tiền xử lý trước.',
    )
  }

  const steps: Step[] = []
  let counter = 0
  const ctx: BuildContext = {
    dataset,
    decision,
    classes,
    steps,
    nextIndex: () => ++counter,
  }

  const rootGains = available.map((attr) =>
    gainOf(dataset, dataset.rows, attr, decision, classes),
  )
  const tree = buildTree(dataset.rows, available, ctx, 'Tập gốc', [])
  const rules = extractRules(tree)

  steps.push({
    index: ctx.nextIndex(),
    title: 'Luật rút ra từ cây',
    tables: [
      {
        caption: `${rules.length} luật IF-THEN`,
        head: ['Luật'],
        body: rules.map((r, i) => [formatRule(r, i, decision)]),
      },
    ],
    note: 'Mỗi đường đi từ gốc xuống một lá là một luật — slide trang 65.',
  })

  return {
    steps,
    result: {
      tree,
      rules,
      rootInfo: entropyOfCounts(classCounts(dataset.rows, decision, classes)),
      rootGains,
      positiveClass: classes[0],
      negativeClass: classes[1] ?? '',
    },
  }
}

/** Đếm số lá — để giao diện canh chiều rộng SVG. */
export function countLeaves(node: TreeNode): number {
  if (node.kind === 'leaf') return 1
  return node.children.reduce((s, c) => s + countLeaves(c.node), 0)
}

/** Chiều sâu cây — để giao diện canh chiều cao SVG. */
export function treeDepth(node: TreeNode): number {
  if (node.kind === 'leaf') return 1
  return 1 + Math.max(...node.children.map((c) => treeDepth(c.node)))
}
