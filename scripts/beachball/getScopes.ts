import { AllPackageInfo, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';

/**
 * Reads package info from the monorepo and generates the scopes for beachball bump and release.
 * Differentiates between vNext and v8 releases.
 *
 * vNext scope includes all packages that have version > 8.x and shared internal packages that need versions bumped.
 * @returns {string[]} Array of package paths for beachball scope
 */
export function getScopes(): string[] {
  const allPackageInfo = getAllPackageInfo();

  if (process.env.RELEASE_VNEXT) {
    return [...getVNextPackagePaths(allPackageInfo), ...getSharedPackagePaths(allPackageInfo)];
  }

  const ignoreVNextScope = getVNextPackagePaths(allPackageInfo).map(path => `!${path}`);
  // Northstar is never published with beachbal
  const ignoreNorthstarScope = '!packages/fluentui/*';
  return [ignoreNorthstarScope, ...ignoreVNextScope];
}

function getVNextPackagePaths(allPackageInfo: AllPackageInfo) {
  return Object.values(allPackageInfo)
    .map(packageInfo => {
      if (isConvergedPackage(packageInfo.packageJson)) {
        return packageInfo.packagePath;
      }

      return false;
    })
    .filter(Boolean) as string[];
}

function getSharedPackagePaths(allPackageInfo: AllPackageInfo) {
  return Object.values(allPackageInfo)
    .map(packageInfo => {
      // These packages depend on converged packages, but are private
      // Can be included in the publish scope so that dependencies are bumped correctly.
      const privateNonConverged = ['@fluentui/perf-test', '@fluentui/vr-tests'];

      if (privateNonConverged.includes(packageInfo.packageJson.name)) {
        return packageInfo.packagePath;
      }

      return false;
    })
    .filter(Boolean) as string[];
}
