import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  /** Slide gốc, VD 'Bài 5 — trang 44-65'. Hiện để người chấm đối chiếu được. */
  slide: string
  /** Một dòng nói thuật toán làm gì. */
  summary: string
  children: ReactNode
}

/**
 * Khuôn trang chung cho cả 8 route thuật toán.
 *
 * Có một chỗ duy nhất đặt tiêu đề và badge nguồn slide, nên 8 trang trông đều
 * nhau — đúng nhận xét của GV: "tinh chỉnh cho đều chữ, mục nào ra mục đó".
 */
export function AlgorithmPage({ title, slide, summary, children }: Props) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <Badge variant="secondary">{slide}</Badge>
        </div>
        <p className="text-muted-foreground max-w-3xl text-sm">{summary}</p>
      </header>
      {children}
    </div>
  )
}

/** Tiêu đề một khối trong trang thuật toán (Dữ liệu vào, Tham số, Kết quả…). */
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="border-b pb-2 text-lg font-semibold">{children}</h2>
}
