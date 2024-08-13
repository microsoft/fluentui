import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  serializeJson,
  stripIndents,
  addProjectConfiguration,
  ProjectConfiguration,
  logger,
  readJson,
} from '@nx/devkit';
import type { Linter } from 'eslint';

import type { PackageJson, TsConfig } from '../../types';
import generator from './index';
import { MigrateV8PkgGeneratorSchema } from './schema';
import { getProjectNameWithoutScope, getWorkspaceConfig } from '../../utils';

interface AssertedSchema extends MigrateV8PkgGeneratorSchema {
  name: string;
}

describe('migrate-v8-pkg generator', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  let tree: Tree;
  const options = { name: '@proj/eight' } as const;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    tree = setupDummyPackage(tree, options);
    tree = setupDummyPackage(tree, {
      name: '@proj/react',
      eslintConfig: stripIndents`
     module.exports = {
       extends: ['@proj/react--legacy'],
       root: true
     }
    `,
    });
    tree = setupDummyPackage(tree, { name: '@proj/merge-styles' });
  });

  it('should run successfully', async () => {
    await generator(tree, options);
    const config = readProjectConfiguration(tree, options.name);
    expect(config).toBeDefined();
  });

  describe(`--stats`, () => {
    it(`should print project names and count of how many have been migrated`, async () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');

      await generator(tree, { stats: true });

      expect(loggerInfoSpy).toHaveBeenCalled();
    });
  });

  describe(`--name`, () => {
    describe(`npm publish setup`, () => {
      it(`should replace .npmignore config with package.json#files`, async () => {
        expect(tree.exists(`packages/eight/.npmignore`)).toBe(true);

        await generator(tree, options);

        expect(tree.exists(`packages/eight/.npmignore`)).toBe(false);

        const pkgJson = readJson<PackageJson>(tree, `packages/eight/package.json`);
        expect(pkgJson.files).toMatchInlineSnapshot(`
          Array [
            "lib",
            "lib-commonjs",
            "lib-amd",
            "dist",
          ]
        `);
      });
    });
  });

  describe(`--all`, () => {
    const projects = [
      options.name,
      '@proj/react-foo',
      '@proj/react-bar',
      '@proj/react-moo',
      '@proj/react-zoo',
    ] as const;

    beforeEach(() => {
      setupDummyPackage(tree, { name: projects[1], version: '9.0.22' });
      setupDummyPackage(tree, { name: projects[2], version: '8.0.31' });
      setupDummyPackage(tree, { name: projects[3], version: '8.0.12' });
      setupDummyPackage(tree, { name: projects[4], version: '8.0.1' });
    });
    it(`should run migration on all vNext packages in batch`, async () => {
      await generator(tree, { all: true });

      const configs = projects.reduce((acc, projectName) => {
        acc[projectName] = readProjectConfiguration(tree, projectName);

        return acc;
      }, {} as Record<(typeof projects)[number], ProjectConfiguration>);

      expect(configs[projects[1]].sourceRoot).not.toBeDefined();
      expect(configs[options.name].sourceRoot).toBeDefined();
      expect(configs[projects[2]].sourceRoot).toBeDefined();
      expect(configs[projects[3]].sourceRoot).toBeDefined();
      expect(configs[projects[4]].sourceRoot).toBeDefined();
    });
  });
});

function setupDummyPackage(
  tree: Tree,
  options: AssertedSchema &
    Partial<{
      version: string;
      dependencies: Record<string, string>;
      tsConfig: TsConfig;
      eslintConfig: string | Linter.Config;
      projectConfiguration: Partial<ProjectConfiguration>;
    }>,
) {
  const workspaceConfig = getWorkspaceConfig(tree);
  const defaults = {
    version: '8.0.0',
    dependencies: {
      [`@${workspaceConfig.npmScope}/test-utilities`]: '^8.1.6',
      [`@${workspaceConfig.npmScope}/merge-styles`]: '^8.0.17',
      tslib: '^2.1.0',
    },
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
        outDir: 'lib',
        target: 'es5',
        module: 'commonjs',
        jsx: 'react',
        isolatedModules: true,
        declaration: true,
        sourceMap: true,
        lib: ['es5', 'dom', 'es2015.promise'],
        typeRoots: ['../../../../node_modules/@types', '../../../../typings'],
        types: ['jest', 'custom-global'],
      },
      include: ['src'],
    },
    eslintConfig: {
      extends: ['@proj/react--legacy'],
      root: true,
    },
  };
  const normalizedOptions = { ...defaults, ...options };
  const pkgName = normalizedOptions.name;
  const normalizedPkgName = getProjectNameWithoutScope(pkgName);
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };
  const templates = {
    packageJson: {
      name: pkgName,
      version: normalizedOptions.version,
      scripts: {
        build: 'just-scripts build',
        bundle: 'just-scripts bundle',
        'build-storybook': 'cross-env NODE_OPTIONS=--max-old-space-size=3072 just-scripts storybook:build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        codepen: 'node ../../scripts/executors/src/local-codepen.js',
        e2e: 'yarn workspace @fluentui/react-examples e2e --package react',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'cross-env NODE_OPTIONS=--max-old-space-size=3072 just-scripts dev:storybook',
        'start:legacy': 'yarn workspace @fluentui/public-docsite-resources start',
        'start-test': 'just-scripts jest-watch',
        test: 'just-scripts test',
        'update-snapshots': 'just-scripts jest -u',
        mf: 'just-scripts mf',
      },
      dependencies: normalizedOptions.dependencies,
    },
    tsConfig: {
      ...normalizedOptions.tsConfig,
    },
    jestConfig: stripIndents`
      const { createConfig,   } = require('@proj/scripts/jest/jest-resources');
      const path = require('path');

      const config = createConfig({
         setupFiles: ['./config/tests.js'],
        snapshotSerializers: ['@fluentui/jest-serializer-merge-styles'],
      });

      module.exports = config;
    `,
    jestSetupFile: stripIndents`
     /** Jest test setup file. */

      const { configure } = require('enzyme');
      const { initializeIcons } = require('@proj/font-icons-mdl2');
      const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

      // Initialize icons.
      initializeIcons('');

      // Configure enzyme.
      configure({ adapter: new Adapter() });
    `,
    npmConfig: stripIndents``,
  };

  if (typeof normalizedOptions.eslintConfig === 'string') {
    tree.write(`${paths.root}/.eslintrc.js`, normalizedOptions.eslintConfig);
  } else {
    tree.write(`${paths.root}/.eslintrc.json`, serializeJson(normalizedOptions.eslintConfig));
  }

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${paths.root}/jest.config.js`, templates.jestConfig);
  tree.write(`${paths.root}/config/tests.js`, templates.jestSetupFile);
  tree.write(`${paths.root}/.npmignore`, templates.npmConfig);
  tree.write(`${paths.root}/src/index.ts`, `export const greet = 'hello' `);
  tree.write(
    `${paths.root}/src/index.test.ts`,
    `
    import {greet} from './index';
    describe('test me', () => {
      it('should greet', () => {
        expect(greet).toBe('hello');
      });
    });
  `,
  );

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
    ...options.projectConfiguration,
  });

  return tree;
}
