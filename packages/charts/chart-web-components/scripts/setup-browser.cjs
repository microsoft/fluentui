/* eslint-disable no-undef */
/**
 *
 * @param r {__WebpackModuleApi.RequireContext}
 *
 * This script should be shared for all web-component packages.
 * Tracking issue - https://github.com/microsoft/fluentui/issues/33576
 */
function importAll(r) {
  r.keys().forEach(r);
}

// Explicitly add to browser test
importAll(require.context('../dist/esm', true, /\.spec\.js$/));
