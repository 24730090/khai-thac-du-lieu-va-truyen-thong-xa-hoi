import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/tien-xu-ly')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Tiền xử lý dữ liệu"
      slide="Bài 1_2"
      owner="H. Phúc"
      feature="F4"
      summary="Chia bin theo tần số bằng nhau, làm trơn theo bin means / bin boundaries, chuẩn hoá min-max và z-score, xử lý giá trị thiếu."
    />
  )
}
