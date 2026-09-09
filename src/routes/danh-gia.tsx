import { createFileRoute } from '@tanstack/react-router'
import { RoutePlaceholder } from '@/components/route-placeholder'

export const Route = createFileRoute('/danh-gia')({
  component: Page,
})

function Page() {
  return (
    <RoutePlaceholder
      title="Đánh giá mô hình phân lớp"
      slide="Bài 7"
      owner="T. Phúc"
      feature="F7"
      summary="Dựng Confusion Matrix 2x2 (TP / FN / FP / TN) từ kết quả dự đoán, tính Accuracy, Precision, Recall và F1."
    />
  )
}
