/** Jest test setup file. */

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Configure enzyme.
configure({ adapter: new Adapter() });
