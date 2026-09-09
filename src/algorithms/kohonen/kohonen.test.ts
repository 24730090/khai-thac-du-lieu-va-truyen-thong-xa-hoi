import { describe, expect, it } from 'vitest'
import { findWinner, initMap, makeRandom, runKohonen, updateNeighborhood } from './index'
import { SOM_3_CUM } from '@/data/samples'

describe('bộ sinh số giả ngẫu nhiên', () => {
  it('cùng seed cho cùng dãy số', () => {
    const a = makeRandom(42)
    const b = makeRandom(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('seed khác cho dãy khác', () => {
    expect(makeRandom(1)()).not.toBe(makeRandom(2)())
  })

  it('mọi giá trị nằm trong [0,1)', () => {
    const r = makeRandom(7)
    for (let i = 0; i < 200; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('khởi tạo map — slide trang 15', () => {
  const map = initMap(3, 4, 2, makeRandom(42))

  it('đúng kích thước dòng × cột và ghi lại toạ độ nơron', () => {
    expect(map).toHaveLength(3)
    expect(map[0]).toHaveLength(4)
    expect(map[2][3]).toMatchObject({ x: 3, y: 2 })
  })

  it('mọi trọng số bám sát 0.5, lệch không quá 0.01', () => {
    for (const row of map) {
      for (const neuron of row) {
        for (const w of neuron.weights) {
          expect(Math.abs(w - 0.5)).toBeLessThanOrEqual(0.01)
        }
      }
    }
  })
})

describe('tìm nơron chiến thắng — slide trang 20', () => {
  it('chọn nơron có khoảng cách nhỏ nhất', () => {
    const map = [
      [
        { x: 0, y: 0, weights: [0, 0] },
        { x: 1, y: 0, weights: [1, 1] },
      ],
      [
        { x: 0, y: 1, weights: [5, 5] },
        { x: 1, y: 1, weights: [9, 9] },
      ],
    ]
    expect(findWinner(map, [0.9, 0.9])).toMatchObject({ x: 1, y: 0 })
    expect(findWinner(map, [8, 8])).toMatchObject({ x: 1, y: 1 })
  })

  it('hoà thì lấy nơron gặp trước', () => {
    const map = [
      [
        { x: 0, y: 0, weights: [1, 1] },
        { x: 1, y: 0, weights: [1, 1] },
      ],
    ]
    expect(findWinner(map, [1, 1])).toMatchObject({ x: 0, y: 0 })
  })
})

describe('cập nhật vùng lân cận — slide trang 22-23', () => {
  it('chỉ cập nhật nơron trong bán kính, kéo trọng số về phía mẫu', () => {
    const map = initMap(5, 5, 1, () => 0.5) // random cố định → mọi trọng số 0.5
    const updated = updateNeighborhood(map, { x: 2, y: 2 }, [1], 0.5, 1)

    // Hình vuông 3×3 quanh (2,2) → 9 nơron.
    expect(updated).toBe(9)
    // Nơron thắng và lân cận: 0.5 + 0.5*(1 − 0.5) = 0.75.
    expect(map[2][2].weights[0]).toBeCloseTo(0.75, 12)
    expect(map[1][1].weights[0]).toBeCloseTo(0.75, 12)
    // Ngoài bán kính thì không đổi.
    expect(map[0][0].weights[0]).toBeCloseTo(0.5, 12)
    expect(map[4][4].weights[0]).toBeCloseTo(0.5, 12)
  })

  it('cắt vùng lân cận ở mép map, không tràn ra ngoài', () => {
    const map = initMap(3, 3, 1, () => 0.5)
    // Góc (0,0) với bán kính 1 chỉ có 4 nơron chứ không phải 9.
    expect(updateNeighborhood(map, { x: 0, y: 0 }, [1], 0.5, 1)).toBe(4)
  })

  it('bán kính 0 chỉ cập nhật đúng nơron thắng', () => {
    const map = initMap(3, 3, 1, () => 0.5)
    expect(updateNeighborhood(map, { x: 1, y: 1 }, [1], 0.5, 0)).toBe(1)
    expect(map[0][0].weights[0]).toBeCloseTo(0.5, 12)
  })

  it('alpha = 0 thì không đổi gì', () => {
    const map = initMap(3, 3, 1, () => 0.5)
    updateNeighborhood(map, { x: 1, y: 1 }, [1], 0, 1)
    expect(map[1][1].weights[0]).toBeCloseTo(0.5, 12)
  })
})

describe('runKohonen — học trên ba cụm tách rõ', () => {
  const options = { rows: 4, cols: 4, epochs: 12, seed: 42 }
  const { result, steps } = runKohonen(SOM_3_CUM, options)

  it('cùng seed cho đúng kết quả cũ', () => {
    const again = runKohonen(SOM_3_CUM, options)
    expect(again.result.finalWinners).toEqual(result.finalWinners)
    expect(again.result.map[0][0].weights).toEqual(result.map[0][0].weights)
  })

  /**
   * SOM giữ topology: mẫu gần nhau trong không gian dữ liệu thì rơi vào nơron
   * gần nhau trên map, mẫu xa nhau thì rơi vào nơron xa nhau. KHÔNG đòi cả
   * cụm dồn vào đúng một nơron — map 4×4 có 16 chỗ cho 9 mẫu nên nó tách ra
   * là chuyện bình thường, và tách ra mới là cái heatmap đọc được.
   */
  it('mẫu cùng cụm rơi vào vùng nơron liền nhau', () => {
    const at = (label: string) => result.finalWinners.find((w) => w.label === label)!
    const chebyshev = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))

    const clusters = [
      ['p1', 'p2', 'p3'],
      ['p4', 'p5', 'p6'],
      ['p7', 'p8', 'p9'],
    ].map((labels) => labels.map(at))

    for (const members of clusters) {
      for (const a of members) {
        for (const b of members) {
          expect(chebyshev(a, b)).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('mẫu khác cụm rơi vào vùng nơron cách xa nhau', () => {
    const at = (label: string) => result.finalWinners.find((w) => w.label === label)!
    const centre = (labels: string[]) => {
      const ws = labels.map(at)
      return {
        x: ws.reduce((s, w) => s + w.x, 0) / ws.length,
        y: ws.reduce((s, w) => s + w.y, 0) / ws.length,
      }
    }
    const centres = [
      centre(['p1', 'p2', 'p3']),
      centre(['p4', 'p5', 'p6']),
      centre(['p7', 'p8', 'p9']),
    ]

    for (let i = 0; i < centres.length; i++) {
      for (let j = i + 1; j < centres.length; j++) {
        const d = Math.hypot(centres[i].x - centres[j].x, centres[i].y - centres[j].y)
        expect(d).toBeGreaterThan(2)
      }
    }
  })

  it('không có nơron nào ôm mẫu của hai cụm khác nhau', () => {
    const clusterOf = new Map<string, number>()
    ;[
      ['p1', 'p2', 'p3'],
      ['p4', 'p5', 'p6'],
      ['p7', 'p8', 'p9'],
    ].forEach((labels, c) => labels.forEach((l) => clusterOf.set(l, c)))

    const neuronOwner = new Map<string, number>()
    for (const w of result.finalWinners) {
      const cell = `${w.y},${w.x}`
      const cluster = clusterOf.get(w.label)!
      if (neuronOwner.has(cell)) expect(neuronOwner.get(cell)).toBe(cluster)
      else neuronOwner.set(cell, cluster)
    }
  })

  it('số mẫu trong hitCounts cộng lại bằng số mẫu học', () => {
    const total = result.hitCounts.flat().reduce((s, n) => s + n, 0)
    expect(total).toBe(SOM_3_CUM.rows.length)
  })

  it('map giữ đúng kích thước đã chọn', () => {
    expect(result.map).toHaveLength(4)
    expect(result.map[0]).toHaveLength(4)
  })

  it('ghi lại mọi lượt cập nhật: epochs × số mẫu', () => {
    expect(result.updates).toHaveLength(12 * SOM_3_CUM.rows.length)
  })

  it('alpha và bán kính giảm dần khi bật decay', () => {
    const first = result.updates[0]
    const last = result.updates[result.updates.length - 1]
    expect(last.alpha).toBeLessThan(first.alpha)
    expect(last.radius).toBeLessThanOrEqual(first.radius)
  })

  it('chỉ ghi bước cho vòng đầu, vòng giữa và vòng cuối', () => {
    const epochSteps = steps.filter((s) => s.title.startsWith('Vòng học'))
    expect(epochSteps).toHaveLength(3)
  })

  it('bước cuối xếp mẫu vào nơron gần nhất', () => {
    expect(steps[steps.length - 1].title).toBe('Xếp mẫu học vào nơron gần nhất')
  })
})

describe('trường hợp biên', () => {
  it('báo lỗi khi bảng không có cột số', () => {
    expect(() =>
      runKohonen({
        name: 'chỉ chữ',
        attributes: [{ name: 'a', type: 'nominal' }],
        rows: [{ a: 'x' }],
      }),
    ).toThrow(/cột số/)
  })

  it('báo lỗi khi bảng rỗng', () => {
    expect(() => runKohonen({ ...SOM_3_CUM, rows: [] })).toThrow(/rỗng/)
  })

  it('map 1×1 vẫn chạy, mọi mẫu về cùng một nơron', () => {
    const { result } = runKohonen(SOM_3_CUM, { rows: 1, cols: 1, epochs: 3 })
    expect(result.hitCounts).toEqual([[9]])
  })

  it('epochs = 1 không làm vỡ phép tính giảm dần', () => {
    const { result } = runKohonen(SOM_3_CUM, { epochs: 1 })
    expect(result.updates.every((u) => Number.isFinite(u.alpha))).toBe(true)
  })
})
