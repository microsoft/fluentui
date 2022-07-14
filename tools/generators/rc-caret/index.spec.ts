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
import { VersionBumpGeneratorSchema } from './schema';

const noop = () => null;

describe('rc-caret generator', () => {
  let tree: Tree;
  let npmScope: string;
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    npmScope = readWorkspaceConfiguration(tree).npmScope ?? '@proj';
  });

  it('should work for dependencies', () => {
    setupDummyPackage(tree, {
      dependencies: {
        [`@${npmScope}/react-button`]: '9.0.0-rc.1',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.dependencies[`@${npmScope}/react-button`]).toMatchInlineSnapshot(`"^9.0.0-rc.1"`);
  });

  it('should work for dev dependencies', () => {
    setupDummyPackage(tree, {
      devDependencies: {
        [`@${npmScope}/react-button`]: '9.0.0-rc.1',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.devDependencies[`@${npmScope}/react-button`]).toMatchInlineSnapshot(`"^9.0.0-rc.1"`);
  });

  it('should ignore dependencies already carets', () => {
    setupDummyPackage(tree, {
      dependencies: {
        [`@${npmScope}/react-button`]: '^9.0.0-rc.1',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.dependencies[`@${npmScope}/react-button`]).toMatchInlineSnapshot(`"^9.0.0-rc.1"`);
  });

  it('should ignore alpha and beta prereleases', () => {
    setupDummyPackage(tree, {
      dependencies: {
        [`@${npmScope}/react-button`]: '9.0.0-beta.1',
        [`@${npmScope}/react-card`]: '9.0.0-alpha.1',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-button": "9.0.0-beta.1",
        "@proj/react-card": "9.0.0-alpha.1",
      }
    `);
  });

  it('should ignore non-converged', () => {
    setupDummyPackage(tree, {
      dependencies: {
        [`@${npmScope}/react`]: '8.3.2',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react": "8.3.2",
      }
    `);
  });

  it('should work on non-converged package', () => {
    setupDummyPackage(tree, {
      version: '1.1.0',
      dependencies: {
        [`@${npmScope}/react-button`]: '9.0.0-rc.1',
      },
    });

    generator(tree, { name: `@${npmScope}/react-components` });
    const packageJson = readJson(tree, 'packages/react-components/package.json');

    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      Object {
        "@proj/react-button": "^9.0.0-rc.1",
      }
    `);
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
    }>,
) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const defaults = {
    name: `@${workspaceConfig.npmScope}/react-components`,
    version: '9.0.0-alpha.40',
    dependencies: {
      [`@${workspaceConfig.npmScope}/react-button`]: '^9.0.0-rc.38',
      [`@${workspaceConfig.npmScope}/react-card`]: '9.0.0-rc.13',
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
