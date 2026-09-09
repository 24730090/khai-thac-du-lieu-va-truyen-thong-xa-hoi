# Rubric bóc chi tiết — IE403 đồ án cuối kỳ

Nguồn: `brief/de-bai-paste-2026-09-09.md`.

> **Đề KHÔNG có rubric, KHÔNG có thang điểm, KHÔNG có trọng số.**
> Mọi con số dưới đây thuộc một trong hai loại, phân biệt bằng nhãn:
> - **[đề]** — có thật trong đề, chép nguyên văn, không được sửa.
> - **[suy đoán — cần hỏi GV]** — nhóm tự đặt để có cái mà nhắm. Không phải luật. Hỏi được thì hỏi.
>
> Đừng để nhãn `[suy đoán]` biến thành `[đề]` sau vài lần đọc lại — đó là cách một con số bịa
> trở thành một con số "ai cũng biết".

## Luật cho điểm

**Chưa rõ.** Đề không nêu thang điểm, không nêu luật làm tròn, không nêu luật trừ điểm.

**Hệ quả chiến lược khi không biết thang điểm:** không có căn cứ để dồn công vào một deliverable
nào. Đề liệt kê 4 thứ ngang hàng nhau bằng 4 dòng, nên mặc định coi 4 thứ **quan trọng như nhau**,
và ưu tiên **đủ 4 thứ ở mức khá** hơn là 1 thứ thật đẹp cộng 1 thứ thiếu. Cụ thể: một video 4 người
show mặt quay bằng điện thoại vẫn ăn trọn dòng thứ ba của đề, còn một app đẹp mà không có video
thì **mất trắng** dòng đó — dù công bỏ ra chênh nhau cả chục lần.

Tổng: `5` tiêu chí, thang **chưa rõ**.

---

## Bảng tiêu chí

| Mã | Tiêu chí | Điểm | Điều kiện ăn trọn điểm | Sản phẩm gánh |
|---|---|---:|---|---|
| T1 | File báo cáo | ? | Có đủ chương, **có trang phân công ngay sau mục lục**, tổng % = 100% | `report/` sinh ra `output/*.docx` |
| T2 | Chương trình demo | ? | App chạy được, **có giao diện**, cài đặt được các thuật toán **đã học trong môn** | repo `ktdl-demo` + URL Vercel |
| T3 | Video demo chương trình | ? | **Đủ 4/4 thành viên** show mặt và nói, quay trên chính chương trình demo | `video/` |
| T4 | File `.ppt` nội dung báo cáo | ? | Slide phủ nội dung báo cáo | `slide/` |
| T5 | Chọn đúng 1 trong 2 hướng | ? | Làm hướng 2 cho tới nơi, **không làm nửa vời cả hai hướng** | toàn bộ |

### T1 — File báo cáo

| Mã | Yêu cầu | Nguồn | Ghi chú |
|---|---|---|---|
| 1.1 | Có trang phân công công việc | **[đề]** | Đề có dấu chấm than ở cuối câu này |
| 1.2 | Trang phân công đặt **ngay sau mục lục** | **[đề]** | Vị trí là ràng buộc, không phải "có là được" |
| 1.3 | Mỗi thành viên có **số phần trăm** công việc đảm nhiệm | **[đề]** | Số, không phải mô tả bằng chữ |
| 1.4 | **Tổng % của các thành viên = 100%** | **[đề]** | Cộng lại phải đúng 100, không 99 không 101 |
| 1.5 | Có mục lục | **[đề, suy trực tiếp]** | Đề nói "sau mục lục" nên phải có mục lục |
| 1.6 | Có tài liệu tham khảo | `[suy đoán — cần hỏi GV]` | Tối thiểu: 10 file slide môn đang dùng |
| 1.7 | Có bìa, đủ tên và MSSV 4 thành viên | `[suy đoán — cần hỏi GV]` | Xem ô trống ở `brief.md` |

### T2 — Chương trình demo

| Mã | Yêu cầu | Nguồn | Ghi chú |
|---|---|---|---|
| 2.1 | **Có giao diện** | **[đề]** | Đề ghi trong ngoặc: "( có giao diện)" |
| 2.2 | Cài đặt các thuật toán **đã học trong môn** | **[đề]** | "đã học" = có trong 10 slide của `subject.json` |
| 2.3 | Số thuật toán cài đặt | `[suy đoán]` **≥ 6**, nhóm nhắm **8** | Đề viết số nhiều "các thuật toán"; xem ngưỡng #6 |
| 2.4 | Hiện **các bước trung gian** đúng khuôn slide thầy | `[suy đoán]` | Không phải yêu cầu của đề, nhưng là chỗ phân biệt "demo thuật toán" với "gọi thư viện". Xem § Chỗ dễ mất điểm oan |
| 2.5 | Tự cài thuật toán, **không gọi thư viện ML** | `[suy đoán]` | Đề nói "cài đặt demo các thuật toán"; gọi `sklearn` thì không còn là cài đặt |

### T3 — Video demo

| Mã | Yêu cầu | Nguồn | Ghi chú |
|---|---|---|---|
| 3.1 | Quay **chương trình demo** | **[đề]** | Không phải video quay slide |
| 3.2 | **4 người cùng quay** | **[đề]** | Xem đọc-hiểu lỗi gõ ở `brief.md` |
| 3.3 | **Mỗi người nói một ít** | **[đề]** | Không được một người nói hết |
| 3.4 | **Show mặt trên video** | **[đề]** | Có mặt người, không chỉ quay màn hình |
| 3.5 | Thời lượng | `[suy đoán — cần hỏi GV]` | Xem ngưỡng #7 |

### T4 — File `.ppt`

| Mã | Yêu cầu | Nguồn | Ghi chú |
|---|---|---|---|
| 4.1 | Soạn **nội dung báo cáo** | **[đề]** | Slide bám báo cáo, không phải một bộ nội dung khác |
| 4.2 | Số slide | `[suy đoán — cần hỏi GV]` | Xem ngưỡng #8 |
| 4.3 | Đuôi file `.ppt` hay `.pptx` | `[suy đoán — cần hỏi GV]` | Đề viết "file.ppt"; nộp `.pptx` là mặc định mềm |

---

## Ngưỡng số cứng — kiểm trước khi nộp

| # | Ngưỡng | Trị số | Nguồn | Ở tiêu chí | Đang có | Đạt? |
|---|---|---|---|---|---|---|
| 1 | **Tổng % phân công các thành viên** | `= 100` | **[đề]** | 1.4 | 100 (28+24+24+24) | ☐ |
| 2 | Số thành viên có % trong trang phân công | `= 4` | **[đề]** | 1.3 | 4 | ☐ |
| 3 | Vị trí trang phân công | `ngay sau mục lục` | **[đề]** | 1.2 | | ☐ |
| 4 | Số thành viên **show mặt và nói** trong video | `= 4 / 4` | **[đề]** | 3.2–3.4 | | ☐ |
| 5 | Số hướng đồ án được làm | `đúng 1` (hướng 2) | **[đề]** | T5 | 1 | ☐ |
| 6 | Số thuật toán cài trong app | `[suy đoán]` sàn `6` · **đích 8** | 2.3 | 0/8 | ☐ |
| 7 | Thời lượng video | `[suy đoán]` `8–12` phút · **đích 10** · trần mềm `11` | 3.5 | | ☐ |
| 8 | Số slide `.pptx` | `[suy đoán]` `18–25` · **đích 21** · trần mềm `24` | 4.2 | | ☐ |
| 9 | Số trang báo cáo | `[suy đoán]` `25–40` · **đích 32** · trần mềm `39` · sàn mềm `26` | T1 | | ☐ |
| 10 | Số nguồn tham khảo | `[suy đoán]` `>= 10` | 1.6 | 10 slide môn | ☐ |
| 11 | **Thời lượng nói** buổi báo cáo (nếu có) | `[suy đoán]` trần `15` phút · **đích 13,5** | T1–T4 | | ☐ |
| 12 | URL Vercel mở được từ máy lạ | `200 OK` | **[user]** | 2.1 | | ☐ |
| 13 | Repo GitHub có commit của **cả 4** tài khoản | `4 / 4` | **[user]** | T2 | | ☐ |

**Luật ngưỡng dạng khoảng** (áp cho #7, #8, #9, #11): đích nhắm là **giữa khoảng**, trần mềm là
**max trừ 1**, sàn mềm là **min cộng 1**. Chạm trần mềm là phải cắt, không được coi là xong. Lý do
với video và slide còn mạnh hơn với số trang: lần chạy thử đầu tiên thường **vượt khoảng 40 %**, và
khi đã hẹn được 4 người quay xong thì "cắt lại" nghĩa là hẹn lại cả nhóm.

**Phân bổ dung lượng theo tiêu chí** — báo cáo phải chia số trang tỉ lệ với 4 deliverable ngang
hàng, đừng dồn 60 % số trang vào chương lý thuyết chép từ slide. Bảng phân bổ dự kiến nằm ở
`outline.md § Ngân sách dung lượng`.

---

## Chỗ dễ mất điểm oan

Toàn hình thức và thủ tục — làm đúng thì có, quên thì mất trắng.

- [ ] Trang phân công nằm **sau mục lục**, không phải cuối báo cáo, không phải trong lời cảm ơn.
- [ ] Tổng % **cộng lại đúng 100**. Kiểm bằng máy tính, không nhẩm.
- [ ] % trong báo cáo **khớp** với `phan-cong.md` và với lịch sử commit thật trên GitHub. Lệch nhau là mâu thuẫn tự khai.
- [ ] Video có **đủ 4 mặt người**. Thiếu một người là hụt nguyên dòng thứ ba của đề.
- [ ] Video quay **màn hình chương trình đang chạy**, không phải quay slide nói về chương trình.
- [ ] App demo phải **hiện bước trung gian**. Bấm nút ra ngay đáp án cuối thì không nhìn ra được là "cài đặt thuật toán" hay "gọi thư viện" — và đây là môn mà thầy đã trực tiếp yêu cầu "từng bảng từng bảng ra" (xem `.claude/memory/ktdl-format-bai-giai-id3.md`).
- [ ] Ký pháp trong app và trong báo cáo **giống slide thầy**: `I(pi,ni)`, `E(A)`, `Gain(A)`, ma trận phân hoạch `U1`/`U2`, luật `R1: If (…) ∧ (…) Then …`. Đặt tên khác là tự làm khó người chấm.
- [ ] **Dấu thập phân là dấu chấm** (`0.940`), không phải dấu phẩy — chốt riêng của môn này.
- [ ] URL Vercel còn sống **vào ngày nộp**, mở được ở máy không đăng nhập.
- [ ] Repo GitHub để **public** hoặc đã mời thầy, không phải private im lặng.
- [ ] File `.pptx` mở được trên máy khác (không dùng font lạ chỉ có trên máy người soạn).
- [ ] Tên file nộp theo quy ước nhóm: `24730090_24730099_24730131_24730132.docx`.

---

## Ánh xạ tiêu chí sang mục outline

| Tiêu chí | Mục outline gánh | Trạng thái |
|---|---|---|
| T1 | `outline.md § Cấu trúc báo cáo` — Chương 1–5 cộng trang phân công | ☐ chưa viết |
| T2 | `outline.md § Features` — F1–F12 | ☐ chưa làm |
| T3 | `outline.md § Lịch mốc` — mốc 2026-09-27 🔒 | ☐ chưa quay |
| T4 | `outline.md § Cấu trúc slide` | ☐ chưa làm |
| T5 | Toàn bộ outline bám hướng 2 | ✓ đã chốt |

**Không có tiêu chí nào chưa mục nào gánh.**

---

## Còn treo — cần hỏi GV

Bảy câu ở `brief.md § Còn treo`. Ba câu đáng hỏi sớm nhất vì chúng đổi kế hoạch:

1. **Có buổi báo cáo miệng không** — quyết định có chạy `/do-an bao-ve` và ngưỡng #11.
2. **Video nộp file hay nộp link** — quyết định ngưỡng dung lượng của gói nộp.
3. **Chương trình demo nộp source hay link deploy** — quyết định `deliverables.yml § san_pham / chuong-trinh`.
