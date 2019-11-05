let path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');
const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'office-ui-fabric-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

module.exports = [
  ...resources.createConfig(
    BUNDLE_NAME,
    IS_PRODUCTION,
    addMonacoWebpackConfig({
      entry: { [BUNDLE_NAME]: './lib/index.js' },

      output: {
        libraryTarget: 'var',
        library: 'Fabric'
      },

      externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },

      resolve: {
        alias: {
          'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
          'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
          'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
          '@uifabric/api-docs/lib': path.resolve(__dirname, '../../packages/api-docs/lib'),
          'Props.ts.js': 'Props',
          'Example.tsx.js': 'Example'
        }
      }
    })
  ),
  require('./webpack.serve.config')
];
