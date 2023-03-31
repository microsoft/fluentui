import { getDefaultEnvironmentVars, workspaceRoot } from '@fluentui/scripts-monorepo';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

import config from '../config';

const aliases = {
  ...config.lernaAliases({ type: 'webpack', directory: workspaceRoot }),
};

const { paths } = config;

/**
 * TODO: make it  generic. ATM this lives within scripts/storybook domain
 * v8 uses SCSS/CSS modules
 */
const scssRule: import('webpack').RuleSetRule = {
  test: /\.scss$/,
  enforce: 'pre',
  include: [/packages\/react\/src/],
  exclude: [/node_modules/],
  use: [
    {
      // creates style nodes from JS strings
      loader: '@microsoft/loader-load-themed-styles',
    },
    {
      // translates CSS into CommonJS
      loader: 'css-loader',
      options: {
        esModule: false,
        modules: true,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

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
    noParse: [/anchor-js/],
    rules: [
      scssRule,
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2019',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(getDefaultEnvironmentVars(true)),
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
    alias: aliases,
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
};

export default webpackConfig;
