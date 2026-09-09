/**
 * F10 — Mạng Kohonen (SOM). Slide Bài 8 trang 12-25.
 *
 * Slide không cho bảng số mẫu nào, chỉ cho mã C ba bước:
 *  - Khởi tạo (trang 15): mỗi thành phần nơron = 0.5 ± một lượng ngẫu nhiên nhỏ.
 *  - Tìm nơron chiến thắng (trang 20): duyệt cả map, lấy khoảng cách Euclid
 *    nhỏ nhất.
 *  - Cập nhật lân cận (trang 23): w += Alpha * (TrainVector − w) cho mọi nơron
 *    trong hình vuông [LowX..HighX] × [LowY..HighY].
 *
 * Vì slide dùng rand() nên kết quả không tái lập được. Ở đây thay bằng bộ sinh
 * số giả ngẫu nhiên có seed — cùng seed cho cùng kết quả, nên test so được và
 * lúc demo trước lớp bấm lại vẫn ra đúng hình cũ.
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step, StepTable } from '@/types'
import { fmt, fmtFixed } from '@/lib/format'
import { euclidean } from '@/lib/distance'

export type SomNeuron = {
  x: number
  y: number
  weights: number[]
}

export type SomUpdate = {
  epoch: number
  /** Chỉ số mẫu học trong bảng. */
  sampleIndex: number
  sampleLabel: string
  winner: { x: number; y: number }
  winnerDistance: number
  /** Số nơron được cập nhật ở lượt này (nơron thắng + vùng lân cận). */
  updatedCount: number
  alpha: number
  radius: number
}

export type SomResult = {
  rows: number
  cols: number
  dimensions: string[]
  /** Trọng số cuối, map[y][x]. */
  map: SomNeuron[][]
  updates: SomUpdate[]
  /** Nơron thắng của từng mẫu sau khi học xong — dùng để tô heatmap. */
  finalWinners: { label: string; x: number; y: number }[]
  /** Số mẫu rơi vào từng nơron, map[y][x]. */
  hitCounts: number[][]
}

/**
 * Bộ sinh số giả ngẫu nhiên mulberry32.
 *
 * Chọn cái này vì viết được trong sáu dòng, không cần thư viện, và cùng seed
 * thì cho cùng dãy trên mọi máy — điều kiện để test và để demo lặp lại được.
 */
export function makeRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Khởi tạo map — slide trang 15.
 *
 * Mã C của thầy: mỗi thành phần bằng 0.5 rồi cộng thêm `val1 * val2`, với
 * val1 và val2 đều nằm trong khoảng −0.10 … 0.10. Tích hai số đó nằm trong
 * −0.01 … 0.01, nên trọng số khởi tạo bám rất sát 0.5.
 */
export function initMap(
  rows: number,
  cols: number,
  dimensionCount: number,
  random: () => number,
): SomNeuron[][] {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => ({
      x,
      y,
      weights: Array.from({ length: dimensionCount }, () => {
        const val1 = (random() * 100 - 50) / 500
        const val2 = (random() * 100 - 50) / 500
        return 0.5 + val1 * val2
      }),
    })),
  )
}

/** Tìm nơron chiến thắng — slide trang 20. Hoà thì lấy nơron gặp trước. */
export function findWinner(
  map: SomNeuron[][],
  sample: number[],
): { x: number; y: number; distance: number } {
  let best = { x: 0, y: 0, distance: Number.POSITIVE_INFINITY }
  for (const row of map) {
    for (const neuron of row) {
      const d = euclidean(sample, neuron.weights)
      if (d < best.distance) best = { x: neuron.x, y: neuron.y, distance: d }
    }
  }
  return best
}

/**
 * Cập nhật nơron thắng và vùng lân cận — slide trang 23.
 * Vùng lân cận là hình vuông bán kính `radius` quanh nơron thắng (trang 22).
 */
export function updateNeighborhood(
  map: SomNeuron[][],
  winner: { x: number; y: number },
  sample: number[],
  alpha: number,
  radius: number,
): number {
  const rows = map.length
  const cols = map[0].length
  const lowY = Math.max(0, winner.y - radius)
  const highY = Math.min(rows - 1, winner.y + radius)
  const lowX = Math.max(0, winner.x - radius)
  const highX = Math.min(cols - 1, winner.x + radius)

  let updated = 0
  for (let i = lowY; i <= highY; i++) {
    for (let j = lowX; j <= highX; j++) {
      const neuron = map[i][j]
      for (let k = 0; k < neuron.weights.length; k++) {
        const work = sample[k] - neuron.weights[k]
        neuron.weights[k] += alpha * work
      }
      updated++
    }
  }
  return updated
}

export type KohonenOptions = {
  rows?: number
  cols?: number
  epochs?: number
  /** Hệ số học ban đầu. */
  alpha?: number
  /** Bán kính vùng lân cận ban đầu. */
  radius?: number
  /** Giảm dần alpha và radius theo số vòng — slide không nói, nhưng không giảm thì map không ổn định. */
  decay?: boolean
  seed?: number
}

function mapTable(map: SomNeuron[][], dimensionIndex: number, caption: string): StepTable {
  return {
    caption,
    head: ['', ...map[0].map((_, x) => `cột ${x}`)],
    body: map.map((row, y) => [`dòng ${y}`, ...row.map((n) => fmtFixed(n.weights[dimensionIndex]))]),
  }
}

export function runKohonen(
  dataset: Dataset,
  options: KohonenOptions = {},
): AlgorithmResult<SomResult> {
  const {
    rows = 4,
    cols = 4,
    epochs = 10,
    alpha = 0.5,
    radius = 1,
    decay = true,
    seed = 42,
  } = options

  const numericAttrs = dataset.attributes.filter((a) => a.type === 'numeric')
  if (numericAttrs.length === 0) throw new Error('Bảng phải có ít nhất một cột số.')
  if (dataset.rows.length === 0) throw new Error('Bảng dữ liệu rỗng.')
  if (rows < 1 || cols < 1) throw new Error('Kích thước map phải ≥ 1×1.')

  const labelAttr = dataset.attributes.find((a) => a.type === 'nominal')
  const dimensions = numericAttrs.map((a) => a.name)
  const samples = dataset.rows.map((row, i) => ({
    label: labelAttr ? String(row[labelAttr.name] ?? `p${i + 1}`) : `p${i + 1}`,
    values: numericAttrs.map((a) => Number(row[a.name])),
  }))

  const random = makeRandom(seed)
  const map = initMap(rows, cols, dimensions.length, random)
  const steps: Step[] = []
  let stepIndex = 1

  steps.push({
    index: stepIndex++,
    title: 'Khởi tạo map hai chiều',
    formula: `w_{ijk} = 0.5 + \\varepsilon,\\quad |\\varepsilon| \\le 0.01`,
    tables: [
      {
        caption: `${samples.length} mẫu học, ${dimensions.length} đặc trưng (${dimensions.join(', ')})`,
        head: ['Mẫu', ...dimensions],
        body: samples.map((s) => [s.label, ...s.values.map((v) => fmt(v))]),
      },
      mapTable(map, 0, `Trọng số khởi tạo — chiều "${dimensions[0]}"`),
    ],
    note: `Map ${rows}×${cols}, hệ số học ban đầu α = ${fmt(alpha)}, bán kính lân cận ban đầu = ${radius}${decay ? ', cả hai giảm dần theo vòng học' : ''}. Seed = ${seed} nên chạy lại cho đúng kết quả cũ.`,
  })

  const updates: SomUpdate[] = []

  for (let epoch = 1; epoch <= epochs; epoch++) {
    const progress = epochs === 1 ? 0 : (epoch - 1) / (epochs - 1)
    const currentAlpha = decay ? alpha * (1 - progress) + 0.01 * progress : alpha
    const currentRadius = decay ? Math.max(0, Math.round(radius * (1 - progress))) : radius

    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i]
      const winner = findWinner(map, sample.values)
      const updatedCount = updateNeighborhood(
        map,
        winner,
        sample.values,
        currentAlpha,
        currentRadius,
      )
      updates.push({
        epoch,
        sampleIndex: i,
        sampleLabel: sample.label,
        winner: { x: winner.x, y: winner.y },
        winnerDistance: winner.distance,
        updatedCount,
        alpha: currentAlpha,
        radius: currentRadius,
      })
    }

    // Chỉ ghi bước cho vòng đầu, vòng giữa và vòng cuối — ghi cả 10 vòng thì
    // panel dài mấy trăm dòng mà không thêm thông tin gì.
    const isReported = epoch === 1 || epoch === epochs || epoch === Math.ceil(epochs / 2)
    if (isReported) {
      const epochUpdates = updates.filter((u) => u.epoch === epoch)
      steps.push({
        index: stepIndex++,
        title:
          epoch === 1
            ? 'Vòng học 1 — tìm nơron chiến thắng và cập nhật lân cận'
            : `Vòng học ${epoch}`,
        formula:
          epoch === 1
            ? `w_{ijk} \\mathrel{+}= \\alpha\\,(x_k - w_{ijk})`
            : undefined,
        tables: [
          {
            caption: `Nơron chiến thắng từng mẫu (α = ${fmtFixed(currentAlpha)}, bán kính = ${currentRadius})`,
            head: ['Mẫu', 'Nơron thắng (dòng, cột)', 'Khoảng cách', 'Số nơron được cập nhật'],
            body: epochUpdates.map((u) => [
              u.sampleLabel,
              `(${u.winner.y}, ${u.winner.x})`,
              fmtFixed(u.winnerDistance),
              u.updatedCount,
            ]),
          },
          mapTable(map, 0, `Trọng số sau vòng ${epoch} — chiều "${dimensions[0]}"`),
        ],
        note:
          epoch === 1
            ? 'Nơron thắng là nơron có khoảng cách tới mẫu học nhỏ nhất; nó và các nơron trong bán kính lân cận được kéo về phía mẫu học.'
            : undefined,
      })
    }
  }

  // Sau khi học xong, xếp từng mẫu vào nơron gần nó nhất — slide trang 25.
  const finalWinners = samples.map((s) => {
    const w = findWinner(map, s.values)
    return { label: s.label, x: w.x, y: w.y }
  })

  const hitCounts = Array.from({ length: rows }, () => Array<number>(cols).fill(0))
  for (const w of finalWinners) hitCounts[w.y][w.x]++

  steps.push({
    index: stepIndex++,
    title: 'Xếp mẫu học vào nơron gần nhất',
    tables: [
      {
        caption: 'Mẫu học và nơron của nó',
        head: ['Mẫu', 'Nơron (dòng, cột)'],
        body: finalWinners.map((w) => [w.label, `(${w.y}, ${w.x})`]),
      },
      {
        caption: 'Số mẫu rơi vào từng nơron',
        head: ['', ...Array.from({ length: cols }, (_, x) => `cột ${x}`)],
        body: hitCounts.map((row, y) => [`dòng ${y}`, ...row]),
      },
    ],
    note: `Các mẫu gom về ${new Set(finalWinners.map((w) => `${w.y},${w.x}`)).size} nơron trên map ${rows}×${cols}.`,
  })

  return {
    steps,
    result: { rows, cols, dimensions, map, updates, finalWinners, hitCounts },
  }
}
