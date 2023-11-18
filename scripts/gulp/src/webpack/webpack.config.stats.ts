import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import glob from 'glob';
import * as _ from 'lodash';
import { argv } from 'yargs';
import TerserWebpackPlugin from 'terser-webpack-plugin';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

import config from '../config';

const { paths } = config;

// Interfaces no longer exist after transpiling, causing webpack to throw errors about them.
// ERROR:    https://github.com/webpack/webpack/issues/7378
// HACK FIX: https://github.com/TypeStrong/ts-loader/issues/653
class IgnoreNotFoundExportPlugin {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(compiler: webpack.Compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;

    const doneHook = (stats: any) => {
      stats.compilation.warnings = stats.compilation.warnings.filter(
        (warn: any) => !(warn && messageRegExp.test(warn.message)),
      );
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      // @ts-expect-error - TODO: this api is non existent thus this probably doesn't work anymore ?
      compiler.plugin('done', doneHook);
    }
  }
}

const makeConfig = (srcPath: string, name: string): webpack.Configuration => ({
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: srcPath,
  output: {
    filename: `${name}.js`,
    path: paths.base('stats'),
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: false,
  module: {
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
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
  },
  ...(argv.debug
    ? {
        optimization: {
          minimizer: [
            new TerserWebpackPlugin({
              parallel: true,
              terserOptions: {
                mangle: false,
                output: {
                  beautify: true,
                  comments: true,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  preserve_annotations: true,
                },
              },
            }),
          ],
        },
      }
    : null),
  plugins: [
    new CleanWebpackPlugin(),
    new IgnoreNotFoundExportPlugin(),
    // new BundleAnalyzerPlugin({
    //   reportFilename: `${name}.html`,
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    hints: false, // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  },
});

const toEsDistPath = (srcPath: string) => {
  return paths.packageDist('react-northstar', path.join('es', srcPath));
};

export default [
  ...glob
    .sync(paths.packageSrc('docs', 'examples/components/**/*.bsize.tsx'))
    .map(examplePath => makeConfig(examplePath, _.camelCase(path.basename(examplePath)))),

  // entire package
  makeConfig(toEsDistPath('index'), 'bundle-react'),

  // utils (core)
  makeConfig(toEsDistPath('utils/index'), 'bundle-utils'),

  // individual components
  ...fs
    .readdirSync(paths.packageSrc('react-northstar', 'components'))
    .map(dir => makeConfig(toEsDistPath(`components/${dir}/${dir}`), `component-${dir}`)),

  // individual themes
  ...fs
    .readdirSync(paths.packageSrc('react-northstar', 'themes'))
    .filter(dir => !/.*\.\w+$/.test(dir))
    .map(dir => makeConfig(toEsDistPath(`themes/${dir}`), `theme-${dir}`)),
];
