const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const PACKAGE_NAME = 'test-bundle-button';

module.exports = resources.createConfig(
  PACKAGE_NAME,
  true,
  {
    entry: './src/index.tsx',

    output: {
      path: path.join(__dirname, 'dist'),
      filename: PACKAGE_NAME + '.js',
    },

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },

    module: {
      loaders: [
        {
          test: [/\.tsx?$/],
          loader: 'awesome-typescript-loader',
          exclude: [
            /node_modules/,
            /\.scss.ts$/
          ]
        }
      ]
    }
  });

