# Bản đồ phiên làm việc — IE403 đồ án cuối kỳ

Đồ án quá lớn để làm trong một session. Bảng dưới chia theo ranh giới tự nhiên: mỗi dòng có đầu vào
rõ, đầu ra là file cụ thể, và **không phụ thuộc vào việc nhớ lại session trước**.

Đây là **đồ án code**, nên bảng này là **WBS feature**, không phải danh sách prompt để dán:
- **F1–F12** làm bằng editor trong repo `ktdl-demo` (ngoài repo `doan`). Ước lượng tính theo ngày.
- **P13–P18** là phiên Claude Code chạy trong repo `doan`, sinh tài liệu và bản nộp.

**Cách dùng:** `/do-an next` để biết việc tới lượt, `/do-an status` để đối chiếu lịch.

## Bảng phiên

| # | Việc | File đầu ra | Phụ thuộc | Ước lượng | Rubric |
|---|---|---|---|---|---|
| **F1** | Khung dự án: Vite + React 19 + TS + TanStack Router + Tailwind v4 + shadcn, layout và sidebar 8 mục, push GitHub, deploy Vercel | `ktdl-demo/` (repo mới), URL Vercel | 🌍 user tạo repo GitHub + tài khoản Vercel | 1,5 ngày | 2.1, #12, #13 |
| **F2** | Component dùng chung: `DatasetInput`, `StepPanel`, `MatrixTable`, `FormulaLine` (KaTeX), `ResultCard` | `src/components/*` | F1 | 1,5 ngày | 2.4 |
| **F3** | Dữ liệu mẫu chép từ slide: play-ball 14 mẫu, giỏ hàng, bảng quyết định, 5 điểm k-means | `src/data/samples/*` | F2 | 0,5 ngày | 2.4 |
| **F4** | Tiền xử lý: binning, làm trơn, chuẩn hoá min-max và z-score, xử lý thiếu | `src/algorithms/preprocess/*`, `src/routes/tien-xu-ly.tsx` | F2, F3 | 2 ngày | 2.2, 2.4 |
| **F5** | Apriori + vector biểu diễn | `src/algorithms/apriori/*`, `src/routes/apriori.tsx` | F2, F3 | 3 ngày | 2.2, 2.4 |
| **F6** | Naive Bayes | `src/algorithms/bayes/*`, `src/routes/bayes.tsx` | F2, F3 | 2,5 ngày | 2.2, 2.4 |
| **F7** | Đánh giá mô hình: Confusion Matrix, Accuracy/Precision/Recall/F1 | `src/algorithms/evaluation/*`, `src/routes/danh-gia.tsx` | F2 | 1,5 ngày | 2.2, 2.4 |
| **F8** | ID3: bảng Gain từng thuộc tính, cây SVG, luật IF-THEN | `src/algorithms/id3/*`, `src/routes/id3.tsx` | F2, F3 | 3 ngày | 2.2, 2.4 |
| **F9** | k-means: bảng khoảng cách, ma trận phân hoạch `U1`/`U2`, scatter | `src/algorithms/kmeans/*`, `src/routes/kmeans.tsx` | F2, F3 | 3 ngày | 2.2, 2.4 |
| **F10** | Kohonen SOM: map 2 chiều, nơron chiến thắng, cập nhật lân cận, heatmap | `src/algorithms/kohonen/*`, `src/routes/kohonen.tsx` | F2, F3 | 3 ngày | 2.2, 2.4 |
| **F11** | Rough set: xấp xỉ trên/dưới, ma trận phân biệt, hàm phân biệt, reduct | `src/algorithms/reduct/*`, `src/routes/reduct.tsx` | F2, F3 | 3 ngày | 2.2, 2.4 |
| **F12** | Trang chủ, trang giới thiệu (4 thành viên + %), polish, responsive, deploy production | `src/routes/index.tsx`, `src/routes/gioi-thieu.tsx` | F4–F11 | 1,5 ngày | 2.1, 1.3 |
| **P13** | Kiểm chéo kết quả app với ví dụ trong slide — mỗi người soát 2 route của người khác | `review/R1-kiem-cheo-ket-qua.md` | F12 + 🌍 cả 4 người đã chạy thử | 1 session dài | 2.4, #6 |
| **P14** | **Dựng bộ build báo cáo** — `report/tools/` (pandoc + python-docx + `finalize.ps1`), bìa, mục lục, **trang phân công sau mục lục** | `report/tools/*.py`, `report/tools/build.ps1` | P13 | 1 session dài | T1, #1, #3 |
| **P15** | Viết Chương 1–5 báo cáo, ghép thành bản đầy đủ | `report/src/*.md` → `report/tools/bao-cao.md` → `output/*.docx` | P14 | 2 session dài | T1 |
| **P16** | Slide `.pptx` theo `outline.md § Cấu trúc slide` | `slide/*.pptx` | P15 | 1 session | T4 |
| **P17** | Kịch bản video: ai nói phần nào, bao nhiêu phút, thứ tự thao tác trên app | `video/kich-ban-video.md` | P15 | 1 session ngắn | T3 |
| **P18** | Soát trước khi nộp, tự chấm theo `rubric.md`, sync gói nộp | `review-nop.md`, `nop/` | P15, P16, 🌍 video đã quay | 1 session dài | tất cả |

🌍 = phụ thuộc **việc ngoài đời**, không nén được:
- **F1** chờ user tạo repo GitHub và tài khoản Vercel. Đây là thứ chặn cả đồ án — làm hôm nay hoặc mai.
- **P13** chờ cả 4 người thật sự chạy thử app trên máy mình.
- **P18** chờ video đã quay xong ngày 27/09.

## Thứ tự chạy

```
🌍 [user tạo repo GitHub + Vercel]
          ↓
         F1 ──> F2 ──> F3
                        ↓
        ┌───────────────┼───────────────┬───────────────┐
        │               │               │               │
     F4, F5          F6, F7, F11      F9, F10          F8
    (H. Phúc)        (T. Phúc)         (Hưng)         (Danh)
        └───────────────┴───────────────┴───────────────┘
                        ↓
                       F12  ← FEATURE FREEZE 2026-09-22
                        ↓
              🌍 [cả 4 người chạy thử]
                        ↓
                       P13
                        ↓
                 P14 ──> P15 ──┬──> P16
                               └──> P17
                        ↓
              🌍 [quay video 2026-09-27]
                        ↓
                       P18 ──> /review-do-an
```

Bốn nhánh F4–F11 chạy **song song thật**, vì mỗi người sửa file route và file thuật toán của riêng
mình. Đây là lý do chọn TanStack Router file-based thay vì một file router tập trung.

## Chạy song song — bản đồ đụng độ file

Sơ đồ trên là **phụ thuộc**. Nó không trả lời câu "hai người làm cùng lúc có sao không" — và câu đó
hỏng theo kiểu **im lặng**.

### 1. File mà từng việc GHI VÀO

| Việc | File nguồn ghi vào | Có dựng lại sản phẩm không |
|---|---|---|
| F1 | toàn bộ khung `ktdl-demo/` | không |
| F2 | `src/components/*` | không |
| F3 | `src/data/samples/*` | không |
| F4–F11 | `src/algorithms/<của mình>/*`, `src/routes/<của mình>.tsx`, **cộng 1 dòng** trong `src/routes/__root.tsx` | không |
| F12 | `src/routes/index.tsx`, `src/routes/gioi-thieu.tsx`, `src/styles.css` | không |
| P14 | `report/tools/*` | **Word** |
| P15 | `report/src/*.md` | **Word** |
| P16 | `slide/*` | **PowerPoint** |
| P18 | `nop/*` | **Word + PowerPoint** |

Cột cuối là cột nguy hiểm.

### 2. Cặp KHÔNG được song song

| Cặp | Vì sao |
|---|---|
| Hai việc F4–F11 bất kỳ | Hợp nhất được, **trừ** dòng thêm vào `__root.tsx` — thêm một dòng rồi merge ngay, đừng để nhánh sống quá 2 ngày |
| F2 với bất kỳ F4–F11 | F2 sửa component mà cả 8 route đang dùng; đổi API component giữa chừng làm gãy nhánh của 3 người |
| P15 với P16 | Cùng dựng file nhị phân; file sau **đè** file trước, **không báo lỗi** |
| P16 với P18 | P18 sinh lại cả `nop/` |
| Hai người bất kỳ cùng dựng `.docx` hay `.pptx` | Git không hợp nhất file nhị phân — chọn bên này bỏ bên kia, không có cách thứ ba |

> **"Git hợp nhất được" không có nghĩa là "chạy song song được".** Slide là chỗ dễ dính nhất: một
> người chèn 5 slide làm **dịch số slide**, trong khi người kia đang sửa nội dung **gọi theo số
> slide**. Merge sạch mà mọi tham chiếu trỏ lệch một chỗ.

### 3. Sơ đồ làn

```
Làn NỀN   : F1 ──> F2 ──> F3 ──> F8 ──> F12        (Danh)
Làn A     : F4 ──> F5                              (H. Phúc)
Làn B     : F6 ──> F7 ──> F11                      (T. Phúc)
Làn C     : F9 ──> F10                             (Hưng)

   ⟂ Làn A, B, C song song với nhau — khác file hoàn toàn
   ⚠ Làn A, B, C KHÔNG bắt đầu được trước khi làn NỀN xong F3

        ── chờ cả bốn làn xong ──
                  ↓
        F12 ──> P13 ──> P14 ──> P15
                                  ↓
                        P16 và P17 (P17 chỉ là file .md, song song được với P16)
                                  ↓
                        P18 dựng ĐÚNG MỘT LẦN ──> /review-do-an
```

| Lượt | Danh | H. Phúc | T. Phúc | Hưng |
|---|---|---|---|---|
| 09–13/09 | F1, F2, F3 | *đọc slide, chuẩn bị dữ liệu mẫu phần mình* | *nt* | *nt* |
| 13–17/09 | F8 | F4 | F6 | F9 |
| 17–21/09 | F8 | F5 | F7, F11 | F10 |
| 22/09 | F12 + freeze | — | — | — |
| 24/09 | P13 — cả bốn cùng soát chéo | | | |
| 25/09 | P14, P15 | Ch.1, Ch.5 | Ch.2 Bayes–Reduct | Ch.2 gom cụm |
| 26/09 | — | P16 slide | P17 kịch bản | P16 slide |
| 27/09 | quay video — cả bốn | | | |
| 28/09 | P18 + `/review-do-an` | | | |

### 4. Luật cứng

> **Trong lúc chạy song song, chỉ sửa FILE NGUỒN và KHÔNG commit sản phẩm đã dựng.**
> Dựng để tự nghiệm thu thì được, nhưng `git restore <đường dẫn sản phẩm>` **trước khi commit**.
> Sản phẩm chỉ được dựng và commit ở **P18**, đúng một lần.

## Nguyên tắc chung cho mọi phiên

Dán đoạn này vào đầu session khi cần nhắc lại:

> Bối cảnh: đồ án môn Khai thác dữ liệu và truyền thông xã hội (IE403), hướng 2 — web demo các thuật
> toán đã học, có giao diện. Nhóm 4 người. Source code ở repo riêng `ktdl-demo` **ngoài** repo `doan`;
> repo `doan` chỉ chứa artifact trong `khai-thac-du-lieu-va-truyen-thong-xa-hoi/do-an/`.
>
> Đọc `do-an/rubric.md` để nắm cách chấm trước khi làm bất cứ gì, và `do-an/outline.md` để biết việc
> này nằm ở đâu.
>
> Quy tắc bất di bất dịch: không bịa số liệu, không bịa ngưỡng. Ký pháp và cách trình bày bước trung
> gian **bám slide thầy** — xem `.claude/memory/ktdl-format-bai-giai-id3.md`, đã qua nhận xét trực
> tiếp của GV. Dấu thập phân là **dấu chấm**. Không gọi thư viện ML.

## Định nghĩa hoàn thành cho P14 — phiên dựng bộ build

Ba dòng dưới là **bắt buộc**, không phải tuỳ chọn. Đọc
`.claude/skills/do-an/references/bo-dung-file-nop.md` (Luật 1, 2, 6) **trước** khi viết dòng đầu tiên
của bộ dựng, và `build-kit/README.md` để `import` thay vì viết lại năm hàm hậu kỳ mà cả hai đồ án
trước của repo đều đã phải giải.

- [ ] Bộ dựng kết thúc bằng **cổng kiểm**, và **trả theo exit code của cổng**.
- [ ] Bộ dựng ghi `.build-manifest.json` cạnh sản phẩm.
- [ ] Có một file thử ngược chạy được: tắt từng phần vá, dựng lại, cổng phải **đỏ**.

Cộng ba chốt riêng của đồ án này:

- [ ] Chốt **trang phân công nằm ngay sau mục lục** (ngưỡng #3) — đọc thứ tự section trong `.docx`.
- [ ] Chốt **tổng % = 100** (ngưỡng #1) — cộng số trong bảng phân công, so với `phan-cong.md`.
- [ ] Chốt **in đậm nội tuyến**: trong đoạn văn không in đậm gì cả, kể cả số liệu và nhãn `Bước 1:`.
      Đo trên **bản kết xuất**, đừng đếm `**…**` trong `.md`. Xem `anti-ai-tells § I`.

## Phiên sửa chữa

| # | Việc | Kích hoạt khi |
|---|---|---|
| R1 | Kiểm chéo kết quả app với ví dụ slide → `review/R1-kiem-cheo-ket-qua.md` | P13, mốc 24/09 |
| R2 | Soát độ dài báo cáo, cắt ở ảnh chụp trước, cắt thân bài sau | Bản dựng vượt 39 trang hoặc hụt 26 trang |
| R3 | Soát ký pháp: dấu thập phân, `I(pi,ni)`, `E(A)`, `Gain(A)`, `U1`/`U2` | Sau P15 |
| R4 | Cắt video nếu vượt 11 phút | Sau khi dựng video |

**Không có phiên `R-so-sanh`** — user xác nhận không có bài nhóm khác, bài mẫu hay slide thầy chữa.
`do-an/tham-khao/` cố ý **không tạo**. Có tài liệu về sau thì tạo thư mục đó và thêm phiên này.
