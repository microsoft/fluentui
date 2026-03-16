import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as yargs from 'yargs';

/**
 # Usage

 # Run in dry-run mode (default) - shows what would be deleted
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts

# Force delete without confirmation
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts --yes

# Show help
node -r ./scripts/ts-node/src/register ./scripts/executors/src/reset-workspace.ts --help
 */

// Parse command line arguments using yargs
const argv = yargs
  .option('yes', {
    alias: 'y',
    type: 'boolean',
    default: false,
    description: 'Skip dry-run and confirmation prompt - directly reset(clean) the workspace',
  })
  .help()
  .alias('help', 'h')
  .usage(
    'Usage: $0 [options]\n\nThis script removes all files and folders that match patterns in .gitignore using "git clean -dX".',
  )
  .example('$0', 'Preview what would be deleted (dry-run mode)')
  .example('$0 --yes', 'Delete without confirmation').argv;

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
 * Check if we're in a git repository
 */
function checkGitRepo(): void {
  if (!fs.existsSync('.git')) {
    console.error('Error: Please run this script from the root of a Git repository');
    process.exit(1);
  }

  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch {
    console.error('Error: Not in a valid Git repository');
    process.exit(1);
  }
}

/**
 * Run git clean in dry-run mode to preview what would be deleted
 */
function previewClean(): string {
  try {
    const output = execSync('git clean -dXn', {
      encoding: 'utf8',
      cwd: process.cwd(),
    });
    return output.trim();
  } catch (error) {
    console.error('Error running git clean preview:', error);
    process.exit(1);
  }
}

/**
 * Run git clean to actually delete ignored files
 */
function performClean(): void {
  try {
    console.log('\n🧹 Cleaning workspace...');
    execSync('git clean -dXf', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ Workspace cleaned successfully!');
  } catch (error) {
    console.error('Error running git clean:', error);
    process.exit(1);
  }
}

async function main(options: typeof argv): Promise<void> {
  const skipConfirmation = options.yes;
  // Check if we're in a git repository
  checkGitRepo();

  if (skipConfirmation) {
    // Skip dry-run and directly clean
    console.log('🚀 Reseting(Cleaning) workspace without preview (--yes flag used)...');
    performClean();
    return;
  }

  // Run in dry-run mode first (default behavior)
  console.log('🔍 Previewing what would be deleted (dry-run mode)...');
  console.log('This uses "git clean -dXn" to show ignored files and directories.\n');

  const previewOutput = previewClean();

  if (!previewOutput) {
    console.log('✨ No ignored files or directories found to clean.');
    return;
  }

  console.log('The following ignored files and directories would be deleted:');
  console.log('─'.repeat(60));
  console.log(previewOutput);
  console.log('─'.repeat(60));

  // Ask for confirmation
  const answer = await prompt('\n❓ Do you want to proceed with cleaning? (yes/no): ');

  if (answer.toLowerCase().startsWith('y')) {
    performClean();
  } else {
    console.log('❌ Operation cancelled.');
  }
}

main(argv).catch(ex => {
  console.error('Caught error:');
  console.error(ex);
  process.exit(1);
});
