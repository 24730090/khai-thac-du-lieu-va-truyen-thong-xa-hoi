import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Select dựng trên `<select>` gốc của trình duyệt, không dùng Radix.
 *
 * Lý do: chỗ nào cũng chỉ cần chọn một giá trị từ danh sách ngắn (bộ dữ liệu
 * mẫu, tên cột, kiểu chuẩn hoá). `<select>` gốc chạy đúng trên mọi máy, dùng
 * được bằng bàn phím sẵn, và không thêm một lớp state nào để hỏng lúc demo.
 */
type SelectProps = React.ComponentProps<'select'> & {
  /**
   * Class cho khung ngoài — dùng để đặt BỀ RỘNG của cả điều khiển.
   *
   * Mũi tên chevron định vị theo khung ngoài này, nên chỉ đặt `w-auto` cho
   * riêng thẻ `<select>` sẽ làm mũi tên rời hẳn khỏi ô, dạt ra mép phải. Muốn
   * select gọn thì đặt `containerClassName="w-auto"`.
   */
  containerClassName?: string
}

function Select({ className, containerClassName, children, ...props }: SelectProps) {
  return (
    <div className={cn('relative inline-flex w-full min-w-0', containerClassName)}>
      <select
        data-slot="select"
        className={cn(
          'border-input bg-background h-9 w-full appearance-none rounded-md border py-1 pr-8 pl-3 text-sm shadow-xs transition-[color,box-shadow] outline-none',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
    </div>
  )
}

export { Select }
