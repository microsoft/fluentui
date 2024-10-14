/* eslint-disable @typescript-eslint/no-shadow */
import {
  CreateNodesContextV2,
  CreateNodesResult,
  CreateNodesV2,
  TargetConfiguration,
  createNodesFromFiles,
} from '@nx/devkit';
import { dirname } from 'node:path';

import { assertProjectExists, projectConfigGlob } from './shared';

interface CleanPluginOptions {
  targetName?: string;
}

export const createNodesV2: CreateNodesV2<CleanPluginOptions> = [
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
function normalizeOptions(options: CleanPluginOptions | undefined): Required<CleanPluginOptions> {
  options ??= {};
  options.targetName ??= 'type-check';

  return options as Required<CleanPluginOptions>;
}

function createNodesInternal(
  configFilePath: string,
  options: CleanPluginOptions,
  context: CreateNodesContextV2,
): CreateNodesResult {
  const projectRoot = dirname(configFilePath);

  if (!assertProjectExists(projectRoot, context)) {
    return {};
  }

  const normalizedOptions = normalizeOptions(options);

  const targetConfig: TargetConfiguration = {
    executor: '@fluentui/workspace-plugin:clean',
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
