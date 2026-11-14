/**
 * HTML templates returned by the localhost OAuth callback server (`/oauth_callback_desktop`).
 *
 * Why this exists:
 * - Supabase redirects back to `http://127.0.0.1:<port>/oauth_callback_desktop` with `code` (and `state`)
 *   in the URL query string (PKCE authorization code flow).
 * - We return an HTML page with JS to extract `code`/`state`, then POST them to `/complete`
 *   so the desktop app can validate state (anti-CSRF) and exchange the code for a session.
 *
 * Note:
 * - Browsers may block `window.close()` unless the tab/window was opened by script.
 *   We still attempt a best-effort close and provide a manual Close button.
 *
 * Design tokens used (from Figma):
 * - Colors: text rgba(0,0,0,0.88), textSubdued rgba(0,0,0,0.61), bgStrong rgba(0,0,0,0.05)
 * - Font sizes: heading4xl 32px/40px, headingMd 16px/24px semibold, bodyLg 16px/24px
 * - Spacing: space-6 24px, space-2 8px, space-3.5 14px
 * - Border radius: radius-2 8px
 */

import { escape as escapeHtml } from 'lodash';

// CC Wallet logomark SVG (circular version with brand green)
const ONEKEY_LOGOMARK_SVG = `
<svg width="48" height="48" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad_oauth" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <path d="M128 64C128 108.183 108.183 128 64 128C19.8172 128 0 108.183 0 64C0 19.8172 19.8172 0 64 0C108.183 0 128 19.8172 128 64Z" fill="url(#bgGrad_oauth)"/>
  <rect x="36" y="27" width="56" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.92"/>
  <rect x="22" y="37" width="84" height="63" rx="13" fill="#0F172A"/>
  <path d="M22 52 H106" stroke="#1E293B" stroke-width="2.2"/>
  <path d="M83 55 H106 C108.8 55, 111 57.2, 111 60 V76 C111 78.8, 108.8 81, 106 81 H83 C80.2 81, 78 78.8, 78 76 V60 C78 57.2, 80.2 55, 83 55 Z" fill="#10B981"/>
  <circle cx="94.5" cy="68" r="3.8" fill="#FFFFFF"/>
  <path d="M54 57.5 C46.5 57.5, 40.5 62.2, 40.5 69 C 40.5 75.8, 46.5 80.5, 54 80.5 C 58.5 80.5, 61.8 78.2, 63.8 75.5" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M64.5 57.5 C57 57.5, 51 62.2, 51 69 C 51 75.8, 57 80.5, 64.5 80.5 C 69 80.5, 72.3 78.2, 74.3 75.5" stroke="#34D399" stroke-width="5" stroke-linecap="round" fill="none"/>
</svg>
`;

// CSS styles following OneKey design tokens
const OAUTH_CALLBACK_STYLES = `
<style>
  :root {
    /* Colors - Light theme */
    --color-bg-app: #ffffff;
    --color-text: rgba(0, 0, 0, 0.88);
    --color-text-subdued: rgba(0, 0, 0, 0.61);
    --color-bg-strong: rgba(0, 0, 0, 0.05);
    --color-bg-strong-hover: rgba(0, 0, 0, 0.08);
    --color-bg-strong-active: rgba(0, 0, 0, 0.12);
    --color-critical: #dc2626;
    --color-critical-subdued: rgba(220, 38, 38, 0.1);

    /* Spacing */
    --space-2: 8px;
    --space-3: 12px;
    --space-3-5: 14px;
    --space-6: 24px;

    /* Border radius */
    --radius-2: 8px;

    /* Typography */
    --font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      /* Colors - Dark theme */
      --color-bg-app: #1a1a1a;
      --color-text: rgba(255, 255, 255, 0.88);
      --color-text-subdued: rgba(255, 255, 255, 0.61);
      --color-bg-strong: rgba(255, 255, 255, 0.08);
      --color-bg-strong-hover: rgba(255, 255, 255, 0.12);
      --color-bg-strong-active: rgba(255, 255, 255, 0.16);
      --color-critical: #f87171;
      --color-critical-subdued: rgba(248, 113, 113, 0.15);
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background: var(--color-bg-app);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    width: 400px;
    padding: 0 var(--space-6);
  }

  .logo {
    width: 48px;
    height: 48px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-bottom: 22px;
  }

  .title {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0.38px;
    color: var(--color-text);
  }

  .title--error {
    color: var(--color-critical);
  }

  .subtitle {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.32px;
    color: var(--color-text);
  }

  .description {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.32px;
    color: var(--color-text-subdued);
  }

  .button-container {
    padding-top: var(--space-2);
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: 7px 15px;
    background: var(--color-bg-strong);
    border: 1px solid transparent;
    border-radius: var(--radius-2);
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.32px;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .button:hover {
    background: var(--color-bg-strong-hover);
  }

  .button:active {
    background: var(--color-bg-strong-active);
  }

  .error-box {
    background: var(--color-critical-subdued);
    border-radius: var(--radius-2);
    padding: var(--space-3);
    margin-top: var(--space-2);
  }

  .error-message {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-critical);
    word-break: break-word;
  }
</style>
`;

const OAUTH_CALLBACK_CLOSE_SCRIPT = `
  function clearUrlHash() {
    try {
      // Remove the URL hash without reloading the page, to avoid exposing tokens in the address bar.
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    } catch (e) {}
  }
  function tryClose() {
    clearUrlHash();
    try { window.close(); } catch (e) {}
    try { self.close(); } catch (e) {}
    try { window.open('', '_self'); window.close(); } catch (e) {}
  }
`;

export const OAUTH_CALLBACK_ERROR_HTML = (
  errorMessage: string,
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Login Failed</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${OAUTH_CALLBACK_STYLES}
  </head>
  <body>
    <div class="container">
      <div class="logo">
        ${ONEKEY_LOGOMARK_SVG}
      </div>
      <div class="content">
        <h1 class="title title--error">Login failed</h1>
        <p class="subtitle">Something went wrong during login.</p>
        <div class="error-box">
          <p class="error-message">${escapeHtml(errorMessage)}</p>
        </div>
        <p class="description">Click the button below if this window does not close automatically.</p>
        <div class="button-container">
          <button class="button" id="closeBtn" onclick="tryClose()">Close window</button>
        </div>
      </div>
    </div>
    <script>
      ${OAUTH_CALLBACK_CLOSE_SCRIPT}
      // Best-effort auto close (may be blocked by the browser).
      clearUrlHash();
      setTimeout(tryClose, 3000);
    </script>
  </body>
</html>
`;
