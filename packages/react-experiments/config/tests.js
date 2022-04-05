/** Jest test setup file. */

const { setIconOptions } = require('@fluentui/react/lib/Styling');
const { initializeIcons } = require('@fluentui/font-icons-mdl2');
const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

initializeIcons('');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// Configure enzyme.
configure({ adapter: new Adapter() });
