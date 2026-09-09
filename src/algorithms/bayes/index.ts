/**
 * F6 — Phân lớp Naive Bayes. Slide Bài 5.1 và Bài 7.
 *
 * Quy tắc MAP (Bài 7 trang 5): gán cho mẫu X nhãn C sao cho P(C|X) lớn nhất;
 * thực tế tính P(X|C)·P(C) rồi so sánh. Giả thiết độc lập điều kiện cho
 * P(X|C) = ∏ P(xi|C) (Bài 5.1 trang 16).
 *
 * Có tuỳ chọn làm trơn Laplace (Bài 5.1 trang 28): cộng 1 vào tử số và cộng
 * số giá trị của thuộc tính vào mẫu số.
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step, StepTable } from '@/types'
import { fmt, fmtFixed } from '@/lib/format'

/** Mẫu cần phân lớp: thuộc tính → giá trị. Không cần khai đủ mọi thuộc tính. */
export type Query = Record<string, string>

export type ClassScore = {
  className: string
  prior: number
  /** P(xi|C) theo từng thuộc tính trong mẫu hỏi. */
  likelihoods: { attribute: string; value: string; numerator: number; denominator: number; p: number }[]
  /** P(X|C)·P(C). */
  score: number
}

export type BayesResult = {
  classes: string[]
  priors: Record<string, { count: number; total: number; p: number }>
  /** conditionals[attribute][value][class] = P(value|class). */
  conditionals: Record<string, Record<string, Record<string, { numerator: number; denominator: number; p: number }>>>
  scores: ClassScore[]
  predicted: string
  /** Có hai lớp cùng điểm cao nhất hay không. */
  tie: boolean
}

export type BayesOptions = {
  query: Query
  /** Bật làm trơn Laplace — slide Bài 5.1 trang 28. */
  laplace?: boolean
}

function valuesOf(dataset: Dataset, attribute: string): string[] {
  const declared = dataset.attributes.find((a) => a.name === attribute)?.values
  if (declared && declared.length > 0) return declared
  return [...new Set(dataset.rows.map((r) => String(r[attribute])))]
}

export function runNaiveBayes(
  dataset: Dataset,
  options: BayesOptions,
): AlgorithmResult<BayesResult> {
  const { query, laplace = false } = options
  const decision = dataset.decisionAttribute
  if (!decision) throw new Error('Bảng chưa chỉ định cột nhãn lớp.')
  if (dataset.rows.length === 0) throw new Error('Bảng huấn luyện rỗng.')

  const queryAttributes = Object.keys(query).filter(
    (a) => a !== decision && query[a] !== '' && query[a] !== undefined,
  )
  if (queryAttributes.length === 0) throw new Error('Mẫu cần phân lớp chưa chọn thuộc tính nào.')

  const classes = valuesOf(dataset, decision)
  const total = dataset.rows.length
  const steps: Step[] = []
  let stepIndex = 1

  steps.push({
    index: stepIndex++,
    title: 'Tập huấn luyện',
    tables: [
      {
        caption: `${total} mẫu, nhãn lớp là "${decision}"`,
        head: dataset.attributes.map((a) => a.name),
        body: dataset.rows.map((r) => dataset.attributes.map((a) => String(r[a.name] ?? ''))),
      },
    ],
    note: laplace
      ? 'Đang bật làm trơn Laplace — slide Bài 5.1 trang 28.'
      : 'Chưa bật làm trơn Laplace: một xác suất bằng 0 sẽ kéo cả tích về 0.',
  })

  // ------------------------------------------------------------ P(Ci)
  const classCounts: Record<string, number> = {}
  for (const c of classes) {
    classCounts[c] = dataset.rows.filter((r) => String(r[decision]) === c).length
  }

  const priorDenominator = laplace ? total + classes.length : total
  const priors: BayesResult['priors'] = {}
  for (const c of classes) {
    const numerator = laplace ? classCounts[c] + 1 : classCounts[c]
    priors[c] = { count: numerator, total: priorDenominator, p: numerator / priorDenominator }
  }

  steps.push({
    index: stepIndex++,
    title: 'Ước lượng xác suất tiên nghiệm P(Ci)',
    formula: laplace
      ? `P(C_i) = \\frac{|C_{i,D}| + 1}{|D| + m}`
      : `P(C_i) = \\frac{|C_{i,D}|}{|D|}`,
    tables: [
      {
        caption: 'Xác suất từng lớp',
        head: ['Lớp Ci', 'Số mẫu', 'P(Ci)', 'Giá trị'],
        body: classes.map((c) => [
          c,
          classCounts[c],
          `${priors[c].count}/${priors[c].total}`,
          fmtFixed(priors[c].p),
        ]),
      },
    ],
  })

  // ------------------------------------------------------- P(xi | Ci)
  const conditionals: BayesResult['conditionals'] = {}
  const conditionalTables: StepTable[] = []

  for (const attribute of queryAttributes) {
    const attrValues = valuesOf(dataset, attribute)
    conditionals[attribute] = {}

    for (const value of attrValues) {
      conditionals[attribute][value] = {}
      for (const c of classes) {
        const classRows = dataset.rows.filter((r) => String(r[decision]) === c)
        const matching = classRows.filter((r) => String(r[attribute]) === value).length
        const numerator = laplace ? matching + 1 : matching
        const denominator = laplace ? classRows.length + attrValues.length : classRows.length
        conditionals[attribute][value][c] = {
          numerator,
          denominator,
          p: denominator === 0 ? 0 : numerator / denominator,
        }
      }
    }

    // Mỗi thuộc tính MỘT BẢNG riêng — nhận xét trực tiếp của GV:
    // "từng bảng từng bảng ra", "dồn chung thầy k biết e đang làm gì đâu".
    conditionalTables.push({
      caption: `Thuộc tính ${attribute}`,
      head: [attribute, ...classes.map((c) => `P(${attribute}|${c})`)],
      body: attrValues.map((v) => [
        v,
        ...classes.map((c) => {
          const cell = conditionals[attribute][v][c]
          return `${cell.numerator}/${cell.denominator} = ${fmtFixed(cell.p)}`
        }),
      ]),
    })
  }

  steps.push({
    index: stepIndex++,
    title: 'Ước lượng xác suất điều kiện P(xi|Ci)',
    formula: laplace
      ? `P(x_i|C) = \\frac{\\#\\{x_i, C\\} + 1}{|C| + |V_{x}|}`
      : `P(x_i|C) = \\frac{\\#\\{x_i, C\\}}{|C|}`,
    tables: conditionalTables,
    note: 'Mỗi thuộc tính một bảng riêng, theo khuôn trình bày của GV.',
  })

  // ------------------------------------------- P(X|C)·P(C) từng lớp
  const scores: ClassScore[] = classes.map((c) => {
    const likelihoods = queryAttributes.map((attribute) => {
      const value = query[attribute]
      const cell = conditionals[attribute][value]?.[c]
      return {
        attribute,
        value,
        numerator: cell?.numerator ?? 0,
        denominator: cell?.denominator ?? 1,
        p: cell?.p ?? 0,
      }
    })
    const score = likelihoods.reduce((acc, l) => acc * l.p, priors[c].p)
    return { className: c, prior: priors[c].p, likelihoods, score }
  })

  const queryText = queryAttributes.map((a) => `${a}=${query[a]}`).join(', ')

  steps.push({
    index: stepIndex++,
    title: `Tính P(X|Ci)·P(Ci) cho mẫu X = <${queryText}>`,
    formula: `P(X|C)\\cdot P(C) = P(x_1|C)\\cdot P(x_2|C)\\cdots P(x_k|C)\\cdot P(C)`,
    tables: scores.map((s) => ({
      caption: `Lớp ${s.className}`,
      head: ['Thừa số', 'Phân số', 'Giá trị'],
      body: [
        ...s.likelihoods.map((l) => [
          `P(${l.attribute}=${l.value}|${s.className})`,
          `${l.numerator}/${l.denominator}`,
          fmtFixed(l.p),
        ]),
        [`P(${s.className})`, `${priors[s.className].count}/${priors[s.className].total}`, fmtFixed(s.prior)],
        ['Tích', '—', fmtFixed(s.score, 6)],
      ],
    })),
  })

  // ------------------------------------------------------- chọn MAP
  const best = scores.reduce((a, b) => (b.score > a.score ? b : a))
  const tie = scores.filter((s) => s.score === best.score).length > 1

  steps.push({
    index: stepIndex++,
    title: 'Chọn lớp theo quy tắc MAP',
    tables: [
      {
        caption: 'So sánh P(X|Ci)·P(Ci)',
        head: ['Lớp Ci', 'P(X|Ci)·P(Ci)'],
        body: scores.map((s) => [s.className, fmtFixed(s.score, 6)]),
      },
    ],
    note: tie
      ? `Hai lớp trở lên cùng giá trị ${fmtFixed(best.score, 6)} — không quyết được bằng MAP. Thử bật làm trơn Laplace.`
      : `Vì ${fmtFixed(best.score, 6)} là lớn nhất nên mẫu X được phân vào lớp "${best.className}".`,
  })

  return {
    steps,
    result: { classes, priors, conditionals, scores, predicted: best.className, tie },
  }
}

/** Chuỗi mẫu hỏi kiểu slide: `X = <mưa, nóng, cao, không>`. */
export function formatQuery(query: Query, attributes: string[]): string {
  const parts = attributes.filter((a) => query[a]).map((a) => query[a])
  return `X = <${parts.join(', ')}>`
}

/** Dự đoán nhãn cho toàn bộ một bảng — dùng nối sang route Đánh giá mô hình. */
export function predictAll(dataset: Dataset, laplace = false): string[] {
  const decision = dataset.decisionAttribute
  if (!decision) throw new Error('Bảng chưa chỉ định cột nhãn lớp.')
  const featureNames = dataset.attributes
    .map((a) => a.name)
    .filter((n) => n !== decision && dataset.attributes.find((a) => a.name === n)?.type === 'nominal')

  return dataset.rows.map((row) => {
    const query: Query = {}
    for (const name of featureNames) query[name] = String(row[name] ?? '')
    return runNaiveBayes(dataset, { query, laplace }).result.predicted
  })
}

/** Số thập phân của một xác suất, cho giao diện hiện gọn. */
export function formatProbability(p: number): string {
  return fmt(p)
}
