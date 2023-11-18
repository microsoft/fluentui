const defaultLibPaths = ['lib/**/*.d.ts', 'lib-commonjs/**/*.d.ts', 'lib-amd/**/*.d.ts'];

/**
 * @param libPaths - Globs to .d.ts files which need postprocessing
 */
export function postprocessTask(libPaths: string[] = defaultLibPaths) {
  return async function () {
    // No-op for now. This was previously used for TS 3.7 => 3.5 compat. We'll likely need it again
    // but not for now, while our TS minbar and local version match.
  };
}

postprocessTask.defaultLibPaths = defaultLibPaths;
