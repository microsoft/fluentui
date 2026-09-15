import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { runNpmCommand } from './npm-utils';

jest.mock('node:child_process', () => ({
  ...jest.requireActual('node:child_process'),
  spawnSync: jest.fn(),
}));

jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  mkdtempSync: jest.fn(),
  rmSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

const mockSpawnSync = spawnSync as jest.MockedFunction<typeof spawnSync>;
const mockMkdtempSync = mkdtempSync as jest.MockedFunction<typeof mkdtempSync>;
const mockRmSync = rmSync as jest.MockedFunction<typeof rmSync>;
const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>;
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

const npmConfigDir = join(tmpdir(), 'fluentui-npm-test');
const npmConfigPath = join(npmConfigDir, '.npmrc');

beforeEach(() => {
  mockSpawnSync.mockReset();
  mockMkdtempSync.mockReset();
  mockRmSync.mockReset();
  mockWriteFileSync.mockReset();
  mockConsoleLog.mockClear();

  mockMkdtempSync.mockReturnValue(npmConfigDir);
  mockSpawnSync.mockReturnValue({ status: 0 } as ReturnType<typeof spawnSync>);
});

afterAll(() => {
  mockConsoleLog.mockRestore();
});

describe('runNpmCommand', () => {
  it('runs npm with temporary registry authentication', () => {
    const args = ['dist-tag', 'add', '@fluentui/react-example@1.0.0', 'latest'];

    runNpmCommand({ args, npmToken: 'npm-token' });

    expect(mockMkdtempSync).toHaveBeenCalledWith(join(tmpdir(), 'fluentui-npm-'));
    expect(mockWriteFileSync).toHaveBeenCalledWith(npmConfigPath, '//registry.npmjs.org/:_authToken=${TOKEN}\n');
    expect(mockConsoleLog).toHaveBeenCalledWith(
      `npm ${[...args, '--registry', 'https://registry.npmjs.org/', '--userconfig', npmConfigPath].join(' ')}`,
    );
    expect(mockSpawnSync).toHaveBeenCalledWith(
      'npm',
      [...args, '--registry', 'https://registry.npmjs.org/', '--userconfig', npmConfigPath],
      {
        stdio: 'inherit',
        shell: process.platform === 'win32',
        env: {
          ...process.env,
          TOKEN: 'npm-token',
        },
      },
    );
    expect(mockRmSync).toHaveBeenCalledWith(npmConfigDir, { recursive: true, force: true });
  });

  it('cleans up and throws when npm exits unsuccessfully', () => {
    mockSpawnSync.mockReturnValue({ status: 1 } as ReturnType<typeof spawnSync>);

    expect(() => runNpmCommand({ args: ['view'], npmToken: 'npm-token' })).toThrow('npm exited with status 1');

    expect(mockRmSync).toHaveBeenCalledWith(npmConfigDir, { recursive: true, force: true });
  });

  it('cleans up and throws when npm cannot be started', () => {
    const error = new Error('Unable to start npm');
    mockSpawnSync.mockReturnValue({ error, status: null } as ReturnType<typeof spawnSync>);

    expect(() => runNpmCommand({ args: ['view'], npmToken: 'npm-token' })).toThrow(error);

    expect(mockRmSync).toHaveBeenCalledWith(npmConfigDir, { recursive: true, force: true });
  });
});
