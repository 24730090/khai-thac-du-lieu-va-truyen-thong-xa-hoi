import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/kohonen')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Mạng Kohonen (SOM)"
      slide="Bài 8"
      owner="Hưng"
      feature="F10"
      summary="Khởi tạo map 2 chiều, tìm nơron chiến thắng theo khoảng cách, cập nhật trọng số nơron thắng và vùng lân cận, heatmap map cuối."
    />
  )
}
