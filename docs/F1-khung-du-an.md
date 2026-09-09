# Prompt phiên F1 — Khung dự án

> Chạy ở session Claude Code mở tại `C:\Users\ngocdanh\Documents\me\ktdl-demo`, **không phải** repo `doan`.
> Folder đã tạo sẵn, `git init` xong, remote `origin` đã cấu hình kèm credential, `CLAUDE.md` và
> `docs/` đã có. Session bên đó chỉ cần dán khối dưới.
>
> Prompt này **cố ý không chứa token** — token đã nằm trong `.git/config` của `ktdl-demo`, và file
> này thì được commit vào repo `doan`.

---

Làm phiên **F1 — Khung dự án** của đồ án IE403.

Đọc `CLAUDE.md` và `docs/outline.md` trước khi gõ dòng đầu tiên. `docs/outline.md § Architecture`
và `§ Tech stack` là nguồn sự thật, đừng tự chọn stack khác.

**Phạm vi phiên này: CHỈ dựng khung.** Không cài đặt thuật toán nào. 8 route tạo ra ở phiên này là
route rỗng có tiêu đề và một dòng "đang phát triển" — F4–F11 là việc của người khác, và đụng vào là
giẫm chân họ.

## Việc phải làm

1. **Scaffold** Vite + React 19 + TypeScript trong chính thư mục này (thư mục đã có `CLAUDE.md`,
   `.gitignore`, `docs/` — đừng ghi đè chúng, đừng tạo thư mục con rồi nhét project vào đó).
2. **TanStack Router** file-based routing, plugin Vite sinh `routeTree.gen.ts` (đã có trong `.gitignore`).
3. **Tailwind CSS v4** + **shadcn/ui**, khởi tạo theme, bật dark mode.
4. **Layout + sidebar** với đủ **8 mục** đúng thứ tự dạy trong môn, mỗi mục trỏ một route rỗng:

   | Đường dẫn | Nhãn sidebar |
   |---|---|
   | `/tien-xu-ly` | Tiền xử lý dữ liệu |
   | `/apriori` | Tập phổ biến & luật kết hợp |
   | `/reduct` | Tập thô — Reduct |
   | `/bayes` | Phân lớp Naive Bayes |
   | `/id3` | Cây quyết định ID3 |
   | `/kmeans` | Gom cụm k-means |
   | `/kohonen` | Mạng Kohonen (SOM) |
   | `/danh-gia` | Đánh giá mô hình phân lớp |

   Cộng `/` (trang chủ) và `/gioi-thieu` — hai route này để rỗng, F12 mới làm nội dung.

5. **Khai kiểu dữ liệu dùng chung** trong `src/types/index.ts`: `Dataset`, `Step`, `AlgorithmResult<T>`
   đúng như `CLAUDE.md § luật 2` và `docs/outline.md § Data model`. Đây là hợp đồng giữa 4 người —
   khai sai thì 3 người kia code lệch.
6. **`src/lib/format.ts`**: hàm format số dùng chung, **dấu chấm thập phân, 3 chữ số** (`0.940`).
   Cả 8 route sẽ gọi hàm này. Xem `docs/format-trinh-bay-cua-GV.md`.
7. **Vitest** cấu hình chạy được, kèm một test khói cho `format.ts`.
8. **`README.md`** ngắn: đề tài, 4 thành viên + MSSV, cách chạy, link Vercel.
9. **Commit và push** lên `main`. Repo đang rỗng nên đây là commit đầu tiên.
10. **Deploy Vercel** — hướng dẫn tôi làm nếu cần đăng nhập; framework preset là Vite, output `dist`.

## Definition of Done

Phiên này chỉ đóng khi **cả năm dòng** đúng:

- [ ] `pnpm install && pnpm dev` chạy lên, mở được ở `localhost`
- [ ] `pnpm build` không lỗi TypeScript
- [ ] Sidebar có đủ **8 mục thuật toán**, bấm mục nào cũng ra route tương ứng, không màn hình trắng
- [ ] Đã push lên `main`, `git log` có commit đầu tiên
- [ ] **URL Vercel trả 200** từ trình duyệt ẩn danh, không cần đăng nhập

Dòng cuối là dòng quan trọng nhất — nó là ngưỡng #12 của `docs/rubric.md`, và là thứ ba người còn
lại chờ để bắt đầu. Xong 4 dòng đầu mà chưa deploy thì phiên **chưa đóng**.

## Ràng buộc

- **Không cài thư viện ML** (`sklearn`, `ml.js`, `tensorflow`…). Xem `CLAUDE.md § luật 1`.
- **Không code thuật toán nào** trong phiên này.
- Không commit `.docx` / `.pptx` / `.mp4` vào repo này.
- Không sửa file trong `docs/` — đó là bản sao từ repo `doan`, sửa ở đây sẽ bị lệch với bản gốc.
- Ưu tiên **xong sớm và thô** hơn xong muộn và đẹp: F1–F3 là đường găng, ba người kia đang chờ.
