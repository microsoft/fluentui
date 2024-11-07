/* eslint-disable @typescript-eslint/no-shadow */
import {
  type CreateNodesV2,
  createNodesFromFiles,
  TargetConfiguration,
  CreateNodesContextV2,
  CreateNodesResult,
} from '@nx/devkit';
import { dirname } from 'node:path';

import { type TaskBuilderConfig, assertProjectExists } from './shared';

interface TypeCheckPluginOptions {
  targetName?: string;
}

const typescriptConfigGlob = '**/tsconfig.json';

export const createNodesV2: CreateNodesV2<TypeCheckPluginOptions> = [
  typescriptConfigGlob,
  (configFiles, options, context) => {
    return createNodesFromFiles(
      (configFile, options, context) => {
        return createNodesInternal(configFile, options, context);
      },
      configFiles,
      options,
      context,
    );
  },
];

// ===================================================================================================================

function normalizeOptions(options: TypeCheckPluginOptions | undefined): Required<TypeCheckPluginOptions> {
  options ??= {};
  options.targetName ??= 'type-check';

  return options as Required<TypeCheckPluginOptions>;
}

function createNodesInternal(
  configFilePath: string,
  options: TypeCheckPluginOptions | undefined,
  context: CreateNodesContextV2,
): CreateNodesResult {
  const projectRoot = dirname(configFilePath);

  if (!assertProjectExists(projectRoot, context)) {
    return {};
  }

  const normalizedOptions = normalizeOptions(options);

  const targetConfig = buildTypeCheckTarget(normalizedOptions, context, {});

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

export function buildTypeCheckTarget(
  _options: TypeCheckPluginOptions,
  _context: CreateNodesContextV2,
  _config: TaskBuilderConfig,
) {
  const targetConfig: TargetConfiguration = {
    executor: '@fluentui/workspace-plugin:type-check',
    cache: true,
    inputs: ['default', '{projectRoot}/tsconfig.json', '{projectRoot}/tsconfig.*.json'],
    metadata: {
      technologies: ['typescript'],
      description: 'Type check code with TypeScript',
    },
  };

  return targetConfig;
}
