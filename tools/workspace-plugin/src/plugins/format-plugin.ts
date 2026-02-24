/* eslint-disable @typescript-eslint/no-shadow */
import {
  type CreateNodesV2,
  createNodesFromFiles,
  TargetConfiguration,
  CreateNodesContextV2,
  CreateNodesResult,
  getPackageManagerCommand,
} from '@nx/devkit';
import { dirname } from 'node:path';

import { type TaskBuilderConfig, assertProjectExists, projectConfigGlob } from './shared';

interface FormatPluginOptions {
  targetName?: string;
}

export const createNodesV2: CreateNodesV2<FormatPluginOptions> = [
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
function normalizeOptions(options: FormatPluginOptions | undefined): Required<FormatPluginOptions> {
  options ??= {};
  options.targetName ??= 'format';

  return options as Required<FormatPluginOptions>;
}

function createNodesInternal(
  configFilePath: string,
  options: FormatPluginOptions,
  context: CreateNodesContextV2,
): CreateNodesResult {
  const projectRoot = dirname(configFilePath);

  if (!assertProjectExists(projectRoot, context)) {
    return {};
  }

  const normalizedOptions = normalizeOptions(options);
  const pmc = getPackageManagerCommand('yarn');
  const config = {
    pmc: {
      ...pmc,
      exec: 'yarn run -TB',
    },
  };

  const targetConfig = buildFormatTarget(normalizedOptions, context, config);

  return {
    projects: {
      [projectRoot]: {
        targets: {
          [normalizedOptions.targetName]: targetConfig,
        },
      },
    },
  };
}

export function buildFormatTarget(
  _options: FormatPluginOptions,
  _context: CreateNodesContextV2,
  config: Required<TaskBuilderConfig>,
) {
  const targetConfig: TargetConfiguration = {
    command: 'prettier --write {projectRoot}',
    cache: true,
    inputs: [
      'default',
      '{workspaceRoot}/.prettierignore',
      '{workspaceRoot}/prettier.config.js',
      '{workspaceRoot}/prettier.config.json',
      '{projectRoot}/**',
    ],
    metadata: {
      technologies: ['prettier'],
      description: 'Format code with prettier',
      help: {
        command: `${config.pmc.exec} prettier --help`,
        example: {},
      },
    },
    configurations: {
      check: {
        command: 'prettier --check {projectRoot}',
      },
    },
  };

  return targetConfig;
}
