import * as webpack from 'webpack';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig: webpack.Configuration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    filename: `[name].js`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public/index.html',
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          // https://github.com/terser/terser
          mangle: false,
          output: {
            beautify: true,
            comments: true,
          },
        },
      }),
    ],
  },
};

module.exports = webpackConfig;
