const getResolveAlias = require('@fluentui/scripts/webpack/getResolveAlias');
const resources = require('@fluentui/scripts/webpack/webpack-resources');
const { addMonacoWebpackConfig } = require('@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig({
    entry: {
      [BUNDLE_NAME]: ['react-app-polyfill/ie11', './src/index.tsx'],
    },

    resolve: {
      alias: getResolveAlias(),
    },
  }),
);
