// @ts-check
const path = require('path');
const { resources, getResolveAlias } = require('@fluentui/scripts-webpack');
const { addMonacoWebpackConfig } = require('@fluentui/react-monaco-editor/scripts/addMonacoWebpackConfig');

const BUNDLE_NAME = 'demo-app';
const outDirRelative = 'dist/demo';
const outDir = path.join(__dirname, outDirRelative);

module.exports = resources.createServeConfig(
  addMonacoWebpackConfig(
    {
      entry: {
        [BUNDLE_NAME]: ['react-app-polyfill/ie11', './src/index.tsx'],
      },

      resolve: {
        alias: {
          ...getResolveAlias(),
          // react-monaco-editor dynamically loads @types/react via proprietary webpack require.ensure,
          // this doesn't work starting @types/react@17.0.48 as the types package introduced Export Maps
          '@types/react/index.d.ts': path.resolve(__dirname, '../../node_modules/@types/react/index.d.ts'),
        },
      },
    },
    { outDir },
  ),
  outDirRelative,
);
