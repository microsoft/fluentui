import { getAllPackageInfo } from '@fluentui/scripts-monorepo';
import * as semver from 'semver';

import { codesandboxRule } from './rules';

describe(`rules`, () => {
  describe(`codesandbox`, () => {
    it(`should generate rule definition with overridden babel loader`, () => {
      const unstablePackage = Object.values(getAllPackageInfo()).find(metadata => {
        return (
          metadata.packagePath.includes('packages/') &&
          metadata.packageJson.version.startsWith('9') &&
          semver.prerelease(metadata.packageJson.version) !== null
        );
      });

      const options = (codesandboxRule.use as { options: Record<string, unknown> }).options;

      expect(options).toEqual(
        expect.objectContaining({
          customize: expect.stringContaining('loaders/custom-loader.js'),
          plugins: [
            [
              expect.any(Function),
              expect.objectContaining({
                '@fluentui/react-migration-v8-v9': { replace: '@fluentui/react-migration-v8-v9' },
                '@fluentui/react-utilities': { replace: '@fluentui/react-components' },
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
