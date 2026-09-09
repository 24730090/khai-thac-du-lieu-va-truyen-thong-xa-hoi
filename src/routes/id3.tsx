import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/id3')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Cây quyết định ID3"
      slide="Bài 5"
      owner="Danh"
      feature="F8"
      summary="Bảng Attr / pi / ni / I(pi,ni) cho từng thuộc tính, dòng E(A) và Gain(A), đệ quy bảng con, vẽ cây SVG và xuất luật IF-THEN."
    />
  )
}
