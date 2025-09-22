import * as crypto from 'crypto';
import * as path from 'path';

import { defineConfig } from 'cypress';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

const projectRoot = process.cwd();

// Use a high port range unlikely to collide with other services: 20000-29999
const deterministicPort = 20000 + (hashToInt(projectRoot) % 10000);

export const baseWebpackConfig: Configuration = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  mode: 'development',
  devtool: 'eval',
  // Ensure parallel Cypress component runs don't collide on a fixed port (8080 is webpack-dev-server default).
  // Pick a deterministic port per project (can be overridden) since some CI setups ignore 'auto'.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - devServer is provided by webpack-dev-server typings
  devServer: {
    port: process.env.WEBPACK_DEV_SERVER_PORT ? Number(process.env.WEBPACK_DEV_SERVER_PORT) : deterministicPort,
    host: '127.0.0.1',
  },
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
    defaultCommandTimeout: 8000,
  },
  retries: {
    runMode: 4,
    openMode: 0,
  },
  // Screenshots go under <pkg>/cypress/screenshots and can be useful to look at after failures in
  // local headless runs (especially if the failure is specific to headless runs)
  // screenshotOnRunFailure: isLocalRun && argv.mode === 'run',
  fixturesFolder: path.join(__dirname, './fixtures'),
}) as BaseConfig;

/**
 * use this as base webpack config if you need to customize devServer webpack configuration
 *
 * Generate a deterministic, project-scoped port to avoid collisions when multiple Cypress component
 * test servers start in parallel on the same machine/agent. Allows override via WEBPACK_DEV_SERVER_PORT.
 */
function hashToInt(str: string) {
  // Use Node.js crypto module for better hashing
  const hash = crypto.createHash('sha256').update(str).digest('hex');
  // Convert first 8 hex characters to integer
  return parseInt(hash.slice(0, 8), 16);
}
