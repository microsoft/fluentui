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
// Export subpath resolution
// ─────────────────────────────────────────────────────────────────────────────

describe('GenerateApi Executor – export subpath resolution', () => {
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

  /**
   * Creates a fixture with a named export "./utils" that has a types field.
   */
  function prepareNamedExportFixture() {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({
        name: '@proj/proj',
        types: 'dist/index.d.ts',
        exports: {
          '.': { types: './dist/index.d.ts', import: './lib/index.js' },
          './utils': { types: './dist/utils/index.d.ts', import: './lib/utils/index.js' },
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
      mkdirSync(join(projRoot, 'dts', 'src', 'utils'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'src', 'index.d.ts'), 'export const root: 1;', 'utf-8');
      writeFileSync(join(projRoot, 'dts', 'src', 'utils', 'index.d.ts'), 'export const bar: string;', 'utf-8');
    });

    return { paths, context };
  }

  /**
   * Creates a fixture with both wildcard and named exports.
   */
  function prepareMixedExportFixture(subDirNames: string[]) {
    const { paths, context } = prepareFixture('valid', {});
    const { projRoot } = paths;

    writeFileSync(
      join(projRoot, 'package.json'),
      serializeJson({
        name: '@proj/proj',
        types: 'dist/index.d.ts',
        exports: {
          '.': { types: './dist/index.d.ts', import: './lib/index.js' },
          './utils': { types: './dist/utils/index.d.ts', import: './lib/utils/index.js' },
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
      mkdirSync(join(projRoot, 'dts', 'src', 'utils'), { recursive: true });
      writeFileSync(join(projRoot, 'dts', 'src', 'index.d.ts'), 'export const root: 1;', 'utf-8');
      writeFileSync(join(projRoot, 'dts', 'src', 'utils', 'index.d.ts'), 'export const bar: string;', 'utf-8');
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

  // ── Wildcard exports ──────────────────────────────────────────────────────

  it('calls api-extractor once per wildcard sub-directory in addition to the primary', async () => {
    const subDirs = ['alpha', 'beta', 'gamma'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, exportSubpaths: true }, context);

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

    await executor({ ...options, exportSubpaths: true }, context);

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

    await executor({ ...options, exportSubpaths: true }, context);

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

    await executor({ ...options, exportSubpaths: true }, context);

    const wildcardConfigs = capturedConfigs.slice(1); // skip primary
    for (const name of subDirs) {
      const cfg = wildcardConfigs.find(c => c.mainEntryPointFilePath.includes(`items/${name}/`))!;
      expect(cfg.apiReportEnabled).toBe(true);
      expect(cfg.reportFilePath).toBe(join(paths.projRoot, 'etc', `${name}.api.md`));
      expect(cfg.reportTempFilePath).toBe(join(paths.projRoot, 'temp', `${name}.api.md`));
    }
  });

  it('skips export subpath expansion when exportSubpaths is false', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, exportSubpaths: false }, context);

    // Only the primary config should run — no subpath expansion
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1);
    expect(output.success).toBe(true);
  });

  it('skips export subpath expansion by default (exportSubpaths not set)', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    // Pass default options — no exportSubpaths key
    const output = await executor(options, context);

    // Only the primary config should run — subpath expansion is opt-in
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1);
    expect(output.success).toBe(true);
  });

  it('expands wildcards when exportSubpaths is true', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareWildcardFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, exportSubpaths: true }, context);

    // primary (1) + one per sub-directory
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1 + subDirs.length);
    expect(output.success).toBe(true);
  });

  // ── Named exports ────────────────────────────────────────────────────────

  it('creates config for named export ./utils with correct mainEntryPointFilePath', async () => {
    const { context } = prepareNamedExportFixture();

    const capturedEntries: string[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedEntries.push(cfg.mainEntryPointFilePath);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: true }, context);

    // primary + utils
    expect(capturedEntries).toHaveLength(2);
    expect(capturedEntries[1]).toContain('utils/index.d.ts');
  });

  it('derives reportFileName from named export key', async () => {
    const { context } = prepareNamedExportFixture();

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: true }, context);

    const utilsConfig = capturedConfigs[1];
    expect(utilsConfig.reportFilePath).toContain('utils.api.md');
  });

  it('enables apiReport by default for named exports when exportSubpaths is true', async () => {
    const { context } = prepareNamedExportFixture();

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: true }, context);

    const utilsConfig = capturedConfigs[1];
    expect(utilsConfig.apiReportEnabled).toBe(true);
  });

  it('disables apiReport for named exports when exportSubpaths: { apiReport: false }', async () => {
    const { context } = prepareNamedExportFixture();

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: { apiReport: false } }, context);

    const utilsConfig = capturedConfigs[1];
    expect(utilsConfig.apiReportEnabled).toBe(false);
  });

  it('sets dts rollup path for named export to dist/{subpath}/index.d.ts', async () => {
    const { paths, context } = prepareNamedExportFixture();

    const capturedConfigs: ExtractorConfig[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedConfigs.push(cfg);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: true }, context);

    const utilsConfig = capturedConfigs[1];
    expect(utilsConfig.untrimmedFilePath).toBe(join(paths.projRoot, 'dist', 'utils', 'index.d.ts'));
  });

  it('processes both named and wildcard exports in a single package', async () => {
    const subDirs = ['alpha', 'beta'];
    const { context } = prepareMixedExportFixture(subDirs);

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(
      () =>
        ({
          succeeded: true,
        } as ExtractorResult),
    );

    const output = await executor({ ...options, exportSubpaths: true }, context);

    // primary (1) + utils (1) + wildcard sub-dirs (2)
    expect(ExtractorInvokeSpy).toHaveBeenCalledTimes(1 + 1 + subDirs.length);
    expect(output.success).toBe(true);
  });

  it('skips "." and "./package.json" entries', async () => {
    const { context } = prepareNamedExportFixture();

    const capturedEntries: string[] = [];
    jest.spyOn(Extractor, 'invoke').mockImplementation(cfg => {
      capturedEntries.push(cfg.mainEntryPointFilePath);
      return { succeeded: true } as ExtractorResult;
    });

    await executor({ ...options, exportSubpaths: true }, context);

    // Only primary + utils — "." and "./package.json" skipped
    expect(capturedEntries).toHaveLength(2);
  });
});
