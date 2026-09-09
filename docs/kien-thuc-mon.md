---
subject: khai-thac-du-lieu-va-truyen-thong-xa-hoi
generated_at: 2026-07-09 20:45
sources:
  - "Bai1_TongQuan_XuanHung_New.pdf"
  - "Bai1_2_TienXuLyDuLieu_Final-converted.pdf"
  - "Bai2_TapPhoBienVaLuatKetHop_Final.pdf"
  - "Bai3_Reduct.pdf"
  - "Bai5.1_PhanLop_Bayes.pdf"
  - "Bai5_PhanLop_CayQuyetDinh.pdf"
  - "Bai6_Gomcum_new.pdf"
  - "Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf"
  - "Bai7_PhanLop_Bayes.pdf"
  - "Bai8_Kohonen.pdf"
regenerate_command: /kien-thuc khai-thac-du-lieu-va-truyen-thong-xa-hoi
---

# Kiến thức môn: Khai thác dữ liệu và truyền thông xã hội

Nguồn: 10 slide PDF trong `references/`. Refresh bằng `/kien-thuc khai-thac-du-lieu-va-truyen-thong-xa-hoi` khi thầy upload thêm slide.

## Metadata

- **Mã môn:** IE403
- **Học kỳ:** HK3 2025-2026
- **GV chính:** chưa xác định (slide Bài 1 ghi Xuân Hưng)
- **Framework/khung lý thuyết chính:** Rough Set (Pawlak), Apriori, ID3 / C4.5 / CART (Decision Tree), Naive Bayes (+ Laplace smoothing), k-means, Kohonen SOM, Confusion Matrix (Accuracy/Precision/Recall/F1), KDD (Data → Info → Knowledge)

## 1. Định nghĩa formal (105 mục)

### Khai phá dữ liệu (KPDL) (Data mining)

- **Định nghĩa:** KPDL là một bước của tiến trình KDD.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 3, `Bai1_TongQuan_XuanHung_New.pdf` trang 4
- **Framework:** KDD
- **Confusion với:** KDD

### Khám phá tri thức trong cơ sở dữ liệu (Knowledge discovery in databases (KDD))

- **Định nghĩa:** Thuật ngữ tổng quát gồm các bước: Tiền xử lý, KPDL, Hậu xử lý.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 4
- **Framework:** KDD
- **Confusion với:** Data mining

### Dữ liệu (Data)

- **Định nghĩa:** Là sự diễn dịch những trường đơn lẻ ví dụ: Nguyễn Thị Hoa Mai, Sinh viên, ngành CNTT, môn CSDL.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 11
- **Framework:** Data - Information - Knowledge hierarchy
- **Confusion với:** Thông tin

### Thông tin (Information)

- **Định nghĩa:** Là mối liên hệ các thành phần của dữ liệu, Ví dụ: Nguyễn Thị Hoa Mai là sinh viên ngành công nghệ thông tin. Ngành công nghệ thông tin có môn CSDL.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 11
- **Framework:** Data - Information - Knowledge hierarchy
- **Confusion với:** Dữ liệu

### Tri thức (Knowledge)

- **Định nghĩa:** Là mối liên hệ của các thành phần thông tin, có hai cấp độ. Chỉ giới hạn một nhóm nhỏ thông tin. Ví dụ: Nguyễn Thị Hoa Mai là sinh viên ngành công nghệ thông tin nên phải học môn CSDL. Là những thông tin mang tính quy luật phổ biến. Ví dụ: Nếu X là sinh viên ngành CNTT thì X phải học môn CSDL.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 12
- **Framework:** Data - Information - Knowledge hierarchy
- **Confusion với:** Thông tin

### Khai thác dữ liệu (Data Mining (KTDL))

- **Định nghĩa:** Khai thác dữ liệu-Data Mining (KTDL) là tiến trình khám phá tri thức tiềm ẩn trong các CSDL. Cụ thể hơn, đó là tiến trình trích lọc, sản sinh những tri thức hoặc các mẫu tiềm ẩn, chưa biết nhưng hữu ích từ các CSDL lớn.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 14
- **Confusion với:** Khai thác thông tin truyền thống

### KTDL theo hướng kiểm tra (Verification-driven data mining)

- **Định nghĩa:** Đề xuất giả thiết và hệ thống kiểm tra tính đúng đắn của giả thuyết, KTDL theo hướng kiểm tra gồm: truy vấn, báo cáo, phân tích thống kê.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 15
- **Confusion với:** KTDL theo hướng khám phá

### KTDL theo hướng khám phá (Discovery-driven data mining)

- **Định nghĩa:** Tìm kiếm những tri thức tiềm ẩn trong CSDL.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 15
- **Confusion với:** KTDL theo hướng kiểm tra

### Phân lớp (Classification)

- **Định nghĩa:** Tìm các đặc trưng của lớp các đối tượng và sử dụng để phân lớp dữ liệu mới.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19, `Bai5_PhanLop_CayQuyetDinh.pdf` trang 3
- **Framework:** Các kỹ thuật khai thác dữ liệu
- **Confusion với:** Gom cụm

### Gom cụm (Clustering)

- **Định nghĩa:** Xác định các cụm tiềm ẩn trong các tập đối tượng chưa được xếp lớp.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19, `Bai1_TongQuan_XuanHung_New.pdf` trang 24, `Bai6_Gomcum_new.pdf` trang 2
- **Framework:** Các kỹ thuật khai thác dữ liệu
- **Confusion với:** Phân lớp

### Dự đoán (Prediction)

- **Định nghĩa:** Dự đoán dữ liệu tương lai dựa trên dữ liệu quá khứ.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19
- **Framework:** Các kỹ thuật khai thác dữ liệu

### Luật kết hợp (Association rules)

- **Định nghĩa:** Tìm các mẫu phổ biến từ dữ liệu và mối quan hệ của các đối tượng dữ liệu.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19, `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 5
- **Framework:** Các kỹ thuật khai thác dữ liệu
- **Confusion với:** Mẫu tuần tự

### Mẫu tuần tự (Sequential patterns)

- **Định nghĩa:** Khám phá các mẫu tín hiệu phổ biến nhất từ dữ liệu các sự kiện.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19
- **Framework:** Các kỹ thuật khai thác dữ liệu
- **Confusion với:** Luật kết hợp

### Nhà kho - OLAP

- **Định nghĩa:** Xác định trật tự dữ liệu, cấu trúc lưu trữ phù hợp với tác vụ khai phá.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 19
- **Framework:** Các kỹ thuật khai thác dữ liệu

### Tập phổ biến và luật kết hợp (Frequent itemsets and association rules)

- **Định nghĩa:** Tìm các thuộc tính xuất hiện phổ biến của các đối tượng dữ liệu. Từ tập phổ biến này ta tiến hành tạo ra các luật kết hợp nhằm phát hiện khả năng xuất hiện đồng thời của các thuộc tính trong tập các đối tượng.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 20

### Khai thác mẫu tuần tự (Sequential pattern mining)

- **Định nghĩa:** Khai thác các mẫu tuần tự phổ biến phản ánh mối quan hệ giữa các biến cố trong CSDL hướng thời gian. X → Y sự xuất hiện biến cố X sẽ dẫn đến sự xuất hiện của biến cố Y. Dùng để khám phá xu thế phát triển của đối tượng.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 21
- **Confusion với:** Luật kết hợp

### Phân lớp dữ liệu (Data classification)

- **Định nghĩa:** Khám phá các luật phân loại cho tập dữ liệu.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 23
- **Confusion với:** Gom cụm

### Tính hiện hành (currency/timeliness)

- **Định nghĩa:** giá trị được ghi nhận không bị lỗi thời.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 4
- **Framework:** Chất lượng dữ liệu (data quality)

### Tính toàn vẹn (completeness)

- **Định nghĩa:** tất cả các giá trị dành cho một biến/thuộc tính đều được ghi nhận.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 4
- **Framework:** Chất lượng dữ liệu (data quality)

### Tính nhất quán (consistency)

- **Định nghĩa:** tất cả giá trị dữ liệu đều được biểu diễn như nhau trong tất cả các trường hợp.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 4
- **Framework:** Chất lượng dữ liệu (data quality)

### Làm sạch dữ liệu (data cleaning/cleansing)

- **Định nghĩa:** loại bỏ nhiễu (remove noise), hiệu chỉnh những phần dữ liệu không nhất quán (correct inconsistency).
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 7
- **Framework:** Các kỹ thuật tiền xử lý dữ liệu

### Tích hợp dữ liệu (data integration)

- **Định nghĩa:** trộn dữ liệu (merge data) từ nhiều nguồn khác nhau vào một kho dữ liệu.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 7
- **Framework:** Các kỹ thuật tiền xử lý dữ liệu

### Biến đổi dữ liệu (data transformation)

- **Định nghĩa:** chuẩn hoá dữ liệu (data normalization).
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 7
- **Framework:** Các kỹ thuật tiền xử lý dữ liệu

### Thu giảm dữ liệu (data reduction)

- **Định nghĩa:** thu giảm kích thước dữ liệu (nghĩa là giảm số phần tử) bằng kết hợp dữ liệu (data aggregation), loại bỏ các đặc điểm dư thừa (redundant features) (nghĩa là giảm số chiều/thuộc tính dữ liệu), gom cụm dữ liệu.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 7
- **Framework:** Các kỹ thuật tiền xử lý dữ liệu

### Vấn đề nhận dạng thực thể (entity identification problem)

- **Định nghĩa:** Các thực thể (object/entity/attribute) đến từ nhiều nguồn dữ liệu. Hai hay nhiều thực thể khác nhau diễn tả cùng một thực thể thực.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 22
- **Framework:** Tích hợp dữ liệu

### Tích hợp lược đồ (schema integration)

- **Định nghĩa:** Ví dụ ở mức lược đồ (schema): customer_id trong nguồn S1 và cust_number trong nguồn S2.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 22
- **Framework:** Vấn đề nhận dạng thực thể
- **Confusion với:** So trùng đối tượng (object matching)

### So trùng đối tượng (object matching)

- **Định nghĩa:** Ví dụ ở mức thể hiện (instance): "R & D" trong nguồn S1 và "Research & Development" trong nguồn S2. "Male" và "Female" trong nguồn S1 và "Nam" và "Nữ" trong nguồn S2.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 22
- **Framework:** Vấn đề nhận dạng thực thể
- **Confusion với:** Tích hợp lược đồ (schema integration)

### Vấn đề dư thừa (redundancy)

- **Định nghĩa:** Hiện tượng: giá trị của một thuộc tính có thể được dẫn ra/tính từ một/nhiều thuộc tính khác, vấn đề trùng lắp dữ liệu (duplication). Nguyên nhân: tổ chức dữ liệu kém, không nhất quán trong việc đặt tên chiều/thuộc tính.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 23
- **Framework:** Tích hợp dữ liệu

### Phân tích tương quan (correlation analysis)

- **Định nghĩa:** Phát hiện dư thừa: Dựa trên dữ liệu hiện có, kiểm tra khả năng dẫn ra một thuộc tính B từ thuộc tính A. Đối với các thuộc tính số (numerical attributes), đánh giá tương quan giữa hai thuộc tính với các hệ số tương quan (correlation coefficient, aka Pearson's product moment coefficient). Đối với các thuộc tính rời rạc (categorical/discrete attributes), đánh giá tương quan giữa hai thuộc tính với phép kiểm thử chi-bình phương (chi-square).
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 23
- **Framework:** Phát hiện dư thừa

### Hệ số tương quan Pearson

- **Định nghĩa:** r = (xy_bar - x_bar*y_bar) / (σx * σy) = b1 * (σx/σy). r = 0: hai thuộc tính độc lập. r tương quan thuận với nhau (trị số của x tăng thì trị số của y tăng): trị càng lớn thì mức độ tương quan càng cao, một thuộc tính có thể được loại bỏ (dư thừa). r tương quan nghịch với nhau: hai thuộc tính loại trừ lẫn nhau.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 24
- **Framework:** Phân tích tương quan giữa hai thuộc tính số

### Vấn đề mâu thuẫn giá trị dữ liệu (data value conflicts)

- **Định nghĩa:** Cùng một thực thể thật, các giá trị thuộc tính đến từ các nguồn dữ liệu khác nhau có thể khác nhau về cách biểu diễn, đo lường. Representation: "2004/12/25" với "25/12/2004". Thuộc tính về hệ thống đo lường với các đơn vị đo khác nhau, thuộc tính về hệ thống tiền tệ với các đơn vị tiền tệ khác nhau. Encoding: "yes" và "no" với "1" và "0".
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 30
- **Framework:** Tích hợp dữ liệu

### Chuẩn hoá min-max (min-max normalization)

- **Định nghĩa:** v' = ((v - min_A) / (max_A - min_A)) * (new_max_A - new_min_A) + new_min_A. Trị cũ v ∈ [min_A, max_A], trị mới v' ∈ [new_min_A, new_max_A]. Ví dụ: chuẩn hoá điểm số từ khoảng [0,10] về [0,1].
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 36
- **Framework:** Biến đổi dữ liệu - Chuẩn hoá dữ liệu
- **Confusion với:** Chuẩn hoá z-score

### Chuẩn hoá z-score

- **Định nghĩa:** v' = (v - A_bar) / σ_A. Trị cũ v tương ứng với trung bình A_bar và độ lệch tiêu chuẩn σ_A. Đặc điểm của chuẩn z-score.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 37
- **Framework:** Biến đổi dữ liệu - Chuẩn hoá dữ liệu
- **Confusion với:** Chuẩn hoá min-max

### Thu giảm chiều (dimensionality reduction)

- **Định nghĩa:** Giảm kích thước tập dữ liệu bằng việc loại bỏ những thuộc tính/chiều/đặc trưng (attribute/dimension/feature) dư thừa/không thích hợp (redundant/irrelevant). Mục tiêu: tập ít các thuộc tính nhất vẫn đảm bảo phân bố xác suất (probability distribution) của các lớp dữ liệu đạt được gần với phân bố xác suất ban đầu với tất cả các thuộc tính.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 41
- **Framework:** Thu giảm dữ liệu
- **Confusion với:** Thu giảm lượng (numerosity reduction)

### Thu giảm lượng (numerosity reduction)

- **Định nghĩa:** Các kỹ thuật giảm lượng dữ liệu bằng các dạng biểu diễn dữ liệu thay thế. Các phương pháp có tham số (dùng mô hình để ước lượng dữ liệu, chỉ tham số được lưu trữ thay cho dữ liệu thật, ví dụ Hồi quy). Các phương pháp không tham số (lưu trữ các biểu diễn thu giảm của dữ liệu).
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 43
- **Framework:** Thu giảm dữ liệu
- **Confusion với:** Thu giảm chiều (dimensionality reduction)

### Rời rạc hoá dữ liệu (discretization)

- **Định nghĩa:** Giảm số lượng giá trị của một thuộc tính liên tục (continuous attribute) bằng các chia miền trị thuộc tính thành các khoảng (intervals). Các nhãn (labels) được gán cho các khoảng (intervals) này và được dùng thay giá trị thực của thuộc tính. Các trị thuộc tính có thể được phân hoạch theo một phân cấp (hierarchical) hay ở nhiều mức phân giải khác nhau.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 44
- **Framework:** Rời rạc hoá dữ liệu

### Tạo cây phân cấp ý niệm (concept hierarchy generation)

- **Định nghĩa:** Hỗ trợ khai thác dữ liệu ở mức trừu tượng. Rời rạc hoá dữ liệu hữu dụng cho việc tạo cây phân cấp ý niệm.
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 45
- **Framework:** Rời rạc hoá và cây phân cấp ý niệm

### Vế trái (tiền đề) (Antecedent (LHS))

- **Định nghĩa:** Trong luật Khăn ⇒ bia [0.5%, 60%], Khăn là vế trái.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 6
- **Framework:** Association Rule

### Mệnh đề kết quả (vế phải) (Consequent (RHS))

- **Định nghĩa:** Trong luật Khăn ⇒ bia [0.5%, 60%], Bia là mệnh đề kết quả.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 6
- **Framework:** Association Rule

### Support (Độ phổ biến / độ hỗ trợ)

- **Định nghĩa:** Support tầng số ('trong bao nhiêu phần trăm dữ liệu thì những điều ở vế trái và vế phải cùng xảy ra'). Ký hiệu SP(S)=|ρ(S)| / |O|, với ρ(S) biểu diễn tập các hóa đơn có chung tất cả các mặt hàng trong S.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 6
- **Framework:** Association Rule Metrics
- **Confusion với:** Confidence

### Confidence (Độ tin cậy / độ mạnh)

- **Định nghĩa:** Confidence, độ mạnh ('nếu vế trái xảy ra thì có bao nhiêu khả năng vế phải xảy ra'). CF(X→Y)=SP(S)/SP(X), với S=X∪Y. Luật kết hợp hợp lệ là những luật có CF >= minconf.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 6
- **Framework:** Association Rule Metrics
- **Confusion với:** Support

### Ngữ cảnh khai thác dữ liệu (Data mining context)

- **Định nghĩa:** Cho ngữ cảnh khai thác dữ liệu: O: Tập hữu hạn khác rỗng các hóa đơn. I: Tập hữu hạn khác rỗng các mặt hàng. R: Quan hệ hai ngôi giữa O và I với o∈O và i∈I, (o,i)∈R ⇔ hóa đơn o có chứa mặt hàng i. Ngữ cảnh KTDL là bộ ba (O,I,R).
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 7
- **Framework:** KTDL Context

### Độ phổ biến của tập mặt hàng (Support of itemset)

- **Định nghĩa:** Cho ngữ cảnh KTDL (O,I,R) và S ⊂ I. Độ phổ biến của S được định nghĩa là tỉ số giữa số các hóa đơn có chứa S và số lượng hoá đơn trong O. Ký hiệu: SP(S)=|ρ(S)| / |O|. ρ(S) biểu diễn tập các hóa đơn có chung tất cả các mặt hàng trong S.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 9
- **Framework:** Support metric

### Tập phổ biến (Frequent itemset)

- **Định nghĩa:** Là những tập có độ phổ biến lớn hơn hoặc bằng 1 ngưỡng cho trước là minsupp.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 10
- **Framework:** Apriori
- **Confusion với:** Tập phổ biến tối đại

### Tập phổ biến tối đại (Maximal frequent itemset)

- **Định nghĩa:** FS(O,I,R,minsupp) là tập phổ biến. M được gọi là tập phổ biến tối đại nếu không tồn tại S∈FS(O,I,R,minsupp), M≠S, M⊂S. Trong ví dụ trên tập phổ biến tối đại là: {i1,i2,i3}, {i2,i3,i4}.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 18
- **Framework:** Maximal frequent itemset
- **Confusion với:** Tập phổ biến (thường)

### Độ tin cậy của luật (Confidence of rule)

- **Định nghĩa:** Độ tin cậy của luật kết hợp X→Y. Ký hiệu CF(X→Y). CF(X→Y)=SP(S)/SP(X). S=X∪Y. Luật kết hợp hợp lệ là những luật có CF >= minconf.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 19
- **Framework:** Association Rule Metrics

### Vector biểu diễn tập mặt hàng

- **Định nghĩa:** Cho ma trận M là ma trận biểu diễn ngữ cảnh khai thác dữ liệu (O,I,R). Gọi m=|O| và cho tập mặt hàng S ⊂ I, vector biểu diễn tập mặt hàng S ký hiệu là v(S) là vector nhị phân có m thành phần, thành phần thứ i của vector v(S) có trị 1 nếu hóa đơn oi có chứa tất cả các mặt hàng trong S, hoặc giá trị của các phần tử nằm trên dòng i và trên các cột ứng với các mặt hàng trong S đều có giá trị 1, ngược sẽ có trị 0.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 24
- **Framework:** Vector-based Apriori

### Tích vector biểu diễn (Product of representation vectors)

- **Định nghĩa:** Cho S⊂I và T⊂I, gọi v(S)=(s1,...,sm) và v(T)=(t1,...,tm) lần lượt là các vector biểu diễn của S và T. Tích vector biểu diễn của v(S) và v(T) ký hiệu là ⊗ là vector biểu diễn v(Z)=(z1,...,zm) với zk=min(sk, tk), k=1,...,m.
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 26
- **Framework:** Vector-based Apriori

### Độ phổ biến của vector biểu diễn

- **Định nghĩa:** Cho S⊆I, độ phổ biến của vector biểu diễn v(S) được ký hiệu là SPV(v(S)) là tỉ số giữa số thành phần khác 0 trong v(S) và số thành phần của v(S) hay số dòng của ma trận biểu diễn ngữ cảnh khai thác dữ liệu. SPV(v(S)) = SP(S).
- **Nguồn:** `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 27
- **Framework:** Vector-based Apriori

### Hệ thông tin (Information System (IS))

- **Định nghĩa:** IS là cặp (U, A). U là tập khác rỗng các đối tượng. A là tập hữu hạn các thuộc tính sao cho với mọi a ∈ A, a: U → Va. Va được gọi là tập trị của a.
- **Nguồn:** `Bai3_Reduct.pdf` trang 5
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Hệ quyết định (Decision system)

### Hệ quyết định (Decision System (DS))

- **Định nghĩa:** DS: (U, A ∪ {d}). d ∉ A là thuộc tính quyết định (có thể có nhiều thuộc tính quyết định). Các phần tử của A được gọi là thuộc tính điều kiện.
- **Nguồn:** `Bai3_Reduct.pdf` trang 6
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Hệ thông tin

### Quan hệ bất khả phân biệt (B-indiscernibility relation)

- **Định nghĩa:** Cho IS = (U, A) là hệ thông tin, với tập B ⊆ A. Có quan hệ tương đương tương ứng: IND_IS(B) = {(x, x') ∈ U² | ∀a ∈ B, a(x) = a(x')}. IND_IS(B) được gọi là quan hệ bất khả phân theo B (B-indiscernibility relation). Nếu (x, x') ∈ IND_IS(B), thì các đối tượng x và x' là không thể phân biệt nhau qua tập thuộc tính B.
- **Nguồn:** `Bai3_Reduct.pdf` trang 9
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Quan hệ tương đương thông thường

### Xấp xỉ B-dưới (B-lower approximation)

- **Định nghĩa:** Gọi T = (U, A) và B ⊆ A và X ⊆ U. Xấp xỉ B-dưới của X: BX = {x | [x]_B ⊆ X}. Các đối tượng trong BX chắc chắn được phân lớp như là các thành viên của tập X.
- **Nguồn:** `Bai3_Reduct.pdf` trang 14
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Xấp xỉ B-trên

### Xấp xỉ B-trên (B-upper approximation)

- **Định nghĩa:** Gọi T = (U, A) và B ⊆ A và X ⊆ U. Xấp xỉ B-trên của X: BX (overline) = {x | [x]_B ∩ X ≠ ∅}. Các đối tượng trong xấp xỉ B-trên chỉ có thể phân lớp là các đối tượng dương tính.
- **Nguồn:** `Bai3_Reduct.pdf` trang 14
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Xấp xỉ B-dưới

### Tập thô (rough)

- **Định nghĩa:** Một tập được gọi là thô (rough) nếu vùng biên của nó khác rỗng, ngược lại tập là rõ.
- **Nguồn:** `Bai1_TongQuan_XuanHung_New.pdf` trang 22, `Bai3_Reduct.pdf` trang 15
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Tập rõ (crisp set)

### Vùng B-biên của X (B-boundary region)

- **Định nghĩa:** BN_B(X) = BX(overline) − BX(underline). Chứa các đối tượng không thể phân lớp chắc chắn vào X theo B.
- **Nguồn:** `Bai3_Reduct.pdf` trang 15
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Vùng B-ngoài

### Vùng B-ngoài của X (B-outside region)

- **Định nghĩa:** U − BX(overline). Chứa các đối tượng chắn chắn được phân lớp không thuộc về X.
- **Nguồn:** `Bai3_Reduct.pdf` trang 15
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Vùng B-biên

### Độ chính xác của tập thô (Accuracy of rough set)

- **Định nghĩa:** α_B(X) = |B(X)underline| / |B(X)overline|. Với |X| là lực lượng của X ≠ ∅. Rõ ràng 0 ≤ α_B ≤ 1. Nếu α_B(X) = 1, X là rõ so với B. Nếu α_B(X) < 1, X là thô so với B.
- **Nguồn:** `Bai3_Reduct.pdf` trang 19
- **Framework:** Rough set (Pawlak)

### Rút gọn (Reduct)

- **Định nghĩa:** Chỉ giữ lại các thuộc tính bảo toàn quan hệ bất khả phân biệt và hệ quả là bảo toàn xấp xỉ tập hợp. Thường có nhiều tập con như thế và tập con nhỏ nhất được gọi là rút gọn (reducts).
- **Nguồn:** `Bai3_Reduct.pdf` trang 21
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Core

### Ma trận phân biệt (Discernibility matrix)

- **Định nghĩa:** Cho IS = (U, A) là 1 hệ thông tin, ma trận phân biệt của S là 1 ma trận n×n (n là số đối tượng), với c_ij được tính bởi công thức: c_ij = { a ∈ A | a(x_i) ≠ a(x_j) } với i, j = 1,..,n
- **Nguồn:** `Bai3_Reduct.pdf` trang 23
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Hàm phân biệt

### Hàm phân biệt (Discernibility function)

- **Định nghĩa:** f_IS(a_1, ..., a_m) = trong đó c_ij = { a | a ∈ c_ij }. Tập các đơn thức của f_IS xác định tập các rút gọn của IS.
- **Nguồn:** `Bai3_Reduct.pdf` trang 24
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Ma trận phân biệt

### Phụ thuộc thuộc tính (Attribute dependency)

- **Định nghĩa:** Tập thuộc tính D phụ thuộc hoàn toàn vào tập thuộc tính C, ký hiệu là C ⇒ D, nếu tất cả các thuộc tính của D đều được xác định duy nhất bởi giá trị của các thuộc tính trong C. Công thức tính: k = γ(C, D) = Σ_{X ∈ U/D} |C(X)underline| / |U|. Nếu k = 1 thì D phụ thuộc hoàn toàn vào C. Nếu k < 1 thì D phụ thuộc một phần (theo mức độ k) vào C.
- **Nguồn:** `Bai3_Reduct.pdf` trang 29
- **Framework:** Rough set (Pawlak)
- **Confusion với:** Phụ thuộc hàm trong CSDL quan hệ

### Phân lớp bằng Bayes (Bayesian classification)

- **Định nghĩa:** Dự đoán xác suất là thành viên của 1 lớp cho mẫu mới. Nền tảng: dựa vào định lý Bayes. Cho X, Y là các biến bất kì; dự đoán Y từ X. Lượng giá các tham số của P(X|Y), P(Y) trực tiếp từ tập dữ liệu huấn luyện.
- **Nguồn:** `Bai5.1_PhanLop_Bayes.pdf` trang 4, `Bai7_PhanLop_Bayes.pdf` trang 4
- **Framework:** Naive Bayes

### Xác suất a-posteriori (hậu nghiệm)

- **Định nghĩa:** Bài toán phân lớp có thể hình thức hóa bằng xác suất a-posteriori: P(C|X) = xác suất mẫu X=<x1,…,xk> thuộc về lớp C. Ví dụ: P(class=N | outlook=sunny, windy=true,…). Ý tưởng: Gán cho mẫu X nhãn phân lớp là C sao cho P(C|X) là lớn nhất.
- **Nguồn:** `Bai5.1_PhanLop_Bayes.pdf` trang 5, `Bai7_PhanLop_Bayes.pdf` trang 5
- **Framework:** Naive Bayes
- **Confusion với:** xác suất a-priori (tiên nghiệm) P(C)

### Định lý Bayes

- **Định nghĩa:** P(y|x) = (P(x|y) · P(y)) / P(x). Cụ thể: P(Y=yi | X=xj) = (P(X=xj | Y=yi) · P(Y=yi)) / P(X=xj). Y = biến bất kỳ, yi = giá trị thứ i.
- **Nguồn:** `Bai5.1_PhanLop_Bayes.pdf` trang 6, `Bai7_PhanLop_Bayes.pdf` trang 6
- **Framework:** Bayes

### Ưu điểm - Nhược điểm Naive Bayes (Advantages / Disadvantages)

- **Định nghĩa:** Ưu điểm: Dễ dàng cài đặt; Thời gian thi hành tương tự như cây quyết định; Đạt kết quả tốt trong phần lớn các trường hợp. Nhược điểm: Giả thiết về tính độc lập điều kiện của các thuộc tính làm giảm độ chính xác.
- **Nguồn:** `Bai5.1_PhanLop_Bayes.pdf` trang 18
- **Framework:** Naive Bayes

### Làm trơn Laplace

- **Định nghĩa:** Để tránh trường hợp P(Xk|Ci)=0, áp dụng công thức Laplace: P(Ci) = (|Ci,D| + 1) / (|D| + m); P(Xk|Ci) = (# Ci,D{xk} + 1) / (|Ci,D| + r). Với m: số phân lớp; r: số giá trị rời rạc của thuộc tính.
- **Nguồn:** `Bai5.1_PhanLop_Bayes.pdf` trang 24
- **Framework:** Naive Bayes - Laplace smoothing

### Tập huấn luyện (Training set)

- **Định nghĩa:** Tập các bộ/mẫu dữ liệu huấn luyện - tập huấn luyện - được dùng để xây dựng mô hình
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 7
- **Framework:** Bước 1 - Xây dựng mô hình
- **Confusion với:** Tập kiểm tra (test set) dùng để đánh giá độ chính xác

### Thuộc tính gán nhãn lớp (Class label attribute)

- **Định nghĩa:** Lớp của một bộ/mẫu dữ liệu được xác định bởi thuộc tính gán nhãn lớp
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 7
- **Framework:** Xây dựng mô hình

### Cây quyết định (Decision tree)

- **Định nghĩa:** Cây quyết định là một kiểu mô hình dự báo. Kỹ thuật học máy dùng trong cây quyết định được gọi là học bằng cây quyết định. Phương tiện có tính mô tả dành cho việc tính toán các xác suất có điều kiện. Sự kết hợp của các kỹ thuật toán học và tính toán nhằm hỗ trợ việc mô tả, phân loại và tổng quát hóa một tập dữ liệu cho trước
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 14, `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 2
- **Framework:** Học có giám sát
- **Confusion với:** Mạng Bayes

### Cấu trúc cây quyết định (Decision tree structure)

- **Định nghĩa:** Cây quyết định là một cấu trúc phân cấp của các nút và các nhánh. 3 loại nút trên cây: Nút gốc; Nút nội bộ: mang tên thuộc tính của CSDL; Nút lá: mang tên lớp Ci. Nhánh: mang giá trị có thể của thuộc tính. Cây quyết định được sử dụng trong phân lớp bằng cách duyệt từ nút gốc của cây cho đến khi đụng đến nút lá, từ đó rút ra lớp của đối tượng cần xét
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 15
- **Framework:** Cấu trúc cây

### Điều kiện dừng xây dựng cây (Stopping criteria)

- **Định nghĩa:** Tất cả các mẫu rơi vào một nút thuộc về cùng một lớp (nút lá); Không còn thuộc tính nào có thể dùng để phân chia mẫu nữa; Không còn lại mẫu nào tại nút
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 26
- **Framework:** Xây dựng cây

### Chỉ số Gini

- **Định nghĩa:** Giả sử tất cả các thuộc tính dạng số. Giả sử tồn tại một vài giá trị có thể phân chia giá trị của từng thuộc tính. Có thể biến đổi để áp dụng cho thuộc tính phi số. Thuộc tính có giá trị chỉ mục Gini nhỏ nhất sẽ được chọn để phân nhánh. Gini(D) = 1 - Σ pi^2. GiniAttr(D) = Σ (|Sv|/|D|) * Gini(Sv)
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 39
- **Framework:** CART
- **Confusion với:** Information Gain (chọn max, không min)

### Entropy (thông tin cần biết để phân lớp một mẫu)

- **Định nghĩa:** I(s1, s2, ..., sm) = -Σ (si/s) * log2(si/s), với i từ 1 đến m. S: số lượng tập huấn luyện; Si: số các mẫu của S nằm trong lớp Ci với i = {1, ..., m}
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 40
- **Framework:** ID3

### Entropy hai lớp

- **Định nghĩa:** Cho P và N là hai lớp và S là một tập dữ liệu có p phần tử lớp P và n phần tử lớp N. Khối lượng thông tin cần thiết để quyết định một mẫu tùy ý có thuộc về lớp P hay N hay không là: I(p,n) = -(p/(p+n))*log2(p/(p+n)) - (n/(p+n))*log2(n/(p+n))
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 41
- **Framework:** ID3

### Độ lợi thông tin (Information Gain)

- **Định nghĩa:** G(A) = I(s1, s2, ..., sm) - E(A). Tại mỗi cấp, chúng ta chọn thuộc tính có độ lợi lớn nhất để phân nhánh cây hiện tại. Giả sử tất cả các thuộc tính dạng phi số. Có thể biến đổi để áp dụng cho thuộc tính số
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 42
- **Framework:** ID3
- **Confusion với:** Gini index (chọn giá trị nhỏ nhất, không phải lớn nhất)

### Entropy của thuộc tính

- **Định nghĩa:** Thuộc tính A có các giá trị {a1, a2, ..., an}. Dùng thuộc tính A để phân chia tập huấn luyện thành n tập con {S1, S2, ..., Sn}. Sij: số mẫu của lớp Ci thuộc tập con Sj (A=aj). E(A) = Σ ((s1j + ... + smj)/s) * I(s1j, ..., smj), với j từ 1 đến n
- **Nguồn:** `Bai5_PhanLop_CayQuyetDinh.pdf` trang 42
- **Framework:** ID3

### Mục tiêu của gom cụm (Goal of clustering)

- **Định nghĩa:** Mục tiêu của gom cụm: để gom tập các đối tượng thành các nhóm
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 2
- **Framework:** Clustering

### Gom cụm tốt (Good clustering)

- **Định nghĩa:** Một phương pháp tốt sẽ tạo ra các cụm có chất lượng cao với: Tương tự cao cho trong lớp (intra-class). Tương tự thấp giữa các lớp (inter-class). Chất lượng của kết quả gom cụm phụ thuộc vào: độ đo tương tự sử dụng; Cài đặt độ đo tương tự. Chất lượng của phương pháp gom cụm cũng được đo bởi khả năng phát hiện vài hay tất cả các mẫu bị che (hidden patterns).
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 7
- **Framework:** Clustering quality

### Độ đo khoảng cách - điều kiện lý tưởng (Distance metric axioms)

- **Định nghĩa:** Tương tự/Bất tương tự giữa đối tượng thường được biểu diễn qua độ đo khoảng cách d(x,y). Lý tưởng, mọi độ đo khoảng cách phải là một và phải thỏa các điều kiện sau: d(x,y) >=0; d(x,y) = 0 if x=y; d(x,y)=d(y,x); d(x,z)<=(x,y) + d(y,z)
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 10
- **Framework:** Distance metric

### Chuẩn hóa dữ liệu (z-score)

- **Định nghĩa:** Chuẩn hóa các độ đo: Tính sai biệt tuyệt đối trung bình sf = (1/n)(|x1f - mf| + |x2f - mf| + ... + |xnf - mf|) với mf = (1/n)(x1f + x2f + ... + xnf), và Tính độ đo chuẩn (z-score) zif = (xif - mf)/sf
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 12
- **Framework:** Data preprocessing

### Khoảng cách Minkowski

- **Định nghĩa:** Một nhóm các độ đo khoảng cách phổ biến cho biến tỉ lệ theo khoảng là khoảng cách Minkowski. d(i,j) = q-căn(|xi1-xj1|^q + |xi2-xj2|^q + ... + |xip-xjp|^q) với i = (xi1, xi2, ..., xip) và j = (xj1, xj2, ..., xjp) là các đối tượng dữ liệu p-chiều và q là số nguyên dương
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 13
- **Framework:** Distance metric

### Khoảng cách Manhattan

- **Định nghĩa:** Nếu q = 1, độ đo khoảng cách là Manhattan (or city block). d(i,j) = |xi1-xj1| + |xi2-xj2| + ... + |xip-xjp|
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 14
- **Framework:** Distance metric
- **Confusion với:** Euclidean (q=2)

### Khoảng cách Euclidean

- **Định nghĩa:** Nếu q = 2, độ đo khoảng cách là khoảng cách Euclidean. d(i,j) = căn(|xi1-xj1|^2 + |xi2-xj2|^2 + ... + |xip-xjp|^2)
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 14
- **Framework:** Distance metric
- **Confusion với:** Manhattan (q=1)

### Thuật toán gom cụm k-mean (k-means clustering algorithm)

- **Định nghĩa:** Cho k là số cụm sau khi phân hoạch, với n là số điểm (đối tượng) trong không gian dữ liệu. Thuật toán k-means gồm 4 bước: (1) Chọn ngẫu nhiên k điểm làm trọng tâm ban đầu của k cụm. (2) Gán (hoặc gán lại) từng điểm vào cụm có trọng tâm gần điểm đang xét nhất. (3) Nếu không có phép gán lại nào thì dừng. Vì không có phép gán lại nào có nghĩa là các cụm đã ổn định và thuật toán không thể cải thiện làm giảm độ phân biệt hơn được nữa. (4) Tính lại trọng tâm cho từng cụm. Quay lại bước 2.
- **Nguồn:** `Bai6_Gomcum_new.pdf` trang 15
- **Framework:** k-means
- **Confusion với:** k-medoids, PAM

### Hồi quy Logistic

- **Định nghĩa:** Phân loại nhị phân
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 2
- **Framework:** Mô hình phân loại

### Rừng ngẫu nhiên (Random Forest)

- **Định nghĩa:** Huấn luyện nhiều cây quyết định khác nhau trên các tập dữ liệu con (subsets) được chọn ngẫu nhiên từ dữ liệu gốc
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 2
- **Framework:** Mô hình phân loại
- **Confusion với:** Decision Tree

### Dương tính thật (True Positive (TP))

- **Định nghĩa:** Dự đoán đúng người bị cao huyết áp (mẫu thực tế là dương và được dự đoán là dương)
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6
- **Framework:** Confusion Matrix
- **Confusion với:** FP

### Âm tính giả (False Negative (FN))

- **Định nghĩa:** Dự đoán nhầm người bị thành bình thường (mẫu thực tế là dương nhưng được dự đoán là âm)
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6
- **Framework:** Confusion Matrix
- **Confusion với:** TN

### Dương tính giả (False Positive (FP))

- **Định nghĩa:** Dự đoán nhầm người bình thường thành bị cao huyết áp (mẫu thực tế là âm nhưng được dự đoán là dương)
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6
- **Framework:** Confusion Matrix
- **Confusion với:** TP

### Âm tính thật (True Negative (TN))

- **Định nghĩa:** Dự đoán đúng người bình thường (mẫu thực tế là âm và được dự đoán là âm)
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6
- **Framework:** Confusion Matrix
- **Confusion với:** FN

### Ma trận nhầm lẫn (Confusion Matrix)

- **Định nghĩa:** Ma trận phân biệt gồm 4 ô: TP, FN, FP, TN dùng để đánh giá hiệu suất của mô hình phân loại
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6
- **Framework:** Confusion Matrix

### Độ chính xác tổng thể (Accuracy)

- **Định nghĩa:** Tỉ lệ dự đoán đúng trên toàn bộ dữ liệu. Công thức: (TP + TN) / (TP + TN + FP + FN). Lưu ý: Dễ gây hiểu lầm với dữ liệu không cân bằng
- **Nguồn:** `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 4, `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 7
- **Framework:** Chỉ số đánh giá mô hình
- **Confusion với:** Precision

### Độ chính xác dương (Precision)

- **Định nghĩa:** Trong các mẫu được dự đoán là dương, có bao nhiêu là đúng? Công thức: TP / (TP + FP). Ứng dụng: Khi cần hạn chế báo động giả, ví dụ: chẩn đoán ung thư, hệ thống cảnh báo
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 8
- **Framework:** Chỉ số đánh giá mô hình
- **Confusion với:** Recall, Accuracy

### Độ nhạy (Recall)

- **Định nghĩa:** Trong các mẫu thật sự dương, có bao nhiêu được phát hiện đúng? Công thức: TP / (TP + FN). Ứng dụng: Khi cần giảm bỏ sót, ví dụ: phát hiện gian lận, bệnh nguy hiểm
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 9
- **Framework:** Chỉ số đánh giá mô hình
- **Confusion với:** Precision

### Chỉ số cân bằng F1 (F1-score)

- **Định nghĩa:** Trung bình điều hòa giữa Precision và Recall. Công thức: F1 = 2 × (Precision × Recall) / (Precision + Recall). Vai trò: Cân bằng giữa phát hiện đúng và hạn chế nhầm lẫn. Dùng khi: Dữ liệu mất cân bằng
- **Nguồn:** `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 10
- **Framework:** Chỉ số đánh giá mô hình
- **Confusion với:** Precision, Recall

### Ưu điểm Naive Bayes

- **Định nghĩa:** Dễ dàng cài đặt; Thời gian thi hành tương tự như cây quyết định; Đạt kết quả tốt trong phần lớn các trường hợp.
- **Nguồn:** `Bai7_PhanLop_Bayes.pdf` trang 16

### Nhược điểm Naive Bayes

- **Định nghĩa:** Giả thiết về tính độc lập điều kiện của các thuộc tính làm giảm độ chính xác.
- **Nguồn:** `Bai7_PhanLop_Bayes.pdf` trang 16

### Học có giám sát (Supervised Learning)

- **Định nghĩa:** Là kỹ thuật học sử dụng cho các bài toán phân lớp (Classification). Để thực hiện được bài toán trên, trước tiên cần phải có 2 điều kiện: Điều kiện 1: phải biết trước số nhãn lớp cần phân loại. Điều kiện 2: phải có tập đặc trưng của mỗi loại quả, tập đặc trưng này có được thông qua học một tập dữ liệu huấn luyện.
- **Nguồn:** `Bai8_Kohonen.pdf` trang 4
- **Framework:** Phân loại kỹ thuật học máy
- **Confusion với:** Học không giám sát

### Học không giám sát (Unsupervised Learning)

- **Định nghĩa:** Là kỹ thuật học sử dụng cho các bài toán phân cụm, gom cụm (Clustering). Để thực hiện được bài toán trên, cần phải có tập đặc trưng của mỗi loại quả. Tập đặc trưng này có được cũng thông qua học một tập dữ liệu huấn luyện. Điểm khác của Học không giám sát so với Học có giám sát là: trước khi phân cụm, không biết trong công-ten-nơ đang xét có bao nhiêu loại quả và đó là những loại quả gì.
- **Nguồn:** `Bai8_Kohonen.pdf` trang 5
- **Framework:** Phân loại kỹ thuật học máy
- **Confusion với:** Học có giám sát (biết trước số nhãn lớp)

### Mạng Kohonen

- **Định nghĩa:** Mạng Kohonen được phát triển bởi Teuvo Kohonen vào năm 1980. Dùng để ứng dụng trong việc gom cụm phẳng các đối tượng. Ưu điểm của Kohonen là không cần chỉ định trước số cụm. Thuật toán gom cụm bằng mạng Kohonen là một kỹ thuật học không giám sát.
- **Nguồn:** `Bai8_Kohonen.pdf` trang 10
- **Framework:** Mạng nơ-ron nhân tạo - Học không giám sát
- **Confusion với:** K-means (K-means cần chỉ định trước số cụm k)

### Gom cụm phẳng (Flat Clustering)

- **Định nghĩa:** Cho tập đối tượng O, gom cụm phẳng là tiến trình gom các đối tượng thành các cụm (tập con của O) sao cho: Các đối tượng trong cụm có mức độ tương tự cao; Các đối tượng trong các cụm khác nhau có mức độ tương tự thấp. Kết quả gom cụm phẳng sẽ tạo ra một phân hoạch tập đối tượng. Gọi C1,C2,...,Ck là một kiến trúc cụm phẳng, các cụm thỏa các tính chất sau: ∀i,j ∈[1,...,k], Ci ∩ Cj = ∅
- **Nguồn:** `Bai8_Kohonen.pdf` trang 11
- **Framework:** Kiến trúc cụm phẳng
- **Confusion với:** Gom cụm phân cấp (hierarchical clustering)

### Nơron chiến thắng (Winning Neuron / Best Matching Unit (BMU))

- **Định nghĩa:** Nơron chiến thắng là nơron có khoảng cách tới mẫu học là nhỏ nhất. Trong quá trình học, dùng độ đo khoảng cách để tìm ra nơron chiến thắng.
- **Nguồn:** `Bai8_Kohonen.pdf` trang 12
- **Framework:** Thuật toán Kohonen SOM
- **Confusion với:** Nơron lân cận (neighborhood nodes)

### Vùng lân cận (Neighborhood)

- **Định nghĩa:** Nc(t) là bán kính của vùng láng giềng. Cập nhật các trọng số của các nút nằm trong vùng lân cận của nút chứa nơron chiến thắng (ic,jc). Với ic-Nc(t) ≤ i ≤ ic + Nc(t) và jc-Nc(t) ≤ j ≤ jc + Nc(t)
- **Nguồn:** `Bai8_Kohonen.pdf` trang 14
- **Framework:** Thuật toán Kohonen SOM - Bước 3
- **Confusion với:** Nơron chiến thắng đơn lẻ

### Hệ số học (Learning rate / Alpha)

- **Định nghĩa:** Hệ số [0.01…0.5]. Trong công thức cập nhật trọng số: w_ijk(t+1) = w_ijk(t) + [α * [x_k(t) – w_ijk(t)]]
- **Nguồn:** `Bai8_Kohonen.pdf` trang 21
- **Framework:** Công thức cập nhật trọng số Kohonen
- **Confusion với:** Bán kính vùng lân cận Nc(t)

## 2. Framework / lý thuyết áp dụng (47 khung)

- **Ba vấn đề của tích hợp dữ liệu:** (1) Vấn đề nhận dạng thực thể (entity identification), (2) Vấn đề dư thừa (redundancy), (3) Vấn đề mâu thuẫn giá trị dữ liệu (data value conflicts). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 21.
- **Binning (equal-frequency):** Phân bố dữ liệu có thứ tự vào các bin có tần suất bằng nhau, sau đó làm trơn bằng bin means hoặc bin boundaries (min/max). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 16.
- **Biến đổi cây quyết định thành luật IF-THEN:** Biểu diễn tri thức dưới dạng luật IF-THEN; Mỗi luật tạo ra từ mỗi đường dẫn từ gốc đến lá; Mỗi cặp giá trị thuộc tính dọc theo đường dẫn tạo nên phép kết (phép AND - và); Các nút lá mang tên của lớp Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 64.
- **Bốn kỹ thuật tiền xử lý dữ liệu:** Data cleaning, data integration, data transformation, data reduction — quy trình tổng thể chuyển dữ liệu thô từ nhiều nguồn thành task-relevant data phục vụ data mining. Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 5.
- **Bộ 4 chỉ số đánh giá mô hình phân loại:** Accuracy (Độ chính xác tổng thể) + Precision (Độ chính xác của dự đoán dương) + Recall (Độ nhạy - Khả năng phát hiện đúng DL dương) + F1-Score (chỉ số tổng hợp cân bằng giữa Precision và Recall) Xuất hiện: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 3.
- **Chuẩn bị dữ liệu:** Làm sạch dữ liệu (nhiễu, các giá trị trống); Phân tích sự liên quan (chọn đặc trưng); Biến đổi dữ liệu Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 11.
- **Chất lượng dữ liệu (data quality):** Bốn tính chất đánh giá chất lượng dữ liệu: chính xác (accuracy), hiện hành (currency/timeliness), toàn vẹn (completeness), nhất quán (consistency). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 4.
- **Clustering (gom cụm):** Nhận diện phần tử biên (outliers) và giảm thiểu nhiễu bằng cách gom các đối tượng thành cụm; các điểm ngoài cụm là outliers. Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 18.
- **Confusion Matrix (Ma trận nhầm lẫn):** Ma trận 2x2 với hàng là Thực tế (Positive/Negative), cột là Dự đoán (Positive/Negative). 4 ô: TP (thực tế Positive, dự đoán Positive), FN (thực tế Positive, dự đoán Negative), FP (thực tế Negative, dự đoán Positive), TN (thực tế Negative, dự đoán Negative) Xuất hiện: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 6.
- **Các bước làm sạch dữ liệu:** Ba nhóm việc: (1) Xử lý dữ liệu bị thiếu, (2) Nhận diện phần tử biên (outliers) và giảm thiểu nhiễu, (3) Xử lý dữ liệu không nhất quán. Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 8.
- **Các kỹ thuật khai thác dữ liệu:** 6 kỹ thuật chính: Tập phổ biến và luật kết hợp, Khai thác mẫu tuần tự, Tập thô (reduct), Phân lớp dữ liệu, Gom cụm (Clustering), Nhà kho - OLAP. Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 18.
- **Các yêu cầu của gom cụm trong KPDL:** Có thể thay đổi quy mô (scalability); Khả năng làm việc các loại thuộc tính khác nhau; Khám phá các cụm có hình dáng bất kỳ; Không nhạy cảm với thứ tự các bản ghi nhập vào; Có số chiều cao; Hợp tác với các ràng buộc do người dùng chỉ định; Có thể diễn dịch và khả dụng Xuất hiện: `Bai6_Gomcum_new.pdf` trang 8.
- **Các ứng dụng tiêu biểu của gom cụm:** Một công cụ độc lập để xem xét phân bố dữ liệu; Làm bước tiền xử lý cho các thuật toán khác Xuất hiện: `Bai6_Gomcum_new.pdf` trang 5.
- **Dàn tập các mặt hàng (Lattice):** Biểu diễn không gian tìm kiếm dạng dàn (lattice) từ tập rỗng {} ở dưới cùng lên tập toàn phần {i1,i2,i3,i4} ở trên cùng, qua các mức 1-itemset, 2-itemset, 3-itemset. Các tập phổ biến tối đại được khoanh tròn (ví dụ {i1,i2,i3} và {i2,i3,i4}). Xuất hiện: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 17.
- **Hai độ đo lựa chọn thuộc tính:** Độ đo để lựa chọn thuộc tính: Thuộc tính được chọn là thuộc tính có lợi nhất cho quá trình phân lớp (tạo ra cây nhỏ nhất). Có 2 độ đo thường dùng: (1) Độ lợi thông tin (Information gain) - giả sử tất cả các thuộc tính dạng phi số, có thể biến đổi để áp dụng cho thuộc tính số; (2) Chỉ số Gini (Gini index) - giả sử tất cả các thuộc tính dạng số, có thể biến đổi để áp dụng cho thuộc tính phi số Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 39.
- **Hierarchy Dữ liệu → Thông tin → Tri thức → Quyết định:** Từ dữ liệu (Customer data, Store data, Demographical Data, Geographical data) → Thông tin (X lives in Z, S is Y years old...) → Tri thức (A quantity Y of product A is used in region Z...) → Quyết định (Promote product A in region Z, Cross-sell service B to clients C). Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 10.
- **KDD Pipeline (Data Sources → Data Warehouse → Task-relevant Data → Patterns → Knowledge):** Sơ đồ tổng thể: Data Cleaning + Data Integration → Data Warehouse → Selection/Transformation → Task-relevant Data → Data Mining → Patterns → Pattern Evaluation/Presentation → Knowledge. Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 5.
- **Kim tự tháp Data Mining:** Hệ thống phân cấp 6 lớp hỗ trợ quyết định kinh doanh: Data Sources (Paper, Files, Information Providers, Database Systems, OLTP) → Data Warehouses/Data Marts (OLAP, MDA) → Data Exploration (Statistical Analysis, Querying and Reporting) → Data Mining (Information Discovery) → Data Presentation (Visualization Techniques) → Making Decisions. Vai trò tương ứng: DBA → Data Analyst → Business Analyst → End User. Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 9.
- **Kết quả gom cụm bằng mạng Kohonen:** Ta thu được một mảng 2 chiều (Map) các Nơron. Sắp xếp các mẫu học vào Nơron có khoảng cách từ vector học đến Nơron đó là nhỏ nhất. Xuất hiện: `Bai8_Kohonen.pdf` trang 25.
- **Naive Bayes classifier (giả thiết độc lập):** Với mẫu X = <x1,…,xk>, giả thiết các thuộc tính độc lập điều kiện lên lớp C, nên P(X|C)·P(C) = P(x1|C)·P(x2|C)·…·P(xk|C)·P(C). Ví dụ: P(X|p)·P(p) = P(mưa|p)·P(nóng|p)·P(cao|p)·P(không|p)·P(p). Gán nhãn C có P(X|C)·P(C) lớn nhất. Xuất hiện: `Bai5.1_PhanLop_Bayes.pdf` trang 16.
- **Năm dạng biến đổi dữ liệu:** Làm trơn dữ liệu (smoothing), kết hợp dữ liệu (aggregation), tổng quát hoá dữ liệu (generalization), chuẩn hoá dữ liệu (normalization), xây dựng thuộc tính/đặc trưng (attribute/feature construction). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 31.
- **Phân chia thuộc tính có giá trị liên tục:** Dựa trên một giá trị nếu muốn phân chia nhị phân; Dựa trên vài giá trị nếu muốn có nhiều nhánh; Với mỗi giá trị tính các mẫu thuộc một lớp theo dạng A<v và A>v. Cách chọn giá trị v hiệu quả: Sắp xếp các giá trị tăng dần; Chọn giá trị trung bình của từng giá trị của thuộc tính để phân chia và tính chỉ số gini; Chọn giá trị phân chia có chỉ số gini thấp nhất Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 62.
- **Phân loại hình thức KTDL:** Hai hướng: KTDL theo hướng kiểm tra (verification-driven, gồm truy vấn/báo cáo/phân tích thống kê) và KTDL theo hướng khám phá (discovery-driven, tìm tri thức tiềm ẩn). Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 15.
- **Quy trình tìm Reduct (Ma trận + Hàm phân biệt):** Các bước thực hiện: (1) Xác định ma trận phân biệt; (2) Xác định hàm phân biệt và rút gọn hàm. Tập các đơn thức tối tiểu của hàm phân biệt (dạng CNF rút thành DNF) chính là tập các reducts. Xuất hiện: `Bai3_Reduct.pdf` trang 22.
- **Quy tắc phân lớp Naive Bayes (MAP):** Gán cho mẫu X nhãn phân lớp là C sao cho P(C|X) là lớn nhất. Thực tế tính P(X|C)·P(C) rồi so sánh, lớp nào cho giá trị lớn hơn thì chọn. Xuất hiện: `Bai7_PhanLop_Bayes.pdf` trang 5.
- **Regression (hồi quy):** Kỹ thuật giảm thiểu nhiễu bằng cách khớp dữ liệu vào hàm hồi quy (VD y = x + 1); cũng dùng làm phương pháp có tham số trong numerosity reduction. Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 17.
- **Rough Set Theory (Pawlak):** Lý thuyết tập thô dùng để: (1) khắc phục hiện tượng dữ liệu dùng để KPDL bị nhiễu, (2) rút gọn dữ liệu (khử dữ liệu thừa), (3) tạo luật quyết định, (4) nhận diện phụ thuộc riêng phần và toàn phần của các thuộc tính. Các khái niệm cốt lõi: hệ thông tin/quyết định, quan hệ bất khả phân biệt, xấp xỉ tập hợp (trên/dưới), rút gọn, phụ thuộc thuộc tính. Xuất hiện: `Bai3_Reduct.pdf` trang 3.
- **Sáu chiến lược thu giảm dữ liệu:** Kết hợp khối dữ liệu (data cube aggregation), chọn tập con thuộc tính (attribute subset selection), thu giảm chiều (dimensionality reduction), thu giảm lượng (numerosity reduction), rời rạc hoá (discretization), tạo cây phân cấp ý niệm (concept hierarchy generation). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 39.
- **Thuật toán Apriori - Bước kết hợp và bước rút gọn:** Bước kết hợp: Ck được tạo bằng cách kết Lk-1 với chính nó. Bước rút gọn: Những tập kích thước (k-1) không phổ biến không thể là tập con của tập phổ biến kích thước k. Xuất hiện: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 14.
- **Thuật toán ID3:** Giải thuật ID3 (gọi tắt là ID3) được phát triển đồng thời bởi Quinlan trong AI và Breiman, Friedman, Olsen và Stone trong thống kê. Sử dụng độ lợi thông tin (Information Gain) để chọn thuộc tính phân nhánh. Chọn thuộc tính có Gain lớn nhất Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 38.
- **Thuật toán k-means (4 bước):** Bước 1: Chọn ngẫu nhiên k điểm làm trọng tâm ban đầu. Bước 2: Gán từng điểm vào cụm có trọng tâm gần nhất. Bước 3: Nếu không có phép gán lại nào thì dừng. Bước 4: Tính lại trọng tâm cho từng cụm rồi quay lại bước 2. Lặp cho đến khi |Un - Un-1| < epsilon thì dừng. Xuất hiện: `Bai6_Gomcum_new.pdf` trang 15.
- **Thuật toán Quinlan:** Chọn thuộc tính nào có số lượng vector đơn vị nhiều nhất để phân hoạch. Vector đơn vị là vector có dạng (0,1) hoặc (1,0) - tức thuộc tính có nhánh mà toàn bộ mẫu thuộc cùng một lớp Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 27.
- **Thuật toán tìm tập phổ biến bằng vector biểu diễn (không tăng cường):** Dùng ma trận nhị phân M biểu diễn ngữ cảnh (O,I,R). Với mỗi tập ứng viên S, tính vector v(S) bằng tích ⊗ (min từng thành phần) của các vector con. Độ phổ biến SP(S)=SPV(v(S))=(số thành phần khác 0)/(số dòng của M). Lặp qua các mức F1, F2, F3, F4 cho đến khi không còn tập phổ biến mới. Xuất hiện: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 23.
- **Tiêu chí đánh giá phương pháp phân lớp:** Độ chính xác; Tốc độ; Bền vững; Co dãn (scalability); Có thể biểu diễn được; Dễ làm Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 12.
- **Tiến trình KDD (Knowledge Discovery in Databases):** Tiến trình khám phá tri thức gồm 3 bước tổng quát: Tiền xử lý, KPDL (data mining tasks), Hậu xử lý. Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 4.
- **Tiến trình khai phá dữ liệu chi tiết:** 9 bước: Nghiên cứu lĩnh vực → Tạo tập dữ liệu đầu vào → Tiền xử lý/làm sạch, mã hóa → Rút gọn/chiều → Chọn tác vụ KTDL → Chọn các thuật giải KTDL → KTDL: Tìm kiếm tri thức → Đánh giá mẫu tìm được → Biểu diễn tri thức → Sử dụng các tri thức vừa khám phá. Xuất hiện: `Bai1_TongQuan_XuanHung_New.pdf` trang 7.
- **Vai trò của việc đánh giá hiệu suất mô hình:** Gồm 4 vai trò: (1) Xác định mức độ chính xác của mô hình - giúp biết mô hình hoạt động tốt hay không trên dữ liệu thử nghiệm, tránh trường hợp mô hình dự đoán sai nhưng vẫn tưởng là tốt; (2) So sánh giữa các mô hình khác nhau - đánh giá để chọn ra mô hình tốt nhất trong nhiều mô hình đã huấn luyện; (3) Phát hiện vấn đề của mô hình - một mô hình có accuracy cao nhưng recall thấp có thể đang bỏ sót nhiều trường hợp quan trọng; (4) Tối ưu hóa mô hình - dựa vào các chỉ số như F1-score, Precision, Recall để điều chỉnh tham số, thuật toán hoặc dữ liệu đầu vào Xuất hiện: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 4.
- **Wavelet transforms & PCA:** Hai phương pháp thu giảm chiều: Biến đổi wavelet (wavelet transforms) và Phân tích nhân tố chính (Principal Component Analysis). Xuất hiện: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 42.
- **Xây dựng cây quyết định:** Cây được thiết lập từ trên xuống dưới; Rời rạc hóa các thuộc tính dạng phi số; Các mẫu huấn luyện nằm ở gốc của cây; Chọn một thuộc tính để phân chia thành các nhánh. Thuộc tính được chọn dựa trên độ đo thống kê hoặc độ đo heuristic; Tiếp tục lặp lại việc xây dựng cây quyết định cho các nhánh Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 25.
- **Xấp xỉ tập hợp (Set approximation):** Mục đích: (1) Chỉ ra được khách hàng nào có thuộc tính quyết định có giá trị dương; (2) Chỉ ra được khách hàng nào có thuộc tính quyết định không có giá trị dương; (3) Những khách hàng nào thuộc vào vùng biên giữa các trường hợp chắc chắn. Xuất hiện: `Bai3_Reduct.pdf` trang 13.
- **Ý tưởng chính của mạng Kohonen:** Tạo mảng hai chiều (map) với số dòng và số cột được khởi tạo trước. Trọng số của các phần tử (nơron) được khởi tạo ngẫu nhiên. Trong quá trình học, dùng độ đo khoảng cách để tìm ra nơron chiến thắng (nơron có khoảng cách tới mẫu học là nhỏ nhất). Cập nhật trọng số của nơron chiến thắng và vùng lân cận của nơron chiến thắng. Lặp đi lặp lại nhiều lần. Kết quả ta thu được 1 ma trận 2 chiều có trọng số. Xuất hiện: `Bai8_Kohonen.pdf` trang 12.
- **Điều kiện dừng k-means:** Lặp cho đến khi |Un - Un-1| < epsilon thì dừng, nếu sai thì quay về bước 3. Khi |U2 - U1| = 0 → thuật toán hội tụ → dừng. Xuất hiện: `Bai6_Gomcum_new.pdf` trang 27.
- **Ưu điểm cây quyết định:** Cây quyết định dễ hiểu; Việc chuẩn bị dữ liệu cho một cây quyết định là cơ bản hoặc không cần thiết; Cây quyết định có thể xử lý cả dữ liệu có giá trị bằng số và dữ liệu có giá trị là tên thể loại; Cây quyết định là một mô hình hộp trắng; Có thể thẩm định một mô hình bằng các kiểm tra thống kê; Cây quyết định có thể xử lý tốt một lượng dữ liệu lớn trong thời gian ngắn Xuất hiện: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 66.
- **Ước lượng P(Ci) và P(xi|C) từ tần suất huấn luyện:** P(Ci) = |Ci,D| / |D| (tỉ lệ mẫu lớp Ci); P(xi|Ci) = #{mẫu lớp Ci có thuộc tính = xi} / |Ci,D|. Ví dụ P(C1=Yes) = 4/9, P(C2=No) = 5/9 trên tập 9 mẫu; P(nắng|Yes) = 1/4, P(nắng|No) = 3/5. Xuất hiện: `Bai5.1_PhanLop_Bayes.pdf` trang 9.
- **Ước lượng xác suất tiên nghiệm P(Ci):** Đếm tần suất lớp trong tập huấn luyện. Ví dụ 1: P(C1=Yes)=4/9, P(C2=No)=5/9. Ví dụ 2: P(p)=9/14, P(n)=5/14. Xuất hiện: `Bai7_PhanLop_Bayes.pdf` trang 8.
- **Ước lượng xác suất điều kiện P(xi|C):** Với từng thuộc tính và từng giá trị, tính tỷ lệ giữa số mẫu có (thuộc tính=giá trị và lớp=C) trên tổng số mẫu thuộc lớp C. Xuất hiện: `Bai7_PhanLop_Bayes.pdf` trang 8.
- **Ứng dụng của gom cụm:** Tiếp thị: khám phá các nhóm khách hàng phân biệt trong CSDL mua hàng. Sử dụng đất: nhận dạng các vùng đất sử dụng giống nhau khi khảo sát CSDL quả đất. Bảo hiểm: nhận dạng các nhóm công ty có chính sách bảo hiểm mô tô với chi phí đền bù trung bình cao. Hoạch định thành phố: nhận dạng các nhóm nhà cửa theo loại nhà, giá trị và vị trí địa lý. Xuất hiện: `Bai6_Gomcum_new.pdf` trang 6.

## 3. Ví dụ minh hoạ tái sử dụng được (106 ví dụ)

Có thể trích lại trong bài tập / đồ án để làm dẫn chứng cụ thể.

- **Ứng dụng tiềm năng của KPDL:** Phân tích dữ liệu hỗ trợ ra quyết định: phân tích và quản lý thị trường, quản lý và phân tích rủi ro, quản lý và phân tích các sai hỏng. Ứng dụng khác: khai thác Web, khai thác văn bản (text mining). Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 6.
- **Ví dụ Dữ liệu - Thông tin - Tri thức:** Dữ liệu: Nguyễn Thị Hoa Mai, Sinh viên, ngành CNTT, môn CSDL. Thông tin: Nguyễn Thị Hoa Mai là sinh viên ngành CNTT. Ngành CNTT có môn CSDL. Tri thức: Nguyễn Thị Hoa Mai là sinh viên ngành CNTT nên phải học môn CSDL. Quy luật phổ biến: Nếu X là sinh viên ngành CNTT thì X phải học môn CSDL. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 11.
- **Ví dụ dữ liệu khổng lồ:** CSDL dân cư Thành Phố HCM có hơn 50 triệu dân khẩu, CSDL tuyển sinh đại học hơn 1 triệu. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 13.
- **Ứng dụng trong ngân hàng:** Dự đoán rủi ro tín dụng. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 16.
- **Ứng dụng trong thương mại điện tử:** Web, bán hàng qua mạng. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 16.
- **Ứng dụng công nghệ sinh học và dược phẩm:** Phân tích các dữ liệu di truyền. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 16.
- **Ứng dụng nhân sự:** Chọn ứng cử viên khi tuyển dụng. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 16.
- **Ứng dụng theo lĩnh vực:** Kinh doanh (phân tích dữ liệu bán hàng và tiếp thị, phân tích đầu tư, chứng khoán, xác định gian lận); Sản xuất (điều khiển và lập lịch, quản trị mạng lưới, phân tích kết quả thử nghiệm); Khoa học (không gian, sinh học, địa lý); Y học (bệnh lý, sinh học). Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 17.
- **Ví dụ luật kết hợp:** Nếu mua X thì sẽ mua Y (có 66.6% khách hàng mua Bia thì sẽ mua mực). Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 20.
- **Ví dụ mẫu tuần tự:** 80% khách hàng gởi tiền tiết kiệm trên 80 triệu thì 3 tháng sau gởi thêm 20 triệu nữa. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 21.
- **Ví dụ phân lớp dữ liệu:** Những bệnh nhân có các triệu chứng ho, lạnh, nhức đầu thì được phân lớp vào bệnh sốt rét. Nguồn: `Bai1_TongQuan_XuanHung_New.pdf` trang 23.
- **Binning giá bán (price) để làm trơn nhiễu:** Sorted data for price (in dollars): 4, 8, 15, 21, 21, 24, 25, 28, 34. Chia thành 3 equal-frequency bins: Bin1={4,8,15}, Bin2={21,21,24}, Bin3={25,28,34}. Smoothing by bin means: Bin1={9,9,9}, Bin2={22,22,22}, Bin3={29,29,29}. Smoothing by bin boundaries: Bin1={4,4,15}, Bin2={21,21,24}, Bin3={25,25,34}. Nguồn: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 16.
- **Hồi quy tuyến tính giảm nhiễu:** Đồ thị điểm dữ liệu quanh đường thẳng y = x + 1; với x = X1 thì trị thực Y1 được thay bằng trị Y1' trên đường hồi quy. Nguồn: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 17.
- **Tính hệ số tương quan Pearson r cho dữ liệu 11 mẫu (số năm sử dụng x vs giá bán y triệu đồng):** Bảng 11 dòng: Σx=58, Σy=97.5, Σxy=473.2, Σx²=326.0, Σy²=961.29, x_bar=5.273, y_bar=8.864, xy_bar=43.018, x²_bar=29.636, y²_bar=87.390. Tính: σx²=29.636-5.273²=1.831; b1=(43.018-5.273×8.864)/1.831=-2.03<0; b0=8.864-(-2.03×5.273)=19.57; σy=√(87.390-8.864²)=2.97; r=(-2.03)×(1.353/2.97)=-0.925 (tương quan rất cao, nghịch). Nguồn: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 27.
- **Data cube aggregation cho doanh số bán hàng:** Từ ba bảng Year 2002/2003/2004 chi tiết theo quý (Q1..Q4) với các giá trị $224,000, $408,000, $350,000, $586,000... dùng Sum() tổng hợp thành bảng theo Year: 2002=$1,568,000, 2003=$2,356,000, 2004=$3,594,000. Có thể mở rộng thành cube: Sale (branch × item_type × year). Nguồn: `Bai1_2_TienXuLyDuLieu_Final-converted.pdf` trang 40.
- **Dạng luật kết hợp trực quan:** Có 80% khách hàng mua bia thì sẽ mua thuốc lá. Có 75% khách hàng mùa quần tây thì sẽ mua áo sơ mi. Có 87% khách hàng mua sữa hộp Minamilk thì mua trà Lipton. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 3.
- **Ứng dụng luật kết hợp:** Biết được xu hướng mua hàng của khách hàng (chiến lược bố trí hàng thích hợp, dự tính lượng hàng nhập trong tương lai). Phân tích dữ liệu giỏ hàng (bán hàng qua mạng: bố trí giao diện các mặt hàng, loại bỏ, thêm mặt hàng). Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 4.
- **Ví dụ ngữ cảnh khai thác dữ liệu:** Bảng (Mã hóa đơn, Mã hàng): o1={i1,i2,i3}, o2={i2,i3,i4}, o3={i2,i3,i4}, o4={i1,i2,i3}, o5={i3,i4}. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 8.
- **Ma trận nhị phân của ngữ cảnh KTDL:** Bảng 5x4: o1=(1,1,1,0), o2=(0,1,1,1), o3=(0,1,1,1), o4=(1,1,1,0), o5=(0,0,1,1). Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 12.
- **Bước tìm F1 (1-itemset) với minsupp=0.4:** F1={{i1},{i2},{i3},{i4}}. SP({i1})=0,40 (Phổ biến), SP({i2})=0,80 (Phổ biến), SP({i3})=1,00 (Phổ biến), SP({i4})=0,60 (Phổ biến). Tập phổ biến 1 phần tử: C1={{i1},{i2},{i3},{i4}}. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 13.
- **Bước tìm F2 (2-itemset):** F2 ứng viên: {i1,i2},{i1,i3},{i1,i4},{i2,i3},{i2,i4},{i3,i4}. SP({i1,i2})=0.4; SP({i1,i3})=0.4; SP({i1,i4})=0.0; SP({i2,i3})=0.8; SP({i2,i4})=0.4; SP({i3,i4})=0.6. Tập phổ biến 2 phần tử: C2={{i1,i2},{i1,i3},{i2,i3},{i2,i4},{i3,i4}}. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 15.
- **Bước tìm F3 (3-itemset):** F3 ứng viên: {{i1,i2,i3},{i1,i2,i4},{i2,i3,i4},{i1,i3,i4}}. SP({i1,i2,i3})=0,40; SP({i2,i3,i4})=0,40. C3={{i1,i2,i3},{i2,i3,i4}}. Tất cả tập phổ biến: {i1},{i2},{i3},{i4},{i1,i2},{i1,i3},{i2,i3},{i2,i4},{i3,i4},{i1,i2,i3},{i2,i3,i4}. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 16.
- **Ví dụ tính vector v(S) và SPV:** S={i2,i3}, v(S)={1,1,1,1,0}. S1={i2}, v(S1)={1,1,1,1,0}; S2={i3}, v(S2)={1,1,1,1,1}. v(S)=v(S1)⊗v(S2)={1,1,1,1,0} và SP(S)=SPV(v(S))=0,8. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 28.
- **Tính F1 bằng vector biểu diễn:** {i1}, v({i1})=(1,0,0,1,0), SP=2/5=0,40 - phổ biến. {i2}, v({i2})=(1,1,1,1,0), SP=4/5=0,80 - phổ biến. {i3}, v({i3})=(1,1,1,1,1), SP=1,00 - phổ biến. {i4}, v({i4})=(0,1,1,0,1), SP=0,60 - phổ biến. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 30.
- **Tính F2 bằng vector biểu diễn (phần 1):** {i1,i2}, v=(1,0,0,1,0), SP=0,40 phổ biến. {i1,i3}, v=(1,0,0,1,0), SP=0,40 phổ biến. {i1,i4}, v=(0,0,0,0,0), SP=0,0 KHÔNG phổ biến. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 31.
- **Tính F2 bằng vector biểu diễn (phần 2):** {i2,i3}, v=(1,1,1,1,0), SP=4/5=0,80 phổ biến. {i2,i4}, v=(0,1,1,0,0), SP=2/5=0,40 phổ biến. {i3,i4}, v=(0,1,1,0,1), SP=3/5=0,80 phổ biến (lưu ý: slide viết 0,80 nhưng đếm 3 thành phần khác 0 nên 3/5=0,60). Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 32.
- **Tính F3 bằng vector biểu diễn:** {i1,i2,i3}, v=(1,0,0,1,0), SP=2/5=0,40 phổ biến. {i1,i2,i4}, v=(0,0,0,0,0), SP=0,0 KHÔNG phổ biến. {i1,i3,i4}, v=(0,0,0,0,0), SP=0,0 KHÔNG phổ biến. {i2,i3,i4}, v=(0,1,1,0,0), SP=2/5=0,40 phổ biến. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 33.
- **Tính F4 và kết thúc thuật toán:** {i1,i2,i3,i4}, v=(0,0,0,0,0), SP=0,0 KHÔNG phổ biến. Kết thúc thuật toán 2.2. Kết quả FS(O,I,R,minsupp=0.4)=F1 ∪ F2 ∪ F3 = {{i1},{i2},{i3},{i4},{i1,i2},{i1,i3},{i2,i3},{i2,i4},{i3,i4},{i1,i2,i3},{i2,i3,i4}}. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 35.
- **Ví dụ luật kết hợp thỏa minconf:** Với ngữ cảnh KTDL trong ví dụ trên, ngưỡng minsupp=0.4. Xét tập phổ biến tối đại {i1,i2,i3}. Luật r1: {i1,i2}→{i3} là một luật kết hợp hợp lệ theo ngưỡng minconf=0,67. Nguồn: `Bai2_TapPhoBienVaLuatKetHop_Final.pdf` trang 20.
- **Bảng 1 - Hệ quyết định thi đậu (Age, Số buổi, Thi đậu):** Bảng 7 đối tượng x1..x7 với Age ∈ {16-30, 31-45, 46-60}, Số buổi ∈ {0, 50, 1-25, 26-49}, Thi đậu ∈ {yes, no}. Nhận xét: {x3,x4} cùng thuộc tính điều kiện nhưng khác giá trị quyết định; {x5,x7} cùng kết quả thi đậu. Luật rút ra: 'Nếu Độ_tuổi là 16-30 và Số_buổi là 50 thì Thi_đậu là Có'. Nguồn: `Bai3_Reduct.pdf` trang 6.
- **Ví dụ IND (quan hệ bất khả phân biệt):** IND({Tuổi}) = {{x1,x2,x6}, {x3,x4}, {x5,x7}}; IND({số buổi}) = {{x1}, {x2}, {x3,x4}, {x5,x6,x7}}; IND({Tuổi, số buổi}) = {{x1}, {x2}, {x3,x4}, {x5,x7}, {x6}}. Nguồn: `Bai3_Reduct.pdf` trang 10.
- **Ví dụ xấp xỉ tập hợp W = {x | thi đậu(x) = yes}:** W = {x1, x4, x6}, B = {Độ tuổi, số buổi}. IND(B) = {{x1};{x2};{x3,x4};{x5;x7};{x6}}. BW(dưới) = {x1, x6}; BW(trên) = {x1, x3, x4, x6}; BN_A(W) = {x3, x4}; U − BW(trên) = {x2, x5, x7}. Lớp quyết định Thi_đậu là thô vì vùng biên khác rỗng. Nguồn: `Bai3_Reduct.pdf` trang 17.
- **Ví dụ rút gọn - Bảng tuyển dụng (Bằng cấp d, Kinh nghiệm e, Tiếng Anh f, Giới thiệu r → Tuyển dụng):** 8 đối tượng X1..X8. X1(MBA, Vừa, Tốt, Xuất sắc → Chấp nhận); X4(MSC, Nhiều, Tốt, Trung bình → Chấp nhận); X6(MSC, Nhiều, Tốt, Xuất sắc → Chấp nhận); X7(MBA, Nhiều, Không, Tốt → Chấp nhận); X2(MBA, Thấp, Tốt, Trung bình → Từ chối); X3(MCE, Thấp, Tốt, Tốt → Từ chối); X5(MSC, Vừa, Tốt, Trung bình → Từ chối); X8(MCE, Thấp, Không, Xuất sắc → Từ chối). Sau khi tính ma trận phân biệt và rút gọn hàm phân biệt: f = ed ∨ er. Vậy 2 reduct là {Kinh nghiệm, Bằng cấp} và {Kinh nghiệm, Giới thiệu}. Nguồn: `Bai3_Reduct.pdf` trang 25.
- **Bài tập thời tiết (Trời, Gió, Ápsuất → Kết quả):** 8 đối tượng O1..O8. O1(Trong, Bac, Cao, Kmua); O2(May, Nam, Cao, Mua); O3(May, Bac, TB, Mua); O4(Trong, Bac, Thap, Kmua); O5(May, Bac, Thap, Mua); O6(May, Bac, Cao, Mua); O7(May, Nam, Thap, Kmua); O8(Trong, Nam, Cao, Kmua). Câu a: Tính xấp xỉ X = {o1, o3, o4} qua B = {trời, gió}. Câu b: Khảo sát sự phụ thuộc của C = {Ketqua} vào B = {trời, gió}. Nguồn: `Bai3_Reduct.pdf` trang 30.
- **Bài giải câu 1a - Xấp xỉ:** IND(trời, gió) = {{o1, o4}, {o2, o7}, {o3, o5, o6}, {o8}}. Với B = {Troi, Gio}: Xấp xỉ dưới B(X) = {o1, o4}. Xấp xỉ trên Upper(B,X) = {o1, o4, o3, o5, o6}. α = |{o1,o4}| / |{o1,o4,o3,o5,o6}| = 2/5 = 0.4. Nguồn: `Bai3_Reduct.pdf` trang 33.
- **Bài giải câu 1b - Phụ thuộc thuộc tính:** Với C = {Ketqua}: X1 = {o1,o4,o7,o8} và X2 = {o2, o3, o5, o6}. B(X1) = {o1, o4, o8}; B(X2) = {o3, o5, o6}. k = (|Lower(B,X1)| + |Lower(B,X2)|) / |O| = 6/8 = 0.66. Nguồn: `Bai3_Reduct.pdf` trang 34.
- **Ví dụ tìm reduct - Bảng bị rám (Màu tóc T, Chiều cao C, Cân nặng N, Dùng thuốc D → Kết quả):** 8 đối tượng: 1.Hoa(Đen, Tầm thước, Nhẹ, Không, Bị rám); 2.Lan(Đen, Cao, Vừa phải, Có, Không); 3.Xuân(Râm, Thấp, Vừa phải, Có, Không); 4.Hạ(Đen, Thấp, Vừa phải, Không, Bị rám); 5.Thu(Bạc, Tầm thước, Nặng, Không, Bị rám); 6.Đông(Râm, Cao, Nặng, Không, Không); 7.Mơ(Râm, Tầm thước, Nặng, Không, Không); 8.Đào(Đen, Thấp, Nhẹ, Có, Không). Sau rút gọn F(T,C,N,D) = T ∧ (C ∨ D) ∧ (N ∨ D) = (T ∧ D) ∨ (T ∧ C ∧ N). Vậy 2 reducts: B1 = {T, D} và B2 = {T, C, N}. Nguồn: `Bai3_Reduct.pdf` trang 35.
- **Liệt kê luật độ chính xác 100%:** U/B1 = {Z1={o1,o4}, Z2={o2,o8}, Z3={o3}, Z4={o5}, Z5={o6,o7}}. U/B2 = {Z6={o1}, Z7={o2}, Z8={o3}, Z9={o4}, Z10={o5}, Z11={o6}, Z12={o7}, Z13={o8}}. X1 = {o1,o4,o5} (bị rám); X2 = {o2,o3,o6,o7,o8} (không). Ví dụ luật: 'Màu tóc=Đen và DùngThuốc=Không → Kết quả=bị rám' (Z1⊆X1); 'Màu tóc=Bạc và D=Không → Kết quả=bị rám' (Z4⊆X1); 'Màu tóc=Đen và DùngThuốc=Có → Kết quả=không' (Z2⊆X2); v.v. Nguồn: `Bai3_Reduct.pdf` trang 40.
- **Đặt vấn đề - Thiện nên mua laptop hãng nào:** Bảng khách hàng: Tú (Trên 40, Bác sĩ, Đánh văn bản, Acer), Tuấn (18-22, Sinh viên, Học tập, Samsung), Tâm (31-40, Kỹ sư, Thiết kế đồ họa, Dell)... Câu hỏi: Thiện (18-22, Sinh viên, Học tập) nên mua máy tính của hãng nào? Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 3.
- **Ví dụ 1 - Đi chơi Yes/No (9 mẫu):** Tập huấn luyện 9 mẫu với 4 thuộc tính (Thời tiết, Nhiệt độ, Độ ẩm, Gió) và nhãn Đi chơi (Yes/No). Mẫu mới: Thời tiết=Nắng, Nhiệt độ=Nóng. Tính P(C1=Yes)=4/9, P(C2=No)=5/9. Bảng P(nắng|Yes)=1/4, P(nắng|No)=3/5; P(u ám|Yes)=2/4, P(u ám|No)=0/5; P(mưa|Yes)=1/4, P(mưa|No)=2/5. P(Nóng|Yes)=1/4, P(Nóng|No)=2/5; P(Mát|Yes)=1/4, P(Mát|No)=1/5; P(Lạnh|Yes)=2/4, P(Lạnh|No)=2/5. Kết quả: P(Yes|Nắng,Nóng)=1/4*1/4*4/9=0.028; P(No|Nắng,Nóng)=3/5*2/5*5/9=0.133 → chọn không đi chơi. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 12.
- **Ví dụ 2 - Mẫu {u ám, mát}:** P(Yes|u ám, mát) = 2/4*1/4*4/9 = 0.056; P(No|u ám, mát) = 0/5*1/5*5/9 = 0 → chọn đi chơi. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 13.
- **Ví dụ 2 - Play tennis 14 mẫu (bảng đầy đủ):** Tập huấn luyện 14 mẫu (thời tiết, nhiệt độ, độ ẩm, gió, lớp P/N). P(p)=9/14, P(n)=5/14. Bảng xác suất điều kiện: Thời tiết: P(nắng|p)=2/9, P(nắng|n)=3/5; P(u ám|p)=4/9, P(u ám|n)=0; P(mưa|p)=3/9, P(mưa|n)=2/5. Nhiệt độ: P(nóng|p)=2/9, P(nóng|n)=2/5; P(ấm áp|p)=4/9, P(ấm áp|n)=2/5; P(mát|p)=3/9, P(mát|n)=1/5. Độ ẩm: P(cao|p)=3/9, P(cao|n)=4/5; P(vừa|p)=6/9, P(vừa|n)=1/5. Gió: P(có|p)=3/9, P(có|n)=2/5; P(không|p)=6/9, P(không|n)=3/5. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 15.
- **Ví dụ 2 - Phân lớp X1 = <mưa, nóng, cao, không>:** P(X|p)·P(p) = P(mưa|p)·P(nóng|p)·P(cao|p)·P(không|p)·P(p) = 3/9*2/9*3/9*6/9*9/14 = 0.010582. P(X|n)·P(n) = P(mưa|n)·P(nóng|n)·P(cao|n)·P(không|n)·P(n) = 2/5*2/5*4/5*3/5*5/14 = 0.027428. Mẫu X1 được phân vào lớp n (không chơi tennis). Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 16.
- **Ví dụ 2 - Phân lớp X2 = <u ám, mát, vừa, có>:** P(P|u ám, mát, vừa, có) = 4/9*3/9*6/9*3/9*9/14 = 0.02; P(N|u ám, mát, vừa, có) = 0/5*1/5*1/5*2/5*5/14 = 0. X2 thuộc lớp P. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 17.
- **Bài tập - Cây quyết định kết quả:** Kết quả cây quyết định trên tập 14 mẫu: gốc là Thời tiết; nhánh nắng → xét Độ ẩm (cao→N, vừa→P); nhánh u ám → P; nhánh mưa → xét Gió (có→N, không→P). Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 23.
- **Laplace - Play ball 14 mẫu, X=(Overcast, Cool, High, Strong):** P(Play=Yes)=(9+1)/(14+2)=10/16; P(Play=No)=(5+1)/(14+2)=6/16. P(Outlook=Overcast|Yes)=(4+1)/(9+3)=5/12; P(Outlook=Overcast|No)=(0+1)/(5+3)=1/8. P(Temp=Cool|Yes)=(3+1)/(9+3)=4/12; P(Temp=Cool|No)=(1+1)/(5+3)=2/8. P(Humidity=High|Yes)=(3+1)/(9+2)=4/11; P(Humidity=High|No)=(4+1)/(5+2)=5/7. P(Wind=Strong|Yes)=(3+1)/(9+2)=4/11; P(Wind=Strong|No)=(3+1)/(5+2)=4/7. P(Yes|X)=5/12*4/12*4/11*4/11*10/16=0.0115; P(No|X)=1/8*2/8*5/7*4/7*6/16=0.0048. Vậy X thuộc lớp Yes. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 28.
- **Laplace - Phân lớp X1={Outlook=Sunny, Humidity=High}:** P(Outlook=Sunny|Yes)=(2+1)/(9+3)=3/12; P(Outlook=Sunny|No)=(3+1)/(5+3)=4/8. P(Humidity=High|Yes)=(3+1)/(9+2)=4/11; P(Humidity=High|No)=(4+1)/(5+2)=5/7. P(Yes|X1)=3/12*4/11*10/16=0.056818; P(No|X1)=4/8*5/7*6/16=0.133929. → X1 thuộc lớp No. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 32.
- **Laplace - Phân lớp X2={Outlook=Sunny, Humidity=Normal}:** P(Humidity=Normal|Yes)=(6+1)/(9+2)=7/11; P(Humidity=Normal|No)=(1+1)/(5+2)=2/7. P(Yes|X2)=3/12*7/11*10/16=0.099432; P(No|X2)=4/8*2/7*6/16=0.053571. → X2 thuộc lớp Yes. Nguồn: `Bai5.1_PhanLop_Bayes.pdf` trang 32.
- **Tình huống 1 - Dự đoán trốn thuế:** Bảng gồm 10 dòng với các cột Tid, Refund (Yes/No), Marital Status (Single/Married/Divorced), Taxable Income (60K-220K), Evade (Yes/No). Câu hỏi: Ông A (Tid=100) có khả năng trốn thuế? Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 4.
- **Tình huống 2 - Duyệt vay ngân hàng:** Cây quyết định với gốc là Income range of applicant? với 3 nhánh (<$30K, $30-70K, >$70K). Với thông tin của một applicant A, xác định liệu ngân hàng có cho A vay không? Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 5.
- **Tình huống 3 - Dự đoán tốt nghiệp sinh viên:** Bảng có các cột Khóa, MãSV, MônHọc1, MônHọc2, ..., TốtNghiệp (Có/Không). Làm sao xác định liệu sinh viên A sẽ tốt nghiệp? Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 6.
- **Ví dụ - Xây dựng mô hình phân lớp Tenured:** Dữ liệu huấn luyện NAME/RANK/YEARS/TENURED gồm Mary/Assistant Prof/3/no, James/Assistant Prof/7/yes, Bill/Professor/2/no, John/Associate Prof/7/yes, Mark/Assistant Prof/6/no, Annie/Associate Prof/3/no. Luật phân lớp: IF rank='professor' OR years>6 THEN tenured=yes Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 9.
- **Ví dụ - Sử dụng mô hình để phân lớp:** Dữ liệu kiểm tra Tom/Assistant Prof/2/no, Lisa/Associate Prof/7/no, Jack/Professor/5/yes, Ann/Assistant Prof/7/yes. Dữ liệu chưa phân lớp (Jeff, Professor, 4) → Tenured? → Yes Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 10.
- **Ví dụ David chơi golf:** David là quản lý câu lạc bộ golf. Thu thập trong 2 tuần: Outlook (sunny/overcast/raining), Temperature (F), Humidity, Wind. Bộ dữ liệu 14 dòng và 5 cột (D1-D14) với các thuộc tính Outlook, Temp (Hot/Mild/Cool), Humidity (High/Normal), Wind (Weak/Strong hoặc True/False), Play (Yes/No) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 17.
- **Bảng dữ liệu golf 14 dòng:** D1 Sunny Hot High Weak No | D2 Sunny Hot High Strong No | D3 Overcast Hot High Weak Yes | D4 Rainy Mild High Weak Yes | D5 Rainy Cool Normal Weak Yes | D6 Rainy Cool Normal Strong No | D7 Overcast Cool Normal Strong Yes | D8 Sunny Mild High Weak No | D9 Sunny Cold/Cool Normal Weak Yes | D10 Rainy Mild Normal Weak Yes | D11 Sunny Mild Normal Strong Yes | D12 Overcast Mild High Strong Yes | D13 Overcast Hot Normal Weak Yes | D14 Rainy Mild High Strong No Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 18.
- **Cây quyết định golf hoàn chỉnh:** Gốc = Outlook. Nhánh Sunny → Humidity (High→No, Normal→Yes). Nhánh Overcast → Yes. Nhánh Rain → Wind (Strong→No, Weak→Yes) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 19.
- **Biểu thức luận lý từ cây:** (Outlook=Sunny ∧ Humidity=Normal) ∨ Outlook=Overcast ∨ (Outlook=Rain ∧ Wind=Weak) → Play=Yes Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 24.
- **Quinlan - Tính vector đơn vị cho Outlook:** V(outlook=sunny)=(T(sunny,No),T(sunny,Yes))=(3/5,2/5); V(outlook=overcast)=(0/4,4/4)=(0,1); V(outlook=rainy)=(2/5,3/5). Outlook có vector (0,1) là vector đơn vị Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 30.
- **Quinlan - Tính vector cho Temp:** V(Temp=hot)=(2/4,2/4); V(Temp=mild)=(2/6,4/6); V(Temp=cool)=(1/4,3/4) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 31.
- **Quinlan - Tính vector cho Humidity:** V(Humidity=high)=(4/7,3/7); V(Humidity=normal)=(1/7,6/7) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 32.
- **Quinlan - Kết luận chọn Outlook:** V(wind=false)=(2/8,6/8); V(wind=true)=(3/6,3/6). Như vậy, thuộc tính Outlook có số vector đơn vị nhiều nhất nên sẽ được phân hoạch Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 33.
- **ID3 - Tính I(S1,S2) toàn tập golf:** S=14, m=2, C1=Yes, C2=No, S1=10, S2=4. I(S1,S2)=I(10,4)=-(10/14)log2(10/14)-(4/14)log2(4/14)=0.863 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 44.
- **ID3 - Gain(Outlook):** Bảng thuộc tính Outlook: sunny (p=3,n=2,I=0.971); Overcast (p=4,n=0,I=0); rain (p=3,n=2,I=0.971). E(Outlook)=(5/14)I(2,3)+(4/14)I(4,0)+(5/14)I(3,2)=0.694. Gain(Outlook)=I(10,4)-E(Outlook)=0.863-0.694=0.169 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 45.
- **ID3 - Gain(Temp):** E(temp)=4/14*I(2,2)+6/14*I(5,1)+4/14*I(1,3)=0.796. Gain(Temp)=0.863-0.796=0.067 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 46.
- **ID3 - Gain(Humidity):** Humidity: High [4+,3-] I=0.985; Normal [6+,1-] I=0.592. Gain(S,Humidity)=0.863 – (7/14)*0.985 – (7/14)*0.592 = 0.075 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 47.
- **ID3 - Gain(Wind):** Wind: Weak [6+,2-] I=0.811; Strong [4+,2-] I=0.918. Gain(S,Wind)=0.863 – (8/14)*0.811 – (6/14)*0.918 = 0.006 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 48.
- **ID3 - Kết quả bảng con 1.1 (Outlook=Sunny):** Tập D1,D2,D8,D9,D11. I(3,2)=0.971. E(Temp)=2/5*I(0,2)+2/5*I(2,0)+1/5*I(1,0)=0. Gain(Temp)=0.971. E(Humidity)=3/5*I(1,2)+2/5*I(2,0)=0.55, Gain(Humidity)=0.421. E(Wind)=3/5*I(2,1)+2/5*I(1,1)=0.951, Gain(Wind)=0.02. Chọn Temp Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 50.
- **ID3 - Bảng con 1.2 (Outlook=Rain):** Tập D4,D5,D6,D10,D14. I(3,2)=0.971. E(Temp)=0.9508, Gain=0.02. E(Humidity)=0.9508, Gain=0.02. E(Wind)=3/5*I(1,2)+2/5*I(1,1)=0.9508, Gain(Wind)=0.02 Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 52.
- **Gini - Toàn tập golf:** Gini(D)=1 - (9/14)^2 - (5/14)^2 = 0.459. GiniOutlook(D) = 5/14*Gini(Ssunny) + 4/14*Gini(Sovercast) + 5/14*Gini(Srainy) = 0.343. Gini(Ssunny)=0.48=1-(2/5)^2-(3/5)^2 (2Yes,3No); Gini(Sovercast)=0 (4Yes,0No); Gini(Srainy)=0.48 (3Yes,2No) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 55.
- **Gini - Kết quả các thuộc tính:** GiniOutlook(D)=0.343; GiniTemperature(D)=0.405; GiniHumidity(D)=0.367; GiniWind(D)=0.43. Chọn Outlook (nhỏ nhất) để phân nhánh Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 57.
- **Gini bảng con 2.1 (Outlook=Sunny):** D1,D2,D8,D9,D11. GiniTemperature=0.2; GiniHumidity=0; GiniWind=0.46. Chọn Humidity (Gini=0) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 60.
- **Gini bảng con 2.2 (Outlook=Rain):** D4,D5,D6,D10,D14. GiniTemperature=0.46; GiniHumidity=0.46; GiniWind=0. Chọn Wind Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 61.
- **Gini - phân chia thuộc tính liên tục Taxable Income:** Sorted values: 60,70,75,85,90,95,100,120,125,220. Split positions: 55,65,72,80,87,92,97,110,122,172,230. Gini tại các vị trí: 0.420, 0.400, 0.375, 0.343, 0.417, 0.400, 0.300, 0.343, 0.375, 0.400, 0.420. Chọn split 97 (Gini=0.300 thấp nhất) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 63.
- **Biến đổi cây golf thành 5 luật IF-THEN:** R1: If (Outlook=Sunny) ∧ (Humidity=High) Then Play=No; R2: If (Outlook=Sunny) ∧ (Humidity=Normal) Then Play=Yes; R3: If (Outlook=Overcast) Then Play=Yes; R4: If (Outlook=Rain) ∧ (Wind=Strong) Then Play=No; R5: If (Outlook=Rain) ∧ (Wind=Weak) Then Play=Yes Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 65.
- **Bài tập bảng Attr_A/B/C/D:** Bảng 9 dòng với 4 thuộc tính T/F. Giải: Attr_A(pi=4,ni=2 và pi=1,ni=2) I=(0.92, 0.92) R=0.92 Gain=0.07; Attr_B(pi=1,ni=4 và pi=4,ni=0) I=(0.72, 0) R=0.4 Gain=0.59; Attr_C(pi=4,ni=1 và pi=1,ni=3) I=(0.72, 0.81) R=0.76 Gain=0.23. Chọn Attr_B vì Gain lớn nhất Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 68.
- **Bài tập bảng Attr sau tách Attr_B:** Còn lại Attr_A/C/D 5 dòng. Attr_A: pi=1,ni=2 và pi=0,ni=2, I=(0.92, 0), R=0.552, Gain=0.17. Attr_C: pi=1,ni=1 và pi=0,ni=3, I=(1.00, 0), R=0.40, Gain=0.32. Chọn Attr_C Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 70.
- **Bài tập cuối - Buy Mobile:** Bảng 14 dòng: age (<20, 21...50, >50); income (high/medium/low); Region (USA/PK); credit_rating (Low/High); Buy Mobile (yes/no) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 72.
- **Sample Experience Table - Commute:** 13 dòng D1-D13 với thuộc tính Hour (8AM/9AM/10AM), Weather (Sunny/Cloudy/Rainy), Accident (Yes/No), Stall (Yes/No), Target Commute (Long/Short/Medium) Nguồn: `Bai5_PhanLop_CayQuyetDinh.pdf` trang 73.
- **Ví dụ k-means với k=2, 4 điểm:** Cho tập điểm: x1={1,3}, x2={1.5, 3.2}, x3={1.3, 2.8}, x4={3, 1}. Dùng k-means để gom cụm với k = 2. Nguồn: `Bai6_Gomcum_new.pdf` trang 18.
- **Ma trận phân hoạch khởi tạo U0:** U0: c1=[1,0,0,0], c2=[0,1,1,1] (cột ứng với x1,x2,x3,x4). Khởi tạo: cụm 1 chỉ chứa x1, cụm 2 chứa x2,x3,x4. Nguồn: `Bai6_Gomcum_new.pdf` trang 19.
- **Tính vector trọng tâm v1 cho cụm 1:** v11 = (1*1 + 0*1.5 + 0*1.3 + 0*3)/(1+0+0+0) = 1. v12 = (1*3 + 0*3.2 + 0*2.8 + 0*1)/(1+0+0+0) = 3. Vậy v1 = (1,3). Nguồn: `Bai6_Gomcum_new.pdf` trang 21.
- **Tính vector trọng tâm v2 cho cụm 2:** v21 = (0*1 + 1*1.5 + 1*1.3 + 1*3)/(0+1+1+1) = 5.8/3 = 1.93. v22 = (0*3 + 1*3.2 + 1*2.8 + 1*1)/(0+1+1+1) = 7/3 = 2.33. Vậy v2 = (1.93, 2.33). Nguồn: `Bai6_Gomcum_new.pdf` trang 23.
- **Gán các điểm vào cụm (vòng 1) - dùng Euclidean:** d(x1,v1) = căn((1-1)^2 + (3-3)^2) = 0. d(x1,v2) = căn((1-1.93)^2 + (3-2.33)^2) = 1.14. Gộp x1 vào cụm c1 vì d(x1,v1) < d(x1,v2). Tương tự: d(x2,v1) = 0.54 < d(x2,v2) = 0.97 → x2 vào c1; d(x3,v1) = 0.36 < d(x3,v2) = 0.78 → x3 vào c1; d(x4,v1) = 2.83 > d(x4,v2) = 1.70 → x4 vào c2. Nguồn: `Bai6_Gomcum_new.pdf` trang 24.
- **Ma trận U1 sau vòng 1:** U1: c1=[1,1,1,0], c2=[0,0,0,1]. Cụm 1 chứa x1,x2,x3; cụm 2 chứa x4. Nguồn: `Bai6_Gomcum_new.pdf` trang 27.
- **Tính lại trọng tâm vòng 2:** V1(1.13, 3), V2(3, 1). d(x1,v1)=0.27, d(x1,v2)=2.8 → x1 thuộc c1. d(x2,v1)=0.52, d(x2,v2)=2.67 → x2 thuộc c1. d(x3,v1)=0.2, d(x3,v2)=2.48 → x3 thuộc c1. d(x4,v1)=2.64, d(x4,v2)=0 → x4 thuộc c2. Nguồn: `Bai6_Gomcum_new.pdf` trang 28.
- **Ma trận U2 - hội tụ:** U2: c1=[1,1,1,0], c2=[0,0,0,1]. |U2 - U1| = 0 → thuật toán hội tụ → dừng. Nguồn: `Bai6_Gomcum_new.pdf` trang 29.
- **Bài tập áp dụng - Chẩn đoán cao huyết áp:** Ma trận nhầm lẫn của mô hình chẩn đoán bệnh cao huyết áp: TP=25 (thực tế Cao/dự đoán Cao), FN=15 (thực tế Cao/dự đoán Bình thường), FP=10 (thực tế Bình thường/dự đoán Cao), TN=50 (thực tế Bình thường/dự đoán Bình thường). Yêu cầu: Tính Accuracy, Precision, Recall, F1-score và đưa ra nhận xét Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 11.
- **Giải - Accuracy:** Accuracy = (TP+TN)/(TP+FP+FN+TN) = (25+50)/(25+10+15+50) = 75/100 = 0.75. Mô hình dự đoán đúng 75% tổng số trường hợp Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 13.
- **Giải - Precision:** Precision = TP/(TP+FP) = 25/(25+10) = 25/35 ≈ 0.714. Trong số những người bị dự đoán là cao huyết áp, khoảng 71.4% là đúng Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 14.
- **Giải - Recall:** Recall = TP/(TP+FN) = 25/(25+15) = 25/40 = 0.625. Mô hình phát hiện đúng 62.5% số người thực sự bị cao huyết áp Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 15.
- **Giải - F1-Score:** F1 = 2 × (Precision × Recall)/(Precision + Recall) = 2 × (0.714 × 0.625)/(0.714 + 0.625) ≈ 0.666. Chỉ số cân bằng giữa Precision và Recall khoảng 0.666 Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 16.
- **Ứng dụng mô hình phân loại:** Các mô hình phân loại ứng dụng trong phân loại email, khách hàng, phân loại bệnh nhân... Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 2.
- **Ví dụ so sánh mô hình:** So sánh Logistic Regression, Decision Tree và Random Forest để chọn mô hình phù hợp Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 4.
- **Ví dụ tối ưu hóa mô hình:** Cân bằng lại dữ liệu, chọn lại đặc trưng (features), v.v. Nguồn: `Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf` trang 5.
- **Đặt vấn đề - Thiện nên mua máy tính của hãng nào:** Bảng khách hàng gồm Tên khách, Tuổi (18-22, 31-40, Trên 40), Nghề nghiệp (Bác sĩ, Sinh viên, Kỹ sư), Mục đích sử dụng (Đánh văn bản, Học tập, Thiết kế đồ họa), Laptop đã chọn (Acer, Samsung, Dell,…). Thiện: 18-22, Sinh viên, Học tập, ??? — dự đoán hãng laptop cho khách Thiện. Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 3.
- **Ví dụ 1 - Tập huấn luyện đi chơi (9 mẫu):** 9 mẫu với thuộc tính Thời tiết (Nắng/U ám/Mưa), Nhiệt độ (Nóng/Mát/Lạnh), Độ ẩm (Cao/Bình thường), Gió (Yếu/Mạnh), Đi chơi? (Yes/No). Trong đó có 4 Yes và 5 No. Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 7.
- **Ví dụ 1 - Ước lượng P(Ci) và P(thuộc tính|Ci):** P(C1=Yes)=4/9, P(C2=No)=5/9. P(Nắng|Yes)=1/4, P(Nắng|No)=3/5; P(U ám|Yes)=2/4, P(U ám|No)=0/5; P(Mưa|Yes)=1/4, P(Mưa|No)=2/5. P(Nóng|Yes)=1/4, P(Nóng|No)=2/5; P(Mát|Yes)=1/4, P(Mát|No)=1/5; P(Lạnh|Yes)=2/4, P(Lạnh|No)=2/5. Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 8.
- **Ví dụ 1 - Phân lớp mẫu mới (Nắng, Nóng):** P(Yes|Nắng, Nóng) = 1/4 · 1/4 · 4/9 = 0.028. P(No|Nắng, Nóng) = 3/5 · 2/5 · 5/9 = 0.133. Vì 0.133 > 0.028 nên chọn không đi chơi. Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 12.
- **Ví dụ 2 - Tập huấn luyện 14 mẫu (chơi tennis):** 14 mẫu với Thời tiết, Nhiệt độ, Độ ẩm, Gió, Lớp (P/N). P(p)=9/14, P(n)=5/14. Bảng xác suất điều kiện: P(nắng|p)=2/9, P(nắng|n)=3/5; P(u ám|p)=4/9, P(u ám|n)=0; P(mưa|p)=3/9, P(mưa|n)=2/5. Nhiệt độ: P(nóng|p)=2/9, P(nóng|n)=2/5; P(ấm áp|p)=4/9, P(ấm áp|n)=2/5; P(mát|p)=3/9, P(mát|n)=1/5. Độ ẩm: P(cao|p)=3/9, P(cao|n)=4/5; P(vừa|p)=6/9, P(vừa|n)=1/5. Gió: P(có|p)=3/9, P(có|n)=3/5; P(không|p)=6/9, P(không|n)=2/5. Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 14.
- **Ví dụ 2 - Phân lớp X=<mưa, nóng, cao, không>:** P(X|p)·P(p) = P(mưa|p)·P(nóng|p)·P(cao|p)·P(không|p)·P(p) = 3/9 · 2/9 · 3/9 · 6/9 · 9/14 = 0.010582. P(X|n)·P(n) = P(mưa|n)·P(nóng|n)·P(cao|n)·P(không|n)·P(n) = 2/5 · 2/5 · 4/5 · 2/5 · 5/14 = 0.018286. Vì P(X|n)·P(n) > P(X|p)·P(p) nên mẫu X được phân vào lớp n (không chơi tennis). Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 15.
- **Bài tập - Tập huấn luyện 14 mẫu:** 14 mẫu (Thời tiết, Nhiệt độ, Độ ẩm, Gió, Lớp P/N). Yêu cầu tìm luật phân lớp cho các mẫu: X1={thời tiết=nắng, độ ẩm=cao}; X2={thời tiết=nắng, độ ẩm=vừa}; X3={thời tiết=U ám}; X4={thời tiết=mưa, gió=không}; X5={thời tiết=mưa, gió=có}. Kết quả (cây quyết định gợi ý): thời tiết=nắng → xét độ ẩm (cao→N, vừa→P); thời tiết=u ám → P; thời tiết=mưa → xét gió (có→N, không→P). Nguồn: `Bai7_PhanLop_Bayes.pdf` trang 17.
- **Khởi tạo trọng số Nơron trong Kohonen SOMs:** Tạo mảng (map) hai chiều với số dòng = 10, số cột = 10. Mỗi thành phần của Nơron 0.500 +/- một giá trị nhỏ được phát sinh ngẫu nhiên. Code C: KSOLayer[i][j][k] = 0.5; val1 = rand() % 100; val1 -= 50.0; val1 /= 500.0 (finally get -0.10 to 0.10); val2 = rand() % 100; val2 -= 50.0; val2 /= 500.0; KSOLayer[i][j][k] += (val1 * val2). Nguồn: `Bai8_Kohonen.pdf` trang 15.
- **Code tính khoảng cách và tìm nơron chiến thắng (Bước 2):** GetTrainVector(); Smallest = 10000; SmallestPositionX = SmallestPositionY = 0. For each node (x,y) in map: Distance = 0. For z = 0 to NumberFeatures: D = TrainVector[z] - KSOLayer[x][y][z]; D *= D; Distance += D. Distance = sqrt(Distance). If Distance <= Smallest: Smallest = Distance; SmallestPositionX = x; SmallestPositionY = y. UpdateWeights(SmallestPositionX, SmallestPositionY). Nguồn: `Bai8_Kohonen.pdf` trang 20.
- **Code cập nhật trọng số vùng lân cận (Bước 3):** for (i = LowX; i <= HighX; i++) for (j = LowY; j <= HighY; j++) for (k = 0; k < NumFeatures; k++) { work = TrainVector[k] - KSOLayer[i][j][k]; KSOLayer[i][j][k] += Alpha * work; } Nguồn: `Bai8_Kohonen.pdf` trang 23.
- **Minh họa Kohonen Update Process:** Wining Node (nơron chiến thắng, màu vàng) ở giữa. Neighborhood Nodes (N = 2) là các nơron láng giềng màu xanh lá trong bán kính 2. Các nơron ngoài vùng lân cận màu đỏ không được cập nhật. Nguồn: `Bai8_Kohonen.pdf` trang 22.
- **Kết quả gom cụm ảnh viễn thám:** Kết quả gom cụm bằng mạng Kohonen trên dữ liệu ảnh viễn thám: Water Clusters (xanh dương), Cloud (trắng), Vegetation Clusters (xanh lá), Base Soil or Rock (đỏ/vàng). Nguồn: `Bai8_Kohonen.pdf` trang 26.

## 4. Số liệu quan trọng (96 số)

| Số liệu | Ý nghĩa | Nguồn slide (PDF) | Trang |
|---|---|---|---|
| 80% / 20% | Khai thác thông tin truyền thống: 80% thông tin từ CSDL, còn lại 20% thông tin nhưng chứa đựng thông tin quan trọng. | Bai1_TongQuan_XuanHung_New.pdf | 14 |
| > 50 triệu | Số dân khẩu trong CSDL dân cư Thành Phố HCM (ví dụ minh họa dữ liệu khổng lồ) | Bai1_TongQuan_XuanHung_New.pdf | 13 |
| > 1 triệu | Số bản ghi trong CSDL tuyển sinh đại học (ví dụ minh họa dữ liệu khổng lồ) | Bai1_TongQuan_XuanHung_New.pdf | 13 |
| 66.6% | Tỉ lệ khách hàng mua Bia thì sẽ mua mực (ví dụ minh họa luật kết hợp) | Bai1_TongQuan_XuanHung_New.pdf | 20 |
| 80% | Tỉ lệ khách hàng gởi tiền tiết kiệm trên 80 triệu thì 3 tháng sau gởi thêm 20 triệu (ví dụ minh họa mẫu tuần tự) | Bai1_TongQuan_XuanHung_New.pdf | 21 |
| ±0.01 .. ±0.1 | Mối tương quan quá thấp (HSTQ Pearson) — _slide: Bảng phân tích hệ số tương quan_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 25 |
| ±0.2 .. ±0.3 | Mối tương quan thấp (HSTQ Pearson) — _slide: Bảng phân tích hệ số tương quan_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 25 |
| ±0.4 .. ±0.5 | Mối tương quan trung bình (HSTQ Pearson) — _slide: Bảng phân tích hệ số tương quan_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 25 |
| ±0.6 .. ±0.7 | Mối tương quan cao (HSTQ Pearson) — _slide: Bảng phân tích hệ số tương quan_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 25 |
| ±0.8 trở lên | Mối tương quan rất cao (HSTQ Pearson) — _slide: Bảng phân tích hệ số tương quan_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 25 |
| r = -0.925 | Hệ số tương quan trong ví dụ số năm sử dụng vs giá bán — tương quan rất cao và nghịch (\\|r\\| > 0.8) — _slide: Ví dụ tính HSTQ 11 mẫu_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 29 |
| b1 = -2.03; b0 = 19.57 | Tham số đường hồi quy y = b0 + b1*x trong ví dụ (giá bán giảm ~2.03 triệu mỗi năm sử dụng) — _slide: Ví dụ tính HSTQ 11 mẫu_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 28 |
| Year 2002=$1,568,000; 2003=$2,356,000; 2004=$3,594,000 | Doanh số bán hàng sau khi kết hợp bằng Sum() theo year (data cube aggregation) — _slide: Ví dụ data cube aggregation_ | Bai1_2_TienXuLyDuLieu_Final-converted.pdf | 40 |
| 0.5% | Support ví dụ luật Khăn ⇒ bia — _slide: Ví dụ minh họa_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 5 |
| 60% | Confidence ví dụ luật Khăn ⇒ bia — _slide: Ví dụ minh họa_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 5 |
| 80% | Confidence ví dụ khách mua bia sẽ mua thuốc lá — _slide: Ví dụ minh họa_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 3 |
| 75% | Confidence ví dụ khách mua quần tây sẽ mua áo sơ mi — _slide: Ví dụ minh họa_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 3 |
| 87% | Confidence ví dụ khách mua sữa Minamilk sẽ mua trà Lipton — _slide: Ví dụ minh họa_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 3 |
| minsupp=0.4 | Ngưỡng độ phổ biến tối thiểu trong ví dụ chính (5 giao dịch, 4 mặt hàng) — _slide: Ví dụ minh họa Apriori_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 11 |
| minconf=0.67 | Ngưỡng độ tin cậy tối thiểu ví dụ luật r1: {i1,i2}→{i3} — _slide: Ví dụ tìm luật kết hợp_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 20 |
| minsupp=0.3 | Ngưỡng độ phổ biến trong Bài tập 1 và Bài tập 2 — _slide: Bài tập cuối chương_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 21 |
| minconfidence=1.0 | Ngưỡng độ tin cậy trong Bài tập 1 và Bài tập 2 — _slide: Bài tập cuối chương_ | Bai2_TapPhoBienVaLuatKetHop_Final.pdf | 21 |
| 0 ≤ α_B ≤ 1 | Khoảng giá trị độ chính xác của tập thô — _slide: Định nghĩa độ chính xác_ | Bai3_Reduct.pdf | 19 |
| α = 2/5 = 0.4 | Độ chính xác xấp xỉ tập X={o1,o3,o4} qua B={trời,gió} — _slide: Bài giải câu 1a_ | Bai3_Reduct.pdf | 33 |
| k = 6/8 = 0.66 | Mức độ phụ thuộc của C={Ketqua} vào B={trời,gió} - phụ thuộc một phần — _slide: Bài giải câu 1b_ | Bai3_Reduct.pdf | 34 |
| P(C1=Yes) = 4/9 | Xác suất tiên nghiệm lớp Yes trong tập 9 mẫu Ví dụ 1 — _slide: Ước lượng P(Ci)_ | Bai5.1_PhanLop_Bayes.pdf | 9 |
| P(C2=No) = 5/9 | Xác suất tiên nghiệm lớp No trong tập 9 mẫu Ví dụ 1 — _slide: Ước lượng P(Ci)_ | Bai5.1_PhanLop_Bayes.pdf | 9 |
| P(p) = 9/14 | Xác suất tiên nghiệm lớp p (đi chơi) trong tập 14 mẫu tennis — _slide: Ví dụ 2_ | Bai5.1_PhanLop_Bayes.pdf | 15 |
| P(n) = 5/14 | Xác suất tiên nghiệm lớp n (không chơi) trong tập 14 mẫu tennis — _slide: Ví dụ 2_ | Bai5.1_PhanLop_Bayes.pdf | 15 |
| P(Yes\|Nắng,Nóng) = 0.028 | Ví dụ 1 - lớp Yes cho mẫu {Nắng, Nóng} — _slide: Ví dụ 1_ | Bai5.1_PhanLop_Bayes.pdf | 12 |
| P(No\|Nắng,Nóng) = 0.133 | Ví dụ 1 - lớp No cho mẫu {Nắng, Nóng} (được chọn) — _slide: Ví dụ 1_ | Bai5.1_PhanLop_Bayes.pdf | 12 |
| P(X\|p)·P(p) = 0.010582 | Ví dụ 2 - X1={mưa, nóng, cao, không} theo lớp p — _slide: Ví dụ 2_ | Bai5.1_PhanLop_Bayes.pdf | 16 |
| P(X\|n)·P(n) = 0.027428 | Ví dụ 2 - X1={mưa, nóng, cao, không} theo lớp n (được chọn) — _slide: Ví dụ 2_ | Bai5.1_PhanLop_Bayes.pdf | 16 |
| P(Yes\|X) = 0.0115 (Laplace) | X=(Overcast, Cool, High, Strong) → lớp Yes — _slide: Laplace smoothing_ | Bai5.1_PhanLop_Bayes.pdf | 28 |
| P(No\|X) = 0.0048 (Laplace) | X=(Overcast, Cool, High, Strong) — lớp No thua — _slide: Laplace smoothing_ | Bai5.1_PhanLop_Bayes.pdf | 28 |
| P(Yes\|X1) = 0.056818, P(No\|X1) = 0.133929 | Laplace - X1={Sunny, High} → lớp No — _slide: Bài tập cuối chương_ | Bai5.1_PhanLop_Bayes.pdf | 32 |
| P(Yes\|X2) = 0.099432, P(No\|X2) = 0.053571 | Laplace - X2={Sunny, Normal} → lớp Yes — _slide: Bài tập cuối chương_ | Bai5.1_PhanLop_Bayes.pdf | 32 |
| 0.863 | I(10,4) - Entropy toàn tập golf 14 mẫu (10 Yes, 4 No) | Bai5_PhanLop_CayQuyetDinh.pdf | 44 |
| 0.694 | E(Outlook) - Entropy sau khi chia theo Outlook | Bai5_PhanLop_CayQuyetDinh.pdf | 45 |
| 0.169 | Gain(Outlook) | Bai5_PhanLop_CayQuyetDinh.pdf | 45 |
| 0.796 | E(Temp) | Bai5_PhanLop_CayQuyetDinh.pdf | 46 |
| 0.067 | Gain(Temp) | Bai5_PhanLop_CayQuyetDinh.pdf | 46 |
| 0.985 | I(High=[4+,3-]) của Humidity | Bai5_PhanLop_CayQuyetDinh.pdf | 47 |
| 0.592 | I(Normal=[6+,1-]) của Humidity | Bai5_PhanLop_CayQuyetDinh.pdf | 47 |
| 0.075 | Gain(S, Humidity) | Bai5_PhanLop_CayQuyetDinh.pdf | 47 |
| 0.811 | I(Weak=[6+,2-]) của Wind | Bai5_PhanLop_CayQuyetDinh.pdf | 48 |
| 0.918 | I(Strong=[4+,2-]) của Wind (chỉnh sửa từ giá trị hiển thị 1.000) | Bai5_PhanLop_CayQuyetDinh.pdf | 48 |
| 0.006 | Gain(S, Wind) | Bai5_PhanLop_CayQuyetDinh.pdf | 48 |
| 0.971 | I(3,2) - entropy cho tập Sunny và Rain (5 mẫu 3-2) | Bai5_PhanLop_CayQuyetDinh.pdf | 49 |
| 0.459 | Gini(D) toàn tập golf = 1 - (9/14)^2 - (5/14)^2 | Bai5_PhanLop_CayQuyetDinh.pdf | 55 |
| 0.343 | GiniOutlook(D) | Bai5_PhanLop_CayQuyetDinh.pdf | 55 |
| 0.48 | Gini(Ssunny) = Gini(Srainy) = 1-(2/5)^2-(3/5)^2 | Bai5_PhanLop_CayQuyetDinh.pdf | 55 |
| 0.405 | GiniTemperature(D) | Bai5_PhanLop_CayQuyetDinh.pdf | 57 |
| 0.367 | GiniHumidity(D) | Bai5_PhanLop_CayQuyetDinh.pdf | 57 |
| 0.43 | GiniWind(D) | Bai5_PhanLop_CayQuyetDinh.pdf | 57 |
| 0.300 | Gini nhỏ nhất tại split Taxable Income = 97 | Bai5_PhanLop_CayQuyetDinh.pdf | 63 |
| 4 bước | Số bước của thuật toán k-means — _slide: Slide 'Thuật toán gom cụm k-mean'_ | Bai6_Gomcum_new.pdf | 15 |
| q=1 | Minkowski trở thành Manhattan (city block) — _slide: Slide 'Các biến thang đo khoảng (4)'_ | Bai6_Gomcum_new.pdf | 14 |
| q=2 | Minkowski trở thành Euclidean — _slide: Slide 'Các biến thang đo khoảng (4)'_ | Bai6_Gomcum_new.pdf | 14 |
| v1 = (1,3) | Vector trọng tâm cụm 1 khởi tạo trong ví dụ k=2 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 21 |
| v2 = (1.93, 2.33) | Vector trọng tâm cụm 2 khởi tạo trong ví dụ k=2 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 23 |
| d(x1,v2) = 1.14 | Khoảng cách Euclidean từ x1 tới v2 trong vòng 1 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 25 |
| d(x2,v1)=0.54; d(x2,v2)=0.97 | Khoảng cách của x2 tới hai trọng tâm — xếp x2 vào c1 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 26 |
| d(x3,v1)=0.36; d(x3,v2)=0.78 | x3 xếp vào c1 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 26 |
| d(x4,v1)=2.83; d(x4,v2)=1.70 | x4 xếp vào c2 — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 26 |
| V1(1.13, 3); V2(3,1) | Trọng tâm mới sau vòng 1 — _slide: Slide 'Tính lại trọng tâm'_ | Bai6_Gomcum_new.pdf | 28 |
| \|U2 - U1\| = 0 | Điều kiện hội tụ — thuật toán dừng — _slide: Slide 'Ví dụ (tt)'_ | Bai6_Gomcum_new.pdf | 29 |
| TP=25 | True Positive - dự đoán đúng người bị cao huyết áp — _slide: Bảng confusion matrix bài tập cao huyết áp_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 6 |
| FN=15 | False Negative - dự đoán nhầm người bị (cao huyết áp) thành bình thường — _slide: Bảng confusion matrix bài tập cao huyết áp_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 6 |
| FP=10 | False Positive - dự đoán nhầm người bình thường thành bị cao huyết áp — _slide: Bảng confusion matrix bài tập cao huyết áp_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 6 |
| TN=50 | True Negative - dự đoán đúng người bình thường — _slide: Bảng confusion matrix bài tập cao huyết áp_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 6 |
| Accuracy = 0.75 (75%) | Mô hình dự đoán đúng 75% tổng số trường hợp trong bài tập cao huyết áp — _slide: Bài giải bài tập áp dụng_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 13 |
| Precision ≈ 0.714 (71.4%) | Trong số người bị dự đoán là cao huyết áp, khoảng 71.4% là đúng — _slide: Bài giải bài tập áp dụng_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 14 |
| Recall = 0.625 (62.5%) | Mô hình phát hiện đúng 62.5% số người thực sự bị cao huyết áp — _slide: Bài giải bài tập áp dụng_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 15 |
| F1-Score ≈ 0.666 | Chỉ số cân bằng giữa Precision và Recall khoảng 0.666 — _slide: Bài giải bài tập áp dụng_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 16 |
| TP=40, FN=5, FP=10, TN=45 | Ma trận confusion matrix của bài tập trên lớp - mô hình chẩn đoán cao huyết áp thứ hai — _slide: Bài tập trên lớp_ | Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf | 17 |
| 4/9 | P(C1=Yes) trong ví dụ 1 (tập huấn luyện 9 mẫu, 4 Yes) — _slide: Ví dụ 1_ | Bai7_PhanLop_Bayes.pdf | 8 |
| 5/9 | P(C2=No) trong ví dụ 1 — _slide: Ví dụ 1_ | Bai7_PhanLop_Bayes.pdf | 8 |
| 9/14 | P(p) - xác suất tiên nghiệm lớp p (chơi tennis) trong ví dụ 2 — _slide: Ví dụ 2_ | Bai7_PhanLop_Bayes.pdf | 14 |
| 5/14 | P(n) - xác suất tiên nghiệm lớp n (không chơi) trong ví dụ 2 — _slide: Ví dụ 2_ | Bai7_PhanLop_Bayes.pdf | 14 |
| 0.028 | P(Yes\\|Nắng, Nóng) = 1/4·1/4·4/9 - ví dụ 1 — _slide: Ví dụ 1_ | Bai7_PhanLop_Bayes.pdf | 12 |
| 0.133 | P(No\\|Nắng, Nóng) = 3/5·2/5·5/9 - ví dụ 1, chọn không đi chơi — _slide: Ví dụ 1_ | Bai7_PhanLop_Bayes.pdf | 12 |
| 0.010582 | P(X\\|p)·P(p) trong ví dụ 2 với X=<mưa,nóng,cao,không> — _slide: Ví dụ 2_ | Bai7_PhanLop_Bayes.pdf | 15 |
| 0.018286 | P(X\\|n)·P(n) trong ví dụ 2 - lớn hơn nên phân X vào lớp n — _slide: Ví dụ 2_ | Bai7_PhanLop_Bayes.pdf | 15 |
| 0/5 | P(U ám\\|No) = 0/5 trong ví dụ 1 (vấn đề zero probability - có thể cần Laplace smoothing) — _slide: Ví dụ 1_ | Bai7_PhanLop_Bayes.pdf | 9 |
| 0 | P(u ám\\|n) = 0 trong ví dụ 2 (vấn đề zero probability) — _slide: Ví dụ 2_ | Bai7_PhanLop_Bayes.pdf | 14 |
| 1980 | Năm mạng Kohonen được phát triển bởi Teuvo Kohonen — _slide: Slide Giới thiệu về mạng Kohonen_ | Bai8_Kohonen.pdf | 10 |
| [0.01…0.5] | Khoảng giá trị của hệ số học α (Alpha) — _slide: Slide Kohonen SOMS: chi tiết bước 3_ | Bai8_Kohonen.pdf | 21 |
| 0.2 | Giá trị Alpha khởi tạo trong code minh họa — _slide: Slide Kohonen SOMs: cập nhật hệ số_ | Bai8_Kohonen.pdf | 24 |
| 10 | Giá trị TheHood khởi tạo (bán kính vùng lân cận ban đầu) — _slide: Slide Kohonen SOMs: cập nhật hệ số_ | Bai8_Kohonen.pdf | 24 |
| 1000 | HoodDrop - số epoch giữa các lần giảm bán kính vùng lân cận — _slide: Slide Kohonen SOMs: cập nhật hệ số_ | Bai8_Kohonen.pdf | 24 |
| 0.500 | Giá trị trung tâm khi khởi tạo mỗi thành phần Nơron (±giá trị nhỏ ngẫu nhiên) — _slide: Slide Kohonen SOMS: chi tiết bước 1_ | Bai8_Kohonen.pdf | 16 |
| 10x10 | Kích thước map ví dụ (10 dòng x 10 cột) — _slide: Slide Kohonen SOMS: chi tiết bước 1_ | Bai8_Kohonen.pdf | 15 |
| N = 2 | Bán kính vùng lân cận trong ví dụ Kohonen Update Process — _slide: Slide Kohonen Update Process_ | Bai8_Kohonen.pdf | 22 |
| -0.10 to 0.10 | Khoảng nhiễu ngẫu nhiên cộng vào giá trị khởi tạo 0.5 của trọng số — _slide: Code khởi tạo_ | Bai8_Kohonen.pdf | 17 |
| 5x5 | Kích thước Map bài tập (5 dòng, 5 cột) để gom cụm 9 điểm 2D — _slide: Slide Bài tập_ | Bai8_Kohonen.pdf | 27 |

> Dùng bảng này để verify số liệu khi viết bài (fabrication check trong `/reviewing` sẽ đối chiếu).

### ⚠️ Bất đồng giữa 2 slide Naive Bayes

Cùng bài toán X=<mưa, nóng, cao, không> nhưng 2 slide cho kết quả khác nhau vì lấy P(không|n) khác nhau:

- `Bai5.1_PhanLop_Bayes.pdf` trang 16: P(X|n)·P(n) = 3/5·2/5·5/9 dùng P(không|n)=3/5 → **0.027428** (chọn n).
- `Bai7_PhanLop_Bayes.pdf` trang 15: P(X|n)·P(n) = 2/5·2/5·4/5·2/5·5/14 dùng P(không|n)=2/5 → **0.018286** (chọn n).

Khi làm bài tập, đếm lại tần suất từ bảng huấn luyện gốc trước khi trích công thức, đừng copy máy móc từ slide nào.

## 5. Từ khoá Anh-Việt (105 cặp)

| VI | EN | Framework |
|---|---|---|
| Xác suất a-posteriori (hậu nghiệm) | a-posteriori probability P(C|X) | Naive Bayes |
| Độ chính xác tổng thể | Accuracy | Chỉ số đánh giá mô hình |
| Độ chính xác của tập thô | Accuracy of rough set | Rough set (Pawlak) |
| Ưu điểm - Nhược điểm Naive Bayes | Advantages / Disadvantages | Naive Bayes |
| Ưu điểm Naive Bayes | Advantages of Naive Bayes |  |
| Vế trái (tiền đề) | Antecedent (LHS) | Association Rule |
| Luật kết hợp | Association rules | Các kỹ thuật khai thác dữ liệu |
| Phụ thuộc thuộc tính | Attribute dependency | Rough set (Pawlak) |
| Vùng B-biên của X | B-boundary region | Rough set (Pawlak) |
| Quan hệ bất khả phân biệt | B-indiscernibility relation | Rough set (Pawlak) |
| Xấp xỉ B-dưới | B-lower approximation | Rough set (Pawlak) |
| Vùng B-ngoài của X | B-outside region | Rough set (Pawlak) |
| Xấp xỉ B-trên | B-upper approximation | Rough set (Pawlak) |
| Định lý Bayes | Bayes theorem | Bayes |
| Phân lớp bằng Bayes | Bayesian classification | Naive Bayes |
| Thuộc tính gán nhãn lớp | Class label attribute | Xây dựng mô hình |
| Phân lớp | Classification | Các kỹ thuật khai thác dữ liệu |
| Gom cụm | Clustering | Các kỹ thuật khai thác dữ liệu |
| Tính toàn vẹn | completeness | Chất lượng dữ liệu (data quality) |
| Tạo cây phân cấp ý niệm | concept hierarchy generation | Rời rạc hoá và cây phân cấp ý niệm |
| Confidence (Độ tin cậy / độ mạnh) | Confidence | Association Rule Metrics |
| Độ tin cậy của luật | Confidence of rule | Association Rule Metrics |
| Ma trận nhầm lẫn | Confusion Matrix | Confusion Matrix |
| Mệnh đề kết quả (vế phải) | Consequent (RHS) | Association Rule |
| Tính nhất quán | consistency | Chất lượng dữ liệu (data quality) |
| Phân tích tương quan | correlation analysis | Phát hiện dư thừa |
| Tính hiện hành | currency/timeliness | Chất lượng dữ liệu (data quality) |
| Dữ liệu | Data | Data - Information - Knowledge hierarchy |
| Phân lớp dữ liệu | Data classification |  |
| Làm sạch dữ liệu | data cleaning/cleansing | Các kỹ thuật tiền xử lý dữ liệu |
| Tích hợp dữ liệu | data integration | Các kỹ thuật tiền xử lý dữ liệu |
| Khai phá dữ liệu (KPDL) | Data mining | KDD |
| Khai thác dữ liệu | Data Mining (KTDL) |  |
| Ngữ cảnh khai thác dữ liệu | Data mining context | KTDL Context |
| Thu giảm dữ liệu | data reduction | Các kỹ thuật tiền xử lý dữ liệu |
| Biến đổi dữ liệu | data transformation | Các kỹ thuật tiền xử lý dữ liệu |
| Vấn đề mâu thuẫn giá trị dữ liệu | data value conflicts | Tích hợp dữ liệu |
| Nhà kho - OLAP | Data warehouse - OLAP | Các kỹ thuật khai thác dữ liệu |
| Hệ quyết định | Decision System (DS) | Rough set (Pawlak) |
| Cây quyết định | Decision tree | Học có giám sát |
| Cấu trúc cây quyết định | Decision tree structure | Cấu trúc cây |
| Thu giảm chiều | dimensionality reduction | Thu giảm dữ liệu |
| Nhược điểm Naive Bayes | Disadvantages of Naive Bayes |  |
| Hàm phân biệt | Discernibility function | Rough set (Pawlak) |
| Ma trận phân biệt | Discernibility matrix | Rough set (Pawlak) |
| KTDL theo hướng khám phá | Discovery-driven data mining |  |
| Rời rạc hoá dữ liệu | discretization | Rời rạc hoá dữ liệu |
| Độ đo khoảng cách - điều kiện lý tưởng | Distance metric axioms | Distance metric |
| Vấn đề nhận dạng thực thể | entity identification problem | Tích hợp dữ liệu |
| Entropy hai lớp | Entropy (binary) | ID3 |
| Entropy (thông tin cần biết để phân lớp một mẫu) | Entropy / Expected information | ID3 |
| Entropy của thuộc tính | Entropy of attribute | ID3 |
| Khoảng cách Euclidean | Euclidean distance | Distance metric |
| Chỉ số cân bằng F1 | F1-score | Chỉ số đánh giá mô hình |
| Âm tính giả | False Negative (FN) | Confusion Matrix |
| Dương tính giả | False Positive (FP) | Confusion Matrix |
| Gom cụm phẳng | Flat Clustering | Kiến trúc cụm phẳng |
| Tập phổ biến | Frequent itemset | Apriori |
| Tập phổ biến và luật kết hợp | Frequent itemsets and association rules |  |
| Chỉ số Gini | Gini index | CART |
| Mục tiêu của gom cụm | Goal of clustering | Clustering |
| Gom cụm tốt | Good clustering | Clustering quality |
| Thông tin | Information | Data - Information - Knowledge hierarchy |
| Độ lợi thông tin | Information Gain | ID3 |
| Hệ thông tin | Information System (IS) | Rough set (Pawlak) |
| Thuật toán gom cụm k-mean | k-means clustering algorithm | k-means |
| Tri thức | Knowledge | Data - Information - Knowledge hierarchy |
| Khám phá tri thức trong cơ sở dữ liệu | Knowledge discovery in databases (KDD) | KDD |
| Mạng Kohonen | Kohonen Network / SOM | Mạng nơ-ron nhân tạo - Học không giám sát |
| Làm trơn Laplace | Laplace smoothing | Naive Bayes - Laplace smoothing |
| Hệ số học | Learning rate / Alpha | Công thức cập nhật trọng số Kohonen |
| Hồi quy Logistic | Logistic Regression | Mô hình phân loại |
| Khoảng cách Manhattan | Manhattan / city block distance | Distance metric |
| Tập phổ biến tối đại | Maximal frequent itemset | Maximal frequent itemset |
| Chuẩn hoá min-max | min-max normalization | Biến đổi dữ liệu - Chuẩn hoá dữ liệu |
| Khoảng cách Minkowski | Minkowski distance | Distance metric |
| Vùng lân cận | Neighborhood | Thuật toán Kohonen SOM - Bước 3 |
| Thu giảm lượng | numerosity reduction | Thu giảm dữ liệu |
| So trùng đối tượng | object matching | Vấn đề nhận dạng thực thể |
| Hệ số tương quan Pearson | Pearson's product moment coefficient / correlation coefficient | Phân tích tương quan giữa hai thuộc tính số |
| Độ chính xác dương | Precision | Chỉ số đánh giá mô hình |
| Dự đoán | Prediction | Các kỹ thuật khai thác dữ liệu |
| Tích vector biểu diễn | Product of representation vectors | Vector-based Apriori |
| Rừng ngẫu nhiên | Random Forest | Mô hình phân loại |
| Độ nhạy (Recall) | Recall | Chỉ số đánh giá mô hình |
| Rút gọn (Reduct) | Reduct | Rough set (Pawlak) |
| Vấn đề dư thừa | redundancy | Tích hợp dữ liệu |
| Vector biểu diễn tập mặt hàng | Representation vector | Vector-based Apriori |
| Tập thô (rough) | Rough set | Rough set (Pawlak) |
| Tích hợp lược đồ | schema integration | Vấn đề nhận dạng thực thể |
| Khai thác mẫu tuần tự | Sequential pattern mining |  |
| Mẫu tuần tự | Sequential patterns | Các kỹ thuật khai thác dữ liệu |
| Chuẩn hóa dữ liệu (z-score) | Standardization / z-score | Data preprocessing |
| Điều kiện dừng xây dựng cây | Stopping criteria | Xây dựng cây |
| Học có giám sát | Supervised Learning | Phân loại kỹ thuật học máy |
| Support (Độ phổ biến / độ hỗ trợ) | Support | Association Rule Metrics |
| Độ phổ biến của tập mặt hàng | Support of itemset | Support metric |
| Độ phổ biến của vector biểu diễn | Support of representation vector | Vector-based Apriori |
| Tập huấn luyện | Training set | Bước 1 - Xây dựng mô hình |
| Âm tính thật | True Negative (TN) | Confusion Matrix |
| Dương tính thật | True Positive (TP) | Confusion Matrix |
| Học không giám sát | Unsupervised Learning | Phân loại kỹ thuật học máy |
| KTDL theo hướng kiểm tra | Verification-driven data mining |  |
| Nơron chiến thắng | Winning Neuron / Best Matching Unit (BMU) | Thuật toán Kohonen SOM |
| Chuẩn hoá z-score | z-score normalization | Biến đổi dữ liệu - Chuẩn hoá dữ liệu |

## 6. Câu hỏi ôn tập / bài tập thầy đã cho (24 câu)

Trích từ slide bài tập ví dụ / câu hỏi cuối chương. Dùng để dự đoán format đề thi.

1. Các kỹ thuật giảm thiểu nhiễu (noise) trong làm sạch dữ liệu gồm những gì? (Đáp án gợi ý: binning, hồi quy, gom cụm) (Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 15)
2. Cho dữ liệu price đã sắp xếp: 4, 8, 15, 21, 21, 24, 25, 28, 34. Chia 3 bins equal-frequency và làm trơn bằng bin means và bin boundaries. (Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 16)
3. Tính hệ số tương quan Pearson r giữa hai thuộc tính 'số năm sử dụng' và 'giá bán' cho 11 mẫu; kết luận về khả năng loại bỏ thuộc tính dư thừa. (Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 26)
4. So sánh đặc điểm và ứng dụng của biến đổi wavelet (wavelet transforms) và phân tích nhân tố chính (PCA) trong thu giảm chiều. (Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 42)
5. Bài tập 1: Cho bối cảnh gồm các giao tác: o1={d1,d3,d4}; o2={d1,d3,d4}, o3={d3,d5}; o4={d4,d5}; o5={d2,d3,d5}. Tìm các tập phổ biến tối đại minsupp=0,3. Liệt kê 1 số luật thảo ngưỡng minconfidence=1.0. (Bai2_TapPhoBienVaLuatKetHop_Final.pdf trang 21)
6. Bài tập 2: Cho bối cảnh khai thác dữ liệu gồm o1={i1,i3,i4,i6}, o2={i1,i3,i6}, o3={i3,i5,i6}, o4={i1,i2,i4,i5}, o5={i2,i4,i6}, o6={i1,i2,i4,i5,i6}. Tìm các tập phổ biến tối đại theo ngưỡng minsupp=0.3. Các luật kết hợp từ tập phổ biến tối đại theo ngưỡng minconf=1.0. (Bai2_TapPhoBienVaLuatKetHop_Final.pdf trang 22)
7. Cho hệ quyết định thời tiết (Trời, Gió, Ápsuất → Kết quả) 8 đối tượng O1..O8. a) Tính xấp xỉ tập X = {o1, o3, o4} qua tập thuộc tính B = {trời, gió}. b) Khảo sát sự phụ thuộc thuộc tính của C = {Ketqua} vào B = {trời, gió}. (Bai3_Reduct.pdf trang 30)
8. Tìm reduct cho hệ quyết định 8 người (Màu tóc, Chiều cao, Cân nặng, Dùng thuốc → Kết quả bị rám). (Bai3_Reduct.pdf trang 35)
9. Cho bảng tuyển dụng 8 đối tượng O1..O8 (Bằng cấp, Kinh nghiệm, Tiếng Anh, Lời giới thiệu → Tuyển dụng). 1) Khảo sát sự phụ thuộc thuộc tính giữa B = {Bằng cấp, Lời giới thiệu} và C = {Tuyển dụng} và đề xuất một số phân loại chính xác 100%. 2) Tính xấp xỉ tập X = {o1, o2, o3} qua tập thuộc tính B = {bằng cấp, kinh nghiệm}. 3) Tính các reducts. (Bai3_Reduct.pdf trang 45)
10. Bài tập (slide 19, bảng D1-D14 tiếng Anh): Với tập Play tennis 14 mẫu (Outlook, Temp, Humidity, Windy, Play), hãy phân lớp cho các mẫu sau: X1: Outlook=Sunny và Humidity=High; X2: Outlook=Sunny và Humidity=Normal; X3: Outlook=Rainy và Windy=True; X4: Outlook=Rainy và Windy=False. (Bai5.1_PhanLop_Bayes.pdf trang 19)
11. Bài tập (slide 21-22, bảng 14 mẫu tiếng Việt): Tìm luật phân lớp cho X1={thời tiết=nắng, độ ẩm=cao}; X2={thời tiết=nắng, độ ẩm=vừa}; X3={thời tiết=U ám}; X4={thời tiết=mưa, gió=không}; X5={thời tiết=mưa, gió=có}. (Bai5.1_PhanLop_Bayes.pdf trang 22)
12. Xác định lớp cho các mẫu (dùng Laplace, slide 29): X1={Outlook=Sunny, Humidity=high}; X2={Outlook=Sunny, Humidity=normal}; X3={Outlook=Overcast}; X4={Outlook=Rainy, Windy=Weak}; X5={Outlook=Rainy, Windy=Strong}. (Bai5.1_PhanLop_Bayes.pdf trang 29)
13. Cho bảng quyết định với 4 thuộc tính Attr_A, Attr_B, Attr_C, Attr_D (T/F) và 9 mẫu - tính độ lợi thông tin và xây dựng cây quyết định theo ID3 (Bai5_PhanLop_CayQuyetDinh.pdf trang 67)
14. Tính Gini cho các thuộc tính Temperature, Humidity, Wind trong bảng golf (Bai5_PhanLop_CayQuyetDinh.pdf trang 56)
15. Cho bảng 14 dòng age/income/Region/credit_rating/Buy Mobile - xây dựng cây quyết định (Bai5_PhanLop_CayQuyetDinh.pdf trang 72)
16. Cho Sample Experience Table 13 dòng D1-D13 với Hour/Weather/Accident/Stall → Commute (Long/Short/Medium) - xây dựng cây quyết định (Bai5_PhanLop_CayQuyetDinh.pdf trang 73)
17. Cho tập điểm x1={0.7,0.45}, x2={2.8,1}, x3={2.6,1}, x4={1,0.8}, x5={2.5,1.2}, x6={1.3,1.4}, x7={0.4,0.7}, x8={1.7,1.8}, x9={2,2}. Dùng k-means để gom cụm với k = 3. (Bai6_Gomcum_new.pdf trang 31)
18. Cho ma trận nhầm lẫn (phân biệt) của một mô hình chẩn đoán bệnh cao huyết áp: TP=25, FN=15, FP=10, TN=50. Hãy tính Accuracy, Precision, Recall, F1-score và đưa ra các nhận xét, đánh giá về hiệu suất của mô hình dựa trên các tiêu chí này (Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf trang 11)
19. Cho ma trận phân biệt (confusion matrix) của một mô hình chẩn đoán bệnh cao huyết áp: TP=40, FN=5, FP=10, TN=45. Hãy tính Accuracy, Precision, Recall, F1-score và đưa ra các nhận xét, đánh giá về hiệu suất của mô hình dựa trên các tiêu chí này (Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf trang 17)
20. Thiện (18-22 tuổi, Sinh viên, Học tập) nên mua máy tính của hãng nào? (dựa vào bảng khách hàng trong slide 3) (Bai7_PhanLop_Bayes.pdf trang 3)
21. Hôm nay trời Nắng và Nóng, có nên đi chơi không? (dùng Naive Bayes với tập huấn luyện 9 mẫu) (Bai7_PhanLop_Bayes.pdf trang 11)
22. Phân lớp mẫu chưa thấy X = {mưa, nóng, cao} và X = {u ám, mát, bình thường, yếu} với tập huấn luyện 14 mẫu. (Bai7_PhanLop_Bayes.pdf trang 13)
23. Tìm luật phân lớp cho các mẫu X1={thời tiết=nắng, độ ẩm=cao}, X2={thời tiết=nắng, độ ẩm=vừa}, X3={thời tiết=U ám}, X4={thời tiết=mưa, gió=không}, X5={thời tiết=mưa, gió=có} dựa trên tập huấn luyện 14 mẫu. (Bai7_PhanLop_Bayes.pdf trang 18)
24. Cho tập điểm x1={0.7,0.45}, x2={2.8,1}, x3={2.6,1}, x4={1,0.8}, x5={2.5,1.2}, x6={1.3,1.4}, x7={0.4,0.7}, x8={1.7,1.8}, x9={2,2}. Dùng thuật toán gom cụm bằng mạng Kohonen để gom các điểm trong không gian 2 chiều nói trên. Với Map có chiều dài và chiều rộng 5x5 (5 dòng, 5 cột) (Bai8_Kohonen.pdf trang 27)
