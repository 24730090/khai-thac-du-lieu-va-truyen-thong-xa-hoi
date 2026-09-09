/**
 * Hợp đồng kiểu dữ liệu dùng chung cho cả 8 thuật toán.
 *
 * Đây là file 4 người cùng đọc: mọi thuật toán trong `src/algorithms/` trả về
 * `AlgorithmResult<T>`, và `StepPanel` dựng lại giao diện chỉ từ `steps[]`.
 * Đổi kiểu ở đây là đổi API của cả nhóm — báo trước khi sửa.
 *
 * Nguồn: CLAUDE.md § luật 2, docs/outline.md § Data model.
 */

/** Kiểu của một thuộc tính trong bảng dữ liệu. */
export type AttributeType = 'nominal' | 'numeric'

export type Attribute = {
  name: string
  type: AttributeType
  /** Miền giá trị, chỉ có nghĩa với thuộc tính nominal. VD: ['Sunny', 'Rainy']. */
  values?: string[]
}

/** Một dòng dữ liệu, khoá là tên thuộc tính. */
export type Row = Record<string, string | number>

export type Dataset = {
  name: string
  attributes: Attribute[]
  rows: Row[]
  /** Cột nhãn lớp — dùng cho ID3 / Naive Bayes / Reduct. */
  decisionAttribute?: string
}

/** Một bảng trong bước trung gian, dựng đúng khuôn bảng trong slide thầy. */
export type StepTable = {
  caption: string
  head: string[]
  body: (string | number)[][]
}

/**
 * Một bước trung gian của thuật toán.
 *
 * `title` phải đặt ĐÚNG tiêu đề slide, VD "Tính lại trọng tâm",
 * "Ma trận phân hoạch U2" — xem docs/format-trinh-bay-cua-GV.md.
 */
export type Step = {
  index: number
  title: string
  /** Công thức KaTeX, VD 'I(9,5) = -\frac{9}{14}\log_2\frac{9}{14} - \dots' */
  formula?: string
  tables?: StepTable[]
  note?: string
}

/** Kiểu trả về bắt buộc của mọi thuật toán: bước trung gian + kết quả cuối. */
export type AlgorithmResult<T> = {
  steps: Step[]
  result: T
}
