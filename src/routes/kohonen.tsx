import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import { runKohonen, type SomResult } from '@/algorithms/kohonen'
import { KMEANS_5_DIEM, SOM_3_CUM } from '@/data/samples'
import { fmtFixed } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/kohonen')({
  component: Page,
})

const SAMPLES: Dataset[] = [SOM_3_CUM, KMEANS_5_DIEM]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(SOM_3_CUM)
  const [rows, setRows] = useState(4)
  const [cols, setCols] = useState(4)
  const [epochs, setEpochs] = useState(12)
  const [alpha, setAlpha] = useState(0.5)
  const [radius, setRadius] = useState(1)
  const [seed, setSeed] = useState(42)

  const run = useMemo(() => {
    try {
      return {
        ok: true as const,
        value: runKohonen(dataset, {
          rows: Math.max(1, rows),
          cols: Math.max(1, cols),
          epochs: Math.max(1, epochs),
          alpha,
          radius: Math.max(0, radius),
          seed,
        }),
      }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset, rows, cols, epochs, alpha, radius, seed])

  return (
    <AlgorithmPage
      title="Mạng Kohonen (SOM)"
      slide="Bài 8 — trang 12-25"
      summary="Khởi tạo một mảng hai chiều các nơron, với mỗi mẫu học tìm nơron chiến thắng theo khoảng cách rồi kéo nó và vùng lân cận về phía mẫu, lặp nhiều vòng cho tới khi map ổn định."
    >
      <section className="space-y-3">
        <SectionTitle>Dữ liệu học</SectionTitle>
        <DatasetInput samples={SAMPLES} value={dataset} onChange={setDataset} />

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Param label="Số dòng map" id="rows" value={rows} min={1} max={12} onChange={setRows} />
          <Param label="Số cột map" id="cols" value={cols} min={1} max={12} onChange={setCols} />
          <Param
            label="Số vòng học"
            id="epochs"
            value={epochs}
            min={1}
            max={200}
            onChange={setEpochs}
          />
          <Param
            label="Hệ số học α"
            id="alpha"
            value={alpha}
            min={0}
            max={1}
            step={0.05}
            onChange={setAlpha}
          />
          <Param
            label="Bán kính lân cận"
            id="radius"
            value={radius}
            min={0}
            max={6}
            onChange={setRadius}
          />
          <Param label="Seed" id="seed" value={seed} min={0} max={99999} onChange={setSeed} />
        </div>
        <p className="text-muted-foreground text-xs">
          Slide dùng <code>rand()</code> nên chạy hai lần ra hai kết quả. Ở đây thay bằng bộ sinh
          số có seed — cùng seed cho đúng map cũ, nên lúc quay video bấm lại vẫn ra hình đã chuẩn
          bị.
        </p>
      </section>

      {!run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <>
          <ResultCard
            title="Map sau khi học"
            description={`${run.value.result.rows}×${run.value.result.cols} nơron · ${
              new Set(run.value.result.finalWinners.map((w) => `${w.y},${w.x}`)).size
            } nơron có mẫu rơi vào`}
          >
            <SomHeatmap result={run.value.result} />
          </ResultCard>

          <StepPanel steps={run.value.steps} />
        </>
      )}
    </AlgorithmPage>
  )
}

function Param({
  label,
  id,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  id: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

/**
 * Heatmap map cuối: độ đậm theo số mẫu rơi vào nơron, kèm nhãn các mẫu đó.
 * Nơron trống để nhạt — nhìn ra ngay vùng nào của map "bắt" được dữ liệu.
 */
function SomHeatmap({ result }: { result: SomResult }) {
  const { rows, cols, hitCounts, finalWinners, map, dimensions } = result
  const maxHit = Math.max(1, ...hitCounts.flat())

  const labelsAt = (y: number, x: number) =>
    finalWinners.filter((w) => w.y === y && w.x === x).map((w) => w.label)

  return (
    <div className="space-y-3">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows }).flatMap((_, y) =>
          Array.from({ length: cols }).map((__, x) => {
            const hits = hitCounts[y][x]
            const labels = labelsAt(y, x)
            return (
              <div
                key={`${y}-${x}`}
                className={cn(
                  'flex min-h-16 flex-col items-center justify-center gap-0.5 rounded border p-1 text-center',
                  hits === 0 && 'border-dashed',
                )}
                style={
                  hits > 0
                    ? { backgroundColor: `color-mix(in oklab, var(--primary) ${(hits / maxHit) * 55 + 15}%, transparent)` }
                    : undefined
                }
                title={`Nơron (${y}, ${x}) — trọng số ${map[y][x].weights
                  .map((w, i) => `${dimensions[i]}=${fmtFixed(w)}`)
                  .join(', ')}`}
              >
                <span className="text-muted-foreground text-[10px] tabular-nums">
                  {y},{x}
                </span>
                {labels.length > 0 ? (
                  <span className="text-[11px] leading-tight font-medium">
                    {labels.join(' ')}
                  </span>
                ) : null}
              </div>
            )
          }),
        )}
      </div>
      <p className="text-muted-foreground text-xs">
        Ô đậm là nơron có nhiều mẫu rơi vào; ô nét đứt là nơron chưa "bắt" được mẫu nào. Rê chuột
        lên một ô để xem trọng số của nơron đó.
      </p>
    </div>
  )
}
