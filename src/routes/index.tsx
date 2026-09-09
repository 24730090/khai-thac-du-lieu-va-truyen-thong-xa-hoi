import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ALGORITHM_NAV } from '@/lib/nav'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Badge variant="outline">IE403 — Khai thác dữ liệu và truyền thông xã hội</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Web demo các thuật toán khai thác dữ liệu
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Tám thuật toán trong môn được cài đặt lại bằng TypeScript thuần, chạy hoàn toàn trong
          trình duyệt. Mỗi thuật toán hiện đủ <span className="text-foreground">bước trung gian</span>{' '}
          theo đúng khuôn bảng trong slide, không chỉ kết quả cuối.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {ALGORITHM_NAV.map((item) => (
          <Link key={item.to} to={item.to} className="group">
            <Card className="hover:border-ring h-full gap-3 py-4 transition-colors">
              <CardHeader className="px-4">
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  {item.label}
                  <ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription>Slide gốc: {item.slide}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>

      <Card className="border-dashed">
        <CardContent className="text-muted-foreground text-sm">
          Trang chủ hiện mới là khung điều hướng. Nội dung đầy đủ — mô tả đồ án, ảnh chụp, hướng
          dẫn dùng — thuộc F12.
        </CardContent>
      </Card>
    </div>
  )
}
