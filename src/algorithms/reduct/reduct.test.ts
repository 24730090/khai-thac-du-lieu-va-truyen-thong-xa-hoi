import { describe, expect, it } from 'vitest'
import {
  approximate,
  coreOf,
  discernibilityFunction,
  formatDnf,
  indiscernibility,
  objectLabels,
  reductsFromCnf,
  rulesFromReduct,
  runReduct,
} from './index'
import { BI_RAM_8, THOI_TIET_8, TUYEN_DUNG_8 } from '@/data/samples'

const sorted = (sets: string[][]) =>
  sets.map((s) => [...s].sort()).sort((a, b) => a.join().localeCompare(b.join()))

describe('quan hệ bất khả phân biệt — bài tập thời tiết (Bài 3 trang 33)', () => {
  const labels = objectLabels(THOI_TIET_8)

  it('nhãn đối tượng lấy từ cột định danh', () => {
    expect(labels).toEqual(['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8'])
  })

  it('IND(Troi, Gio) = {{o1,o4}, {o2,o7}, {o3,o5,o6}, {o8}}', () => {
    const classes = indiscernibility(THOI_TIET_8, ['Troi', 'Gio'], labels)
    expect(sorted(classes)).toEqual(
      sorted([['o1', 'o4'], ['o2', 'o7'], ['o3', 'o5', 'o6'], ['o8']]),
    )
  })
})

describe('xấp xỉ tập hợp — bài giải câu 1a (Bài 3 trang 33)', () => {
  const labels = objectLabels(THOI_TIET_8)
  const classes = indiscernibility(THOI_TIET_8, ['Troi', 'Gio'], labels)
  const approx = approximate(classes, ['o1', 'o3', 'o4'], labels)

  it('xấp xỉ dưới = {o1, o4}', () => {
    expect([...approx.lower].sort()).toEqual(['o1', 'o4'])
  })

  it('xấp xỉ trên = {o1, o4, o3, o5, o6}', () => {
    expect([...approx.upper].sort()).toEqual(['o1', 'o3', 'o4', 'o5', 'o6'])
  })

  it('α = 2/5 = 0.4 và X là tập thô', () => {
    expect(approx.accuracy).toBeCloseTo(0.4, 12)
    expect(approx.rough).toBe(true)
    expect([...approx.boundary].sort()).toEqual(['o3', 'o5', 'o6'])
  })

  it('vùng ngoài = U − xấp xỉ trên', () => {
    expect([...approx.outside].sort()).toEqual(['o2', 'o7', 'o8'])
  })

  it('tập rõ có vùng biên rỗng và α = 1', () => {
    const exact = approximate(classes, ['o1', 'o4', 'o8'], labels)
    expect(exact.boundary).toEqual([])
    expect(exact.accuracy).toBe(1)
    expect(exact.rough).toBe(false)
  })
})

describe('phụ thuộc thuộc tính — bài giải câu 1b (Bài 3 trang 34)', () => {
  it('k = 6/8 = 0.75 với B = {Troi, Gio}', () => {
    const { result } = runReduct(THOI_TIET_8, { approximationAttributes: ['Troi', 'Gio'] })
    // X1 = {o1,o4,o7,o8} Kmua, X2 = {o2,o3,o5,o6} Mua.
    // B(X1) = {o1,o4,o8}, B(X2) = {o3,o5,o6} → (3+3)/8.
    expect(result.dependency).toBeCloseTo(0.75, 12)
  })
})

describe('ma trận phân biệt và reduct — bảng bị rám (Bài 3 trang 35)', () => {
  const { result } = runReduct(BI_RAM_8)

  it('thuộc tính điều kiện bỏ cột định danh "Người"', () => {
    expect(result.conditionAttributes).toEqual([
      'Màu tóc',
      'Chiều cao',
      'Cân nặng',
      'Dùng thuốc',
    ])
  })

  it('tìm đúng 2 reduct {Màu tóc, Dùng thuốc} và {Màu tóc, Chiều cao, Cân nặng}', () => {
    expect(sorted(result.reducts)).toEqual(
      sorted([
        ['Màu tóc', 'Dùng thuốc'],
        ['Màu tóc', 'Chiều cao', 'Cân nặng'],
      ]),
    )
  })

  it('lõi là {Màu tóc} — có mặt trong cả hai reduct', () => {
    expect(result.core).toEqual(['Màu tóc'])
  })

  it('ma trận phân biệt để trống ô của hai đối tượng cùng nhãn quyết định', () => {
    const labels = result.objects
    const hoa = labels.indexOf('Hoa')
    const ha = labels.indexOf('Hạ')
    // Hoa và Hạ cùng "Bị rám" → ô rỗng.
    expect(result.discernibilityMatrix[hoa][ha]).toEqual([])
    const lan = labels.indexOf('Lan')
    // Hoa "Bị rám" vs Lan "Không" → có thuộc tính phân biệt.
    expect(result.discernibilityMatrix[hoa][lan].length).toBeGreaterThan(0)
  })

  it('DNF viết đúng kiểu slide', () => {
    const dnf = formatDnf(result.reducts)
    expect(dnf).toContain('∨')
    expect(dnf).toContain('∧')
  })

  it('mọi reduct đều giữ nguyên khả năng phân lớp (k không đổi)', () => {
    const labels = result.objects
    for (const reduct of result.reducts) {
      const classes = indiscernibility(BI_RAM_8, reduct, labels)
      const decisionValues = [...new Set(BI_RAM_8.rows.map((r) => String(r['Kết quả'])))]
      const positive = decisionValues.reduce((sum, v) => {
        const target = BI_RAM_8.rows
          .map((r, i) => (String(r['Kết quả']) === v ? labels[i] : null))
          .filter((x): x is string => x !== null)
        return sum + approximate(classes, target, labels).lower.length
      }, 0)
      expect(positive / labels.length).toBe(1)
    }
  })
})

describe('reduct — bảng tuyển dụng (Bài 3 trang 25)', () => {
  const { result } = runReduct(TUYEN_DUNG_8)

  it('ra 2 reduct: {Kinh nghiệm, Bằng cấp} và {Kinh nghiệm, Giới thiệu}', () => {
    expect(sorted(result.reducts)).toEqual(
      sorted([
        ['Kinh nghiệm', 'Bằng cấp'],
        ['Kinh nghiệm', 'Giới thiệu'],
      ]),
    )
  })

  it('lõi là {Kinh nghiệm}', () => {
    expect(result.core).toEqual(['Kinh nghiệm'])
  })

  it('bỏ được thuộc tính Tiếng Anh — không reduct nào cần tới', () => {
    expect(result.reducts.every((r) => !r.includes('Tiếng Anh'))).toBe(true)
  })
})

describe('hàm phân biệt', () => {
  it('bỏ mệnh đề bị hấp thụ: có (a) rồi thì bỏ (a ∨ b)', () => {
    const matrix = [
      [[], ['a']],
      [['a'], []],
    ]
    const withAbsorption = [
      [[], ['a'], ['a', 'b']],
      [['a'], [], []],
      [['a', 'b'], [], []],
    ]
    expect(discernibilityFunction(matrix)).toEqual([['a']])
    expect(discernibilityFunction(withAbsorption)).toEqual([['a']])
  })

  it('bỏ mệnh đề trùng nhau', () => {
    const matrix = [
      [[], ['a', 'b'], ['b', 'a']],
      [['a', 'b'], [], []],
      [['b', 'a'], [], []],
    ]
    expect(discernibilityFunction(matrix)).toHaveLength(1)
  })

  it('hàm rỗng cho một reduct rỗng — không cần thuộc tính nào', () => {
    expect(reductsFromCnf([], ['a', 'b'])).toEqual([[]])
  })

  it('reductsFromCnf tìm hit set nhỏ nhất trước', () => {
    // (a ∨ b) ∧ (b ∨ c) → {b} là reduct duy nhất kích thước 1.
    const reducts = reductsFromCnf(
      [
        ['a', 'b'],
        ['b', 'c'],
      ],
      ['a', 'b', 'c'],
    )
    expect(reducts[0]).toEqual(['b'])
    // {a,c} cũng chạm mọi mệnh đề và không chứa {b}.
    expect(sorted(reducts)).toEqual(sorted([['b'], ['a', 'c']]))
  })

  it('coreOf trên danh sách rỗng trả về rỗng', () => {
    expect(coreOf([])).toEqual([])
  })
})

describe('sinh luật từ reduct — slide trang 40', () => {
  it('luật từ reduct {Màu tóc, Dùng thuốc} phủ hết 8 đối tượng', () => {
    const labels = objectLabels(BI_RAM_8)
    const rules = rulesFromReduct(BI_RAM_8, ['Màu tóc', 'Dùng thuốc'], labels)
    expect(rules.reduce((s, r) => s + r.support, 0)).toBe(8)
  })

  it('luật "Màu tóc=Đen ∧ Dùng thuốc=Không → Bị rám" có trong danh sách', () => {
    const labels = objectLabels(BI_RAM_8)
    const rules = rulesFromReduct(BI_RAM_8, ['Màu tóc', 'Dùng thuốc'], labels)
    const found = rules.find(
      (r) =>
        r.conditions[0].value === 'Đen' &&
        r.conditions[1].value === 'Không' &&
        r.className === 'Bị rám',
    )
    expect(found).toBeDefined()
    expect(found?.support).toBe(2)
  })

  it('tập thuộc tính không đủ phân biệt thì bỏ lớp lẫn nhãn', () => {
    const labels = objectLabels(BI_RAM_8)
    // Chỉ dùng "Chiều cao" thì có lớp lẫn cả hai nhãn → ít luật hơn.
    const rules = rulesFromReduct(BI_RAM_8, ['Chiều cao'], labels)
    expect(rules.reduce((s, r) => s + r.support, 0)).toBeLessThan(8)
  })
})

describe('trường hợp biên', () => {
  it('báo lỗi khi thiếu cột quyết định', () => {
    expect(() => runReduct({ ...BI_RAM_8, decisionAttribute: undefined })).toThrow(/nhãn lớp/)
  })

  it('báo lỗi khi bảng rỗng', () => {
    expect(() => runReduct({ ...BI_RAM_8, rows: [] })).toThrow(/rỗng/)
  })

  it('trả về đủ 7 bước trung gian', () => {
    const { steps } = runReduct(BI_RAM_8)
    expect(steps.map((s) => s.title)).toEqual([
      'Hệ quyết định (U, A ∪ {d})',
      'Quan hệ bất khả phân biệt IND({Màu tóc, Chiều cao, Cân nặng, Dùng thuốc})',
      'Xấp xỉ tập hợp',
      'Phụ thuộc thuộc tính',
      'Ma trận phân biệt',
      'Hàm phân biệt và rút gọn',
      'Các reduct',
    ])
  })
})
