const getResolveAlias = require('@uifabric/build/webpack/getResolveAlias');
const resources = require('@uifabric/build/webpack/webpack-resources');
const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig({
    entry: {
      [BUNDLE_NAME]: './src/index.tsx'
    },

    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },

    resolve: {
      alias: getResolveAlias()
    }
  })
);
