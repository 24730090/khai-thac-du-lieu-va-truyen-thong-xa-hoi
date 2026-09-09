import { Construction } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  title: string
  /** Slide gốc, VD 'Bài 5'. */
  slide: string
  /** Người sở hữu route theo docs/phan-cong.md. */
  owner: string
  /** Mã feature trong docs/outline.md § Features, VD 'F8'. */
  feature: string
  /** Một dòng mô tả thuật toán sẽ cài ở route này. */
  summary: string
}

/**
 * Khung tạm cho route chưa cài thuật toán.
 *
 * F1 chỉ dựng khung — người sở hữu route sẽ THAY HẲN component này bằng
 * giao diện thật của mình. Đừng cố mở rộng nó.
 */
export function RoutePlaceholder({ title, slide, owner, feature, summary }: Props) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <Badge variant="outline">{feature}</Badge>
          <Badge variant="secondary">{slide}</Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">{summary}</p>
      </header>

      <Card className="border-dashed">
        <CardContent className="flex items-start gap-3">
          <Construction className="text-muted-foreground mt-0.5 size-5 shrink-0" />
          <div className="space-y-1 text-sm">
            <p className="font-medium">Đang phát triển</p>
            <p className="text-muted-foreground">
              Route này mới có khung. Phần cài đặt thuật toán và bảng bước trung gian thuộc{' '}
              <span className="text-foreground font-medium">{feature}</span>, người phụ trách:{' '}
              <span className="text-foreground font-medium">{owner}</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
