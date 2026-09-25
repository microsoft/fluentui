import * as fs from 'node:fs';
import * as path from 'node:path';

import { generateHandler } from './generate-handler';

const fixtureRoot = path.resolve(__dirname, '__fixtures__/v1-package');
const outputRoot = path.resolve(__dirname, '__fixtures__/__generate-output__');

describe('metadata generate handler', () => {
  beforeEach(() => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it('generates canonical metadata for an arbitrary package root', async () => {
    await generateHandler({
      _: ['metadata', 'generate'],
      $0: 'fluentui-cli',
      packageRoot: fixtureRoot,
      output: outputRoot,
      json: true,
    });

    expect(fs.existsSync(path.join(outputRoot, 'index.json'))).toBe(true);
    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output).toEqual(
      expect.objectContaining({
        apiVersion: '1',
        type: 'fluentui.metadata-generate',
        status: 'complete',
      }),
    );
    expect(output.data.package.name).toBe('@fluentui/cli-v1-fixture');
  });

  it('rejects an expected package name that does not match the manifest', async () => {
    await expect(
      generateHandler({
        _: ['metadata', 'generate'],
        $0: 'fluentui-cli',
        packageRoot: fixtureRoot,
        packageName: '@fluentui/not-the-fixture',
        output: outputRoot,
        json: true,
      }),
    ).rejects.toMatchObject({
      code: 'CLI_METADATA_PACKAGE_NAME_MISMATCH',
      exitCode: 2,
    });
    expect(fs.existsSync(outputRoot)).toBe(false);
    expect(process.stdout.write).not.toHaveBeenCalled();
  });

  it('formats the generation summary as Markdown', async () => {
    await generateHandler({
      _: ['metadata', 'generate'],
      $0: 'fluentui-cli',
      packageRoot: fixtureRoot,
      output: outputRoot,
    });
    const output = (process.stdout.write as jest.Mock).mock.calls[0][0];
    expect(output).toContain('# API metadata generation');
    expect(output).toContain('Generated API metadata for `@fluentui/cli-v1-fixture@');
    expect(output).toContain('- **Records:**');
  });
});
