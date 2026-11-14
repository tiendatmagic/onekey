#!/usr/bin/env node

/**
 * Script tự động đổi tên ví (Rebrand / White-label Tool) cho Monorepo
 * 
 * Cách dùng:
 *   node ./development/rebrand.js "Tên Ví Mới"
 *   node ./development/rebrand.js "Tên Ví Mới" --dry-run
 * 
 * Ví dụ:
 *   node ./development/rebrand.js "CC Wallet"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

// 1. Phân tích tham số đầu vào
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const cleanArgs = args.filter((arg) => !arg.startsWith('--'));

if (cleanArgs.length === 0) {
  console.log(`
===================================================================
  CÔNG CỤ ĐỔI TÊN VÍ TỰ ĐỘNG (REBRAND TOOL)
===================================================================
Cách dùng:
  node ./development/rebrand.js "<Tên Ví Mới>" [--slug="<slug>"] [--dry-run]

Ví dụ:
  node ./development/rebrand.js "CC Wallet"
  node ./development/rebrand.js "My Crypto Wallet" --dry-run
===================================================================
`);
  process.exit(1);
}

const newBrandName = cleanArgs[0].trim();
if (!newBrandName) {
  console.error('[LỖI] Tên ví mới không được để trống.');
  process.exit(1);
}

// Tạo slug tự động (ví dụ: "CC Wallet" -> "cc-wallet")
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const newSlug = slugArg
  ? slugArg.split('=')[1].trim()
  : newBrandName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

// Lấy tên ví hiện tại từ apps/web/app.json
const webAppJsonPath = path.join(rootDir, 'apps/web/app.json');
let currentBrandName = 'OneKey';
if (fs.existsSync(webAppJsonPath)) {
  try {
    const webAppJson = JSON.parse(fs.readFileSync(webAppJsonPath, 'utf8'));
    if (webAppJson.expo && webAppJson.expo.name) {
      currentBrandName = webAppJson.expo.name;
    }
  } catch (e) {
    // ignore
  }
}

console.log(`\n===================================================================`);
console.log(`  BẮT ĐẦU ĐỔI TÊN VÍ DỰ ÁN`);
console.log(`  - Tên hiện tại: "${currentBrandName}"`);
console.log(`  - Tên mới:      "${newBrandName}"`);
console.log(`  - Slug mới:     "${newSlug}"`);
console.log(`  - Chế độ:       ${isDryRun ? 'DRY-RUN (chỉ kiểm tra, không ghi file)' : 'THỰC THI (ghi đè file)'}`);
console.log(`===================================================================\n`);

if (currentBrandName === newBrandName) {
  console.log(`[THÔNG BÁO] Tên hiện tại đã là "${newBrandName}". Đang kiểm tra đồng bộ toàn bộ file...`);
}

// 2. Danh sách các file cấu hình và mã nguồn cần xử lý
const targetFiles = [
  // Web & Templates
  'packages/shared/src/web/index.html.ejs',
  'apps/web/app.json',
  'packages/kit/src/routes/config/index.ts',
  'packages/kit/src/states/jotai/contexts/discovery/actions.ts',

  // Desktop
  'apps/desktop/app/app.ts',
  'apps/desktop/app/recoveryWindow.ts',
  'apps/desktop/app/tray/TrayManager.ts',
  'apps/desktop/electron-builder-base.config.js',

  // Extension
  'apps/ext/app.json',
  'apps/ext/src/manifest/shared.js',
  'apps/ext/src/manifest/chrome.js',
  'apps/ext/src/manifest/chrome_v3.js',

  // Providers, Services & UI
  'packages/components/src/primitives/Icon/react/illus/OnekeyText.tsx',
  'packages/kit-bg/src/dbs/local/LocalDbBase.ts',
  'packages/kit-bg/src/desktopApis/DesktopApiSystem.ts',
  'packages/kit-bg/src/providers/ProviderApiNeoN3.ts',
  'packages/kit-bg/src/providers/ProviderApiTon.ts',
  'packages/kit-bg/src/providers/ProviderApiWebln.ts',
  'packages/kit-bg/src/services/ServiceSignature.ts',
  'packages/kit/src/hooks/useWebDapp/useOneKeyWalletDetection.web-only.ts',
  'packages/kit/src/views/Home/components/WalletXfpStatusReminder/WalletXfpStatusReminder.tsx',
  'packages/kit/src/views/Perp/hooks/useShowDepositWithdrawModal.ts',
  'packages/kit/src/views/Receive/components/ReceiveShare/constants.ts',
  'packages/kit/src/views/ReferFriends/components/ReferralShare/referralShareCopy.ts',

  // i18n
  'packages/shared/src/locale/json/vi.json',
  'packages/shared/src/locale/json/en_US.json',

  // Docs
  'README.md',
];

let totalChanges = 0;
let fileModifiedCount = 0;

for (const relPath of targetFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[CẢNH BÁO] Không tìm thấy file: ${relPath}`);
    continue;
  }

  let original = fs.readFileSync(fullPath, 'utf8');
  let content = original;

  // Thay thế tên ví hiện tại bằng tên ví mới
  if (currentBrandName && currentBrandName !== newBrandName) {
    const escapedCurrent = currentBrandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regexCurrent = new RegExp(escapedCurrent, 'g');
    content = content.replace(regexCurrent, newBrandName);
  }

  // Đảm bảo slug trong các file app.json được cập nhật
  if (relPath.endsWith('app.json')) {
    try {
      const parsed = JSON.parse(content);
      if (parsed.expo) {
        parsed.expo.name = newBrandName;
        parsed.expo.slug = newSlug;
        content = JSON.stringify(parsed, null, 2) + '\n';
      }
    } catch (e) {
      // ignore
    }
  }

  // Cập nhật app_name debug cho Android
  if (relPath === 'apps/mobile/android/app/build.gradle') {
    content = content.replace(
      new RegExp(`resValue "string", "app_name", "${newBrandName} Dev"`, 'g'),
      `resValue "string", "app_name", "${newBrandName} Dev"`
    );
  }

  if (content !== original) {
    fileModifiedCount += 1;
    totalChanges += 1;
    console.log(`[ĐÃ SỬA] ${relPath}`);
    if (!isDryRun) {
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  } else {
    console.log(`[BỎ QUA] ${relPath} (đã đồng bộ)`);
  }
}

console.log(`\n===================================================================`);
console.log(`  KẾT QUẢ XỬ LÝ:`);
console.log(`  - Số file thay đổi: ${fileModifiedCount}/${targetFiles.length}`);
console.log(`  - Chế độ:           ${isDryRun ? 'DRY-RUN' : 'HOÀN TẤT GHI FILE'}`);
console.log(`===================================================================\n`);

if (!isDryRun && fileModifiedCount > 0) {
  console.log('[1/2] Đang đồng bộ injected code và index.html (yarn copy:inject)...');
  try {
    execSync('yarn copy:inject', { cwd: rootDir, stdio: 'inherit' });
    console.log('[OK] Đồng bộ inject thành công!');
  } catch (e) {
    console.error('[LỖI] Chạy yarn copy:inject thất bại:', e.message);
  }

  console.log('\n[2/2] Đang kiểm tra tính toàn vẹn của file ngôn ngữ...');
  try {
    execSync('node ./development/lint/lang.js', { cwd: rootDir, stdio: 'inherit' });
    console.log('[OK] File ngôn ngữ hợp lệ 100%!');
  } catch (e) {
    console.error('[LỖI] Kiểm tra ngôn ngữ thất bại:', e.message);
  }
}

console.log('\nĐã hoàn thành quy trình đổi tên thương hiệu!');
