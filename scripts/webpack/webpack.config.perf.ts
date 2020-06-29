import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { webpack as lernaAliases } from 'lerna-alias';
import { argv } from 'yargs';
import webpack from 'webpack';

import config from '../config';

const { paths } = config;

const webpackConfig: webpack.Configuration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: {
    app: paths.perfSrc('index'),
  },
  output: {
    filename: `[name].js`,
    path: paths.perfDist(),
    pathinfo: true,
    publicPath: config.compiler_public_path,
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
    new ForkTsCheckerWebpackPlugin({ tsconfig: paths.perf('tsconfig.json') }),
    new (CopyWebpackPlugin as any)([
      {
        from: paths.perfSrc('index.html'),
        to: paths.perfDist(),
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ...lernaAliases(),
      src: paths.packageSrc('react-northstar'),

      // We are using React in production mode with tracing.
      // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
  optimization: {
    nodeEnv: !!argv.debug ? 'development' : 'production',
  },
};

export default webpackConfig;
