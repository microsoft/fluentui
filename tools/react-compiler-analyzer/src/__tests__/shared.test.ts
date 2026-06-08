import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { closeScanLog, openScanLog, validatePath } from '../commands/shared';

describe('validatePath', () => {
  let tempDir: string;
  let originalError: typeof console.error;
  let originalExit: typeof process.exit;
  let exitCode: number | undefined;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'validate-path-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });

    exitCode = undefined;
    originalError = console.error;
    console.error = () => undefined;
    originalExit = process.exit;
    process.exit = ((code?: number) => {
      exitCode = code;
      throw new Error(`process.exit(${code})`);
    }) as never;
  });

  afterEach(() => {
    console.error = originalError;
    process.exit = originalExit;
  });

  it('accepts a directory path', () => {
    const dir = join(tempDir, 'src');
    expect(validatePath(dir)).toBe(dir);
    expect(exitCode).toBeUndefined();
  });

  it('accepts a .ts file path', () => {
    const file = join(tempDir, 'src', 'a.ts');
    writeFileSync(file, 'export const a = 1;');
    expect(validatePath(file)).toBe(file);
    expect(exitCode).toBeUndefined();
  });

  it('accepts a .tsx file path', () => {
    const file = join(tempDir, 'src', 'a.tsx');
    writeFileSync(file, 'export const a = () => <div />;');
    expect(validatePath(file)).toBe(file);
    expect(exitCode).toBeUndefined();
  });

  it('errors when a file is not a TypeScript file', () => {
    const file = join(tempDir, 'src', 'a.js');
    writeFileSync(file, 'module.exports = 1;');
    expect(() => validatePath(file)).toThrow();
    expect(exitCode).toBe(1);
  });

  it('errors when the path does not exist', () => {
    expect(() => validatePath(join(tempDir, 'missing'))).toThrow();
    expect(exitCode).toBe(1);
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
    openScanLog('md', 'Scan & compile log');
    expect(logs).toEqual(['<details>', '<summary>📋 Scan & compile log</summary>', '']);
  });

  it('closeScanLog emits blank line + </details> + blank line', () => {
    closeScanLog('md');
    expect(logs).toEqual(['', '</details>', '']);
  });

  it('openScanLog/closeScanLog emit a plain titled header in cli format', () => {
    openScanLog('cli', 'Scan & compile log');
    closeScanLog('cli');
    expect(logs).toEqual(['📋 Scan & compile log', '─'.repeat('Scan & compile log'.length + 3), '', '']);
  });

  it('preserves any content logged between open and close', () => {
    openScanLog('md', 'Title');
    console.log('## Scanning: /foo');
    console.log('  [CompileSuccess] /foo/Bar.tsx fn@1:1');
    closeScanLog('md');

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
    openScanLog('md', 'x');
    expect(logs[1]).toMatch(/^<summary>/);
    expect(logs[2]).toBe('');
  });
});
