import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/bayes')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Phân lớp Naive Bayes"
      slide="Bài 5.1"
      owner="T. Phúc"
      feature="F6"
      summary="Bảng P(Ci), bảng P(xi|Ci) từng thuộc tính, tính P(X|C)·P(C) cho từng lớp và chọn lớp theo MAP."
    />
  )
}
