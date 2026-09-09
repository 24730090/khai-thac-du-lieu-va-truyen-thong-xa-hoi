import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Dataset } from '@/types'
import { formatRule, runApriori, toMiningContext } from '@/algorithms/apriori'
import { GIO_HANG_5, GIO_HANG_SIEU_THI } from '@/data/samples'
import { fmtFixed } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { MatrixTable } from '@/components/matrix-table'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/apriori')({
  component: Page,
})

const SAMPLES: Dataset[] = [GIO_HANG_5, GIO_HANG_SIEU_THI]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(GIO_HANG_5)
  const [minSupport, setMinSupport] = useState(0.4)
  const [minConfidence, setMinConfidence] = useState(0.67)
  const [method, setMethod] = useState<'classic' | 'vector'>('classic')

  const run = useMemo(() => {
    try {
      return { ok: true as const, value: runApriori(dataset, { minSupport, minConfidence, method }) }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset, minSupport, minConfidence, method])

  return (
    <AlgorithmPage
      title="Tập phổ biến & luật kết hợp"
      slide="Bài 2 — trang 7-35"
      summary="Apriori tìm tập phổ biến qua bước kết hợp và bước rút gọn, rồi sinh luật kết hợp theo ngưỡng confidence. Tab thứ hai làm cùng việc đó bằng vector biểu diễn và tích ⊗."
    >
      <section className="space-y-3">
        <SectionTitle>Ngữ cảnh khai thác dữ liệu</SectionTitle>
        <p className="text-muted-foreground text-sm">
          Cột đầu là mã hoá đơn, mỗi cột còn lại là một mặt hàng — ô khác 0 nghĩa là hoá đơn có
          mặt hàng đó.
        </p>
        <DatasetInput samples={SAMPLES} value={dataset} onChange={setDataset} />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="minsupp">minsupp — ngưỡng độ phổ biến</Label>
            <Input
              id="minsupp"
              type="number"
              step={0.05}
              min={0}
              max={1}
              value={minSupport}
              onChange={(e) => setMinSupport(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="minconf">minconf — ngưỡng độ tin cậy</Label>
            <Input
              id="minconf"
              type="number"
              step={0.05}
              min={0}
              max={1}
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      {!run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <Tabs
          value={method}
          onValueChange={(v) => setMethod(v as 'classic' | 'vector')}
        >
          <TabsList>
            <TabsTrigger value="classic">Apriori</TabsTrigger>
            <TabsTrigger value="vector">Vector biểu diễn</TabsTrigger>
          </TabsList>

          <TabsContent value="classic" className="space-y-6">
            <Summary run={run.value} />
            <StepPanel steps={run.value.steps} />
          </TabsContent>

          <TabsContent value="vector" className="space-y-6">
            <VectorIntro dataset={dataset} />
            <Summary run={run.value} />
            <StepPanel steps={run.value.steps} />
          </TabsContent>
        </Tabs>
      )}
    </AlgorithmPage>
  )
}

function Summary({ run }: { run: ReturnType<typeof runApriori> }) {
  const { frequentItemsets, maximalItemsets, rules } = run.result
  const label = (items: string[]) => `{${items.join(',')}}`

  return (
    <ResultCard
      title="Kết quả"
      description={`${frequentItemsets.length} tập phổ biến · ${maximalItemsets.length} tập tối đại · ${rules.length} luật`}
    >
      <div className="space-y-3">
        <div>
          <p className="mb-1 font-medium">Tập phổ biến tối đại</p>
          <div className="flex flex-wrap gap-1.5">
            {maximalItemsets.length > 0 ? (
              maximalItemsets.map((m) => (
                <Badge key={label(m.items)} variant="secondary">
                  {label(m.items)}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Không có — hạ minsupp xuống.</span>
            )}
          </div>
        </div>

        <div>
          <p className="mb-1 font-medium">Luật kết hợp thoả minconf</p>
          {rules.length > 0 ? (
            <div className="space-y-0.5 font-mono text-xs">
              {rules.map((r, i) => (
                <p key={`${label(r.antecedent)}-${label(r.consequent)}`}>{formatRule(r, i)}</p>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Không luật nào đạt ngưỡng — hạ minconf xuống.</p>
          )}
        </div>
      </div>
    </ResultCard>
  )
}

/** Ma trận nhị phân và vector từng mặt hàng — slide trang 12 và 30. */
function VectorIntro({ dataset }: { dataset: Dataset }) {
  const context = useMemo(() => {
    try {
      return toMiningContext(dataset)
    } catch {
      return null
    }
  }, [dataset])

  if (!context) return null

  return (
    <div className="space-y-3">
      <MatrixTable
        table={{
          caption: 'Vector biểu diễn từng mặt hàng đơn lẻ — v(S) và SPV(v(S))',
          head: ['S', 'v(S)', 'SPV(v(S))'],
          body: context.items.map((item) => {
            const vector = context.matrix.map((row) => row[context.items.indexOf(item)])
            const support = vector.filter((v) => v === 1).length / vector.length
            return [`{${item}}`, `(${vector.join(',')})`, fmtFixed(support, 2)]
          }),
        }}
        highlight={(_, __, c) => c === 2}
      />
      <p className="text-muted-foreground text-sm">
        Tích ⊗ lấy min từng thành phần: v(S ∪ T) = v(S) ⊗ v(T). Độ phổ biến là tỉ số thành phần
        khác 0, nên đọc thẳng ra từ vector mà không phải quét lại bảng hoá đơn.
      </p>
    </div>
  )
}
