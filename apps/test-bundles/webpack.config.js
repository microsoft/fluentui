// @ts-check
const { createWebpackConfig, buildEntries, buildEntry } = require('./webpackUtils');

// Create entries for all top level imports.
const entries = buildEntries('@fluentui/react');
buildEntries('@fluentui/react-next', entries, false /* do not include stats for better performance. */);

// Create entries for single top level import.
entries['react-compose'] = buildEntry('@fluentui/react-compose');
entries['keyboard-key'] = buildEntry('@fluentui/keyboard-key');

module.exports = createWebpackConfig(entries);
