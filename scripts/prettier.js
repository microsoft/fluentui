// @ts-check
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const { runPrettier, runPrettierForFolder, prettierExtensions } = require('./prettier/prettier-helpers');
const { default: PQueue } = require('p-queue');
const findGitRoot = require('./monorepo/findGitRoot');

const parsedArgs = parseArgs();
const numberOfCpus = os.cpus().length / 2;

async function main() {
  const runOnAllFiles = parsedArgs.all;

  console.log(`Running prettier on ${runOnAllFiles ? 'all' : 'changed'} files (on ${numberOfCpus} processes):`);

  const queue = new PQueue({ concurrency: numberOfCpus });

  if (runOnAllFiles) {
    runOnAll(queue);
  } else {
    runOnChanged(queue);
  }

  await queue.onEmpty().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

function parseArgs() {
  return require('yargs')
    .usage('Usage: prettier [commitHash] [options]')
    .example('prettier', 'run prettier only on changed files')
    .example('prettier HEAD~3', 'run prettier only on changed files since HEAD~3')
    .options({
      all: {
        description: 'Run prettier on all projects',
        boolean: true,
      },
    })
    .alias('h', 'help').argv;
}

/**
 *
 * @param {PQueue} queue
 */
async function runOnChanged(queue) {
  const prettierIntroductionCommit = 'HEAD~1';
  const passedDiffTarget = parsedArgs._.length ? parsedArgs._[0] : prettierIntroductionCommit;

  const projectRootPath = path.resolve(__dirname, '..');
  const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

  const gitDiffOutput = execSync(cmd, { cwd: projectRootPath });
  const prettierExtRegex = new RegExp(`\\.(${prettierExtensions.join('|')})$`);
  const files = gitDiffOutput
    .toString('utf8')
    .split(os.EOL)
    .filter(fileName => prettierExtRegex.test(fileName));

  const fileGroups = [];
  for (let chunkStart = 0; chunkStart < files.length; chunkStart += numberOfCpus) {
    fileGroups.push(files.slice(chunkStart, chunkStart + numberOfCpus));
  }

  console.log(files);
  process.exit(1);

  await queue.addAll(
    fileGroups.map(group => () => {
      console.log(`Running for ${group.length} files!`);
      runPrettier(group, true /*async*/);
    }),
  );
}

/**
 *
 * @param {PQueue} queue
 */
async function runOnAll(queue) {
  // Run on groups of files so that the operations can run in parallel
  const root = findGitRoot();
  await queue.add(() => runPrettierForFolder(root, true, true));
  await queue.addAll(
    ['apps', 'packages/!(fluentui)', 'packages/fluentui', '{.*,scripts,typings}'].map(name => () =>
      runPrettierForFolder(name),
    ),
  );
}

main();
