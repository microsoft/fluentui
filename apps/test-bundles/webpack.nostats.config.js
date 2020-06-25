const { createWebpackConfig, buildEntries } = require('./webpackUtils');

/**
 * Stats is generated and used in size auditor report for checking more details on what affected bundle size change.
 * Due to stats generation is slow and it slows down CI significantly, we recommend to configure experimental packages without stats generation.
 * If size is changed unexpectedly, devs can drill deep more locally.
 */

const entries = buildEntries('@fluentui/react-next');

module.exports = createWebpackConfig(entries, false /* do not include stats */);
