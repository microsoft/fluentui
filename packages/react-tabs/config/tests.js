/** Jest test setup file. */

const { configure } = require('enzyme');
const { initializeIcons } = require('@fluentui/font-icons-mdl2');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const { resetIds } = require('@fluentui/utilities');

// Initialize icons.
initializeIcons('');

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });

resetIds();
