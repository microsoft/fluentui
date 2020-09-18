const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const IgnoreNotFoundExportWebpackPlugin = require('ignore-not-found-export-webpack-plugin');
const path = require('path');
const getResolveAlias = require('../webpack/getResolveAlias');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: 'tsconfig.json',
        },
      },
    ],
  });

  config.resolveLoader = {
    ...config.resolveLoader,
    modules: [
      'node_modules',
      path.join(__dirname, '../../node_modules'),
      path.join(__dirname, '../../../node_modules'),
    ],
  };

  config.module.rules.push({
    test: /\.scss$/,
    enforce: 'pre',
    exclude: [/node_modules/],
    use: [
      {
        loader: '@microsoft/loader-load-themed-styles', // creates style nodes from JS strings
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          modules: {
            localIdentName: '[name]_[local]_[hash:base64:5]',
          },
          importLoaders: 2,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function() {
            return [require('autoprefixer')];
          },
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  });

  config.module.rules.push({
    test: /\.(gif|jpg|jpeg|png|svg)$/,
    loader: 'file-loader?name=[name].[ext]',
  });

  config.module.rules.push({
    test: /\.(woff|woff2|ttf)$/,
    loader: 'file-loader?name=[name].[ext]',
  });

  config.module.rules.push({
    test: /\.md$/,
    loader: 'raw-loader',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = getResolveAlias();

  config.plugins.push(
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        // HardSource works with mini-css-extract-plugin but due to how
        // mini-css emits assets, assets are not emitted on repeated builds with
        // mini-css and hard-source together. Ignoring the mini-css loader
        // modules, but not the other css loader modules, excludes the modules
        // that mini-css needs rebuilt to output assets every time.
        // https://github.com/mzgoddard/hard-source-webpack-plugin/issues/416
        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
      },
    ]),
    new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }),
  );

  // Disable ProgressPlugin which logs verbose webpack build progress. Warnings and Errors are still logged.
  if (process.env.TF_BUILD) {
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
  }

  config.optimization.minimize = false;

  return config;
};
