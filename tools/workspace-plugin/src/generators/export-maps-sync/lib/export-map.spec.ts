import { type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import type { PackageJson } from '../../../types';
import { buildEntryPointFields, buildExportMap, readExportMapConfig, resolveEntryPoints } from './export-map';

describe('readExportMapConfig', () => {
  it('defaults to a single root entry point', () => {
    expect(readExportMapConfig({ root: 'packages/react-button' })).toEqual({
      root: true,
      subpathEntryPoints: [],
    });
  });

  it('reads the declaration from project metadata', () => {
    const config = readExportMapConfig({
      root: 'packages/react-headless',
      metadata: { exportMap: { root: false, subpathEntryPoints: ['src/*.ts'] } },
    });

    expect(config).toEqual({ root: false, subpathEntryPoints: ['src/*.ts'] });
  });

  it('fills in defaults for a partial declaration', () => {
    const config = readExportMapConfig({
      root: 'packages/react-headless',
      metadata: { exportMap: { subpathEntryPoints: ['src/*.ts'] } },
    });

    expect(config).toEqual({ root: true, subpathEntryPoints: ['src/*.ts'] });
  });
});

describe('resolveEntryPoints', () => {
  const projectRoot = 'packages/react-headless';
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  function writeSourceFiles(...files: string[]) {
    for (const file of files) {
      tree.write(`${projectRoot}/${file}`, 'export {};');
    }
  }

  it('resolves only the root entry when no subpaths are declared', async () => {
    writeSourceFiles('src/index.ts', 'src/CompoundButton.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, { root: true, subpathEntryPoints: [] });

    expect(entryPoints).toEqual([{ key: '.', name: 'index', outputPath: 'index' }]);
  });

  it('resolves nothing when the package has neither a root nor declared subpaths', async () => {
    writeSourceFiles('src/index.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, { root: false, subpathEntryPoints: [] });

    expect(entryPoints).toEqual([]);
  });

  it('sorts subpaths alphabetically and keeps the root first', async () => {
    writeSourceFiles('src/index.ts', 'src/tooltip.ts', 'src/badge.ts', 'src/color-picker.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, { root: true, subpathEntryPoints: ['src/*.ts'] });

    expect(entryPoints.map(entry => entry.key)).toEqual(['.', './badge', './color-picker', './tooltip']);
  });

  it('never emits the src root index as a subpath', async () => {
    writeSourceFiles('src/index.ts', 'src/badge.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, { root: false, subpathEntryPoints: ['src/*.ts'] });

    expect(entryPoints.map(entry => entry.key)).toEqual(['./badge']);
  });

  it('flattens a directory index into its directory name while keeping the compiled path', async () => {
    writeSourceFiles('src/index.ts', 'src/unstable/index.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, {
      root: false,
      subpathEntryPoints: ['src/unstable/index.ts'],
    });

    expect(entryPoints).toEqual([{ key: './unstable', name: 'unstable', outputPath: 'unstable/index' }]);
  });

  it.each(['src/badge.spec.ts', 'src/badge.test.ts', 'src/badge.stories.tsx', 'src/badge.d.ts'])(
    'excludes %s',
    async file => {
      writeSourceFiles('src/index.ts', file);

      const entryPoints = await resolveEntryPoints(tree, projectRoot, {
        root: false,
        subpathEntryPoints: ['src/*.ts', 'src/*.tsx'],
      });

      expect(entryPoints).toEqual([]);
    },
  );

  it('supports tsx entry points', async () => {
    writeSourceFiles('src/badge.tsx');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, { root: false, subpathEntryPoints: ['src/*.tsx'] });

    expect(entryPoints).toEqual([{ key: './badge', name: 'badge', outputPath: 'badge' }]);
  });

  it('deduplicates a subpath matched by multiple globs', async () => {
    writeSourceFiles('src/badge.ts');

    const entryPoints = await resolveEntryPoints(tree, projectRoot, {
      root: false,
      subpathEntryPoints: ['src/*.ts', 'src/badge.ts'],
    });

    expect(entryPoints).toEqual([{ key: './badge', name: 'badge', outputPath: 'badge' }]);
  });
});

describe('buildExportMap', () => {
  const esmPackage: PackageJson = {
    name: '@proj/react-button',
    version: '9.0.0',
    type: 'module',
    main: 'lib-commonjs/index.cjs',
    module: 'lib/index.js',
    typings: './dist/index.d.ts',
  };
  const rootEntry = { key: '.', name: 'index', outputPath: 'index' };

  describe('esm first packages', () => {
    it('builds the conditional import/require shape with no node condition', () => {
      expect(buildExportMap(esmPackage, [rootEntry])).toEqual({
        '.': {
          import: { types: './dist/index.d.ts', default: './lib/index.js' },
          require: { types: './dist/index.d.cts', default: './lib-commonjs/index.cjs' },
        },
        './package.json': './package.json',
      });
    });

    it('points require types at a .d.cts so node16 CJS consumers resolve a CommonJS declaration', () => {
      const exports = buildExportMap(esmPackage, [{ key: './badge', name: 'badge', outputPath: 'badge' }]);

      expect(exports!['./badge']).toEqual({
        import: { types: './dist/badge.d.ts', default: './lib/badge.js' },
        require: { types: './dist/badge.d.cts', default: './lib-commonjs/badge.cjs' },
      });
    });

    it('rolls declarations up to a flat dist file while compiled output mirrors the source layout', () => {
      const exports = buildExportMap(esmPackage, [
        { key: './unstable', name: 'unstable', outputPath: 'unstable/index' },
      ]);

      expect(exports!['./unstable']).toEqual({
        import: { types: './dist/unstable.d.ts', default: './lib/unstable/index.js' },
        require: { types: './dist/unstable.d.cts', default: './lib-commonjs/unstable/index.cjs' },
      });
    });

    it('exposes the style condition on the root entry only', () => {
      const exports = buildExportMap({ ...esmPackage, style: 'dist/index.css' }, [
        rootEntry,
        { key: './badge', name: 'badge', outputPath: 'badge' },
      ]);

      expect(exports!['.']).toHaveProperty('style', './dist/index.css');
      expect(exports!['./badge']).not.toHaveProperty('style');
    });
  });

  describe('commonjs first packages', () => {
    const cjsPackage: PackageJson = {
      name: '@proj/react-storybook-addon',
      version: '9.0.0',
      main: 'lib-commonjs/index.js',
      module: 'lib/index.js',
      typings: './dist/index.d.ts',
    };

    it('keeps the node/module condition shape', () => {
      expect(buildExportMap(cjsPackage, [rootEntry])).toEqual({
        '.': {
          types: './dist/index.d.ts',
          node: { module: './lib/index.js', default: './lib-commonjs/index.js' },
          import: './lib/index.js',
          require: './lib-commonjs/index.js',
        },
        './package.json': './package.json',
      });
    });

    it('collapses the node condition when the package ships no esm output', () => {
      expect(buildExportMap({ ...cjsPackage, module: undefined }, [rootEntry])).toEqual({
        '.': {
          types: './dist/index.d.ts',
          node: './lib-commonjs/index.js',
          require: './lib-commonjs/index.js',
        },
        './package.json': './package.json',
      });
    });
  });

  it('always exposes the package.json subpath last', () => {
    const exports = buildExportMap(esmPackage, [rootEntry, { key: './badge', name: 'badge', outputPath: 'badge' }]);

    expect(Object.keys(exports!).at(-1)).toBe('./package.json');
  });

  it('exposes only the package.json subpath when there are no entry points', () => {
    expect(buildExportMap(esmPackage, [])).toEqual({ './package.json': './package.json' });
  });
});

describe('buildEntryPointFields', () => {
  it('points main at the .cjs output for esm first packages', () => {
    expect(buildEntryPointFields({ type: 'module' } as PackageJson)).toEqual({
      main: 'lib-commonjs/index.cjs',
      module: 'lib/index.js',
      typings: './dist/index.d.ts',
    });
  });

  it('points main at the .js output for commonjs first packages', () => {
    expect(buildEntryPointFields({ module: 'lib/index.js' } as PackageJson)).toEqual({
      main: 'lib-commonjs/index.js',
      module: 'lib/index.js',
      typings: './dist/index.d.ts',
    });
  });

  it('omits module for commonjs first packages that ship no esm output', () => {
    expect(buildEntryPointFields({} as PackageJson)).toEqual({
      main: 'lib-commonjs/index.js',
      typings: './dist/index.d.ts',
    });
  });
});
