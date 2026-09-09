import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, List, StepForward } from 'lucide-react'
import type { Step } from '@/types'
import { Button } from '@/components/ui/button'
import { FormulaLine } from '@/components/formula-line'
import { MatrixTable } from '@/components/matrix-table'
import { cn } from '@/lib/utils'

type Props = {
  steps: Step[]
  /** Chế độ mở đầu. Mặc định `all` — mở ra thấy trọn bài giải như trong slide. */
  defaultMode?: 'all' | 'stepper'
  className?: string
}

function StepBlock({ step }: { step: Step }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-baseline gap-2 text-sm font-semibold">
        <span className="text-muted-foreground tabular-nums">Bước {step.index}.</span>
        <span>{step.title}</span>
      </h3>

      {step.formula ? <FormulaLine formula={step.formula} /> : null}

      {step.tables?.map((t, i) => <MatrixTable key={i} table={t} />)}

      {step.note ? (
        <p className="text-muted-foreground border-l-2 pl-3 text-sm whitespace-pre-line">
          {step.note}
        </p>
      ) : null}
    </section>
  )
}

/**
 * Hiện mảng `steps[]` mà mọi thuật toán trả về.
 *
 * Hai chế độ: xem trọn bài giải, hoặc đi từng bước. Chế độ từng bước là thứ
 * làm app khác một cái máy tính bấm ra đáp án — lúc quay video demo thì bấm
 * từng bước cho thấy thuật toán chạy tới đâu.
 */
export function StepPanel({ steps, defaultMode = 'all', className }: Props) {
  const [mode, setMode] = useState<'all' | 'stepper'>(defaultMode)
  const [current, setCurrent] = useState(0)

  // Chạy lại thuật toán với dữ liệu khác thì con trỏ bước phải về đầu, nếu
  // không sẽ trỏ ra ngoài mảng và panel trống trơn.
  useEffect(() => {
    setCurrent(0)
  }, [steps])

  if (steps.length === 0) return null

  const safeCurrent = Math.min(current, steps.length - 1)

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
        <h2 className="text-lg font-semibold">Các bước trung gian</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('all')}
          >
            <List /> Xem tất cả
          </Button>
          <Button
            variant={mode === 'stepper' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('stepper')}
          >
            <StepForward /> Từng bước
          </Button>
        </div>
      </div>

      {mode === 'all' ? (
        <div className="space-y-8">
          {steps.map((s) => (
            <StepBlock key={s.index} step={s} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <StepBlock step={steps[safeCurrent]} />
          <div className="flex items-center justify-between gap-3 border-t pt-3">
            <Button
              variant="outline"
              size="sm"
              disabled={safeCurrent === 0}
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft /> Bước trước
            </Button>
            <span className="text-muted-foreground text-sm tabular-nums">
              {safeCurrent + 1} / {steps.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={safeCurrent >= steps.length - 1}
              onClick={() => setCurrent((i) => Math.min(steps.length - 1, i + 1))}
            >
              Bước sau <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
