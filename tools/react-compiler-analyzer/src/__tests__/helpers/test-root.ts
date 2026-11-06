import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach } from '@jest/globals';

const roots = new Set<string>();

export function testRoot(): string {
  const root = mkdtempSync(join(process.cwd(), '.rca-test-root-'));
  roots.add(root);
  return root;
}

afterEach(() => {
  for (const root of roots) {
    rmSync(root, { recursive: true, force: true });
  }
  roots.clear();
});
