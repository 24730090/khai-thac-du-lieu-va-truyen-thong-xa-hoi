import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/kmeans')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Gom cụm k-means"
      slide="Bài 6"
      owner="Hưng"
      feature="F9"
      summary="Chọn k và trọng tâm ban đầu, bảng khoảng cách Euclid, ma trận phân hoạch U1 / U2, điều kiện dừng |Un - Un-1| = 0, scatter chart theo cụm."
    />
  )
}
