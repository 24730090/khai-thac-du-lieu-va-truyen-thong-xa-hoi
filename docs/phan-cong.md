# Phân công nhóm và lịch làm việc

Nhóm **4** người. Hạn nộp **2026-10-01**. Kiểu chia: **lệch có chủ đích**.

Danh gánh nhiều hơn vì dựng khung dự án, bộ component dùng chung và bộ dữ liệu mẫu — ba thứ mà
**ba người còn lại phải chờ mới bắt đầu được**. Đây là đường găng, không phải phần thưởng. Đổi lại,
Danh chỉ nhận một thuật toán (ID3) trong khi hai người khác nhận hai và một người nhận ba.

Đây là lựa chọn của nhóm, không phải máy tự cân bằng. Muốn chia đều lại thì sửa cả bảng % ở đây,
bảng ở `outline.md § Features`, và trang phân công trong báo cáo — **ba chỗ, sửa cùng lúc**.

## Thành viên và khối việc

| Người | MSSV | % | Khối việc | Sản phẩm bàn giao |
|---|---|---:|---|---|
| **Nguyễn Ngọc Danh** | 24730090 | **28** | F1 khung dự án · F2 component dùng chung · F3 dữ liệu mẫu · F8 ID3 · F12 trang chủ và polish · deploy Vercel · gộp báo cáo cuối | `src/routes/__root.tsx`, `src/components/*`, `src/data/samples/*`, `src/algorithms/id3/*`, `src/routes/id3.tsx`, `report/tools/` |
| **Nguyễn Thanh Phúc** | 24730131 | **25** | F6 Naive Bayes · F7 Đánh giá mô hình · F11 Rough set / Reduct · Chương 2 mục Bayes–Reduct | `src/algorithms/{bayes,evaluation,reduct}/*`, `src/routes/{bayes,danh-gia,reduct}.tsx`, `report/src/ch2-bayes-reduct.md` |
| **Mai Hoàng Hưng** | 24730099 | **24** | F9 k-means · F10 Kohonen SOM · Chương 2 mục gom cụm · dựng slide phần thuật toán | `src/algorithms/{kmeans,kohonen}/*`, `src/routes/{kmeans,kohonen}.tsx`, `report/src/ch2-gom-cum.md` |
| **Nguyễn Thị Hồng Phúc** | 24730132 | **23** | F4 Tiền xử lý · F5 Apriori và vector biểu diễn · Chương 1 và Chương 5 báo cáo · dựng slide phần mở đầu và kết luận | `src/algorithms/{preprocess,apriori}/*`, `src/routes/{tien-xu-ly,apriori}.tsx`, `report/src/ch1-gioi-thieu.md`, `report/src/ch5-ket-luan.md` |

**Tổng: 28 + 25 + 24 + 23 = 100 %** — ngưỡng #1 của `rubric.md`, đề đòi đúng 100.

> Con số này phải xuất hiện **giống hệt** ở ba chỗ: file này, trang phân công trong báo cáo
> (ngay sau mục lục), và slide 18. Lệch nhau là nhóm tự khai mâu thuẫn ngay trước mặt người chấm.

Việc chung, không tính vào bảng trên vì cả 4 người cùng làm: quay video (27/09), kiểm chéo kết quả
(24/09), Chương 4 báo cáo (mỗi người viết mục của route mình).

`group.json` đi kèm giữ đúng format dùng chung với `/bai-tap`.

## Mốc riêng từng người

| Ngày | Người | Việc | Definition of Done | Xong? |
|---|---|---|---|---|
| 2026-09-11 | Danh | F1 khung + GitHub + Vercel | URL Vercel trả 200; 4 người clone và `pnpm dev` chạy được | ☐ |
| 2026-09-13 | Danh | F2 + F3 | 5 component merge `main`; ≥3 dataset mẫu; 1 route mẫu chạy trọn một lượt | ☐ |
| 2026-09-17 | H. Phúc | F4 Tiền xử lý | Route chạy, hiện bảng binning và bảng chuẩn hoá từng bước, khớp ví dụ slide Bài 1_2 | ☐ |
| 2026-09-17 | T. Phúc | F6 Naive Bayes | Route chạy, hiện bảng `P(Ci)` và `P(xi\|Ci)`, kết quả khớp ví dụ slide Bài 5.1 trang 16 | ☐ |
| 2026-09-17 | Hưng | F9 k-means | Route chạy, hiện bảng khoảng cách và `U1`/`U2`, hội tụ đúng ví dụ slide Bài 6 trang 27 | ☐ |
| 2026-09-19 | Danh | F8 ID3 | Bảng `Attr/pi/ni/I(pi,ni)` từng thuộc tính, `Gain` đúng `0.940 / 0.694 / 0.247`, cây vẽ SVG, xuất luật IF-THEN | ☐ |
| 2026-09-21 | H. Phúc | F5 Apriori | `Ck`→`Lk` từng mức, sinh luật theo confidence; tab vector biểu diễn | ☐ |
| 2026-09-21 | T. Phúc | F7 + F11 | Confusion Matrix và 4 chỉ số; ma trận phân biệt và danh sách reduct | ☐ |
| 2026-09-21 | Hưng | F10 Kohonen | Map 2 chiều, nơron chiến thắng, cập nhật lân cận, heatmap | ☐ |
| 2026-09-22 | Danh | F12 + freeze | Trang chủ, trang giới thiệu có % 4 người; deploy production | ☐ |
| 2026-09-24 | cả nhóm | Kiểm chéo | Mỗi người soát 2 route của người khác → `review/R1-kiem-cheo-ket-qua.md` | ☐ |
| 2026-09-25 | cả nhóm | Chương 2 và 4 của mình | `report/src/*.md` đủ phần được giao | ☐ |
| 2026-09-26 | Hưng, H. Phúc | Slide | `.pptx` 18–25 slide | ☐ |
| **2026-09-27** | **cả 4** | **Quay video** 🔒 | 1 file 8–12 phút, **đủ 4 mặt**, mỗi người nói phần mình | ☐ |
| 2026-09-28 | Danh | Dựng cuối + `/review-do-an` | `review-nop.md` kết luận NỘP ĐƯỢC; `nop/` khớp hash | ☐ |

🔒 **Mốc cứng 27/09 phải chốt lịch ngay tuần này.** Hẹn 4 người là thứ trễ dễ nhất và nén khó nhất
trong cả đồ án — trễ buổi này thì buổi bù ăn hết 3 ngày đệm.

## Luật tiến độ

Đề không nói gì về chấm quá trình, nhưng repo là bằng chứng duy nhất cho con số % ở trên.

- Repo: `<<URL REPO GITHUB — user cấp sau>>`
- **Mỗi người commit bằng tài khoản GitHub của chính mình.** % trong báo cáo mà không có commit
  tương ứng thì con số ấy không đứng vững nếu thầy mở repo ra xem.
- Nhịp tối thiểu: **≥ 2 commit/tuần** vào phần việc của mình, từ 11/09 tới 22/09.
- Nhánh: mỗi feature một nhánh `feat/<mã>-<tên>` (VD `feat/f9-kmeans`), merge vào `main` bằng PR.
  Vercel tự dựng preview cho từng PR — dùng preview đó để kiểm chéo, đừng gửi ảnh chụp qua chat.
- Commit message có prefix `feat:` / `fix:` / `refactor:` để về sau gom được theo feature.

Commit phải phản ánh việc thật. **Không backdate, không commit hộ, không mạo danh thành viên.**
Chia việc lệch thật thì nhịp commit tự lệch — đó là chuyện bình thường, không cần dàn dựng.

## Bản đồ đụng độ file

Chia theo route nên gần như không đụng nhau. Ba chỗ **có** đụng, phải nhường lượt:

| File | Ai ghi | Luật |
|---|---|---|
| `src/routes/__root.tsx` (sidebar) | mọi người thêm mục của mình | Thêm **đúng một dòng** rồi merge ngay, đừng để nhánh sống lâu |
| `src/components/*` | chỉ Danh | Ai cần sửa component chung thì **báo Danh**, không tự sửa trong nhánh feature của mình |
| `report/tools/` và mọi `.docx` / `.pptx` | chỉ **phiên dựng cuối** | Git không hợp nhất được file nhị phân. Hai người cùng dựng thì file sau **đè** file trước và **không báo lỗi** |

> **Luật cứng:** trong lúc nhiều người làm song song, chỉ sửa **file nguồn**, **không commit sản
> phẩm đã dựng** (`.docx`, `.pptx`, `.pdf`). Dựng để tự kiểm thì được, nhưng `git restore` file sản
> phẩm trước khi commit. Sản phẩm chỉ được dựng và commit **một lần**, ở phiên dựng cuối 28/09.

## Kênh trao đổi và luật khi kẹt

- Kênh: `<<NHÓM CHAT — user điền>>`
- Ai kẹt quá **2 ngày** ở một feature thì báo nhóm, không im lặng tới hạn. Kẹt 2 ngày trong quỹ
  22 ngày là mất 9 % thời gian của cả đồ án.
- Ai không xong thuật toán thứ nhất đúng 17/09 → **cắt ngay thuật toán thứ hai của người đó** theo
  thứ tự cắt ở `outline.md`, đừng chờ tới 21/09 mới quyết.
- Đổi phạm vi giữa chừng: ghi một dòng vào `gia-dinh-va-rui-ro.md § Nhật ký đổi phạm vi`, kèm việc
  bị cắt để đổi lại.
