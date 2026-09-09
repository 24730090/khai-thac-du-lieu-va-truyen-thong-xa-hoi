import { describe, expect, it } from 'vitest'
import { CsvParseError, datasetToCsv, distinctValues, numericColumn, parseCsv } from './csv'
import { PLAY_BALL_14, TIEN_XU_LY_HON_HOP } from '@/data/samples'

describe('parseCsv', () => {
  it('đọc CSV cơ bản và suy kiểu cột', () => {
    const ds = parseCsv('ten,tuoi\nAn,20\nBinh,31')
    expect(ds.attributes).toEqual([
      { name: 'ten', type: 'nominal', values: ['An', 'Binh'] },
      { name: 'tuoi', type: 'numeric' },
    ])
    expect(ds.rows).toEqual([
      { ten: 'An', tuoi: 20 },
      { ten: 'Binh', tuoi: 31 },
    ])
  })

  it('cột chỉ toàn số mới là numeric; lẫn một ô chữ là nominal', () => {
    expect(parseCsv('a\n1\n2').attributes[0].type).toBe('numeric')
    expect(parseCsv('a\n1\nx').attributes[0].type).toBe('nominal')
  })

  it('nhận số âm, số thập phân và ký pháp mũ', () => {
    const ds = parseCsv('v\n-1.5\n2e3\n.25')
    expect(ds.attributes[0].type).toBe('numeric')
    expect(ds.rows.map((r) => r.v)).toEqual([-1.5, 2000, 0.25])
  })

  it('tự đoán dấu phân cột là chấm phẩy hoặc tab', () => {
    expect(parseCsv('a;b\n1;2').attributes.map((a) => a.name)).toEqual(['a', 'b'])
    expect(parseCsv('a\tb\n1\t2').attributes.map((a) => a.name)).toEqual(['a', 'b'])
  })

  it('xử lý ô bọc trong nháy kép, kể cả khi chứa dấu phẩy', () => {
    const ds = parseCsv('ten,ghichu\nAn,"Hà Nội, Việt Nam"')
    expect(ds.rows[0].ghichu).toBe('Hà Nội, Việt Nam')
  })

  it('nháy kép lặp đôi trong ô là một dấu nháy', () => {
    const ds = parseCsv('a\n"noi ""xin chao"""')
    expect(ds.rows[0].a).toBe('noi "xin chao"')
  })

  it('lấy cột cuối làm nhãn lớp nếu nó là nominal', () => {
    expect(parseCsv('a,lop\n1,X\n2,Y').decisionAttribute).toBe('lop')
    expect(parseCsv('lop,a\nX,1\nY,2').decisionAttribute).toBeUndefined()
  })

  it('tôn trọng cột nhãn lớp được chỉ định', () => {
    expect(parseCsv('a,lop\n1,X\n2,Y', { decisionAttribute: 'a' }).decisionAttribute).toBe('a')
  })

  it('bỏ qua dòng trống', () => {
    expect(parseCsv('a\n1\n\n2\n').rows).toHaveLength(2)
  })
})

describe('parseCsv — báo lỗi rõ ràng', () => {
  it('dữ liệu rỗng', () => {
    expect(() => parseCsv('   ')).toThrow(CsvParseError)
  })

  it('chỉ có dòng tiêu đề', () => {
    expect(() => parseCsv('a,b')).toThrow(/chưa có dòng dữ liệu/)
  })

  it('số ô không khớp số cột, có chỉ đúng số dòng', () => {
    expect(() => parseCsv('a,b\n1,2\n3')).toThrow(/Dòng 3 có 1 ô nhưng tiêu đề có 2 cột/)
  })

  it('tên cột trùng nhau', () => {
    expect(() => parseCsv('a,a\n1,2')).toThrow(/trùng nhau/)
  })

  it('cột trong tiêu đề bị bỏ trống', () => {
    expect(() => parseCsv('a,,b\n1,2,3')).toThrow(/bỏ trống/)
  })
})

describe('datasetToCsv', () => {
  it('đi vòng tròn: xuất rồi đọc lại ra cùng dữ liệu', () => {
    const back = parseCsv(datasetToCsv(PLAY_BALL_14), {
      decisionAttribute: PLAY_BALL_14.decisionAttribute,
    })
    expect(back.rows).toEqual(PLAY_BALL_14.rows)
    expect(back.attributes.map((a) => a.name)).toEqual(
      PLAY_BALL_14.attributes.map((a) => a.name),
    )
  })

  /**
   * Ô trống của cột số lưu là NaN. Ghi ra chữ "NaN" thì dán ngược vào sẽ thành
   * cột danh mục, vì "NaN" không parse ra số.
   */
  it('ghi ô trống thành ô RỖNG chứ không phải chữ "NaN"', () => {
    const csv = datasetToCsv(TIEN_XU_LY_HON_HOP)
    expect(csv).not.toContain('NaN')

    const back = parseCsv(csv)
    expect(back.attributes.find((a) => a.name === 'Tuổi')?.type).toBe('numeric')
    expect(back.attributes.find((a) => a.name === 'Thu nhập')?.type).toBe('numeric')
  })

  it('bọc nháy kép cho ô có dấu phẩy hoặc nháy', () => {
    const csv = datasetToCsv({
      name: 't',
      attributes: [{ name: 'a', type: 'nominal' }],
      rows: [{ a: 'x,y' }, { a: 'co "nhay"' }],
    })
    expect(csv.split('\n')[1]).toBe('"x,y"')
    expect(csv.split('\n')[2]).toBe('"co ""nhay"""')
  })
})

describe('tiện ích cột', () => {
  it('distinctValues giữ thứ tự xuất hiện và bỏ ô rỗng', () => {
    expect(distinctValues(PLAY_BALL_14, 'Outlook')).toEqual(['Sunny', 'Overcast', 'Rainy'])
  })

  it('numericColumn bỏ ô trống', () => {
    // Cột Tuổi có 6 dòng, một dòng NaN.
    expect(numericColumn(TIEN_XU_LY_HON_HOP, 'Tuổi')).toEqual([25, 31, 45, 22, 38])
  })
})
