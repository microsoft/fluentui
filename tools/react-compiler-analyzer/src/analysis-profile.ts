import { version as babelVersion } from '@babel/core';

import type { AnalysisProfile, CompilationMode } from './types';

function reactCompilerVersion(): string {
  let compilerPackage: unknown;
  try {
    compilerPackage = require('babel-plugin-react-compiler/package.json');
  } catch (error) {
    if (
      !(error instanceof SyntaxError) &&
      !(
        error instanceof Error &&
        'code' in error &&
        [
          'MODULE_NOT_FOUND',
          'ERR_PACKAGE_PATH_NOT_EXPORTED',
          'ERR_INVALID_PACKAGE_CONFIG',
          'ENOENT',
          'ENOTDIR',
          'EISDIR',
          'EACCES',
          'EPERM',
        ].includes(String(error.code))
      )
    ) {
      throw error;
    }
    console.warn(`Warning: cannot read Babel React Compiler version metadata: ${error.message}`);
    return 'unavailable';
  }
  if (
    typeof compilerPackage !== 'object' ||
    compilerPackage === null ||
    !('version' in compilerPackage) ||
    typeof compilerPackage.version !== 'string' ||
    compilerPackage.version.length === 0
  ) {
    console.warn('Warning: Babel React Compiler version metadata has no valid version.');
    return 'unavailable';
  }
  return compilerPackage.version;
}

export function createAnalysisProfile(mode: CompilationMode, parserPlugins: string[] = []): AnalysisProfile {
  return {
    backend: 'babel',
    babelVersion,
    compilerVersion: reactCompilerVersion(),
    mode,
    parserPlugins: [...parserPlugins],
    noEmit: true,
    panicThreshold: 'none',
    target: 'compiler-default',
    suppressionRules: 'compiler-default',
  };
}
