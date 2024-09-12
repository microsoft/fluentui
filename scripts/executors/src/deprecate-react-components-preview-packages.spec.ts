import childProcess from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import monorepoScripts from '@fluentui/scripts-monorepo';
import * as devkit from '@nx/devkit';
import type { ChangeType } from 'beachball';

import { deprecatePackage, getPackagesToDeprecate } from './deprecate-react-components-preview-packages';

const mockExecSync = jest.spyOn(childProcess, 'execSync');
const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
const mockReadJsonFile = jest.spyOn(devkit, 'readJsonFile');
const mockJoin = jest.spyOn(path, 'join');
const mockGetAllPackageInfo = jest.spyOn(monorepoScripts, 'getAllPackageInfo');

describe('deprecatePackage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute npm deprecate command', () => {
    mockExecSync.mockImplementation(() => '');

    deprecatePackage('test-package', 'npm-token');

    expect(mockExecSync).toHaveBeenCalledWith(
      'npm deprecate test-package "Deprecated in favor of stable release" --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=npm-token',
      { stdio: 'inherit' },
    );
  });

  it('should log error when deprecation fails', () => {
    mockExecSync.mockImplementationOnce(() => {
      throw new Error('Deprecation failed');
    });

    expect(() => deprecatePackage('test-package', 'npm-token')).toThrowError(
      'Failed to deprecate "test-package" package',
    );
  });
});

describe('getPackagesToDeprecate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct preview packages to deprecate', () => {
    setup({
      // package to deprecate
      'package-a': {
        changeFile: { type: 'minor' },
        version: '9.0.0-alpha.0',
      },
      // ignore, as there is no change file for the package
      'package-b': {
        changeFile: null,
        version: '9.4.1',
      },
      // package to deprecate
      'package-c': {
        changeFile: { type: 'minor' },
        version: '9.0.0-alpha.0',
      },
      // ignore, as it has a `-preview` suffix
      'package-d-preview': {
        changeFile: { type: 'minor' },
        version: '9.0.0-alpha.0',
      },
      // ignore, as the package version is not `9.0.0-alpha.0`
      'package-e': {
        changeFile: { type: 'minor' },
        version: '9.1.2',
      },
    });

    const result = getPackagesToDeprecate();
    expect(result).toEqual(['@fluentui/package-a', '@fluentui/package-c']);
  });

  type PreviewPackageConfig = {
    changeFile: { type: ChangeType } | null;
    version: string;
  };

  function setup(packages: Record<string, PreviewPackageConfig> = {}) {
    const allPackages = Object.entries(packages).reduce<monorepoScripts.AllPackageInfo>(
      (acc, [packageName, { version }]) => {
        const packageNameWithScope = `@fluentui/${packageName}`;
        acc[packageNameWithScope] = {
          packagePath: '',
          packageJson: {
            name: packageNameWithScope,
            version,
            main: 'dist/index.js',
          },
          projectConfig: {
            root: `packages/${packageName}`,
            name: packageName,
            tags: ['web', 'vNext'],
          },
        };

        return acc;
      },
      {},
    );

    // Mock all packages info
    mockGetAllPackageInfo.mockImplementation(predicate => {
      const allPackageInfo: monorepoScripts.AllPackageInfo = {};

      for (const [packageName, packageInfo] of Object.entries(allPackages)) {
        if (predicate && !predicate({ project: packageInfo.projectConfig, packageJson: packageInfo.packageJson })) {
          continue;
        }

        allPackageInfo[packageName] = packageInfo;
      }

      return allPackageInfo;
    });

    // Mock change file directory contents
    mockReaddirSync.mockReturnValue(
      Object.keys(packages)
        .filter(packageName => !!packages[packageName].changeFile)
        .map(packageName => `@fluentui-${packageName}-hash123.json`) as unknown as fs.Dirent[],
    );

    // Mock change file contents
    mockReadJsonFile.mockImplementation(filePath => {
      const mockData = Object.entries(packages).reduce<Record<string, { type: ChangeType }>>(
        (acc, [packageName, { changeFile }]) => {
          if (changeFile) {
            acc[`@fluentui-${packageName}-hash123.json`] = {
              type: changeFile.type,
            };
          }

          return acc;
        },
        {},
      );

      return mockData[path.basename(filePath.toString())];
    });

    mockJoin.mockImplementation((...args) => args.join('/'));
  }
});
