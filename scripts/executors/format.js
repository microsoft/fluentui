// This script is not meant as a general-purpose replacement for prettier.
// It only handles certain cases that prettier doesn't support as well/at all natively.

const { execSync } = require('child_process');

const { findGitRoot } = require('@fluentui/scripts-monorepo');
const { runPrettier, runPrettierForFolder } = require('@fluentui/scripts-prettier');

const parsedArgs = parseArgs();
const root = findGitRoot();

function main() {
  const { all: runOnAllFiles, check: checkMode } = parsedArgs;

  console.log(
    `format: running prettier on ${runOnAllFiles ? 'all' : 'changed'} files, in ${checkMode ? 'check' : 'write'} mode`,
  );

  const pass = runOnAllFiles ? runOnAll() : runOnChanged();
  if (!pass) {
    process.exit(1);
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        boolean: true,
      },
      check: {
        description: 'Run prettier in check mode (useful for CI). Runs in write mode if not specified.',
        // eslint-disable-next-line @typescript-eslint/naming-convention
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

function runOnAll() {
  return runPrettierForFolder(root, { check: parsedArgs.check });
}

function runOnChanged() {
  const passedDiffTarget = parsedArgs.since;

  const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

  const gitDiffOutput = execSync(cmd, { cwd: root });
  const files = gitDiffOutput.toString('utf8').trim().split('\n');

  if (files.length === 0) {
    console.log(`format: Nothing to format!\n`);

    return true;
  }

  // Chunkify the files array to prevent crashing the windows terminal
  const chunkList = chunkify(files, 50);

  console.log(`format: Processing ${files.length} files`);

  const pass = chunkList.reduce((_pass, chunk) => runPrettier(chunk, { check: parsedArgs.check }) && _pass, true);
  return pass;
}

/**
 *
 * @param {string[]} target
 * @param {number} size
 * @returns {string[][]}
 */
function chunkify(target, size) {
  return target.reduce((current, value, index) => {
    if (index % size === 0) {
      current.push([]);
    }
    current[current.length - 1].push(value);
    return current;
  }, /**  @type {string[][]}*/ ([]));
}

main();
