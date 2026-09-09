# Web demo các thuật toán khai thác dữ liệu

Đồ án cuối kỳ môn **IE403 — Khai thác dữ liệu và truyền thông xã hội**.
Hướng đã chọn: *cài đặt demo các thuật toán đã học trong môn, có giao diện*.

Tám thuật toán được **cài đặt lại bằng TypeScript thuần** — không gọi thư viện ML — và chạy hoàn
toàn trong trình duyệt. Mỗi thuật toán hiện đủ **bước trung gian** theo đúng khuôn bảng trong slide
thầy, không chỉ kết quả cuối.

- Bản chạy thật: https://khai-thac-du-lieu-va-truyen-thong-x.vercel.app
- Mã nguồn: https://github.com/24730090/khai-thac-du-lieu-va-truyen-thong-xa-hoi

## Thành viên

| Họ và tên | MSSV | % | Phần phụ trách |
|---|---|---:|---|
| Nguyễn Ngọc Danh | 24730090 | 28 | Khung dự án, component dùng chung, dữ liệu mẫu, ID3, trang chủ |
| Nguyễn Thanh Phúc | 24730131 | 25 | Naive Bayes, Đánh giá mô hình, Rough set / Reduct |
| Mai Hoàng Hưng | 24730099 | 24 | k-means, Kohonen SOM |
| Nguyễn Thị Hồng Phúc | 24730132 | 23 | Tiền xử lý dữ liệu, Apriori |

Tổng: **100 %**. Con số này khớp `docs/phan-cong.md`; trang `/gioi-thieu` của app cố tình
không hiện %, vì rubric đòi phần trăm ở **trang phân công trong file báo cáo** chứ không ở app.

## Tám thuật toán

| Đường dẫn | Thuật toán | Slide gốc |
|---|---|---|
| `/tien-xu-ly` | Tiền xử lý: binning, làm trơn, min-max, z-score, xử lý thiếu | Bài 1_2 |
| `/apriori` | Tập phổ biến & luật kết hợp (Apriori, vector biểu diễn) | Bài 2 |
| `/reduct` | Tập thô — ma trận phân biệt, reduct | Bài 3 |
| `/bayes` | Phân lớp Naive Bayes (MAP) | Bài 5.1 |
| `/id3` | Cây quyết định ID3 — Information Gain, luật IF-THEN | Bài 5 |
| `/kmeans` | Gom cụm k-means — ma trận phân hoạch U1 / U2 | Bài 6 |
| `/kohonen` | Mạng Kohonen (SOM) | Bài 8 |
| `/danh-gia` | Confusion Matrix, Accuracy / Precision / Recall / F1 | Bài 7 |

## Chạy trên máy

Cần **Node ≥ 20** và **pnpm**. Cài pnpm: `npm i -g pnpm`.

```bash
pnpm install     # cài phụ thuộc, đồng thời sinh src/routeTree.gen.ts
pnpm dev         # mở http://localhost:5173
```

Lệnh khác:

```bash
pnpm build       # sinh route tree, kiểm kiểu TypeScript, dựng bản production vào dist/
pnpm preview     # xem thử bản production vừa dựng
pnpm test        # chạy Vitest cho lõi thuật toán
```

`src/routeTree.gen.ts` là file **sinh tự động**, không commit. Nếu IDE báo thiếu file này sau khi
clone, chạy `pnpm install` (hoặc `pnpm exec tsr generate`).

## Cấu trúc

```
src/
├── algorithms/<ten>/    # lõi thuật toán — hàm thuần, KHÔNG import React, trả AlgorithmResult<T>
├── routes/              # TanStack Router file-based, mỗi thuật toán một file
├── components/          # component dùng chung (DatasetInput, StepPanel, MatrixTable, …)
├── data/samples/        # dữ liệu mẫu chép đúng từ slide thầy
├── lib/                 # format số, parse CSV, đo khoảng cách
└── types/               # Dataset, Step, AlgorithmResult — hợp đồng dùng chung của cả nhóm
```

Bốn luật của repo (chi tiết ở [CLAUDE.md](CLAUDE.md)):

1. **Không gọi thư viện ML.** Đề đòi *cài đặt* thuật toán.
2. **Mọi thuật toán trả về cả bước trung gian**, qua `AlgorithmResult<T> = { steps, result }`.
3. **Ký pháp bám slide thầy** — `I(pi,ni)`, `E(A)`, `Gain(A)`, `U1`/`U2`; dấu thập phân là dấu
   **chấm** (`0.940`). Dùng `fmt()` trong `src/lib/format.ts`, đừng tự `toLocaleString`.
4. **Lõi thuật toán không import React** — test được bằng Vitest mà không cần render. Mỗi thuật
   toán phải có ít nhất một test so kết quả với ví dụ trong slide.

## Công nghệ

React 19 · TypeScript · Vite · TanStack Router · Tailwind CSS v4 · shadcn/ui · Recharts · KaTeX ·
TanStack Table · Vitest · pnpm. Triển khai **Vercel**, static, không backend.

## Quy ước làm việc

- Mỗi feature một nhánh `feat/<mã>-<tên>` (VD `feat/f9-kmeans`), merge vào `main` bằng PR.
- Commit message có prefix `feat:` / `fix:` / `refactor:`.
- Mỗi người commit bằng tài khoản GitHub của chính mình.
- Chỉ sửa file thuộc phần việc của mình. Cần đổi component trong `src/components/` thì báo Danh.
