import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Dataset } from '@/types'
import { formatRule, runId3 } from '@/algorithms/id3'
import { PLAY_BALL_14 } from '@/data/samples'
import { fmtFixed } from '@/lib/format'
import { AlgorithmPage, SectionTitle } from '@/components/algorithm-page'
import { DatasetInput } from '@/components/dataset-input'
import { DecisionTreeSvg } from '@/components/decision-tree-svg'
import { ResultCard } from '@/components/result-card'
import { StepPanel } from '@/components/step-panel'

export const Route = createFileRoute('/id3')({
  component: Page,
})

const SAMPLES: Dataset[] = [PLAY_BALL_14]

function Page() {
  const [dataset, setDataset] = useState<Dataset>(PLAY_BALL_14)

  const run = useMemo(() => {
    try {
      return { ok: true as const, value: runId3(dataset) }
    } catch (err) {
      return { ok: false as const, error: err instanceof Error ? err.message : 'Lỗi không rõ' }
    }
  }, [dataset])

  return (
    <AlgorithmPage
      title="Cây quyết định ID3"
      slide="Bài 5 — trang 38-65"
      summary="Chọn thuộc tính phân nhánh theo độ lợi thông tin Gain(A) = I(p,n) − E(A), đệ quy trên từng bảng con cho tới khi mọi mẫu cùng lớp, rồi đọc cây ra luật IF-THEN."
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

      {!run.ok ? (
        <p className="text-destructive text-sm">{run.error}</p>
      ) : (
        <>
          <ResultCard
            title="Cây quyết định"
            description={`I(p,n) toàn tập = ${fmtFixed(run.value.result.rootInfo)} · gốc cây là "${
              run.value.result.tree.kind === 'internal'
                ? run.value.result.tree.attribute
                : 'lá'
            }"`}
          >
            <DecisionTreeSvg
              tree={run.value.result.tree}
              decision={dataset.decisionAttribute ?? 'Lớp'}
            />
          </ResultCard>

          <section className="space-y-3">
            <SectionTitle>Độ lợi thông tin ở mức gốc</SectionTitle>
            <GainChart gains={run.value.result.rootGains} />
          </section>

          <section className="space-y-3">
            <SectionTitle>Luật IF-THEN</SectionTitle>
            <div className="space-y-1 rounded-md border p-4 font-mono text-xs">
              {run.value.result.rules.map((r, i) => (
                <p key={i}>{formatRule(r, i, dataset.decisionAttribute ?? 'Lớp')}</p>
              ))}
            </div>
          </section>

          <StepPanel steps={run.value.steps} />
        </>
      )}
    </AlgorithmPage>
  )
}

function GainChart({ gains }: { gains: ReturnType<typeof runId3>['result']['rootGains'] }) {
  const data = gains.map((g) => ({ name: g.attribute, gain: Number(g.gain.toFixed(3)) }))
  const max = Math.max(...data.map((d) => d.gain))

  return (
    <div className="h-56 w-full rounded-md border p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
          <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
          <Tooltip
            cursor={{ className: 'fill-muted/40' }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 6,
              background: 'var(--popover)',
              border: '1px solid var(--border)',
              color: 'var(--popover-foreground)',
            }}
            formatter={(v) => [fmtFixed(Number(v)), 'Gain']}
          />
          <Bar dataKey="gain" radius={[4, 4, 0, 0]}>
            {data.map((d) => (
              <Cell
                key={d.name}
                className={d.gain === max ? 'fill-emerald-600' : 'fill-muted-foreground/50'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
