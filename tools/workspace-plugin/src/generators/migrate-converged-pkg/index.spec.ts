import Enquirer from 'enquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  stripIndents,
  addProjectConfiguration,
  updateJson,
  logger,
  updateProjectConfiguration,
  serializeJson,
  names,
  visitNotIgnoredFiles,
  writeJson,
  ProjectConfiguration,
  joinPathFragments,
} from '@nx/devkit';

import { PackageJson, TsConfig } from '../../types';
import { disableChalk, formatMockedCalls, setupCodeowners } from '../../utils-testing';

import generator from './index';
import { MigrateConvergedPkgGeneratorSchema } from './schema';
import { getProjectNameWithoutScope, getWorkspaceConfig, workspacePaths } from '../../utils';

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
      tsConfig: { extends: '../../../../tsconfig.base.json', compilerOptions: {}, include: ['src'] },
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
          `[Error: Cannot find configuration for '@proj/non-existent-lib']`,
        );
      });

      it(`should throw error if user wants migrate non converged package`, async () => {
        const projectConfig = readProjectConfiguration(tree, options.name);
        updateJson(tree, `${projectConfig.root}/package.json`, json => {
          json.version = '8.0.0';
          return json;
        });

        await expect(generator(tree, options)).rejects.toMatchInlineSnapshot(
          `[Error: @proj/react-dummy is not converged package. Make sure to run the migration on packages with version 9.x.x]`,
        );
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
          typeRoots: ['../../../../node_modules/@types', '../../../../typings'],
        },
      });
      expect(tree.exists(paths.lib)).toBeFalsy();
      expect(tree.exists(paths.test)).toBeFalsy();

      await generator(tree, options);

      tsConfigMain = getTsConfig.main();
      const tsConfigLib = getTsConfig.lib();
      const tsConfigTest = getTsConfig.test();

      expect(tsConfigMain).toEqual({
        extends: '../../tsconfig.base.json',
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
          outDir: '../../dist/out-tsc',
          declaration: true,
          declarationDir: '../../dist/out-tsc/types',
          inlineSources: true,
          lib: ['ES2019', 'dom'],
          types: ['static-assets', 'environment'],
        },
        exclude: ['./src/testing/**', '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
        include: ['./src/**/*.ts', './src/**/*.tsx'],
      });
      expect(tsConfigTest).toEqual({
        extends: './tsconfig.json',
        compilerOptions: {
          module: 'CommonJS',
          outDir: 'dist',
          types: ['jest', 'node'],
        },
        include: [
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.d.ts',
          './src/testing/**/*.ts',
          './src/testing/**/*.tsx',
        ],
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
      const normalizedPkgName = getProjectNameWithoutScope(options.name);
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
          preset: '../../jest.preset.js',
          transform: {
            '^.+\\\\\\\\.tsx?$': [
              'ts-jest',
              {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                isolatedModules: true,
              },
            ],
          },
          coverageDirectory: './coverage',
          setupFilesAfterEnv: ['./config/tests.js'],
          snapshotSerializers: ['@griffel/jest-serializer'],
        };
        "
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
      expect(getJestSetupFile()).toMatchInlineSnapshot(`
        "/** Jest test setup file. */
        "
      `);
    });
  });

  describe(`storybook updates`, () => {
    function setup(config: Partial<{ createDummyStories: boolean }> = {}) {
      const workspaceConfig = getWorkspaceConfig(tree);
      const projectConfig = readProjectConfiguration(tree, options.name);
      const normalizedProjectName = options.name.replace(`@${workspaceConfig.npmScope}/`, '');
      const projectStorybookConfigPath = `${projectConfig.root}/.storybook`;

      const normalizedProjectNameNamesVariants = names(normalizedProjectName);
      const paths = {
        storyOne: `${projectConfig.root}/stories/${normalizedProjectNameNamesVariants.className}.stories.tsx`,
        storyTwo: `${projectConfig.root}/stories/${normalizedProjectNameNamesVariants.className}Other.stories.tsx`,
        tsconfig: {
          storybook: `${projectStorybookConfigPath}/tsconfig.json`,
          main: `${projectConfig.root}/tsconfig.json`,
          lib: `${projectConfig.root}/tsconfig.lib.json`,
          test: `${projectConfig.root}/tsconfig.spec.json`,
        },
        packageJson: `${projectConfig.root}/package.json`,
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

      expect(readJson(tree, paths.packageJson).scripts).toEqual(
        expect.objectContaining({
          start: 'yarn storybook',
          storybook: 'start-storybook',
        }),
      );

      expect(readJson(tree, paths.tsconfig.storybook)).toEqual({
        extends: '../tsconfig.json',
        compilerOptions: {
          allowJs: true,
          checkJs: true,
          outDir: '',
          types: ['static-assets', 'environment', 'storybook__addons'],
        },
        include: ['../stories/**/*.stories.ts', '../stories/**/*.stories.tsx', '*.js'],
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
        "const rootMain = require('../../../.storybook/main');

        module.exports =
          /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
            ...rootMain,
            stories: [
              ...rootMain.stories,
              '../stories/**/*.stories.mdx',
              '../stories/**/index.stories.@(ts|tsx)',
            ],
            addons: [...rootMain.addons],
            webpackFinal: (config, options) => {
              const localConfig = { ...rootMain.webpackFinal(config, options) };

              // add your own webpack tweaks if needed

              return localConfig;
            },
          });
        "
      `);

      expect(tree.read(`${projectStorybookConfigPath}/preview.js`)?.toString('utf-8')).toMatchInlineSnapshot(`
        "import * as rootPreview from '../../../.storybook/preview';

        /** @type {typeof rootPreview.decorators} */
        export const decorators = [...rootPreview.decorators];

        /** @type {typeof rootPreview.parameters} */
        export const parameters = { ...rootPreview.parameters };
        "
      `);
    });

    it(`should remove unused existing storybook setup`, async () => {
      const { projectStorybookConfigPath, projectConfig, paths } = setup({ createDummyStories: false });

      const mainJsFilePath = `${projectStorybookConfigPath}/main.js`;
      const packageJsonPath = `${projectConfig.root}/package.json`;

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
        exclude: ['../src/testing/**', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.ts', '**/*.stories.tsx'],
      });
      // artificially create spec ts config
      writeJson<TsConfig>(tree, paths.tsconfig.test, {
        compilerOptions: {},
        include: ['**/*.test.ts', '**/*.test.tsx'],
      });

      const pkgJson: PackageJson = readJson(tree, packageJsonPath);

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
      const template = getFixture('ts-ignore-story.ts__tmpl__');
      append(tree, paths.storyOne, template);

      await generator(tree, options);

      // Why not inline snapshot? -> this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
      expect(tree.read(paths.storyOne)?.toString('utf-8')).toMatchSnapshot();
    });

    it(`should move existing stories to the root stories subfolder`, async () => {
      const { projectConfig } = setup({ createDummyStories: true });
      const oldStoriesPath = `${projectConfig.root}/src/stories`;
      const newStoriesPath = `${projectConfig.root}/stories`;
      const storyFiles: string[] = [];

      visitNotIgnoredFiles(tree, oldStoriesPath, treePath => {
        if (treePath.includes('.stories.')) {
          storyFiles.push(path.basename(treePath));
        }
      });

      storyFiles.forEach(story => {
        expect(tree.exists(`${oldStoriesPath}/${story}`)).toBeTruthy();
      });
      storyFiles.forEach(story => {
        expect(tree.exists(`${newStoriesPath}/${story}`)).toBeFalsy();
      });

      updateProjectConfiguration(tree, options.name, { ...projectConfig, sourceRoot: `${projectConfig.root}/src` });

      await generator(tree, { name: options.name });

      storyFiles.forEach(story => {
        expect(tree.exists(`${oldStoriesPath}/${story}`)).toBeFalsy();
      });
      storyFiles.forEach(story => {
        expect(tree.exists(`${newStoriesPath}/${story}`)).toBeTruthy();
      });
    });
  });

  describe(`cypress config`, () => {
    function setup(config: { projectName: string }) {
      const projectConfig = readProjectConfiguration(tree, config.projectName);
      const paths = {
        packageJson: `${projectConfig.root}/package.json`,
        tsconfig: {
          main: `${projectConfig.root}/tsconfig.json`,
          lib: `${projectConfig.root}/tsconfig.lib.json`,
          test: `${projectConfig.root}/tsconfig.spec.json`,
          cypress: `${projectConfig.root}/tsconfig.cy.json`,
        },
      };

      function createCypressSetup() {
        writeJson<TsConfig>(tree, paths.tsconfig.cypress, {
          extends: '../../../../tsconfig.base.json',
          compilerOptions: {},
        });
        tree.write(
          `${projectConfig.sourceRoot}/components/index.cy.ts`,
          stripIndents`
         describe('Cypress test', () => {
           before(() => {
            cy.visitStorybook();
           });
         });
        `,
        );

        return tree;
      }

      return { projectConfig, paths, createCypressSetup };
    }
    it(`should do nothing if cypress setup is missing`, async () => {
      const { paths } = setup({ projectName: options.name });

      await generator(tree, { name: options.name });

      expect(tree.exists(paths.tsconfig.cypress)).toBeFalsy();
    });

    it(`should setup cypress if present`, async () => {
      const { paths, createCypressSetup } = setup({ projectName: options.name });

      createCypressSetup();

      expect(tree.exists(paths.tsconfig.cypress)).toBeTruthy();

      await generator(tree, { name: options.name });

      // // TS Updates
      const cypressTsConfig: TsConfig = readJson(tree, paths.tsconfig.cypress);
      const mainTsConfig: TsConfig = readJson(tree, paths.tsconfig.main);
      const libTsConfig: TsConfig = readJson(tree, paths.tsconfig.lib);

      expect(cypressTsConfig).toEqual({
        extends: './tsconfig.json',
        compilerOptions: {
          isolatedModules: false,
          lib: ['ES2019', 'dom'],
          types: ['node', 'cypress', 'cypress-storybook/cypress', 'cypress-real-events'],
        },
        include: ['**/*.cy.ts', '**/*.cy.tsx'],
      });
      expect(mainTsConfig.references).toEqual(expect.arrayContaining([{ path: './tsconfig.cy.json' }]));
      expect(libTsConfig.exclude).toEqual(expect.arrayContaining(['**/*.cy.ts', '**/*.cy.tsx']));

      // package.json updates
      const packageJson: PackageJson = readJson(tree, paths.packageJson);
      expect(packageJson.scripts).toEqual(
        expect.objectContaining({ e2e: 'cypress run --component', 'e2e:local': 'cypress open --component' }),
      );
    });
  });

  describe(`api-extractor.json updates`, () => {
    it(`should create api-extractor.json`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const apiExtractorConfigPath = `${projectConfig.root}/config/api-extractor.json`;

      expect(tree.exists(apiExtractorConfigPath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(apiExtractorConfigPath)).toBeTruthy();
      expect(readJson(tree, apiExtractorConfigPath)).toMatchInlineSnapshot(`
        Object {
          "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
          "extends": "@fluentui/scripts-api-extractor/api-extractor.common.v-next.json",
        }
      `);
    });

    it(`should remove api-extractor.local.json if present`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const apiExtractorLocalPath = `${projectConfig.root}/config/api-extractor.local.json`;

      expect(tree.exists(apiExtractorLocalPath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(apiExtractorLocalPath)).toBeFalsy();

      writeJson(tree, apiExtractorLocalPath, {});

      await generator(tree, options);

      expect(tree.exists(apiExtractorLocalPath)).toBeFalsy();
    });
  });

  describe('package.json updates', () => {
    it(`should update rolluped typings source`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);
      expect(pkgJson.typings).toEqual('lib/index.d.ts');

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);
      expect(pkgJson.typings).toEqual('./dist/index.d.ts');
    });

    it(`should update dependencies`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.dependencies.tslib).toBeDefined();
      expect(pkgJson.dependencies?.['@swc/helpers']).not.toBeDefined();

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.dependencies.tslib).not.toBeDefined();
      expect(pkgJson.dependencies?.['@swc/helpers']).toBeDefined();
    });

    it(`should update package npm scripts`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      const pkgJsonPath = `${projectConfig.root}/package.json`;
      updateJson(tree, pkgJsonPath, json => {
        json.scripts.docs = 'api-extractor run --config=config/api-extractor.local.json --local';
        json.scripts['build:local'] =
          'tsc -p ./tsconfig.lib.json --module esnext --emitDeclarationOnly && node ../../../scripts/typescript/normalize-import --output ./dist/types/packages/react-components && yarn docs';
        return json;
      });
      let pkgJson = readJson(tree, pkgJsonPath);

      expect(pkgJson.scripts).toMatchInlineSnapshot(`
        Object {
          "build": "just-scripts build",
          "build:local": "tsc -p ./tsconfig.lib.json --module esnext --emitDeclarationOnly && node ../../../scripts/typescript/normalize-import --output ./dist/types/packages/react-components && yarn docs",
          "clean": "just-scripts clean",
          "code-style": "just-scripts code-style",
          "docs": "api-extractor run --config=config/api-extractor.local.json --local",
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
        'generate-api': 'just-scripts generate-api',
        build: 'just-scripts build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        test: 'jest --passWithNoTests',
        'type-check': 'tsc -b tsconfig.json',
      });

      // verify test-ssr addition
      updateProjectConfiguration(tree, options.name, { ...projectConfig, tags: ['platform:web'] });
      tree.write(joinPathFragments(projectConfig.root, 'stories/Foo/Foo.stories.tsx'), 'export {}');

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts).toEqual(
        expect.objectContaining({
          'test-ssr': 'test-ssr "./stories/**/*.stories.tsx"',
        }),
      );
    });

    describe(`export-maps`, () => {
      it(`should update exports map`, async () => {
        const { getPackageJson } = updatePackageJson(tree, {
          projectName: options.name,
          jsonUpdates: { module: './lib/index.js', style: './css/index.css' },
        });

        let pkgJson = getPackageJson();

        expect(pkgJson.exports).toBe(undefined);

        await generator(tree, options);

        pkgJson = getPackageJson();

        expect(pkgJson.exports).toMatchInlineSnapshot(`
          Object {
            ".": Object {
              "import": "./lib/index.js",
              "node": "./lib-commonjs/index.js",
              "require": "./lib-commonjs/index.js",
              "style": "./css/index.css",
              "types": "./dist/index.d.ts",
            },
            "./package.json": "./package.json",
          }
        `);
      });

      it(`should update exports map based on main,module fields`, async () => {
        const { getPackageJson } = updatePackageJson(tree, {
          projectName: options.name,
        });

        await generator(tree, options);

        const pkgJson = getPackageJson();
        expect((pkgJson.exports?.['.'] as { import?: string }).import).toBe(undefined);
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

  describe(`npm publish setup`, () => {
    it(`should replace .npmignore config with package.json#files`, async () => {
      const getNpmIgnoreConfigPath = (projectConfig: ReadProjectConfiguration) => `${projectConfig.root}/.npmignore`;

      const projectConfig = readProjectConfiguration(tree, options.name);
      const npmIgnoreConfigPath = getNpmIgnoreConfigPath(projectConfig);

      expect(tree.exists(npmIgnoreConfigPath)).toBe(true);

      await generator(tree, options);

      expect(tree.exists(npmIgnoreConfigPath)).toBe(false);
      const pkgJson = readJson<PackageJson>(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.files).toMatchInlineSnapshot(`
        Array [
          "*.md",
          "dist/*.d.ts",
          "lib-commonjs",
        ]
      `);
    });

    it(`should set package.json#files bases on project setup`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      updateProjectConfiguration(tree, projectConfig.name!, { ...projectConfig, tags: ['ships-amd'] });
      let getPackageJson = updatePackageJson(tree, {
        projectName: options.name,
        jsonUpdates: { module: './lib/index.js', style: './sass/index.scss', bin: './bin/cli.js', storybook: {} },
      }).getPackageJson;

      await generator(tree, options);

      expect(getPackageJson().files).toMatchInlineSnapshot(`
        Array [
          "*.md",
          "bin",
          "dist/*.d.ts",
          "lib",
          "lib-amd",
          "lib-commonjs",
          "preset.js",
          "sass",
        ]
      `);

      getPackageJson = updatePackageJson(tree, {
        projectName: options.name,
        jsonUpdates: {
          module: './lib/index.js',
          types: 'one/two/index.d.ts',
          bin: { one: './bin/one.js', two: './bin-two/one.js' },
        },
      }).getPackageJson;

      await generator(tree, options);

      expect(getPackageJson().files).toMatchInlineSnapshot(`
        Array [
          "*.md",
          "bin",
          "bin-two",
          "dist/*.d.ts",
          "lib",
          "lib-amd",
          "lib-commonjs",
          "one/two/*.d.ts",
          "preset.js",
          "sass",
        ]
      `);
    });
  });

  describe(`just-scripts config setup`, () => {
    it(`should update just.config.ts`, async () => {
      function getJustConfig(projectConfig: ReadProjectConfiguration) {
        return tree.read(`${projectConfig.root}/just.config.ts`)?.toString('utf-8');
      }
      const projectConfig = readProjectConfiguration(tree, options.name);
      let justConfig = getJustConfig(projectConfig);

      expect(justConfig).not.toContain(`task('build', 'build:react-components').cached?.();`);

      await generator(tree, options);

      justConfig = getJustConfig(projectConfig);

      expect(justConfig).toContain(`task('build', 'build:react-components').cached?.();`);
    });
  });

  describe(`swcrc config setup`, () => {
    it(`should create an swcrc config file`, async () => {
      function getSwcConfig(projectConfig: ReadProjectConfiguration) {
        return readJson(tree, `${projectConfig.root}/.swcrc`);
      }
      const projectConfig = readProjectConfiguration(tree, options.name);

      await generator(tree, options);

      expect(tree.exists(`${projectConfig.root}/.swcrc`)).toBeTruthy();

      const swcConfig = getSwcConfig(projectConfig);

      expect(swcConfig).toEqual({
        $schema: 'https://json.schemastore.org/swcrc',
        exclude: [
          '/testing',
          '/**/*.cy.ts',
          '/**/*.cy.tsx',
          '/**/*.spec.ts',
          '/**/*.spec.tsx',
          '/**/*.test.ts',
          '/**/*.test.tsx',
        ],
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
            dynamicImport: false,
          },
          externalHelpers: true,
          transform: {
            react: {
              runtime: 'classic',
              useSpread: true,
            },
          },
          target: 'es2019',
        },
        minify: false,
        sourceMaps: true,
      });
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
        extends: '../../.babelrc-v9.json',
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      tree.delete(`${projectConfig.root}/.babelrc.json`);

      await generator(tree, options);
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        extends: '../../.babelrc-v9.json',
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
        extends: '../../../../.babelrc-v9.json',
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      await generator(tree, options);
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
      });

      projectConfig = readProjectConfiguration(tree, '@proj/babel-make-styles');
      await generator(tree, { name: '@proj/babel-make-styles' });
      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
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
        json.scripts.build = 'just-scripts build --module cjs';
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

  describe(`update conformance setup`, () => {
    const conformanceSetup = stripIndents`
      import { isConformant as baseIsConformant } from '@proj/react-conformance';
      import type { IsConformantOptions, TestObject } from '@proj/react-conformance';
      import griffelTests from '@proj/react-conformance-griffel';

      export function isConformant<TProps = {}>(
        testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
      ) {
        const defaultOptions: Partial<IsConformantOptions<TProps>> = {
          componentPath: require.main?.filename.replace('.test', ''),
          extraTests: griffelTests as TestObject<TProps>,
          testOptions: {
            'make-styles-overrides-win': {
              callCount: 2,
            },
            // TODO: https://github.com/microsoft/fluentui/issues/19618
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        };

        baseIsConformant(defaultOptions, testInfo);
      }
    `;
    it(`should use tsConfig conformance API`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const conformanceSetupPath = joinPathFragments(projectConfig.root as string, 'src/testing/isConformant.ts');
      tree.write(conformanceSetupPath, conformanceSetup);
      await generator(tree, options);

      expect(tree.read(conformanceSetupPath, 'utf-8')).toMatchInlineSnapshot(`
        "import { isConformant as baseIsConformant } from '@proj/react-conformance';
        import type { IsConformantOptions, TestObject } from '@proj/react-conformance';
        import griffelTests from '@proj/react-conformance-griffel';

        export function isConformant<TProps = {}>(
          testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & {
            componentPath?: string;
          }
        ) {
          const defaultOptions: Partial<IsConformantOptions<TProps>> = {
            tsConfig: { configName: 'tsconfig.spec.json' },
            componentPath: require.main?.filename.replace('.test', ''),
            extraTests: griffelTests as TestObject<TProps>,
            testOptions: {
              'make-styles-overrides-win': {
                callCount: 2,
              },
              // TODO: https://github.com/microsoft/fluentui/issues/19618
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          };

          baseIsConformant(defaultOptions, testInfo);
        }
        "
      `);

      // make sure it is added only once

      await generator(tree, options);

      expect(stripIndents`${tree.read(conformanceSetupPath, 'utf-8')}`).toEqual(
        expect.stringContaining(stripIndents`
          const defaultOptions: Partial<IsConformantOptions<TProps>> = {
            tsConfig: { configName: 'tsconfig.spec.json' },
            componentPath: require.main?.filename.replace('.test', ''),
            extraTests: griffelTests as TestObject<TProps>,
            testOptions: {
              'make-styles-overrides-win': {
                callCount: 2,
              },
              // TODO: https://github.com/microsoft/fluentui/issues/19618
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          };
      `),
      );
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
      }, {} as Record<(typeof projects)[number], ReadProjectConfiguration>);

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
      }, {} as Record<(typeof projects)[number], ReadProjectConfiguration>);

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

  describe(`unstable API`, () => {
    const getPkgJsonUnstablePath = (projectConfig: ProjectConfiguration) => {
      return `${projectConfig.root}/src/unstable/package.json__tmpl__`;
    };

    describe(`export-maps`, () => {
      function setup(config: { name: string; addModuleField?: boolean }) {
        const addModuleField = config.addModuleField ?? true;
        const projectConfig = readProjectConfiguration(tree, config.name);
        const pkgJsonPath = `${projectConfig.root}/package.json`;
        const pkgJsonUnstablePath = getPkgJsonUnstablePath(projectConfig);

        if (addModuleField) {
          updateJson(tree, pkgJsonPath, json => {
            json.module = './lib/index.js';
            return json;
          });
        }

        writeJson(tree, pkgJsonUnstablePath, {
          typings: './../dist/unstable.d.ts',
          ...(addModuleField ? { module: './../lib/index.js' } : null),
        });
        const getUnstablePackageJson = () => readJson(tree, pkgJsonUnstablePath);

        const getPackageJson = () => readJson(tree, pkgJsonPath);

        return { getPackageJson, getUnstablePackageJson };
      }

      it(`should update exports map in stable package.json`, async () => {
        const { getPackageJson } = setup({ name: options.name });

        await generator(tree, options);

        const pkgJson = getPackageJson();

        expect(pkgJson.exports['./unstable']).toMatchInlineSnapshot(`
          Object {
            "import": "./lib/unstable/index.js",
            "node": "./lib-commonjs/unstable/index.js",
            "require": "./lib-commonjs/unstable/index.js",
            "types": "./dist/unstable.d.ts",
          }
        `);
      });

      it(`should update exports map`, async () => {
        const { getUnstablePackageJson } = setup({ name: options.name });

        let pkgJson = getUnstablePackageJson();

        expect(pkgJson.exports).toBe(undefined);

        await generator(tree, options);

        pkgJson = getUnstablePackageJson();

        expect(pkgJson.exports).toMatchInlineSnapshot(`
          Object {
            ".": Object {
              "import": "./../lib/unstable/index.js",
              "require": "./../lib-commonjs/unstable/index.js",
              "types": "./../dist/unstable.d.ts",
            },
          }
        `);
      });

      it(`should update exports map based on main,module fields`, async () => {
        const { getPackageJson, getUnstablePackageJson } = setup({
          name: options.name,
          addModuleField: false,
        });

        await generator(tree, options);

        const pkgJson = getPackageJson();
        const unstablePkgJson = getUnstablePackageJson();

        expect(pkgJson.exports['./unstable'].module).toBe(undefined);
        expect(unstablePkgJson.exports['.'].module).toBe(undefined);
      });
    });

    describe(`api-extractor`, () => {
      it(`should create api-extractor.json`, async () => {
        const projectConfig = readProjectConfiguration(tree, options.name);
        const pkgJsonUnstablePath = getPkgJsonUnstablePath(projectConfig);
        writeJson(tree, pkgJsonUnstablePath, {
          description: 'unstable api',
          sideEffects: false,
          main: '../lib-commonjs/unstable/index.js',
        });
        const apiExtractorConfigPath = `${projectConfig.root}/config/api-extractor.unstable.json`;

        expect(tree.exists(apiExtractorConfigPath)).toBeFalsy();

        await generator(tree, options);

        expect(tree.exists(apiExtractorConfigPath)).toBeTruthy();
        expect(readJson(tree, apiExtractorConfigPath)).toMatchInlineSnapshot(`
          Object {
            "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
            "apiReport": Object {
              "enabled": true,
              "reportFileName": "<unscopedPackageName>.unstable.api.md",
            },
            "dtsRollup": Object {
              "enabled": true,
              "untrimmedFilePath": "<projectFolder>/dist/unstable.d.ts",
            },
            "extends": "@fluentui/scripts-api-extractor/api-extractor.common.v-next.json",
            "mainEntryPointFilePath": "<projectFolder>/../../../dist/out-tsc/types/packages/react-components/<unscopedPackageName>/src/unstable/index.d.ts",
          }
        `);
      });
    });
  });
});

// ==== helpers ====

function getScopedPkgName(tree: Tree, pkgName: string) {
  const workspaceConfig = getWorkspaceConfig(tree);

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
  const workspaceConfig = getWorkspaceConfig(tree);
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
      extends: '../../../../.babelrc-v9.json',
      plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
    },
    tsConfig: {
      compilerOptions: { baseUrl: '.', typeRoots: ['../../../../node_modules/@types', '../../../../typings'] },
    },
  };

  const normalizedOptions = { ...defaults, ...options };
  const pkgName = normalizedOptions.name;
  const normalizedPkgName = getProjectNameWithoutScope(pkgName);
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  // this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
  const jestConfigTemplate = getFixture('old-jest-config.js__tmpl__');

  const templates = {
    packageJson: {
      name: pkgName,
      version: normalizedOptions.version,
      typings: 'lib/index.d.ts',
      main: 'lib-commonjs/index.js',
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
    jestConfig: stripIndents`${jestConfigTemplate}`,
    jestSetupFile: stripIndents`
     /** Jest test setup file. */
    `,
    npmConfig: stripIndents``,
    babelConfig: {
      ...normalizedOptions.babelConfig,
    },
    justConfig: getFixture('just-config.ts__tmpl__'),
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${paths.root}/.babelrc.json`, serializeJson(templates.babelConfig));
  tree.write(`${paths.root}/jest.config.js`, templates.jestConfig);
  tree.write(`${paths.root}/config/tests.js`, templates.jestSetupFile);
  tree.write(`${paths.root}/.npmignore`, templates.npmConfig);
  tree.write(`${paths.root}/just.config.ts`, templates.justConfig);
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
  // this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
  const template = getFixture('conformance-setup.ts__tmpl__');
  tree.write(`${projectConfig.root}/src/testing/isConformant.ts`, stripIndents`${template}`);
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
  writeJson(tree, `${unstableRootPath}/tsconfig.json`, { extends: '../../../../tsconfig.json', include: ['index.ts'] });

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

/**
 *
 * @param src  - relative path/file name within `__fixtures__` folder
 * @returns
 */
function getFixture(src: string) {
  return fs.readFileSync(path.join(__dirname, '__fixtures__', src), 'utf-8');
}

function updatePackageJson(tree: Tree, config: { projectName: string; jsonUpdates?: Partial<PackageJson> }) {
  const projectConfig = readProjectConfiguration(tree, config.projectName);
  const pkgJsonPath = `${projectConfig.root}/package.json`;

  updateJson(tree, pkgJsonPath, json => {
    Object.assign(json, config.jsonUpdates);
    return json;
  });

  const getPackageJson = () => readJson<PackageJson>(tree, pkgJsonPath);

  return { getPackageJson };
}
