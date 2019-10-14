// @ts-check
const path = require('path');
const resources = require('@uifabric/build/webpack/webpack-resources');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { addMonacoWebpackConfig } = require('@uifabric/monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig({
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

    plugins: [/** @type {any} */ (new BundleAnalyzerPlugin())],

    resolve: {
      alias: {
        '@uifabric/tsx-editor/src': path.join(__dirname, 'src'),
        '@uifabric/tsx-editor/lib': path.join(__dirname, 'lib'),
        '@uifabric/tsx-editor/dist': path.join(__dirname, 'dist'),
        '@uifabric/tsx-editor': path.join(__dirname, 'lib'),
        'Props.ts.js': 'Props',
        'Example.tsx.js': 'Example'
      }
    }
  })
);
