// @ts-check

// This script is not meant as a general-purpose replacement for prettier.
// It only handles certain cases that prettier doesn't support as well/at all natively.

const { execSync } = require('child_process');
const { runPrettier, runPrettierForFolder } = require('./prettier/prettier-helpers');
const { findGitRoot } = require('./monorepo');

const parsedArgs = parseArgs();
const root = findGitRoot();

async function main() {
  const { all: runOnAllFiles, check: checkMode } = parsedArgs;

  console.log(
    `Running prettier on ${runOnAllFiles ? 'all' : 'changed'} files, in ${checkMode ? 'check' : 'write'} mode`,
  );

  if (runOnAllFiles) {
    await runPrettierForFolder(root, { runAsync: true, check: parsedArgs.check });
  } else {
    await runOnChanged();
  }
}

function parseArgs() {
  // Use yargs config to enforce that script must be run with exactly one of `--all` or
  // `--since [target]` (--check is accepted with either one).
  return require('yargs')
    .usage('Usage: format [options]\n\nRuns prettier on all files or since a certain commit (using parallel processes)')
    .example('format --since HEAD~3', 'Run `prettier --write` only on changed files since HEAD~3')
    .example('format --all', 'Run `prettier --write` on all files')
    .options({
      since: {
        description: 'Run prettier on files since commit',
        type: 'string',
      },
      all: {
        description: 'Run prettier on all files',
        boolean: true,
      },
      check: {
        description: 'Run prettier in check mode (useful for CI). Runs in write mode if not specified.',
        boolean: true,
      },
    })
    .alias('h', 'help')
    .version(false)
    .conflicts('since', 'all')
    .strict()
    .check(argv => {
      if (argv._.length) {
        throw new Error('To format individual files, run `yarn prettier` directly');
      }
      if (!argv.all && !argv.since) {
        throw new Error(
          'Must specify `--all` or `--since [target]` (for other use cases, run `yarn prettier` directly)',
        );
      }
      return true;
    }).argv;
}

async function runOnChanged() {
  const passedDiffTarget = parsedArgs.since;

  const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

  const gitDiffOutput = execSync(cmd, { cwd: root });
  const files = gitDiffOutput.toString('utf8').trim().split('\n');

  if (files.length === 0) {
    console.log(`Nothing to format!\n`);

    return;
  }

  return runPrettier(files, { runAsync: true, check: parsedArgs.check });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
