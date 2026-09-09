import { describe, expect, it } from 'vitest'
import {
  accuracy,
  computeMetrics,
  confusionFromDataset,
  f1Score,
  precision,
  recall,
  runEvaluation,
} from './index'
import { HUYET_AP_100 } from '@/data/samples'

/**
 * Bài tập chẩn đoán cao huyết áp — Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf
 * trang 11: TP=25, FN=15, FP=10, TN=50.
 */
const HUYET_AP = { tp: 25, fn: 15, fp: 10, tn: 50 }

describe('bốn chỉ số — khớp bài giải slide trang 13-16', () => {
  it('Accuracy = 75/100 = 0.75', () => {
    expect(accuracy(HUYET_AP)).toBeCloseTo(0.75, 12)
  })

  it('Precision = 25/35 ≈ 0.714', () => {
    expect(precision(HUYET_AP)).toBeCloseTo(0.714, 3)
  })

  it('Recall = 25/40 = 0.625', () => {
    expect(recall(HUYET_AP)).toBeCloseTo(0.625, 12)
  })

  /**
   * Slide trang 16 ghi F1 ≈ 0.666 vì thay số ĐÃ LÀM TRÒN vào công thức:
   * 2·(0.714 × 0.625)/(0.714 + 0.625) = 0.66654.
   * Tính không làm tròn giữa chừng thì F1 = 2·(25/35 · 25/40)/(25/35 + 25/40)
   * = 2/3 = 0.667. App tính chính xác nên ra 0.667 — chênh 0.001 so với slide
   * là do làm tròn, không phải sai thuật toán.
   */
  it('F1 = 2/3 (slide ghi 0.666 do thay số đã làm tròn)', () => {
    const m = computeMetrics(HUYET_AP)
    expect(m.f1).toBeCloseTo(2 / 3, 12)

    // Thay số đã làm tròn như slide làm thì ra 0.6665, slide cắt còn 0.666.
    const roundedStyle = (2 * (0.714 * 0.625)) / (0.714 + 0.625)
    expect(roundedStyle).toBeCloseTo(0.6665, 4)
    expect(Math.abs(roundedStyle - m.f1)).toBeLessThan(0.002)
  })

  it('computeMetrics đếm đúng tổng số ca', () => {
    expect(computeMetrics(HUYET_AP).total).toBe(100)
  })
})

describe('dựng ma trận từ bảng dữ liệu', () => {
  it('bộ mẫu 100 ca cho lại đúng bốn ô của slide', () => {
    const matrix = confusionFromDataset(HUYET_AP_100, 'Thực tế', 'Dự đoán', 'Cao')
    expect(matrix).toEqual(HUYET_AP)
  })

  it('đổi lớp dương thì Precision và Recall đổi, Accuracy giữ nguyên', () => {
    const asCao = confusionFromDataset(HUYET_AP_100, 'Thực tế', 'Dự đoán', 'Cao')
    const asBinhThuong = confusionFromDataset(HUYET_AP_100, 'Thực tế', 'Dự đoán', 'Bình thường')
    expect(accuracy(asCao)).toBeCloseTo(accuracy(asBinhThuong), 12)
    // Lấy "Bình thường" làm lớp dương thì TP và TN đổi chỗ.
    expect(asBinhThuong).toEqual({ tp: 50, fn: 10, fp: 15, tn: 25 })
    expect(precision(asBinhThuong)).not.toBeCloseTo(precision(asCao), 3)
  })
})

describe('các trường hợp biên', () => {
  it('ma trận rỗng không chia cho 0', () => {
    const m = { tp: 0, fn: 0, fp: 0, tn: 0 }
    expect(accuracy(m)).toBe(0)
    expect(precision(m)).toBe(0)
    expect(recall(m)).toBe(0)
    expect(computeMetrics(m).f1).toBe(0)
  })

  it('không dự đoán dương ca nào thì Precision = 0 chứ không phải NaN', () => {
    const m = { tp: 0, fn: 10, fp: 0, tn: 90 }
    expect(precision(m)).toBe(0)
    expect(recall(m)).toBe(0)
    expect(accuracy(m)).toBeCloseTo(0.9, 12)
  })

  it('mô hình hoàn hảo cho cả bốn chỉ số bằng 1', () => {
    const m = computeMetrics({ tp: 40, fn: 0, fp: 0, tn: 60 })
    expect(m.accuracy).toBe(1)
    expect(m.precision).toBe(1)
    expect(m.recall).toBe(1)
    expect(m.f1).toBe(1)
  })

  it('f1Score bằng 0 khi cả Precision và Recall bằng 0', () => {
    expect(f1Score(0, 0)).toBe(0)
  })
})

describe('runEvaluation — bước trung gian', () => {
  const { steps, result } = runEvaluation(HUYET_AP, {
    positiveLabel: 'Cao',
    negativeLabel: 'Bình thường',
  })

  it('trả về 6 bước theo đúng thứ tự slide', () => {
    expect(steps.map((s) => s.title)).toEqual([
      'Ma trận nhầm lẫn (Confusion Matrix)',
      'Accuracy — độ chính xác tổng thể',
      'Precision — độ chính xác dương',
      'Recall — độ nhạy',
      'F1-score — chỉ số cân bằng',
      'Nhận xét',
    ])
  })

  it('bảng ma trận có đủ TP/FN/FP/TN và dòng tổng', () => {
    const table = steps[0].tables?.[0]
    expect(table?.body[0]).toEqual(['Thực tế Cao', 'TP = 25', 'FN = 15', 40])
    expect(table?.body[1]).toEqual(['Thực tế Bình thường', 'FP = 10', 'TN = 50', 60])
    expect(table?.body[2]).toEqual(['Tổng cột', 35, 65, 100])
  })

  it('công thức Accuracy có thay số như slide', () => {
    expect(steps[1].formula).toContain('\\frac{25 + 50}')
  })

  it('nhận xét chỉ ra chuyện bỏ sót ca dương', () => {
    expect(steps[5].note).toContain('bỏ sót 15 ca')
  })

  it('giữ lại nhãn lớp để giao diện hiện đúng chữ', () => {
    expect(result.positiveLabel).toBe('Cao')
    expect(result.negativeLabel).toBe('Bình thường')
  })
})
