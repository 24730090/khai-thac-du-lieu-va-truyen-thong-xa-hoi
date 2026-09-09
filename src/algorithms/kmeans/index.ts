/**
 * F9 — Gom cụm k-means. Slide Bài 6 trang 14-29.
 *
 * Thuật toán CHỈ có 4 bước và bước 4 quay lại bước 2 (trang 14). Từ vòng lặp
 * thứ hai, tên mục lấy đúng tiêu đề slide: "Tính lại trọng tâm" (27),
 * "Tính khoảng cách" (28), "Ma trận phân hoạch U2" (29). Đừng chế thêm
 * "Bước 5, 6, 7" — xem docs/format-trinh-bay-cua-GV.md.
 *
 * Hàm thuần, không import React.
 */
import type { AlgorithmResult, Dataset, Step, StepTable } from '@/types'
import { fmt, fmtFixed, fmtPoint } from '@/lib/format'
import { DISTANCES, type DistanceName } from '@/lib/distance'

export type Point = {
  label: string
  coords: number[]
}

/** Ma trận phân hoạch U: hàng là cụm, cột là điểm, ô 0/1. */
export type PartitionMatrix = (0 | 1)[][]

export type Iteration = {
  /** n của Un. U0 là phân hoạch khởi tạo. */
  n: number
  centroids: number[][]
  /** distances[pointIndex][clusterIndex]. */
  distances: number[][]
  /** assignment[pointIndex] = chỉ số cụm. */
  assignment: number[]
  matrix: PartitionMatrix
  /** |Un − Un-1|, tổng trị tuyệt đối chênh lệch từng ô. */
  delta: number
}

export type KmeansResult = {
  points: Point[]
  dimensions: string[]
  k: number
  iterations: Iteration[]
  /** Phân hoạch cuối. */
  assignment: number[]
  centroids: number[][]
  converged: boolean
}

export type KmeansOptions = {
  k: number
  /**
   * Phân hoạch khởi tạo U0: initialAssignment[i] là cụm của điểm i.
   * Không truyền thì lấy k điểm đầu tiên làm k cụm một phần tử, phần còn lại
   * dồn vào cụm cuối — đúng kiểu U0 của slide trang 19
   * (c1 = {x1}, c2 = {x2,x3,x4}).
   */
  initialAssignment?: number[]
  distance?: DistanceName
  maxIterations?: number
}

/** Đọc `Dataset` thành danh sách điểm: cột danh mục đầu là nhãn, cột số là toạ độ. */
export function toPoints(dataset: Dataset): { points: Point[]; dimensions: string[] } {
  const numericAttrs = dataset.attributes.filter((a) => a.type === 'numeric')
  if (numericAttrs.length === 0) throw new Error('Bảng phải có ít nhất một cột số làm toạ độ.')

  const labelAttr = dataset.attributes.find((a) => a.type === 'nominal')
  const dimensions = numericAttrs.map((a) => a.name)

  const points = dataset.rows.map((row, i) => ({
    label: labelAttr ? String(row[labelAttr.name] ?? `x${i + 1}`) : `x${i + 1}`,
    coords: numericAttrs.map((a) => Number(row[a.name])),
  }))

  return { points, dimensions }
}

/** Dựng ma trận phân hoạch từ mảng gán cụm. */
export function toMatrix(assignment: number[], k: number): PartitionMatrix {
  return Array.from({ length: k }, (_, c) =>
    assignment.map((a) => (a === c ? 1 : 0) as 0 | 1),
  )
}

/** |Un − Un-1| = tổng trị tuyệt đối chênh lệch từng ô — điều kiện dừng trang 27. */
export function matrixDelta(a: PartitionMatrix, b: PartitionMatrix): number {
  let sum = 0
  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < a[r].length; c++) sum += Math.abs(a[r][c] - b[r][c])
  }
  return sum
}

/**
 * Trọng tâm cụm: v_j = (Σ m_ji · x_i) / (Σ m_ji) — slide trang 21-23.
 * Cụm rỗng giữ nguyên trọng tâm cũ thay vì ra NaN.
 */
export function centroidOf(
  points: Point[],
  assignment: number[],
  cluster: number,
  dimensionCount: number,
  fallback?: number[],
): number[] {
  const members = points.filter((_, i) => assignment[i] === cluster)
  if (members.length === 0) return fallback ?? Array(dimensionCount).fill(0)
  return Array.from(
    { length: dimensionCount },
    (_, d) => members.reduce((s, p) => s + p.coords[d], 0) / members.length,
  )
}

function matrixTable(matrix: PartitionMatrix, points: Point[], name: string): StepTable {
  return {
    caption: `Ma trận phân hoạch ${name}`,
    head: ['', ...points.map((p) => p.label)],
    body: matrix.map((row, c) => [`c${c + 1}`, ...row]),
  }
}

function distanceTable(
  points: Point[],
  distances: number[][],
  centroids: number[][],
  assignment: number[],
): StepTable {
  return {
    caption: 'Bảng khoảng cách',
    head: [
      'X',
      ...centroids.map((v, i) => `V${i + 1}${fmtPoint(v)}`),
      'Cụm',
    ],
    body: points.map((p, i) => [
      fmtPoint(p.coords, p.label),
      ...distances[i].map((d) => fmtFixed(d)),
      `c${assignment[i] + 1}`,
    ]),
  }
}

export function runKmeans(
  dataset: Dataset,
  options: KmeansOptions,
): AlgorithmResult<KmeansResult> {
  const { k, distance = 'euclidean', maxIterations = 20 } = options
  const { points, dimensions } = toPoints(dataset)

  if (k < 1) throw new Error('k phải ≥ 1.')
  if (k > points.length) throw new Error(`k = ${k} lớn hơn số điểm (${points.length}).`)

  const distanceFn = DISTANCES[distance].fn
  const dim = dimensions.length
  const steps: Step[] = []
  let stepIndex = 1

  // ------------------------------------------------- U0, phân hoạch khởi tạo
  const initialAssignment =
    options.initialAssignment ??
    points.map((_, i) => (i < k ? i : k - 1))

  if (initialAssignment.length !== points.length) {
    throw new Error('Phân hoạch khởi tạo không khớp số điểm.')
  }

  steps.push({
    index: stepIndex++,
    title: 'Dữ liệu và phân hoạch khởi tạo',
    tables: [
      {
        caption: `${points.length} điểm, ${dim} chiều (${dimensions.join(', ')})`,
        head: ['Điểm', ...dimensions],
        body: points.map((p) => [p.label, ...p.coords.map((c) => fmt(c))]),
      },
      matrixTable(toMatrix(initialAssignment, k), points, 'U0'),
    ],
    note: `Chọn k = ${k}, độ đo khoảng cách: ${DISTANCES[distance].label}.`,
  })

  const iterations: Iteration[] = []
  let assignment = initialAssignment
  let previousMatrix = toMatrix(assignment, k)
  let centroids: number[][] = []
  let converged = false

  for (let n = 1; n <= maxIterations; n++) {
    // ---- Bước: tính (lại) trọng tâm
    const previousCentroids = centroids
    centroids = Array.from({ length: k }, (_, c) =>
      centroidOf(points, assignment, c, dim, previousCentroids[c]),
    )

    const clusterSizes = Array.from({ length: k }, (_, c) =>
      assignment.filter((a) => a === c).length,
    )

    if (n === 1) {
      // Vòng lặp 1 viết đủ công thức (slide trang 18-21). Cụm một phần tử thì
      // không khai công thức — điền số vô nghĩa, xem format-trinh-bay-cua-GV.
      const detailed = centroids
        .map((v, c) => {
          if (clusterSizes[c] === 0) return `Cụm ${c + 1} rỗng, giữ nguyên trọng tâm.`
          if (clusterSizes[c] === 1) {
            const only = points[assignment.indexOf(c)]
            return `Cụm ${c + 1} chỉ có ${only.label} nên v${c + 1} = ${fmtPoint(v)}.`
          }
          const members = points.filter((_, i) => assignment[i] === c)
          const perDim = v
            .map((value, d) => {
              const numerator = members.map((p) => fmt(p.coords[d])).join(' + ')
              return `v${c + 1}${d + 1} = (${numerator})/${members.length} = ${fmt(value)}`
            })
            .join('; ')
          return `${perDim}. Vậy v${c + 1} = ${fmtPoint(v)}.`
        })
        .join('\n')

      steps.push({
        index: stepIndex++,
        title: 'Tính vector trọng tâm',
        formula: `v_{j} = \\frac{\\sum_i m_{ji}\\, x_i}{\\sum_i m_{ji}}`,
        note: detailed,
      })
    } else {
      // Từ vòng 2 chỉ LIỆT KÊ trọng tâm rồi sang bảng khoảng cách — slide
      // trang 27 làm đúng vậy, dựng lại đủ công thức là làm nhiều hơn thầy.
      steps.push({
        index: stepIndex++,
        title: 'Tính lại trọng tâm',
        note: centroids.map((v, c) => `V${c + 1}${fmtPoint(v)}`).join(', '),
      })
    }

    // ---- Bước: tính khoảng cách và gán cụm
    const distances = points.map((p) => centroids.map((v) => distanceFn(p.coords, v)))
    const nextAssignment = distances.map((row) => {
      let best = 0
      for (let c = 1; c < row.length; c++) if (row[c] < row[best]) best = c
      return best
    })

    const firstPoint = points[0]
    const firstDistanceDetail = centroids
      .map(
        (v, c) =>
          `d(${firstPoint.label},v${c + 1}) = √(${firstPoint.coords
            .map((x, d) => `(${fmt(x)} − ${fmt(v[d])})²`)
            .join(' + ')}) = ${fmtFixed(distances[0][c])}`,
      )
      .join('\n')

    steps.push({
      index: stepIndex++,
      title: n === 1 ? 'Gán các điểm vào cụm' : 'Tính khoảng cách',
      formula: `d(x,v) = \\sqrt{\\sum_{d} (x_d - v_d)^2}`,
      tables: [distanceTable(points, distances, centroids, nextAssignment)],
      note:
        n === 1
          ? `Viết trọn phép tính cho điểm đầu tiên rồi gom phần còn lại vào bảng:\n${firstDistanceDetail}`
          : undefined,
    })

    // ---- Bước: ma trận phân hoạch Un
    const matrix = toMatrix(nextAssignment, k)
    const delta = matrixDelta(matrix, previousMatrix)

    steps.push({
      index: stepIndex++,
      title: `Ma trận phân hoạch U${n}`,
      tables: [matrixTable(matrix, points, `U${n}`)],
      note: n === 1 ? 'Tăng n lên 1.' : undefined,
    })

    iterations.push({ n, centroids, distances, assignment: nextAssignment, matrix, delta })

    // ---- Bước 3: điều kiện dừng
    if (delta === 0) {
      converged = true
      assignment = nextAssignment
      steps.push({
        index: stepIndex++,
        title: 'Kiểm tra điều kiện dừng',
        formula: `|U_{${n}} - U_{${n - 1}}| = 0`,
        note: `Vì |U${n} − U${n - 1}| = 0 nên thuật toán hội tụ, dừng.`,
      })
      break
    }

    assignment = nextAssignment
    previousMatrix = matrix

    if (n === maxIterations) {
      steps.push({
        index: stepIndex++,
        title: 'Dừng vì chạm giới hạn số vòng lặp',
        note: `Đã chạy ${maxIterations} vòng mà |Un − Un−1| = ${delta} ≠ 0. Thường là do có điểm nằm cách đều hai trọng tâm.`,
      })
    }
  }

  return {
    steps,
    result: { points, dimensions, k, iterations, assignment, centroids, converged },
  }
}
