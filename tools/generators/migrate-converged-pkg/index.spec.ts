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

import { TsConfig } from '../../types';

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

  describe.skip(`storybook updates`, () => {
    it(`should setup local storybook`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      const projectStorybookConfigPath = `${projectConfig.root}/.storybook`;

      expect(tree.exists(projectStorybookConfigPath)).toBeFalsy();

      await generator(tree, options);

      expect(tree.exists(projectStorybookConfigPath)).toBeTruthy();
      expect(readJson(tree, `${projectStorybookConfigPath}/tsconfig.json`)).toMatchInlineSnapshot();
      expect(tree.read(`${projectStorybookConfigPath}/main.js`)).toMatchInlineSnapshot();
      expect(tree.read(`${projectStorybookConfigPath}/preview.js`)).toMatchInlineSnapshot();
    });

    it(`should move stories from react-examples package to local package within sourceRoot`, async () => {
      setupDummyPackage(tree, {
        name: '@proj/react-examples',
        version: '8.0.0',
        dependencies: {
          [options.name]: '9.0.40-alpha1',
          '@proj/old-v8-foo': '8.0.40',
          '@proj/old-v8-bar': '8.0.41',
        },
      });

      const workspaceConfig = readWorkspaceConfiguration(tree);
      const projectConfig = readProjectConfiguration(tree, options.name);
      const normalizedProjectName = options.name.replace(`@${workspaceConfig.npmScope}/`, '');
      const reactExamplesConfig = readProjectConfiguration(tree, '@proj/react-examples');
      const pathToStoriesWithinReactExamples = `${reactExamplesConfig.root}/src/${normalizedProjectName}`;

      tree.write(
        `${pathToStoriesWithinReactExamples}/${stringUtils.classify(normalizedProjectName)}/${stringUtils.classify(
          normalizedProjectName,
        )}.stories.tsx`,
        '',
      );
      tree.write(
        `${pathToStoriesWithinReactExamples}/${stringUtils.classify(normalizedProjectName)}Other/${stringUtils.classify(
          normalizedProjectName,
        )}Other.stories.tsx`,
        '',
      );

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeTruthy();

      await generator(tree, options);

      expect(tree.exists(pathToStoriesWithinReactExamples)).toBeFalsy();
      expect(tree.exists(`${projectConfig.root}/src/${stringUtils.classify(normalizedProjectName)}.stories.tsx`));
      expect(tree.exists(`${projectConfig.root}/src/${stringUtils.classify(normalizedProjectName)}Other.stories.tsx`));
    });
  });

  describe.skip('package.json updates', () => {
    it(`should update npm scripts`, async () => {
      const projectConfig = readProjectConfiguration(tree, options.name);
      let pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson).toMatchInlineSnapshot();

      await generator(tree, options);

      pkgJson = readJson(tree, `${projectConfig.root}/package.json`);

      expect(pkgJson).toEqual({
        docs: 'api-extractor run --config=config/api-extractor.local.json --local',
        // eslint-disable-next-line @fluentui/max-len
        'build:local': `tsc -p . --module esnext --emitDeclarationOnly && node config/normalize-import --output dist/${projectConfig.root}/src && yarn docs`,
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
