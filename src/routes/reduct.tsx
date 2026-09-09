import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import {
  formatCnf,
  formatDnf,
  formatReductRule,
  objectLabels,
  rulesFromReduct,
  runReduct,
} from '@/algorithms/reduct'
import { BI_RAM_8, THOI_TIET_8, TUYEN_DUNG_8 } from '@/data/samples'
import { distinctValues } from '@/lib/csv'
import { fmt } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

export const Route = createFileRoute('/reduct')({
  component: Page,
})

const SAMPLES: Dataset[] = [BI_RAM_8, TUYEN_DUNG_8, THOI_TIET_8]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(BI_RAM_8)
  const [targetClass, setTargetClass] = useState<string>('')

  const decisionValues = useMemo(
    () => (dataset.decisionAttribute ? distinctValues(dataset, dataset.decisionAttribute) : []),
    [dataset],
  )

  // Đổi bộ dữ liệu thì lớp đang chọn có thể không còn tồn tại.
  useEffect(() => {
    if (decisionValues.length > 0 && !decisionValues.includes(targetClass)) {
      setTargetClass(decisionValues[0])
    }
  }, [decisionValues, targetClass])

  const labels = useMemo(() => objectLabels(dataset), [dataset])

  const target = useMemo(() => {
    const decision = dataset.decisionAttribute
    if (!decision || !targetClass) return undefined
    return dataset.rows
      .map((r, i) => (String(r[decision]) === targetClass ? labels[i] : null))
      .filter((x): x is string => x !== null)
  }, [dataset, targetClass, labels])

  const run = useMemo(() => {
    try {
      return { ok: true as const, value: runReduct(dataset, { target }) }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset, target])

  const [selectedReduct, setSelectedReduct] = useState(0)

  // Đổi bộ dữ liệu thì số reduct đổi theo, chỉ số cũ có thể trỏ ra ngoài mảng.
  const reductCount = run.ok ? run.value.result.reducts.length : 0
  useEffect(() => {
    setSelectedReduct((i) => (i < reductCount ? i : 0))
  }, [reductCount])

  return (
    <AlgorithmPage
      title="Tập thô — Reduct"
      slide="Bài 3 — trang 3-40"
      summary="Quan hệ bất khả phân biệt chia đối tượng thành lớp tương đương; xấp xỉ trên và dưới cho biết tập nào là thô; ma trận phân biệt rút thành hàm phân biệt, và các đơn thức tối tiểu của nó chính là các reduct."
    >
      <section className="space-y-3">
        <SectionTitle>Hệ quyết định</SectionTitle>
        <DatasetInput
          samples={SAMPLES}
          value={dataset}
          onChange={setDataset}
          allowDecisionAttribute
        />
        {decisionValues.length > 0 ? (
          <div className="flex items-center gap-2">
            <Label htmlFor="target" className="shrink-0 text-xs font-normal">
              Xấp xỉ lớp
            </Label>
            <Select
              id="target"
              className="h-8 text-xs"
              containerClassName="w-auto"
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
            >
              {decisionValues.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
      </section>

      {!run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <>
          <ResultCard
            title={`${run.value.result.reducts.length} reduct`}
            description={
              run.value.result.core.length > 0
                ? `Lõi: {${run.value.result.core.join(', ')}} — không bao giờ bỏ được`
                : 'Lõi rỗng'
            }
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {run.value.result.reducts.map((r, i) => (
                  <Badge key={i} variant={i === selectedReduct ? 'default' : 'outline'}>
                    <button type="button" onClick={() => setSelectedReduct(i)}>
                      B{i + 1} = {`{${r.join(', ')}}`}
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="space-y-1 font-mono text-xs">
                <p>
                  <span className="text-muted-foreground">CNF: </span>
                  f = {formatCnf(run.value.result.cnf)}
                </p>
                <p>
                  <span className="text-muted-foreground">DNF: </span>
                  f = {formatDnf(run.value.result.reducts)}
                </p>
              </div>

              <p className="text-muted-foreground">
                Độ phụ thuộc k = {fmt(run.value.result.dependency)}
                {run.value.result.dependency === 1
                  ? ' — quyết định phụ thuộc hoàn toàn vào thuộc tính điều kiện.'
                  : ' — chỉ phụ thuộc riêng phần.'}
              </p>
            </div>
          </ResultCard>

          <section className="space-y-3">
            <SectionTitle>
              Luật rút từ reduct đã chọn
            </SectionTitle>
            <ReductRules
              dataset={dataset}
              reduct={run.value.result.reducts[selectedReduct] ?? []}
              labels={labels}
            />
          </section>

          <StepPanel steps={run.value.steps} />
        </>
      )}
    </AlgorithmPage>
  )
}

function ReductRules({
  dataset,
  reduct,
  labels,
}: {
  dataset: Dataset
  reduct: string[]
  labels: string[]
}) {
  const rules = useMemo(
    () => rulesFromReduct(dataset, reduct, labels),
    [dataset, reduct, labels],
  )
  const decision = dataset.decisionAttribute ?? 'Quyết định'
  const covered = rules.reduce((s, r) => s + r.support, 0)

  if (reduct.length === 0) {
    return <p className="text-muted-foreground text-sm">Chưa chọn reduct nào.</p>
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1 rounded-md border p-4 font-mono text-xs">
        {rules.length > 0 ? (
          rules.map((r, i) => <p key={i}>{formatReductRule(r, i, decision)}</p>)
        ) : (
          <p className="text-muted-foreground">
            Tập thuộc tính này không rút ra được luật chắc chắn nào.
          </p>
        )}
      </div>
      <p className="text-muted-foreground text-xs">
        {rules.length} luật độ chính xác 100%, phủ {covered}/{labels.length} đối tượng — slide
        trang 40.
      </p>
    </div>
  )
}
