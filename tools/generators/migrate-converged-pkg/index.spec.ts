import * as Enquirer from 'enquirer';
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
} from '@nrwl/devkit';
import { serializeJson, stringUtils } from '@nrwl/workspace';

import { PackageJson, TsConfig } from '../../types';

import generator from './index';
import { MigrateConvergedPkgGeneratorSchema } from './schema';

interface AssertedSchema extends MigrateConvergedPkgGeneratorSchema {
  name: string;
}

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

  let tree: Tree;
  const options = { name: '@proj/react-dummy' } as const;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    tree.write(
      'jest.config.js',
      stripIndents`
      module.exports = {
          projects: []
      }`,
    );
    tree = setupDummyPackage(tree, options);
    tree = setupDummyPackage(tree, {
      name: '@proj/react-examples',
      version: '8.0.0',
      dependencies: {
        [options.name]: '9.0.40-alpha1',
        '@proj/old-v8-foo': '8.0.40',
        '@proj/old-v8-bar': '8.0.41',
      },
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

        await expect(generator(tree, options)).rejects.toMatchInlineSnapshot(
          // eslint-disable-next-line @fluentui/max-len
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
  });

  describe(`tsconfig updates`, () => {
    function getTsConfig(project: ReturnType<typeof readProjectConfiguration>) {
      return readJson(tree, `${project.root}/tsconfig.json`);
    }
    function getBaseTsConfig() {
      return readJson<TsConfig>(tree, `/tsconfig.base.json`);
    }

    it('should update package local tsconfig.json', async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      let tsConfig = getTsConfig(projectConfig);

      expect(tsConfig).toEqual({
        compilerOptions: {
          baseUrl: '.',
          typeRoots: ['../../node_modules/@types', '../../typings'],
        },
      });

      await generator(tree, options);

      tsConfig = getTsConfig(projectConfig);

      expect(tsConfig).toEqual({
        compilerOptions: {
          declaration: true,
          experimentalDecorators: true,
          importHelpers: true,
          jsx: 'react',
          lib: ['ES2015', 'dom'],
          module: 'CommonJS',
          noUnusedLocals: true,
          outDir: 'dist',
          preserveConstEnums: true,
          target: 'ES2015',
          types: ['jest', 'custom-global', 'inline-style-expand-shorthand', 'storybook__addons'],
        },
        extends: '../../tsconfig.base.json',
        include: ['src'],
      });
    });

    it('should update compilerOptions.types definition for local tsconfig.json', async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      updateJson(tree, `${projectConfig.root}/tsconfig.json`, (json: TsConfig) => {
        json.compilerOptions.types = ['jest', '@testing-library/jest-dom', 'foo-bar'];
        return json;
      });

      await generator(tree, options);

      const tsConfig = getTsConfig(projectConfig);

      expect(tsConfig.compilerOptions.types).toEqual([
        'jest',
        'custom-global',
        'inline-style-expand-shorthand',
        'storybook__addons',
        '@testing-library/jest-dom',
        'foo-bar',
      ]);
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
          '@proj/react-make-styles': ['packages/react-make-styles/src/index.ts'],
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
  });

  describe(`jest config updates`, () => {
    function getProjectJestConfig(projectConfig: ReturnType<typeof readProjectConfiguration>) {
      return tree.read(`${projectConfig.root}/jest.config.js`)?.toString('utf-8');
    }

    it(`should setup new local jest config which extends from root `, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      let jestConfig = getProjectJestConfig(projectConfig);

      expect(jestConfig).toMatchInlineSnapshot(`
        "const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
        const path = require('path');

        const config = createConfig({
        setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
        snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
        });

        module.exports = config;"
      `);

      await generator(tree, options);

      jestConfig = getProjectJestConfig(projectConfig);

      expect(jestConfig).toMatchInlineSnapshot(`
        "// @ts-check

        /**
        * @type {jest.InitialOptions}
        */
        module.exports = {
        displayName: 'react-dummy',
        preset: '../../jest.preset.js',
        globals: {
        'ts-jest': {
        tsConfig: '<rootDir>/tsconfig.json',
        diagnostics: false,
        },
        },
        transform: {
        '^.+\\\\\\\\.tsx?$': 'ts-jest',
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
        };"
      `);
    });

    it(`should add 'snapshotSerializers' to jest.config.js only when needed`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      function removePkgDependenciesThatTriggerSnapshotSerializersAddition() {
        const workspaceConfig = readWorkspaceConfiguration(tree);
        const packagesThatTriggerAddingSnapshots = [`@${workspaceConfig.npmScope}/react-make-styles`];

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

      let content = getJestSetupFile();
      expect(content).toMatchInlineSnapshot(`
        "/** Jest test setup file. */

        const { configure } = require('enzyme');
        const Adapter = require('enzyme-adapter-react-16');

        // Configure enzyme.
        configure({ adapter: new Adapter() });"
      `);

      await generator(tree, options);

      content = getJestSetupFile();
      expect(content).toMatchInlineSnapshot(`
        "/** Jest test setup file. */

        const { configure } = require('enzyme');
        const Adapter = require('enzyme-adapter-react-16');

        // Configure enzyme.
        configure({ adapter: new Adapter() });"
      `);

      tree.delete(jestSetupFilePath);
      expect(tree.exists(jestSetupFilePath)).toBeFalsy();

      await generator(tree, options);

      content = getJestSetupFile();
      expect(content).toMatchInlineSnapshot(`"/** Jest test setup file. */"`);
    });

    it(`should add project to root jest.config.js`, async () => {
      function getJestConfig() {
        return tree.read(`/jest.config.js`)?.toString('utf-8');
      }
      let jestConfig = getJestConfig();

      expect(jestConfig).toMatchInlineSnapshot(`
        "module.exports = {
        projects: []
        }"
      `);

      await generator(tree, options);

      jestConfig = getJestConfig();

      expect(jestConfig).toMatchInlineSnapshot(`
        "module.exports = {
        projects: [\\"<rootDir>/packages/react-dummy\\"]
        }"
      `);
    });
  });

  describe(`storybook updates`, () => {
    it(`should setup local storybook`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const projectStorybookConfigPath = `${projectConfig.root}/.storybook`;

      expect(tree.exists(projectStorybookConfigPath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(projectStorybookConfigPath)).toBeTruthy();
      expect(readJson(tree, `${projectStorybookConfigPath}/tsconfig.json`)).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "allowJs": true,
            "checkJs": true,
          },
          "exclude": Array [
            "../**/*.test.ts",
            "../**/*.test.js",
            "../**/*.test.tsx",
            "../**/*.test.jsx",
          ],
          "extends": "../tsconfig.json",
          "include": Array [
            "../src/**/*",
            "*.js",
          ],
        }
      `);

      /* eslint-disable @fluentui/max-len */
      expect(tree.read(`${projectStorybookConfigPath}/main.js`)?.toString('utf-8')).toMatchInlineSnapshot(`
        "const rootMain = require('../../../.storybook/main');

        module.exports = /** @type {Pick<import('../../../.storybook/main').StorybookConfig,'addons'|'stories'|'webpackFinal'>} */ ({
        stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
        addons: [...rootMain.addons],
        webpackFinal: (config, options) => {
        const localConfig = { ...rootMain.webpackFinal(config, options) };

        return localConfig;
        },
        });"
      `);
      /* eslint-enable @fluentui/max-len */

      expect(tree.read(`${projectStorybookConfigPath}/preview.js`)?.toString('utf-8')).toMatchInlineSnapshot(`
        "import * as rootPreview from '../../../.storybook/preview';

        /** @type {typeof rootPreview.decorators} */
        export const decorators = [...rootPreview.decorators];

        /** @type {typeof rootPreview.parameters} */
        export const parameters = { ...rootPreview.parameters };"
      `);
    });

    function setup() {
      const workspaceConfig = readWorkspaceConfiguration(tree);
      const projectConfig = readProjectConfiguration(tree, options.name);
      const normalizedProjectName = options.name.replace(`@${workspaceConfig.npmScope}/`, '');
      const reactExamplesConfig = readProjectConfiguration(tree, '@proj/react-examples');
      const pathToStoriesWithinReactExamples = `${reactExamplesConfig.root}/src/${normalizedProjectName}`;

      const paths = {
        reactExamples: {
          // eslint-disable-next-line @fluentui/max-len
          //  options.name==='@proj/react-dummy' -> react-examples/src/react-dummy/ReactDummyOther/ReactDummy.stories.tsx
          storyFileOne: `${pathToStoriesWithinReactExamples}/${stringUtils.classify(
            normalizedProjectName,
          )}/${stringUtils.classify(normalizedProjectName)}.stories.tsx`,
          // eslint-disable-next-line @fluentui/max-len
          // if options.name==='@proj/react-dummy' -> react-examples/src/react-dummy/ReactDummyOther/ReactDummyOther.stories.tsx
          storyFileTwo: `${pathToStoriesWithinReactExamples}/${stringUtils.classify(
            normalizedProjectName,
          )}Other/${stringUtils.classify(normalizedProjectName)}Other.stories.tsx`,
        },
      };

      tree.write(
        paths.reactExamples.storyFileOne,
        stripIndents`
         import * as Implementation from '${options.name}';
         export const Foo = (props: FooProps) => { return <div>Foo</div>; }
        `,
      );

      tree.write(
        paths.reactExamples.storyFileTwo,
        stripIndents`
         import * as Implementation from '${options.name}';
         export const FooOther = (props: FooPropsOther) => { return <div>FooOther</div>; }
        `,
      );

      function getMovedStoriesData() {
        const movedStoriesExportNames = {
          storyOne: `${stringUtils.classify(normalizedProjectName)}`,
          storyTwo: `${stringUtils.classify(normalizedProjectName)}Other`,
        };
        const movedStoriesFileNames = {
          storyOne: `${movedStoriesExportNames.storyOne}.stories.tsx`,
          storyTwo: `${movedStoriesExportNames.storyTwo}.stories.tsx`,
        };
        const movedStoriesPaths = {
          storyOne: `${projectConfig.root}/src/${movedStoriesFileNames.storyOne}`,
          storyTwo: `${projectConfig.root}/src/${movedStoriesFileNames.storyTwo}`,
        };

        const movedStoriesContent = {
          storyOne: tree.read(movedStoriesPaths.storyOne)?.toString('utf-8'),
          storyTwo: tree.read(movedStoriesPaths.storyTwo)?.toString('utf-8'),
        };

        return { movedStoriesPaths, movedStoriesExportNames, movedStoriesFileNames, movedStoriesContent };
      }

      return {
        projectConfig,
        reactExamplesConfig,
        workspaceConfig,
        normalizedProjectName,
        pathToStoriesWithinReactExamples,
        getMovedStoriesData,
      };
    }

    it(`should work if there are no package stories in react-examples`, async () => {
      const reactExamplesConfig = readProjectConfiguration(tree, '@proj/react-examples');
      const workspaceConfig = readWorkspaceConfiguration(tree);

      expect(
        tree.exists(`${reactExamplesConfig.root}/src/${options.name.replace(`@${workspaceConfig.npmScope}/`, '')}`),
      ).toBe(false);

      const loggerWarnSpy = jest.spyOn(logger, 'warn');
      let sideEffectsCallback: () => void;

      try {
        sideEffectsCallback = await generator(tree, options);
        sideEffectsCallback();
      } catch (err) {
        expect(err).toEqual(undefined);
      }

      expect(loggerWarnSpy).toHaveBeenCalledTimes(1);
      expect(loggerWarnSpy).toHaveBeenCalledWith(
        'No package stories found within react-examples. Skipping storybook stories migration...',
      );
    });

    it(`should move stories from react-examples package to local package within sourceRoot`, async () => {
      const { pathToStoriesWithinReactExamples, getMovedStoriesData } = setup();

      const loggerWarnSpy = jest.spyOn(logger, 'warn');

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      const sideEffectsCallback = await generator(tree, options);

      const { movedStoriesPaths } = getMovedStoriesData();

      expect(tree.exists(movedStoriesPaths.storyOne)).toBe(true);
      expect(tree.exists(movedStoriesPaths.storyTwo)).toBe(true);

      sideEffectsCallback();

      expect(loggerWarnSpy).toHaveBeenCalledTimes(2);
      expect(loggerWarnSpy.mock.calls[0][0]).toEqual('NOTE: Deleting packages/react-examples/src/react-dummy');
      expect(loggerWarnSpy.mock.calls[1][0]).toEqual(
        expect.stringContaining('- Please update your moved stories to follow standard storybook format'),
      );
    });

    it(`should delete migrated package folder in react-examples`, async () => {
      const { pathToStoriesWithinReactExamples, reactExamplesConfig } = setup();

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      await generator(tree, options);

      expect(tree.exists(`${reactExamplesConfig.root}/src/${options.name}`)).toBe(false);
    });

    it(`should replace absolute import path with relative one from index.ts`, async () => {
      const { pathToStoriesWithinReactExamples, getMovedStoriesData } = setup();

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      await generator(tree, options);

      const { movedStoriesContent } = getMovedStoriesData();

      expect(movedStoriesContent.storyOne).not.toContain(options.name);
      expect(movedStoriesContent.storyTwo).not.toContain(options.name);

      expect(movedStoriesContent.storyOne).toContain('./index');
      expect(movedStoriesContent.storyTwo).toContain('./index');
    });

    it(`should append storybook CSF default export`, async () => {
      const { pathToStoriesWithinReactExamples, getMovedStoriesData } = setup();

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      await generator(tree, options);

      const { movedStoriesExportNames, movedStoriesContent } = getMovedStoriesData();

      expect(movedStoriesContent.storyOne).toContain(
        stripIndents`
        export default {
          title: 'Components/${movedStoriesExportNames.storyOne}',
          component: ${movedStoriesExportNames.storyOne},
        }
        `,
      );
      expect(movedStoriesContent.storyTwo).toContain(
        stripIndents`
        export default {
          title: 'Components/${movedStoriesExportNames.storyTwo}',
          component: ${movedStoriesExportNames.storyTwo},
        }
      `,
      );
    });

    it(`should remove package-dependency from react-examples package.json`, async () => {
      const { reactExamplesConfig } = setup();

      let reactExamplesPkgJson = readJson<PackageJson>(tree, `${reactExamplesConfig.root}/package.json`);

      expect(reactExamplesPkgJson.dependencies).toEqual(
        expect.objectContaining({
          [options.name]: expect.any(String),
        }),
      );

      await generator(tree, options);

      reactExamplesPkgJson = readJson<PackageJson>(tree, `${reactExamplesConfig.root}/package.json`);

      expect(reactExamplesPkgJson.dependencies).not.toEqual(
        expect.objectContaining({
          [options.name]: expect.any(String),
        }),
      );
    });
  });

  describe('package.json updates', () => {
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
        'build:local': `tsc -p . --module esnext --emitDeclarationOnly && node ../../scripts/typescript/normalize-import --output dist/react-dummy/src && yarn docs`,
        build: 'just-scripts build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'yarn storybook',
        storybook: 'start-storybook',
        test: 'jest',
      });
    });

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

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.local.json`)).toBeTruthy();
    });
  });

  describe(`npm config setup`, () => {
    it(`should update .npmignore config`, async () => {
      function getNpmIgnoreConfig(projectConfig: ReturnType<typeof readProjectConfiguration>) {
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
        ".cache/
        .storybook/
        .vscode/
        coverage/
        src/
        bundle-size/
        config/
        temp/
        e2e/
        node_modules/
        __fixtures__
        __tests__

        *.log
        *.yml
        *.test.*
        *.spec.*
        *.stories.*
        *.api.json

        # config files
        .git*
        *rc.*
        *config.*
        .eslint*
        .editorconfig
        .prettierignore"
      `);
    });
  });

  describe(`babel config setup`, () => {
    function getBabelConfig(projectConfig: ReturnType<typeof readProjectConfiguration>) {
      const babelConfigPath = `${projectConfig.root}/.babelrc.json`;
      return readJson(tree, babelConfigPath);
    }

    it(`should setup .babelrc.json`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      await generator(tree, options);

      let babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        plugins: [
          'module:@fluentui/babel-make-styles',
          'annotate-pure-calls',
          '@babel/transform-react-pure-annotations',
        ],
      });

      tree.delete(`${projectConfig.root}/.babelrc.json`);

      await generator(tree, options);

      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        plugins: [
          'module:@fluentui/babel-make-styles',
          'annotate-pure-calls',
          '@babel/transform-react-pure-annotations',
        ],
      });
    });

    it(`should add @fluentui/babel-make-styles plugin only if needed`, async () => {
      const workspaceConfig = readWorkspaceConfiguration(tree);
      const currentProjectNpmScope = `@${workspaceConfig.npmScope}`;
      const projectConfig = readProjectConfiguration(tree, options.name);

      updateJson(tree, `${projectConfig.root}/package.json`, (json: PackageJson) => {
        if (json.dependencies) {
          delete json.dependencies[`${currentProjectNpmScope}/react-make-styles`];
          delete json.dependencies[`${currentProjectNpmScope}/make-styles`];
        }

        return json;
      });

      let babelConfig = getBabelConfig(projectConfig);
      expect(babelConfig).toEqual({
        plugins: [
          'module:@fluentui/babel-make-styles',
          'annotate-pure-calls',
          '@babel/transform-react-pure-annotations',
        ],
      });

      await generator(tree, options);

      babelConfig = getBabelConfig(projectConfig);

      expect(babelConfig).toEqual({
        plugins: ['annotate-pure-calls', '@babel/transform-react-pure-annotations'],
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

    it(`should set project 'vNext' and 'platform:web' tag in nx.json`, async () => {
      let projectConfig = readProjectConfiguration(tree, options.name);
      expect(projectConfig.tags).toBe(undefined);

      await generator(tree, options);

      projectConfig = readProjectConfiguration(tree, options.name);

      expect(projectConfig.tags).toEqual(['vNext', 'platform:web']);
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
    beforeEach(() => {
      setupDummyPackage(tree, { name: '@proj/react-foo', version: '9.0.22' });
      setupDummyPackage(tree, { name: '@proj/react-bar', version: '9.0.31' });
      setupDummyPackage(tree, { name: '@proj/react-old', version: '8.1.12' });
      setupDummyPackage(tree, { name: '@proj/react-older', version: '8.9.12' });
    });

    it(`should print project names and count of how many have been migrated`, async () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');

      await generator(tree, { stats: true });

      expect(loggerInfoSpy.mock.calls[2][0]).toEqual('Migrated (0):');
      expect(loggerInfoSpy.mock.calls[3][0]).toEqual('');
      expect(loggerInfoSpy.mock.calls[5][0]).toEqual(`Not migrated (3):`);
      expect(loggerInfoSpy.mock.calls[6][0]).toEqual(
        expect.stringContaining(stripIndents`
      - @proj/react-dummy
      - @proj/react-foo
      - @proj/react-bar
      `),
      );

      loggerInfoSpy.mockClear();

      await generator(tree, options);
      await generator(tree, { stats: true });

      expect(loggerInfoSpy.mock.calls[2][0]).toEqual('Migrated (1):');
      expect(loggerInfoSpy.mock.calls[5][0]).toEqual(`Not migrated (2):`);
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
        '@proj/react-examples',
        '@proj/react-foo',
        '@proj/react-bar',
        '@proj/react-moo',
        '@proj/react-old',
      ] as const;

      await generator(tree, { all: true });

      const configs = projects.reduce((acc, projectName) => {
        acc[projectName] = readProjectConfiguration(tree, projectName);

        return acc;
      }, {} as Record<typeof projects[number], ReturnType<typeof readProjectConfiguration>>);

      expect(configs['@proj/react-foo'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-bar'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-moo'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-dummy'].sourceRoot).toBeDefined();
      expect(configs['@proj/react-old'].sourceRoot).not.toBeDefined();
      expect(configs['@proj/react-examples'].sourceRoot).not.toBeDefined();
    });
  });
});

// ==== helpers ====

function setupDummyPackage(
  tree: Tree,
  options: AssertedSchema &
    Partial<{ version: string; dependencies: Record<string, string>; compilerOptions: TsConfig['compilerOptions'] }>,
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
    compilerOptions: { baseUrl: '.', typeRoots: ['../../node_modules/@types', '../../typings'] },
  };

  const normalizedOptions = { ...defaults, ...options };
  const pkgName = normalizedOptions.name;
  const normalizedPkgName = pkgName.replace(`@${workspaceConfig.npmScope}/`, '');
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  const templates = {
    packageJson: {
      name: pkgName,
      version: normalizedOptions.version,
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
      compilerOptions: normalizedOptions.compilerOptions,
    },
    jestConfig: stripIndents`
      const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
      const path = require('path');

      const config = createConfig({
        setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
        snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
      });

      module.exports = config;
    `,
    jestSetupFile: stripIndents`
     /** Jest test setup file. */

    const { configure } = require('enzyme');
    const Adapter = require('enzyme-adapter-react-16');

    // Configure enzyme.
    configure({ adapter: new Adapter() });
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
      plugins: ['module:@fluentui/babel-make-styles', 'annotate-pure-calls', '@babel/transform-react-pure-annotations'],
    },
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${paths.root}/.babelrc.json`, serializeJson(templates.babelConfig));
  tree.write(`${paths.root}/jest.config.js`, templates.jestConfig);
  tree.write(`${paths.root}/config/tests.js`, templates.jestSetupFile);
  tree.write(`${paths.root}/.npmignore`, templates.npmConfig);

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
  });

  return tree;
}
