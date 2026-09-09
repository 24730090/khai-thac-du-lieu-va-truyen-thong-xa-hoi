import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  title?: string
  description?: ReactNode
  children: ReactNode
  className?: string
}

/** Khối kết quả cuối, đặt ngay trên `StepPanel` ở cả 8 route cho đều khuôn. */
export function ResultCard({ title = 'Kết quả', description, children, className }: Props) {
  return (
    <Card className={cn('border-primary/40 gap-4', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="size-4" />
          {title}
        </CardTitle>
        {description ? (
          <div className="text-muted-foreground text-sm">{description}</div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3 text-sm">{children}</CardContent>
    </Card>
  )
}
