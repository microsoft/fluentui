export { baseConfig, baseWebpackConfig } from './base.config';

// =========== BROWSER APIs ==================

// TODO: Browser related APIs should be exposed via export maps or moved to separate package
// Expose Browser specific API under same barrel
export declare const mount: typeof import('./browser').mount;
