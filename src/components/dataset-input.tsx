import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, Check, Database, Table2, Trash2 } from 'lucide-react'
import type { Attribute, Dataset } from '@/types'
import { CsvParseError, datasetToCsv, parseCsv } from '@/lib/csv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Props = {
  /** Bộ dữ liệu mẫu chép từ slide. Mục đầu tiên được chọn sẵn. */
  samples: Dataset[]
  value: Dataset
  onChange: (dataset: Dataset) => void
  /** Cho người dùng đổi cột nhãn lớp — ID3 / Bayes / Reduct cần, k-means không. */
  allowDecisionAttribute?: boolean
  className?: string
}

function TypeBadge({ attribute }: { attribute: Attribute }) {
  return (
    <span
      className={cn(
        'rounded px-1.5 py-0.5 text-[10px] font-medium',
        attribute.type === 'numeric'
          ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
      )}
    >
      {attribute.type === 'numeric' ? 'số' : 'danh mục'}
    </span>
  )
}

/**
 * Ba cách nạp dữ liệu vào một route: chọn bộ mẫu chép từ slide, dán CSV, hoặc
 * sửa tay từng ô.
 *
 * Bộ mẫu là đường mặc định — mở route ra là có sẵn đúng dữ liệu trong slide để
 * đối chiếu từng số. Hai cách kia để chấm được ý "nhập dữ liệu tuỳ ý".
 */
export function DatasetInput({
  samples,
  value,
  onChange,
  allowDecisionAttribute = false,
  className,
}: Props) {
  const [csvText, setCsvText] = useState(() => datasetToCsv(value))
  const [csvError, setCsvError] = useState<string | null>(null)
  const [csvApplied, setCsvApplied] = useState(false)

  // Đổi bộ mẫu ở tab khác thì ô CSV phải theo, nếu không người dùng dán đè lên
  // dữ liệu cũ mà không biết.
  useEffect(() => {
    setCsvText(datasetToCsv(value))
    setCsvError(null)
    setCsvApplied(false)
  }, [value])

  const sampleIndex = useMemo(
    () => samples.findIndex((s) => s.name === value.name),
    [samples, value.name],
  )

  function applyCsv() {
    try {
      const parsed = parseCsv(csvText, {
        name: 'Dữ liệu đã dán',
        decisionAttribute: allowDecisionAttribute ? value.decisionAttribute : undefined,
      })
      setCsvError(null)
      setCsvApplied(true)
      onChange(parsed)
    } catch (err) {
      setCsvApplied(false)
      setCsvError(err instanceof CsvParseError ? err.message : 'Không đọc được dữ liệu CSV.')
    }
  }

  function updateCell(rowIndex: number, attrName: string, raw: string) {
    const attr = value.attributes.find((a) => a.name === attrName)
    const rows = value.rows.map((r, i) =>
      i === rowIndex ? { ...r, [attrName]: attr?.type === 'numeric' ? Number(raw) : raw } : r,
    )
    onChange({ ...value, rows })
  }

  function addRow() {
    const blank = Object.fromEntries(
      value.attributes.map((a) => [a.name, a.type === 'numeric' ? 0 : '']),
    )
    onChange({ ...value, rows: [...value.rows, blank] })
  }

  function removeRow(rowIndex: number) {
    onChange({ ...value, rows: value.rows.filter((_, i) => i !== rowIndex) })
  }

  return (
    <div className={cn('space-y-3', className)}>
      <Tabs defaultValue="sample">
        <TabsList>
          <TabsTrigger value="sample">
            <Database /> Bộ dữ liệu mẫu
          </TabsTrigger>
          <TabsTrigger value="csv">Dán CSV</TabsTrigger>
          <TabsTrigger value="manual">
            <Table2 /> Nhập tay
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sample" className="space-y-2">
          <Label htmlFor="dataset-sample">Chọn bộ dữ liệu chép từ slide</Label>
          <Select
            id="dataset-sample"
            value={sampleIndex >= 0 ? String(sampleIndex) : ''}
            onChange={(e) => {
              const next = samples[Number(e.target.value)]
              if (next) onChange(next)
            }}
          >
            {sampleIndex < 0 ? <option value="">— dữ liệu tự nhập —</option> : null}
            {samples.map((s, i) => (
              <option key={s.name} value={i}>
                {s.name}
              </option>
            ))}
          </Select>
        </TabsContent>

        <TabsContent value="csv" className="space-y-2">
          <Label htmlFor="dataset-csv">
            Dán CSV — dòng đầu là tên cột, phân cách bằng dấu phẩy
          </Label>
          <Textarea
            id="dataset-csv"
            value={csvText}
            spellCheck={false}
            className="font-mono text-xs"
            onChange={(e) => {
              setCsvText(e.target.value)
              setCsvApplied(false)
            }}
          />
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={applyCsv}>
              Nạp dữ liệu
            </Button>
            {csvError ? (
              <span className="text-destructive flex items-center gap-1.5 text-sm">
                <AlertCircle className="size-4" /> {csvError}
              </span>
            ) : null}
            {csvApplied ? (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                <Check className="size-4" /> Đã nạp
              </span>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-2">
          <div className="max-h-96 overflow-auto rounded-md border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted/60 sticky top-0">
                <tr>
                  {value.attributes.map((a) => (
                    <th key={a.name} className="border-b px-2 py-2 text-left font-medium">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        {a.name} <TypeBadge attribute={a} />
                      </span>
                    </th>
                  ))}
                  <th className="w-10 border-b px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {value.rows.map((row, r) => (
                  <tr key={r}>
                    {value.attributes.map((a) => (
                      <td key={a.name} className="border-b p-1">
                        <Input
                          className="h-8 border-transparent shadow-none"
                          value={String(row[a.name] ?? '')}
                          inputMode={a.type === 'numeric' ? 'decimal' : 'text'}
                          onChange={(e) => updateCell(r, a.name, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="border-b p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={'Xoá dòng ' + (r + 1)}
                        onClick={() => removeRow(r)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="outline" size="sm" onClick={addRow}>
            Thêm dòng
          </Button>
        </TabsContent>
      </Tabs>

      <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <span>
          <span className="text-foreground font-medium">{value.rows.length}</span> dòng ·{' '}
          <span className="text-foreground font-medium">{value.attributes.length}</span> thuộc tính
        </span>
        {allowDecisionAttribute ? (
          <span className="flex items-center gap-2">
            <Label htmlFor="decision-attr" className="text-xs font-normal">
              Cột nhãn lớp
            </Label>
            <Select
              id="decision-attr"
              className="h-7 w-auto text-xs"
              value={value.decisionAttribute ?? ''}
              onChange={(e) => onChange({ ...value, decisionAttribute: e.target.value })}
            >
              {value.attributes.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </Select>
          </span>
        ) : null}
      </div>
    </div>
  )
}
