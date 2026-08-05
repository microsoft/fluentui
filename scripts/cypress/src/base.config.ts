import * as crypto from 'crypto';
import * as path from 'path';

import { defineConfig } from 'cypress';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

/**
 * Shared with the package build (`postcss-modules` `generateScopedName`), with every storybook
 * (`css-loader` `modules.getLocalIdent`) and with jest — one scheme, now four pipelines.
 * Required by relative path for the reasons in that file's header: it must stay free of
 * workspace requires.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const { getLocalIdent } = require('../../css-modules/ident');
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const globalizeGroupMarkers = require('../../css-modules/globalize-group-markers');

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

/**
 * Tailwind-flavoured CSS Modules for converted (Griffel-free) packages.
 *
 * `esbuild-loader` only ever sees `/\.(ts|tsx)$/` here, so CSS is untouched by it and this is an
 * ordinary webpack loader chain — no esbuild plugin is involved or needed. What matters is that
 * it is the SAME chain the storybooks use: identical `getLocalIdent`, identical PostCSS pass.
 * A `.cy.tsx` that mounts a converted component asserts on real class names, and those only
 * agree with `dist/styles.css` and with the jest serializer if all pipelines share the scheme
 * (scripts/css-modules/ident.js).
 *
 * Without this rule there is no css rule at all in the cypress bundle, so any `.cy.tsx` that
 * mounts a component importing a `*.module.css` fails to bundle outright.
 *
 * @see migration/griffel-to-tailwind/reports/specials-triage.md INFRA-2
 */
const cssModulesRule = {
  test: /\.module\.css$/,
  sideEffects: true,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          getLocalIdent,
          namedExport: false,
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          // no postcss.config.* exists in this repo — skip cosmiconfig's upward search
          config: false,
          plugins: [
            // `@tailwindcss/postcss` is a plugin CREATOR: postcss-loader@4's string form would
            // pass it through uninvoked, so it is instantiated here.
            require('@tailwindcss/postcss')(),
            // MUST run after Tailwind and before css-loader's CSS-Modules pass, or named-group
            // markers get hashed and silently match nothing — DECISIONS.md D15.
            globalizeGroupMarkers(),
          ],
        },
      },
    },
  ],
};

/**
 * The shared Tailwind theme entry (scripts/storybook/src/tailwind-theme.css) — the single file
 * that emits `--base-scale`, the token registration and the stroke-width variables. The compiled
 * module utilities reference `var(--spacing, calc(1px * var(--base-scale)))`, so without this
 * emission every numeric utility is invalid at computed-value time and converted components
 * render unstyled in Cypress. The support file (`support/component.js`) imports it once per
 * spec document; this rule routes it through the same Tailwind PostCSS pass the storybooks use
 * (`rules.tailwindThemeRule` in scripts/storybook/src/rules.js — same regexp, same reasons:
 * matched by name because symlinked/real path spellings can disagree).
 */
const TAILWIND_THEME_ENTRY = /[\\/]tailwind-theme\.css$/;

const tailwindThemeRule = {
  test: /\.css$/,
  include: [TAILWIND_THEME_ENTRY],
  sideEffects: true,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          // no postcss.config.* exists in this repo — skip cosmiconfig's upward search
          config: false,
          plugins: [require('@tailwindcss/postcss')()],
        },
      },
    },
  ],
};

/**
 * Plain, non-module CSS still needs to load (unconverted packages, third-party stylesheets).
 * `exclude` keeps it off `*.module.css`, which the rule above owns, and off the theme entry,
 * which `tailwindThemeRule` owns: webpack applies EVERY matching rule, so an unguarded
 * `/\.css$/` here would double-process modules (empty class map) and emit the theme entry's
 * `@import … source(none)` verbatim.
 */
const cssRule = {
  test: /\.css$/,
  exclude: [/\.module\.css$/, TAILWIND_THEME_ENTRY],
  use: ['style-loader', 'css-loader'],
};

const cypressWebpackConfig = (): Configuration => {
  if (baseWebpackConfig.module) {
    baseWebpackConfig.module.rules?.push(
      {
        test: /\.(ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          tsconfig: './tsconfig.cy.json',
        },
      },
      cssModulesRule,
      tailwindThemeRule,
      cssRule,
    );
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
