/** Jest test setup file. */

// TODO: is this the right way to import? foundation doesn't have OUFR dependency like very other instance of this file
const { setIconOptions } = require('@uifabric/styling');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true
});

// Mock requestAnimationFrame for React 16+.
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
