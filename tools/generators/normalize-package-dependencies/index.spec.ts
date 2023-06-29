import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, addProjectConfiguration, writeJson, getProjects, readJson, joinPathFragments } from '@nrwl/devkit';
import * as chalk from 'chalk';

import generator from './index';
import { PackageJson } from '../../types';
import { disableChalk } from '../../utils-testing';

describe('normalize-package-dependencies generator', () => {
  let tree: Tree;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  disableChalk(chalk);

  const logLogSpy = jest.spyOn(console, 'log').mockImplementation(noop);
  const infoLogSpy = jest.spyOn(console, 'info').mockImplementation(noop);

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = createProject(tree, {
      projectName: 'react-one',
      deps: { dev: {}, prod: { react: '17.x.x' }, peer: {} },
      tags: ['platform:any'],
    });
    tree = createProject(tree, {
      projectName: 'react-two',
      deps: { dev: {}, prod: { react: '17.x.x', '@proj/react-one': '^1.0.0' }, peer: {} },
      tags: ['platform:any', 'scope:two'],
    });
    tree = createProject(tree, {
      projectName: 'react-app',
      projectType: 'application',
      deps: { dev: {}, prod: { react: '17.x.x', '@proj/react-one': '^1.0.0', '@proj/react-two': '^1.0.0' }, peer: {} },
      tags: ['platform:web', 'scope:two', 'type:app'],
    });
  });

  it(`should update workspace dependencies to "*" for version`, async () => {
    await generator(tree, {});

    const { reactApp, reactOne, reactTwo } = getPackageJsonForAllProjects(tree);

    expect(reactOne.dependencies).toEqual({ react: '17.x.x' });
    expect(reactTwo.dependencies).toEqual({
      react: '17.x.x',
      '@proj/react-one': '*',
    });
    expect(reactApp.dependencies).toEqual({
      react: '17.x.x',
      '@proj/react-one': '*',
      '@proj/react-two': '*',
    });
  });

  describe(`filters`, () => {
    describe(`multiple active`, () => {
      it(`should update workspace dependencies that match provided filter options`, async () => {
        await generator(tree, { projectType: 'library', tag: 'type:app' });

        const { reactApp, reactOne, reactTwo } = getPackageJsonForAllProjects(tree);

        expect(reactOne.dependencies).toEqual({
          react: '17.x.x',
        });
        expect(reactTwo.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
        });
        expect(reactApp.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
          '@proj/react-two': '^1.0.0',
        });
      });
    });

    describe(`--tag`, () => {
      it(`should update workspace dependencies that have specified tag`, async () => {
        await generator(tree, { tag: 'scope:two' });

        const { reactApp, reactOne, reactTwo } = getPackageJsonForAllProjects(tree);

        expect(reactOne.dependencies).toEqual({
          react: '17.x.x',
        });
        expect(reactTwo.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '*',
        });
        expect(reactApp.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '*',
          '@proj/react-two': '*',
        });
      });
    });

    describe(`--projectType`, () => {
      it(`should update workspace dependencies only for application`, async () => {
        await generator(tree, { projectType: 'application' });

        const { reactApp, reactOne, reactTwo } = getPackageJsonForAllProjects(tree);

        expect(reactOne.dependencies).toEqual({
          react: '17.x.x',
        });
        expect(reactTwo.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
        });
        expect(reactApp.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '*',
          '@proj/react-two': '*',
        });
      });
    });
  });

  describe(`--verify`, () => {
    it(`should not update any package.json`, async () => {
      try {
        await generator(tree, { verify: true });
      } catch {
        const { reactApp, reactOne, reactTwo } = getPackageJsonForAllProjects(tree);

        expect(reactOne.dependencies).toEqual({
          react: '17.x.x',
        });
        expect(reactTwo.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
        });
        expect(reactApp.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
          '@proj/react-two': '^1.0.0',
        });
      }
    });

    it(`should fail if there are any violations`, async () => {
      await expect(generator(tree, { verify: true })).rejects.toThrowErrorMatchingInlineSnapshot(
        `"package dependency violations found"`,
      );

      expect(logLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "@proj/react-two has following dependency version issues:",
          "  - @proj/react-one",
          "@proj/react-app has following dependency version issues:",
          "  - @proj/react-one",
          "  - @proj/react-two",
        ]
      `);
      expect(infoLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "All these dependencies version should be specified as '*'",
          "Fix this by running 'nx workspace-generator normalize-package-dependencies'",
        ]
      `);
    });

    it(`should fail if there are any violations and filters are used`, async () => {
      await expect(
        generator(tree, { verify: true, projectType: 'application' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"package dependency violations found"`);

      expect(logLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "@proj/react-app has following dependency version issues:",
          "  - @proj/react-one",
          "  - @proj/react-two",
        ]
      `);
      expect(infoLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "All these dependencies version should be specified as '*'",
          "Fix this by running 'nx workspace-generator normalize-package-dependencies'",
        ]
      `);

      jest.resetAllMocks();

      await expect(generator(tree, { verify: true, projectType: 'library', tag: 'type:app' })).resolves.toEqual(
        undefined,
      );

      expect(logLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`Array []`);
      expect(infoLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`Array []`);
    });
  });
});

function getPackageJsonForAllProjects(tree: Tree) {
  const projects = getProjects(tree);

  const reactOne = projects.get('@proj/react-one');
  const reactTwo = projects.get('@proj/react-two');
  const reactApp = projects.get('@proj/react-app');

  return {
    reactOne: readJson<PackageJson>(tree, joinPathFragments(reactOne!.root, 'package.json')),
    reactTwo: readJson<PackageJson>(tree, joinPathFragments(reactTwo!.root, 'package.json')),
    reactApp: readJson<PackageJson>(tree, joinPathFragments(reactApp!.root, 'package.json')),
  };
}

function createProject(
  tree: Tree,
  options: {
    projectName: string;
    projectType?: 'application' | 'library';
    tags?: string[];
    deps: { prod: Record<string, string>; dev: Record<string, string>; peer: Record<string, string> };
  },
) {
  const { projectName, deps, tags, projectType = 'library' } = options;
  const packageName = `@proj/${projectName}`;

  const rootPath = `packages/${projectName}`;

  writeJson(tree, `packages/${projectName}/package.json`, {
    name: packageName,
    dependencies: { ...deps.prod },
    devDependencies: { ...deps.dev },
    peerDependencies: { ...deps.peer },
  });

  addProjectConfiguration(tree, packageName, {
    root: rootPath,
    projectType,
    ...(tags ? { tags } : null),
  });
  return tree;
}
