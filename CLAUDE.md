# CLAUDE.md — ktdl-demo

Web demo các thuật toán khai thác dữ liệu. **Đồ án cuối kỳ môn IE403 — Khai thác dữ liệu và
truyền thông xã hội**, nhóm 4 người, hạn nộp **2026-10-01**.

Repo này chỉ chứa **source code**. Mọi artifact đồ án (brief, rubric, báo cáo, slide, video, bảng
kê nộp) nằm ở repo học tập khác: `C:\Users\ngocdanh\Documents\me\doan\khai-thac-du-lieu-va-truyen-thong-xa-hoi\do-an\`.
Bản sao các file cần để làm việc đã có sẵn trong `docs/` — đọc ở đó, đừng đi tìm repo kia.

## Đọc trước khi viết dòng code đầu tiên

| File | Dùng để |
|---|---|
| [docs/outline.md](docs/outline.md) | **Nguồn sự thật về kiến trúc, tech stack, `Dataset`/`Step`, 12 feature, lịch mốc** |
| [docs/rubric.md](docs/rubric.md) | Cách bài được chấm, 13 ngưỡng số cứng |
| [docs/phan-cong.md](docs/phan-cong.md) | Ai sở hữu file nào, bản đồ đụng độ file |
| [docs/ban-do-phien.md](docs/ban-do-phien.md) | WBS F1–F12, 4 làn chạy song song |
| [docs/format-trinh-bay-cua-GV.md](docs/format-trinh-bay-cua-GV.md) | **Khuôn trình bày bước trung gian đã qua nhận xét trực tiếp của GV** |
| [docs/kien-thuc-mon.md](docs/kien-thuc-mon.md) | 105 định nghĩa + 47 khung + 96 số, kèm số trang slide gốc |
| [docs/gia-dinh-va-rui-ro.md](docs/gia-dinh-va-rui-ro.md) | 9 điều cấm — đọc mục § Danh sách cấm |
| [docs/brief.md](docs/brief.md) | Đề gốc, nguyên văn |

## Đề bài, rút gọn

Thầy cho chọn 1 trong 2 hướng. Nhóm chọn **hướng 2: "Cài đặt demo các thuật toán đã học trong môn
(có giao diện)"**. Bốn thứ phải nộp: báo cáo, chương trình demo, video demo, file `.ppt`.

Repo này gánh **"chương trình demo"** — tiêu chí T2 của `docs/rubric.md`.

## Tech stack (đã chốt, đừng đổi giữa chừng)

React 19 + TypeScript · Vite · **TanStack Router** (file-based) · **shadcn/ui** + Tailwind CSS v4 ·
Recharts · KaTeX (`react-katex`) · `@tanstack/react-table` · Vitest · pnpm · deploy **Vercel** (static).

**Client-side hoàn toàn** — không backend, không database, không API route. Lý do: deploy static thì
không có gì chết vào ngày nộp, và mỗi thành viên chạy được ngay sau `pnpm install && pnpm dev`.

## Bốn luật cứng của repo này

**1. Không gọi thư viện ML.** Cấm `sklearn`, `ml.js`, `tensorflow`, `mlpack`, mọi package cài sẵn
thuật toán. Đề đòi *cài đặt* thuật toán — gọi thư viện là bỏ mất đúng thứ được chấm.

**2. Mọi thuật toán trả về cả bước trung gian, không chỉ kết quả cuối.**

```ts
type Step = {
  index: number
  title: string        // đặt ĐÚNG tiêu đề slide, VD "Tính lại trọng tâm", "Ma trận phân hoạch U2"
  formula?: string     // KaTeX
  tables?: { caption: string; head: string[]; body: (string | number)[][] }[]
  note?: string
}
type AlgorithmResult<T> = { steps: Step[]; result: T }
```

Đây là thứ phân biệt "demo thuật toán" với "cái máy tính bấm ra đáp án". Bấm nút ra ngay kết quả
cuối thì không ai nhìn ra được là tự cài hay gọi thư viện.

**3. Ký pháp bám slide thầy.** `I(pi,ni)`, `E(A)`, `Gain(A)`, ma trận phân hoạch `U1`/`U2`, luật
`R1: If (Outlook=Rainy) ∧ (Humidity=High) Then Play ball=No`. **Dấu thập phân là dấu CHẤM**
(`0.940`, không phải `0,940`). Chi tiết và lý do: [docs/format-trinh-bay-cua-GV.md](docs/format-trinh-bay-cua-GV.md)
— khuôn đó đã qua nhận xét trực tiếp của GV, không phải suy đoán.

**4. Lõi thuật toán không được import React.** `src/algorithms/` là hàm thuần, test được bằng Vitest
mà không cần render. Mỗi thuật toán phải có ít nhất **1 test so kết quả với ví dụ trong slide** —
đó là cách duy nhất bắt được sai số sớm thay vì lúc viết báo cáo.

## Cấu trúc thư mục

```
src/
├── algorithms/<ten>/        ← hàm thuần, không React, trả AlgorithmResult<T>
├── routes/                  ← TanStack Router file-based, MỖI THUẬT TOÁN MỘT FILE
├── components/              ← DatasetInput, StepPanel, MatrixTable, FormulaLine, ResultCard
├── data/samples/            ← dữ liệu mẫu chép ĐÚNG từ slide thầy
└── lib/                     ← parse CSV, format số (dấu chấm, 3 chữ số), khoảng cách
```

Một thuật toán một file route là **ranh giới chia việc**: 4 người sửa 4 file khác nhau, git không
xung đột. Đừng gom router vào một file tập trung.

## 8 thuật toán và người sở hữu

| Route | Thuật toán | Người | Slide gốc |
|---|---|---|---|
| `tien-xu-ly` | Binning, làm trơn, min-max, z-score, xử lý thiếu | H. Phúc | Bài 1_2 |
| `apriori` | Apriori + vector biểu diễn | H. Phúc | Bài 2 |
| `bayes` | Naive Bayes (MAP) | T. Phúc | Bài 5.1, Bài 7 |
| `danh-gia` | Confusion Matrix, Accuracy/Precision/Recall/F1 | T. Phúc | Bài 7 |
| `reduct` | Rough set, ma trận phân biệt, reduct | T. Phúc | Bài 3 |
| `id3` | ID3, Information Gain, cây SVG, luật IF-THEN | Danh | Bài 5 |
| `kmeans` | k-means, ma trận phân hoạch U1/U2 | Hưng | Bài 6 |
| `kohonen` | Kohonen SOM | Hưng | Bài 8 |

**Chỉ sửa file của phần mình.** Cần đổi component chung trong `src/components/` thì báo Danh —
đổi API component giữa chừng làm gãy nhánh của 3 người.

## Git

Remote `origin` đã cấu hình sẵn kèm credential, push thẳng được:

```
https://github.com/24730090/khai-thac-du-lieu-va-truyen-thong-xa-hoi.git
```

> ⚠️ Token nằm plaintext trong `.git/config`. **`git remote -v` sẽ in nguyên token ra màn hình** —
> đừng chạy lệnh đó khi đang quay video demo hoặc chia sẻ màn hình. Revoke token sau khi nộp xong.

- Nhánh: mỗi feature một nhánh `feat/<mã>-<tên>`, VD `feat/f9-kmeans`. Merge vào `main` bằng PR.
- Vercel tự dựng preview cho mỗi PR — dùng preview đó để kiểm chéo, đừng gửi ảnh chụp qua chat.
- Commit message có prefix `feat:` / `fix:` / `refactor:`.
- **Mỗi người commit bằng tài khoản GitHub của chính mình.** % phân công trong báo cáo mà không có
  commit tương ứng thì con số đó không đứng vững nếu thầy mở repo ra xem.
- **Không commit file nhị phân đã dựng** (`.docx`, `.pptx`, `.mp4`) vào repo này — chúng thuộc repo
  `doan`, và git không hợp nhất được file nhị phân.

## Lịch mốc

| Ngày | Mốc | Definition of Done |
|---|---|---|
| 2026-09-11 | F1 khung | `pnpm dev` chạy; **URL Vercel trả 200**; sidebar đủ 8 mục |
| 2026-09-13 | F2 + F3 | 5 component chung merge `main`; ≥3 dataset mẫu; 1 route mẫu chạy trọn |
| 2026-09-17 | Thuật toán thứ nhất | F4, F6, F9 merge, hiện được bước trung gian, khớp ví dụ slide |
| 2026-09-21 | Thuật toán thứ hai | F5, F7, F8, F10, F11 merge — đủ **8/8 route** |
| **2026-09-22** | **FEATURE FREEZE** | F12 xong, deploy production. Từ đây chỉ sửa lỗi |
| 2026-09-24 | Kiểm chéo | Mỗi người soát 2 route của người khác, đối chiếu từng số với slide |

Sau 22/09 mà vẫn muốn thêm gì thì phải ghi một dòng vào
`docs/gia-dinh-va-rui-ro.md § Nhật ký đổi phạm vi` **kèm việc bị cắt để đổi lại**.

Quỹ thời gian vỡ thì cắt theo thứ tự: **F10 Kohonen** → **F11 Reduct** → tab vector biểu diễn của F5.
Sàn là 6 thuật toán, đừng cắt xuống dưới. Không cắt F7 dù nó nhẹ nhất.

## Đường găng — đọc kỹ

**F1 → F2 → F3 là đường găng thật của cả đồ án**, không phải số lượng thuật toán. Ba người còn lại
không bắt đầu được cho tới khi có component chung và một route mẫu để copy theo. F1–F3 trễ 2 ngày
là cả lịch dồn. Ưu tiên xong sớm và thô còn hơn xong muộn và đẹp.
