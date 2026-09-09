import { describe, expect, it } from 'vitest'
import {
  countLeaves,
  extractRules,
  formatRule,
  gainOf,
  info,
  runId3,
  treeDepth,
  type TreeNode,
} from './index'
import { PLAY_BALL_14 } from '@/data/samples'

const decision = 'Play'
const classes = ['Yes', 'No']

describe('I(pi,ni)', () => {
  /**
   * Bảng 14 mẫu đếm ra 9 Yes / 5 No nên I(9,5) = 0.940 — đúng bộ số mà
   * CLAUDE.md § luật 3 và docs/phan-cong.md yêu cầu (0.940 / 0.694 / 0.247).
   * Slide trang 44 in nhầm S1=10, S2=4 (thành 0.863) nhưng chính slide đó lại
   * tính E(Outlook) = 5/14·I(2,3) + 4/14·I(4,0) + 5/14·I(3,2) = 0.694, tức là
   * dùng đúng bảng 9/5.
   */
  it('I(9,5) = 0.940', () => {
    expect(info(9, 5)).toBeCloseTo(0.94, 3)
  })

  it('I(4,0) = 0 — quy ước 0·log2(0) = 0, không phải NaN', () => {
    expect(info(4, 0)).toBe(0)
    expect(info(0, 5)).toBe(0)
  })

  it('I(1,1) = 1 — hai lớp cân bằng', () => {
    expect(info(1, 1)).toBe(1)
  })

  it('I(2,3) = 0.971 và I(3,2) = 0.971', () => {
    expect(info(2, 3)).toBeCloseTo(0.971, 3)
    expect(info(3, 2)).toBeCloseTo(0.971, 3)
  })

  it('tập rỗng cho 0', () => {
    expect(info(0, 0)).toBe(0)
  })
})

describe('Gain từng thuộc tính trên tập gốc — khớp slide trang 45-48', () => {
  const gainFor = (attr: string) =>
    gainOf(PLAY_BALL_14, PLAY_BALL_14.rows, attr, decision, classes)

  it('bảng Outlook có đúng pi/ni của từng giá trị', () => {
    const g = gainFor('Outlook')
    expect(g.rows).toEqual([
      { value: 'Sunny', pi: 2, ni: 3, info: expect.closeTo(0.971, 3), subtotal: expect.any(Number) },
      { value: 'Overcast', pi: 4, ni: 0, info: 0, subtotal: 0 },
      { value: 'Rainy', pi: 3, ni: 2, info: expect.closeTo(0.971, 3), subtotal: expect.any(Number) },
    ])
  })

  it('E(Outlook) = 0.694 và Gain(Outlook) = 0.247', () => {
    const g = gainFor('Outlook')
    expect(g.entropy).toBeCloseTo(0.694, 3)
    expect(g.gain).toBeCloseTo(0.247, 3)
  })

  it('Gain của ba thuộc tính còn lại đều nhỏ hơn Outlook', () => {
    const outlook = gainFor('Outlook').gain
    for (const attr of ['Temp', 'Humidity', 'Wind']) {
      expect(gainFor(attr).gain).toBeLessThan(outlook)
    }
  })

  it('Humidity: High [3+,4-] I=0.985, Normal [6+,1-] I=0.592', () => {
    const g = gainFor('Humidity')
    expect(g.rows[0]).toMatchObject({ value: 'High', pi: 3, ni: 4 })
    expect(g.rows[0].info).toBeCloseTo(0.985, 3)
    expect(g.rows[1]).toMatchObject({ value: 'Normal', pi: 6, ni: 1 })
    expect(g.rows[1].info).toBeCloseTo(0.592, 3)
  })

  it('Wind: Weak [6+,2-] I=0.811, Strong [3+,3-] I=1', () => {
    const g = gainFor('Wind')
    expect(g.rows[0].info).toBeCloseTo(0.811, 3)
    expect(g.rows[1].info).toBeCloseTo(1, 12)
  })
})

describe('runId3 — cây và luật khớp slide trang 19 và 65', () => {
  const { result, steps } = runId3(PLAY_BALL_14)

  it('I(p,n) toàn tập là 0.940', () => {
    expect(result.rootInfo).toBeCloseTo(0.94, 3)
  })

  it('gốc cây là Outlook', () => {
    expect(result.tree.kind).toBe('internal')
    expect(result.tree.kind === 'internal' && result.tree.attribute).toBe('Outlook')
  })

  it('nhánh Overcast là lá Yes thuần khiết', () => {
    const root = result.tree as Extract<TreeNode, { kind: 'internal' }>
    const overcast = root.children.find((c) => c.value === 'Overcast')!.node
    expect(overcast).toEqual({ kind: 'leaf', className: 'Yes', count: 4, pure: true })
  })

  it('nhánh Sunny tách theo Humidity, nhánh Rainy tách theo Wind', () => {
    const root = result.tree as Extract<TreeNode, { kind: 'internal' }>
    const sunny = root.children.find((c) => c.value === 'Sunny')!.node
    const rainy = root.children.find((c) => c.value === 'Rainy')!.node
    expect(sunny.kind === 'internal' && sunny.attribute).toBe('Humidity')
    expect(rainy.kind === 'internal' && rainy.attribute).toBe('Wind')
  })

  it('ra đúng 5 luật của slide trang 65', () => {
    const texts = result.rules.map((r, i) => formatRule(r, i, decision))
    expect(texts).toEqual([
      'R1: If (Outlook=Sunny) ∧ (Humidity=High) Then Play=No',
      'R2: If (Outlook=Sunny) ∧ (Humidity=Normal) Then Play=Yes',
      'R3: If (Outlook=Overcast) Then Play=Yes',
      'R4: If (Outlook=Rainy) ∧ (Wind=Weak) Then Play=Yes',
      'R5: If (Outlook=Rainy) ∧ (Wind=Strong) Then Play=No',
    ])
  })

  it('cây có 5 lá và sâu 3 tầng', () => {
    expect(countLeaves(result.tree)).toBe(5)
    expect(treeDepth(result.tree)).toBe(3)
  })

  it('bỏ qua cột định danh Day dù nó có Gain cao nhất', () => {
    expect(result.rootGains.map((g) => g.attribute)).toEqual([
      'Outlook',
      'Temp',
      'Humidity',
      'Wind',
    ])
  })

  it('mỗi thuộc tính có một bước Gain riêng, không dồn chung một bảng', () => {
    const gainSteps = steps.filter((s) => s.title.includes('Gain('))
    expect(gainSteps.length).toBeGreaterThanOrEqual(4)
    for (const s of gainSteps) expect(s.tables).toHaveLength(1)
  })

  it('câu chuyển dùng đúng chữ của slide trang 69', () => {
    const chooseStep = steps.find((s) => s.title.includes('chọn thuộc tính phân nhánh'))
    expect(chooseStep?.note).toBe(
      'Dữ liệu ID3 sau khi tách nhánh theo thuộc tính Outlook vì thuộc tính Outlook có độ lợi lớn nhất.',
    )
  })

  it('bảng con đặt tên theo khuôn "Bảng con 1.1 (Outlook = Sunny)"', () => {
    expect(steps.some((s) => s.title.startsWith('Bảng con 1.1 (Outlook = Sunny)'))).toBe(true)
  })
})

describe('trường hợp biên', () => {
  it('báo lỗi khi bảng không có cột nhãn lớp', () => {
    expect(() => runId3({ ...PLAY_BALL_14, decisionAttribute: undefined })).toThrow(/nhãn lớp/)
  })

  it('báo lỗi khi mọi mẫu cùng một lớp', () => {
    const rows = PLAY_BALL_14.rows.filter((r) => r.Play === 'Yes')
    expect(() => runId3({ ...PLAY_BALL_14, rows })).toThrow(/một giá trị/)
  })

  it('extractRules trên cây chỉ có một lá cho một luật không điều kiện', () => {
    const leaf: TreeNode = { kind: 'leaf', className: 'Yes', count: 3, pure: true }
    expect(extractRules(leaf)).toEqual([{ conditions: [], className: 'Yes' }])
  })
})
