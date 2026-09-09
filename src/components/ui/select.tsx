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
function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <div className="relative inline-flex w-full">
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
