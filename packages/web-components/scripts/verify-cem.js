// @ts-check
/**
 * Validates that all module paths referenced in the Custom Elements Manifest
 * point to files that exist in the dist output.
 */

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

main();

function main() {
  const root = path.join(import.meta.dirname, '../');
  const cemPath = path.join(root, 'custom-elements.json');

  assert.ok(existsSync(cemPath), 'custom-elements.json must exist');

  /** @type {{ modules?: Array<{ path?: string }> }} */
  const cem = JSON.parse(readFileSync(cemPath, 'utf-8'));

  assert.ok(cem.modules?.length, 'custom-elements.json must contain modules');

  const missing = [];

  for (const mod of cem.modules) {
    if (!mod.path) {
      continue;
    }

    const resolved = path.resolve(root, mod.path);
    if (!existsSync(resolved)) {
      missing.push(mod.path);
    }
  }

  assert.equal(
    missing.length,
    0,
    `CEM references ${missing.length} file(s) that do not exist in dist:\n  ${missing.join('\n  ')}`,
  );

  console.log(`✓ All ${cem.modules.length} CEM module paths resolve to existing files.`);
}
