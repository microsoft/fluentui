import { type ExecutorContext, serializeJson } from '@nx/devkit';
import {
  Extractor,
  type IExtractorInvokeOptions,
  type ExtractorConfig,
  type ExtractorResult,
} from '@microsoft/api-extractor';
import { basename, join } from 'node:path';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

import { type TsConfig } from '../../types';

import { type GenerateApiExecutorSchema } from './schema';
import executor from './executor';
import { isCI } from './lib/shared';

const fixturesRootDir = join(__dirname, '__fixtures__');

jest.mock('node:child_process', () => {
  return {
    ...jest.requireActual('node:child_process'),
    execSync: jest.fn(),
  };
});

const options: GenerateApiExecutorSchema = {};
const _context: ExecutorContext = {
  root: fixturesRootDir,
  cwd: process.cwd(),
  isVerbose: true,
  projectName: 'proj',
  projectsConfigurations: {
    projects: { proj: { root: '' } },
    version: 2,
  },
  nxJsonConfiguration: {},
  projectGraph: { nodes: {}, dependencies: {} },
};

const execSyncMock = execSync as jest.Mock;

function cleanup() {
  // Remove all contents of the fixtures directory but keep the directory itself
  const entries = readdirSync(fixturesRootDir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = join(fixturesRootDir, entry.name);
    if (fullPath.endsWith('.gitkeep')) {
      return;
    }
    rmSync(fullPath, { recursive: true, force: true });
  });
}

function prepareFixture(type: 'valid' | 'invalid', config: { extractorConfigPath?: string }) {
  const { extractorConfigPath = 'config/api-extractor.json' } = config;

  const projRoot = mkdtempSync(join(fixturesRootDir, 'proj-'));

  if (type === 'valid') {
    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({ name: `@proj/proj`, types: 'dist/index.d.ts' }),
      'utf-8',
    );
    writeFileSync(
      join(projRoot, 'tsconfig.json'),
      serializeJson({
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          noEmit: true,
        },
        include: [],
        files: [],
        references: [
          {
            path: './tsconfig.lib.json',
          },
        ],
      }),
      'utf-8',
    );
    writeFileSync(
      join(projRoot, 'tsconfig.lib.json'),
      serializeJson({
        extends: './tsconfig.json',
        compilerOptions: {
          emitDeclarationOnly: true,
          declarationDir: 'dts',
        },
        include: ['src/index.ts'],
      }),
      'utf-8',
    );
    mkdirSync(join(projRoot, 'config'));
    writeFileSync(
      join(projRoot, extractorConfigPath),
      serializeJson({
        mainEntryPointFilePath: '<projectFolder>/dts/index.d.ts',
        apiReport: {
          enabled: true,
        },
        docModel: {
          enabled: false,
        },
        dtsRollup: {
          enabled: true,
        },
      }),
      'utf-8',
    );
  }

  const context = {
    ..._context,
    projectsConfigurations: {
      ..._context.projectsConfigurations,
      projects: {
        ..._context.projectsConfigurations.projects,
        proj: {
          root: basename(projRoot),
        },
      },
    },
  };

  return {
    context,
    paths: { projRoot },
  };
}

describe('GenerateApi Executor', () => {
  afterEach(() => {
    cleanup();
  });

  it(`should handle invalid inputs`, async () => {
    const { paths, context } = prepareFixture('invalid', {});

    try {
      await executor(options, context);
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[Error: ${paths.projRoot}/tsconfig.json doesn't exist]`);
    }

    writeFileSync(join(paths.projRoot, 'tsconfig.json'), '{}', 'utf-8');

    try {
      await executor(options, context);
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[Error: Cannot find api-extractor.json at "${paths.projRoot}/config/api-extractor.json"]`,
      );
    }
  });

  it('can run', async () => {
    const { paths, context } = prepareFixture('valid', {});

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(() => {
      return { succeeded: true } as ExtractorResult;
    });

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(paths.projRoot, 'dts'));
      writeFileSync(join(paths.projRoot, 'dts', 'index.d.ts'), 'export const foo:number;', 'utf-8');
    });

    const output = await executor(options, context);

    expect(execSyncMock.mock.calls.flat()).toEqual([
      `tsc -p ${paths.projRoot}/tsconfig.lib.json --pretty --emitDeclarationOnly --baseUrl ${paths.projRoot}`,
      { stdio: 'inherit' },
    ]);

    const [extractorConfig, extractorArgs] = ExtractorInvokeSpy.mock.calls.flat() as [
      ExtractorConfig,
      IExtractorInvokeOptions,
    ];

    expect((extractorConfig.overrideTsconfig as TsConfig).compilerOptions).toEqual({
      baseUrl: '.',
      declarationDir: 'dts',
      emitDeclarationOnly: true,
      isolatedModules: false,
      paths: undefined,
      skipLibCheck: false,
    });
    expect(extractorConfig.skipLibCheck).toBe(false);

    const actualLocalBuildValue = isCI() ? false : true;

    expect(extractorArgs).toEqual({
      localBuild: actualLocalBuildValue,
      showDiagnostics: false,
      showVerboseMessages: true,
    });

    expect(output.success).toBe(true);
  });

  it('support schema config', async () => {
    const { context, paths } = prepareFixture('valid', { extractorConfigPath: 'api-extractor.json' });

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(paths.projRoot, 'dts'));
      writeFileSync(join(paths.projRoot, 'dts', 'index.d.ts'), 'export const foo:number;', 'utf-8');
    });

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(() => {
      return { succeeded: true } as ExtractorResult;
    });

    const output = await executor(
      { ...options, config: '{projectRoot}/api-extractor.json', diagnostics: true, local: false },
      context,
    );

    const [extractorConfig, extractorArgs] = ExtractorInvokeSpy.mock.calls.flat() as [
      ExtractorConfig,
      IExtractorInvokeOptions,
    ];

    expect(extractorConfig).toEqual(expect.any(Object));
    expect(extractorArgs).toEqual({
      localBuild: false,
      showDiagnostics: true,
      showVerboseMessages: true,
    });

    expect(output.success).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Additional file-based sub-path configs (api-extractor.*.json)
// ─────────────────────────────────────────────────────────────────────────────

describe('GenerateApi Executor – additional sub-path configs', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Extends the base "valid" fixture with a second api-extractor config
   * (e.g. api-extractor.utils.json) to simulate a named sub-path entry.
   */
  function prepareFixtureWithSubpathConfig() {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    // Write the sub-path api-extractor config that references an already-emitted dts file
    writeFileSync(
      join(projRoot, 'config', 'api-extractor.utils.json'),
      serializeJson({
        mainEntryPointFilePath: '<projectFolder>/dts/utils/index.d.ts',
        apiReport: { enabled: false },
        docModel: { enabled: false },
        dtsRollup: { enabled: true, untrimmedFilePath: '<projectFolder>/dist/utils/index.d.ts' },
        tsdocMetadata: { enabled: false },
      }),
      'utf-8',
    );

    execSyncMock.mockImplementation(() => {
      // Simulate tsc emitting declaration files for both main and utils entry
      mkdirSync(join(projRoot, 'dts', 'utils'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'index.d.ts'), 'export const foo: number;', 'utf-8');
      writeFileSync(join(projRoot, 'dts', 'utils', 'index.d.ts'), 'export const bar: string;', 'utf-8');
    });

    return { paths, context };
  }

  it('invokes api-extractor twice when a sub-path config is present', async () => {
    const { context } = prepareFixtureWithSubpathConfig();

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor(options, context);

    // Should have been called once for primary + once for utils
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(2);
    expect(output.success).toBe(true);
  });

  it('passes the sub-path mainEntryPointFilePath to api-extractor', async () => {
    const { paths, context } = prepareFixtureWithSubpathConfig();

    const extractorConfigs: string[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      extractorConfigs.push(cfg.mainEntryPointFilePath);
      return { succeeded: true } as ExtractorResult;
    });

    await executor(options, context);

    // Second call should use the utils entry point
    expect(extractorConfigs[1]).toContain('utils/index.d.ts');
  });

  it('returns false and stops after the first failing sub-path config', async () => {
    const { context } = prepareFixtureWithSubpathConfig();

    let callCount = 0;
    jest.spyOn(Extractor, 'invoke').mockImplementation(() => {
      callCount++;
      // first call (primary) succeeds; second call (sub-path) fails
      return { succeeded: callCount === 1, errorCount: callCount === 1 ? 0 : 1, warningCount: 0 } as ExtractorResult;
    });

    const output = await executor(options, context);

    expect(callCount).toBe(2);
    expect(output.success).toBe(false);
  });

  it('ignores the primary api-extractor.json when scanning for additional configs', async () => {
    const { paths, context } = prepareFixtureWithSubpathConfig();

    const extractorConfigPaths: string[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      // mainEntryPointFilePath is absolute at this stage
      extractorConfigPaths.push(cfg.mainEntryPointFilePath);
      return { succeeded: true } as ExtractorResult;
    });

    await executor(options, context);

    // Should only be called once for primary + once for utils; NOT a third time for primary again
    expect(extractorConfigPaths).toHaveLength(2);
    // The additional config entry should not duplicate the primary one
    const primaryEntry = join(paths.projRoot, 'dts', 'index.d.ts');
    const additionalEntry = join(paths.projRoot, 'dts', 'utils', 'index.d.ts');
    expect(extractorConfigPaths[0]).toBe(primaryEntry);
    expect(extractorConfigPaths[1]).toBe(additionalEntry);
  });

  it('routes api report for sub-path config to etc/<unscopedPackageName>.<subpath>.api.md', async () => {
    const { paths, context } = prepareFixtureWithSubpathConfigAndApiReport();

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor(options, context);

    const subpathConfig = capturedConfigs[1];
    expect(subpathConfig.apiReportEnabled).toBe(true);
    expect(subpathConfig.reportFilePath).toBe(join(paths.projRoot, 'etc', 'proj.utils.api.md'));
  });

  /**
   * Like prepareFixtureWithSubpathConfig but with api report enabled and a unique reportFileName.
   */
  function prepareFixtureWithSubpathConfigAndApiReport() {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'config', 'api-extractor.utils.json'),
      serializeJson({
        mainEntryPointFilePath: '<projectFolder>/dts/utils/index.d.ts',
        apiReport: { enabled: true, reportFileName: '<unscopedPackageName>.utils' },
        docModel: { enabled: false },
        dtsRollup: { enabled: true, untrimmedFilePath: '<projectFolder>/dist/utils/index.d.ts' },
        tsdocMetadata: { enabled: false },
      }),
      'utf-8',
    );

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(projRoot, 'dts', 'utils'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'index.d.ts'), 'export const foo: number;', 'utf-8');
      writeFileSync(join(projRoot, 'dts', 'utils', 'index.d.ts'), 'export const bar: string;', 'utf-8');
    });

    return { paths, context };
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Wildcard export expansion
// ─────────────────────────────────────────────────────────────────────────────

describe('GenerateApi Executor – wildcard export expansion', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Creates a fixture with a wildcard export "./*" whose types pattern resolves
   * to one emitted .d.ts per sub-directory under dts/src/items/.
   * The primary api-extractor.json uses a relative path from config/ to dts/src/.
   */
  function prepareWildcardFixture(subDirNames: string[]) {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({
        name: '@proj/proj',
        types: 'dist/index.d.ts',
        exports: {
          '.': { types: './dist/index.d.ts', import: './lib/index.js' },
          './*': { types: './dist/items/*/index.d.ts', import: './lib/items/*/index.js' },
          './package.json': './package.json',
        },
      }),
      'utf-8',
    );

    writeFileSync(
      join(projRoot, 'config', 'api-extractor.json'),
      serializeJson({
        mainEntryPointFilePath: '../dts/src/index.d.ts',
        apiReport: { enabled: false },
        docModel: { enabled: false },
        dtsRollup: { enabled: true },
        tsdocMetadata: { enabled: false },
      }),
      'utf-8',
    );

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(projRoot, 'dts', 'src'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'src', 'index.d.ts'), 'export const root: 1;', 'utf-8');
      for (const name of subDirNames) {
        mkdirSync(join(projRoot, 'dts', 'src', 'items', name), { recursive: true });
        writeFileSync(
          join(projRoot, 'dts', 'src', 'items', name, 'index.d.ts'),
          `export const value: string;`,
          'utf-8',
        );
      }
    });

    return { paths, context };
  }

  it('calls api-extractor once per wildcard sub-directory in addition to the primary', async () => {
    const subDirs = ['alpha', 'beta', 'gamma'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, resolveExportWildcards: true }, context);

    // primary (1) + one per sub-directory
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1 + subDirs.length);
    expect(output.success).toBe(true);
  });

  it('passes the correct mainEntryPointFilePath for each wildcard sub-directory', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const capturedEntries: string[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedEntries.push(cfg.mainEntryPointFilePath);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, resolveExportWildcards: true }, context);

    const wildcardEntries = capturedEntries.slice(1); // skip primary
    for (const name of subDirs) {
      expect(wildcardEntries.some(p => p.includes(`items/${name}/index.d.ts`))).toBe(true);
    }
  });

  it('sets the dts rollup untrimmedFilePath to dist/{wildcard-path}/{name}/index.d.ts', async () => {
    const { paths, context } = prepareWildcardFixture(['alpha']);

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, resolveExportWildcards: true }, context);

    const wildcardConfig = capturedConfigs[1]; // second call is the wildcard entry
    expect(wildcardConfig.untrimmedFilePath).toBe(join(paths.projRoot, 'dist', 'items', 'alpha', 'index.d.ts'));
  });

  it('skips wildcard exports with no types field', async () => {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({
        name: '@proj/proj',
        types: 'dist/index.d.ts',
        exports: {
          '.': { import: './lib/index.js' },
          './*': { import: './lib/items/*/index.js' }, // no types field
          './package.json': './package.json',
        },
      }),
      'utf-8',
    );

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(projRoot, 'dts'));
      writeFileSync(join(projRoot, 'dts', 'index.d.ts'), 'export const x: 1;', 'utf-8');
    });

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    await executor(options, context);

    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1); // primary only
  });

  it('skips wildcard expansion when the resolved declaration directory does not exist', async () => {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({
        name: '@proj/proj',
        types: 'dist/index.d.ts',
        exports: {
          '.': { types: './dist/index.d.ts', import: './lib/index.js' },
          './*': { types: './dist/items/*/index.d.ts', import: './lib/items/*/index.js' },
        },
      }),
      'utf-8',
    );

    writeFileSync(
      join(projRoot, 'config', 'api-extractor.json'),
      serializeJson({
        mainEntryPointFilePath: '../dts/src/index.d.ts',
        apiReport: { enabled: false },
        docModel: { enabled: false },
        dtsRollup: { enabled: true },
        tsdocMetadata: { enabled: false },
      }),
      'utf-8',
    );

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(projRoot, 'dts', 'src'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'src', 'index.d.ts'), 'export const x: 1;', 'utf-8');
      // dts/src/items/ intentionally NOT created
    });

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor(options, context);

    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1); // primary only
    expect(output.success).toBe(true);
  });

  it('routes api report for each wildcard entry to etc/{name}.api.md', async () => {
    const subDirs = ['alpha', 'beta'];
    const { paths, context } = prepareWildcardFixture(subDirs);

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, resolveExportWildcards: true }, context);

    const wildcardConfigs = capturedConfigs.slice(1); // skip primary
    for (const name of subDirs) {
      const cfg = wildcardConfigs.find(c => c.mainEntryPointFilePath.includes(`items/${name}/`))!;
      expect(cfg.apiReportEnabled).toBe(true);
      expect(cfg.reportFilePath).toBe(join(paths.projRoot, 'etc', `${name}.api.md`));
      expect(cfg.reportTempFilePath).toBe(join(paths.projRoot, 'temp', `${name}.api.md`));
    }
  });

  it('skips wildcard expansion when resolveExportWildcards is false', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, resolveExportWildcards: false }, context);

    // Only the primary config should run — no wildcard expansion
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1);
    expect(output.success).toBe(true);
  });

  it('skips wildcard expansion by default (resolveExportWildcards not set)', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    // Pass default options — no resolveExportWildcards key
    const output = await executor(options, context);

    // Only the primary config should run — wildcard expansion is opt-in
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1);
    expect(output.success).toBe(true);
  });

  it('expands wildcards when resolveExportWildcards is true', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, resolveExportWildcards: true }, context);

    // primary (1) + one per sub-directory
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1 + subDirs.length);
    expect(output.success).toBe(true);
  });
});
