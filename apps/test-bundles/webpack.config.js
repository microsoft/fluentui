// @ts-check
const {
  buildEntries,
  buildEntry,
  createWebpackConfig,
  createFluentFixtures,
  createFluentNorthstarFixtures,
  createEntry,
} = require('./webpackUtils');

// Create entries for all top level imports
createFluentFixtures();
createFluentNorthstarFixtures();

// Create entries for single top level import.
createEntry('@fluentui/react-compose');
createEntry('@fluentui/keyboard-key');

const entries = {
  ...buildEntries('@fluentui/react'),
  ...buildEntries('@fluentui/react-northstar'),
};

// If/when we start working in react-next again, the bundle size tests should be set up like this
// so that only the components directly within react-next are tested.
// buildEntries(
//   '@fluentui/react-next',
//   entries,
//   false /* do not include stats for better performance. */,
//   true /* onlyOwnComponents */,
// );

entries['react-compose'] = buildEntry('@fluentui/react-compose');
entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');

module.exports = createWebpackConfig(entries);
