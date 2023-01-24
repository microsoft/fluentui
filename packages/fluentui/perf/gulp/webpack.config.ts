import * as path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { argv } from 'yargs';
import webpack from 'webpack';

import { config } from '@fluentui/scripts-gulp';
import { getDefaultEnvironmentVars } from '@fluentui/scripts-monorepo';

const { paths } = config;

export const webpackConfig: webpack.Configuration = {
  name: 'client',
  target: 'web',
  // eslint-disable-next-line no-extra-boolean-cast
  mode: Boolean(argv.debug) ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, '..', 'src/index'),
  },
  output: {
    filename: `[name].js`,
    path: path.join(__dirname, '..', 'dist'),
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: config.compiler_devtool,
  node: {
    global: true,
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
    new webpack.DefinePlugin(getDefaultEnvironmentVars(!argv.debug)),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.e2e('tsconfig.json'),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '..', 'src/index.html'),
          to: path.join(__dirname, '..', 'dist'),
        },
      ],
    }),
  ],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ...config.lernaAliases({ type: 'webpack' }),
      src: paths.packageSrc('react-northstar'),

      // We are using React in production mode with tracing.
      // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',

      // Can be removed once Prettier will be upgraded to v2
      // https://github.com/prettier/prettier/issues/6903
      '@microsoft/typescript-etw': false,
    },
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
  optimization: {
    // eslint-disable-next-line no-extra-boolean-cast
    nodeEnv: !!argv.debug ? 'development' : 'production',
  },
};
