/* eslint-disable @typescript-eslint/no-shadow */

import { basename, dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import {
  type CreateNodesContextV2,
  type CreateNodesResult,
  type CreateNodesV2,
  type ProjectConfiguration,
  type TargetConfiguration,
  createNodesFromFiles,
  getPackageManagerCommand,
  readJsonFile,
} from '@nx/devkit';
import { type RunCommandsOptions } from 'nx/src/executors/run-commands/run-commands.impl';
import { type Config as JestConfig } from '@jest/types';

import { type PackageJson } from '../types';
import { type BuildExecutorSchema } from '../executors/build/schema';

import { assertProjectExists, projectConfigGlob } from './shared';
import { buildCleanTarget } from './clean-plugin';
import { buildFormatTarget } from './format-plugin';
import { buildTypeCheckTarget } from './type-check-plugin';
import { measureStart, measureEnd } from '../utils';

export interface WorkspacePluginOptions {
  testSSR?: TargetPluginOption;
  verifyPackaging?: TargetPluginOption;
  reactIntegrationTesting?: ReactIntegrationTestingTargetPluginOption;
}
interface ReactIntegrationTestingTargetPluginOption extends TargetPluginOption {
  reactVersions?: string[];
}
interface TargetPluginOption {
  targetName?: string;
  /**
   * project names to exclude from adding target
   */
  exclude?: string[];
  /**
   * project names to include for adding target
   */
  include?: string[];
}

export const createNodesV2: CreateNodesV2<WorkspacePluginOptions> = [
  projectConfigGlob,
  async (configFiles, options, context) => {
    const globalConfig: Pick<TaskBuilderConfig, 'pmc'> = { pmc: getPackageManagerCommand('yarn') };

    measureStart('workspace-plugin');
    const nodes = await createNodesFromFiles(
      (configFile, options, context) => {
        return createNodesInternal(configFile, options ?? {}, context, globalConfig);
      },
      configFiles,
      options,
      context,
    );

    measureEnd('workspace-plugin');

    return nodes;
  },
];

// ===================================================================================================================
type NormalizedOptions = ReturnType<typeof normalizeOptions>;

type DeepRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends object ? DeepRequired<T[K]> : NonNullable<T[K]>;
};

function normalizeOptions(options: WorkspacePluginOptions | undefined): DeepRequired<WorkspacePluginOptions> {
  options ??= {};

  options.testSSR ??= {};
  options.testSSR.targetName ??= 'test-ssr';
  options.testSSR.include ??= [];
  options.testSSR.exclude ??= [];

  options.verifyPackaging ??= {};
  options.verifyPackaging.targetName ??= 'verify-packaging';
  options.verifyPackaging.include ??= [];
  options.verifyPackaging.exclude ??= [];

  options.reactIntegrationTesting ??= {};
  options.reactIntegrationTesting.targetName ??= 'react-integration-testing';
  options.reactIntegrationTesting.include ??= [];
  options.reactIntegrationTesting.exclude ??= [];
  options.reactIntegrationTesting.reactVersions ??= [];

  return options as DeepRequired<WorkspacePluginOptions>;
}

function createNodesInternal(
  configFilePath: string,
  options: WorkspacePluginOptions,
  context: CreateNodesContextV2,
  globalConfig: Pick<TaskBuilderConfig, 'pmc'>,
): CreateNodesResult {
  const projectRoot = dirname(configFilePath);

  if (!assertProjectExists(projectRoot, context)) {
    return {};
  }

  const normalizedOptions = normalizeOptions(options);

  const taskBuilderConfig = getTaskBuilderConfig(projectRoot, globalConfig.pmc);

  const workspaceConfig = buildWorkspaceProjectConfiguration(
    projectRoot,
    normalizedOptions,
    context,
    taskBuilderConfig,
  );
  const ritConfig = buildReactIntegrationTesterProjectConfiguration(
    projectRoot,
    normalizedOptions,
    context,
    taskBuilderConfig,
  );

  return {
    projects: {
      [projectRoot]: {
        targets: { ...workspaceConfig.targets, ...ritConfig.targets },
        metadata: { ...workspaceConfig.metadata, ...ritConfig.metadata },
      },
    },
  };
}

interface TaskBuilderConfig {
  projectJSON: ProjectConfiguration;
  packageJSON: PackageJson;
  pmc: ReturnType<typeof getPackageManagerCommand>;
  tags: string[];
}

type WorkspaceTargets = Pick<ProjectConfiguration, 'targets' | 'metadata'>;

function getTaskBuilderConfig(projectRoot: string, pmc: TaskBuilderConfig['pmc']): TaskBuilderConfig {
  const projectJSON: ProjectConfiguration = readJsonFile(join(projectRoot, 'project.json'));
  const packageJSON: PackageJson = readJsonFile(join(projectRoot, 'package.json'));

  const tags = projectJSON.tags ?? [];
  const config = { projectJSON, packageJSON, pmc, tags };
  return config;
}

function buildWorkspaceProjectConfiguration(
  projectRoot: string,
  options: NormalizedOptions,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): WorkspaceTargets {
  const targets: Record<string, TargetConfiguration> = {};

  targets.clean = buildCleanTarget({}, context, config);
  targets.format = buildFormatTarget({}, context, config);
  targets['type-check'] = buildTypeCheckTarget({}, context, config);

  const lintTarget = buildLintTarget(projectRoot, options, context, config);
  if (lintTarget) {
    targets.lint = lintTarget;
  }

  const testTarget = buildTestTarget(projectRoot, options, context, config);
  if (testTarget) {
    targets.test = testTarget;
  }

  const storybookTarget = buildStorybookTarget(projectRoot, options, context, config);
  if (storybookTarget) {
    targets.storybook = storybookTarget;
  }

  // react v9 lib
  if (config.projectJSON.projectType === 'library' && config.tags.includes('vNext')) {
    // *-stories projects
    if (config.tags.includes('type:stories')) {
      const testSsrTarget = buildTestSsrTarget(projectRoot, options, context, config);
      if (testSsrTarget) {
        targets[options.testSSR.targetName] = testSsrTarget;
      }

      if (storybookTarget) {
        targets.start = { command: `nx run ${config.projectJSON.name}:storybook`, cache: true };
      }

      return { targets };
    }

    // library

    targets['generate-api'] = {
      cache: true,
      executor: '@fluentui/workspace-plugin:generate-api',
      inputs: [
        '{projectRoot}/config/api-extractor.json',
        '{projectRoot}/tsconfig.json',
        '{projectRoot}/tsconfig.lib.json',
        '{projectRoot}/src/**/*.tsx?',
        { externalDependencies: ['@microsoft/api-extractor', 'typescript'] },
      ],
      outputs: [`{projectRoot}/dist/index.d.ts`, `{projectRoot}/etc/${config.projectJSON.name}.api.md`],
      metadata: {
        technologies: ['typescript', 'api-extractor'],
        help: {
          command: `${config.pmc.exec} nx run ${config.projectJSON.name}:generate-api --help`,
          example: {},
        },
      },
    };

    targets.build = {
      cache: true,
      executor: '@fluentui/workspace-plugin:build',
      options: {
        sourceRoot: 'src',
        outputPathRoot: `{projectRoot}`,
        moduleOutput: [
          { module: 'es6', outputPath: 'lib' },
          { module: 'commonjs', outputPath: 'lib-commonjs' },
          config.tags.includes('ships-amd') ? { module: 'amd', outputPath: 'lib-amd' } : null,
        ].filter(Boolean) as BuildExecutorSchema['moduleOutput'],
        enableGriffelRawStyles: true,
        // NOTE: assets should be set per project needs
        // assets: [],
      } satisfies BuildExecutorSchema,

      // NOTE:
      //  https://nx.dev/recipes/running-tasks/configure-inputs#workspace-level-inputs
      //  these are overridden with anything that exists in nx.json#targetDefaults#build#input
      inputs: [
        '{projectRoot}/package.json',
        '{projectRoot}/.swcrc',
        ...targets['generate-api'].inputs!,
        { externalDependencies: ['@swc/core', '@microsoft/api-extractor', 'typescript'] },
      ],
      outputs: [
        `{projectRoot}/lib`,
        `{projectRoot}/lib-commonjs`,
        config.tags.includes('ships-amd') ? `{projectRoot}/lib-amd` : null,
        `{projectRoot}/dist`,
        ...targets['generate-api'].outputs!,
      ].filter(Boolean) as string[],
      metadata: {
        technologies: ['swc', 'typescript', 'api-extractor'],
        help: {
          command: `${config.pmc.exec} nx run ${config.projectJSON.name}:build --help`,
          example: {},
        },
      },
    };

    if (existsSync(join(projectRoot, '../stories/project.json'))) {
      const storybookTarget = { command: `nx run ${config.projectJSON.name}-stories:storybook`, cache: true };
      targets.storybook = storybookTarget;
      targets.start = storybookTarget;
    }

    const bundleSizeTarget = buildBundleSizeTarget(projectRoot, options, context, config);
    if (bundleSizeTarget) {
      targets['bundle-size'] = bundleSizeTarget;
    }

    const e2eTarget = buildE2eTarget(projectRoot, options, context, config);
    if (e2eTarget) {
      targets.e2e = e2eTarget;
    }

    const verifyPackagingTarget = buildVerifyPackagingTarget(projectRoot, options, context, config);
    if (verifyPackagingTarget) {
      targets[options.verifyPackaging.targetName] = verifyPackagingTarget;
    }

    return { targets };
  }

  return { targets };
}

function buildTestTarget(
  projectRoot: string,
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration<JestConfig.InitialOptions & Pick<RunCommandsOptions, 'cwd'>> | null {
  if (!existsSync(join(projectRoot, 'jest.config.js')) && !existsSync(join(projectRoot, 'jest.config.ts'))) {
    return null;
  }

  return {
    command: `${config.pmc.exec} jest`,
    options: { cwd: projectRoot, passWithNoTests: true },
    cache: true,
    inputs: ['default', '^production', '{workspaceRoot}/jest.preset.js', { externalDependencies: ['jest'] }],
    outputs: ['{projectRoot}/coverage'],
    metadata: {
      technologies: ['jest'],
      description: 'Run Jest Tests',
      help: {
        command: `${config.pmc.exec} jest --help`,
        example: {
          options: {
            coverage: true,
          },
        },
      },
    },
  };
}

function buildLintTarget(
  projectRoot: string,
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  if (!existsSync(join(projectRoot, '.eslintrc.json')) && !existsSync(join(projectRoot, '.eslintrc.js'))) {
    return null;
  }

  return {
    cache: true,
    command: `${config.pmc.exec} eslint src`,
    options: { cwd: projectRoot },
    inputs: [
      'default',
      '{projectRoot}/.eslintrc.json',
      '{projectRoot}/.eslintrc.js',
      '{workspaceRoot}/.eslintrc.json',
      '{workspaceRoot}/.eslintignore',
      '{workspaceRoot}/eslint.config.js',
      { externalDependencies: ['eslint'] },
    ],
    outputs: ['{options.outputFile}'],
    metadata: {
      description: 'Runs ESLint on project',
      technologies: ['eslint'],
      help: {
        command: `${config.pmc.exec} eslint --help`,
        example: {
          options: {
            'max-warnings': 0,
          },
        },
      },
    },
  };
}

function buildVerifyPackagingTarget(
  projectRoot: string,
  options: NormalizedOptions,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  if (options.verifyPackaging.include.length && !options.verifyPackaging.include.includes(config.projectJSON.name!)) {
    return null;
  }
  if (options.verifyPackaging.exclude.length && options.verifyPackaging.exclude.includes(config.projectJSON.name!)) {
    return null;
  }

  if (config.packageJSON.private) {
    return null;
  }

  return {
    executor: '@fluentui/workspace-plugin:verify-packaging',
  };
}

function buildBundleSizeTarget(
  projectRoot: string,
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  const hasMonosize =
    existsSync(join(projectRoot, 'bundle-size')) || existsSync(join(projectRoot, 'monosize.config.mjs'));

  if (!hasMonosize) {
    return null;
  }

  return {
    cache: true,
    command: `${config.pmc.exec} monosize measure`,
    options: { cwd: projectRoot },
    inputs: [
      `{workspaceRoot}/monosize.config.mjs`,
      `{projectRoot}/monosize.config.mjs`,
      `{projectRoot}/bundle-size`,
      `{projectRoot}/src/**/*.tsx?`,
      { externalDependencies: ['monosize', 'monosize-bundler-webpack'] },
    ],
    outputs: ['{projectRoot}/dist/bundle-size'],
    metadata: {
      technologies: ['monosize'],
      help: {
        command: `${config.pmc.exec} monosize measure --help`,
        example: {},
      },
    },
  };
}

function buildE2eTarget(
  projectRoot: string,
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  const hasCypress =
    existsSync(join(projectRoot, 'cypress.config.ts')) && existsSync(join(projectRoot, 'tsconfig.cy.json'));
  const hasPlaywright =
    existsSync(join(projectRoot, 'playwright.config.ts')) &&
    (existsSync(join(projectRoot, 'tsconfig.e2e.json')) ||
      // web-components uses playwright only for all kinds of testing
      existsSync(join(projectRoot, 'tsconfig.spec.json')));

  if (hasCypress) {
    return {
      command: `${config.pmc.exec} cypress run --component`,
      options: { cwd: projectRoot },
      configurations: {
        local: {
          command: `${config.pmc.exec} cypress open --component`,
        },
      },
      inputs: [
        'default',
        '{projectRoot}/cypress.config.ts',
        '!{projectRoot}/**/?(*.)+cy.[jt]s?(x)?',
        { externalDependencies: ['cypress', '@cypress/react'] },
      ],
      metadata: {
        technologies: ['cypress'],
        help: {
          command: `${config.pmc.exec} cypress run --help`,
          example: {},
        },
      },
    };
  }

  if (hasPlaywright) {
    return {
      command: `${config.pmc.exec} playwright test`,
      options: { cwd: projectRoot },
      configurations: {
        local: {
          command: `${config.pmc.exec} playwright test --ui`,
        },
      },
      inputs: [
        'default',
        '{projectRoot}/playwright.config.ts',
        '!{projectRoot}/**/?(*.)+spec.[jt]s?(x)?',
        '!{projectRoot}/**/?(*.)+spec-e2e.[jt]s?(x)?',
        { externalDependencies: ['@playwright/test'] },
      ],
      metadata: {
        technologies: ['playwright'],
        help: {
          command: `${config.pmc.exec} playwright test --help`,
          example: {},
        },
      },
    };
  }

  return null;
}

function buildTestSsrTarget(
  projectRoot: string,
  options: NormalizedOptions,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  if (options.testSSR.include.length && !options.testSSR.include.includes(config.projectJSON.name!)) {
    return null;
  }
  if (options.testSSR.exclude.length && options.testSSR.exclude.includes(config.projectJSON.name!)) {
    return null;
  }

  return {
    cache: true,
    command: `${config.pmc.exec} test-ssr "./src/**/*.stories.tsx"`,
    options: { cwd: projectRoot },
    metadata: {
      technologies: ['test-ssr'],
      help: {
        command: `${config.pmc.exec} test-ssr --help`,
        example: {},
      },
    },
  };
}

function buildStorybookTarget(
  projectRoot: string,
  options: NormalizedOptions,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
  if (!existsSync(join(projectRoot, '.storybook/main.js'))) {
    return null;
  }

  return {
    command: `${config.pmc.exec} storybook dev`,
    cache: true,
    inputs: [
      'production',
      '{workspaceRoot}/.storybook/**',
      '{projectRoot}/.storybook/**',
      { externalDependencies: ['storybook'] },
    ],
    options: { cwd: projectRoot },
    metadata: {
      technologies: ['storybook'],
      help: {
        command: `${config.pmc.exec} storybook dev --help`,
        example: {},
      },
    },
  };
}

type ReactIntegrationTesterTargets = Pick<ProjectConfiguration, 'targets' | 'metadata'>;
function buildReactIntegrationTesterProjectConfiguration(
  projectRoot: string,
  options: NormalizedOptions,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): ReactIntegrationTesterTargets {
  if (
    options.reactIntegrationTesting.include.length &&
    !options.reactIntegrationTesting.include.includes(config.projectJSON.name!)
  ) {
    return {};
  }
  if (
    options.reactIntegrationTesting.exclude.length &&
    options.reactIntegrationTesting.exclude.includes(config.projectJSON.name!)
  ) {
    return {};
  }
  // react v9: apply to libraries and stories projects
  const isStoriesProject = config.tags.includes('type:stories');
  if (!config.tags.includes('vNext') || (config.projectJSON.projectType !== 'library' && !isStoriesProject)) {
    return {};
  }

  const storiesAdjacentLibraryPath = resolve(projectRoot, '../library/project.json');
  const isStorybookAdjacentProject = isStoriesProject && existsSync(storiesAdjacentLibraryPath);
  const isLibraryWithStorybookAdjacentProject =
    basename(projectRoot) === 'library' && existsSync(resolve(projectRoot, '../stories/project.json'));

  const reactVersions = options.reactIntegrationTesting.reactVersions;
  if (reactVersions.length === 0) {
    console.info('No React versions specified for integration testing! -> No targets created');
    return {};
  }

  const hasTypeCheck = isStorybookAdjacentProject || isLibraryWithStorybookAdjacentProject;
  const hasE2E = existsSync(join(projectRoot, 'cypress.config.ts')) && !isStorybookAdjacentProject;
  const hasTest =
    (existsSync(join(projectRoot, 'jest.config.js')) || existsSync(join(projectRoot, 'jest.config.ts'))) &&
    !isStorybookAdjacentProject;
  const ritRunOptions = [hasTypeCheck ? 'type-check' : null, hasE2E ? 'e2e' : null, hasTest ? 'test' : null].filter(
    Boolean,
  ) as string[];

  const targets: Record<string, TargetConfiguration> = {};
  const inputs = [
    'default',
    'production',
    '^production',
    '{workspaceRoot}/jest.preset.js',
    '{workspaceRoot}/tools/react-integration-testing/**',
  ];

  const groupName = 'React Integration Tester';
  const metadata = { targetGroups: { [groupName]: [] as string[] } };

  // creates atomized targets
  for (const reactVersion of reactVersions) {
    if (ritRunOptions.length === 0) {
      continue;
    }

    const projectSuffixId = 'ci';

    // For library with stories sibling and only type-check, do not create --prepare target
    const onlyTypeCheck = ritRunOptions.length === 1 && ritRunOptions[0] === 'type-check';
    const skipPrepare = onlyTypeCheck && isLibraryWithStorybookAdjacentProject;
    const targetNamePrepare = options.reactIntegrationTesting.targetName + '--' + reactVersion + '--prepare';

    if (!skipPrepare) {
      targets[targetNamePrepare] = {
        command: `${config.pmc.exec} rit --prepare-only --no-install --project-id ${projectSuffixId} --react ${reactVersion} --verbose`,
        options: {
          cwd: '{projectRoot}',
        },
        cache: true,
        inputs: inputs,
        outputs: [
          `{workspaceRoot}/tmp/rit/react-${reactVersion}/${config.projectJSON.name}-react-${reactVersion}-${projectSuffixId}`,
        ],
        // this should be set via nx.json - usually `^build` (depends on project)
        dependsOn: [],
        metadata: {
          technologies: ['react-integration-tester'],
          description: `Run react integration tests against React ${reactVersion}`,
          help: {
            command: `${config.pmc.exec} rit --help`,
            example: {},
          },
        },
      };
    }

    // run targets
    for (const runOption of ritRunOptions) {
      const targetName = options.reactIntegrationTesting.targetName + '--' + reactVersion + '--' + runOption;

      if (runOption === 'type-check') {
        if (isStorybookAdjacentProject) {
          targets[targetName] = {
            command: `${config.pmc.exec} rit --project-id ${projectSuffixId} --react ${reactVersion} --run ${runOption} --verbose`,
            options: { cwd: '{projectRoot}' },
            cache: true,
            inputs: inputs,
            outputs: [],
            dependsOn: [targetNamePrepare],
            metadata: {
              technologies: ['react-integration-tester'],
              description: `Run react integration tests against React ${reactVersion}`,
              help: {
                command: `${config.pmc.exec} rit --help`,
                example: {},
              },
            },
          };
        } else if (isLibraryWithStorybookAdjacentProject) {
          // convenience target created on library target scope, which runs the `*-stories` type-check
          targets[targetName] = {
            executor: 'nx:noop',
            dependsOn: [{ target: targetName, projects: `${config.projectJSON.name}-stories` }],
            cache: true,
          };
        }
      } else {
        targets[targetName] = {
          command: `${config.pmc.exec} rit --project-id ${projectSuffixId} --react ${reactVersion} --run ${runOption} --verbose`,
          options: { cwd: '{projectRoot}' },
          cache: true,
          inputs: inputs,
          outputs: [],
          parallelism: runOption === 'e2e' ? false : true,
          // this should be set via nx.json
          dependsOn: [targetNamePrepare],
          metadata: {
            technologies: ['react-integration-tester'],
            description: `Run react integration tests against React ${reactVersion}`,
            help: {
              command: `${config.pmc.exec} rit --help`,
              example: {},
            },
          },
        };
      }
    }
  }

  // main group default target
  targets[options.reactIntegrationTesting.targetName] = {
    executor: 'nx:noop',
    cache: true,
    dependsOn: Object.keys(targets)
      .filter(target => !target.includes('--prepare'))
      .map(target => {
        return {
          target,
          projects:
            isLibraryWithStorybookAdjacentProject && target.includes('--type-check')
              ? `${config.projectJSON.name}-stories`
              : 'self',
          params: 'forward',
        };
      }),
    inputs: inputs,
    outputs: [],
    metadata: {
      technologies: ['react-integration-tester'],
      description: `Run react integration tests against React ${reactVersions.join(', ')}`,
      help: {
        command: `${config.pmc.exec} rit --help`,
        example: {},
      },
    },
  };

  metadata.targetGroups[groupName].push(...Object.keys(targets));

  return { targets, metadata };
}
