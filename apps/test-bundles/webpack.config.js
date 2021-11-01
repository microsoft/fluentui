// @ts-check
const {
  buildEntries,
  buildEntry,
  createWebpackConfig,
  createFluentNorthstarFixtures,
  createFluentReactFixtures,
  createEntry,
} = require('./webpackUtils');

const packageName = process.env.PACKAGE;

let entries;
if (packageName === '@fluentui/react-northstar') {
  createFluentNorthstarFixtures();
  entries = buildEntries('@fluentui/react-northstar');
} else if (packageName === '@fluentui/react') {
  createFluentReactFixtures();
  createEntry('@fluentui/keyboard-key');

  entries = buildEntries('@fluentui/react');
  entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');
} else {
  process.exit(1);
}

module.exports = createWebpackConfig(entries, packageName);
