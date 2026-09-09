import { useMemo } from 'react'
import katex from 'katex'
import { cn } from '@/lib/utils'

type Props = {
  /** Chuỗi KaTeX, VD `I(9,5) = -\frac{9}{14}\log_2\frac{9}{14} - \dots = 0.940` */
  formula: string
  /** Hiện trong dòng văn bản thay vì tách thành khối riêng. */
  inline?: boolean
  className?: string
}

/**
 * Render một công thức KaTeX.
 *
 * `throwOnError: false` là chủ ý: 4 người cùng gõ LaTeX bằng tay, một dấu ngoặc
 * thiếu không được phép làm trắng cả trang lúc đang demo trước lớp. Công thức
 * hỏng sẽ hiện đỏ ngay tại chỗ để người viết thấy mà sửa.
 */
export function FormulaLine({ formula, inline = false, className }: Props) {
  const html = useMemo(
    () =>
      katex.renderToString(formula, {
        displayMode: !inline,
        throwOnError: false,
        errorColor: '#ef4444',
        strict: false,
      }),
    [formula, inline],
  )

  if (inline) {
    return (
      <span
        className={cn('katex-inline', className)}
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div
      className={cn('overflow-x-auto py-1 text-[0.95rem]', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
