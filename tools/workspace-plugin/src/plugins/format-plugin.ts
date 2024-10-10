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

import { assertProjectExists, projectConfigGlob } from './shared';

interface FormatPluginOptions {
  targetName?: string;
}

const pmc = getPackageManagerCommand();

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
        command: `${pmc.exec} prettier --help`,
        example: {},
      },
    },
    configurations: {
      check: {
        command: 'prettier --check {projectRoot}',
      },
    },
  };

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
