import * as fs from 'node:fs';
import * as path from 'node:path';

import { createEnvelope, emitOutput, emptyCoverage } from './output';

describe('CLI output', () => {
  const outputPath = path.resolve(__dirname, '__output-fixture__.json');

  afterEach(() => {
    jest.restoreAllMocks();
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('creates the complete versioned envelope', () => {
    expect(createEnvelope('example', { value: 1 }, [], emptyCoverage())).toEqual({
      apiVersion: '1',
      type: 'example',
      data: { value: 1 },
      diagnostics: [],
      coverage: {
        status: 'complete',
        selectedRoots: 0,
        metadataRoots: 0,
        declarationFallbackRoots: 0,
        unavailableRoots: 0,
      },
      status: 'complete',
    });
  });

  it('writes exactly one compact JSON document to stdout', () => {
    const write = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const envelope = createEnvelope('example', { value: 1 }, [], emptyCoverage());

    emitOutput({ json: true }, envelope, () => 'human');

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith(`${JSON.stringify(envelope)}\n`);
  });

  it('deduplicates repeated diagnostics without merging distinct package or severity contexts', () => {
    const warning = { code: 'reader.indexPartial', severity: 'warning' as const, message: 'Partial coverage' };
    const diagnostics = [
      warning,
      { ...warning },
      { ...warning, package: '@scope/other' },
      { ...warning, severity: 'error' as const },
    ];
    expect(createEnvelope('example', {}, diagnostics, emptyCoverage()).diagnostics).toEqual([
      warning,
      diagnostics[2],
      diagnostics[3],
    ]);
  });

  it('writes machine output to a file without logging to stdout', () => {
    const write = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const envelope = createEnvelope('example', { value: 1 }, [], emptyCoverage());

    emitOutput({ json: true, output: outputPath }, envelope, () => 'human');

    expect(write).not.toHaveBeenCalled();
    expect(JSON.parse(fs.readFileSync(outputPath, 'utf8'))).toEqual(envelope);
  });

  it('writes the same Markdown to stdout or a file, with a trailing newline', () => {
    const write = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const envelope = createEnvelope('example', { value: 1 }, [], emptyCoverage());
    const markdown = '# Example\n\n| Value |\n| --- |\n| `1` |';
    emitOutput({}, envelope, () => markdown);
    expect(write).toHaveBeenCalledWith(`${markdown}\n`);
    write.mockClear();
    emitOutput({ output: outputPath }, envelope, () => markdown);
    expect(write).not.toHaveBeenCalled();
    expect(fs.readFileSync(outputPath, 'utf8')).toBe(`${markdown}\n`);
  });
});
