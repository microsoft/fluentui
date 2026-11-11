import type { AnalysisProfile, CompilationMode } from './types';

function packageVersion(packageName: 'oxc-transform-react' | 'oxc-parser'): string {
  let compilerPackage: unknown;
  try {
    compilerPackage = require(`${packageName}/package.json`);
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
    console.warn(`Warning: cannot read ${packageName} version metadata: ${error.message}`);
    return 'unavailable';
  }
  if (
    typeof compilerPackage !== 'object' ||
    compilerPackage === null ||
    !('version' in compilerPackage) ||
    typeof compilerPackage.version !== 'string' ||
    compilerPackage.version.length === 0
  ) {
    console.warn(`Warning: ${packageName} version metadata has no valid version.`);
    return 'unavailable';
  }
  return compilerPackage.version;
}

export function createAnalysisProfile(mode: CompilationMode): AnalysisProfile {
  return {
    backend: 'oxc',
    compilerVersion: packageVersion('oxc-transform-react'),
    parserVersion: packageVersion('oxc-parser'),
    mode,
    jsx: 'preserve',
    outputMode: 'client',
    sourcemap: true,
    noEmit: false,
    panicThreshold: 'none',
    reportDiagnostics: true,
    target: '19',
    suppressionRules: 'compiler-default',
    gating: { source: '__rca_gate__', importSpecifierName: '__rcaGate' },
  };
}
