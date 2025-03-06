import { execSync } from 'node:child_process';

import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import { sync as findUpSync } from 'find-up';

export function findGitRoot(cwd: string) {
  const output = execSync('git rev-parse --show-toplevel', { cwd });

  return output.toString().trim();
}

export function getPackageMetadata(reportFilePath: string) {
  const root = getPackageRoot(reportFilePath);
  const json = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

  return {
    root,
    name: json.name,
  };
}

export function getPackageRoot(reportFilePath: string) {
  const rootConfig = findUpSync(['package.json'], { cwd: dirname(reportFilePath) });

  if (!rootConfig) {
    throw new Error(
      [
        'Failed to find a package root (directory that contains "package.json" or "project.json" file)',
        `Report file location: ${reportFilePath}`,
        `Tip: You can override package root resolution by providing "packageRoot" function in the configuration`,
      ].join('\n'),
    );
  }

  return dirname(rootConfig);
}

export async function loadPixelmatch() {
  const pixelmatch = (await import('pixelmatch')).default;
  return pixelmatch;
}
