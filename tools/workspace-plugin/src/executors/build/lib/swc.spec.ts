import { transformFile } from '@swc/core';
import { readJsonFile } from '@nx/devkit';
import { globSync } from 'fast-glob';

import { compileSwc } from './swc';
import type { NormalizedOptions } from './shared';

jest.mock('@swc/core', () => ({
  transformFile: jest.fn(async () => ({ code: 'export {};' })),
}));
jest.mock('@nx/devkit', () => ({
  logger: { log: jest.fn(), verbose: jest.fn() },
  readJsonFile: jest.fn(() => ({ jsc: {} })),
}));
jest.mock('fast-glob', () => ({
  globSync: jest.fn(() => ['index.ts']),
}));
jest.mock('node:fs/promises', () => ({
  mkdir: jest.fn(async () => undefined),
  writeFile: jest.fn(async () => undefined),
  copyFile: jest.fn(async () => undefined),
}));

const transformFileMock = transformFile as jest.MockedFunction<typeof transformFile>;
const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const globSyncMock = globSync as jest.MockedFunction<typeof globSync>;

const createOptions = (preserveDynamicImport: boolean): NormalizedOptions =>
  ({
    absoluteProjectRoot: '/repo/package',
    absoluteSourceRoot: '/repo/package/src',
    preserveDynamicImport,
  }) as NormalizedOptions;

describe('compileSwc', () => {
  beforeEach(() => {
    transformFileMock.mockClear();
    readJsonFileMock.mockClear();
    globSyncMock.mockClear();
  });

  it('preserves dynamic imports only for opted-in CommonJS output', async () => {
    await compileSwc(
      { module: 'commonjs', outputPath: 'lib-commonjs' },
      createOptions(true),
    );

    expect(transformFileMock).toHaveBeenCalledWith(
      '/repo/package/src/index.ts',
      expect.objectContaining({
        module: expect.objectContaining({
          ignoreDynamic: true,
          type: 'commonjs',
        }),
      }),
    );
  });

  it('keeps the existing CommonJS transform by default', async () => {
    await compileSwc(
      { module: 'commonjs', outputPath: 'lib-commonjs' },
      createOptions(false),
    );

    expect(transformFileMock).toHaveBeenCalledWith(
      '/repo/package/src/index.ts',
      expect.objectContaining({
        module: expect.not.objectContaining({ ignoreDynamic: true }),
      }),
    );
  });
});
