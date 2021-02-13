/** Jest test setup file for packages that use enzyme. */

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Configure enzyme.
configure({ adapter: new Adapter() });
