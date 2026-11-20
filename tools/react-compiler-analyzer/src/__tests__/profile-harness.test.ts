import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

describe('read-only profiling harness', () => {
  let directory: string;
  let request: string;
  let cli: string;
  let output: string;

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'rca-profile-'));
    request = join(directory, 'request.json');
    cli = join(directory, 'cli.cjs');
    output = join(directory, 'output');
    writeFileSync(join(directory, 'Example.tsx'), 'export function Example() { return <div />; }\n');
    writeFileSync(
      cli,
      'console.log(JSON.stringify({schemaVersion:5,completeness:"incomplete",summary:{functions:1}})); process.exitCode=1;',
    );
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  function run(args: string[] = [], extra: string[] = []) {
    writeFileSync(
      request,
      JSON.stringify({
        cwd: directory,
        roots: [directory],
        command: 'analyze',
        config: {},
        cli,
        args,
      }),
    );
    return spawnSync(
      process.execPath,
      [resolve(__dirname, '../../tests/profile.mjs'), '--request', request, '--output', output, ...extra],
      { encoding: 'utf8', timeout: 15000 },
    );
  }

  it('distinguishes a valid nonzero partial report from a resource failure and checks source hashes', () => {
    const child = run();
    expect(child.error).toBeUndefined();
    expect(child.status).toBe(0);
    const metrics = JSON.parse(readFileSync(join(output, 'metrics.json'), 'utf8'));
    expect(metrics).toMatchObject({
      code: 1,
      signal: null,
      timedOut: false,
      files: 1,
      schemaVersion: 5,
      completeness: 'incomplete',
    });
    expect(metrics.peak.heapUsed).toBeGreaterThan(0);
    expect(metrics.peak.rss).toBeGreaterThan(0);
    expect(JSON.parse(readFileSync(join(output, 'manifest.json'), 'utf8'))).toHaveLength(1);
    expect(readFileSync(join(directory, 'Example.tsx'), 'utf8')).toContain('export function Example');
  });

  it('rejects source-edit arguments before running the child', () => {
    writeFileSync(
      cli,
      `require('node:fs').writeFileSync(${JSON.stringify(join(directory, 'Example.tsx'))}, 'changed');`,
    );
    const child = run(['--fix']);
    expect(child.status).not.toBe(0);
    expect(child.stderr).toContain('Only --verbose');
    expect(readFileSync(join(directory, 'Example.tsx'), 'utf8')).toContain('export function Example');
  });

  it('records bounded termination separately from an ordinary nonzero JSON report', () => {
    writeFileSync(cli, 'setInterval(() => {}, 1000);');
    const child = run([], ['--timeout-seconds', '0.2']);
    expect(child.error).toBeUndefined();
    expect(child.status).toBe(1);
    const metrics = JSON.parse(readFileSync(join(output, 'metrics.json'), 'utf8'));
    expect(metrics.timedOut).toBe(true);
    expect(metrics.reportError).toBeTruthy();
    expect(metrics.schemaVersion).toBeUndefined();
  });
});
