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
        "import { FluentProvider } from '@fluentui/react-components';\nconsole.log(typeof FluentProvider);\n",
      );

      const result = spawnSync(process.execPath, [testFilePath], {
        cwd: process.cwd(),
        encoding: 'utf-8',
      });

      expect(result.status).toBe(0);
      expect(result.stdout.trim()).toBe('object');
    } finally {
      rmSync(testDirectory, { recursive: true, force: true });
    }
  });
});
