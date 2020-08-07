const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.app.tsx',
  output: {
    filename: 'perf-test.js',
  },
  mode: 'production',
  resolve: {
    alias: {
      '@fluentui/react-next$': path.resolve(__dirname, '../../packages/react-next/src'),
      '@fluentui/react-next/src': path.resolve(__dirname, '../../packages/react-next/src'),
      '@fluentui/react-next/lib': path.resolve(__dirname, '../../packages/react-next/src'),
      '@uifabric/experiments/src': path.resolve(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments/lib': path.resolve(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments': path.resolve(__dirname, '../../packages/experiments/src'),
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
    },
  },
});
