// @ts-check
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const libraryRoot = path.resolve(__dirname, '..');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'AllComponents.fixture.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/bundle-analyze'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Resolve @fluentui/react-headless-components-preview to the local lib (ESM for best tree-shaking)
    alias: {
      '@fluentui/react-headless-components-preview': path.resolve(libraryRoot, 'lib/index.js'),
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    // Disable scope hoisting so bundle-analyzer shows each module individually
    concatenateModules: false,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, '../dist/bundle-analyze/report.html'),
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: path.resolve(__dirname, '../dist/bundle-analyze/stats.json'),
    }),
  ],
};
