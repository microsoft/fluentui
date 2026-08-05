/*
 * @jest-environment node
 */
// @ts-check
const { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { dirname, join } = require('node:path');

const webpack = require('webpack');

const { BundleIsolationPlugin } = require('./bundle-isolation-plugin');

/** @typedef {import('./bundle-isolation-plugin').BundleIsolationReport} BundleIsolationReport */

jest.setTimeout(60_000);

describe('BundleIsolationPlugin', () => {
  /** @type {string} */
  let root;

  beforeEach(() => {
    // webpack reports resolved real paths, which on macOS differ from the symlinked temp path.
    root = realpathSync(mkdtempSync(join(tmpdir(), 'bundle-isolation-plugin-')));
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  describe('attribution', () => {
    /** @type {BundleIsolationReport} */
    let report;

    beforeEach(async () => {
      writeFiles(root, {
        'package.json': manifest('test-workspace'),

        // Exports are functions because webpack inlines constant exports and drops the module.
        'node_modules/forbidden-pkg/package.json': manifest('forbidden-pkg'),
        'node_modules/forbidden-pkg/index.js': `export const alpha = () => Date.now();\nexport const beta = () => Math.random();\n`,

        'node_modules/@scope/styles/package.json': manifest('@scope/styles'),
        'node_modules/@scope/styles/index.js': `export const style = () => Date.now();\n`,

        // Reached only through the package under test, so it must be reported with a `via` origin.
        'node_modules/dep-pkg/package.json': manifest('dep-pkg'),
        'node_modules/dep-pkg/index.js': `import { alpha } from 'forbidden-pkg';\nexport const fromDep = () => alpha();\n`,

        // Imports the same forbidden package but is eliminated, so it must not be blamed.
        'node_modules/innocent-pkg/package.json': manifest('innocent-pkg'),
        'node_modules/innocent-pkg/index.js': `import { beta } from 'forbidden-pkg';\nexport const fromInnocent = () => beta();\n`,

        'my-pkg/package.json': manifest('my-pkg'),
        'my-pkg/lib/live.js': `import { fromDep } from 'dep-pkg';\nexport const live = () => fromDep();\n`,
        'my-pkg/lib/direct.js': `import { style } from '@scope/styles';\nexport const direct = () => style();\n`,
        'my-pkg/lib/dead.js': `import { fromInnocent } from 'innocent-pkg';\nexport const dead = () => fromInnocent();\n`,
        'my-pkg/lib/index.js': `export * from './live';\nexport * from './direct';\nexport * from './dead';\n`,

        'entry.js': `import { live, direct } from './my-pkg/lib/index.js';\nconsole.log(live(), direct());\n`,
      });

      report = await bundle({
        root,
        packageRoot: join(root, 'my-pkg'),
        forbiddenPackages: ['forbidden-pkg', '@scope/*'],
      });
    });

    it('reports forbidden packages that survived tree shaking', () => {
      expect(Object.keys(report.leaks).sort()).toEqual(['@scope/styles', 'forbidden-pkg']);
    });

    it('does not blame an importer that was eliminated', () => {
      const importers = report.leaks['forbidden-pkg'].exports.flatMap(({ importers: found }) =>
        found.map(importer => importer.module),
      );

      expect(importers).toEqual([join(root, 'node_modules/dep-pkg/index.js')]);
      expect(importers.join()).not.toContain('innocent-pkg');
    });

    it('names only the exports that are actually used', () => {
      expect(report.leaks['forbidden-pkg'].exports.map(({ name }) => name)).toEqual(['alpha']);
    });

    it('traces a leak arriving through a dependency back to the importing module', () => {
      expect(report.leaks['forbidden-pkg'].exports[0].importers[0].via).toBe(join('lib', 'live.js'));
    });

    it('reports no origin when the package under test imports the leak itself', () => {
      expect(report.leaks['@scope/styles'].exports[0].importers[0].via).toBeNull();
    });

    it('matches scoped globs', () => {
      expect(report.leaks['@scope/styles'].modules).toBe(1);
    });
  });

  it('ignores a package that is not forbidden', async () => {
    writeFiles(root, {
      'package.json': manifest('test-workspace'),
      'node_modules/allowed-pkg/package.json': manifest('allowed-pkg'),
      'node_modules/allowed-pkg/index.js': `export const value = () => Date.now();\n`,
      'my-pkg/package.json': manifest('my-pkg'),
      'my-pkg/lib/index.js': `import { value } from 'allowed-pkg';\nexport const use = () => value();\n`,
      'entry.js': `import { use } from './my-pkg/lib/index.js';\nconsole.log(use());\n`,
    });

    const report = await bundle({ root, packageRoot: join(root, 'my-pkg'), forbiddenPackages: ['forbidden-pkg'] });

    expect(report.leaks).toEqual({});
  });

  it('flags a bundle that resolved to package sources, since its verdict would be meaningless', async () => {
    writeFiles(root, {
      'package.json': manifest('test-workspace'),
      'my-pkg/library/src/index.js': `export const fromSource = () => Date.now();\n`,
      'entry.js': `import { fromSource } from './my-pkg/library/src/index.js';\nconsole.log(fromSource());\n`,
    });

    const report = await bundle({ root, packageRoot: join(root, 'my-pkg'), forbiddenPackages: ['forbidden-pkg'] });

    expect(report.sourceResolved).toEqual([join(root, 'my-pkg/library/src/index.js')]);
  });
});

/**
 * @param {{root: string, packageRoot: string, forbiddenPackages: string[]}} options
 * @returns {Promise<BundleIsolationReport>}
 */
function bundle({ root, packageRoot, forbiddenPackages }) {
  /** @type {BundleIsolationReport | undefined} */
  let report;

  const compiler = webpack({
    target: 'web',
    mode: 'production',
    context: root,
    entry: join(root, 'entry.js'),
    output: { path: join(root, 'out'), filename: 'index.js' },
    optimization: { concatenateModules: false, minimize: false },
    plugins: [
      new BundleIsolationPlugin({
        forbiddenPackages,
        workspaceRoot: root,
        packageRoot,
        onReport: value => {
          report = value;
        },
      }),
    ],
  });

  return new Promise((resolvePromise, rejectPromise) => {
    compiler.run((error, stats) => {
      compiler.close(() => {
        if (error || stats?.hasErrors()) {
          rejectPromise(error ?? new Error(stats?.toString({ errors: true })));
          return;
        }
        resolvePromise(/** @type {BundleIsolationReport} */ (report));
      });
    });
  });
}

/**
 * @param {string} root
 * @param {Record<string, string>} files
 */
function writeFiles(root, files) {
  for (const [path, contents] of Object.entries(files)) {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
}

/** @param {string} name */
function manifest(name) {
  return JSON.stringify({ name, version: '1.0.0', sideEffects: false });
}
