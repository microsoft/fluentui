import { type ExecutorContext, logger } from '@nx/devkit';
import { join } from 'node:path';

import { type BuildExecutorSchema } from '../schema';

type Tasks = () => Promise<boolean>;

export async function runInParallel(...tasks: Tasks[]): Promise<boolean> {
  const processes = tasks.map(task => task());

  return Promise.all(processes)
    .then(results => {
      // if one of the processes failed (returned false) we need to force returning `false` to propagate `false` to final executor result which will fail the process chain
      return results.indexOf(false) !== -1 ? false : true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export async function runSerially(...tasks: Tasks[]): Promise<boolean> {
  for (const task of tasks) {
    const result = await task();
    if (!result) {
      return false;
    }
  }
  return true;
}

export async function processAsyncQueue(value: Promise<unknown>[]): Promise<boolean> {
  return Promise.all(value)
    .then(() => {
      return true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}
export function normalizeOptions(schema: BuildExecutorSchema, context: ExecutorContext) {
  const defaults = {
    generateApi: true,
    clean: true,
  };
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const resolvedSourceRoot = join(project.root, schema.sourceRoot) ?? project.sourceRoot;
  const absoluteProjectRoot = join(context.root, project.root);
  const absoluteSourceRoot = join(context.root, resolvedSourceRoot);
  const absoluteOutputPathRoot = join(context.root, schema.outputPathRoot);
  const enableGriffelRawStyles = schema.enableGriffelRawStyles ?? false;

  return {
    ...defaults,
    ...schema,
    project,
    sourceRoot: resolvedSourceRoot,
    absoluteSourceRoot,
    absoluteProjectRoot,
    absoluteOutputPathRoot,
    enableGriffelRawStyles,

    workspaceRoot: context.root,
  };
}
