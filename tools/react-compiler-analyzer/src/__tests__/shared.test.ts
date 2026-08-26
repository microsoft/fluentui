import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import {
  CliError,
  MissingPathError,
  closeScanLog,
  openScanLog,
  validateConcurrency,
  validatePath,
  validatePaths,
} from '../commands/shared';
import { createFormatter } from '../formatter';

describe('validatePath', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'validate-path-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
  });

  it('accepts a directory path', () => {
    const dir = join(tempDir, 'src');
    expect(validatePath(dir)).toBe(dir);
  });

  it('accepts a .ts file path', () => {
    const file = join(tempDir, 'src', 'a.ts');
    writeFileSync(file, 'export const a = 1;');
    expect(validatePath(file)).toBe(file);
  });

  it('accepts a .tsx file path', () => {
    const file = join(tempDir, 'src', 'a.tsx');
    writeFileSync(file, 'export const a = () => <div />;');
    expect(validatePath(file)).toBe(file);
  });

  it('rejects a file that is not TypeScript', () => {
    const file = join(tempDir, 'src', 'a.js');
    writeFileSync(file, 'module.exports = 1;');
    expect(() => validatePath(file)).toThrow(CliError);
    expect(() => validatePath(file)).toThrow(/not a TypeScript/);
  });

  it('rejects a path that does not exist', () => {
    expect(() => validatePath(join(tempDir, 'missing'))).toThrow(CliError);
    expect(() => validatePath(join(tempDir, 'missing'))).toThrow(/does not exist/);
  });
});

describe('validateConcurrency', () => {
  it('accepts any value >= 1', () => {
    expect(() => validateConcurrency(1)).not.toThrow();
    expect(() => validateConcurrency(64)).not.toThrow();
  });

  it('rejects values below 1', () => {
    expect(() => validateConcurrency(0)).toThrow(CliError);
  });
});

describe('validatePaths', () => {
  let tempDir: string;
  let warnings: string[];
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'validate-paths-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    warnings = [];
    originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map(String).join(' '));
    };
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('resolves every path when all exist', () => {
    const dir = join(tempDir, 'src');
    expect(validatePaths([dir, tempDir])).toEqual([dir, tempDir]);
    expect(warnings).toHaveLength(0);
  });

  it('skips a missing path with a warning and keeps going', () => {
    const dir = join(tempDir, 'src');
    const missing = join(tempDir, 'not-here');

    expect(validatePaths([dir, missing])).toEqual([dir]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('skipping missing path');
    expect(warnings[0]).toContain(missing);
  });

  it('fails when no path exists', () => {
    expect(() => validatePaths([join(tempDir, 'a'), join(tempDir, 'b')])).toThrow(/none of the given paths exist/);
  });

  it('fails on the first missing path with strict', () => {
    const dir = join(tempDir, 'src');
    expect(() => validatePaths([dir, join(tempDir, 'nope')], { strict: true })).toThrow(MissingPathError);
  });

  it('still fails hard for a path that exists but is not TypeScript', () => {
    const file = join(tempDir, 'src', 'a.js');
    writeFileSync(file, 'module.exports = 1;');
    expect(() => validatePaths([file])).toThrow(/not a TypeScript/);
    expect(warnings).toHaveLength(0);
  });
});

describe('scan log wrapper helpers', () => {
  let logs: string[];
  let originalLog: typeof console.log;

  beforeEach(() => {
    logs = [];
    originalLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(args.map(String).join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('openScanLog emits <details> + <summary> + blank line', () => {
    openScanLog(createFormatter('md'), 'Scan & compile log');
    expect(logs).toEqual(['<details>', '<summary>📋 Scan & compile log</summary>', '']);
  });

  it('closeScanLog emits blank line + </details> + blank line', () => {
    closeScanLog(createFormatter('md'));
    expect(logs).toEqual(['', '</details>', '']);
  });

  it('openScanLog/closeScanLog emit a plain titled header in cli format', () => {
    openScanLog(createFormatter('cli'), 'Scan & compile log');
    closeScanLog(createFormatter('cli'));
    expect(logs).toEqual(['📋 Scan & compile log', '─'.repeat('Scan & compile log'.length + 3), '', '']);
  });

  it('openScanLog/closeScanLog emit a collapsible scan-log block in html format', () => {
    openScanLog(createFormatter('html'), 'Scan & compile log');
    closeScanLog(createFormatter('html'));
    expect(logs).toEqual([
      '<details class="scan-log"><summary>📋 Scan &amp; compile log</summary><div class="scan-body">',
      '</div></details>',
    ]);
  });

  it('preserves any content logged between open and close', () => {
    openScanLog(createFormatter('md'), 'Title');
    console.log('## Scanning: /foo');
    console.log('  [CompileSuccess] /foo/Bar.tsx fn@1:1');
    closeScanLog(createFormatter('md'));

    expect(logs).toEqual([
      '<details>',
      '<summary>📋 Title</summary>',
      '',
      '## Scanning: /foo',
      '  [CompileSuccess] /foo/Bar.tsx fn@1:1',
      '',
      '</details>',
      '',
    ]);
  });

  it('emits a blank line after <summary> so GFM renders the inner content as markdown', () => {
    // Regression guard: an empty line MUST follow <summary> or GFM treats the rest as raw HTML.
    openScanLog(createFormatter('md'), 'x');
    expect(logs[1]).toMatch(/^<summary>/);
    expect(logs[2]).toBe('');
  });
});
