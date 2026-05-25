import { closeScanLog, openScanLog } from '../commands/shared';

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
    openScanLog('Scan & compile log');
    expect(logs).toEqual(['<details>', '<summary>📋 Scan & compile log</summary>', '']);
  });

  it('closeScanLog emits blank line + </details> + blank line', () => {
    closeScanLog();
    expect(logs).toEqual(['', '</details>', '']);
  });

  it('preserves any content logged between open and close', () => {
    openScanLog('Title');
    console.log('## Scanning: /foo');
    console.log('  [CompileSuccess] /foo/Bar.tsx fn@1:1');
    closeScanLog();

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
    openScanLog('x');
    expect(logs[1]).toMatch(/^<summary>/);
    expect(logs[2]).toBe('');
  });
});
