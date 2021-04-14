// @ts-check
const {
  buildEntries,
  buildEntry,
  createWebpackConfig,
  createFluentConvergedFixtures,
  createFluentNorthstarFixtures,
  createFluentReactFixtures,
  createEntry,
} = require('./webpackUtils');

const package = process.env.PACKAGE;

let entries;
if (package === '@fluentui/react-northstar') {
  createFluentNorthstarFixtures();
  entries = buildEntries('@fluentui/react-northstar');
} else if (package === '@fluentui/react-components') {
  createFluentConvergedFixtures();
  entries = buildEntries('@fluentui/react-components');
} else if (package === '@fluentui/react') {
  createFluentReactFixtures();
  createEntry('@fluentui/keyboard-key');

  entries = buildEntries('@fluentui/react');
  entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');
} else {
  process.exit(1);
}

module.exports = createWebpackConfig(entries);
