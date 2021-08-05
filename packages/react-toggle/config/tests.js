/** Jest test setup file. */

const { configure } = require('enzyme');
const { initializeIcons } = require('@fluentui/font-icons-mdl2');
const Adapter = require('enzyme-adapter-react-16');
const { resetIds } = require('@fluentui/utilities');

// Initialize icons.
initializeIcons('');

// Configure enzyme.
configure({ adapter: new Adapter() });

resetIds();
