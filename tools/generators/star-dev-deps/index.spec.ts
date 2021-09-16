import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  addProjectConfiguration,
  serializeJson,
  readWorkspaceConfiguration,
  readJson,
} from '@nrwl/devkit';

import generator from './index';
import { StarDevDepsGeneratorSchema } from './schema';

describe('star-dev-deps generator', () => {
  let tree: Tree;
  const options: StarDevDepsGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    setupDummyPackage(tree, {
      packageName: '@proj/eslint-plugin',
      version: '1.0.0',
    });
  });

  it('should change internal package devdeps to * version', async () => {
    const devPkgName = '@proj/eslint-plugin';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);
    const pkgJson = readJson(tree, 'packages/react-button/package.json');
    expect(pkgJson.devDependencies[devPkgName]).toBe('*');
  });

  it('should run for all packages in the monorepo', async () => {
    const devPkgName = '@proj/eslint-plugin';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    setupDummyPackage(tree, {
      packageName: '@proj/react-avatar',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    setupDummyPackage(tree, {
      packageName: '@proj/react-menu',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);

    ['react-button', 'react-avatar', 'react-menu'].forEach(name => {
      const path = `packages/${name}/package.json`;
      const pkgJson = readJson(tree, path);
      expect(pkgJson.devDependencies[devPkgName]).toBe('*');
    });
  });

  it('should also modify non-v9 packages', async () => {
    const devPkgName = '@proj/eslint-plugin';

    setupDummyPackage(tree, {
      packageName: '@proj/react-button',
      version: '1.0.0',
      devDependencies: { [devPkgName]: '1.0.0' },
    });

    await generator(tree);
    const pkgJson = readJson(tree, 'packages/react-button/package.json');
    expect(pkgJson.devDependencies[devPkgName]).toBe('*');
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
