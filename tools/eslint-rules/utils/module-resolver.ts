import * as ts from 'typescript';

/**
 * Resolves `specifier` (as used in `sourceFile`) to an absolute file path using the same algorithm
 * the host TS Program uses. Prefers the (faster) `program.getResolvedModule` API exposed in TS ≥ 5.3
 * and falls back to `ts.resolveModuleName` for older toolchains. Returns `undefined` if the module
 * cannot be resolved (e.g. ambient declarations, broken paths).
 */
export function resolveModule(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  specifier: string,
  literal: ts.StringLiteralLike,
): string | undefined {
  // TS ≥ 5.3 exposes program.getResolvedModule
  const getResolvedModule = (
    program as unknown as {
      getResolvedModule?: (
        file: ts.SourceFile,
        moduleName: string,
        mode?: ts.ResolutionMode,
      ) => { resolvedModule?: ts.ResolvedModuleFull } | undefined;
    }
  ).getResolvedModule;
  const mode = (
    ts as unknown as {
      getModeForUsageLocation?: (file: ts.SourceFile, usage: ts.StringLiteralLike) => ts.ResolutionMode;
    }
  ).getModeForUsageLocation?.(sourceFile, literal);

  if (typeof getResolvedModule === 'function') {
    const resolutionResult = getResolvedModule.call(program, sourceFile, specifier, mode);
    if (resolutionResult?.resolvedModule) {
      return resolutionResult.resolvedModule.resolvedFileName;
    }
  }

  // Fallback for older TS: use ts.resolveModuleName against the compiler host.
  const compilerOptions = program.getCompilerOptions();
  const host =
    (program as unknown as { getCompilerHost?: () => ts.ModuleResolutionHost }).getCompilerHost?.() ?? ts.sys;
  const result = ts.resolveModuleName(
    specifier,
    sourceFile.fileName,
    compilerOptions,
    host as ts.ModuleResolutionHost,
    undefined,
    undefined,
    mode,
  );
  return result.resolvedModule?.resolvedFileName;
}

/**
 * `true` when the import specifier refers to a package (e.g. `react`, `@scope/pkg`, `pkg/sub`)
 * rather than a relative or absolute path.
 */
export function isBareSpecifier(specifier: string): boolean {
  return !specifier.startsWith('.') && !specifier.startsWith('/');
}

/**
 * Extracts the npm package name from a bare specifier. Handles both unscoped (`pkg/sub` → `pkg`)
 * and scoped (`@scope/pkg/sub` → `@scope/pkg`) forms.
 */
export function packageNameOf(specifier: string): string {
  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/', 2);
    return name ? `${scope}/${name}` : scope;
  }
  const slash = specifier.indexOf('/');
  return slash === -1 ? specifier : specifier.slice(0, slash);
}

/**
 * Shortens an absolute file path for display in diagnostics: returns the part after the last
 * `node_modules/` segment when present (so users see e.g. `tabster/dist/index.js`), or makes the
 * path workspace-relative when inside the current working directory.
 */
export function shortenPath(absolute: string): string {
  const marker = '/node_modules/';
  const idx = absolute.lastIndexOf(marker);
  if (idx !== -1) {
    return absolute.slice(idx + marker.length);
  }
  const cwd = process.cwd();
  if (absolute.startsWith(cwd)) {
    return absolute.slice(cwd.length + 1);
  }
  return absolute;
}
