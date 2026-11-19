import { type PackageJson } from './types';

/** Export map key of the build-generated CSS Modules entry, see `executors/build/lib/css-modules-entry.ts`. */
export const CSS_MODULES_SUBPATH = './css-modules';
/** Directory, inside every module output (`lib`, `lib-commonjs`), holding the generated entry. */
export const CSS_MODULES_DIR = 'css-modules';

export function hasCssSideEffects(packageJson: Pick<PackageJson, 'sideEffects'>): boolean {
  const { sideEffects } = packageJson;
  return sideEffects === true || (Array.isArray(sideEffects) && sideEffects.some(pattern => pattern.endsWith('.css')));
}

export function hasCssModulesEntry(packageJson: Pick<PackageJson, 'exports'>): boolean {
  return Boolean(packageJson.exports && CSS_MODULES_SUBPATH in packageJson.exports);
}
