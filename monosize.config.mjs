// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import webpackBundler from 'monosize-bundler-webpack';
import gitStorage from 'monosize-storage-git';
// import { configureReactIcons } from '@fluentui/scripts-storybook';
// eslint-disable-next-line import/no-extraneous-dependencies -- dev dependency provided by the Nx workspace
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { GriffelPlugin } from '@griffel/webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies -- provided transitively by @griffel/webpack-plugin
// import { parseCSSRules, sortCSSRules } from '@griffel/css-extraction-utils';
// eslint-disable-next-line import/no-extraneous-dependencies -- provided transitively by @griffel/react
// import { defaultCompareMediaQueries } from '@griffel/core';

/**
 * `GriffelPlugin` moves all extracted CSS into a single shared `griffel` chunk, which webpack emits as `griffel.css`
 * at the output root. Monosize only measures files inside each fixture's own output directory (and in batch mode that
 * shared chunk would also mix CSS of all fixtures), so the CSS was never measured.
 *
 * This plugin must be applied after `GriffelPlugin`: it removes the shared chunk so CSS stays with its entry, and
 * applies Griffel's sorting/de-duplication to every emitted CSS asset instead.
 */
// class GriffelPerEntryCssPlugin {
//   /** @param {import('webpack').Compiler} compiler */
//   apply(compiler) {
//     const splitChunks = compiler.options.optimization.splitChunks;
//     if (splitChunks && splitChunks.cacheGroups) {
//       delete splitChunks.cacheGroups.griffel;
//     }

//     compiler.hooks.compilation.tap(GriffelPerEntryCssPlugin.name, compilation => {
//       compilation.hooks.processAssets.tap(
//         { name: GriffelPerEntryCssPlugin.name, stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS },
//         assets => {
//           for (const [assetName, assetSource] of Object.entries(assets)) {
//             if (!assetName.endsWith('.css')) {
//               continue;
//             }
//             const { cssRulesByBucket, remainingCSS } = parseCSSRules(assetSource.source().toString());
//             const sortedCSS = sortCSSRules([cssRulesByBucket], defaultCompareMediaQueries, defaultCompareMediaQueries);
//             compilation.updateAsset(assetName, new compiler.webpack.sources.RawSource(remainingCSS + sortedCSS));
//           }
//         },
//       );
//     });
//   }
// }

/**
 * Single source of truth for the bundle-size report artifact name and path.
 *
 * `monosize-storage-git` reads the base report from a GitHub Actions artifact by
 * matching this exact name, but it does NOT control the `actions/upload-artifact`
 * step that produces it — so these values must be consumed by the workflow instead
 * of being duplicated there. See `.github/scripts/monosize-report-artifact-meta.mjs`.
 */
export const reportArtifactName = 'monosize-bundle-size-report';
export const reportOutputPath = 'dist/bundle-size-report.json';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  repository: 'https://github.com/microsoft/fluentui',
  storage: gitStorage({
    owner: 'microsoft',
    repo: 'fluentui',
    workflowFileName: 'bundle-size-base.yml',
    outputPath: reportOutputPath,
    artifactName: reportArtifactName,
  }),
  bundler: webpackBundler(config => {
    config.externals = config.externals ?? {};
    // Peer dependencies are provided by the consuming app, so they don't count towards a package's size.
    // `scheduler` is a peer dependency of `@fluentui/react-context-selector` and the same copy `react-dom` brings.
    config.externals = {
      react: 'React',
      'react/jsx-runtime': 'jsxRuntime',
      'react-dom': 'ReactDOM',
      'react/compiler-runtime': 'ReactCompilerRuntime',
      scheduler: 'Scheduler',
    };
    // ESM-first packages emit bare subpath imports (e.g. `use-sync-external-store/shim`) that lack
    // a file extension. Once measured packages are `type: module`, webpack treats their `lib/` as
    // ESM and enforces fully-specified imports; disable that so legacy CJS deps still resolve.
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({ test: /\.[cm]?js$/, resolve: { fullySpecified: false } });

    /** Griffel extraction */
    // config.module.rules.push(
    //   {
    //     test: /\.(js|ts|tsx)$/,
    //     // Apply "exclude" only if your dependencies **do not use** Griffel
    //     // exclude: /node_modules/,
    //     use: {
    //       loader: '@griffel/webpack-plugin/loader',
    //     },
    //   },
    //   // "css-loader" and "mini-css-extract-plugin" are required to handle CSS assets produced by Griffel
    //   {
    //     test: /\.css$/,
    //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
    //   },
    // );

    // // Emit CSS next to each fixture's JavaScript (`index.js` -> `index.css`, `[name]/index.js` -> `[name]/index.css`).
    // const jsFilename = config.output?.filename;
    // if (typeof jsFilename !== 'string' || !jsFilename.endsWith('.js')) {
    //   throw new Error('Expected the Monosize Webpack output filename to end in .js.');
    // }

    // config.plugins = config.plugins ?? [];
    // config.plugins.push(
    //   new MiniCssExtractPlugin({ filename: jsFilename.replace(/\.js$/, '.css') }),
    //   new GriffelPlugin(),
    //   new GriffelPerEntryCssPlugin(),
    // );

    // config.resolve = config.resolve ?? {};
    // config.resolve.extensionAlias = {
    //   ...config.resolve.extensionAlias,
    //   '.styles.js': ['.styles.raw.js', '.styles.js'],
    // };

    /* CSS MODULES */

    // configureReactIcons({ config, headless: true });

    // config.module.rules.push({
    //   test: /\.css$/,
    //   sideEffects: true,
    //   use: [
    //     MiniCssExtractPlugin.loader,
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: { auto: true, namedExport: false },
    //       },
    //     },
    //   ],
    // });

    // config.resolve = config.resolve ?? {};
    // config.resolve.extensionAlias = {
    //   ...config.resolve.extensionAlias,
    //   '.styles.js': ['.styles.css.js', '.styles.js'],
    // };

    // // Keep extracted CSS next to each fixture's JavaScript in both build modes.
    // const jsFilename = config.output?.filename;
    // if (typeof jsFilename !== 'string' || !jsFilename.endsWith('.js')) {
    //   throw new Error('Expected the Monosize Webpack output filename to end in .js.');
    // }
    // config.plugins = config.plugins ?? [];
    // config.plugins.push(new MiniCssExtractPlugin({ filename: jsFilename.replace(/\.js$/, '.css') }));

    return config;
  }),
  reportResolvers: {
    packageName: async packageRoot => {
      const packageJson = await fs.promises.readFile(path.join(packageRoot, 'package.json'), 'utf-8');
      const json = JSON.parse(packageJson);
      return json.name.replace('@fluentui/', '');
    },
  },
  // assetTypes: ['js', 'css'],
};

export default config;
