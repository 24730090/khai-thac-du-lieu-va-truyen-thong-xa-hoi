/**
 * F4 — Tiền xử lý dữ liệu. Slide Bài 1_2.
 *
 * Bốn nhóm việc slide dạy: chia bin và làm trơn (trang 15-16), chuẩn hoá
 * min-max (trang 36) và z-score (trang 37), xử lý giá trị thiếu (trang 8-9).
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step, StepTable } from '@/types'
import { fmt, fmtFixed } from '@/lib/format'

// ---------------------------------------------------------------- chia bin

export type BinMethod = 'equal-frequency' | 'equal-width'
export type SmoothMethod = 'means' | 'boundaries' | 'median'

export const BIN_METHOD_LABEL: Record<BinMethod, string> = {
  'equal-frequency': 'Equal-frequency (bin đều số phần tử)',
  'equal-width': 'Equal-width (bin đều bề rộng)',
}

export const SMOOTH_METHOD_LABEL: Record<SmoothMethod, string> = {
  means: 'Làm trơn theo bin means',
  boundaries: 'Làm trơn theo bin boundaries',
  median: 'Làm trơn theo bin medians',
}

export type Bin = {
  index: number
  /** Các giá trị trong bin, đã sắp tăng dần. */
  values: number[]
  /** Giá trị sau khi làm trơn, cùng thứ tự với `values`. */
  smoothed: number[]
}

export type BinningResult = {
  sorted: number[]
  bins: Bin[]
  /** Toàn bộ giá trị đã làm trơn, theo thứ tự đã sắp. */
  smoothedSorted: number[]
}

function mean(values: number[]): number {
  return values.reduce((s, v) => s + v, 0) / values.length
}

function median(values: number[]): number {
  const s = [...values].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid]
}

/**
 * Chia `values` thành `binCount` bin.
 *
 * Equal-frequency chia đều SỐ PHẦN TỬ (slide trang 16: 9 giá trị thành 3 bin,
 * mỗi bin 3 phần tử). Khi n không chia hết cho k, các bin đầu nhận dư một
 * phần tử — cách chia này giữ được thứ tự và không tạo bin rỗng.
 *
 * Equal-width chia đều BỀ RỘNG khoảng giá trị.
 */
export function makeBins(values: number[], binCount: number, method: BinMethod): number[][] {
  if (binCount < 1) throw new Error('Số bin phải ≥ 1')
  if (values.length === 0) return []

  const sorted = [...values].sort((a, b) => a - b)

  if (method === 'equal-width') {
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    const width = (max - min) / binCount
    const bins: number[][] = Array.from({ length: binCount }, () => [])
    for (const v of sorted) {
      // Cận trên của bin cuối phải chứa max, nên kẹp chỉ số lại.
      const idx = width === 0 ? 0 : Math.min(binCount - 1, Math.floor((v - min) / width))
      bins[idx].push(v)
    }
    return bins
  }

  const base = Math.floor(sorted.length / binCount)
  const remainder = sorted.length % binCount
  const bins: number[][] = []
  let cursor = 0
  for (let i = 0; i < binCount; i++) {
    const size = base + (i < remainder ? 1 : 0)
    bins.push(sorted.slice(cursor, cursor + size))
    cursor += size
  }
  return bins
}

/**
 * Làm trơn một bin.
 *
 * - `means`: mọi giá trị thành trung bình bin (slide: Bin1={4,8,15} → {9,9,9}).
 * - `boundaries`: mỗi giá trị về biên gần nó hơn (slide: {4,8,15} → {4,4,15}
 *   vì 8 cách 4 là 4, cách 15 là 7). Hoà thì về biên dưới.
 * - `median`: mọi giá trị thành trung vị bin.
 */
export function smoothBin(values: number[], method: SmoothMethod): number[] {
  if (values.length === 0) return []

  if (method === 'means') {
    const m = mean(values)
    return values.map(() => m)
  }
  if (method === 'median') {
    const m = median(values)
    return values.map(() => m)
  }

  const lo = values[0]
  const hi = values[values.length - 1]
  return values.map((v) => (v - lo <= hi - v ? lo : hi))
}

export function runBinning(
  values: number[],
  binCount: number,
  binMethod: BinMethod,
  smoothMethod: SmoothMethod,
): AlgorithmResult<BinningResult> {
  const steps: Step[] = []
  const sorted = [...values].sort((a, b) => a - b)

  steps.push({
    index: 1,
    title: 'Sắp xếp dữ liệu tăng dần',
    tables: [
      {
        caption: `Sorted data (${sorted.length} giá trị)`,
        head: sorted.map((_, i) => String(i + 1)),
        body: [sorted.map((v) => fmt(v))],
      },
    ],
    note: 'Chia bin luôn làm trên dữ liệu đã sắp xếp — slide Bài 1_2 trang 16.',
  })

  const rawBins = makeBins(sorted, binCount, binMethod)
  steps.push({
    index: 2,
    title: `Chia thành ${binCount} bin — ${BIN_METHOD_LABEL[binMethod]}`,
    tables: [
      {
        caption: 'Các bin sau khi chia',
        head: ['Bin', 'Giá trị', 'Số phần tử'],
        body: rawBins.map((b, i) => [`Bin${i + 1}`, `{${b.map((v) => fmt(v)).join(', ')}}`, b.length]),
      },
    ],
  })

  const bins: Bin[] = rawBins.map((values_, i) => ({
    index: i + 1,
    values: values_,
    smoothed: smoothBin(values_, smoothMethod),
  }))

  const smoothingNote =
    smoothMethod === 'means'
      ? 'Mỗi giá trị trong bin được thay bằng trung bình của bin.'
      : smoothMethod === 'median'
        ? 'Mỗi giá trị trong bin được thay bằng trung vị của bin.'
        : 'Mỗi giá trị được kéo về biên gần nó hơn; cách đều hai biên thì về biên dưới.'

  steps.push({
    index: 3,
    title: SMOOTH_METHOD_LABEL[smoothMethod],
    tables: [
      {
        caption: 'Kết quả làm trơn từng bin',
        head: ['Bin', 'Trước', 'Sau'],
        body: bins.map((b) => [
          `Bin${b.index}`,
          `{${b.values.map((v) => fmt(v)).join(', ')}}`,
          `{${b.smoothed.map((v) => fmt(v)).join(', ')}}`,
        ]),
      },
    ],
    note: smoothingNote,
  })

  const smoothedSorted = bins.flatMap((b) => b.smoothed)
  steps.push({
    index: 4,
    title: 'Dữ liệu sau khi làm trơn',
    tables: [
      {
        caption: 'So sánh trước và sau',
        head: ['#', 'Trước', 'Sau'],
        body: sorted.map((v, i) => [i + 1, fmt(v), fmt(smoothedSorted[i])]),
      },
    ],
  })

  return { steps, result: { sorted, bins, smoothedSorted } }
}

// ------------------------------------------------------------- chuẩn hoá

export type NormalizeMethod = 'min-max' | 'z-score' | 'z-score-mad'

export const NORMALIZE_METHOD_LABEL: Record<NormalizeMethod, string> = {
  'min-max': 'Chuẩn hoá min-max (Bài 1_2 trang 36)',
  'z-score': 'Chuẩn hoá z-score dùng độ lệch chuẩn σ (Bài 1_2 trang 37)',
  'z-score-mad': 'Chuẩn hoá z-score dùng sai biệt tuyệt đối trung bình s (Bài 6 trang 12)',
}

export type NormalizeResult = {
  values: number[]
  normalized: number[]
  stats: Record<string, number>
}

/** v' = ((v − min)/(max − min))·(newMax − newMin) + newMin — slide trang 36. */
export function minMaxNormalize(values: number[], newMin = 0, newMax = 1): number[] {
  const min = Math.min(...values)
  const max = Math.max(...values)
  // Cột hằng số: mọi giá trị về cận dưới mới thay vì chia cho 0.
  if (max === min) return values.map(() => newMin)
  return values.map((v) => ((v - min) / (max - min)) * (newMax - newMin) + newMin)
}

/** Độ lệch chuẩn tổng thể (chia n), đúng như slide dùng. */
export function stdDev(values: number[]): number {
  const m = mean(values)
  return Math.sqrt(values.reduce((s, v) => s + (v - m) ** 2, 0) / values.length)
}

/** Sai biệt tuyệt đối trung bình sf = (1/n)Σ|xi − m| — slide Bài 6 trang 12. */
export function meanAbsoluteDeviation(values: number[]): number {
  const m = mean(values)
  return values.reduce((s, v) => s + Math.abs(v - m), 0) / values.length
}

export function runNormalize(
  values: number[],
  method: NormalizeMethod,
  options: { newMin?: number; newMax?: number } = {},
): AlgorithmResult<NormalizeResult> {
  const steps: Step[] = []
  const { newMin = 0, newMax = 1 } = options
  const stats: Record<string, number> = {}
  let normalized: number[]

  if (method === 'min-max') {
    const min = Math.min(...values)
    const max = Math.max(...values)
    stats.min = min
    stats.max = max
    normalized = minMaxNormalize(values, newMin, newMax)

    steps.push({
      index: 1,
      title: 'Xác định min và max của thuộc tính',
      formula: `min_A = ${fmt(min)}, \\quad max_A = ${fmt(max)}`,
      note: `Khoảng đích: [${fmt(newMin)}, ${fmt(newMax)}].`,
    })
    steps.push({
      index: 2,
      title: 'Áp dụng công thức min-max',
      formula: `v' = \\frac{v - min_A}{max_A - min_A}(new\\_max_A - new\\_min_A) + new\\_min_A`,
      tables: [
        {
          caption: 'Thay số từng giá trị',
          head: ['v', 'Thay số', "v'"],
          body: values.map((v, i) => [
            fmt(v),
            `(${fmt(v)} − ${fmt(min)})/(${fmt(max)} − ${fmt(min)})`,
            fmtFixed(normalized[i]),
          ]),
        },
      ],
    })
  } else {
    const m = mean(values)
    const spread = method === 'z-score' ? stdDev(values) : meanAbsoluteDeviation(values)
    stats.mean = m
    stats.spread = spread
    normalized = values.map((v) => (spread === 0 ? 0 : (v - m) / spread))

    const spreadSymbol = method === 'z-score' ? '\\sigma_A' : 's_f'
    steps.push({
      index: 1,
      title: 'Tính trung bình',
      formula: `\\bar{A} = \\frac{1}{n}\\sum v_i = \\frac{${fmt(values.reduce((s, v) => s + v, 0))}}{${values.length}} = ${fmtFixed(m)}`,
    })
    steps.push({
      index: 2,
      title:
        method === 'z-score'
          ? 'Tính độ lệch chuẩn σ'
          : 'Tính sai biệt tuyệt đối trung bình s',
      formula:
        method === 'z-score'
          ? `\\sigma_A = \\sqrt{\\frac{1}{n}\\sum (v_i - \\bar{A})^2} = ${fmtFixed(spread)}`
          : `s_f = \\frac{1}{n}\\sum |x_{if} - m_f| = ${fmtFixed(spread)}`,
      note:
        method === 'z-score-mad'
          ? 'Slide Bài 6 trang 12 dùng sai biệt tuyệt đối trung bình chứ không phải độ lệch chuẩn — hai công thức cho hai con số khác nhau, đừng lẫn.'
          : undefined,
    })
    steps.push({
      index: 3,
      title: 'Áp dụng công thức z-score',
      formula: `v' = \\frac{v - \\bar{A}}{${spreadSymbol}}`,
      tables: [
        {
          caption: 'Thay số từng giá trị',
          head: ['v', 'Thay số', "v'"],
          body: values.map((v, i) => [
            fmt(v),
            `(${fmt(v)} − ${fmtFixed(m)})/${fmtFixed(spread)}`,
            fmtFixed(normalized[i]),
          ]),
        },
      ],
    })
  }

  return { steps, result: { values, normalized, stats } }
}

// -------------------------------------------------- xử lý giá trị thiếu

export type MissingStrategy = 'drop-row' | 'fill-mean' | 'fill-median' | 'fill-mode'

export const MISSING_STRATEGY_LABEL: Record<MissingStrategy, string> = {
  'drop-row': 'Bỏ dòng có ô trống',
  'fill-mean': 'Điền trung bình cột (cột số)',
  'fill-median': 'Điền trung vị cột (cột số)',
  'fill-mode': 'Điền giá trị hay gặp nhất (mode)',
}

/** Ô trống: chuỗi rỗng, undefined, null, hoặc NaN. */
export function isMissing(value: string | number | undefined | null): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'number') return Number.isNaN(value)
  return value.trim() === ''
}

export type MissingResult = {
  dataset: Dataset
  /** Số ô trống trước khi xử lý, theo từng thuộc tính. */
  missingByAttribute: Record<string, number>
  removedRows: number
  filled: { row: number; attribute: string; value: string | number }[]
}

function modeOf(values: (string | number)[]): string | number | undefined {
  const counts = new Map<string | number, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  let best: string | number | undefined
  let bestCount = -1
  for (const [v, c] of counts) {
    if (c > bestCount) {
      best = v
      bestCount = c
    }
  }
  return best
}

export function runMissingValues(
  dataset: Dataset,
  strategy: MissingStrategy,
): AlgorithmResult<MissingResult> {
  const steps: Step[] = []

  const missingByAttribute: Record<string, number> = {}
  for (const attr of dataset.attributes) {
    missingByAttribute[attr.name] = dataset.rows.filter((r) => isMissing(r[attr.name])).length
  }
  const totalMissing = Object.values(missingByAttribute).reduce((s, n) => s + n, 0)

  steps.push({
    index: 1,
    title: 'Đếm ô trống theo từng thuộc tính',
    tables: [
      {
        caption: `Tổng cộng ${totalMissing} ô trống trên ${dataset.rows.length} dòng`,
        head: ['Thuộc tính', 'Kiểu', 'Số ô trống'],
        body: dataset.attributes.map((a) => [
          a.name,
          a.type === 'numeric' ? 'số' : 'danh mục',
          missingByAttribute[a.name],
        ]),
      },
    ],
  })

  const filled: MissingResult['filled'] = []
  let rows = dataset.rows
  let removedRows = 0

  if (strategy === 'drop-row') {
    const kept = rows.filter((r) => !dataset.attributes.some((a) => isMissing(r[a.name])))
    removedRows = rows.length - kept.length
    rows = kept
    steps.push({
      index: 2,
      title: 'Bỏ dòng có ô trống',
      note: `Đã bỏ ${removedRows} dòng, còn lại ${rows.length} dòng. Cách này đơn giản nhưng mất dữ liệu — slide Bài 1_2 trang 9 xếp nó là lựa chọn cuối.`,
    })
  } else {
    const fillValues: Record<string, string | number | undefined> = {}
    for (const attr of dataset.attributes) {
      const present = rows.map((r) => r[attr.name]).filter((v) => !isMissing(v))
      if (present.length === 0) continue

      if (attr.type === 'numeric' && strategy !== 'fill-mode') {
        const nums = present as number[]
        fillValues[attr.name] = strategy === 'fill-mean' ? mean(nums) : median(nums)
      } else {
        fillValues[attr.name] = modeOf(present)
      }
    }

    rows = rows.map((r, rowIndex) => {
      const next = { ...r }
      for (const attr of dataset.attributes) {
        if (isMissing(next[attr.name])) {
          const v = fillValues[attr.name]
          if (v !== undefined) {
            next[attr.name] = v
            filled.push({ row: rowIndex + 1, attribute: attr.name, value: v })
          }
        }
      }
      return next
    })

    steps.push({
      index: 2,
      title: MISSING_STRATEGY_LABEL[strategy],
      tables: [
        {
          caption: 'Giá trị dùng để điền cho từng thuộc tính',
          head: ['Thuộc tính', 'Giá trị điền'],
          body: dataset.attributes
            .filter((a) => missingByAttribute[a.name] > 0)
            .map((a) => [
              a.name,
              typeof fillValues[a.name] === 'number'
                ? fmtFixed(fillValues[a.name] as number)
                : String(fillValues[a.name] ?? '—'),
            ]),
        },
        ...(filled.length > 0
          ? [
              {
                caption: 'Các ô đã điền',
                head: ['Dòng', 'Thuộc tính', 'Giá trị'],
                body: filled.map((f) => [
                  f.row,
                  f.attribute,
                  typeof f.value === 'number' ? fmtFixed(f.value) : f.value,
                ]),
              } satisfies StepTable,
            ]
          : []),
      ],
    })
  }

  steps.push({
    index: 3,
    title: 'Bảng dữ liệu sau xử lý',
    tables: [
      {
        caption: `${rows.length} dòng`,
        head: dataset.attributes.map((a) => a.name),
        body: rows.map((r) =>
          dataset.attributes.map((a) => {
            const v = r[a.name]
            if (isMissing(v)) return '—'
            return typeof v === 'number' ? fmt(v) : String(v)
          }),
        ),
      },
    ],
  })

  return {
    steps,
    result: {
      dataset: { ...dataset, rows },
      missingByAttribute,
      removedRows,
      filled,
    },
  }
}
