import { type ExecutorContext, type PromiseExecutor } from '@nx/devkit';

import { compileSwc } from './lib/swc';
import { compileWithGriffelStylesAOT, hasStylesFilesToProcess } from './lib/babel';
import { assetGlobsToFiles, copyAssets } from './lib/assets';
import { cleanOutput } from './lib/clean';
import { NormalizedOptions, normalizeOptions, processAsyncQueue } from './lib/shared';

import { type BuildExecutorSchema } from './schema';

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
