import type { LinkProps } from '@tanstack/react-router'

export type NavItem = {
  to: LinkProps['to']
  label: string
  /** Slide gốc trong tài liệu môn — hiện ở sidebar để đối chiếu khi kiểm chéo. */
  slide: string
  /** Người sở hữu route, theo docs/phan-cong.md. */
  owner: string
}

/**
 * 8 mục thuật toán, ĐÚNG thứ tự dạy trong môn IE403.
 * Nguồn: docs/F1-khung-du-an.md § Việc phải làm mục 4.
 *
 * Sidebar dựng từ mảng này, nên thêm route mới thì thêm ở đây — không sửa
 * `__root.tsx`. Bớt được một chỗ đụng độ giữa 4 người.
 */
export const ALGORITHM_NAV: NavItem[] = [
  { to: '/tien-xu-ly', label: 'Tiền xử lý dữ liệu', slide: 'Bài 1_2', owner: 'H. Phúc' },
  { to: '/apriori', label: 'Tập phổ biến & luật kết hợp', slide: 'Bài 2', owner: 'H. Phúc' },
  { to: '/reduct', label: 'Tập thô — Reduct', slide: 'Bài 3', owner: 'T. Phúc' },
  { to: '/bayes', label: 'Phân lớp Naive Bayes', slide: 'Bài 5.1', owner: 'T. Phúc' },
  { to: '/id3', label: 'Cây quyết định ID3', slide: 'Bài 5', owner: 'Danh' },
  { to: '/kmeans', label: 'Gom cụm k-means', slide: 'Bài 6', owner: 'Hưng' },
  { to: '/kohonen', label: 'Mạng Kohonen (SOM)', slide: 'Bài 8', owner: 'Hưng' },
  { to: '/danh-gia', label: 'Đánh giá mô hình phân lớp', slide: 'Bài 7', owner: 'T. Phúc' },
]

export const GENERAL_NAV: NavItem[] = [
  { to: '/', label: 'Trang chủ', slide: '—', owner: 'Danh' },
  { to: '/gioi-thieu', label: 'Giới thiệu đồ án', slide: '—', owner: 'Danh' },
]
