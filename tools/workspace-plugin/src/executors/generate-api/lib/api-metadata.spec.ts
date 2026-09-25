import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ExecutorContext } from '@nx/devkit';

import { finalizeApiMetadata } from './api-metadata';

const testRoot = join(__dirname, '.api-metadata-test');
const mockWriteGeneratedMetadata = jest.fn();
const mockGenerateApiMetadata = jest.fn();
const mockMarkApiMetadataRolloutPartial = jest.fn((result: unknown) => result);

jest.mock('@fluentui/api-metadata/generator', () => ({
  generateApiMetadata: mockGenerateApiMetadata,
  markApiMetadataRolloutPartial: mockMarkApiMetadataRolloutPartial,
  assertApiMetadataPublishable: (result: { diagnostics: Array<{ severity: string; code: string }> }) => {
    const error = result.diagnostics.find(diagnostic => diagnostic.severity === 'error');
    if (error) {
      throw new Error(`[${error.code}]`);
    }
  },
  writeGeneratedMetadata: mockWriteGeneratedMetadata,
}));

describe('finalizeApiMetadata', () => {
  beforeEach(() => {
    mockGenerateApiMetadata.mockResolvedValue({
      index: {},
      records: [],
      diagnostics: [{ code: 'generator.declarationMissing', severity: 'error', message: 'Missing declaration' }],
    });
  });

  afterEach(() => {
    rmSync(testRoot, { recursive: true, force: true });
    jest.clearAllMocks();
  });

  it('fails without writing metadata when a published declaration is missing', async () => {
    const packageRoot = join(testRoot, 'project');
    mkdirSync(packageRoot, { recursive: true });
    writeFileSync(
      join(packageRoot, 'package.json'),
      JSON.stringify({
        name: '@fixture/missing-declaration',
        version: '1.0.0',
        exports: {
          '.': {
            import: {
              types: './dist/index.d.ts',
              default: './lib/index.js',
            },
          },
        },
      }),
    );

    const context = {
      root: testRoot,
      cwd: testRoot,
      isVerbose: false,
      projectName: 'project',
      projectsConfigurations: {
        version: 2,
        projects: {
          project: { root: 'project' },
        },
      },
      nxJsonConfiguration: {},
      projectGraph: { nodes: {}, dependencies: {} },
    } satisfies ExecutorContext;

    await expect(
      finalizeApiMetadata({ system: 'fluent-v9' }, context, {
        declarationsFinalized: true,
      }),
    ).rejects.toThrow('[generator.declarationMissing]');
    expect(mockGenerateApiMetadata).toHaveBeenCalledWith({
      packageRoot,
      system: 'fluent-v9',
    });
    expect(mockMarkApiMetadataRolloutPartial).toHaveBeenCalledWith(
      expect.objectContaining({ diagnostics: expect.any(Array) }),
      [],
    );
    expect(existsSync(join(packageRoot, 'dist/metadata/index.json'))).toBe(false);
    expect(mockWriteGeneratedMetadata).not.toHaveBeenCalled();
  });
});
