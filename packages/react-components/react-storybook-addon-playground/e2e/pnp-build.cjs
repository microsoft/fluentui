// @ts-check
'use strict';

const path = require('node:path');
const webpack = require('webpack');
/** @type {{ webpackFinal: (config: import('webpack').Configuration, options: object) => import('webpack').Configuration }} */
const { webpackFinal } = require('../lib-commonjs/webpack');

async function main() {
  const root = process.argv[2];
  if (!root) {
    throw new Error('A temporary PnP workspace is required.');
  }
  const compiler = webpack(
    webpackFinal(
      {
        mode: 'development',
        devtool: false,
        context: root,
        entry: './setup.mjs',
        output: { path: path.join(root, 'out'), filename: '[name].js' },
        externals: Object.fromEntries(
          ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'].map(name => [name, `commonjs ${name}`]),
        ),
      },
      {
        modules: ['pnp-ui'],
        typings: ['pnp-types'],
        setup: path.join(root, 'setup.mjs'),
        configDir: path.join(root, '.storybook'),
        configType: 'DEVELOPMENT',
      },
    ),
  );
  try {
    /** @type {import('webpack').Stats} */
    const stats = await new Promise((resolve, reject) => {
      compiler.run((error, result) => (error || !result ? reject(error) : resolve(result)));
    });
    if (stats.hasErrors()) {
      throw new Error(stats.toString('errors-only'));
    }
    const pnp = require(path.join(root, '.pnp.cjs'));
    process.stdout.write(
      JSON.stringify({
        pnpVersion: process.versions.pnp,
        sharedLocation: pnp.resolveToUnqualified('pnp-shared', path.join(root, 'packages/ui/lib/index.js')),
        inlineStylesLoaded: Boolean(require.cache[require.resolve('../lib-commonjs/inlineStyles')]),
        warnings: stats.compilation.warnings.map(warning => warning.message),
      }),
    );
  } finally {
    await new Promise((resolve, reject) => {
      compiler.close(error => (error ? reject(error) : resolve()));
    });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
