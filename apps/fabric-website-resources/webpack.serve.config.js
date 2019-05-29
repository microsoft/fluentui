const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/legacy$': path.resolve(__dirname, '../../packages/legacy/src'),
      '@uifabric/legacy/src': path.resolve(__dirname, '../../packages/legacy/src'),
      '@uifabric/legacy/lib': path.resolve(__dirname, '../../packages/legacy/src'),
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      '@uifabric/fluent-theme$': path.resolve(__dirname, '../../packages/fluent-theme/src'),
      '@uifabric/theme-samples$': path.resolve(__dirname, '../../packages/theme-samples/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
