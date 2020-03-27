/** Jest test setup file. */

const { configure } = require('enzyme');
const { initializeIcons } = require('@uifabric/utils');
const Adapter = require('enzyme-adapter-react-16');

// Initialize utils.
initializeIcons('');

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
