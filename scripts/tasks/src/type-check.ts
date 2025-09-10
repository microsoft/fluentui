import * as fs from 'node:fs';
import * as path from 'node:path';

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

type SimpleTsConfig = { compilerOptions: Record<string, unknown>; [key: string]: unknown };
export async function typeCheckWithConfigOverride(
  updater: (config: SimpleTsConfig) => Record<string, unknown>,
): Promise<void> {
  const cwd = process.cwd();
  const rootTsConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'tsconfig.json'), 'utf-8'));

  const tsConfigsRefs = getTsConfigs(rootTsConfig, { spec: false, e2e: false });

  const configs: { [path: string]: Record<string, unknown> } = {};

  for (const ref of tsConfigsRefs) {
    const refPath = path.join(cwd, ref);
    const original = JSON.parse(fs.readFileSync(refPath, 'utf-8'));
    configs[refPath] = original;

    const updated = updater(original);
    fs.writeFileSync(refPath, JSON.stringify(updated, null, 2), 'utf-8');
  }

  try {
    const asyncQueue: Array<ReturnType<typeof exec>> = [];

    for (const ref of tsConfigsRefs) {
      const program = `tsc -p ${ref} --pretty --baseUrl . --noEmit`;
      asyncQueue.push(exec(program));
    }

    await Promise.all(asyncQueue).then(_ => {
      logger.info('Type checking completed successfully');
      return;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err.stdout);
    // set exit code to 1 to exit process naturally and allow finally block to run
    process.exitCode = 1;
  } finally {
    const entries = Object.entries(configs);
    for (const [configPath, config] of entries) {
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    }
    await exec('yarn prettier "tsconfig.*.json" -w');
  }
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
