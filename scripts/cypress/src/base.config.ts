import * as path from 'path';

import { defineConfig } from 'cypress';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
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
  if (baseWebpackConfig.module) {
    baseWebpackConfig.module.rules?.push({
      test: /\.(ts|tsx)$/,
      loader: 'esbuild-loader',
      options: {
        tsconfig: './tsconfig.cy.json',
      },
    });
  }

  // TODO: remove this once esbuild-loader properly handles module loading https://github.com/privatenumber/esbuild-loader/issues/343#issuecomment-1845836603
  baseWebpackConfig.ignoreWarnings = [
    ...(baseWebpackConfig.ignoreWarnings ?? []),
    {
      module: /[esbuild-loader]/,
      message:
        /The specified tsconfig at\s+"[/a-z0-9-/.\s]+"\s+was applied to the file\s+"[/a-z0-9-.\s]+"\s+but does not match its "include" patterns/i,
    },
  ];

  baseWebpackConfig.resolve ??= {};
  baseWebpackConfig.resolve.plugins ??= [];
  baseWebpackConfig.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../../../tsconfig.base.json'),
    }),
  );

  return baseWebpackConfig;
};

interface BaseConfig extends Cypress.ConfigOptions {
  component: Cypress.Config['component'] & {
    devServer: {
      bundler: 'webpack';
      framework: 'react';
      webpackConfig: Configuration;
    };
  };
}

const projectRoot = process.cwd();
/**
 * Programmatically create relative support support path, because Cypress bug
 * @see https://github.com/cypress-io/cypress/issues/31819
 *
 * This is a workaround for the issue where Cypress does not resolve the paths correctly, as it
 * internally prepend the __dirname, making them invalid
 *
 */
const sharedConfigSupportRootDir = path.join(__dirname, './support');
const projectSupportDir = path.relative(projectRoot, sharedConfigSupportRootDir);

export const baseConfig = defineConfig({
  video: false,
  component: {
    specPattern: [path.join(projectRoot, '**/*.e2e.tsx'), path.join(projectRoot, '**/*.cy.tsx')],
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: cypressWebpackConfig(),
    },

    supportFile: path.join(projectSupportDir, './component.js'),
    indexHtmlFile: path.join(projectSupportDir, './component-index.html'),
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
