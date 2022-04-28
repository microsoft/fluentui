import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  WorkspaceConfiguration,
  serializeJson,
  stripIndents,
  addProjectConfiguration,
  ProjectConfiguration,
  logger,
} from '@nrwl/devkit';
import type { Linter } from 'eslint';

import type { TsConfig } from '../../types';
import generator from './index';
import { MigrateV8PkgGeneratorSchema } from './schema';

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
});

function getNormalizedPkgName(options: { pkgName: string; workspaceConfig: WorkspaceConfiguration }) {
  return options.pkgName.replace(`@${options.workspaceConfig.npmScope}/`, '');
}
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
  const workspaceConfig = readWorkspaceConfiguration(tree);
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
        typeRoots: ['../../node_modules/@types', '../../typings'],
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
        bundle: 'just-scripts bundle',
        'build-storybook': 'cross-env NODE_OPTIONS=--max-old-space-size=3072 just-scripts storybook:build',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        codepen: 'node ../../scripts/local-codepen.js',
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
      const { createConfig, resolveMergeStylesSerializer } = require('@proj/scripts/jest/jest-resources');
      const path = require('path');

      const config = createConfig({
        setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
        snapshotSerializers: [resolveMergeStylesSerializer()],
      });

      module.exports = config;
    `,
    jestSetupFile: stripIndents`
     /** Jest test setup file. */

      const { configure } = require('enzyme');
      const { initializeIcons } = require('@proj/font-icons-mdl2');
      const Adapter = require('enzyme-adapter-react-16');

      // Initialize icons.
      initializeIcons('');

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
    !src/**/*.types.ts
    temp
    tsconfig.json
    tsd.json
    tslint.json
    typings
    visualtests
    `,
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
