const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const webpack = resources.webpack;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { addMonacoConfig } = require('./scripts/monaco-webpack');

const BUNDLE_NAME = 'demo-app';
const PACKAGE_NAME = require('./package.json').name;

module.exports = resources.createServeConfig(
  addMonacoConfig({
    entry: {
      [BUNDLE_NAME]: './src/demo/index.tsx'
    },

    output: {
      chunkFilename: `${BUNDLE_NAME}-[name].js`
    },

    devServer: {
      writeToDisk: true // for debugging
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },

    plugins: [new BundleAnalyzerPlugin()],

    resolve: {
      alias: {
        '@uifabric/tsx-editor/src': path.join(__dirname, 'src'),
        '@uifabric/tsx-editor/lib': path.join(__dirname, 'lib'),
        '@uifabric/tsx-editor': path.join(__dirname, 'lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  })
);
