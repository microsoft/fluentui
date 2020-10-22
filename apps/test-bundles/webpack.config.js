const { createWebpackConfig, buildEntries } = require('./webpackUtils');

// Create entries for all top level imports.
const entries = buildEntries('office-ui-fabric-react');

module.exports = createWebpackConfig(entries);
