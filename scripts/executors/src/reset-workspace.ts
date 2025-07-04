import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yargs from 'yargs';
// This script MUST NOT have any deps aside from Node built-ins, because it may delete node_modules!

/**
 # Usage

 # Preview what would be deleted (recommended first step)
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts --dry-run

# Delete with confirmation prompt
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts

# Delete without confirmation
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts -y

# Verbose output showing all operations
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts --verbose

# Show help
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts --help
 */

// Parse command line arguments using yargs
const argv = yargs
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    default: false,
    description: 'Show detailed output',
  })
  .option('dry-run', {
    alias: 'd',
    type: 'boolean',
    default: false,
    description: 'Show what would be deleted without actually deleting',
  })
  .option('yes', {
    alias: 'y',
    type: 'boolean',
    default: false,
    description: 'Skip confirmation prompt',
  })
  .help()
  .alias('help', 'h')
  .usage('Usage: $0 [options]\n\nThis script removes all files and folders that match patterns in .gitignore.')
  .example('$0 --dry-run', 'Preview what would be deleted')
  .example('$0 -y', 'Delete without confirmation')
  .example('$0 --verbose', 'Show detailed output').argv;

const verbose = argv.verbose;
const dryRun = argv['dry-run'];
const skipConfirmation = argv.yes;

/**
 * Prompt user for input
 */
function prompt(question: string): Promise<string> {
  return new Promise(resolve => {
    process.stdin.resume();
    process.stdout.write(question);

    process.stdin.once('data', data => {
      resolve(data.toString().trim());
      process.stdin.pause();
    });
  });
}

/**
 * Parse .gitignore file and return patterns in order
 */
function parseGitignore(gitignorePath: string): Array<{ pattern: string; isNegation: boolean }> {
  if (!fs.existsSync(gitignorePath)) {
    console.warn(`Warning: .gitignore file not found at ${gitignorePath}`);
    return [];
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const patterns: Array<{ pattern: string; isNegation: boolean }> = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    if (trimmed.startsWith('!')) {
      // Negation pattern - remove the ! and mark as negation
      patterns.push({
        pattern: trimmed.substring(1).replace(/\/$/, ''),
        isNegation: true,
      });
    } else {
      // Regular ignore pattern
      patterns.push({
        pattern: trimmed.replace(/\/$/, ''),
        isNegation: false,
      });
    }
  }

  return patterns;
}

/**
 * Check if a path matches any of the gitignore patterns
 */
function matchesPattern(filePath: string, pattern: string): boolean {
  // Normalize path separators for cross-platform compatibility
  const normalizedPath = filePath.replace(/\\/g, '/');

  // Simple pattern matching - convert gitignore patterns to regex-like matching
  if (pattern.includes('*')) {
    // Handle glob patterns
    // Important: Replace ** before * to avoid incorrect conversion
    const regexPattern = pattern
      .replace(/\./g, '\\.') // Escape dots
      .replace(/\*\*/g, '___DOUBLESTAR___') // Temporarily replace **
      .replace(/\*/g, '[^/]*') // Replace single * with [^/]*
      .replace(/___DOUBLESTAR___/g, '.*'); // Replace ** with .*

    const regex = new RegExp(`^${regexPattern}$`);
    if (regex.test(normalizedPath) || regex.test(path.basename(normalizedPath))) {
      return true;
    }
  } else {
    // Exact match or directory match
    if (
      normalizedPath === pattern ||
      normalizedPath.startsWith(pattern + '/') ||
      normalizedPath.endsWith('/' + pattern) ||
      path.basename(normalizedPath) === pattern
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a file should be ignored based on gitignore patterns
 * In gitignore, the last matching pattern wins
 */
function shouldIgnoreFile(filePath: string, patterns: Array<{ pattern: string; isNegation: boolean }>): boolean {
  let shouldIgnore = false;

  // Process patterns in order - the last matching pattern wins
  for (const { pattern, isNegation } of patterns) {
    if (matchesPattern(filePath, pattern)) {
      shouldIgnore = !isNegation;
    }
  }

  return shouldIgnore;
}

/**
 * Recursively find all files and directories that match gitignore patterns
 */
function findIgnoredPaths(
  dir: string,
  patterns: Array<{ pattern: string; isNegation: boolean }>,
  repoRoot: string,
): string[] {
  const toDelete: string[] = [];

  if (!fs.existsSync(dir)) {
    return toDelete;
  }

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(repoRoot, fullPath);

      // Skip .git directory
      if (item === '.git') {
        continue;
      }

      if (shouldIgnoreFile(relativePath, patterns)) {
        toDelete.push(fullPath);
        if (verbose) {
          console.log(`  Found ignored: ${relativePath}`);
        }
      } else {
        // If this item is not ignored, recursively check its contents (if it's a directory)
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            toDelete.push(...findIgnoredPaths(fullPath, patterns, repoRoot));
          }
        } catch (ex) {
          // Skip items we can't stat (e.g., broken symlinks)
          if (verbose) {
            console.warn(`Warning: Could not stat ${fullPath}: ${ex instanceof Error ? ex.message : String(ex)}`);
          }
        }
      }
    }
  } catch (ex) {
    console.warn(`Warning: Could not read directory ${dir}: ${ex instanceof Error ? ex.message : String(ex)}`);
  }

  return toDelete;
}

/**
 * Remove a file or directory
 */
function removeItem(itemPath: string): void {
  try {
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(itemPath);
    }
  } catch (ex) {
    console.warn(`Warning: Could not remove ${itemPath}: ${ex instanceof Error ? ex.message : String(ex)}`);
  }
}

async function run(): Promise<void> {
  const repoRoot = process.cwd();

  if (!fs.existsSync(path.join(repoRoot, '.git'))) {
    console.error('Please run this script from the root of the Git repo');
    process.exit(1);
  }

  const gitignorePath = path.join(repoRoot, '.gitignore');
  const patterns = parseGitignore(gitignorePath);

  if (patterns.length === 0) {
    console.log('No gitignore patterns found or .gitignore file is empty.');
    return;
  }

  if (verbose) {
    console.log('Gitignore patterns found (in order):');
    patterns.forEach(({ pattern, isNegation }) => console.log(`  ${isNegation ? '!' : ''}${pattern}`));
    console.log('');
  }

  console.log('Scanning for files and folders that match .gitignore patterns...');
  const toDelete = findIgnoredPaths(repoRoot, patterns, repoRoot);

  if (toDelete.length === 0) {
    console.log('No ignored files or folders found.');
    return;
  }

  console.log(`Found ${toDelete.length} ignored items:`);
  const showItemCount = 20;
  const displayItems = toDelete.slice(0, showItemCount).map((item: string) => '  ' + path.relative(repoRoot, item));
  console.log(displayItems.join('\n'));

  if (toDelete.length > showItemCount) {
    console.log(`  ...and ${toDelete.length - showItemCount} more`);
  }

  if (dryRun) {
    console.log('\nDry run mode - no files were deleted.');
    return;
  }

  if (!skipConfirmation) {
    const answer = await prompt('\nAre you sure you want to delete these files and folders? (yes/no) ');
    if (typeof answer === 'string' && answer.toLowerCase()[0] !== 'y') {
      console.log('Operation cancelled.');
      return;
    }
  }

  console.log('\nDeleting ignored files and folders...');
  let deletedCount = 0;

  for (const item of toDelete) {
    if (fs.existsSync(item)) {
      if (verbose) {
        console.log(`  Deleting: ${path.relative(repoRoot, item)}`);
      }
      removeItem(item);
      deletedCount++;
    }
  }

  console.log(`\nDone! Deleted ${deletedCount} items.`);
}

run().catch(ex => {
  console.error('Caught error:');
  console.error(ex);
  process.exit(1);
});
