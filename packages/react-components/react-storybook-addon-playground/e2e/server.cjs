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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { resolveRequestPath } = require('./requestPath.cjs');

const packageRoot = path.resolve(__dirname, '..');
const shellDir = path.join(packageRoot, 'dist/playground');
const siteDir = path.join(packageRoot, 'dist/e2e-site');
const privateSiteDir = path.join(packageRoot, 'dist/e2e-private-site');
const PRIVATE_BUILD_ROOT = '/authenticated/nested/storybook/';
// Stands in for Storybook's config dir: the addon scopes its generated runtime entry (in `node_modules/.cache`) by it.
const configDir = path.join(packageRoot, 'dist/e2e-config');

/**
 * Mirrors a consumer's addon options with the default setup (whose default code imports icons).
 * `lz-string` is a small extra module used to exercise lazy module chunks.
 */
const ADDON_OPTIONS = {
  modules: ['@fluentui/react-components', '@fluentui/react-icons', 'lz-string'],
};
const PRIVATE_ADDON_OPTIONS = {
  modules: {
    ...Object.fromEntries(ADDON_OPTIONS.modules.map(name => [name, name])),
    'playground-private-assets': path.join(__dirname, 'private-package/index.js'),
  },
  setup: path.join(__dirname, 'private-setup.js'),
  inlineStyles: true,
};

const CONTENT_TYPES = /** @type {Record<string, string>} */ ({
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
});

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

async function main() {
  const { values } = parseArgs({ options: { port: { type: 'string', default: '4178' } } });

  if (!fs.existsSync(path.join(shellDir, 'playground.html'))) {
    throw new Error(
      `Playground shell not found in "${shellDir}". Run "nx run react-storybook-addon-playground:build".`,
    );
  }

  await buildRuntime(siteDir, ADDON_OPTIONS);
  await buildRuntime(privateSiteDir, PRIVATE_ADDON_OPTIONS);
  const privateManifest = JSON.parse(
    fs.readFileSync(path.join(privateSiteDir, 'playground/runtime/manifest.json'), 'utf8'),
  );
  const privateScripts = new Set(privateManifest.allowedScriptFiles.map(file => `/${file}`));

  http
    .createServer((request, response) => {
      const url = new URL(request.url ?? '/', 'http://localhost');
      const isPrivate = url.pathname.startsWith(PRIVATE_BUILD_ROOT);
      const isStandalone = url.pathname.startsWith('/standalone/');
      const pathname = isPrivate
        ? url.pathname.slice(PRIVATE_BUILD_ROOT.length - 1)
        : isStandalone
        ? `/playground/app/${url.pathname.slice('/standalone/'.length)}`
        : url.pathname;
      const cookies = new Map(
        (request.headers.cookie ?? '').split(';').map(cookie => {
          const [name, ...value] = cookie.trim().split('=');
          return [name, value.join('=')];
        }),
      );
      const authenticatedPage =
        isPrivate && (pathname === '/playground/app/playground.html' || pathname === '/storybook-fixture.html');
      const policyHeaders = {
        ...(isPrivate ? { 'Cross-Origin-Resource-Policy': 'same-origin', 'X-Content-Type-Options': 'nosniff' } : {}),
        ...(url.searchParams.get('coep') === 'require-corp'
          ? {
              'Cross-Origin-Embedder-Policy': 'require-corp',
              'Cross-Origin-Opener-Policy': 'same-origin',
            }
          : {}),
      };
      if (authenticatedPage) {
        // Represents the host's successful authentication of the HTML page, before the addon executes.
        const failure = url.searchParams.get('runtimeFailure');
        response.setHeader('Set-Cookie', [
          `playground-auth=fixture; Path=${PRIVATE_BUILD_ROOT}; HttpOnly; SameSite=Lax`,
          `playground-runtime-failure=${
            failure && ['unauthorized', 'redirect', 'html', 'json', 'plain', 'missing'].includes(failure) ? failure : ''
          }; Path=${PRIVATE_BUILD_ROOT}; HttpOnly; SameSite=Lax`,
        ]);
      } else if (isPrivate && cookies.get('playground-auth') !== 'fixture') {
        response.writeHead(401, { ...policyHeaders, 'Content-Type': 'text/plain' }).end('Authentication required');
        return;
      }
      if (isPrivate && privateScripts.has(pathname)) {
        const failure = cookies.get('playground-runtime-failure');
        if (failure === 'unauthorized') {
          response.writeHead(401, { ...policyHeaders, 'Content-Type': 'text/plain' }).end('Session expired');
          return;
        }
        if (failure === 'redirect') {
          response.writeHead(302, { ...policyHeaders, Location: `${PRIVATE_BUILD_ROOT}login` }).end();
          return;
        }
        if (failure === 'html') {
          response
            .writeHead(200, { ...policyHeaders, 'Content-Type': 'text/html; charset=utf-8' })
            .end('<h1>Sign in</h1>');
          return;
        }
        if (failure === 'json' || failure === 'plain' || failure === 'missing') {
          response
            .writeHead(200, {
              ...policyHeaders,
              ...(failure === 'missing'
                ? {}
                : { 'Content-Type': failure === 'json' ? 'application/json' : 'text/plain' }),
            })
            .end('{"notJavaScript":true}');
          return;
        }
      }
      if (isPrivate && pathname === '/login') {
        response.writeHead(200, { ...policyHeaders, 'Content-Type': 'text/html' }).end('<h1>Sign in</h1>');
        return;
      }
      const filePath = resolveRequestPath(pathname, { shellDir, siteDir: isPrivate ? privateSiteDir : siteDir });

      if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        response.writeHead(404).end();
        return;
      }

      const headers = {
        'Content-Type': CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
        ...(path.extname(filePath) === '.js' ? { 'Cross-Origin-Embedder-Policy': 'require-corp' } : {}),
        ...policyHeaders,
      };
      response.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(response);
    })
    .listen(Number(values.port), () => {
      console.log(`Playground e2e site listening on http://localhost:${values.port}/playground/app/playground.html`);
    });
}

/**
 * @param {string} outputPath
 * @param {{ modules: string[] | Record<string, string>; setup?: string; inlineStyles?: boolean }} addonOptions
 */
async function buildRuntime(outputPath, addonOptions) {
  /** @type {{ webpackFinal: (config: import('webpack').Configuration, options: object) => import('webpack').Configuration }} */
  const { webpackFinal } = require('../lib-commonjs/webpack');

  /** @type {import('webpack').Configuration} */
  const baseConfig = {
    mode: 'production',
    context: packageRoot,
    entry: {
      storybook: addonOptions.inlineStyles
        ? [path.join(__dirname, 'private.css'), path.join(__dirname, 'storybook-entry.js')]
        : path.join(__dirname, 'storybook-entry.js'),
    },
    devtool: false,
    output: {
      path: outputPath,
      publicPath: addonOptions.inlineStyles ? PRIVATE_BUILD_ROOT : 'auto',
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
      clean: true,
    },
    // Only Storybook's production chunking semantics matter here; skipping minification keeps the build fast.
    optimization: {
      minimize: false,
      runtimeChunk: { name: 'runtime~playground-runtime' },
      splitChunks: {
        chunks: 'all',
        cacheGroups: addonOptions.inlineStyles
          ? {
              privateStyles: {
                name: 'private-shared',
                type: 'css/mini-extract',
                test: /[\\/]private\.css$/,
                enforce: true,
              },
            }
          : {},
      },
    },
    module: {
      rules: [
        { test: /\.m?js$/, resolve: { fullySpecified: false } },
        { test: /\.css$/, sideEffects: true, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.ttf$/, type: 'asset/resource' },
      ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash].css' })],
    performance: { hints: false },
  };

  const config = webpackFinal(baseConfig, {
    configDir,
    configType: 'PRODUCTION',
    // Storybook merges the addon's registration options into its preset hook options (and lists the registration).
    ...addonOptions,
    presetsList: [{ name: path.join(packageRoot, 'preset.js'), options: addonOptions }],
  });

  /** @type {import('webpack').Stats} */
  const result = await new Promise((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        reject(error ?? new Error(stats?.toString('errors-only') ?? 'Unknown webpack error'));
        return;
      }
      resolve(stats);
    });
  });

  const storybookFiles = result.compilation.entrypoints.get('storybook')?.getFiles() ?? [];
  const storybookScripts = storybookFiles.filter(file => file.endsWith('.js'));
  if (!storybookScripts?.length) {
    throw new Error('Storybook fixture scripts were not emitted.');
  }
  fs.writeFileSync(
    path.join(outputPath, 'storybook-fixture.html'),
    `<!DOCTYPE html><html><head>${storybookFiles
      .filter(file => file.endsWith('.css'))
      .map(style => `<link rel="stylesheet" href=${JSON.stringify(style)}>`)
      .join('')}</head><body><button id="storybook-load" class="playground-private-eager"></button>${storybookScripts
      .map(script => `<script src=${JSON.stringify(script)}></script>`)
      .join('')}</body></html>`,
  );

  console.log(`Playground e2e runtime built into ${outputPath}`);
}
