/** Jest test setup file. */
require('../src/components/Sparkline/script');

const { setIconOptions } = require('@fluentui/react/lib/Styling');
const { configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

// Configure enzyme.
configure({ adapter: new Adapter() });
