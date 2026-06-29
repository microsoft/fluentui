/**
 * `@fluentui/scripts-cypress` is consumed **directly from TypeScript source** (`main: src/index.ts`,
 * no build step) and is published as `"type": "module"`.
 *
 * Why `type: module`?
 * Migrated web packages are `type: module`, so their `cypress.config.ts` is loaded by Cypress as ESM
 * (`import { baseConfig } from '@fluentui/scripts-cypress'`). For that named import to resolve, Cypress
 * must parse this barrel as ESM — which only happens when the package is `type: module`. As CommonJS,
 * cjs-module-lexer cannot detect the named exports from `.ts` source and the import fails.
 *
 * Why is `baseConfig` defined inline here instead of in a separate `./base.config` module?
 * This barrel is resolved by three different loaders, each wanting a different relative-import form:
 *   - Cypress ESM loader (type:module configs) + `tsc` type-check  → `.js`/extensionless map to `.ts`
 *   - Node's native `require(esm)` (CommonJS `cypress.config.ts` consumers) → needs a REAL file at the
 *     exact specifier; `./base.config.js` doesn't exist (source is `.ts`) and extensionless is invalid
 *   - explicit `./base.config.ts` resolves at runtime but leaks `allowImportingTsExtensions` (TS5097)
 *     into every consumer's type-check
 * No single specifier satisfies all three, so the config is inlined to remove the relative import
 * entirely. The only remaining cross-file reference (`mount`) is a type-only `import('./browser/index.js')`
 * which is erased and never triggers runtime resolution.
 *
 * Note: `import.meta.dirname` (used below for self-relative support/fixtures/tsconfig paths) requires
 * the `module` to be `esnext`/`nodenext`. CommonJS consumers that *type-check* this file must therefore
 * set their `tsconfig` `module` accordingly (see `apps/rit-tests-*/tsconfig.cy.json`).
 *
 * The cleaner long-term fix is to give this package a real dual ESM/CJS build so `main` points at
 * emitted `.js`/`.cjs` and `base.config` can live in its own file again.
 */
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
    // Allow ESM-style `.js` import specifiers to resolve to their TS source counterparts.
    // Required because `@fluentui/scripts-cypress` is `type: module`, which makes webpack
    // enforce fully-specified imports (e.g. `./mount.js`) when bundling its support/browser files.
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.jsx': ['.tsx', '.jsx'],
    },
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
      configFile: path.resolve(import.meta.dirname, '../../../tsconfig.base.json'),
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
const sharedConfigSupportRootDir = path.join(import.meta.dirname, './support');
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
  fixturesFolder: path.join(import.meta.dirname, './fixtures'),
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

// =========== BROWSER APIs ==================

// TODO: Browser related APIs should be exposed via export maps or moved to separate package
// Expose Browser specific API under same barrel
export declare const mount: typeof import('./browser/index.js').mount;
