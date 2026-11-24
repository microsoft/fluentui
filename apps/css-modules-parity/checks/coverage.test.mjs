/**
 * Parity coverage gate.
 *
 * Every CSS Modules style hook (`packages/react-components/<pkg>/library/src/**\/*.styles.css.ts`) must either be
 * covered by a parity spec or be listed in `parity-exemptions.json` with a reason.
 *
 * A hook is covered when some file under `apps/css-modules-parity/e2e/` mentions its Griffel baseline, that is the
 * hook path relative to `packages/react-components/` without the `.css.ts` suffix
 * (e.g. `react-button/library/src/components/Button/useButtonStyles.styles`).
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';

const repoRoot = path.resolve(import.meta.dirname, '../../..');
const componentsRoot = path.join(repoRoot, 'packages/react-components');
const e2eRoot = path.join(repoRoot, 'apps/css-modules-parity/e2e');

const toPosix = p => p.split(path.sep).join('/');

function listHooks() {
  const found = [];
  for (const pkg of fs.readdirSync(componentsRoot)) {
    const srcDir = path.join(componentsRoot, pkg, 'library/src');
    if (!fs.existsSync(srcDir)) {
      continue;
    }
    for (const file of fs.readdirSync(srcDir, { recursive: true })) {
      const rel = toPosix(String(file));
      if (rel.endsWith('.styles.css.ts') && !rel.endsWith('.test.ts')) {
        found.push(`${pkg}/library/src/${rel}`);
      }
    }
  }
  return found.sort();
}

const specText = fs
  .readdirSync(e2eRoot, { recursive: true })
  .map(String)
  .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
  .map(f => fs.readFileSync(path.join(e2eRoot, f), 'utf8'))
  .join('\n');

const keyOf = hook => hook.replace(/\.css\.ts$/, '');
const isCovered = hook => specText.includes(keyOf(hook));

const exemptions = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'parity-exemptions.json'), 'utf8'));
const hooks = listHooks();

describe('css-modules parity coverage', () => {
  it('every hook is covered or exempt', () => {
    const missing = hooks.filter(hook => !isCovered(hook) && !(hook in exemptions));
    assert.deepEqual(
      missing,
      [],
      `Hooks without a parity spec or exemption:\n${missing.join('\n')}\n` +
        'Add a describeParity spec in apps/css-modules-parity/e2e or an entry with a reason in checks/parity-exemptions.json.',
    );
  });

  it('has no stale exemptions', () => {
    const stale = Object.keys(exemptions).filter(hook => !hooks.includes(hook) || isCovered(hook));
    assert.deepEqual(stale, [], `Remove from parity-exemptions.json:\n${stale.join('\n')}`);
  });

  it('gives every exemption a reason', () => {
    const bad = Object.entries(exemptions)
      .filter(([, reason]) => {
        if (typeof reason !== 'string' || reason.length < 20) {
          return true;
        }
        return !reason.startsWith('GAP:') && !reason.includes('.cy.tsx') && !reason.includes('.test.ts');
      })
      .map(([hook]) => hook);
    assert.deepEqual(
      bad,
      [],
      `Reasons must be at least 20 characters; non-GAP reasons must name a .cy.tsx or .test.ts proof:\n${bad.join(
        '\n',
      )}`,
    );
  });
});
