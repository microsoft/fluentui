import { PromiseExecutor, joinPathFragments, readJsonFile, logger, ExecutorContext } from '@nx/devkit';

import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

import { type TypeCheckExecutorSchema } from './schema';
import { measureEnd, measureStart } from '../../utils';

const asyncExec = promisify(exec);

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

const runExecutor: PromiseExecutor<TypeCheckExecutorSchema> = async (schema, context) => {
  measureStart('TypeCheckExecutor');

  const options = normalizeOptions(schema, context);

  const success = await runTypeCheck(options, context);

  measureEnd('TypeCheckExecutor');

  return { success };
};

export default runExecutor;

// ===================

async function runTypeCheck(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const tsConfigPath = joinPathFragments(context.root, options.project.root, 'tsconfig.json');

  if (!existsSync(tsConfigPath)) {
    logger.error(`Cannot find tsconfig.json at "${tsConfigPath}"`);

    return Promise.resolve(false);
  }

  const projectRootAbsolutePath = joinPathFragments(context.root, options.project.root);
  const baseTsConfig = readJsonFile(joinPathFragments(context.root, options.project.root, 'tsconfig.json'));

  const tsConfigsRefs = getTsConfigs(baseTsConfig, projectRootAbsolutePath, options.excludeProject);
  const asyncQueue = [];

  for (const ref of tsConfigsRefs) {
    const program = `tsc -p ${ref} --pretty --noEmit --baseUrl ${projectRootAbsolutePath}`;

    verboseLog(`Running "${program}"`);

    asyncQueue.push(asyncExec(program));
  }

  return Promise.all(asyncQueue)
    .then(() => {
      return true;
    })
    .catch(err => {
      console.error(err.stdout);
      return false;
    });
}

function normalizeOptions(schema: TypeCheckExecutorSchema, context: ExecutorContext) {
  const defaults = {
    excludeProject: { spec: false, e2e: false },
  };
  const project = context.projectsConfigurations!.projects[context.projectName!];

  return { ...defaults, ...schema, project };
}

function getTsConfigs(
  solutionConfig: { references?: Array<{ path: string }> },
  projectRootPath: string,
  exclude: { spec: boolean; e2e: boolean },
) {
  const refs = solutionConfig.references ?? [];
  const refsPaths: string[] = [];

  for (const ref of refs) {
    if (exclude.spec && ref.path.includes('spec')) {
      continue;
    }
    if (exclude.e2e && ref.path.includes('cy')) {
      continue;
    }

    refsPaths.push(joinPathFragments(projectRootPath, ref.path));
  }

  return refsPaths;
}

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
