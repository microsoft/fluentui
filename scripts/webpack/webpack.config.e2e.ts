import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { webpack as lernaAliases } from '../lernaAliasNorthstar';
import webpack from 'webpack';
import getDefaultEnvironmentVars from './getDefaultEnvironmentVars';
import config from '../config';

const { paths } = config;
const webpackConfig: webpack.Configuration = {
  name: 'client',
  target: 'web',
  // CI should use production builds to improve perf of loading pages
  mode: 'production',
  entry: {
    app: paths.e2eSrc('app'),
  },
  output: {
    filename: `[name].js`,
    path: paths.e2eDist(),
  },
  // CI should not use sourcemaps, but it's useful for local debugging
  devtool: process.env.CI ? false : config.compiler_devtool,
  node: {
    global: true,
  },
  module: {
    noParse: [
      /anchor-js/,
      /prettier\/parser-typescript/, // prettier issue, should be solved after upgrade prettier to version 2 https://github.com/prettier/prettier/issues/6903
    ],
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
    new webpack.DefinePlugin(getDefaultEnvironmentVars(true)),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.e2e('tsconfig.json'),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.e2eSrc('index.html'),
          to: paths.e2eDist(),
        },
      ],
    }),
  ],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: lernaAliases(),
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
};

export default webpackConfig;
