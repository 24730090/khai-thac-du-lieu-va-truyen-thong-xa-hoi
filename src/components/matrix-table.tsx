import type { StepTable } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  table: StepTable
  /**
   * Tô nền ô thoả điều kiện. Dùng cho ma trận phân hoạch `U1`/`U2` (làm nổi ô
   * bằng 1), bảng khoảng cách (làm nổi cụm gần nhất), bảng Gain (làm nổi thuộc
   * tính thắng).
   */
  highlight?: (value: string | number, rowIndex: number, colIndex: number) => boolean
  /** Bỏ khung caption khi bảng đã nằm trong khối có tiêu đề riêng. */
  hideCaption?: boolean
  className?: string
}

/**
 * Bảng dựng từ `StepTable` — dùng chung cho mọi bảng bước trung gian của 8
 * thuật toán, nên trông giống hệt nhau ở cả 8 route (yêu cầu của GV:
 * "tinh chỉnh cho đều chữ, mục nào ra mục đó").
 */
export function MatrixTable({ table, highlight, hideCaption, className }: Props) {
  return (
    <figure className={cn('space-y-1.5', className)}>
      {!hideCaption && table.caption ? (
        <figcaption className="text-muted-foreground text-xs font-medium">
          {table.caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60">
              {table.head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-b px-3 py-2 text-left font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.body.map((row, r) => (
              <tr key={r} className="last:*:border-b-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={cn(
                      'border-b px-3 py-1.5 whitespace-nowrap',
                      c === 0 && 'font-medium',
                      highlight?.(cell, r, c) && 'bg-primary/15 font-semibold',
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
