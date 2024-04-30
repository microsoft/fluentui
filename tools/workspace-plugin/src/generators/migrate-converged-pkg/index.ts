import {
  Tree,
  formatFiles,
  updateJson,
  readProjectConfiguration,
  joinPathFragments,
  readJson,
  stripIndents,
  visitNotIgnoredFiles,
  logger,
  writeJson,
  updateProjectConfiguration,
  serializeJson,
  offsetFromRoot,
  applyChangesToString,
  ChangeType,
} from '@nx/devkit';
import path from 'path';
import ts from 'typescript';

import { getTemplate, uniqueArray } from './lib/utils';
import setupCypressComponentTesting from '../cypress-component-configuration';
import { PackageJson, TsConfig } from '../../types';
import {
  arePromptsEnabled,
  getProjectConfig,
  getProjects,
  getWorkspaceConfig,
  isPackageConverged,
  printUserLogs,
  prompt,
  UserLog,
} from '../../utils';

import { MigrateConvergedPkgGeneratorSchema } from './schema';
import { addCodeowner } from '../add-codeowners';
import { printStats } from '../print-stats';
import { generateChangeFilesHelp } from '../generate-change-files';

interface ProjectConfiguration extends ReturnType<typeof readProjectConfiguration> {}

interface AssertedSchema extends MigrateConvergedPkgGeneratorSchema {
  name: string;
}

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  const userLog: UserLog = [];

  const validatedSchema = await validateSchema(tree, schema);

  if (hasSchemaFlag(validatedSchema, 'stats')) {
    printStats(tree, {
      projects: getProjects(tree),
      title: 'Converged DX',
      isMigratedCheck: isProjectMigrated,
      shouldProcessPackage: isPackageConverged,
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  if (hasSchemaFlag(validatedSchema, 'all')) {
    await runBatchMigration(tree, userLog);
  }

  if (hasSchemaFlag(validatedSchema, 'name')) {
    const projectNames = validatedSchema.name.split(',').filter(Boolean);

    if (projectNames.length > 1) {
      await runBatchMigration(tree, userLog, projectNames);
    } else {
      await runMigrationOnProject(tree, validatedSchema, userLog);
    }
  }

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);

    const changedFilesPath = tree.listChanges().map(value => value.path);

    if (changedFilesPath.length > 0) {
      generateChangeFilesHelp({
        message: 'chore: update package scaffold',
        type: 'none',
      });
    }
  };
}

async function runBatchMigration(tree: Tree, userLog: UserLog, projectNames?: string[]) {
  const projects = getProjects(tree, projectNames);

  for (const [projectName, projectConfig] of projects) {
    if (!isPackageConverged(tree, projectConfig)) {
      userLog.push({ type: 'error', message: `${projectName} is not converged package. Skipping migration...` });
      continue;
    }

    await runMigrationOnProject(tree, { name: projectName }, userLog);
  }
}

async function runMigrationOnProject(tree: Tree, schema: AssertedSchema, _userLog: UserLog) {
  const options = normalizeOptions(tree, schema);

  if (options.owner) {
    addCodeowner(tree, { owner: options.owner, packageName: options.name });
  }

  if (options.projectConfig.projectType === 'application') {
    logger.warn(
      stripIndents`
      NOTE: you're trying to migrate an Application - ${options.name}.
      We apply limited migration steps at the moment.
      `,
    );
    return;
  }

  // 1. update TsConfigs
  const { configs } = updatedLocalTsConfig(tree, options);
  updatedBaseTsConfig(tree, options);

  // 2. update Jest
  updateLocalJestConfig(tree, options);

  const optionsWithTsConfigs = { ...options, tsconfigs: configs };

  // update package npm scripts
  updatePackageJson(tree, optionsWithTsConfigs);
  updateApiExtractor(tree, optionsWithTsConfigs);

  // setup storybook
  setupStorybook(tree, options);

  await setupCypress(tree, options);

  setupBabel(tree, options);

  updateNxProject(tree, options);

  setupUnstableApi(tree, optionsWithTsConfigs);

  setupSwcConfig(tree, options);
  setupJustConfig(tree, options);
  updateConformanceSetup(tree, options);
}

// ==== helpers ====

const templates = {
  apiExtractor: () => {
    return {
      main: {
        $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
        extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
      },
      unstable: {
        $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
        extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
        mainEntryPointFilePath:
          '<projectFolder>/../../../dist/out-tsc/types/packages/react-components/<unscopedPackageName>/src/unstable/index.d.ts',
        apiReport: {
          enabled: true,
          reportFileName: '<unscopedPackageName>.unstable.api.md',
        },
        dtsRollup: {
          enabled: true,
          untrimmedFilePath: '<projectFolder>/dist/unstable.d.ts',
        },
      },
    };
  },

  tsconfig: (options: {
    platform: 'node' | 'web';
    js: boolean;
    hasConformance: boolean;
    projectConfig: ProjectConfiguration;
  }) => {
    return {
      main: () => {
        const tsConfig = {
          extends: offsetFromRoot(options.projectConfig.root) + 'tsconfig.base.json',
          compilerOptions: {
            target: 'ES2019',
            // by default we gonna use tsc for type checking only
            noEmit: true,
            isolatedModules: true,
            importHelpers: true,
            jsx: 'react',
            noUnusedLocals: true,
            preserveConstEnums: true,
          } as TsConfig['compilerOptions'],
          include: [],
          files: [],
          references: [
            {
              path: './tsconfig.lib.json',
            },
            {
              path: './tsconfig.spec.json',
            },
          ],
        };

        if (options.js) {
          tsConfig.compilerOptions.allowJs = true;
          tsConfig.compilerOptions.checkJs = true;
          delete tsConfig.compilerOptions.preserveConstEnums;
        }

        return tsConfig;
      },
      lib: () => {
        const tsConfig = {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            lib: ['ES2019'],
            declaration: true,
            declarationDir: offsetFromRoot(options.projectConfig.root) + 'dist/out-tsc/types',
            outDir: offsetFromRoot(options.projectConfig.root) + 'dist/out-tsc',
            inlineSources: true,
            types: ['static-assets', 'environment'],
          } as TsConfig['compilerOptions'],
          exclude: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
          include: ['./src/**/*.ts', './src/**/*.tsx'],
        };

        if (options.platform === 'node') {
          tsConfig.compilerOptions.module = 'CommonJS';
          tsConfig.compilerOptions.types = uniqueArray([...(tsConfig.compilerOptions.types ?? []), 'node']);
        }
        if (options.platform === 'web') {
          tsConfig.compilerOptions.lib?.push('dom');
        }
        if (options.hasConformance) {
          tsConfig.exclude.unshift('./src/testing/**');
        }
        if (options.js) {
          tsConfig.include = globsToJs(tsConfig.include);
          tsConfig.exclude = globsToJs(tsConfig.exclude);
        }

        return tsConfig;
      },
      test: () => {
        const tsConfig = {
          extends: './tsconfig.json',
          compilerOptions: {
            module: 'CommonJS',
            outDir: 'dist',
            types: ['jest', 'node'],
          } as TsConfig['compilerOptions'],
          include: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
        };

        if (options.hasConformance) {
          tsConfig.include.push('./src/testing/**/*.ts', './src/testing/**/*.tsx');
        }

        if (options.js) {
          tsConfig.include = globsToJs(tsConfig.include);
        }

        return tsConfig;
      },
    };
  },
  babelConfig: (options: { platform: 'node' | 'web'; extraPresets?: Array<unknown>; rootBabelConfigPath?: string }) => {
    const { extraPresets, platform, rootBabelConfigPath } = options;
    const plugins = ['annotate-pure-calls'];
    if (platform === 'web') {
      plugins.push('@babel/transform-react-pure-annotations');
    }

    return {
      extends: rootBabelConfigPath,
      presets: extraPresets ? [...extraPresets] : undefined,
      plugins,
    };
  },
  jestSetup: stripIndents`
   /** Jest test setup file. */
  `,
  jest: (options: {
    platform: 'node' | 'web';
    pkgName: string;
    addSnapshotSerializers: boolean;
    testSetupFilePath: string;
    projectConfig: ProjectConfiguration;
  }) => stripIndents`
      // @ts-check

      /**
      * @type {import('@jest/types').Config.InitialOptions}
      */
      module.exports = {
        displayName: '${options.pkgName}',
        preset: '${offsetFromRoot(options.projectConfig.root)}jest.preset.js',
        transform: {
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              tsconfig: '<rootDir>/tsconfig.spec.json',
              isolatedModules: true,
            }
          ],
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['${options.testSetupFilePath}'],
        ${options.addSnapshotSerializers ? `snapshotSerializers: ['@griffel/jest-serializer'],` : ''}
      };
  `,
  storybook: (options: NormalizedSchema) => {
    const rootOffsetPath = offsetFromRoot(options.paths.storybook.rootFolder);
    return {
      main: stripIndents`
      const rootMain = require('${rootOffsetPath}.storybook/main');

      module.exports = /** @type {Omit<import('${rootOffsetPath}.storybook/main'), 'typescript'|'babel'>} */ ({
        ...rootMain,
        stories: [...rootMain.stories, '../stories/**/*.stories.mdx', '../stories/**/index.stories.@(ts|tsx)'],
        addons: [...rootMain.addons],
        webpackFinal: (config, options) => {
          const localConfig = { ...rootMain.webpackFinal(config, options) };

          // add your own webpack tweaks if needed

          return localConfig;
        },
      });
    `,
      preview: stripIndents`
      import * as rootPreview from '${rootOffsetPath}.storybook/preview';

      /** @type {typeof rootPreview.decorators} */
      export const decorators = [...rootPreview.decorators];

      /** @type {typeof rootPreview.parameters} */
      export const parameters = { ...rootPreview.parameters };
    `,
      tsconfig: {
        extends: '../tsconfig.json',
        compilerOptions: {
          outDir: '',
          allowJs: true,
          checkJs: true,
        },
        include: ['../stories/**/*.stories.ts', '../stories/**/*.stories.tsx', '*.js'],
      },
    };
  },
  cypress: {
    tsconfig: {
      extends: './tsconfig.json',
      compilerOptions: {
        isolatedModules: false,
        types: ['node', 'cypress', 'cypress-storybook/cypress', 'cypress-real-events'],
        lib: ['ES2019', 'dom'],
      },
      include: ['**/*.cy.ts', '**/*.cy.tsx'],
    },
  },
  npmIgnoreConfig: ``,
  swcConfig: () => {
    return {
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
    };
  },
  // why not inline template ? this is needed to stop TS parsing static imports and evaluating them in nx dep graph tree as true dependency - https://github.com/nrwl/nx/issues/8938
  justConfig: getTemplate(joinPathFragments(__dirname, 'files/just-config.ts__tmpl__'), {}),
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
    const projectNames = newSchema.name.split(',').filter(Boolean);

    projectNames.forEach(projectName => {
      const projectConfig = readProjectConfiguration(tree, projectName);

      if (!isPackageConverged(tree, projectConfig)) {
        throw new Error(
          `${newSchema.name} is not converged package. Make sure to run the migration on packages with version 9.x.x`,
        );
      }
    });
  }

  return newSchema;
}

async function triggerDynamicPrompts() {
  type PromptResponse = Required<Pick<MigrateConvergedPkgGeneratorSchema, 'name'>>;

  return prompt<PromptResponse>([
    {
      message: 'Which converged package(s) would you like migrate to new DX? (ex: @fluentui/react-menu)',
      type: 'input',
      name: 'name',
    },
  ]);
}

function isProjectMigrated<T extends ProjectConfiguration>(
  tree: Tree,
  project: T,
): project is T & Required<Pick<ProjectConfiguration, 'tags' | 'sourceRoot'>> {
  const hasTsSolutionConfigSetup = Array.isArray(
    readJson<TsConfig>(tree, joinPathFragments(project.root, 'tsconfig.json')).references,
  );
  // eslint-disable-next-line eqeqeq
  return project.sourceRoot != null && Boolean(project.tags?.includes('vNext')) && hasTsSolutionConfigSetup;
}

function getPackageType(tree: Tree, options: NormalizedSchema) {
  const tags = options.projectConfig.tags || [];

  const pkgJson: PackageJson = readJson(tree, options.paths.packageJson);
  const scripts = pkgJson.scripts || {};
  const isNode =
    tags.includes('platform:node') ||
    Boolean(pkgJson.bin) ||
    (scripts.build && scripts.build === 'just-scripts build --module cjs');
  const isWeb = tags.includes('platform:web') || !isNode;

  if (isNode) {
    return 'node';
  }

  if (isWeb) {
    return 'web';
  }

  throw new Error('Unable to determine type of package (web or node)');
}

function isJs(tree: Tree, options: NormalizedSchema) {
  const jsSourceFiles: string[] = [];
  visitNotIgnoredFiles(tree, options.paths.sourceRoot, treePath => {
    if (treePath.endsWith('.js') || treePath.endsWith('.jsx')) {
      jsSourceFiles.push(treePath);
    }
  });

  return jsSourceFiles.length > 0;
}

function hasConformanceSetup(tree: Tree, options: NormalizedSchema) {
  return tree.exists(options.paths.conformanceSetup);
}

function updateNxProject(tree: Tree, options: NormalizedSchema) {
  const packageType = getPackageType(tree, options);
  const tags = {
    web: 'platform:web',
    node: 'platform:node',
  };
  updateProjectConfiguration(tree, options.name, {
    ...options.projectConfig,
    sourceRoot: joinPathFragments(options.projectConfig.root, 'src'),
    tags: uniqueArray([...(options.projectConfig.tags ?? []), 'vNext', tags[packageType]]),
    implicitDependencies: uniqueArray([...(options.projectConfig.implicitDependencies ?? [])]),
  });

  return tree;
}

function setupSwcConfig(tree: Tree, options: NormalizedSchema) {
  const swcConfig = templates.swcConfig();
  writeJson(tree, joinPathFragments(options.projectConfig.root, '.swcrc'), swcConfig);

  return tree;
}

function setupJustConfig(tree: Tree, options: NormalizedSchema) {
  tree.write(options.paths.justConfig, templates.justConfig);

  return tree;
}

interface NormalizedSchemaWithTsConfigs extends NormalizedSchema {
  tsconfigs: ReturnType<typeof updatedLocalTsConfig>['configs'];
}

function setupUnstableApi(tree: Tree, options: NormalizedSchemaWithTsConfigs) {
  const unstablePackageJsonPath = options.paths.unstable.rootPackageJson;
  const hasUnstableApi = tree.exists(unstablePackageJsonPath);

  if (!hasUnstableApi) {
    return;
  }

  updateUnstablePackageJson();
  updateUnstableApiExtractor();

  return tree;

  function updateUnstableApiExtractor() {
    const apiExtractor = templates.apiExtractor();

    writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.unstable.json'), apiExtractor.unstable);

    return;
  }

  function updateUnstablePackageJson() {
    const packageJsonPath = options.paths.packageJson;

    let unstablePackageJson = readJson<PackageJson>(tree, unstablePackageJsonPath);
    let packageJson = readJson<PackageJson>(tree, packageJsonPath);

    Object.assign(unstablePackageJson, {
      main: '../lib-commonjs/unstable/index.js',
      ...(packageJson.module ? { module: '../lib/unstable/index.js' } : null),
      typings: './../dist/unstable.d.ts',
    });

    const updates = setupExportMaps(unstablePackageJson, packageJson);

    unstablePackageJson = updates.json;
    packageJson = updates.rootJson;

    writeJson(tree, unstablePackageJsonPath, unstablePackageJson);
    writeJson(tree, packageJsonPath, packageJson);

    return;

    function setupExportMaps(unstableJson: PackageJson, stableJson: PackageJson) {
      unstableJson.exports = {
        '.': {
          types: unstableJson.typings,
          ...(packageJson.module ? { import: './../lib/unstable/index.js' } : null),
          require: './../lib-commonjs/unstable/index.js',
        },
      };

      stableJson.exports = stableJson.exports ?? {};

      Object.assign(stableJson.exports, {
        './unstable': {
          types: unstableJson.typings?.replace(/\.\.\//g, ''),
          ...(packageJson.main ? { node: './lib-commonjs/unstable/index.js' } : null),
          ...(packageJson.module ? { import: './lib/unstable/index.js' } : null),
          require: './lib-commonjs/unstable/index.js',
        },
      });

      return { json: unstableJson, rootJson: stableJson };
    }
  }
}

function updatePackageJson(tree: Tree, options: NormalizedSchemaWithTsConfigs) {
  let packageJson = readJson(tree, options.paths.packageJson);

  packageJson.typings = './dist/index.d.ts';

  packageJson = setupScripts(packageJson);
  packageJson = setupExportMaps(packageJson);
  packageJson = addSwcHelpers(packageJson);
  packageJson = setupNpmPublishFiles(packageJson);

  writeJson(tree, options.paths.packageJson, packageJson);

  return tree;

  function setupScripts(json: PackageJson) {
    const packageType = getPackageType(tree, options);
    const hasStories = shouldSetupStorybook(tree, options) === 'init';
    const scripts: Record<string, string> = {
      test: 'jest --passWithNoTests',
      'type-check': 'tsc -b tsconfig.json',
    };

    if (packageType === 'web' && hasStories) {
      scripts['test-ssr'] = 'test-ssr "./stories/**/*.stories.tsx"';
    }

    json.scripts = json.scripts || {};
    delete json.scripts['update-snapshots'];
    delete json.scripts['start-test'];
    delete json.scripts['test:watch'];
    delete json.scripts['build:local'];
    delete json.scripts.docs;

    Object.assign(json.scripts, scripts);

    if (packageType === 'node') {
      delete json.scripts.start;
      delete json.scripts.storybook;
    }

    return json;
  }

  function setupExportMaps(json: PackageJson) {
    json.exports = {
      '.': {
        types: json.typings,
        ...(json.style ? { style: normalizePackageEntryPointPaths(json.style) } : null),
        ...(json.main ? { node: normalizePackageEntryPointPaths(json.main) } : null),
        ...(json.module ? { import: normalizePackageEntryPointPaths(json.module) } : null),
        ...(json.main ? { require: normalizePackageEntryPointPaths(json.main) } : null),
      },
      './package.json': './package.json',
    };

    return json;

    function normalizePackageEntryPointPaths(entryPath: string) {
      return './' + path.posix.normalize(entryPath);
    }
  }

  //TODO: remove after migration to swc transpilation is complete
  function addSwcHelpers(json: PackageJson) {
    delete json.dependencies?.tslib;
    json.dependencies = { ...json.dependencies, '@swc/helpers': '^0.5.1' };
    return json;
  }

  function setupNpmPublishFiles(json: PackageJson) {
    const rootMarkdownPath = '*.md';
    const mainPath = json.main ? path.dirname(json.main) : null;
    const modulePath = json.module ? path.dirname(json.module) : null;
    const binPath = getBinFolders(json);
    const stylesPath = json.style ? path.dirname(json.style) : null;
    const typesPath = getTypes(json);
    const storybookPath = getStorybookPath(json);
    const amdPath = options.projectConfig.tags?.includes('ships-amd') ? 'lib-amd' : null;
    const filesDefinition = [
      rootMarkdownPath,
      mainPath,
      modulePath,
      ...(binPath ?? []),
      stylesPath,
      typesPath,
      storybookPath,
      amdPath,
    ]
      .filter(Boolean)
      .map(value => {
        return value?.replace('./', '');
      }) as string[];

    json.files = json.files ?? [];
    json.files = uniqueArray([...json.files, ...filesDefinition]).sort();

    tree.delete(options.paths.npmConfig);

    return json;

    // helpers

    function getStorybookPath(pkgJson: PackageJson) {
      return pkgJson.storybook || tree.exists(joinPathFragments(options.projectConfig.root, 'preset.js'))
        ? 'preset.js'
        : null;
    }

    function getTypes(pkgJson: PackageJson) {
      const typesDeclarationPath = pkgJson.types || pkgJson.typings;
      return typesDeclarationPath ? globifyPath(path.dirname(typesDeclarationPath), 'd.ts') : null;
    }
    function getBinFolders(pkgJson: PackageJson) {
      const bin = pkgJson.bin;
      if (!bin) {
        return null;
      }

      if (typeof bin === 'string') {
        return [path.dirname(bin)];
      }

      const binRootPaths = new Set<string>();

      for (const binDefinitionPath of Object.values(bin)) {
        binRootPaths.add(path.dirname(binDefinitionPath));
      }

      return Array.from(binRootPaths);
    }

    function globifyPath(value: string, extension: string) {
      return `${value}/*.${extension}`;
    }
  }
}

function updateApiExtractor(tree: Tree, options: NormalizedSchemaWithTsConfigs) {
  const apiExtractor = templates.apiExtractor();
  const scripts = {
    'generate-api': 'just-scripts generate-api',
  };

  tree.delete(joinPathFragments(options.paths.configRoot, 'api-extractor.local.json'));
  writeJson(tree, joinPathFragments(options.paths.configRoot, 'api-extractor.json'), apiExtractor.main);

  updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
    json.scripts = json.scripts ?? {};
    Object.assign(json.scripts, scripts);

    return json;
  });

  return tree;
}

function setupStorybook(tree: Tree, options: NormalizedSchema) {
  const sbAction = shouldSetupStorybook(tree, options);

  const template = {
    projectReferences: { path: './.storybook/tsconfig.json' },
    exclude: ['**/*.stories.ts', '**/*.stories.tsx'],
  };

  const js = isJs(tree, options);

  if (sbAction === 'init') {
    const sbTemplates = templates.storybook(options);
    tree.write(options.paths.storybook.tsconfig, serializeJson(sbTemplates.tsconfig));
    tree.write(options.paths.storybook.main, sbTemplates.main);
    tree.write(options.paths.storybook.preview, sbTemplates.preview);

    const libTsConfig: TsConfig = readJson(tree, options.paths.tsconfig.lib);

    updateJson(tree, options.paths.storybook.tsconfig, (json: TsConfig) => {
      json.compilerOptions.types = json.compilerOptions.types || [];

      json.compilerOptions.types.push(...(libTsConfig.compilerOptions.types || []), 'storybook__addons');
      json.compilerOptions.types = uniqueArray(json.compilerOptions.types);

      return json;
    });

    // update main ts with project references
    updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
      json.references = json.references || [];

      json.references.push(template.projectReferences);

      return json;
    });

    // update lib ts with new exclude globs
    updateJson(tree, options.paths.tsconfig.lib, (json: TsConfig) => {
      json.exclude = json.exclude || [];

      json.exclude.push(...template.exclude);

      if (js) {
        json.exclude = globsToJs(json.exclude);
      }

      json.exclude = uniqueArray(json.exclude);

      return json;
    });

    updateJson(tree, options.paths.packageJson, (json: PackageJson) => {
      const scripts = {
        storybook: `start-storybook`,
        start: 'yarn storybook',
      };
      json.scripts = json.scripts ?? {};
      Object.assign(json.scripts, scripts);

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

    // update main ts with project references
    updateJson(tree, options.paths.tsconfig.main, (json: TsConfig) => {
      json.references = json.references || [];

      json.references = json.references.filter(projectRef => projectRef.path !== template.projectReferences.path);

      return json;
    });

    // update lib ts with new exclude globs
    updateJson(tree, options.paths.tsconfig.lib, (json: TsConfig) => {
      const excludeGlobs = js ? globsToJs(template.exclude) : template.exclude;
      json.exclude = (json.exclude || []).filter(excludeGlob => {
        return !excludeGlobs.includes(excludeGlob);
      });

      return json;
    });
  }

  removeTsIgnorePragmas();

  function removeTsIgnorePragmas() {
    const stories: string[] = [];
    visitNotIgnoredFiles(tree, options.projectConfig.root, treePath => {
      if (treePath.includes('.stories.')) {
        stories.push(treePath);
      }
    });

    stories.forEach(storyPath => {
      const content = tree.read(storyPath, 'utf8');

      if (!content) {
        throw new Error('story file has no code');
      }

      let updatedContent = content.replace(/\/\/\s+@ts-ignore/g, '');
      updatedContent = updatedContent.replace(
        /\/\/\s+eslint-disable-next-line\s+@typescript-eslint\/ban-ts-comment/g,
        '',
      );
      updatedContent = updatedContent.replace(
        /\/\/\s+https:\/\/github\.com\/microsoft\/fluentui\/pull\/18695#issuecomment-868432982/g,
        '',
      );

      tree.write(storyPath, updatedContent);
    });

    return tree;
  }

  return tree;
}

function shouldSetupStorybook(tree: Tree, options: NormalizedSchema) {
  let hasStories = false;

  visitNotIgnoredFiles(tree, options.projectConfig.root, treePath => {
    if (treePath.includes('.stories.')) {
      hasStories = true;
      return;
    }
  });

  const shouldInit = hasStories;
  const shouldDelete = !shouldInit;

  if (hasStories) {
    return 'init';
  }

  if (shouldDelete) {
    return 'remove';
  }
}

async function setupCypress(tree: Tree, options: NormalizedSchema) {
  const shouldSetupCypress = tree.exists(options.paths.tsconfig.cypress);

  if (!shouldSetupCypress) {
    return tree;
  }

  await setupCypressComponentTesting(tree, { project: options.name });

  return tree;
}

function updateLocalJestConfig(tree: Tree, options: NormalizedSchema) {
  const jestSetupFilePath = options.paths.jestSetupFile;
  const packageType = getPackageType(tree, options);
  const packagesThatTriggerAddingSnapshots = [`@griffel/react`];

  const packageJson = readJson<PackageJson>(tree, options.paths.packageJson);
  packageJson.dependencies = packageJson.dependencies ?? {};

  const config = {
    pkgName: options.normalizedPkgName,
    addSnapshotSerializers:
      packageType === 'web' &&
      Object.keys(packageJson.dependencies).some(pkgDepName => packagesThatTriggerAddingSnapshots.includes(pkgDepName)),
    testSetupFilePath: `./${path.basename(options.paths.configRoot)}/tests.js`,
    platform: packageType,
    projectConfig: options.projectConfig,
  } as const;

  tree.write(options.paths.jestConfig, templates.jest(config));

  if (!tree.exists(jestSetupFilePath)) {
    tree.write(jestSetupFilePath, templates.jestSetup);
  }

  return tree;
}

function updateConformanceSetup(tree: Tree, options: NormalizedSchema) {
  if (!tree.exists(options.paths.conformanceSetup)) {
    logger.warn('no conformance setup present. skipping...');
    return;
  }

  const conformanceSetupContent = tree.read(options.paths.conformanceSetup, 'utf-8') as string;
  const sourceFile = ts.createSourceFile('is-conformant.ts', conformanceSetupContent, ts.ScriptTarget.Latest, true);
  const addition = `\ntsConfig: { configName: 'tsconfig.spec.json' },`;

  let start: number | undefined;
  getConfigObjectFirstPropertyIndex(sourceFile);

  if (!start) {
    return;
  }

  const updatedContent = applyChangesToString(conformanceSetupContent, [
    {
      type: ChangeType.Insert,
      index: start,
      text: addition,
    },
  ]);

  tree.write(options.paths.conformanceSetup, updatedContent);

  function getConfigObjectFirstPropertyIndex(node: ts.Node) {
    if (ts.isVariableStatement(node)) {
      const defaultOptionsVar = node.declarationList.declarations[0].name.getText();
      if (defaultOptionsVar === 'defaultOptions') {
        const initializer = node.declarationList.declarations[0].initializer;
        if (initializer && ts.isObjectLiteralExpression(initializer)) {
          const isTsConfigAlreadySet = initializer.properties.some(prop => {
            return prop.name && ts.isIdentifier(prop.name) && prop.name.escapedText === 'tsConfig';
          });

          if (isTsConfigAlreadySet) {
            return;
          }

          const firstProp = initializer.properties[0];
          start = firstProp.pos;
          return;
        }
      }
    }

    ts.forEachChild(node, getConfigObjectFirstPropertyIndex);
  }

  return tree;
}

function updatedLocalTsConfig(tree: Tree, options: NormalizedSchema) {
  const { configs } = createTsSolutionConfig(tree, options);

  updateTsGlobalTypes(tree, options);

  return { tree, configs };
}

function createTsSolutionConfig(tree: Tree, options: NormalizedSchema) {
  const packageType = getPackageType(tree, options);
  const js = isJs(tree, options);
  const hasConformance = hasConformanceSetup(tree, options);

  const tsConfigs = templates.tsconfig({
    platform: packageType,
    js,
    hasConformance,
    projectConfig: options.projectConfig,
  });
  const main = tsConfigs.main();
  const lib = tsConfigs.lib();
  const test = tsConfigs.test();
  writeJson(tree, options.paths.tsconfig.main, main);
  writeJson(tree, options.paths.tsconfig.lib, lib);
  writeJson(tree, options.paths.tsconfig.test, test);

  return { tree, configs: { main, lib, test } };
}

function updateTsGlobalTypes(tree: Tree, options: NormalizedSchema) {
  // update test TS config
  updateJson(tree, options.paths.tsconfig.test, (json: TsConfig) => {
    if (tree.exists(options.paths.jestSetupFile)) {
      const jestSetupFile = tree.read(options.paths.jestSetupFile, 'utf8')!;

      if (jestSetupFile.includes(`require('@testing-library/jest-dom')`)) {
        json.compilerOptions.types = json.compilerOptions.types ?? [];
        json.compilerOptions.types.push('@testing-library/jest-dom');
      }
    }

    if (Array.isArray(json.compilerOptions.types)) {
      json.compilerOptions.types = uniqueArray(json.compilerOptions.types);
    }

    return json;
  });

  // update lib TS config
  // put your code here

  // update main TS config
  // put your code here

  return tree;
}

function updatedBaseTsConfig(tree: Tree, options: NormalizedSchema) {
  const workspaceConfig = getWorkspaceConfig(tree);
  const publishedNpmScope = `@${workspaceConfig?.npmScope}`;
  const allProjects = getProjects(tree);

  const projectPkgJson = readJson<PackageJson>(tree, options.paths.packageJson);
  const rootPkgJson = readJson<PackageJson>(tree, options.paths.rootPackageJson);
  const rootPkgDevDependencies = rootPkgJson.devDependencies || {};

  const depsThatNeedToBecomeAliases = Object.keys(projectPkgJson.dependencies ?? {})
    .filter(pkgName => {
      return pkgName.startsWith(publishedNpmScope) && !rootPkgDevDependencies[pkgName];
    })
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
  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);
  const packageType = getPackageType(tree, options);
  pkgJson.dependencies = pkgJson.dependencies || {};
  pkgJson.devDependencies = pkgJson.devDependencies || {};

  const shouldAddGriffelPreset = pkgJson.dependencies['@griffel/react'] && packageType === 'web';
  const rootBabelConfigPath = shouldAddGriffelPreset
    ? path.relative(options.projectConfig.root, '.babelrc-v9.json')
    : undefined;
  const config = templates.babelConfig({ platform: packageType, rootBabelConfigPath });

  tree.write(options.paths.babelConfig, serializeJson(config));
  writeJson(tree, options.paths.packageJson, pkgJson);

  return tree;
}

function globsToJs(tsConfigGlob: string[]) {
  return tsConfigGlob.map(glob => {
    if (glob.endsWith('.d.ts')) {
      return glob;
    }

    return glob.replace(/\.ts(x)?$/, '.js$1');
  });
}
