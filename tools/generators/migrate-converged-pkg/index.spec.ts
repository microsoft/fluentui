import * as Enquirer from 'enquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  stripIndents,
  addProjectConfiguration,
  readWorkspaceConfiguration,
  updateJson,
  logger,
  updateProjectConfiguration,
  serializeJson,
  names,
  visitNotIgnoredFiles,
  writeJson,
  WorkspaceConfiguration,
} from '@nrwl/devkit';

import { PackageJson, TsConfig } from '../../types';
import { disableChalk, formatMockedCalls, setupCodeowners } from '../../utils-testing';

import generator from './index';
import { MigrateConvergedPkgGeneratorSchema } from './schema';
import { workspacePaths } from '../../utils';

interface AssertedSchema extends MigrateConvergedPkgGeneratorSchema {
  name: string;
}

type ReadProjectConfiguration = ReturnType<typeof readProjectConfiguration>;

jest.mock(
  'enquirer',
  () =>
    ({
      prompt: async () => ({
        name: '',
      }),
    } as Pick<Enquirer, 'prompt'>),
);

describe('migrate-converged-pkg generator', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  disableChalk(chalk);

  let tree: Tree;
  const options = { name: '@proj/react-dummy' } as const;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    tree = setupCodeowners(tree, { content: `` });
    tree.write(
      'jest.config.js',
      stripIndents`
      module.exports = {
          projects: []
      }`,
    );
    tree = setupDummyPackage(tree, options);
    tree = setupDummyPackage(tree, {
      name: '@proj/babel-make-styles',
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0-alpha.1',
      },
      tsConfig: { extends: '../../tsconfig.base.json', compilerOptions: {}, include: ['src'] },
      projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/babel-make-styles/src' },
    });
  });

  describe('general', () => {
    describe('schema validation', () => {
      it('should throw if --name && --stats are both specified', async () => {
        await expect(
          generator(tree, {
            ...options,
            stats: true,
          }),
        ).rejects.toMatchInlineSnapshot(`[Error: --name and --stats are mutually exclusive]`);
      });

      it('should throw if --name && --all are both specified', async () => {
        await expect(
          generator(tree, {
            ...options,
            all: true,
          }),
        ).rejects.toMatchInlineSnapshot(`[Error: --name and --all are mutually exclusive]`);
      });

      it('should throw if --stats && --all are both specified', async () => {
        await expect(
          generator(tree, {
            stats: true,
            all: true,
          }),
        ).rejects.toMatchInlineSnapshot(`[Error: --stats and --all are mutually exclusive]`);
      });

      it(`should throw error if name is empty`, async () => {
        await expect(generator(tree, { name: '' })).rejects.toMatchInlineSnapshot(
          `[Error: --name cannot be empty. Please provide name of the package.]`,
        );
      });

      it(`should throw error if provided name doesn't match existing package`, async () => {
        await expect(generator(tree, { name: '@proj/non-existent-lib' })).rejects.toMatchInlineSnapshot(
          `[Error: Cannot find configuration for '@proj/non-existent-lib' in /workspace.json.]`,
        );
      });

      it(`should throw error if user wants migrate non converged package`, async () => {
        const projectConfig = readProjectConfiguration(tree, options.name);
        updateJson(tree, `${projectConfig.root}/package.json`, json => {
          json.version = '8.0.0';
          return json;
        });

        /* eslint-disable @fluentui/max-len */
        await expect(generator(tree, options)).rejects.toMatchInlineSnapshot(
          `[Error: @proj/react-dummy is not converged package. Make sure to run the migration on packages with version 9.x.x]`,
        );
        /* eslint-enable @fluentui/max-len */
      });
    });

    describe('prompts', () => {
      function setup(config: { promptResponse: Pick<MigrateConvergedPkgGeneratorSchema, 'name'> }) {
        const promptSpy = jest.spyOn(Enquirer, 'prompt').mockImplementation(async () => {
          return { ...config.promptResponse };
        });

        return { promptSpy };
      }

      it('should prompt for a name if neither "name" OR "all" OR "stats" are specified', async () => {
        const { promptSpy } = setup({ promptResponse: options });

        await generator(tree, {});

        expect(promptSpy).toHaveBeenCalledTimes(1);
      });

      it('should not prompt for a name if "all" OR "stats" is specified', async () => {
        const { promptSpy } = setup({ promptResponse: options });

        await generator(tree, { stats: true });

        expect(promptSpy).toHaveBeenCalledTimes(0);

        await generator(tree, { all: true });

        expect(promptSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe(`projectType execution`, () => {
      it(`should do limited migration for "application"`, async () => {
        tree.write('apps/my-app/src/index.ts', `import * as React from 'react';`);
        writeJson(tree, 'apps/my-app/package.json', { name: '@proj/my-app', private: true, version: '9.0.0' });
        writeJson(tree, 'apps/my-app/tsconfig.json', { compilerOptions: {}, include: ['src'] });
        addProjectConfiguration(tree, '@proj/my-app', {
          root: 'apps/my-app',
          projectType: 'application',
          targets: {},
        });

        const loggerInfoSpy = jest.spyOn(logger, 'warn');

        await generator(tree, { name: '@proj/my-app' });

        expect(formatMockedCalls(loggerInfoSpy.mock.calls)).toMatchInlineSnapshot(`
          "NOTE: you're trying to migrate an Application - @proj/my-app.
          We apply limited migration steps at the moment."
        `);
      });
    });

    describe(`side effects`, () => {
      it(`should notify user to generate change files`, async () => {
        const sideEffects = await generator(tree, { name: options.name });

        sideEffects();

        expect(console.info).toHaveBeenCalled();
      });
    });
  });

  describe(`tsconfig updates`, () => {
    function getBaseTsConfig() {
      return readJson<TsConfig>(tree, `/tsconfig.base.json`);
    }

    function setup(config: { projectName: string }) {
      const projectConfig = readProjectConfiguration(tree, config.projectName);
      const paths = {
        main: `${projectConfig.root}/tsconfig.json`,
        lib: `${projectConfig.root}/tsconfig.lib.json`,
        test: `${projectConfig.root}/tsconfig.spec.json`,
      };

      const getTsConfig = {
        main: () => readJson<TsConfig>(tree, paths.main),
        lib: () => readJson<TsConfig>(tree, paths.lib),
        test: () => readJson<TsConfig>(tree, paths.test),
      };

      return { projectConfig, paths, getTsConfig };
    }

    it(`should setup TS solution config files`, async () => {
      const { paths, getTsConfig, projectConfig } = setup({ projectName: options.name });
      addConformanceSetup(tree, projectConfig);
      addUnstableSetup(tree, projectConfig);

      let tsConfigMain = getTsConfig.main();

      expect(tsConfigMain).toEqual({
        compilerOptions: {
          baseUrl: '.',
          typeRoots: ['../../node_modules/@types', '../../typings'],
        },
      });
      expect(tree.exists(paths.lib)).toBeFalsy();
      expect(tree.exists(paths.test)).toBeFalsy();

      await generator(tree, options);

      tsConfigMain = getTsConfig.main();
      const tsConfigLib = getTsConfig.lib();
      const tsConfigTest = getTsConfig.test();

      expect(tsConfigMain).toEqual({
        extends: '../../../tsconfig.base.json',
        compilerOptions: {
          importHelpers: true,
          isolatedModules: true,
          jsx: 'react',
          noEmit: true,
          noUnusedLocals: true,
          target: 'ES2019',
          preserveConstEnums: true,
        },
        files: [],
        include: [],
        references: [
          {
            path: './tsconfig.lib.json',
          },
          {
            path: './tsconfig.spec.json',
          },
        ],
      });

      expect(tsConfigLib).toEqual({
        extends: './tsconfig.json',
        compilerOptions: {
          noEmit: false,
          outDir: 'dist',
          declaration: true,
          declarationDir: 'dist/types',
          inlineSources: true,
          lib: ['ES2019', 'dom'],
          types: ['static-assets', 'environment'],
        },
        exclude: ['./src/common/**', '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
        include: ['./src/**/*.ts', './src/**/*.tsx'],
      });
      expect(tsConfigTest).toEqual({
        extends: './tsconfig.json',
        compilerOptions: {
          module: 'CommonJS',
          outDir: 'dist',
          types: ['jest', 'node'],
        },
        include: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
      });
    });

    it(`should setup TS solution config files for JS project`, async () => {
      const { getTsConfig, projectConfig } = setup({ projectName: options.name });
      const sourceRoot = `${projectConfig.root}/src`;
      addConformanceSetup(tree, projectConfig);
      addUnstableSetup(tree, projectConfig);

      visitNotIgnoredFiles(tree, sourceRoot, treePath => {
        const jsPath = treePath.replace(/ts(x)?$/, 'js$1');
        tree.rename(treePath, jsPath);
      });

      await generator(tree, options);

      const tsConfigMain = getTsConfig.main();
      const tsConfigLib = getTsConfig.lib();
      const tsConfigTest = getTsConfig.test();

      expect(tsConfigMain.compilerOptions).toEqual(
        expect.objectContaining({
          allowJs: true,
          checkJs: true,
        }),
      );
      expect(tsConfigMain.compilerOptions.preserveConstEnums).toBeUndefined();
      expect(tsConfigLib.include).toEqual(['./src/**/*.js', './src/**/*.jsx']);
      expect(tsConfigLib.exclude).toEqual(['**/*.spec.js', '**/*.spec.jsx', '**/*.test.js', '**/*.test.jsx']);
      expect(tsConfigTest.include).toEqual([
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.d.ts',
      ]);
    });

    describe('setup additional global types', () => {
      it(`should setup '@testing-library/jest-dom'`, async () => {
        const { getTsConfig, projectConfig } = setup({ projectName: options.name });
        const jestSetupFilePath = `${projectConfig.root}/config/tests.js`;

        append(
          tree,
          jestSetupFilePath,
          stripIndents`
        \n
        require('@testing-library/jest-dom');
        `,
        );

        await generator(tree, options);

        const tsConfigTest = getTsConfig.test();
        expect(tsConfigTest.compilerOptions.types).toContain('@testing-library/jest-dom');
      });
    });

    // eslint-disable-next-line @fluentui/max-len
    it('should update root tsconfig.base.json with migrated package alias including all missing aliases based on packages dependencies list', async () => {
      setupDummyPackage(tree, { name: '@proj/react-make-styles', dependencies: {} });
      setupDummyPackage(tree, { name: '@proj/react-theme', dependencies: {} });
      setupDummyPackage(tree, { name: '@proj/react-utilities', dependencies: {} });

      let rootTsConfig = getBaseTsConfig();

      expect(rootTsConfig).toEqual({
        compilerOptions: {
          paths: {},
        },
      });

      await generator(tree, options);

      rootTsConfig = getBaseTsConfig();

      expect(rootTsConfig.compilerOptions.paths).toEqual(
        expect.objectContaining({
          '@proj/react-dummy': ['packages/react-dummy/src/index.ts'],
          '@proj/react-theme': ['packages/react-theme/src/index.ts'],
          '@proj/react-utilities': ['packages/react-utilities/src/index.ts'],
        }),
      );

      expect(
        Object.keys(
          rootTsConfig.compilerOptions.paths as Required<Pick<TsConfig['compilerOptions'], 'paths'>>['paths'],
        ),
      ).not.toContain(['tslib', 'someThirdPartyDep']);
    });

    it(`should not add 3rd party packages that use same scope as our repo `, async () => {
      const workspaceConfig = readWorkspaceConfiguration(tree);
      const normalizedPkgName = getNormalizedPkgName({ pkgName: options.name, workspaceConfig });
      const thirdPartyPackageName = '@proj/jango-fet';

      updateJson(tree, `./packages/${normalizedPkgName}/package.json`, (json: PackageJson) => {
        json.dependencies = json.dependencies || {};
        json.dependencies[thirdPartyPackageName] = '1.2.3';

        return json;
      });
      updateJson(tree, './package.json', (json: PackageJson) => {
        json.devDependencies = json.devDependencies || {};
        json.devDependencies[thirdPartyPackageName] = '1.2.3';

        return json;
      });

      await generator(tree, options);

      const rootTsConfig = getBaseTsConfig();

      rootTsConfig.compilerOptions.paths = rootTsConfig.compilerOptions.paths || {};

      expect(rootTsConfig.compilerOptions.paths[thirdPartyPackageName]).toBeUndefined();
    });
  });

  describe(`jest config updates`, () => {
    function getProjectJestConfig(projectConfig: ReadProjectConfiguration) {
      return tree.read(`${projectConfig.root}/jest.config.js`)?.toString('utf-8');
    }

    it(`should setup new local jest config which extends from root `, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      let jestConfig = getProjectJestConfig(projectConfig);

      // Why not inline snapshot? -> this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
      expect(jestConfig).toMatchSnapshot();

      await generator(tree, options);

      jestConfig = getProjectJestConfig(projectConfig);

      expect(jestConfig).toMatchInlineSnapshot(`
        "// @ts-check

        /**
        * @type {import('@jest/types').Config.InitialOptions}
        */
        module.exports = {
        displayName: 'react-dummy',
        preset: '../../../jest.preset.js',
        globals: {
        'ts-jest': {
        tsConfig: '<rootDir>/tsconfig.spec.json',
        diagnostics: false,
        },
        },
        transform: {
        '^.+\\\\\\\\.tsx?$': 'ts-jest',
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@griffel/jest-serializer'],
        };"
      `);
    });

    it(`should add 'snapshotSerializers' to jest.config.js only when needed`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      function removePkgDependenciesThatTriggerSnapshotSerializersAddition() {
        const packagesThatTriggerAddingSnapshots = ['@griffel/react'];

        updateJson(tree, `${projectConfig.root}/package.json`, (json: PackageJson) => {
          packagesThatTriggerAddingSnapshots.forEach(pkgName => {
            delete (json.dependencies ?? {})[pkgName];
          });

          return json;
        });
      }

      removePkgDependenciesThatTriggerSnapshotSerializersAddition();

      await generator(tree, options);

      const jestConfig = getProjectJestConfig(projectConfig);

      expect(jestConfig).not.toContain('snapshotSerializers');
    });

    it(`should create local ./config/tests.js file if missing that is used for "setupFilesAfterEnv"`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const jestSetupFilePath = `${projectConfig.root}/config/tests.js`;
      function getJestSetupFile() {
        return tree.read(jestSetupFilePath)?.toString('utf-8');
      }

      tree.delete(jestSetupFilePath);
      expect(tree.exists(jestSetupFilePath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(jestSetupFilePath)).toBeTruthy();
      expect(getJestSetupFile()).toMatchInlineSnapshot(`"/** Jest test setup file. */"`);
    });
  });

  describe(`storybook updates`, () => {
    function setup(config: Partial<{ createDummyStories: boolean }> = {}) {
      const workspaceConfig = readWorkspaceConfiguration(tree);
      const projectConfig = readProjectConfiguration(tree, options.name);
      const normalizedProjectName = options.name.replace(`@${workspaceConfig.npmScope}/`, '');
      const projectStorybookConfigPath = `${projectConfig.root}/.storybook`;

      const normalizedProjectNameNamesVariants = names(normalizedProjectName);
      const paths = {
        storyOne: `${projectConfig.root}/src/${normalizedProjectNameNamesVariants.className}.stories.tsx`,
        storyTwo: `${projectConfig.root}/src/${normalizedProjectNameNamesVariants.className}Other.stories.tsx`,
        tsconfig: {
          storybook: `${projectStorybookConfigPath}/tsconfig.json`,
          main: `${projectConfig.root}/tsconfig.json`,
          lib: `${projectConfig.root}/tsconfig.lib.json`,
          test: `${projectConfig.root}/tsconfig.spec.json`,
        },
      };

      if (config.createDummyStories) {
        tree.write(
          paths.storyOne,
          stripIndents`
         import * as Implementation from './index';
         export const Foo = (props: FooProps) => { return <div>Foo</div>; }
        `,
        );

        tree.write(
          paths.storyTwo,
          stripIndents`
         import * as Implementation from './index';
         export const FooOther = (props: FooPropsOther) => { return <div>FooOther</div>; }
        `,
        );
      }

      return {
        paths,
        projectConfig,
        workspaceConfig,
        normalizedProjectName,
        projectStorybookConfigPath,
      };
    }
    it(`should setup package storybook when needed`, async () => {
      const { projectStorybookConfigPath, paths, projectConfig } = setup({ createDummyStories: true });
      addConformanceSetup(tree, projectConfig);

      expect(tree.exists(projectStorybookConfigPath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(projectStorybookConfigPath)).toBeTruthy();

      expect(readJson(tree, paths.tsconfig.storybook)).toEqual({
        extends: '../tsconfig.json',
        compilerOptions: {
          allowJs: true,
          checkJs: true,
          outDir: '',
          types: ['static-assets', 'environment', 'storybook__addons'],
        },
        include: ['../src/**/*.stories.ts', '../src/**/*.stories.tsx', '*.js'],
      });
      expect(readJson<TsConfig>(tree, paths.tsconfig.lib).exclude).toEqual(
        expect.arrayContaining(['**/*.stories.ts', '**/*.stories.tsx']),
      );
      expect(readJson<TsConfig>(tree, paths.tsconfig.main).references).toEqual(
        expect.arrayContaining([
          {
            path: './.storybook/tsconfig.json',
          },
        ]),
      );

      expect(tree.read(`${projectStorybookConfigPath}/main.js`)?.toString('utf-8')).toMatchInlineSnapshot(`
        "const rootMain = require('../../../../.storybook/main');

        module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
        ...rootMain,
        stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
        addons: [...rootMain.addons],
        webpackFinal: (config, options) => {
        const localConfig = { ...rootMain.webpackFinal(config, options) };

        // add your own webpack tweaks if needed

        return localConfig;
        },
        });"
      `);

      expect(tree.read(`${projectStorybookConfigPath}/preview.js`)?.toString('utf-8')).toMatchInlineSnapshot(`
        "import * as rootPreview from '../../../../.storybook/preview';

        /** @type {typeof rootPreview.decorators} */
        export const decorators = [...rootPreview.decorators];

        /** @type {typeof rootPreview.parameters} */
        export const parameters = { ...rootPreview.parameters };"
      `);
    });

    it(`should remove unused existing storybook setup`, async () => {
      const { projectStorybookConfigPath, projectConfig, paths } = setup({ createDummyStories: false });

      const mainJsFilePath = `${projectStorybookConfigPath}/main.js`;
      const packageJsonPath = `${projectConfig.root}/package.json`;

      let pkgJson: PackageJson = readJson(tree, packageJsonPath);

      tree.write(mainJsFilePath, 'module.exports = {}');

      // artificially add storybook scripts
      updateJson(tree, packageJsonPath, (json: PackageJson) => {
        json.scripts = json.scripts || {};

        Object.assign(json.scripts, {
          start: 'echo "hello"',
          storybook: 'echo "hello"',
          'build-storybook': 'echo "hello"',
        });
        return json;
      });

      // artificially add storybook to project references
      updateJson(tree, paths.tsconfig.main, (json: TsConfig) => {
        json.references = json.references || [];
        json.references.push({ path: './.storybook/tsconfig.json' });
        return json;
      });
      // artificially add stories globs to exclude
      writeJson<TsConfig>(tree, paths.tsconfig.lib, {
        compilerOptions: {},
        exclude: ['../src/common/**', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.ts', '**/*.stories.tsx'],
      });
      // artificially create spec ts config
      writeJson<TsConfig>(tree, paths.tsconfig.test, {
        compilerOptions: {},
        include: ['**/*.test.ts', '**/*.test.tsx'],
      });

      pkgJson = readJson(tree, packageJsonPath);

      expect(tree.exists(projectStorybookConfigPath)).toBeTruthy();
      expect(tree.exists(mainJsFilePath)).toBeTruthy();

      await generator(tree, options);

      expect(tree.exists(mainJsFilePath)).toBeFalsy();
      expect(Object.keys(pkgJson.scripts || [])).not.toContain(['start', 'storybook', 'build-storybook']);
      expect(tree.exists(projectStorybookConfigPath)).toBeFalsy();
      expect(readJson<TsConfig>(tree, paths.tsconfig.lib).exclude).not.toEqual(
        expect.arrayContaining(['**/*.stories.ts', '**/*.stories.tsx']),
      );
      expect(readJson<TsConfig>(tree, paths.tsconfig.main).references).not.toEqual(
        expect.arrayContaining([
          {
            path: './.storybook/tsconfig.json',
          },
        ]),
      );
    });

    it(`should remove @ts-ignore pragmas from all stories`, async () => {
      const { paths } = setup({ createDummyStories: true });
      // this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
      const template = fs.readFileSync(path.join(__dirname, '__fixtures__', 'ts-ignore-story.ts__tmpl__'), 'utf-8');
      append(tree, paths.storyOne, template);

      await generator(tree, options);

      // Why not inline snapshot? -> this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
      expect(tree.read(paths.storyOne)?.toString('utf-8')).toMatchSnapshot();
    });
  });

  describe(`e2e config`, () => {
    function setup(config: { projectName: string }) {
      const projectConfig = readProjectConfiguration(tree, config.projectName);
      const paths = {
        e2eRoot: `${projectConfig.root}/e2e`,
        packageJson: `${projectConfig.root}/package.json`,
        tsconfig: {
          main: `${projectConfig.root}/tsconfig.json`,
          lib: `${projectConfig.root}/tsconfig.lib.json`,
          test: `${projectConfig.root}/tsconfig.spec.json`,
          e2e: `${projectConfig.root}/e2e/tsconfig.json`,
        },
      };

      function createE2eSetup() {
        writeJson<TsConfig>(tree, paths.tsconfig.e2e, {
          extends: '../../tsconfig.base.json',
          compilerOptions: {},
        });
        tree.write(
          `${paths.e2eRoot}/index.e2e.ts`,
          stripIndents`
         describe('E2E test', () => {
           before(() => {
            cy.visitStorybook();
           });
         });
        `,
        );

        return tree;
      }

      return { projectConfig, paths, createE2eSetup };
    }
    it(`should do nothing if e2e setup is missing`, async () => {
      const { paths } = setup({ projectName: options.name });

      await generator(tree, { name: options.name });

      expect(tree.exists(paths.tsconfig.e2e)).toBeFalsy();
    });

    it(`should setup e2e if present`, async () => {
      const { paths, createE2eSetup } = setup({ projectName: options.name });

      createE2eSetup();

      expect(tree.exists(paths.tsconfig.e2e)).toBeTruthy();

      await generator(tree, { name: options.name });

      // // TS Updates
      const e2eTsConfig: TsConfig = readJson(tree, paths.tsconfig.e2e);
      const mainTsConfig: TsConfig = readJson(tree, paths.tsconfig.main);

      expect(e2eTsConfig).toEqual({
        extends: '../tsconfig.json',
        compilerOptions: {
          isolatedModules: false,
          lib: ['ES2019', 'dom'],
          types: ['node', 'cypress', 'cypress-storybook/cypress', 'cypress-real-events'],
        },
        include: ['**/*.ts', '**/*.tsx'],
      });
      expect(mainTsConfig.references).toEqual(expect.arrayContaining([{ path: './e2e/tsconfig.json' }]));

      // package.json updates
      const packageJson: PackageJson = readJson(tree, paths.packageJson);
      expect(packageJson.scripts).toEqual(expect.objectContaining({ e2e: 'e2e' }));
    });
  });

  describe(`api-extractor.json updates`, () => {
    it(`should create api-extractor.json`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.json`)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.json`)).toBeTruthy();
    });

    it(`should create api-extractor.local.json for scripts:docs task consumption`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.local.json`)).toBeFalsy();

      await generator(tree, options);

      /* eslint-disable @fluentui/max-len */
      expect(readJson(tree, `${projectConfig.root}/config/api-extractor.local.json`)).toMatchInlineSnapshot(`
        Object {
          "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
          "extends": "./api-extractor.json",
          "mainEntryPointFilePath": "<projectFolder>/dist/types/packages/react-components/<unscopedPackageName>/src/index.d.ts",
        }
      `);
      /* eslint-enable @fluentui/max-len */
    });
  });

  describe('package.json updates', () => {
    it(`should update rolluped typings source`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);
      expect(pkgJson.typings).toEqual('lib/index.d.ts');

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);
      expect(pkgJson.typings).toEqual('dist/index.d.ts');
    });

    it(`should update package npm scripts`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts).toMatchInlineSnapshot(`
        Object {
          "build": "just-scripts build",
          "clean": "just-scripts clean",
          "code-style": "just-scripts code-style",
          "just": "just-scripts",
          "lint": "just-scripts lint",
          "start": "just-scripts dev:storybook",
          "start-test": "just-scripts jest-watch",
          "test": "just-scripts test",
          "test:watch": "just-scripts jest-watch",
          "update-snapshots": "just-scripts jest -u",
        }
      `);

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts).toEqual({
        docs: 'api-extractor run --config=config/api-extractor.local.json --local',
        // eslint-disable-next-line @fluentui/max-len
        'build:local': `tsc -p ./tsconfig.lib.json --module esnext --emitDeclarationOnly && node ../../../scripts/typescript/normalize-import --output ./dist/types/packages/react-components/react-dummy/src && yarn docs`,
        build: 'just-scripts build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'yarn storybook',
        storybook: 'node ../../../scripts/storybook/runner',
        test: 'jest --passWithNoTests',
        'type-check': 'tsc -b tsconfig.json',
      });
    });

    it(`should not add start scripts to node packages`, async () => {
      const nodePackageName = getScopedPkgName(tree, 'babel-make-styles');
      const projectConfig = readProjectConfiguration(tree, nodePackageName);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts.start).toBeDefined();
      expect(pkgJson.scripts['start-test']).toBeDefined();

      await generator(tree, {
        name: nodePackageName,
      });

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts.start).not.toBeDefined();
      expect(pkgJson.scripts['start-test']).not.toBeDefined();
    });
  });

  describe(`npm config setup`, () => {
    it(`should update .npmignore config`, async () => {
      function getNpmIgnoreConfig(projectConfig: ReadProjectConfiguration) {
        return tree.read(`${projectConfig.root}/.npmignore`)?.toString('utf-8');
      }
      const projectConfig = readProjectConfiguration(tree, options.name);
      let npmIgnoreConfig = getNpmIgnoreConfig(projectConfig);

      expect(npmIgnoreConfig).toMatchInlineSnapshot(`
        "*.api.json
        *.config.js
        *.log
        *.nuspec
        *.test.*
        *.yml
        .editorconfig
        .eslintrc*
        .eslintcache
        .gitattributes
        .gitignore
        .vscode
        coverage
        dist/storybook
        dist/*.stats.html
        dist/*.stats.json
        dist/demo
        fabric-test*
        gulpfile.js
        images
        index.html
        jsconfig.json
        node_modules
        results
        src/**/*
        !src/**/examples/*.tsx
        !src/**/docs/**/*.md
        !src/**/*.types.ts
        temp
        tsconfig.json
        tsd.json
        tslint.json
        typings
        visualtests"
      `);

      await generator(tree, options);

      npmIgnoreConfig = getNpmIgnoreConfig(projectConfig);

      expect(npmIgnoreConfig).toMatchInlineSnapshot(`
        ".storybook/
        .vscode/
        bundle-size/
        config/
        coverage/
        e2e/
        etc/
        node_modules/
        src/
        dist/types/
        temp/
        __fixtures__
        __mocks__
        __tests__

        *.api.json
        *.log
        *.spec.*
        *.stories.*
        *.test.*
        *.yml

        # config files
        *config.*
        *rc.*
        .editorconfig
        .eslint*
        .git*
        .prettierignore
        "
      `);
    });
  });

  describe(`babel config setup`, () => {
    function getBabelConfig(projectConfig: ReadProjectConfiguration) {
      const babelConfigPath = `${projectConfig.root}/.babelrc.json`;
      return readJson(tree, babelConfigPath);
    }

    it(`should setup .babelrc.json`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      await generator(tree, options);
      let babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        presets: ['@griffel'],
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      tree.delete(`${projectConfig.root}/.babelrc.json`);

      await generator(tree, options);
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        presets: ['@griffel'],
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });
    });

    it(`should add @griffel/babel-preset only if needed`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);

      updateJson(tree, `${projectConfig.root}/package.json`, (json: PackageJson) => {
        if (json.dependencies) {
          delete json.dependencies['@griffel/react'];
        }

        return json;
      });

      let babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        presets: ['@griffel'],
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      await generator(tree, options);
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        presets: [],
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      projectConfig = readProjectConfiguration(tree, '@proj/babel-make-styles');
      await generator(tree, { name: '@proj/babel-make-styles' });
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        presets: [],
        plugins: ['annotate-pure-calls'],
      });
    });
  });

  describe(`nx workspace updates`, () => {
    it(`should set project 'sourceRoot' in workspace.json`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.sourceRoot).toBe(undefined);

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.sourceRoot).toBe(`${projectConfig.root}/src`);
    });

    it(`should set project 'implicitDependencies' in workspace.json`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.implicitDependencies).toBe(undefined);

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.implicitDependencies).toEqual([]);
    });

    it(`should set project 'vNext' and 'platform:web' tag in nx.json if its a web package`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);
      expect(projectConfig.tags).toBe(undefined);

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.tags).toEqual(['vNext', 'platform:web']);
    });

    it(`should set project 'platform:node' tag in nx.json if its a node package`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);
      expect(projectConfig.tags).toBe(undefined);

      updateJson(tree, `${projectConfig.root}/package.json`, (json: PackageJson) => {
        json.scripts = json.scripts || {};
        json.scripts.build = 'just-scripts build --commonjs';
        return json;
      });

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.tags).toEqual(['vNext', 'platform:node']);
    });

    it(`should update project tags in nx.json if they already exist`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);

      updateProjectConfiguration(tree, options.name, { ...projectConfig, tags: ['vNext'] });
      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.tags).toEqual(['vNext']);

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.tags).toEqual(['vNext', 'platform:web']);
    });
  });

  describe(`--stats`, () => {
    it(`should print project names and count of how many have been migrated`, async () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');

      await generator(tree, { stats: true });

      expect(loggerInfoSpy).toHaveBeenCalled();
    });
  });

  describe(`--all`, () => {
    beforeEach(() => {
      setupDummyPackage(tree, { name: '@proj/react-foo', version: '9.0.22' });
      setupDummyPackage(tree, { name: '@proj/react-bar', version: '9.0.31' });
      setupDummyPackage(tree, { name: '@proj/react-moo', version: '9.0.12' });
      setupDummyPackage(tree, { name: '@proj/react-old', version: '8.0.1' });
    });

    it(`should run migration on all vNext packages in batch`, async () => {
      const projects = [
        options.name,
        '@proj/react-foo',
        '@proj/react-bar',
        '@proj/react-moo',
        '@proj/react-old',
      ] as const;

      await generator(tree, { all: true });

      const configs = projects.reduce((acc, projectName) => {
        acc[projectName] = readProjectConfiguration(tree, projectName);

        return acc;
      }, {} as Record<typeof projects[number], ReadProjectConfiguration>);

      expect(configs['@proj/react-foo'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-bar'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-moo'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-dummy'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-old'].sourceRoot).not.toBeDefined();
    });
  });

  describe(`--name`, () => {
    it(`should accept comma separated string to exec on multiple projects`, async () => {
      const projects = [options.name, '@proj/react-one', '@proj/react-two', '@proj/react-old'] as const;

      setupDummyPackage(tree, { name: projects[1], version: '9.0.22' });
      setupDummyPackage(tree, { name: projects[2], version: '9.0.31' });
      setupDummyPackage(tree, { name: projects[3], version: '8.0.1' });

      await generator(tree, { name: `${projects[0]},${projects[1]}` });

      const configs = projects.reduce((acc, projectName) => {
        acc[projectName] = readProjectConfiguration(tree, projectName);

        return acc;
      }, {} as Record<typeof projects[number], ReadProjectConfiguration>);

      expect(configs[projects[0]].sourceRoot).toBeDefined();
      expect(configs[projects[1]].sourceRoot).toBeDefined();
      expect(configs[projects[2]].sourceRoot).not.toBeDefined();
      expect(configs[projects[3]].sourceRoot).not.toBeDefined();
    });
  });

  describe(`--owner`, () => {
    it(`should not do anything if not specified`, async () => {
      const before = tree.read(workspacePaths.github.codeowners, 'utf8');
      await generator(tree, { name: options.name });
      const after = tree.read(workspacePaths.github.codeowners, 'utf8');

      expect(after).toEqual(before);
    });

    it(`should add owner of particular package to CODEOWNERS`, async () => {
      await generator(tree, { name: options.name, owner: '@org/team-awesome' });

      const content = tree.read(workspacePaths.github.codeowners, 'utf8');

      expect(content).toContain(`packages/react-dummy @org/team-awesome`);
    });
  });
});

// ==== helpers ====

function getScopedPkgName(tree: Tree, pkgName: string) {
  const workspaceConfig = readWorkspaceConfiguration(tree);

  return `@${workspaceConfig.npmScope}/${pkgName}`;
}

function setupDummyPackage(
  tree: Tree,
  options: AssertedSchema &
    Partial<{
      version: string;
      dependencies: Record<string, string>;
      tsConfig: TsConfig;
      babelConfig: Partial<{ presets: string[]; plugins: string[] }>;
      projectConfiguration: Partial<ReadProjectConfiguration>;
    }>,
) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const defaults = {
    version: '9.0.0-alpha.40',
    dependencies: {
      [`@griffel/react`]: '1.0.0',
      [`@${workspaceConfig.npmScope}/react-theme`]: '^9.0.0-alpha.13',
      [`@${workspaceConfig.npmScope}/react-utilities`]: '^9.0.0-alpha.25',
      tslib: '^2.1.0',
      someThirdPartyDep: '^11.1.2',
    },
    babelConfig: {
      presets: ['@griffel'],
      plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
    },
    tsConfig: { compilerOptions: { baseUrl: '.', typeRoots: ['../../node_modules/@types', '../../typings'] } },
  };

  const normalizedOptions = { ...defaults, ...options };
  const pkgName = normalizedOptions.name;
  const normalizedPkgName = getNormalizedPkgName({ pkgName, workspaceConfig });
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  const templates = {
    packageJson: {
      name: pkgName,
      version: normalizedOptions.version,
      typings: 'lib/index.d.ts',
      scripts: {
        build: 'just-scripts build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'just-scripts dev:storybook',
        'start-test': 'just-scripts jest-watch',
        test: 'just-scripts test',
        'test:watch': 'just-scripts jest-watch',
        'update-snapshots': 'just-scripts jest -u',
      },
      dependencies: normalizedOptions.dependencies,
    },
    tsConfig: {
      ...normalizedOptions.tsConfig,
    },
    jestConfig: stripIndents`
      const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
      const path = require('path');

      const config = createConfig({
        setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
        snapshotSerializers: ['@griffel/jest-serializer'],
      });

      module.exports = config;
    `,
    jestSetupFile: stripIndents`
     /** Jest test setup file. */
    `,
    npmConfig: stripIndents`
      *.api.json
      *.config.js
      *.log
      *.nuspec
      *.test.*
      *.yml
      .editorconfig
      .eslintrc*
      .eslintcache
      .gitattributes
      .gitignore
      .vscode
      coverage
      dist/storybook
      dist/*.stats.html
      dist/*.stats.json
      dist/demo
      fabric-test*
      gulpfile.js
      images
      index.html
      jsconfig.json
      node_modules
      results
      src/**/*
      !src/**/examples/*.tsx
      !src/**/docs/**/*.md
      !src/**/*.types.ts
      temp
      tsconfig.json
      tsd.json
      tslint.json
      typings
      visualtests
    `,
    babelConfig: {
      ...normalizedOptions.babelConfig,
    },
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${paths.root}/.babelrc.json`, serializeJson(templates.babelConfig));
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

function addConformanceSetup(tree: Tree, projectConfig: ReadProjectConfiguration) {
  tree.write(
    `${projectConfig.root}/src/common/isConformant.ts`,
    stripIndents`
          import { isConformant as baseIsConformant } from '@fluentui/react-conformance';

          export function isConformant<TProps = {}>(
            testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string }
          ){}
        `,
  );
}

function addUnstableSetup(tree: Tree, projectConfig: ReadProjectConfiguration) {
  const unstableRootPath = `${projectConfig.root}/src/unstable`;
  writeJson(tree, `${unstableRootPath}/package.json`, {
    description: 'Separate entrypoint for unstable version',
    main: '../lib-commonjs/unstable/index.js',
    module: '../lib/unstable/index.js',
    typings: '../lib/unstable/index.d.ts',
    sideEffects: false,
    license: 'MIT',
  });
  writeJson(tree, `${unstableRootPath}/tsconfig.json`, { extends: '../../tsconfig.json', include: ['index.ts'] });

  tree.write(
    `${unstableRootPath}/index.ts`,
    stripIndents`
    // Stub for unstable exports

    export {}
  `,
  );
}

function append(tree: Tree, filePath: string, content: string) {
  if (!tree.exists(filePath)) {
    throw new Error(`${filePath} doesn't exists`);
  }

  tree.write(
    filePath,
    stripIndents`
        ${tree.read(filePath)?.toString('utf-8')}\n
        ${content}
        `,
  );

  return tree;
}

function getNormalizedPkgName(options: { pkgName: string; workspaceConfig: WorkspaceConfiguration }) {
  return options.pkgName.replace(`@${options.workspaceConfig.npmScope}/`, '');
}
