/** Jest test setup file. */
const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Configure enzyme.
configure({ adapter: new Adapter() });
