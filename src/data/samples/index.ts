/**
 * Bộ dữ liệu mẫu chép ĐÚNG từ slide thầy.
 *
 * Mỗi bộ ghi rõ file slide và số trang trong `source` để lúc kiểm chéo
 * (mốc 2026-09-24) mở đúng trang mà đối chiếu từng số. Sửa số ở đây là làm
 * lệch với slide — đừng sửa để "cho đẹp".
 */
import type { Dataset } from '@/types'

export type SampleDataset = Dataset & {
  /** File slide và trang gốc, VD 'Bai5_PhanLop_CayQuyetDinh.pdf trang 18'. */
  source: string
}

/**
 * Bảng chơi golf 14 mẫu — dùng chung cho ID3 (Bài 5) và Naive Bayes (Bài 5.1).
 * Nguồn: Bai5_PhanLop_CayQuyetDinh.pdf trang 18.
 *
 * Đếm lại từ bảng: 9 Yes / 5 No, nên I(9,5) = 0.940. Slide trang 44 in nhầm
 * S1=10, S2=4 (thành I = 0.863) nhưng chính slide đó lại tính
 * E(Outlook) = 5/14·I(2,3) + 4/14·I(4,0) + 5/14·I(3,2) = 0.694 — tức là dùng
 * đúng bảng 9/5. Bộ số nhất quán là 0.940 / 0.694 / 0.247.
 */
export const PLAY_BALL_14: SampleDataset = {
  name: 'Chơi golf — 14 mẫu (Bài 5)',
  source: 'Bai5_PhanLop_CayQuyetDinh.pdf trang 18',
  decisionAttribute: 'Play',
  attributes: [
    { name: 'Day', type: 'nominal' },
    { name: 'Outlook', type: 'nominal', values: ['Sunny', 'Overcast', 'Rainy'] },
    { name: 'Temp', type: 'nominal', values: ['Hot', 'Mild', 'Cool'] },
    { name: 'Humidity', type: 'nominal', values: ['High', 'Normal'] },
    { name: 'Wind', type: 'nominal', values: ['Weak', 'Strong'] },
    { name: 'Play', type: 'nominal', values: ['Yes', 'No'] },
  ],
  rows: [
    { Day: 'D1', Outlook: 'Sunny', Temp: 'Hot', Humidity: 'High', Wind: 'Weak', Play: 'No' },
    { Day: 'D2', Outlook: 'Sunny', Temp: 'Hot', Humidity: 'High', Wind: 'Strong', Play: 'No' },
    { Day: 'D3', Outlook: 'Overcast', Temp: 'Hot', Humidity: 'High', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D4', Outlook: 'Rainy', Temp: 'Mild', Humidity: 'High', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D5', Outlook: 'Rainy', Temp: 'Cool', Humidity: 'Normal', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D6', Outlook: 'Rainy', Temp: 'Cool', Humidity: 'Normal', Wind: 'Strong', Play: 'No' },
    { Day: 'D7', Outlook: 'Overcast', Temp: 'Cool', Humidity: 'Normal', Wind: 'Strong', Play: 'Yes' },
    { Day: 'D8', Outlook: 'Sunny', Temp: 'Mild', Humidity: 'High', Wind: 'Weak', Play: 'No' },
    { Day: 'D9', Outlook: 'Sunny', Temp: 'Cool', Humidity: 'Normal', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D10', Outlook: 'Rainy', Temp: 'Mild', Humidity: 'Normal', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D11', Outlook: 'Sunny', Temp: 'Mild', Humidity: 'Normal', Wind: 'Strong', Play: 'Yes' },
    { Day: 'D12', Outlook: 'Overcast', Temp: 'Mild', Humidity: 'High', Wind: 'Strong', Play: 'Yes' },
    { Day: 'D13', Outlook: 'Overcast', Temp: 'Hot', Humidity: 'Normal', Wind: 'Weak', Play: 'Yes' },
    { Day: 'D14', Outlook: 'Rainy', Temp: 'Mild', Humidity: 'High', Wind: 'Strong', Play: 'No' },
  ],
}

/**
 * Tập "đi chơi" 9 mẫu của Naive Bayes.
 * Nguồn: Bai5.1_PhanLop_Bayes.pdf trang 12 (P(Yes)=4/9, P(No)=5/9).
 *
 * Slide chỉ in bảng xác suất chứ không in trọn 9 dòng, nên bảng dưới được
 * dựng ngược từ các tần suất slide cho: Thời tiết Nắng|Yes=1/4, U ám|Yes=2/4,
 * Mưa|Yes=1/4, Nắng|No=3/5, U ám|No=0/5, Mưa|No=2/5; Nhiệt độ Nóng|Yes=1/4,
 * Mát|Yes=1/4, Lạnh|Yes=2/4, Nóng|No=2/5, Mát|No=1/5, Lạnh|No=2/5.
 */
export const DI_CHOI_9: SampleDataset = {
  name: 'Đi chơi — 9 mẫu (Bài 5.1)',
  source: 'Bai5.1_PhanLop_Bayes.pdf trang 12',
  decisionAttribute: 'Đi chơi',
  attributes: [
    { name: 'Thời tiết', type: 'nominal', values: ['Nắng', 'U ám', 'Mưa'] },
    { name: 'Nhiệt độ', type: 'nominal', values: ['Nóng', 'Mát', 'Lạnh'] },
    { name: 'Đi chơi', type: 'nominal', values: ['Yes', 'No'] },
  ],
  rows: [
    { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng', 'Đi chơi': 'Yes' },
    { 'Thời tiết': 'U ám', 'Nhiệt độ': 'Mát', 'Đi chơi': 'Yes' },
    { 'Thời tiết': 'U ám', 'Nhiệt độ': 'Lạnh', 'Đi chơi': 'Yes' },
    { 'Thời tiết': 'Mưa', 'Nhiệt độ': 'Lạnh', 'Đi chơi': 'Yes' },
    { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng', 'Đi chơi': 'No' },
    { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Nóng', 'Đi chơi': 'No' },
    { 'Thời tiết': 'Nắng', 'Nhiệt độ': 'Lạnh', 'Đi chơi': 'No' },
    { 'Thời tiết': 'Mưa', 'Nhiệt độ': 'Mát', 'Đi chơi': 'No' },
    { 'Thời tiết': 'Mưa', 'Nhiệt độ': 'Lạnh', 'Đi chơi': 'No' },
  ],
}

/**
 * Bảng bị rám nắng 8 đối tượng — ví dụ tìm reduct.
 * Nguồn: Bai3_Reduct.pdf trang 35. Kết quả slide: F = T ∧ (C ∨ D) ∧ (N ∨ D)
 * = (T ∧ D) ∨ (T ∧ C ∧ N), tức 2 reduct {T,D} và {T,C,N}.
 */
export const BI_RAM_8: SampleDataset = {
  name: 'Bị rám nắng — 8 đối tượng (Bài 3)',
  source: 'Bai3_Reduct.pdf trang 35',
  decisionAttribute: 'Kết quả',
  attributes: [
    { name: 'Người', type: 'nominal' },
    { name: 'Màu tóc', type: 'nominal', values: ['Đen', 'Râm', 'Bạc'] },
    { name: 'Chiều cao', type: 'nominal', values: ['Tầm thước', 'Cao', 'Thấp'] },
    { name: 'Cân nặng', type: 'nominal', values: ['Nhẹ', 'Vừa phải', 'Nặng'] },
    { name: 'Dùng thuốc', type: 'nominal', values: ['Có', 'Không'] },
    { name: 'Kết quả', type: 'nominal', values: ['Bị rám', 'Không'] },
  ],
  rows: [
    { 'Người': 'Hoa', 'Màu tóc': 'Đen', 'Chiều cao': 'Tầm thước', 'Cân nặng': 'Nhẹ', 'Dùng thuốc': 'Không', 'Kết quả': 'Bị rám' },
    { 'Người': 'Lan', 'Màu tóc': 'Đen', 'Chiều cao': 'Cao', 'Cân nặng': 'Vừa phải', 'Dùng thuốc': 'Có', 'Kết quả': 'Không' },
    { 'Người': 'Xuân', 'Màu tóc': 'Râm', 'Chiều cao': 'Thấp', 'Cân nặng': 'Vừa phải', 'Dùng thuốc': 'Có', 'Kết quả': 'Không' },
    { 'Người': 'Hạ', 'Màu tóc': 'Đen', 'Chiều cao': 'Thấp', 'Cân nặng': 'Vừa phải', 'Dùng thuốc': 'Không', 'Kết quả': 'Bị rám' },
    { 'Người': 'Thu', 'Màu tóc': 'Bạc', 'Chiều cao': 'Tầm thước', 'Cân nặng': 'Nặng', 'Dùng thuốc': 'Không', 'Kết quả': 'Bị rám' },
    { 'Người': 'Đông', 'Màu tóc': 'Râm', 'Chiều cao': 'Cao', 'Cân nặng': 'Nặng', 'Dùng thuốc': 'Không', 'Kết quả': 'Không' },
    { 'Người': 'Mơ', 'Màu tóc': 'Râm', 'Chiều cao': 'Tầm thước', 'Cân nặng': 'Nặng', 'Dùng thuốc': 'Không', 'Kết quả': 'Không' },
    { 'Người': 'Đào', 'Màu tóc': 'Đen', 'Chiều cao': 'Thấp', 'Cân nặng': 'Nhẹ', 'Dùng thuốc': 'Có', 'Kết quả': 'Không' },
  ],
}

/**
 * Bảng tuyển dụng 8 đối tượng.
 * Nguồn: Bai3_Reduct.pdf trang 25. Kết quả slide: f = ed ∨ er, tức 2 reduct
 * {Kinh nghiệm, Bằng cấp} và {Kinh nghiệm, Giới thiệu}.
 */
export const TUYEN_DUNG_8: SampleDataset = {
  name: 'Tuyển dụng — 8 đối tượng (Bài 3)',
  source: 'Bai3_Reduct.pdf trang 25',
  decisionAttribute: 'Tuyển dụng',
  attributes: [
    { name: 'Ứng viên', type: 'nominal' },
    { name: 'Bằng cấp', type: 'nominal', values: ['MBA', 'MSC', 'MCE'] },
    { name: 'Kinh nghiệm', type: 'nominal', values: ['Nhiều', 'Vừa', 'Thấp'] },
    { name: 'Tiếng Anh', type: 'nominal', values: ['Tốt', 'Không'] },
    { name: 'Giới thiệu', type: 'nominal', values: ['Xuất sắc', 'Tốt', 'Trung bình'] },
    { name: 'Tuyển dụng', type: 'nominal', values: ['Chấp nhận', 'Từ chối'] },
  ],
  rows: [
    { 'Ứng viên': 'X1', 'Bằng cấp': 'MBA', 'Kinh nghiệm': 'Vừa', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Xuất sắc', 'Tuyển dụng': 'Chấp nhận' },
    { 'Ứng viên': 'X2', 'Bằng cấp': 'MBA', 'Kinh nghiệm': 'Thấp', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Trung bình', 'Tuyển dụng': 'Từ chối' },
    { 'Ứng viên': 'X3', 'Bằng cấp': 'MCE', 'Kinh nghiệm': 'Thấp', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Tốt', 'Tuyển dụng': 'Từ chối' },
    { 'Ứng viên': 'X4', 'Bằng cấp': 'MSC', 'Kinh nghiệm': 'Nhiều', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Trung bình', 'Tuyển dụng': 'Chấp nhận' },
    { 'Ứng viên': 'X5', 'Bằng cấp': 'MSC', 'Kinh nghiệm': 'Vừa', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Trung bình', 'Tuyển dụng': 'Từ chối' },
    { 'Ứng viên': 'X6', 'Bằng cấp': 'MSC', 'Kinh nghiệm': 'Nhiều', 'Tiếng Anh': 'Tốt', 'Giới thiệu': 'Xuất sắc', 'Tuyển dụng': 'Chấp nhận' },
    { 'Ứng viên': 'X7', 'Bằng cấp': 'MBA', 'Kinh nghiệm': 'Nhiều', 'Tiếng Anh': 'Không', 'Giới thiệu': 'Tốt', 'Tuyển dụng': 'Chấp nhận' },
    { 'Ứng viên': 'X8', 'Bằng cấp': 'MCE', 'Kinh nghiệm': 'Thấp', 'Tiếng Anh': 'Không', 'Giới thiệu': 'Xuất sắc', 'Tuyển dụng': 'Từ chối' },
  ],
}

/**
 * Bảng thời tiết 8 đối tượng — bài tập xấp xỉ và phụ thuộc thuộc tính.
 * Nguồn: Bai3_Reduct.pdf trang 30, bài giải trang 33-34.
 */
export const THOI_TIET_8: SampleDataset = {
  name: 'Thời tiết — 8 đối tượng (Bài 3, bài tập)',
  source: 'Bai3_Reduct.pdf trang 30',
  decisionAttribute: 'Ketqua',
  attributes: [
    { name: 'O', type: 'nominal' },
    { name: 'Troi', type: 'nominal', values: ['Trong', 'May'] },
    { name: 'Gio', type: 'nominal', values: ['Bac', 'Nam'] },
    { name: 'Apsuat', type: 'nominal', values: ['Cao', 'TB', 'Thap'] },
    { name: 'Ketqua', type: 'nominal', values: ['Mua', 'Kmua'] },
  ],
  rows: [
    { O: 'o1', Troi: 'Trong', Gio: 'Bac', Apsuat: 'Cao', Ketqua: 'Kmua' },
    { O: 'o2', Troi: 'May', Gio: 'Nam', Apsuat: 'Cao', Ketqua: 'Mua' },
    { O: 'o3', Troi: 'May', Gio: 'Bac', Apsuat: 'TB', Ketqua: 'Mua' },
    { O: 'o4', Troi: 'Trong', Gio: 'Bac', Apsuat: 'Thap', Ketqua: 'Kmua' },
    { O: 'o5', Troi: 'May', Gio: 'Bac', Apsuat: 'Thap', Ketqua: 'Mua' },
    { O: 'o6', Troi: 'May', Gio: 'Bac', Apsuat: 'Cao', Ketqua: 'Mua' },
    { O: 'o7', Troi: 'May', Gio: 'Nam', Apsuat: 'Thap', Ketqua: 'Kmua' },
    { O: 'o8', Troi: 'Trong', Gio: 'Nam', Apsuat: 'Cao', Ketqua: 'Kmua' },
  ],
}

/**
 * Giá bán 9 mẫu để chia bin và làm trơn.
 * Nguồn: Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 16.
 * Kết quả slide: 3 bin equal-frequency, bin means {9,9,9}/{22,22,22}/{29,29,29},
 * bin boundaries {4,4,15}/{21,21,24}/{25,25,34}.
 */
export const PRICE_9: SampleDataset = {
  name: 'Giá bán — 9 mẫu (Bài 1_2)',
  source: 'Bai1_2_TienXuLyDuLieu_Final-converted.pdf trang 16',
  attributes: [
    { name: 'STT', type: 'numeric' },
    { name: 'price', type: 'numeric' },
  ],
  rows: [4, 8, 15, 21, 21, 24, 25, 28, 34].map((price, i) => ({ STT: i + 1, price })),
}

/**
 * Bảng có ô trống và cột số để thử xử lý thiếu + chuẩn hoá.
 * Không chép từ slide — dựng thêm để demo nhánh "xử lý giá trị thiếu" mà slide
 * chỉ nói lý thuyết chứ không cho bảng số.
 */
export const TIEN_XU_LY_HON_HOP: SampleDataset = {
  name: 'Bảng hỗn hợp có ô trống (tự dựng)',
  source: 'tự dựng để demo xử lý giá trị thiếu — không có trong slide',
  attributes: [
    { name: 'ID', type: 'nominal' },
    { name: 'Tuổi', type: 'numeric' },
    { name: 'Thu nhập', type: 'numeric' },
    { name: 'Nghề', type: 'nominal', values: ['Kỹ sư', 'Bác sĩ', 'Sinh viên'] },
  ],
  rows: [
    { ID: 'A1', 'Tuổi': 25, 'Thu nhập': 12000, 'Nghề': 'Kỹ sư' },
    { ID: 'A2', 'Tuổi': 31, 'Thu nhập': Number.NaN, 'Nghề': 'Bác sĩ' },
    { ID: 'A3', 'Tuổi': Number.NaN, 'Thu nhập': 8000, 'Nghề': 'Sinh viên' },
    { ID: 'A4', 'Tuổi': 45, 'Thu nhập': 30000, 'Nghề': 'Bác sĩ' },
    { ID: 'A5', 'Tuổi': 22, 'Thu nhập': 6000, 'Nghề': 'Sinh viên' },
    { ID: 'A6', 'Tuổi': 38, 'Thu nhập': 21000, 'Nghề': '' },
  ],
}

/**
 * Ngữ cảnh khai thác dữ liệu 5 hoá đơn × 4 mặt hàng.
 * Nguồn: Bai2_TapPhoBienVaLuatKetHop_Final.pdf trang 8, ma trận nhị phân trang 12.
 * o1={i1,i2,i3}, o2={i2,i3,i4}, o3={i2,i3,i4}, o4={i1,i2,i3}, o5={i3,i4}.
 */
export const GIO_HANG_5: SampleDataset = {
  name: 'Giỏ hàng — 5 hoá đơn (Bài 2)',
  source: 'Bai2_TapPhoBienVaLuatKetHop_Final.pdf trang 8',
  attributes: [
    { name: 'Hoá đơn', type: 'nominal' },
    { name: 'i1', type: 'numeric' },
    { name: 'i2', type: 'numeric' },
    { name: 'i3', type: 'numeric' },
    { name: 'i4', type: 'numeric' },
  ],
  rows: [
    { 'Hoá đơn': 'o1', i1: 1, i2: 1, i3: 1, i4: 0 },
    { 'Hoá đơn': 'o2', i1: 0, i2: 1, i3: 1, i4: 1 },
    { 'Hoá đơn': 'o3', i1: 0, i2: 1, i3: 1, i4: 1 },
    { 'Hoá đơn': 'o4', i1: 1, i2: 1, i3: 1, i4: 0 },
    { 'Hoá đơn': 'o5', i1: 0, i2: 0, i3: 1, i4: 1 },
  ],
}

/**
 * Giỏ hàng tên hàng thật, để demo luật kết hợp đọc ra nghĩa được.
 * Không chép từ slide — slide chỉ dùng i1..i4.
 */
export const GIO_HANG_SIEU_THI: SampleDataset = {
  name: 'Giỏ hàng siêu thị (tự dựng)',
  source: 'tự dựng để luật kết hợp đọc ra nghĩa — không có trong slide',
  attributes: [
    { name: 'Hoá đơn', type: 'nominal' },
    { name: 'Bia', type: 'numeric' },
    { name: 'Mực', type: 'numeric' },
    { name: 'Sữa', type: 'numeric' },
    { name: 'Bánh mì', type: 'numeric' },
    { name: 'Trứng', type: 'numeric' },
  ],
  rows: [
    { 'Hoá đơn': 'T1', 'Bia': 1, 'Mực': 1, 'Sữa': 0, 'Bánh mì': 1, 'Trứng': 0 },
    { 'Hoá đơn': 'T2', 'Bia': 1, 'Mực': 1, 'Sữa': 0, 'Bánh mì': 0, 'Trứng': 1 },
    { 'Hoá đơn': 'T3', 'Bia': 1, 'Mực': 0, 'Sữa': 1, 'Bánh mì': 1, 'Trứng': 0 },
    { 'Hoá đơn': 'T4', 'Bia': 0, 'Mực': 0, 'Sữa': 1, 'Bánh mì': 1, 'Trứng': 1 },
    { 'Hoá đơn': 'T5', 'Bia': 1, 'Mực': 1, 'Sữa': 0, 'Bánh mì': 1, 'Trứng': 1 },
    { 'Hoá đơn': 'T6', 'Bia': 0, 'Mực': 0, 'Sữa': 1, 'Bánh mì': 0, 'Trứng': 1 },
  ],
}

/**
 * Bốn điểm của ví dụ k-means.
 * Nguồn: Bai6_Gomcum_new.pdf trang 18-29. x1=(1,3), x2=(1.5,3.2),
 * x3=(1.3,2.8), x4=(3,1); k=2; U0: c1={x1}, c2={x2,x3,x4}.
 */
export const KMEANS_4_DIEM: SampleDataset = {
  name: 'k-means — 4 điểm (Bài 6)',
  source: 'Bai6_Gomcum_new.pdf trang 18',
  attributes: [
    { name: 'Điểm', type: 'nominal' },
    { name: 'x', type: 'numeric' },
    { name: 'y', type: 'numeric' },
  ],
  rows: [
    { 'Điểm': 'x1', x: 1, y: 3 },
    { 'Điểm': 'x2', x: 1.5, y: 3.2 },
    { 'Điểm': 'x3', x: 1.3, y: 2.8 },
    { 'Điểm': 'x4', x: 3, y: 1 },
  ],
}

/**
 * Năm điểm để thấy k-means chạy nhiều vòng hơn ví dụ 4 điểm.
 *
 * Chỉ A1(1,9) và A5(8,2) là lấy từ docs/format-trinh-bay-cua-GV.md (khuôn bài
 * k-means đã qua nhận xét GV nhắc tới hai điểm này); ba điểm còn lại tự đặt để
 * bộ dữ liệu tách được thành 3 cụm. Đừng dùng bộ này để đối chiếu với slide.
 */
export const KMEANS_5_DIEM: SampleDataset = {
  name: 'k-means — 5 điểm A1..A5 (tự dựng)',
  source: 'tự dựng; A1 và A5 theo docs/format-trinh-bay-cua-GV.md',
  attributes: [
    { name: 'Điểm', type: 'nominal' },
    { name: 'x', type: 'numeric' },
    { name: 'y', type: 'numeric' },
  ],
  rows: [
    { 'Điểm': 'A1', x: 1, y: 9 },
    { 'Điểm': 'A2', x: 1, y: 3 },
    { 'Điểm': 'A3', x: 3, y: 1 },
    { 'Điểm': 'A4', x: 4, y: 2 },
    { 'Điểm': 'A5', x: 8, y: 2 },
  ],
}

/** Ba cụm tách rõ trên mặt phẳng — để Kohonen hiện được heatmap có hình thù. */
export const SOM_3_CUM: SampleDataset = {
  name: 'Ba cụm 2 chiều (tự dựng)',
  source: 'tự dựng để Kohonen hiện heatmap — slide Bài 8 không cho bảng số',
  attributes: [
    { name: 'Mẫu', type: 'nominal' },
    { name: 'x', type: 'numeric' },
    { name: 'y', type: 'numeric' },
  ],
  rows: [
    { 'Mẫu': 'p1', x: 0.1, y: 0.15 },
    { 'Mẫu': 'p2', x: 0.15, y: 0.1 },
    { 'Mẫu': 'p3', x: 0.05, y: 0.2 },
    { 'Mẫu': 'p4', x: 0.8, y: 0.85 },
    { 'Mẫu': 'p5', x: 0.85, y: 0.9 },
    { 'Mẫu': 'p6', x: 0.9, y: 0.8 },
    { 'Mẫu': 'p7', x: 0.85, y: 0.15 },
    { 'Mẫu': 'p8', x: 0.9, y: 0.1 },
    { 'Mẫu': 'p9', x: 0.8, y: 0.2 },
  ],
}

/**
 * Kết quả dự đoán cao huyết áp — để dựng Confusion Matrix.
 * Nguồn: Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf trang 11.
 * TP=25, FN=15, FP=10, TN=50 → Accuracy 0.75, Precision 0.714, Recall 0.625,
 * F1 0.666. Bảng dưới liệt kê đúng 100 dòng theo bốn ô đó.
 */
function buildHuyetApRows() {
  const rows: { STT: number; 'Thực tế': string; 'Dự đoán': string }[] = []
  const add = (n: number, actual: string, predicted: string) => {
    for (let i = 0; i < n; i++) {
      rows.push({ STT: rows.length + 1, 'Thực tế': actual, 'Dự đoán': predicted })
    }
  }
  add(25, 'Cao', 'Cao') // TP
  add(15, 'Cao', 'Bình thường') // FN
  add(10, 'Bình thường', 'Cao') // FP
  add(50, 'Bình thường', 'Bình thường') // TN
  return rows
}

export const HUYET_AP_100: SampleDataset = {
  name: 'Chẩn đoán cao huyết áp — 100 ca (Bài 7)',
  source: 'Bai7_DanhGiaHieuSuatMoHinhPhanLoai.pdf trang 11',
  attributes: [
    { name: 'STT', type: 'numeric' },
    { name: 'Thực tế', type: 'nominal', values: ['Cao', 'Bình thường'] },
    { name: 'Dự đoán', type: 'nominal', values: ['Cao', 'Bình thường'] },
  ],
  rows: buildHuyetApRows(),
}

/** Mọi bộ mẫu, để trang chủ đếm được và F12 liệt kê. */
export const ALL_SAMPLES: SampleDataset[] = [
  PLAY_BALL_14,
  DI_CHOI_9,
  BI_RAM_8,
  TUYEN_DUNG_8,
  THOI_TIET_8,
  PRICE_9,
  TIEN_XU_LY_HON_HOP,
  GIO_HANG_5,
  GIO_HANG_SIEU_THI,
  KMEANS_4_DIEM,
  KMEANS_5_DIEM,
  SOM_3_CUM,
  HUYET_AP_100,
]
