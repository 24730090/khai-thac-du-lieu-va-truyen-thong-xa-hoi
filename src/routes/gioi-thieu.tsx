import { createFileRoute } from '@tanstack/react-router'
import { ALGORITHM_NAV } from '@/lib/nav'
import { ALL_SAMPLES } from '@/data/samples'
import { MatrixTable } from '@/components/matrix-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/gioi-thieu')({
  component: Page,
})

/**
 * Trang này KHÔNG ghi phần trăm phân công — chỉ ghi ai làm phần nào.
 *
 * Rubric đòi số phần trăm ở TRANG PHÂN CÔNG TRONG FILE BÁO CÁO, đặt ngay sau
 * mục lục (docs/rubric.md tiêu chí 1.2-1.4, ngưỡng #1 và #2). Đó là tiêu chí
 * T1 chấm báo cáo, không phải T2 chấm chương trình demo. Con số vẫn nằm ở
 * docs/phan-cong.md và sẽ vào báo cáo cùng slide 18.
 */
const MEMBERS = [
  {
    name: 'Nguyễn Ngọc Danh',
    id: '24730090',
    work: 'Khung dự án, component dùng chung, bộ dữ liệu mẫu, ID3, trang chủ, triển khai',
  },
  {
    name: 'Nguyễn Thanh Phúc',
    id: '24730131',
    work: 'Naive Bayes, Đánh giá mô hình phân lớp, Rough set / Reduct',
  },
  {
    name: 'Mai Hoàng Hưng',
    id: '24730099',
    work: 'Gom cụm k-means, Mạng Kohonen (SOM)',
  },
  {
    name: 'Nguyễn Thị Hồng Phúc',
    id: '24730132',
    work: 'Tiền xử lý dữ liệu, Apriori và vector biểu diễn',
  },
]

const TECH = [
  ['Giao diện', 'React 19 + TypeScript, dựng bằng Vite'],
  ['Điều hướng', 'TanStack Router (file-based, mỗi thuật toán một file)'],
  ['Thành phần giao diện', 'shadcn/ui + Tailwind CSS v4, có chế độ sáng / tối'],
  ['Biểu đồ', 'Recharts; cây quyết định vẽ SVG tay'],
  ['Công thức', 'KaTeX'],
  ['Kiểm thử', 'Vitest cho lõi thuật toán'],
  ['Triển khai', 'Vercel, static, không backend'],
]

function Page() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Giới thiệu đồ án</h1>
        <p className="text-muted-foreground max-w-3xl text-sm">
          Đồ án cuối kỳ môn <span className="text-foreground">IE403 — Khai thác dữ liệu và
          truyền thông xã hội</span>. Thầy cho chọn một trong hai hướng; nhóm chọn hướng thứ hai:
          cài đặt demo các thuật toán đã học trong môn, có giao diện.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Phân công công việc</h2>
        <MatrixTable
          table={{
            caption: `${MEMBERS.length} thành viên`,
            head: ['Họ và tên', 'MSSV', 'Phần phụ trách'],
            body: MEMBERS.map((m) => [m.name, m.id, m.work]),
          }}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Phạm vi</h2>
        <p className="text-muted-foreground max-w-3xl text-sm">
          {ALGORITHM_NAV.length} thuật toán, mỗi thuật toán một trang riêng, kèm{' '}
          {ALL_SAMPLES.length} bộ dữ liệu mẫu. Các bộ chép từ slide đều ghi rõ file slide và số
          trang gốc để đối chiếu được từng con số; bộ nào nhóm tự dựng thì ghi rõ là tự dựng.
        </p>
        <MatrixTable
          table={{
            caption: 'Tám thuật toán và slide gốc',
            head: ['#', 'Thuật toán', 'Slide gốc'],
            body: ALGORITHM_NAV.map((a, i) => [i + 1, a.label, a.slide]),
          }}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Kiến trúc và công nghệ</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="gap-2 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-base">Client-side hoàn toàn</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2 px-4 text-sm">
              <p>
                Không backend, không database, không API. Mọi thuật toán chạy trong trình duyệt
                bằng TypeScript thuần.
              </p>
              <p>
                Lõi thuật toán nằm riêng trong <code>src/algorithms/</code> và không import React,
                nên kiểm thử được mà không cần dựng giao diện.
              </p>
            </CardContent>
          </Card>
          <Card className="gap-2 py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-base">Hợp đồng dữ liệu chung</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2 px-4 text-sm">
              <p>
                Cả 8 thuật toán trả về cùng một kiểu:{' '}
                <code>{'AlgorithmResult<T> = { steps, result }'}</code>.
              </p>
              <p>
                Nhờ vậy một thành phần giao diện duy nhất dựng được bảng bước trung gian cho cả 8
                trang, và 8 trang trông đều nhau.
              </p>
            </CardContent>
          </Card>
        </div>
        <MatrixTable
          table={{
            caption: 'Công nghệ sử dụng',
            head: ['Hạng mục', 'Công nghệ'],
            body: TECH.map(([k, v]) => [k, v]),
          }}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Cách dùng</h2>
        <ol className="text-muted-foreground max-w-3xl list-inside list-decimal space-y-1.5 text-sm">
          <li>Chọn một thuật toán ở thanh bên trái.</li>
          <li>
            Nạp dữ liệu: chọn bộ mẫu chép từ slide, dán CSV của mình, hoặc sửa tay từng ô.
          </li>
          <li>Chỉnh tham số — số bin, minsupp, k, kích thước map…</li>
          <li>
            Đọc kết quả ở khối trên cùng, rồi xem phần <span className="text-foreground">Các bước
            trung gian</span>. Bấm <span className="text-foreground">Từng bước</span> để đi lần
            lượt qua từng bảng như khi giải tay.
          </li>
        </ol>
      </section>
    </div>
  )
}
