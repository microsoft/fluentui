import * as fs from 'node:fs';
import path from 'node:path';

import { workspaceRoot } from '@nx/devkit';
import { logger } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { exec } from 'just-scripts-utils';

import { type TsConfig, getTsPathAliasesConfig } from './utils';

export function typeCheck() {
  const { isUsingTsSolutionConfigs, tsConfigFileContents, tsConfigs, tsConfigFilePaths } = getTsPathAliasesConfig();

  if (!isUsingTsSolutionConfigs) {
    logger.info('project is not using TS solution config. skipping...');
    return;
  }

  const content = tsConfigFileContents.root;
  const config = tsConfigs.root;
  const configPath = tsConfigFilePaths.root;

  if (!(content && config)) {
    return;
  }

  // turn off path aliases.
  // @ts-expect-error - bad just-scripts ts types
  config.compilerOptions.paths = {};
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

  const cmd = 'tsc';
  const args = ['-b', '--pretty', configPath];
  const program = `${cmd} ${args.join(' ')}`;

  return exec(program)
    .catch(err => {
      console.error(err.stdout);
      // restore original tsconfig.json
      fs.writeFileSync(configPath, content, 'utf-8');
      process.exit(1);
    })
    .finally(() => {
      // restore original tsconfig.json
      fs.writeFileSync(configPath, content, 'utf-8');
    });
}

export async function typeCheckV2() {
  const { isUsingTsSolutionConfigs, tsConfigs } = getTsPathAliasesConfig();

  if (!isUsingTsSolutionConfigs) {
    logger.info('project is not using TS solution config. skipping...');
    return;
  }

  const config = tsConfigs.root;

  if (!config) {
    return;
  }

  const cwd = process.cwd();
  const projectRoot = path.relative(workspaceRoot, cwd);
  const output = path.resolve(cwd, tsConfigs.lib?.compilerOptions.outDir as string, projectRoot);

  const tsConfigsRefs = getTsConfigs(config, output, { spec: false, e2e: false });

  console.log({ tsConfigsRefs });

  const asyncQueue = [];

  for (const ref of tsConfigsRefs) {
    const program = `tsc -p ${ref} --pretty --baseUrl .`;
    asyncQueue.push(exec(program));
  }

  return Promise.all(asyncQueue).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

function getTsConfigs(solutionConfig: TsConfig, buildOutput: string, exclude: { spec: boolean; e2e: boolean }) {
  const useIncremental = process.env.FLUENT_USE_INCREMENTAL;
  const refs = solutionConfig.references ?? [];
  const refsPaths: string[] = [];

  const tsBuildInfoPath = path.join(buildOutput, 'tsconfig.lib.tsbuildinfo');

  for (const ref of refs) {
    if (exclude.spec && ref.path.includes('spec')) {
      continue;
    }
    if (exclude.e2e && ref.path.includes('cy')) {
      continue;
    }
    if (useIncremental && ref.path.includes('tsconfig.lib.json') && fs.existsSync(tsBuildInfoPath)) {
      logger.info('skipping tsconfig.lib.json type-check which happened within generate-api task...');
      continue;
    }

    refsPaths.push(ref.path);
  }

  return refsPaths;
}
