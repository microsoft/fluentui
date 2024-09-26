import { execSync } from 'node:child_process';

import type { AllPackageInfo } from '@fluentui/scripts-monorepo';

import { deprecateReactComponentsPreviewPackages } from './deprecate-react-components-preview-packages';

// Mock the `execSync` function, as we don't want to actually run the `npm deprecate` command
jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

const packages: AllPackageInfo = {
  // preview => stable package, published preview package should be deprecated
  'react-carousel': {
    packagePath: 'packages/react-carousel',
    packageJson: {
      name: '@fluentui/react-carousel',
      main: 'lib/index.js',
      version: '9.0.0-alpha.0',
    },
    projectConfig: {
      root: 'packages/react-carousel',
      name: 'react-carousel',
      tags: ['vNext'],
    },
  },
  // still in preview, should not be deprecated
  'react-color-picker-preview': {
    packagePath: 'packages/react-color-picker-preview',
    packageJson: {
      name: '@fluentui/react-color-picker-preview',
      main: 'lib/index.js',
      version: '0.1.2',
    },
    projectConfig: {
      root: 'packages/react-color-picker-preview',
      name: 'react-color-picker-preview',
      tags: ['vNext'],
    },
  },
  'react-dialog': {
    packagePath: 'packages/react-dialog',
    packageJson: {
      name: '@fluentui/react-dialog',
      main: 'lib/index.js',
      version: '9.1.2',
    },
    projectConfig: {
      root: 'packages/react-dialog',
      name: 'react-dialog',
      tags: ['vNext'],
    },
  },
  'react-drawer': {
    packagePath: 'packages/react-drawer',
    packageJson: {
      name: '@fluentui/react-drawer',
      main: 'lib/index.js',
      version: '9.1.2',
    },
    projectConfig: {
      root: 'packages/react-drawer',
      name: 'react-drawer',
      tags: ['vNext'],
    },
  },
};

describe('deprecateReactComponentsPreviewPackages', () => {
  it('should skip deprecating packages (no change files)', () => {
    deprecateReactComponentsPreviewPackages({
      argv: {
        changeFilesRoot:
          'scripts/executors/src/__fixtures__/deprecate-react-components-preview-packages/no-change-files/change',
        token: 'npm-token',
      },
      packages,
    });

    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it('should skip deprecating packages (no preview packages)', () => {
    deprecateReactComponentsPreviewPackages({
      argv: {
        changeFilesRoot:
          'scripts/executors/src/__fixtures__/deprecate-react-components-preview-packages/no-preview-packages/change',
        token: 'npm-token',
      },
      packages,
    });

    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it('should deprecate preview packages', () => {
    deprecateReactComponentsPreviewPackages({
      argv: {
        changeFilesRoot:
          'scripts/executors/src/__fixtures__/deprecate-react-components-preview-packages/with-preview-packages/change',
        token: 'npm-token',
      },
      packages,
    });

    expect(mockExecSync).toHaveBeenCalledTimes(1);

    expect(mockExecSync).toHaveBeenCalledWith(
      `npm deprecate @fluentui/react-carousel-preview "Deprecated in favor of stable release - use/migrate to @fluentui/react-carousel" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=npm-token`,
      { stdio: 'inherit' },
    );
  });

  it('should throw an error (change dir is not correct)', () => {
    expect(() =>
      deprecateReactComponentsPreviewPackages({
        argv: {
          changeFilesRoot: 'wrong-path',
          token: 'npm-token',
        },
        packages,
      }),
    ).toThrow();
  });

  it('should throw an error (package deprecation/npm command fails)', () => {
    mockExecSync.mockImplementation(() => {
      throw new Error('Failed to deprecate package');
    });

    expect(() =>
      deprecateReactComponentsPreviewPackages({
        argv: {
          changeFilesRoot:
            'scripts/executors/src/__fixtures__/deprecate-react-components-preview-packages/with-preview-packages/change',
          token: 'npm-token',
        },
        packages,
      }),
    ).toThrow();
  });
});
