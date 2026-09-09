import { describe, expect, it } from 'vitest'
import { centroidOf, matrixDelta, runKmeans, toMatrix, toPoints } from './index'
import { KMEANS_4_DIEM } from '@/data/samples'

/**
 * Ví dụ slide Bai6_Gomcum_new.pdf trang 18-29:
 * x1=(1,3), x2=(1.5,3.2), x3=(1.3,2.8), x4=(3,1), k=2,
 * U0: c1=[1,0,0,0], c2=[0,1,1,1].
 */
const U0 = [0, 1, 1, 1]

describe('đọc dữ liệu', () => {
  it('tách nhãn điểm và toạ độ', () => {
    const { points, dimensions } = toPoints(KMEANS_4_DIEM)
    expect(dimensions).toEqual(['x', 'y'])
    expect(points).toEqual([
      { label: 'x1', coords: [1, 3] },
      { label: 'x2', coords: [1.5, 3.2] },
      { label: 'x3', coords: [1.3, 2.8] },
      { label: 'x4', coords: [3, 1] },
    ])
  })
})

describe('ma trận phân hoạch', () => {
  it('U0 dựng đúng như slide trang 19', () => {
    expect(toMatrix(U0, 2)).toEqual([
      [1, 0, 0, 0],
      [0, 1, 1, 1],
    ])
  })

  it('|Un − Un-1| đếm số ô lệch', () => {
    const a = toMatrix([0, 0, 0, 1], 2)
    const b = toMatrix([0, 1, 1, 1], 2)
    // Hai điểm đổi cụm, mỗi điểm lệch 2 ô (một ô 0→1, một ô 1→0).
    expect(matrixDelta(a, b)).toBe(4)
    expect(matrixDelta(a, a)).toBe(0)
  })
})

describe('trọng tâm', () => {
  it('v1 của cụm chỉ có x1 là (1,3) — slide trang 21', () => {
    const { points } = toPoints(KMEANS_4_DIEM)
    expect(centroidOf(points, U0, 0, 2)).toEqual([1, 3])
  })

  it('v2 của cụm {x2,x3,x4} là (1.933, 2.333) — slide trang 23 ghi (1.93, 2.33)', () => {
    const { points } = toPoints(KMEANS_4_DIEM)
    const v2 = centroidOf(points, U0, 1, 2)
    expect(v2[0]).toBeCloseTo(5.8 / 3, 12)
    expect(v2[1]).toBeCloseTo(7 / 3, 12)
  })

  it('cụm rỗng giữ trọng tâm cũ thay vì ra NaN', () => {
    const { points } = toPoints(KMEANS_4_DIEM)
    expect(centroidOf(points, [0, 0, 0, 0], 1, 2, [9, 9])).toEqual([9, 9])
  })
})

describe('runKmeans — chạy trọn ví dụ slide', () => {
  const { result, steps } = runKmeans(KMEANS_4_DIEM, { k: 2, initialAssignment: U0 })

  it('vòng 1: x1,x2,x3 vào c1 và x4 vào c2 — U1 của slide trang 27', () => {
    expect(result.iterations[0].matrix).toEqual([
      [1, 1, 1, 0],
      [0, 0, 0, 1],
    ])
  })

  it('khoảng cách vòng 1 khớp slide trang 24', () => {
    const d = result.iterations[0].distances
    expect(d[0][0]).toBeCloseTo(0, 12) // d(x1,v1) = 0
    expect(d[0][1]).toBeCloseTo(1.147, 3) // slide làm tròn thành 1.14
    expect(d[3][0]).toBeCloseTo(2.828, 3) // d(x4,v1) = 2.83
  })

  it('vòng 2 tính lại trọng tâm V1(1.267,3) và V2(3,1) — slide trang 28', () => {
    const v = result.iterations[1].centroids
    expect(v[0][0]).toBeCloseTo(3.8 / 3, 12)
    expect(v[0][1]).toBeCloseTo(3, 12)
    expect(v[1]).toEqual([3, 1])
  })

  it('U2 giống U1 nên |U2 − U1| = 0 và thuật toán hội tụ — trang 29', () => {
    expect(result.iterations[1].matrix).toEqual(result.iterations[0].matrix)
    expect(result.iterations[1].delta).toBe(0)
    expect(result.converged).toBe(true)
    expect(result.iterations).toHaveLength(2)
  })

  it('câu kết dùng đúng chữ của slide', () => {
    const stop = steps.find((s) => s.title === 'Kiểm tra điều kiện dừng')
    expect(stop?.note).toBe('Vì |U2 − U1| = 0 nên thuật toán hội tụ, dừng.')
  })

  it('tên mục từ vòng 2 lấy đúng tiêu đề slide, không chế "Bước 5,6,7"', () => {
    const titles = steps.map((s) => s.title)
    expect(titles).toContain('Tính lại trọng tâm')
    expect(titles).toContain('Tính khoảng cách')
    expect(titles).toContain('Ma trận phân hoạch U2')
    expect(titles.some((t) => /Bước [567]/.test(t))).toBe(false)
  })

  it('vòng 1 khai công thức, vòng 2 chỉ liệt kê trọng tâm', () => {
    const round1 = steps.find((s) => s.title === 'Tính vector trọng tâm')
    const round2 = steps.find((s) => s.title === 'Tính lại trọng tâm')
    expect(round1?.formula).toBeDefined()
    expect(round2?.formula).toBeUndefined()
  })

  it('cụm một phần tử không khai công thức mà viết một câu', () => {
    const round1 = steps.find((s) => s.title === 'Tính vector trọng tâm')
    expect(round1?.note).toContain('Cụm 1 chỉ có x1 nên v1 = (1,3)')
  })

  it('có câu "Tăng n lên 1" trước bảng U1', () => {
    expect(steps.find((s) => s.title === 'Ma trận phân hoạch U1')?.note).toBe('Tăng n lên 1.')
  })
})

describe('trường hợp biên', () => {
  it('báo lỗi khi k lớn hơn số điểm', () => {
    expect(() => runKmeans(KMEANS_4_DIEM, { k: 9 })).toThrow(/lớn hơn số điểm/)
  })

  it('báo lỗi khi k nhỏ hơn 1', () => {
    expect(() => runKmeans(KMEANS_4_DIEM, { k: 0 })).toThrow(/k phải/)
  })

  it('báo lỗi khi bảng không có cột số', () => {
    expect(() =>
      runKmeans(
        {
          name: 'chỉ chữ',
          attributes: [{ name: 'a', type: 'nominal' }],
          rows: [{ a: 'x' }],
        },
        { k: 1 },
      ),
    ).toThrow(/cột số/)
  })

  it('phân hoạch khởi tạo mặc định cho kết quả hội tụ', () => {
    const { result } = runKmeans(KMEANS_4_DIEM, { k: 2 })
    expect(result.converged).toBe(true)
  })

  it('k = số điểm thì mỗi điểm một cụm và hội tụ ngay', () => {
    const { result } = runKmeans(KMEANS_4_DIEM, { k: 4 })
    expect(result.converged).toBe(true)
    expect(new Set(result.assignment).size).toBe(4)
  })

  it('dùng được khoảng cách Manhattan', () => {
    const { result } = runKmeans(KMEANS_4_DIEM, {
      k: 2,
      initialAssignment: U0,
      distance: 'manhattan',
    })
    expect(result.converged).toBe(true)
    // d(x1,v1) theo Manhattan vẫn là 0 vì v1 trùng x1.
    expect(result.iterations[0].distances[0][0]).toBe(0)
  })
})
