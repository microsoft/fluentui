import { logger } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { exec } from 'just-scripts-utils';

import { type TsConfig, getTsPathAliasesConfig } from './utils';

export function typeCheck(): Promise<void> | undefined {
  const { isUsingTsSolutionConfigs, tsConfigs } = getTsPathAliasesConfig();

  if (!isUsingTsSolutionConfigs) {
    logger.info('project is not using TS solution config. skipping...');
    return;
  }

  const config = tsConfigs.root;

  if (!config) {
    return;
  }

  const tsConfigsRefs = getTsConfigs(config, { spec: false, e2e: false });

  const asyncQueue: Array<ReturnType<typeof exec>> = [];

  for (const ref of tsConfigsRefs) {
    const program = `tsc -p ${ref} --pretty --baseUrl . --noEmit`;
    asyncQueue.push(exec(program));
  }

  return Promise.all(asyncQueue)
    .then(_ => {
      logger.info('Type checking completed successfully');
      return;
    })
    .catch(err => {
      console.error(err.stdout);
      process.exit(1);
    });
}

function getTsConfigs(solutionConfig: TsConfig, exclude: { spec: boolean; e2e: boolean }) {
  const refs = solutionConfig.references ?? [];
  const refsPaths: string[] = [];

  for (const ref of refs) {
    if (exclude.spec && ref.path.includes('spec')) {
      continue;
    }
    if (exclude.e2e && ref.path.includes('cy')) {
      continue;
    }

    refsPaths.push(ref.path);
  }

  return refsPaths;
}
