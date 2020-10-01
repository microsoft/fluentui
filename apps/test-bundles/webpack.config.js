const { createWebpackConfig, buildEntries, buildEntry } = require('./webpackUtils');

// Create entries for all top level imports.
const entries = buildEntries('office-ui-fabric-react');
entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');

module.exports = createWebpackConfig(entries);
