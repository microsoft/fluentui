import { logger } from '@nx/devkit';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

import { type NormalizedOptions, processAsyncQueue } from './shared';

export async function cleanOutput(options: NormalizedOptions, assetFiles: Array<{ input: string; output: string }>) {
  if (!options.clean) {
    return true;
  }

  const swcOutputPaths = options.moduleOutput.map(outputConfig => {
    return join(options.absoluteProjectRoot, outputConfig.outputPath);
  });
  const assetsOutputPaths = assetFiles.map(asset => asset.output);
  const outputPaths = [...swcOutputPaths, ...assetsOutputPaths];
  const outputPathsFormattedLog = outputPaths.reduce((acc, outputPath) => {
    return `${acc}\n - ${outputPath}`;
  }, '');

  logger.log(`Cleaning outputs:\n ${outputPathsFormattedLog}`);
  const result = outputPaths.map(outputPath => rm(outputPath, { recursive: true, force: true }));

  return processAsyncQueue(result);
}
