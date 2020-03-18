import CleanWebpackPlugin from 'clean-webpack-plugin';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import config from '../config';

const { paths } = config;

// Interfaces no longer exist after transpiling, causing webpack to throw errors about them.
// ERROR:    https://github.com/webpack/webpack/issues/7378
// HACK FIX: https://github.com/TypeStrong/ts-loader/issues/653
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;

    const doneHook = stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => !(warn && messageRegExp.test(warn.message)));
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
}

const makeConfig = (srcPath: string, name: string): webpack.Configuration => ({
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: paths.packageDist('react-northstar', path.join('es', srcPath)),
  output: {
    filename: `${name}.js`,
    path: paths.base('stats'),
    pathinfo: true,
    publicPath: config.compiler_public_path
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM'
  },
  plugins: [
    new CleanWebpackPlugin([paths.base('stats')], {
      root: paths.base(),
      verbose: false // do not log
    }),
    new IgnoreNotFoundExportPlugin(),
    new webpack.DefinePlugin(config.compiler_globals)
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  performance: {
    hints: false // to (temporarily) disable "WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit")
  }
});

export default [
  // entire package
  makeConfig('index', 'bundle-react'),

  // utils (core)
  makeConfig('utils/index', 'bundle-utils'),

  // individual components
  ...fs
    .readdirSync(paths.packageSrc('react-northstar', 'components'))
    .map(dir => makeConfig(`components/${dir}/${dir}`, `component-${dir}`)),

  // individual themes
  ...fs
    .readdirSync(paths.packageSrc('react-northstar', 'themes'))
    .filter(dir => !/.*\.\w+$/.test(dir))
    .map(dir => makeConfig(`themes/${dir}`, `theme-${dir}`))
];
