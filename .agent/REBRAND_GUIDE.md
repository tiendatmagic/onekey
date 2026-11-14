# Hướng Dẫn Đổi Tên Ví (Rebranding & White-Labeling Guide)

> **Tài liệu hướng dẫn kỹ thuật dành cho AI Agent và Lập trình viên**  
> Dự án: **CC Wallet** (Phát triển trên nền tảng OneKey Monorepo)  
> Cập nhật lần cuối: 14/11/2026

---

## 1. Phương Pháp Nhanh Nhất (Khuyến Nghị Dành Cho Agent)

Để tối ưu hóa thời gian và tránh bỏ sót bất kỳ tệp tin nào trên Monorepo khổng lồ, dự án đã tích hợp công cụ đổi tên tự động:

```bash
# Cú pháp:
node ./development/rebrand.js "<Tên Ví Mới>" [--slug="<slug-moi>"] [--dry-run]

# Ví dụ thực tế:
node ./development/rebrand.js "CC Wallet"
node ./development/rebrand.js "Alpha Wallet" --slug="alpha-wallet"
```

### Script này tự động làm gì?
1. Quét và thay thế tên ví trên **tất cả 32 tệp tin** của toàn bộ các nền tảng (Web, Desktop, Extension, Mobile Android/iOS, Providers, i18n).
2. Tự động đồng bộ tài nguyên tĩnh và injected script thông qua `yarn copy:inject`.
3. Kiểm tra tính toàn vẹn cú pháp của các tệp ngôn ngữ qua `node ./development/lint/lang.js`.
4. Hỗ trợ cờ `--dry-run` để kiểm tra trước các thay đổi mà không ghi đè dữ liệu.

---

## 2. Bảng Tra Cứu Danh Sách Các Tệp Cần Chỉnh Sửa Thủ Công

Nếu cần can thiệp thủ công hoặc kiểm tra từng nền tảng, Agent cần nắm rõ danh sách phân loại chi tiết sau:

### A. Ứng Dụng Web (Web App)
| STT | Đường dẫn tệp | Thuộc tính / Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `packages/shared/src/web/index.html.ejs` | `<title>CC Wallet</title>` | File mẫu HTML gốc |
| 2 | `packages/shared/src/web/index.html` | `<title>CC Wallet</title>` | File HTML tạo tự động sau `yarn copy:inject` |
| 3 | `apps/web/app.json` | `expo.name` & `expo.slug` | Cấu hình Expo Web |
| 4 | `packages/kit/src/routes/config/index.ts` | `documentTitle.formatter` | Định dạng tiêu đề tab trình duyệt web |
| 5 | `packages/kit/src/states/jotai/contexts/discovery/actions.ts` | `homeTab.title` | Tiêu đề tab mặc định trong Discovery |

### B. Tiện Ích Mở Rộng Trình Duyệt (Browser Extension)
| STT | Đường dẫn tệp | Thuộc tính / Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `apps/ext/app.json` | `expo.name` & `expo.slug` | Tên app extension |
| 2 | `apps/ext/src/manifest/shared.js` | `name` & `description` | Cấu hình manifest dùng chung |
| 3 | `apps/ext/src/manifest/chrome_v3.js` | `action.default_title` | Tiêu đề tooltip icon trên trình duyệt |
| 4 | `apps/ext/src/manifest/chrome.js` | `action.default_title` | Tiêu đề extension manifest v2/v3 fallback |

### C. Ứng Dụng Di Động (Mobile - Android & iOS)
| STT | Đường dẫn tệp | Thuộc tính / Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `apps/mobile/app.json` | `expo.name` & `expo.slug` | Tên ứng dụng Expo Mobile |
| 2 | `apps/mobile/android/app/build.gradle` | `resValue "string", "app_name", ...` | Tên app hiển thị trên màn hình Android (cả bản Debug và Release) |
| 3 | `apps/mobile/android/settings.gradle` | `rootProject.name` | Tên project Gradle |
| 4 | `apps/mobile/ios/OneKeyWallet/Info.plist` | `CFBundleDisplayName` | Tên app hiển thị trên SpringBoard iOS |
| 5 | `apps/mobile/ios/OneKeyAppClip/Info.plist` | `CFBundleDisplayName` | Tên app hiển thị trên iOS App Clip |

### D. Ứng Dụng Máy Tính (Desktop - Electron)
| STT | Đường dẫn tệp | Thuộc tính / Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `apps/desktop/app/app.ts` | `APP_TITLE_NAME` | Tiêu đề cửa sổ chính và menu ứng dụng |
| 2 | `apps/desktop/app/recoveryWindow.ts` | `title` | Tiêu đề cửa sổ khôi phục |
| 3 | `apps/desktop/app/tray/TrayManager.ts` | `tray.setToolTip(...)` | Tooltip icon ở khay hệ thống (System Tray) |
| 4 | `apps/desktop/electron-builder-base.config.js` | `productName` | Tên phần mềm khi đóng gói cài đặt (.exe / .dmg) |

### E. DApp Injected Providers, Services & UI Components
| STT | Đường dẫn tệp | Thuộc tính / Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `packages/kit-bg/src/providers/ProviderApiTon.ts` | `appName` | Tên ví khi kết nối DApp TON Connect |
| 2 | `packages/kit-bg/src/providers/ProviderApiNeoN3.ts` | `name` | Tên ví khi inject DApp NEO N3 |
| 3 | `packages/kit-bg/src/providers/ProviderApiWebln.ts` | `alias` | Tên ví cho WebLN Lightning Network |
| 4 | `packages/kit/src/hooks/useWebDapp/useOneKeyWalletDetection.web-only.ts` | `name` | Tên ví phát hiện được trên web DApp |
| 5 | `packages/kit-bg/src/desktopApis/DesktopApiSystem.ts` | Fallback getAppName | Tên ví mặc định trên desktop API |
| 6 | `packages/kit-bg/src/services/ServiceSignature.ts` | Fallback signature title | Tên ví mặc định khi xác nhận ký giao dịch |
| 7 | `packages/kit-bg/src/dbs/local/LocalDbBase.ts` | `wallet.name.startsWith(...)` | Logic nhận diện tiền tố tên ví trong DB local |
| 8 | `packages/kit/src/views/Receive/components/ReceiveShare/constants.ts` | `logoText` | Chữ hiển thị trên thiệp chia sẻ mã QR nhận tiền |
| 9 | `packages/kit/src/views/ReferFriends/components/ReferralShare/referralShareCopy.ts` | `brand` | Tên thương hiệu trong nội dung giới thiệu bạn bè |
| 10 | `packages/kit/src/views/Home/components/WalletXfpStatusReminder/WalletXfpStatusReminder.tsx` | `walletName` | Tên ví trong thông báo nhắc nhở sao lưu |
| 11 | `packages/kit/src/views/Perp/hooks/useShowDepositWithdrawModal.ts` | Fallback title | Tên ví hiển thị trên modal nạp/rút Perp |
| 12 | `packages/components/src/primitives/Icon/react/illus/OnekeyText.tsx` | `<Text>...</Text>` | Component SVG hiển thị logo kèm tên ví |

### F. Đa Ngôn Ngữ (i18n) & Tài Liệu
| STT | Đường dẫn tệp | Vị trí cần sửa | Ghi chú |
|---|---|---|---|
| 1 | `packages/shared/src/locale/json/vi.json` | Toàn bộ 44 chuỗi chứa tên ví | Bản dịch tiếng Việt |
| 2 | `packages/shared/src/locale/json/en_US.json` | Toàn bộ các chuỗi chứa tên ví | Bản dịch tiếng Anh |
| 3 | `README.md` | Tiêu đề chính | Tài liệu giới thiệu dự án |

---

## 3. Các Nguyên Tắc Bất Di Bất Dịch (Critical Rules)

> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG SỬA ĐỔI CÁC THÀNH PHẦN SAU:**

1. **Backend API Endpoints**:
   - Toàn bộ URL backend (`onekey.so`, `onekeycn.com`, `onekeytest.com`) phải **giữ nguyên 100%**.
   - Không được thay đổi API request headers hoặc protocol routing.
2. **Hardware SDK & Bridges**:
   - Các gói phần cứng `@onekeyfe/hd-*`, `@onekeyfe/connect` phải giữ nguyên để bảo đảm tính tương thích với thiết bị phần cứng.
3. **Deep Link Schemes**:
   - Giữ nguyên `onekey-wallet://` (hoặc cấu hình alias bổ sung, không xóa schema gốc làm gãy liên kết OAuth/DApp).
4. **Monorepo Package Names**:
   - Giữ nguyên tên gói nội bộ `@onekeyhq/*` trong `package.json` của các workspace để tránh gãy dependency resolution của Yarn.

---

## 4. Hướng Dẫn Thay Đổi Logo, Favicon & Splash Screen

Khi đổi thương hiệu, cần cập nhật đồng bộ các tệp đồ họa sau trong `apps/ext/src/assets`:

### Danh sách tệp ảnh:
- **Vector**:
  - `img/logo.svg` (128x128) – Biểu tượng vector bản Production.
  - `img-development/logo.svg` (128x128) – Biểu tượng vector bản Development.
- **Biểu tượng PNG sắc nét (Pixel-perfect)**:
  - `img/icon-48.png` (48x48)
  - `img/icon-128.png` (128x128)
  - `img/icon-128-disable.png` (128x128, grayscale)
  - `img-development/icon-48.png` (48x48)
  - `img-development/icon-128.png` (128x128)
  - `img-development/icon-128-disable.png` (128x128, grayscale)
  - `favicon.png` (48x48)
  - `icon.png` (1024x1024)
  - `adaptive-icon.png` (1024x1024)
  - `splash.png` (1284x2778)

### Cách Render PNG Sắc Nét Từ SVG Bằng Google Chrome Headless:
Không cần cài đặt thư viện ngoài (như canvas/sharp), Agent có thể sử dụng trực tiếp Chrome CLI:

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="<duong-dan-out.png>" --window-size=<W>,<H> "<duong-dan-file.html>"
```

---

## 5. Quy Trình Kiểm Thử Sau Khi Đổi Tên (Verification Checklist)

Sau khi đổi tên ví (dù bằng script hay thủ công), Agent **BẮT BUỘC** thực hiện 3 bước kiểm tra:

1. **Đồng bộ hóa Injected Code & Templates**:
   ```bash
   yarn copy:inject
   ```
2. **Kiểm tra tệp đa ngôn ngữ (i18n)**:
   ```bash
   node ./development/lint/lang.js
   ```
3. **Quét kiểm tra còn sót chuỗi tên cũ không**:
   ```bash
   git grep "<Tên Ví Cũ>"
   ```
   *(Kết quả mong đợi: 0 kết quả).*
