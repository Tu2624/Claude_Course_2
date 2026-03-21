# SPECIFICATION.md — Personal Expense Tracker Dashboard

Tài liệu đặc tả sản phẩm cho dự án theo dõi thu chi cá nhân. Phiên bản 1.0 — 2026-03-21.

---

## 1. Phân tích người dùng (User Personas)

### Persona A — Nhân viên văn phòng "Minh Tuấn"

- **Hồ sơ:** Nam, 27 tuổi, đi làm full-time, thu nhập cố định hàng tháng ~15 triệu đồng.
- **Bài toán cần giải quyết:** Cuối tháng không biết tiền đi đâu hết. Muốn biết mình đang chi nhiều nhất vào danh mục nào (ăn uống, di chuyển, giải trí) để điều chỉnh thói quen.
- **Kỳ vọng khi mở Dashboard:** Nhìn thấy ngay số dư còn lại trong tháng và tỷ lệ chi tiêu so với thu nhập — không cần đào sâu vào từng con số.
- **Điểm đau kỹ thuật:** Không muốn nhập liệu phức tạp; thêm giao dịch phải nhanh (dưới 30 giây).

### Persona B — Freelancer "Thu Hà"

- **Hồ sơ:** Nữ, 31 tuổi, làm việc tự do (thiết kế + tư vấn), thu nhập biến động theo dự án.
- **Bài toán cần giải quyết:** Cần phân tích dòng tiền theo từng danh mục chi phí (Software, Infrastructure, Operations) để lập kế hoạch tài chính quý. Muốn so sánh tổng thu vs. tổng chi giữa các tháng.
- **Kỳ vọng khi mở Dashboard:** Biểu đồ xu hướng thu chi 6 tháng và bảng chi tiết có thể lọc theo danh mục.
- **Điểm đau kỹ thuật:** Cần dữ liệu lịch sử đáng tin cậy; không chấp nhận số liệu sai do mất đồng bộ giữa UI và database.

---

## 2. Yêu cầu chức năng (Functional Requirements)

### Must-have (Ưu tiên cao — MVP)

| # | Tính năng | Mô tả |
|---|-----------|-------|
| M1 | **Tổng quan tài chính** | Hiển thị 3 chỉ số cốt lõi: Số dư hiện tại (= tổng thu − tổng chi toàn thời gian), Tổng thu trong kỳ lọc, Tổng chi trong kỳ lọc. Tự động tính lại khi thêm/xóa giao dịch. |
| M2 | **Danh sách giao dịch** | Bảng hiển thị tất cả giao dịch, có phân trang (20 dòng/trang), lọc theo: loại (`income`/`expense`), danh mục, và khoảng thời gian. Hiển thị: ngày, mô tả, danh mục, số tiền (màu xanh cho thu, đỏ cho chi). |
| M3 | **Thêm giao dịch** | Form modal với các trường: Mô tả (text), Số tiền (number > 0), Loại (dropdown: Thu nhập / Chi tiêu), Danh mục (dropdown với danh sách cố định), Ngày (date picker, mặc định hôm nay). Sau khi submit: modal đóng, danh sách và KPI cards cập nhật ngay lập tức qua Pinia reactive — không tải lại trang. |
| M4 | **Biểu đồ xu hướng Thu/Chi** | Line Chart hiển thị tổng thu và tổng chi theo từng tháng, trong 6 tháng gần nhất. Hai đường riêng biệt (màu xanh = thu, màu đỏ = chi). Nếu không có dữ liệu cho tháng nào, hiển thị giá trị 0. Nếu toàn bộ dữ liệu trống, hiển thị thông báo "Chưa có giao dịch nào để hiển thị". |
| M5 | **Biểu đồ danh mục chi tiêu** | Donut Chart hiển thị tỷ lệ phần trăm chi tiêu theo danh mục (chỉ tính giao dịch loại `expense`). Chú thích hiển thị tên danh mục và số tiền tuyệt đối. Nếu không có chi tiêu, hiển thị thông báo "Chưa có chi tiêu nào". |

### Should-have (Ưu tiên trung — sau MVP)

| # | Tính năng | Mô tả |
|---|-----------|-------|
| S1 | **Sửa giao dịch** | Nhấn vào một dòng trong bảng để mở modal chỉnh sửa, điền sẵn thông tin hiện tại. Lưu lại sẽ cập nhật real-time. |
| S2 | **Xóa giao dịch** | Nút xóa trên mỗi dòng trong bảng, có bước xác nhận để tránh xóa nhầm. |
| S3 | **Bộ lọc thời gian toàn cục** | Dropdown chọn khoảng thời gian: 7 ngày qua, 30 ngày qua, 3 tháng qua, Tùy chỉnh (date range picker). Áp dụng cho toàn bộ Dashboard (KPI cards, cả hai biểu đồ, bảng giao dịch). |
| S4 | **Xuất dữ liệu CSV** | Nút "Xuất CSV" trong phần bảng giao dịch. Xuất toàn bộ danh sách đang được lọc hiện tại ra file `.csv`. |

---

## 3. Đặc tả màn hình (Screen Mapping)

### 3.1 Bố cục Bento Grid — Dashboard chính (`/`)

Lưới responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, khoảng cách `gap-4`.

```
┌─────────────────────────────────────────────────────────────────────┐
│  Sidebar (cố định)  │  Top Navbar (sticky)                          │
│                     ├───────────────────────────────────────────────┤
│  Dashboard          │  [Số dư]  [Tổng thu]  [Tổng chi]  [Bộ lọc]   │
│  Analytics          │  col-1    col-1       col-1       col-1        │
│  Projects           ├───────────────────────────────────────────────┤
│  Team               │  Biểu đồ Xu hướng Thu/Chi (Line Chart)        │
│  Settings           │  col-span-4 (full width)                       │
│                     ├───────────────────────────────────────────────┤
│                     │  Lịch sử Giao dịch     │  Chi tiêu theo DM    │
│                     │  col-span-2             │  (Donut Chart)       │
│                     │                         │  col-span-2          │
└─────────────────────┴─────────────────────────┴──────────────────────┘
```

**Chi tiết từng ô:**

| Ô | Component | Nội dung |
|---|-----------|----------|
| KPI — Số dư | `KpiCard` | Label: "Số dư hiện tại". Value: tổng thu − tổng chi (định dạng tiền tệ). Trend badge: xanh nếu dương, đỏ nếu âm. |
| KPI — Tổng thu | `KpiCard` | Label: "Tổng thu kỳ này". Value: tổng income trong kỳ lọc. Trend: so sánh với kỳ trước (nếu có). |
| KPI — Tổng chi | `KpiCard` | Label: "Tổng chi kỳ này". Value: tổng expense trong kỳ lọc. Trend: màu đỏ nếu tăng, xanh nếu giảm. |
| Bộ lọc | `DateRangeFilter` | Dropdown chọn khoảng thời gian. Mặc định: "30 ngày qua". |
| Line Chart | `TrendChart` | Tiêu đề: "Xu hướng Thu/Chi". Subtitle: "6 tháng gần nhất". Hai series: Thu nhập (indigo) và Chi tiêu (rose). |
| Bảng giao dịch | `TransactionTable` | Tiêu đề: "Lịch sử giao dịch". Bộ lọc nội bộ (loại, danh mục). Phân trang. Nút "Thêm giao dịch". |
| Donut Chart | `CategoryChart` | Tiêu đề: "Chi tiêu theo danh mục". Chỉ tính expense. Hiển thị top 6 danh mục + "Khác". |

### 3.2 Các trạng thái màn hình

**Trạng thái Loading (Đang tải):**
- Tất cả KPI cards hiển thị skeleton pulse (hình chữ nhật mờ với animation)
- Biểu đồ hiển thị skeleton placeholder cùng kích thước
- Bảng giao dịch hiển thị 5 dòng skeleton
- Nút "Thêm giao dịch" bị disable

**Trạng thái Empty (Chưa có dữ liệu):**
- KPI cards hiển thị giá trị `0` hoặc `—`
- Line Chart: ẩn canvas, hiển thị text "Chưa có giao dịch nào. Bắt đầu bằng cách thêm giao dịch đầu tiên." với nút "Thêm giao dịch"
- Donut Chart: ẩn canvas, hiển thị text "Chưa có chi tiêu nào để phân tích."
- Bảng giao dịch: hiển thị icon và text "Danh sách trống — Nhấn '+ Thêm' để bắt đầu."

**Trạng thái Error (Lỗi kết nối):**
- Hiển thị banner cảnh báo ở đầu trang: "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại."
- Nút "Thử lại" gọi lại API
- Dữ liệu cũ (nếu có trong cache Pinia) vẫn hiển thị nhưng có dấu hiệu "Dữ liệu có thể chưa cập nhật"

---

## 4. Luồng người dùng chính (Core User Flows)

### Flow 1 — Lọc và xem báo cáo

```
Người dùng mở Dashboard (/)
    │
    ▼
[Hệ thống] fetchDashboardData() được gọi trong onMounted()
    │
    ▼
[UI] Hiển thị trạng thái Loading (skeleton)
    │
    ▼
[Hệ thống] API trả dữ liệu → Pinia store cập nhật
    │
    ▼
[UI] Hiển thị dữ liệu mặc định (30 ngày qua)
    │
    ▼
Người dùng nhấn dropdown "Bộ lọc" → chọn "3 tháng qua"
    │
    ▼
[Hệ thống] Store cập nhật dateRange filter
    │
    ▼
[UI] KPI cards, Line Chart, Donut Chart, bảng giao dịch đều re-render
     với dữ liệu trong khoảng thời gian mới — không tải lại trang
    │
    ▼
Người dùng nhìn thấy báo cáo 3 tháng ✓
```

### Flow 2 — Thêm giao dịch mới

```
Người dùng nhấn nút "+ Thêm giao dịch"
    │
    ▼
[UI] Modal "Thêm giao dịch" xuất hiện (overlay, focus trap)
    │
    ▼
Người dùng điền form:
  - Mô tả: "Tiền điện tháng 3"
  - Số tiền: 450000
  - Loại: Chi tiêu (expense)
  - Danh mục: Utilities
  - Ngày: 2026-03-21 (mặc định hôm nay)
    │
    ▼
Người dùng nhấn "Lưu"
    │
    ▼
[Hệ thống] Validate form (số tiền > 0, mô tả không rỗng)
    │
    ├─── Validation FAIL → Hiển thị lỗi inline bên dưới trường liên quan
    │
    └─── Validation PASS
            │
            ▼
        [Hệ thống] Gọi addTransaction() trong Pinia store
            │
            ▼
        [Hệ thống] POST /api/transactions → backend lưu vào SQLite
            │
            ▼
        [Hệ thống] Store cập nhật transactions[], tính lại
                   totalIncome / totalExpenses (computed reactive)
            │
            ▼
        [UI] Modal đóng lại
            │
            ▼
        [UI] KPI cards hiển thị số mới ngay lập tức
             Bảng giao dịch xuất hiện dòng mới ở đầu
             Biểu đồ cập nhật nếu tháng hiện tại nằm trong kỳ lọc
             — Không có page reload ✓
```

---

## 5. Đặc tả kỹ thuật (Technical Specs)

### 5.1 Cấu trúc Database (SQLite)

**Bảng `transactions`**

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| `id` | `TEXT` | `PRIMARY KEY` | UUID v4, sinh phía server |
| `description` | `TEXT` | `NOT NULL` | Mô tả giao dịch, tối đa 255 ký tự |
| `amount` | `REAL` | `NOT NULL`, `> 0` | Giá trị tuyệt đối (luôn dương) |
| `type` | `TEXT` | `NOT NULL`, `CHECK(type IN ('income', 'expense'))` | Loại giao dịch |
| `date` | `TEXT` | `NOT NULL` | Định dạng ISO 8601 (`YYYY-MM-DD`) |
| `category` | `TEXT` | `NOT NULL` | Danh mục (xem danh sách bên dưới) |
| `created_at` | `TEXT` | `DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo bản ghi |

**Danh sách danh mục hợp lệ (cố định ở v1):**
`Consulting`, `Design`, `Software`, `Infrastructure`, `Operations`, `Utilities`, `Food`, `Transport`, `Entertainment`, `Other`

**Lưu ý thiết kế:**
- `amount` luôn lưu dương; chiều thu/chi xác định bởi `type`.
- `date` lưu dạng string ISO 8601 để tương thích với SQLite và dễ query theo khoảng.
- Không có bảng user ở v1 — ứng dụng là single-user, không cần authentication.

### 5.2 Vai trò MCP (SQLite MCP Server)

MCP server (`server/mcp.js`) hoạt động qua `stdio` transport, phục vụ **Claude** (không phải frontend):

- **Mục đích:** Cho phép Claude truy vấn trực tiếp SQLite database để phân tích dữ liệu, kiểm tra tính nhất quán, và hỗ trợ debug trong quá trình phát triển.
- **Không phải:** Kênh giao tiếp giữa Vue frontend và backend — frontend chỉ gọi REST API.
- **Tool cần bổ sung:** `query_transactions(sql: string)` — thực thi câu truy vấn SELECT và trả về kết quả JSON.
- **Resource cần bổ sung:** `expense://db/schema` — trả về DDL của bảng `transactions` để Claude tham chiếu.

### 5.3 API Endpoints

Tất cả endpoints có prefix `/api`, trả về JSON, xử lý lỗi với HTTP status code chuẩn.

#### Transactions

| Method | Endpoint | Mô tả | Query Params | Request Body |
|--------|----------|-------|-------------|--------------|
| `GET` | `/api/transactions` | Lấy danh sách giao dịch có lọc và phân trang | `type`, `category`, `from` (YYYY-MM-DD), `to` (YYYY-MM-DD), `page` (mặc định 1), `limit` (mặc định 20) | — |
| `POST` | `/api/transactions` | Tạo giao dịch mới | — | `{ description, amount, type, category, date }` |
| `PUT` | `/api/transactions/:id` | Cập nhật giao dịch theo ID | — | `{ description?, amount?, type?, category?, date? }` |
| `DELETE` | `/api/transactions/:id` | Xóa giao dịch theo ID | — | — |

#### Analytics

| Method | Endpoint | Mô tả | Query Params |
|--------|----------|-------|-------------|
| `GET` | `/api/analytics/summary` | Trả tổng thu, tổng chi, số dư trong kỳ lọc | `from`, `to` |
| `GET` | `/api/analytics/monthly` | Trả tổng thu và tổng chi theo từng tháng, trong 6 tháng gần nhất | — |
| `GET` | `/api/analytics/categories` | Trả tổng chi tiêu nhóm theo danh mục trong kỳ lọc | `from`, `to` |

**Ví dụ response `GET /api/analytics/summary?from=2026-03-01&to=2026-03-21`:**
```
{
  "totalIncome": 25300,
  "totalExpenses": 3880,
  "balance": 21420,
  "period": { "from": "2026-03-01", "to": "2026-03-21" }
}
```

**Ví dụ response `GET /api/analytics/monthly`:**
```
{
  "months": ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  "income":   [8000, 12500, 9800, 15000, 11200, 25300],
  "expenses": [3200,  4100, 5200,  3800,  4500,  3880]
}
```

**Ví dụ response `GET /api/analytics/categories?from=2026-03-01&to=2026-03-21`:**
```
{
  "categories": [
    { "name": "Infrastructure", "total": 3200 },
    { "name": "Software",       "total": 680 }
  ]
}
```
