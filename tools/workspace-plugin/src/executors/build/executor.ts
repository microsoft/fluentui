import { ExecutorContext, PromiseExecutor, logger } from '@nx/devkit';

import { join } from 'node:path';

import { BuildExecutorSchema } from './schema';
import { compileSwc } from './swc';
import { babel, hasStylesFilesToProcess } from './babel';
import { assetGlobsToFiles, copyAssets } from './assets';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  const success = await runBuild(options, context);

  return { success };
};

export default runExecutor;

// ===========

export interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}
function normalizeOptions(schema: BuildExecutorSchema, context: ExecutorContext) {
  const defaults = {
    clean: true,
  };
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const resolvedSourceRoot = join(project.root, schema.sourceRoot) ?? project.sourceRoot;
  const absoluteProjectRoot = join(context.root, project.root);
  const absoluteSourceRoot = join(context.root, resolvedSourceRoot);
  const absoluteOutputPathRoot = join(context.root, schema.outputPathRoot);

  return {
    ...defaults,
    ...schema,
    project,
    sourceRoot: resolvedSourceRoot,
    absoluteSourceRoot,
    absoluteProjectRoot,
    absoluteOutputPathRoot,

    workspaceRoot: context.root,
  };
}

async function runBuild(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const assetFiles = assetGlobsToFiles(options.assets ?? [], context.root, options.outputPathRoot);
  const copyResult = await copyAssets(assetFiles);

  if (!copyResult) {
    return false;
  }

  if (hasStylesFilesToProcess(options)) {
    return compileWithGriffelStylesAOT(options);
  }

  const compilationQueue = options.moduleOutput.map(outputConfig => {
    return compileSwc(outputConfig, options);
  });

  return Promise.all(compilationQueue)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

/**
 *
 * TODO: remove this and all related logic once we will be able to enable https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md
 */
async function compileWithGriffelStylesAOT(options: NormalizedOptions) {
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

  return Promise.all(compilationQueue)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}
