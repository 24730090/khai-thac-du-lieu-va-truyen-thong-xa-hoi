import { describe, expect, it } from 'vitest'
import { fmt, fmtFixed, fmtFraction, fmtPercent, fmtPoint } from './format'

describe('fmt', () => {
  it('dùng dấu chấm thập phân, 3 chữ số như slide', () => {
    expect(fmt(0.9402859586706311)).toBe('0.940')
    expect(fmt(0.6935361388961918)).toBe('0.694')
    expect(fmt(0.24674981977443933)).toBe('0.247')
  })

  it('giữ số nguyên ở dạng nguyên', () => {
    expect(fmt(14)).toBe('14')
    expect(fmt(0)).toBe('0')
  })

  it('không trả về -0.000', () => {
    expect(fmt(-0.0001)).toBe('0.000')
  })
})

describe('fmtFixed', () => {
  it('luôn giữ đủ chữ số thập phân', () => {
    expect(fmtFixed(1)).toBe('1.000')
    expect(fmtFixed(0.5, 2)).toBe('0.50')
  })
})

describe('các hàm phụ', () => {
  it('fmtFraction viết phân số kiểu slide', () => {
    expect(fmtFraction(9, 14)).toBe('9/14')
  })

  it('fmtPercent', () => {
    expect(fmtPercent(0.643)).toBe('64.30%')
  })

  it('fmtPoint dựng toạ độ kiểu k-means', () => {
    expect(fmtPoint([1, 9], 'A1')).toBe('A1(1,9)')
    expect(fmtPoint([1.2666, 3])).toBe('(1.267,3)')
  })
})
