# Code project outline — Web demo các thuật toán khai thác dữ liệu (IE403)

> Brief: `do-an/brief.md` | Rubric: `do-an/rubric.md`
> Hạn nộp: **2026-10-01** (ngày thi tập trung HK hè, biên sớm của khoảng user xác nhận) — còn **22 ngày** tính từ 2026-09-09
> Hướng đã chọn: **hướng 2 — cài đặt demo các thuật toán đã học trong môn, có giao diện**

Tên đề tài đề xuất cho bìa (user chốt lại ở `brief.md § Ô trống`):
**"Xây dựng ứng dụng web trực quan hoá các thuật toán khai thác dữ liệu"**

## Vị trí source code — ĐỌC TRƯỚC KHI LÀM BẤT CỨ GÌ

Source code **không nằm trong repo `doan`**. Theo yêu cầu của user, project được tạo **ngang cấp**
repo `doan` và push sang một repo GitHub riêng:

```
C:\Users\ngocdanh\Documents\me\
├── doan\                                    ← repo học tập (repo này)
│   └── khai-thac-du-lieu-va-truyen-thong-xa-hoi\
│       └── do-an\                           ← chỉ artifact: brief, rubric, outline, báo cáo, slide, video
└── ktdl-demo\                               ← repo RIÊNG, source code app, push GitHub, deploy Vercel
```

- Repo GitHub: `<<URL REPO GITHUB — user cấp sau>>`
- URL Vercel: `<<URL VERCEL — sinh ở F1>>`
- **Không commit source app vào repo `doan`.** Chỉ commit bằng chứng triển khai
  (`do-an/chuong-trinh/thong-tin-trien-khai.md`: URL, commit hash, ảnh chụp màn hình).

Hệ quả với `.gitignore`: nếu vì lý do nào đó project bị tạo nhầm trong `doan/`, xoá và tạo lại
đúng chỗ — đừng để hai bản.

## Architecture

- **Client-side hoàn toàn.** Không backend, không database, không API. Mọi thuật toán chạy trong
  trình duyệt bằng TypeScript thuần. Lý do: deploy Vercel thành static, không tốn hạn mức
  serverless, không có gì chết vào ngày nộp, và mỗi thành viên chạy được ngay sau `pnpm dev`.
- `src/algorithms/<ten>/` — lõi thuật toán, hàm thuần, **không import React**. Mỗi hàm trả về
  không chỉ kết quả cuối mà cả **mảng bước trung gian** (`steps[]`) để giao diện dựng lại được
  từng bảng đúng khuôn slide thầy.
- `src/routes/` — TanStack Router file-based routing, **mỗi thuật toán một file route**. Đây là
  ranh giới chia việc: 4 người sửa 4 file khác nhau, git không xung đột.
- `src/components/` — component dùng chung (`DatasetInput`, `StepPanel`, `MatrixTable`,
  `FormulaLine`, `ResultCard`).
- `src/data/samples/` — bộ dữ liệu mẫu chép đúng từ slide thầy, để kết quả app đối chiếu được
  từng số với ví dụ trong slide.
- `src/lib/` — tiện ích chung: parse CSV, format số (**dấu chấm thập phân**, 3 chữ số), đo khoảng cách.

Luật ranh giới: **lõi thuật toán không được biết gì về giao diện.** Test được bằng `vitest` mà
không cần render. Đây cũng là thứ làm chương 4 báo cáo viết được — có `steps[]` thì chụp màn hình
nào cũng khớp với bảng trong slide.

## Tech stack

- Frontend: **React 19 + TypeScript**, build bằng **Vite**
- Routing: **TanStack Router** (file-based, type-safe)
- UI: **shadcn/ui + Tailwind CSS v4**, dark mode
- Biểu đồ: **Recharts** (scatter k-means, heatmap Kohonen, bar Gain); cây quyết định vẽ **SVG tay**
- Công thức: **KaTeX** (`react-katex`) — để `I(p,n)`, `E(A)`, `Gain(A)` hiện đúng ký pháp slide
- Bảng: `@tanstack/react-table`
- Test: **Vitest** cho lõi thuật toán
- Package manager: **pnpm**
- Deploy: **Vercel** (static, auto-deploy từ nhánh `main`)
- Repo: **GitHub**, public

**Không dùng thư viện ML** (`sklearn`, `ml.js`, `tensorflow`…). Đề yêu cầu *cài đặt* thuật toán;
gọi thư viện là bỏ mất chính thứ được chấm. Xem `rubric.md § 2.5`.

## Data model

Không có database. Kiểu dữ liệu trung tâm:

```ts
type Dataset = {
  name: string
  attributes: { name: string; type: 'nominal' | 'numeric'; values?: string[] }[]
  rows: Record<string, string | number>[]
  decisionAttribute?: string      // cột nhãn lớp, cho ID3 / Bayes / Reduct
}

type Step = {
  index: number
  title: string                   // đặt ĐÚNG tiêu đề slide, VD "Tính lại trọng tâm"
  formula?: string                // KaTeX
  tables?: { caption: string; head: string[]; body: (string | number)[][] }[]
  note?: string
}

type AlgorithmResult<T> = { steps: Step[]; result: T }
```

`Step[]` là thứ khiến app khác một cái máy tính bấm ra đáp án. Mọi thuật toán trả về cùng kiểu này
nên `StepPanel` dùng chung được cho cả 8 route.

## Features

Mỗi feature khai tiêu chí rubric nó gánh và người chịu trách nhiệm.

| # | Feature | Người | Rubric | Phụ thuộc | Ước lượng |
|---|---|---|---|---|---|
| F1 | Khung dự án: Vite + React + TS + TanStack Router + Tailwind + shadcn, layout, sidebar điều hướng, push GitHub, deploy Vercel lần đầu | Danh | 2.1, #12, #13 | — | 1,5 ngày |
| F2 | Component dùng chung: `DatasetInput` (nhập tay / dán CSV / chọn mẫu), `StepPanel`, `MatrixTable`, `FormulaLine` (KaTeX), `ResultCard` | Danh | 2.4 | F1 | 1,5 ngày |
| F3 | Bộ dữ liệu mẫu chép từ slide: play-ball 14 mẫu, giỏ hàng Apriori, bảng quyết định Reduct, 5 điểm k-means | Danh | 2.4 | F2 | 0,5 ngày |
| F4 | **Tiền xử lý dữ liệu** — binning equal-frequency, làm trơn theo bin means / bin boundaries, chuẩn hoá min-max và z-score, xử lý giá trị thiếu | H. Phúc | 2.2, 2.4 | F2, F3 | 2 ngày |
| F5 | **Apriori** — sinh `Ck` từ `Lk-1`, bước rút gọn, bảng support từng mức, sinh luật kết hợp theo confidence; tab thứ hai: tìm tập phổ biến bằng **vector biểu diễn** (ma trận nhị phân, tích ⊗) | H. Phúc | 2.2, 2.4 | F2, F3 | 3 ngày |
| F6 | **Naive Bayes** — bảng `P(Ci)`, bảng `P(xi|Ci)` từng thuộc tính, tính `P(X\|C)·P(C)` cho từng lớp, chọn theo MAP | T. Phúc | 2.2, 2.4 | F2, F3 | 2,5 ngày |
| F7 | **Đánh giá mô hình** — nhập / lấy kết quả dự đoán, dựng Confusion Matrix 2x2 (TP/FN/FP/TN), tính Accuracy, Precision, Recall, F1 | T. Phúc | 2.2, 2.4 | F2 | 1,5 ngày |
| F8 | **ID3** — bảng 4 cột `Attr / pi / ni / I(pi,ni)` mỗi thuộc tính một bảng, dòng `E(A)`, dòng `Gain(A)`, đệ quy bảng con, **vẽ cây SVG** đúng kiểu slide trang 65, xuất luật `R1: If … ∧ … Then …` | Danh | 2.2, 2.4 | F2, F3 | 3 ngày |
| F9 | **k-means** — chọn `k`, trọng tâm ban đầu, bảng khoảng cách Euclid, **ma trận phân hoạch `U1`/`U2`**, điều kiện dừng `\|Un − Un-1\| = 0`, scatter chart theo cụm | Hưng | 2.2, 2.4 | F2, F3 | 3 ngày |
| F10 | **Kohonen SOM** — khởi tạo map 2 chiều, tìm nơron chiến thắng theo khoảng cách, cập nhật trọng số nơron thắng và vùng lân cận, heatmap map cuối | Hưng | 2.2, 2.4 | F2, F3 | 3 ngày |
| F11 | **Rough set / Reduct** — quan hệ bất khả phân biệt, xấp xỉ trên và xấp xỉ dưới, **ma trận phân biệt**, hàm phân biệt CNF rút thành DNF, liệt kê reduct | T. Phúc | 2.2, 2.4 | F2, F3 | 3 ngày |
| F12 | Trang chủ + trang "Giới thiệu đồ án" (có danh sách 4 thành viên và %), polish UI, responsive, dark mode, deploy production | Danh | 2.1, 1.3 | F4–F11 | 1,5 ngày |

**8 thuật toán** cài đặt (F4, F5, F6, F7, F8, F9, F10, F11) — đạt đích ngưỡng #6 của `rubric.md`.

## Ngân sách dung lượng — báo cáo (đích 32 trang)

Chia tỉ lệ với thứ được chấm, không dồn vào chương lý thuyết chép slide.

| Phần | Trang | Ghi chú |
|---|---:|---|
| Bìa, mục lục, **trang phân công**, danh mục hình/bảng | 5 | Trang phân công **ngay sau mục lục** — ngưỡng #3 |
| Ch.1 Giới thiệu — bối cảnh, mục tiêu, phạm vi, hướng đã chọn | 3 | |
| Ch.2 Cơ sở lý thuyết 8 thuật toán | 10 | ~1,25 trang/thuật toán. **Đây là chương dễ phình nhất** — chép slide thì dài mà không thêm điểm |
| Ch.3 Phân tích và thiết kế hệ thống — kiến trúc, công nghệ, luồng dữ liệu, sơ đồ | 5 | |
| Ch.4 Cài đặt và kết quả demo — ảnh chụp từng route, **đối chiếu số của app với ví dụ trong slide** | 7 | Chương ăn điểm nhất của T2 |
| Ch.5 Kết luận và hướng phát triển | 1 | |
| Tài liệu tham khảo | 1 | |
| **Tổng** | **32** | trần mềm 39, sàn mềm 26 |

Tách ba dòng riêng, **không gộp một con số**: thân bài ~26 trang, ảnh chụp màn hình ~5 trang,
mục lục và danh mục ~1 trang. Ảnh chụp là thứ nở ra không kiểm soát ở đồ án code — mỗi route một
ảnh full-width là đã 8 trang. **Muốn rụng trang thì cắt ở ảnh, không cắt ở thân bài.**

**Build thử sớm:** ngay khi bộ dựng báo cáo xong (F13 trong bản đồ phiên), chạy văn bản giả đúng
ngân sách qua toàn bộ dây chuyền để lấy số từ/trang thật của chính bộ style đó. Đừng đợi viết xong
mới biết bài dài bao nhiêu.

## Cấu trúc báo cáo

1. **Trang bìa** — đủ 4 tên + MSSV
2. **Mục lục**
3. **Trang phân công công việc** ← ngay sau mục lục, có % từng người, tổng 100%
4. Danh mục hình, danh mục bảng
5. **Chương 1 — Giới thiệu**: bối cảnh môn học, lý do chọn hướng 2, mục tiêu, phạm vi (8 thuật toán), cấu trúc báo cáo
6. **Chương 2 — Cơ sở lý thuyết**: 8 mục, mỗi mục một thuật toán, bám ký pháp slide
7. **Chương 3 — Phân tích và thiết kế**: kiến trúc client-side, lý do chọn React/TanStack/shadcn, mô hình `Dataset`/`Step`, sơ đồ điều hướng
8. **Chương 4 — Cài đặt và kết quả**: từng route một mục, ảnh chụp, **bảng đối chiếu kết quả app với ví dụ slide**
9. **Chương 5 — Kết luận**: đã làm được gì, hạn chế, hướng phát triển
10. **Tài liệu tham khảo**
11. Phụ lục: link GitHub, link Vercel, hướng dẫn chạy

## Cấu trúc slide (đích 21 slide)

| Slide | Nội dung |
|---|---|
| 1 | Bìa — tên đề tài, môn, 4 thành viên |
| 2 | Nội dung trình bày |
| 3 | Đặt vấn đề, hướng đã chọn |
| 4 | Mục tiêu và phạm vi — 8 thuật toán |
| 5 | Kiến trúc hệ thống |
| 6 | Công nghệ sử dụng |
| 7–14 | 8 thuật toán, mỗi thuật toán 1 slide: ý tưởng + ảnh chụp màn hình app |
| 15 | Bộ dữ liệu mẫu và cách đối chiếu với slide thầy |
| 16 | Demo trực tiếp (chỗ chuyển sang app / video) |
| 17 | Kết quả đạt được |
| 18 | Phân công công việc và % |
| 19 | Hạn chế |
| 20 | Hướng phát triển |
| 21 | Cảm ơn, hỏi đáp |

## Lịch mốc (lùi ngược từ hạn nộp)

| Ngày | Thứ | Mốc | Definition of Done | Người | Loại |
|---|---|---|---|---|---|
| 2026-09-11 | Sáu | **F1 xong — khung chạy được, đã lên mạng** | `pnpm dev` chạy; repo GitHub tồn tại, 4 người clone được; **URL Vercel trả 200**; sidebar có đủ 8 mục (route rỗng) | Danh | 🔒 cứng |
| 2026-09-13 | CN | **F2 + F3 xong — nền tảng dùng chung** | `DatasetInput`, `StepPanel`, `MatrixTable`, `FormulaLine` merge vào `main`; có ≥3 dataset mẫu chép từ slide; **có 1 route mẫu chạy hết một lượt** để 3 người kia copy theo | Danh | |
| 2026-09-17 | Năm | **Mỗi người xong thuật toán thứ nhất** | F4, F6, F9 merge `main` và **hiện được bước trung gian**; kết quả khớp ví dụ trong slide; Vercel preview mở được | H. Phúc, T. Phúc, Hưng | |
| 2026-09-21 | Hai | **Mỗi người xong thuật toán thứ hai** | F5, F7, F8, F10, F11 merge `main`; đủ **8/8 route** chạy | cả nhóm | |
| 2026-09-22 | Ba | **FEATURE FREEZE — không thêm tính năng mới** | F12 xong; deploy production; từ đây chỉ sửa lỗi, không thêm route. Mọi ý thêm sau ngày này phải có một dòng ở `gia-dinh-va-rui-ro.md § Nhật ký đổi phạm vi` | Danh | |
| 2026-09-24 | Năm | **Kiểm chéo kết quả + bộ dựng báo cáo** | Mỗi người chạy 2 route của người khác, đối chiếu từng số với slide, ghi `review/R1-kiem-cheo-ket-qua.md`; `report/tools/` dựng ra `.docx` thử được | cả nhóm | |
| 2026-09-25 | Sáu | **Báo cáo bản đầy đủ** | `report/tools/bao-cao.md` đủ 5 chương; dựng ra `.docx`; **có trang phân công ngay sau mục lục, tổng % = 100** | cả nhóm | |
| 2026-09-26 | Bảy | **Slide xong** | `slide/` ra `.pptx` 18–25 slide, mở được trên máy khác | T. Phúc, H. Phúc | |
| 2026-09-27 | CN | **QUAY VIDEO — cả 4 người** | 1 file video 8–12 phút; **đủ 4 mặt người**, mỗi người nói phần mình; quay màn hình app đang chạy thật | cả nhóm | 🔒 cứng |
| 2026-09-28 | Hai | **`/review-do-an` pass + sync gói nộp** | Kết luận NỘP ĐƯỢC ở `review-nop.md`; `nop/` khớp hash với sản phẩm | Danh | |
| 2026-10-01 | Năm | **HẠN NỘP** — ngày thi tập trung | — | — | đệm 3 ngày |

🔒 = phụ thuộc bên ngoài, **không nén được**:
- **2026-09-11** phụ thuộc user tạo repo GitHub và tài khoản Vercel. Chưa có repo thì F1 không
  đóng được, và mọi thứ sau đó dịch theo. Đây là mốc phải làm **trước tiên**, ngay hôm nay hoặc mai.
- **2026-09-27** phụ thuộc hẹn được đủ 4 người cùng một buổi. Trễ buổi này thì buổi bù rơi vào
  28–29/09, ăn hết đệm. Chốt lịch với cả nhóm **ngay tuần này**, đừng đợi tới tuần cuối.

**Quỹ thời gian:** 22 ngày, tổng ước lượng feature ≈ 26 ngày-người chia cho 4 người ≈ 6,5 ngày-người
mỗi người. Vừa đủ **nếu** F1–F3 xong đúng hạn 13/09. F1–F3 trễ 2 ngày thì ba người kia không bắt đầu
được, và toàn bộ lịch dồn — đó là đường găng thật của đồ án này, không phải số lượng thuật toán.

**Nếu quỹ thời gian vỡ, cắt theo thứ tự này** (cắt trước, đừng cắt lúc còn 3 ngày):
1. **F10 Kohonen** — nặng nhất, khó trực quan nhất, bỏ vẫn còn 7 thuật toán (trên sàn 6).
2. **F11 Reduct** — rút gọn hàm phân biệt là phần code rối nhất.
3. Tab "vector biểu diễn" trong F5 — giữ Apriori là đủ.
Không cắt F7 dù nó nhẹ: Confusion Matrix rẻ mà vẫn tính là một thuật toán đã học.

## Đối chiếu ngược rubric

| Tiêu chí | Feature / phần gánh | Trạng thái |
|---|---|---|
| T1 báo cáo | § Cấu trúc báo cáo, mốc 25/09 | ☐ |
| T1.2 trang phân công sau mục lục | § Cấu trúc báo cáo mục 3 | ☐ |
| T2 chương trình demo | F1–F12 | ☐ |
| T2.4 hiện bước trung gian | F2 `StepPanel` + mọi thuật toán trả `Step[]` | ☐ |
| T3 video | Mốc 27/09 🔒 | ☐ |
| T4 slide | § Cấu trúc slide, mốc 26/09 | ☐ |
| T5 đúng 1 hướng | Toàn outline bám hướng 2 | ✓ |

**Không có tiêu chí nào chưa được gánh.**

## Nguồn ngoài cần thêm

Không cần `/researching`. `kien-thuc-mon.md` (105 định nghĩa, 47 khung, 96 số) đã phủ đủ cả 8 thuật
toán, kèm số trang slide gốc để trích dẫn. Chương 2 báo cáo viết thẳng từ đó.

Một chỗ duy nhất có thể cần nguồn ngoài: mục "hướng phát triển" ở Chương 5, nếu muốn dẫn thuật toán
ngoài môn (FP-Growth, DBSCAN). Không bắt buộc — đề không đòi.
