// @ts-check

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const workspaceRoot = path.resolve(__dirname, '../../..');
const outputPath = path.resolve(__dirname, 'dist/playground');
// worker names used in `src/playground/monaco.ts`
const WORKER_CHUNKS = ['ts.worker', 'editor.worker'];

const swcLoaderOptions = {
  jsc: {
    target: 'es2019',
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: true,
      dynamicImport: true,
    },
    transform: {
      decoratorMetadata: true,
      legacyDecorator: true,
    },
    keepClassNames: true,
    externalHelpers: true,
    loose: true,
    minify: {
      mangle: false,
    },
  },
};

/**
 * This package's `.swcrc` excludes `src/playground` from the library build (those files are only ever bundled here),
 * so SWC must ignore `.swcrc` for this package's sources.
 *
 * @type {import('webpack').RuleSetRule}
 */
const playgroundSwcRule = {
  test: /\.(ts|tsx)$/,
  include: [path.join(__dirname, 'src')],
  use: [{ loader: 'swc-loader', options: { ...swcLoaderOptions, swcrc: false } }],
};

/**
 * Compiles other workspace packages pulled in via TsconfigPathsPlugin (those packages keep their own `.swcrc`).
 *
 * @type {import('webpack').RuleSetRule}
 */
const workspaceSwcRule = {
  test: /\.(ts|tsx)$/,
  exclude: [/node_modules/, path.join(__dirname, 'src')],
  use: [{ loader: 'swc-loader', options: swcLoaderOptions }],
};

/**
 * Bundles the standalone playground shell (`src/playground`) into `dist/playground/playground.html` + assets.
 * Consumer modules, typings and the runtime manifest are emitted separately by the Storybook addon's webpackFinal hook.
 *
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'production',
  target: 'web',
  context: __dirname,
  entry: {
    playground: './src/playground/main.tsx',
  },
  output: {
    path: outputPath,
    // resolved at runtime from the script (or worker) URL, so the page works when Storybook is deployed under a sub path
    publicPath: 'auto',
    filename: 'playground/[name].[contenthash].js',
    chunkFilename: 'playground/[name].[contenthash].js',
    assetModuleFilename: 'playground/assets/[name].[contenthash][ext]',
    clean: true,
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(workspaceRoot, 'tsconfig.base.all.json') })],
  },
  module: {
    rules: [
      playgroundSwcRule,
      workspaceSwcRule,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/playground/playground.html',
      filename: 'playground.html',
      chunks: ['playground'],
      scriptLoading: 'defer',
    }),
  ],
  optimization: {
    splitChunks: {
      // keep Monaco web workers self-contained, everything else shares vendor chunks
      chunks: chunk => !WORKER_CHUNKS.includes(chunk.name ?? ''),
      cacheGroups: {
        monaco: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: 'monaco',
          priority: 20,
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  stats: 'errors-warnings',
};
