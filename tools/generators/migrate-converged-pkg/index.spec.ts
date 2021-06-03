import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  stripIndents,
  addProjectConfiguration,
  readWorkspaceConfiguration,
  updateJson,
} from '@nrwl/devkit';
import { serializeJson, stringUtils } from '@nrwl/workspace';

import { PackageJson, TsConfig } from '../../types';

import generator from './index';
import { MigrateConvergedPkgGeneratorSchema } from './schema';

describe('migrate-converged-pkg generator', () => {
  let tree: Tree;
  const options: MigrateConvergedPkgGeneratorSchema = { name: '@proj/react-dummy' };

  beforeEach(() => {
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
    it.skip(`should throw error if provided name doesn't match existing package`, async () => {
      expect(readProjectConfiguration(tree, '@proj/non-existent-lib')).toThrowErrorMatchingInlineSnapshot();
    });

    it.skip(`should throw error if user wants migrate non converged package`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      updateJson(tree, `${projectConfig.root}/tsconfig.json`, json => {
        json.version = '8.0.0';
        return json;
      });

      expect(await generator(tree, options)).rejects.toMatchInlineSnapshot();
    });
  });

  describe(`tsconfig updates`, () => {
    it('should update package local tsconfig.json', async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      function getTsConfig() {
        return readJson(tree, `${projectConfig.root}/tsconfig.json`);
      }

      let tsConfig = getTsConfig();

      expect(tsConfig).toEqual({
        compilerOptions: {
          baseUrl: '.',
          typeRoots: ['../../node_modules/@types', '../../typings'],
        },
      });

      await generator(tree, options);

      tsConfig = getTsConfig();

      expect(tsConfig).toEqual({
        compilerOptions: {
          declaration: true,
          experimentalDecorators: true,
          importHelpers: true,
          jsx: 'react',
          lib: ['es5', 'dom'],
          module: 'commonjs',
          noUnusedLocals: true,
          outDir: 'dist',
          preserveConstEnums: true,
          target: 'es5',
          types: ['jest', 'custom-global', 'inline-style-expand-shorthand'],
        },
        extends: '../../tsconfig.base.json',
        include: ['src'],
      });
    });

    // eslint-disable-next-line @fluentui/max-len
    it('should update root tsconfig.base.json with migrated package alias including all missing aliases based on packages dependencies list', async () => {
      function getBaseTsConfig() {
        return readJson<TsConfig>(tree, `/tsconfig.base.json`);
      }

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
    it(`should setup new local jest config which extends from root `, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      function getJestConfig() {
        return tree.read(`${projectConfig.root}/jest.config.js`)?.toString('utf-8');
      }

      let jestConfig = getJestConfig();

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

      jestConfig = getJestConfig();

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

        export const decorators = [...rootPreview.decorators];"
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

    it(`should move stories from react-examples package to local package within sourceRoot`, async () => {
      const { pathToStoriesWithinReactExamples, getMovedStoriesData } = setup();

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      await generator(tree, options);

      const { movedStoriesPaths } = getMovedStoriesData();

      expect(tree.exists(movedStoriesPaths.storyOne)).toBe(true);
      expect(tree.exists(movedStoriesPaths.storyTwo)).toBe(true);
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
          "update-snapshots": "just-scripts jest -u",
        }
      `);

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson.scripts).toEqual({
        docs: 'api-extractor run --config=config/api-extractor.local.json --local',
        // eslint-disable-next-line @fluentui/max-len
        'build:local': `tsc -p . --module esnext --emitDeclarationOnly && node ../../scripts/typescript/normalize-import --output dist/${projectConfig.root}/src && yarn docs`,
        build: 'just-scripts build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'storybook',
        storybook: 'start-storybook',
        test: 'jest',
      });
    });

    it(`should create api-extractor.local.json for scripts:docs task consumption`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.local.json`)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(`${projectConfig.root}/config/api-extractor.local.json`)).toBeTruthy();
    });
  });
});

// ==== helpers ====

function setupDummyPackage(
  tree: Tree,
  options: MigrateConvergedPkgGeneratorSchema & Partial<{ version: string; dependencies: Record<string, string> }>,
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
        'update-snapshots': 'just-scripts jest -u',
      },
      dependencies: normalizedOptions.dependencies,
    },
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
        typeRoots: ['../../node_modules/@types', '../../typings'],
      },
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
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${paths.root}/jest.config.js`, templates.jestConfig);

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
  });

  return tree;
}
