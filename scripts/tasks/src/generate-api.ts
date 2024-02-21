import { execSync } from 'child_process';

import { series } from 'just-scripts';

import { apiExtractor } from './api-extractor';
import { getTsPathAliasesConfigUsedOnlyForDx } from './utils';

export function generateApi() {
  return series(generateTypeDeclarations, apiExtractor);
}

function generateTypeDeclarations() {
  const { /* isUsingPathAliasesForDx, */ tsConfigFileForCompilation } = getTsPathAliasesConfigUsedOnlyForDx();
  const cmd = [
    'tsc',
    `-p ./${tsConfigFileForCompilation}`,
    '--emitDeclarationOnly',
    '--baseUrl .',
    // isUsingPathAliasesForDx ? '--baseUrl .' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return execSync(cmd, { stdio: 'inherit' });
}
