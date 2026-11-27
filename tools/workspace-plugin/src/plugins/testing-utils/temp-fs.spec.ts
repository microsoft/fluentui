import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { workspaceRoot } from '@nx/devkit';
import { TempFs } from './temp-fs';

jest.mock('node:fs', () => {
  const actual = jest.requireActual<typeof import('node:fs')>('node:fs');
  return { ...actual, rmSync: jest.fn(actual.rmSync) };
});

describe('TempFs', () => {
  const cwd = process.cwd();
  const originalWorkspaceRoot = workspaceRoot;
  let tempFs: TempFs;

  afterEach(() => {
    process.chdir(cwd);
    jest.mocked(rmSync).mockImplementation(jest.requireActual<typeof import('node:fs')>('node:fs').rmSync);
    tempFs.cleanup();
  });

  it('cleans up after leaving the fixture and restores subsequent workspace discovery', () => {
    tempFs = new TempFs('workspace-cleanup');
    tempFs.createFilesSync({ 'nx.json': '{}' });
    process.chdir(tempFs.tempDir);
    expect(workspaceRoot).toBe(tempFs.tempDir);

    process.chdir(cwd);
    tempFs.cleanup();

    expect(existsSync(tempFs.tempDir)).toBe(false);
    expect(workspaceRoot).toBe(originalWorkspaceRoot);
    jest.isolateModules(() => {
      const devkit = jest.requireActual<typeof import('@nx/devkit')>('@nx/devkit');
      expect(resolve(devkit.workspaceRoot)).toBe(resolve(originalWorkspaceRoot));
    });
  });

  it('restores the workspace root and propagates deletion errors', () => {
    tempFs = new TempFs('workspace-cleanup-error');
    const error = new Error('fixture deletion failed');
    jest.mocked(rmSync).mockImplementationOnce(() => {
      throw error;
    });

    expect(() => tempFs.cleanup()).toThrow(error);
    expect(workspaceRoot).toBe(originalWorkspaceRoot);
    jest.isolateModules(() => {
      const devkit = jest.requireActual<typeof import('@nx/devkit')>('@nx/devkit');
      expect(resolve(devkit.workspaceRoot)).toBe(resolve(originalWorkspaceRoot));
    });
  });

  it('resets fixture contents without deleting the active working directory', () => {
    tempFs = new TempFs('workspace-reset');
    tempFs.createFilesSync({ 'nested/file.txt': 'content', 'file.txt': 'content' });
    process.chdir(tempFs.tempDir);

    tempFs.reset();

    expect(process.cwd()).toBe(tempFs.tempDir);
    expect(workspaceRoot).toBe(tempFs.tempDir);
    expect(existsSync(tempFs.tempDir)).toBe(true);
    expect(existsSync(resolve(tempFs.tempDir, 'nested'))).toBe(false);
    expect(existsSync(resolve(tempFs.tempDir, 'file.txt'))).toBe(false);
    tempFs.createFilesSync({ 'next.txt': 'next fixture' });
    expect(existsSync(resolve(tempFs.tempDir, 'next.txt'))).toBe(true);
  });

  it('does not override the workspace root when requested', () => {
    tempFs = new TempFs('workspace-no-override', false);
    expect(workspaceRoot).toBe(originalWorkspaceRoot);
    tempFs.cleanup();
    expect(workspaceRoot).toBe(originalWorkspaceRoot);
  });
});
