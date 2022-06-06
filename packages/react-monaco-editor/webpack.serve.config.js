// @ts-check
const path = require('path');
const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const { addMonacoWebpackConfig } = require('@fluentui/monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';
const outDirRelative = 'dist/demo';
const outDir = path.join(__dirname, outDirRelative);

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig(
    {
      entry: {
        [BUNDLE_NAME]: './src/demo/index.tsx',
      },

      output: {
        chunkFilename: `${BUNDLE_NAME}-[name].js`,
      },

      resolve: {
        alias: {
          // This must come first to take precedence over the generic alias
          '@fluentui/react-monaco-editor$': path.dirname(outDir),
          '@fluentui/react-monaco-editor/dist': path.dirname(outDir),
          ...getResolveAlias(),
        },
      },
    },
    { outDir },
  ),
  outDirRelative,
);
