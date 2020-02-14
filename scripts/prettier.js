// @ts-check
const { execSync } = require('child_process');
const path = require('path');
const { EOL, cpus } = require('os');
const { runPrettier, runPrettierForProject, prettierExtensions } = require('./prettier/prettier-helpers');
const { default: PQueue } = require('p-queue');
const getAllPackageInfo = require('./monorepo/getAllPackageInfo');
const runOnAllFiles = require('yargs').argv.all;

const numberOfCpus = cpus().length / 2;
console.log(`Running prettier on ${runOnAllFiles ? 'all' : 'changed'} files (on ${numberOfCpus} processes):`);

const queue = new PQueue({ concurrency: numberOfCpus });
if (runOnAllFiles) {
  const allPackages = getAllPackageInfo();
  queue.addAll(Object.keys(allPackages).map(name => () => runPrettierForProject(allPackages[name].packagePath)));
} else {
  const prettierIntroductionCommit = 'HEAD~1';
  const passedDiffTarget = process.argv.slice(2).length ? process.argv.slice(2)[0] : prettierIntroductionCommit;

  const projectPath = path.resolve(__dirname, '..');
  const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

  const gitDiffOutput = execSync(cmd, { cwd: projectPath });
  const prettierExtRegex = new RegExp(`\\.(${prettierExtensions.join('|')})$`);
  const files = gitDiffOutput
    .toString('utf8')
    .split(EOL)
    .filter(fileName => prettierExtRegex.test(fileName));

  const fileGroups = [];
  for (let chunkStart = 0; chunkStart < files.length; chunkStart += numberOfCpus) {
    fileGroups.push(files.slice(chunkStart, chunkStart + numberOfCpus));
  }

  queue.addAll(
    fileGroups.map(group => () => {
      console.log(`Running for ${group.length} files!`);
      runPrettier(group, true /*async*/);
    })
  );
}

queue
  .onEmpty()
  .then(() => {
    console.log('🙌 All done! 🙌');
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
