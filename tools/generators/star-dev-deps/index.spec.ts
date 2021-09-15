import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  addProjectConfiguration,
  removeProjectConfiguration,
  serializeJson,
  readWorkspaceConfiguration,
  readJson,
} from '@nrwl/devkit';

import generator from './index';

describe('star-dev-deps generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    setupDummyPackage(tree, {
      packageName: '@proj/eslint-plugin',
      version: '1.0.0',
    });

    tree.write(
      'package.json',
      serializeJson({
        syncpack: {
          versionGroups: [],
        },
      }),
    );
  });

  it('should change internal package devdeps to * version', async () => {
    const devPkgName = '@proj/eslint-plugin';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);
    const pkgJson = readJson(tree, 'packages/react-button/package.json');
    expect(pkgJson.devDependencies[devPkgName]).toBe('*');
  });

  it('should not run for packages not vNext', async () => {
    const devPkgName = '@proj/eslint-plugin';
    const expectedVersion = '1.0.0';

    setupDummyPackage(tree, {
      packageName: '@proj/react',
      version: '1.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    setupDummyPackage(tree, {
      packageName: '@proj/react-charting',
      version: '1.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    setupDummyPackage(tree, {
      packageName: '@proj/react-focus',
      version: '1.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);

    ['react', 'react-charting', 'react-focus'].forEach(name => {
      const path = `packages/${name}/package.json`;
      const pkgJson = readJson(tree, path);
      expect(pkgJson.devDependencies[devPkgName]).toBe(expectedVersion);
    });
  });

  it('should only modify dev dependencies', async () => {
    const devPkgName = '@proj/eslint-plugin';
    const expectedVersion = '1.0.0';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      dependencies: { [devPkgName]: expectedVersion },
    });

    await generator(tree);
    const pkgJson = readJson(tree, 'packages/react-button/package.json');
    expect(pkgJson.dependencies[devPkgName]).toBe(expectedVersion);
  });

  it('should not modify external dev dependencies', async () => {
    const devPkgName = 'jest';
    const expectedVersion = '1.0.0';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      dependencies: { [devPkgName]: expectedVersion },
    });

    await generator(tree);
    const pkgJson = readJson(tree, 'packages/react-button/package.json');
    expect(pkgJson.dependencies[devPkgName]).toBe(expectedVersion);
  });

  it('should create new version group in base package.json', async () => {
    const devPkgName = '@proj/eslint-plugin';
    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);

    const pkgJson = readJson(tree, 'package.json');
    expect(pkgJson.syncpack).toMatchInlineSnapshot(`
      Object {
        "versionGroups": Array [
          Object {
            "dependencies": Array [
              "@proj/eslint-plugin",
            ],
            "packages": Array [
              "@proj/react-button",
              "fluent-ui-vnext",
            ],
          },
        ],
      }
    `);
  });

  it('should update a a new package to the existing version group in base package.json', async () => {
    const devPkgName = '@proj/eslint-plugin';
    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);

    setupDummyPackage(tree, {
      packageName: '@proj/react-menu',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);

    const pkgJson = readJson(tree, 'package.json');
    expect(pkgJson.syncpack).toMatchInlineSnapshot(`
      Object {
        "versionGroups": Array [
          Object {
            "dependencies": Array [
              "@proj/eslint-plugin",
            ],
            "packages": Array [
              "@proj/react-button",
              "@proj/react-menu",
              "fluent-ui-vnext",
            ],
          },
        ],
      }
    `);
  });

  it('should add a new dependency to the version group', async () => {
    const devPkgName = '@proj/eslint-plugin';
    const newDevPkgName = '@proj/react-conformance';
    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);
    removeDummyPackage(tree, '@proj/react-button');
    setupDummyPackage(tree, {
      packageName: newDevPkgName,
      version: '1.0.0',
    });
    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '9.0.0',
      devDependencies: { [devPkgName]: '1.0.0', [newDevPkgName]: '1.0.0' },
    });
    await generator(tree);

    const pkgJson = readJson(tree, 'package.json');
    expect(pkgJson.syncpack).toMatchInlineSnapshot(`
      Object {
        "versionGroups": Array [
          Object {
            "dependencies": Array [
              "@proj/eslint-plugin",
              "@proj/react-conformance",
            ],
            "packages": Array [
              "@proj/react-button",
              "fluent-ui-vnext",
            ],
          },
        ],
      }
    `);
  });
});

function setupDummyPackage(
  tree: Tree,
  options: Partial<{
    packageName: string;
    version: string;
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    projectConfiguration: Partial<ReturnType<typeof readProjectConfiguration>>;
  }>,
) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const defaults = {
    version: '9.0.0-alpha.40',
    dependencies: {
      [`@${workspaceConfig.npmScope}/react-make-styles`]: '^9.0.0-alpha.38',
      [`@${workspaceConfig.npmScope}/react-theme`]: '^9.0.0-alpha.13',
      [`@${workspaceConfig.npmScope}/react-utilities`]: '^9.0.0-alpha.25',
      tslib: '^2.1.0',
      someThirdPartyDep: '^11.1.2',
    },
  };

  const normalizedOptions = { ...defaults, ...options };
  const pkgName = options.packageName || '';
  const normalizedPkgName = pkgName.replace(`@${workspaceConfig.npmScope}/`, '');
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  const templates = {
    packageJson: {
      name: pkgName,
      version: normalizedOptions.version,
      dependencies: normalizedOptions.dependencies,
      devDependencies: normalizedOptions.devDependencies,
    },
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
    tags: ['platform:web'],
    ...options.projectConfiguration,
  });

  return tree;
}

function removeDummyPackage(tree: Tree, packageName: string) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const normalizedPkgName = packageName.replace(`@${workspaceConfig.npmScope}/`, '');
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  tree.delete(paths.root);

  removeProjectConfiguration(tree, packageName);
  return tree;
}
