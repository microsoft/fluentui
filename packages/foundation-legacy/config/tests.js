/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/style-utilities');
const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// Configure enzyme.
configure({ adapter: new Adapter() });
