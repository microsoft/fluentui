import { type ExecutorContext, type PromiseExecutor, logger } from '@nx/devkit';
import { type CleanExecutorSchema } from './schema';
import { join } from 'node:path';
import { rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

import { measureEnd, measureStart } from '../../utils';

const runExecutor: PromiseExecutor<CleanExecutorSchema> = async (schema, context) => {
  measureStart('CleanExecutor');

  const options = normalizeOptions(schema, context);

  const success = await runClean(options, context);

  measureEnd('CleanExecutor');

  return { success };
};

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

async function runClean(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const projectAbsoluteRootPath = join(context.root, options.project.root);

  const results = options.paths.map(dir => {
    const dirPath = join(projectAbsoluteRootPath, dir);
    if (existsSync(dirPath)) {
      verboseLog(`removing "${dirPath}"`);
      return rm(dirPath, { force: true, recursive: true });
    }
    return Promise.resolve();
  });

  return Promise.all(results)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export default runExecutor;

function normalizeOptions(schema: CleanExecutorSchema, context: ExecutorContext) {
  const defaults = {
    paths: ['temp', 'dist', 'dist-storybook', 'storybook-static', 'lib', 'lib-amd', 'lib-commonjs', 'coverage'],
  };
  const project = context.projectsConfigurations!.projects[context.projectName!];

  return { ...defaults, ...schema, project };
}

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
