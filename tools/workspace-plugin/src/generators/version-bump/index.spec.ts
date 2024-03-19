import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration, serializeJson, addProjectConfiguration, readJson } from '@nx/devkit';

import generator from './index';
import { VersionBumpGeneratorSchema } from './schema';
import { PackageJsonWithBeachball } from '../../types';
import { getWorkspaceConfig } from '../../utils';

const noop = () => null;

describe('version-string-replace generator', () => {
  let tree: Tree;
  const defaultTestOptions = {
    bumpType: 'prerelease',
    prereleaseTag: 'beta',
  } as const;

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

    await generator(tree, { name: '@proj/make-styles', bumpType: 'prerelease', prereleaseTag: 'beta' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
  });

  it('should remove prerelease tag', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-beta.69',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', bumpType: 'minor', prereleaseTag: '' });

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

  it('should downgrade the version to 0.0.0 when `nightly` is selected as the bump type', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    tree = setupDummyPackage(tree, {
      name: '@proj/react-button',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0',
      },
      devDependencies: {
        '@proj/make-styles': '^9.0.0',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });

    await generator(tree, { name: '@proj/make-styles', bumpType: 'nightly', prereleaseTag: 'nightly' });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "0.0.0-nightly.0",
      }
    `);
    expect(packageJson.devDependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "0.0.0-nightly.0",
      }
    `);
  });

  it('should remove carets for dependents when `nightly` is selected as the bump type', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '^9.0.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: '@proj/make-styles', bumpType: 'nightly', prereleaseTag: 'nightly' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"0.0.0-nightly.0"`);
  });

  it('should remove beachball disallowedChangeType config when bumping nightly', async () => {
    tree = setupDummyPackage(tree, {
      name: '@proj/make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
      beachball: {
        disallowedChangeTypes: ['prerelease'],
      },
    });

    expect(
      readJson<PackageJsonWithBeachball>(tree, 'packages/make-styles/package.json').beachball?.disallowedChangeTypes,
    ).toEqual(['prerelease']);

    await generator(tree, { name: '@proj/make-styles', bumpType: 'nightly', prereleaseTag: 'nightly' });

    const packageJson = readJson<PackageJsonWithBeachball>(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"0.0.0-nightly.0"`);
    expect(packageJson.beachball?.disallowedChangeTypes).toBeUndefined();
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
        name: '@proj/react-theme',
        version: '9.0.0-alpha.0',
        dependencies: {},
        devDependencies: {},
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
        projectConfiguration: { tags: ['platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
      });
      tree = setupDummyPackage(tree, {
        name: '@proj/tokens',
        version: '1.0.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/tokens/src' },
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

    it('should ignore packages not v9', async () => {
      await generator(tree, { all: true, ...defaultTestOptions });

      const packageJson = readJson(tree, 'packages/babel-make-styles/package.json');
      expect(packageJson.version).toMatchInlineSnapshot(`"1.0.0"`);
    });

    it('should bump packages that have tag vNext but not version 9', async () => {
      await generator(tree, { all: true, ...defaultTestOptions });

      const packageJson = readJson(tree, 'packages/tokens/package.json');
      expect(packageJson.version).toMatchInlineSnapshot(`"1.0.1-beta.0"`);
    });

    it('should bump all packages to beta', async () => {
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

    it('should exclude packages', async () => {
      await generator(tree, {
        all: true,
        ...defaultTestOptions,
        exclude: '@proj/react-utilities,@proj/react-theme',
      });

      const reactThemePackageJson = readJson(tree, 'packages/react-theme/package.json');
      const makeStylesPackageJson = readJson(tree, 'packages/make-styles/package.json');
      const reactButtonPackageJson = readJson(tree, 'packages/react-button/package.json');
      const reactUtilitiesPackageJson = readJson(tree, 'packages/react-utilities/package.json');
      expect(reactButtonPackageJson.version).toEqual('9.0.0-beta.0');
      expect(makeStylesPackageJson.version).toEqual('9.0.0-beta.0');
      expect(reactThemePackageJson.version).toEqual('9.0.0-alpha.0');
      expect(reactUtilitiesPackageJson.version).toEqual('9.0.0-alpha.0');
      expect(reactButtonPackageJson.dependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/make-styles": "^9.0.0-beta.0",
          "@proj/react-utilities": "^9.0.0-alpha.1",
        }
      `);
      expect(makeStylesPackageJson.devDependencies).toMatchInlineSnapshot(`
        Object {
          "@proj/react-utilities": "^9.0.0-alpha.1",
        }
      `);
    });
  });
});

function setupDummyPackage(
  tree: Tree,
  options: Pick<VersionBumpGeneratorSchema, 'name'> &
    Partial<{
      version: string;
      devDependencies: Record<string, string>;
      dependencies: Record<string, string>;
      projectConfiguration: Partial<ReturnType<typeof readProjectConfiguration>>;
      beachball: PackageJsonWithBeachball['beachball'];
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
      beachball: options.beachball,
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
