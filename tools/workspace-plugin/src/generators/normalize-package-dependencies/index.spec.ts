import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  addProjectConfiguration,
  writeJson,
  getProjects,
  readJson,
  joinPathFragments,
  ProjectGraph,
  readProjectConfiguration,
  updateJson,
} from '@nx/devkit';
import chalk from 'chalk';

import generator from './index';
import { PackageJson } from '../../types';
import { disableChalk } from '../../utils-testing';

const graphMock: ProjectGraph = {
  dependencies: {},
  nodes: {},
  externalNodes: {},
};

jest.mock('@nx/devkit', () => {
  async function createProjectGraphAsyncMock(): Promise<ProjectGraph> {
    return graphMock;
  }

  return {
    ...jest.requireActual('@nx/devkit'),
    createProjectGraphAsync: createProjectGraphAsyncMock,
  };
});

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
      projectVersion: '1.0.0',
      deps: { dev: { '@proj/build-tool': '^1.0.0' }, prod: { react: '17.x.x' }, peer: {} },
      tags: ['platform:any'],
    });
    tree = createProject(tree, {
      projectName: 'react-two',
      projectVersion: '1.0.0',
      deps: { dev: { '@proj/build-tool': '^1.0.0' }, prod: { react: '17.x.x', '@proj/react-one': '^1.0.0' }, peer: {} },
      tags: ['platform:any', 'scope:two'],
    });
    tree = createProject(tree, {
      projectName: 'react-three',
      projectVersion: '0.1.0',
      deps: {
        dev: {},
        prod: {
          react: '17.x.x',
          '@proj/react-two': '^1.0.0',
          '@proj/react-four': '1.0.0-beta.17',
          '@proj/react-five': '9.0.0-alpha.17',
        },
        peer: {},
      },
      tags: ['platform:any', 'scope:two'],
    });
    tree = createProject(tree, {
      projectName: 'react-four',
      projectVersion: '1.0.0-beta.17',
      deps: { dev: {}, prod: { react: '17.x.x' }, peer: {} },
      tags: ['platform:any', 'scope:two'],
    });
    tree = createProject(tree, {
      projectName: 'react-five',
      projectVersion: '9.0.0-alpha.17',
      deps: { dev: {}, prod: { react: '17.x.x' }, peer: {} },
      tags: ['platform:any', 'scope:two'],
    });
    tree = createProject(tree, {
      projectName: 'web-component-one',
      projectVersion: '3.0.0-beta.17',
      deps: { dev: {}, prod: { 'lit-element': '3.x.x' }, peer: {} },
      tags: ['platform:web', 'scope:web-components'],
    });
    tree = createProject(tree, {
      projectName: 'build-tool',
      projectVersion: '0.0.1',
      deps: { dev: {}, prod: { nx: '16.x.x' }, peer: {} },
      tags: ['platform:node', 'scope:tools'],
    });
    tree = createProject(tree, {
      projectName: 'react-app',
      projectType: 'application',
      projectVersion: '0.0.1',
      deps: {
        dev: { '@proj/build-tool': '^1.0.0' },
        prod: {
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
          '@proj/react-two': '^1.0.0',
          '@proj/react-four': '1.0.0-beta.17',
          '@proj/react-five': '9.0.0-alpha.17',
          '@proj/web-component-one': '3.0.0-beta.17',
        },
        peer: {},
      },
      tags: ['platform:web', 'scope:two', 'type:app'],
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
        expect(reactOne.devDependencies).toEqual({
          '@proj/build-tool': '^1.0.0',
        });

        expect(reactTwo.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
        });
        expect(reactTwo.devDependencies).toEqual({
          '@proj/build-tool': '^1.0.0',
        });

        expect(reactApp.dependencies).toEqual({
          react: '17.x.x',
          '@proj/react-one': '^1.0.0',
          '@proj/react-two': '^1.0.0',
          '@proj/react-four': '1.0.0-beta.17',
          '@proj/react-five': '9.0.0-alpha.17',
          '@proj/web-component-one': '3.0.0-beta.17',
        });
        expect(reactApp.devDependencies).toEqual({
          '@proj/build-tool': '^1.0.0',
        });
        expect(reactApp.devDependencies).toEqual({
          '@proj/build-tool': '^1.0.0',
        });
      }
    });

    it(`should fail if there are any violations`, async () => {
      await expect(generator(tree, { verify: true })).rejects.toThrowErrorMatchingInlineSnapshot(
        `"package dependency violations found"`,
      );

      expect(logLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "@proj/react-one has following dependency version issues:",
          "  - @proj/build-tool@^1.0.0",
          "",
          "@proj/react-two has following dependency version issues:",
          "  - @proj/build-tool@^1.0.0",
          "",
          "@proj/react-app has following dependency version issues:",
          "  - @proj/build-tool@^1.0.0",
          "  - @proj/react-one@^1.0.0",
          "  - @proj/react-two@^1.0.0",
          "  - @proj/react-four@1.0.0-beta.17",
          "  - @proj/react-five@9.0.0-alpha.17",
          "  - @proj/web-component-one@3.0.0-beta.17",
          "",
        ]
      `);
      expect(infoLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "All these dependencies version should be specified as '*' or '>={MAJOR}.0.0-alpha' (NOTE: 'MAJOR' equals to specified package major version)",
          "🛠️ FIX: run 'nx g @fluentui/workspace-plugin:normalize-package-dependencies'",
        ]
      `);
    });

    it(`should report if prerelease package range changed to normal release version`, async () => {
      // normalize versions
      await generator(tree, {});

      // change version of pre-release package to zero based major standard release
      updateProject(tree, { projectName: 'react-four', version: '0.1.0' });

      await expect(generator(tree, { verify: true })).rejects.toThrowErrorMatchingInlineSnapshot(
        `"package dependency violations found"`,
      );

      expect(logLogSpy.mock.calls.flat()).toMatchInlineSnapshot(`
        Array [
          "@proj/react-app has following dependency version issues:",
          "  - @proj/react-four@>=1.0.0-alpha",
          "",
        ]
      `);
    });
  });

  describe(`application`, () => {
    it(`should update workspace devDependencies,dependencies,peerDependencies versions to "*"`, async () => {
      // this tests that dependency which has different major version (thus is installed from npm) will not be updated to '*'
      addNonWorkspaceDependency(tree, '@proj/react-app', 'prod', {
        pkgName: '@proj/react-three',
        pkgVersion: '^0.1.0',
      });

      await generator(tree, {});

      const { reactApp } = getPackageJsonForAllProjects(tree);

      expect(reactApp.dependencies).toEqual({
        react: '17.x.x',
        // workspace dependencies
        '@proj/react-one': '*',
        '@proj/react-two': '*',
        // non workspace dependency - different version of original workspace installed from npm
        '@proj/react-three': '^0.1.0',
        // workspace dependencies pre-releases
        '@proj/react-five': '>=9.0.0-alpha',
        '@proj/react-four': '>=1.0.0-alpha',
        '@proj/web-component-one': '>=3.0.0-alpha',
      });
      expect(reactApp.devDependencies).toEqual({
        '@proj/build-tool': '*',
      });
    });

    it(`should check and update dependencies that already use pre-release range but might changed to versioning policy`, async () => {
      await generator(tree, {});

      let { reactApp } = getPackageJsonForAllProjects(tree);

      expect(reactApp.dependencies).toEqual(
        expect.objectContaining({
          '@proj/react-four': '>=1.0.0-alpha',
          '@proj/react-five': '>=9.0.0-alpha',
          '@proj/web-component-one': '>=3.0.0-alpha',
        }),
      );

      // change version of pre-release package to zero based major standard release
      updateProject(tree, { projectName: 'react-four', version: '0.1.0' });

      await generator(tree, {});

      reactApp = getPackageJsonForAllProjects(tree).reactApp;

      expect(reactApp.dependencies).toEqual(
        expect.objectContaining({
          '@proj/react-four': '*',
        }),
      );
    });

    it(`should revert incorrect beachball bump change version on pre-release package`, async () => {
      // simulate beachball bumping version of pre-release package to incorrect version
      updateProject(tree, {
        projectName: 'react-app',
        dependencies: {
          '@proj/web-component-one': '3.0.0-beta.18 <3.0.0',
          '@proj/react-five': '9.0.0-alpha.18 <9.0.0',
        },
      });

      await generator(tree, {});

      const reactApp = getPackageJsonForAllProjects(tree).reactApp;

      expect(reactApp.dependencies).toEqual(
        expect.objectContaining({
          '@proj/web-component-one': '>=3.0.0-alpha',
          '@proj/react-five': '>=9.0.0-alpha',
        }),
      );
    });
  });

  describe(`library`, () => {
    it(`should update workspace only devDependencies versions to "*"`, async () => {
      // this tests that dependency which has different major version (thus is installed from npm) will not be updated to '*'
      addNonWorkspaceDependency(tree, '@proj/react-three', 'prod', {
        pkgName: '@proj/react-one',
        pkgVersion: '^0.1.0',
      });
      addNonWorkspaceDependency(tree, '@proj/react-three', 'dev', {
        pkgName: '@proj/build-tool',
        pkgVersion: '^0.1.0',
      });

      await generator(tree, {});

      const { reactOne, reactTwo, reactThree } = getPackageJsonForAllProjects(tree);

      expect(reactOne.dependencies).toEqual({ react: '17.x.x' });
      expect(reactOne.devDependencies).toEqual({ '@proj/build-tool': '*' });

      expect(reactTwo.dependencies).toEqual({
        react: '17.x.x',
        '@proj/react-one': '^1.0.0',
      });
      expect(reactTwo.devDependencies).toEqual({ '@proj/build-tool': '*' });

      expect(reactThree.dependencies).toEqual({
        react: '17.x.x',
        '@proj/react-one': '^0.1.0',
        '@proj/react-two': '^1.0.0',
        '@proj/react-four': '1.0.0-beta.17',
        '@proj/react-five': '9.0.0-alpha.17',
      });
      expect(reactThree.devDependencies).toEqual({ '@proj/build-tool': '^0.1.0' });
    });
  });
});

function getPackageJsonForAllProjects(tree: Tree) {
  const projects = getProjects(tree);

  const reactOne = projects.get('@proj/react-one');
  const reactTwo = projects.get('@proj/react-two');
  const reactThree = projects.get('@proj/react-three');
  const reactApp = projects.get('@proj/react-app');

  return {
    reactOne: readJson<PackageJson>(tree, joinPathFragments(reactOne!.root, 'package.json')),
    reactTwo: readJson<PackageJson>(tree, joinPathFragments(reactTwo!.root, 'package.json')),
    reactThree: readJson<PackageJson>(tree, joinPathFragments(reactThree!.root, 'package.json')),
    reactApp: readJson<PackageJson>(tree, joinPathFragments(reactApp!.root, 'package.json')),
  };
}

function updateProject(
  tree: Tree,
  options: {
    projectName: string;
    version?: string;
    dependencies?: Record<string, string>;
  },
) {
  const { projectName, version, dependencies } = options;
  const packageName = `@proj/${projectName}`;
  const project = readProjectConfiguration(tree, packageName);
  updateJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'), json => {
    if (version) {
      json.version = version;
    }

    if (dependencies) {
      json.dependencies = json.dependencies ?? {};
      Object.assign(json.dependencies, dependencies);
    }

    return json;
  });

  return tree;
}

function createProject(
  tree: Tree,
  options: {
    projectName: string;
    projectType?: 'application' | 'library';
    projectVersion: string;
    tags?: string[];
    deps: { prod: Record<string, string>; dev: Record<string, string>; peer: Record<string, string> };
  },
) {
  const { projectName, projectVersion, deps, tags, projectType = 'library' } = options;
  const packageName = `@proj/${projectName}`;

  const rootPath = `packages/${projectName}`;

  writeJson(tree, `packages/${projectName}/package.json`, {
    name: packageName,
    version: projectVersion,
    dependencies: { ...deps.prod },
    devDependencies: { ...deps.dev },
    peerDependencies: { ...deps.peer },
  });

  addProjectConfiguration(tree, packageName, {
    root: rootPath,
    projectType,
    ...(tags ? { tags } : null),
  });

  const depKeys = [...Object.keys(deps.prod), ...Object.keys(deps.dev), ...Object.keys(deps.peer)];

  graphMock.dependencies[packageName] = depKeys.map(value => {
    return { source: packageName, target: value, type: 'static' };
  });
  graphMock.nodes[packageName] = {
    name: packageName,
    type: projectType === 'library' ? 'lib' : 'app',
    data: { name: packageName, root: rootPath },
  };

  return tree;
}

function addNonWorkspaceDependency(
  tree: Tree,
  projectName: string,
  dependencyType: 'dev' | 'prod',
  dependency: { pkgName: string; pkgVersion: string },
) {
  const depMap = {
    dev: 'devDependencies',
    prod: 'dependencies',
  } as const;
  const depType = depMap[dependencyType];

  const project = readProjectConfiguration(tree, projectName);
  updateJson(tree, joinPathFragments(project.root, 'package.json'), json => {
    json[depType] = json[depType] ?? {};
    json[depType][dependency.pkgName] = dependency.pkgVersion;

    return json;
  });

  graphMock.dependencies[projectName].push({
    source: projectName,
    target: `npm:${dependency.pkgName}`,
    type: 'static',
  });

  return tree;
}
