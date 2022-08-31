const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { configurePages } = require('./pageConfig');
const { configureGriffel } = require('./griffelConfig');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  let config = {
    output: {
      filename: '[name].[contenthash].bundle.js',
      sourceMapFilename: '[name].[contenthash].map',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          oneOf: [
            {
              // Match Web Component files
              // Not sure why babel-loader isn't working but
              // the FAST docs use ts-loader and it "just works"
              // so let's roll with it for now.
              include: /\.wc\.(ts|tsx)?$/,
              use: 'ts-loader',
            },
            {
              use: 'swc-loader',
            },
          ],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };

  if (!isProd) {
    config.devServer = {
      port: 9000,
      open: false,
      hot: true,
      compress: true,
    };
  }

  config = configureGriffel(config);
  config = configurePages(config);

  return config;
};
