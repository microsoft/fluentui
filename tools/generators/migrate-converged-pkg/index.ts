import {
  Tree,
  formatFiles,
  updateJson,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  joinPathFragments,
} from '@nrwl/devkit';

import { MigrateConvergedPkgGeneratorSchema } from './schema';

/**
 * TASK:
 * 1. migrate to typescript path aliases - #18343 ✅ (partially done)
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
  jest: {},
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

function serializeJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function updatedLocalTsConfig(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.tsconfig, serializeJson(templates.tsconfig));

  return tree;
}

function updatedBaseTsConfig(tree: Tree, options: NormalizedSchema) {
  // @TODO: add missing dependencies from migrated package to path aliases
  updateJson(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths[options.name] = [`${options.projectConfig.root}/src/index.ts`];

    return json;
  });
}
