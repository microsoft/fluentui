import { execSync } from 'node:child_process';

import { deprecateReactComponentsPreviewPackages } from './deprecate-react-components-preview-packages';
// fixtures
import * as noChangeFilesFixture from './fixtures/deprecate-react-components-preview-packages/no-change-files/fixture';
import * as noPreviewPackagesFixture from './fixtures/deprecate-react-components-preview-packages/no-preview-packages/fixture';
import * as withPreviewPackagesFixture from './fixtures/deprecate-react-components-preview-packages/with-preview-packages/fixture';

// Mock the `execSync` function, as we don't want to actually run the `npm deprecate` command
jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('deprecateReactComponentsPreviewPackages', () => {
  it('should skip deprecating packages (no change files)', () => {
    deprecateReactComponentsPreviewPackages(noChangeFilesFixture.input);

    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it('should skip deprecating packages (no preview packages)', () => {
    deprecateReactComponentsPreviewPackages(noPreviewPackagesFixture.input);

    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it('should deprecate preview packages', () => {
    deprecateReactComponentsPreviewPackages(withPreviewPackagesFixture.input);

    expect(mockExecSync).toHaveBeenCalledTimes(withPreviewPackagesFixture.output.packagesToDeprecate.length);

    withPreviewPackagesFixture.output.packagesToDeprecate.forEach(deprecatedPackage => {
      const stablePackage = deprecatedPackage.replace('-preview', '');

      expect(mockExecSync).toHaveBeenCalledWith(
        `npm deprecate ${deprecatedPackage} "Deprecated in favor of stable release - use/migrate to ${stablePackage}" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=npm-token`,
        { stdio: 'inherit' },
      );
    });
  });

  it('should throw an error (change dir is not correct)', () => {
    expect(() =>
      deprecateReactComponentsPreviewPackages({
        argv: {
          changeFilesRoot: 'wrong-path',
          token: 'npm-token',
        },
        packages: withPreviewPackagesFixture.input.packages,
      }),
    ).toThrow();
  });

  it('should throw an error (package deprecation/npm command fails)', () => {
    mockExecSync.mockImplementation(() => {
      throw new Error('Failed to deprecate package');
    });

    expect(() => deprecateReactComponentsPreviewPackages(withPreviewPackagesFixture.input)).toThrow();
  });
});
