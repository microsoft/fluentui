import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  serializeJson,
  addProjectConfiguration,
  readJson,
} from '@nrwl/devkit';

import generator from './index';
import { VersionStringReplaceGeneratorSchema } from './schema';

const noop = () => null;

describe('version-string-replace generator', () => {
  let tree: Tree;
  const defaultTestOptions = { match: 'alpha.\\d+', replace: 'beta.0' };

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
  });

  it('should bump alpha package to beta', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', ...defaultTestOptions });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
  });

  it('should remove prerelease tag', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-beta.69',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', match: '-beta.\\d+', replace: '' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0"`);
  });

  it('should bump dependent depedencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-button',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', ...defaultTestOptions });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "9.0.0-beta.0",
      }
    `);
  });

  it('should bump dependent dev depedencies', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/react-button',
      version: '9.0.0-alpha.0',
      dependencies: {},
      devDependencies: {
        '@proj/make-styles': '9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', ...defaultTestOptions });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`Object {}`);
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

    const result = generator(tree, { name: '@proj/babel-make-styles', ...defaultTestOptions });

    await expect(result).rejects.toMatchInlineSnapshot(`
            [Error: @proj/babel-make-styles is not converged package consumed by customers.
                    Make sure to run the migration on packages with version 9.x.x and has the alpha tag]
          `);
  });

  it('should throw error when if package is already in beta', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/babel-make-styles',
      version: '9.0.0-beta.10',
      projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
    });

    const result = generator(tree, { name: '@proj/babel-make-styles', ...defaultTestOptions });

    await expect(result).rejects.toMatchInlineSnapshot(`
            [Error: @proj/babel-make-styles is not converged package consumed by customers.
                    Make sure to run the migration on packages with version 9.x.x and has the alpha tag]
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
        dependencies: {},
        devDependencies: {
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
      tree = setupDummyPackage(tree, {
        name: '@proj/react-menu',
        version: '9.0.0-beta.11',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/react-menu/src' },
      });
    });

    it('should ignore packages not alpha', async () => {
      await generator(tree, { all: true, ...defaultTestOptions });

      const packageJson = readJson(tree, 'packages/react-menu/package.json');
      expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.11"`);
    });

    it('should ignore packages not v9', async () => {
      await generator(tree, { all: true, ...defaultTestOptions });

      const packageJson = readJson(tree, 'packages/babel-make-styles/package.json');
      expect(packageJson.version).toMatchInlineSnapshot(`"1.0.0"`);
    });

    it('should migrate all packages to beta', async () => {
      await generator(tree, { all: true, ...defaultTestOptions });

      const reactButtonPakageJson = readJson(tree, 'packages/react-button/package.json');
      const makeStylesPackageJson = readJson(tree, 'packages/make-styles/package.json');
      const reactUtilitiesPackageJson = readJson(tree, 'packages/react-utilities/package.json');
      expect(reactButtonPakageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
      expect(makeStylesPackageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
      expect(reactUtilitiesPackageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
      expect(reactButtonPakageJson.dependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/make-styles": "^9.0.0-beta.0",
          "@proj/react-utilities": "^9.0.0-beta.0",
        }
      `);
      expect(makeStylesPackageJson.dependencies).toMatchInlineSnapshot(`Object {}`);
      expect(makeStylesPackageJson.devDependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/react-utilities": "^9.0.0-beta.0",
        }
      `);
    });
  });
});

function setupDummyPackage(
  tree: Tree,
  options: Pick<VersionStringReplaceGeneratorSchema, 'name'> &
    Partial<{
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
