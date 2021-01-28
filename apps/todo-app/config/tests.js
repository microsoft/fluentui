// Jest test setup file that runs before all tests.
// (Fluent UI projects typically locate this file here, but you can put it anywhere and specify the
// path in the jest config setupFiles option.)
// https://jestjs.io/docs/en/configuration.html#setupfiles-array

// Intentionally NOT using @fluentui/scripts here so others can more easily copy the setup.

const { setIconOptions } = require('@fluentui/react/lib/Styling');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// Mock requestAnimationFrame for React 16+.
global.requestAnimationFrame = callback => {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
