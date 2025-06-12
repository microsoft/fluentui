/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/react/lib/Styling');
const { initializeIcons } = require('@fluentui/font-icons-mdl2');

initializeIcons('');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});
