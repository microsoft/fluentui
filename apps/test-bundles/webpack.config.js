const { createWebpackConfig, buildEntries, buildEntry } = require('./webpackUtils');

// Create entries for all top level imports.
const entries = buildEntries('@fluentui/react-button');

module.exports = createWebpackConfig(entries);
