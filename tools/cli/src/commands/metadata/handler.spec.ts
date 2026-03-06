import * as path from 'node:path';
import * as fs from 'node:fs';

import { handler } from './handler';

const FIXTURES_DIR = path.resolve(__dirname, '__fixtures__');
const SAMPLE_DTS = path.join(FIXTURES_DIR, 'sample-button.d.ts');

describe('metadata handler', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should output JSON metadata for a .d.ts entry file', async () => {
    await handler({ _: ['metadata'], $0: 'fluentui-cli', entry: SAMPLE_DTS, reporter: 'json' });

    expect(logSpy).toHaveBeenCalledTimes(1);
    const output = JSON.parse(logSpy.mock.calls[0][0]);

    expect(output.package.name).toBe('@fluentui/sample-button');
    expect(output.categories.components).toHaveProperty('SampleButton');
    expect(output.categories.hooks).toHaveProperty('useSampleButton_unstable');
    expect(output.categories.types).toHaveProperty('SampleButtonProps');
    expect(output.categories.others).toHaveProperty('sampleButtonClassNames');
  });

  it('should output markdown when reporter=markdown', async () => {
    await handler({ _: ['metadata'], $0: 'fluentui-cli', entry: SAMPLE_DTS, reporter: 'markdown' });

    const output: string = logSpy.mock.calls[0][0];
    expect(output).toContain('# API Metadata:');
    expect(output).toContain('## Components');
    expect(output).toContain('SampleButton');
  });

  it('should output HTML when reporter=html', async () => {
    await handler({ _: ['metadata'], $0: 'fluentui-cli', entry: SAMPLE_DTS, reporter: 'html' });

    const output: string = logSpy.mock.calls[0][0];
    expect(output).toContain('<!DOCTYPE html>');
    expect(output).toContain('SampleButton');
  });

  it('should write to file when --output is specified', async () => {
    const tmpOutput = path.join(FIXTURES_DIR, '__test-output__.json');

    try {
      await handler({ _: ['metadata'], $0: 'fluentui-cli', entry: SAMPLE_DTS, reporter: 'json', output: tmpOutput });

      expect(fs.existsSync(tmpOutput)).toBe(true);
      const content = JSON.parse(fs.readFileSync(tmpOutput, 'utf-8'));
      expect(content.package.name).toBe('@fluentui/sample-button');
    } finally {
      if (fs.existsSync(tmpOutput)) {
        fs.unlinkSync(tmpOutput);
      }
    }
  });
});
