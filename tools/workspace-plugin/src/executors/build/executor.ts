import { type ExecutorContext, type PromiseExecutor } from '@nx/devkit';

import { compileSwc } from './lib/swc';
import { compileWithGriffelStylesAOT, hasStylesFilesToProcess } from './lib/babel';
import { assetGlobsToFiles, copyAssets } from './lib/assets';
import { cleanOutput } from './lib/clean';
import { NormalizedOptions, normalizeOptions, processAsyncQueue, runInParallel, runSerially } from './lib/shared';

import { measureEnd, measureStart } from '../../utils';
import generateApiExecutor from '../generate-api/executor';

import { type BuildExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (schema, context) => {
  measureStart('BuildExecutor');

  const options = normalizeOptions(schema, context);
  const assetFiles = assetGlobsToFiles(options.assets ?? [], context.root, options.outputPathRoot);

  const success = await runSerially(
    () => cleanOutput(options, assetFiles),
    () =>
      runInParallel(
        () => runBuild(options, context),
        () => (options.generateApi ? generateApiExecutor({}, context).then(res => res.success) : Promise.resolve(true)),
      ),
    () => copyAssets(assetFiles),
  );

  measureEnd('BuildExecutor');

  return { success };
};

export default runExecutor;

// ===========

async function runBuild(options: NormalizedOptions, _context: ExecutorContext): Promise<boolean> {
  if (hasStylesFilesToProcess(options)) {
    return compileWithGriffelStylesAOT(options);
  }

  const compilationQueue = options.moduleOutput.map(outputConfig => {
    return compileSwc(outputConfig, options);
  });

  return processAsyncQueue(compilationQueue);
}
