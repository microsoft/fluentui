const resources = require('../../scripts/webpack/webpack-resources');
const getResolveAlias = require('../../scripts/webpack/getResolveAlias');

const BUNDLE_NAME = 'fluentui-react-internal';
const IS_PRODUCTION = process.argv.indexOf('--production') > -1;

function createConfig(config, onlyProduction) {
  return resources.createConfig(
    BUNDLE_NAME,
    IS_PRODUCTION,
    {
      entry: {
        [BUNDLE_NAME]: './lib/index.js',
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

module.exports = createConfig(
  {
    output: {
      libraryTarget: 'var',
      library: 'FluentUIReactInternal',
    },
  },
  false,
);
