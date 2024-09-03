import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';

import { logger } from 'just-scripts';

import { deprecatePackage, getPackagesToDeprecate } from './check-for-deprecated-preview-packages';

const mockExecSync = jest.spyOn(childProcess, 'execSync');
const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
const mockJoin = jest.spyOn(path, 'join');
const mockLoggerError = jest.spyOn(logger, 'error');

describe('deprecatePackage', () => {
  beforeEach(() => {
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

    mockLoggerError.mockImplementationOnce(() => '');

    deprecatePackage('test-package', 'npm-token');

    expect(mockLoggerError).toHaveBeenCalledWith('Failed to deprecate "test-package" package');
  });
});

describe('getPackagesToDeprecate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return packages to deprecate based on change files', () => {
    mockReaddirSync.mockReturnValue(['change1.json', 'change2.json', 'change3.json'] as unknown as fs.Dirent[]);

    mockReadFileSync.mockImplementation(filePath => {
      const mockData: Record<string, string> = {
        'change1.json': JSON.stringify({ type: 'minor', message: 'chore: release stable', packageName: 'package-a' }),
        'change2.json': JSON.stringify({ type: 'major', message: 'feat: new feature', packageName: 'package-b' }),
        'change3.json': JSON.stringify({ type: 'minor', message: 'chore: release stable', packageName: 'package-c' }),
      };
      return mockData[path.basename(filePath.toString())];
    });

    mockJoin.mockImplementation((...args) => args.join('/'));

    const result = getPackagesToDeprecate();
    expect(result).toEqual(['package-a', 'package-c']);
  });
});
