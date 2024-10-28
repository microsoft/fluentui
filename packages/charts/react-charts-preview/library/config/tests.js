/** Jest test setup file. */
const { configure } = require('enzyme');
require('@testing-library/jest-dom');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Configure enzyme.
configure({ adapter: new Adapter() });
