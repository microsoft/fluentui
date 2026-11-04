import { Dirent, existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, posix, resolve, win32 } from 'node:path';
import type { NormalizedOptions } from '../executor';
import { getExportSubpathConfigs } from './utils';
import { verboseLog } from './shared';

const readDirectory: (directory: string, options: { withFileTypes: true }) => Dirent[] = readdirSync;

jest.mock('node:fs', () => {
  const actual = jest.requireActual<typeof import('node:fs')>('node:fs');
  return {
    ...actual,
    readFileSync: jest.fn(actual.readFileSync),
    readdirSync: jest.fn(actual.readdirSync),
    existsSync: jest.fn(actual.existsSync),
  };
});

jest.mock('node:path', () => {
  const actual = jest.requireActual<typeof import('node:path')>('node:path');
  return {
    ...actual,
    basename: jest.fn(actual.basename),
    dirname: jest.fn(actual.dirname),
    resolve: jest.fn(actual.resolve),
    join: jest.fn(actual.join),
  };
});

jest.mock('./shared', () => ({ verboseLog: jest.fn() }));

describe.each([
  { name: 'Windows', path: win32, root: 'C:\\workspace "quoted"\\package' },
  { name: 'POSIX', path: posix, root: '/workspace "quoted"/package' },
])('export subpath configs on $name', ({ path, root }) => {
  const options: NormalizedOptions = {
    config: path.join(root, 'config', 'api-extractor.json'),
    projectAbsolutePath: root,
    packageJsonPath: path.join(root, 'package.json'),
    tsConfigPathForCompilation: path.join(root, 'tsconfig.lib.json'),
    project: { root },
    diagnostics: false,
    local: false,
    exportSubpaths: { enabled: true, apiReport: true },
  };
  let primaryEntry: string | undefined;

  beforeEach(() => {
    jest.mocked(basename).mockImplementation(path.basename);
    jest.mocked(dirname).mockImplementation(path.dirname);
    jest.mocked(resolve).mockImplementation(path.resolve);
    jest.mocked(join).mockImplementation(path.join);
    primaryEntry = '../dts/<unscopedPackageName>/index.d.ts';
    jest.mocked(readFileSync).mockImplementation(filePath => {
      if (filePath === options.packageJsonPath) {
        return JSON.stringify({
          name: '@scope/package',
          exports: {
            '.': { types: './dist/index.d.ts' },
            './utils': { types: './dist/utils/index.d.ts' },
            './items/*': { import: { types: './dist/items/*/index.d.ts' } },
            './package.json': './package.json',
            './untyped': { import: './lib/untyped.js' },
            './invalid': { types: './dist/invalid.js' },
          },
        });
      }
      if (filePath === options.config) {
        return JSON.stringify({ mainEntryPointFilePath: primaryEntry });
      }
      throw new Error(`Unexpected file read: ${filePath}`);
    });
    jest.mocked(existsSync).mockReturnValue(true);
    const directory = new Dirent();
    directory.name = 'alpha';
    directory.isDirectory = () => true;
    const file = new Dirent();
    file.name = 'not-a-directory.d.ts';
    file.isDirectory = () => false;
    jest.mocked(readDirectory).mockReturnValue([directory, file]);
  });

  it.each([true, false])('creates exactly two named/wildcard configs with apiReport=%s', apiReport => {
    const configs = getExportSubpathConfigs({
      ...options,
      exportSubpaths: { enabled: true, apiReport },
    });
    expect(configs).toHaveLength(2);
    const declarations = path.join(root, 'dts', 'package');
    expect(configs).toEqual(
      ['utils', 'items/alpha'].map(subpath => ({
        projectFolder: root,
        mainEntryPointFilePath: path.join(declarations, subpath, 'index.d.ts'),
        apiReport: {
          enabled: apiReport,
          reportFileName: subpath === 'utils' ? 'utils' : 'alpha',
          reportFolder: '<projectFolder>/etc/',
          reportTempFolder: '<projectFolder>/temp/',
        },
        docModel: { enabled: false },
        dtsRollup: { enabled: true, untrimmedFilePath: path.join(root, 'dist', subpath, 'index.d.ts') },
        tsdocMetadata: { enabled: false },
      })),
    );
    expect(readdirSync).toHaveBeenCalledWith(path.join(declarations, 'items/'), { withFileTypes: true });
  });

  it('supports native absolute primary declaration paths', () => {
    primaryEntry = path.join(root, 'dts', 'package', 'index.d.ts');
    const configs = getExportSubpathConfigs(options);
    expect(configs).toHaveLength(2);
    expect(configs[0].mainEntryPointFilePath).toBe(path.join(root, 'dts', 'package', 'utils', 'index.d.ts'));
  });

  it.each(['../dts/not-index.d.ts', '../dts/index.d.ts.map', '../dts/index.d.ts/child'])(
    'rejects invalid primary entry %s with the existing warning',
    entry => {
      primaryEntry = entry;
      expect(getExportSubpathConfigs(options)).toEqual([]);
      expect(verboseLog).toHaveBeenCalledWith(
        `Primary mainEntryPointFilePath "${path.resolve(
          path.dirname(options.config),
          entry,
        )}" does not end with "/index.d.ts". Skipping export subpath expansion.`,
        'warn',
      );
      expect(readdirSync).not.toHaveBeenCalled();
    },
  );

  it('skips a missing primary entry', () => {
    primaryEntry = undefined;
    expect(getExportSubpathConfigs(options)).toEqual([]);
    expect(readdirSync).not.toHaveBeenCalled();
  });

  it('keeps the named config when the wildcard directory is missing', () => {
    jest.mocked(existsSync).mockReturnValue(false);
    const configs = getExportSubpathConfigs(options);
    expect(configs).toHaveLength(1);
    expect(configs[0].mainEntryPointFilePath).toBe(path.join(root, 'dts', 'package', 'utils', 'index.d.ts'));
    expect(verboseLog).toHaveBeenCalledWith(expect.stringContaining('Export subpath source dir not found'), 'warn');
  });
});
