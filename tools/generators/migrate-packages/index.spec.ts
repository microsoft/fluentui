import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  stripIndents,
  addProjectConfiguration,
  serializeJson,
  WorkspaceConfiguration,
  parseJson,
} from '@nrwl/devkit';

import generator from './index';
import { MigratePackagesGeneratorSchema } from './schema';
import { TsConfig } from '../../types';

type ReadProjectConfiguration = ReturnType<typeof readProjectConfiguration>;

describe('migrate-packages generator', () => {
  let tree: Tree;
  const options: MigratePackagesGeneratorSchema = {
    name: '@proj/test',
    destination: 'testFolder/test',
    updateImportPath: true,
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write(
      'jest.config.js',
      stripIndents`
      module.exports = {
          projects: []
      }`,
    );
    tree = setupDummyPackage(tree, {
      ...options,
      name: options.name!,
      version: '9.0.0-alpha.0',
      dependencies: {
        '@proj/make-styles': '^9.0.0-alpha.1',
      },
      tsConfig: { extends: '../../tsconfig.base.json', compilerOptions: {}, include: ['src'] },
      projectConfiguration: { tags: ['vNext', 'platform:node'], sourceRoot: 'packages/test' },
    });
  });

  describe('general', () => {
    it('should run successfully', async () => {
      await generator(tree, options);
      const config = readProjectConfiguration(tree, options.name!);
      expect(config).toBeDefined();
    });

    describe('schema validation', () => {
      it('should throw if --name && --allConverged are both specified', async () => {
        await expect(
          generator(tree, {
            ...options,
            allConverged: true,
          }),
        ).rejects.toMatchInlineSnapshot(`[Error: --name and --allConverged are mutually exclusive]`);
      });

      it('should throw if --allConverged && --allV8 are both specified', async () => {
        await expect(
          generator(tree, {
            ...options,
            allConverged: true,
            allV8: true,
            name: '',
          }),
        ).rejects.toMatchInlineSnapshot(`[Error: --allConverged and --allV8 are mutually exclusive]`);
      });

      it('should throw if --name && --allConverged && --allV8 are all NOT specified', async () => {
        await expect(
          generator(tree, {
            ...options,
            name: '',
          }),
        ).rejects.toMatchInlineSnapshot(
          `[Error: must provide a specified --name or provide --allConverged or provide --allV8]`,
        );
      });
    });
  });

  describe('package move updates', () => {
    it('should move files to correct destination', async () => {
      await generator(tree, options);
      expect(tree.exists(`packages/${options.destination}/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/src/index.test.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/package.json`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/tsconfig.json`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/.babelrc.json`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/jest.config.js`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/config/tests.js`)).toBeTruthy();
      expect(tree.exists(`packages/${options.destination}/.npmignore`)).toBeTruthy();
    });
    it('should delete files from the old location', async () => {
      await generator(tree, options);
      expect(tree.exists(`packages/${options.name}/src/index.ts`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/src/index.test.ts`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/package.json`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/tsconfig.json`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/.babelrc.json`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/jest.config.js`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/config/tests.js`)).toBeFalsy();
      expect(tree.exists(`packages/${options.name}/.npmignore`)).toBeFalsy();
    });
  });

  describe('--allConverged', () => {
    beforeEach(() => {
      setupDummyPackage(tree, { name: '@proj/react-foo', version: '9.0.22' });
      setupDummyPackage(tree, { name: '@proj/react-bar', version: '9.0.31' });
      setupDummyPackage(tree, { name: '@proj/react-moo', version: '9.0.12' });
      setupDummyPackage(tree, { name: '@proj/react-old', version: '8.0.1' });
    });

    it(`should run migration on all v9 packages in batch`, async () => {
      const projects = [
        options.name!,
        '@proj/react-foo',
        '@proj/react-bar',
        '@proj/react-moo',
        '@proj/react-old',
      ] as const;

      const destinationFolder = 'testFolder';
      await generator(tree, { allConverged: true, destination: destinationFolder });

      expect(tree.exists(`packages/${destinationFolder}/react-foo/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-bar/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-moo/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-old/src/index.ts`)).toBeFalsy();
    });
  });

  describe('--allV8', () => {
    beforeEach(() => {
      setupDummyPackage(tree, { name: '@proj/react-foo', version: '8.0.22' });
      setupDummyPackage(tree, { name: '@proj/react-bar', version: '8.0.31' });
      setupDummyPackage(tree, { name: '@proj/react-moo', version: '8.0.12' });
      setupDummyPackage(tree, { name: '@proj/react-old', version: '9.0.1' });
    });

    it(`should run migration on all v8 packages in batch`, async () => {
      const projects = [
        options.name!,
        '@proj/react-foo',
        '@proj/react-bar',
        '@proj/react-moo',
        '@proj/react-old',
      ] as const;

      const destinationFolder = 'testFolder';
      await generator(tree, { allV8: true, destination: destinationFolder });

      expect(tree.exists(`packages/${destinationFolder}/react-foo/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-bar/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-moo/src/index.ts`)).toBeTruthy();
      expect(tree.exists(`packages/${destinationFolder}/react-old/src/index.ts`)).toBeFalsy();
    });
  });
});

interface AssertedSchema {
  name: string;
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

  const tsConfigBase = parseJson(tree.read('tsconfig.base.json')!.toString('utf8')!);
  // Add new dummy package to tsconfig.base.json paths.
  tsConfigBase.compilerOptions.paths[options.name] = [`packages/${options.name}/src/index.ts`];

  const nxJsonConfig = {
    npmScope: 'proj',
    affected: { defaultBase: 'main' },
    tasksRunnerOptions: {
      default: {
        runner: '@nrwl/workspace/tasks-runners/default',
        options: { cacheableOperations: ['build', 'lint', 'test', 'e2e'] },
      },
    },
    workspaceLayout: {
      libsDir: 'packages',
    },
  };

  tree.write(`tsconfig.base.json`, serializeJson(tsConfigBase));
  tree.write(`nx.json`, serializeJson(nxJsonConfig));
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

function getNormalizedPkgName(options: { pkgName: string; workspaceConfig: WorkspaceConfiguration }) {
  return options.pkgName.replace(`@${options.workspaceConfig.npmScope}/`, '');
}
