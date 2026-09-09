import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/gioi-thieu')({
  component: Page,
})

function Page() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Giới thiệu đồ án</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Đồ án cuối kỳ môn IE403 — Khai thác dữ liệu và truyền thông xã hội. Hướng đã chọn: cài
          đặt demo các thuật toán đã học trong môn, có giao diện.
        </p>
      </header>

      <Card className="border-dashed">
        <CardContent className="space-y-1 text-sm">
          <p className="font-medium">Đang phát triển</p>
          <p className="text-muted-foreground">
            Danh sách thành viên và phần trăm phân công, mô tả kiến trúc và hướng dẫn dùng sẽ được
            bổ sung ở <span className="text-foreground font-medium">F12</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
