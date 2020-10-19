/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/react-internal/lib/Styling');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// Mock requestAnimationFrame for React 16+.
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
