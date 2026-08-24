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
