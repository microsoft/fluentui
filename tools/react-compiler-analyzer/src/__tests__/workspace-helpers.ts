import { cpSync, mkdirSync, mkdtempSync, rmdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const WORKSPACE_FIXTURES = join(__dirname, '__fixtures__', 'workspace');

/** Real package symlinks are created at runtime so fixtures remain portable. */
export function createWorkspace() {
  // Keep runtime scans outside __tests__: the CLI excludes that directory by default.
  const scratch = join(__dirname, '../..', '.workspace-runs');
  mkdirSync(scratch, { recursive: true });
  const root = mkdtempSync(join(scratch, 'workspace-'));
  cpSync(WORKSPACE_FIXTURES, root, { recursive: true });
  mkdirSync(join(root, 'node_modules', '@ws'), { recursive: true });
  for (const name of ['feature', 'refs-built', 'refs-unbuilt', 'cjs-dist', 'controls', 'entries']) {
    symlinkSync(join(root, 'packages', name), join(root, 'node_modules', '@ws', name), 'dir');
  }
  mkdirSync(join(root, 'node_modules', 'third-party-store'), { recursive: true });
  writeFileSync(
    join(root, 'node_modules', 'third-party-store', 'package.json'),
    JSON.stringify({ name: 'third-party-store', type: 'module', main: './index.js' }),
  );
  writeFileSync(
    join(root, 'node_modules', 'third-party-store', 'index.js'),
    'export function readExternal() { return store.getState().value; }\n',
  );
  return {
    root,
    file: (path: string) => join(root, path),
    cleanup: () => {
      rmSync(root, { recursive: true, force: true });
      try {
        rmdirSync(scratch);
      } catch {
        // Other workspace tests may still be using the shared scratch parent.
      }
    },
  };
}
