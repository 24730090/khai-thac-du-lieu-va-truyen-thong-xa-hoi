---
name: ktdl-format-bai-giai-id3
description: "Format trình bày bài giải môn Khai thác dữ liệu (IE403) theo slide GV: cột Attr/pi/ni/I(pi,ni), dấu chấm thập phân, mỗi thuộc tính một bảng, luật If ∧ Then, hình cây kiểu trang 65"
metadata:
  node_type: memory
  type: project
---

Chốt cách trình bày cho môn `khai-thac-du-lieu-va-truyen-thong-xa-hoi` (IE403), rút từ bài ID3 ngày 2026-08-18 sau ba vòng sửa, trong đó vòng cuối theo nhận xét trực tiếp của GV.

## Format bắt buộc cho bài tính Gain / cây quyết định

- Mở đầu theo slide trang 44: `Ta có S = 14, m = 2, C1 = "Yes", C2 = "No", S1 = 9, S2 = 5` rồi `I(S1,S2) = I(9,5) = … = 0.940`.
- Mỗi thuộc tính **một bảng riêng** 4 cột `<tên thuộc tính> | pi | ni | I(pi,ni)`, ngay dưới bảng là dòng `E(...) = 5/14*I(2,3) + … = 0.694` rồi dòng `Gain(...) = 0.940 - 0.694 = 0.247`.
- Nút con đặt tên theo slide: "Bảng con 1.1 (Outlook = Rainy)", gồm bảng dữ liệu con `Day | … | Play ball` rồi lặp đúng khuôn trên cho từng thuộc tính còn lại.
- Câu chuyển nguyên văn slide trang 69: "Dữ liệu ID3 sau khi tách nhánh theo thuộc tính X vì thuộc tính X có độ lợi lớn nhất."
- **Dấu thập phân là dấu chấm** (0.940, 0.694) — khác các môn khác trong repo đang dùng dấu phẩy.
- Luật viết theo trang 65: `R1: If (Outlook=Rainy) ∧ (Humidity=High) Then Play ball=No`, mỗi luật một dòng, không bảng.
- Hình cây vẽ theo trang 65: nút thuộc tính hộp **xanh lá chữ trắng**, giá trị thuộc tính hộp **xám** nằm trên nhánh, nút lá hộp **trắng viền đen**, mũi tên có đầu. Không dùng ellipse, không ghi danh sách mẫu dưới lá.

## Nhận xét gốc của GV (2026-08-18, qua chat)

"e tinh chỉnh cho đều chữ với mục nào ra mục đó đi e" — "từng bảng từng bảng ra" — "dồn chung thầy k biết e đang làm gì đâu".

Nghĩa là: đừng gộp 4 thuộc tính vào một bảng tổng hợp, và giữ một khuôn trình bày đều nhau từ đầu tới cuối bài.

## Artifact môn này

- Chỉ nộp DOCX, không cần PDF — nhưng **đây KHÔNG phải quy định của GV**, và đừng ghi vào brief như thể là vậy. Truy nguồn: bài 2026-07-21 và 07-22 xuất cả DOCX lẫn PDF; 2026-08-04 tự chuyển sang DOCX-only không có căn cứ từ đề; 2026-08-18 mới có căn cứ thật là "đề chỉ yêu cầu một file `.doc`" (chỉ đúng cho đề hôm đó), cộng lý do kỹ thuật là máy không có LibreOffice và Docker đang tắt nên không render PDF được. Đề nào không nói gì về định dạng thì đây là mặc định mềm, hỏi user một câu chứ đừng coi là luật.
- Tên file mặc định `Nguyễn Ngọc Danh - 24730090.docx`; đề nào ghi rõ "Tên sinh viên-mã số sinh viên" thì bỏ khoảng trắng quanh gạch nối, khai qua `output_filename.txt`.
- `header.md` 3 dòng Họ và tên / MSSV / Môn học, **phải kết thúc bằng một dòng trống** nếu không H1 bị dính vào đoạn header khi build.
- Slide gốc từng chương nên copy vào chính folder bài tập khi cần bám format.

## Format bắt buộc cho bài k-means (slide Bài 5 Clustering, trang 16-29)

Rút từ bài ngày 2026-08-25 sau khi user hỏi "viết chi tiết vậy có cần không".

- **Vòng lặp 1 viết đủ**, vòng lặp 2 trở đi thì không. Trang 18-21 khai trọn `v11 = (m11*x11 + m12*x21 + …)/(m11 + m12 + …)` rồi thay số rồi chốt "Vậy v1 = (1,3)". Nhưng trang 27 ("Tính lại trọng tâm") chỉ *liệt kê* `V1(1.27,3)`, `V2(3,1)` rồi sang ngay bảng khoảng cách. Dựng lại đủ công thức ở vòng 2 là làm nhiều hơn thầy làm, và cái "đều tăm tắp" đó chính là thứ đọc ra mùi máy.
- **Cụm một điểm không khai công thức.** Viết `(0*1 + 0*1 + 0*3 + 0*4 + 1*8)/(0+0+0+0+1)` cho cụm chỉ có một phần tử là điền số vô nghĩa; viết một câu "cụm 3 chỉ có A5 nên v3 = (8,2)".
- **Không chế "Bước 5, 6, 7".** Thuật toán chỉ có 4 bước và bước 4 quay lại bước 2 (trang 14). Từ vòng lặp thứ hai, đặt tên mục theo đúng tiêu đề slide: "Tính lại trọng tâm" (27), "Tính khoảng cách" (28), "Ma trận phân hoạch U2" (29).
- Ma trận phân hoạch mỗi cái một bảng riêng, dòng `c1/c2/c3`, cột là các điểm, ô 0/1. Có câu "Tăng n lên 1" trước bảng `U1`.
- Bảng khoảng cách cột `X | V1(toạ độ) | V2(toạ độ) | … | Cụm`, mỗi dòng ghi kèm toạ độ điểm `A1(1,9)`. Viết trọn phép căn Euclid cho **điểm đầu tiên** rồi mới gom phần còn lại vào bảng (trang 23-25).
- Câu kết đúng chữ slide: "Vì |U2 - U1| = 0 nên thuật toán hội tụ, dừng".
- Slide **không** vẽ hình phân bố điểm, **không** nhận xét chất lượng cụm sau khi hội tụ. Đừng thêm.

## Related

- [[feedback-baitap-bam-format-bai-giai-gv]] — nguyên tắc chung rút ra từ bài này.
- [[feedback-baitap-ve-hinh-that]] — cây quyết định phải là hình vẽ nhúng, không phải bullet list.
