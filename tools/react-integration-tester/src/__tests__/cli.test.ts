import type { Args } from '../shared';

async function loadModule() {
  return new Promise<typeof import('../cli')>(resolve => {
    jest.isolateModules(() => {
      const mod = import('../cli');
      resolve(mod);
    });
  });
}

describe('cli', () => {
  const logger = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), verbose: jest.fn() };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('--install-deps mode calls installDepsForReactVersion and exits without setup', async () => {
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: [],
      verbose: false,
      cleanup: true,
      cwd: process.cwd(),
      prepareOnly: false,
      projectId: '',
      force: false,
      noInstall: false,
      installDeps: true,
    };

    const installMock = jest.fn().mockResolvedValue(undefined);
    const setupMock = jest.fn();
    const runCmdMock = jest.fn();

    jest.doMock('../args', () => ({ parseArgs: jest.fn(() => args) }));
    jest.doMock('../logger', () => ({ createLogger: jest.fn(() => logger) }));
    jest.doMock('../setup', () => ({ installDepsForReactVersion: installMock, setup: setupMock }));
    jest.doMock('../shared', () => ({ runCmd: runCmdMock }));

    const { cli } = await loadModule();

    await cli();

    expect(installMock).toHaveBeenCalledWith(args, logger);
    expect(setupMock).not.toHaveBeenCalled();
    expect(runCmdMock).not.toHaveBeenCalled();
  });

  test('--prepare-only logs prepared path and does not run commands or cleanup', async () => {
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: [],
      verbose: false,
      cleanup: true,
      cwd: process.cwd(),
      prepareOnly: true,
      projectId: '',
      force: false,
      noInstall: false,
      installDeps: false,
    };

    const setupResult = { projectPath: '/tmp/rit/project', commands: { test: 'jest' }, cleanup: jest.fn() };
    const setupMock = jest.fn().mockResolvedValue(setupResult);
    const runCmdMock = jest.fn();

    jest.doMock('../args', () => ({ parseArgs: jest.fn(() => args) }));
    jest.doMock('../logger', () => ({ createLogger: jest.fn(() => logger) }));
    jest.doMock('../setup', () => ({ setup: setupMock, installDepsForReactVersion: jest.fn() }));
    jest.doMock('../shared', () => ({ runCmd: runCmdMock }));

    const { cli } = await loadModule();

    await cli();

    expect(logger.log).toHaveBeenCalledWith('Prepared at:', setupResult.projectPath);
    expect(runCmdMock).not.toHaveBeenCalled();
    expect(setupResult.cleanup).not.toHaveBeenCalled();
  });

  test('normal run executes selected commands and cleans up', async () => {
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test', 'type-check'],
      verbose: false,
      cleanup: true,
      cwd: process.cwd(),
      prepareOnly: false,
      projectId: '',
      force: false,
      noInstall: false,
      installDeps: false,
    };

    const setupResult = {
      projectPath: '/tmp/rit/project',
      commands: { test: 'node jest', 'type-check': 'node tsc -p tsconfig.json', e2e: 'node cypress' },
      cleanup: jest.fn(),
    };
    const setupMock = jest.fn().mockResolvedValue(setupResult);
    const runCmdMock = jest.fn().mockResolvedValue(undefined);

    jest.doMock('../args', () => ({ parseArgs: jest.fn(() => args) }));
    jest.doMock('../logger', () => ({ createLogger: jest.fn(() => logger) }));
    jest.doMock('../setup', () => ({ setup: setupMock, installDepsForReactVersion: jest.fn() }));
    jest.doMock('../shared', () => ({ runCmd: runCmdMock }));

    const { cli } = await loadModule();

    await cli();

    expect(runCmdMock).toHaveBeenCalledTimes(2);
    expect(runCmdMock).toHaveBeenCalledWith('node jest', { cwd: setupResult.projectPath });
    expect(runCmdMock).toHaveBeenCalledWith('node tsc -p tsconfig.json', { cwd: setupResult.projectPath });
    expect(setupResult.cleanup).toHaveBeenCalledTimes(1);
  });

  test('--no-cleanup with projectId logs NOTE and skips cleanup', async () => {
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: false,
      cwd: process.cwd(),
      prepareOnly: false,
      projectId: 'abc',
      force: false,
      noInstall: false,
      installDeps: false,
    };

    const setupResult = { projectPath: '/tmp/rit/project', commands: { test: 'node jest' }, cleanup: jest.fn() };
    const setupMock = jest.fn().mockResolvedValue(setupResult);

    jest.doMock('../args', () => ({ parseArgs: jest.fn(() => args) }));
    jest.doMock('../logger', () => ({ createLogger: jest.fn(() => logger) }));
    jest.doMock('../setup', () => ({ setup: setupMock, installDepsForReactVersion: jest.fn() }));
    jest.doMock('../shared', () => ({ runCmd: jest.fn().mockResolvedValue(undefined) }));

    const { cli } = await loadModule();

    await cli();

    expect(setupResult.cleanup).not.toHaveBeenCalled();
    expect(logger.info.mock.calls.flat()[0]).toMatchInlineSnapshot(
      `"NOTE: \\"--no-cleanup\\" has no effect when reusing an existing prepared project via --project-id"`,
    );
  });

  test('on command failure rejects and calls cleanup', async () => {
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: true,
      cwd: process.cwd(),
      prepareOnly: false,
      projectId: '',
      force: false,
      noInstall: false,
      installDeps: false,
    };

    const setupResult = { projectPath: '/tmp/rit/project', commands: { test: 'node jest' }, cleanup: jest.fn() };
    const setupMock = jest.fn().mockResolvedValue(setupResult);
    const runCmdMock = jest.fn().mockRejectedValue(undefined);

    jest.doMock('../args', () => ({ parseArgs: jest.fn(() => args) }));
    jest.doMock('../logger', () => ({ createLogger: jest.fn(() => logger) }));
    jest.doMock('../setup', () => ({ setup: setupMock, installDepsForReactVersion: jest.fn() }));
    jest.doMock('../shared', () => ({ runCmd: runCmdMock }));

    const { cli } = await loadModule();
    await expect(cli()).rejects.toBeUndefined();
    expect(setupResult.cleanup).toHaveBeenCalled();
  });
});
