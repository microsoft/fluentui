import { type ExecutorContext, type PromiseExecutor } from '@nx/devkit';

import { compileSwc } from './lib/swc';
import { compileWithGriffelStylesAOT, compileWithReactCompiler, hasStylesFilesToProcess } from './lib/babel';
import { compileCssModules } from './lib/css-modules';
import { assetGlobsToFiles, copyAssets } from './lib/assets';
import { cleanOutput } from './lib/clean';
import { cjsRenameTransforms, copyCjsTypes } from './lib/cjs-extension';
import { NormalizedOptions, normalizeOptions, processAsyncQueue, runInParallel, runSerially } from './lib/shared';

import { measureEnd, measureStart } from '../../utils';
import generateApiExecutor from '../generate-api/executor';
import { type GenerateApiExecutorSchema } from '../generate-api/schema';

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
        () => {
          if (!options.generateApi) {
            return Promise.resolve(true);
          }
          const generateApiSchema: GenerateApiExecutorSchema =
            typeof options.generateApi === 'object' ? options.generateApi : {};
          return generateApiExecutor(generateApiSchema, context).then(res => res.success);
        },
      ),
    // Serial, and after the parallel leg on purpose: this reads `lib*/` (written by
    // runBuild) and writes into `dist/` (written by generate-api) — running it inside the
    // parallel block would race both.
    () => compileCssModules(options),
    () => copyAssets(assetFiles),
    () => copyCjsTypes(options),
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

  if (options.reactCompiler) {
    return compileWithReactCompiler(options);
  }

  const compilationQueue = options.moduleOutput.map(outputConfig => {
    return compileSwc(outputConfig, options, cjsRenameTransforms(outputConfig, options));
  });

  return processAsyncQueue(compilationQueue);
}
