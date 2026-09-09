import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { ALGORITHM_NAV, GENERAL_NAV } from '@/lib/nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const linkClass =
  'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'
const activeProps = { className: 'bg-accent text-accent-foreground font-medium' }

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <div>
        <Link to="/" onClick={onNavigate} className="block">
          <p className="text-sm font-semibold">Khai thác dữ liệu</p>
          <p className="text-muted-foreground text-xs">IE403 — Demo thuật toán</p>
        </Link>
      </div>

      <div className="space-y-1">
        {GENERAL_NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={linkClass}
            activeProps={activeProps}
            activeOptions={{ exact: item.to === '/' }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-muted-foreground px-3 pb-1 text-xs font-medium tracking-wide uppercase">
          Thuật toán
        </p>
        {ALGORITHM_NAV.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(linkClass, 'flex items-baseline gap-2')}
            activeProps={activeProps}
          >
            <span className="text-muted-foreground w-4 shrink-0 text-xs tabular-nums">
              {i + 1}.
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

function RootLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-background min-h-screen">
      {/* Thanh trên — chỉ hiện trên màn hình hẹp, để mở sidebar */}
      <header className="bg-background/95 sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 backdrop-blur md:hidden">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Mở danh sách thuật toán"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
        <span className="text-sm font-semibold">IE403 — Demo thuật toán</span>
        <ThemeToggle />
      </header>

      <div className="md:flex">
        <aside
          className={cn(
            'bg-card w-full border-b md:sticky md:top-0 md:h-screen md:w-72 md:shrink-0 md:border-r md:border-b-0',
            open ? 'block' : 'hidden md:block',
          )}
        >
          <Sidebar onNavigate={() => setOpen(false)} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="hidden justify-end px-6 pt-4 md:flex">
            <ThemeToggle />
          </div>
          <main className="mx-auto max-w-5xl px-6 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">404 — Không có trang này</h1>
      <p className="text-muted-foreground text-sm">
        Đường dẫn không khớp route nào. Chọn một mục ở thanh bên trái.
      </p>
      <Link to="/" className="text-primary text-sm underline underline-offset-4">
        Về trang chủ
      </Link>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
