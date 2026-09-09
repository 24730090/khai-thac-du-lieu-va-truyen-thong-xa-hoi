import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import {
  BIN_METHOD_LABEL,
  MISSING_STRATEGY_LABEL,
  NORMALIZE_METHOD_LABEL,
  SMOOTH_METHOD_LABEL,
  runBinning,
  runMissingValues,
  runNormalize,
  type BinMethod,
  type MissingStrategy,
  type NormalizeMethod,
  type SmoothMethod,
} from '@/algorithms/preprocess'
import { PRICE_9, TIEN_XU_LY_HON_HOP } from '@/data/samples'
import { numericColumn } from '@/lib/csv'
import { fmt } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/tien-xu-ly')({
  component: Page,
})

const SAMPLES: Dataset[] = [PRICE_9, TIEN_XU_LY_HON_HOP]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(PRICE_9)

  const numericAttributes = dataset.attributes.filter((a) => a.type === 'numeric')
  const [column, setColumn] = useState<string>(numericAttributes.at(-1)?.name ?? '')

  // Đổi bộ dữ liệu thì cột đang chọn có thể không còn tồn tại.
  const activeColumn = numericAttributes.some((a) => a.name === column)
    ? column
    : (numericAttributes.at(-1)?.name ?? '')

  const values = useMemo(
    () => (activeColumn ? numericColumn(dataset, activeColumn) : []),
    [dataset, activeColumn],
  )

  return (
    <AlgorithmPage
      title="Tiền xử lý dữ liệu"
      slide="Bài 1_2 — trang 15-37"
      summary="Chia bin và làm trơn để giảm nhiễu, chuẩn hoá min-max và z-score đưa các thuộc tính về cùng thang đo, và xử lý giá trị thiếu."
    >
      <section className="space-y-3">
        <SectionTitle>Dữ liệu vào</SectionTitle>
        <DatasetInput samples={SAMPLES} value={dataset} onChange={setDataset} />
        {numericAttributes.length > 0 ? (
          <div className="flex items-center gap-2">
            <Label htmlFor="column" className="shrink-0 text-xs font-normal">
              Cột số đang xử lý
            </Label>
            <Select
              id="column"
              className="h-8 w-auto text-xs"
              value={activeColumn}
              onChange={(e) => setColumn(e.target.value)}
            >
              {numericAttributes.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>
        ) : (
          <p className="text-destructive text-sm">Bảng chưa có cột số nào để xử lý.</p>
        )}
      </section>

      <Tabs defaultValue="binning">
        <TabsList>
          <TabsTrigger value="binning">Chia bin &amp; làm trơn</TabsTrigger>
          <TabsTrigger value="normalize">Chuẩn hoá</TabsTrigger>
          <TabsTrigger value="missing">Giá trị thiếu</TabsTrigger>
        </TabsList>

        <TabsContent value="binning">
          <BinningTab values={values} column={activeColumn} />
        </TabsContent>
        <TabsContent value="normalize">
          <NormalizeTab values={values} column={activeColumn} />
        </TabsContent>
        <TabsContent value="missing">
          <MissingTab dataset={dataset} />
        </TabsContent>
      </Tabs>
    </AlgorithmPage>
  )
}

function BinningTab({ values, column }: { values: number[]; column: string }) {
  const [binCount, setBinCount] = useState(3)
  const [binMethod, setBinMethod] = useState<BinMethod>('equal-frequency')
  const [smoothMethod, setSmoothMethod] = useState<SmoothMethod>('means')

  const run = useMemo(() => {
    if (values.length === 0) return null
    try {
      return runBinning(values, Math.max(1, binCount), binMethod, smoothMethod)
    } catch {
      return null
    }
  }, [values, binCount, binMethod, smoothMethod])

  if (!run) return <p className="text-muted-foreground text-sm">Chưa có dữ liệu số để chia bin.</p>

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="bin-count">Số bin</Label>
          <Input
            id="bin-count"
            type="number"
            min={1}
            max={Math.max(1, values.length)}
            value={binCount}
            onChange={(e) => setBinCount(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bin-method">Cách chia</Label>
          <Select
            id="bin-method"
            value={binMethod}
            onChange={(e) => setBinMethod(e.target.value as BinMethod)}
          >
            {Object.entries(BIN_METHOD_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="smooth-method">Cách làm trơn</Label>
          <Select
            id="smooth-method"
            value={smoothMethod}
            onChange={(e) => setSmoothMethod(e.target.value as SmoothMethod)}
          >
            {Object.entries(SMOOTH_METHOD_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <ResultCard
        title={`Cột "${column}" sau khi làm trơn`}
        description={`${run.result.bins.length} bin, ${run.result.sorted.length} giá trị`}
      >
        <div className="space-y-1.5">
          {run.result.bins.map((b) => (
            <p key={b.index} className="font-mono text-xs">
              <span className="text-muted-foreground">Bin{b.index}</span> ={' '}
              {`{${b.values.map((v) => fmt(v)).join(', ')}}`} →{' '}
              <span className="font-semibold">{`{${b.smoothed.map((v) => fmt(v)).join(', ')}}`}</span>
            </p>
          ))}
        </div>
      </ResultCard>

      <StepPanel steps={run.steps} />
    </div>
  )
}

function NormalizeTab({ values, column }: { values: number[]; column: string }) {
  const [method, setMethod] = useState<NormalizeMethod>('min-max')
  const [newMin, setNewMin] = useState(0)
  const [newMax, setNewMax] = useState(1)

  const run = useMemo(() => {
    if (values.length === 0) return null
    try {
      return runNormalize(values, method, { newMin, newMax })
    } catch {
      return null
    }
  }, [values, method, newMin, newMax])

  if (!run) return <p className="text-muted-foreground text-sm">Chưa có dữ liệu số để chuẩn hoá.</p>

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5 sm:col-span-3">
          <Label htmlFor="norm-method">Phương pháp</Label>
          <Select
            id="norm-method"
            value={method}
            onChange={(e) => setMethod(e.target.value as NormalizeMethod)}
          >
            {Object.entries(NORMALIZE_METHOD_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        </div>
        {method === 'min-max' ? (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="new-min">new_min</Label>
              <Input
                id="new-min"
                type="number"
                value={newMin}
                onChange={(e) => setNewMin(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-max">new_max</Label>
              <Input
                id="new-max"
                type="number"
                value={newMax}
                onChange={(e) => setNewMax(Number(e.target.value))}
              />
            </div>
          </>
        ) : null}
      </div>

      <ResultCard
        title={`Cột "${column}" sau chuẩn hoá`}
        description={Object.entries(run.result.stats)
          .map(([k, v]) => `${k} = ${fmt(v)}`)
          .join(' · ')}
      >
        <p className="font-mono text-xs break-all">
          {run.result.normalized.map((v) => fmt(v)).join(', ')}
        </p>
      </ResultCard>

      <StepPanel steps={run.steps} />
    </div>
  )
}

function MissingTab({ dataset }: { dataset: Dataset }) {
  const [strategy, setStrategy] = useState<MissingStrategy>('fill-mean')

  const run = useMemo(() => {
    try {
      return runMissingValues(dataset, strategy)
    } catch {
      return null
    }
  }, [dataset, strategy])

  if (!run) return <p className="text-muted-foreground text-sm">Không xử lý được bảng này.</p>

  const totalMissing = Object.values(run.result.missingByAttribute).reduce((s, n) => s + n, 0)

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="missing-strategy">Cách xử lý</Label>
        <Select
          id="missing-strategy"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value as MissingStrategy)}
        >
          {Object.entries(MISSING_STRATEGY_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </Select>
      </div>

      <ResultCard title="Kết quả xử lý">
        {totalMissing === 0 ? (
          <p>Bảng này không có ô trống nào. Thử bộ mẫu “Bảng hỗn hợp có ô trống”.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1">
            <li>
              Tìm thấy <span className="font-semibold">{totalMissing}</span> ô trống.
            </li>
            {run.result.removedRows > 0 ? (
              <li>
                Đã bỏ <span className="font-semibold">{run.result.removedRows}</span> dòng.
              </li>
            ) : null}
            {run.result.filled.length > 0 ? (
              <li>
                Đã điền <span className="font-semibold">{run.result.filled.length}</span> ô.
              </li>
            ) : null}
            <li>
              Còn lại <span className="font-semibold">{run.result.dataset.rows.length}</span> dòng.
            </li>
          </ul>
        )}
      </ResultCard>

      <StepPanel steps={run.steps} />
    </div>
  )
}
