import { type ExecutorContext, serializeJson } from '@nx/devkit';
import {
  Extractor,
  type IExtractorInvokeOptions,
  type ExtractorConfig,
  type ExtractorResult,
} from '@microsoft/api-extractor';
import { basename, join } from 'node:path';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, readdirSync } from 'node:fs';

import { type TsConfig } from '../../types';

import { type GenerateApiExecutorSchema } from './schema';
import executor from './executor';
import { isCI } from './lib/shared';

// =========== mocks START
import { execSync } from 'node:child_process';
// =========== mocks END

const fixturesRootDir = join(__dirname, '__fixtures__');

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

jest.mock('node:child_process', () => {
  return {
    execSync: jest.fn(),
  };
});

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
