import { ChangelogGroupOptions } from 'beachball';
import { AllPackageInfo, getAllPackageInfo } from '../monorepo/index';

/**
 * Generates grouped changelog for vNext
 * @returns Grouped changelog configuration
 */
export function getVNextChangelogGroups(): ChangelogGroupOptions {
  const allPackageInfo = getAllPackageInfo();
  const vNextPackagePaths = getVNextPackagePaths(allPackageInfo);

  return {
    masterPackageName: '@fluentui/react-components',
    changelogPath: 'packages/react-components/react-components',
    include: vNextPackagePaths,
  };
}

export function getVNextPackagePaths(allPackageInfo: AllPackageInfo) {
  return Object.values(allPackageInfo)
    .map(packageInfo => {
      if (packageInfo.packageJson.version.startsWith('9.')) {
        return packageInfo.packagePath;
      }

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
