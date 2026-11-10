/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/react/lib/Styling');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});
