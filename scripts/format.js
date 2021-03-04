// @ts-check

// This script is not meant as a general-purpose replacement for prettier.
// It only handles certain cases that prettier doesn't support as well/at all natively.

const { execSync } = require('child_process');
const os = require('os');
const { default: PQueue } = require('p-queue');
const { runPrettier, runPrettierForFolder, prettierExtensions } = require('./prettier/prettier-helpers');
const { findGitRoot } = require('./monorepo');

const parsedArgs = parseArgs();
const numberOfCpus = os.cpus().length / 2;

/**
 * @typedef {{root:string}} Paths
 */

async function main() {
  const { all: runOnAllFiles, check: checkMode, _ } = parsedArgs;

  if (_.length) {
    throw new Error('');
  }
  console.dir(parsedArgs);

  console.log(
    `Running format on ${runOnAllFiles ? 'all' : 'changed'} files (on ${numberOfCpus} processes | in ${
      checkMode ? 'check' : 'write'
    } mode)`,
  );

  /**
   * @type {Paths}
   */
  const paths = { root: findGitRoot() };

  const queue = new PQueue({ concurrency: numberOfCpus });

  if (runOnAllFiles) {
    await runOnAll({ queue, paths });
  } else {
    await runOnChanged({ queue, paths });
  }

  await queue.onEmpty().catch(error => {
    console.error(error);
    process.exit(1);
  });
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
    .conflicts('since', 'all')
    .conflicts('all', 'since')
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

/**
 *
 * @param {{queue:PQueue;paths:Paths}} options
 */
async function runOnChanged(options) {
  const { paths, queue } = options;
  const passedDiffTarget = parsedArgs.since;

  const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

  const gitDiffOutput = execSync(cmd, { cwd: paths.root });
  const prettierExtRegex = new RegExp(`\\.(${prettierExtensions.join('|')})$`);
  const files = gitDiffOutput
    .toString('utf8')
    .split('\n')
    .filter(fileName => prettierExtRegex.test(fileName));

  const fileGroups = [];
  for (let chunkStart = 0; chunkStart < files.length; chunkStart += numberOfCpus) {
    fileGroups.push(files.slice(chunkStart, chunkStart + numberOfCpus));
  }

  await queue.addAll(
    fileGroups.map(group => () => {
      console.log(`Running for ${group.length} files!`);
      return runPrettier(group, { runAsync: true, check: parsedArgs.check });
    }),
  );
}

/**
 *
 * @param {{queue:PQueue;paths:Paths}} options
 */
async function runOnAll(options) {
  const { queue, paths } = options;

  // Run on groups of files so that the operations can run in parallel
  await queue.add(() =>
    runPrettierForFolder(paths.root, { runAsync: true, nonRecursive: true, check: parsedArgs.check }),
  );
  await queue.addAll(
    ['apps', 'packages/!(fluentui)', 'packages/fluentui', '{.*,scripts,typings}'].map(name => () =>
      runPrettierForFolder(name, { check: parsedArgs.check }),
    ),
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
