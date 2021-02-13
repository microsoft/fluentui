/** Jest test setup file for packages that use enzyme. */

const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Configure enzyme.
configure({ adapter: new Adapter() });
