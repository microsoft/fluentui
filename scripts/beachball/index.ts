import { BeachballConfig } from 'beachball';
import { getAllPackageInfo } from '../monorepo/index';
import { renderHeader, renderEntry } from './customRenderers';

const allPackageInfo = getAllPackageInfo();
const fluentConvergedPackagePaths = Object.values(allPackageInfo)
  .map(packageInfo => {
    if (packageInfo.packageJson.version.startsWith('9.')) {
      return packageInfo.packagePath;
    }

    // These packages depend on converged packages, but are private
    // Can be included in the publish scope so that dependencies are bumped correctly.
    const privateNonConverged = ['perf-test', 'vr-tests'];

    if (privateNonConverged.includes(packageInfo.packageJson.name)) {
      return packageInfo.packagePath;
    }

    return false;
  })
  .filter(Boolean) as string[];

const ignoreFluentConvergedScope = fluentConvergedPackagePaths.map(path => `!${path}`);
// Northstar is never published with beachball
const ignoreNorthstarScope = '!packages/fluentui/*';

// Default scope used to publish Fluent UI v8 and non-v9 packages
const defaultScope = [ignoreNorthstarScope, ...ignoreFluentConvergedScope];

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
  // https://github.com/microsoft/beachball/pull/599
  // @ts-ignore
  scope: process.env.RELEASE_VNEXT ? fluentConvergedPackagePaths : defaultScope,
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
    groups: [
      {
        masterPackageName: '@fluentui/react-components',
        changelogPath: 'packages/react-components',
        include: fluentConvergedPackagePaths,
      },
    ],
  },
};
