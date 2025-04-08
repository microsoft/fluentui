import { type ExecutorContext, serializeJson } from '@nx/devkit';
import {
  Extractor,
  type IExtractorInvokeOptions,
  type ExtractorConfig,
  type ExtractorResult,
} from '@microsoft/api-extractor';
import { join } from 'node:path';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

import { type TsConfig } from '../../types';

import { type GenerateApiExecutorSchema } from './schema';
import executor from './executor';
import { isCI } from './lib/shared';

// =========== mocks START
import { execSync } from 'node:child_process';
// =========== mocks END

const options: GenerateApiExecutorSchema = {};
const context: ExecutorContext = {
  root: join(__dirname, '__fixtures__'),
  cwd: process.cwd(),
  isVerbose: true,
  projectName: 'proj',
  projectsConfigurations: {
    projects: { proj: { root: 'proj' } },
    version: 2,
  },
};

jest.mock('node:child_process', () => {
  return {
    execSync: jest.fn(),
  };
});

const execSyncMock = execSync as jest.Mock;

function cleanup() {
  rmSync(context.root, { recursive: true, force: true });
}

function prepareFixture(type: 'valid' | 'invalid', config: { extractorConfigPath?: string }) {
  const { extractorConfigPath = 'config/api-extractor.json' } = config;
  const fixtureRoot = context.root;
  const projRoot = join(fixtureRoot, 'proj');

  if (!existsSync(fixtureRoot)) {
    mkdirSync(fixtureRoot);
    mkdirSync(projRoot);

    if (type === 'valid') {
      writeFileSync(
        join(projRoot, 'package.json'),
        serializeJson({ name: '@proj/proj', types: 'dist/index.d.ts' }),
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
  }

  return {
    paths: { fixtureRoot, projRoot },
  };
}

describe('GenerateApi Executor', () => {
  afterEach(() => {
    cleanup();
  });

  it(`should handle invalid inputs`, async () => {
    const { paths } = prepareFixture('invalid', {});
    try {
      await executor(options, context);
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[Error: ${__dirname}/__fixtures__/proj/tsconfig.json doesn't exist]`);
    }

    writeFileSync(join(paths.projRoot, 'tsconfig.json'), '{}', 'utf-8');

    try {
      await executor(options, context);
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[Error: Cannot find api-extractor.json at "${__dirname}/__fixtures__/proj/config/api-extractor.json"]`,
      );
    }
  });

  it('can run', async () => {
    const { paths } = prepareFixture('valid', {});

    const ExtractorInvokeSpy = jest.spyOn(Extractor, 'invoke').mockImplementation(() => {
      return { succeeded: true } as ExtractorResult;
    });

    execSyncMock.mockImplementation(() => {
      mkdirSync(join(paths.projRoot, 'dts'));
      writeFileSync(join(paths.projRoot, 'dts', 'index.d.ts'), 'export const foo:number;', 'utf-8');
    });

    const output = await executor(options, context);

    const projectRootAbsolutePath = `${__dirname}/__fixtures__/proj`;

    expect(execSyncMock.mock.calls.flat()).toEqual([
      `tsc -p ${projectRootAbsolutePath}/tsconfig.lib.json --pretty --emitDeclarationOnly --baseUrl ${projectRootAbsolutePath}`,
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
    prepareFixture('valid', { extractorConfigPath: 'api-extractor.json' });

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
