// @ts-check

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { rules } = require('@fluentui/scripts-storybook');

const workspaceRoot = path.resolve(__dirname, '../../..');
const outputPath = path.resolve(__dirname, 'dist/playground');
// worker names used in `src/playground/monaco.ts`
const WORKER_CHUNKS = ['ts.worker', 'editor.worker'];
// virtual module resolved to the generated type declarations asset, see `src/playground/typings.ts`
const TYPINGS_MODULE = 'playground-typings';
const TYPINGS_STUB = path.resolve(__dirname, 'tools/playground-typings.json');

/**
 * Must match the dependency allowlist in `src/playground/modules.ts`.
 */
const TYPINGS_ENTRIES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  '@fluentui/react-components',
  '@fluentui/react-components/unstable',
  '@fluentui/react-icons',
];

/**
 * TypeScript version bundled with Monaco - `typesVersions` mappings in package.json files are resolved against it.
 */
function getMonacoTypeScriptVersion() {
  const contribution = fs.readFileSync(
    require.resolve('monaco-editor/esm/vs/language/typescript/monaco.contribution.js'),
    'utf8',
  );
  const match = contribution.match(/typescriptVersion\s*=\s*["'](\d+\.\d+\.\d+)["']/);

  if (!match) {
    throw new Error('Unable to detect the TypeScript version bundled with monaco-editor');
  }

  return match[1];
}

/**
 * Same SWC rule Storybook uses in this repo, but for files of this package `.swcrc` must be ignored:
 * it excludes `src/playground` from the library build (those files are only ever bundled by this config).
 *
 * @type {import('webpack').RuleSetRule}
 */
const playgroundSwcRule = {
  ...rules.swcRule,
  include: [path.join(__dirname, 'src')],
  use: /** @type {import('webpack').RuleSetUseItem[]} */ (rules.swcRule.use).map(loader =>
    typeof loader === 'object' && loader !== null
      ? { ...loader, options: { ...loader.options, swcrc: false } }
      : loader,
  ),
};

/** @type {import('webpack').RuleSetRule} */
const workspaceSwcRule = {
  ...rules.swcRule,
  exclude: [/node_modules/, path.join(__dirname, 'src')],
};

/**
 * Bundles the standalone playground app (`src/playground`) into `dist/playground/playground.html` + assets.
 * The output folder is served by Storybook through the `staticDirs` preset property, see `preset.js`.
 *
 * Workspace packages are resolved from source via tsconfig path aliases (same approach as Storybook in this repo),
 * so the playground always ships the current state of the monorepo.
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
    alias: {
      [TYPINGS_MODULE]: TYPINGS_STUB,
    },
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(workspaceRoot, 'tsconfig.base.all.json') })],
  },
  module: {
    rules: [
      playgroundSwcRule,
      workspaceSwcRule,
      {
        // `.d.ts` files of the dependency allowlist, emitted as one JSON asset that the editor fetches lazily
        test: TYPINGS_STUB,
        type: 'asset/resource',
        generator: {
          filename: 'playground/typings.[contenthash].json',
        },
        use: [
          {
            loader: path.resolve(__dirname, 'tools/typings-loader.js'),
            options: {
              packageRoot: __dirname,
              entries: TYPINGS_ENTRIES,
              typescriptVersion: getMonacoTypeScriptVersion(),
            },
          },
        ],
      },
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
