import { type ExecutorContext, type PromiseExecutor } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import { compileSwc } from './swc';
import { babel, hasStylesFilesToProcess } from './babel';
import { assetGlobsToFiles, copyAssets } from './assets';
import { cleanOutput } from './clean';
import { NormalizedOptions, normalizeOptions, processAsyncQueue } from './shared';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  const success = await runBuild(options, context);

  return { success };
};

export default runExecutor;

// ===========

async function runBuild(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const assetFiles = assetGlobsToFiles(options.assets ?? [], context.root, options.outputPathRoot);

  const cleanResult = await cleanOutput(options, assetFiles);
  if (!cleanResult) {
    return false;
  }

  if (hasStylesFilesToProcess(options)) {
    return compileWithGriffelStylesAOT(options, () => copyAssets(assetFiles));
  }

  const compilationQueue = options.moduleOutput.map(outputConfig => {
    return compileSwc(outputConfig, options);
  });

  return processAsyncQueue(compilationQueue, () => copyAssets(assetFiles));
}

/**
 *
 * TODO: remove this and all related logic once we will be able to enable https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md
 */
async function compileWithGriffelStylesAOT(options: NormalizedOptions, successCallback: () => Promise<boolean>) {
  const moduleOutput = [...options.moduleOutput];
  const esmConfigId = moduleOutput.findIndex(outputConfig => outputConfig.module === 'es6');
  if (esmConfigId === -1) {
    throw new Error('es6 module output is required');
  }
  const esmConfig = moduleOutput[esmConfigId];
  delete moduleOutput[esmConfigId];
  const restOfConfigs = moduleOutput;

  await compileSwc(esmConfig, options);
  await babel(esmConfig, options);

  const compilationQueue = restOfConfigs.map(outputConfig => {
    return compileSwc(outputConfig, { ...options, sourceRoot: esmConfig.outputPath });
  });

  return processAsyncQueue(compilationQueue, successCallback);
}
