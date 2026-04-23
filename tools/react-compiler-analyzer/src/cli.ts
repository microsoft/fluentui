import { existsSync, globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';

import { parseArgs } from './args';
import { analyzeFiles } from './analyzer';
import { printReport, printSummary } from './reporter';
import { applyFixes } from './fixer';
import type { FileEntry } from './types';

const USE_NO_MEMO_RE = /['(]use no memo[')]/;

export async function cli(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  console.log('━━ React Compiler No-Memo Analyzer ━━\n');

  const scanDir = args.path;
  const packageName = await findPackageName(scanDir);

  console.log(`## Scanning: ${scanDir}`);
  console.log(`   Package: ${packageName}\n`);

  // Discover files with 'use no memo' directives
  const files = await discoverFiles(scanDir, packageName, args.exclude, args.verbose);

  if (files.length === 0) {
    console.log("No files with 'use no memo' directives found.");
    process.exit(0);
  }

  console.log(`Files with 'use no memo': ${files.length}\n`);

  // Run analysis
  const results = await analyzeFiles(files, {
    concurrency: args.concurrency,
    verbose: args.verbose,
  });

  // Report
  const workspaceRoot = process.cwd();
  printReport(results, workspaceRoot, args.fullReasons);
  printSummary(results);

  // Auto-fix
  if (args.fix) {
    const fixable = results.filter(r => r.status === 'redundant' || r.status === 'active');
    if (fixable.length > 0) {
      console.log('Applying fixes...');
      const fixResult = await applyFixes(results);
      const parts: string[] = [];
      if (fixResult.directivesRemoved > 0) {
        parts.push(`${fixResult.directivesRemoved} redundant directive(s) removed`);
      }
      if (fixResult.directivesJustified > 0) {
        parts.push(`${fixResult.directivesJustified} active directive(s) annotated with // justified:`);
      }
      console.log(`Fixed: ${parts.join(', ')} across ${fixResult.filesModified} file(s).\n`);
    } else {
      console.log('Nothing to fix.\n');
    }
  }

  // Exit code
  const hasRedundant = results.some(r => r.status === 'redundant');
  process.exit(hasRedundant && !args.fix ? 1 : 0);
}

/**
 * Walk up from `startDir` to find the nearest package.json and return its `name` field.
 * Falls back to the basename of `startDir`.
 */
async function findPackageName(startDir: string): Promise<string> {
  let dir = resolve(startDir);
  const root = resolve('/');

  while (dir !== root) {
    const pkgJsonPath = join(dir, 'package.json');
    if (existsSync(pkgJsonPath)) {
      try {
        const content = await readFile(pkgJsonPath, 'utf-8');
        const pkg = JSON.parse(content);
        if (typeof pkg.name === 'string') {
          return pkg.name;
        }
      } catch {
        // ignore parse errors, keep walking
      }
    }
    dir = dirname(dir);
  }

  return basename(startDir);
}

/**
 * Discover files containing 'use no memo' in the given directory.
 */
async function discoverFiles(
  scanDir: string,
  packageName: string,
  exclude: string[],
  verbose: boolean,
): Promise<FileEntry[]> {
  const files: FileEntry[] = [];

  const tsFiles = globSync('**/*.{ts,tsx}', {
    cwd: scanDir,
    exclude,
  }).map(relative => join(scanDir, relative));

  for (const filePath of tsFiles) {
    const content = await readFile(filePath, 'utf-8');
    if (USE_NO_MEMO_RE.test(content)) {
      files.push({ filePath, packageName });
    }
  }

  if (verbose && files.length === 0) {
    console.log(`  No 'use no memo' files found in ${scanDir}`);
  }

  return files;
}
