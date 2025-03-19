import { execSync } from 'node:child_process';

import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import { sync as findUpSync } from 'find-up';

export function findGitRoot(cwd: string) {
  const output = execSync('git rev-parse --show-toplevel', { cwd });

  return output.toString().trim();
}

/**
 *
 * @param outputRoot-  absolute root path to output assets
 * @returns
 */
export function getPackageMetadata(outputRoot: string) {
  const root = getPackageRoot(outputRoot);
  const json: { name: string } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));

  return {
    root,
    name: json.name,
  };
}

export function getPackageRoot(outputRoot: string) {
  const rootConfig = findUpSync(['package.json', 'project.json'], { cwd: outputRoot });

  if (!rootConfig) {
    throw new Error(
      [
        'Failed to find a package root (directory that contains "package.json" or "project.json" file)',
        `Report file location: ${outputRoot}`,
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

export function stripIndents(strings: { raw: readonly string[] }, ...values: string[]) {
  return String.raw(strings, ...values)
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
}
