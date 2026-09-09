/**
 * F7 — Đánh giá mô hình phân lớp. Slide Bài 7.
 *
 * Ma trận nhầm lẫn 2×2 (trang 6-10) rồi bốn chỉ số: Accuracy (trang 13),
 * Precision (trang 14), Recall (trang 15), F1 (trang 16).
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step } from '@/types'
import { fmt, fmtFixed, fmtPercent } from '@/lib/format'

export type ConfusionMatrix = {
  /** Dương tính thật: thực tế dương, dự đoán dương. */
  tp: number
  /** Âm tính giả: thực tế dương, dự đoán âm. */
  fn: number
  /** Dương tính giả: thực tế âm, dự đoán dương. */
  fp: number
  /** Âm tính thật: thực tế âm, dự đoán âm. */
  tn: number
}

export type Metrics = {
  accuracy: number
  precision: number
  recall: number
  f1: number
  /** Tổng số ca. */
  total: number
}

export type EvaluationResult = {
  matrix: ConfusionMatrix
  metrics: Metrics
  positiveLabel: string
  negativeLabel: string
}

/** Accuracy = (TP+TN)/(TP+FP+FN+TN) — trang 13. */
export function accuracy(m: ConfusionMatrix): number {
  const total = m.tp + m.fp + m.fn + m.tn
  return total === 0 ? 0 : (m.tp + m.tn) / total
}

/** Precision = TP/(TP+FP) — trang 14. Không có ca nào bị dự đoán dương thì bằng 0. */
export function precision(m: ConfusionMatrix): number {
  const denominator = m.tp + m.fp
  return denominator === 0 ? 0 : m.tp / denominator
}

/** Recall = TP/(TP+FN) — trang 15. */
export function recall(m: ConfusionMatrix): number {
  const denominator = m.tp + m.fn
  return denominator === 0 ? 0 : m.tp / denominator
}

/** F1 = 2·(P·R)/(P+R) — trang 16. */
export function f1Score(p: number, r: number): number {
  return p + r === 0 ? 0 : (2 * p * r) / (p + r)
}

export function computeMetrics(m: ConfusionMatrix): Metrics {
  const p = precision(m)
  const r = recall(m)
  return {
    accuracy: accuracy(m),
    precision: p,
    recall: r,
    f1: f1Score(p, r),
    total: m.tp + m.fp + m.fn + m.tn,
  }
}

/**
 * Dựng ma trận nhầm lẫn từ hai cột nhãn của một bảng.
 *
 * `positiveLabel` là lớp được coi là "dương" — đổi lớp dương thì Precision và
 * Recall đổi theo, còn Accuracy thì không.
 */
export function confusionFromDataset(
  dataset: Dataset,
  actualAttribute: string,
  predictedAttribute: string,
  positiveLabel: string,
): ConfusionMatrix {
  const matrix: ConfusionMatrix = { tp: 0, fn: 0, fp: 0, tn: 0 }

  for (const row of dataset.rows) {
    const actual = String(row[actualAttribute] ?? '')
    const predicted = String(row[predictedAttribute] ?? '')
    const actualPositive = actual === positiveLabel
    const predictedPositive = predicted === positiveLabel

    if (actualPositive && predictedPositive) matrix.tp++
    else if (actualPositive && !predictedPositive) matrix.fn++
    else if (!actualPositive && predictedPositive) matrix.fp++
    else matrix.tn++
  }
  return matrix
}

export type EvaluationOptions = {
  positiveLabel?: string
  negativeLabel?: string
}

export function runEvaluation(
  matrix: ConfusionMatrix,
  options: EvaluationOptions = {},
): AlgorithmResult<EvaluationResult> {
  const positiveLabel = options.positiveLabel ?? 'Dương'
  const negativeLabel = options.negativeLabel ?? 'Âm'
  const metrics = computeMetrics(matrix)
  const { tp, fn, fp, tn } = matrix
  const steps: Step[] = []

  steps.push({
    index: 1,
    title: 'Ma trận nhầm lẫn (Confusion Matrix)',
    tables: [
      {
        caption: `Tổng ${metrics.total} ca — hàng là thực tế, cột là dự đoán`,
        head: ['', `Dự đoán ${positiveLabel}`, `Dự đoán ${negativeLabel}`, 'Tổng hàng'],
        body: [
          [`Thực tế ${positiveLabel}`, `TP = ${tp}`, `FN = ${fn}`, tp + fn],
          [`Thực tế ${negativeLabel}`, `FP = ${fp}`, `TN = ${tn}`, fp + tn],
          ['Tổng cột', tp + fp, fn + tn, metrics.total],
        ],
      },
    ],
    note:
      'TP dự đoán đúng ca dương, TN dự đoán đúng ca âm, FP báo động nhầm, FN bỏ sót ca dương.',
  })

  steps.push({
    index: 2,
    title: 'Accuracy — độ chính xác tổng thể',
    formula: `Accuracy = \\frac{TP + TN}{TP + FP + FN + TN} = \\frac{${tp} + ${tn}}{${tp} + ${fp} + ${fn} + ${tn}} = \\frac{${tp + tn}}{${metrics.total}} = ${fmt(metrics.accuracy)}`,
    note: `Mô hình dự đoán đúng ${fmtPercent(metrics.accuracy)} tổng số trường hợp.`,
  })

  steps.push({
    index: 3,
    title: 'Precision — độ chính xác dương',
    formula: `Precision = \\frac{TP}{TP + FP} = \\frac{${tp}}{${tp} + ${fp}} = \\frac{${tp}}{${tp + fp}} = ${fmtFixed(metrics.precision)}`,
    note: `Trong số ca bị dự đoán là ${positiveLabel}, khoảng ${fmtPercent(metrics.precision, 1)} là đúng.`,
  })

  steps.push({
    index: 4,
    title: 'Recall — độ nhạy',
    formula: `Recall = \\frac{TP}{TP + FN} = \\frac{${tp}}{${tp} + ${fn}} = \\frac{${tp}}{${tp + fn}} = ${fmt(metrics.recall)}`,
    note: `Mô hình phát hiện đúng ${fmtPercent(metrics.recall, 1)} số ca thực sự là ${positiveLabel}.`,
  })

  steps.push({
    index: 5,
    title: 'F1-score — chỉ số cân bằng',
    formula: `F_1 = 2\\cdot\\frac{Precision \\times Recall}{Precision + Recall} = 2\\cdot\\frac{${fmtFixed(metrics.precision)} \\times ${fmtFixed(metrics.recall)}}{${fmtFixed(metrics.precision)} + ${fmtFixed(metrics.recall)}} = ${fmtFixed(metrics.f1)}`,
    note:
      'F1 cao chỉ khi cả Precision và Recall đều cao — một chỉ số thấp là F1 tụt theo.\n' +
      'App tính F1 từ Precision và Recall chưa làm tròn, nên có thể lệch 0.001 so với bài giải trong slide (slide thay số đã làm tròn vào công thức).',
  })

  const remark: string[] = []
  if (metrics.recall < metrics.precision) {
    remark.push(
      `Recall (${fmtFixed(metrics.recall)}) thấp hơn Precision (${fmtFixed(metrics.precision)}): mô hình bỏ sót ${fn} ca ${positiveLabel} thật.`,
    )
  } else if (metrics.precision < metrics.recall) {
    remark.push(
      `Precision (${fmtFixed(metrics.precision)}) thấp hơn Recall (${fmtFixed(metrics.recall)}): mô hình báo động nhầm ${fp} ca.`,
    )
  } else {
    remark.push('Precision và Recall cân nhau.')
  }
  if (metrics.accuracy > 0.7 && metrics.recall < 0.7) {
    remark.push(
      'Accuracy cao mà Recall thấp là dấu hiệu điển hình của dữ liệu lệch lớp — slide Bài 7 trang 4 mục (3).',
    )
  }

  steps.push({
    index: 6,
    title: 'Nhận xét',
    note: remark.join('\n'),
  })

  return { steps, result: { matrix, metrics, positiveLabel, negativeLabel } }
}
