const path = require('path');
const { createWebpackConfig, buildEntries } = require('./webpackUtils');

// Helper to resolve the path to an entry name for a given package.
const resolvePath = (packageName, entryFileName = 'index.js') =>
  path.join(path.dirname(require.resolve(packageName)).replace('lib-commonjs', 'lib'), entryFileName);

// Create entries for all top level imports.
const entries = buildEntries('office-ui-fabric-react');

// Create entries for single top level import.
entries['react-compose'] = resolvePath('@fluentui/react-compose');
entries['keyboard-key'] = resolvePath('@fluentui/keyboard-key');

module.exports = createWebpackConfig(entries);
