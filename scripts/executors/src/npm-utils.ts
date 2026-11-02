import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const npmRegistry = 'https://registry.npmjs.org/';

export type RunNpmCommandOptions = {
  args: readonly string[];
  npmToken: string;
};

/**
 * Runs an npm command against the public registry using a temporary user config for authentication.
 * The temporary config is removed after the command completes or fails.
 */
export function runNpmCommand(options: RunNpmCommandOptions): void {
  const { args, npmToken } = options;
  const npmConfigDir = mkdtempSync(join(tmpdir(), 'fluentui-npm-'));
  const npmConfigPath = join(npmConfigDir, '.npmrc');

  try {
    writeFileSync(npmConfigPath, '//registry.npmjs.org/:_authToken=${TOKEN}\n');
    const npmArgs = [...args, '--registry', npmRegistry, '--userconfig', npmConfigPath];

    console.log(`npm ${npmArgs.join(' ')}`);

    const result = spawnSync('npm', npmArgs, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: {
        ...process.env,
        TOKEN: npmToken,
      },
    });

    if (result.error) {
      throw result.error;
    }

    if (result.status !== 0) {
      throw new Error(`npm exited with status ${result.status}`);
    }
  } finally {
    rmSync(npmConfigDir, { recursive: true, force: true });
  }
}
