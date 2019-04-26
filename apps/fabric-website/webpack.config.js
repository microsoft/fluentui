module.exports = function(env) {
  const path = require('path');
  const resources = require('../../scripts/webpack/webpack-resources');
  const version = require('./package.json').version;
  const isDogfoodArg = env && !env.production;
  const isProductionArg = env && env.production;

  // Production defaults
  let minFileNamePart = '';
  let entryPointName = 'fabric-site';
  let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

  // Dogfood overrides
  if (isDogfoodArg) {
    publicPath = 'https://static2df.sharepointonline.com/files/fabric/fabric-website/dist/';
    entryPointName = 'fabric-site-df';
  } else if (!isProductionArg) {
    publicPath = '/dist/';
  } else {
    minFileNamePart = '.min';
  }

  return resources.createConfig(
    entryPointName,
    isProductionArg,
    {
      entry: {
        [entryPointName]: './lib/root.js'
      },

      output: {
        publicPath: publicPath,
        chunkFilename: `${entryPointName}-${version}-[name]${minFileNamePart}.js`
      },

      externals: [
        {
          react: 'React'
        },
        {
          'react-dom': 'ReactDOM'
        }
      ],

      resolve: {
        alias: {
          '@uifabric/fabric-website/src': path.join(__dirname, 'src'),
          '@uifabric/fabric-website/lib': path.join(__dirname, 'lib'),
          'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
          'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib')
        }
      }
    },
    isProductionArg /* only production */
  );
};
