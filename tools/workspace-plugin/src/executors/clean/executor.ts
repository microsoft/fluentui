import { ExecutorContext, PromiseExecutor, logger } from '@nx/devkit';
import { CleanExecutorSchema } from './schema';
import { join } from 'node:path';
import { rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const runExecutor: PromiseExecutor<CleanExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  const success = await runClean(options, context);

  return { success };
};

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

async function runClean(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const projectAbsoluteRootPath = join(context.root, options.project.root);

  const directories = [
    'temp',
    'dist',
    'dist-storybook',
    'storybook-static',
    'lib',
    'lib-amd',
    'lib-commonjs',
    'coverage',
  ];

  const results = directories.map(dir => {
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
  const defaults = {};
  const project = context.projectsConfigurations!.projects[context.projectName!];

  return { ...defaults, ...schema, project };
}

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
