import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration, serializeJson, addProjectConfiguration, readJson } from '@nx/devkit';

import generator from './index';
import { MigrateFixedVersionsGeneratorSchema } from './schema';
import { getWorkspaceConfig } from '../../utils';

const noop = () => null;

describe('migrate-fixed-versions generator', () => {
  let tree: Tree;
  const options: MigrateFixedVersionsGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    tree = setupDummyPackage(tree, options);
  });

  it('should successfully migrate depedencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-button',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/react-button' });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "9.0.0-alpha.1",
      }
    `);
  });

  it('should successfully migrate dev depedencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-button',
      version: '9.0.0-alpha.0',
      dependencies: {},
      devDependencies: {
        '@proj/make-styles': '^9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/react-button' });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.devDependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "9.0.0-alpha.1",
      }
    `);
  });

  it('should not migrate third party dependencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-positioning',
      version: '9.0.0-alpha.0',
      dependencies: {
        'popperjs/core': '^1.0.0',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-positioning/src' },
    });
    await generator(tree, { name: '@proj/react-positioning' });

    const packageJson = readJson(tree, 'packages/react-positioning/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "popperjs/core": "^1.0.0",
      }
    `);
  });

  it('should not migrate third party dev dependencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-positioning',
      version: '9.0.0-alpha.0',
      dependencies: {},
      devDependencies: {
        'popperjs/core': '^1.0.0',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-positioning/src' },
    });
    await generator(tree, { name: '@proj/react-positioning' });

    const packageJson = readJson(tree, 'packages/react-positioning/package.json');
    expect(packageJson.devDependencies).toMatchInlineSnapshot(`
      Object {
        "popperjs/core": "^1.0.0",
      }
    `);
  });

  it('should throw error when if package is not converged', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/babel-make-styles',
      version: '8.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
    });

    const result = generator(tree, { name: '@proj/babel-make-styles' });

    await expect(result).rejects.toMatchInlineSnapshot(`
            [Error: @proj/babel-make-styles is not converged package consumed by customers.
                    Make sure to run the migration on packages with version 9.x.x and has tag]
          `);
  });

  describe('--all', () => {
    beforeEach(() => {
      tree = setupDummyPackage(tree, {
        name: '@proj/react-button',
        version: '9.0.0-alpha.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
          '@proj/react-utilities': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
      });
      tree = setupDummyPackage(tree, {
        name: '@proj/make-styles',
        version: '9.0.0-alpha.0',
        dependencies: {
          '@proj/react-utilities': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
      });
      tree = setupDummyPackage(tree, {
        name: '@proj/react-utilities',
        version: '9.0.0-alpha.0',
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-utilities/src' },
      });
      tree = setupDummyPackage(tree, {
        name: '@proj/babel-make-styles',
        version: '1.0.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
      });
    });

    it('should migrate all packages', async () => {
      await generator(tree, { all: true, name: '' });

      const reactButtonPackageJson = readJson(tree, 'packages/react-button/package.json');
      const makeStylesPackageJson = readJson(tree, 'packages/make-styles/package.json');
      expect(reactButtonPackageJson.dependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/make-styles": "9.0.0-alpha.1",
          "@proj/react-utilities": "9.0.0-alpha.1",
        }
      `);
      expect(makeStylesPackageJson.dependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/react-utilities": "9.0.0-alpha.1",
        }
      `);
    });
  });
});

function setupDummyPackage(
  tree: Tree,
  options: MigrateFixedVersionsGeneratorSchema &
    Partial<{
      version: string;
      devDependencies: Record<string, string>;
      dependencies: Record<string, string>;
      projectConfiguration: Partial<ReturnType<typeof readProjectConfiguration>>;
    }>,
) {
  const workspaceConfig = getWorkspaceConfig(tree);
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
  const pkgName = normalizedOptions.name || '';
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
