import type { CacheStatusResult } from '../../utils/catalog-cache';
import yargs = require('yargs/yargs');
import { buildCatalogCache, clearCatalogCache, inspectCatalogCache } from '../../utils/catalog-cache';
import { CliError } from '../../utils/diagnostics';
import cacheCommand from './index';
import { cacheBuildHandler, cacheClearHandler, cacheStatusHandler } from './handler';
import { withCliProgress } from '../../utils/progress';
import type { CliProgress } from '../../utils/progress';

jest.mock('../../utils/catalog-cache', () => ({
  buildCatalogCache: jest.fn(),
  clearCatalogCache: jest.fn(),
  inspectCatalogCache: jest.fn(),
}));
jest.mock('../../utils/progress', () => ({
  withCliProgress: jest.fn((_message: string, task: (progress: CliProgress) => unknown) =>
    task({ update: jest.fn(), log: jest.fn() }),
  ),
}));

describe('cache handler', () => {
  let stdoutWrite: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    stdoutWrite = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stdoutWrite.mockRestore();
  });

  it('inspects selected caches and emits the status envelope with active builds', async () => {
    const result = cacheResult([
      { package: '@fluentui/react-components', requestedPackage: '@fluentui/react-components', state: 'ready' },
      {
        package: '@fluentui/react-headless-components-preview',
        requestedPackage: '@fluentui/react-headless-components-preview',
        state: 'building',
      },
    ]);
    jest.mocked(inspectCatalogCache).mockReturnValue(result);

    await cacheStatusHandler({
      _: ['status'],
      $0: 'fluentui-cli',
      cwd: './apps/forum',
      config: './fluentui.config.json',
      system: ['headless'],
      package: '@fluentui/react-headless-components-preview',
      metadataMode: 'prefer',
      json: true,
    });

    expect(inspectCatalogCache).toHaveBeenCalledWith({
      cwd: './apps/forum',
      config: './fluentui.config.json',
      system: ['headless'],
      package: '@fluentui/react-headless-components-preview',
      metadataMode: 'prefer',
    });
    expect(readStdout(stdoutWrite)).toMatchObject({
      type: 'fluentui.cache-status',
      data: { workspaceRoot: result.workspaceRoot, cacheRoot: result.cacheRoot, packages: result.packages },
      coverage: { selectedRoots: 2, metadataRoots: 2, unavailableRoots: 0, status: 'partial' },
    });
  });

  it('reports package roots, readiness, and active builds in human output', async () => {
    jest.mocked(inspectCatalogCache).mockReturnValue(
      cacheResult([
        {
          package: '@fluentui/react-components',
          requestedPackage: '@fluentui/react-components',
          state: 'building',
          error: 'Waiting for the current build lock',
        },
      ]),
    );

    await cacheStatusHandler({ _: ['status'], $0: 'fluentui-cli' });

    const text = readStdoutText(stdoutWrite);
    expect(text).toContain('**Cache root:**');
    expect(text).toContain('**Active builds:** 1');
    expect(text).toContain('Waiting for the current build lock');
    expect(text).toContain('## Active builds');
  });

  it('builds selected caches with force and emits the build envelope', async () => {
    const result = cacheResult([
      {
        package: '@fluentui/react-components',
        requestedPackage: '@fluentui/react-components',
        source: 'declarations',
        state: 'ready',
      },
    ]);
    jest.mocked(buildCatalogCache).mockResolvedValue(result);

    await cacheBuildHandler({
      _: ['build'],
      $0: 'fluentui-cli',
      cwd: './apps/forum',
      system: ['fluent-v9'],
      metadataMode: 'off',
      force: true,
      json: true,
    });

    expect(buildCatalogCache).toHaveBeenCalledWith({
      cwd: './apps/forum',
      config: undefined,
      system: ['fluent-v9'],
      package: undefined,
      metadataMode: 'off',
      force: true,
    });
    expect(readStdout(stdoutWrite)).toMatchObject({ type: 'fluentui.cache-build', data: result });
    expect(withCliProgress).toHaveBeenCalledWith(expect.any(String), expect.any(Function), { enabled: false });
  });

  it('shows short package stages and one generated completion line without listing every reused package', async () => {
    const progress = { update: jest.fn(), log: jest.fn() };
    jest.mocked(withCliProgress).mockImplementation(async (_message, task) => task(progress));
    const result = cacheResult([
      { package: '@fluentui/react', requestedPackage: '@fluentui/react', source: 'declarations', records: 400 },
      { package: '@fluentui/utilities', requestedPackage: '@fluentui/utilities', source: 'declarations' },
    ]);
    jest.mocked(buildCatalogCache).mockImplementation(async options => {
      options.onProgress?.({
        package: '@fluentui/react',
        packageRoot: result.packages[0].packageRoot,
        phase: 'generating',
      });
      options.onProgress?.({
        package: '@fluentui/react',
        packageRoot: result.packages[0].packageRoot,
        phase: 'writing',
        records: 400,
      });
      options.onProgress?.({
        package: '@fluentui/react',
        packageRoot: result.packages[0].packageRoot,
        phase: 'ready',
        records: 400,
        elapsedMs: 1234,
      });
      options.onProgress?.({
        package: '@fluentui/utilities',
        packageRoot: result.packages[1].packageRoot,
        phase: 'reused',
        source: 'declarations',
      });
      return result;
    });
    await cacheBuildHandler({ _: ['build'], $0: 'fluentui-cli' });
    expect(progress.update).toHaveBeenCalledWith('Generating @fluentui/react from declarations...');
    expect(progress.update).toHaveBeenCalledWith('Writing @fluentui/react: 400 records...');
    expect(progress.log).toHaveBeenCalledWith('@fluentui/react: 400 records generated in 1.2s');
    expect(progress.log).toHaveBeenCalledWith(expect.stringContaining('1 built, 1 reused'));
    expect(progress.log).toHaveBeenCalledTimes(2);
  });

  it('updates the status when joining an existing build', async () => {
    const progress = { update: jest.fn(), log: jest.fn() };
    jest.mocked(withCliProgress).mockImplementation(async (_message, task) => task(progress));
    const result = cacheResult([{ package: '@fluentui/react', requestedPackage: '@fluentui/react' }]);
    jest.mocked(buildCatalogCache).mockImplementation(async options => {
      options.onProgress?.({
        package: '@fluentui/react',
        packageRoot: result.packages[0].packageRoot,
        phase: 'waiting',
      });
      options.onProgress?.({
        package: '@fluentui/react',
        packageRoot: result.packages[0].packageRoot,
        phase: 'reused',
        source: 'declarations',
      });
      return result;
    });
    await cacheBuildHandler({ _: ['build'], $0: 'fluentui-cli' });
    expect(progress.update).toHaveBeenCalledWith('Waiting for the existing @fluentui/react build...');
    expect(progress.log).toHaveBeenCalledTimes(1);
    expect(progress.log).toHaveBeenCalledWith(expect.stringContaining('0 built, 1 reused'));
  });

  it('does not attach progress callbacks for file output', async () => {
    jest.mocked(buildCatalogCache).mockImplementation(async options => {
      expect(options).not.toHaveProperty('onProgress');
      throw new Error('fixture avoids writing an output file');
    });
    await expect(cacheBuildHandler({ _: ['build'], $0: 'fluentui-cli', output: 'cache.json' })).rejects.toMatchObject({
      code: 'CACHE_BUILD_FAILED',
    });
    expect(withCliProgress).toHaveBeenCalledWith(expect.any(String), expect.any(Function), { enabled: false });
  });

  it('fails through CliError when selected cache generation fails', async () => {
    const result = cacheResult([
      {
        package: '@fluentui/react-components',
        requestedPackage: '@fluentui/react-components',
        state: 'failed',
        error: 'Declaration generation failed',
      },
    ]);
    jest.mocked(buildCatalogCache).mockResolvedValue(result);

    await expect(cacheBuildHandler({ _: ['build'], $0: 'fluentui-cli' })).rejects.toMatchObject({
      code: 'CACHE_BUILD_FAILED',
      data: result,
      diagnostics: [expect.objectContaining({ message: 'Declaration generation failed' })],
    });
    expect(stdoutWrite).not.toHaveBeenCalled();
  });

  it.each(['stale', 'building'] as const)('does not report a %s build as completed', async state => {
    const result = cacheResult([
      { package: '@fluentui/react', requestedPackage: '@fluentui/react', source: 'declarations', state },
    ]);
    jest.mocked(buildCatalogCache).mockResolvedValue(result);
    await expect(cacheBuildHandler({ _: ['build'], $0: 'fluentui-cli' })).rejects.toMatchObject({
      code: 'CACHE_BUILD_FAILED',
      data: result,
    });
    expect(stdoutWrite).not.toHaveBeenCalled();
  });

  it('clears only the selected cache scope and emits the clear envelope', async () => {
    const result = cacheResult([]);
    jest.mocked(clearCatalogCache).mockReturnValue(result);

    await cacheClearHandler({
      _: ['clear'],
      $0: 'fluentui-cli',
      config: './fluentui.config.json',
      system: ['headless'],
      package: '@fluentui/react-headless-components-preview',
      json: true,
    });

    expect(clearCatalogCache).toHaveBeenCalledWith({
      cwd: undefined,
      config: './fluentui.config.json',
      system: ['headless'],
      package: '@fluentui/react-headless-components-preview',
      metadataMode: undefined,
    });
    expect(readStdout(stdoutWrite)).toMatchObject({ type: 'fluentui.cache-clear', data: result });
  });

  it('wraps service exceptions as CliError', async () => {
    jest.mocked(clearCatalogCache).mockImplementation(() => {
      throw new Error('cache removal failed');
    });

    await expect(cacheClearHandler({ _: ['clear'], $0: 'fluentui-cli' })).rejects.toBeInstanceOf(CliError);
    await expect(cacheClearHandler({ _: ['clear'], $0: 'fluentui-cli' })).rejects.toMatchObject({
      code: 'CACHE_CLEAR_FAILED',
      message: 'cache removal failed',
    });
  });

  it('does not load cache or declaration factory modules while parsing help', () => {
    const cacheModuleFactory = jest.fn(() => ({}));
    jest.isolateModules(() => {
      jest.doMock('../../utils/catalog-cache', cacheModuleFactory);
      const command = require('./index').default;
      const parser = yargs([]).command(command).exitProcess(false);
      parser.parseSync(['cache', 'status', '--help'], {}, () => undefined);
    });
    jest.dontMock('../../utils/catalog-cache');
    expect(cacheModuleFactory).not.toHaveBeenCalled();
  });
});

function cacheResult(
  packages: Array<
    Partial<CacheStatusResult['packages'][number]> &
      Pick<CacheStatusResult['packages'][number], 'package' | 'requestedPackage'>
  >,
): CacheStatusResult {
  return {
    workspaceRoot: '/workspace',
    cacheRoot: '/workspace/.cache/fluentui-cli/catalogs',
    packages: packages.map((entry, index) => ({
      packageRoot: `/workspace/node_modules/${index === 0 ? 'pkg-a' : 'pkg-b'}`,
      source: 'metadata',
      state: 'ready',
      records: 12,
      ...entry,
    })),
  };
}

function readStdout(spy: jest.SpyInstance): Record<string, unknown> {
  return JSON.parse(readStdoutText(spy)) as Record<string, unknown>;
}

function readStdoutText(spy: jest.SpyInstance): string {
  return spy.mock.calls.map(([chunk]) => String(chunk)).join('');
}
