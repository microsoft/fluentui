const resources = require('../../scripts/tasks/webpack-resources');

const isProduction = process.argv.indexOf('--production') > -1;
const isDogfood = process.argv.indexOf('--dogfood') > -1;
const path = require('path');
const version = require('./package.json').version;
let publicPath = 'https://static2.sharepointonline.com/files/fabric/fabric-website/dist/';

if (isDogfood) {
  publicPath = 'https://static2df.sharepointonline.com/files/fabric/fabric-website/dist/';
} else if (!isProduction) {
  publicPath = "/dist/";
}

const minFileNamePart = isProduction ? '.min' : '';

module.exports = resources.createConfig(
  'fabric-site',
  isProduction,
  {
    entry: {
      'fabric-site': './lib/root.js'
    },

    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: publicPath,
      filename: `[name]${minFileNamePart}.js`,
      chunkFilename: `fabric-site-${version}-[name]${minFileNamePart}.js`
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
  }
);
