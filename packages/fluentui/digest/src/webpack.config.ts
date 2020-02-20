import * as path from 'path';
import * as webpack from 'webpack';

// TODO: remove just as a dependency. should only be a dev dependency when used.
import { webpackConfig, webpackMerge, htmlOverlay } from 'just-scripts';

const IgnoreNotFoundExportWebpackPlugin = require('ignore-not-found-export-webpack-plugin');

export interface DigestConfig {
  configDir: string;
  outputDir: string;
}

// This is the default webpack config for creating story bundles for consumers.
// This config is not used to bundle this package for release.

// TODO:
// these paths need to be accurate for pathing into library distribution, not source.
// is require.resolve the best thing to use here?
export const defaultConfig = (digestConfig: DigestConfig): webpack.Configuration[] => {
  // TODO: optimize configs to share common instances and remove usage of just (use webpack-merge directly)
  const bundle = webpackMerge(
    webpackConfig,
    htmlOverlay({
      // TODO: is require.resolve really needed here? path.join / __dirname instead?
      template: require.resolve('../assets/index.html'),
    }),
    {
      // TODO: should entry really be pointing to lib output rather than ts?
      // TODO: reduce to entry: string?
      entry: {
        digest: require.resolve('../lib/bundle/index.digest.js'),
      },
      mode: 'production',
      output: {
        filename: '[name].js',
      },
      resolve: {
        alias: {
          // TODO: this needs to work for both digest and consumer
          // TODO: is this still needed? (also in tsconfig.json)
          stories: path.resolve(__dirname, '.'),
        },
      },
      optimization: {
        minimize: false,
      },
      plugins: [
        // This plugin was added to ignore warnings wherever types are imported.
        new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }),
      ],
    },
  );

  // This config creates a bundle that can be imported directly by the perf-test script to see all available stories.
  // Currently this is bundling all stories and their dependencies when all the script really needs is the story information.
  // The bundle size may be optimized later somehow, whether by backfilling require.context or somehow using a
  // webpack plugin to extract story information during bundling.
  const stories = webpackMerge(webpackConfig, {
    target: 'node',
    entry: {
      // TODO: If users are passing in require.context args, the entry here should probably
      // be something that just requires.context on those args and returns just story
      // information.
      stories: require.resolve('../lib/bundle/stories.js'),
    },
    mode: 'production',
    output: {
      filename: '[name].js',
      library: 'example',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    resolve: {
      alias: {
        // TODO: this needs to work for both digest and consumer
        // TODO: is this still needed? (also in tsconfig.json)
        stories: path.resolve(__dirname, '.'),
      },
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      // This plugin was added to ignore warnings wherever types are imported.
      new IgnoreNotFoundExportWebpackPlugin({ include: [/\.tsx?$/] }),
    ],
  });

  return [bundle, stories];
};
