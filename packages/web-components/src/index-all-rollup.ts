import './define-all.js';

// import setTheme for export on globalThis for CDN
import { setTheme } from './theme/index.js';

// Expose all exports from index.ts
export * from './index.js';

// Expose setTheme under Fluent namespace on globalThis for CDN/script-tag consumers
// @ts-expect-error - CDN bundle intentionally sets globals
globalThis.Fluent = { ...globalThis.Fluent, setTheme };
