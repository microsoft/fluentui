import { type ExecutorContext, type PromiseExecutor } from '@nx/devkit';

import { compileSwc } from './lib/swc';
import { compileWithGriffelStylesAOT, hasStylesFilesToProcess } from './lib/babel';
import { assetGlobsToFiles, copyAssets } from './lib/assets';
import { cleanOutput } from './lib/clean';
import { NormalizedOptions, normalizeOptions, processAsyncQueue } from './lib/shared';

import { measureEnd, measureStart } from '../../utils';
import generateApiExecutor from '../generate-api/executor';

import { type BuildExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (schema, context) => {
  measureStart('BuildExecutor');

  const options = normalizeOptions(schema, context);
  const tasksInParallel = [
    runBuild(options, context),
    options.generateApi ? generateApiExecutor({}, context) : null,
  ].filter(Boolean) as Array<Promise<boolean>>;

  const success = await processAsyncQueue(tasksInParallel);

  measureEnd('BuildExecutor');

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
