const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');
const ManifestServicePlugin = require('@uifabric/webpack-utils/lib/ManifestServicePlugin');

const BUNDLE_NAME = 'fluentui-react';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

function createConfig(config, onlyProduction) {
  return resources.createConfig(
    BUNDLE_NAME,
    IS_PRODUCTION,
    {
      entry: {
        [BUNDLE_NAME]: './lib/index.bundle.js',
      },

      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },

      resolve: {
        alias: getResolveAlias(true /*useLib*/),
      },

      ...config,
    },
    onlyProduction,
  );
}

module.exports = [
  ...createConfig(
    {
      output: {
        libraryTarget: 'var',
        library: 'FluentUIReact',
      },
    },
    false,
  ),
  ...createConfig(
    {
      plugins: [new ManifestServicePlugin()],
      output: {
        libraryTarget: 'umd',
        library: 'FluentUIReact',
        filename: `${BUNDLE_NAME}.umd.js`,
      },
    },
    true,
  ),
];
