import { exec } from 'child_process';
import { promisify } from 'util';

import { series } from 'just-scripts';

import { apiExtractor } from './api-extractor';

const execAsync = promisify(exec);

export function generateApi() {
  return series(generateTypeDeclarations, apiExtractor);
}

function generateTypeDeclarations() {
  const cmd = 'tsc -p ./tsconfig.lib.json --emitDeclarationOnly';
  return execAsync(cmd);
}
