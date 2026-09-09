import { describe, expect, it } from 'vitest'
import {
  explainVectorProduct,
  joinStep,
  pruneStep,
  representationVector,
  runApriori,
  toMiningContext,
  vectorProduct,
  vectorSupport,
} from './index'
import { GIO_HANG_5 } from '@/data/samples'

/**
 * Ví dụ slide Bai2_TapPhoBienVaLuatKetHop_Final.pdf:
 * o1={i1,i2,i3}, o2={i2,i3,i4}, o3={i2,i3,i4}, o4={i1,i2,i3}, o5={i3,i4}
 * với minsupp = 0.4.
 */
const context = toMiningContext(GIO_HANG_5)
const label = (items: string[]) => `{${items.join(',')}}`

describe('ngữ cảnh khai thác dữ liệu', () => {
  it('dựng đúng ma trận nhị phân trang 12', () => {
    expect(context.transactions).toEqual(['o1', 'o2', 'o3', 'o4', 'o5'])
    expect(context.items).toEqual(['i1', 'i2', 'i3', 'i4'])
    expect(context.matrix).toEqual([
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 1, 1],
    ])
  })
})

describe('vector biểu diễn — khớp slide trang 28-33', () => {
  it('v(S) của từng mặt hàng đơn lẻ đúng trang 30', () => {
    expect(representationVector(context, ['i1'])).toEqual([1, 0, 0, 1, 0])
    expect(representationVector(context, ['i2'])).toEqual([1, 1, 1, 1, 0])
    expect(representationVector(context, ['i3'])).toEqual([1, 1, 1, 1, 1])
    expect(representationVector(context, ['i4'])).toEqual([0, 1, 1, 0, 1])
  })

  it('tích ⊗ lấy min từng thành phần, v({i2,i3}) = (1,1,1,1,0), SP = 0.8', () => {
    const { parts, product, support } = explainVectorProduct(context, ['i2', 'i3'])
    expect(parts.map((p) => p.vector)).toEqual([
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
    ])
    expect(product).toEqual([1, 1, 1, 1, 0])
    expect(support).toBeCloseTo(0.8, 12)
  })

  it('v({i1,i4}) rỗng nên SP = 0', () => {
    expect(representationVector(context, ['i1', 'i4'])).toEqual([0, 0, 0, 0, 0])
    expect(vectorSupport([0, 0, 0, 0, 0])).toBe(0)
  })

  it('vectorProduct từ chối hai vector khác chiều', () => {
    expect(() => vectorProduct([1, 0], [1, 0, 1])).toThrow()
  })

  it('SP({i3,i4}) = 3/5 = 0.60 — slide trang 32 in nhầm là 0.80', () => {
    const v = representationVector(context, ['i3', 'i4'])
    expect(v).toEqual([0, 1, 1, 0, 1])
    expect(vectorSupport(v)).toBeCloseTo(0.6, 12)
  })
})

describe('bước kết hợp và bước rút gọn', () => {
  it('kết L1 với chính nó ra đủ 6 ứng viên 2 phần tử', () => {
    const joined = joinStep([['i1'], ['i2'], ['i3'], ['i4']], context.items)
    expect(joined.map(label)).toEqual([
      '{i1,i2}',
      '{i1,i3}',
      '{i1,i4}',
      '{i2,i3}',
      '{i2,i4}',
      '{i3,i4}',
    ])
  })

  it('bước rút gọn loại ứng viên có tập con không phổ biến', () => {
    // L2 của slide: {i1,i2},{i1,i3},{i2,i3},{i2,i4},{i3,i4} — thiếu {i1,i4}.
    const l2 = [
      ['i1', 'i2'],
      ['i1', 'i3'],
      ['i2', 'i3'],
      ['i2', 'i4'],
      ['i3', 'i4'],
    ]
    const joined = joinStep(l2, context.items)
    const { kept, pruned } = pruneStep(joined, new Set(l2.map((s) => s.join(','))))
    expect(kept.map(label)).toEqual(['{i1,i2,i3}', '{i2,i3,i4}'])
    // {i1,i2,i4} và {i1,i3,i4} bị loại vì chứa {i1,i4} không phổ biến.
    expect(pruned.map(label)).toEqual(['{i1,i2,i4}', '{i1,i3,i4}'])
  })
})

describe('runApriori — khớp kết quả cuối slide trang 35', () => {
  const { result, steps } = runApriori(GIO_HANG_5, { minSupport: 0.4, minConfidence: 0.67 })

  it('tìm đúng 11 tập phổ biến của slide', () => {
    expect(result.frequentItemsets.map((f) => label(f.items))).toEqual([
      '{i1}',
      '{i2}',
      '{i3}',
      '{i4}',
      '{i1,i2}',
      '{i1,i3}',
      '{i2,i3}',
      '{i2,i4}',
      '{i3,i4}',
      '{i1,i2,i3}',
      '{i2,i3,i4}',
    ])
  })

  it('độ phổ biến L1 đúng trang 13', () => {
    const l1 = result.levels[0].frequent
    expect(l1.map((f) => f.support)).toEqual([0.4, 0.8, 1, 0.6])
  })

  it('tập phổ biến tối đại là {i1,i2,i3} và {i2,i3,i4} — trang 18', () => {
    expect(result.maximalItemsets.map((m) => label(m.items))).toEqual([
      '{i1,i2,i3}',
      '{i2,i3,i4}',
    ])
  })

  it('dừng lại khi L4 rỗng', () => {
    const lastLevel = result.levels[result.levels.length - 1]
    expect(lastLevel.k).toBe(4)
    expect(lastLevel.frequent).toHaveLength(0)
  })

  it('luật {i1,i2} → {i3} hợp lệ với minconf = 0.67 — trang 20', () => {
    const r = result.rules.find(
      (x) => label(x.antecedent) === '{i1,i2}' && label(x.consequent) === '{i3}',
    )
    expect(r).toBeDefined()
    // SP({i1,i2,i3}) = 0.4, SP({i1,i2}) = 0.4 → CF = 1
    expect(r?.confidence).toBeCloseTo(1, 12)
  })

  it('mọi luật trả về đều đạt minconf', () => {
    expect(result.rules.every((r) => r.confidence >= 0.67)).toBe(true)
  })

  it('trả về các bước trung gian, không chỉ kết quả cuối', () => {
    expect(steps.length).toBeGreaterThan(5)
    expect(steps[0].title).toBe('Ngữ cảnh khai thác dữ liệu (O, I, R)')
    expect(steps.some((s) => s.title.startsWith('Bước kết hợp'))).toBe(true)
  })
})

describe('runApriori — chế độ vector biểu diễn', () => {
  it('cho cùng tập phổ biến như Apriori cổ điển', () => {
    const classic = runApriori(GIO_HANG_5, { minSupport: 0.4, minConfidence: 0.5 })
    const vector = runApriori(GIO_HANG_5, {
      minSupport: 0.4,
      minConfidence: 0.5,
      method: 'vector',
    })
    expect(vector.result.frequentItemsets.map((f) => label(f.items))).toEqual(
      classic.result.frequentItemsets.map((f) => label(f.items)),
    )
  })

  it('bảng bước trung gian có cột v(S)', () => {
    const { steps } = runApriori(GIO_HANG_5, {
      minSupport: 0.4,
      minConfidence: 0.5,
      method: 'vector',
    })
    const l1 = steps.find((s) => s.title === 'Tìm L1 — tập phổ biến 1 phần tử')
    expect(l1?.tables?.[0].head).toContain('v(S)')
  })
})
