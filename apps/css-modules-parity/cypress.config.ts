import * as path from 'path';
import { defineConfig } from 'cypress';
import { GriffelPlugin } from '@griffel/webpack-plugin';
import * as MiniCssExtractPluginModule from 'mini-css-extract-plugin';
import postcss from 'postcss';
import type { Root } from 'postcss';
import type { RuleSetRule, WebpackPluginInstance } from 'webpack';
import { baseConfig } from '@fluentui/scripts-cypress';
import { postcssGriffelBuckets } from './griffel-buckets/postcssGriffelBuckets';

const webpackConfig = baseConfig.component.devServer.webpackConfig;
// The CommonJS export is the plugin class itself; depending on interop it is the namespace or its `default`.
const MiniCssExtractPlugin = ((MiniCssExtractPluginModule as unknown as { default?: unknown }).default ??
  MiniCssExtractPluginModule) as typeof MiniCssExtractPluginModule;

/**
 * Opt-in prototypes, see README:
 * - `FUI_PARITY_GRIFFEL_BUCKETS=1`: Fluent CSS Modules rules are annotated with Griffel style buckets and inserted at
 *   runtime next to Griffel's own stylesheets.
 * - `FUI_PARITY_EXTRACTION=1`: Griffel styles are extracted at build time; Fluent CSS Modules rules are annotated the
 *   same way and sorted into Griffel's extracted stylesheet.
 */
const extraction = process.env.FUI_PARITY_EXTRACTION === '1';
const griffelBuckets = extraction || process.env.FUI_PARITY_GRIFFEL_BUCKETS === '1';
/** Environment axes, combinable with any mode: `FUI_PARITY_DIR=rtl`, `FUI_PARITY_FORCED_COLORS=1`, `FUI_PARITY_SHADOW_DOM=1`. */
const dir = process.env.FUI_PARITY_DIR === 'rtl' ? 'rtl' : 'ltr';
const forcedColors = process.env.FUI_PARITY_FORCED_COLORS === '1';
const shadowDOM = process.env.FUI_PARITY_SHADOW_DOM === '1';
/**
 * `FUI_PARITY_LAYER=1`: wraps every Fluent CSS Modules stylesheet in `@layer fluent { ... }`, like the experimental
 * layered packages. Unlayered app styles (Griffel's included) then beat component styles regardless of specificity.
 * Only for the default mode: the Griffel buckets modes order component rules through Griffel instead.
 */
const fluentLayer = process.env.FUI_PARITY_LAYER === '1';
if (fluentLayer && griffelBuckets) {
  throw new Error('FUI_PARITY_LAYER=1 is not combinable with FUI_PARITY_GRIFFEL_BUCKETS=1 or FUI_PARITY_EXTRACTION=1.');
}

const appRoot = path.resolve(__dirname);
const cssLoader = { loader: 'css-loader', options: { modules: { auto: true, namedExport: false }, importLoaders: 1 } };
const griffelBucketsLoader = {
  loader: 'postcss-loader',
  options: { postcssOptions: { plugins: [postcssGriffelBuckets()] } },
};
const fluentLayerLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        {
          postcssPlugin: 'fluentui-parity-layer',
          // eslint-disable-next-line @typescript-eslint/naming-convention -- PostCSS plugin API
          Once(root: Root) {
            const layer = postcss.atRule({ name: 'layer', params: 'fluent' });
            layer.append(root.nodes.filter(node => node.type !== 'comment'));
            root.append(layer);
          },
        },
      ],
    },
  },
};

const cssRules: RuleSetRule[] = [
  // CSS produced by Griffel's extraction loader.
  ...(extraction ? [{ test: /\.griffel\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }] : []),
  // Fluent component stylesheets; app stylesheets keep plain `style-loader` cascade positions.
  ...(griffelBuckets
    ? [
        {
          include: (file: string) => !file.startsWith(appRoot),
          use: [
            extraction
              ? MiniCssExtractPlugin.loader
              : path.resolve(appRoot, 'griffel-buckets/griffelBucketsStyleLoader.js'),
            cssLoader,
            griffelBucketsLoader,
          ],
        },
      ]
    : []),
  ...(fluentLayer
    ? [{ include: (file: string) => !file.startsWith(appRoot), use: ['style-loader', cssLoader, fluentLayerLoader] }]
    : []),
  { use: ['style-loader', cssLoader] },
];

const extractionRules: RuleSetRule[] = extraction
  ? [
      {
        // Runs on esbuild's output, so the Griffel loader only parses JavaScript.
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'post',
        use: { loader: '@griffel/webpack-plugin/loader' },
      },
    ]
  : [];

const extractionPlugins: WebpackPluginInstance[] = extraction
  ? [new MiniCssExtractPlugin(), new GriffelPlugin() as unknown as WebpackPluginInstance]
  : [];

export default defineConfig({
  ...baseConfig,
  env: { ...baseConfig.env, griffelBuckets, extraction, dir, forcedColors, shadowDOM, fluentLayer },
  component: {
    ...baseConfig.component,
    // Queries reach into the shadow root the app renders into.
    includeShadowDom: shadowDOM,
    specPattern: 'e2e/**/*.cy.tsx',
    devServer: {
      ...baseConfig.component.devServer,
      webpackConfig: {
        ...webpackConfig,
        // Opt-in for concurrent runs: source edits made elsewhere must not trigger rebuilds mid-run.
        ...(process.env.FUI_CYPRESS_NO_WATCH ? { watchOptions: { ignored: /./ } } : {}),
        resolve: {
          ...webpackConfig.resolve,
          // Components resolve their CSS Modules alternatives; app-level Griffel styles stay untouched.
          extensionAlias: {
            ...webpackConfig.resolve?.extensionAlias,
            '.styles': ['.styles.css.ts', '.styles.ts'],
            '.styles.js': ['.styles.css.js', '.styles.js'],
          },
        },
        module: {
          ...webpackConfig.module,
          rules: [
            ...(webpackConfig.module?.rules ?? []),
            {
              // Original Griffel hooks (used as the parity baseline) keep resolving Griffel base hooks.
              test: /\.styles\.tsx?$/,
              exclude: /\.styles\.css\.tsx?$/,
              resolve: {
                extensionAlias: { '.styles': ['.styles.ts'], '.styles.js': ['.styles.js'] },
              },
            },
            ...extractionRules,
            { test: /\.css$/, sideEffects: true, oneOf: cssRules },
          ],
        },
        plugins: [...(webpackConfig.plugins ?? []), ...extractionPlugins],
      },
    },
  },
});
