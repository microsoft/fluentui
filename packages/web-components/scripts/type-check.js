// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { exit } from 'node:process';

const asyncExec = promisify(exec);

main().catch(err => {
  console.error(err);
  exit(1);
});

/**
 * Copied from ${@link 'file://./../../../scripts/tasks/src/type-check.ts'}
 */
async function main() {
  const rootConfig = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '../tsconfig.json'), 'utf-8'));

  const tsConfigsRefs = getTsConfigs(rootConfig, { spec: false, e2e: false });

  const asyncQueue = [];

  for (const ref of tsConfigsRefs) {
    const program = `tsc -p ${ref} --pretty --noEmit --baseUrl .`;
    asyncQueue.push(asyncExec(program));
  }

  return Promise.all(asyncQueue).catch(err => {
    console.error(err.stdout);
    exit(1);
  });
}

/**
 * @param {{references?: Array<{ path: string }>;}} solutionConfig
 * @param {{ spec: boolean, e2e: boolean }} exclude
 */
function getTsConfigs(solutionConfig, exclude) {
  const refs = solutionConfig.references ?? [];
  /** @type {string[]} */
  const refsPaths = [];

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
