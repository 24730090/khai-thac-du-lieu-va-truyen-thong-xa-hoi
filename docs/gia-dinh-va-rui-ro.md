# Giả định và rủi ro

Cập nhật liên tục trong suốt đồ án, không phải file viết một lần rồi bỏ.

## Bảng giả định

Đồ án này ít số liệu doanh nghiệp, nhưng nhiều **giả định về đề** — vì đề không có rubric. Mỗi giả
định làm sai một quyết định lập kế hoạch thì tốn nhiều ngày, nên chúng nằm ở đây như số liệu.

| # | Giả định | Trị số | Nguồn | Ngày | Độ tin | Dùng ở |
|---|---|---|---|---|---|---|
| G1 | Ngày thi tập trung HK hè | **2026-10-01** | User xác nhận "đầu tháng 10/2026"; lấy **biên sớm** của khoảng 01–10/10 | 2026-09-09 | **ước lượng** | `outline.md § Lịch mốc`, `deliverables.yml` |
| G2 | "chương trình94 người cùng quay" nghĩa là "(4 người cùng quay" | 4 người | Suy từ lỗi gõ: nhóm có đúng 4 người, `(` và `9` cùng phím | 2026-09-09 | **ước lượng** | `rubric.md § T3` |
| G3 | Báo cáo nộp `.docx` (kèm `.pdf` cho chắc) | — | Đề chỉ viết "File báo cáo". Môn này bài tập trước nộp `.docx` | 2026-09-09 | **ước lượng** | `deliverables.yml` |
| G4 | Slide nộp `.pptx` | — | Đề viết "file.ppt"; `.pptx` là mặc định của Office hiện tại | 2026-09-09 | **ước lượng** | `deliverables.yml` |
| G5 | Số trang báo cáo nhắm 32 | 25–40 | Không có trong đề. Suy từ khối lượng 8 thuật toán và 4 người | 2026-09-09 | **ước lượng** | `rubric.md` #9 |
| G6 | Thời lượng video nhắm 10 phút | 8–12 | Không có trong đề. Suy từ 4 người × ~2,5 phút mỗi người | 2026-09-09 | **ước lượng** | `rubric.md` #7 |
| G7 | Nộp link Vercel được chấp nhận là "chương trình demo" | — | Đề không nói nộp source hay link. Nhóm nộp **cả hai** để không phải đoán | 2026-09-09 | **ước lượng** | `deliverables.yml` |
| G8 | Không có buổi báo cáo miệng | — | Đề không nhắc. **Nếu có thì phải chạy `/do-an bao-ve`** và lịch phải lùi thêm 2 ngày | 2026-09-09 | **ước lượng** | `outline.md` |
| G9 | 10 file slide ở `subject.json § kien_thuc.sources` là toàn bộ "thuật toán đã học trong môn" | 10 file | `subject.json`, cache `/kien-thuc` sinh 2026-07-09 | 2026-09-09 | công bố (nội bộ repo) | `outline.md § Features` |
| G10 | Ký pháp và cách trình bày bước trung gian theo slide thầy | — | `.claude/memory/ktdl-format-bai-giai-id3.md` — đã qua **nhận xét trực tiếp của GV** ngày 2026-08-18 | 2026-08-18 | **công bố** | `rubric.md § 2.4`, F2, F8 |

**Mọi dòng "ước lượng" ở trên đều biến mất được bằng một câu hỏi cho thầy.** Bảy câu ở
`brief.md § Còn treo` chính là danh sách ấy. Hỏi được thì hỏi sớm — G1 và G8 đổi cả lịch.

Giả định bị chứng minh sai giữa chừng thì sửa ở đây trước, rồi grep lại mọi chỗ đã dùng nó.

## Bảng rủi ro

| # | Rủi ro | Xác suất | Tác động | Dấu hiệu sớm | Phương án dự phòng |
|---|---|---|---|---|---|
| R1 | **Chưa có repo GitHub / tài khoản Vercel** nên F1 không đóng được | vừa | Chặn **cả ba người còn lại**, dịch toàn bộ lịch | Qua 2026-09-10 vẫn chưa có URL repo | Danh tạo repo cá nhân trước, mời 3 người vào sau; Vercel đăng nhập bằng chính GitHub đó |
| R2 | **F1–F3 trễ**, ba người kia không có nền để bắt đầu | vừa | Cao nhất — đây là đường găng thật | Qua 2026-09-13 chưa có route mẫu chạy trọn | Danh dừng F8 ID3, dồn hết vào F2/F3; ID3 chuyển cho T. Phúc, bù lại T. Phúc bỏ F11 Reduct |
| R3 | **Hẹn không đủ 4 người quay video** ngày 27/09 | vừa | Mất trắng dòng thứ ba của đề (T3) | Qua 2026-09-20 chưa chốt được giờ với cả 4 | Quay **ghép**: mỗi người tự quay phần mình có show mặt, dựng nối lại. Vẫn đủ "4 người, mỗi người nói một ít, show mặt" |
| R4 | **Thành viên rớt việc**, không xong thuật toán đúng hạn | vừa | Hụt ngưỡng #6 (8 thuật toán) | Im lặng >2 ngày, hoặc trễ mốc 17/09 | Cắt ngay thuật toán thứ hai của người đó theo thứ tự cắt ở `outline.md`; sàn 6 thuật toán vẫn đạt |
| R5 | **Phạm vi phình** — thêm thuật toán, thêm biểu đồ, thêm animation | cao | Ăn hết đệm, báo cáo không kịp | Xuất hiện route mới sau 22/09; PR có chữ "thêm cho đẹp" | Feature freeze 22/09 là **cứng**. Mọi thứ thêm phải ghi vào § Nhật ký đổi phạm vi kèm việc bị cắt |
| R6 | **Kết quả app lệch ví dụ trong slide** phát hiện muộn | vừa | Hỏng đúng thứ được chấm ở T2 | Không ai đối chiếu số cho tới lúc viết Chương 4 | Mốc kiểm chéo 24/09 là bắt buộc; mỗi thuật toán phải có ít nhất 1 test `vitest` so với ví dụ slide |
| R7 | **Vercel chết / hết hạn mức** đúng ngày nộp | thấp | T2 không mở được | Deploy fail, domain 404 | App là static, không dùng serverless. Dự phòng: nộp kèm bản build `dist/` và hướng dẫn chạy offline |
| R8 | **File `.pptx` / `.docx` bị đè** do hai người cùng dựng | vừa | Mất công của một người, không có báo lỗi | Git báo conflict trên file nhị phân | Luật cứng ở `phan-cong.md § Bản đồ đụng độ file`: chỉ phiên dựng cuối được dựng và commit sản phẩm |
| R9 | **Trang phân công đặt sai chỗ** hoặc tổng % không bằng 100 | thấp | Mất đúng thứ đề có dấu chấm than | Bản dựng đầu tiên không có trang đó | Chốt kiểm ở `/review-do-an` Tầng 1b; cộng lại % bằng máy tính, không nhẩm |
| R10 | **Máy không có Word** khi dựng `.docx` (bước COM của `finalize.ps1`) | thấp | Mục lục không cập nhật, số trang sai | Bộ dựng báo thiếu COM | Chạy `--no-word` rồi mở file bấm `Ctrl+A` `F9`. Xem `CLAUDE.md § Môi trường` |

## Danh sách cấm

Mỗi dòng là một thứ **không được xuất hiện** trong báo cáo / slide / app. Cột đầu phải là chuỗi
**grep được**, vì `/review-do-an` Tầng 1b dò từng dòng bằng grep.

| # | Không được dùng | Loại | Vì sao cấm | Dùng gì thay |
|---|---|---|---|---|
| C1 | `sklearn`, `scikit-learn`, `ml.js`, `tensorflow`, `mlpack` | thư viện | Đề đòi **cài đặt** thuật toán; gọi thư viện là bỏ mất chính thứ được chấm | Lõi tự cài trong `src/algorithms/` |
| C2 | `0,940` `0,694` `0,247` (dấu **phẩy** thập phân) | ký pháp | Môn này chốt **dấu chấm** thập phân, khác các môn khác trong repo | `0.940` `0.694` `0.247` |
| C3 | `Bước 5`, `Bước 6`, `Bước 7` trong mô tả k-means | sai thuật toán | k-means chỉ có **4 bước**, bước 4 quay lại bước 2 (slide Bài 6 trang 14). Chế thêm bước là tự khai chưa đọc slide | Tiêu đề đúng slide: "Tính lại trọng tâm", "Tính khoảng cách", "Ma trận phân hoạch U2" |
| C4 | `độ chính xác` dùng thay cho `Precision` | thuật ngữ lẫn | Slide Bài 7 dịch **Accuracy** = "Độ chính xác tổng thể", **Precision** = "Độ chính xác của dự đoán dương". Dùng lẫn là sai hai chỉ số khác nhau | Giữ nguyên tiếng Anh kèm chú thích Việt đúng slide |
| C5 | Số phần trăm phân công **khác** 28 / 25 / 24 / 23 | mâu thuẫn nội bộ | Ba chỗ khai % (file phân công, báo cáo, slide 18) lệch nhau là tự khai mâu thuẫn | Đổi thì đổi cả ba chỗ cùng lúc |
| C6 | Ảnh chụp màn hình có **URL `localhost`** | bằng chứng yếu | Đề đòi chương trình demo; ảnh `localhost` không chứng minh app đã lên mạng | Chụp trên URL Vercel thật |
| C7 | `Nhóm 5`, `nhóm 3` hay bất kỳ số nhóm nào chưa xác nhận | định danh bịa | Chưa ai xác nhận số nhóm; điền bừa lên bìa là sai định danh | `<<NHÓM SỐ>>` cho tới khi user điền |
| C8 | Tên trường / khoa / GV chưa xác nhận | định danh bịa | Tiểu luận LSĐ 08/2026 suýt nộp với tên trường do máy tự điền | Placeholder `<<…>>` chói mắt, để checker dò được |
| C9 | Ảnh minh hoạ **sinh bằng AI** trong Chương 3 và 4 | bằng chứng giả | Chương 4 phải là ảnh chụp app thật; sơ đồ kiến trúc phải khớp code thật | Ảnh chụp thật; sơ đồ vẽ tay bằng Mermaid / draw.io |

Điều cấm sinh ra ở đâu: mỗi lần kiểm chéo bắt được một số sai, mỗi lần soát thấy một chỗ bịa, mỗi
lần thầy chỉ ra một lỗi. **Ghi ngay lúc phát hiện**, đừng đợi tới lúc soát cuối.

## Nhật ký đổi phạm vi

Mọi thứ thêm vào sau khi `outline.md` chốt (2026-09-09) phải có một dòng ở đây. Sau feature freeze
**2026-09-22** thì thêm gì cũng phải kèm một việc bị cắt.

| Ngày | Thêm gì | Vì sao | Cắt gì để đổi lại |
|---|---|---|---|
| 2026-09-09 | *(chốt outline — chưa có thay đổi nào)* | — | — |
