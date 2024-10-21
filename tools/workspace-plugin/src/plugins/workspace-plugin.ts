/* eslint-disable @typescript-eslint/no-shadow */

import { dirname, join } from 'node:path';
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

interface WorkspacePluginOptions {}

export const createNodesV2: CreateNodesV2<WorkspacePluginOptions> = [
  projectConfigGlob,
  (configFiles, options, context) => {
    return createNodesFromFiles(
      (configFile, options, context) => {
        return createNodesInternal(configFile, options ?? {}, context);
      },
      configFiles,
      options,
      context,
    );
  },
];

// ===================================================================================================================
function normalizeOptions(options: WorkspacePluginOptions | undefined): Required<WorkspacePluginOptions> {
  options ??= {};

  return options as Required<WorkspacePluginOptions>;
}

function createNodesInternal(
  configFilePath: string,
  options: WorkspacePluginOptions,
  context: CreateNodesContextV2,
): CreateNodesResult {
  const projectRoot = dirname(configFilePath);

  if (!assertProjectExists(projectRoot, context)) {
    return {};
  }

  const normalizedOptions = normalizeOptions(options);
  const config = { pmc: getPackageManagerCommand('yarn') };

  const targetsConfig = buildWorkspaceTargets(projectRoot, normalizedOptions, context, config);

  return {
    projects: {
      [projectRoot]: { targets: targetsConfig },
    },
  };
}

interface TaskBuilderConfig {
  projectJSON: ProjectConfiguration;
  packageJSON: PackageJson;
  pmc: ReturnType<typeof getPackageManagerCommand>;
  tags: string[];
}

function buildWorkspaceTargets(
  projectRoot: string,
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  sharedConfig: Pick<TaskBuilderConfig, 'pmc'>,
) {
  const targets: Record<string, TargetConfiguration> = {};

  const projectJSON: ProjectConfiguration = readJsonFile(join(projectRoot, 'project.json'));
  const packageJSON: PackageJson = readJsonFile(join(projectRoot, 'package.json'));

  const tags = projectJSON.tags ?? [];
  const config = { projectJSON, packageJSON, pmc: sharedConfig.pmc, tags };

  targets.clean = buildCleanTarget({}, context, config);
  targets.format = buildFormatTarget({}, context, config);
  targets['type-check'] = buildTypeCheckTarget({}, context, config);

  const lintTarget = buildLintTarget(projectRoot, normalizeOptions, context, config);
  if (lintTarget) {
    targets.lint = lintTarget;
  }

  const testTarget = buildTestTarget(projectRoot, normalizeOptions, context, config);
  if (testTarget) {
    targets.test = testTarget;
  }

  // react v9 lib
  if (projectJSON.projectType === 'library' && tags.includes('vNext')) {
    // *-stories projects
    if (tags.includes('type:stories')) {
      targets['test-ssr'] = {
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
      targets.start = { command: `${config.pmc.exec} storybook`, options: { cwd: projectRoot } };
      targets.storybook = {
        command: `${config.pmc.exec} storybook dev`,
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

      return targets;
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
          tags.includes('ships-amd') ? { module: 'amd', outputPath: 'lib-amd' } : null,
        ].filter(Boolean) as BuildExecutorSchema['moduleOutput'],
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
        tags.includes('ships-amd') ? `{projectRoot}/lib-amd` : null,
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

    targets.start = {
      command: `${config.pmc.exec} storybook`,
      options: { cwd: projectRoot },
    };
    targets.storybook = {
      cache: true,
      command: `${config.pmc.exec} --cwd ../stories storybook`,
      options: { cwd: projectRoot },
      metadata: {
        technologies: ['storybook'],
      },
    };

    const bundleSizeTarget = buildBundleSizeTarget(projectRoot, options, context, config);
    if (bundleSizeTarget) {
      targets['bundle-size'] = bundleSizeTarget;
    }

    const e2eTarget = buildE2eTarget(projectRoot, options, context, config);
    if (e2eTarget) {
      targets.e2e = e2eTarget;
    }

    const verifyPackagingTarget = buildVerifyPackagingTarget(projectRoot, normalizeOptions, context, config);
    if (verifyPackagingTarget) {
      targets['verify-packaging'] = verifyPackagingTarget;
    }

    return targets;
  }

  return targets;
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
  options: Required<WorkspacePluginOptions>,
  context: CreateNodesContextV2,
  config: TaskBuilderConfig,
): TargetConfiguration | null {
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
        { externalDependencies: ['playwright'] },
      ],
      metadata: {
        help: {
          command: `${config.pmc.exec} playwright test --help`,
          example: {},
        },
      },
    };
  }

  return null;
}
