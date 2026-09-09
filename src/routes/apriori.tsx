import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/apriori')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Tập phổ biến & luật kết hợp"
      slide="Bài 2"
      owner="H. Phúc"
      feature="F5"
      summary="Sinh Ck từ Lk-1, bước rút gọn, bảng support từng mức, sinh luật kết hợp theo confidence; tab thứ hai tìm tập phổ biến bằng vector biểu diễn."
    />
  )
}
