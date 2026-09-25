import * as fs from 'node:fs';
import * as path from 'node:path';

import { loadMetadataGenerator } from '../../utils/metadata-generator';
import { validateHandler } from './validate-handler';

const fixtureRoot = path.resolve(__dirname, '__fixtures__/v1-package');
const outputRoot = path.resolve(__dirname, '__fixtures__/__validate-output__');
const { generateApiMetadata, writeGeneratedMetadata } = loadMetadataGenerator();

describe('metadata validate handler', () => {
  beforeEach(async () => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    writeGeneratedMetadata(generated, outputRoot);
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    process.exitCode = undefined;
  });

  afterEach(() => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    jest.restoreAllMocks();
    process.exitCode = undefined;
  });

  it('emits strict validation coverage', async () => {
    await validateHandler({
      _: ['metadata', 'validate'],
      $0: 'fluentui-cli',
      input: outputRoot,
      json: true,
    });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.type).toBe('fluentui.metadata-validation');
    expect(output.data.valid).toBe(true);
    expect(output.data.recordsValidated).toBe(output.data.recordsAdvertised);
  });

  it('fails after reporting a missing advertised record', async () => {
    const index = JSON.parse(fs.readFileSync(path.join(outputRoot, 'index.json'), 'utf8'));
    fs.unlinkSync(path.join(outputRoot, index.records[0].path));

    await validateHandler({
      _: ['metadata', 'validate'],
      $0: 'fluentui-cli',
      input: outputRoot,
      json: true,
    });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.data.valid).toBe(false);
    expect(output.diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'CLI_METADATA_RECORD_MISSING' })]),
    );
    expect(process.exitCode).toBe(1);
  });
});
