import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, addProjectConfiguration, serializeJson, readWorkspaceConfiguration, readJson } from '@nrwl/devkit';

import generator from './index';
import { PackageJson } from '../../types';

describe('dependency-mismatch generator', () => {
  let appTree: Tree;
  let workspaceNpmScope: string;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    workspaceNpmScope = readWorkspaceConfiguration(appTree).npmScope as string;
  });

  it('should fix dependency mismatch', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'public-docsite-v9',
      version: '9.0.0',
      dependencies: {
        [`@${workspaceNpmScope}/react-theme`]: '^9.0.0',
      },
      devDependencies: {},
      peerDependencies: {},
    });

    setupDummyPackage(appTree, {
      name: 'react-theme',
      version: '9.0.1',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-theme": "^9.0.1",
      }
    `);
  });

  it('should fix dev dependencies', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'public-docsite-v9',
      version: '9.0.0',
      devDependencies: {
        [`@${workspaceNpmScope}/react-theme`]: '^9.0.0',
      },
      dependencies: {},
      peerDependencies: {},
    });

    setupDummyPackage(appTree, {
      name: 'react-theme',
      version: '9.0.1',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.devDependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-theme": "^9.0.1",
      }
    `);
  });

  it('should fix peer dependencies', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'public-docsite-v9',
      version: '9.0.0',
      peerDependencies: {
        [`@${workspaceNpmScope}/react-theme`]: '^9.0.0',
      },
      dependencies: {},
      devDependencies: {},
    });

    setupDummyPackage(appTree, {
      name: 'react-theme',
      version: '9.0.1',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.peerDependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-theme": "^9.0.1",
      }
    `);
  });

  it('should not add carets to prerelease dependencies that do not already have it specified', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'public-docsite-v9',
      version: '9.0.0',
      dependencies: {
        [`@${workspaceNpmScope}/react-select`]: '^9.0.0-beta.1',
        [`@${workspaceNpmScope}/react-spinbutton`]: '9.0.0-beta.1',
      },
      devDependencies: {},
      peerDependencies: {},
    });

    setupDummyPackage(appTree, {
      name: 'react-select',
      version: '9.0.0-beta.2',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    setupDummyPackage(appTree, {
      name: 'react-spinbutton',
      version: '9.0.0-beta.2',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-select": "^9.0.0-beta.2",
        "@proj/react-spinbutton": "9.0.0-beta.2",
      }
    `);
  });

  it('should run on v8 packages', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'react',
      version: '8.0.0',
      dependencies: {
        [`@${workspaceNpmScope}/react-portal-compat-context`]: '^9.0.0',
      },
      devDependencies: {},
      peerDependencies: {},
    });

    setupDummyPackage(appTree, {
      name: 'react-portal-compat-context',
      version: '9.0.1',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-portal-compat-context": "^9.0.1",
      }
    `);
  });

  it('should run on v0(northstar) packages changing only v9 deps', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(
      appTree,
      {
        name: 'react-northstar',
        version: '0.66.0',
        dependencies: {
          [`@${workspaceNpmScope}/dom-utilities`]: '^1.1.1',
          [`@${workspaceNpmScope}/react-portal-compat-context`]: '^9.0.0',
        },
        devDependencies: {},
        peerDependencies: {},
      },
      ['react-northstar'],
    );

    setupDummyPackage(appTree, {
      name: 'dom-utilities',
      version: '2.1.2',
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    });
    setupDummyPackage(
      appTree,
      {
        name: 'react-portal-compat-context',
        version: '9.0.1',
        dependencies: {},
        devDependencies: {},
        peerDependencies: {},
      },
      ['vNext'],
    );

    await generator(appTree);

    const packageJson: PackageJson = await readTargetPackageJson();
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/dom-utilities": "^1.1.1",
        "@proj/react-portal-compat-context": "^9.0.1",
      }
    `);
  });

  it('should ignore 3rd party packages/dependencies', async () => {
    const { readPackageJson: readTargetPackageJson } = setupDummyPackage(appTree, {
      name: 'react',
      version: '8.0.0',
      dependencies: {
        [`@${workspaceNpmScope}/tslib`]: '^2.1.1',
      },
      devDependencies: {},
      peerDependencies: {},
    });

    await generator(appTree);

    const packageJson: PackageJson = readTargetPackageJson();
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/tslib": "^2.1.1",
      }
    `);
  });
});

function setupDummyPackage(
  tree: Tree,
  packageJson: {
    name: string;
    version: string;
    devDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
  },
  tags: string[] = [],
) {
  const workspaceConfig = readWorkspaceConfiguration(tree);

  const normalizedPkgName = `@${workspaceConfig.npmScope}/${packageJson.name}`;
  const paths = {
    root: `packages/${packageJson.name}`,
  };

  const templates = {
    packageJson: {
      ...packageJson,
      name: normalizedPkgName,
    },
  };

  const packageJsonPath = `${paths.root}/package.json`;
  tree.write(packageJsonPath, serializeJson(templates.packageJson));

  addProjectConfiguration(tree, normalizedPkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
    tags: ['platform:web', ...tags],
  });

  return {
    readPackageJson: () => readJson<PackageJson>(tree, packageJsonPath),
  };
}
