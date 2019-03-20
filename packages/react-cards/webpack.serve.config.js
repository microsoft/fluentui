const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');

module.exports = resources.createServeConfig({
  entry: './src/demo/index.tsx',

  output: {
    filename: 'demo-app.js'
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    alias: {
      '@uifabric/example-app-base$': path.join(__dirname, '../../packages/example-app-base/src'),
      '@uifabric/experiments/src': path.join(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments/lib': path.join(__dirname, '../../packages/experiments/src'),
      '@uifabric/experiments': path.join(__dirname, '../../packages/experiments/src'),
      '@uifabric/foundation$': path.join(__dirname, '../../packages/foundation/src'),
      '@uifabric/react-cards/src': path.join(__dirname, 'src'),
      '@uifabric/react-cards/lib': path.join(__dirname, 'src'),
      '@uifabric/react-cards': path.join(__dirname, 'src'),
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
