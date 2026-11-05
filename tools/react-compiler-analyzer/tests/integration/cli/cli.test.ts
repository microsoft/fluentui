import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

describe('packaged CLI integration', () => {
  it('validates analyze/lint contracts, previews without writes, and works without SWC', () => {
    const result = spawnSync(process.execPath, [join(__dirname, 'runner.cjs')], {
      encoding: 'utf8',
      timeout: 90000,
      maxBuffer: 2 * 1024 * 1024,
    });
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`CLI integration failed (exit ${result.status}):\n${result.stderr}\n${result.stdout}`);
    }
    expect(result.stdout).toContain('CLI integration passed');
  }, 95000);
});
