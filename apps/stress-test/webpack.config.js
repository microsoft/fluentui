const path = require('path');
const { GriffelCSSExtractionPlugin } = require('@griffel/webpack-extraction-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { configurePages } = require('./pageConfig');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
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
        test: /\.(js|ts|tsx)$/,
        // Apply "exclude" only if your dependencies **do not use** Griffel
        // exclude: /node_modules/,
        exclude: /\.wc\.(ts|tsx)?$/,
        use: {
          loader: GriffelCSSExtractionPlugin.loader,
        },
      },
      // Add "@griffel/webpack-loader" if you use Griffel directly in your project
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.wc\.(ts|tsx)?$/],
        use: {
          loader: '@griffel/webpack-loader',
          options: {
            babelOptions: {
              presets: ['@babel/preset-typescript'],
            },
          },
        },
      },
      // "css-loader" is required to handle produced CSS assets by Griffel
      // you can use "style-loader" or "MiniCssExtractPlugin.loader" to handle CSS insertion
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

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
  plugins: [new MiniCssExtractPlugin(), new GriffelCSSExtractionPlugin(), new CleanWebpackPlugin()],

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

module.exports = configurePages(config);
