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
      name: 'make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: 'make-styles', bumpType: 'prerelease', prereleaseTag: 'beta' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0-beta.0"`);
  });

  it('should remove prerelease tag', async () => {
    tree = setupDummyPackage(tree, {
      name: 'make-styles',
      version: '9.0.0-beta.69',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: 'make-styles', bumpType: 'minor', prereleaseTag: '' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"9.0.0"`);
  });

  it('should bump dependent dependencies', async () => {
    tree = setupDummyPackage(tree, {
      name: 'react-button',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: 'make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: 'make-styles', ...defaultTestOptions });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/make-styles": "9.0.0-beta.0",
      }
    `);
  });

  it('should bump dependent dev depedencies', async () => {
    tree = setupDummyPackage(tree, {
      name: 'react-button',
      version: '9.0.0-alpha.0',
      dependencies: {},
      devDependencies: {
        '@proj/make-styles': '9.0.0-alpha.1',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });
    tree = setupDummyPackage(tree, {
      name: 'make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: 'make-styles', ...defaultTestOptions });

    const packageJson = readJson(tree, 'packages/react-button/package.json');
    expect(packageJson.dependencies).toMatchInlineSnapshot(`Object {}`);
  });

  it('should downgrade the version to 0.0.0 when `nightly` is selected as the bump type', async () => {
    tree = setupDummyPackage(tree, {
      name: 'make-styles',
      version: '9.0.0-alpha.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    tree = setupDummyPackage(tree, {
      name: 'react-button',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0',
      },
      devDependencies: {
        '@proj/make-styles': '^9.0.0',
      },
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
    });

    await generator(tree, { name: 'make-styles', bumpType: 'nightly', prereleaseTag: 'nightly' });

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
      name: 'make-styles',
      version: '^9.0.0',
      projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
    });

    await generator(tree, { name: 'make-styles', bumpType: 'nightly', prereleaseTag: 'nightly' });

    const packageJson = readJson(tree, 'packages/make-styles/package.json');
    expect(packageJson.version).toMatchInlineSnapshot(`"0.0.0-nightly.0"`);
  });

  it.each([
    { scenario: 'bumping nightly', options: { bumpType: 'nightly', prereleaseTag: 'nightly' } },
    { scenario: 'using explicitVersion', options: { explicitVersion: '9.1.7-experimental.0' } },
  ] as const)('should remove beachball disallowedChangeType config when $scenario', async ({ options }) => {
    const versionBumpKind = options.bumpType ?? 'explicitVersion';
    tree = setupDummyPackage(tree, {
      name: `make-styles-${versionBumpKind}`,
      version: '9.0.0-alpha.0',
      projectConfiguration: {
        tags: ['vNext', 'platform:web'],
        sourceRoot: `packages/make-styles-${versionBumpKind}/src`,
      },
      beachball: {
        disallowedChangeTypes: ['prerelease'],
      },
    });

    expect(
      readJson<PackageJsonWithBeachball>(tree, `packages/make-styles-${versionBumpKind}/package.json`).beachball
        ?.disallowedChangeTypes,
    ).toEqual(['prerelease']);

    await generator(tree, { name: `make-styles-${versionBumpKind}`, ...options });

    const packageJson = readJson<PackageJsonWithBeachball>(
      tree,
      `packages/make-styles-${versionBumpKind}/package.json`,
    );
    expect(packageJson.version).toEqual(
      versionBumpKind === 'explicitVersion' ? '9.1.7-experimental.0' : '0.0.0-nightly.0',
    );
    expect(packageJson.beachball?.disallowedChangeTypes).toBeUndefined();
  });

  describe(`--explicitVersion`, () => {
    async function setupForVersionArgument(scope: 'all' | string) {
      tree = setupDummyPackage(tree, {
        name: 'react-components',
        version: '9.10.20',
        dependencies: {
          '@proj/react-button': '^9.1.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-components/src' },
      });

      tree = setupDummyPackage(tree, {
        name: 'react-button',
        version: '9.1.1',
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
      });

      if (scope === 'all') {
        await generator(tree, { all: true, explicitVersion: '9.0.0-experimental.foo.20220101-abc' });
      } else {
        await generator(tree, { name: 'react-button', explicitVersion: '9.0.0-experimental.foo.20220101-abc' });
      }

      const suitePackageJson = readJson(tree, 'packages/react-components/package.json');
      const reactButtonPackageJson = readJson(tree, 'packages/react-button/package.json');

      return { suitePackageJson, reactButtonPackageJson };
    }

    it('should bump to explicit version', async () => {
      const { reactButtonPackageJson, suitePackageJson } = await setupForVersionArgument('react-button');

      expect(suitePackageJson.version).toBe('9.10.20');
      expect(suitePackageJson.dependencies['@proj/react-button']).toBe('9.0.0-experimental.foo.20220101-abc');
      expect(reactButtonPackageJson.version).toBe('9.0.0-experimental.foo.20220101-abc');
    });
    it('should bump all packages to <version>', async () => {
      const { reactButtonPackageJson, suitePackageJson } = await setupForVersionArgument('all');

      expect(suitePackageJson.version).toBe('9.0.0-experimental.foo.20220101-abc');
      expect(suitePackageJson.dependencies['@proj/react-button']).toBe('9.0.0-experimental.foo.20220101-abc');
      expect(reactButtonPackageJson.version).toBe('9.0.0-experimental.foo.20220101-abc');
    });
  });

  describe('--all', () => {
    beforeEach(() => {
      tree = setupDummyPackage(tree, {
        name: 'react-button',
        version: '9.0.0-alpha.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
          '@proj/react-utilities': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'make-styles',
        version: '9.0.0-alpha.0',
        dependencies: {},
        devDependencies: {
          '@proj/react-utilities': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'react-theme',
        version: '9.0.0-alpha.0',
        dependencies: {},
        devDependencies: {},
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/make-styles/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'react-utilities',
        version: '9.0.0-alpha.0',
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-utilities/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'babel-make-styles',
        version: '1.0.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'tokens',
        version: '1.0.0',
        dependencies: {
          '@proj/make-styles': '^9.0.0-alpha.1',
        },
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/tokens/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'react-menu',
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
        exclude: 'react-utilities,react-theme',
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

  describe('--scope tools with --versionSuffix', () => {
    const suffix = 'experimental.my-feature.20260408-abc1234';

    beforeEach(() => {
      // Tools packages
      tree = setupDummyPackage(tree, {
        name: 'react-storybook-addon',
        version: '0.6.0',
        dependencies: {},
        projectConfiguration: { tags: ['tools', 'platform:node'], sourceRoot: 'packages/react-storybook-addon/src' },
      });
      tree = setupDummyPackage(tree, {
        name: 'eslint-plugin-react-components',
        version: '0.2.1',
        dependencies: {
          '@proj/react-storybook-addon': '^0.6.0',
        },
        projectConfiguration: {
          tags: ['tools', 'platform:node'],
          sourceRoot: 'packages/eslint-plugin-react-components/src',
        },
      });
      // vNext package (should NOT be bumped)
      tree = setupDummyPackage(tree, {
        name: 'react-button',
        version: '9.0.0',
        dependencies: {},
        projectConfiguration: { tags: ['vNext', 'platform:web'], sourceRoot: 'packages/react-button/src' },
      });
      // Private tools package (should NOT be bumped)
      tree = setupDummyPackage(tree, {
        name: 'private-tool',
        version: '1.0.0',
        dependencies: {},
        projectConfiguration: { tags: ['tools', 'platform:node'], sourceRoot: 'packages/private-tool/src' },
        isPrivate: true,
      });
    });

    it('should bump only tools packages with their own base version + suffix', async () => {
      await generator(tree, { all: true, scope: 'tools', versionSuffix: suffix });

      const storybookAddon = readJson(tree, 'packages/react-storybook-addon/package.json');
      const eslintPlugin = readJson(tree, 'packages/eslint-plugin-react-components/package.json');
      const reactButton = readJson(tree, 'packages/react-button/package.json');

      expect(storybookAddon.version).toBe(`0.6.0-${suffix}`);
      expect(eslintPlugin.version).toBe(`0.2.1-${suffix}`);
      // vNext package should not be affected
      expect(reactButton.version).toBe('9.0.0');
    });

    it('should not bump private tools packages', async () => {
      await generator(tree, { all: true, scope: 'tools', versionSuffix: suffix });

      const privateTool = readJson(tree, 'packages/private-tool/package.json');
      expect(privateTool.version).toBe('1.0.0');
    });

    it('should update dependency versions for tools dependents', async () => {
      await generator(tree, { all: true, scope: 'tools', versionSuffix: suffix });

      const eslintPlugin = readJson(tree, 'packages/eslint-plugin-react-components/package.json');
      expect(eslintPlugin.dependencies['@proj/react-storybook-addon']).toBe(`0.6.0-${suffix}`);
    });

    it('should remove beachball disallowedChangeTypes for tools packages', async () => {
      tree = setupDummyPackage(tree, {
        name: 'react-conformance',
        version: '0.20.1',
        dependencies: {},
        projectConfiguration: { tags: ['tools', 'platform:node'], sourceRoot: 'packages/react-conformance/src' },
        beachball: {
          disallowedChangeTypes: ['prerelease'],
        },
      });

      await generator(tree, { all: true, scope: 'tools', versionSuffix: suffix });

      const reactConformance = readJson<PackageJsonWithBeachball>(tree, 'packages/react-conformance/package.json');
      expect(reactConformance.version).toBe(`0.20.1-${suffix}`);
      expect(reactConformance.beachball?.disallowedChangeTypes).toBeUndefined();
    });

    it('should exclude specified tools packages', async () => {
      await generator(tree, {
        all: true,
        scope: 'tools',
        versionSuffix: suffix,
        exclude: 'react-storybook-addon',
      });

      const storybookAddon = readJson(tree, 'packages/react-storybook-addon/package.json');
      const eslintPlugin = readJson(tree, 'packages/eslint-plugin-react-components/package.json');

      expect(storybookAddon.version).toBe('0.6.0');
      expect(eslintPlugin.version).toBe(`0.2.1-${suffix}`);
    });
  });

  describe('--versionSuffix validation', () => {
    it('should throw if --versionSuffix is used with --bumpType', async () => {
      await expect(
        generator(tree, { all: true, versionSuffix: 'experimental.feat.20260408-abc', bumpType: 'patch' }),
      ).rejects.toThrow('--versionSuffix is mutually exclusive with --bumpType and --explicitVersion');
    });

    it('should throw if --versionSuffix is used with --explicitVersion', async () => {
      await expect(
        generator(tree, { all: true, versionSuffix: 'experimental.feat.20260408-abc', explicitVersion: '1.0.0' }),
      ).rejects.toThrow('--versionSuffix is mutually exclusive with --bumpType and --explicitVersion');
    });

    it('should throw if --versionSuffix is used without --all', async () => {
      await expect(
        generator(tree, { name: 'react-button', versionSuffix: 'experimental.feat.20260408-abc' }),
      ).rejects.toThrow('--versionSuffix requires --all');
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
      isPrivate: boolean;
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
  const projectName = normalizedOptions.name || '';
  const paths = {
    root: `packages/${projectName}`,
  };

  const templates = {
    packageJson: {
      name: `@${workspaceConfig.npmScope}/${projectName}`,
      version: normalizedOptions.version,
      ...(options.isPrivate ? { private: true } : {}),
      dependencies: normalizedOptions.dependencies,
      devDependencies: normalizedOptions.devDependencies,
      beachball: options.beachball,
    },
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));

  addProjectConfiguration(tree, projectName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
    tags: ['platform:web'],
    ...options.projectConfiguration,
  });

  return tree;
}
