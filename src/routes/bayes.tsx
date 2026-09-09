import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import { runNaiveBayes, type Query } from '@/algorithms/bayes'
import { DI_CHOI_9, PLAY_BALL_14 } from '@/data/samples'
import { distinctValues } from '@/lib/csv'
import { fmtFixed } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export const Route = createFileRoute('/bayes')({
  component: Page,
})

const SAMPLES: Dataset[] = [PLAY_BALL_14, DI_CHOI_9]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(PLAY_BALL_14)
  const [laplace, setLaplace] = useState(false)
  const [query, setQuery] = useState<Query>({})

  /** Thuộc tính dùng làm đặc trưng: danh mục, không phải nhãn lớp, không phải cột định danh. */
  const featureAttributes = useMemo(
    () =>
      dataset.attributes.filter(
        (a) =>
          a.type === 'nominal' &&
          a.name !== dataset.decisionAttribute &&
          new Set(dataset.rows.map((r) => String(r[a.name]))).size < dataset.rows.length,
      ),
    [dataset],
  )

  // Đổi bộ dữ liệu thì mẫu hỏi cũ trỏ vào thuộc tính không còn tồn tại.
  useEffect(() => {
    const next: Query = {}
    for (const attr of featureAttributes) {
      next[attr.name] = distinctValues(dataset, attr.name)[0] ?? ''
    }
    setQuery(next)
  }, [dataset, featureAttributes])

  const run = useMemo(() => {
    if (Object.keys(query).length === 0) return null
    try {
      return {
        ok: true as const,
        value: runNaiveBayes(dataset, { query, laplace }),
      }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset, query, laplace])

  return (
    <AlgorithmPage
      title="Phân lớp Naive Bayes"
      slide="Bài 5.1 & Bài 7 — trang 5-32"
      summary="Ước lượng P(Ci) và P(xi|Ci) từ tần suất trong tập huấn luyện, nhân lại theo giả thiết độc lập điều kiện, rồi chọn lớp có P(X|C)·P(C) lớn nhất (quy tắc MAP)."
    >
      <section className="space-y-3">
        <SectionTitle>Tập huấn luyện</SectionTitle>
        <DatasetInput
          samples={SAMPLES}
          value={dataset}
          onChange={setDataset}
          allowDecisionAttribute
        />
      </section>

      <section className="space-y-3">
        <SectionTitle>Mẫu cần phân lớp</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featureAttributes.map((attr) => (
            <div key={attr.name} className="space-y-1.5">
              <Label htmlFor={`q-${attr.name}`}>{attr.name}</Label>
              <Select
                id={`q-${attr.name}`}
                value={query[attr.name] ?? ''}
                onChange={(e) => setQuery((q) => ({ ...q, [attr.name]: e.target.value }))}
              >
                <option value="">— bỏ qua —</option>
                {distinctValues(dataset, attr.name).map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>
          ))}
        </div>

        <label className="flex w-fit items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4 accent-current"
            checked={laplace}
            onChange={(e) => setLaplace(e.target.checked)}
          />
          Bật làm trơn Laplace (Bài 5.1 trang 28)
        </label>
        <p className="text-muted-foreground text-xs">
          Không làm trơn thì một xác suất bằng 0 kéo cả tích về 0 — thử mẫu có Outlook =
          Overcast với lớp No để thấy.
        </p>
      </section>

      {run === null ? (
        <p className="text-muted-foreground text-sm">Chọn ít nhất một thuộc tính cho mẫu hỏi.</p>
      ) : !run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <>
          <ResultCard
            title={`Mẫu X được phân vào lớp "${run.value.result.predicted}"`}
            description={
              run.value.result.tie
                ? 'Có hai lớp cùng điểm cao nhất — thử bật làm trơn Laplace.'
                : 'Theo quy tắc MAP: chọn lớp có P(X|C)·P(C) lớn nhất.'
            }
          >
            <div className="flex flex-wrap gap-2">
              {run.value.result.scores.map((s) => (
                <Badge
                  key={s.className}
                  variant={s.className === run.value.result.predicted ? 'default' : 'outline'}
                >
                  P(X|{s.className})·P({s.className}) = {fmtFixed(s.score, 6)}
                </Badge>
              ))}
            </div>
          </ResultCard>

          <StepPanel steps={run.value.steps} />
        </>
      )}
    </AlgorithmPage>
  )
}
