import { describe, expect, it } from 'vitest'
import { runNaiveBayes } from './index'
import { DI_CHOI_9, PLAY_BALL_14 } from '@/data/samples'

describe('Ví dụ 1 — tập "đi chơi" 9 mẫu (Bài 5.1 trang 12)', () => {
  it('P(Yes) = 4/9 và P(No) = 5/9', () => {
    const { result } = runNaiveBayes(DI_CHOI_9, {
      query: { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng' },
    })
    expect(result.priors['Yes'].p).toBeCloseTo(4 / 9, 12)
    expect(result.priors['No'].p).toBeCloseTo(5 / 9, 12)
  })

  it('bảng P(xi|Ci) khớp từng phân số của slide', () => {
    const { result } = runNaiveBayes(DI_CHOI_9, {
      query: { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng' },
    })
    const tt = result.conditionals['Thời tiết']
    expect(tt['Nắng']['Yes'].p).toBeCloseTo(1 / 4, 12)
    expect(tt['U ám']['Yes'].p).toBeCloseTo(2 / 4, 12)
    expect(tt['Mưa']['Yes'].p).toBeCloseTo(1 / 4, 12)
    expect(tt['Nắng']['No'].p).toBeCloseTo(3 / 5, 12)
    expect(tt['U ám']['No'].p).toBe(0)
    expect(tt['Mưa']['No'].p).toBeCloseTo(2 / 5, 12)

    const nd = result.conditionals['Nhiệt độ']
    expect(nd['Nóng']['Yes'].p).toBeCloseTo(1 / 4, 12)
    expect(nd['Lạnh']['Yes'].p).toBeCloseTo(2 / 4, 12)
    expect(nd['Nóng']['No'].p).toBeCloseTo(2 / 5, 12)
  })

  it('X = <Nắng, Nóng> ra 0.028 và 0.133 → chọn No (trang 12)', () => {
    const { result } = runNaiveBayes(DI_CHOI_9, {
      query: { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng' },
    })
    const yes = result.scores.find((s) => s.className === 'Yes')!
    const no = result.scores.find((s) => s.className === 'No')!
    expect(yes.score).toBeCloseTo(0.02778, 5)
    expect(no.score).toBeCloseTo(0.13333, 5)
    expect(result.predicted).toBe('No')
  })

  it('X = <U ám, Mát> ra 0.056 và 0 → chọn Yes (trang 13)', () => {
    const { result } = runNaiveBayes(DI_CHOI_9, {
      query: { 'Thời tiết': 'U ám', 'Nhiệt độ': 'Mát' },
    })
    expect(result.scores.find((s) => s.className === 'Yes')!.score).toBeCloseTo(0.05556, 5)
    expect(result.scores.find((s) => s.className === 'No')!.score).toBe(0)
    expect(result.predicted).toBe('Yes')
  })
})

describe('Ví dụ 2 — chơi golf 14 mẫu (Bài 5.1 trang 15)', () => {
  const query = { Outlook: 'Rainy', Temp: 'Hot', Humidity: 'High', Wind: 'Weak' }

  it('P(p) = 9/14 và P(n) = 5/14', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, { query })
    expect(result.priors['Yes'].p).toBeCloseTo(9 / 14, 12)
    expect(result.priors['No'].p).toBeCloseTo(5 / 14, 12)
  })

  it('bảng xác suất điều kiện khớp slide trang 15', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, { query })
    expect(result.conditionals['Outlook']['Sunny']['Yes'].p).toBeCloseTo(2 / 9, 12)
    expect(result.conditionals['Outlook']['Overcast']['Yes'].p).toBeCloseTo(4 / 9, 12)
    expect(result.conditionals['Outlook']['Overcast']['No'].p).toBe(0)
    expect(result.conditionals['Humidity']['High']['No'].p).toBeCloseTo(4 / 5, 12)
    expect(result.conditionals['Wind']['Weak']['Yes'].p).toBeCloseTo(6 / 9, 12)
  })

  it('P(X|p)·P(p) = 0.010582 đúng như slide trang 16', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, { query })
    expect(result.scores.find((s) => s.className === 'Yes')!.score).toBeCloseTo(0.010582, 6)
  })

  /**
   * Hai slide cho hai số khác nhau vì lấy P(Weak|No) khác nhau: Bài 5.1
   * trang 16 dùng 3/5 (ra 0.027428), Bài 7 trang 15 dùng 2/5 (ra 0.018286).
   * Đếm lại từ bảng 14 mẫu: Weak & No = D1, D8 → đúng là 2/5.
   */
  it('P(X|n)·P(n) = 0.018286 — theo tần suất đếm lại từ bảng, không copy slide', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, { query })
    expect(result.conditionals['Wind']['Weak']['No'].p).toBeCloseTo(2 / 5, 12)
    expect(result.scores.find((s) => s.className === 'No')!.score).toBeCloseTo(0.018286, 6)
  })

  it('mẫu X được phân vào lớp No', () => {
    expect(runNaiveBayes(PLAY_BALL_14, { query }).result.predicted).toBe('No')
  })

  it('X2 = <Overcast, Cool, Normal, Strong> ra lớp Yes (trang 17)', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, {
      query: { Outlook: 'Overcast', Temp: 'Cool', Humidity: 'Normal', Wind: 'Strong' },
    })
    expect(result.scores.find((s) => s.className === 'Yes')!.score).toBeCloseTo(0.021164, 6)
    expect(result.scores.find((s) => s.className === 'No')!.score).toBe(0)
    expect(result.predicted).toBe('Yes')
  })
})

describe('làm trơn Laplace (Bài 5.1 trang 28-32)', () => {
  it('P(Play=Yes) = 10/16 và P(Play=No) = 6/16', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, {
      query: { Outlook: 'Overcast', Temp: 'Cool', Humidity: 'High', Wind: 'Strong' },
      laplace: true,
    })
    expect(result.priors['Yes'].count).toBe(10)
    expect(result.priors['Yes'].total).toBe(16)
    expect(result.priors['No'].count).toBe(6)
  })

  it('P(Outlook=Overcast|Yes) = 5/12 và P(Humidity=High|Yes) = 4/11', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, {
      query: { Outlook: 'Overcast', Temp: 'Cool', Humidity: 'High', Wind: 'Strong' },
      laplace: true,
    })
    const outlook = result.conditionals['Outlook']['Overcast']['Yes']
    expect([outlook.numerator, outlook.denominator]).toEqual([5, 12])
    const humidity = result.conditionals['Humidity']['High']['Yes']
    expect([humidity.numerator, humidity.denominator]).toEqual([4, 11])
  })

  it('X = (Overcast, Cool, High, Strong) ra 0.0115 và 0.0048 → lớp Yes', () => {
    const { result } = runNaiveBayes(PLAY_BALL_14, {
      query: { Outlook: 'Overcast', Temp: 'Cool', Humidity: 'High', Wind: 'Strong' },
      laplace: true,
    })
    expect(result.scores.find((s) => s.className === 'Yes')!.score).toBeCloseTo(0.0115, 4)
    expect(result.scores.find((s) => s.className === 'No')!.score).toBeCloseTo(0.0048, 4)
    expect(result.predicted).toBe('Yes')
  })

  it('Laplace cứu được trường hợp xác suất 0 nuốt cả tích', () => {
    const query = { Outlook: 'Overcast', Temp: 'Cool', Humidity: 'Normal', Wind: 'Strong' }
    const plain = runNaiveBayes(PLAY_BALL_14, { query })
    const smooth = runNaiveBayes(PLAY_BALL_14, { query, laplace: true })
    expect(plain.result.scores.find((s) => s.className === 'No')!.score).toBe(0)
    expect(smooth.result.scores.find((s) => s.className === 'No')!.score).toBeGreaterThan(0)
  })
})

describe('bước trung gian và lỗi đầu vào', () => {
  it('trả về đủ 5 bước, mỗi thuộc tính một bảng riêng', () => {
    const { steps } = runNaiveBayes(PLAY_BALL_14, {
      query: { Outlook: 'Rainy', Temp: 'Hot' },
    })
    expect(steps).toHaveLength(5)
    const conditionalStep = steps.find((s) => s.title.includes('P(xi|Ci)'))
    expect(conditionalStep?.tables).toHaveLength(2)
    expect(conditionalStep?.tables?.[0].caption).toBe('Thuộc tính Outlook')
  })

  it('báo lỗi khi chưa chọn thuộc tính nào cho mẫu hỏi', () => {
    expect(() => runNaiveBayes(PLAY_BALL_14, { query: {} })).toThrow(/chưa chọn thuộc tính/)
  })

  it('báo lỗi khi bảng không có cột nhãn lớp', () => {
    expect(() =>
      runNaiveBayes({ ...PLAY_BALL_14, decisionAttribute: undefined }, {
        query: { Outlook: 'Rainy' },
      }),
    ).toThrow(/nhãn lớp/)
  })
})
