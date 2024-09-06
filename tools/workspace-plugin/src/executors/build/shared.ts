import { type ExecutorContext, logger } from '@nx/devkit';
import { join } from 'node:path';

import { type BuildExecutorSchema } from './schema';

export async function processAsyncQueue(value: Promise<unknown>[], successCallback?: () => Promise<boolean>) {
  return Promise.all(value)
    .then(() => {
      return successCallback ? successCallback() : true;
    })
    .catch(err => {
      logger.error(err);
      return false;
    });
}

export interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}
export function normalizeOptions(schema: BuildExecutorSchema, context: ExecutorContext) {
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
