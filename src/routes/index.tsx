import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ALGORITHM_NAV } from '@/lib/nav'
import { ALL_SAMPLES } from '@/data/samples'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Badge variant="outline">IE403 — Khai thác dữ liệu và truyền thông xã hội</Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Web demo các thuật toán khai thác dữ liệu
        </h1>
        <p className="text-muted-foreground text-sm">
          {ALGORITHM_NAV.length} thuật toán · {ALL_SAMPLES.length} bộ dữ liệu mẫu chép từ slide ·{' '}
          <Link to="/gioi-thieu" className="text-primary underline underline-offset-4">
            xem giới thiệu đồ án
          </Link>
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tám thuật toán</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ALGORITHM_NAV.map((item, i) => (
            <Link key={item.to} to={item.to} className="group">
              <Card className="hover:border-ring h-full gap-2 py-4 transition-colors">
                <CardHeader className="px-4">
                  <CardTitle className="flex items-center justify-between gap-2 text-base">
                    <span className="flex items-baseline gap-2">
                      <span className="text-muted-foreground text-xs tabular-nums">{i + 1}.</span>
                      {item.label}
                    </span>
                    <ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </CardTitle>
                  <CardDescription>Slide gốc: {item.slide}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
