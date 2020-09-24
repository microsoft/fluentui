/** Jest test setup file. */

const { configure } = require('enzyme');
const { initializeIcons, resetIds } = require('office-ui-fabric-react');
const Adapter = require('enzyme-adapter-react-16');

// Initialize icons.
initializeIcons('');

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });

resetIds();
