const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const isProduction = process.argv.indexOf('--production') > -1;
const isDogfood = process.argv.indexOf('--dogfood') > -1;
const version = require('./package.json').version;
let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

if (isDogfood) {
  publicPath = 'https://static2df.sharepointonline.com/files/fabric/fabric-website/dist/';
} else if (!isProduction) {
  publicPath = "/dist/";
}
const PACKAGE_NAME = 'fabric-site';

module.exports = resources.createConfig(
  PACKAGE_NAME,
  isProduction,
  {
    entry: {
      [PACKAGE_NAME]: './lib/root.js'
    },

    output: {
      publicPath: publicPath,
      chunkFilename: `${PACKAGE_NAME}-${version}-[name].min.js`
    },

    externals: [
      {
        'react': 'React'
      },
      {
        'react-dom': 'ReactDOM'
      },
    ],

    resolve: {
      alias: {
        'office-ui-fabric-react/src': path.join(__dirname, 'node_modules/office-ui-fabric-react/src'),
        'office-ui-fabric-react/lib': path.join(__dirname, 'node_modules/office-ui-fabric-react/lib')
      }
    },
  },
  true /* only production */
);
