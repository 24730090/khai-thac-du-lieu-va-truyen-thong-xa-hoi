import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import type { Dataset } from '@/types'
import { runKmeans, toPoints } from '@/algorithms/kmeans'
import { KMEANS_4_DIEM, KMEANS_5_DIEM, SOM_3_CUM } from '@/data/samples'
import { DISTANCES, type DistanceName } from '@/lib/distance'
import { fmt, fmtPoint } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { MatrixTable } from '@/components/matrix-table'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export const Route = createFileRoute('/kmeans')({
  component: Page,
})

const SAMPLES: Dataset[] = [KMEANS_4_DIEM, KMEANS_5_DIEM, SOM_3_CUM]

/** Màu cụm, đủ tương phản ở cả giao diện sáng và tối. */
const CLUSTER_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444']

function Page() {
  const [dataset, setDataset] = useState<Dataset>(KMEANS_4_DIEM)
  const [k, setK] = useState(2)
  const [distance, setDistance] = useState<DistanceName>('euclidean')
  const [useSlideInit, setUseSlideInit] = useState(true)

  const pointCount = dataset.rows.length

  // Đổi bộ dữ liệu nhỏ hơn thì k cũ có thể vượt số điểm.
  useEffect(() => {
    setK((current) => Math.min(Math.max(1, current), Math.max(1, pointCount)))
  }, [pointCount])

  /**
   * U0 của slide (trang 19): cụm 1 chỉ có điểm đầu, mọi điểm còn lại dồn vào
   * cụm 2. Với k > 2, phần còn lại chia xoay vòng cho các cụm từ 2 tới k —
   * dồn hết vào cụm 2 sẽ để các cụm sau RỖNG ngay từ vòng 1, và trọng tâm của
   * cụm rỗng không có nghĩa gì.
   *
   * Tắt ô này thì mỗi cụm nhận một điểm đầu rồi phần dư dồn cụm cuối.
   */
  const initialAssignment = useMemo(() => {
    if (!useSlideInit || k < 1) return undefined
    return Array.from({ length: pointCount }, (_, i) =>
      i === 0 ? 0 : k === 1 ? 0 : 1 + ((i - 1) % (k - 1)),
    )
  }, [useSlideInit, pointCount, k])

  const run = useMemo(() => {
    try {
      return {
        ok: true as const,
        value: runKmeans(dataset, { k, distance, initialAssignment }),
      }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset, k, distance, initialAssignment])

  return (
    <AlgorithmPage
      title="Gom cụm k-means"
      slide="Bài 6 — trang 14-29"
      summary="Bốn bước: chọn trọng tâm ban đầu, gán mỗi điểm vào cụm gần nhất, kiểm tra điều kiện dừng, tính lại trọng tâm rồi lặp — cho tới khi |Un − Un−1| = 0."
    >
      <section className="space-y-3">
        <SectionTitle>Dữ liệu vào</SectionTitle>
        <DatasetInput samples={SAMPLES} value={dataset} onChange={setDataset} />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="k">Số cụm k</Label>
            <Input
              id="k"
              type="number"
              min={1}
              max={Math.max(1, pointCount)}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="distance">Độ đo khoảng cách</Label>
            <Select
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value as DistanceName)}
            >
              {Object.entries(DISTANCES).map(([key, d]) => (
                <option key={key} value={key}>
                  {d.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 pb-2 text-sm">
              <input
                type="checkbox"
                className="size-4 accent-current"
                checked={useSlideInit}
                onChange={(e) => setUseSlideInit(e.target.checked)}
              />
              Dùng U0 kiểu slide
            </label>
          </div>
        </div>
      </section>

      {!run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <>
          <ResultCard
            title={
              run.value.result.converged
                ? `Hội tụ sau ${run.value.result.iterations.length} vòng lặp`
                : 'Chưa hội tụ trong giới hạn số vòng lặp'
            }
            description={run.value.result.centroids
              .map((v, i) => `V${i + 1}${fmtPoint(v)}`)
              .join(' · ')}
          >
            <ClusterChart dataset={dataset} run={run.value} />
          </ResultCard>

          <section className="space-y-3">
            <SectionTitle>Ma trận phân hoạch cuối</SectionTitle>
            <MatrixTable
              table={{
                caption: `U${run.value.result.iterations.length}`,
                head: ['', ...run.value.result.points.map((p) => p.label)],
                body: run.value.result.iterations[
                  run.value.result.iterations.length - 1
                ].matrix.map((row, c) => [`c${c + 1}`, ...row]),
              }}
              highlight={(value, _, c) => c > 0 && value === 1}
            />
          </section>

          <StepPanel steps={run.value.steps} />
        </>
      )}
    </AlgorithmPage>
  )
}

function ClusterChart({
  dataset,
  run,
}: {
  dataset: Dataset
  run: ReturnType<typeof runKmeans>
}) {
  const { points, dimensions, assignment, centroids } = run.result

  const { dimensions: allDims } = useMemo(() => toPoints(dataset), [dataset])
  const [xDim, setXDim] = useState(0)
  const [yDim, setYDim] = useState(1)

  if (dimensions.length < 2) {
    return (
      <p className="text-muted-foreground text-sm">
        Cần ít nhất hai cột số mới vẽ được biểu đồ phân tán. Các bước trung gian bên dưới vẫn đầy
        đủ.
      </p>
    )
  }

  const safeX = Math.min(xDim, dimensions.length - 1)
  const safeY = Math.min(yDim, dimensions.length - 1)

  const clusters = centroids.map((_, c) => ({
    name: `Cụm c${c + 1}`,
    color: CLUSTER_COLORS[c % CLUSTER_COLORS.length],
    data: points
      .map((p, i) => ({ label: p.label, x: p.coords[safeX], y: p.coords[safeY], cluster: assignment[i] }))
      .filter((p) => p.cluster === c),
  }))

  const centroidData = centroids.map((v, c) => ({
    label: `V${c + 1}`,
    x: v[safeX],
    y: v[safeY],
    cluster: c,
  }))

  return (
    <div className="space-y-3">
      {allDims.length > 2 ? (
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <Label htmlFor="x-dim" className="text-xs font-normal">
              Trục X
            </Label>
            <Select
              id="x-dim"
              className="h-7 w-auto text-xs"
              value={safeX}
              onChange={(e) => setXDim(Number(e.target.value))}
            >
              {dimensions.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </Select>
          </span>
          <span className="flex items-center gap-1.5">
            <Label htmlFor="y-dim" className="text-xs font-normal">
              Trục Y
            </Label>
            <Select
              id="y-dim"
              className="h-7 w-auto text-xs"
              value={safeY}
              onChange={(e) => setYDim(Number(e.target.value))}
            >
              {dimensions.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </Select>
          </span>
        </div>
      ) : null}

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              type="number"
              dataKey="x"
              name={dimensions[safeX]}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <YAxis
              type="number"
              dataKey="y"
              name={dimensions[safeY]}
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
            />
            <ZAxis range={[70, 71]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                background: 'var(--popover)',
                border: '1px solid var(--border)',
                color: 'var(--popover-foreground)',
              }}
              formatter={(value) => fmt(Number(value))}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {clusters.map((c) => (
              <Scatter key={c.name} name={c.name} data={c.data} fill={c.color} />
            ))}
            <Scatter
              name="Trọng tâm"
              data={centroidData}
              fill="var(--foreground)"
              shape="cross"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
