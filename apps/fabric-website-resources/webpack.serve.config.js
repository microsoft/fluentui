const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

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
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib/codepen': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib/codepen'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      '@uifabric/fluent-theme$': path.join(__dirname, '../../packages/fluent-theme/src'),
      '@uifabric/theme-samples$': path.join(__dirname, '../../packages/theme-samples/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
