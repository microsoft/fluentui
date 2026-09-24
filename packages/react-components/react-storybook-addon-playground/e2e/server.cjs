// @ts-check
'use strict';

/**
 * Builds a minimal Storybook-like site for the playground e2e tests and serves it:
 * - `/playground/app/*` is the prebuilt shell (`dist/playground`, same as the preset's `staticDirs`)
 * - everything else is the runtime emitted by the addon's real `webpackFinal` hook (manifest, typings, chunks)
 */

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { parseArgs } = require('node:util');
const webpack = require('webpack');

const packageRoot = path.resolve(__dirname, '..');
const shellDir = path.join(packageRoot, 'dist/playground');
const siteDir = path.join(packageRoot, 'dist/e2e-site');
// Stands in for Storybook's config dir: the addon writes its generated runtime entry to `<configDir>/.cache`.
const configDir = path.join(packageRoot, 'dist/e2e-config');

/**
 * Mirrors a consumer's addon options with the default setup (whose default code imports icons).
 * `lz-string` is a small extra module used to exercise lazy module chunks.
 */
const ADDON_OPTIONS = {
  modules: {
    '@fluentui/react-components': '@fluentui/react-components',
    '@fluentui/react-icons': '@fluentui/react-icons',
    'lz-string': 'lz-string',
  },
};

const CONTENT_TYPES = /** @type {Record<string, string>} */ ({
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
});

main().catch(error => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const { values } = parseArgs({ options: { port: { type: 'string', default: '4178' } } });

  if (!fs.existsSync(path.join(shellDir, 'playground.html'))) {
    throw new Error(
      `Playground shell not found in "${shellDir}". Run "nx run react-storybook-addon-playground:build".`,
    );
  }

  await buildRuntime();

  http
    .createServer((request, response) => {
      const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
      const [root, relative] = pathname.startsWith('/playground/app/')
        ? [shellDir, pathname.slice('/playground/app/'.length)]
        : [siteDir, pathname.slice(1)];
      const filePath = path.join(root, relative);

      if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        response.writeHead(404).end();
        return;
      }

      response.writeHead(200, { 'Content-Type': CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(response);
    })
    .listen(Number(values.port), () => {
      console.log(`Playground e2e site listening on http://localhost:${values.port}/playground/app/playground.html`);
    });
}

async function buildRuntime() {
  /** @type {{ webpackFinal: (config: import('webpack').Configuration, options: object) => import('webpack').Configuration }} */
  const { webpackFinal } = require('../lib-commonjs/webpack');

  /** @type {import('webpack').Configuration} */
  const baseConfig = {
    mode: 'production',
    context: packageRoot,
    entry: {},
    devtool: false,
    output: {
      path: siteDir,
      publicPath: '',
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    // Only Storybook's production chunking semantics matter here; skipping minification keeps the build fast.
    optimization: { minimize: false },
    module: {
      rules: [{ test: /\.m?js$/, resolve: { fullySpecified: false } }],
    },
    performance: { hints: false },
  };

  const config = webpackFinal(baseConfig, {
    configDir,
    configType: 'PRODUCTION',
    // Storybook passes resolved preset registrations; the addon finds its options by preset file path.
    presetsList: [{ name: path.join(packageRoot, 'preset.js'), options: ADDON_OPTIONS }],
  });

  await new Promise((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        reject(error ?? new Error(stats?.toString('errors-only') ?? 'Unknown webpack error'));
        return;
      }
      resolve(undefined);
    });
  });

  console.log(`Playground e2e runtime built into ${siteDir}`);
}
