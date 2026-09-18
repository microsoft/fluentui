/*
 * @jest-environment node
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

describe('@fluentui/react-components ESM import', () => {
  it('supports named imports from node ESM', () => {
    const testDirectory = mkdtempSync(join(process.cwd(), 'tmp-esm-import-'));
    const testFilePath = join(testDirectory, 'test.mjs');

    try {
      writeFileSync(
        testFilePath,
        "import { FluentProvider } from '@fluentui/react-components';\nconsole.log(FluentProvider !== undefined ? 'defined' : 'undefined');\n",
      );

      const result = spawnSync(process.execPath, [testFilePath], {
        cwd: process.cwd(),
        encoding: 'utf-8',
      });

      expect({
        status: result.status,
        error: result.error?.message,
        stdout: result.stdout,
        stderr: result.stderr,
      }).toMatchObject({ status: 0, stdout: 'defined\n', stderr: '' });
    } finally {
      rmSync(testDirectory, { recursive: true, force: true });
    }
  });
});
