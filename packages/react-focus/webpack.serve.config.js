const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');
const webpack = resources.webpack;

const PACKAGE_NAME = require('./package.json').name;

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
      '@uifabric/example-app-base$': path.resolve(__dirname, '../../packages/example-app-base/src'),
      '@uifabric/foundation$': path.resolve(__dirname, '../../packages/foundation/src'),
      '@fluentui/react-focus/src': path.resolve(__dirname, 'src'),
      '@fluentui/react-focus/lib': path.resolve(__dirname, 'src'),
      '@fluentui/react-focus': path.resolve(__dirname, 'src'),
      'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
      'Props.ts.js': 'Props',
      'Example.tsx.js': 'Example'
    }
  }
});
