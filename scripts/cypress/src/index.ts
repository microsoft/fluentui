/**
 * `@fluentui/scripts-cypress` ships a real dual build (ESM under `lib/`, CommonJS under
 * `lib-commonjs/*.cjs`, `type: module`). Consumers resolve the format that matches them:
 *   - `type: module` packages' `cypress.config.ts` → `import` condition → `lib/index.js` (ESM)
 *   - CommonJS configs (and the rit harness via ts-node `require`) → `require` condition → `lib-commonjs/index.cjs`
 *
 * Because it's built (not consumed as raw `.ts` source), per-file TS transpilers like ts-node never
 * recompile this package against a consumer's tsconfig, so a CommonJS consumer no longer has to become
 * `type: module` to use it. The `mount` browser API is served via the package `browser` field.
 */

export { baseConfig, baseWebpackConfig } from './base.config.js';

// =========== BROWSER APIs ==================

// TODO: Browser related APIs should be exposed via export maps or moved to separate package
// Expose Browser specific API under same barrel; resolved at runtime via the package `browser` field.
export declare const mount: typeof import('./browser/index.js').mount;
