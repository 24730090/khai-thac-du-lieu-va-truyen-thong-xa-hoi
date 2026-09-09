/**
 * F5 — Tập phổ biến và luật kết hợp. Slide Bài 2.
 *
 * Hai cách tìm tập phổ biến, cùng ra một kết quả:
 *  1. Apriori cổ điển — bước kết hợp Ck từ Lk-1, bước rút gọn, đếm support
 *     (trang 13-16).
 *  2. Vector biểu diễn — ma trận nhị phân, tích ⊗ lấy min từng thành phần
 *     (trang 24-35).
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step, StepTable } from '@/types'
import { fmt, fmtFixed } from '@/lib/format'

/** Ngữ cảnh khai thác dữ liệu (O, I, R) — slide trang 7. */
export type MiningContext = {
  /** Mã hoá đơn, theo thứ tự dòng của ma trận. */
  transactions: string[]
  /** Mã mặt hàng, theo thứ tự cột. */
  items: string[]
  /** matrix[o][i] = 1 nếu hoá đơn o có mặt hàng i. */
  matrix: (0 | 1)[][]
}

export type Itemset = {
  /** Các mặt hàng, đã sắp theo thứ tự trong `items`. */
  items: string[]
  /** Số hoá đơn chứa trọn tập này. */
  count: number
  /** SP(S) = |ρ(S)| / |O|. */
  support: number
  /** Vector biểu diễn v(S) — chỉ có ở phương pháp vector. */
  vector?: (0 | 1)[]
}

export type Level = {
  k: number
  /** Ck — tập ứng viên trước khi lọc theo minsupp. */
  candidates: Itemset[]
  /** Lk — tập phổ biến sau khi lọc. */
  frequent: Itemset[]
  /** Ứng viên bị bước rút gọn loại vì có tập con (k−1) không phổ biến. */
  pruned: string[][]
}

export type AssociationRule = {
  antecedent: string[]
  consequent: string[]
  support: number
  confidence: number
}

export type AprioriResult = {
  context: MiningContext
  levels: Level[]
  /** Hợp của mọi Lk. */
  frequentItemsets: Itemset[]
  /** Tập phổ biến tối đại — slide trang 18. */
  maximalItemsets: Itemset[]
  rules: AssociationRule[]
}

const key = (items: string[]) => items.join(',')
const label = (items: string[]) => `{${items.join(',')}}`

/**
 * Đọc `Dataset` dạng ma trận nhị phân thành ngữ cảnh (O, I, R).
 *
 * Cột đầu tiên là mã hoá đơn; mọi cột số còn lại là một mặt hàng, ô khác 0
 * nghĩa là hoá đơn có mặt hàng đó.
 */
export function toMiningContext(dataset: Dataset): MiningContext {
  const [idAttr, ...itemAttrs] = dataset.attributes
  if (!idAttr) throw new Error('Bảng phải có ít nhất một cột.')
  if (itemAttrs.length === 0) throw new Error('Bảng phải có ít nhất một cột mặt hàng.')

  const transactions = dataset.rows.map((r, i) => String(r[idAttr.name] ?? `o${i + 1}`))
  const items = itemAttrs.map((a) => a.name)
  const matrix = dataset.rows.map(
    (r) => itemAttrs.map((a) => (Number(r[a.name]) ? 1 : 0)) as (0 | 1)[],
  )

  return { transactions, items, matrix }
}

/** v(S): thành phần thứ i bằng 1 nếu hoá đơn i chứa TRỌN S — slide trang 24. */
export function representationVector(context: MiningContext, items: string[]): (0 | 1)[] {
  const cols = items.map((it) => context.items.indexOf(it))
  return context.matrix.map((row) => (cols.every((c) => row[c] === 1) ? 1 : 0))
}

/** Tích ⊗: zk = min(sk, tk) — slide trang 26. */
export function vectorProduct(a: (0 | 1)[], b: (0 | 1)[]): (0 | 1)[] {
  if (a.length !== b.length) throw new Error('Hai vector biểu diễn khác số thành phần.')
  return a.map((v, i) => Math.min(v, b[i]) as 0 | 1)
}

/** SPV(v(S)) = số thành phần khác 0 / số thành phần — slide trang 27. */
export function vectorSupport(vector: (0 | 1)[]): number {
  if (vector.length === 0) return 0
  return vector.filter((v) => v === 1).length / vector.length
}

function countSupport(context: MiningContext, items: string[]): number {
  return representationVector(context, items).filter((v) => v === 1).length
}

/**
 * Bước kết hợp: Ck sinh bằng cách kết Lk-1 với chính nó — slide trang 14.
 *
 * Lấy hợp của từng cặp tập trong Lk-1, giữ lại hợp nào có đúng k phần tử.
 * Đây là cách slide làm: từ L2 của ví dụ, C3 ra đủ bốn ứng viên
 * {i1,i2,i3}, {i1,i2,i4}, {i1,i3,i4}, {i2,i3,i4} (trang 16).
 *
 * Cách kết theo tiền tố (chỉ ghép hai tập trùng k−2 phần tử đầu) sinh ít ứng
 * viên hơn và cũng đúng, nhưng khi đó bước rút gọn không loại được gì — mất
 * hẳn cái bước mà slide dành riêng một trang để dạy.
 */
export function joinStep(previous: string[][], allItems: string[]): string[][] {
  if (previous.length === 0) return []
  const k = previous[0].length + 1
  const order = (it: string) => allItems.indexOf(it)
  const seen = new Set<string>()
  const out: string[][] = []

  for (let i = 0; i < previous.length; i++) {
    for (let j = i + 1; j < previous.length; j++) {
      const union = [...new Set([...previous[i], ...previous[j]])].sort(
        (a, b) => order(a) - order(b),
      )
      if (union.length !== k) continue
      const id = key(union)
      if (seen.has(id)) continue
      seen.add(id)
      out.push(union)
    }
  }

  // Sắp theo thứ tự từ điển của chỉ số mặt hàng để bảng ứng viên ổn định
  // giữa các lần chạy — kiểm chéo mới đối chiếu được từng dòng.
  out.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      const d = order(a[i]) - order(b[i])
      if (d !== 0) return d
    }
    return 0
  })
  return out
}

/**
 * Bước rút gọn: bỏ ứng viên có bất kỳ tập con (k−1) nào không phổ biến
 * — slide trang 14.
 */
export function pruneStep(
  candidates: string[][],
  previousFrequent: Set<string>,
): { kept: string[][]; pruned: string[][] } {
  const kept: string[][] = []
  const pruned: string[][] = []

  for (const c of candidates) {
    const subsets = c.map((_, i) => c.filter((__, j) => j !== i))
    if (subsets.every((s) => previousFrequent.has(key(s)))) kept.push(c)
    else pruned.push(c)
  }
  return { kept, pruned }
}

/** Sinh mọi tập con thực sự khác rỗng của `items`. */
function properSubsets(items: string[]): string[][] {
  const out: string[][] = []
  const n = items.length
  for (let mask = 1; mask < (1 << n) - 1; mask++) {
    out.push(items.filter((_, i) => (mask >> i) & 1))
  }
  return out
}

export type AprioriOptions = {
  minSupport: number
  minConfidence: number
  /** `vector` dùng ⊗ và ghi vector vào từng bước; `classic` chỉ đếm hoá đơn. */
  method?: 'classic' | 'vector'
}

export function runApriori(
  dataset: Dataset,
  options: AprioriOptions,
): AlgorithmResult<AprioriResult> {
  const { minSupport, minConfidence, method = 'classic' } = options
  const context = toMiningContext(dataset)
  const { transactions, items, matrix } = context
  const total = transactions.length

  if (total === 0) throw new Error('Ngữ cảnh không có hoá đơn nào.')

  const steps: Step[] = []
  let stepIndex = 1

  steps.push({
    index: stepIndex++,
    title: 'Ngữ cảnh khai thác dữ liệu (O, I, R)',
    tables: [
      {
        caption: `Ma trận biểu diễn — ${total} hoá đơn × ${items.length} mặt hàng`,
        head: ['Hoá đơn', ...items],
        body: matrix.map((row, r) => [transactions[r], ...row]),
      },
    ],
    note: `minsupp = ${fmtFixed(minSupport, 2)}, minconf = ${fmtFixed(minConfidence, 2)}.`,
  })

  const levels: Level[] = []
  let previousFrequent: string[][] = []
  let k = 1

  while (k <= items.length) {
    let candidateSets: string[][]
    let pruned: string[][] = []
    let joinedCount: number

    if (k === 1) {
      candidateSets = items.map((it) => [it])
      joinedCount = candidateSets.length
    } else {
      const joined = joinStep(previousFrequent, items)
      joinedCount = joined.length
      const previousKeys = new Set(previousFrequent.map(key))
      const result = pruneStep(joined, previousKeys)
      candidateSets = result.kept
      pruned = result.pruned
    }

    // Bước kết hợp không sinh được ứng viên nào thì thuật toán đã hết mức để
    // xét. Còn nếu có sinh mà bị rút gọn hết thì vẫn ghi lại mức đó, để giao
    // diện cho thấy vì sao thuật toán dừng.
    if (joinedCount === 0) break

    const candidates: Itemset[] = candidateSets.map((set) => {
      const vector = representationVector(context, set)
      const count = vector.filter((v) => v === 1).length
      return { items: set, count, support: count / total, vector }
    })
    const frequent = candidates.filter((c) => c.support >= minSupport)

    levels.push({ k, candidates, frequent, pruned })

    // ---- các bước hiện ra giao diện
    if (k > 1) {
      steps.push({
        index: stepIndex++,
        title: `Bước kết hợp — sinh C${k} từ L${k - 1}`,
        tables: [
          {
            caption: `C${k} sau khi kết và rút gọn`,
            head: [`Ứng viên C${k}`],
            body: candidateSets.map((s) => [label(s)]),
          },
          ...(pruned.length > 0
            ? [
                {
                  caption: 'Bước rút gọn — bị loại vì có tập con (k−1) không phổ biến',
                  head: ['Ứng viên bị loại'],
                  body: pruned.map((s) => [label(s)]),
                } satisfies StepTable,
              ]
            : []),
        ],
        note:
          pruned.length > 0
            ? 'Tập kích thước (k−1) không phổ biến thì không thể là tập con của tập phổ biến kích thước k — slide trang 14.'
            : undefined,
      })
    }

    const supportTable: StepTable =
      method === 'vector'
        ? {
            caption: `Độ phổ biến từng ứng viên mức ${k} — tính bằng vector biểu diễn`,
            head: ['S', 'v(S)', 'SPV(v(S))', 'Kết luận'],
            body: candidates.map((c) => [
              label(c.items),
              `(${c.vector?.join(',')})`,
              `${c.count}/${total} = ${fmtFixed(c.support, 2)}`,
              c.support >= minSupport ? 'Phổ biến' : 'KHÔNG phổ biến',
            ]),
          }
        : {
            caption: `Độ phổ biến từng ứng viên mức ${k}`,
            head: ['S', 'Hoá đơn chứa S', 'SP(S)', 'Kết luận'],
            body: candidates.map((c) => [
              label(c.items),
              transactions.filter((_, i) => c.vector?.[i] === 1).join(', ') || '—',
              `${c.count}/${total} = ${fmtFixed(c.support, 2)}`,
              c.support >= minSupport ? 'Phổ biến' : 'KHÔNG phổ biến',
            ]),
          }

    steps.push({
      index: stepIndex++,
      title: `Tìm L${k} — tập phổ biến ${k} phần tử`,
      formula:
        method === 'vector'
          ? `SPV(v(S)) = \\frac{\\text{số thành phần khác 0}}{|O|}`
          : `SP(S) = \\frac{|\\rho(S)|}{|O|}`,
      tables: [supportTable],
      note:
        frequent.length > 0
          ? `L${k} = { ${frequent.map((f) => label(f.items)).join(', ')} }`
          : `L${k} rỗng — dừng thuật toán.`,
    })

    if (frequent.length === 0) break
    previousFrequent = frequent.map((f) => f.items)
    k++
  }

  const frequentItemsets = levels.flatMap((l) => l.frequent)

  // Tập phổ biến tối đại: không nằm trong tập phổ biến nào lớn hơn — trang 18.
  const maximalItemsets = frequentItemsets.filter(
    (a) =>
      !frequentItemsets.some(
        (b) => b.items.length > a.items.length && a.items.every((it) => b.items.includes(it)),
      ),
  )

  steps.push({
    index: stepIndex++,
    title: 'Tất cả tập phổ biến và tập phổ biến tối đại',
    tables: [
      {
        caption: `FS(O, I, R, minsupp = ${fmtFixed(minSupport, 2)})`,
        head: ['Tập', 'SP', 'Tối đại?'],
        body: frequentItemsets.map((f) => [
          label(f.items),
          fmtFixed(f.support, 2),
          maximalItemsets.includes(f) ? 'Có' : '',
        ]),
      },
    ],
    note: `Tập phổ biến tối đại: ${maximalItemsets.map((m) => label(m.items)).join(', ') || '—'}`,
  })

  // ------------------------------------------------------------- sinh luật
  const supportOf = new Map(frequentItemsets.map((f) => [key(f.items), f.support]))
  const rules: AssociationRule[] = []

  for (const itemset of frequentItemsets) {
    if (itemset.items.length < 2) continue
    for (const antecedent of properSubsets(itemset.items)) {
      const consequent = itemset.items.filter((it) => !antecedent.includes(it))
      const antecedentSupport =
        supportOf.get(key(antecedent)) ?? countSupport(context, antecedent) / total
      if (antecedentSupport === 0) continue
      const confidence = itemset.support / antecedentSupport
      if (confidence >= minConfidence) {
        rules.push({ antecedent, consequent, support: itemset.support, confidence })
      }
    }
  }
  rules.sort((a, b) => b.confidence - a.confidence || b.support - a.support)

  steps.push({
    index: stepIndex++,
    title: 'Sinh luật kết hợp theo minconf',
    formula: `CF(X \\rightarrow Y) = \\frac{SP(X \\cup Y)}{SP(X)}`,
    tables: [
      {
        caption: `Luật thoả minconf = ${fmtFixed(minConfidence, 2)} (${rules.length} luật)`,
        head: ['Luật', 'SP', 'CF'],
        body:
          rules.length > 0
            ? rules.map((r, i) => [
                `r${i + 1}: ${label(r.antecedent)} → ${label(r.consequent)}`,
                fmtFixed(r.support, 2),
                fmtFixed(r.confidence, 2),
              ])
            : [['—', '—', '—']],
      },
    ],
    note: 'Luật kết hợp hợp lệ là luật có CF ≥ minconf — slide trang 19.',
  })

  return {
    steps,
    result: { context, levels, frequentItemsets, maximalItemsets, rules },
  }
}

/**
 * Bảng vector biểu diễn cho tab thứ hai: liệt kê v(S) của từng mặt hàng đơn lẻ
 * rồi cho thấy tích ⊗ dựng ra vector của tập lớn hơn — slide trang 28.
 */
export function explainVectorProduct(
  context: MiningContext,
  items: string[],
): { parts: { items: string[]; vector: (0 | 1)[] }[]; product: (0 | 1)[]; support: number } {
  const parts = items.map((it) => ({ items: [it], vector: representationVector(context, [it]) }))
  const product = parts.slice(1).reduce((acc, p) => vectorProduct(acc, p.vector), parts[0].vector)
  return { parts, product, support: vectorSupport(product) }
}

/** Chuỗi luật kiểu slide: `r1: {i1,i2} → {i3} (SP=0.40, CF=1.00)`. */
export function formatRule(rule: AssociationRule, index: number): string {
  return `r${index + 1}: ${label(rule.antecedent)} → ${label(rule.consequent)} (SP = ${fmt(
    rule.support,
  )}, CF = ${fmtFixed(rule.confidence, 2)})`
}
