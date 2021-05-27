import {
  Tree,
  formatFiles,
  updateJson,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  joinPathFragments,
  readJson,
  getProjects,
  stripIndents,
} from '@nrwl/devkit';
import { serializeJson } from '@nrwl/workspace';
import { updateJestConfig } from '@nrwl/jest/src/generators/jest-project/lib/update-jestconfig';

import { TsConfig } from '../../types';

import { MigrateConvergedPkgGeneratorSchema } from './schema';

/**
 * TASK:
 * 1. migrate to typescript path aliases - #18343 ✅
 * 2. migrate to use standard jest powered by TS path aliases
 * 3. setup docs task to run api-extractor for local changes verification
 * 4. bootstrap new storybook config
 * 5. collocate all package stories from `react-examples`
 */

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  // 1. update TsConfigs
  updatedLocalTsConfig(tree, options);
  updatedBaseTsConfig(tree, options);

  // 2. update Jest
  updateLocalJestConfig(tree, options);
  updateRootJestConfig(tree, options);

  formatFiles(tree);
}

// ==== helpers ====

const templates = {
  tsconfig: {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      target: 'es5',
      lib: ['es5', 'dom'],
      outDir: 'dist',
      jsx: 'react',
      declaration: true,
      module: 'commonjs',
      experimentalDecorators: true,
      importHelpers: true,
      noUnusedLocals: true,
      preserveConstEnums: true,
      types: ['jest', 'custom-global', 'inline-style-expand-shorthand'],
    },
    include: ['src'],
  },
  jest: (options: { pkgName: string }) => stripIndents`
      // @ts-check

      /**
      * @type {jest.InitialOptions}
      */
      module.exports = {
        displayName: '${options.pkgName}',
        preset: '../../jest.preset.js',
        globals: {
          'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json',
            diagnostics: false,
          },
        },
        transform: {
          '^.+\\.tsx?$': 'ts-jest',
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
      };
  `,
};

function normalizeOptions(host: Tree, options: MigrateConvergedPkgGeneratorSchema) {
  const defaults = {};
  const workspaceConfig = readWorkspaceConfiguration(host);
  const projectConfig = readProjectConfiguration(host, options.name);

  return {
    ...defaults,
    ...options,
    projectConfig,
    workspaceConfig: workspaceConfig,
    paths: {
      packageJson: joinPathFragments(projectConfig.root, 'package.json'),
      tsconfig: joinPathFragments(projectConfig.root, 'tsconfig.json'),
      jestConfig: joinPathFragments(projectConfig.root, 'jest.config.js'),
      rootTsconfig: '/tsconfig.base.json',
      rootJestPreset: '/jest.preset.js',
      rootJestConfig: '/jest.config.js',
    },
  };
}

function updateLocalJestConfig(tree: Tree, options: NormalizedSchema) {
  const normalizedPkgName = options.name.replace(`@${options.workspaceConfig.npmScope}/`, '');
  tree.write(options.paths.jestConfig, templates.jest({ pkgName: normalizedPkgName }));

  return tree;
}

function updateRootJestConfig(tree: Tree, options: NormalizedSchema) {
  updateJestConfig(tree, { project: options.name });

  return tree;
}

function updatedLocalTsConfig(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.tsconfig, serializeJson(templates.tsconfig));

  return tree;
}

function updatedBaseTsConfig(tree: Tree, options: NormalizedSchema) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const allProjects = getProjects(tree);

  const projectPkgJson = readJson<{ dependencies: Record<string, string> }>(tree, options.paths.packageJson);

  const depsThatNeedToBecomeAliases = Object.keys(projectPkgJson.dependencies)
    .filter(pkgName => pkgName.startsWith(`@${workspaceConfig.npmScope}`))
    .reduce((acc, pkgName) => {
      acc[pkgName] = [`${allProjects.get(pkgName)?.root}/src/index.ts`];

      return acc;
    }, {} as Required<Pick<TsConfig['compilerOptions'], 'paths'>>['paths']);

  updateJson<TsConfig, TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[options.name] = [`${options.projectConfig.root}/src/index.ts`];

    Object.assign(json.compilerOptions.paths, depsThatNeedToBecomeAliases);

    return json;
  });
}
