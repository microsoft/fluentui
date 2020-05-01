import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { webpack as lernaAliases } from 'lerna-alias';
import webpack from 'webpack';

import config from '../config';

const { paths } = config;

const webpackConfig: webpack.Configuration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    app: paths.e2eSrc('app'),
  },
  output: {
    filename: `[name].js`,
    path: paths.e2eDist(),
    pathinfo: true,
  },
  devtool: config.compiler_devtool as webpack.Options.Devtool,
  node: {
    fs: 'empty',
    module: 'empty',
    child_process: 'empty',
    net: 'empty',
    readline: 'empty',
  },
  module: {
    noParse: [/anchor-js/],
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ tsconfig: paths.e2e('tsconfig.json') }),
    new CopyWebpackPlugin([
      {
        from: paths.e2eSrc('index.html'),
        to: paths.e2eDist(),
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: lernaAliases(),
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
};

export default webpackConfig;
