import { type ProjectConfiguration, type Tree, readJson, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import type { PackageJson } from '../../types';
import generator from './index';

/**
 * Export map shape and entry point resolution are covered by `lib/export-map.spec.ts`.
 * These specs cover only what the generator itself owns: project scoping, writes and reporting.
 */
describe('export-maps-sync generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  function setupProject(options: {
    name: string;
    projectConfig?: Partial<ProjectConfiguration>;
    packageJson?: Partial<PackageJson>;
    sourceFiles?: string[];
  }) {
    const root = `packages/${options.name}`;

    writeJson(tree, `${root}/project.json`, {
      name: options.name,
      projectType: 'library',
      sourceRoot: `${root}/src`,
      tags: ['vNext', 'platform:web'],
      ...options.projectConfig,
    });

    writeJson(tree, `${root}/package.json`, {
      name: `@proj/${options.name}`,
      version: '9.0.0',
      type: 'module',
      main: 'lib-commonjs/index.cjs',
      module: 'lib/index.js',
      typings: './dist/index.d.ts',
      ...options.packageJson,
    });

    tree.write(`${root}/src/index.ts`, 'export {};');
    for (const file of options.sourceFiles ?? []) {
      tree.write(`${root}/${file}`, 'export {};');
    }

    return { root, readPackageJson: () => readJson<PackageJson>(tree, `${root}/package.json`) };
  }

  it('writes the export map for an out of sync project', async () => {
    const project = setupProject({ name: 'react-button', packageJson: { exports: undefined } });

    await generator(tree);

    expect(project.readPackageJson().exports).toBeDefined();
  });

  it('restores entry point fields that drifted from the export map', async () => {
    const project = setupProject({
      name: 'react-button',
      packageJson: { main: 'lib-commonjs/index.js', typings: './lib/index.d.ts' },
    });

    await generator(tree);

    expect(project.readPackageJson()).toMatchObject({
      main: 'lib-commonjs/index.cjs',
      module: 'lib/index.js',
      typings: './dist/index.d.ts',
    });
  });

  it('preserves unrelated package.json fields', async () => {
    const project = setupProject({
      name: 'react-button',
      packageJson: { exports: undefined, dependencies: { '@proj/react-utilities': '^9.0.0' }, sideEffects: false },
    });

    await generator(tree);

    expect(project.readPackageJson()).toMatchObject({
      dependencies: { '@proj/react-utilities': '^9.0.0' },
      sideEffects: false,
    });
  });

  it('reports every out of sync project', async () => {
    setupProject({ name: 'react-button', packageJson: { exports: undefined } });
    setupProject({ name: 'react-tooltip', packageJson: { exports: undefined } });

    const result = await generator(tree);

    expect(result.outOfSyncMessage).toContain('react-button');
    expect(result.outOfSyncMessage).toContain('react-tooltip');
  });

  it('is a no-op on the second run', async () => {
    const project = setupProject({
      name: 'react-headless',
      projectConfig: { metadata: { exportMap: { root: true, subpathEntryPoints: ['src/*.ts'] } } },
      sourceFiles: ['src/badge.ts'],
    });

    await generator(tree);
    const afterFirstRun = project.readPackageJson();

    const result = await generator(tree);

    expect(result.outOfSyncMessage).toBeUndefined();
    expect(project.readPackageJson()).toEqual(afterFirstRun);
  });

  describe('key ordering', () => {
    it('repairs a condition ordered so that default shadows types', async () => {
      const project = setupProject({
        name: 'react-button',
        packageJson: {
          exports: {
            '.': {
              // node resolves the first matching condition, so this silently degrades type resolution
              import: { default: './lib/index.js', types: './dist/index.d.ts' },
              require: { types: './dist/index.d.cts', default: './lib-commonjs/index.cjs' },
            },
            './package.json': './package.json',
          },
        },
      });

      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('react-button');
      expect(Object.keys(project.readPackageJson().exports!['.'] as object)).toEqual(['import', 'require']);
      expect(Object.keys((project.readPackageJson().exports!['.'] as Record<string, object>).import)).toEqual([
        'types',
        'default',
      ]);
    });

    it('repairs subpath keys that are not in canonical order', async () => {
      const project = setupProject({
        name: 'react-headless',
        projectConfig: { metadata: { exportMap: { root: true, subpathEntryPoints: ['src/*.ts'] } } },
        sourceFiles: ['src/badge.ts', 'src/tooltip.ts'],
        packageJson: {
          exports: {
            '.': {
              import: { types: './dist/index.d.ts', default: './lib/index.js' },
              require: { types: './dist/index.d.cts', default: './lib-commonjs/index.cjs' },
            },
            './package.json': './package.json',
            './tooltip': {
              import: { types: './dist/tooltip.d.ts', default: './lib/tooltip.js' },
              require: { types: './dist/tooltip.d.cts', default: './lib-commonjs/tooltip.cjs' },
            },
            './badge': {
              import: { types: './dist/badge.d.ts', default: './lib/badge.js' },
              require: { types: './dist/badge.d.cts', default: './lib-commonjs/badge.cjs' },
            },
          },
        },
      });

      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('react-headless');
      expect(Object.keys(project.readPackageJson().exports!)).toEqual(['.', './badge', './tooltip', './package.json']);
    });
  });

  describe('undeclarable entries', () => {
    it('fails rather than silently dropping an entry the declaration cannot produce', async () => {
      setupProject({
        name: 'react-headless',
        packageJson: {
          exports: {
            '.': {
              import: { types: './dist/index.d.ts', default: './lib/index.js' },
              require: { types: './dist/index.d.cts', default: './lib-commonjs/index.cjs' },
            },
            './items/*': {
              import: { types: './dist/items/*/index.d.ts', default: './lib/items/*/index.js' },
            },
            './package.json': './package.json',
          },
        },
      });

      await expect(generator(tree)).rejects.toThrow('./items/*');
    });

    it('accepts the entry once it is declared as a pattern', async () => {
      const project = setupProject({
        name: 'react-headless',
        projectConfig: {
          metadata: { exportMap: { root: true, subpathEntryPoints: [], subpathPatterns: ['src/items/*/index.ts'] } },
        },
        sourceFiles: ['src/items/one/index.ts'],
        packageJson: { exports: undefined },
      });

      await generator(tree);

      expect(project.readPackageJson().exports!['./items/*']).toEqual({
        import: { types: './dist/items/*/index.d.ts', default: './lib/items/*/index.js' },
        require: { types: './dist/items/*/index.d.cts', default: './lib-commonjs/items/*/index.cjs' },
      });
    });
  });

  describe('scope', () => {
    it.each([
      ['a non web platform project', { tags: ['vNext', 'platform:node'] }],
      ['a v8 project', { tags: ['v8', 'platform:web'] }],
      ['an untagged project', { tags: [] }],
      ['an application', { projectType: 'application' as const }],
    ])('leaves %s untouched', async (_name, projectConfig) => {
      const project = setupProject({ name: 'some-lib', projectConfig, packageJson: { exports: undefined } });

      await generator(tree);

      expect(project.readPackageJson().exports).toBeUndefined();
    });

    it('leaves a private project untouched', async () => {
      const project = setupProject({ name: 'some-lib', packageJson: { private: true, exports: undefined } });

      await generator(tree);

      expect(project.readPackageJson().exports).toBeUndefined();
    });

    it('skips a project without a package.json', async () => {
      writeJson(tree, 'packages/some-lib/project.json', {
        name: 'some-lib',
        projectType: 'library',
        tags: ['vNext', 'platform:web'],
      });

      await expect(generator(tree)).resolves.toEqual({ outOfSyncMessage: undefined });
    });

    it('skips a project that declares no entry points at all', async () => {
      const project = setupProject({
        name: 'some-lib',
        projectConfig: { metadata: { exportMap: { root: false, subpathEntryPoints: [] } } },
        packageJson: { exports: undefined },
      });

      await generator(tree);

      expect(project.readPackageJson().exports).toBeUndefined();
    });
  });
});
