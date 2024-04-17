import { execSync } from 'child_process';

import { series } from 'just-scripts';

import { apiExtractor } from './api-extractor';
import { getJustArgv } from './argv';
import { getTsPathAliasesConfigUsedOnlyForDx } from './utils';

export function generateApi() {
  return series(generateTypeDeclarations, apiExtractor);
}

function generateTypeDeclarations() {
  const args = getJustArgv();

  const { tsConfigFileForCompilation } = getTsPathAliasesConfigUsedOnlyForDx();
  const cmd = [
    'tsc',
    `-p ./${tsConfigFileForCompilation}`,
    '--emitDeclarationOnly',
    // turn off path aliases.
    '--baseUrl .',
    args.incremental ? '--incremental' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return execSync(cmd, { stdio: 'inherit' });
}
