# Brief — Khai thác dữ liệu và truyền thông xã hội (IE403) — Đồ án cuối kỳ

> Nguồn: `brief/de-bai-paste-2026-09-09.md` (user dán nguyên văn trong chat 2026-09-09).
> Không có file đề, không có ảnh, không có rubric dạng bảng.
> File này là bản **chép và chuẩn hoá**, không diễn giải. Chỗ nào đề không nói thì ghi "Chưa rõ".

## Mandatory

Đề cho **chọn 1 trong 2 hướng**, nguyên văn:

1. "Làm đồ án phân tích, dự đoán một vấn đề nào đó bằng các thuật toán trong môn học hoặc các thuật toán ngoài môn học."
2. "Cài đặt demo các thuật toán đã học trong môn( có giao diện)"

→ **Nhóm chọn hướng 2** (xác nhận của user 2026-09-09).

Bốn yêu cầu bắt buộc, nguyên văn:

- "File báo cáo (trang số phần tram công việc đảm nhiệm, tổng số phần tram các thành viên = 100%) sau mục lục có trang phân công công việc !"
- "Chương trình demo"
- "Quay video demo chương trình94 người cùng quay 1 người nói 1 ít show mặt trên video)"
- "file.ppt soạn nội chung báo cáo"

Ba chỗ đề gõ lỗi, đọc hiểu như sau — ghi ra để không diễn giải lại mỗi lần đọc:

| Nguyên văn | Đọc là | Căn cứ |
|---|---|---|
| "phần tram" | phần trăm (%) | cùng câu có "tổng … = 100%" |
| "chương trình94 người cùng quay" | "chương trình (4 người cùng quay" — dấu `(` bị gõ thành `9` | nhóm đúng 4 người; `(` và `9` cùng phím Shift-9 |
| "nội chung báo cáo" | nội dung báo cáo | — |

## Format

- Page count / length: **Chưa rõ** — đề không nêu số trang, số slide, thời lượng video.
- Font / spacing / margins: **Chưa rõ** — đề không nêu.
- Vị trí bắt buộc: trang phân công công việc nằm **ngay sau mục lục** của file báo cáo. Đây là ràng buộc duy nhất về bố cục mà đề nói rõ, và có dấu `!` trong đề.
- Deliverables: 4 thứ — file báo cáo, chương trình demo, video demo, file `.ppt`.
- Định dạng từng file: **Chưa rõ** — đề viết "File báo cáo" (không nói doc/docx/pdf) và "file.ppt" (không nói ppt hay pptx).

## Rubric

**Đề không có rubric, không có thang điểm, không có trọng số.** Không có bảng chấm để chép.

Bốn deliverable ở § Mandatory là thứ gần rubric nhất mà đề cung cấp. `rubric.md` suy tiêu chí ngầm từ chúng và đánh dấu `[suy đoán — cần hỏi GV]` cho mọi con số không có trong đề.

## Deadline

- Đề viết: "DEALINE: ngày thi tập trung của học kỳ hè. Ngày đó là deadline".
- Ngày thi tập trung: **`<<NGÀY THI TẬP TRUNG HK HÈ — user điền>>`**, user xác nhận rơi vào **đầu tháng 10/2026** (khoảng 01–10/10).
- Ngày dùng để lập lịch: **2026-10-01** — lấy **biên sớm nhất** của khoảng, để lịch không vỡ nếu thi ngày 01/10. Khai ở `gia-dinh-va-rui-ro.md` G1.
- Hôm nay 2026-09-09 → còn **22 ngày**.

## References-style

Đề không yêu cầu tài liệu tham khảo, không nêu kiểu trích dẫn, không nêu số nguồn tối thiểu.
Báo cáo vẫn nên có mục TLTK (trích slide môn + tài liệu thư viện dùng) — xem `rubric.md` T1.6, đánh dấu suy đoán.

## Notes

- **Nhóm 4 người**, lấy từ `he-thong-quan-tri-qui-trinh-nghiep-vu/bai-tap/2026-08-03/group.json`:
  Nguyễn Thị Hồng Phúc (24730132), Nguyễn Thanh Phúc (24730131), Nguyễn Ngọc Danh (24730090), Mai Hoàng Hưng (24730099).
- Chỉ dẫn kỹ thuật của user (không phải của đề — đề không nói gì về công nghệ):
  ReactJS + shadcn/ui + TanStack Router, "làm web demo chỉnh chu", deploy Vercel, push GitHub,
  project code đặt **ngang cấp repo `doan`** chứ không nằm trong repo này. Link git user cấp sau.
- "Các thuật toán đã học trong môn" — căn cứ `subject.json § kien_thuc.sources` và `kien-thuc-mon.md`,
  gồm 10 file slide: Tổng quan, Tiền xử lý, Tập phổ biến & luật kết hợp, Reduct, Phân lớp Bayes,
  Phân lớp cây quyết định, Gom cụm, Đánh giá hiệu suất mô hình phân loại, Kohonen.
- Key concepts to look up (tra ở `kien-thuc-mon.md`, không diễn giải ở đây):
  Apriori, ID3 / Information Gain, Naive Bayes (MAP), k-means, Kohonen SOM, Rough set / Reduct,
  Confusion Matrix, Accuracy–Precision–Recall–F1, binning, min-max & z-score normalization.

## Còn treo — cần hỏi GV

1. Ngày thi tập trung chính xác của học kỳ hè.
2. Báo cáo nộp định dạng nào (`.doc` / `.docx` / `.pdf`), có yêu cầu font/lề/số trang không.
3. File thuyết trình nộp `.ppt` hay `.pptx`.
4. Video demo dài bao nhiêu, nộp file hay nộp link (YouTube/Drive), có giới hạn dung lượng không.
5. Nộp ở đâu — Drive lớp, e-learning, hay gửi trực tiếp cho thầy.
6. Có buổi báo cáo miệng / bảo vệ trước lớp không, hay chỉ nộp file. (Quyết định có chạy `/do-an bao-ve` hay không.)
7. Chương trình demo nộp thế nào: nộp source, nộp link deploy, hay cả hai.

## Ô trống bắt buộc user điền

Đề không có mẫu bìa, nhưng báo cáo vẫn cần trang bìa. Các trường chưa có dữ liệu trong repo:

| Trường | Giá trị hiện tại |
|---|---|
| Tên trường | `<<TÊN TRƯỜNG>>` |
| Khoa / trung tâm | `<<KHOA / TRUNG TÂM>>` |
| Lớp / mã lớp học phần | `<<LỚP>>` |
| Tên giảng viên | `<<TÊN GIẢNG VIÊN>>` — `subject.json` đang để `instructor: null` |
| Tên / số nhóm | `<<NHÓM SỐ>>` |
| Tên đề tài ghi trên bìa | `<<TÊN ĐỀ TÀI>>` — xem đề xuất ở `outline.md` |
