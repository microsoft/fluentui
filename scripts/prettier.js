// @ts-check
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const { runPrettier, runPrettierForFolder, prettierExtensions } = require('./prettier/prettier-helpers');
const { default: PQueue } = require('p-queue');
const findGitRoot = require('./monorepo/findGitRoot');

const runOnAllFiles = require('yargs').argv.all;

const numberOfCpus = os.cpus().length / 2;
console.log(`Running prettier on ${runOnAllFiles ? 'all' : 'changed'} files (on ${numberOfCpus} processes):`);

async function runPrettierForAll() {
  const queue = new PQueue({ concurrency: numberOfCpus });
  if (runOnAllFiles) {
    // Run on groups of files so that the operations can run in parallel
    const root = findGitRoot();
    await queue.add(() => runPrettierForFolder(root, true, true));
    await queue.addAll(['apps', 'packages', '{.*,scripts,typings}'].map(name => () => runPrettierForFolder(name)));
  } else {
    const prettierIntroductionCommit = 'HEAD~1';
    const passedDiffTarget = process.argv.slice(2).length ? process.argv.slice(2)[0] : prettierIntroductionCommit;

    const projectPath = path.resolve(__dirname, '..');
    const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

    const gitDiffOutput = execSync(cmd, { cwd: projectPath });
    const prettierExtRegex = new RegExp(`\\.(${prettierExtensions.join('|')})$`);
    const files = gitDiffOutput
      .toString('utf8')
      .split(os.EOL)
      .filter(fileName => prettierExtRegex.test(fileName));

    const fileGroups = [];
    for (let chunkStart = 0; chunkStart < files.length; chunkStart += numberOfCpus) {
      fileGroups.push(files.slice(chunkStart, chunkStart + numberOfCpus));
    }

    await queue.addAll(
      fileGroups.map(group => () => {
        console.log(`Running for ${group.length} files!`);
        runPrettier(group, true /*async*/);
      }),
    );
  }

  await queue.onEmpty().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

runPrettierForAll();
