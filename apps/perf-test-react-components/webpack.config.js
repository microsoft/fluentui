const resources = require('../../scripts/webpack/webpack-resources');

// The issue here is making readable Flamegraphs that don't have complicated paths like:
//  ~Fabric.../../packages/react/lib/components/DetailsList/DetailsRow.base.js.DetailsRowBase.render
// But rather show paths like:
//  ~DetailsRowBase.render (22.16%, 168 samples)
// The only way found to do this so far has been to use a webpack serve config for bundling.
// TODO: Should root cause why this only works as a serve config.
module.exports = resources.createServeConfig(
  {
    entry: './src/index.scenarios.tsx',
    mode: 'production',
    output: {
      filename: 'perf-test.js',
    },
  },
  'dist',
);
