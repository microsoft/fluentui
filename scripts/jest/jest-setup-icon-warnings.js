// @ts-check
/** Jest test setup file to disable console warnings related to legacy font-based icons. */

const { setIconOptions } = require('@fluentui/style-utilities');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});
