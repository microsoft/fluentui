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
  visitNotIgnoredFiles,
  logger,
  writeJson,
  updateProjectConfiguration,
  serializeJson,
} from '@nrwl/devkit';
import * as path from 'path';
import * as os from 'os';

import { PackageJson, TsConfig } from '../../types';
import {
  arePromptsEnabled,
  getProjectConfig,
  isPackageConverged,
  printUserLogs,
  prompt,
  updateJestConfig,
  UserLog,
} from '../../utils';

import { MigrateConvergedPkgGeneratorSchema } from './schema';

/**
 * TASK:
 * 1. migrate to typescript path aliases - #18343 ✅
 * 2. migrate to use standard jest powered by TS path aliases - #18368 ✅
 * 3. bootstrap new storybook config - #18394 ✅
 * 4. collocate all package stories from `react-examples` - #18394 ✅
 * 5. update npm scripts (setup docs task to run api-extractor for local changes verification) - #18403 ✅
 */

interface ProjectConfiguration extends ReturnType<typeof readProjectConfiguration> {}

interface AssertedSchema extends MigrateConvergedPkgGeneratorSchema {
  name: string;
}

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  const userLog: UserLog = [];

  const validatedSchema = await validateSchema(tree, schema);

  if (hasSchemaFlag(validatedSchema, 'stats')) {
    printStats(tree, validatedSchema);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  if (hasSchemaFlag(validatedSchema, 'all')) {
    runBatchMigration(tree, userLog);
  }

  if (hasSchemaFlag(validatedSchema, 'name')) {
    runMigrationOnProject(tree, validatedSchema, userLog);
  }

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);
  };
}

function runBatchMigration(tree: Tree, userLog: UserLog) {
  const projects = getProjects(tree);

  projects.forEach((project, projectName) => {
    if (!isPackageConverged(tree, project)) {
      userLog.push({ type: 'error', message: `${projectName} is not converged package. Skipping migration...` });
      return;
    }

    runMigrationOnProject(tree, { name: projectName }, userLog);
  });
}

function runMigrationOnProject(tree: Tree, schema: AssertedSchema, userLog: UserLog) {
  const options = normalizeOptions(tree, schema);

  // 1. update TsConfigs
  updatedLocalTsConfig(tree, options);
  updatedBaseTsConfig(tree, options);

  // 2. update Jest
  updateLocalJestConfig(tree, options);
  updateRootJestConfig(tree, options);

  // move stories to package
  moveStorybookFromReactExamples(tree, options, userLog);
  removeMigratedPackageFromReactExamples(tree, options, userLog);

  // update package npm scripts
  updateNpmScripts(tree, options);
  updateApiExtractorForLocalBuilds(tree, options);

  // setup storybook
  setupStorybook(tree, options);

  setupNpmIgnoreConfig(tree, options);
  setupBabel(tree, options);

  updateNxWorkspace(tree, options);
}

// ==== helpers ====

const templates = {
  apiExtractorLocal: {
    $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
    extends: './api-extractor.json',
    mainEntryPointFilePath: '<projectFolder>/dist/packages/<unscopedPackageName>/src/index.d.ts',
  },
  apiExtractor: {
    $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
    extends: '@fluentui/scripts/api-extractor/api-extractor.common.json',
  },
  tsconfig: {
    extends: '../../tsconfig.base.json',
    include: ['src'],
    compilerOptions: {
      target: 'ES2019',
      isolatedModules: true,
      module: 'CommonJS',
      lib: ['ES2019', 'dom'],
      outDir: 'dist',
      jsx: 'react',
      declaration: true,
      experimentalDecorators: true,
      importHelpers: true,
      noUnusedLocals: true,
      preserveConstEnums: true,
      types: ['jest', 'custom-global', 'inline-style-expand-shorthand'],
    } as TsConfig['compilerOptions'],
  },
  babelConfig: (options: { extraPlugins: Array<string> }) => {
    return {
      plugins: [...options.extraPlugins, 'annotate-pure-calls', '@babel/transform-react-pure-annotations'],
    };
  },
  jestSetup: stripIndents`
   /** Jest test setup file. */
  `,
  jest: (options: { pkgName: string; addSnapshotSerializers: boolean; testSetupFilePath: string }) => stripIndents`
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
        setupFilesAfterEnv: ['${options.testSetupFilePath}'],
        ${options.addSnapshotSerializers ? `snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],` : ''}
      };
  `,
  storybook: {
    main: stripIndents`
      const rootMain = require('../../../.storybook/main');

      module.exports = /** @type {Omit<import('../../../.storybook/main'), 'typescript'|'babel'>} */ ({
        ...rootMain,
        stories: [...rootMain.stories, '../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
        addons: [...rootMain.addons],
        webpackFinal: (config, options) => {
          const localConfig = { ...rootMain.webpackFinal(config, options) };

          // add your own webpack tweaks if needed

          return localConfig;
        },
      });
    `,
    preview: stripIndents`
      import * as rootPreview from '../../../.storybook/preview';

      /** @type {typeof rootPreview.decorators} */
      export const decorators = [...rootPreview.decorators];

      /** @type {typeof rootPreview.parameters} */
      export const parameters = { ...rootPreview.parameters };
    `,
    tsconfig: {
      extends: '../tsconfig.json',
      compilerOptions: {
        allowJs: true,
        checkJs: true,
      },
      exclude: ['../**/*.test.ts', '../**/*.test.js', '../**/*.test.tsx', '../**/*.test.jsx'],
      include: ['../src/**/*', '*.js'],
    },
  },
  npmIgnoreConfig:
    stripIndents`
    .storybook/
    .vscode/
    bundle-size/
    config/
    coverage/
    e2e/
    etc/
    node_modules/
    src/
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
  ` + os.EOL,
};

function normalizeOptions(host: Tree, options: AssertedSchema) {
  const defaults = {};
  const project = getProjectConfig(host, { packageName: options.name });

  return {
    ...defaults,
    ...options,
    ...project,

    /**
     * package name without npmScope (@scopeName)
     */
    normalizedPkgName: options.name.replace(`@${project.workspaceConfig.npmScope}/`, ''),
  };
}

/**
 *
 * Narrows down Schema definition to true runtime shape after {@link validateSchema} is executed
 * - also properly checks of truthiness of provided value
 */
function hasSchemaFlag<T extends MigrateConvergedPkgGeneratorSchema, K extends keyof T>(
  schema: T,
  flag: K,
): schema is T & Record<K, NonNullable<T[K]>> {
  return Boolean(schema[flag]);
}

async function validateSchema(tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  let newSchema = { ...schema };

  if (newSchema.name && newSchema.stats) {
    throw new Error('--name and --stats are mutually exclusive');
  }

  if (newSchema.name && newSchema.all) {
    throw new Error('--name and --all are mutually exclusive');
  }

  if (newSchema.stats && newSchema.all) {
    throw new Error('--stats and --all are mutually exclusive');
  }

  const shouldValidateNameInput = () => {
    return !newSchema.name && !(newSchema.all || newSchema.stats);
  };

  const shouldTriggerPrompt = arePromptsEnabled() && shouldValidateNameInput();

  if (shouldTriggerPrompt) {
    const schemaPromptsResponse = await triggerDynamicPrompts();

    newSchema = { ...newSchema, ...schemaPromptsResponse };
  }

  if (shouldValidateNameInput()) {
    throw new Error(`--name cannot be empty. Please provide name of the package.`);
  }

  if (newSchema.name) {
    const projectConfig = readProjectConfiguration(tree, newSchema.name);

    if (!isPackageConverged(tree, projectConfig)) {
      throw new Error(
        `${newSchema.name} is not converged package. Make sure to run the migration on packages with version 9.x.x`,
      );
    }
  }

  return newSchema;
}

async function triggerDynamicPrompts() {
  type PromptResponse = Required<Pick<MigrateConvergedPkgGeneratorSchema, 'name'>>;

  return prompt<PromptResponse>([
    {
      message: 'Which converged package would you like migrate to new DX? (ex: @fluentui/react-menu)',
      type: 'input',
      name: 'name',
    },
  ]);
}

function printStats(tree: Tree, options: MigrateConvergedPkgGeneratorSchema) {
  const allProjects = getProjects(tree);
  const stats = {
    migrated: [] as Array<ProjectConfiguration & { projectName: string }>,
    notMigrated: [] as Array<ProjectConfiguration & { projectName: string }>,
  };

  allProjects.forEach((project, projectName) => {
    if (!isPackageConverged(tree, project)) {
      return;
    }

    if (isProjectMigrated(project)) {
      stats.migrated.push({ projectName, ...project });

      return;
    }
    stats.notMigrated.push({ projectName, ...project });
  });

  logger.info('Convergence DX migration stats:');
  logger.info('='.repeat(80));

  logger.info(`Migrated (${stats.migrated.length}):`);
  logger.info(stats.migrated.map(projectStat => `- ${projectStat.projectName}`).join('\n'));

  logger.info('='.repeat(80));
  logger.info(`Not migrated (${stats.notMigrated.length}):`);
  logger.info(stats.notMigrated.map(projectStat => `- ${projectStat.projectName}`).join('\n'));

  return tree;
}

function isProjectMigrated<T extends ProjectConfiguration>(
  project: T,
): project is T & Required<Pick<ProjectConfiguration, 'tags' | 'sourceRoot'>> {
  // eslint-disable-next-line eqeqeq
  return project.sourceRoot != null && Boolean(project.tags?.includes('vNext'));
}

function getPackageType(tree: Tree, options: NormalizedSchema) {
  const tags = options.projectConfig.tags || [];

  const pkgJson: PackageJson = readJson(tree, options.paths.packageJson);
  const scripts = pkgJson.scripts || {};
  const isNode =
    tags.includes('platform:node') ||
    Boolean(pkgJson.bin) ||
    (scripts.build && scripts.build === 'just-scripts build --commonjs');
  const isWeb = tags.includes('platform:web') || !isNode;

  if (isNode) {
    return 'node';
  }

  if (isWeb) {
    return 'web';
  }

  throw new Error('Unable to determine type of package (web or node)');
}

function uniqueArray<T extends unknown>(value: T[]) {
  return Array.from(new Set(value));
}

function updateNxWorkspace(tree: Tree, options: NormalizedSchema) {
  const packageType = getPackageType(tree, options);
  const tags = {
    web: 'platform:web',
    node: 'platform:node',
  };
  updateProjectConfiguration(tree, options.name, {
    ...options.projectConfig,
    sourceRoot: joinPathFragments(options.projectConfig.root, 'src'),
    tags: uniqueArray([...(options.projectConfig.tags ?? []), 'vNext', tags[packageType]]),
  });

  return tree;
}

function setupNpmIgnoreConfig(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.npmConfig, templates.npmIgnoreConfig);

  return tree;
}

function updateNpmScripts(tree: Tree, options: NormalizedSchema) {
  /* eslint-disable @fluentui/max-len */
  const scripts = {
    docs: 'api-extractor run --config=config/api-extractor.local.json --local',
    'build:local': `tsc -p . --module esnext --emitDeclarationOnly && node ../../scripts/typescript/normalize-import --output ./dist/packages/${options.normalizedPkgName}/src && yarn docs`,
    storybook: 'start-storybook',
    start: 'yarn storybook',
    test: 'jest',
  };
  /* eslint-enable @fluentui/max-len */

  updateJson(tree, options.paths.packageJson, json => {
    delete json.scripts['update-snapshots'];
    delete json.scripts['start-test'];
    delete json.scripts['test:watch'];

    Object.assign(json.scripts, scripts);

    return json;
  });

  return tree;
}

function updateApiExtractorForLocalBuilds(tree: Tree, options: NormalizedSchema) {
  writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.local.json'), templates.apiExtractorLocal);
  writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.json'), templates.apiExtractor);

  return tree;
}

function setupStorybook(tree: Tree, options: NormalizedSchema) {
  const sbAction = shouldSetupStorybook(tree, options);

  if (sbAction === 'init') {
    tree.write(options.paths.storybook.tsconfig, serializeJson(templates.storybook.tsconfig));
    tree.write(options.paths.storybook.main, templates.storybook.main);
    tree.write(options.paths.storybook.preview, templates.storybook.preview);

    updateJson(tree, options.paths.tsconfig, (json: TsConfig) => {
      json.compilerOptions.types = json.compilerOptions.types || [];

      json.compilerOptions.types.push('storybook__addons');
      json.compilerOptions.types = uniqueArray(json.compilerOptions.types);

      return json;
    });
  }

  if (sbAction === 'remove') {
    tree.delete(options.paths.storybook.rootFolder);
    updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
      json.scripts = json.scripts || {};

      delete json.scripts.start;
      delete json.scripts.storybook;
      delete json.scripts['build-storybook'];

      return json;
    });

    updateJson(tree, options.paths.tsconfig, (json: TsConfig) => {
      json.compilerOptions.types = json.compilerOptions.types || [];

      json.compilerOptions.types = json.compilerOptions.types.filter(
        typeReference => typeReference !== 'storybook__addons',
      );

      return json;
    });
  }

  return tree;
}

function shouldSetupStorybook(tree: Tree, options: NormalizedSchema) {
  const hasStorybookConfig = tree.exists(options.paths.storybook.main);
  let hasStories = false;

  visitNotIgnoredFiles(tree, options.projectConfig.root, treePath => {
    if (treePath.includes('.stories.')) {
      hasStories = true;
      return;
    }
  });

  const tags = options.projectConfig.tags || [];
  const hasTags = tags.includes('vNext') && tags.includes('platform:web');

  const shouldInit = hasStories || hasTags;
  const shouldDelete = !shouldInit && hasStorybookConfig;

  if (shouldInit) {
    return 'init';
  }

  if (shouldDelete) {
    return 'remove';
  }
}

function moveStorybookFromReactExamples(tree: Tree, options: NormalizedSchema, userLog: UserLog) {
  const reactExamplesConfig = getReactExamplesProjectConfig(tree, options);
  const pathToStoriesWithinReactExamples = `${reactExamplesConfig.root}/src/${options.normalizedPkgName}`;

  const storyPaths: string[] = [];

  visitNotIgnoredFiles(tree, pathToStoriesWithinReactExamples, treePath => {
    if (treePath.includes('.stories.')) {
      storyPaths.push(treePath);
    }
  });

  if (storyPaths.length === 0) {
    userLog.push({
      type: 'warn',
      message: 'No package stories found within react-examples. Skipping storybook stories migration...',
    });

    return tree;
  }

  storyPaths.forEach(originPath => {
    const pathSegments = splitPathFragments(originPath);
    const fileName = pathSegments[pathSegments.length - 1];
    const componentName = fileName.replace(/\.stories\.tsx?$/, '');
    let contents = tree.read(originPath)?.toString('utf-8');

    if (contents) {
      contents = contents.replace(options.name, './index');
      contents =
        contents +
        '\n\n' +
        stripIndents`
        export default {
            title: 'Components/${componentName}',
            component: ${componentName},
        }
      `;

      tree.write(joinPathFragments(options.projectConfig.root, 'src', fileName), contents);

      return;
    }

    throw new Error(`Error moving ${fileName} from react-examples`);
  });

  return tree;
}

function getReactExamplesProjectConfig(tree: Tree, options: NormalizedSchema) {
  return readProjectConfiguration(tree, `@${options.workspaceConfig.npmScope}/react-examples`);
}

function removeMigratedPackageFromReactExamples(tree: Tree, options: NormalizedSchema, userLog: UserLog) {
  const reactExamplesConfig = getReactExamplesProjectConfig(tree, options);

  const paths = {
    packageStoriesWithinReactExamples: `${reactExamplesConfig.root}/src/${options.normalizedPkgName}`,
    packageJson: `${reactExamplesConfig.root}/package.json`,
  };

  if (!tree.exists(paths.packageStoriesWithinReactExamples)) {
    return tree;
  }

  tree.delete(paths.packageStoriesWithinReactExamples);

  userLog.push(
    { type: 'warn', message: `NOTE: Deleting ${reactExamplesConfig.root}/src/${options.normalizedPkgName}` },
    { type: 'warn', message: `      - Please update your moved stories to follow standard storybook format\n` },
  );

  updateJson(tree, paths.packageJson, (json: PackageJson) => {
    if (json.dependencies) {
      delete json.dependencies[options.name];
    }

    return json;
  });

  return tree;
}

function updateLocalJestConfig(tree: Tree, options: NormalizedSchema) {
  const jestSetupFilePath = joinPathFragments(options.paths.configRoot, 'tests.js');
  const packagesThatTriggerAddingSnapshots = [`@${options.workspaceConfig.npmScope}/react-make-styles`];

  const packageJson = readJson<PackageJson>(tree, options.paths.packageJson);
  packageJson.dependencies = packageJson.dependencies ?? {};

  const config = {
    pkgName: options.normalizedPkgName,
    addSnapshotSerializers: Object.keys(packageJson.dependencies).some(pkgDepName =>
      packagesThatTriggerAddingSnapshots.includes(pkgDepName),
    ),
    testSetupFilePath: `./${path.basename(options.paths.configRoot)}/tests.js`,
  };

  tree.write(options.paths.jestConfig, templates.jest(config));

  if (!tree.exists(jestSetupFilePath)) {
    tree.write(jestSetupFilePath, templates.jestSetup);
  }

  return tree;
}

function updateRootJestConfig(tree: Tree, options: NormalizedSchema) {
  updateJestConfig(tree, { project: options.name });

  return tree;
}

function updatedLocalTsConfig(tree: Tree, options: NormalizedSchema) {
  const newConfig: TsConfig = { ...templates.tsconfig };
  const oldConfig = readJson<TsConfig>(tree, options.paths.tsconfig);

  const oldConfigTypes = oldConfig.compilerOptions.types ?? [];
  const newConfigTypes = newConfig.compilerOptions.types ?? [];
  const updatedTypes = uniqueArray([...newConfigTypes, ...oldConfigTypes]);

  newConfig.compilerOptions.types = updatedTypes;

  tree.write(options.paths.tsconfig, serializeJson(newConfig));

  return tree;
}

function updatedBaseTsConfig(tree: Tree, options: NormalizedSchema) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const allProjects = getProjects(tree);

  const projectPkgJson = readJson<PackageJson>(tree, options.paths.packageJson);

  const depsThatNeedToBecomeAliases = Object.keys(projectPkgJson.dependencies ?? {})
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

function setupBabel(tree: Tree, options: NormalizedSchema) {
  const currentProjectNpmScope = `@${options.workspaceConfig.npmScope}`;
  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);
  pkgJson.dependencies = pkgJson.dependencies || {};
  pkgJson.devDependencies = pkgJson.devDependencies || {};

  const shouldAddMakeStylesPlugin =
    pkgJson.dependencies[`${currentProjectNpmScope}/react-make-styles`] ||
    pkgJson.dependencies[`${currentProjectNpmScope}/make-styles`];
  const extraPlugins = shouldAddMakeStylesPlugin ? ['module:@fluentui/babel-make-styles'] : [];

  const config = templates.babelConfig({ extraPlugins });

  const babelMakeStylesProjectName = `${currentProjectNpmScope}/babel-make-styles`;
  if (shouldAddMakeStylesPlugin) {
    const babelMakeStylesProject = getProjectConfig(tree, { packageName: babelMakeStylesProjectName });
    const babelMakeStylesPkgJson: PackageJson = readJson(tree, babelMakeStylesProject.paths.packageJson);
    pkgJson.devDependencies[babelMakeStylesProjectName] = `^${babelMakeStylesPkgJson.version}`;
  } else {
    delete pkgJson.devDependencies[babelMakeStylesProjectName];
  }

  tree.write(options.paths.babelConfig, serializeJson(config));
  writeJson(tree, options.paths.packageJson, pkgJson);

  return tree;
}

function splitPathFragments(filePath: string) {
  return filePath.split(path.sep);
}
