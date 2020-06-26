const { createWebpackConfig, buildEntries } = require('./webpackUtils');

/**
 * Stats are generated and used by the size auditor report to check more details on what caused the bundle size change.
 * Due to stats generation being slow, and therefore slowing down CI significantly, we recommend to configure experimental packages without stats generation.
 * If bundle size is changed unexpectedly, developers can drill down deeper on the problem by locally running bundle tests.
 */

const entries = buildEntries('@fluentui/react-next');

module.exports = createWebpackConfig(entries, false /* do not include stats */);
