import { BeachballConfig } from 'beachball';
import { getAllPackageInfo, isConvergedPackage } from '../monorepo/index';
import { renderHeader, renderEntry } from './customRenderers';

const allPackageInfo = getAllPackageInfo();
const fluentConvergedPackagePaths = Object.values(allPackageInfo)
  .map(packageInfo => {
    if (isConvergedPackage(packageInfo.packageJson) && !packageInfo.packageJson.private) {
      return packageInfo.packagePath;
    }

    return false;
  })
  .filter(Boolean) as string[];

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
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
