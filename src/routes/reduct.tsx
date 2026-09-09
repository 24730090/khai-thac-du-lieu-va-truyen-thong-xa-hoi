import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/reduct')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Tập thô — Reduct"
      slide="Bài 3"
      owner="T. Phúc"
      feature="F11"
      summary="Quan hệ bất khả phân biệt, xấp xỉ trên và xấp xỉ dưới, ma trận phân biệt, hàm phân biệt CNF rút thành DNF, liệt kê reduct."
    />
  )
}
