import { useEffect, useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import {
  confusionFromDataset,
  runEvaluation,
  type ConfusionMatrix,
} from '@/algorithms/evaluation'
import { HUYET_AP_100 } from '@/data/samples'
import { distinctValues } from '@/lib/csv'
import { fmtFixed, fmtPercent } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/danh-gia')({
  component: Page,
})

const SAMPLES: Dataset[] = [HUYET_AP_100]

function Page() {
  const [source, setSource] = useState<'dataset' | 'manual'>('dataset')
  const [dataset, setDataset] = useState<Dataset>(HUYET_AP_100)
  const [manual, setManual] = useState<ConfusionMatrix>({ tp: 25, fn: 15, fp: 10, tn: 50 })

  // Phải memo: mảng này nằm trong dependency của useEffect bên dưới, tạo mới
  // mỗi lần render thì effect chạy lại ở MỌI lần render.
  const nominalAttributes = useMemo(
    () => dataset.attributes.filter((a) => a.type === 'nominal'),
    [dataset],
  )
  const [actualAttr, setActualAttr] = useState('Thực tế')
  const [predictedAttr, setPredictedAttr] = useState('Dự đoán')
  const [positiveLabel, setPositiveLabel] = useState('Cao')

  // Đổi bộ dữ liệu thì các cột đã chọn có thể không còn.
  useEffect(() => {
    const names = nominalAttributes.map((a) => a.name)
    if (!names.includes(actualAttr)) setActualAttr(names[0] ?? '')
    if (!names.includes(predictedAttr)) setPredictedAttr(names[1] ?? names[0] ?? '')
  }, [nominalAttributes, actualAttr, predictedAttr])

  const labels = useMemo(
    () => (actualAttr ? distinctValues(dataset, actualAttr) : []),
    [dataset, actualAttr],
  )

  useEffect(() => {
    if (labels.length > 0 && !labels.includes(positiveLabel)) setPositiveLabel(labels[0])
  }, [labels, positiveLabel])

  const matrix = useMemo(() => {
    if (source === 'manual') return manual
    if (!actualAttr || !predictedAttr) return { tp: 0, fn: 0, fp: 0, tn: 0 }
    return confusionFromDataset(dataset, actualAttr, predictedAttr, positiveLabel)
  }, [source, manual, dataset, actualAttr, predictedAttr, positiveLabel])

  const negativeLabel = labels.find((l) => l !== positiveLabel) ?? 'Âm'

  const run = useMemo(
    () =>
      runEvaluation(matrix, {
        positiveLabel: source === 'manual' ? 'Dương' : positiveLabel,
        negativeLabel: source === 'manual' ? 'Âm' : negativeLabel,
      }),
    [matrix, source, positiveLabel, negativeLabel],
  )

  const { metrics } = run.result

  return (
    <AlgorithmPage
      title="Đánh giá mô hình phân lớp"
      slide="Bài 7 — trang 6-16"
      summary="Dựng ma trận nhầm lẫn 2×2 từ kết quả dự đoán rồi tính Accuracy, Precision, Recall và F1-score, kèm nhận xét về chuyện bỏ sót hay báo động nhầm."
    >
      <Tabs value={source} onValueChange={(v) => setSource(v as 'dataset' | 'manual')}>
        <TabsList>
          <TabsTrigger value="dataset">Từ bảng kết quả dự đoán</TabsTrigger>
          <TabsTrigger value="manual">Nhập thẳng TP/FN/FP/TN</TabsTrigger>
        </TabsList>

        <TabsContent value="dataset" className="space-y-3">
          <SectionTitle>Bảng kết quả dự đoán</SectionTitle>
          <DatasetInput samples={SAMPLES} value={dataset} onChange={setDataset} />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="actual">Cột nhãn thực tế</Label>
              <Select
                id="actual"
                value={actualAttr}
                onChange={(e) => setActualAttr(e.target.value)}
              >
                {nominalAttributes.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="predicted">Cột nhãn dự đoán</Label>
              <Select
                id="predicted"
                value={predictedAttr}
                onChange={(e) => setPredictedAttr(e.target.value)}
              >
                {nominalAttributes.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="positive">Lớp coi là dương</Label>
              <Select
                id="positive"
                value={positiveLabel}
                onChange={(e) => setPositiveLabel(e.target.value)}
              >
                {labels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            Đổi lớp dương thì Precision và Recall đổi theo, còn Accuracy giữ nguyên — thử để thấy.
          </p>
        </TabsContent>

        <TabsContent value="manual" className="space-y-3">
          <SectionTitle>Bốn ô của ma trận nhầm lẫn</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-4">
            {(
              [
                ['tp', 'TP — dương tính thật'],
                ['fn', 'FN — âm tính giả'],
                ['fp', 'FP — dương tính giả'],
                ['tn', 'TN — âm tính thật'],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  type="number"
                  min={0}
                  value={manual[key]}
                  onChange={(e) =>
                    setManual((m) => ({ ...m, [key]: Math.max(0, Number(e.target.value)) }))
                  }
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ResultCard title="Bốn chỉ số" description={`Tổng ${metrics.total} ca`}>
        <div className="grid gap-3 sm:grid-cols-4">
          <Metric label="Accuracy" value={metrics.accuracy} hint={fmtPercent(metrics.accuracy)} />
          <Metric
            label="Precision"
            value={metrics.precision}
            hint={`${matrix.tp}/${matrix.tp + matrix.fp}`}
          />
          <Metric
            label="Recall"
            value={metrics.recall}
            hint={`${matrix.tp}/${matrix.tp + matrix.fn}`}
          />
          <Metric label="F1-score" value={metrics.f1} hint="cân bằng P và R" />
        </div>
      </ResultCard>

      <StepPanel steps={run.steps} />
    </AlgorithmPage>
  )
}

function Metric({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <Card className="gap-1 py-4">
      <CardContent className="space-y-0.5 px-4">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{fmtFixed(value)}</p>
        <p className="text-muted-foreground text-xs">{hint}</p>
      </CardContent>
    </Card>
  )
}
