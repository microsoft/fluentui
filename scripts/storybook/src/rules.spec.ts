import { getAllPackageInfo } from '@fluentui/scripts-monorepo';
import * as semver from 'semver';

import { codesandboxRule } from './rules';

describe(`rules`, () => {
  describe(`codesandbox`, () => {
    it(`should generate rule definition with overridden babel loader`, () => {
      const allPackagesInfo = getAllPackageInfo();
      const allPackagesInfoProjects = Object.values(allPackagesInfo);
      const suitePackage = allPackagesInfo['@fluentui/react-components'];
      const suitePackageDependencies = suitePackage.packageJson.dependencies ?? {};
      const unstablePackage = allPackagesInfoProjects.find(metadata => {
        return (
          suitePackageDependencies[metadata.packageJson.name] &&
          semver.prerelease(metadata.packageJson.version) !== null
        );
      });
      const stableSuitePackages = allPackagesInfoProjects.reduce((acc, metadata) => {
        if (
          suitePackageDependencies[metadata.packageJson.name] &&
          semver.prerelease(metadata.packageJson.version) === null
        ) {
          acc[metadata.packageJson.name] = { replace: '@fluentui/react-components' };
        }
        return acc;
      }, {} as Record<string, { replace: string }>);

      const options = (codesandboxRule.use as { options: Record<string, unknown> }).options;

      expect(options).toEqual(
        expect.objectContaining({
          customize: expect.stringContaining('loaders/custom-loader.js'),
          plugins: [
            [
              expect.any(Function),
              expect.objectContaining({
                ...stableSuitePackages,
                ...(unstablePackage
                  ? { [unstablePackage.packageJson.name]: { replace: '@fluentui/react-components/unstable' } }
                  : null),
              }),
            ],
          ],
        }),
      );
    });
  });
});
