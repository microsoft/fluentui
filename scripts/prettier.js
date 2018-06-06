const { execSync } = require('child_process');
const exec = require('./exec');
const path = require('path');
const { EOL, cpus } = require('os');

const prettierIntroductionCommit = 'cfa7a19ec';
const passedDiffTarget = process.argv.slice(2).length ? process.argv.slice(2)[0] : prettierIntroductionCommit;

const projectPath = path.resolve(path.join(__dirname, '..'));
const cmd = `git --no-pager diff ${passedDiffTarget} --diff-filter=AM --name-only --stat-name-width=0`;

const gitDiffOutput = execSync(cmd, { cwd: projectPath });
const filesChangedSinceLastRun = gitDiffOutput
  .toString('utf8')
  .split(EOL)
  .filter(fileName => /\.(ts|tsx|js)$/.test(fileName));

const prettierPath = path.resolve(__dirname, './node_modules/prettier/bin-prettier.js');
const prettierIgnorePath = path.resolve(path.join(__dirname, '..', '.prettierignore'));
const prettierConfigPath = path.join(
  __dirname,
  '..',
  'packages',
  'office-ui-fabric-react-tslint',
  'prettier.config.js'
);

function runPrettierForFile(filePath) {
  return exec(
    `node ${prettierPath} --config ${prettierConfigPath} --ignore-path ${prettierIgnorePath} --write ${filePath}`,
    undefined,
    undefined,
    process
  );
}

const numberOfCpus = cpus().length / 2;
console.log(`Running prettier on changed files (on ${numberOfCpus} processes):`);
const queues = new Array(numberOfCpus).fill(undefined).map(() => []);

filesChangedSinceLastRun.forEach((fileName, index) => {
  const queueNumber = index % numberOfCpus;

  queues[queueNumber].push(fileName);
});

const allQueues = queues.map(queue => {
  return queue.reduce((next, fileName) => {
    return next.then(() => {
      return runPrettierForFile(fileName);
    });
  }, Promise.resolve());
});

Promise.all(allQueues)
  .then(() => {
    console.log('🙌 All done! 🙌');
  })
  .catch(error => {
    console.error(error);
  });
