/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/react/lib/Styling');
const { initializeIcons } = require('@fluentui/font-icons-mdl2');

initializeIcons('');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// override v8 setup which throws error on console.errors
// issues started to occur after react 18 upgrade within `packages/react-experiments/src/components/VirtualizedList/VirtualizedList.test.tsx`
console.error = (...args) => {};
