/**
 * Format số dùng chung cho cả 8 route.
 *
 * Luật của môn: DẤU CHẤM thập phân, mặc định 3 chữ số (`0.940`, `0.694`).
 * Đây là ký pháp trong slide thầy — dùng `toLocaleString('vi-VN')` sẽ ra dấu
 * phẩy và lệch với slide. Xem docs/format-trinh-bay-cua-GV.md.
 */

/** Số chữ số thập phân mặc định, khớp slide (0.940). */
export const DEFAULT_DIGITS = 3

/**
 * Làm tròn về `digits` chữ số thập phân, luôn dùng dấu chấm.
 * Số nguyên giữ nguyên dạng nguyên: `fmt(14)` -> `'14'`, không phải `'14.000'`.
 */
export function fmt(value: number, digits: number = DEFAULT_DIGITS): string {
  if (!Number.isFinite(value)) return value > 0 ? '∞' : Number.isNaN(value) ? 'NaN' : '-∞'
  if (Number.isInteger(value)) return String(value)
  const rounded = value.toFixed(digits)
  // -0.000 đọc ra rất khó chịu trong bảng, quy về 0.000
  return rounded === `-${(0).toFixed(digits)}` ? (0).toFixed(digits) : rounded
}

/** Như `fmt` nhưng luôn giữ đủ `digits` chữ số: `fmtFixed(1)` -> `'1.000'`. */
export function fmtFixed(value: number, digits: number = DEFAULT_DIGITS): string {
  if (!Number.isFinite(value)) return fmt(value, digits)
  const rounded = value.toFixed(digits)
  return rounded === `-${(0).toFixed(digits)}` ? (0).toFixed(digits) : rounded
}

/** Phân số dạng `9/14` — slide viết trọn phân số trước khi ra số thập phân. */
export function fmtFraction(numerator: number, denominator: number): string {
  return `${fmt(numerator)}/${fmt(denominator)}`
}

/** Phần trăm, VD `fmtPercent(0.643)` -> `'64.30%'`. */
export function fmtPercent(value: number, digits: number = 2): string {
  return `${fmtFixed(value * 100, digits)}%`
}

/** Toạ độ điểm kiểu slide k-means: `A1(1,9)`, `V1(1.27,3)`. */
export function fmtPoint(coords: number[], label?: string): string {
  const body = `(${coords.map((c) => fmt(c)).join(',')})`
  return label ? `${label}${body}` : body
}
