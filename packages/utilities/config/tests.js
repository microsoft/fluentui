/** Jest test setup file. */
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
