import { describe, expect, it } from 'vitest'
import {
  isMissing,
  makeBins,
  meanAbsoluteDeviation,
  minMaxNormalize,
  runBinning,
  runMissingValues,
  smoothBin,
  stdDev,
} from './index'
import { TIEN_XU_LY_HON_HOP } from '@/data/samples'

/**
 * Ví dụ slide Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 16:
 * Sorted data for price: 4, 8, 15, 21, 21, 24, 25, 28, 34.
 */
const PRICE = [4, 8, 15, 21, 21, 24, 25, 28, 34]

describe('chia bin — khớp ví dụ slide trang 16', () => {
  it('chia 3 equal-frequency bin đúng như slide', () => {
    expect(makeBins(PRICE, 3, 'equal-frequency')).toEqual([
      [4, 8, 15],
      [21, 21, 24],
      [25, 28, 34],
    ])
  })

  it('làm trơn theo bin means ra {9,9,9} / {22,22,22} / {29,29,29}', () => {
    const bins = makeBins(PRICE, 3, 'equal-frequency')
    expect(bins.map((b) => smoothBin(b, 'means'))).toEqual([
      [9, 9, 9],
      [22, 22, 22],
      [29, 29, 29],
    ])
  })

  it('làm trơn theo bin boundaries ra {4,4,15} / {21,21,24} / {25,25,34}', () => {
    const bins = makeBins(PRICE, 3, 'equal-frequency')
    expect(bins.map((b) => smoothBin(b, 'boundaries'))).toEqual([
      [4, 4, 15],
      [21, 21, 24],
      [25, 25, 34],
    ])
  })

  it('runBinning trả đủ 4 bước và dữ liệu đã làm trơn', () => {
    const { steps, result } = runBinning(PRICE, 3, 'equal-frequency', 'means')
    expect(steps).toHaveLength(4)
    expect(steps[0].title).toBe('Sắp xếp dữ liệu tăng dần')
    expect(result.smoothedSorted).toEqual([9, 9, 9, 22, 22, 22, 29, 29, 29])
  })
})

describe('chia bin — các trường hợp biên', () => {
  it('n không chia hết cho k thì bin đầu nhận phần dư, không có bin rỗng', () => {
    const bins = makeBins([1, 2, 3, 4, 5, 6, 7], 3, 'equal-frequency')
    expect(bins.map((b) => b.length)).toEqual([3, 2, 2])
    expect(bins.flat()).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('equal-width chia theo bề rộng khoảng giá trị', () => {
    expect(makeBins([0, 1, 2, 9, 10], 2, 'equal-width')).toEqual([
      [0, 1, 2],
      [9, 10],
    ])
  })

  it('cột hằng số không làm vỡ equal-width', () => {
    expect(makeBins([5, 5, 5], 2, 'equal-width')).toEqual([[5, 5, 5], []])
  })

  it('boundaries: cách đều hai biên thì về biên dưới', () => {
    expect(smoothBin([0, 5, 10], 'boundaries')).toEqual([0, 0, 10])
  })
})

describe('chuẩn hoá', () => {
  it('min-max đưa về đúng [0,1] và giữ được giá trị lặp', () => {
    const out = minMaxNormalize(PRICE)
    expect(out[0]).toBe(0)
    expect(out[out.length - 1]).toBe(1)
    // 21 xuất hiện hai lần, cả hai phải ra cùng một trị.
    expect(out[3]).toBeCloseTo(out[4], 12)
    expect(out[3]).toBeCloseTo((21 - 4) / (34 - 4), 12)
  })

  it('min-max đổi được khoảng đích', () => {
    expect(minMaxNormalize([0, 5, 10], 0, 100)).toEqual([0, 50, 100])
  })

  it('cột hằng số không chia cho 0', () => {
    expect(minMaxNormalize([7, 7, 7])).toEqual([0, 0, 0])
  })

  it('σ và sai biệt tuyệt đối trung bình là hai số khác nhau', () => {
    const values = [1, 2, 3, 4, 10]
    // mean = 4; σ = √((9+4+1+0+36)/5) = √10; MAD = (3+2+1+0+6)/5 = 2.4
    expect(stdDev(values)).toBeCloseTo(Math.sqrt(10), 12)
    expect(meanAbsoluteDeviation(values)).toBeCloseTo(2.4, 12)
  })
})

describe('xử lý giá trị thiếu', () => {
  it('nhận ra ô trống là chuỗi rỗng và NaN', () => {
    expect(isMissing('')).toBe(true)
    expect(isMissing('   ')).toBe(true)
    expect(isMissing(Number.NaN)).toBe(true)
    expect(isMissing(0)).toBe(false)
    expect(isMissing('Không')).toBe(false)
  })

  it('bỏ dòng có ô trống', () => {
    const { result } = runMissingValues(TIEN_XU_LY_HON_HOP, 'drop-row')
    // A2 thiếu Thu nhập, A3 thiếu Tuổi, A6 thiếu Nghề → bỏ 3 dòng.
    expect(result.removedRows).toBe(3)
    expect(result.dataset.rows).toHaveLength(3)
  })

  it('điền trung bình cho cột số và mode cho cột danh mục', () => {
    const { result } = runMissingValues(TIEN_XU_LY_HON_HOP, 'fill-mean')
    expect(result.dataset.rows).toHaveLength(6)
    // Tuổi có mặt: 25, 31, 45, 22, 38 → trung bình 32.2
    expect(result.dataset.rows[2]['Tuổi']).toBeCloseTo(32.2, 12)
    // Nghề có mặt: Kỹ sư, Bác sĩ, Sinh viên, Bác sĩ, Sinh viên → mode Bác sĩ
    expect(result.dataset.rows[5]['Nghề']).toBe('Bác sĩ')
  })

  it('không đụng vào ô đã có dữ liệu', () => {
    const { result } = runMissingValues(TIEN_XU_LY_HON_HOP, 'fill-median')
    expect(result.dataset.rows[0]['Tuổi']).toBe(25)
    expect(result.dataset.rows[0]['Thu nhập']).toBe(12000)
  })
})
