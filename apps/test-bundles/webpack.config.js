// @ts-check
const {
  buildEntries,
  buildEntry,
  createWebpackConfig,
  createFluentFixtures,
  createFluentNorthstarFixtures,
  createEntry,
} = require('./webpackUtils');

const package = process.env.PACKAGE;

let entries;
if (package === '@fluentui/react-northstar') {
  createFluentNorthstarFixtures();
  entries = buildEntries('@fluentui/react-northstar');
} else {
  createFluentFixtures();

  // Create entries for single top level import.
  createEntry('@fluentui/react-compose');
  createEntry('@fluentui/keyboard-key');

  entries = buildEntries('@fluentui/react');
  entries['react-compose'] = buildEntry('@fluentui/react-compose');
  entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');
}

// If/when we start working in react-next again, the bundle size tests should be set up like this
// so that only the components directly within react-next are tested.
// buildEntries(
//   '@fluentui/react-next',
//   entries,
//   false /* do not include stats for better performance. */,
//   true /* onlyOwnComponents */,
// );

module.exports = createWebpackConfig(entries);
