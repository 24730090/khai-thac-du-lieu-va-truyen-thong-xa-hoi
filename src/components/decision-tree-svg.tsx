import { useMemo } from 'react'
import type { TreeNode } from '@/algorithms/id3'
import { countLeaves } from '@/algorithms/id3'

/**
 * Vẽ cây quyết định bằng SVG tay, theo đúng kiểu hình slide Bài 5 trang 65:
 * nút thuộc tính hộp XANH LÁ chữ trắng, giá trị thuộc tính hộp XÁM nằm trên
 * nhánh, nút lá hộp TRẮNG viền đen, mũi tên có đầu.
 *
 * Không dùng ellipse và không ghi danh sách mẫu dưới lá — slide không làm vậy.
 * Xem docs/format-trinh-bay-cua-GV.md.
 */

const NODE_WIDTH = 116
const NODE_HEIGHT = 34
const LEVEL_GAP = 96
const LEAF_GAP = 28

type Positioned = {
  node: TreeNode
  x: number
  y: number
  /** Nhãn trên cạnh đi vào nút này (giá trị thuộc tính của cha). */
  edgeLabel?: string
  children: Positioned[]
}

/** Xếp chỗ: lá chiếm một cột, nút trong nằm giữa các con của nó. */
function layout(node: TreeNode, depth: number, cursor: { x: number }, edgeLabel?: string): Positioned {
  if (node.kind === 'leaf') {
    const x = cursor.x + NODE_WIDTH / 2
    cursor.x += NODE_WIDTH + LEAF_GAP
    return { node, x, y: depth * LEVEL_GAP, children: [], edgeLabel }
  }

  const children = node.children.map((c) => layout(c.node, depth + 1, cursor, c.value))
  const x = (children[0].x + children[children.length - 1].x) / 2
  return { node, x, y: depth * LEVEL_GAP, children, edgeLabel }
}

function flatten(p: Positioned): Positioned[] {
  return [p, ...p.children.flatMap(flatten)]
}

export function DecisionTreeSvg({ tree, decision }: { tree: TreeNode; decision: string }) {
  const { positioned, width, height } = useMemo(() => {
    const cursor = { x: 0 }
    const root = layout(tree, 0, cursor)
    const all = flatten(root)
    const maxY = Math.max(...all.map((p) => p.y))
    return {
      positioned: root,
      width: Math.max(cursor.x, countLeaves(tree) * (NODE_WIDTH + LEAF_GAP)),
      height: maxY + NODE_HEIGHT + 24,
    }
  }, [tree])

  const nodes = flatten(positioned)

  return (
    <div className="overflow-x-auto rounded-md border p-4">
      <svg
        width={width + 32}
        height={height + 16}
        viewBox={`-16 -8 ${width + 32} ${height + 16}`}
        role="img"
        aria-label={`Cây quyết định dự đoán ${decision}`}
        className="max-w-none"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground/70" />
          </marker>
        </defs>

        {/* Cạnh vẽ trước để nút đè lên trên */}
        {nodes.flatMap((parent) =>
          parent.children.map((child, i) => {
            const x1 = parent.x
            const y1 = parent.y + NODE_HEIGHT
            const x2 = child.x
            const y2 = child.y
            const midX = (x1 + x2) / 2
            const midY = (y1 + y2) / 2
            const labelWidth = Math.max(34, (child.edgeLabel?.length ?? 0) * 6.6 + 12)

            return (
              <g key={`${parent.x}-${parent.y}-${i}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2 - 2}
                  className="stroke-foreground/70"
                  strokeWidth={1.4}
                  markerEnd="url(#arrow)"
                />
                {child.edgeLabel ? (
                  <>
                    <rect
                      x={midX - labelWidth / 2}
                      y={midY - 10}
                      width={labelWidth}
                      height={20}
                      rx={3}
                      className="fill-muted stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      className="fill-foreground text-[11px]"
                    >
                      {child.edgeLabel}
                    </text>
                  </>
                ) : null}
              </g>
            )
          }),
        )}

        {nodes.map((p, i) => {
          const isLeaf = p.node.kind === 'leaf'
          const text =
            p.node.kind === 'leaf'
              ? `${decision} = ${p.node.className}`
              : p.node.attribute
          return (
            <g key={i}>
              <rect
                x={p.x - NODE_WIDTH / 2}
                y={p.y}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={4}
                className={
                  isLeaf
                    ? 'fill-background stroke-foreground'
                    : 'fill-emerald-600 stroke-emerald-700'
                }
                strokeWidth={1.4}
              />
              <text
                x={p.x}
                y={p.y + NODE_HEIGHT / 2 + 4}
                textAnchor="middle"
                className={
                  isLeaf ? 'fill-foreground text-[12px]' : 'fill-white text-[12px] font-medium'
                }
              >
                {text}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
