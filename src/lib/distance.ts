/**
 * Độ đo khoảng cách — dùng chung cho k-means (Bài 6) và Kohonen (Bài 8).
 *
 * Ký pháp theo slide Bài 6 trang 13-15: Minkowski bậc q, Manhattan là q=1,
 * Euclidean là q=2.
 */

function assertSameLength(a: number[], b: number[]): void {
  if (a.length !== b.length) {
    throw new Error(`Hai vector khác số chiều: ${a.length} và ${b.length}`)
  }
}

/** d(i,j) = √(Σ (x_ik − x_jk)²) — slide Bài 6 trang 15. */
export function euclidean(a: number[], b: number[]): number {
  assertSameLength(a, b)
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2
  return Math.sqrt(sum)
}

/** d(i,j) = Σ |x_ik − x_jk| — slide Bài 6 trang 14. */
export function manhattan(a: number[], b: number[]): number {
  assertSameLength(a, b)
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i])
  return sum
}

/** d(i,j) = q√(Σ |x_ik − x_jk|^q) — slide Bài 6 trang 13. */
export function minkowski(a: number[], b: number[], q: number): number {
  assertSameLength(a, b)
  if (q < 1) throw new Error('Bậc q của khoảng cách Minkowski phải ≥ 1')
  let sum = 0
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]) ** q
  return sum ** (1 / q)
}

export type DistanceName = 'euclidean' | 'manhattan'

export const DISTANCES: Record<DistanceName, { label: string; fn: (a: number[], b: number[]) => number }> =
  {
    euclidean: { label: 'Euclid', fn: euclidean },
    manhattan: { label: 'Manhattan', fn: manhattan },
  }
