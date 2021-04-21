/** Jest test setup file. */

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('@testing-library/jest-dom');

// Configure enzyme.
configure({ adapter: new Adapter() });
