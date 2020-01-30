// @ts-check

module.exports = function(env, argv) {
  const path = require('path');
  const resources = require('@uifabric/build/webpack/webpack-resources');
  const { addMonacoWebpackConfig } = require('@uifabric/tsx-editor/scripts/addMonacoWebpackConfig');
  // @ts-ignore
  const version = require('./package.json').version;
  // production mode is either coming from env variable, CLI argument as mode or production
  const isProductionArg =
    (env && (env.production || env.NODE_ENV === 'production')) || argv.mode === 'production' || argv.production === true;
  const now = Date.now();

  // Production defaults
  let minFileNamePart = '';
  const entryPointName = 'fabric-sitev5';
  let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

  // Dogfood overrides
  if (!isProductionArg) {
    publicPath = '/dist/';
  } else {
    minFileNamePart = '.min';
  }

  return resources.createConfig(
    entryPointName,
    isProductionArg,
    addMonacoWebpackConfig({
      entry: {
        [entryPointName]: './lib/root.js'
      },

      output: {
        publicPath: publicPath,
        chunkFilename: `${entryPointName}-${version}-[name]-${now}${minFileNamePart}.js`
      },

      // The website config intentionally doesn't have React as an external because we bundle it
      // to ensure we get a consistent version.

      resolve: {
        alias: {
          '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
          '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
          'office-ui-fabric-react$': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
          'office-ui-fabric-react/src': path.resolve(__dirname, '../../packages/office-ui-fabric-react/src'),
          'office-ui-fabric-react/lib': path.resolve(__dirname, '../../packages/office-ui-fabric-react/lib'),
          '@uifabric/api-docs/lib': path.resolve(__dirname, '../../packages/api-docs/lib')
        }
      }
    }),
    /* only production */ isProductionArg
  );
};
