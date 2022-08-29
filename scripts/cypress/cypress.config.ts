import { defineConfig } from 'cypress';
import type { Configuration } from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as jju from 'jju';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

// use via CJS syntax which implies `any` because , as cypress doesn't properly resolves `esModuleInterop` setting
const applyV8WebpackConfig: (config: Configuration) => Configuration = require('../storybook/webpack.config');

const isLocalRun = !process.env.DEPLOYURL;

const cypressWebpackConfig = (): Configuration => {
  const webpackConfig: Configuration = {
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    mode: 'development',
    devtool: 'eval',
    output: {
      publicPath: '/',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [],
    },
  };

  const isV8 = path.basename(process.cwd()) === 'react-examples';

  if (isV8) {
    // For v8, reuse the storybook webpack config helper to add required options for building v8,
    // including the `resolve.alias` config that's currently REQUIRED to make tests re-run when a
    // component file in @fluentui/react is modified while running in open mode.
    // (This is different than the v9 config because v8 doesn't use tsconfig paths, so the only way
    // it can respond to file edits is by using `resolve.alias`, which doesn't work with esbuild.)
    return applyV8WebpackConfig(webpackConfig);
  }

  // For v9, use tsconfig paths and esbuild-loader
  const tsConfigBasePath = path.resolve(__dirname, '../../tsconfig.base.json');
  /** @type {import("../../../tools/types").TsConfig} */
  const tsConfigBase = jju.parse(fs.readFileSync(tsConfigBasePath).toString());
  const tsPaths = new TsconfigPathsPlugin({
    configFile: tsConfigBasePath,
  });

  if (webpackConfig.resolve) {
    webpackConfig.resolve.plugins = [tsPaths];
  }
  if (webpackConfig.module) {
    webpackConfig.module.rules?.push({
      test: /\.(ts|tsx)$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: tsConfigBase.compilerOptions.target,
      },
    });
  }

  return webpackConfig;
};

export default defineConfig({
  video: false,
  component: {
    specPattern: path.join(process.cwd(), '**/*.e2e.tsx'),
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: cypressWebpackConfig(),
    },
    supportFile: path.join(__dirname, './support/component.js'),
    indexHtmlFile: path.join(__dirname, './support/component-index.html'),
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // Screenshots go under <pkg>/cypress/screenshots and can be useful to look at after failures in
  // local headless runs (especially if the failure is specific to headless runs)
  // screenshotOnRunFailure: isLocalRun && argv.mode === 'run',
  fixturesFolder: path.join(__dirname, './fixtures'),
});
