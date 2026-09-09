import type { Attribute, Dataset, Row } from '@/types'

/** Một ô là số nếu parse ra số hữu hạn và không phải chuỗi rỗng. */
function asNumber(raw: string): number | null {
  const t = raw.trim()
  if (t === '') return null
  // Chỉ nhận dấu chấm thập phân — dấu phẩy đã là ký tự phân cột.
  if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t)) return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

/** Tách một dòng CSV, có xử lý ô bọc trong dấu nháy kép. */
function splitLine(line: string, delimiter: string): string[] {
  const out: string[] = []
  let cur = ''
  let quoted = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          quoted = false
        }
      } else {
        cur += ch
      }
    } else if (ch === '"') {
      quoted = true
    } else if (ch === delimiter) {
      out.push(cur)
      cur = ''
    } else {
      cur += ch
    }
  }
  out.push(cur)
  return out.map((c) => c.trim())
}

/** Đoán ký tự phân cột từ dòng tiêu đề: phẩy, chấm phẩy hoặc tab. */
function detectDelimiter(headerLine: string): string {
  const counts = [',', ';', '\t'].map((d) => ({ d, n: headerLine.split(d).length }))
  counts.sort((a, b) => b.n - a.n)
  return counts[0].n > 1 ? counts[0].d : ','
}

export type ParseCsvOptions = {
  name?: string
  /** Cột nhãn lớp. Mặc định lấy cột cuối nếu nó là nominal. */
  decisionAttribute?: string
}

export class CsvParseError extends Error {}

/**
 * Đọc CSV (dòng đầu là tiêu đề) thành `Dataset`.
 *
 * Kiểu thuộc tính suy ra từ dữ liệu: cột mà MỌI ô đều parse ra số thì là
 * `numeric`, còn lại là `nominal`. Suy sai kiểu sẽ làm k-means không chạy được
 * hoặc ID3 chia nhánh trên số — nên hàm này để `DatasetInput` cho phép sửa tay
 * lại kiểu sau khi parse.
 */
export function parseCsv(text: string, options: ParseCsvOptions = {}): Dataset {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l !== '')

  if (lines.length === 0) throw new CsvParseError('Chưa có dữ liệu.')
  if (lines.length === 1) throw new CsvParseError('Chỉ có dòng tiêu đề, chưa có dòng dữ liệu nào.')

  const delimiter = detectDelimiter(lines[0])
  const header = splitLine(lines[0], delimiter)

  if (header.some((h) => h === '')) throw new CsvParseError('Có cột trong dòng tiêu đề bị bỏ trống.')
  if (new Set(header).size !== header.length)
    throw new CsvParseError('Dòng tiêu đề có tên cột trùng nhau.')

  const cells: string[][] = []
  for (let i = 1; i < lines.length; i++) {
    const parts = splitLine(lines[i], delimiter)
    if (parts.length !== header.length) {
      throw new CsvParseError(
        `Dòng ${i + 1} có ${parts.length} ô nhưng tiêu đề có ${header.length} cột.`,
      )
    }
    cells.push(parts)
  }

  const attributes: Attribute[] = header.map((name, c) => {
    const column = cells.map((r) => r[c])
    const nonEmpty = column.filter((v) => v !== '')
    const allNumeric = nonEmpty.length > 0 && nonEmpty.every((v) => asNumber(v) !== null)
    return allNumeric
      ? { name, type: 'numeric' as const }
      : { name, type: 'nominal' as const, values: [...new Set(nonEmpty)] }
  })

  const rows: Row[] = cells.map((r) => {
    const row: Row = {}
    header.forEach((name, c) => {
      const attr = attributes[c]
      const raw = r[c]
      row[name] = attr.type === 'numeric' ? (asNumber(raw) ?? Number.NaN) : raw
    })
    return row
  })

  const lastAttr = attributes[attributes.length - 1]
  const decisionAttribute =
    options.decisionAttribute ?? (lastAttr.type === 'nominal' ? lastAttr.name : undefined)

  return {
    name: options.name ?? 'Dữ liệu đã dán',
    attributes,
    rows,
    decisionAttribute,
  }
}

/** Xuất `Dataset` ngược lại thành CSV — dùng cho ô nhập tay và nút chép. */
export function datasetToCsv(dataset: Dataset): string {
  const esc = (v: string | number) => {
    const s = String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const head = dataset.attributes.map((a) => esc(a.name)).join(',')
  const body = dataset.rows.map((r) =>
    dataset.attributes.map((a) => esc(r[a.name] ?? '')).join(','),
  )
  return [head, ...body].join('\n')
}

/** Các giá trị phân biệt của một cột, giữ nguyên thứ tự xuất hiện. */
export function distinctValues(dataset: Dataset, attribute: string): string[] {
  const seen = new Set<string>()
  for (const row of dataset.rows) {
    const v = row[attribute]
    if (v !== undefined && v !== '') seen.add(String(v))
  }
  return [...seen]
}

/** Lấy cột số dưới dạng mảng `number[]`, bỏ ô trống. */
export function numericColumn(dataset: Dataset, attribute: string): number[] {
  return dataset.rows
    .map((r) => r[attribute])
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
}
