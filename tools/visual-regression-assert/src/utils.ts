import { execSync } from 'node:child_process';

import { dirname, join, relative } from 'node:path';
import { readFileSync } from 'node:fs';
import { sync as findUpSync } from 'find-up';
import type { Metadata } from './types';

export function findGitRoot(cwd: string) {
  const output = execSync('git rev-parse --show-toplevel', { cwd });

  return output.toString().trim();
}

export function createMetadataForReport(options: {
  repoRoot: string;
  absolutePaths: {
    outputPath: string;
    baselineDir: string;
    outputBaselineDir: string;
    actualDir: string;
    diffDir: string;
  };
}): Metadata {
  const { repoRoot, absolutePaths } = options;
  const projectRoot = getPackageRoot(absolutePaths.outputPath);
  const json: { name: string } = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf-8'));

  return {
    project: {
      root: relative(repoRoot, projectRoot),
      name: json.name,
    },
    paths: Object.entries(absolutePaths).reduce<Record<string, string>>((acc, [key, absPath]) => {
      acc[key] = relative(repoRoot, absPath);
      return acc;
    }, {}) as typeof absolutePaths,
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
