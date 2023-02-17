import * as fs from 'fs';
import * as path from 'path';

import { defineConfig } from 'cypress';
import * as jju from 'jju';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

/**
 * use this as base webpack config if you need to customize devServer webpack configuration
 */
export const baseWebpackConfig: Configuration = {
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

const cypressWebpackConfig = (): Configuration => {
  // For v9, use tsconfig paths and esbuild-loader
  const tsConfigBasePath = path.resolve(__dirname, '../../../tsconfig.base.json');

  const tsConfigBase = jju.parse(fs.readFileSync(tsConfigBasePath).toString());
  const tsPaths = new TsconfigPathsPlugin({
    configFile: tsConfigBasePath,
  });

  if (baseWebpackConfig.resolve) {
    baseWebpackConfig.resolve.plugins = [tsPaths];
  }
  if (baseWebpackConfig.module) {
    baseWebpackConfig.module.rules?.push({
      test: /\.(ts|tsx)$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: tsConfigBase.compilerOptions.target,
      },
    });
  }

  return baseWebpackConfig;
};

type BaseConfig = Omit<Cypress.ConfigOptions, 'component'> & {
  component: Omit<Cypress.ConfigOptions['component'], 'devServer'> & {
    devServer: {
      bundler: 'webpack';
      framework: 'react';
      webpackConfig: Configuration;
    };
  };
};

export const baseConfig = defineConfig({
  video: false,
  component: {
    specPattern: [path.join(process.cwd(), '**/*.e2e.tsx'), path.join(process.cwd(), '**/*.cy.tsx')],
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
}) as BaseConfig;
