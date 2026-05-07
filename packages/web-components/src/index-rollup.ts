import './define-all.js';

// import setTheme for export on globalThis for CDN
import { setTheme } from './theme/index.js';

// Expose setTheme on globalThis for CDN/script-tag consumers
// @ts-expect-error - CDN bundle intentionally sets globals
globalThis.setTheme = setTheme;
