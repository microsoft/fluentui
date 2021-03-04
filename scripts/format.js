// @ts-check
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
  const { all: runOnAllFiles, check: checkMode } = parsedArgs;

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
  return require('yargs')
    .usage('Usage: format [files] [options]')
    .example('format', 'Run format only on changed files')
    .example('format --commit HEAD~3', 'Run format only on changed files since HEAD~3')
    .options({
      since: {
        description: 'Run format on files since commit',
        type: 'string',
      },
      all: {
        description: 'Run format on all files',
        boolean: true,
      },
      check: {
        description: 'Run format in check mode. useful for CI',
        boolean: true,
      },
    })
    .alias('h', 'help').argv;
}

/**
 *
 * @param {{queue:PQueue;paths:Paths}} options
 */
async function runOnChanged(options) {
  const { paths, queue } = options;
  const prettierIntroductionCommit = 'HEAD~1';
  const passedDiffTarget = parsedArgs.since || prettierIntroductionCommit;

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
