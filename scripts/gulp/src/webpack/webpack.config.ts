import { getDefaultEnvironmentVars } from '@fluentui/scripts-monorepo';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import _ from 'lodash';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import config from '../config';

const { paths } = config;
const { __DEV__, __PERF__, __PROD__ } = config.compiler_globals;

const webpackConfig: webpack.Configuration &
  Required<Pick<webpack.Configuration, 'plugins' | 'optimization'>> & { entry: Record<string, string | string[]> } = {
  name: 'client',
  target: 'web',
  mode: config.compiler_mode!,
  entry: {
    app: paths.docsSrc('index'),
  },
  output: {
    // https://webpack.js.org/guides/build-performance/#avoid-production-specific-tooling
    filename: __DEV__ ? '[name].js' : `[name].[${config.compiler_hash_type}].js`,
    path: config.compiler_output_path,
    pathinfo: true,
    publicPath: config.compiler_public_path,
  },
  devtool: config.compiler_devtool,
  externals: {
    '@babel/standalone': 'Babel',
    'anchor-js': 'AnchorJS',
    'prettier/standalone': 'prettier',
    // These Prettier plugins are available under window.prettierPlugins
    'prettier/parser-babel': ['prettierPlugins', 'babel'],
    'prettier/parser-html': ['prettierPlugins', 'html'],
    'prettier/parser-typescript': ['prettierPlugins', 'typescript'],
  },
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
          cacheCompression: false,
          cacheDirectory: __DEV__,
          plugins: [__DEV__ && 'react-hot-loader/babel'].filter(Boolean),
        },
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      // solution to process.cwd() is not a function for react-markdown/vfile
      // https://github.com/remarkjs/react-markdown/issues/339#issuecomment-683199835
      // https://github.com/vfile/vfile/issues/38
      {
        test: /node_modules[\\|/]vfile[\\|/]core\.js/,
        use: [
          {
            loader: 'imports-loader',
            options: {
              type: 'commonjs',
              imports: ['single process/browser process'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.docs('tsconfig.json'),
      },
    }),
    new webpack.DefinePlugin(getDefaultEnvironmentVars()),
    new webpack.DefinePlugin(config.compiler_globals),
    new webpack.ContextReplacementPlugin(/node_modules[\\|/]typescript[\\|/]lib/, /typescript\.js/, false),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.docsSrc('public'),
          to: paths.docsDist('public'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: paths.docsSrc('index.ejs'),
      filename: 'index.html',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: __PROD__,
      },
      versions: {
        babelStandalone: require('@babel/standalone/package.json').version,
        lodash: require('lodash/package.json').version,
        prettier: require('prettier/package.json').version,
        // FIXME?: this is not used anywhere in doc templates and also points to wrong package.json (one within scripts/)
        fluentUI: require('../../package.json').version,
        reactVis: require('react-vis/package.json').version,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    __DEV__ &&
    // Disable ProgressPlugin in CI and multi-project build because the outdated lines can't be deleted and
    // spam the log (note that build:docs is the resolved command used by nx run build --stream)
    !process.env.TF_BUILD &&
    !process.argv.includes('build:docs')
      ? new webpack.ProgressPlugin({
          entries: true,
          modules: true,
          modulesCount: 500,
        })
      : null,
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      ...config.webpackAliases,
      src: paths.packageSrc('react-northstar'),
      faker: 'faker/locale/en',
      'react-hook-form': 'react-hook-form/dist/react-hook-form.ie11',
      ...(__DEV__ && {
        'react-dom': '@hot-loader/react-dom',
      }),
    },
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  performance: false,
};

// ------------------------------------
// Environment Configuration
// ------------------------------------
if (__DEV__) {
  const webpackHotPath = `${config.compiler_public_path}__webpack_hmr`;
  const webpackHotMiddlewareEntry = `webpack-hot-middleware/client?${_.map(
    {
      path: webpackHotPath, // The path which the middleware is serving the event stream on
      timeout: 2000, // The time to wait after a disconnection before attempting to reconnect
      overlay: true, // Set to false to disable the DOM-based client-side overlay.
      reload: true, // Set to true to auto-reload the page when webpack gets stuck.
      noInfo: false, // Set to true to disable informational console logging.
      quiet: false, // Set to true to disable all console logging.
    },
    (val, key) => `&${key}=${val}`,
  ).join('')}`;
  const entry = webpackConfig.entry;

  entry.app = [webpackHotMiddlewareEntry].concat(entry.app);

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  );

  webpackConfig.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ];

  if (__PERF__) {
    webpackConfig.optimization.minimizer = [];
  }

  if (process.env.NIGHTLYRELEASEDATE) {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NIGHTLYRELEASEDATE': JSON.stringify(process.env.NIGHTLYRELEASEDATE),
      }),
    );
  }
}

if (process.env.ANALYZE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

export default webpackConfig;
